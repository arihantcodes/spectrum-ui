import { Checkout } from '@dodopayments/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

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

    // Get logged-in user's email from Auth.js session
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to purchase' },
        { status: 401 }
      )
    }

    // ── Fetch Template from DB ──
    // Pull product ID + template details in one query
    const { data: template, error: tError } = await supabase
      .from('templates')
      .select('name, dodo_product_id, github_repo')
      .eq('slug', templateSlug)
      .eq('is_published', true)
      .single()

    if (tError || !template) {
      return NextResponse.json(
        { error: 'Template not found or not published' },
        { status: 404 }
      )
    }

    if (!template.dodo_product_id) {
      return NextResponse.json(
        { error: 'Template is not available for purchase yet (missing product ID)' },
        { status: 400 }
      )
    }

    // ── Pre-fill & Persist GitHub Username ──
    const cleanGithub = githubUsername.replace(/^@/, '').trim()
    const { syncUser } = await import('@/lib/user-sync')
    syncUser({
      email:          session.user.email,
      name:           session.user.name,
      image:          session.user.image,
      githubUsername: cleanGithub,
    }).catch(err => console.error('[checkout] syncUser failed:', err))

    // ── Build Dodo checkout request ──
    const dodoRequest = new NextRequest(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: template.dodo_product_id,
            quantity: 1,
          },
        ],
        customer: {
          email: session.user.email,
          name:  session.user.name ?? session.user.email,
        },
        metadata: {
          templateSlug,
          githubUsername: cleanGithub,
          userEmail:      session.user.email,
        },
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
