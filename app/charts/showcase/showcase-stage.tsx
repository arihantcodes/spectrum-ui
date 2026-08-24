'use client';

import * as React from 'react';
import { MarketChart } from '@/app/registry/charts/market-chart';
import { IndicatorChart } from '@/app/registry/charts/indicator-chart';
import { OrderBookLadder } from '@/app/registry/charts/order-book';
import { DepthChart } from '@/app/registry/charts/depth-chart';
import { StatCards } from '@/app/registry/charts/stat-cards';
import { PortfolioChart } from '@/app/registry/charts/portfolio-chart';
import { CohortChart } from '@/app/registry/charts/cohort-chart';
import { CalendarHeatmap } from '@/app/registry/charts/calendar-heatmap';
import { HistogramChart } from '@/app/registry/charts/histogram-chart';
import { MarketHeatmap } from '@/app/registry/charts/market-heatmap';
import { STAT_CARDS } from '@/app/registry/charts/stat-cards';
import { COHORTS } from '@/app/registry/charts/cohort-chart';
import { generateOrderBook } from '@/app/registry/charts/chart-engine';
import { Icons } from '@/components/icon';

/**
 * The capture stage for the marketing reel. Not linked from anywhere and
 * noindexed — it exists so a recorder can drive one chart at a time in a fixed
 * frame, with the entrance animation replaying on every beat.
 *
 * `?beat=` overrides the dwell time and `?start=` the first slide, so a capture
 * script can pace the recording without editing this file.
 */

const BOOK = generateOrderBook({ mid: 245.85, seed: 90_210, levels: 9, depth: 820 });
const COHORT = COHORTS.slice(0, 8).map((c) => ({ ...c, retention: c.retention.slice(0, 9) }));

type Slide = { label: string; note: string; node: React.ReactNode };

const SLIDES: Slide[] = [
  {
    label: 'market-chart.tsx',
    note: 'OHLC candles · volume · snapping crosshair',
    node: <MarketChart height={392} defaultRange="3M" />,
  },
  {
    label: 'indicator-chart.tsx',
    note: 'Price · RSI · MACD on one crosshair',
    node: <IndicatorChart height={430} defaultRange="3M" />,
  },
  {
    label: 'order-book.tsx',
    note: 'Cumulative depth · live flashing updates',
    node: <OrderBookLadder book={BOOK} live />,
  },
  {
    label: 'depth-chart.tsx',
    note: 'Bid and ask liquidity around the mid',
    node: <DepthChart height={392} />,
  },
  {
    label: 'stat-cards.tsx',
    note: 'KPI tiles · rolling digits · scrubbable sparklines',
    node: <StatCards cards={STAT_CARDS} columns={2} />,
  },
  {
    label: 'portfolio-chart.tsx',
    note: 'Value vs cost basis · drawdown from peak',
    node: <PortfolioChart height={412} />,
  },
  {
    label: 'cohort-chart.tsx',
    note: 'Retention triangle · row and column crosshair',
    node: <CohortChart data={COHORT} />,
  },
  {
    label: 'calendar-heatmap.tsx',
    note: 'A year of daily values · five intensity steps',
    node: <CalendarHeatmap cell={13} />,
  },
  {
    label: 'histogram-chart.tsx',
    note: 'Distribution with p50 / p95 / p99 pinned',
    node: <HistogramChart height={392} />,
  },
  {
    label: 'market-heatmap.tsx',
    note: 'Squarified treemap on a diverging ramp',
    node: <MarketHeatmap height={400} />,
  },
];

export const SLIDE_COUNT = SLIDES.length;

declare global {
  interface Window {
    __startShowcase?: () => void;
  }
}

export function ShowcaseStage() {
  const [index, setIndex] = React.useState(0);
  const [beat, setBeat] = React.useState(1600);
  const [running, setRunning] = React.useState(true);
  // Bumped on start so slide 0 remounts and its entrance plays exactly at t0.
  const [runId, setRunId] = React.useState(0);

  React.useEffect(() => {
    // Deferred a frame: reading the query string in a lazy initialiser would
    // diverge from the server render, and setting state in the effect body
    // cascades a second pass.
    const id = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const ms = Number(params.get('beat'));
      if (Number.isFinite(ms) && ms >= 400) setBeat(ms);
      const start = Number(params.get('start'));
      if (Number.isFinite(start) && start > 0) setIndex(start % SLIDES.length);

      // `?hold=1` parks on slide 0 until the recorder calls the start hook, so
      // the reel begins on a real entrance rather than mid-cycle after warmup.
      if (params.get('hold') === '1') {
        setRunning(false);
        window.__startShowcase = () => {
          setIndex(0);
          setRunId((n) => n + 1);
          setRunning(true);
        };
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), beat);
    return () => window.clearInterval(id);
  }, [beat, running]);

  const slide = SLIDES[index];

  return (
    <div className="flex h-[675px] w-[1200px] flex-col overflow-hidden bg-background">
      <style>{`
        @keyframes showcase-in {
          from { opacity: 0; transform: translateY(10px) scale(0.995); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="flex items-center justify-between px-10 pt-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[13px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {slide.label}
          </span>
          <span className="font-inter text-[13px] text-[#080808]/55 dark:text-neutral-400">
            {slide.note}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <span
              key={s.label}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 8,
                background: i === index ? 'var(--showcase-accent)' : 'currentColor',
                opacity: i === index ? 1 : 0.18,
              }}
            />
          ))}
        </div>
      </div>

      {/* Remounted per beat so every entrance animation replays. */}
      <div
        key={`${runId}-${index}`}
        className="flex min-h-0 flex-1 items-center px-10 py-6"
        style={{ animation: 'showcase-in 220ms cubic-bezier(0.23, 1, 0.36, 1) both' }}
      >
        <div className="w-full">{slide.node}</div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-10 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center rounded-md bg-neutral-900 p-1 dark:bg-white">
            <Icons.logo className="h-full w-full text-white dark:text-black" />
          </span>
          <span className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
            SPECTRUM UI
          </span>
        </div>
        <span className="font-mono text-[12px] text-[#080808]/50 dark:text-neutral-500">
          ui.spectrumhq.in/charts
        </span>
      </div>
    </div>
  );
}
