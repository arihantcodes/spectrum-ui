import { createClient } from '@supabase/supabase-js'

// Initialize a Server-Side Admin Client to safely bypass RLS policies
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SyncParams {
  email: string
  name?: string | null
  image?: string | null
  githubUsername?: string | null
}

export async function syncUser({ email, name, image, githubUsername }: SyncParams) {
  console.log(`[syncUser] Attempting to sync user: ${email}`)

  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(
      {
        email:           email,
        name:            name ?? null,
        avatar_url:      image ?? null,
        github_username: githubUsername ?? null,
        last_sign_in:    new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select()

  if (error) {
    console.error('[syncUser] Supabase UPSERT Error:', error.message, error)
  } else {
    console.log('[syncUser] Successfully synced user')
  }
}

