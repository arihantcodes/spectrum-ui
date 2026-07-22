'use client';

import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { trackEvent } from '@/lib/events';
import { completeUserProfile } from './actions';
import { GitHubUsernameInput } from './github-username-input';
import { SubmitButton } from './submit-button';

interface OnboardingFormProps {
  userName: string;
  userEmail: string;
  userImage: string;
  defaultGithub: string;
  nextUrl: string;
}

export function OnboardingForm({
  userName,
  userEmail,
  userImage,
  defaultGithub,
  nextUrl,
}: OnboardingFormProps) {
  const [githubValid, setGithubValid] = useState(false);

  useEffect(() => {
    trackEvent({ name: 'onboarding_started' });
  }, []);

  return (
    <section aria-label="Complete your profile">
      {/* Signed-in identity — same hairline-ring card as the profile page. */}
      <div
        className="auth-enter mt-7 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)]"
        style={{ animationDelay: '120ms' }}
      >
        <Avatar className="size-10 shrink-0 rounded-xl shadow-[0_0_0_1px_hsl(var(--border))]">
          <AvatarImage src={userImage} alt={userName || 'Signed-in user'} />
          <AvatarFallback className="rounded-xl bg-muted text-sm font-medium text-muted-foreground">
            {userName?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {userName || 'Your account'}
          </p>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Verified
        </span>
      </div>

      <form
        action={completeUserProfile}
        className="auth-enter mt-6 space-y-5"
        style={{ animationDelay: '180ms' }}
      >
        <input type="hidden" name="next" value={nextUrl} />
        <GitHubUsernameInput defaultValue={defaultGithub} onValidationChange={setGithubValid} />
        <SubmitButton disabled={!githubValid} />
      </form>
    </section>
  );
}
