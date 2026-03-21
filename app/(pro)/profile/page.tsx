import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import {
  IconBrandGithub,
  IconMail,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.email) redirect('/sign-in')

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    .single()

  if (!user) redirect('/create-user')

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-1">
            Account Profile
          </h1>
          <p className="text-sm text-neutral-500 dark:text-[#666]">
            Manage your personal information
          </p>
        </div>
      </div>

      <div className="bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] rounded-2xl p-8 mb-6 shadow-sm dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
        
        <div className="flex items-center gap-6 mb-8 flex-wrap">
          <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-[#161616] shadow-sm">
            <AvatarImage src={user.avatar_url ?? ""} alt={user.name ?? ""} />
            <AvatarFallback className="text-2xl">{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-[#F5F5F5]">{user.name}</h2>
            <p className="text-neutral-500 dark:text-[#666] text-sm mt-0.5">Last active: {formatDate(user.last_sign_in)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider flex items-center gap-1.5">
              <IconMail size={14} />
              Email Address
            </label>
            <div className="w-full bg-white dark:bg-[#0C0C0C] border border-neutral-200 dark:border-[#2A2A2A] text-neutral-900 dark:text-[#F5F5F5] px-4 py-3 rounded-xl text-sm shadow-sm dark:shadow-none">
              {user.email}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider flex items-center gap-1.5">
              <IconBrandGithub size={14} />
              GitHub Username
            </label>
            <div className="w-full bg-white dark:bg-[#0C0C0C] border border-neutral-200 dark:border-[#2A2A2A] text-neutral-900 dark:text-[#F5F5F5] px-4 py-3 rounded-xl text-sm shadow-sm dark:shadow-none font-mono">
              @{user.github_username ?? 'Not provided'}
            </div>
            <p className="text-xs text-neutral-500 dark:text-[#555] mt-2">
              This username is exclusively used to grant you access to template repositories.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
