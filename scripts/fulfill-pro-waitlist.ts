/**
 * Manually fulfill a Dodo payment (useful when webhook was missed).
 *
 * Usage:
 *   npx tsx scripts/fulfill-pro-waitlist.ts pay_xxxxx [email@example.com]
 */

import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const paymentId = process.argv[2]
const email = process.argv[3]

if (!paymentId) {
  console.error('Usage: npx tsx scripts/fulfill-pro-waitlist.ts <payment_id> [email]')
  process.exit(1)
}

async function main() {
  const { fulfillPaymentById } = await import('../lib/fulfill-payment')

  console.log(`Fulfilling payment ${paymentId}...`)
  const result = await fulfillPaymentById(paymentId, email ? { email } : undefined)
  console.log('Done:', result)
}

main().catch((err) => {
  console.error('Failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
