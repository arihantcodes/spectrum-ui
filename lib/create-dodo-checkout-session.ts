import { APIError } from 'dodopayments'
import { getDodoClient } from '@/lib/dodo-client'

export interface CheckoutSessionInput {
  productId: string
  customer: {
    email: string
    name: string
  }
  metadata: Record<string, string>
}

export function assertDodoCheckoutConfig(): {
  returnUrl: string
  environment: 'test_mode' | 'live_mode'
} {
  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT as
    | 'test_mode'
    | 'live_mode'
    | undefined
  const apiKey = process.env.DODO_PAYMENTS_API_KEY

  const missing = [
    !apiKey ? 'DODO_PAYMENTS_API_KEY' : null,
    !environment ? 'DODO_PAYMENTS_ENVIRONMENT' : null,
    !returnUrl ? 'DODO_PAYMENTS_RETURN_URL' : null,
  ].filter((v): v is string => v !== null)

  if (missing.length > 0) {
    throw new Error(`Payment provider not configured: ${missing.join(', ')}`)
  }

  return { returnUrl: returnUrl!, environment: environment! }
}

export async function createDodoCheckoutSession(
  input: CheckoutSessionInput
): Promise<string> {
  const { returnUrl } = assertDodoCheckoutConfig()
  const client = getDodoClient()

  try {
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: input.productId, quantity: 1 }],
      customer: input.customer,
      metadata: input.metadata,
      return_url: returnUrl,
    })

    if (!session.checkout_url) {
      throw new Error('No checkout URL returned from payment provider')
    }

    return session.checkout_url
  } catch (err) {
    if (err instanceof APIError) {
      if (err.status === 401) {
        throw new Error(
          'Payment authentication failed. In production, use your live Dodo API key with DODO_PAYMENTS_ENVIRONMENT=live_mode and a live product ID.'
        )
      }
      if (err.status === 404) {
        throw new Error(
          'Product not found in Dodo. Ensure the product ID matches your current environment (test vs live).'
        )
      }
    }
    throw err
  }
}
