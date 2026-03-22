/**
 * ─────────────────────────────────────────────────────────────
 *  Spectrum — Manual Purchase Simulator
 *  
 *  Usage: bun scripts/simulate-purchase.ts
 * ───────────────────────────────────────────────────────────── */

import { supabaseAdmin as supabase } from '../lib/supabase-admin';

// --- SETTINGS FOR TEST ---
const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";
const TEST_SLUG  = "nova-saas";
const TEST_GH    = process.env.TEST_GITHUB_USER || "test-user"; 
// -------------------------

async function simulate() {
  console.log(`\n🚀 Simulating purchase for: ${TEST_EMAIL}...`);

  // 1. Get template price/name just like the webhook would
  const { data: template, error: tError } = await supabase
    .from('templates')
    .select('name, price')
    .eq('slug', TEST_SLUG)
    .single();

  if (tError || !template) {
    console.error("❌ Template not found in DB. Did you run the seed?");
    return;
  }

  // 2. Insert into orders table
  const payment_id = `sim_${Math.random().toString(36).substring(7)}`;
  
  const { data, error } = await supabase
    .from('orders')
    .insert({
      email:           TEST_EMAIL.toLowerCase().trim(),
      github_username: TEST_GH,
      template_slug:   TEST_SLUG,
      payment_id:      payment_id,
      amount:          template.price,
      currency:        'USD',
      status:          'active',
      github_access_granted: true, 
      email_sent:            true,
    })
    .select();

  if (error) {
    console.error("❌ Failed to create order:", error.message);
  } else {
    console.log("✅ Success! Order created in Supabase.");
    console.log(`   ID: ${data[0].id}`);
    console.log(`   Payment ID: ${payment_id}`);
    console.log("\n👉 Refresh http://localhost:3000/dashboard now!");
  }
}

simulate();
