/**
 * Spectrum UI — Revenue Area
 *
 * The number is the chart. Hover-scrubbing rewinds the KPI to that month.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, lucide-react, @/lib/utils
 */

"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  AnimatedNumber,
  CHART_PALETTE_CLASS,
  ChartGradient,
  ChartReveal,
  ChartTooltipContent,
  DeltaBadge,
  RechartsCursor,
  chartSurfaceClassName,
  formatCurrency,
} from "./chart-kit"

export interface RevenuePoint {
  month: string
  revenue: number
}

export interface RevenueAreaChartProps {
  data?: RevenuePoint[]
  currency?: string
  className?: string
}

const SAMPLE: RevenuePoint[] = [
  { month: "Jan", revenue: 48210 },
  { month: "Feb", revenue: 51340 },
  { month: "Mar", revenue: 49880 },
  { month: "Apr", revenue: 56120 },
  { month: "May", revenue: 60440 },
  { month: "Jun", revenue: 58710 },
  { month: "Jul", revenue: 64290 },
  { month: "Aug", revenue: 69150 },
  { month: "Sep", revenue: 67380 },
  { month: "Oct", revenue: 74820 },
  { month: "Nov", revenue: 81240 },
  { month: "Dec", revenue: 84291 },
]

export function RevenueAreaChart({
  data = SAMPLE,
  currency = "USD",
  className,
}: RevenueAreaChartProps) {
  const last = data[data.length - 1]
  const first = data[0]
  const [active, setActive] = React.useState<RevenuePoint>(last)
  const peak = React.useMemo(
    () => data.reduce((best, point) => (point.revenue > best.revenue ? point : best), data[0]),
    [data],
  )
  const delta =
    first.revenue === 0 ? 0 : ((active.revenue - first.revenue) / first.revenue) * 100
  const gradientId = React.useId().replace(/:/g, "")

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.signal,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label={`Revenue ${formatCurrency(active.revenue, currency)} in ${active.month}`}
    >
      <figcaption className="sr-only">
        Monthly revenue from {data[0].month} to {last.month}. Hover the chart to inspect a month.
      </figcaption>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Revenue</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <AnimatedNumber
              value={active.revenue}
              format={(value) => formatCurrency(value, currency)}
            />
          </p>
        </div>
        <DeltaBadge value={delta} className="mb-1" />
      </div>

      <ChartReveal className="mt-6 h-44 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              const point = state?.activePayload?.[0]?.payload as RevenuePoint | undefined
              if (point) setActive(point)
            }}
            onMouseLeave={() => setActive(last)}
          >
            <defs>
              <ChartGradient
                id={`rev-fill-${gradientId}`}
                from="var(--chart-solid)"
                to="var(--chart-solid)"
                fromOpacity={0.28}
                toOpacity={0}
              />
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 6"
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-800"
            />
            <XAxis dataKey="month" hide />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value), currency)} />}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--chart-solid)"
              strokeWidth={2}
              fill={`url(#rev-fill-${gradientId})`}
              isAnimationActive={false}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                stroke: "var(--chart-solid)",
                fill: "var(--background, #fff)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartReveal>

      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
        <span>
          {data[0].month} — {last.month}
        </span>
        <span className="tabular-nums">
          Peak {peak.month} · {formatCurrency(peak.revenue, currency)}
        </span>
      </div>
    </figure>
  )
}
