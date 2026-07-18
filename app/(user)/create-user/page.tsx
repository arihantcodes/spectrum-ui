import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AuthShowcase } from '@/components/auth-showcase'
import Link from 'next/link'
import { Icons } from '@/components/icon'
import { OnboardingForm } from './onboarding-form'
import { isOnboardingComplete } from '@/lib/onboarding'

export default async function CreateUserPage({
  searchParams,
}: {
  searchParams: { next?: string }
}) {
  const session = await auth()
  if (!session?.user?.email) redirect('/sign-in')

  const nextUrl = searchParams.next ?? '/'

  if (await isOnboardingComplete(session.user.email)) {
    redirect(nextUrl.startsWith('/') ? nextUrl : '/')
  }

  const { user } = session
  const defaultGithub = user.githubUsername ?? ''

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col bg-white dark:bg-[#080808] px-6 sm:px-12 lg:px-16 xl:px-20 transition-colors">
        <div className="flex items-center justify-between pt-8 pb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 bg-neutral-100 dark:bg-white border border-neutral-200 dark:border-transparent rounded-lg flex items-center justify-center p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
              <Icons.logo className="h-full w-full text-black" />
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-[#F5F5F5] tracking-tight">
              Spectrum UI
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-[420px] w-full mx-auto">
          <div className="flex items-center gap-5 mb-8">
            <Avatar className="h-16 w-16 ring-4 ring-neutral-100 dark:ring-[#161616] shadow-md shrink-0">
              <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
              <AvatarFallback className="text-xl bg-neutral-100 dark:bg-[#1a1a1a] text-neutral-600 dark:text-[#888]">
                {user.name?.[0]?.toUpperCase() ?? 'U'}
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

          <OnboardingForm
            userName={user.name ?? ''}
            userEmail={user.email ?? ''}
            defaultGithub={defaultGithub}
            nextUrl={nextUrl}
          />
        </div>

        <div className="pb-8" />
      </div>
      <AuthShowcase />
    </div>
  )
}
