/**
 * Spectrum UI — Share Ring
 *
 * Donut with the KPI living in the hole. The breakdown list is the legend.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  AnimatedNumber,
  CHART_PALETTE_CLASS,
  SPRING_FLUID,
  chartSurfaceClassName,
  formatCompact,
  useChartMotion,
} from "./chart-kit"

export interface ShareSlice {
  key: string
  label: string
  value: number
}

export interface ShareRingChartProps {
  data?: ShareSlice[]
  unit?: string
  className?: string
}

const SAMPLE: ShareSlice[] = [
  { key: "pro", label: "Pro", value: 4280 },
  { key: "team", label: "Team", value: 2610 },
  { key: "free", label: "Free", value: 1840 },
  { key: "enterprise", label: "Enterprise", value: 920 },
]

const SLICE_COLORS = [
  "color-mix(in oklab, var(--chart-solid) 100%, white 0%)",
  "color-mix(in oklab, var(--chart-solid) 78%, white 22%)",
  "color-mix(in oklab, var(--chart-solid) 56%, white 44%)",
  "color-mix(in oklab, var(--chart-solid) 38%, white 62%)",
]

export function ShareRingChart({
  data = SAMPLE,
  unit = "seats",
  className,
}: ShareRingChartProps) {
  const { reduce, duration } = useChartMotion()
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [hidden, setHidden] = React.useState<string[]>([])
  const visible = data.filter((slice) => !hidden.includes(slice.key))
  const total = visible.reduce((sum, slice) => sum + slice.value, 0)
  const active = visible.find((slice) => slice.key === hovered)
  const displayValue = active?.value ?? total
  const displayLabel = active?.label ?? "Total"

  function toggle(key: string) {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    )
  }

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.orchid,
        "grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_11rem] sm:p-6",
        className,
      )}
      aria-label="Seat share by plan"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visible}
              dataKey="value"
              nameKey="label"
              innerRadius="68%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={!reduce}
              animationDuration={duration(0.9) * 1000}
              onMouseEnter={(_, index) => setHovered(visible[index]?.key ?? null)}
              onMouseLeave={() => setHovered(null)}
            >
              {visible.map((slice, index) => {
                const dimmed = hovered != null && hovered !== slice.key
                return (
                  <Cell
                    key={slice.key}
                    fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                    fillOpacity={dimmed ? 0.28 : 1}
                    strokeWidth={hovered === slice.key ? 2 : 0}
                    stroke="var(--chart-to)"
                    style={{ outline: "none", cursor: "pointer" }}
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
            {displayLabel}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <AnimatedNumber value={displayValue} format={formatCompact} />
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">{unit}</p>
        </div>
      </div>

      <ul className="flex flex-col justify-center gap-2.5">
        {data.map((slice, index) => {
          const off = hidden.includes(slice.key)
          const liveShare = off || total === 0 ? 0 : (slice.value / total) * 100
          return (
            <li key={slice.key}>
              <button
                type="button"
                onClick={() => toggle(slice.key)}
                onMouseEnter={() => setHovered(slice.key)}
                onMouseLeave={() => setHovered(null)}
                aria-pressed={!off}
                className={cn(
                  "flex w-full flex-col gap-1 text-left transition-opacity",
                  "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                  off && "opacity-40",
                )}
              >
                <span className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full"
                      style={{ background: SLICE_COLORS[index % SLICE_COLORS.length] }}
                    />
                    {slice.label}
                  </span>
                  <span className="tabular-nums text-neutral-500 dark:text-neutral-400">
                    {off ? "—" : `${liveShare.toFixed(0)}%`}
                  </span>
                </span>
                <span className="h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: SLICE_COLORS[index % SLICE_COLORS.length] }}
                    initial={false}
                    animate={{ width: `${liveShare}%` }}
                    transition={reduce ? { duration: 0 } : SPRING_FLUID}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
