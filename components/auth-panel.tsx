'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useFormStatus } from 'react-dom';

import { signInWithProvider } from '@/app/sign-in/actions';
import { Icons } from '@/components/icon';
import { cn } from '@/lib/utils';

export type AuthMode = 'signin' | 'signup';

const COPY: Record<AuthMode, { heading: string; subheading: string; verb: string }> = {
  signin: {
    heading: 'Welcome back',
    subheading: 'Sign in to continue to Spectrum UI.',
    verb: 'Continue',
  },
  signup: {
    heading: 'Create your account',
    subheading: 'Start building with 250+ components. Free.',
    verb: 'Sign up',
  },
};

function GitHubIcon() {
  return (
    <svg
      className="size-[18px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="size-[18px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function ProviderSubmitButton({
  variant,
  icon,
  children,
}: {
  variant: 'primary' | 'soft';
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        'flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-medium outline-none',
        'transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out',
        // Press feedback lives on :active so it fires on pointer-down.
        'active:scale-[0.98]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-wait disabled:opacity-60 disabled:active:scale-100',
        variant === 'primary'
          ? // The one lit control on the page. In dark it glows like the
            // Revolut reference; in light a grounded shadow does the lifting.
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_-8px_rgba(0,0,0,0.4)] dark:shadow-[0_0_28px_rgba(255,255,255,0.22),0_1px_3px_rgba(0,0,0,0.5)]'
          : // Translucent material pill — same language as the reference's
            // secondary actions.
            'bg-black/[0.045] text-foreground shadow-[0_0_0_1px_hsl(var(--border))] hover:bg-black/[0.08] dark:bg-white/[0.07] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/[0.1]',
      )}
    >
      {pending ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
          />
          Connecting…
        </>
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export function AuthPanel({
  redirectTo,
  callbackUrl,
  mode: initialMode,
}: {
  redirectTo: string;
  callbackUrl: string;
  mode: AuthMode;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const copy = COPY[mode];
  const githubAction = signInWithProvider.bind(null, 'github', redirectTo);
  const googleAction = signInWithProvider.bind(null, 'google', redirectTo);
  const callbackQuery =
    callbackUrl === '/' ? '' : `?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  // Switching modes is presentation-only, so it happens instantly on the
  // client; replaceState keeps the URL bookmarkable without a server roundtrip.
  const handleModeChange = (value: string) => {
    const next = value as AuthMode;
    setMode(next);
    const path = next === 'signup' ? '/sign-up' : '/sign-in';
    window.history.replaceState(window.history.state, '', `${path}${callbackQuery}`);
  };

  return (
    // Same framed band the rest of the site uses: side borders at 1400px,
    // bottom border hands off to the footer. No card, no backdrop — a plain
    // neutral page; the column is centered but its content reads left-aligned.
    <div className="container-frame border-b border-border bg-background">
      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-[372px] flex-col justify-center px-5 py-14">
        <div className="auth-enter flex justify-center">
          {/* Same rounded-tile logo treatment as the navbar — the bare mark
              reads as a harsh black box at this size. */}
          <span className="flex size-10 items-center justify-center rounded-xl bg-foreground p-2 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            <Icons.logo className="size-full text-background" />
          </span>
        </div>

        {/* key remounts on mode switch for a quick opacity-only crossfade;
            both variants are single-line so nothing shifts. */}
        <div
          key={mode}
          className="flex flex-col items-center justify-center mt-5 animate-[auth-fade_180ms_ease-out]"
        >
          <h1 className="font-spectral text-[23px] font-normal leading-[1.1] tracking-tighter text-foreground [text-wrap:balance] sm:text-[28px]">
            {copy.heading}
          </h1>
          <p className="mx-auto mt-2 max-w-[20rem] text-[15px] leading-relaxed text-muted-foreground">
            {copy.subheading}
          </p>
        </div>

        <TabsPrimitive.Root
          value={mode}
          onValueChange={handleModeChange}
          className="auth-enter mt-6"
          style={{ animationDelay: '60ms' }}
        >
          <TabsPrimitive.List className="relative grid h-11 grid-cols-2 rounded-full bg-black/[0.045] p-1 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)] dark:bg-white/[0.06] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]">
            {/* Sliding pill — one element translating between halves, so the
                switch reads as movement instead of two swapped states. */}
            <span
              aria-hidden="true"
              className={cn(
                'auth-pill absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-background shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_0.5px_hsl(var(--border))] dark:bg-white/[0.12] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_3px_rgba(0,0,0,0.45)]',
                mode === 'signup' && 'translate-x-full',
              )}
            />
            {(['signin', 'signup'] as const).map((value) => (
              <TabsPrimitive.Trigger
                key={value}
                value={value}
                className={cn(
                  'relative z-[1] rounded-full text-sm font-medium outline-none',
                  'transition-colors duration-150 ease-out',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'data-[state=active]:text-foreground',
                  'data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground',
                )}
              >
                {value === 'signin' ? 'Sign in' : 'Sign up'}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {(['signin', 'signup'] as const).map((value) => (
            <TabsPrimitive.Content
              key={value}
              value={value}
              className="mt-5 outline-none data-[state=active]:animate-[auth-fade_180ms_ease-out]"
            >
              <form action={githubAction}>
                <ProviderSubmitButton variant="primary" icon={<GitHubIcon />}>
                  {COPY[value].verb} with GitHub
                </ProviderSubmitButton>
              </form>

              <div
                aria-hidden="true"
                className="my-4 flex items-center gap-4 text-xs text-muted-foreground/80"
              >
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <form action={googleAction}>
                <ProviderSubmitButton variant="soft" icon={<GoogleIcon />}>
                  {COPY[value].verb} with Google
                </ProviderSubmitButton>
              </form>
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>

        <p
          className="auth-enter mt-6 text-center text-xs leading-relaxed text-muted-foreground"
          style={{ animationDelay: '120ms' }}
        >
          By continuing, you agree to our{' '}
          <Link
            href="/tos"
            className="rounded-sm font-medium text-foreground underline-offset-4 outline-none transition-colors duration-150 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="whitespace-nowrap rounded-sm font-medium text-foreground underline-offset-4 outline-none transition-colors duration-150 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
