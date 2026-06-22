'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { notifyNewSponsorSubmission } from "@/lib/slack"
import { headers } from "next/headers"

import { z } from "zod"

export type SubmitResult = {
  success: boolean
  error?: string
}

const SponsorSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  contact_email: z.string().email("A valid email is required").max(100, "Email is too long"),
  product_link: z.string().url("A valid product URL is required (e.g., https://example.com)").max(255, "Product link is too long"),
  ads_title: z.string().min(3, "Ads title must be at least 3 characters").max(100, "Ads title is too long"),
  ads_description: z.string().min(10, "Ads description must be at least 10 characters").max(500, "Ads description is too long"),
  sponsor_tier: z.string().min(1, "Sponsor tier is required"),
})

export async function submitSponsorApplication(formData: FormData): Promise<SubmitResult> {
  try {
    const ipAddress = headers().get("x-forwarded-for") || "unknown"

    // --- RATE LIMITING ---
    if (ipAddress !== "unknown") {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const { count, error: countError } = await supabaseAdmin
        .from("sponsor_submissions")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ipAddress)
        .gte("created_at", oneDayAgo)

      if (countError) {
        console.error("[SponsorAction] Rate limit check error:", countError)
      } else if (count !== null && count >= 3) {
        return { success: false, error: "You have reached the maximum number of submissions (3 per day)." }
      }
    }

    // --- EXTRACT & VALIDATE FIELDS ---
    const rawData = {
      company_name: formData.get("company_name"),
      contact_email: formData.get("contact_email"),
      product_link: formData.get("product_link"),
      ads_title: formData.get("ads_title"),
      ads_description: formData.get("ads_description"),
      sponsor_tier: formData.get("sponsor_tier"),
    }

    const parsed = SponsorSchema.safeParse(rawData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message }
    }

    const validatedData = parsed.data
    const imageFile = formData.get("image_ads") as File | null

    // --- FILE UPLOAD ---
    let imageAdsUrl = null
    if (imageFile && imageFile.size > 0) {
      // Basic check, you might want to restrict file types or sizes further
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("sponsor_assets")
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error("[SponsorAction] File upload error:", uploadError)
        return { success: false, error: "Failed to upload image. Please try again." }
      }

      if (uploadData) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from("sponsor_assets")
          .getPublicUrl(uploadData.path)
        imageAdsUrl = publicUrlData.publicUrl
      }
    }

    // --- PAYLOAD CONSTRUCTION ---
    const payload = {
      company_name: validatedData.company_name.trim(),
      contact_email: validatedData.contact_email.trim().toLowerCase(),
      product_link: validatedData.product_link.trim(),
      ads_title: validatedData.ads_title.trim(),
      ads_description: validatedData.ads_description.trim(),
      sponsor_tier: validatedData.sponsor_tier.trim(),
      image_ads_url: imageAdsUrl,
      ip_address: ipAddress,
    }

    // --- DB INSERTION ---
    const { error: dbError } = await supabaseAdmin
      .from("sponsor_submissions")
      .insert([payload])

    if (dbError) {
      console.error("[SponsorAction] Database insertion error:", dbError)
      return { success: false, error: "Failed to store application in the database." }
    }

    // --- NOTIFICATION ---
    try {
      await notifyNewSponsorSubmission({
        companyName: payload.company_name,
        website: payload.product_link,
        contactName: "N/A", // Deprecated field in UI
        contactEmail: payload.contact_email,
        sponsorTier: payload.sponsor_tier,
        message: `**Ads Title**: ${payload.ads_title}\n**Ads Description**: ${payload.ads_description}${payload.image_ads_url ? `\n**Image URL**: ${payload.image_ads_url}` : ""}`,
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
