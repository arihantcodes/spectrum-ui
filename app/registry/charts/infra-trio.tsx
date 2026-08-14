/**
 * Spectrum UI — Infra Trio
 *
 * Three aligned sparks sharing one time cursor.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ChartEyebrow,
  ChartGlowFilter,
  ChartGradient,
  ChartSurface,
  RechartsCursor,
  SPRING_SNAPPY,
  useChartMotion,
} from './chart-kit';

export type InfraStatus = 'ok' | 'warn' | 'critical';

export interface InfraSeries {
  key: string;
  label: string;
  unit: string;
  status: InfraStatus;
  points: { t: string; value: number }[];
}

export interface InfraTrioChartProps {
  series?: InfraSeries[];
  className?: string;
}

function spark(offset: number, base: number, amp: number) {
  return Array.from({ length: 24 }, (_, i) => ({
    t: `${i}`,
    value: Math.round(base + Math.sin(i / 2.2 + offset) * amp + ((i * 3) % 5) - 2),
  }));
}

const SAMPLE: InfraSeries[] = [
  { key: 'cpu', label: 'CPU', unit: '%', status: 'ok', points: spark(0.2, 34, 12) },
  { key: 'mem', label: 'Memory', unit: '%', status: 'warn', points: spark(1.1, 71, 8) },
  { key: 'disk', label: 'Disk', unit: '%', status: 'ok', points: spark(2.4, 48, 6) },
];

const STATUS_DOT: Record<InfraStatus, string> = {
  ok: 'bg-emerald-400 shadow-[0_0_10px_#34d399]',
  warn: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]',
  critical: 'bg-rose-400 shadow-[0_0_10px_#fb7185]',
};

const STATUS_LABEL: Record<InfraStatus, string> = {
  ok: 'Healthy',
  warn: 'Elevated',
  critical: 'Critical',
};

export function InfraTrioChart({ series = SAMPLE, className }: InfraTrioChartProps) {
  const { reduce } = useChartMotion();
  const [cursorIndex, setCursorIndex] = React.useState<number | null>(null);
  const id = React.useId().replace(/:/g, '');

  return (
    <ChartSurface
      palette="ink"
      className={cn('flex flex-col gap-5 p-5 sm:p-6', className)}
      aria-label="Infrastructure metrics"
    >
      <div className="relative z-10 flex items-end justify-between gap-3">
        <ChartEyebrow>Hosts · prod-eu</ChartEyebrow>
        <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
          {cursorIndex == null ? 'Live' : `t+${cursorIndex}`}
        </p>
      </div>
      <ul className="relative z-10 flex flex-col gap-5">
        {series.map((row) => {
          const last = row.points[row.points.length - 1];
          const index = cursorIndex ?? row.points.length - 1;
          const point = row.points[index] ?? last;
          return (
            <li key={row.key} className="grid grid-cols-[6.25rem_1fr_3.75rem] items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <motion.span
                    aria-hidden="true"
                    className={cn('size-1.5 rounded-full', STATUS_DOT[row.status])}
                    animate={reduce || row.status === 'ok' ? { scale: 1 } : { scale: [1, 1.35, 1] }}
                    transition={
                      row.status === 'ok'
                        ? SPRING_SNAPPY
                        : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                    }
                  />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {row.label}
                  </span>
                </div>
                <p className="mt-0.5 pl-3.5 text-[10px] tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                  {STATUS_LABEL[row.status]}
                </p>
              </div>
              <div className="h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={row.points}
                    margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
                    onMouseMove={(state) => {
                      if (typeof state?.activeTooltipIndex === 'number') {
                        setCursorIndex(state.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setCursorIndex(null)}
                  >
                    <defs>
                      <ChartGlowFilter id={`infra-${row.key}-${id}`} stdDeviation={3.5} />
                      <ChartGradient
                        id={`infra-fill-${row.key}-${id}`}
                        fromOpacity={0.38}
                        midOpacity={0.1}
                        toOpacity={0}
                      />
                    </defs>
                    <YAxis hide domain={['dataMin - 6', 'dataMax + 6']} />
                    <Tooltip
                      cursor={<RechartsCursor />}
                      content={() => null}
                      isAnimationActive={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="none"
                      fill={`url(#infra-fill-${row.key}-${id})`}
                      isAnimationActive={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--chart-solid)"
                      strokeWidth={1.9}
                      dot={false}
                      isAnimationActive={false}
                      filter={`url(#infra-${row.key}-${id})`}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <span className="text-right text-lg font-semibold tabular-nums tracking-tighter text-neutral-900 dark:text-neutral-100">
                {point.value}
                <span className="text-[11px] font-medium text-neutral-400">{row.unit}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </ChartSurface>
  );
}
