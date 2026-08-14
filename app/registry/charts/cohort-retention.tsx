/**
 * Spectrum UI — Cohort Retention
 *
 * A matrix: rows are signup weeks, columns are age, cells are % retained.
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
  chartSurfaceClassName,
  useChartMotion,
} from "./chart-kit"

export interface CohortRow {
  label: string
  values: number[]
}

export interface CohortRetentionChartProps {
  cohorts?: CohortRow[]
  className?: string
}

const SAMPLE: CohortRow[] = [
  { label: "Mar 03", values: [100, 62, 48, 41, 36, 33, 31] },
  { label: "Mar 10", values: [100, 58, 44, 38, 34, 30, 28] },
  { label: "Mar 17", values: [100, 66, 51, 44, 39, 35, 32] },
  { label: "Mar 24", values: [100, 54, 41, 35, 31, 28] },
  { label: "Mar 31", values: [100, 61, 47, 40, 36] },
  { label: "Apr 07", values: [100, 57, 43, 37] },
  { label: "Apr 14", values: [100, 63, 49] },
]

export function CohortRetentionChart({
  cohorts = SAMPLE,
  className,
}: CohortRetentionChartProps) {
  const { reduce } = useChartMotion()
  const weeks = Math.max(...cohorts.map((row) => row.values.length))
  const [hover, setHover] = React.useState<{ row: number; col: number } | null>(null)

  const readout = hover
    ? {
        cohort: cohorts[hover.row]?.label,
        week: hover.col,
        value: cohorts[hover.row]?.values[hover.col],
      }
    : {
        cohort: cohorts[0]?.label,
        week: 3,
        value: cohorts[0]?.values[3],
      }

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.growth,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label="Cohort retention matrix"
      onMouseLeave={() => setHover(null)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Retention</p>
        <p className="text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
          Cohort {readout.cohort} · W{readout.week} · {readout.value ?? "—"}%
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `3.5rem repeat(${weeks}, minmax(2rem, 1fr))` }}
        >
          <span />
          {Array.from({ length: weeks }, (_, col) => (
            <span
              key={`h-${col}`}
              className={cn(
                "text-center text-[10px] text-neutral-400 dark:text-neutral-500",
                hover?.col === col && "font-medium text-neutral-700 dark:text-neutral-200",
              )}
            >
              W{col}
            </span>
          ))}
          {cohorts.map((row, rowIndex) => (
            <React.Fragment key={row.label}>
              <span
                className={cn(
                  "pr-2 text-right text-[11px] leading-7 text-neutral-500 dark:text-neutral-400",
                  hover?.row === rowIndex && "font-medium text-neutral-800 dark:text-neutral-200",
                )}
              >
                {row.label}
              </span>
              {Array.from({ length: weeks }, (_, col) => {
                const value = row.values[col]
                const empty = value == null
                const highlight =
                  hover != null && (hover.row === rowIndex || hover.col === col)
                const focus = hover?.row === rowIndex && hover?.col === col
                return (
                  <motion.button
                    key={`${row.label}-${col}`}
                    type="button"
                    disabled={empty}
                    onMouseEnter={() => {
                      if (!empty) setHover({ row: rowIndex, col })
                    }}
                    onFocus={() => {
                      if (!empty) setHover({ row: rowIndex, col })
                    }}
                    aria-label={
                      empty
                        ? `${row.label} week ${col} unavailable`
                        : `${row.label} week ${col}: ${value}% retained`
                    }
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: empty ? 0 : highlight || hover == null ? 1 : 0.35 }}
                    transition={{
                      delay: reduce ? 0 : rowIndex * 0.04 + col * 0.02,
                      duration: reduce ? 0 : 0.2,
                    }}
                    className={cn(
                      "h-7 rounded-md text-[10px] font-medium tabular-nums",
                      "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                      col === 0 && "text-neutral-400 dark:text-neutral-500",
                      col !== 0 && "text-neutral-800 dark:text-neutral-100",
                      focus && "ring-1 ring-neutral-900 dark:ring-neutral-100",
                    )}
                    style={
                      empty
                        ? undefined
                        : {
                            backgroundColor: `color-mix(in oklab, var(--chart-solid) ${Math.round((col === 0 ? 18 : 18 + (value / 100) * 72))}%, transparent)`,
                          }
                    }
                  >
                    {empty ? "" : value}
                  </motion.button>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </figure>
  )
}
