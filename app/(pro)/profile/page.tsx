import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import {
  IconBrandGithub,
  IconUser,
  IconCreditCard,
  IconHelp,
  IconArrowLeft,
  IconLogout,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { supabaseAdmin } from '@/lib/supabase-admin'
import Link from 'next/link'

function SidebarItem({ 
  icon: Icon, 
  label, 
  href, 
  active = false 
}: { 
  icon: React.ElementType
  label: string 
  href?: string 
  active?: boolean 
}) {
  const classes = `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors w-full ${
    active
      ? 'bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-900 dark:text-[#F5F5F5] font-medium'
      : 'text-neutral-500 dark:text-[#666] hover:text-neutral-900 dark:hover:text-[#ccc] hover:bg-neutral-50 dark:hover:bg-[#111]'
  }`

  if (href) {
    return (
      <Link href={href} className={classes}>
        <Icon size={16} />
        {label}
      </Link>
    )
  }

  return (
    <div className={classes}>
      <Icon size={16} />
      {label}
    </div>
  )
}

function ProfileRow({
  label,
  value,
  trailing,
}: {
  label: string
  value: React.ReactNode
  trailing?: React.ReactNode
}) {
  return (
    <div className="py-5 flex items-center justify-between gap-4 border-b border-neutral-100 dark:border-[#1a1a1a] last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-neutral-900 dark:text-[#F5F5F5] mb-0.5">{label}</p>
        <div className="text-sm text-neutral-500 dark:text-[#666]">{value}</div>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  )
}

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
    <div className="min-h-screen bg-white dark:bg-[#080808] transition-colors">
      <div className="max-w-5xl mx-auto flex min-h-screen">

        {/* ─── Sidebar ─── */}
        <aside className="w-56 shrink-0 border-r border-neutral-100 dark:border-[#151515] py-8 pr-6 hidden md:flex flex-col">
          
          {/* Back link */}
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-[#555] hover:text-neutral-700 dark:hover:text-[#999] transition-colors mb-8 group"
          >
            <IconArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>

          {/* Nav items */}
          <nav className="flex flex-col gap-0.5">
            <SidebarItem icon={IconUser} label="Account" active />
            {/* <SidebarItem icon={IconCreditCard} label="Billing" href="/dashboard" /> */}
            <SidebarItem icon={IconBrandGithub} label="GitHub" href={`https://github.com/arihantcodes/spectrum-ui`} />
            <SidebarItem icon={IconHelp} label="Help" href="mailto:jainari1208@gmail.com" />
          </nav>

          {/* Log out */}
          <div className="mt-6">
            <form action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}>
              <button
                type="submit"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-500 dark:text-[#666] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full cursor-pointer"
              >
                <IconLogout size={16} />
                Log out
              </button>
            </form>
          </div>
        </aside>

        {/* ─── Main content ─── */}
        <main className="flex-1 py-8 px-6 md:pl-10 md:pr-0">

          {/* Mobile back + title */}
          <div className="flex items-center gap-3 mb-2 md:hidden">
            <Link 
              href="/"
              className="text-neutral-400 dark:text-[#555] hover:text-neutral-700 dark:hover:text-[#999] transition-colors"
            >
              <IconArrowLeft size={18} />
            </Link>
          </div>

          <h1 className="text-xl font-bold text-neutral-900 dark:text-[#F5F5F5] mb-1 tracking-tight">
            Account
          </h1>
          
          {/* Divider */}
          <div className="h-px bg-neutral-100 dark:bg-[#1a1a1a] mt-4" />

          {/* Profile fields */}
          <div className="max-w-xl">
            <ProfileRow
              label="Name"
              value={user.name ?? 'Not provided'}
              trailing={
                // <button className="text-xs font-medium text-neutral-700 dark:text-[#999] border border-neutral-200 dark:border-[#2a2a2a] px-3.5 py-1.5 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#111] transition-colors cursor-pointer">
                //   Edit
                // </button>
                null
              }
            />

            <ProfileRow
              label="Avatar"
              value="Your profile picture"
              trailing={
                <Avatar className="h-12 w-12 ring-2 ring-neutral-100 dark:ring-[#1a1a1a] shadow-sm">
                  <AvatarImage src={user.avatar_url ?? ""} alt={user.name ?? ""} />
                  <AvatarFallback className="text-lg bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-[#666]">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              }
            />

            <ProfileRow
              label="Email"
              value={user.email}
            />

            <ProfileRow
              label="GitHub Username"
              value={
                <span className="font-mono text-sm">
                  @{user.github_username ?? 'Not provided'}
                </span>
              }
            />

            {/*  */}
          </div>

          {/* Mobile nav */}
          <div className="md:hidden mt-12 pt-6 border-t border-neutral-100 dark:border-[#1a1a1a] space-y-1">
            <SidebarItem icon={IconCreditCard} label="Billing" href="/dashboard" />
            <SidebarItem icon={IconBrandGithub} label="GitHub" href={`https://github.com/${user.github_username}`} />
            <SidebarItem icon={IconHelp} label="Help" href="mailto:jainari1208@gmail.com" />
            <div className="pt-3">
              <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}>
                <button
                  type="submit"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-500 dark:text-[#666] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full cursor-pointer"
                >
                  <IconLogout size={16} />
                  Log out
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
