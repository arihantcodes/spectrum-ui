import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { isOnboardingComplete } from '@/lib/onboarding'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.email) redirect('/sign-in')

  if (!(await isOnboardingComplete(session.user.email))) {
    redirect('/create-user')
  }

  return <>{children}</>
}
