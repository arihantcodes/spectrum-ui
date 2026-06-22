'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { notifyNewSponsorSubmission } from "@/lib/slack"

export type SubmitResult = {
  success: boolean
  error?: string
}

export async function submitSponsorApplication(formData: FormData): Promise<SubmitResult> {
  try {
    const companyName = formData.get("company_name")
    const website = formData.get("website")
    const contactName = formData.get("contact_name")
    const contactEmail = formData.get("contact_email")
    const sponsorTier = formData.get("sponsor_tier")
    const message = formData.get("message")

    // Basic Validation
    if (!companyName || typeof companyName !== "string" || companyName.trim() === "") {
      return { success: false, error: "Company name is required." }
    }
    if (!website || typeof website !== "string" || website.trim() === "") {
      return { success: false, error: "Website URL is required." }
    }
    if (!contactName || typeof contactName !== "string" || contactName.trim() === "") {
      return { success: false, error: "Contact name is required." }
    }
    if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.includes("@")) {
      return { success: false, error: "A valid contact email is required." }
    }
    if (!sponsorTier || typeof sponsorTier !== "string" || sponsorTier.trim() === "") {
      return { success: false, error: "Sponsor tier is required." }
    }

    const payload = {
      company_name: companyName.trim(),
      website: website.trim(),
      contact_name: contactName.trim(),
      contact_email: contactEmail.trim().toLowerCase(),
      sponsor_tier: sponsorTier.trim(),
      message: message && typeof message === "string" ? message.trim() : null,
    }

    // Insert into Supabase table bypassing client RLS via service role
    const { error: dbError } = await supabaseAdmin
      .from("sponsor_submissions")
      .insert([payload])

    if (dbError) {
      console.error("[SponsorAction] Database insertion error:", dbError)
      return { success: false, error: "Failed to store application in the database." }
    }

    // Send Slack alert asynchronously
    try {
      await notifyNewSponsorSubmission({
        companyName: payload.company_name,
        website: payload.website,
        contactName: payload.contact_name,
        contactEmail: payload.contact_email,
        sponsorTier: payload.sponsor_tier,
        message: payload.message,
      })
    } catch (slackErr) {
      console.error("[SponsorAction] Slack notification failed:", slackErr)
    }

    return { success: true }
  } catch (err: any) {
    console.error("[SponsorAction] Unexpected error:", err)
    return { success: false, error: err?.message || "An unexpected error occurred." }
  }
}
