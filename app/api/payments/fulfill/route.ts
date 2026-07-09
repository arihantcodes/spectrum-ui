import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fulfillPaymentById } from '@/lib/fulfill-payment'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { paymentId?: string; email?: string }
    const paymentId = body.paymentId?.trim()

    if (!paymentId) {
      return NextResponse.json({ error: 'paymentId is required' }, { status: 400 })
    }

    const session = await auth()
    const sessionEmail = session?.user?.email?.toLowerCase()
    const fallbackEmail = body.email?.toLowerCase() ?? sessionEmail

    if (!fallbackEmail && !sessionEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await fulfillPaymentById(paymentId, {
      email: fallbackEmail ?? sessionEmail,
    })

    if (
      sessionEmail &&
      fallbackEmail &&
      sessionEmail !== fallbackEmail &&
      result.type === 'pro_waitlist'
    ) {
      return NextResponse.json({ error: 'Payment email mismatch' }, { status: 403 })
    }

    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fulfillment failed'
    console.error('[payments/fulfill]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
