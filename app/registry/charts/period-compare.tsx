/**
 * Spectrum UI — Period Compare
 *
 * This period vs last, with a timeframe that morphs the data.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  AnimatedNumber,
  CHART_PALETTE_CLASS,
  ChartReveal,
  ChartTooltipContent,
  DeltaBadge,
  RechartsCursor,
  TimeRangeToggle,
  chartSurfaceClassName,
  formatCompact,
} from "./chart-kit"

export type CompareRange = "7D" | "30D" | "90D"

export interface ComparePoint {
  label: string
  current: number
  previous: number
}

export interface PeriodCompareChartProps {
  series?: Record<CompareRange, ComparePoint[]>
  className?: string
}

const RANGES = [
  { value: "7D", label: "7D" },
  { value: "30D", label: "30D" },
  { value: "90D", label: "90D" },
] as const

function buildSeries(length: number, seed: number, label: (i: number) => string): ComparePoint[] {
  const points: ComparePoint[] = []
  let current = 40 + (seed % 12)
  let previous = 36 + (seed % 9)
  for (let i = 0; i < length; i++) {
    current = current + Math.sin(i / 2.4 + seed) * 4 + (i % 5) - 1.5
    previous = previous + Math.cos(i / 2.8 + seed) * 3.2 + ((i + 2) % 4) - 1.2
    points.push({
      label: label(i),
      current: Math.round(Math.max(8, current)),
      previous: Math.round(Math.max(8, previous)),
    })
  }
  return points
}

const SAMPLE: Record<CompareRange, ComparePoint[]> = {
  "7D": buildSeries(7, 1, (i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i] ?? `${i}`),
  "30D": buildSeries(30, 3, (i) => `${i + 1}`),
  "90D": buildSeries(24, 7, (i) => `W${i + 1}`),
}

export function PeriodCompareChart({
  series = SAMPLE,
  className,
}: PeriodCompareChartProps) {
  const [range, setRange] = React.useState<CompareRange>("7D")
  const data = series[range]
  const currentTotal = data.reduce((sum, point) => sum + point.current, 0)
  const previousTotal = data.reduce((sum, point) => sum + point.previous, 0)
  const delta = previousTotal === 0 ? 0 : ((currentTotal - previousTotal) / previousTotal) * 100

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.heat,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label="Period comparison"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Sessions</p>
        <TimeRangeToggle
          layoutId="period-compare-range"
          options={RANGES}
          value={range}
          onChange={(value) => setRange(value as CompareRange)}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">This {range}</p>
          <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <AnimatedNumber value={currentTotal} format={formatCompact} />
          </p>
        </div>
        <div>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Last {range}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-500">
              <AnimatedNumber value={previousTotal} format={formatCompact} />
            </p>
            <DeltaBadge value={delta} />
          </div>
        </div>
      </div>

      <ChartReveal className="mt-5 h-40 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" hide={range !== "7D"} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent />}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              name="Last"
              stroke="currentColor"
              className="text-neutral-300 dark:text-neutral-700"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="current"
              name="This"
              stroke="var(--chart-solid)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartReveal>
    </figure>
  )
}
