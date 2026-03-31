import { Webhooks } from '@dodopayments/nextjs'
import { handlePaymentSucceeded } from '@/lib/dodo-webhook'

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
