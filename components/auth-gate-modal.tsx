'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useAuthGateStore } from '@/lib/auth-gate-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/events';
import {
  Code2,
  Terminal,
  Star,
  Zap,
  Lock,
} from 'lucide-react';

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

export function AuthGateModal() {
  const { isOpen, close } = useAuthGateStore();

  useEffect(() => {
    if (isOpen) {
      trackEvent({ name: 'login_modal_opened' });
    }
  }, [isOpen]);

  const handleGitHub = () => {
    trackEvent({ name: 'github_login_started' });
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    signIn('github', { callbackUrl: `/create-user?next=${next}` });
  };

  const handleGoogle = () => {
    trackEvent({ name: 'google_login_started' });
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    signIn('google', { callbackUrl: `/create-user?next=${next}` });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="sm:max-w-[440px] p-0 overflow-hidden border border-border/60 shadow-2xl"
        aria-describedby="auth-gate-description"
      >
        {/* Top border accent */}
        <div className="h-px w-full bg-border" />

        <div className="px-7 pt-6 pb-8 flex flex-col gap-6">
          {/* Header */}
          <DialogHeader className="gap-2 text-left">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border">
                <Lock className="h-4 w-4 text-foreground" />
              </div>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Create your free developer account
              </DialogTitle>
            </div>
            <DialogDescription
              id="auth-gate-description"
              className="text-sm text-muted-foreground leading-relaxed"
            >
              Get instant access to component code, CLI commands, and more — completely free.
            </DialogDescription>
          </DialogHeader>

          {/* Benefits */}
          <ul className="flex flex-col gap-2.5" role="list" aria-label="Benefits">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900 border border-border">
                  <Icon className="h-3.5 w-3.5 text-foreground" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              id="auth-gate-github-btn"
              onClick={handleGitHub}
              className="w-full h-11 bg-[#24292e] hover:bg-[#1a1e22] dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white font-medium transition-all duration-200 flex items-center gap-2.5"
            >
              <GitHubIcon className="h-4 w-4" />
              Continue with GitHub
            </Button>

            <Button
              id="auth-gate-google-btn"
              onClick={handleGoogle}
              variant="outline"
              className="w-full h-11 font-medium transition-all duration-200 flex items-center gap-2.5 hover:bg-muted/60"
            >
              <GoogleIcon className="h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground/70">
            Free forever&nbsp;·&nbsp;No credit card required
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
