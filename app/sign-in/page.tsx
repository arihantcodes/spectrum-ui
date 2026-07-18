import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { buildCreateUserUrl, isOnboardingComplete } from '@/lib/onboarding'

import { AuthShowcase } from '@/components/auth-showcase'
import { AuthPanel } from '@/components/auth-panel'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const session = await auth()
  const callbackUrl = searchParams.callbackUrl ?? '/'

  if (session?.user?.email) {
    const onboardingComplete = await isOnboardingComplete(session.user.email)
    if (!onboardingComplete) {
      redirect(buildCreateUserUrl(callbackUrl))
    }
    redirect(callbackUrl.startsWith('/') ? callbackUrl : '/')
  }

  const postAuthRedirect = buildCreateUserUrl(callbackUrl)

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel redirectTo={postAuthRedirect} />
      <AuthShowcase />
    </div>
  )
}
