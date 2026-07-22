import { redirect } from 'next/navigation';

import { AuthPage } from '@/components/auth-page';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; mode?: string };
}) {
  const callbackUrl = searchParams.callbackUrl ?? '/';

  // Keep old bookmarked links working while giving account creation its own
  // explicit route and page state.
  if (searchParams.mode === 'signup') {
    const query = callbackUrl === '/' ? '' : `?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    redirect(`/sign-up${query}`);
  }

  return <AuthPage callbackUrl={callbackUrl} mode="signin" />;
}
