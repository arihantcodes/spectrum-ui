'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartState,
  DOWN,
  EASE,
  Keyframes,
  RollingNumber,
  TRACK,
  UP,
  formatCount,
  monotonePath,
  mulberry32,
  seriesVarsClassName,
  useHoverIndexKeys,
  usePrefersReducedMotion,
  useTweenNumber,
} from './chart-engine';

export type StatCardData = {
  label: string;
  series?: number[];
  value?: number;
  previous?: number;
  progress?: number;
  format?: (value: number) => string;
  goodWhen?: 'up' | 'down';
  deltaLabel?: string;
  caption?: string;
};

function walk(seed: number, n: number, start: number, drift: number, vol: number): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  let value = start;
  for (let i = 0; i < n; i += 1) {
    value = Math.max(0.0001, value * (1 + drift + (rand() - 0.5) * vol));
    out.push(value);
  }
  return out;
}

export const STAT_CARDS: StatCardData[] = [
  {
    label: 'Revenue',
    series: walk(11, 30, 48_200, 0.008, 0.05),
    format: (v) => `$${formatCount(v, 1)}`,
    deltaLabel: 'vs 30 days ago',
  },
  {
    label: 'Active users',
    series: walk(23, 30, 12_400, 0.005, 0.04),
    format: (v) => formatCount(v, 1),
    deltaLabel: 'vs 30 days ago',
  },
  {
    label: 'Conversion',
    series: walk(37, 30, 3.42, 0.003, 0.03),
    format: (v) => `${v.toFixed(2)}%`,
    deltaLabel: 'vs 30 days ago',
  },
  {
    label: 'Churn',
    series: walk(41, 30, 2.61, -0.007, 0.04),
    format: (v) => `${v.toFixed(2)}%`,
    goodWhen: 'down',
    deltaLabel: 'vs 30 days ago',
  },
];

export const BUDGET_CARDS: StatCardData[] = [
  {
    label: 'Spent this week',
    series: [46.4, 71.8, 58.2, 88.6, 63.4, 94.2, 64.6],
    value: 487.2,
    previous: 553.64,
    format: (v) => `$${v.toFixed(2)}`,
    goodWhen: 'down',
    deltaLabel: 'from last week',
  },
  {
    label: 'Remaining weekly budget',
    value: 118.8,
    progress: 0.22,
    format: (v) => `$${v.toFixed(2)}`,
    caption: '22% of weekly budget',
  },
];

function StatCard({
  card,
  index,
  reduce,
}: {
  card: StatCardData;
  index: number;
  reduce: boolean;
}) {
  const { label, series, goodWhen = 'up', deltaLabel = 'vs start', caption, progress } = card;
  const format = card.format ?? ((v: number) => formatCount(v, 1));
  const [hover, setHover] = React.useState<number | null>(null);
  const sparkRef = React.useRef<HTMLDivElement | null>(null);
  const uid = React.useId().replace(/:/g, '');

  const n = series?.length ?? 0;
  const headline = card.value ?? series?.[n - 1] ?? 0;
  const shown = hover != null && series ? series[hover] : headline;

  const base = card.previous ?? series?.[0] ?? 0;
  const delta = card.previous != null || series ? (base ? ((headline - base) / base) * 100 : 0) : null;
  const rising = (delta ?? 0) >= 0;
  const good = goodWhen === 'up' ? rising : !rising;
  const color = good ? UP : DOWN;

  const displayValue = useTweenNumber(shown, {
    duration: 260,
    enabled: !reduce && hover == null,
  });

  const [box, setBox] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    const node = sparkRef.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    ro.observe(node);
    const rect = node.getBoundingClientRect();
    setBox({ w: rect.width, h: rect.height });
    return () => ro.disconnect();
  }, []);

  const spark = React.useMemo(() => {
    if (!series || n < 2 || box.w <= 0 || box.h <= 0) return null;
    let lo = Infinity;
    let hi = -Infinity;
    for (const v of series) {
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    const span = hi - lo || 1;
    const points = series.map((v, i) => ({
      x: 3 + (i / (n - 1)) * (box.w - 6),
      y: 7 + (1 - (v - lo) / span) * (box.h - 16),
    }));
    const line = monotonePath(points);
    const extremes: number[] = [];
    for (let i = 1; i < n - 1; i += 1) {
      if ((series[i] - series[i - 1]) * (series[i + 1] - series[i]) < 0) extremes.push(i);
    }
    return {
      line,
      area: `${line}L${points[n - 1].x},${box.h}L${points[0].x},${box.h}Z`,
      points,
      extremes: extremes.slice(0, 5),
    };
  }, [series, n, box]);

  const onMove = (clientX: number) => {
    const node = sparkRef.current;
    if (!node || n < 2) return;
    const box = node.getBoundingClientRect();
    const t = (clientX - box.left) / Math.max(1, box.width);
    setHover(Math.max(0, Math.min(n - 1, Math.round(t * (n - 1)))));
  };
  const onKeyDown = useHoverIndexKeys({ count: n, setIndex: setHover });

  const scrubDot = hover != null && spark ? spark.points[hover] : null;

  return (
    <div
      className="flex items-stretch justify-between gap-5 rounded-2xl border border-black/8 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.02]"
      role="img"
      aria-label={`${label}: ${format(headline)}${
        delta != null ? `, ${rising ? 'up' : 'down'} ${Math.abs(delta).toFixed(0)} percent ${deltaLabel}` : ''
      }.`}
      style={
        reduce
          ? undefined
          : { animation: `spectrum-mc-enter 420ms ${EASE} ${index * 70}ms both` }
      }
    >
      <div className="flex min-w-0 flex-col justify-between">
        <p className="truncate text-[13px] text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="mt-1.5 text-[27px] font-medium leading-none tracking-tight text-neutral-950 dark:text-white">
          <RollingNumber
            value={hover != null ? shown : displayValue}
            format={format}
            animate={!reduce}
          />
        </p>
        <p className="mt-2 h-[17px] overflow-hidden whitespace-nowrap text-[12.5px] font-medium leading-none">
          {hover != null && series ? (
            <span className="text-neutral-400 dark:text-neutral-500">
              day {hover + 1} of {n}
            </span>
          ) : delta != null ? (
            <span style={{ color }}>
              {rising ? '↑' : '↓'} {Math.abs(delta).toFixed(0)}% {deltaLabel}
            </span>
          ) : (
            <span className="text-neutral-500 dark:text-neutral-400">{caption ?? ' '}</span>
          )}
        </p>
      </div>

      {progress != null ? (
        <div className="flex w-[38%] max-w-44 shrink-0 items-center">
          <div
            aria-hidden
            className="relative h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: TRACK }}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                background: 'var(--spectrum-series-2)',
                transformOrigin: 'left center',
                animation: reduce
                  ? undefined
                  : `spectrum-mc-grow 700ms ${EASE} ${index * 70 + 150}ms both`,
              }}
            />
          </div>
        </div>
      ) : series && n >= 2 ? (
        <div
          ref={sparkRef}
          className="relative w-[44%] max-w-52 shrink-0 cursor-crosshair touch-pan-y select-none self-stretch focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20"
          style={{ minHeight: 58 }}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onBlur={() => setHover(null)}
          onPointerMove={(e) => onMove(e.clientX)}
          onPointerDown={(e) => onMove(e.clientX)}
          onPointerLeave={() => setHover(null)}
        >
          {spark ? (
          <svg
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
            className="block h-full w-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <path
              d={spark.area}
              fill={`url(#${uid}-fill)`}
              style={
                reduce
                  ? undefined
                  : { animation: `spectrum-mc-fade 620ms ease-out ${index * 70 + 180}ms both` }
              }
            />
            <path
              d={spark.line}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={
                reduce
                  ? undefined
                  : {
                      strokeDasharray: 1,
                      animation: `spectrum-mc-draw 700ms ${EASE} ${index * 70}ms both`,
                    }
              }
            />
            {spark.extremes.map((i) => (
              <circle
                key={i}
                cx={spark.points[i].x}
                cy={spark.points[i].y}
                r={2.5}
                fill={color}
                style={
                  reduce
                    ? undefined
                    : { animation: `spectrum-mc-fade 300ms ease-out ${index * 70 + 500}ms both` }
                }
              />
            ))}
            {scrubDot ? (
              <circle
                cx={scrubDot.x}
                cy={scrubDot.y}
                r={4.5}
                className="fill-white dark:fill-neutral-950"
                stroke={color}
                strokeWidth={2}
              />
            ) : null}
          </svg>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const COLUMN_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
};

export interface StatCardsProps {
  className?: string;
  cards?: StatCardData[];
  columns?: 1 | 2 | 3 | 4;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function StatCards({
  className,
  cards = STAT_CARDS,
  columns = 2,
  status = 'ready',
  onRetry,
}: StatCardsProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div className={cn('w-full', seriesVarsClassName, className)}>
      <Keyframes />
      <ChartState
        status={status}
        height={168}
        variant="cards"
        empty={{
          title: 'No metrics yet',
          description: 'Connect a data source and these tiles will start tracking themselves.',
        }}
        onRetry={onRetry}
      >
        <div className={cn('grid gap-3', COLUMN_CLASS[columns] ?? COLUMN_CLASS[2])}>
          {cards.map((card, index) => (
            <StatCard key={card.label} card={card} index={index} reduce={reduce} />
          ))}
        </div>
      </ChartState>
    </div>
  );
}

export function DefaultStatCards(props: StatCardsProps) {
  return <StatCards {...props} />;
}

export function BudgetStatCards(props: StatCardsProps) {
  return <StatCards cards={BUDGET_CARDS} columns={2} {...props} />;
}
