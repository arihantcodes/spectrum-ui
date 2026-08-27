'use client';

import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { openCommandMenu, prefetchSearchIndex } from '@/lib/command-menu';
import { useIsApplePlatform } from '@/hooks/use-is-apple';

/**
 * The header's way in. ⌘K is the fast path, but it only exists for people who
 * already know it — and on a phone it doesn't exist at all — so the pill is the
 * visible one, with the icon-only button standing in when space is tight.
 */
export function CommandMenuTrigger({ className }: { className?: string }) {
  const isApple = useIsApplePlatform();

  const open = () => openCommandMenu({ source: 'header' });

  return (
    <>
      <button
        type="button"
        onClick={open}
        onPointerEnter={prefetchSearchIndex}
        onFocus={prefetchSearchIndex}
        aria-label="Search Spectrum UI"
        aria-keyshortcuts="Meta+K Control+K"
        className={cn(
          'hidden h-8 items-center gap-2 rounded-full border border-black/8 bg-neutral-100/70 pl-3 pr-1.5',
          'text-foreground/60 transition-colors hover:bg-neutral-100 hover:text-foreground',
          'dark:border-white/10 dark:bg-neutral-900/70 dark:hover:bg-neutral-900 sm:inline-flex',
          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20',
          className,
        )}
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="font-mono text-[12px] uppercase tracking-[0.5px]">Search</span>
        <kbd className="inline-flex h-5 items-center rounded-full border border-black/8 bg-white px-1.5 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-400">
          {isApple ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      <button
        type="button"
        onClick={open}
        onPointerEnter={prefetchSearchIndex}
        aria-label="Search Spectrum UI"
        className="flex size-8 items-center justify-center rounded-full border border-black/8 bg-neutral-100/70 text-foreground/70 transition-colors hover:text-foreground dark:border-white/10 dark:bg-neutral-900/70 sm:hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20"
      >
        <Search className="size-4" aria-hidden="true" />
      </button>
    </>
  );
}
