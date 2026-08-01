import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const rateLimitStore = new Map();
const RATE_LIMIT_TIME_FRAME = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per IP per time frame

function rateLimit(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");

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

  return true; 
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

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const {
      name = "",
      email = "",
      country = "",
      purpose = "",
      feedbackLike = "",
      feedbackImprove = "",
      componentName = "",
      componentDetails = "",
      hireProject = "",
      hireType = "",
      hireBudget = "",
      other = "",
    } = body || {};

    const safe = (val: unknown) => (typeof val === "string" ? val : "");

    const summaryRows = [
      ["Name", safe(name)],
      ["Email", safe(email)],
      ["Country", safe(country)],
      ["Purpose", safe(purpose)],
      ["Feedback - Like", safe(feedbackLike)],
      ["Feedback - Improve", safe(feedbackImprove)],
      ["Requested Component", safe(componentName)],
      ["Component Details", safe(componentDetails)],
      ["Hire - Project", safe(hireProject)],
      ["Hire - Type", safe(hireType)],
      ["Hire - Budget", safe(hireBudget)],
      ["Other", safe(other)],
    ].filter(([, v]) => v && String(v).trim().length > 0);

    const summaryTable = `
      <table style="border-collapse:collapse;width:100%;max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)" cellpadding="0" cellspacing="0">
        <tbody>
          ${summaryRows
            .map(
              ([k, v], index) => `
            <tr style="background:${index % 2 === 0 ? '#fafafa' : '#ffffff'}">
              <td style="font-weight:600;white-space:nowrap;padding:16px;border-bottom:1px solid #e5e5e5;color:#171717;font-size:14px;width:30%">${k}</td>
              <td style="padding:16px;border-bottom:1px solid #e5e5e5;color:#525252;font-size:14px;line-height:1.5">${String(v).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    `;

    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <!-- Header -->
          <div style="background:#171717;padding:32px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:-0.025em">New Contact Form Submission</h1>
            <p style="margin:8px 0 0;color:#a3a3a3;font-size:16px">Spectrum UI Contact Form</p>
          </div>
          
          <!-- Content -->
          <div style="padding:32px">
            <div style="background:#f5f5f5;border-left:4px solid #525252;padding:16px;border-radius:6px;margin-bottom:24px">
              <p style="margin:0;color:#171717;font-size:16px;font-weight:500">📧 You have received a new submission from your contact form</p>
            </div>
            
            <h2 style="color:#171717;font-size:20px;font-weight:600;margin:0 0 24px;letter-spacing:-0.025em">Submission Details</h2>
            ${summaryTable}
            
            <div style="margin-top:32px;padding:20px;background:#fafafa;border-radius:8px;text-align:center">
              <p style="margin:0;color:#737373;font-size:14px">This email was automatically generated from your Spectrum UI contact form</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Spectrum UI</title>
      </head>
      <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
          <!-- Header -->
          <div style="background:#171717;padding:32px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:-0.025em">Thank You!</h1>
            <p style="margin:8px 0 0;color:#a3a3a3;font-size:16px">We've received your message</p>
          </div>
          
          <!-- Content -->
          <div style="padding:32px">
            <div style="background:#f5f5f5;border-left:4px solid #525252;padding:20px;border-radius:6px;margin-bottom:24px">
              <h2 style="margin:0 0 8px;color:#171717;font-size:18px;font-weight:600">✅ Message Received</h2>
              <p style="margin:0;color:#525252;font-size:16px;line-height:1.5">Hi ${safe(name) || "there"}, thank you for reaching out to us! We've received your message and will get back to you within 1 business day.</p>
            </div>
            
            <h3 style="color:#171717;font-size:18px;font-weight:600;margin:0 0 16px">Your Submission Summary</h3>
            <p style="color:#737373;font-size:14px;margin:0 0 20px">Here's a copy of what you submitted:</p>
            ${summaryTable}
            
            <div style="margin-top:32px;padding:24px;background:#fafafa;border-radius:8px;text-align:center">
              <h3 style="margin:0 0 12px;color:#171717;font-size:16px;font-weight:600">What's Next?</h3>
              <p style="margin:0 0 16px;color:#737373;font-size:14px;line-height:1.5">Our team will review your message and respond within 24 hours. We're excited to help you!</p>
              <div style="display:inline-block;background:#171717;color:#ffffff;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:500;text-decoration:none">
                🚀 Building amazing UIs together
              </div>
            </div>
            
            <div style="margin-top:32px;padding:20px;background:#f5f5f5;border-radius:8px;text-align:center;border-top:1px solid #e5e5e5">
              <p style="margin:0 0 8px;color:#171717;font-size:16px;font-weight:600">Best regards,</p>
              <p style="margin:0;color:#737373;font-size:14px">The Spectrum UI Team</p>
              <p style="margin:8px 0 0;color:#a3a3a3;font-size:12px">Building the future of web interfaces</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to admin/owner
    await resend.emails.send({
      from: "onboarding@spectrumhq.in",
      to: process.env.EMAIL || "arihantjain7000@gmail.com",
      subject: `New ${purpose ? `${purpose} ` : ""}submission from ${safe(name) || "Unknown"}`,
      html: adminHtml,
    });

    // Send confirmation to user if email provided
    if (email && typeof email === "string") {
      await resend.emails.send({
        from: "onboarding@spectrumhq.in",
        to: email,
        subject: "We received your message — Spectrum UI",
        html: userHtml,
      });
    }

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
