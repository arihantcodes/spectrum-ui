'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/** Compact sponsor pill for the navbar. Sits beside the GitHub star count so
 *  the live social-proof number and the support CTA share one glance — the
 *  highest-traffic, highest-intent slot on the site. Heart fills rose on hover. */
export function SponsorButton({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === '/sponsor' || pathname?.startsWith('/sponsor/');

  return (
    <Link
      href={siteConfig.links.sponsor}
      aria-label="Sponsor Spectrum UI"
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-neutral-200 px-2.5 font-mono text-xs font-medium text-foreground/80 shadow-xs transition-all duration-200 ease-out hover:border-neutral-300 hover:text-foreground dark:border-neutral-800 dark:hover:border-neutral-700',
        compact && 'size-8 px-0',
        isActive && 'border-neutral-300 text-foreground dark:border-neutral-700',
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cn(
          'size-3.5 shrink-0 fill-transparent stroke-current stroke-[1.5] transition-all duration-300 ease-out group-hover:fill-rose-500 group-hover:stroke-rose-500 motion-safe:group-hover:scale-110',
          isActive && 'fill-rose-500 stroke-rose-500',
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {!compact && <span className="hidden font-inter lg:inline">Sponsor</span>}
    </Link>
  );
}
