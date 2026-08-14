/**
 * Spectrum UI — Live Traffic
 *
 * A line that is still arriving. Hover pauses the stream.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: recharts, framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  AnimatedNumber,
  CHART_PALETTE_CLASS,
  ChartReveal,
  ChartTooltipContent,
  RechartsCursor,
  SPRING_SNAPPY,
  chartSurfaceClassName,
  useChartMotion,
} from "./chart-kit"

export interface TrafficPoint {
  t: number
  rps: number
}

export interface LiveTrafficChartProps {
  /** Seed window. New points append on an interval until hover pauses. */
  data?: TrafficPoint[]
  intervalMs?: number
  windowSize?: number
  className?: string
}

function mulberry32(seed: number) {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function seedWindow(size: number): TrafficPoint[] {
  const rand = mulberry32(42)
  const now = 1_704_067_200_000
  const points: TrafficPoint[] = []
  let value = 42
  for (let i = size; i > 0; i--) {
    value = clamp(value + (rand() - 0.42) * 8, 12, 96)
    points.push({ t: now - i * 800, rps: Math.round(value) })
  }
  return points
}

function nextPoint(prev: TrafficPoint): TrafficPoint {
  return {
    t: Date.now(),
    rps: Math.round(clamp(prev.rps + (Math.random() - 0.42) * 8, 12, 96)),
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function LiveTrafficChart({
  data,
  intervalMs = 800,
  windowSize = 40,
  className,
}: LiveTrafficChartProps) {
  const { reduce, spring, duration } = useChartMotion()
  const [paused, setPaused] = React.useState(false)
  const [points, setPoints] = React.useState<TrafficPoint[]>(() => data ?? seedWindow(windowSize))
  const current = points[points.length - 1]?.rps ?? 0

  React.useEffect(() => {
    if (paused || reduce) return
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const next = [...prev, nextPoint(prev[prev.length - 1] ?? { t: Date.now(), rps: 40 })]
        return next.slice(-windowSize)
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [paused, reduce, intervalMs, windowSize])

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.ink,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label={`Live traffic ${current} requests per second${paused ? ", paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Requests / sec</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <AnimatedNumber value={current} />
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider",
            paused
              ? "border-neutral-200 text-neutral-400 dark:border-neutral-700 dark:text-neutral-500"
              : "border-sky-500/30 text-sky-600 dark:text-sky-400",
          )}
        >
          <motion.span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              paused ? "bg-neutral-400" : "bg-sky-500",
            )}
            animate={reduce || paused ? { scale: 1, opacity: 1 } : { scale: [1, 1.35, 1], opacity: [1, 0.7, 1] }}
            transition={
              reduce || paused
                ? spring(SPRING_SNAPPY)
                : { duration: duration(1.4), repeat: Infinity, ease: "easeInOut" }
            }
          />
          {paused ? "PAUSED" : "LIVE"}
        </span>
      </div>

      <ChartReveal className="mt-6 h-36 sm:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <YAxis hide domain={["dataMin - 8", "dataMax + 8"]} />
            <Tooltip
              cursor={<RechartsCursor />}
              content={
                <ChartTooltipContent
                  label="RPS"
                  formatter={(value) => Number(value).toFixed(0)}
                />
              }
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="rps"
              stroke="var(--chart-solid)"
              strokeWidth={1.75}
              dot={false}
              isAnimationActive={false}
              activeDot={{ r: 3.5, fill: "var(--chart-solid)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartReveal>

      <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
        Trailing {windowSize} samples · hover to pause
      </p>
    </figure>
  )
}
