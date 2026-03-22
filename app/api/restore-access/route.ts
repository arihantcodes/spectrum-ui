import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { handlePaymentSucceeded } from '../webhook/route'

export async function POST(req: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { paymentId } = await req.json()

  if (!paymentId) {
    return NextResponse.json({ error: 'Payment ID required' }, { status: 400 })
  }

  try {
    // 1. Verify the order belongs to this user
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_id', paymentId)
      .eq('email', session.user.email)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 2. Re-trigger the same idempotent logic we use in the webhook
    // We construct a payload that matches what handlePaymentSucceeded expects
    const mockPayload = {
      data: {
        payment_id:   order.payment_id,
        total_amount: order.amount,
        currency:     order.currency,
        metadata: {
          templateSlug:   order.template_slug,
          githubUsername: order.github_username,
          userEmail:      order.email,
        }
      }
    }

    await handlePaymentSucceeded(mockPayload)

    return NextResponse.json({ success: true, message: 'Access restoration triggered' })
  } catch (err) {
    console.error('Error restoring access:', err)
    return NextResponse.json(
      { error: 'Failed to restore access. Please check your GitHub username and try again.' }, 
      { status: 500 }
    )
  }
}
