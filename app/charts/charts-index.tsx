/**
 * The /charts index — every chart as a live cell in a hairline grid.
 *
 * Cells mount their chart only when they scroll near the viewport. Twenty-odd
 * live charts on one route is a lot of SVG to build up front, and the ones
 * below the fold cost layout work nobody has looked at yet.
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { MarketChart } from '@/app/registry/charts/market-chart';
import { IndicatorChart } from '@/app/registry/charts/indicator-chart';
import { DepthChart } from '@/app/registry/charts/depth-chart';
import { OrderBookLadder } from '@/app/registry/charts/order-book';
import { PortfolioChart } from '@/app/registry/charts/portfolio-chart';
import { MarketHeatmap } from '@/app/registry/charts/market-heatmap';
import { CalendarHeatmap } from '@/app/registry/charts/calendar-heatmap';
import { CohortChart } from '@/app/registry/charts/cohort-chart';
import { HistogramChart } from '@/app/registry/charts/histogram-chart';
import { StatCards } from '@/app/registry/charts/stat-cards';
import { DefaultBarChart } from '@/app/registry/charts/bar-chart';
import { DefaultLineChart } from '@/app/registry/charts/line-chart';
import { DefaultAreaChart } from '@/app/registry/charts/area-chart';
import { DonutPieChart } from '@/app/registry/charts/pie-chart';
import { DefaultRadarChart } from '@/app/registry/charts/radar-chart';
import { SemiRadialChart } from '@/app/registry/charts/radial-chart';
import { DefaultComposedChart } from '@/app/registry/charts/composed-chart';
import { DefaultCandlestickChart } from '@/app/registry/charts/candlestick-chart';
import { Watchlist } from '@/app/registry/charts/sparkline-chart';
import { DefaultPriceChart } from '@/app/registry/charts/price-chart';
import { WATCHLIST } from '@/app/registry/charts/chart-kit';
import { COHORTS } from '@/app/registry/charts/cohort-chart';
import { STAT_CARDS } from '@/app/registry/charts/stat-cards';
import { generateOrderBook } from '@/app/registry/charts/chart-engine';

const preview = 'pointer-events-none h-full w-full';

/**
 * Every cell gets the same plot zone, so a row reads as one band. Charts that
 * carry their own header (price, readout, range selector) get that height
 * subtracted, otherwise they overflow the zone and clip.
 */
const ZONE = 300;
const plot = (headerAllowance: number) => ZONE - headerAllowance;

/* Charts that are intrinsically tall get less data here rather than being
   cropped — a clipped order book looks broken, a shorter one does not. */
const BOOK_PREVIEW = generateOrderBook({ mid: 245.85, seed: 90_210, levels: 7, depth: 820 });
const COHORT_PREVIEW = COHORTS.slice(0, 7).map((c) => ({
  ...c,
  retention: c.retention.slice(0, 8),
}));

type Cell = {
  slug: string;
  file: string;
  blurb: string;
  /** Financial charts get the accent rule; the rest stay neutral. */
  group: 'market' | 'analytics' | 'core';
  node: React.ReactNode;
};

const CELLS: Cell[] = [
  {
    slug: 'market',
    file: 'market-chart.tsx',
    blurb: 'Candles, volume, snapping crosshair, range selector, live tape.',
    group: 'market',
    node: (
      <MarketChart
        className={preview}
        height={plot(76)}
        showRangeSelector={false}
        showVolume={false}
        defaultRange="3M"
      />
    ),
  },
  {
    slug: 'indicators',
    file: 'indicator-chart.tsx',
    blurb: 'Price, RSI and MACD on one time axis, one crosshair across all three.',
    group: 'market',
    node: <IndicatorChart className={preview} height={plot(112)} defaultRange="3M" />,
  },
  {
    slug: 'order-book',
    file: 'order-book.tsx',
    blurb: 'Cumulative depth bars, a spread row, flashing live updates.',
    group: 'market',
    node: <OrderBookLadder className={preview} book={BOOK_PREVIEW} />,
  },
  {
    slug: 'depth',
    file: 'depth-chart.tsx',
    blurb: 'Bid and ask liquidity either side of the mid.',
    group: 'market',
    node: <DepthChart className={preview} height={plot(64)} />,
  },
  {
    slug: 'portfolio',
    file: 'portfolio-chart.tsx',
    blurb: 'Value against cost basis, drawdown from the running peak.',
    group: 'market',
    node: <PortfolioChart className={preview} height={plot(104)} />,
  },
  {
    slug: 'candlestick',
    file: 'candlestick-chart.tsx',
    blurb: 'OHLC candles on Recharts, for when you are already using it.',
    group: 'market',
    node: <DefaultCandlestickChart className={preview} />,
  },
  {
    slug: 'stat-cards',
    file: 'stat-cards.tsx',
    blurb: 'KPI tiles with scrubbable sparklines and health-aware deltas.',
    group: 'analytics',
    node: <StatCards className={preview} cards={STAT_CARDS.slice(0, 2)} columns={1} />,
  },
  {
    slug: 'calendar',
    file: 'calendar-heatmap.tsx',
    blurb: 'A year of daily values, five quantised steps, streak stats.',
    group: 'analytics',
    node: <CalendarHeatmap className={preview} cell={8} />,
  },
  {
    slug: 'cohort',
    file: 'cohort-chart.tsx',
    blurb: 'The retention triangle, with a row and column crosshair.',
    group: 'analytics',
    node: <CohortChart className={preview} data={COHORT_PREVIEW} />,
  },
  {
    slug: 'histogram',
    file: 'histogram-chart.tsx',
    blurb: 'Binned distribution with p50 / p95 / p99 pinned to the plot.',
    group: 'analytics',
    node: <HistogramChart className={preview} height={plot(52)} />,
  },
  {
    slug: 'heatmap',
    file: 'market-heatmap.tsx',
    blurb: 'Squarified treemap on a diverging change ramp.',
    group: 'analytics',
    node: <MarketHeatmap className={preview} height={plot(54)} />,
  },
  {
    slug: 'price',
    file: 'price-chart.tsx',
    blurb: 'Ticker chrome — last price and signed delta over a filled area.',
    group: 'market',
    node: <DefaultPriceChart className={preview} />,
  },
  {
    slug: 'sparkline',
    file: 'sparkline-chart.tsx',
    blurb: 'Inline marks for watchlists and dense tables.',
    group: 'analytics',
    node: <Watchlist className={preview} rows={WATCHLIST.slice(0, 5)} />,
  },
  {
    slug: 'bar',
    file: 'bar-chart.tsx',
    blurb: 'Ten fills — hatch, duotone, gradient, stripe, stack, glow.',
    group: 'core',
    node: <DefaultBarChart className={preview} />,
  },
  {
    slug: 'line',
    file: 'line-chart.tsx',
    blurb: 'Solid, dashed, bump, step, gradient and glow strokes.',
    group: 'core',
    node: <DefaultLineChart className={preview} />,
  },
  {
    slug: 'area',
    file: 'area-chart.tsx',
    blurb: 'Gradient, hatch, dotted, stacked and dashed-stroke fills.',
    group: 'core',
    node: <DefaultAreaChart className={preview} />,
  },
  {
    slug: 'composed',
    file: 'composed-chart.tsx',
    blurb: 'Bars, lines and areas sharing one plot.',
    group: 'core',
    node: <DefaultComposedChart className={preview} />,
  },
  {
    slug: 'pie',
    file: 'pie-chart.tsx',
    blurb: 'Pie and donut with padded sectors and labels.',
    group: 'core',
    node: <DonutPieChart className={preview} />,
  },
  {
    slug: 'radar',
    file: 'radar-chart.tsx',
    blurb: 'Filled or outline series on circle grids.',
    group: 'core',
    node: <DefaultRadarChart className={preview} />,
  },
  {
    slug: 'radial',
    file: 'radial-chart.tsx',
    blurb: 'Full and semi-circle radial bars for share and progress.',
    group: 'core',
    node: <SemiRadialChart className={preview} />,
  },
];

const GROUP_LABEL: Record<Cell['group'], string> = {
  market: 'Market',
  analytics: 'Analytics',
  core: 'Core',
};

/** Mounts children once the cell is within a screen of the viewport. */
function InView({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // No IntersectionObserver (jsdom, very old Safari) — show everything
    // rather than leaving the grid permanently blank.
    if (typeof IntersectionObserver === 'undefined') {
      // Deferred, not synchronous: a setState in the effect body cascades a
      // second render pass for every cell on the page.
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {shown ? children : null}
    </div>
  );
}

export function ChartsIndex({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
      {CELLS.map((cell) => (
        <Link
          key={cell.slug}
          href={`/charts/${cell.slug}`}
          className={cn(
            'group relative flex flex-col border-border',
            // Close the right edge of each row so the grid reads as one table.
            'border-b md:border-r md:[&:nth-child(2n)]:border-r-0',
            // This project's Tailwind emits `hover:` as a bare `:hover`, so the
            // tint has to be gated by hand — otherwise a tap on touch leaves
            // the cell lit after navigating back. Underscores become spaces.
            'transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
            '[@media(hover:hover)]:hover:bg-[#f9452d]/[0.025] dark:[@media(hover:hover)]:hover:bg-[#E1F435]/[0.03]',
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f9452d]/40 dark:focus-visible:ring-[#E1F435]/40',
          )}
        >
          <div className="flex items-start justify-between gap-3 px-6 pt-6">
            <div className="min-w-0">
              <p className="flex items-center gap-2">
                <span
                  className={cn(
                    'font-mono text-[10px] font-medium uppercase tracking-[0.1em]',
                    cell.group === 'market'
                      ? 'text-[#f9452d] dark:text-[#E1F435]'
                      : 'text-neutral-400 dark:text-neutral-500',
                  )}
                >
                  {GROUP_LABEL[cell.group]}
                </span>
                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-600">
                  {cell.file}
                </span>
              </p>
              <p className="mt-2 line-clamp-2 h-[41px] max-w-[34ch] font-inter text-[13.5px] leading-[1.5] text-[#080808]/62 dark:text-neutral-400">
                {cell.blurb}
              </p>
            </div>
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-[#080808]/40 transition-[background-color,border-color,color,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-[#f9452d] group-hover:bg-[#f9452d] group-hover:text-white group-active:scale-[0.94] dark:text-neutral-500 dark:group-hover:border-[#E1F435] dark:group-hover:bg-[#E1F435] dark:group-hover:text-black">
              <ArrowUpRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-px group-hover:-translate-y-px" />
            </span>
          </div>

          {/* The chart itself. Pointer events off — the whole cell is the link. */}
          <InView
            className="relative mt-4 flex items-center overflow-hidden px-6 pb-6"
            style={{ height: ZONE + 20 }}
          >
            {cell.node}
          </InView>
        </Link>
      ))}
    </div>
  );
}
