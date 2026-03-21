-- Since the templates table is already created, here is the script to seed it.

-- 1. Seed test template for Nova SaaS (matches DODO_SAAS_TEMPLATE_PRODUCT_ID in .env)
-- Note: Price is in cents, so 5900 = $59
INSERT INTO templates (
  slug,
  name,
  tagline,
  description,
  price,
  category,
  tech_stack,
  preview_url,
  thumbnail_url,
  github_repo,
  is_published,
  sort_order
) VALUES (
  'nova-saas',
  'Nova SaaS',
  'The ultimate Next.js SaaS starter kit',
  'A complete Next.js 14 boilerplate with authentication, database setup, and Dodo payments checkout flow built-in.',
  5900,
  'saas',
  ARRAY['Next.js', 'React', 'TailwindCSS', 'Supabase', 'Dodo Payments'],
  'https://demo.spectrumhq.in/nova-saas',
  'https://spectrumhq.in/thumbnails/nova-saas.png',
  'spectrum-ui-pro/nova-saas',
  true,
  1
) ON CONFLICT (slug) DO UPDATE 
SET 
  name = EXCLUDED.name, 
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  github_repo = EXCLUDED.github_repo;


-- 2. If you haven't created the orders table yet, here is the schema to run:
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    github_username TEXT NOT NULL,
    template_slug TEXT NOT NULL REFERENCES templates(slug) ON DELETE RESTRICT,
    payment_id TEXT UNIQUE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'active',
    github_access_granted BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
