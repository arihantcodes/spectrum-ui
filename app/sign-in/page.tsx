import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { AuthShowcase } from '@/components/auth-showcase';
import { AuthPanel } from '@/components/auth-panel';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session?.user) {
    redirect(searchParams.callbackUrl ?? '/dashboard');
  }

  const callbackUrl = searchParams.callbackUrl ?? '/';
  const postAuthRedirect = `/create-user${callbackUrl !== '/' ? `?next=${encodeURIComponent(callbackUrl)}` : ''}`;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel redirectTo={postAuthRedirect} />
      {/* Left: auth panel */}
   

      {/* Right: auth showcase */}
      <AuthShowcase />
    </div>
  );
}
