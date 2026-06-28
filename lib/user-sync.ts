import { supabaseAdmin } from './supabase-admin'

interface SyncParams {
  email: string
  name?: string | null
  image?: string | null
  githubUsername?: string | null
  buildingType?: string | null
}

export async function syncUser({ email, name, image, githubUsername, buildingType }: SyncParams) {
  console.log(`[syncUser] Attempting to sync user: ${email}`)

  const payload: any = {
    email: email,
    last_sign_in: new Date().toISOString(),
  }

  if (name !== undefined) payload.name = name ?? null
  if (image !== undefined) payload.avatar_url = image ?? null
  if (githubUsername !== undefined) payload.github_username = githubUsername ?? null
  if (buildingType !== undefined) payload.building_type = buildingType ?? null

  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(payload, { onConflict: 'email' })
    .select()

  if (error) {
    console.error('[syncUser] Supabase UPSERT Error:', error.message, error)
  } else {
    console.log('[syncUser] Successfully synced user')
  }
}

