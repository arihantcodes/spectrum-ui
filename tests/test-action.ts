import { sendFounderWelcomeEmail } from './lib/resend';
import { supabaseAdmin } from './lib/supabase-admin';

async function run() {
  const email = "sistemaempresa1391@gmail.com";
  try {
    console.log("Sending email...");
    await sendFounderWelcomeEmail(email, "Test User");
    console.log("Updating DB...");
    const { error } = await supabaseAdmin
      .from('users')
      .update({ welcome_email_sent: true })
      .eq('email', email)
      
    console.log("DB update error:", error);
  } catch (e) {
    console.error("Caught error:", e);
  }
}
run();
