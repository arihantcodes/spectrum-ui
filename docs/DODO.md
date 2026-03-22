# Spectrum Pro — Dodo Payments Integration Plan

## Our Model (Important Context)

Spectrum Pro sells **one-time purchases**, not subscriptions. A buyer pays once for a template and gets permanent private GitHub repo access. This changes how we use Dodo — we use `onPaymentSucceeded` as our main event, not `onSubscriptionActive`.

```
Buyer clicks "Buy" → Dodo checkout → payment succeeds →
webhook fires → GitHub access granted + order saved + email sent
```

---

## 1. Install & Environment (DONE)

```bash
npm install @dodopayments/nextjs
```

```bash
# Add to .env.local

DODO_PAYMENTS_API_KEY=          # from Dodo dashboard → API Keys
DODO_PAYMENTS_WEBHOOK_KEY=      # from Dodo dashboard → Webhooks
DODO_PAYMENTS_ENVIRONMENT=test_mode   # switch to live_mode before launch

# One product ID per template — create each in Dodo dashboard
DODO_SAAS_TEMPLATE_PRODUCT_ID=pdt_xxx
DODO_FORGE_CLI_TEMPLATE_PRODUCT_ID=pdt_xxx
DODO_ORBIT_DASHBOARD_TEMPLATE_PRODUCT_ID=pdt_xxx

# Return URL after successful payment
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/payment-success
# DODO_PAYMENTS_RETURN_URL=https://ui.spectrumhq.in/payment-success
```

---

## 2. API Routes

### A. Checkout — `src/app/api/checkout/route.ts`

```ts
import { Checkout } from '@dodopayments/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Map template slugs to Dodo product IDs
const PRODUCT_MAP: Record<string, string | undefined> = {
  'nova-saas':       process.env.DODO_SAAS_TEMPLATE_PRODUCT_ID,
  'forge-cli':       process.env.DODO_FORGE_CLI_TEMPLATE_PRODUCT_ID,
  'orbit-dashboard': process.env.DODO_ORBIT_DASHBOARD_TEMPLATE_PRODUCT_ID,
}

// Dodo handles the checkout session
const DodoCheckout = Checkout({
  bearerToken:  process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl:    process.env.DODO_PAYMENTS_RETURN_URL!,
  environment:  process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
  type:         'session',
})

export async function POST(req: NextRequest) {
  try {
    const { templateSlug, githubUsername } = await req.json()

    // Validate inputs
    if (!templateSlug || !githubUsername) {
      return NextResponse.json(
        { error: 'templateSlug and githubUsername are required' },
        { status: 400 }
      )
    }

    const productId = PRODUCT_MAP[templateSlug]
    if (!productId) {
      return NextResponse.json(
        { error: `No product found for: ${templateSlug}` },
        { status: 404 }
      )
    }

    // Get logged-in user's email from Auth.js session
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to purchase' },
        { status: 401 }
      )
    }

    // Build the Dodo checkout request
    // We store githubUsername in metadata so webhook can use it
    const dodoRequest = new Request(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        customer: {
          email: session.user.email,
          name:  session.user.name ?? session.user.email,
        },
        metadata: {
          templateSlug,
          githubUsername: githubUsername.replace('@', '').trim(),
          userEmail:      session.user.email,
        },
        quantity: 1,
      }),
    })

    return DodoCheckout(dodoRequest)
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
```

---

### B. Webhook — `src/app/api/webhook/route.ts`

This is the most important route. Everything happens here after payment.

```ts
import { Webhooks } from '@dodopayments/nextjs'
import { supabase } from '@/lib/supabase'
import { grantRepoAccess } from '@/lib/github'
import { sendPurchaseEmail } from '@/lib/resend'

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  // ── Main handler — fires on every successful one-time purchase ──
  onPaymentSucceeded: async (payload) => {
    const {
      payment_id,
      total_amount,
      currency,
      customer,
      metadata,
    } = payload

    const { templateSlug, githubUsername, userEmail } = metadata as {
      templateSlug:   string
      githubUsername: string
      userEmail:      string
    }

    console.log(`Payment succeeded: ${userEmail} → ${templateSlug}`)

    // Get template details from Supabase
    const { data: template } = await supabase
      .from('templates')
      .select('name, github_repo')
      .eq('slug', templateSlug)
      .single()

    if (!template) {
      console.error(`Template not found in DB: ${templateSlug}`)
      return
    }

    try {
      // ── 1. Save order to Supabase ──────────────────────────────
      const { error: orderError } = await supabase
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

      if (orderError) throw new Error(`Order insert failed: ${orderError.message}`)

      // ── 2. Grant GitHub private repo access ────────────────────
      await grantRepoAccess(template.github_repo, githubUsername)

      // Mark access as granted
      await supabase
        .from('orders')
        .update({ github_access_granted: true })
        .eq('payment_id', payment_id)

      // ── 3. Send welcome email via Resend ───────────────────────
      await sendPurchaseEmail({
        email:          userEmail,
        githubUsername: githubUsername,
        templateName:   template.name,
        githubRepo:     template.github_repo,
      })

      // Mark email as sent
      await supabase
        .from('orders')
        .update({ email_sent: true })
        .eq('payment_id', payment_id)

      console.log(`✓ Complete: ${userEmail} → ${template.github_repo}`)

    } catch (err) {
      console.error('Webhook processing error:', err)
      // Order is saved with github_access_granted: false
      // You can query these manually: 
      // SELECT * FROM orders WHERE github_access_granted = false
    }
  },

  // ── Handle refunds — revoke access ─────────────────────────────
  onPaymentFailed: async (payload) => {
    console.error('Payment failed:', payload.payment_id)
    // Nothing to do — order was never created
  },

  // ── Ignore subscription events — we don't use subscriptions ────
  onSubscriptionActive:    async () => {},
  onSubscriptionCancelled: async () => {},
  onSubscriptionPastDue:   async () => {},
})
```

---

### C. Customer Portal — `src/app/api/customer-portal/route.ts`

Lets buyers download invoices or manage payment details.

```ts
import { CustomerPortal } from '@dodopayments/nextjs'

export const GET = CustomerPortal({
  bearerToken:  process.env.DODO_PAYMENTS_API_KEY!,
  environment:  process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
})
```

---

## 3. Buy Modal Component

### `src/components/marketing/BuyModal.tsx`

```tsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconBrandGithub, IconX, IconLock } from '@tabler/icons-react'
import Link from 'next/link'

interface BuyModalProps {
  isOpen:   boolean
  onClose:  () => void
  template: {
    slug:    string
    name:    string
    price:   number
    tagline: string
  }
}

export function BuyModal({ isOpen, onClose, template }: BuyModalProps) {
  const { data: session } = useSession()
  const [githubUsername, setGithubUsername] = useState(
    // Pre-fill if they signed in with GitHub
    session?.user?.githubUsername ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleBuy = async () => {
    if (!githubUsername.trim()) {
      setError('GitHub username is required for repo access')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug:   template.slug,
          githubUsername: githubUsername.replace('@', '').trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      // Redirect to Dodo hosted checkout
      window.location.href = data.url
    } catch {
      setError('Failed to start checkout. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50
            flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-[#222] rounded-2xl p-6
              w-full max-w-md
              [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),
                0_24px_64px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-semibold text-[#F5F5F5] text-lg">
                  {template.name}
                </h2>
                <p className="text-sm text-[#666] mt-0.5">
                  {template.tagline}
                </p>
              </div>
              <button onClick={onClose}
                className="text-[#444] hover:text-[#888] transition-colors p-1">
                <IconX size={18} />
              </button>
            </div>

            {/* Not signed in — prompt to sign in first */}
            {!session ? (
              <div className="text-center py-4">
                <p className="text-sm text-[#666] mb-4">
                  Sign in to purchase this template
                </p>
                <Link
                  href={`/sign-in?callbackUrl=/pro`}
                  className="inline-flex items-center gap-2
                    bg-[#F5F5F5] hover:bg-white text-[#080808]
                    font-semibold text-sm px-5 py-2.5 rounded-lg
                    transition-colors"
                >
                  <IconBrandGithub size={16} />
                  Sign in with GitHub
                </Link>
              </div>
            ) : (
              <>
                {/* Signed in — show purchase form */}
                <div className="space-y-4">

                  {/* Email — pre-filled, read only */}
                  <div>
                    <label className="text-xs text-[#555] mb-1.5 block font-medium uppercase tracking-wider">
                      Email
                    </label>
                    <div className="bg-[#0D0D0D] border border-[#1A1A1A]
                      rounded-lg px-4 py-2.5 text-sm text-[#555] font-mono">
                      {session.user?.email}
                    </div>
                  </div>

                  {/* GitHub username */}
                  <div>
                    <label className="text-xs text-[#555] mb-1.5 block font-medium uppercase tracking-wider">
                      GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2
                        text-[#444] text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => {
                          setGithubUsername(e.target.value)
                          setError('')
                        }}
                        placeholder="yourusername"
                        className="w-full bg-[#161616] border border-[#222]
                          focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20
                          rounded-lg pl-7 pr-4 py-2.5 text-sm text-[#F5F5F5]
                          placeholder:text-[#333] outline-none transition-all font-mono"
                      />
                    </div>
                    <p className="text-xs text-[#444] mt-1.5">
                      We&apos;ll add this account to the private repo on purchase
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-xs text-red-400 bg-red-500/8
                      border border-red-500/15 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleBuy}
                    disabled={loading || !githubUsername.trim()}
                    className="w-full bg-[#6366F1] hover:bg-[#4F46E5]
                      disabled:opacity-40 disabled:cursor-not-allowed
                      text-white font-semibold text-sm
                      py-3 rounded-xl transition-colors
                      flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Redirecting to checkout…'
                    ) : (
                      <>
                        <IconLock size={15} />
                        Pay ${template.price} — Get instant access
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#444]">
                    One-time payment · Full source code · Yours forever
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## 4. Payment Success Page

### `src/app/payment-success/page.tsx`

```tsx
import { IconCheck, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Success icon */}
        <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20
          rounded-full flex items-center justify-center mx-auto mb-6">
          <IconCheck size={28} className="text-[#22C55E]" />
        </div>

        <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">
          Payment successful.
        </h1>
        <p className="text-[#666] text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          Check your email for access instructions.
          Accept the GitHub invitation to clone your template.
        </p>

        {/* Quick start */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-5 mb-6 text-left
          [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="text-xs text-[#444] mb-3 font-semibold uppercase tracking-widest">
            Next steps
          </p>
          <ol className="space-y-2">
            {[
              'Accept GitHub repo invitation (check email)',
              'Clone your private repository',
              'Run npm install && npm run dev',
              'Ship.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#888]">
                <span className="text-[#6366F1] font-mono mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/dashboard"
            className="flex items-center justify-center gap-2
              bg-[#6366F1] hover:bg-[#4F46E5] text-white
              font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
            <IconBrandGithub size={16} />
            Go to Dashboard
          </Link>
          <Link href="/pro"
            className="text-[#444] hover:text-[#666] text-sm py-2 transition-colors">
            Browse more templates
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

## 5. Manual Recovery Query

For any orders where GitHub access failed silently, run this in Supabase:

```sql
-- Find orders where GitHub access wasn't granted
SELECT 
  email,
  github_username,
  template_slug,
  payment_id,
  purchased_at
FROM orders
WHERE github_access_granted = false
  AND status = 'active'
ORDER BY purchased_at DESC;
```

Then manually grant access:

```bash
# Quick fix via GitHub API
curl -X PUT \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/spectrum-ui-pro/nova-saas/collaborators/USERNAME \
  -d '{"permission":"pull"}'
```

---

## 6. Full Flow Summary

```
User clicks "Buy" on template card
        ↓
BuyModal opens → pre-fills email from Auth.js session
        ↓
User enters GitHub username → clicks "Pay $49"
        ↓
POST /api/checkout → Dodo creates session → returns checkout URL
        ↓
User redirected to Dodo hosted checkout page
        ↓
Payment succeeds → Dodo POSTs to /api/webhook
        ↓
Webhook handler runs 3 things in sequence:
  1. Insert order into Supabase (status: active)
  2. Grant GitHub repo access via API
  3. Send welcome email via Resend
        ↓
User redirected to /payment-success
        ↓
User visits /dashboard → sees their template + repo link
```

---

## 7. Dodo Dashboard Setup Checklist

```
[ ] Create a product for each template (one-time, not subscription)
    → Nova SaaS     $59
    → Forge CLI     $49
    → Orbit         $79

[ ] Copy each product ID → add to .env as DODO_PRODUCT_*

[ ] Add webhook endpoint:
    URL:    https://ui.spectrumhq.in/api/webhook
    Events: payment.succeeded, payment.failed

[ ] Copy webhook signing key → DODO_PAYMENTS_WEBHOOK_KEY

[ ] Test in test_mode with a real checkout flow end to end

[ ] Switch DODO_PAYMENTS_ENVIRONMENT to live_mode before launch
```