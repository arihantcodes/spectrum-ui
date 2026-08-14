/**
 * Spectrum UI — Share Ring
 *
 * Donut with the KPI living in the hole. The breakdown list is the legend.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AnimatedNumber,
  ChartEyebrow,
  ChartGlowFilter,
  ChartSurface,
  SPRING_FLUID,
  formatCompact,
  useChartMotion,
} from './chart-kit';

export interface ShareSlice {
  key: string;
  label: string;
  value: number;
}

export interface ShareRingChartProps {
  data?: ShareSlice[];
  unit?: string;
  className?: string;
}

const SAMPLE: ShareSlice[] = [
  { key: 'pro', label: 'Pro', value: 4280 },
  { key: 'team', label: 'Team', value: 2610 },
  { key: 'free', label: 'Free', value: 1840 },
  { key: 'enterprise', label: 'Enterprise', value: 920 },
];

const SLICE_COLORS = [
  'var(--chart-to)',
  'var(--chart-mid)',
  'var(--chart-from)',
  'color-mix(in oklab, var(--chart-from) 55%, white)',
];

export function ShareRingChart({ data = SAMPLE, unit = 'seats', className }: ShareRingChartProps) {
  const { reduce } = useChartMotion();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [hidden, setHidden] = React.useState<string[]>([]);
  const visible = data.filter((slice) => !hidden.includes(slice.key));
  const total = visible.reduce((sum, slice) => sum + slice.value, 0);
  const active = visible.find((slice) => slice.key === hovered);
  const displayValue = active?.value ?? total;
  const displayLabel = active?.label ?? 'Total';
  const id = React.useId().replace(/:/g, '');

  const r = 56;
  const c = 2 * Math.PI * r;
  const gap = 12;
  const usable = Math.max(c - visible.length * gap, 1);

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  const rings = visible.map((slice, index) => {
    const preceding = visible
      .slice(0, index)
      .reduce((sum, item) => sum + (total === 0 ? 0 : (item.value / total) * usable) + gap, 0);
    const len = total === 0 ? 0 : (slice.value / total) * usable;
    const originalIndex = data.findIndex((item) => item.key === slice.key);
    const hot = hovered === slice.key;
    const dimmed = hovered != null && !hot;
    return {
      slice,
      len,
      dashoffset: -preceding,
      color: SLICE_COLORS[originalIndex % SLICE_COLORS.length],
      hot,
      dimmed,
      index,
    };
  });

  return (
    <ChartSurface
      palette="orchid"
      className={cn('grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_13rem] sm:p-6', className)}
      aria-label="Seat share by plan"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[252px]">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <defs>
            <ChartGlowFilter id={`ring-glow-${id}`} stdDeviation={4.5} />
          </defs>
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            className="text-neutral-100 dark:text-neutral-900"
          />
          <circle cx="80" cy="80" r="41" className="fill-white/55 dark:fill-neutral-950/55" />
          {rings.map((ring) => (
            <motion.circle
              key={ring.slice.key}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={ring.color}
              strokeLinecap="round"
              strokeDasharray={`${ring.len} ${c - ring.len}`}
              filter={ring.hot ? `url(#ring-glow-${id})` : undefined}
              initial={
                reduce
                  ? false
                  : { strokeDashoffset: ring.dashoffset + c, strokeWidth: 13, opacity: 0 }
              }
              animate={{
                strokeDashoffset: ring.dashoffset,
                strokeWidth: ring.hot ? 16 : 13,
                opacity: ring.dimmed ? 0.22 : 1,
              }}
              transition={reduce ? { duration: 0 } : { ...SPRING_FLUID, delay: ring.index * 0.06 }}
              onMouseEnter={() => setHovered(ring.slice.key)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <ChartEyebrow>{displayLabel}</ChartEyebrow>
          <p className="mt-1 text-[2.15rem] leading-none font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
            <AnimatedNumber value={displayValue} format={formatCompact} />
          </p>
          <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">{unit}</p>
        </div>
      </div>

      <ul className="relative z-10 flex flex-col justify-center gap-3.5">
        {data.map((slice, index) => {
          const off = hidden.includes(slice.key);
          const liveShare = off || total === 0 ? 0 : (slice.value / total) * 100;
          const hot = hovered === slice.key;
          return (
            <li key={slice.key}>
              <button
                type="button"
                onClick={() => toggle(slice.key)}
                onMouseEnter={() => setHovered(slice.key)}
                onMouseLeave={() => setHovered(null)}
                aria-pressed={!off}
                className={cn(
                  'flex w-full flex-col gap-1.5 text-left transition-opacity',
                  'focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300',
                  off && 'opacity-40',
                )}
              >
                <span className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full shadow-[0_0_10px_currentColor]"
                      style={{
                        background: SLICE_COLORS[index % SLICE_COLORS.length],
                        color: SLICE_COLORS[index % SLICE_COLORS.length],
                        transform: hot ? 'scale(1.25)' : undefined,
                      }}
                    />
                    {slice.label}
                  </span>
                  <span className="tabular-nums text-neutral-500 dark:text-neutral-400">
                    {off ? '—' : `${liveShare.toFixed(0)}%`}
                  </span>
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{
                      background: SLICE_COLORS[index % SLICE_COLORS.length],
                      boxShadow: hot ? '0 0 12px var(--chart-glow)' : 'none',
                    }}
                    initial={false}
                    animate={{ width: `${liveShare}%` }}
                    transition={reduce ? { duration: 0 } : SPRING_FLUID}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </ChartSurface>
  );
}
