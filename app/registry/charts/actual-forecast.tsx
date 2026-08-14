/**
 * Spectrum UI — Actual vs Forecast
 *
 * Two encodings, one question: are we ahead of plan?
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  CHART_PALETTE_CLASS,
  ChartPattern,
  ChartReveal,
  ChartTooltipContent,
  RechartsCursor,
  SPRING_ENTRANCE,
  SeriesLegend,
  chartSurfaceClassName,
  formatCompact,
  useChartMotion,
} from "./chart-kit"

export interface ForecastPoint {
  month: string
  actual?: number | null
  forecast: number
}

export interface ActualForecastChartProps {
  data?: ForecastPoint[]
  className?: string
}

const SAMPLE: ForecastPoint[] = [
  { month: "Jan", actual: 42, forecast: 40 },
  { month: "Feb", actual: 44, forecast: 43 },
  { month: "Mar", actual: 41, forecast: 45 },
  { month: "Apr", actual: 48, forecast: 47 },
  { month: "May", actual: 51, forecast: 50 },
  { month: "Jun", actual: 49, forecast: 52 },
  { month: "Jul", actual: 55, forecast: 54 },
  { month: "Aug", actual: 58, forecast: 56 },
  { month: "Sep", actual: 61, forecast: 58 },
  { month: "Oct", actual: 59, forecast: 61 },
  { month: "Nov", actual: null, forecast: 63 },
  { month: "Dec", actual: null, forecast: 66 },
]

function findCrossover(data: ForecastPoint[]) {
  for (let i = 1; i < data.length; i++) {
    const prevA = data[i - 1].actual
    const currA = data[i].actual
    if (prevA == null || currA == null) continue
    const prevDiff = prevA - data[i - 1].forecast
    const currDiff = currA - data[i].forecast
    if (prevDiff <= 0 && currDiff > 0) return data[i]
  }
  return null
}

export function ActualForecastChart({
  data = SAMPLE,
  className,
}: ActualForecastChartProps) {
  const { reduce, duration } = useChartMotion()
  const [hidden, setHidden] = React.useState<string[]>([])
  const gradientId = React.useId().replace(/:/g, "")
  const crossover = React.useMemo(() => findCrossover(data), [data])
  const [callout, setCallout] = React.useState(reduce)

  React.useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setCallout(true), 1100)
    return () => window.clearTimeout(id)
  }, [reduce])

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    )
  }

  const showActual = !hidden.includes("actual")
  const showForecast = !hidden.includes("forecast")

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.ink,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label="Actual versus forecast"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Pipeline</p>
          <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Actual vs forecast
          </p>
        </div>
        <SeriesLegend
          items={[
            { key: "actual", label: "Actual", swatch: "solid", color: "var(--chart-solid)" },
            { key: "forecast", label: "Forecast", swatch: "dashed", color: "var(--chart-from)" },
          ]}
          activeKeys={["actual", "forecast"].filter((key) => !hidden.includes(key))}
          onToggle={toggle}
        />
      </div>

      <ChartReveal className="relative mt-5 h-44 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <ChartPattern id={`forecast-hatch-${gradientId}`} variant="hatch" color="var(--chart-from)" />
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 6"
              className="text-neutral-200 dark:text-neutral-800"
              stroke="currentColor"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              className="fill-neutral-400"
            />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent formatter={(value) => formatCompact(Number(value))} />}
              isAnimationActive={false}
            />
            {showForecast ? (
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="none"
                fill={`url(#forecast-hatch-${gradientId})`}
                isAnimationActive={false}
              />
            ) : null}
            {showForecast ? (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--chart-from)"
                strokeWidth={1.5}
                strokeDasharray="5 4"
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
                strokeWidth={2}
                connectNulls={false}
                dot={false}
                isAnimationActive={!reduce}
                animationDuration={duration(1.1) * 1000}
              />
            ) : null}
          </ComposedChart>
        </ResponsiveContainer>

        <AnimatePresence>
          {callout && crossover ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING_ENTRANCE}
              className="pointer-events-none absolute top-2 right-2 rounded-md border border-neutral-200 bg-white/90 px-2 py-1 text-[11px] font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200"
            >
              Crossed plan · {crossover.month}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ChartReveal>
    </figure>
  )
}
