/* ─────────────────────────────────────────────────────────────
 *  Spectrum Chat — Supabase Client (browser-side singleton)
 * ───────────────────────────────────────────────────────────── */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

/**
 * Shared Supabase client instance.
 *
 * Uses the **anon** key only — never expose the service_role key
 * on the client side.  Realtime is enabled by default.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
