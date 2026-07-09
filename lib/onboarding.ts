import { supabaseAdmin } from '@/lib/supabase-admin'

export function buildCreateUserUrl(next?: string): string {
  if (!next || next === '/') return '/create-user'
  return `/create-user?next=${encodeURIComponent(next)}`
}

export async function isOnboardingComplete(email: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from('users')
    .select('github_username')
    .eq('email', email.toLowerCase())
    .single()

  return Boolean(data?.github_username?.trim())
}
