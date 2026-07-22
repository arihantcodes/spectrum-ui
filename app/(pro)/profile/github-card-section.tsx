import { IconExternalLink, IconWorld } from '@tabler/icons-react';

import { Icons } from '@/components/icon';

interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  blog: string | null;
}

interface GitHubCardSectionProps {
  username: string;
}

const compactNumber = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

function getWebsiteUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

async function getGitHubProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'SpectrumUI',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) return null;
    return (await response.json()) as GitHubProfile;
  } catch {
    return null;
  }
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-4 text-center sm:px-5">
      <dt className="font-mono text-base font-medium tabular-nums text-foreground">
        {compactNumber.format(value)}
      </dt>
      <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </dd>
    </div>
  );
}

export function GitHubCardSkeleton() {
  return (
    <section className="pt-8" aria-label="Loading GitHub account" aria-busy="true">
      <div className="mb-3 h-4 w-40 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 p-5">
          <div className="size-10 animate-pulse rounded-xl bg-muted motion-reduce:animate-none" />
          <div className="space-y-2">
            <div className="h-3.5 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-3 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2 px-3 py-4">
              <div className="h-4 w-10 animate-pulse rounded bg-muted motion-reduce:animate-none" />
              <div className="h-3 w-14 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function GitHubCardSection({ username }: GitHubCardSectionProps) {
  const profile = await getGitHubProfile(username);
  const githubUrl = profile?.html_url ?? `https://github.com/${username}`;
  const websiteUrl = getWebsiteUrl(profile?.blog ?? null);

  return (
    <section className="pt-8" aria-labelledby="github-account-heading">
      <div className="mb-3 flex items-center gap-2.5 px-1">
        <span
          aria-hidden
          className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
        />
        <h3
          id="github-account-heading"
          className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground"
        >
          Connected account
        </h3>
      </div>

      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground shadow-[0_0_0_1px_hsl(var(--border))]">
              <Icons.gitHub className="size-[19px]" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {profile?.name || username}
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                  Connected
                </span>
              </div>
              <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                @{profile?.login || username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-black/[0.045] px-4 text-[13px] font-medium text-foreground shadow-[0_0_0_1px_hsl(var(--border))] outline-none transition-[transform,background-color] duration-150 ease-out hover:bg-black/[0.08] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-safe:active:scale-[0.98] dark:bg-white/[0.07] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/[0.1]"
              >
                <IconWorld size={15} aria-hidden />
                Website
              </a>
            ) : null}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.25)] outline-none transition-[transform,background-color] duration-150 ease-out hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-safe:active:scale-[0.98]"
            >
              GitHub
              <IconExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>

        {profile?.bio ? (
          <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        ) : null}

        {profile ? (
          <dl className="grid grid-cols-3 divide-x divide-border border-t border-border">
            <Stat label="Followers" value={profile.followers} />
            <Stat label="Following" value={profile.following} />
            <Stat label="Repositories" value={profile.public_repos} />
          </dl>
        ) : (
          <p className="border-t border-border px-5 py-4 text-xs text-muted-foreground">
            GitHub activity is temporarily unavailable. Your account is still connected.
          </p>
        )}
      </div>
    </section>
  );
}
