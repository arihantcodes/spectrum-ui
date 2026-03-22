import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { completeUserProfile } from './actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconBrandGithub } from '@tabler/icons-react'
import { supabaseAdmin } from '@/lib/supabase-admin'

export default async function CreateUserPage() {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')

  // If already exists in DB, send them securely to dashboard
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single()
    
  if (existingUser) {
    redirect('/dashboard')
  }

  const { user } = session
  const defaultGithub = user.githubUsername ?? ''
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-md bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] rounded-2xl p-8 shadow-sm dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-2">Almost there!</h1>
          <p className="text-sm text-neutral-500 dark:text-[#666]">
            Confirm your details to access your templates.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-[#161616] shadow-md">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback className="text-2xl">{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
        </div>

        <form action={completeUserProfile} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider">
              Full Name
            </label>
            <input 
              type="text" 
              disabled 
              value={user.name ?? ''}
              className="w-full bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2A2A2A] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-lg text-sm cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider">
              Email Address
            </label>
            <input 
              type="email" 
              disabled 
              value={user.email ?? ''}
              className="w-full bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2A2A2A] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-lg text-sm cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-900 dark:text-[#CCC] uppercase tracking-wider flex items-center justify-between">
              <span>GitHub Username</span>
              <span className="text-[10px] text-neutral-400 dark:text-[#555] normal-case tracking-normal font-normal">Required for repo access</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <IconBrandGithub size={16} className="text-neutral-400 dark:text-[#555]" />
              </div>
              <input 
                type="text" 
                name="github_username"
                required
                defaultValue={defaultGithub}
                placeholder="e.g. torvalds"
                className="w-full bg-white dark:bg-[#0C0C0C] border border-neutral-300 dark:border-[#333] focus:border-[#6366F1] dark:focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] text-neutral-900 dark:text-[#F5F5F5] pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-[#444]"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white py-6 rounded-xl font-semibold shadow-sm text-sm">
              Complete Setup →
            </Button>
          </div>

        </form>

      </div>
    </div>
  )
}
