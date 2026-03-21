import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/sign-in')

  // Enforce DB existence validation before revealing Dashboard
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.user?.email!)
    .single()

  if (!user) {
    redirect('/create-user')
  }

  return <>{children}</>
}
