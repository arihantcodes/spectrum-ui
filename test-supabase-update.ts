import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const email = "sameermubasher99@gmail.com";
  const { data, error } = await supabaseAdmin
      .from('users')
      .update({ welcome_email_sent: true })
      .eq('email', email)
      .select();
  console.log("Data:", data);
  console.log("Error:", error);
}

run();
