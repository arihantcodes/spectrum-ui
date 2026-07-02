import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data, error } = await supabaseAdmin.from('users').select('email, welcome_email_sent, github_username, building_type').eq('welcome_email_sent', false);
  console.log("Users with welcome_email_sent=false:", data);
}

run();
