'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyHint,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconDocument,
  IconSearch,
  SPRING_FLUID,
  SPRING_SNAPPY,
  usePropState,
} from './empty-state-kit';

export type SearchEmptyVariant = 'Suggestions' | 'Scoped' | 'Minimal';

export interface SearchHit {
  title: string;
  path: string;
}

export interface SearchEmptyProps {
  panelTitle?: string;
  /** The term the reader typed. Echo it — a "no results" with no query is a shrug. */
  query?: string;
  title?: string;
  /** The line after the echoed query. Keep it about what to do next. */
  description?: string;
  /** Terms that do return something. The first one is the one this demo resolves. */
  suggestions?: string[];
  results?: Record<string, SearchHit[]>;
  scopeLabel?: string;
  onSearch?: (term: string) => void;
  variant?: SearchEmptyVariant;
  className?: string;
}

const SUGGESTIONS = ['invoices', 'invoice webhook', 'billing period'];

const RESULTS: Record<string, SearchHit[]> = {
  invoices: [
    { title: 'Invoices API', path: 'docs / billing / invoices' },
    { title: 'Retry a failed invoice', path: 'guides / billing' },
    { title: 'Invoice webhook events', path: 'reference / webhooks' },
  ],
};

export function SearchEmpty({
  panelTitle = 'Search',
  query = 'invocies',
  title = 'No results',
  description = 'Try one of the terms below, or widen the search to every project you belong to.',
  suggestions = SUGGESTIONS,
  results = RESULTS,
  scopeLabel = 'Search all projects',
  onSearch,
  variant = 'Suggestions',
  className,
}: SearchEmptyProps) {
  const [term, setTerm] = usePropState(query, query);
  const reduced = useReducedMotion();

  const hits = results[term] ?? [];
  const resolved = hits.length > 0;

  function pick(suggestion: string) {
    setTerm(suggestion);
    onSearch?.(suggestion);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      toolbar={
        <span className="flex max-w-[220px] items-center gap-2 rounded-xl border border-black/[0.08] px-2.5 py-1.5 dark:border-white/[0.09]">
          <span className="shrink-0 text-neutral-400 [&_svg]:size-[15px]">
            <IconSearch />
          </span>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={term}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={SPRING_SNAPPY}
              className="truncate font-mono text-[13px] text-neutral-700 dark:text-neutral-200"
            >
              {term}
            </motion.span>
          </AnimatePresence>
        </span>
      }
      className={className}
    >
      <AnimatePresence initial={false} mode="wait">
        {resolved ? (
          <motion.div
            key="hits"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING_FLUID}
            className="mx-auto w-full max-w-[440px]"
          >
            <p className="mb-3 text-center text-[13.5px] text-neutral-500 dark:text-neutral-400">
              {hits.length} results for{' '}
              <span className="font-mono text-neutral-800 dark:text-neutral-100">{term}</span>
            </p>
            <ul className="flex flex-col gap-1.5">
              {hits.map((hit, index) => (
                <motion.li
                  key={hit.title}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduced ? { duration: 0.15 } : { ...SPRING_FLUID, delay: 0.04 * index }
                  }
                  className="flex items-center gap-2.5 rounded-xl border border-black/[0.07] px-3 py-2.5 dark:border-white/[0.09]"
                >
                  <span className="shrink-0 text-neutral-400 [&_svg]:size-4 dark:text-neutral-500">
                    <IconDocument />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium text-neutral-800 dark:text-neutral-100">
                      {hit.title}
                    </span>
                    <span className="block truncate font-mono text-[12.5px] text-neutral-400 dark:text-neutral-500">
                      {hit.path}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <EmptyAction emphasis="quiet" onClick={() => setTerm(query)}>
                Back to the empty result
              </EmptyAction>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING_FLUID}
          >
            <EmptyState
              icon={<IconSearch />}
              backdrop="ripple"
              title={title}
              description={
                <>
                  Nothing matches{' '}
                  <span className="font-mono text-neutral-700 dark:text-neutral-200">{term}</span>.
                  {variant === 'Minimal' ? null : <> {description}</>}
                </>
              }
              actions={
                <>
                  <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
                    {scopeLabel}
                  </EmptyAction>
                  <EmptyAction emphasis="quiet">Clear search</EmptyAction>
                </>
              }
              footnote={<EmptyHint keys={['⌘', 'K']}>to search from anywhere</EmptyHint>}
            >
              {variant !== 'Minimal' && (
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
                    {variant === 'Scoped' ? 'Try another scope:' : 'Did you mean'}
                  </span>
                  {suggestions.map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      type="button"
                      onClick={() => pick(suggestion)}
                      whileTap={reduced ? undefined : { scale: 0.96 }}
                      transition={SPRING_SNAPPY}
                      className={cn(
                        'cursor-pointer rounded-full border border-black/[0.09] px-2.5 py-1 font-mono text-[12.5px] text-neutral-600',
                        'transition-transform duration-150 ease-out hover:-translate-y-px',
                        'transition-colors duration-150 hover:border-black/20 hover:text-neutral-900',
                        'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950',
                        'dark:border-white/[0.12] dark:text-neutral-300 dark:hover:border-white/25 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300',
                      )}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}
            </EmptyState>
          </motion.div>
        )}
      </AnimatePresence>
    </EmptyPanel>
  );
}
