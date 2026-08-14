/**
 * Spectrum UI — Route Throughput
 *
 * Ranked API routes as a list. Sort is the visualization.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  CHART_PALETTE_CLASS,
  SPRING_ENTRANCE,
  chartSurfaceClassName,
  formatCompact,
  useChartMotion,
} from "./chart-kit"

export interface RouteRow {
  method: string
  path: string
  count: number
}

export interface RouteThroughputChartProps {
  data?: RouteRow[]
  className?: string
}

const SAMPLE: RouteRow[] = [
  { method: "GET", path: "/v1/models", count: 18420 },
  { method: "POST", path: "/v1/chat/completions", count: 12640 },
  { method: "GET", path: "/v1/files", count: 8310 },
  { method: "POST", path: "/v1/embeddings", count: 6180 },
  { method: "DELETE", path: "/v1/files/:id", count: 2140 },
  { method: "GET", path: "/v1/usage", count: 1620 },
]

export function RouteThroughputChart({
  data = SAMPLE,
  className,
}: RouteThroughputChartProps) {
  const { reduce } = useChartMotion()
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [pinned, setPinned] = React.useState<string | null>(null)
  const max = Math.max(...data.map((row) => row.count), 1)
  const activeKey = pinned ?? hovered

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.growth,
        "flex flex-col gap-4 p-5 sm:p-6",
        className,
      )}
      aria-label="API route throughput"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
            API requests
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Last 24 hours
          </p>
        </div>
        <p className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
          {formatCompact(data.reduce((sum, row) => sum + row.count, 0))} total
        </p>
      </div>

      <ul className="flex flex-col gap-2.5" onMouseLeave={() => setHovered(null)}>
        {data.map((row, index) => {
          const key = `${row.method}:${row.path}`
          const dimmed = activeKey != null && activeKey !== key
          const width = `${(row.count / max) * 100}%`

          return (
            <li key={key}>
              <button
                type="button"
                onMouseEnter={() => setHovered(key)}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((current) => (current === key ? null : key))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setPinned((current) => (current === key ? null : key))
                  }
                }}
                aria-pressed={pinned === key}
                className={cn(
                  "grid w-full grid-cols-[4.5rem_1fr_3.25rem] items-center gap-3 rounded-lg text-left transition-opacity",
                  "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                  dimmed && "opacity-35",
                )}
              >
                <span className="font-mono text-[11px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
                  {row.method}
                </span>
                <span className="relative h-6 overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-md"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, var(--chart-from), var(--chart-to))",
                    }}
                    initial={reduce ? { width } : { width: 0 }}
                    animate={{ width }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { ...SPRING_ENTRANCE, delay: index * 0.05 }
                    }
                  />
                  <span className="relative z-10 flex h-full items-center px-2 font-mono text-[11px] text-neutral-800 dark:text-neutral-100">
                    {row.path}
                  </span>
                </span>
                <span className="text-right text-xs font-medium tabular-nums text-neutral-700 dark:text-neutral-300">
                  {formatCompact(row.count)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Click a route to pin it
        {pinned ? " · click again to clear" : ""}
      </p>
    </figure>
  )
}
