/**
 * Spectrum UI — Actual vs Forecast
 *
 * Two encodings, one question: are we ahead of plan?
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

'use client';

import * as React from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AnimatedNumber,
  ChartEyebrow,
  ChartGlowFilter,
  ChartPattern,
  ChartReveal,
  ChartSurface,
  ChartTooltipContent,
  DeltaBadge,
  GRID_OPACITY,
  GRID_STROKE,
  GlowDot,
  PlotTexture,
  RechartsCursor,
  SPRING_ENTRANCE,
  SeriesLegend,
  formatCompact,
  useChartMotion,
} from './chart-kit';

export interface ForecastPoint {
  month: string;
  actual?: number | null;
  forecast: number;
}

export interface ActualForecastChartProps {
  data?: ForecastPoint[];
  className?: string;
}

const SAMPLE: ForecastPoint[] = [
  { month: 'Jan', actual: 42, forecast: 40 },
  { month: 'Feb', actual: 44, forecast: 43 },
  { month: 'Mar', actual: 41, forecast: 45 },
  { month: 'Apr', actual: 48, forecast: 47 },
  { month: 'May', actual: 51, forecast: 50 },
  { month: 'Jun', actual: 49, forecast: 52 },
  { month: 'Jul', actual: 55, forecast: 54 },
  { month: 'Aug', actual: 58, forecast: 56 },
  { month: 'Sep', actual: 61, forecast: 58 },
  { month: 'Oct', actual: 59, forecast: 61 },
  { month: 'Nov', actual: null, forecast: 63 },
  { month: 'Dec', actual: null, forecast: 66 },
];

function findCrossover(data: ForecastPoint[]) {
  for (let i = 1; i < data.length; i++) {
    const prevA = data[i - 1].actual;
    const currA = data[i].actual;
    if (prevA == null || currA == null) continue;
    const prevDiff = prevA - data[i - 1].forecast;
    const currDiff = currA - data[i].forecast;
    if (prevDiff <= 0 && currDiff > 0) return data[i];
  }
  return null;
}

export function ActualForecastChart({ data = SAMPLE, className }: ActualForecastChartProps) {
  const { reduce, duration } = useChartMotion();
  const [hidden, setHidden] = React.useState<string[]>([]);
  const id = React.useId().replace(/:/g, '');
  const crossover = React.useMemo(() => findCrossover(data), [data]);
  const latestActual = [...data].reverse().find((point) => point.actual != null);
  const latestDelta =
    latestActual?.actual != null
      ? ((latestActual.actual - latestActual.forecast) / latestActual.forecast) * 100
      : 0;

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  const showActual = !hidden.includes('actual');
  const showForecast = !hidden.includes('forecast');

  return (
    <ChartSurface
      palette="ink"
      className={cn('flex flex-col', className)}
      aria-label="Actual versus forecast"
    >
      <div className="relative z-10 flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <ChartEyebrow>Pipeline</ChartEyebrow>
          <div className="mt-2 flex items-baseline gap-2.5">
            <p className="text-[1.85rem] leading-none font-semibold tracking-tighter text-neutral-900 dark:text-neutral-50">
              <AnimatedNumber
                value={latestActual?.actual ?? 0}
                format={(value) => formatCompact(value)}
              />
            </p>
            <DeltaBadge value={latestDelta} />
          </div>
          <p className="mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
            Actual vs forecast · {latestActual?.month}
          </p>
        </div>
        <SeriesLegend
          items={[
            { key: 'actual', label: 'Actual', swatch: 'solid', color: 'var(--chart-solid)' },
            { key: 'forecast', label: 'Forecast', swatch: 'dashed', color: 'var(--chart-from)' },
          ]}
          activeKeys={['actual', 'forecast'].filter((key) => !hidden.includes(key))}
          onToggle={toggle}
        />
      </div>

      <ChartReveal className="relative mt-2 h-52 sm:h-56">
        <PlotTexture />
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 22, right: 12, left: 8, bottom: 0 }}>
            <defs>
              <ChartGlowFilter id={`af-glow-${id}`} />
              <ChartPattern id={`af-hatch-${id}`} variant="hatch" color="var(--chart-from)" />
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 12"
              stroke={GRID_STROKE}
              strokeOpacity={GRID_OPACITY}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#a3a3a3' }}
            />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent formatter={(value) => formatCompact(Number(value))} />}
              isAnimationActive={false}
            />
            {crossover ? (
              <ReferenceLine
                x={crossover.month}
                stroke="var(--chart-solid)"
                strokeDasharray="3 4"
                strokeOpacity={0.35}
              />
            ) : null}
            {showForecast ? (
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="none"
                fill={`url(#af-hatch-${id})`}
                isAnimationActive={false}
              />
            ) : null}
            {showForecast ? (
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="var(--chart-from)"
                strokeWidth={1.75}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={!reduce}
                animationDuration={duration(1.1) * 1000}
              />
            ) : null}
            {showActual ? (
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--chart-solid)"
                strokeWidth={6}
                strokeOpacity={0.16}
                connectNulls={false}
                dot={false}
                isAnimationActive={false}
                filter={`url(#af-glow-${id})`}
                tooltipType="none"
              />
            ) : null}
            {showActual ? (
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="var(--chart-solid)"
                strokeWidth={2.25}
                connectNulls={false}
                dot={false}
                isAnimationActive={!reduce}
                animationDuration={duration(1.1) * 1000}
                activeDot={<GlowDot />}
              />
            ) : null}
          </ComposedChart>
        </ResponsiveContainer>

        {crossover ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_ENTRANCE, delay: reduce ? 0 : 0.85 }}
            className="pointer-events-none absolute top-3 right-4 rounded-full border border-white/60 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/75 dark:text-neutral-200"
          >
            Crossed plan · {crossover.month}
          </motion.div>
        ) : null}
      </ChartReveal>
    </ChartSurface>
  );
}
