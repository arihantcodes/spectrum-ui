/**
 * Spectrum UI — Chart kit
 *
 * Shared primitives for the Charts collection. Chrome stays monochrome;
 * data marks use one named accent family. Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Motion ──────────────────────────────────────────────────────────────────

export const SPRING_TACTILE = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 1,
} as const;

export const SPRING_FLUID = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export const SPRING_ENTRANCE = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
} as const;

export const SPRING_SNAPPY = {
  type: 'spring',
  stiffness: 500,
  damping: 28,
} as const;

const INSTANT = { duration: 0 } as const;

export function useChartMotion() {
  const reduce = Boolean(useReducedMotion());
  return {
    reduce,
    spring: <T,>(preset: T) => (reduce ? INSTANT : preset),
    duration: (seconds: number) => (reduce ? 0 : seconds),
  };
}

// ─── Palettes ────────────────────────────────────────────────────────────────

export type ChartPaletteName = 'signal' | 'growth' | 'heat' | 'orchid' | 'ink';

/**
 * CSS variables consumed by SVG marks.
 * --chart-from / --chart-to drive gradients
 * --chart-solid is the stroke
 * --chart-glow is a soft halo color
 */
export const CHART_PALETTE_CLASS: Record<ChartPaletteName, string> = {
  signal:
    '[--chart-from:#22d3ee] [--chart-mid:#6366f1] [--chart-to:#4f46e5] [--chart-solid:#22d3ee] [--chart-glow:#22d3ee88] [--chart-muted:#22d3ee2e] dark:[--chart-from:#67e8f9] dark:[--chart-mid:#818cf8] dark:[--chart-to:#a5b4fc] dark:[--chart-solid:#67e8f9] dark:[--chart-glow:#67e8f990]',
  growth:
    '[--chart-from:#d9f99d] [--chart-mid:#4ade80] [--chart-to:#059669] [--chart-solid:#4ade80] [--chart-glow:#4ade8088] [--chart-muted:#4ade802e] dark:[--chart-from:#ecfccb] dark:[--chart-mid:#86efac] dark:[--chart-to:#34d399] dark:[--chart-solid:#86efac] dark:[--chart-glow:#86efac90]',
  heat: '[--chart-from:#fdba74] [--chart-mid:#f97316] [--chart-to:#e11d48] [--chart-solid:#fb7185] [--chart-glow:#fb718588] [--chart-muted:#fb71852e] dark:[--chart-from:#fed7aa] dark:[--chart-mid:#fb923c] dark:[--chart-to:#fb7185] dark:[--chart-solid:#fb7185] dark:[--chart-glow:#fb718590]',
  orchid:
    '[--chart-from:#e9d5ff] [--chart-mid:#c084fc] [--chart-to:#db2777] [--chart-solid:#d946ef] [--chart-glow:#d946ef88] [--chart-muted:#d946ef2e] dark:[--chart-from:#f5d0fe] dark:[--chart-mid:#e879f9] dark:[--chart-to:#f9a8d4] dark:[--chart-solid:#e879f9] dark:[--chart-glow:#e879f990]',
  ink: '[--chart-from:#a3a3a3] [--chart-mid:#525252] [--chart-to:#171717] [--chart-solid:#262626] [--chart-glow:#26262640] [--chart-muted:#17171718] dark:[--chart-from:#d4d4d4] dark:[--chart-mid:#a3a3a3] dark:[--chart-to:#fafafa] dark:[--chart-solid:#f5f5f5] dark:[--chart-glow:#f5f5f540]',
};

const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

export const chartSurfaceClassName =
  'relative overflow-hidden rounded-[1.35rem] border border-neutral-200/70 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_48px_-28px_rgba(15,23,42,0.22)] dark:border-neutral-800/80 dark:bg-neutral-950 dark:shadow-[0_1px_1px_rgba(0,0,0,0.4),0_24px_48px_-28px_rgba(0,0,0,0.8)]';

export function ChartSurface({
  palette,
  className,
  children,
  ...props
}: React.ComponentProps<'figure'> & { palette: ChartPaletteName }) {
  return (
    <figure
      className={cn(chartSurfaceClassName, CHART_PALETTE_CLASS[palette], className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full opacity-[0.22] blur-3xl dark:opacity-[0.34]"
        style={{
          background: 'radial-gradient(closest-side, var(--chart-solid), transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.035] mix-blend-overlay dark:opacity-[0.08]"
        style={{ backgroundImage: NOISE_DATA_URI }}
      />
      {children}
    </figure>
  );
}

export function ChartEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PlotTexture({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 text-neutral-400/50 opacity-70 dark:text-neutral-500/40 dark:opacity-50',
        className,
      )}
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    />
  );
}

export function EdgeFade({
  side = 'right',
  className,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}) {
  const sides = {
    right: 'inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent dark:from-neutral-950',
    left: 'inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent dark:from-neutral-950',
    top: 'inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent dark:from-neutral-950',
    bottom:
      'inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent dark:from-neutral-950',
  } as const;

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute z-10', sides[side], className)}
    />
  );
}

export const GRID_STROKE = '#a3a3a3';
export const GRID_OPACITY = 0.28;

// ─── AnimatedNumber ──────────────────────────────────────────────────────────

export interface AnimatedNumberProps {
  value: number;
  /** Formats the interpolated value. Default: rounded locale string */
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  format = defaultNumberFormat,
  className,
}: AnimatedNumberProps) {
  const { reduce } = useChartMotion();
  const spring = useSpring(value, SPRING_FLUID);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (reduce) return;
    spring.set(value);
  }, [value, reduce, spring]);

  useMotionValueEvent(spring, 'change', (latest) => {
    if (!reduce) setDisplay(latest);
  });

  return <span className={cn('tabular-nums', className)}>{format(reduce ? value : display)}</span>;
}

function defaultNumberFormat(value: number) {
  return Math.round(value).toLocaleString('en-US');
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`;
}

// ─── Tooltip card ────────────────────────────────────────────────────────────

export interface ChartTooltipProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  frosted?: boolean;
  className?: string;
}

export function ChartTooltip({ label, children, frosted = true, className }: ChartTooltipProps) {
  return (
    <div
      className={cn(
        'min-w-[9rem] rounded-2xl border px-3.5 py-2.5 text-xs shadow-[0_16px_40px_-18px_rgba(15,23,42,0.45)]',
        frosted
          ? 'border-white/60 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/80'
          : 'border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800',
        className,
      )}
    >
      {label ? (
        <div className="mb-1.5 text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase dark:text-neutral-400">
          {label}
        </div>
      ) : null}
      <div className="text-neutral-900 dark:text-neutral-100">{children}</div>
    </div>
  );
}

export interface ChartTooltipItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
  payload?: unknown;
}

/** Recharts-compatible tooltip content. */
export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  className,
  frosted = true,
}: {
  active?: boolean;
  payload?: ChartTooltipItem[];
  label?: React.ReactNode;
  formatter?: (value: number | string, name: string) => React.ReactNode;
  className?: string;
  frosted?: boolean;
}) {
  if (!active || !payload?.length) return null;

  const seen = new Set<string>();
  const items = payload.filter((item) => {
    const name = String(item.name ?? item.dataKey ?? 'value');
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });

  return (
    <ChartTooltip label={label} frosted={frosted} className={className}>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, index) => {
          const name = String(item.name ?? item.dataKey ?? 'value');
          const value = item.value ?? '';
          return (
            <li key={`${name}-${index}`} className="flex items-center justify-between gap-5">
              <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{
                    background: item.color ?? 'var(--chart-solid)',
                    color: item.color ?? 'var(--chart-solid)',
                  }}
                />
                {name}
              </span>
              <span className="font-semibold tabular-nums tracking-tight">
                {formatter ? formatter(value, name) : value.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </ChartTooltip>
  );
}

// ─── Legend ──────────────────────────────────────────────────────────────────

export interface SeriesLegendItem {
  key: string;
  label: string;
  color?: string;
  swatch?: 'solid' | 'dashed' | 'dot';
}

export interface SeriesLegendProps {
  items: readonly SeriesLegendItem[];
  activeKeys?: readonly string[];
  onToggle?: (key: string) => void;
  className?: string;
}

export function SeriesLegend({ items, activeKeys, onToggle, className }: SeriesLegendProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map((item) => {
        const active = !activeKeys || activeKeys.includes(item.key);
        const swatch = item.swatch ?? 'solid';
        return (
          <li key={item.key}>
            <button
              type="button"
              onClick={() => onToggle?.(item.key)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium text-neutral-600 transition-opacity dark:text-neutral-400',
                'focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300',
                !active && 'opacity-40',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-[2px] w-3.5 rounded-full',
                  swatch === 'dashed' && 'bg-transparent',
                  swatch === 'dot' && 'size-1.5 w-1.5 shadow-[0_0_8px_currentColor]',
                )}
                style={
                  swatch === 'dashed'
                    ? {
                        backgroundImage: `repeating-linear-gradient(90deg, ${item.color ?? 'var(--chart-solid)'} 0 3px, transparent 3px 5px)`,
                      }
                    : {
                        background: item.color ?? 'var(--chart-solid)',
                        color: item.color ?? 'var(--chart-solid)',
                      }
                }
              />
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// ─── Time range ──────────────────────────────────────────────────────────────

export interface TimeRangeOption {
  value: string;
  label: string;
}

export interface TimeRangeToggleProps {
  options: readonly TimeRangeOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  layoutId?: string;
}

export function TimeRangeToggle({
  options,
  value,
  onChange,
  className,
  layoutId = 'chart-range',
}: TimeRangeToggleProps) {
  const { spring } = useChartMotion();

  return (
    <div
      role="tablist"
      aria-label="Time range"
      className={cn(
        'relative inline-flex rounded-full border border-neutral-200/80 bg-neutral-50/80 p-0.5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
              selected
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-700"
                transition={spring(SPRING_FLUID)}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── SVG defs ────────────────────────────────────────────────────────────────

export interface ChartGradientProps {
  id: string;
  from?: string;
  to?: string;
  mid?: string;
  orientation?: 'vertical' | 'horizontal';
  fromOpacity?: number;
  midOpacity?: number;
  toOpacity?: number;
}

export function ChartGradient({
  id,
  from = 'var(--chart-from)',
  mid = 'var(--chart-mid)',
  to = 'var(--chart-to)',
  orientation = 'vertical',
  fromOpacity = 0.62,
  midOpacity = 0.2,
  toOpacity = 0,
}: ChartGradientProps) {
  const vertical = orientation === 'vertical';
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? '0' : '1'} y2={vertical ? '1' : '0'}>
      <stop offset="0%" stopColor={from} stopOpacity={fromOpacity} />
      <stop offset="48%" stopColor={mid} stopOpacity={midOpacity} />
      <stop offset="100%" stopColor={to} stopOpacity={toOpacity} />
    </linearGradient>
  );
}

export function ChartGlowFilter({ id, stdDeviation = 5 }: { id: string; stdDeviation?: number }) {
  return (
    <filter id={id} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation={stdDeviation} result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export interface ChartPatternProps {
  id: string;
  variant?: 'hatch' | 'dots';
  color?: string;
}

export function ChartPattern({
  id,
  variant = 'hatch',
  color = 'var(--chart-solid)',
}: ChartPatternProps) {
  if (variant === 'dots') {
    return (
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.75" fill={color} opacity="0.5" />
      </pattern>
    );
  }

  return (
    <pattern
      id={id}
      width="7"
      height="7"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(35)"
    >
      <line x1="0" y1="0" x2="0" y2="7" stroke={color} strokeWidth="1.35" opacity="0.4" />
    </pattern>
  );
}

export function ChartDefs({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <defs>
      <ChartGlowFilter id={`${id}-glow`} />
      <ChartGradient id={`${id}-fill`} />
      {children}
    </defs>
  );
}

// ─── Cursor + active point ───────────────────────────────────────────────────

export interface ChartCursorProps {
  x?: number;
  height?: number;
  color?: string;
}

export function ChartCursor({ x, height = 0, color = 'var(--chart-solid)' }: ChartCursorProps) {
  if (x == null || height <= 0) return null;
  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={height}
        stroke={color}
        strokeWidth={1.25}
        strokeOpacity={0.4}
      />
      <line x1={x} x2={x} y1={0} y2={height} stroke={color} strokeWidth={10} strokeOpacity={0.09} />
    </g>
  );
}

export function RechartsCursor(props: {
  left?: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
}) {
  const x = props.points?.[0]?.x ?? (props.left ?? 0) + (props.width ?? 0) / 2;
  return <ChartCursor x={x} height={props.height} />;
}

export function GlowDot({ cx, cy, r = 4 }: { cx?: number; cy?: number; r?: number }) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 8} fill="var(--chart-solid)" opacity={0.14} />
      <circle cx={cx} cy={cy} r={r + 3.5} fill="var(--chart-solid)" opacity={0.3} />
      <circle cx={cx} cy={cy} r={r} fill="var(--chart-solid)" />
      <circle cx={cx} cy={cy} r={Math.max(1.5, r - 2)} fill="#fff" />
    </g>
  );
}

export function PingDot({ cx, cy, r = 4.5 }: { cx?: number; cy?: number; r?: number }) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r + 6}
        fill="var(--chart-solid)"
        className="origin-center motion-safe:animate-ping"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        opacity={0.35}
      />
      <GlowDot cx={cx} cy={cy} r={r} />
    </g>
  );
}

export function ChartEndCap({ cx, cy, label }: { cx?: number; cy?: number; label?: string }) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <GlowDot cx={cx} cy={cy} r={4.5} />
      {label ? (
        <foreignObject x={cx - 56} y={cy - 36} width={112} height={26}>
          <div className="flex justify-center">
            <span className="rounded-full border border-white/70 bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-tight text-neutral-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/85 dark:text-neutral-100">
              {label}
            </span>
          </div>
        </foreignObject>
      ) : null}
    </g>
  );
}

// ─── Reveal ──────────────────────────────────────────────────────────────────

export interface ChartRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ChartReveal({ children, className, delay = 0 }: ChartRevealProps) {
  const { reduce, duration } = useChartMotion();

  return (
    <motion.div
      className={cn('relative', className)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration(0.75),
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function DeltaBadge({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums',
        up
          ? 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/15 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20'
          : 'bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/15 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/20',
        className,
      )}
    >
      {up ? '↑' : '↓'} {Math.abs(value).toFixed(1)}%
    </span>
  );
}
