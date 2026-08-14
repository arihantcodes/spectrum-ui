/**
 * Spectrum UI — Route Throughput
 *
 * Ranked API routes as a list. Sort is the visualization.
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
  ChartSurface,
  SPRING_ENTRANCE,
  formatCompact,
  useChartMotion,
} from './chart-kit';

export interface RouteRow {
  method: string;
  path: string;
  count: number;
}

export interface RouteThroughputChartProps {
  data?: RouteRow[];
  className?: string;
}

const SAMPLE: RouteRow[] = [
  { method: 'GET', path: '/v1/models', count: 18420 },
  { method: 'POST', path: '/v1/chat/completions', count: 12640 },
  { method: 'GET', path: '/v1/files', count: 8310 },
  { method: 'POST', path: '/v1/embeddings', count: 6180 },
  { method: 'DELETE', path: '/v1/files/:id', count: 2140 },
  { method: 'GET', path: '/v1/usage', count: 1620 },
];

const METHOD_TONE: Record<string, string> = {
  GET: 'bg-cyan-500/12 text-cyan-700 dark:text-cyan-300',
  POST: 'bg-violet-500/12 text-violet-700 dark:text-violet-300',
  PUT: 'bg-amber-500/12 text-amber-700 dark:text-amber-300',
  PATCH: 'bg-amber-500/12 text-amber-700 dark:text-amber-300',
  DELETE: 'bg-rose-500/12 text-rose-700 dark:text-rose-300',
};

export function RouteThroughputChart({ data = SAMPLE, className }: RouteThroughputChartProps) {
  const { reduce } = useChartMotion();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [pinned, setPinned] = React.useState<string | null>(null);
  const max = Math.max(...data.map((row) => row.count), 1);
  const activeKey = pinned ?? hovered;
  const total = data.reduce((sum, row) => sum + row.count, 0);

  return (
    <ChartSurface
      palette="growth"
      className={cn('flex flex-col gap-5 p-5 sm:p-6', className)}
      aria-label="API route throughput"
    >
      <div className="relative z-10 flex items-end justify-between gap-3">
        <div>
          <ChartEyebrow>API requests</ChartEyebrow>
          <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Last 24 hours
          </p>
        </div>
        <p className="text-[1.65rem] leading-none font-semibold tabular-nums tracking-tighter text-neutral-900 dark:text-neutral-100">
          <AnimatedNumber value={total} format={formatCompact} />
        </p>
      </div>

      <ul className="relative z-10 flex flex-col gap-3.5" onMouseLeave={() => setHovered(null)}>
        {data.map((row, index) => {
          const key = `${row.method}:${row.path}`;
          const dimmed = activeKey != null && activeKey !== key;
          const hot = activeKey === key;
          const share = (row.count / total) * 100;

          return (
            <li key={key}>
              <button
                type="button"
                onMouseEnter={() => setHovered(key)}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((current) => (current === key ? null : key))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setPinned((current) => (current === key ? null : key));
                  }
                }}
                aria-pressed={pinned === key}
                className={cn(
                  'w-full rounded-xl text-left transition-opacity duration-200',
                  'focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300',
                  dimmed && 'opacity-35',
                )}
              >
                <span className="flex items-baseline gap-2.5">
                  <span className="w-5 font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider',
                      METHOD_TONE[row.method] ??
                        'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400',
                    )}
                  >
                    {row.method}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-neutral-700 dark:text-neutral-300">
                    {row.path}
                  </span>
                  <span className="text-xs font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
                    {formatCompact(row.count)}
                  </span>
                  <span className="w-8 text-right text-[10px] tabular-nums text-neutral-400 dark:text-neutral-500">
                    {share.toFixed(0)}%
                  </span>
                </span>
                <span className="mt-1.5 ml-7 block h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                  <motion.span
                    className="block h-full origin-left rounded-full"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, var(--chart-from), var(--chart-to))',
                      boxShadow: hot ? '0 0 16px var(--chart-glow)' : 'none',
                      width: '100%',
                    }}
                    initial={reduce ? { scaleX: row.count / max } : { scaleX: 0 }}
                    animate={{ scaleX: row.count / max }}
                    transition={
                      reduce ? { duration: 0 } : { ...SPRING_ENTRANCE, delay: index * 0.05 }
                    }
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="relative z-10 text-[11px] text-neutral-400 dark:text-neutral-500">
        Click a route to pin it{pinned ? ' · click again to clear' : ''}
      </p>
    </ChartSurface>
  );
}
