/**
 * Spectrum UI — Infra Trio
 *
 * Three aligned sparks sharing one time cursor.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  CHART_PALETTE_CLASS,
  ChartGradient,
  ChartReveal,
  RechartsCursor,
  chartSurfaceClassName,
} from "./chart-kit"

export type InfraStatus = "ok" | "warn" | "critical"

export interface InfraSeries {
  key: string
  label: string
  unit: string
  status: InfraStatus
  points: { t: string; value: number }[]
}

export interface InfraTrioChartProps {
  series?: InfraSeries[]
  className?: string
}

function spark(offset: number, base: number, amp: number) {
  return Array.from({ length: 24 }, (_, i) => ({
    t: `${i}`,
    value: Math.round(base + Math.sin(i / 2.2 + offset) * amp + ((i * 3) % 5) - 2),
  }))
}

const SAMPLE: InfraSeries[] = [
  { key: "cpu", label: "CPU", unit: "%", status: "ok", points: spark(0.2, 34, 12) },
  { key: "mem", label: "Memory", unit: "%", status: "warn", points: spark(1.1, 71, 8) },
  { key: "disk", label: "Disk", unit: "%", status: "ok", points: spark(2.4, 48, 6) },
]

const STATUS_DOT: Record<InfraStatus, string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  critical: "bg-rose-500",
}

export function InfraTrioChart({ series = SAMPLE, className }: InfraTrioChartProps) {
  const [cursorIndex, setCursorIndex] = React.useState<number | null>(null)
  const gradientId = React.useId().replace(/:/g, "")

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.ink,
        "flex flex-col gap-4 p-5 sm:p-6",
        className,
      )}
      aria-label="Infrastructure metrics"
    >
      <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Hosts · prod-eu</p>
      <ul className="flex flex-col gap-3">
        {series.map((row) => {
          const last = row.points[row.points.length - 1]
          const index = cursorIndex ?? row.points.length - 1
          const point = row.points[index] ?? last
          return (
            <li key={row.key} className="grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 rounded-full", STATUS_DOT[row.status])}
                />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {row.label}
                </span>
              </div>
              <ChartReveal className="h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={row.points}
                    margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
                    onMouseMove={(state) => {
                      if (typeof state?.activeTooltipIndex === "number") {
                        setCursorIndex(state.activeTooltipIndex)
                      }
                    }}
                    onMouseLeave={() => setCursorIndex(null)}
                  >
                    <defs>
                      <ChartGradient
                        id={`infra-${row.key}-${gradientId}`}
                        from="var(--chart-solid)"
                        to="var(--chart-solid)"
                        fromOpacity={0.22}
                        toOpacity={0}
                      />
                    </defs>
                    <YAxis hide domain={["dataMin - 6", "dataMax + 6"]} />
                    <Tooltip cursor={<RechartsCursor />} content={() => null} isAnimationActive={false} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--chart-solid)"
                      strokeWidth={1.5}
                      fill={`url(#infra-${row.key}-${gradientId})`}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartReveal>
              <span className="text-right text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                {point.value}
                {row.unit}
              </span>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
