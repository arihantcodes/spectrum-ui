import Link from 'next/link'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { CheckCircle2 } from 'lucide-react'
import { Icons } from '@/components/icon'
import { ProWaitlistSuccessTracker } from './tracker'

export default async function ProWaitlistSuccessPage() {
  const session = await auth()

  let isOnWaitlist = false
  if (session?.user?.email) {
    const { count } = await supabaseAdmin
      .from('pro_waitlist')
      .select('id', { count: 'exact', head: true })
      .eq('email', session.user.email.toLowerCase())
      .eq('status', 'active')

    isOnWaitlist = (count ?? 0) > 0
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <ProWaitlistSuccessTracker />
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <div className="h-8 w-8 bg-neutral-100 dark:bg-white border border-neutral-200 dark:border-transparent rounded-lg flex items-center justify-center p-1.5">
          <Icons.logo className="h-full w-full text-black" />
        </div>
        <span className="text-sm font-semibold tracking-tight">Spectrum UI</span>
      </Link>

      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {isOnWaitlist ? "You're on the Pro waitlist!" : 'Payment received'}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isOnWaitlist
              ? "We've confirmed your spot. Check your email for confirmation — we'll notify you the moment Spectrum Pro launches."
              : "We're processing your payment. If everything looks good, you'll receive a confirmation email shortly."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/pro"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Pro
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted/50 transition-colors"
          >
            Browse components
          </Link>
        </div>
      </div>
    </div>
  )
}
