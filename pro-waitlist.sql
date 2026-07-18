-- Spectrum Pro paid waitlist table
-- Run this in Supabase before enabling Pro waitlist checkout.

CREATE TABLE IF NOT EXISTS pro_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  github_username TEXT NOT NULL,
  payment_id TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'refunded', 'converted')),
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pro_waitlist_email ON pro_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_payment_id ON pro_waitlist(payment_id);
