'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconDiscovery,
  IconSearch,
  SPRING_ENTRANCE,
  SPRING_FLUID,
} from './empty-state-kit';

export type NotFoundEmptyVariant = 'Search' | 'Links';

export interface Destination {
  label: string;
  path: string;
}

export interface NotFoundEmptyProps {
  panelTitle?: string;
  code?: string;
  title?: string;
  description?: string;
  /** The path that failed. Print it — people mistype and want to see it. */
  attempted?: string;
  destinations?: Destination[];
  homeLabel?: string;
  variant?: NotFoundEmptyVariant;
  className?: string;
}

const DESTINATIONS: Destination[] = [
  { label: 'Dashboard', path: '/app' },
  { label: 'API reference', path: '/docs/api' },
  { label: 'Billing and invoices', path: '/settings/billing' },
  { label: 'Status page', path: '/status' },
  { label: 'Changelog', path: '/changelog' },
];

export function NotFoundEmpty({
  panelTitle = 'Not found',
  code = '404',
  title = 'That page is not here',
  description = 'The link may be old, or the page may have moved. These are the places people end up looking for.',
  attempted = '/docs/webhooks/retry-policy',
  destinations = DESTINATIONS,
  homeLabel = 'Back to dashboard',
  variant = 'Search',
  className,
}: NotFoundEmptyProps) {
  const [term, setTerm] = React.useState('');
  const inputId = React.useId();
  const reduced = useReducedMotion();

  const matches = destinations.filter((destination) =>
    `${destination.label} ${destination.path}`.toLowerCase().includes(term.trim().toLowerCase()),
  );

  return (
    <EmptyPanel title={panelTitle} meta={attempted} className={className}>
      <EmptyState
        icon={<IconDiscovery />}
        backdrop="comet"
        eyebrow={code}
        title={title}
        description={description}
        actions={
          <>
            <EmptyAction trailing={<IconArrowRight />}>{homeLabel}</EmptyAction>
            <EmptyAction emphasis="quiet">Report a broken link</EmptyAction>
          </>
        }
        footnote={
          <span className="font-mono text-[12.5px]">
            tried <span className="text-neutral-500 dark:text-neutral-400">{attempted}</span>
          </span>
        }
      >
        <div className="w-full max-w-[400px]">
          {variant === 'Search' && (
            <>
              <label htmlFor={inputId} className="sr-only">
                Search destinations
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 [&_svg]:size-4 dark:text-neutral-500">
                  <IconSearch />
                </span>
                <Input
                  id={inputId}
                  value={term}
                  placeholder="Search for what you wanted"
                  onChange={(event) => setTerm(event.target.value)}
                  className="h-9 rounded-xl border-black/[0.1] bg-white pl-9 text-[14px] shadow-none placeholder:text-neutral-400 dark:border-white/[0.12] dark:bg-white/[0.04]"
                />
              </div>
            </>
          )}

          <ul className={cn('flex flex-col gap-0.5 text-left', variant === 'Search' && 'mt-2')}>
            <AnimatePresence initial={false} mode="popLayout">
              {matches.map((destination, index) => (
                <motion.li
                  key={destination.path}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={
                    reduced ? { duration: 0.12 } : { ...SPRING_ENTRANCE, delay: 0.03 * index }
                  }
                >
                  <a
                    href={destination.path}
                    className={cn(
                      'group flex items-center gap-2 rounded-xl px-2.5 py-2 transition-colors duration-150',
                      'hover:bg-black/[0.035] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
                      'dark:hover:bg-white/[0.05] dark:focus-visible:ring-neutral-300',
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate text-[14px] text-neutral-700 dark:text-neutral-200">
                      {destination.label}
                    </span>
                    <span className="shrink-0 truncate font-mono text-[12.5px] text-neutral-300 dark:text-neutral-600">
                      {destination.path}
                    </span>
                    <span className="shrink-0 text-neutral-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100 [&_svg]:size-3.5 dark:text-neutral-500">
                      <IconArrowRight />
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <AnimatePresence initial={false}>
            {matches.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={SPRING_FLUID}
                className="py-3 text-center text-[13.5px] text-neutral-400 dark:text-neutral-500"
              >
                Nothing here matches that either.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}
