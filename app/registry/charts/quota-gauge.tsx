/**
 * Spectrum UI — Quota Gauge
 *
 * Remaining budget as an arc with ticks, not a circular progress bar.
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
  formatCompact,
  useChartMotion,
} from './chart-kit';

export interface QuotaGaugeChartProps {
  used?: number;
  limit?: number;
  unit?: string;
  caption?: string;
  className?: string;
}

const VIEW = 200;
const CX = 100;
const CY = 118;
const R = 82;
const START = (Math.PI * 6) / 5;
const SWEEP = (Math.PI * 8) / 5;

function polar(angle: number, radius = R) {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function arcPath(from: number, to: number, radius = R) {
  const start = polar(from, radius);
  const end = polar(to, radius);
  const large = to - from > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
}

export function QuotaGaugeChart({
  used = 7240,
  limit = 10000,
  unit = 'tokens',
  caption,
  className,
}: QuotaGaugeChartProps) {
  const { reduce, duration } = useChartMotion();
  const ratio = Math.min(1, used / Math.max(limit, 1));
  const nearLimit = ratio >= 0.85;
  const remaining = Math.max(0, limit - used);
  const fillTo = START + SWEEP * ratio;
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const needle = polar(fillTo, R);
  const resolvedCaption =
    caption ?? (nearLimit ? '3 days of runway' : `${formatCompact(remaining)} remaining`);
  const id = React.useId().replace(/:/g, '');
  const stroke = nearLimit ? '#fb7185' : 'var(--chart-solid)';

  return (
    <ChartSurface
      palette={nearLimit ? 'heat' : 'growth'}
      className={cn('flex flex-col items-center p-5 sm:p-6', className)}
      aria-label={`Quota ${formatCompact(used)} of ${formatCompact(limit)} ${unit} used`}
    >
      <ChartEyebrow className="relative z-10 self-start">Monthly quota</ChartEyebrow>

      <svg
        viewBox={`0 0 ${VIEW} 156`}
        className="relative z-10 mt-1 w-full max-w-[300px]"
        aria-hidden="true"
      >
        <defs>
          <ChartGlowFilter id={`quota-glow-${id}`} stdDeviation={7} />
          <linearGradient id={`quota-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--chart-from)" />
            <stop offset="55%" stopColor="var(--chart-mid)" />
            <stop offset="100%" stopColor="var(--chart-to)" />
          </linearGradient>
        </defs>
        <path
          d={arcPath(START, START + SWEEP)}
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          className="text-neutral-100 dark:text-neutral-900"
        />
        <motion.path
          d={arcPath(START, fillTo)}
          fill="none"
          stroke={nearLimit ? stroke : `url(#quota-grad-${id})`}
          strokeWidth="16"
          strokeLinecap="round"
          filter={`url(#quota-glow-${id})`}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: duration(1.15), ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={arcPath(START, fillTo, R)}
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity={0.35}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: duration(1.15), ease: [0.16, 1, 0.3, 1] }}
        />
        {ticks.map((tick) => {
          const angle = START + SWEEP * tick;
          const inner = polar(angle, R - 24);
          const outer = polar(angle, R - 15);
          const label = polar(angle, R - 36);
          return (
            <g key={tick}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="currentColor"
                strokeWidth={tick === 0 || tick === 1 ? 2 : 1.5}
                className="text-neutral-300 dark:text-neutral-700"
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-neutral-400 text-[9px] tracking-wide"
              >
                {tick * 100}
              </text>
            </g>
          );
        })}
        <circle cx={needle.x} cy={needle.y} r="9" fill={stroke} opacity={0.22} />
        <circle cx={needle.x} cy={needle.y} r="4.5" fill={stroke} />
        <circle cx={needle.x} cy={needle.y} r="1.8" fill="#fff" />
      </svg>

      <p className="relative z-10 -mt-8 text-[2.85rem] leading-none font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
        <AnimatedNumber value={ratio * 100} format={(value) => `${value.toFixed(0)}%`} />
      </p>
      <p className="relative z-10 mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
        {resolvedCaption}
      </p>

      <dl className="relative z-10 mt-5 grid w-full grid-cols-2 gap-3 border-t border-neutral-200/70 pt-4 dark:border-neutral-800">
        <div>
          <dt className="text-[10px] tracking-[0.16em] text-neutral-400 uppercase dark:text-neutral-500">
            Used
          </dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
            {formatCompact(used)} {unit}
          </dd>
        </div>
        <div className="text-right">
          <dt className="text-[10px] tracking-[0.16em] text-neutral-400 uppercase dark:text-neutral-500">
            Limit
          </dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100">
            {formatCompact(limit)} {unit}
          </dd>
        </div>
      </dl>
    </ChartSurface>
  );
}
