import DodoPayments from 'dodopayments'

export function getDodoClient() {
  const bearerToken = process.env.DODO_PAYMENTS_API_KEY
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT as
    | 'test_mode'
    | 'live_mode'
    | undefined

  if (!bearerToken || !environment) {
    throw new Error('Dodo Payments is not configured')
  }

  return new DodoPayments({ bearerToken, environment })
}
