import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Icons } from '@/components/icon';
import { isOnboardingComplete } from '@/lib/onboarding';
import { OnboardingForm } from './onboarding-form';

export default async function CreateUserPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await auth();
  if (!session?.user?.email) redirect('/sign-in');

  const nextUrl = searchParams.next ?? '/';

  if (await isOnboardingComplete(session.user.email)) {
    redirect(nextUrl.startsWith('/') ? nextUrl : '/');
  }

  const { user } = session;

  return (
    // Same framed band as sign-in/sign-up: side borders at 1400px, bottom
    // border hands off to the footer; the global navbar provides the chrome.
    <div className="container-frame border-b border-border bg-background">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-[400px] flex-col justify-center px-5 py-12">
        <div className="auth-enter flex justify-center">
          {/* Same rounded-tile logo treatment as the navbar — the bare mark
              reads as a harsh black box at this size. */}
          <span className="flex size-10 items-center justify-center rounded-xl bg-foreground p-2 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            <Icons.logo className="size-full text-background" />
          </span>
        </div>

        <div className="auth-enter mt-2 text-center" style={{ animationDelay: '60ms' }}>
          <h1 className="mt-2 font-spectral text-[30px] font-normal leading-[1.05] tracking-[-0.055em] text-foreground [text-wrap:balance] sm:text-[34px]">
            One Last Detail.
          </h1>
          <p className="text-sm text-neutral-500 max-w-[20rem] mx-auto">
            Enter your github Username then you can access all the components.
          </p>
        </div>

        <OnboardingForm
          userName={user.name ?? ''}
          userEmail={user.email ?? ''}
          userImage={user.image ?? ''}
          defaultGithub={user.githubUsername ?? ''}
          nextUrl={nextUrl}
        />
      </div>
    </div>
  );
}
