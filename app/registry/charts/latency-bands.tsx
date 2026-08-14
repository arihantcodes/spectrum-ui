/**
 * Spectrum UI — Latency Bands
 *
 * Percentiles as stacked bands against an SLO zone.
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
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import { cn } from "@/lib/utils"
import {
  CHART_PALETTE_CLASS,
  ChartPattern,
  ChartReveal,
  ChartTooltipContent,
  RechartsCursor,
  chartSurfaceClassName,
} from "./chart-kit"

export interface LatencyPoint {
  t: string
  p50: number
  p95: number
  p99: number
}

export interface LatencyBandsChartProps {
  data?: LatencyPoint[]
  sloMs?: number
  className?: string
}

const SAMPLE: LatencyPoint[] = [
  { t: "00", p50: 42, p95: 118, p99: 164 },
  { t: "04", p50: 38, p95: 102, p99: 148 },
  { t: "08", p50: 61, p95: 154, p99: 210 },
  { t: "12", p50: 88, p95: 198, p99: 268 },
  { t: "16", p50: 74, p95: 176, p99: 232 },
  { t: "20", p50: 55, p95: 142, p99: 188 },
  { t: "24", p50: 47, p95: 121, p99: 171 },
]

const BANDS = [
  { key: "p50", label: "P50", opacity: 0.5 },
  { key: "p95", label: "P95", opacity: 0.28 },
  { key: "p99", label: "P99", opacity: 0.15 },
] as const

export function LatencyBandsChart({
  data = SAMPLE,
  sloMs = 200,
  className,
}: LatencyBandsChartProps) {
  const [hidden, setHidden] = React.useState<string[]>([])
  const hatchId = React.useId().replace(/:/g, "")
  const latest = data[data.length - 1]

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    )
  }

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.signal,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label={`Latency percentiles against a ${sloMs} millisecond SLO`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Latency</p>
          <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            SLO {sloMs}ms
          </p>
        </div>
        <div className="flex gap-1.5">
          {BANDS.map((band) => {
            const off = hidden.includes(band.key)
            const value = latest[band.key]
            const breach = value > sloMs
            return (
              <button
                key={band.key}
                type="button"
                onClick={() => toggle(band.key)}
                aria-pressed={!off}
                className={cn(
                  "rounded-lg border px-2 py-1.5 text-left transition-opacity",
                  "border-neutral-200 dark:border-neutral-800",
                  "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                  off && "opacity-40",
                )}
              >
                <span className="block text-[10px] font-medium text-neutral-400">{band.label}</span>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    breach
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-neutral-900 dark:text-neutral-100",
                  )}
                >
                  {value}
                  <span className="ml-0.5 text-[10px] font-medium text-neutral-400">ms</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <ChartReveal className="mt-5 h-44 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <ChartPattern id={`slo-hatch-${hatchId}`} variant="hatch" color="#f97316" />
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 6"
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-800"
            />
            <XAxis
              dataKey="t"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              className="fill-neutral-400"
            />
            <Tooltip
              cursor={<RechartsCursor />}
              content={<ChartTooltipContent formatter={(value) => `${value}ms`} />}
              isAnimationActive={false}
            />
            <ReferenceArea
              y1={sloMs}
              y2={320}
              fill={`url(#slo-hatch-${hatchId})`}
              ifOverflow="extendDomain"
            />
            <ReferenceLine
              y={sloMs}
              stroke="#f97316"
              strokeDasharray="4 4"
              label={{
                value: `${sloMs}ms`,
                position: "insideTopRight",
                fontSize: 10,
                fill: "#f97316",
              }}
            />
            {[...BANDS].reverse().map((band) =>
              hidden.includes(band.key) ? null : (
                <Area
                  key={band.key}
                  type="monotone"
                  dataKey={band.key}
                  name={band.label}
                  stroke="var(--chart-solid)"
                  strokeWidth={band.key === "p50" ? 1.5 : 0}
                  fill="var(--chart-solid)"
                  fillOpacity={band.opacity}
                  isAnimationActive={false}
                />
              ),
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartReveal>
    </figure>
  )
}
