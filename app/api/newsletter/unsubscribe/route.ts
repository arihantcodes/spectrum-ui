import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, token } = body

    if (!email || !token) {
      return NextResponse.json(
        { error: "Invalid unsubscribe request." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Verify token matches the email
    const { data: subscriber } = await supabaseAdmin
      .from("waitlist")
      .select("email, unsubscribe_token, unsubscribed")
      .eq("email", normalizedEmail)
      .eq("unsubscribe_token", token)
      .single()

    if (!subscriber) {
      return NextResponse.json(
        { error: "Invalid or expired unsubscribe link." },
        { status: 400 }
      )
    }

    if (subscriber.unsubscribed) {
      return NextResponse.json(
        { message: "You're already unsubscribed." },
        { status: 200 }
      )
    }

    // Toggle unsubscribed flag — keep the row
    const { error } = await supabaseAdmin
      .from("waitlist")
      .update({ unsubscribed: true })
      .eq("email", normalizedEmail)

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json(
        { error: "Failed to unsubscribe. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "You've been unsubscribed. We're sorry to see you go." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Unsubscribe API error:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
