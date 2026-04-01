import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

const rateLimitStore = new Map();
const RATE_LIMIT_TIME_FRAME = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per IP per time frame

function rateLimit(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.ip;

  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, lastRequest: now });
  } else {
    const rateLimitData = rateLimitStore.get(ip);
    if (now - rateLimitData.lastRequest > RATE_LIMIT_TIME_FRAME) {
      // Reset the rate limit for the IP if the time frame has passed
      rateLimitStore.set(ip, { count: 1, lastRequest: now });
    } else {
      // Increment the request count for the IP
      rateLimitData.count++;
      rateLimitData.lastRequest = now;

      if (rateLimitData.count > RATE_LIMIT_MAX_REQUESTS) {
        return false; // Rate limit exceeded
      }
    }
  }

  return true; // Within the rate limit
}

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(request)) {
      return NextResponse.json(
        {
          message: "Too many requests. Please try again later.",
          success: false,
        },
        { status: 429 },
      );
    }

    const formData = await request.formData();
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const email = formData.get("email") as string;
    const screenshot = formData.get("screenshot") as File;

    // Convert screenshot to base64 if provided
    let screenshotBase64 = "";
    if (screenshot && screenshot.size > 0) {
      const bytes = await screenshot.arrayBuffer();
      screenshotBase64 = Buffer.from(bytes).toString("base64");
    }

    // Store in Supabase
    const ip = request.headers.get("x-forwarded-for") || request.ip || "";
    const { error: dbError } = await supabaseAdmin
      .from("component_requests")
      .insert({
        description,
        url: url || null,
        email,
        screenshot_base64: screenshotBase64 || null,
        ip_address: ip,
      });

    if (dbError) {
      console.error("Failed to store component request:", dbError);
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL || "arihantjain7000@gmail.com",
      subject: "New Component Request",
      html: `
        <h1>New Component Request</h1>
        <h2>Description:</h2>
        <p>${description}</p>
        ${url ? `<h2>URL:</h2><p>${url}</p>` : ""}
        ${email ? `<h2>Contact Email:</h2><p>${email}</p>` : ""}
        ${
          screenshotBase64
            ? `<h2>Screenshot:</h2><img src="data:image/png;base64,${screenshotBase64}" />`
            : ""
        }
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
