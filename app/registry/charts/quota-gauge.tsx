/**
 * Spectrum UI — Quota Gauge
 *
 * Remaining budget as an arc with ticks, not a circular progress bar.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  AnimatedNumber,
  CHART_PALETTE_CLASS,
  chartSurfaceClassName,
  formatCompact,
  useChartMotion,
} from "./chart-kit"

export interface QuotaGaugeChartProps {
  used?: number
  limit?: number
  unit?: string
  caption?: string
  className?: string
}

const VIEW = 160
const CX = 80
const CY = 92
const R = 64
const START = (Math.PI * 6) / 5
const SWEEP = (Math.PI * 8) / 5

function polar(angle: number, radius = R) {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  }
}

function arcPath(from: number, to: number, radius = R) {
  const start = polar(from, radius)
  const end = polar(to, radius)
  const large = to - from > Math.PI ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`
}

export function QuotaGaugeChart({
  used = 7240,
  limit = 10000,
  unit = "tokens",
  caption,
  className,
}: QuotaGaugeChartProps) {
  const { reduce, duration } = useChartMotion()
  const ratio = Math.min(1, used / Math.max(limit, 1))
  const nearLimit = ratio >= 0.85
  const remaining = Math.max(0, limit - used)
  const fillTo = START + SWEEP * ratio
  const ticks = [0, 0.25, 0.5, 0.75, 1]
  const resolvedCaption =
    caption ?? (nearLimit ? "3 days of runway" : `${formatCompact(remaining)} remaining`)

  return (
    <figure
      className={cn(
        chartSurfaceClassName,
        CHART_PALETTE_CLASS.ink,
        "flex flex-col items-center p-5 sm:p-6",
        className,
      )}
      aria-label={`Quota ${formatCompact(used)} of ${formatCompact(limit)} ${unit} used`}
    >
      <p className="self-start text-xs font-medium text-neutral-400 dark:text-neutral-500">
        Monthly quota
      </p>
      <svg viewBox={`0 0 ${VIEW} 128`} className="mt-2 w-full max-w-[240px]" aria-hidden="true">
        <path
          d={arcPath(START, START + SWEEP)}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-neutral-100 dark:text-neutral-800"
        />
        <motion.path
          d={arcPath(START, fillTo)}
          fill="none"
          stroke={nearLimit ? "#f97316" : "var(--chart-solid)"}
          strokeWidth="10"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: duration(0.9), ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: nearLimit && !reduce ? "drop-shadow(0 0 6px rgba(249,115,22,0.45))" : undefined,
          }}
        />
        {ticks.map((tick) => {
          const angle = START + SWEEP * tick
          const inner = polar(angle, R - 14)
          const outer = polar(angle, R - 8)
          return (
            <line
              key={tick}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={nearLimit ? "#f97316" : "currentColor"}
              strokeWidth="1.5"
              className={nearLimit ? undefined : "text-neutral-300 dark:text-neutral-600"}
            />
          )
        })}
      </svg>

      <p className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        <AnimatedNumber value={ratio * 100} format={(value) => `${value.toFixed(0)}%`} />
      </p>
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{resolvedCaption}</p>

      <dl className="mt-5 grid w-full grid-cols-2 gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <div>
          <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">Used</dt>
          <dd className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
            {formatCompact(used)} {unit}
          </dd>
        </div>
        <div className="text-right">
          <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">Limit</dt>
          <dd className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
            {formatCompact(limit)} {unit}
          </dd>
        </div>
      </dl>
    </figure>
  )
}
