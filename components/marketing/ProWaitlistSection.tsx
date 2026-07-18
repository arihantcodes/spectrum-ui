import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ProWaitlistCard } from './ProWaitlistCard'

export async function ProWaitlistSection() {
  const session = await auth()
  let alreadyJoined = false

  if (session?.user?.email) {
    const { count } = await supabaseAdmin
      .from('pro_waitlist')
      .select('id', { count: 'exact', head: true })
      .eq('email', session.user.email.toLowerCase())
      .eq('status', 'active')

    alreadyJoined = (count ?? 0) > 0
  }

  return <ProWaitlistCard alreadyJoined={alreadyJoined} />
}
