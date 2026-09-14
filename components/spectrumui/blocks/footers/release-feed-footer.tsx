'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { IconArrowUpRight, BrandLockup, FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-release-in { from { opacity: 0; transform: translateX(-6px) } to { opacity: 1; transform: none } }
`;

export type ReleaseFeedFooterVariant = 'Feed' | 'Compact';
export type ReleaseKind = 'model' | 'api' | 'platform';

export interface FooterRelease {
  version: string;
  date: string;
  title: string;
  kind: ReleaseKind;
}

export interface ReleaseFeedFooterProps {
  links?: { label: string; href: string }[];
  socials?: FooterSocial[];
  brand: string;
  releases: FooterRelease[];
  changelogHref?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  copyright?: string;
  variant?: ReleaseFeedFooterVariant;
  className?: string;
}

const KIND_TONE: Record<ReleaseKind, string> = {
  model: 'bg-violet-500',
  api: 'bg-sky-500',
  platform: 'bg-emerald-500',
};

export function ReleaseFeedFooter({
  links,
  socials,
  brand,
  releases,
  changelogHref = '#',
  groups = [],
  copyright,
  variant = 'Feed',
  className,
}: ReleaseFeedFooterProps) {
  const [, setActive] = useState<string | null>(releases[0]?.version ?? null);
  const shown = variant === 'Compact' ? releases.slice(0, 3) : releases;

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                Recent releases
              </span>
              <a
                href={changelogHref}
                className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                Full changelog
                <IconArrowUpRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            </div>

            {/* A hairline list, not a timeline rail.
                The rail put the date in an absolutely positioned 70px gutter
                and the dot in a negative offset, which meant the column could
                never be narrower than 86px of chrome before a word of content.
                Rows carry the same information and survive any width. */}
            <ol className="mt-5 divide-y divide-black/[0.06] border-y border-black/[0.06] dark:divide-white/[0.07] dark:border-white/[0.07]">
              {shown.map((release, index) => (
                <li
                  key={release.version}
                  className="animate-[su-release-in_260ms_cubic-bezier(0.2,0,0,1)_backwards] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <a
                    href={changelogHref}
                    onMouseEnter={() => setActive(release.version)}
                    onFocus={() => setActive(release.version)}
                    className="group flex items-start gap-4 rounded-lg px-2 py-3.5 transition-colors duration-150 hover:bg-black/[0.025] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.035]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span className="font-mono text-[11.5px] tabular-nums text-neutral-900 dark:text-neutral-100">
                          {release.version}
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.07em] text-neutral-500 dark:text-neutral-400',
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn('size-1.5 rounded-full', KIND_TONE[release.kind])}
                          />
                          {release.kind}
                        </span>
                      </span>
                      <span className="mt-1 block text-pretty text-[14px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                        {release.title}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 pt-[1px]">
                      <span className="whitespace-nowrap font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
                        {release.date}
                      </span>
                      <IconArrowUpRight className="size-4 text-neutral-300 transition-[color,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 motion-reduce:transition-none dark:text-neutral-700 dark:group-hover:text-neutral-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="self-start">
            <BrandLockup brand={brand} />
            {groups.length > 0 && (
              <nav aria-label="Footer" className="mt-6 grid gap-8 sm:grid-cols-2">
                {groups.map((group) => (
                  <div key={group.title}>
                    <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                      {group.title}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default ReleaseFeedFooter;
