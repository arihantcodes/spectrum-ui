/**
 * Spectrum UI — Activity Lattice
 *
 * Intensity over a year as a quiet lattice. Hover opens a floating day card.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  CHART_PALETTE_CLASS,
  SPRING_SNAPPY,
  chartSurfaceClassName,
  useChartMotion,
} from "./chart-kit"

export interface LatticeDay {
  date: string
  count: number
}

export interface ActivityLatticeChartProps {
  days?: LatticeDay[]
  weeks?: number
  className?: string
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function hash(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0
  return Math.abs(h)
}

function buildYear(weeks: number): LatticeDay[] {
  const start = new Date("2025-01-06T00:00:00")
  const days: LatticeDay[] = []
  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const iso = date.toISOString().slice(0, 10)
    const count = hash(iso) % 11 === 0 ? 0 : hash(iso) % 28
    days.push({ date: iso, count })
  }
  return days
}

function intensity(count: number, max: number) {
  if (count <= 0) return 0
  return Math.max(0.18, count / max)
}

export function ActivityLatticeChart({
  days,
  weeks = 28,
  className,
}: ActivityLatticeChartProps) {
  const { reduce } = useChartMotion()
  const data = React.useMemo(() => days ?? buildYear(weeks), [days, weeks])
  const max = Math.max(...data.map((day) => day.count), 1)
  const [hover, setHover] = React.useState<LatticeDay | null>(null)
  const columns = Math.ceil(data.length / 7)

  const monthTicks: { index: number; label: string }[] = []
  let lastMonth = -1
  for (let col = 0; col < columns; col++) {
    const day = data[col * 7]
    if (!day) continue
    const month = new Date(day.date).getMonth()
    if (month !== lastMonth) {
      monthTicks.push({ index: col, label: MONTHS[month] ?? "" })
      lastMonth = month
    }
  }

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.ink,
        "relative flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label="Activity over the year"
      onMouseLeave={() => setHover(null)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Activity</p>
        <p className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
          {data.reduce((sum, day) => sum + day.count, 0).toLocaleString()} events
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `1.75rem repeat(${columns}, 11px)`,
            gridTemplateRows: `1rem repeat(7, 11px)`,
          }}
        >
          <span />
          {Array.from({ length: columns }, (_, col) => {
            const tick = monthTicks.find((item) => item.index === col)
            return (
              <span
                key={`m-${col}`}
                className="text-[9px] leading-none text-neutral-400 dark:text-neutral-500"
              >
                {tick?.label ?? ""}
              </span>
            )
          })}
          {WEEKDAYS.map((label, row) => (
            <React.Fragment key={label}>
              <span className="pr-1 text-right text-[9px] leading-[11px] text-neutral-400 dark:text-neutral-500">
                {row % 2 === 0 ? label : ""}
              </span>
              {Array.from({ length: columns }, (_, col) => {
                const day = data[col * 7 + row]
                if (!day) return <span key={`${row}-${col}`} />
                const level = intensity(day.count, max)
                return (
                  <motion.button
                    key={day.date}
                    type="button"
                    aria-label={`${day.date}: ${day.count} events`}
                    onMouseEnter={() => setHover(day)}
                    onFocus={() => setHover(day)}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduce ? 0 : col * 0.012, duration: reduce ? 0 : 0.25 }}
                    whileHover={reduce ? undefined : { scale: 1.08 }}
                    className="size-[11px] rounded-[2px] border border-neutral-200 dark:border-neutral-800"
                    style={{
                      backgroundColor:
                        day.count === 0
                          ? "transparent"
                          : `color-mix(in oklab, var(--chart-solid) ${Math.round(level * 100)}%, transparent)`,
                    }}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] text-neutral-400 dark:text-neutral-500">
          Less
          {[0, 0.18, 0.4, 0.65, 1].map((level) => (
            <span
              key={level}
              className="size-2.5 rounded-[2px] border border-neutral-200 dark:border-neutral-800"
              style={{
                backgroundColor: level === 0 ? "transparent" : "var(--chart-solid)",
                opacity: level === 0 ? 1 : level,
              }}
            />
          ))}
          More
        </div>
      </div>

      <AnimatePresence>
        {hover ? (
          <motion.div
            key={hover.date}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SPRING_SNAPPY}
            className="pointer-events-none absolute top-4 right-4 rounded-lg border border-neutral-200 bg-neutral-100 px-2.5 py-1.5 text-xs shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {new Date(hover.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="tabular-nums text-neutral-500 dark:text-neutral-400">
              {hover.count} events
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </figure>
  )
}
