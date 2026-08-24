'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Rectangle } from 'recharts';
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

export type CandlePoint = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type PricePoint = {
  time: string;
  price: number;
};

export type SparkPoint = {
  i: number;
  value: number;
};

export type WatchlistRow = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  series: SparkPoint[];
};

export const SOL_CANDLES: CandlePoint[] = [
  { date: 'Jul 1', open: 128.4, high: 132.1, low: 126.8, close: 131.2, volume: 38_400_000 },
  { date: 'Jul 2', open: 131.2, high: 134.6, low: 129.9, close: 130.4, volume: 41_200_000 },
  { date: 'Jul 3', open: 130.4, high: 133.8, low: 127.1, close: 128.6, volume: 52_800_000 },
  { date: 'Jul 6', open: 128.6, high: 129.4, low: 121.2, close: 123.8, volume: 61_500_000 },
  { date: 'Jul 7', open: 123.8, high: 126.9, low: 122.4, close: 125.1, volume: 44_100_000 },
  { date: 'Jul 8', open: 125.1, high: 131.7, low: 124.8, close: 130.9, volume: 48_600_000 },
  { date: 'Jul 9', open: 130.9, high: 136.4, low: 130.2, close: 135.6, volume: 55_200_000 },
  { date: 'Jul 10', open: 135.6, high: 137.2, low: 132.8, close: 133.4, volume: 39_800_000 },
  { date: 'Jul 13', open: 133.4, high: 139.8, low: 133.1, close: 138.9, volume: 47_300_000 },
  { date: 'Jul 14', open: 138.9, high: 142.6, low: 137.4, close: 141.2, volume: 51_900_000 },
  { date: 'Jul 15', open: 141.2, high: 143.1, low: 136.5, close: 137.8, volume: 58_400_000 },
  { date: 'Jul 16', open: 137.8, high: 140.4, low: 135.9, close: 139.6, volume: 36_700_000 },
  { date: 'Jul 17', open: 139.6, high: 146.2, low: 139.1, close: 145.4, volume: 62_100_000 },
  { date: 'Jul 20', open: 145.4, high: 147.8, low: 141.6, close: 142.3, volume: 49_500_000 },
  { date: 'Jul 21', open: 142.3, high: 144.9, low: 140.8, close: 144.1, volume: 33_200_000 },
  { date: 'Jul 22', open: 144.1, high: 148.6, low: 143.7, close: 147.9, volume: 54_800_000 },
  { date: 'Jul 23', open: 147.9, high: 149.4, low: 144.2, close: 145.6, volume: 42_600_000 },
  { date: 'Jul 24', open: 145.6, high: 151.2, low: 145.1, close: 150.4, volume: 57_300_000 },
];

export const AAPL_CANDLES: CandlePoint[] = [
  { date: 'Jul 1', open: 214.2, high: 216.8, low: 213.1, close: 215.6, volume: 48_200_000 },
  { date: 'Jul 2', open: 215.6, high: 217.4, low: 214.8, close: 216.9, volume: 41_600_000 },
  { date: 'Jul 3', open: 216.9, high: 218.1, low: 212.4, close: 213.2, volume: 55_400_000 },
  { date: 'Jul 6', open: 213.2, high: 214.6, low: 208.9, close: 210.4, volume: 62_800_000 },
  { date: 'Jul 7', open: 210.4, high: 212.8, low: 209.6, close: 211.9, volume: 39_100_000 },
  { date: 'Jul 8', open: 211.9, high: 217.3, low: 211.4, close: 216.8, volume: 51_700_000 },
  { date: 'Jul 9', open: 216.8, high: 219.6, low: 216.1, close: 218.4, volume: 44_300_000 },
  { date: 'Jul 10', open: 218.4, high: 219.2, low: 214.7, close: 215.1, volume: 47_900_000 },
  { date: 'Jul 13', open: 215.1, high: 221.4, low: 214.8, close: 220.6, volume: 53_200_000 },
  { date: 'Jul 14', open: 220.6, high: 223.8, low: 219.9, close: 222.1, volume: 49_800_000 },
  { date: 'Jul 15', open: 222.1, high: 222.9, low: 217.6, close: 218.4, volume: 58_100_000 },
  { date: 'Jul 16', open: 218.4, high: 221.2, low: 217.9, close: 220.8, volume: 36_400_000 },
  { date: 'Jul 17', open: 220.8, high: 226.4, low: 220.3, close: 225.7, volume: 61_500_000 },
  { date: 'Jul 20', open: 225.7, high: 227.1, low: 222.8, close: 223.4, volume: 42_700_000 },
  { date: 'Jul 21', open: 223.4, high: 225.6, low: 222.1, close: 224.9, volume: 33_900_000 },
  { date: 'Jul 22', open: 224.9, high: 229.3, low: 224.4, close: 228.6, volume: 56_200_000 },
  { date: 'Jul 23', open: 228.6, high: 229.8, low: 225.2, close: 226.1, volume: 40_800_000 },
  { date: 'Jul 24', open: 226.1, high: 231.4, low: 225.8, close: 230.2, volume: 52_600_000 },
];

const SOL_PRICES = [
  128.4, 129.1, 127.6, 130.8, 132.4, 131.2, 129.8, 133.6, 136.2, 134.9, 132.1, 135.8, 138.4, 141.2,
  139.6, 137.8, 140.4, 144.1, 146.8, 145.2, 142.6, 147.4, 149.1, 150.4,
];
const NVDA_PRICES = [
  118.2, 119.4, 117.8, 121.6, 124.1, 123.2, 126.8, 129.4, 128.1, 131.6, 134.2, 132.8, 136.4, 139.1,
  137.6, 141.2, 144.8, 143.2, 147.6, 151.4, 149.8, 153.2, 156.1, 158.4,
];
const ETH_PRICES = [
  3420, 3398, 3444, 3482, 3461, 3510, 3548, 3522, 3494, 3556, 3602, 3580, 3624, 3668, 3640, 3612,
  3674, 3718, 3690, 3742, 3788, 3760, 3812, 3846,
];
const TVL_VALUES = [
  6.12, 6.18, 6.09, 6.24, 6.41, 6.36, 6.28, 6.52, 6.71, 6.64, 6.48, 6.69, 6.88, 7.04, 6.96, 6.82,
  7.11, 7.28, 7.19, 7.42, 7.58, 7.51, 7.69, 7.84,
];

function toPriceSeries(values: number[], prefix = 't'): PricePoint[] {
  return values.map((price, index) => ({ time: `${prefix}${index + 1}`, price }));
}

function toSpark(values: number[]): SparkPoint[] {
  return values.map((value, i) => ({ i, value }));
}

export const SOL_PRICE = toPriceSeries(SOL_PRICES);
export const NVDA_PRICE = toPriceSeries(NVDA_PRICES);
export const ETH_PRICE = toPriceSeries(ETH_PRICES);
export const SOLANA_TVL = toPriceSeries(TVL_VALUES.map((value) => value * 1_000_000_000));

export const WATCHLIST: WatchlistRow[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 150.4,
    change: 17.13,
    series: toSpark(SOL_PRICES),
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3846,
    change: 12.46,
    series: toSpark(ETH_PRICES),
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    price: 0.84,
    change: -6.21,
    series: toSpark([0.91, 0.89, 0.9, 0.87, 0.86, 0.88, 0.85, 0.83, 0.84, 0.82, 0.81, 0.84]),
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: 230.2,
    change: 7.47,
    series: toSpark(AAPL_CANDLES.map((row) => row.close)),
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    price: 158.4,
    change: 34.01,
    series: toSpark(NVDA_PRICES),
  },
];

export function formatUsd(value: number, compact = false) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 2 : value >= 100 ? 2 : value >= 1 ? 2 : 4,
  }).format(value);
}

export function formatPct(value: number) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function seriesDelta(values: number[]) {
  if (values.length < 2) return 0;
  const first = values[0];
  const last = values[values.length - 1];
  if (first === 0) return 0;
  return ((last - first) / first) * 100;
}

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
  '[--spectrum-chart-1:#2563eb] [--spectrum-chart-2:#f59e0b] [--spectrum-chart-3:#0d9488] [--spectrum-chart-4:#7c3aed] [--spectrum-chart-5:#64748b] [--spectrum-chart-surface:#fff] [--spectrum-chart-up:#059669] [--spectrum-chart-down:#e11d48] dark:[--spectrum-chart-1:#60a5fa] dark:[--spectrum-chart-2:#fbbf24] dark:[--spectrum-chart-3:#2dd4bf] dark:[--spectrum-chart-4:#a78bfa] dark:[--spectrum-chart-5:#94a3b8] dark:[--spectrum-chart-surface:#0a0a0a] dark:[--spectrum-chart-up:#34d399] dark:[--spectrum-chart-down:#fb7185]';

export const chartVarsNeutral =
  '[--spectrum-chart-1:#171717] [--spectrum-chart-2:#737373] [--spectrum-chart-3:#52525b] [--spectrum-chart-4:#a3a3a3] [--spectrum-chart-5:#d4d4d8] [--spectrum-chart-surface:#fff] [--spectrum-chart-up:#059669] [--spectrum-chart-down:#e11d48] dark:[--spectrum-chart-1:#f5f5f5] dark:[--spectrum-chart-2:#a3a3a3] dark:[--spectrum-chart-3:#d4d4d8] dark:[--spectrum-chart-4:#737373] dark:[--spectrum-chart-5:#52525b] dark:[--spectrum-chart-surface:#0a0a0a] dark:[--spectrum-chart-up:#34d399] dark:[--spectrum-chart-down:#fb7185]';

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const BAR_STAGGER = 0.04;
export const BAR_GROW = 0.22;
export const REVEAL_DURATION = 0.28;
export const HOVER_MS = 160;
export const HOVER_OPACITY = 0.28;
export const HOVER_TRANSITION = `opacity ${HOVER_MS}ms cubic-bezier(0.23, 1, 0.32, 1)`;

export type BarFillVariant =
  | 'default'
  | 'hatched'
  | 'duotone'
  | 'duotone-reverse'
  | 'gradient'
  | 'stripped';

export type AreaFillVariant = 'gradient' | 'gradient-reverse' | 'solid' | 'hatched' | 'dotted';

export type StrokeVariant = 'solid' | 'dashed' | 'animated-dashed';

export function useChartId(prefix = 'chart') {
  const reactId = React.useId().replace(/:/g, '');
  return `${prefix}-${reactId}`;
}

export function useChartMotion() {
  const reduce = Boolean(useReducedMotion());
  return {
    reduce,
    isAnimationActive: !reduce,
    animationDuration: reduce ? 0 : 220,
    ease: EASE_OUT,
  };
}

export function useIntroStartedAt() {
  const [introStartedAt] = React.useState(() => Date.now());
  return introStartedAt;
}

const HoverIndexContext = React.createContext<number | null>(null);

export function HoverIndexProvider({
  value,
  children,
}: {
  value: number | null;
  children: React.ReactNode;
}) {
  return <HoverIndexContext.Provider value={value}>{children}</HoverIndexContext.Provider>;
}

export function readActiveTooltipIndex(state: { activeTooltipIndex?: number | string | null }) {
  return typeof state.activeTooltipIndex === 'number' ? state.activeTooltipIndex : null;
}

export function strokeDasharray(variant: StrokeVariant) {
  return variant === 'solid' ? undefined : '5 5';
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

export function ChartPlotSurface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative min-h-0 flex-1', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle,currentColor_0.55px,transparent_0.55px)] [background-size:12px_12px]"
      />
      <div className="relative h-full min-h-0">{children}</div>
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
    <ul className={cn('mb-2 flex justify-end gap-3 text-[11px] tracking-wide text-neutral-500 dark:text-neutral-400', className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-[3px] ring-1 ring-black/5 dark:ring-white/10"
            style={{ background: item.color }}
          />
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
  const reduce = Boolean(useReducedMotion());

  if (!active || !payload?.length) {
    return <span className="invisible block h-10 w-28" aria-hidden />;
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.97)' }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, transform: 'scale(1)' }}
      transition={{ duration: 0.16, ease: EASE_OUT }}
      className="min-w-[7.5rem] rounded-lg border border-neutral-200/70 bg-white/75 px-3 py-2 text-xs shadow-xl backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/70"
    >
      {label != null ? (
        <p className="mb-1.5 font-medium text-neutral-900 dark:text-neutral-100">{String(label)}</p>
      ) : null}
      <ul className="flex flex-col gap-1">
        {payload
          .filter((item) => item.type !== 'none')
          .map((item) => (
            <li key={String(item.dataKey ?? item.name)} className="flex items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-[3px] ring-1 ring-black/5 dark:ring-white/10"
                style={{ background: String(item.color ?? item.payload?.fill ?? SERIES.desktop.color) }}
              />
              <span className="text-neutral-500 dark:text-neutral-400">{item.name}</span>
              <span className="ml-auto font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                {typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value ?? '')}
              </span>
            </li>
          ))}
      </ul>
    </motion.div>
  );
}

export const axisTick = {
  fill: 'currentColor',
  fontSize: 11,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const chartGrid = {
  vertical: false,
  stroke: 'currentColor',
  strokeOpacity: 0.14,
  strokeDasharray: '3 3',
} satisfies Partial<React.ComponentProps<typeof CartesianGrid>>;

export const chartXAxis = {
  axisLine: false,
  tickLine: false,
  tickMargin: 8,
  tick: axisTick,
  minTickGap: 8,
} satisfies Partial<React.ComponentProps<typeof XAxis>>;

export const chartYAxis = {
  axisLine: false,
  tickLine: false,
  tickMargin: 8,
  tick: axisTick,
  width: 44,
} satisfies Partial<React.ComponentProps<typeof YAxis>>;

export function ChartGlowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.5 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export function RevealMask({
  id,
  introStartedAt,
  reduce = false,
}: {
  id: string;
  introStartedAt: number;
  reduce?: boolean;
}) {
  // eslint-disable-next-line react-hooks/purity -- one-shot intro is anchored to mount time
  const elapsed = Date.now() - introStartedAt;
  const durationMs = REVEAL_DURATION * 1000;
  const finished = reduce || elapsed >= durationMs;
  const from = elapsed <= 0 ? 0 : Math.min(1, elapsed / durationMs);

  return (
    <mask
      id={id}
      maskUnits="userSpaceOnUse"
      maskContentUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="100%"
      height="100%"
    >
      {finished ? (
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
      ) : (
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          initial={{ transform: `scaleX(${from})` }}
          animate={{ transform: 'scaleX(1)' }}
          transition={{
            duration: (durationMs - elapsed) / 1000,
            ease: EASE_OUT,
          }}
          style={{ transformOrigin: 'left center' }}
        />
      )}
    </mask>
  );
}

export function AnimatedDashedStroke() {
  const reduce = Boolean(useReducedMotion());
  if (reduce) return null;

  return (
    <>
      <animate
        key="dasharray"
        attributeName="stroke-dasharray"
        values="5 5; 0 5; 5 5"
        dur="1s"
        repeatCount="indefinite"
        calcMode="linear"
      />
      <animate
        key="dashoffset"
        attributeName="stroke-dashoffset"
        values="0; -10"
        dur="1s"
        repeatCount="indefinite"
        calcMode="linear"
      />
    </>
  );
}

export type ChartDotRenderProps = {
  cx?: number;
  cy?: number;
  fill?: string;
  index?: number;
};

export function ChartRestingDot({
  cx,
  cy,
  color,
  maskId,
  r = 3,
}: {
  cx?: number;
  cy?: number;
  color: string;
  maskId?: string;
  r?: number;
}) {
  if (cx == null || cy == null) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      stroke="var(--spectrum-chart-surface)"
      strokeWidth={1.5}
      mask={maskId ? `url(#${maskId})` : undefined}
    />
  );
}

export function ChartActiveDot({
  cx,
  cy,
  color,
}: {
  cx?: number;
  cy?: number;
  color?: string;
}) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6.5} fill="var(--spectrum-chart-surface)" />
      <circle cx={cx} cy={cy} r={3.25} fill={color ?? SERIES.desktop.color} />
    </g>
  );
}

type GrowAxis = {
  index?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  background?: { x?: number; y?: number; width?: number; height?: number };
};

export type GrowBarOptions = {
  horizontal?: boolean;
  introStartedAt: number;
  dataLength: number;
  reduce?: boolean;
  radius?: number | [number, number, number, number];
  stripped?: boolean;
  glowId?: string;
};

function getBarGrowAnimation({
  index,
  dataLength,
  horizontal,
  introStartedAt,
  reduce,
}: {
  index: number;
  dataLength: number;
  horizontal: boolean;
  introStartedAt: number;
  reduce: boolean;
}) {
  if (reduce || index < 0 || dataLength <= 0) return null;

  const startMs = index * BAR_STAGGER * 1000;
  const durationMs = BAR_GROW * 1000;
  const endMs = startMs + durationMs;
  const elapsed = Date.now() - introStartedAt;

  if (elapsed >= endMs) return null;

  const from = elapsed <= startMs ? 0 : (elapsed - startMs) / durationMs;
  const axis = horizontal ? 'X' : 'Y';

  return {
    initial: { transform: `scale${axis}(${from})` },
    animate: { transform: `scale${axis}(1)` },
    transition: {
      duration: (endMs - Math.max(elapsed, startMs)) / 1000,
      ease: EASE_OUT,
      delay: Math.max(0, startMs - elapsed) / 1000,
    },
    style: {
      transformOrigin: horizontal ? 'left center' : 'center bottom',
    } as React.CSSProperties,
  };
}

export function GrowBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  index = 0,
  background,
  horizontal = false,
  introStartedAt,
  dataLength,
  reduce = false,
  radius = 4,
  stripped = false,
  glowId,
}: GrowAxis & GrowBarOptions) {
  const grow = getBarGrowAnimation({
    index,
    dataLength,
    horizontal,
    introStartedAt,
    reduce,
  });
  const hoverIndex = React.useContext(HoverIndexContext);
  const dimmed = hoverIndex != null && hoverIndex !== index;
  const paintedHeight = Math.max(0, height - (stripped && !horizontal ? 3 : 0));
  const paintedWidth = Math.max(0, width - (stripped && horizontal ? 3 : 0));
  const hit = background ?? { x, y, width, height };

  const painted = (
    <>
      <Rectangle
        x={x}
        y={y}
        width={paintedWidth}
        height={paintedHeight}
        radius={radius}
        fill={fill}
        filter={glowId ? `url(#${glowId})` : undefined}
        style={{
          opacity: dimmed ? HOVER_OPACITY : 1,
          transition: HOVER_TRANSITION,
        }}
      />
      {stripped && !horizontal ? (
        <Rectangle
          x={x}
          y={y - 3}
          width={width}
          height={2}
          radius={1}
          fill={fill}
          style={{
            opacity: dimmed ? HOVER_OPACITY : 1,
            transition: HOVER_TRANSITION,
          }}
        />
      ) : null}
      {stripped && horizontal ? (
        <Rectangle
          x={x + width - 2}
          y={y}
          width={2}
          height={height}
          radius={1}
          fill={fill}
          style={{
            opacity: dimmed ? HOVER_OPACITY : 1,
            transition: HOVER_TRANSITION,
          }}
        />
      ) : null}
    </>
  );

  return (
    <g style={{ cursor: 'pointer' }}>
      <rect
        x={hit.x ?? x}
        y={hit.y ?? y}
        width={hit.width ?? width}
        height={hit.height ?? height}
        fill="transparent"
      />
      {grow ? (
        <motion.g
          initial={grow.initial}
          animate={grow.animate}
          transition={grow.transition}
          style={grow.style}
        >
          {painted}
        </motion.g>
      ) : (
        painted
      )}
    </g>
  );
}

export function createGrowBarShape(options: GrowBarOptions) {
  function Shape(props: unknown) {
    return <GrowBar {...(props as GrowAxis)} {...options} />;
  }
  Shape.displayName = 'SpectrumGrowBar';
  return Shape;
}

export function markOpacity(active: string | number | null, key: string | number) {
  if (active == null) return 1;
  return active === key ? 1 : HOVER_OPACITY;
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
        <linearGradient id={`${id}-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={variant === 'duotone' ? 1 : 0.28} />
          <stop offset="50%" stopColor={color} stopOpacity={variant === 'duotone' ? 1 : 0.28} />
          <stop offset="50%" stopColor={color} stopOpacity={variant === 'duotone' ? 0.28 : 1} />
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
          <stop offset="5%" stopColor={color} stopOpacity={variant === 'gradient' ? 0.55 : 0.08} />
          <stop offset="95%" stopColor={color} stopOpacity={variant === 'gradient' ? 0.08 : 0.55} />
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

const SHIMMER_HEIGHTS = [42, 68, 51, 79, 46, 88, 57, 73, 39, 84, 62, 71];

export function ChartLoadingBars({ count = 12 }: { count?: number }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex h-full items-end gap-2 px-2 pb-6 pt-8">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="flex-1 rounded-sm bg-neutral-200 dark:bg-neutral-800"
            style={{ height: `${SHIMMER_HEIGHTS[index % SHIMMER_HEIGHTS.length]}%` }}
          />
        ))}
      </div>
      {reduce ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/55 to-transparent dark:via-white/12"
          initial={{ transform: 'translateX(-120%)' }}
          animate={{ transform: 'translateX(420%)' }}
          transition={{ duration: 1.15, ease: 'linear', repeat: Infinity }}
        />
      )}
    </div>
  );
}
