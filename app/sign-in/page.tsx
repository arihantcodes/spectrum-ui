import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { AuthPage } from '@/components/auth-page';
import { createNoIndexMetadata } from '@/lib/metadata';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Sign In to Spectrum UI',
  description: 'Sign in to access Spectrum UI bookmarks, purchases, and account features.',
  path: '/sign-in',
});

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
