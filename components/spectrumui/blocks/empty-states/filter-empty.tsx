'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  GhostRows,
  IconClose,
  IconFilter,
  SPRING_FLUID,
  SPRING_SNAPPY,
  usePropState,
  EASE_OUT,
} from './empty-state-kit';

export type FilterEmptyVariant = 'Chips' | 'Summary';

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
  /** Rows this filter alone would leave on the table. Removing it adds them back. */
  releases: number;
}

export interface FilterEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  filters?: ActiveFilter[];
  total?: number;
  clearLabel?: string;
  onChange?: (remaining: string[]) => void;
  variant?: FilterEmptyVariant;
  className?: string;
}

const FILTERS: ActiveFilter[] = [
  { id: 'status', label: 'Status', value: 'Refunded', releases: 24 },
  { id: 'region', label: 'Region', value: 'APAC', releases: 61 },
  { id: 'amount', label: 'Amount', value: '> $10,000', releases: 12 },
  { id: 'date', label: 'Created', value: 'Last 24 hours', releases: 39 },
];

export function FilterEmpty({
  panelTitle = 'Payments',
  title = 'No rows match these filters',
  description = 'Four filters are narrowing this table at once. Drop one and see what comes back — the count updates as you go.',
  filters = FILTERS,
  total = 1284,
  clearLabel = 'Clear all filters',
  onChange,
  variant = 'Chips',
  className,
}: FilterEmptyProps) {
  const [active, setActive] = usePropState(
    filters.map((filter) => filter.id),
    filters,
  );
  const reduced = useReducedMotion();

  const removed = filters.filter((filter) => !active.includes(filter.id));
  const matches = removed.reduce((sum, filter) => sum + filter.releases, 0);
  const cleared = active.length === 0;

  function drop(id: string) {
    const next = active.filter((value) => value !== id);
    setActive(next);
    onChange?.(next);
  }

  function reset() {
    setActive(filters.map((filter) => filter.id));
    onChange?.(filters.map((filter) => filter.id));
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${matches ? matches.toLocaleString('en-US') : 0} of ${total.toLocaleString('en-US')} rows`}
      toolbar={
        <EmptyAction
          emphasis="quiet"
          onClick={
            cleared
              ? reset
              : () => {
                  setActive([]);
                  onChange?.([]);
                }
          }
          className="h-8 px-2.5 text-[13px]"
        >
          {cleared ? 'Restore filters' : clearLabel}
        </EmptyAction>
      }
      className={className}
      bodyClassName="px-5 py-8 sm:px-8 sm:py-10"
    >
      {matches > 0 ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_FLUID}
          className="mx-auto w-full max-w-[460px]"
        >
          <p className="mb-4 text-center text-[14px] text-neutral-500 dark:text-neutral-400">
            <motion.span
              key={matches}
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING_SNAPPY}
              className="inline-block font-mono font-medium tabular-nums text-neutral-900 dark:text-neutral-50"
            >
              {matches.toLocaleString('en-US')}
            </motion.span>{' '}
            rows came back
          </p>
          <GhostRows rows={4} fade="up" className="opacity-90" />
          <div className="mt-5 flex justify-center">
            <EmptyAction emphasis="secondary" onClick={reset}>
              Re-apply all filters
            </EmptyAction>
          </div>
        </motion.div>
      ) : (
        <EmptyState
          icon={<IconFilter />}
          backdrop="sieve"
          title={title}
          description={
            variant === 'Summary'
              ? `${filters.length} filters are active. The narrowest is ${filters[0]?.label.toLowerCase()}.`
              : description
          }
          actions={
            <EmptyAction
              onClick={() => {
                setActive([]);
                onChange?.([]);
              }}
            >
              {clearLabel}
            </EmptyAction>
          }
          footnote="Filters are saved per view, not per session."
        >
          <div className="flex w-full max-w-[480px] flex-wrap items-center justify-center gap-1.5">
            <AnimatePresence initial={false} mode="popLayout">
              {filters
                .filter((filter) => active.includes(filter.id))
                .map((filter) => (
                  <motion.button
                    key={filter.id}
                    layout
                    type="button"
                    onClick={() => drop(filter.id)}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduced
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.94,
                            y: -4,
                            transition: { duration: 0.14, ease: EASE_OUT },
                          }
                    }
                    whileTap={reduced ? undefined : { scale: 0.96 }}
                    transition={SPRING_SNAPPY}
                    aria-label={`Remove filter ${filter.label} ${filter.value}`}
                    className={cn(
                      'group flex cursor-pointer items-center gap-1.5 rounded-full border border-black/[0.09] bg-white py-1 pl-2.5 pr-1.5',
                      'transition-transform duration-150 ease-out hover:-translate-y-px',
                      'transition-colors duration-150 hover:border-black/20',
                      'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
                      'dark:border-white/[0.12] dark:bg-white/[0.04] dark:hover:border-white/25 dark:focus-visible:ring-neutral-300',
                    )}
                  >
                    <span className="text-[12.5px] text-neutral-400 dark:text-neutral-500">
                      {filter.label}
                    </span>
                    <span className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100">
                      {filter.value}
                    </span>
                    <span className="grid size-4 place-items-center rounded-full text-neutral-400 transition-colors duration-150 group-hover:bg-black/[0.06] group-hover:text-neutral-700 [&_svg]:size-3 dark:text-neutral-500 dark:group-hover:bg-white/10 dark:group-hover:text-neutral-100">
                      <IconClose />
                    </span>
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>
        </EmptyState>
      )}
    </EmptyPanel>
  );
}
