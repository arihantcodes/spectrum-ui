import { getDodoClient } from '@/lib/dodo-client'
import { handlePaymentSucceeded } from '@/lib/dodo-webhook'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { PRO_CONFIG } from '@/lib/pro-config'

export async function retrievePayment(paymentId: string) {
  const client = getDodoClient()
  return client.payments.retrieve(paymentId)
}

function normalizeMetadata(
  metadata: Record<string, unknown> | null | undefined
): Record<string, string> {
  if (!metadata) return {}

  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(metadata)) {
    if (value !== null && value !== undefined) {
      result[key] = String(value)
    }
  }
  return result
}

export async function fulfillPaymentById(
  paymentId: string,
  fallback?: { email?: string }
): Promise<{ type: string; paymentId: string }> {
  const payment = await retrievePayment(paymentId)

  if (payment.status !== 'succeeded') {
    throw new Error(`Payment not succeeded (status: ${payment.status ?? 'unknown'})`)
  }

  const metadata = normalizeMetadata(
    payment.metadata as Record<string, unknown> | undefined
  )

  if (!metadata.type) {
    const isProWaitlist = payment.product_cart?.some(
      (item) => item.product_id === PRO_CONFIG.dodoProductId
    )
    if (isProWaitlist) {
      metadata.type = 'pro_waitlist'
    }
  }

  if (!metadata.userEmail && fallback?.email) {
    metadata.userEmail = fallback.email.toLowerCase()
  }

  if (
    metadata.type === 'pro_waitlist' &&
    !metadata.githubUsername &&
    metadata.userEmail
  ) {
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('github_username')
      .eq('email', metadata.userEmail.toLowerCase())
      .single()

    if (user?.github_username) {
      metadata.githubUsername = user.github_username
    }
  }

  await handlePaymentSucceeded({
    data: {
      payment_id: payment.payment_id,
      total_amount: payment.total_amount,
      currency: payment.currency,
      metadata,
    },
  })

  return { type: metadata.type ?? 'template', paymentId }
}
