import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { completeUserProfile } from './actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SubmitButton } from './submit-button'
import { IconBrandGithub } from '@tabler/icons-react'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { AuthIllustration } from '@/components/auth-illustration'
import Link from 'next/link'
import { Icons } from '@/components/icon'

export default async function CreateUserPage({
  searchParams,
}: {
  searchParams: { next?: string }
}) {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')

  const nextUrl = searchParams.next ?? '/dashboard'

  // If already exists in DB, send them securely to dashboard
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single()
    
  if (existingUser) {
    redirect(nextUrl)
  }

  const { user } = session
  const defaultGithub = user.githubUsername ?? ''
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ─── Left: Onboarding form ─── */}
      <div className="flex flex-col bg-white dark:bg-[#080808] px-6 sm:px-12 lg:px-16 xl:px-20 transition-colors">

        {/* Top bar */}
        <div className="flex items-center justify-between pt-8 pb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 bg-neutral-100 dark:bg-white border border-neutral-200 dark:border-transparent rounded-lg flex items-center justify-center p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
              <Icons.logo className="h-full w-full text-black" />
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-[#F5F5F5] tracking-tight">Spectrum UI</span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1 rounded-full bg-neutral-900 dark:bg-[#F5F5F5]" />
            <div className="w-6 h-1 rounded-full bg-neutral-200 dark:bg-[#333]" />
          </div>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex flex-col justify-center max-w-[420px] w-full mx-auto">

          {/* Avatar + heading */}
          <div className="flex items-center gap-5 mb-8">
            <Avatar className="h-16 w-16 ring-4 ring-neutral-100 dark:ring-[#161616] shadow-md shrink-0">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback className="text-xl bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-[#888]">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-1 tracking-tight">
                Almost there!
              </h1>
              <p className="text-sm text-neutral-500 dark:text-[#666]">
                Confirm your details to access code.
              </p>
            </div>
          </div>

          <form action={completeUserProfile} className="space-y-5">
            {/* Thread the next URL through so actions.ts can redirect there */}
            <input type="hidden" name="next" value={nextUrl} />
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider">
                Full Name
              </label>
              <input 
                type="text" 
                disabled 
                value={user.name ?? ''}
                className="w-full bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
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
                className="w-full bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
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
                  className="w-full bg-white dark:bg-[#0C0C0C] border border-neutral-300 dark:border-[#333] focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-neutral-900 dark:text-[#F5F5F5] pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-[#444]"
                />
              </div>
            </div>

            <div className="pt-4">
              <SubmitButton />
            </div>

          </form>

        </div>

        {/* Bottom spacer */}
        <div className="pb-8" />
      </div>

      {/* ─── Right: Dashboard illustration ─── */}
      <AuthIllustration />
    </div>
  )
}
