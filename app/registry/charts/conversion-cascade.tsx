/**
 * Spectrum UI — Conversion Cascade
 *
 * Funnel as stacked rounded stages with drop-off between them.
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
  SPRING_FLUID,
  chartSurfaceClassName,
  formatCompact,
  useChartMotion,
} from "./chart-kit"

export interface CascadeStage {
  key: string
  label: string
  value: number
}

export interface ConversionCascadeChartProps {
  stages?: CascadeStage[]
  className?: string
}

const SAMPLE: CascadeStage[] = [
  { key: "visit", label: "Visit", value: 18420 },
  { key: "signup", label: "Signup", value: 6420 },
  { key: "activate", label: "Activate", value: 3180 },
  { key: "pay", label: "Pay", value: 1240 },
]

export function ConversionCascadeChart({
  stages = SAMPLE,
  className,
}: ConversionCascadeChartProps) {
  const { reduce } = useChartMotion()
  const [selected, setSelected] = React.useState<string | null>(null)
  const max = stages[0]?.value ?? 1

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.orchid,
        "flex flex-col p-5 sm:p-6",
        className,
      )}
      aria-label="Conversion cascade"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Conversion</p>
        <p className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
          {((stages[stages.length - 1]?.value ?? 0) / max * 100).toFixed(1)}% visit → pay
        </p>
      </div>

      <ol className="mt-5 flex flex-col">
        {stages.map((stage, index) => {
          const next = stages[index + 1]
          const kept = next ? (next.value / stage.value) * 100 : null
          const width = `${Math.max(28, (stage.value / max) * 100)}%`
          const dimmed = selected != null && selected !== stage.key

          return (
            <li key={stage.key}>
              <button
                type="button"
                onClick={() => setSelected((current) => (current === stage.key ? null : stage.key))}
                aria-pressed={selected === stage.key}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-opacity",
                  "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                  dimmed && "opacity-25",
                )}
              >
                <motion.span
                  className="flex h-10 items-center justify-between rounded-xl px-3"
                  style={{
                    width,
                    backgroundColor: "var(--chart-solid)",
                    opacity: 0.22 + (1 - index / stages.length) * 0.45,
                  }}
                  initial={reduce ? false : { width: "28%" }}
                  animate={{ width }}
                  transition={reduce ? { duration: 0 } : { ...SPRING_FLUID, delay: index * 0.06 }}
                >
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {stage.label}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {formatCompact(stage.value)}
                  </span>
                </motion.span>
              </button>
              {kept != null ? (
                <p className="py-1 text-center text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
                  {kept.toFixed(0)}% kept
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
