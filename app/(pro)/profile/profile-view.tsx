import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { IconlyEmailDocument, IconlyLogout } from '@/components/icons/iconly';
import { Icons } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { GitHubCardSection, GitHubCardSkeleton } from './github-card-section';

export interface ProfileUser {
  name: string | null;
  email: string;
  avatar_url: string | null;
  github_username: string;
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span
        className={`min-w-0 truncate text-sm font-medium text-foreground ${
          mono ? ' text-[13px]' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function ProfileView({
  user,
  signOutAction,
}: {
  user: ProfileUser;
  signOutAction: () => Promise<void>;
}) {
  return (
    // Same framed band as the rest of the site: side borders at 1400px,
    // bottom border hands off to the footer.
    <div className="container-frame min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Back */}
        <div className="enter-fx">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-hidden transition-[transform,color] duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-safe:active:scale-[0.98]"
          >
            <IconArrowLeft size={15} aria-hidden />
            Back home
          </Link>

          {/* Eyebrow + heading, same language as the bookmarks page */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Account
              </span>
            </div>
            <h1 className="font-spectral text-[34px] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
              Your account
            </h1>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
              Manage your profile, connected accounts and preferences.
            </p>
          </div>
        </div>

        {/* Identity — one quiet card, no banner. The avatar and actions share
            a row; everything sits on hairline rings like the account menu. */}
        <div
          className="enter-fx rounded-2xl bg-card shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)]"
          style={{ animationDelay: '60ms' }}
        >
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="size-14 rounded-xl shadow-[0_0_0_1px_hsl(var(--border))]">
                <AvatarImage src={user.avatar_url ?? ''} alt={user.name ?? ''} />
                <AvatarFallback className="rounded-xl bg-muted text-lg font-medium text-muted-foreground">
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h2 className="truncate text-base font-medium tracking-tight text-foreground">
                    {user.name ?? 'Your account'}
                  </h2>
                  <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Free forever
                  </span>
                </div>
                <p className="mt-1 truncate font-mono text-[13px] text-muted-foreground">
                  @{user.github_username}
                </p>
              </div>
            </div>

            <a
              href={`https://github.com/${user.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-full bg-black/4.5 px-4 text-[13px] font-medium text-foreground shadow-[0_0_0_1px_hsl(var(--border))] outline-hidden transition-[transform,background-color] duration-150 ease-out hover:bg-black/8 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-safe:active:scale-[0.98] dark:bg-white/[0.07] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/10 sm:self-auto"
            >
              <Icons.gitHub className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Details */}
        <div className="enter-fx mt-8" style={{ animationDelay: '120ms' }}>
          <div className="mb-3 flex items-center gap-2.5 px-1">
            <span
              aria-hidden
              className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
            />
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground">
              Profile details
            </h3>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)]">
            <DetailRow label="Name" value={user.name ?? 'Not provided'} />
            <DetailRow label="Email" value={user.email} mono />
            <DetailRow label="GitHub" value={`@${user.github_username}`} mono />
          </div>
        </div>

        {/* GitHub activity streams independently from the account shell. */}
        <div className="enter-fx" style={{ animationDelay: '180ms' }}>
          <Suspense fallback={<GitHubCardSkeleton />}>
            <GitHubCardSection username={user.github_username} />
          </Suspense>
        </div>

        {/* Actions */}
        <div
          className="enter-fx mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ animationDelay: '240ms' }}
        >
          <a
            href="mailto:jainari1208@gmail.com"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground outline-hidden transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <IconlyEmailDocument className="size-4" />
            Need help? Contact support
          </a>

          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium text-red-600 shadow-[0_0_0_1px_hsl(var(--border))] outline-hidden transition-[transform,background-color] duration-150 ease-out hover:bg-red-500/10 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:active:scale-[0.98] dark:text-red-500"
            >
              <IconlyLogout className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
