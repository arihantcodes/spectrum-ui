/**
 * Spectrum UI — Conversion Cascade
 *
 * Funnel as stacked rounded stages with drop-off between them.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ChartEyebrow,
  ChartGlowFilter,
  ChartSurface,
  SPRING_FLUID,
  formatCompact,
  useChartMotion,
} from './chart-kit';

export interface CascadeStage {
  key: string;
  label: string;
  value: number;
}

export interface ConversionCascadeChartProps {
  stages?: CascadeStage[];
  className?: string;
}

const SAMPLE: CascadeStage[] = [
  { key: 'visit', label: 'Visit', value: 18420 },
  { key: 'signup', label: 'Signup', value: 6420 },
  { key: 'activate', label: 'Activate', value: 3180 },
  { key: 'pay', label: 'Pay', value: 1240 },
];

function bandPath(widthPct: number, nextPct: number) {
  const inset = (pct: number) => 6 + (100 - pct) * 0.46;
  const top = inset(widthPct);
  const bot = inset(nextPct);
  return `M ${top} 4 H ${100 - top} Q ${100 - top + 4} 4 ${100 - top + 4} 10 V 30 Q ${100 - top + 4} 36 ${100 - bot} 36 H ${bot} Q ${bot - 4} 36 ${bot - 4} 30 V 10 Q ${bot - 4} 4 ${top} 4 Z`;
}

export function ConversionCascadeChart({
  stages = SAMPLE,
  className,
}: ConversionCascadeChartProps) {
  const { reduce } = useChartMotion();
  const [selected, setSelected] = React.useState<string | null>(null);
  const max = stages[0]?.value ?? 1;
  const id = React.useId().replace(/:/g, '');
  const overall = ((stages[stages.length - 1]?.value ?? 0) / max) * 100;

  return (
    <ChartSurface
      palette="orchid"
      className={cn('flex flex-col p-5 sm:p-6', className)}
      aria-label="Conversion cascade"
    >
      <div className="relative z-10 flex items-end justify-between gap-3">
        <div>
          <ChartEyebrow>Conversion</ChartEyebrow>
          <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Visit → Pay
          </p>
        </div>
        <p className="text-[1.65rem] leading-none font-semibold tabular-nums tracking-tighter text-neutral-900 dark:text-neutral-100">
          {overall.toFixed(1)}%
        </p>
      </div>

      <ol className="relative z-10 mt-5 flex flex-col">
        {stages.map((stage, index) => {
          const next = stages[index + 1];
          const kept = next ? (next.value / stage.value) * 100 : null;
          const widthPct = Math.max(28, (stage.value / max) * 100);
          const nextPct = next
            ? Math.max(28, (next.value / max) * 100)
            : Math.max(22, widthPct - 10);
          const dimmed = selected != null && selected !== stage.key;
          const opacity = 0.42 + (1 - index / Math.max(stages.length - 1, 1)) * 0.5;

          return (
            <li key={stage.key}>
              <button
                type="button"
                onClick={() => setSelected((current) => (current === stage.key ? null : stage.key))}
                aria-pressed={selected === stage.key}
                className={cn(
                  'w-full text-left transition-opacity duration-200',
                  'focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300',
                  dimmed && 'opacity-25',
                )}
              >
                <span className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {stage.label}
                  </span>
                  <span className="font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
                    {formatCompact(stage.value)}
                  </span>
                </span>
                <svg viewBox="0 0 100 40" className="mt-1.5 h-11 w-full overflow-visible">
                  <defs>
                    <ChartGlowFilter id={`funnel-${stage.key}-${id}`} stdDeviation={2.5} />
                    <linearGradient
                      id={`funnel-fill-${stage.key}-${id}`}
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="var(--chart-from)" stopOpacity={opacity} />
                      <stop
                        offset="100%"
                        stopColor="var(--chart-to)"
                        stopOpacity={opacity * 0.88}
                      />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={bandPath(widthPct, nextPct)}
                    fill={`url(#funnel-fill-${stage.key}-${id})`}
                    filter={selected === stage.key ? `url(#funnel-${stage.key}-${id})` : undefined}
                    initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduce ? { duration: 0 } : { ...SPRING_FLUID, delay: index * 0.07 }}
                    style={{ transformOrigin: '50% 50%' }}
                  />
                </svg>
              </button>
              {kept != null ? (
                <div className="flex justify-center py-0.5">
                  <span className="rounded-full border border-neutral-200/80 bg-white/75 px-2 py-0.5 text-[10px] font-medium tabular-nums text-neutral-500 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-950/70 dark:text-neutral-400">
                    {kept.toFixed(0)}% kept
                  </span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </ChartSurface>
  );
}
