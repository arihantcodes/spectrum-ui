import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { PRO_CONFIG } from '@/lib/pro-config'
import { createDodoCheckoutSession } from '@/lib/create-dodo-checkout-session'

export async function POST(req: NextRequest) {
  try {
    const { githubUsername } = await req.json()

    if (!githubUsername || typeof githubUsername !== 'string') {
      return NextResponse.json(
        { error: 'githubUsername is required' },
        { status: 400 }
      )
    }

    if (!PRO_CONFIG.dodoProductId) {
      return NextResponse.json(
        {
          error:
            'Pro waitlist is not configured. Set DODO_PRO_WAITLIST_PRODUCT_ID in production.',
        },
        { status: 503 }
      )
    }

    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to join the waitlist' },
        { status: 401 }
      )
    }

    const userEmail = session.user.email.toLowerCase()
    const cleanGithub = githubUsername.replace(/^@/, '').trim()

    const { count: existingCount } = await supabaseAdmin
      .from('pro_waitlist')
      .select('id', { count: 'exact', head: true })
      .eq('email', userEmail)
      .eq('status', 'active')

    if (existingCount && existingCount > 0) {
      return NextResponse.json(
        { error: 'You are already on the Pro waitlist' },
        { status: 400 }
      )
    }

    const { syncUser } = await import('@/lib/user-sync')
    syncUser({
      email: userEmail,
      name: session.user.name,
      image: session.user.image,
      githubUsername: cleanGithub,
    }).catch((err) => console.error('[pro-waitlist] syncUser failed:', err))

    try {
      const posthog = (await import('@/lib/posthog-server')).default()
      if (posthog) {
        posthog.capture({
          distinctId: userEmail,
          event: 'pro_waitlist_checkout_initiated',
          properties: {
            githubUsername: cleanGithub,
            email: userEmail,
            waitlistFeeUsd: PRO_CONFIG.waitlistFeeUsd,
          },
        })
        await posthog.shutdown()
      }
    } catch (err) {
      console.error('[pro-waitlist] PostHog event failed:', err)
    }

    const checkoutUrl = await createDodoCheckoutSession({
      productId: PRO_CONFIG.dodoProductId,
      customer: {
        email: userEmail,
        name: session.user.name ?? userEmail,
      },
      metadata: {
        type: 'pro_waitlist',
        githubUsername: cleanGithub,
        userEmail,
      },
    })

    return NextResponse.json({ checkout_url: checkoutUrl })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create checkout session'
    console.error('[pro-waitlist] Checkout error:', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
