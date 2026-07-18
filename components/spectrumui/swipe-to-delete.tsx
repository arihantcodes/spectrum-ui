/**
 * Spectrum UI — SwipeToDelete
 *
 * A swipeable list-item wrapper that reveals a delete action, iOS style. Drag
 * the row left to uncover a rose action zone; the trash icon pops the moment
 * the drag passes the commit threshold, and releasing past it (or flinging)
 * snaps the row fully open, collapses the item and fires onDelete. Non-touch
 * users get a hover/focus delete button plus Delete/Backspace on the focused
 * row, and reduced motion keeps the drag but collapses instantly.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <SwipeToDelete label="email from Ava" onDelete={() => removeEmail(id)}>
 *   <EmailRow />
 * </SwipeToDelete>
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion"
import type { PanInfo } from "framer-motion"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SwipeToDeleteProps {
  /** Fires once the collapse animation finishes; remove the item here */
  onDelete: () => void
  /** Row content rendered on the draggable surface */
  children: ReactNode
  /** Accessible name of the row; also used for the delete button label. Default "item" */
  label?: string
  /** Width in pixels of the revealed delete zone. Default 96 */
  actionWidth?: number
  /** Fraction of actionWidth the drag must pass to commit. Default 0.6 */
  threshold?: number
  /** Show a fallback delete button on row hover/focus. Default true */
  showButtonOnHover?: boolean
  /** Disables dragging, the delete button and keyboard deletion */
  disabled?: boolean
  /** Additional classes merged with the default wrapper styles */
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Leftward release velocity (px/s) that commits regardless of distance */
const FLING_VELOCITY = -500
const COLLAPSE_DURATION = 0.25
/** Reveal/collapse ease shared with the docs motion language */
const COLLAPSE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
/** Row offset (px) under which the row counts as fully back at rest */
const REST_EPSILON = 0.5
/** How long the live-region announcement stays mounted before onDelete */
const ANNOUNCE_HOLD_MS = 300
/** Firm resistance past fully open; no rightward overdrag at all */
const DRAG_ELASTIC = { left: 0.15, right: 0 } as const

const SNAP_OPEN_SPRING = { type: "spring", stiffness: 550, damping: 42 } as const
const SNAP_BACK_SPRING = { type: "spring", stiffness: 500, damping: 38 } as const
const ICON_POP_SPRING = { type: "spring", stiffness: 520, damping: 18 } as const
const ICON_REST_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const

// ─── Component ───────────────────────────────────────────────────────────────

export function SwipeToDelete({
  onDelete,
  children,
  label = "item",
  actionWidth = 96,
  threshold = 0.6,
  showButtonOnHover = true,
  disabled = false,
  className,
}: SwipeToDeleteProps) {
  const shouldReduceMotion = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)
  const committedRef = useRef(false)
  const x = useMotionValue(0)
  const rowControls = useAnimationControls()
  const outerControls = useAnimationControls()
  const [isDeleting, setIsDeleting] = useState(false)
  const [pastThreshold, setPastThreshold] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResting, setIsResting] = useState(true)
  const holdTimeoutRef = useRef<number | null>(null)

  // Pop the trash icon exactly when the drag crosses the commit point (and
  // un-pop when dragged back), and track whether the row is offset so the
  // hover delete button stays hidden during a drag and while snapping back
  useMotionValueEvent(x, "change", (latest) => {
    setPastThreshold(latest <= -actionWidth * threshold)
    setIsResting(latest > -REST_EPSILON)
  })

  // Clear the announcement hold if the row unmounts mid-delete
  useEffect(
    () => () => {
      if (holdTimeoutRef.current !== null) {
        window.clearTimeout(holdTimeoutRef.current)
      }
    },
    [],
  )

  const commit = useCallback(async () => {
    if (disabled || committedRef.current) return
    committedRef.current = true
    setIsDeleting(true)

    const node = outerRef.current
    const height = node?.offsetHeight ?? 0
    const marginBottom = node ? getComputedStyle(node).marginBottom : 0

    // Snap fully open so the action zone reads before the row leaves
    if (!shouldReduceMotion) {
      await rowControls.start({ x: -actionWidth, transition: SNAP_OPEN_SPRING })
    }

    outerControls.set({ height, marginBottom })
    await outerControls.start({
      height: 0,
      opacity: 0,
      marginBottom: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: COLLAPSE_DURATION, ease: COLLAPSE_EASE },
    })
    // The row is already invisible here, so this hold is imperceptible — it
    // keeps the live-region announcement mounted long enough for screen
    // readers to read it before onDelete unmounts the component
    await new Promise<void>((resolve) => {
      holdTimeoutRef.current = window.setTimeout(resolve, ANNOUNCE_HOLD_MS)
    })
    onDelete()
  }, [
    disabled,
    shouldReduceMotion,
    actionWidth,
    rowControls,
    outerControls,
    onDelete,
  ])

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false)
      if (committedRef.current) return
      const commitPoint = -actionWidth * threshold
      if (x.get() <= commitPoint || info.velocity.x < FLING_VELOCITY) {
        void commit()
      } else {
        void rowControls.start({ x: 0, transition: SNAP_BACK_SPRING })
      }
    },
    [actionWidth, threshold, x, commit, rowControls],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Only when the row wrapper itself is focused, never inside its content
      if (disabled || event.target !== event.currentTarget) return
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault()
        void commit()
      }
    },
    [disabled, commit],
  )

  return (
    <motion.div
      ref={outerRef}
      role="group"
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      initial={false}
      animate={outerControls}
      className={cn(
        "group/swipe relative w-full rounded-xl",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
        isDeleting && "overflow-hidden",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        {/* Revealed action zone */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 flex items-center justify-center bg-rose-500 text-white"
          style={{ width: actionWidth }}
        >
          <motion.span
            className="flex"
            initial={false}
            animate={{ scale: shouldReduceMotion || pastThreshold ? 1 : 0.7 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : pastThreshold
                  ? ICON_POP_SPRING
                  : ICON_REST_SPRING
            }
          >
            <Trash2 size={18} aria-hidden="true" />
          </motion.span>
        </div>

        {/* Draggable row */}
        <motion.div
          drag={disabled || isDeleting ? false : "x"}
          dragConstraints={{ left: -actionWidth, right: 0 }}
          dragElastic={DRAG_ELASTIC}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={rowControls}
          style={{ x }}
          className={cn(
            // touch-pan-y leaves vertical scroll to the page; drag="x" only
            // captures the pointer once a horizontal gesture wins
            "relative w-full touch-pan-y select-none bg-white dark:bg-neutral-900",
            !disabled && !isDeleting && "cursor-grab active:cursor-grabbing",
          )}
        >
          {children}

          {/* Fallback affordance for non-touch and keyboard users */}
          {showButtonOnHover && !disabled && (
            <button
              type="button"
              aria-label={`Delete ${label}`}
              onClick={() => void commit()}
              onPointerDown={(event) => event.stopPropagation()}
              className={cn(
                "absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 touch-manipulation select-none items-center justify-center rounded-md",
                "text-neutral-500 hover:bg-rose-50 hover:text-rose-600 active:bg-rose-100 dark:text-neutral-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 dark:active:bg-rose-500/20",
                "opacity-0 transition-opacity duration-150",
                // Never surface the button mid-drag or while the row is offset
                isDragging || !isResting || isDeleting
                  ? "pointer-events-none"
                  : "group-hover/swipe:opacity-100 group-focus-within/swipe:opacity-100 focus-visible:opacity-100",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
              )}
            >
              <Trash2 size={14} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {isDeleting ? `${label} deleted` : ""}
      </span>
    </motion.div>
  )
}
