'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAuthGateStore } from '@/lib/auth-gate-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Icons } from '@/components/icon';
import { trackEvent } from '@/lib/events';
import { cn } from '@/lib/utils';
import { Code2, Terminal, Star, Zap } from 'lucide-react';

// GitHub SVG icon (not in lucide)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// Google SVG icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

const benefits = [
  { icon: Code2, text: 'Unlimited component code' },
  { icon: Terminal, text: 'One-click CLI installation' },
  { icon: Star, text: 'Save favorites' },
  { icon: Zap, text: 'Early access to new components' },
];

type Provider = 'github' | 'google';

export function AuthGateModal() {
  const { isOpen, close } = useAuthGateStore();
  const [pending, setPending] = useState<Provider | null>(null);

  useEffect(() => {
    if (isOpen) {
      trackEvent({ name: 'login_modal_opened' });
    } else {
      // Reset connecting state when the gate is dismissed.
      setPending(null);
    }
  }, [isOpen]);

  const handleProvider = (provider: Provider) => {
    if (pending) return;
    trackEvent({
      name: provider === 'github' ? 'github_login_started' : 'google_login_started',
    });
    setPending(provider);
    const next = window.location.pathname + window.location.search;
    signIn(provider, { redirectTo: `/create-user?next=${encodeURIComponent(next)}` });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="w-[calc(100vw-2rem)] gap-0 overflow-hidden border-border/60 bg-background p-0 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_24px_64px_-24px_rgba(0,0,0,0.35)] sm:max-w-[420px] sm:rounded-[22px] dark:border-white/8 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        aria-describedby="auth-gate-description"
      >
        {/* Ambient glow — same neutral, materials-first language as the auth
            page. Sits behind the content and never intercepts pointer events. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.04),transparent_70%)] dark:bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]"
        />

        <div className="relative flex flex-col px-7 pb-8 pt-9">
          {/* Header — logo tile mirrors the auth flow and the navbar mark. */}
          <div className="auth-enter flex flex-col items-center text-center">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-foreground p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <Icons.logo className="size-full text-background" />
            </span>

            <DialogTitle className="mt-5 font-spectral text-[24px] font-normal leading-[1.1] tracking-tighter text-foreground text-balance">
              Create your free account
            </DialogTitle>
            <DialogDescription
              id="auth-gate-description"
              className="mx-auto mt-2 max-w-76 text-[15px] leading-relaxed text-muted-foreground"
            >
              Instant access to component code, CLI commands, and more.
            </DialogDescription>
          </div>

          {/* Benefits — translucent material tiles, same surface treatment as
              the auth page's secondary controls. */}
          <ul
            className="auth-enter mt-6 flex flex-col gap-1"
            style={{ animationDelay: '60ms' }}
            role="list"
            aria-label="What you get"
          >
            {benefits.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl px-1 py-1.5 text-[14px] text-foreground/80"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/4.5 text-foreground shadow-[0_0_0_1px_hsl(var(--border))] dark:bg-white/[0.07] dark:text-foreground dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* Auth buttons — GitHub is the one lit control (dev audience);
              Google is a translucent material pill. Pill geometry throughout. */}
          <div
            className="auth-enter mt-6 flex flex-col gap-3"
            style={{ animationDelay: '120ms' }}
          >
            <ProviderButton
              id="auth-gate-github-btn"
              variant="primary"
              icon={<GitHubIcon className="size-[18px]" />}
              busy={pending === 'github'}
              disabled={pending !== null}
              onClick={() => handleProvider('github')}
            >
              Continue with GitHub
            </ProviderButton>

            <ProviderButton
              id="auth-gate-google-btn"
              variant="soft"
              icon={<GoogleIcon className="size-[18px]" />}
              busy={pending === 'google'}
              disabled={pending !== null}
              onClick={() => handleProvider('google')}
            >
              Continue with Google
            </ProviderButton>
          </div>

          {/* Footer */}
          <p
            className="auth-enter mt-6 text-center text-xs text-muted-foreground/80"
            style={{ animationDelay: '160ms' }}
          >
            Free forever&nbsp;·&nbsp;No credit card required
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProviderButton({
  variant,
  icon,
  busy,
  children,
  className,
  ...props
}: {
  variant: 'primary' | 'soft';
  icon: React.ReactNode;
  busy: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-busy={busy}
      className={cn(
        'flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-medium outline-hidden',
        'transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out',
        'active:scale-[0.98]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-wait disabled:opacity-60 disabled:active:scale-100',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_-8px_rgba(0,0,0,0.4)] dark:shadow-[0_0_28px_rgba(255,255,255,0.22),0_1px_3px_rgba(0,0,0,0.5)]'
          : 'bg-black/4.5 text-foreground shadow-[0_0_0_1px_hsl(var(--border))] hover:bg-black/8 dark:bg-white/[0.07] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/10',
        className,
      )}
      {...props}
    >
      {busy ? (
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
