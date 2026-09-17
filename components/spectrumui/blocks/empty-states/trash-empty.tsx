'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  EmptyAction,
  EmptyMeter,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconDelete,
  IconShieldDone,
  SPRING_FLUID,
  VIEWPORT,
} from './empty-state-kit';

export type TrashEmptyVariant = 'Default' | 'Retention';

export interface TrashEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  retentionDays?: number;
  /** Items still inside the retention window. Zero is the whole point here. */
  scheduled?: number;
  restoreLabel?: string;
  variant?: TrashEmptyVariant;
  className?: string;
}

export function TrashEmpty({
  panelTitle = 'Trash',
  title = 'Trash is empty',
  description = 'Deleted items sit here for 30 days before they go for good. Nothing is waiting, so nothing is about to disappear.',
  retentionDays = 30,
  scheduled = 0,
  restoreLabel = 'Restore from archive',
  variant = 'Default',
  className,
}: TrashEmptyProps) {
  const reduced = useReducedMotion();

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${scheduled} item${scheduled === 1 ? '' : 's'} scheduled for deletion`}
      className={className}
    >
      <EmptyState
        icon={<IconDelete />}
        backdrop="drip"
        title={title}
        description={description}
        actions={
          <>
            <EmptyAction emphasis="secondary" trailing={<IconArrowRight />}>
              {restoreLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet">Retention policy</EmptyAction>
          </>
        }
        footnote={
          <span className="inline-flex items-center gap-1.5">
            <span className="text-emerald-600 [&_svg]:size-3.5 dark:text-emerald-400">
              <IconShieldDone />
            </span>
            Admins can recover anything deleted in the last {retentionDays} days.
          </span>
        }
      >
        {variant === 'Retention' && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={SPRING_FLUID}
            className="w-full max-w-[380px] text-left"
          >
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
                Retention window
              </span>
              <span className="font-mono text-[12.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
                0 / {retentionDays} days used
              </span>
            </div>
            <EmptyMeter value={0} />
            <div className="mt-2 flex justify-between text-[12px] text-neutral-400 dark:text-neutral-500">
              <span>deleted</span>
              <span>purged</span>
            </div>
          </motion.div>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}
