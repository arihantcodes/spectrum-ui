/**
 * Spectrum UI — Chart kit
 *
 * Shared data, colors, SVG fills, tooltip, and axis chrome for the Charts
 * collection. Copy this file with any chart you install.
 *
 * Dependencies: recharts, @/lib/utils
 */

'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import type { TooltipProps } from 'recharts';
import { CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

export const MONTHLY_TRAFFIC = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 314, mobile: 140 },
  { month: 'Jul', desktop: 280, mobile: 180 },
  { month: 'Aug', desktop: 198, mobile: 110 },
  { month: 'Sep', desktop: 249, mobile: 160 },
  { month: 'Oct', desktop: 331, mobile: 210 },
  { month: 'Nov', desktop: 256, mobile: 170 },
  { month: 'Dec', desktop: 294, mobile: 200 },
];

export const BROWSER_SHARE = [
  { name: 'Chrome', value: 275 },
  { name: 'Safari', value: 200 },
  { name: 'Firefox', value: 187 },
  { name: 'Edge', value: 173 },
  { name: 'Other', value: 90 },
];

export const RADAR_METRICS = [
  { metric: 'Speed', desktop: 186, mobile: 80 },
  { metric: 'Reliability', desktop: 305, mobile: 200 },
  { metric: 'Usability', desktop: 237, mobile: 120 },
  { metric: 'Security', desktop: 273, mobile: 190 },
  { metric: 'Scale', desktop: 209, mobile: 130 },
  { metric: 'Cost', desktop: 214, mobile: 140 },
];

export const SERIES = {
  desktop: { label: 'Desktop', color: 'var(--spectrum-chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--spectrum-chart-2)' },
} as const;

export const CHART_COLORS = [
  'var(--spectrum-chart-1)',
  'var(--spectrum-chart-2)',
  'var(--spectrum-chart-3)',
  'var(--spectrum-chart-4)',
  'var(--spectrum-chart-5)',
] as const;

export const chartVarsClassName =
  '[--spectrum-chart-1:#4f46e5] [--spectrum-chart-2:#0891b2] [--spectrum-chart-3:#d97706] [--spectrum-chart-4:#db2777] [--spectrum-chart-5:#059669] dark:[--spectrum-chart-1:#818cf8] dark:[--spectrum-chart-2:#22d3ee] dark:[--spectrum-chart-3:#fbbf24] dark:[--spectrum-chart-4:#f472b6] dark:[--spectrum-chart-5:#34d399]';

export type BarFillVariant =
  | 'default'
  | 'hatched'
  | 'duotone'
  | 'duotone-reverse'
  | 'gradient'
  | 'stripped';

export type AreaFillVariant = 'gradient' | 'gradient-reverse' | 'solid' | 'hatched' | 'dotted';

export type StrokeVariant = 'solid' | 'dashed';

export function useChartId(prefix = 'chart') {
  const reactId = React.useId().replace(/:/g, '');
  return `${prefix}-${reactId}`;
}

export function useChartMotion() {
  const reduce = Boolean(useReducedMotion());
  return {
    reduce,
    isAnimationActive: !reduce,
    animationDuration: reduce ? 0 : 700,
  };
}

export function ChartFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('h-[280px] w-full text-neutral-400 dark:text-neutral-500', chartVarsClassName, className)}>
      {children}
    </div>
  );
}

export function ChartLegend({
  items = [
    { label: SERIES.desktop.label, color: SERIES.desktop.color },
    { label: SERIES.mobile.label, color: SERIES.mobile.color },
  ],
  className,
}: {
  items?: { label: string; color: string }[];
  className?: string;
}) {
  return (
    <ul className={cn('mb-2 flex justify-end gap-3 text-[11px] text-neutral-500 dark:text-neutral-400', className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px]" style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-neutral-200/80 bg-white px-3 py-2 text-xs shadow-md dark:border-neutral-800 dark:bg-neutral-950">
      {label != null ? (
        <p className="mb-1.5 font-medium text-neutral-900 dark:text-neutral-100">{String(label)}</p>
      ) : null}
      <ul className="flex flex-col gap-1">
        {payload.map((item) => (
          <li key={String(item.dataKey ?? item.name)} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ background: String(item.color ?? item.payload?.fill ?? SERIES.desktop.color) }}
            />
            <span className="text-neutral-500 dark:text-neutral-400">{item.name}</span>
            <span className="ml-auto font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              {typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value ?? '')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const axisTick = {
  fill: 'currentColor',
  fontSize: 11,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export function ChartGrid(props: React.ComponentProps<typeof CartesianGrid>) {
  return (
    <CartesianGrid
      vertical={false}
      stroke="currentColor"
      strokeOpacity={0.18}
      strokeDasharray="3 3"
      {...props}
    />
  );
}

export function ChartXAxis(props: React.ComponentProps<typeof XAxis>) {
  return (
    <XAxis
      axisLine={false}
      tickLine={false}
      tickMargin={8}
      tick={axisTick}
      {...props}
    />
  );
}

export function ChartYAxis(props: React.ComponentProps<typeof YAxis>) {
  return (
    <YAxis
      axisLine={false}
      tickLine={false}
      tickMargin={8}
      tick={axisTick}
      width={36}
      {...props}
    />
  );
}

export function ChartGlowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export function BarFillDefs({
  id,
  color,
  variant,
}: {
  id: string;
  color: string;
  variant: BarFillVariant;
}) {
  return (
    <>
      {variant === 'hatched' ? (
        <pattern
          id={`${id}-hatched`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="7" height="7" fill={color} opacity={0.16} />
          <line x1="0" y1="0" x2="0" y2="7" stroke={color} strokeWidth="2.4" />
        </pattern>
      ) : null}
      {variant === 'duotone' || variant === 'duotone-reverse' ? (
        <linearGradient
          id={`${id}-${variant}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity={variant === 'duotone' ? 1 : 0.28}
          />
          <stop offset="50%" stopColor={color} stopOpacity={variant === 'duotone' ? 1 : 0.28} />
          <stop
            offset="50%"
            stopColor={color}
            stopOpacity={variant === 'duotone' ? 0.28 : 1}
          />
          <stop offset="100%" stopColor={color} stopOpacity={variant === 'duotone' ? 0.28 : 1} />
        </linearGradient>
      ) : null}
      {variant === 'gradient' ? (
        <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0.18} />
        </linearGradient>
      ) : null}
      {variant === 'stripped' ? (
        <pattern id={`${id}-stripped`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={color} opacity={0.14} />
          <rect width="4" height="8" fill={color} />
        </pattern>
      ) : null}
    </>
  );
}

export function barFillUrl(id: string, variant: BarFillVariant, color: string) {
  if (variant === 'default') return color;
  return `url(#${id}-${variant})`;
}

export function AreaFillDefs({
  id,
  color,
  variant,
}: {
  id: string;
  color: string;
  variant: AreaFillVariant;
}) {
  return (
    <>
      {variant === 'gradient' || variant === 'gradient-reverse' ? (
        <linearGradient id={`${id}-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={color}
            stopOpacity={variant === 'gradient' ? 0.55 : 0.08}
          />
          <stop
            offset="95%"
            stopColor={color}
            stopOpacity={variant === 'gradient' ? 0.08 : 0.55}
          />
        </linearGradient>
      ) : null}
      {variant === 'hatched' ? (
        <pattern
          id={`${id}-hatched`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill={color} opacity={0.1} />
          <line x1="0" y1="0" x2="0" y2="8" stroke={color} strokeWidth="2" />
        </pattern>
      ) : null}
      {variant === 'dotted' ? (
        <pattern id={`${id}-dotted`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.15" fill={color} />
        </pattern>
      ) : null}
    </>
  );
}

export function areaFillUrl(id: string, variant: AreaFillVariant, color: string) {
  if (variant === 'solid') return color;
  return `url(#${id}-${variant})`;
}

export function ChartLoadingBars({ count = 12 }: { count?: number }) {
  return (
    <div className="flex h-full items-end gap-2 px-2 pb-6 pt-8">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex-1 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-800"
          style={{ height: `${32 + ((index * 37) % 58)}%` }}
        />
      ))}
    </div>
  );
}
