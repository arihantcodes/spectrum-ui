import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { sendWelcomeNewsletterEmail } from "@/lib/resend"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if already exists
    const { data: existing } = await supabaseAdmin
      .from("waitlist")
      .select("email, unsubscribed")
      .eq("email", normalizedEmail)
      .single()

    if (existing) {
      // If they unsubscribed before, re-subscribe them
      if (existing.unsubscribed) {
        await supabaseAdmin
          .from("waitlist")
          .update({ unsubscribed: false })
          .eq("email", normalizedEmail)

        return NextResponse.json(
          { message: "Welcome back! You're re-subscribed." },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      )
    }

    // Generate unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString("hex")

    // Insert new subscriber
    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert({
        email: normalizedEmail,
        unsubscribe_token: unsubscribeToken,
      })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      )
    }

    // Send welcome email (non-blocking — don't fail the subscription if email fails)
    sendWelcomeNewsletterEmail(normalizedEmail, unsubscribeToken).catch((err) => {
      console.error("Failed to send welcome email:", err)
    })

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Newsletter API error:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
