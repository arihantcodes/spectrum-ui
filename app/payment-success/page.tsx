import { IconCheck, IconBrandGithub, IconX, IconClock } from '@tabler/icons-react'
import Link from 'next/link'
import { fulfillPaymentById, retrievePayment } from '@/lib/fulfill-payment'
import { ProWaitlistSuccessTracker } from '@/app/pro/waitlist/success/tracker'

interface PaymentSuccessPageProps {
  searchParams: {
    payment_id?: string
    status?: string
    email?: string
  }
}

function FailedPaymentView({ paymentId }: { paymentId?: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 bg-red-500/10 border border-red-500/20
          rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <IconX size={28} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment failed
        </h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          Your payment did not go through. You have not been charged and are not
          on the waitlist yet.
        </p>

        {paymentId && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            Reference: {paymentId}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Link
            href="/pro"
            className="flex items-center justify-center gap-2
              bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100
              text-white dark:text-neutral-900
              font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Try again
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
          >
            Browse free components
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProcessingPaymentView({ paymentId }: { paymentId?: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 bg-amber-500/10 border border-amber-500/20
          rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <IconClock size={28} className="text-amber-500" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment processing
        </h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          Your payment is still being processed. If it succeeds, you&apos;ll
          receive a confirmation email shortly.
        </p>

        {paymentId && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            Reference: {paymentId}
          </p>
        )}

        <Link
          href="/pro"
          className="text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
        >
          Back to Pro
        </Link>
      </div>
    </div>
  )
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const paymentId = searchParams.payment_id
  const email = searchParams.email
    ? decodeURIComponent(searchParams.email)
    : undefined

  if (!paymentId) {
    return <FailedPaymentView />
  }

  let resolvedStatus = searchParams.status ?? 'unknown'

  try {
    const payment = await retrievePayment(paymentId)
    resolvedStatus = payment.status ?? resolvedStatus
  } catch (err) {
    console.error('[payment-success] Could not verify payment:', err)
  }

  if (resolvedStatus === 'failed' || resolvedStatus === 'cancelled') {
    return <FailedPaymentView paymentId={paymentId} />
  }

  if (
    resolvedStatus !== 'succeeded' &&
    resolvedStatus !== 'unknown'
  ) {
    return <ProcessingPaymentView paymentId={paymentId} />
  }

  if (resolvedStatus !== 'succeeded') {
    return <FailedPaymentView paymentId={paymentId} />
  }

  let fulfillmentType: string | null = null
  let fulfillmentError: string | null = null

  try {
    const result = await fulfillPaymentById(paymentId, { email })
    fulfillmentType = result.type
  } catch (err) {
    fulfillmentError =
      err instanceof Error ? err.message : 'Could not finalize your purchase'
    console.error('[payment-success] Fulfillment failed:', err)
  }

  const isProWaitlist = fulfillmentType === 'pro_waitlist'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {isProWaitlist && <ProWaitlistSuccessTracker />}
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20
          rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <IconCheck size={28} className="text-[#22C55E]" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment successful
        </h1>

        {fulfillmentError ? (
          <p className="text-amber-600 dark:text-amber-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Payment received, but we could not finalize automatically. Please
            contact support with payment ID{' '}
            <span className="font-mono">{paymentId}</span>.
          </p>
        ) : isProWaitlist ? (
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            You&apos;re on the Spectrum Pro waitlist. Check your email for
            confirmation — we&apos;ll notify you the moment Pro launches.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Check your email for access instructions. Accept the GitHub
            invitation to clone your template.
          </p>
        )}

        <div
          className="bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222]
          rounded-xl p-5 mb-6 text-left
          shadow-sm dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
            Next steps
          </p>
          <ol className="space-y-2">
            {(isProWaitlist
              ? [
                  'Check your inbox for waitlist confirmation',
                  'We will email you when Spectrum Pro launches',
                  'Your early-bird price is locked in',
                ]
              : [
                  'Accept GitHub repo invitation (check email)',
                  'Clone your private repository',
                  'Run npm install && npm run dev',
                  'Ship.',
                ]
            ).map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-2.5 text-xs text-muted-foreground"
              >
                <span className="text-[#6366F1] font-mono mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2">
          {isProWaitlist ? (
            <Link
              href="/pro"
              className="flex items-center justify-center gap-2
              bg-[#6366F1] hover:bg-[#4F46E5] text-white
              font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Back to Pro
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2
              bg-[#6366F1] hover:bg-[#4F46E5] text-white
              font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <IconBrandGithub size={16} />
              Go to Dashboard
            </Link>
          )}
          <Link
            href={isProWaitlist ? '/docs' : '/pro'}
            className="text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
          >
            {isProWaitlist ? 'Browse free components' : 'Browse more templates'}
          </Link>
        </div>
      </div>
    </div>
  )
}
