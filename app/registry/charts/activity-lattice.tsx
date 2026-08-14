/**
 * Spectrum UI — Activity Lattice
 *
 * Intensity over a year as a quiet lattice. Hover opens a floating day card.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChartEyebrow, ChartSurface, SPRING_SNAPPY, useChartMotion } from './chart-kit';

export interface LatticeDay {
  date: string;
  count: number;
}

export interface ActivityLatticeChartProps {
  days?: LatticeDay[];
  weeks?: number;
  className?: string;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildYear(weeks: number): LatticeDay[] {
  const start = new Date('2025-01-06T00:00:00');
  const days: LatticeDay[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const iso = date.toISOString().slice(0, 10);
    const count = hash(iso) % 11 === 0 ? 0 : hash(iso) % 28;
    days.push({ date: iso, count });
  }
  return days;
}

function intensity(count: number, max: number) {
  if (count <= 0) return 0;
  return Math.max(0.22, count / max);
}

export function ActivityLatticeChart({ days, weeks = 28, className }: ActivityLatticeChartProps) {
  const { reduce } = useChartMotion();
  const data = React.useMemo(() => days ?? buildYear(weeks), [days, weeks]);
  const max = Math.max(...data.map((day) => day.count), 1);
  const [hover, setHover] = React.useState<LatticeDay | null>(null);
  const columns = Math.ceil(data.length / 7);
  const total = data.reduce((sum, day) => sum + day.count, 0);
  const activeDays = data.filter((day) => day.count > 0).length;

  const monthTicks: { index: number; label: string }[] = [];
  let lastMonth = -1;
  for (let col = 0; col < columns; col++) {
    const day = data[col * 7];
    if (!day) continue;
    const month = new Date(day.date).getMonth();
    if (month !== lastMonth) {
      monthTicks.push({ index: col, label: MONTHS[month] ?? '' });
      lastMonth = month;
    }
  }

  return (
    <ChartSurface
      palette="signal"
      className={cn('relative flex flex-col p-5 sm:p-6', className)}
      aria-label="Activity over the year"
      onMouseLeave={() => setHover(null)}
    >
      <div className="relative z-10 flex items-end justify-between gap-3">
        <div>
          <ChartEyebrow>Activity</ChartEyebrow>
          <p className="mt-2 text-[1.85rem] leading-none font-semibold tabular-nums tracking-tighter text-neutral-900 dark:text-neutral-100">
            {total.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
            {activeDays} active days
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-5 overflow-x-auto">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `1.75rem repeat(${columns}, 12px)`,
            gridTemplateRows: `1rem repeat(7, 12px)`,
          }}
        >
          <span />
          {Array.from({ length: columns }, (_, col) => {
            const tick = monthTicks.find((item) => item.index === col);
            return (
              <span
                key={`m-${col}`}
                className="text-[9px] leading-none text-neutral-400 dark:text-neutral-500"
              >
                {tick?.label ?? ''}
              </span>
            );
          })}
          {WEEKDAYS.map((label, row) => (
            <React.Fragment key={label}>
              <span className="pr-1 text-right text-[9px] leading-[12px] text-neutral-400 dark:text-neutral-500">
                {row % 2 === 0 ? label : ''}
              </span>
              {Array.from({ length: columns }, (_, col) => {
                const day = data[col * 7 + row];
                if (!day) return <span key={`${row}-${col}`} />;
                const level = intensity(day.count, max);
                const hot = hover?.date === day.date;
                return (
                  <motion.button
                    key={day.date}
                    type="button"
                    aria-label={`${day.date}: ${day.count} events`}
                    onMouseEnter={() => setHover(day)}
                    onFocus={() => setHover(day)}
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: hot ? 1.22 : 1 }}
                    transition={{ delay: reduce ? 0 : col * 0.01, duration: reduce ? 0 : 0.22 }}
                    className="size-3 rounded-[3px] border border-neutral-200/70 dark:border-white/8"
                    style={{
                      backgroundColor:
                        day.count === 0
                          ? 'transparent'
                          : `color-mix(in oklab, var(--chart-solid) ${Math.round(level * 100)}%, transparent)`,
                      boxShadow: hot ? '0 0 14px var(--chart-glow)' : 'none',
                    }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500">
        Less
        {[0, 0.22, 0.45, 0.7, 1].map((level) => (
          <span
            key={level}
            className="size-2.5 rounded-[3px] border border-neutral-200/80 dark:border-white/10"
            style={{
              backgroundColor:
                level === 0
                  ? 'transparent'
                  : `color-mix(in oklab, var(--chart-solid) ${Math.round(level * 100)}%, transparent)`,
            }}
          />
        ))}
        More
      </div>

      <AnimatePresence>
        {hover ? (
          <motion.div
            key={hover.date}
            initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={SPRING_SNAPPY}
            className="pointer-events-none absolute top-4 right-4 rounded-2xl border border-white/60 bg-white/85 px-3 py-2 text-xs shadow-[0_16px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/85"
          >
            <p className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              {new Date(hover.date).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </p>
            <p className="mt-0.5 tabular-nums text-neutral-500 dark:text-neutral-400">
              {hover.count} events
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ChartSurface>
  );
}
