import { Webhooks } from '@dodopayments/nextjs'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { grantRepoAccess } from '@/lib/github'
import { sendPurchaseEmail } from '@/lib/resend'

// Webhooks object uses NextRequest format, returns NextResponse
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,

  // ── Main handler — fires on every successful one-time purchase ──
  onPaymentSucceeded: async (payload) => {
    const {
      payment_id,
      total_amount,
      currency,
      customer,
      metadata,
    } = payload.data

    const { templateSlug, githubUsername, userEmail } = metadata as {
      templateSlug:   string
      githubUsername: string
      userEmail:      string
    }

    console.log(`Payment succeeded: ${userEmail} → ${templateSlug}`)

    // Get template details from Supabase
    const { data: template } = await supabase
      .from('templates')
      .select('name, github_repo')
      .eq('slug', templateSlug)
      .single()

    if (!template) {
      console.error(`Template not found in DB: ${templateSlug}`)
      return
    }

    try {
      // ── 1. Save order to Supabase ──────────────────────────────
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          email:           userEmail,
          github_username: githubUsername,
          template_slug:   templateSlug,
          payment_id:      payment_id,
          amount:          total_amount,
          currency:        currency ?? 'USD',
          status:          'active',
          github_access_granted: false,
          email_sent:            false,
        })

      if (orderError) throw new Error(`Order insert failed: ${orderError.message}`)

      // ── 2. Grant GitHub private repo access ────────────────────
      await grantRepoAccess(template.github_repo, githubUsername)

      // Mark access as granted
      await supabase
        .from('orders')
        .update({ github_access_granted: true })
        .eq('payment_id', payment_id)

      // ── 3. Send welcome email via Resend ───────────────────────
      await sendPurchaseEmail({
        email:          userEmail,
        githubUsername: githubUsername,
        templateName:   template.name,
        githubRepo:     template.github_repo,
      })

      // Mark email as sent
      await supabase
        .from('orders')
        .update({ email_sent: true })
        .eq('payment_id', payment_id)

      console.log(`✓ Complete: ${userEmail} → ${template.github_repo}`)

    } catch (err) {
      console.error('Webhook processing error:', err)
      // Order is saved with github_access_granted: false
      // You can query these manually: 
      // SELECT * FROM orders WHERE github_access_granted = false
    }
  },

  // ── Handle refunds — revoke access ─────────────────────────────
  onPaymentFailed: async (payload) => {
    console.error('Payment failed:', payload.data.payment_id)
    // Nothing to do — order was never created
  },

  // ── Ignore subscription events — we don't use subscriptions ────
  onSubscriptionActive:    async () => {},
  onSubscriptionCancelled: async () => {},
  onSubscriptionUpdated:   async () => {},
})
