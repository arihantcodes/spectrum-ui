'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const marketVarsClassName =
  '[--spectrum-chart-up:#059669] [--spectrum-chart-down:#e11d48] [--spectrum-chart-surface:#fff] dark:[--spectrum-chart-up:#34d399] dark:[--spectrum-chart-down:#fb7185] dark:[--spectrum-chart-surface:#0a0a0a]';

export const UP = 'var(--spectrum-chart-up)';
export const DOWN = 'var(--spectrum-chart-down)';
export const SURFACE = 'var(--spectrum-chart-surface)';
export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export type Candle = {
  t: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type MarketRange = {
  label: string;
  bars: number | null;
};

export const MARKET_RANGES: MarketRange[] = [
  { label: '1W', bars: 7 },
  { label: '1M', bars: 30 },
  { label: '3M', bars: 90 },
  { label: '6M', bars: 180 },
  { label: '1Y', bars: 365 },
  { label: 'ALL', bars: null },
];

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const DAY_MS = 86_400_000;

export function generateCandles({
  seed,
  count,
  start,
  drift,
  vol,
  startedAt,
}: {
  seed: number;
  count: number;
  start: number;
  drift: number;
  vol: number;
  startedAt: number;
}): Candle[] {
  const rand = mulberry32(seed);
  const out: Candle[] = [];
  let price = start;
  let volatility = vol;

  for (let i = 0; i < count; i += 1) {
    volatility += (vol - volatility) * 0.05 + (rand() - 0.5) * vol * 0.35;
    volatility = Math.max(vol * 0.35, Math.min(vol * 2.6, volatility));

    const open = price;
    const shock = (rand() - 0.5) * 2 * volatility + drift;
    const close = Math.max(0.01, open * (1 + shock));
    const wick = Math.abs(shock) * 0.9 + volatility * 0.55;
    const high = Math.max(open, close) * (1 + rand() * wick);
    const low = Math.min(open, close) * (1 - rand() * wick);
    const range = Math.abs(close - open) / Math.max(open, 1e-6);
    const volume = Math.round((0.55 + rand() * 0.7 + range * 26) * 1_000_000);

    out.push({
      t: startedAt + i * DAY_MS,
      open: round2(open),
      high: round2(high),
      low: round2(low),
      close: round2(close),
      volume,
    });
    price = close;
  }
  return out;
}

export function round2(v: number) {
  return Math.round(v * 100) / 100;
}

const SERIES_END = Date.UTC(2026, 7, 21);
const SERIES_LEN = 420;
const SERIES_START = SERIES_END - (SERIES_LEN - 1) * DAY_MS;

export const SOL_MARKET = generateCandles({
  seed: 20_260_823,
  count: SERIES_LEN,
  start: 96.4,
  drift: 0.0021,
  vol: 0.031,
  startedAt: SERIES_START,
});

export const AAPL_MARKET = generateCandles({
  seed: 7_431_902,
  count: SERIES_LEN,
  start: 189.2,
  drift: 0.0009,
  vol: 0.013,
  startedAt: SERIES_START,
});

export const BTC_MARKET = generateCandles({
  seed: 41_556_073,
  count: SERIES_LEN,
  start: 61_400,
  drift: 0.0016,
  vol: 0.022,
  startedAt: SERIES_START,
});

export function formatMoney(value: number, compact = false) {
  const digits = compact ? 2 : value >= 1000 ? 2 : value >= 1 ? 2 : 4;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: compact ? 0 : digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatSignedPct(value: number) {
  return `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value).toFixed(2)}%`;
}

export const DATE_SHORT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
export const DATE_FULL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatAxisPrice(value: number) {
  if (Math.abs(value) >= 10_000) return formatMoney(value, true);
  return formatMoney(value, false);
}

export function niceTicks(lo: number, hi: number, target = 5): number[] {
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi <= lo) return [lo];
  const raw = (hi - lo) / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 7.5 ? 10 : norm >= 3.5 ? 5 : norm >= 2.25 ? 2.5 : norm >= 1.5 ? 2 : 1) * mag;
  const first = Math.ceil(lo / step) * step;
  const out: number[] = [];
  for (let v = first; v <= hi + step * 0.001; v += step) {
    out.push(Math.round(v / step) * step);
  }
  return out;
}

export function monotonePath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n === 0) return '';
  if (n === 1) return `M${points[0].x},${points[0].y}`;

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i += 1) {
    dx[i] = points[i + 1].x - points[i].x;
    slope[i] = dx[i] === 0 ? 0 : (points[i + 1].y - points[i].y) / dx[i];
  }

  const tangent = new Array<number>(n);
  tangent[0] = slope[0];
  tangent[n - 1] = slope[n - 2];
  for (let i = 1; i < n - 1; i += 1) {
    if (slope[i - 1] * slope[i] <= 0) {
      tangent[i] = 0;
    } else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      tangent[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]);
    }
  }

  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < n - 1; i += 1) {
    const c1x = points[i].x + dx[i] / 3;
    const c1y = points[i].y + (tangent[i] * dx[i]) / 3;
    const c2x = points[i + 1].x - dx[i] / 3;
    const c2y = points[i + 1].y - (tangent[i + 1] * dx[i]) / 3;
    d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${points[i + 1].x.toFixed(2)},${points[i + 1].y.toFixed(2)}`;
  }
  return d;
}

export const MORPH_SAMPLES = 132;

export function resample(values: number[], n = MORPH_SAMPLES): number[] {
  if (values.length === 0) return new Array(n).fill(0);
  if (values.length === 1) return new Array(n).fill(values[0]);
  const out = new Array<number>(n);
  for (let i = 0; i < n; i += 1) {
    const p = (i / (n - 1)) * (values.length - 1);
    const lo = Math.floor(p);
    const hi = Math.min(values.length - 1, lo + 1);
    out[i] = values[lo] + (values[hi] - values[lo]) * (p - lo);
  }
  return out;
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduce;
}

export function useElementWidth<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(node);
    setWidth(node.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useTween(target: number[], { duration = 520, enabled = true } = {}) {
  const [value, setValue] = React.useState(target);
  const currentRef = React.useRef(target);
  const fromRef = React.useRef(target);
  const toRef = React.useRef(target);
  const startRef = React.useRef(0);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    if (!enabled) return;
    const to = toRef.current;
    const changed = to.length !== target.length || target.some((v, i) => v !== to[i]);
    if (!changed) return;

    toRef.current = target;

    if (currentRef.current.length !== target.length) {
      currentRef.current = target;
      fromRef.current = target;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setValue(target));
      return;
    }

    fromRef.current = currentRef.current;
    startRef.current = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / duration);
      const e = easeOutCubic(p);
      const from = fromRef.current;
      const dest = toRef.current;
      const next = dest.map((v, i) => from[i] + (v - from[i]) * e);
      currentRef.current = next;
      setValue(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  });

  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  if (!enabled || value.length !== target.length) return target;
  return value;
}

export function useTweenNumber(target: number, options?: { duration?: number; enabled?: boolean }) {
  const vec = React.useMemo(() => [target], [target]);
  return useTween(vec, options)[0];
}

export const KEYFRAMES = `
@keyframes spectrum-mc-rise {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}
@keyframes spectrum-mc-draw {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}
@keyframes spectrum-mc-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes spectrum-sk-pulse {
  from { opacity: 1; }
  to   { opacity: 0.4; }
}
@keyframes spectrum-mc-enter {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spectrum-mc-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes spectrum-mc-flash {
  from { opacity: 0.2; }
  to   { opacity: 0; }
}
@keyframes spectrum-mc-ping {
  0%   { r: 4; opacity: 0.55; }
  70%  { r: 13; opacity: 0; }
  100% { r: 13; opacity: 0; }
}
`;

export function Keyframes() {
  return <style>{KEYFRAMES}</style>;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function Digit({ char, animate }: { char: string; animate: boolean }) {
  const digit = char >= '0' && char <= '9' ? Number(char) : null;
  if (digit == null) {
    return (
      <span aria-hidden className="inline-block h-[1em] align-bottom leading-none">
        {char}
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="relative inline-block h-[1em] w-[1ch] overflow-hidden align-bottom leading-none"
    >
      <span
        className="absolute inset-x-0 top-0 block"
        style={{
          transform: `translateY(-${digit}em)`,
          transition: animate ? 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] text-center leading-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({
  value,
  format,
  className,
  animate = true,
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
  animate?: boolean;
}) {
  const text = format(value);
  return (
    <span className={cn('inline-flex items-end leading-none tabular-nums', className)}>
      <span className="sr-only">{text}</span>
      {text.split('').map((char, index) => (
        <Digit key={`${index}-${char >= '0' && char <= '9' ? 'digit' : char}`} char={char} animate={animate} />
      ))}
    </span>
  );
}

export function RangeSelector({
  ranges,
  value,
  onChange,
  reduce,
}: {
  ranges: MarketRange[];
  value: string;
  onChange: (label: string) => void;
  reduce: boolean;
}) {
  const index = Math.max(0, ranges.findIndex((r) => r.label === value));
  const width = 100 / ranges.length;

  return (
    <div
      role="tablist"
      aria-label="Time range"
      className="relative inline-flex items-center rounded-full bg-black/[0.045] p-0.5 dark:bg-white/[0.07]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 rounded-full bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-white/12 dark:ring-white/10"
        style={{
          width: `calc(${width}% - 4px)`,
          transform: `translateX(calc(${index * 100}% + ${index * 4}px))`,
          transition: reduce ? undefined : 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {ranges.map((range) => {
        const active = range.label === value;
        return (
          <button
            key={range.label}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(range.label)}
            className={cn(
              'relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide transition-colors duration-200',
              'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25',
              active
                ? 'text-neutral-950 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
            )}
            style={{ flex: `0 0 ${width}%` }}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}

export type BookLevel = {
  price: number;
  size: number;
  total: number;
};

export type OrderBook = {
  mid: number;
  spread: number;
  bids: BookLevel[];
  asks: BookLevel[];
};

export function generateOrderBook({
  mid,
  seed,
  levels = 14,
  tick,
  depth = 900,
}: {
  mid: number;
  seed: number;
  levels?: number;
  tick?: number;
  depth?: number;
}): OrderBook {
  const rand = mulberry32(seed);
  const step = tick ?? Math.max(0.01, round2(mid * 0.0006));

  const side = (direction: 1 | -1): BookLevel[] => {
    const out: BookLevel[] = [];
    let total = 0;
    for (let i = 0; i < levels; i += 1) {
      const distance = (i + 1) / levels;
      const base = depth * (0.18 + distance * 0.9);
      const whale = rand() > 0.87 ? 2.4 : 1;
      const size = Math.round(base * (0.55 + rand() * 0.9) * whale);
      total += size;
      out.push({
        price: round2(mid + direction * step * (i + 1)),
        size,
        total,
      });
    }
    return out;
  };

  const asks = side(1);
  const bids = side(-1);
  return { mid, spread: round2(asks[0].price - bids[0].price), bids, asks };
}

export type TreemapInput = { label: string; weight: number; change: number; name?: string };
export type TreemapTile = TreemapInput & { x: number; y: number; w: number; h: number };

export function squarify(
  items: TreemapInput[],
  width: number,
  height: number,
): TreemapTile[] {
  const sorted = [...items].filter((i) => i.weight > 0).sort((a, b) => b.weight - a.weight);
  const totalWeight = sorted.reduce((sum, i) => sum + i.weight, 0);
  if (!sorted.length || totalWeight <= 0 || width <= 0 || height <= 0) return [];

  const scale = (width * height) / totalWeight;
  const out: TreemapTile[] = [];
  let x = 0;
  let y = 0;
  let w = width;
  let h = height;
  let row: TreemapInput[] = [];
  let index = 0;

  const worst = (candidate: TreemapInput[], side: number) => {
    if (!candidate.length || side <= 0) return Infinity;
    const areas = candidate.map((i) => i.weight * scale);
    const sum = areas.reduce((a, b) => a + b, 0);
    const max = Math.max(...areas);
    const min = Math.min(...areas);
    const side2 = side * side;
    const sum2 = sum * sum;
    return Math.max((side2 * max) / sum2, sum2 / (side2 * min));
  };

  const layoutRow = (candidate: TreemapInput[], side: number, horizontal: boolean) => {
    const sum = candidate.reduce((total, i) => total + i.weight * scale, 0);
    const thickness = sum / side;
    let offset = 0;
    for (const item of candidate) {
      const length = (item.weight * scale) / thickness;
      out.push(
        horizontal
          ? { ...item, x: x + offset, y, w: length, h: thickness }
          : { ...item, x, y: y + offset, w: thickness, h: length },
      );
      offset += length;
    }
    if (horizontal) {
      y += thickness;
      h -= thickness;
    } else {
      x += thickness;
      w -= thickness;
    }
  };

  while (index < sorted.length) {
    const horizontal = w >= h;
    const side = horizontal ? w : h;
    const next = sorted[index];

    if (!row.length || worst([...row, next], side) <= worst(row, side)) {
      row.push(next);
      index += 1;
    } else {
      layoutRow(row, side, horizontal);
      row = [];
    }
  }
  if (row.length) layoutRow(row, w >= h ? w : h, w >= h);

  return out;
}

export function changeColor(change: number, cap = 4) {
  const t = Math.max(-1, Math.min(1, change / cap));
  if (Math.abs(t) < 0.04) return 'var(--spectrum-heat-flat)';
  const weight = 0.22 + Math.abs(t) * 0.78;
  const base = t > 0 ? UP : DOWN;
  return `color-mix(in srgb, ${base} ${(weight * 100).toFixed(0)}%, var(--spectrum-heat-flat))`;
}

export const seriesVarsClassName =
  '[--spectrum-series-1:#2563eb] [--spectrum-series-2:#f59e0b] [--spectrum-series-3:#0d9488] [--spectrum-series-4:#7c3aed] [--spectrum-series-5:#db2777] [--spectrum-series-6:#64748b] [--spectrum-track:#ececef] [--spectrum-chart-surface:#fff] [--spectrum-chart-up:#059669] [--spectrum-chart-down:#e11d48] dark:[--spectrum-series-1:#60a5fa] dark:[--spectrum-series-2:#fbbf24] dark:[--spectrum-series-3:#2dd4bf] dark:[--spectrum-series-4:#a78bfa] dark:[--spectrum-series-5:#f472b6] dark:[--spectrum-series-6:#94a3b8] dark:[--spectrum-track:#26262b] dark:[--spectrum-chart-surface:#0a0a0a] dark:[--spectrum-chart-up:#34d399] dark:[--spectrum-chart-down:#fb7185]';

export const SERIES_COLORS = [
  'var(--spectrum-series-1)',
  'var(--spectrum-series-2)',
  'var(--spectrum-series-3)',
  'var(--spectrum-series-4)',
  'var(--spectrum-series-5)',
  'var(--spectrum-series-6)',
] as const;

export const TRACK = 'var(--spectrum-track)';

export const textHalo = {
  paintOrder: 'stroke',
  stroke: SURFACE,
  strokeWidth: 3.5,
  strokeLinejoin: 'round',
} as const satisfies React.CSSProperties;

export function intensityColor(t: number, hue = 'var(--spectrum-series-1)') {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped <= 0.001) return TRACK;
  const weight = 14 + clamped * 86;
  return `color-mix(in srgb, ${hue} ${weight.toFixed(0)}%, ${TRACK})`;
}

export function formatCount(value: number, digits = 1) {
  if (Math.abs(value) < 1000) return String(Math.round(value));
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPct(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

export function onFillClass(intensity: number) {
  return intensity > 0.55
    ? 'fill-white dark:fill-neutral-950'
    : 'fill-neutral-900 dark:fill-white';
}

export type ChartStatus = 'ready' | 'loading' | 'empty' | 'error';

export type SkeletonVariant = 'bars' | 'line' | 'grid' | 'rows' | 'arc' | 'cards';

const SKELETON_BARS = [46, 72, 55, 83, 41, 68, 92, 57, 76, 49, 88, 63];
const SKELETON_ROWS = [92, 74, 86, 61, 79, 55];

function SkeletonShapes({
  variant,
  height,
  mode,
  reduce,
}: {
  variant: SkeletonVariant;
  height: number;
  mode: 'pulse' | 'ghost';
  reduce: boolean;
}) {
  const animate = mode === 'pulse' && !reduce;
  const breathe = (index: number): React.CSSProperties | undefined =>
    animate
      ? { animation: `spectrum-sk-pulse 1.5s ease-in-out ${index * 120}ms infinite alternate` }
      : undefined;
  const block = 'rounded-md bg-black/[0.06] dark:bg-white/[0.08]';

  if (variant === 'bars') {
    return (
      <div className="flex h-full items-end gap-2 pb-5 pt-3">
        {SKELETON_BARS.map((h, i) => (
          <div key={i} className={cn('flex-1', block)} style={{ height: `${h}%`, ...breathe(i) }} />
        ))}
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className="relative flex h-full flex-col justify-between py-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-px w-full bg-black/[0.05] dark:bg-white/[0.06]" />
        ))}
        <svg
          className="absolute inset-x-0 top-1/4 h-1/2 w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <path
            d="M0,30 C12,10 22,34 34,22 C46,10 54,28 66,16 C78,6 88,20 100,8"
            fill="none"
            className="stroke-black/[0.1] dark:stroke-white/[0.12]"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            style={breathe(1)}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid h-full grid-cols-12 grid-rows-6 gap-1.5 py-2">
        {Array.from({ length: 72 }, (_, i) => (
          <div
            key={i}
            className={cn('h-full w-full rounded-[3px]', block)}
            style={breathe(i % 14)}
          />
        ))}
      </div>
    );
  }

  if (variant === 'rows') {
    return (
      <div className="flex h-full flex-col justify-evenly py-2">
        {SKELETON_ROWS.map((w, i) => (
          <div key={i} className={cn('h-4', block)} style={{ width: `${w}%`, ...breathe(i) }} />
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="grid h-full grid-cols-2 content-center gap-3 py-2 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-full min-h-16 flex-col justify-between gap-2 rounded-xl border border-black/[0.05] p-3 dark:border-white/[0.06]"
            style={breathe(i)}
          >
            <div className={cn('h-2.5 w-1/2', block)} />
            <div className={cn('h-5 w-3/4', block)} />
            <div className={cn('h-6 w-full', block)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="rounded-full border-[14px] border-black/[0.06] dark:border-white/[0.08]"
        style={{ width: height * 0.6, height: height * 0.6, ...breathe(0) }}
      />
    </div>
  );
}

export function ChartSkeleton({
  variant = 'bars',
  height = 300,
  className,
}: {
  variant?: SkeletonVariant;
  height?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ height }}
      aria-hidden
    >
      <Keyframes />
      <SkeletonShapes variant={variant} height={height} mode="pulse" reduce={reduce} />
    </div>
  );
}

function StateShell({
  height,
  variant,
  icon,
  iconClassName,
  title,
  description,
  action,
}: {
  height: number;
  variant: SkeletonVariant;
  icon: React.ReactNode;
  iconClassName?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.015] dark:border-white/[0.08] dark:bg-white/[0.02]"
      style={{ height }}
      role="status"
    >
      <Keyframes />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 inset-y-4 opacity-60 dark:opacity-50"
        style={{
          maskImage:
            'radial-gradient(ellipse 62% 58% at 50% 50%, transparent 34%, black 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 62% 58% at 50% 50%, transparent 34%, black 78%)',
        }}
      >
        <SkeletonShapes variant={variant} height={height} mode="ghost" reduce={reduce} />
      </div>
      <div
        className="relative flex max-w-[38ch] flex-col items-center gap-1 px-6 text-center"
        style={reduce ? undefined : { animation: `spectrum-mc-enter 480ms ${EASE} both` }}
      >
        <span
          className={cn(
            'mb-2 flex size-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-neutral-500 shadow-xs dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-400',
            iconClassName,
          )}
        >
          {icon}
        </span>
        <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
        {description ? (
          <p className="text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  );
}

const actionClass =
  'inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-900 shadow-xs transition-colors hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/12 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1] dark:focus-visible:ring-white/25';

export function ChartEmpty({
  height = 300,
  variant = 'line',
  title = 'No data yet',
  description = 'Once events start arriving this chart will fill in automatically.',
  action,
}: {
  height?: number;
  variant?: SkeletonVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <StateShell
      height={height}
      variant={variant}
      title={title}
      description={description}
      action={action}
      icon={
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 19h16M7 16V9m5 7V5m5 11v-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      }
    />
  );
}

export function ChartError({
  height = 300,
  variant = 'line',
  title = 'Could not load this chart',
  description = 'The request failed. Check the connection and try again.',
  onRetry,
  retryLabel = 'Retry',
}: {
  height?: number;
  variant?: SkeletonVariant;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <StateShell
      height={height}
      variant={variant}
      title={title}
      description={description}
      iconClassName="text-rose-500/90 dark:text-rose-400/90"
      action={
        onRetry ? (
          <button type="button" onClick={onRetry} className={actionClass}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 11A8 8 0 1 0 18 16M20 5v6h-6"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {retryLabel}
          </button>
        ) : null
      }
      icon={
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 8v5m0 3.5v.5M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.7L13.7 3.9a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
}

export function ChartState({
  status = 'ready',
  height = 300,
  variant = 'bars',
  empty,
  error,
  onRetry,
  children,
}: {
  status?: ChartStatus;
  height?: number;
  variant?: SkeletonVariant;
  empty?: { title?: string; description?: string; action?: React.ReactNode };
  error?: { title?: string; description?: string; retryLabel?: string };
  onRetry?: () => void;
  children: React.ReactNode;
}) {
  if (status === 'loading') {
    return (
      <div aria-busy="true" aria-live="polite">
        <ChartSkeleton variant={variant} height={height} />
        <span className="sr-only">Loading chart data</span>
      </div>
    );
  }
  if (status === 'empty') return <ChartEmpty height={height} variant={variant} {...empty} />;
  if (status === 'error') {
    return <ChartError height={height} variant={variant} onRetry={onRetry} {...error} />;
  }
  return <>{children}</>;
}

export function useHoverIndexKeys({
  count,
  setIndex,
  clear,
}: {
  count: number;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  clear?: () => void;
}) {
  return React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      if (key === 'Escape') {
        event.preventDefault();
        if (clear) clear();
        else setIndex(null);
        return;
      }
      if (key === 'Home' || key === 'End') {
        event.preventDefault();
        setIndex(key === 'Home' ? 0 : count - 1);
        return;
      }
      if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;
      event.preventDefault();
      const step = key === 'ArrowRight' ? 1 : -1;
      setIndex((current) => {
        const next = (current ?? count - 1) + step;
        return Math.max(0, Math.min(count - 1, next));
      });
    },
    [count, setIndex, clear],
  );
}

export function ChartDataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) =>
              cellIndex === 0 ? (
                <th key={cellIndex} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={cellIndex}>{cell}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Stat({ ready, children }: { ready: boolean; children: React.ReactNode }) {
  if (ready) return <>{children}</>;
  return (
    <span aria-hidden className="text-neutral-300 dark:text-neutral-600">
      —
    </span>
  );
}
