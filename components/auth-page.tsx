import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { AuthPanel, type AuthMode } from '@/components/auth-panel';
import { buildCreateUserUrl, isOnboardingComplete } from '@/lib/onboarding';

export async function AuthPage({
  callbackUrl = '/',
  mode,
}: {
  callbackUrl?: string;
  mode: AuthMode;
}) {
  const session = await auth();

  if (session?.user?.email) {
    const onboardingComplete = await isOnboardingComplete(session.user.email);
    if (!onboardingComplete) {
      redirect(buildCreateUserUrl(callbackUrl));
    }
    redirect(callbackUrl.startsWith('/') ? callbackUrl : '/');
  }

  return (
    <AuthPanel redirectTo={buildCreateUserUrl(callbackUrl)} callbackUrl={callbackUrl} mode={mode} />
  );
}
