import { handleTemplatePayment } from '@/lib/handle-template-payment'
import { handleProWaitlistPayment } from '@/lib/handle-pro-waitlist-payment'

interface PaymentPayload {
  data: {
    payment_id: string
    total_amount: number
    currency?: string
    metadata?: Record<string, string>
  }
}

export async function handlePaymentSucceeded(payload: PaymentPayload) {
  const paymentType = payload.data.metadata?.type

  if (paymentType === 'pro_waitlist') {
    return handleProWaitlistPayment(payload)
  }

  return handleTemplatePayment(payload)
}
