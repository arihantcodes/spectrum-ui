'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartState,
  Stat,
  DAY_MS,
  EASE,
  Keyframes,
  TRACK,
  formatCount,
  intensityColor,
  mulberry32,
  seriesVarsClassName,
  useElementWidth,
  usePrefersReducedMotion,
} from './chart-engine';

export type CalendarDay = { t: number; value: number };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const DAY_FMT = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const SERIES_END = Date.UTC(2026, 7, 21);

function generateYear(seed: number, days = 371): CalendarDay[] {
  const rand = mulberry32(seed);
  const out: CalendarDay[] = [];
  let momentum = 0;
  for (let i = days - 1; i >= 0; i -= 1) {
    const t = SERIES_END - i * DAY_MS;
    const weekday = new Date(t).getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    momentum += (rand() - 0.5) * 0.9;
    momentum = Math.max(-1.4, Math.min(1.8, momentum));
    const base = (weekend ? 0.9 : 3.4) + momentum * (weekend ? 0.7 : 2.1);
    const quiet = rand() > (weekend ? 0.45 : 0.86);
    const value = quiet ? 0 : Math.max(0, Math.round(base + rand() * 5));
    out.push({ t, value });
  }
  return out;
}

export const CONTRIBUTIONS = generateYear(20_260_823);

function weekStart(t: number) {
  return t - new Date(t).getUTCDay() * DAY_MS;
}

export interface CalendarHeatmapProps {
  className?: string;
  data?: CalendarDay[];
  cell?: number;
  label?: string;
  hue?: string;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function CalendarHeatmap({
  className,
  data = CONTRIBUTIONS,
  cell = 13,
  label = 'contributions',
  hue = 'var(--spectrum-series-3)',
  status = 'ready',
  onRetry,
}: CalendarHeatmapProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hovered, setHovered] = React.useState<CalendarDay | null>(null);

  const byDay = React.useMemo(() => {
    const map = new Map<number, CalendarDay>();
    for (const day of data) map.set(day.t, day);
    return map;
  }, [data]);

  const weeks = React.useMemo(() => {
    if (!data.length) return [];
    const first = weekStart(data[0].t);
    const last = weekStart(data[data.length - 1].t);
    const columns: (CalendarDay | null)[][] = [];
    for (let w = first; w <= last; w += 7 * DAY_MS) {
      const column: (CalendarDay | null)[] = [];
      for (let d = 0; d < 7; d += 1) {
        const t = w + d * DAY_MS;
        column.push(byDay.get(t) ?? (t >= data[0].t && t <= data[data.length - 1].t ? { t, value: 0 } : null));
      }
      columns.push(column);
    }
    return columns;
  }, [data, byDay]);

  const max = React.useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data]);
  const total = React.useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  const streaks = React.useMemo(() => {
    let longest = 0;
    let run = 0;
    for (const day of data) {
      run = day.value > 0 ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    let current = 0;
    for (let i = data.length - 1; i >= 0 && data[i].value > 0; i -= 1) current += 1;
    return { longest, current };
  }, [data]);

  const LABEL_W = 30;
  const MONTH_H = 16;
  const available = Math.max(120, width - LABEL_W - 8);
  const size = Math.max(6, Math.min(cell, Math.floor(available / Math.max(weeks.length, 1)) - 2));
  const gapped = size + 2;

  const gridW = weeks.length * gapped;
  const gridH = 7 * gapped;
  const w = LABEL_W + gridW;
  const h = MONTH_H + gridH;

  const bucket = React.useCallback(
    (value: number) => (value <= 0 ? 0 : Math.min(4, Math.ceil((value / max) * 4))),
    [max],
  );

  const monthMarks = React.useMemo(() => {
    const marks: { x: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((column, index) => {
      const day = column.find(Boolean);
      if (!day) return;
      const month = new Date(day.t).getUTCMonth();
      if (month === lastMonth) return;
      lastMonth = month;
      const x = LABEL_W + index * gapped;
      if (marks.length && x - marks[marks.length - 1].x < 28) return;
      marks.push({ x, label: MONTH_FMT.format(day.t) });
    });
    return marks;
  }, [weeks, gapped]);

  const ready = width > 0;

  return (
    <div
      ref={wrapRef}
      className={cn('flex w-full flex-col text-neutral-400 dark:text-neutral-500', seriesVarsClassName, className)}
    >
      <Keyframes />

      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="font-mono text-[13px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {formatCount(total, 1)} {label}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
            <Stat ready={status === 'ready'}>
              {streaks.current} day current streak · {streaks.longest} day longest
            </Stat>
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
          Less
          {[0, 1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className="size-[11px] rounded-[2.5px]"
              style={{ background: step === 0 ? TRACK : intensityColor(step / 4, hue) }}
            />
          ))}
          More
        </div>
      </div>

      <ChartState
        status={status}
        height={h}
        variant="grid"
        empty={{ title: 'No activity yet', description: 'The grid fills in as daily events are recorded.' }}
        onRetry={onRetry}
      >
      <div className="relative w-full overflow-x-auto">
        {!ready ? null : (
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            className="block select-none"
            role="img"
            aria-label={`${formatCount(total)} ${label} over the last year. Longest streak ${streaks.longest} days.`}
            onPointerLeave={() => setHovered(null)}
          >
            <g className="font-mono">
              {monthMarks.map((mark) => (
                <text key={`${mark.x}-${mark.label}`} x={mark.x} y={11} fontSize={9.5} fill="currentColor">
                  {mark.label}
                </text>
              ))}
              {[1, 3, 5].map((row) => (
                <text
                  key={row}
                  x={0}
                  y={MONTH_H + row * gapped + size / 2}
                  dominantBaseline="middle"
                  fontSize={9.5}
                  fill="currentColor"
                >
                  {WEEKDAYS[row]}
                </text>
              ))}
            </g>

            {weeks.map((column, col) =>
              column.map((day, row) => {
                if (!day) return null;
                const step = bucket(day.value);
                const active = hovered?.t === day.t;
                return (
                  <rect
                    key={day.t}
                    x={LABEL_W + col * gapped}
                    y={MONTH_H + row * gapped}
                    width={size}
                    height={size}
                    rx={Math.max(1.5, size * 0.22)}
                    fill={step === 0 ? TRACK : intensityColor(step / 4, hue)}
                    stroke={active ? 'currentColor' : 'transparent'}
                    strokeWidth={1.25}
                    className="text-neutral-900 dark:text-white"
                    onPointerEnter={() => setHovered(day)}
                    style={{
                      animation: reduce
                        ? undefined
                        : `spectrum-mc-fade 320ms ease-out ${Math.min((col * 7 + row) * 1.4, 520)}ms both`,
                      transition: reduce ? undefined : `stroke 120ms ${EASE}`,
                    }}
                  />
                );
              }),
            )}
          </svg>
        )}
      </div>
      </ChartState>

      <p
        className="mt-2 h-4 font-mono text-[11px] tabular-nums text-neutral-600 transition-opacity duration-150 dark:text-neutral-300"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-live="polite"
      >
        {hovered
          ? `${hovered.value === 0 ? 'No' : hovered.value} ${label} on ${DAY_FMT.format(hovered.t)}`
          : ' '}
      </p>
    </div>
  );
}

export function DefaultCalendarHeatmap(props: CalendarHeatmapProps) {
  return <CalendarHeatmap {...props} />;
}

export function DeploysCalendarHeatmap(props: CalendarHeatmapProps) {
  return (
    <CalendarHeatmap
      data={generateYear(4_815_162)}
      label="deploys"
      hue="var(--spectrum-series-4)"
      {...props}
    />
  );
}
