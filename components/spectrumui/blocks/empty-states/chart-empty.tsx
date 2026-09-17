'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconChart,
  IconSwap,
  SPRING_FLUID,
  SPRING_SNAPPY,
} from './empty-state-kit';

export type ChartEmptyVariant = 'Bars' | 'Line';

export interface ChartEmptyProps {
  panelTitle?: string;
  meta?: string;
  title?: string;
  description?: string;
  /** Seven values, 0 to 1. The demo springs them up when the reader asks for them. */
  sample?: number[];
  labels?: string[];
  loadLabel?: string;
  onLoad?: () => void;
  variant?: ChartEmptyVariant;
  className?: string;
}

const SAMPLE = [0.32, 0.51, 0.44, 0.68, 0.59, 0.82, 0.74];
const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ChartEmpty({
  panelTitle = 'Weekly active users',
  meta = 'Last 7 days · no events',
  title = 'No data for this range',
  description = 'Wired up and waiting. Drop in a sample week to see the shape it takes.',
  sample = SAMPLE,
  labels = LABELS,
  loadLabel = 'Load sample data',
  onLoad,
  variant = 'Bars',
  className,
}: ChartEmptyProps) {
  const [loaded, setLoaded] = React.useState(false);
  const reduced = useReducedMotion();

  const average = sample.reduce((sum, value) => sum + value, 0) / sample.length;
  const points = sample
    .map((value, index) => `${(index / (sample.length - 1)) * 100},${(1 - value) * 100}`)
    .join(' ');

  return (
    <EmptyPanel
      title={panelTitle}
      meta={loaded ? 'Last 7 days · sample' : meta}
      toolbar={
        loaded ? (
          <EmptyAction
            emphasis="quiet"
            icon={<IconSwap />}
            onClick={() => setLoaded(false)}
            className="h-8 px-2.5 text-[12px]"
          >
            Clear
          </EmptyAction>
        ) : undefined
      }
      className={className}
      bodyClassName="px-5 py-7 sm:px-8 sm:py-9"
    >
      <div className="relative mx-auto w-full max-w-[520px]">
        <div aria-hidden className="flex h-[240px] w-full flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="h-px w-full bg-black/[0.055] dark:bg-white/[0.07]" />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[240px]">
          {variant === 'Bars' ? (
            <div className="flex h-full items-end gap-2">
              {sample.map((value, index) => (
                <motion.span
                  key={index}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: loaded ? value : 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { ...SPRING_FLUID, delay: loaded ? index * 0.045 : 0 }
                  }
                  style={{ originY: 1 }}
                  className="h-full flex-1 rounded-t-[5px] bg-neutral-800 dark:bg-neutral-200"
                />
              ))}
            </div>
          ) : (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="size-full overflow-visible"
              aria-hidden
            >
              <motion.polyline
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: loaded ? 1 : 0, opacity: loaded ? 1 : 0 }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                }
                className="text-neutral-800 dark:text-neutral-100"
              />
            </svg>
          )}

          <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: loaded ? 1 : 0, top: `${(1 - average) * 100}%` }}
            transition={reduced ? { duration: 0 } : { ...SPRING_FLUID, delay: 0.3 }}
            className="absolute inset-x-0 border-t border-dashed border-black/25 dark:border-white/30"
          />
        </div>

        <div className="mt-2 flex gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="flex-1 text-center font-mono text-[10.5px] text-neutral-300 dark:text-neutral-600"
            >
              {label}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {!loaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={SPRING_SNAPPY}
              /* A soft wash rather than a solid one: the gridlines stay faintly
                 visible, which is the only thing an empty chart can still say. */
              className="absolute inset-x-0 top-0 flex h-[240px] items-center justify-center rounded-xl bg-white/65 px-4 backdrop-blur-[2px] dark:bg-neutral-950/65"
            >
              <EmptyState
                icon={<IconChart />}
                medallionSize="sm"
                backdrop="none"
                title={title}
                description={description}
                className="max-w-[360px]"
                actions={
                  <EmptyAction
                    onClick={() => {
                      setLoaded(true);
                      onLoad?.();
                    }}
                  >
                    {loadLabel}
                  </EmptyAction>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {loaded && (
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING_FLUID}
            className="mt-6 text-center text-[12.5px] text-neutral-500 dark:text-neutral-400"
          >
            Sample data only — the dashed line is the seven-day average.
          </motion.p>
        )}
      </AnimatePresence>
    </EmptyPanel>
  );
}
