import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendApiKey = process.env.RESEND_API_KEY!;

if (!supabaseUrl || !supabaseServiceKey || !resendApiKey) {
  console.error("Missing required environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

async function sendFounderWelcomeEmail(email: string, name: string) {
  const firstName = name ? name.split(" ")[0] : "there";

  const { data, error } = await resend.emails.send({
    from: "Arihant <arihant@spectrumhq.in>",
    replyTo: "jainari1208@gmail.com",
    to: [email],
    subject: "welcome to spectrum ui / quick question",
    text: `Hey ${firstName}, 

Arihant here, founder of Spectrum UI. I just saw you create an account and wanted to personally welcome you. 

I built this project to help developers stop wasting time on repetitive styling and ship beautiful products faster. 

I have a quick question for you, if you don't mind:
What are you currently building, and what's the biggest challenge slowing down your UI development right now? 

Just hit reply and let me know. I read every single email, and it helps me decide which components to build next.

Happy coding,
Arihant`,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function runBackfill() {
  console.log("Starting welcome email backfill...");

  // 1. Fetch all users where welcome_email_sent is either false or null
  const { data: users, error: fetchError } = await supabase
    .from("users")
    .select("id, email, name, welcome_email_sent")
    .or("welcome_email_sent.is.null,welcome_email_sent.eq.false");

  if (fetchError) {
    console.error("Error fetching users from Supabase:", fetchError);
    process.exit(1);
  }

  if (!users || users.length === 0) {
    console.log("No users found to backfill. Everyone has received the email!");
    process.exit(0);
  }

  console.log(`Found ${users.length} users to email. Processing...`);

  let successCount = 0;
  let errorCount = 0;

  for (const user of users) {
    if (!user.email) continue;

    console.log(`Sending email to ${user.email}...`);

    try {
      // 2. Send the email
      await sendFounderWelcomeEmail(user.email, user.name || "");

      // 3. Mark as sent in the database
      const { error: updateError } = await supabase
        .from("users")
        .update({ welcome_email_sent: true })
        .eq("id", user.id);

      if (updateError) {
        console.error(`Failed to update DB for ${user.email}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ Success for ${user.email}`);
        successCount++;
      }

      // Add a small delay to avoid hitting Resend rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Failed to send to ${user.email}:`, err);
      errorCount++;
    }
  }

  console.log("-----------------------------------------");
  console.log("Backfill Complete!");
  console.log(`Successfully sent & updated: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  process.exit(0);
}

runBackfill();
