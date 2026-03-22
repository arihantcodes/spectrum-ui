import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-admin'

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
