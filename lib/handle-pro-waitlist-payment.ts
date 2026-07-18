import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { sendProWaitlistEmail } from '@/lib/resend'
import { notifyProWaitlistSignup } from '@/lib/slack'
import { PRO_CONFIG } from '@/lib/pro-config'
import { formatPaymentAmount } from '@/lib/format-payment'

interface PaymentPayload {
  data: {
    payment_id: string
    total_amount: number
    currency?: string
    metadata?: Record<string, string>
  }
}

export async function handleProWaitlistPayment(payload: PaymentPayload) {
  const { payment_id, total_amount, currency, metadata } = payload.data

  if (!metadata?.userEmail || !metadata?.githubUsername) {
    console.error('[Webhook] ERROR: Malformed pro waitlist metadata:', metadata)
    throw new Error('Malformed pro waitlist metadata')
  }

  const userEmail = metadata.userEmail.toLowerCase()
  const githubUsername = metadata.githubUsername

  const { data: existing } = await supabase
    .from('pro_waitlist')
    .select('*')
    .eq('payment_id', payment_id)
    .single()

  let entry = existing
  const isNewEntry = !existing

  if (!entry) {
    const { data: newEntry, error: insertError } = await supabase
      .from('pro_waitlist')
      .insert({
        email: userEmail,
        github_username: githubUsername,
        payment_id,
        amount: total_amount,
        currency: currency ?? 'USD',
        status: 'active',
        email_sent: false,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[Webhook] Pro waitlist insert failed:', insertError.message)
      throw insertError
    }

    entry = newEntry
    console.log(`[Webhook] Pro waitlist joined: ${userEmail} (${payment_id})`)

    try {
      const posthog = (await import('@/lib/posthog-server')).default()
      if (posthog) {
        posthog.capture({
          distinctId: userEmail,
          event: 'pro_waitlist_joined',
          properties: {
            githubUsername,
            amount: total_amount / 100,
            currency: currency ?? 'USD',
            paymentId: payment_id,
            $set: { pro_waitlist: true },
          },
        })
        await posthog.shutdown()
      }
    } catch (err) {
      console.error('[Webhook] PostHog pro_waitlist_joined failed:', err)
    }
  }

  const currencyCode = currency ?? 'USD'
  const amountLabel = formatPaymentAmount(total_amount, currencyCode)

  if (!entry.email_sent) {
    try {
      await sendProWaitlistEmail({
        email: userEmail,
        githubUsername,
        amountLabel,
      })
      await supabase
        .from('pro_waitlist')
        .update({ email_sent: true })
        .eq('payment_id', payment_id)
    } catch (err) {
      console.error('[Webhook] Pro waitlist email failed:', err)
      throw err
    }
  }

  if (isNewEntry) {
    notifyProWaitlistSignup({
      email: userEmail,
      githubUsername,
      amountLabel,
      launchPriceUsd: PRO_CONFIG.launchPriceUsd,
    }).catch((err) => {
      console.error('[Webhook] Pro waitlist Slack notification failed:', err)
    })
  }
}
