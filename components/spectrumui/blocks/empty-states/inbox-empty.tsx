'use client';

import * as React from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconTickSquare,
  IconTimeCircle,
  SPRING_ENTRANCE,
  SPRING_FLUID,
  usePropState,
  VIEWPORT,
} from './empty-state-kit';

export type InboxEmptyVariant = 'Cleared' | 'Snoozed' | 'Minimal';

export interface InboxStat {
  label: string;
  value: string;
}

export interface InboxEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  stats?: InboxStat[];
  snoozedCount?: number;
  archiveLabel?: string;
  variant?: InboxEmptyVariant;
  className?: string;
}

const STATS: InboxStat[] = [
  { label: 'Cleared today', value: '12' },
  { label: 'Median reply', value: '4m' },
  { label: 'Waiting', value: '0' },
];

/** Three cards that sweep out once, then the medallion lands where they were. */
function ClearedCards({ play }: { play: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 grid place-items-center"
    >
      <AnimatePresence>
        {play &&
          [0, 1, 2].map((index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.9, y: index * 6, x: 0, rotate: 0, scale: 1 - index * 0.04 }}
              animate={{ opacity: 0, x: 220, rotate: 9, y: index * 6 - 14 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.62,
                delay: index * 0.09,
                ease: [0.32, 0, 0.67, 0],
              }}
              className="absolute h-11 w-[220px] rounded-xl border border-black/[0.08] bg-white shadow-[0_6px_18px_-12px_rgba(0,0,0,0.4)] dark:border-white/[0.1] dark:bg-neutral-900"
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

export function InboxEmpty({
  panelTitle = 'Inbox',
  title = 'You are at zero',
  description = 'Nothing is waiting on you. Replies land here as they arrive, and anything you snooze comes back at the time you picked, not before.',
  stats = STATS,
  snoozedCount = 3,
  archiveLabel = 'Open archive',
  variant = 'Cleared',
  className,
}: InboxEmptyProps) {
  const reduced = useReducedMotion();
  const stage = React.useRef<HTMLDivElement>(null);

  /* The sweep is the block's whole idea, so it waits for the panel to reach the
     viewport rather than playing to an empty room while the page loads. */
  const seen = useInView(stage, { once: true, amount: 0.4 });
  const [spent, setSpent] = usePropState(false, `${variant}:${reduced}`);
  const play = seen && !spent && !reduced && variant === 'Cleared';

  React.useEffect(() => {
    if (!play) return;
    const timer = setTimeout(() => setSpent(true), 1100);
    return () => clearTimeout(timer);
  }, [play, setSpent]);

  const snoozed = variant === 'Snoozed';

  return (
    <EmptyPanel
      title={panelTitle}
      meta={snoozed ? `${snoozedCount} snoozed` : 'All caught up'}
      className={className}
    >
      <div ref={stage} className="relative">
        {variant === 'Cleared' && <ClearedCards play={play} />}

        <EmptyState
          icon={<IconTickSquare />}
          tone="positive"
          medallionSize={variant === 'Minimal' ? 'sm' : 'md'}
          backdrop={variant === 'Minimal' ? 'halo' : 'sparks'}
          title={snoozed ? `Clear until ${snoozedCount} come back` : title}
          description={variant === 'Minimal' ? undefined : description}
          actions={
            <>
              <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
                {archiveLabel}
              </EmptyAction>
              {snoozed && <EmptyAction emphasis="quiet">See snoozed</EmptyAction>}
            </>
          }
          footnote={
            snoozed ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
                  <IconTimeCircle />
                </span>
                Next one returns at 14:00
              </span>
            ) : undefined
          }
        >
          {variant !== 'Minimal' && (
            <dl className="flex w-full max-w-[380px] items-stretch justify-center divide-x divide-black/[0.07] dark:divide-white/[0.09]">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={
                    reduced ? { duration: 0.15 } : { ...SPRING_ENTRANCE, delay: 0.3 + index * 0.06 }
                  }
                  className={cn('flex-1 px-3 text-center')}
                >
                  <dd className="font-mono text-[17px] font-medium tabular-nums text-neutral-900 dark:text-neutral-50">
                    {stat.value}
                  </dd>
                  <dt className="mt-0.5 text-[12.5px] text-neutral-400 dark:text-neutral-500">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          )}
        </EmptyState>
      </div>

      <AnimatePresence>
        {play && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_FLUID}
            aria-live="polite"
            className="sr-only"
          >
            Inbox cleared
          </motion.p>
        )}
      </AnimatePresence>
    </EmptyPanel>
  );
}
