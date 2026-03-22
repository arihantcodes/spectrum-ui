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

  // 0. Validate metadata
  if (!metadata || !metadata.templateSlug || !metadata.githubUsername || !metadata.userEmail) {
    console.error(`[Webhook] ERROR: Malformed metadata:`, metadata)
    throw new Error('Malformed metadata in webhook payload')
  }

  const { templateSlug, githubUsername, userEmail } = metadata as {
    templateSlug:   string
    githubUsername: string
    userEmail:      string
  }

  // 1. Fetch template record ONCE for reuse
  const { data: template, error: templateError } = await supabase
    .from('templates')
    .select('name, github_repo')
    .eq('slug', templateSlug)
    .single()

  if (templateError || !template) {
    console.error(`[Webhook] ERROR: Template not found: ${templateSlug}`)
    throw new Error(`Template not found: ${templateSlug}`)
  }

  // 2. Check for existing order (Idempotency)
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('*')
    .eq('payment_id', payment_id)
    .single()

  let order = existingOrder

  if (!order) {
    console.log(`[Webhook] New payment: ${userEmail} → ${templateSlug} (${payment_id})`)
    
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
      throw insertError
    }
    order = newOrder
  } else {
    console.log(`[Webhook] Existing order found for ${payment_id}. Resuming...`)
  }

  // 3. Grant GitHub Access (if not already granted)
  if (!order.github_access_granted) {
    try {
      await grantRepoAccess(template.github_repo, githubUsername)
      await supabase
        .from('orders')
        .update({ github_access_granted: true })
        .eq('payment_id', payment_id)
      console.log(`[Webhook] GitHub access granted: ${githubUsername}`)
    } catch (err) {
      console.error(`[Webhook] ERROR: GitHub access failed:`, err)
      // Re-throw to ensure webhook retry
      throw err
    }
  }

  // 4. Send Email (if not already sent)
  if (!order.email_sent) {
    try {
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
    } catch (err) {
      console.error(`[Webhook] ERROR: Email failed:`, err)
      // Re-throw to ensure webhook retry
      throw err
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
