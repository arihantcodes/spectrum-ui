import { Webhooks } from '@dodopayments/nextjs'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { grantRepoAccess } from '@/lib/github'
import { sendPurchaseEmail } from '@/lib/resend'

// ── Core Handler: Process a successful payment ──────────────────────────────
// This is extracted so we can call it from tests or manual retry logic.
export async function handlePaymentSucceeded(payload: any) {
  const {
    payment_id,
    total_amount,
    currency,
    metadata,
  } = payload.data

  const { templateSlug, githubUsername, userEmail } = metadata as {
    templateSlug:   string
    githubUsername: string
    userEmail:      string
  }

  // 1. Check for existing order (Idempotency)
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('*')
    .eq('payment_id', payment_id)
    .single()

  let order = existingOrder

  if (!order) {
    console.log(`[Webhook] New payment: ${userEmail} → ${templateSlug} (${payment_id})`)
    
    // Get template details
    const { data: template } = await supabase
      .from('templates')
      .select('name, github_repo')
      .eq('slug', templateSlug)
      .single()

    if (!template) {
      console.error(`[Webhook] ERROR: Template not found: ${templateSlug}`)
      return
    }

    // Initial insert
    const { data: newOrder, error: insertError } = await supabase
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
      .select()
      .single()

    if (insertError) {
      console.error(`[Webhook] ERROR: Order insert failed: ${insertError.message}`)
      return
    }
    order = newOrder
  } else {
    console.log(`[Webhook] Existing order found for ${payment_id}. Resuming...`)
  }

  // 2. Grant GitHub Access (if not already granted)
  if (!order.github_access_granted) {
    try {
      const { data: template } = await supabase
        .from('templates')
        .select('github_repo')
        .eq('slug', templateSlug)
        .single()
      
      if (template) {
        await grantRepoAccess(template.github_repo, githubUsername)
        await supabase
          .from('orders')
          .update({ github_access_granted: true })
          .eq('payment_id', payment_id)
        console.log(`[Webhook] GitHub access granted: ${githubUsername}`)
      }
    } catch (err) {
      console.error(`[Webhook] ERROR: GitHub access failed:`, err)
    }
  }

  // 3. Send Email (if not already sent)
  if (!order.email_sent) {
    try {
      const { data: template } = await supabase
        .from('templates')
        .select('name, github_repo')
        .eq('slug', templateSlug)
        .single()

      if (template) {
        await sendPurchaseEmail({
          email:          userEmail,
          githubUsername: githubUsername,
          templateName:   template.name,
          githubRepo:     template.github_repo,
        })
        await supabase
          .from('orders')
          .update({ email_sent: true })
          .eq('payment_id', payment_id)
        console.log(`[Webhook] Welcome email sent: ${userEmail}`)
      }
    } catch (err) {
      console.error(`[Webhook] ERROR: Email failed:`, err)
    }
  }
}

// ── Webhook Route ───────────────────────────────────────────────────────────
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,

  onPaymentSucceeded: async (payload) => {
    await handlePaymentSucceeded(payload)
  },

  onPaymentFailed: async (payload) => {
    console.error(`[Webhook] Payment failed: ${payload.data.payment_id}`)
  },

  onSubscriptionActive:    async () => {},
  onSubscriptionCancelled: async () => {},
  onSubscriptionUpdated:   async () => {},
})
