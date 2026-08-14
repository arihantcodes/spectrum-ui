/**
 * Spectrum UI — Chart kit
 *
 * Shared primitives for the Charts collection. Chrome stays monochrome;
 * data marks use one named accent family. Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 */

"use client"

import * as React from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Motion ──────────────────────────────────────────────────────────────────

export const SPRING_TACTILE = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
} as const

export const SPRING_FLUID = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const

export const SPRING_ENTRANCE = {
  type: "spring",
  stiffness: 260,
  damping: 20,
} as const

export const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 500,
  damping: 28,
} as const

const INSTANT = { duration: 0 } as const

export function useChartMotion() {
  const reduce = Boolean(useReducedMotion())
  return {
    reduce,
    spring: <T,>(preset: T) => (reduce ? INSTANT : preset),
    duration: (seconds: number) => (reduce ? 0 : seconds),
  }
}

// ─── Palettes ────────────────────────────────────────────────────────────────

export type ChartPaletteName = "signal" | "growth" | "heat" | "orchid" | "ink"

/** Tailwind arbitrary-property classes that set SVG-friendly CSS variables. */
export const CHART_PALETTE_CLASS: Record<ChartPaletteName, string> = {
  signal:
    "[--chart-from:#7dd3fc] [--chart-to:#2563eb] [--chart-solid:#0ea5e9] [--chart-muted:#0ea5e929] dark:[--chart-from:#38bdf8] dark:[--chart-to:#93c5fd] dark:[--chart-solid:#38bdf8] dark:[--chart-muted:#38bdf829]",
  growth:
    "[--chart-from:#bef264] [--chart-to:#059669] [--chart-solid:#10b981] [--chart-muted:#10b98129] dark:[--chart-from:#a3e635] dark:[--chart-to:#6ee7b7] dark:[--chart-solid:#34d399] dark:[--chart-muted:#34d39929]",
  heat:
    "[--chart-from:#fdba74] [--chart-to:#dc2626] [--chart-solid:#f97316] [--chart-muted:#f9731629] dark:[--chart-from:#fb923c] dark:[--chart-to:#fca5a5] dark:[--chart-solid:#fb7185] dark:[--chart-muted:#fb718529]",
  orchid:
    "[--chart-from:#d8b4fe] [--chart-to:#db2777] [--chart-solid:#a855f7] [--chart-muted:#a855f729] dark:[--chart-from:#c084fc] dark:[--chart-to:#f9a8d4] dark:[--chart-solid:#e879f9] dark:[--chart-muted:#e879f929]",
  ink: "[--chart-from:#a3a3a3] [--chart-to:#171717] [--chart-solid:#262626] [--chart-muted:#17171714] dark:[--chart-from:#737373] dark:[--chart-to:#fafafa] dark:[--chart-solid:#e5e5e5] dark:[--chart-muted:#fafafa14]",
}

export const chartSurfaceClassName =
  "rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"

// ─── AnimatedNumber ──────────────────────────────────────────────────────────

export interface AnimatedNumberProps {
  value: number
  /** Formats the interpolated value. Default: rounded locale string */
  format?: (value: number) => string
  className?: string
}

export function AnimatedNumber({
  value,
  format = defaultNumberFormat,
  className,
}: AnimatedNumberProps) {
  const { reduce } = useChartMotion()
  const spring = useSpring(value, SPRING_FLUID)
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    if (reduce) return
    spring.set(value)
  }, [value, reduce, spring])

  useMotionValueEvent(spring, "change", (latest) => {
    if (!reduce) setDisplay(latest)
  })

  return (
    <span className={cn("tabular-nums", className)}>
      {format(reduce ? value : display)}
    </span>
  )
}

function defaultNumberFormat(value: number) {
  return Math.round(value).toLocaleString("en-US")
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number, digits = 1) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(digits)}%`
}

// ─── Tooltip card ────────────────────────────────────────────────────────────

export interface ChartTooltipProps {
  label?: React.ReactNode
  children?: React.ReactNode
  /** Frosted overlay instead of a solid elevated surface */
  frosted?: boolean
  className?: string
}

export function ChartTooltip({
  label,
  children,
  frosted = false,
  className,
}: ChartTooltipProps) {
  return (
    <div
      className={cn(
        "min-w-[9rem] rounded-lg border px-2.5 py-1.5 text-xs shadow-sm",
        frosted
          ? "border-white/20 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-black/35"
          : "border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800",
        className,
      )}
    >
      {label ? (
        <div className="mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </div>
      ) : null}
      <div className="text-neutral-900 dark:text-neutral-100">{children}</div>
    </div>
  )
}

export interface ChartTooltipItem {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
  payload?: unknown
}

/** Recharts-compatible tooltip content. */
export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  className,
  frosted,
}: {
  active?: boolean
  payload?: ChartTooltipItem[]
  label?: React.ReactNode
  formatter?: (value: number | string, name: string) => React.ReactNode
  className?: string
  frosted?: boolean
}) {
  if (!active || !payload?.length) return null

  return (
    <ChartTooltip label={label} frosted={frosted} className={className}>
      <ul className="flex flex-col gap-1">
        {payload.map((item, index) => {
          const name = String(item.name ?? item.dataKey ?? "value")
          const value = item.value ?? ""
          return (
            <li
              key={`${name}-${index}`}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full"
                  style={{ background: item.color ?? "var(--chart-solid)" }}
                />
                {name}
              </span>
              <span className="font-medium tabular-nums">
                {formatter ? formatter(value, name) : value.toLocaleString()}
              </span>
            </li>
          )
        })}
      </ul>
    </ChartTooltip>
  )
}

// ─── Legend ──────────────────────────────────────────────────────────────────

export interface SeriesLegendItem {
  key: string
  label: string
  color?: string
  swatch?: "solid" | "dashed" | "dot"
}

export interface SeriesLegendProps {
  items: readonly SeriesLegendItem[]
  /** Keys currently visible. Omit for all-on, uncontrolled-looking display */
  activeKeys?: readonly string[]
  onToggle?: (key: string) => void
  className?: string
}

export function SeriesLegend({
  items,
  activeKeys,
  onToggle,
  className,
}: SeriesLegendProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item) => {
        const active = !activeKeys || activeKeys.includes(item.key)
        const swatch = item.swatch ?? "solid"
        return (
          <li key={item.key}>
            <button
              type="button"
              onClick={() => onToggle?.(item.key)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium text-neutral-600 transition-opacity dark:text-neutral-400",
                "focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300",
                !active && "opacity-40",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-[2px] w-3.5 rounded-full",
                  swatch === "dashed" && "bg-transparent",
                  swatch === "dot" && "size-1.5 w-1.5",
                )}
                style={
                  swatch === "dashed"
                    ? {
                        backgroundImage: `repeating-linear-gradient(90deg, ${item.color ?? "var(--chart-solid)"} 0 3px, transparent 3px 5px)`,
                      }
                    : { background: item.color ?? "var(--chart-solid)" }
                }
              />
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

// ─── Time range ──────────────────────────────────────────────────────────────

export interface TimeRangeOption {
  value: string
  label: string
}

export interface TimeRangeToggleProps {
  options: readonly TimeRangeOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  /** Unique layoutId so multiple toggles on one page do not collide */
  layoutId?: string
}

export function TimeRangeToggle({
  options,
  value,
  onChange,
  className,
  layoutId = "chart-range",
}: TimeRangeToggleProps) {
  const { spring } = useChartMotion()

  return (
    <div
      role="tablist"
      aria-label="Time range"
      className={cn(
        "relative inline-flex rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-800",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              selected
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-neutral-700"
                transition={spring(SPRING_FLUID)}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── SVG defs ────────────────────────────────────────────────────────────────

export interface ChartGradientProps {
  id: string
  /** CSS color or `var(--chart-from)` */
  from?: string
  to?: string
  orientation?: "vertical" | "horizontal"
  /** 0–1. Default 0.22 at the origin, 0 at the far stop */
  fromOpacity?: number
  toOpacity?: number
}

export function ChartGradient({
  id,
  from = "var(--chart-from)",
  to = "var(--chart-to)",
  orientation = "vertical",
  fromOpacity = 0.28,
  toOpacity = 0,
}: ChartGradientProps) {
  const vertical = orientation === "vertical"
  return (
    <linearGradient
      id={id}
      x1="0"
      y1="0"
      x2={vertical ? "0" : "1"}
      y2={vertical ? "1" : "0"}
    >
      <stop offset="0%" stopColor={from} stopOpacity={fromOpacity} />
      <stop offset="100%" stopColor={to} stopOpacity={toOpacity} />
    </linearGradient>
  )
}

export interface ChartPatternProps {
  id: string
  variant?: "hatch" | "dots"
  color?: string
}

export function ChartPattern({
  id,
  variant = "hatch",
  color = "var(--chart-solid)",
}: ChartPatternProps) {
  if (variant === "dots") {
    return (
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.7" fill={color} opacity="0.45" />
      </pattern>
    )
  }

  return (
    <pattern
      id={id}
      width="6"
      height="6"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="6"
        stroke={color}
        strokeWidth="1.25"
        opacity="0.45"
      />
    </pattern>
  )
}

// ─── Cursor ──────────────────────────────────────────────────────────────────

export interface ChartCursorProps {
  x?: number
  height?: number
  color?: string
}

/** SVG vertical rule for custom plots and Recharts custom cursors. */
export function ChartCursor({
  x,
  height = 0,
  color = "currentColor",
}: ChartCursorProps) {
  if (x == null || height <= 0) return null
  return (
    <line
      x1={x}
      x2={x}
      y1={0}
      y2={height}
      stroke={color}
      strokeWidth={1}
      strokeDasharray="3 4"
      className="text-neutral-400 dark:text-neutral-500"
    />
  )
}

export function RechartsCursor(props: {
  left?: number
  width?: number
  height?: number
  points?: { x: number; y: number }[]
}) {
  const x = props.points?.[0]?.x ?? (props.left ?? 0) + (props.width ?? 0) / 2
  return <ChartCursor x={x} height={props.height} />
}

// ─── Reveal ──────────────────────────────────────────────────────────────────

export interface ChartRevealProps {
  children: React.ReactNode
  className?: string
}

/** Left-to-right clip reveal. Instant when the user prefers reduced motion. */
export function ChartReveal({ children, className }: ChartRevealProps) {
  const { reduce, duration } = useChartMotion()

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: duration(1.05), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function DeltaBadge({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const up = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center text-sm font-medium tabular-nums",
        up
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
        className,
      )}
    >
      {up ? "↑" : "↓"} {Math.abs(value).toFixed(1)}%
    </span>
  )
}
