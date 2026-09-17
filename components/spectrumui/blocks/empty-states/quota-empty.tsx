'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyMeter,
  EmptyPanel,
  EmptyState,
  IconArrowRight,
  IconGraph,
  IconTimeCircle,
  SPRING_ENTRANCE,
  SPRING_FLUID,
  VIEWPORT,
} from './empty-state-kit';

export type QuotaEmptyVariant = 'Reached' | 'Approaching';

export interface QuotaEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  used?: number;
  limit?: number;
  unit?: string;
  resetsIn?: string;
  /** Seven days of usage, 0 to 1, so the reader can see how they got here. */
  history?: number[];
  upgradeLabel?: string;
  onUpgrade?: () => void;
  variant?: QuotaEmptyVariant;
  className?: string;
}

const HISTORY = [0.22, 0.31, 0.4, 0.58, 0.72, 0.88, 1];

export function QuotaEmpty({
  panelTitle = 'API usage',
  title = 'Monthly limit reached',
  description = 'Requests are being rejected with a 429 until the window resets. Upgrading lifts the ceiling straight away — nothing needs redeploying.',
  used = 10000,
  limit = 10000,
  unit = 'requests',
  resetsIn = '6 days',
  history = HISTORY,
  upgradeLabel = 'Upgrade plan',
  onUpgrade,
  variant = 'Reached',
  className,
}: QuotaEmptyProps) {
  const reduced = useReducedMotion();
  const approaching = variant === 'Approaching';
  const value = approaching ? 0.82 : Math.min(1, used / limit);
  const shown = approaching ? Math.round(limit * 0.82) : used;

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${shown.toLocaleString('en-US')} / ${limit.toLocaleString('en-US')} ${unit}`}
      className={className}
    >
      <EmptyState
        icon={<IconGraph />}
        backdrop="bars"
        tone={approaching ? 'caution' : 'critical'}
        title={approaching ? 'Close to the monthly limit' : title}
        description={
          approaching
            ? 'At this rate the limit lands before the window resets. Raising it now avoids a 429 in the middle of a workday.'
            : description
        }
        actions={
          <>
            <EmptyAction onClick={onUpgrade} trailing={<IconArrowRight />}>
              {upgradeLabel}
            </EmptyAction>
            <EmptyAction emphasis="quiet">See usage breakdown</EmptyAction>
          </>
        }
        footnote={
          <span className="inline-flex items-center gap-1.5">
            <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
              <IconTimeCircle />
            </span>
            Window resets in {resetsIn}
          </span>
        }
      >
        <div className="w-full max-w-[400px] text-left">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono text-[13px] tabular-nums text-neutral-900 dark:text-neutral-50">
              {shown.toLocaleString('en-US')}
              <span className="text-neutral-400 dark:text-neutral-500">
                {' '}
                / {limit.toLocaleString('en-US')}
              </span>
            </span>
            <span
              className={cn(
                'font-mono text-[12.5px] tabular-nums',
                approaching
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-red-600 dark:text-red-400',
              )}
            >
              {Math.round(value * 100)}%
            </span>
          </div>

          <EmptyMeter value={value} tone={approaching ? 'caution' : 'critical'} />

          <div className="mt-4 flex h-16 items-end gap-2">
            {history.map((day, index) => (
              <motion.span
                key={index}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: Math.max(0.06, approaching ? day * 0.82 : day) }}
                viewport={VIEWPORT}
                transition={
                  reduced ? { duration: 0 } : { ...SPRING_ENTRANCE, delay: 0.24 + index * 0.04 }
                }
                style={{ originY: 1 }}
                className={cn(
                  'h-full flex-1 rounded-[3px]',
                  index === history.length - 1 && !approaching
                    ? 'bg-red-500'
                    : 'bg-neutral-200 dark:bg-white/[0.16]',
                )}
              />
            ))}
          </div>
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={reduced ? { duration: 0.15 } : { ...SPRING_FLUID, delay: 0.5 }}
            className="mt-1.5 text-[12px] text-neutral-400 dark:text-neutral-500"
          >
            last 7 days
          </motion.p>
        </div>
      </EmptyState>
    </EmptyPanel>
  );
}
