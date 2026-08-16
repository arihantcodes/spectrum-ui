"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type DeviceView = "desktop" | "tablet" | "mobile"

export const DEVICE_PRESET_WIDTH: Record<DeviceView, number | "100%"> = {
  desktop: "100%",
  tablet: 768,
  mobile: 375,
}

export function useDevicePreview(initial: DeviceView = "desktop") {
  const [view, setView] = useState<DeviceView>(initial)
  const [fit, setFit] = useState(false)
  const [remountKey, setRemountKey] = useState(0)

  function reset() {
    setView(initial)
    setFit(false)
    setRemountKey((n) => n + 1)
  }

  return { view, setView, fit, setFit, remountKey, reset }
}

function ToolbarButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string
  pressed?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center rounded-[7px] text-neutral-900 transition-colors duration-150",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400",
        "dark:text-neutral-100",
        pressed ? "bg-neutral-100 dark:bg-white/[0.08]" : "hover:bg-neutral-50 dark:hover:bg-white/[0.04]",
      )}
    >
      {children}
    </button>
  )
}

function ToolbarSeparator() {
  return <span aria-hidden className="mx-0.5 h-4 w-px shrink-0 bg-neutral-200 dark:bg-white/10" />
}

/**
 * Compact pill bar for switching desktop / tablet / mobile, fitting the
 * current width to the stage, and resetting the preview — the same chrome
 * shadcn uses on /blocks.
 */
export function DeviceViewToolbar({
  view,
  onViewChange,
  fit,
  onFitChange,
  onReset,
  className,
}: {
  view: DeviceView
  onViewChange: (view: DeviceView) => void
  fit: boolean
  onFitChange: (fit: boolean) => void
  onReset: () => void
  className?: string
}) {
  return (
    <div
      role="toolbar"
      aria-label="Preview viewport"
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-200 bg-white p-0.5",
        "shadow-[0_1px_2px_rgba(15,15,15,0.04)]",
        "dark:border-white/10 dark:bg-neutral-950 dark:shadow-none",
        className,
      )}
    >
      <ToolbarButton
        label="Desktop preview"
        pressed={view === "desktop"}
        onClick={() => onViewChange("desktop")}
      >
        <DesktopIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Tablet preview"
        pressed={view === "tablet"}
        onClick={() => onViewChange("tablet")}
      >
        <TabletIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Mobile preview"
        pressed={view === "mobile"}
        onClick={() => onViewChange("mobile")}
      >
        <MobileIcon />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton
        label={fit ? "Show actual size" : "Fit preview to stage"}
        pressed={fit}
        onClick={() => onFitChange(!fit)}
      >
        <FitIcon />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton label="Reset preview" onClick={onReset}>
        <ResetIcon />
      </ToolbarButton>
    </div>
  )
}

export function DevicePreviewFrame({
  children,
  view,
  fit,
  remountKey,
  className,
  sitAtBottom = false,
}: {
  children: ReactNode
  view: DeviceView
  fit: boolean
  remountKey?: number
  className?: string
  /** Pin the block to the bottom of a faux page canvas — used for footers. */
  sitAtBottom?: boolean
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const width = DEVICE_PRESET_WIDTH[view]
  const numericWidth = width === "100%" ? null : width

  useEffect(() => {
    if (!fit || numericWidth == null) {
      setScale(1)
      return
    }
    const el = stageRef.current
    if (!el) return
    const update = () => {
      const available = Math.max(1, el.clientWidth - 24)
      setScale(available / numericWidth)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [fit, numericWidth])

  const scaled = fit && numericWidth != null

  return (
    <div ref={stageRef} className={cn("overflow-x-auto", className)}>
      <div
        key={remountKey}
        className={cn(
          "mx-auto origin-top transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          view !== "desktop" &&
            "overflow-hidden rounded-xl border border-black/[0.08] bg-background shadow-[0_12px_40px_rgba(15,15,15,0.08)] dark:border-white/10 dark:shadow-none",
        )}
        style={{
          width: width === "100%" ? "100%" : width,
          zoom: scaled ? scale : undefined,
        }}
      >
        {sitAtBottom ? (
          <div className="flex min-h-[220px] flex-col justify-end bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.03))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))]">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <rect x="1.75" y="2.5" width="12.5" height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 13.25h4M8 11v2.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function TabletIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <rect x="3.25" y="1.5" width="9.5" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12.35" r="0.7" fill="currentColor" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <rect x="4.5" y="1.75" width="7" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12.2" r="0.55" fill="currentColor" />
    </svg>
  )
}

function FitIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <rect x="4.5" y="5" width="7" height="6" rx="0.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 5.5V2.5H5.5M13.5 5.5V2.5H10.5M2.5 10.5v3H5.5M13.5 10.5v3H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <path
        d="M13.25 8A5.25 5.25 0 1 1 11.4 3.7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M11.1 1.9v2.6h2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
