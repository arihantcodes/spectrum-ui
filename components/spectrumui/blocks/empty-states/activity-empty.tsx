'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconShieldDone,
  IconTimeCircle,
  SPRING_FLUID,
  VIEWPORT,
} from './empty-state-kit';

export type ActivityEmptyVariant = 'Timeline' | 'Compact';

export interface ActivitySeed {
  label: string;
  detail: string;
  at: string;
}

export interface ActivityEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** The one thing that has happened. Every account has at least this. */
  seed?: ActivitySeed;
  auditLabel?: string;
  variant?: ActivityEmptyVariant;
  className?: string;
}

const SEED: ActivitySeed = {
  label: 'Workspace created',
  detail: 'by you · Europe (Frankfurt)',
  at: 'Today, 09:14',
};

export function ActivityEmpty({
  panelTitle = 'Activity',
  title = 'Nothing has happened yet',
  description = 'Deploys, key rotations, role changes and destructive actions all land here with who did them. Retention is 90 days on your plan.',
  seed = SEED,
  auditLabel = 'Open the audit log',
  variant = 'Timeline',
  className,
}: ActivityEmptyProps) {
  const reduced = useReducedMotion();

  return (
    <EmptyPanel title={panelTitle} meta="1 event · 90 day retention" className={className}>
      <EmptyState
        icon={<IconTimeCircle />}
        backdrop="trail"
        medallionSize={variant === 'Compact' ? 'sm' : 'md'}
        title={title}
        description={description}
        actions={
          <>
            <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
              {auditLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet">Export as CSV</EmptyAction>
          </>
        }
        footnote={
          variant === 'Compact'
            ? undefined
            : 'Events stream in live — this panel does not need a refresh.'
        }
      >
        {variant === 'Timeline' && (
          <div className="w-full max-w-[380px] text-left">
            {/* The rail runs dashed above the one real event: the timeline has a
                past, it just has not been given anything to show yet. */}
            <div className="relative pl-6">
              <motion.span
                aria-hidden
                initial={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={VIEWPORT}
                transition={reduced ? { duration: 0.2 } : { ...SPRING_FLUID, delay: 0.1 }}
                style={{ originY: 1 }}
                className="absolute left-[7px] top-0 h-9 w-px border-l border-dashed border-black/[0.16] dark:border-white/[0.18]"
              />
              <p className="mb-4 h-9 text-[13px] leading-[1.5] text-neutral-300 dark:text-neutral-600">
                nothing recorded
              </p>
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={reduced ? { duration: 0.2 } : { ...SPRING_FLUID, delay: 0.16 }}
                className="relative"
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute -left-6 top-0.5 grid size-4 place-items-center rounded-full',
                    'bg-white text-neutral-500 ring-1 ring-black/[0.12] [&_svg]:size-[11px]',
                    'dark:bg-neutral-950 dark:text-neutral-400 dark:ring-white/[0.16]',
                  )}
                >
                  <IconShieldDone />
                </span>
                <p className="text-[14px] font-medium text-neutral-800 dark:text-neutral-100">
                  {seed.label}
                </p>
                <p className="mt-0.5 text-[12.5px] text-neutral-400 dark:text-neutral-500">
                  {seed.detail}
                </p>
                <p className="mt-0.5 font-mono text-[12.5px] text-neutral-300 dark:text-neutral-600">
                  {seed.at}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}
