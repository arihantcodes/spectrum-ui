/**
 * Spectrum UI — SwipeToDelete
 *
 * A swipeable list-item wrapper that reveals a delete action, iOS style. Drag
 * the row left to uncover a rose action zone; the trash icon pops the moment
 * the drag passes the commit threshold, and releasing past it (or flinging)
 * snaps the row fully open, collapses the item and fires onDelete. Pointer
 * users get a preview instead of an overlaid button: hovering or focusing the
 * row nudges it left so part of the zone shows, and the zone itself is the
 * delete button. Delete/Backspace on the focused row also commits, and
 * reduced motion keeps the drag but collapses instantly.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <SwipeToDelete label="email from Ava" onDelete={() => removeEmail(id)}>
 *   <EmailRow />
 * </SwipeToDelete>
 */

'use client';

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SwipeToDeleteProps {
  /** Fires once the collapse animation finishes; remove the item here */
  onDelete: () => void;
  /** Row content rendered on the draggable surface */
  children: ReactNode;
  /** Accessible name of the row; also used for the delete button label. Default "item" */
  label?: string;
  /** Width in pixels of the revealed delete zone. Default 96 */
  actionWidth?: number;
  /** Fraction of actionWidth the drag must pass to commit. Default 0.6 */
  threshold?: number;
  /** Nudge the row on hover/focus to preview the delete zone (pointer devices). Default true */
  revealOnHover?: boolean;
  /** How far in pixels the row nudges left for the hover preview. Default 56 */
  hoverPeek?: number;
  /** Disables dragging, the delete zone and keyboard deletion */
  disabled?: boolean;
  /** Additional classes merged with the default wrapper styles */
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Leftward release velocity (px/s) that commits regardless of distance */
const FLING_VELOCITY = -500;
const COLLAPSE_DURATION = 0.25;
/** Reveal/collapse ease shared with the docs motion language */
const COLLAPSE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** How long the live-region announcement stays mounted before onDelete */
const ANNOUNCE_HOLD_MS = 300;
/** Firm resistance past fully open; no rightward overdrag at all */
const DRAG_ELASTIC = { left: 0.15, right: 0 } as const;

const SNAP_OPEN_SPRING = { type: 'spring', stiffness: 550, damping: 42 } as const;
const SNAP_BACK_SPRING = { type: 'spring', stiffness: 500, damping: 38 } as const;
const PEEK_SPRING = { type: 'spring', stiffness: 520, damping: 40 } as const;
const ICON_POP_SPRING = { type: 'spring', stiffness: 520, damping: 18 } as const;
const ICON_REST_SPRING = { type: 'spring', stiffness: 400, damping: 30 } as const;

// ─── Hooks ───────────────────────────────────────────────────────────────────

const HOVER_QUERY = '(hover: hover) and (pointer: fine)';
const subscribeHover = (onChange: () => void) => {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
const getHover = () => window.matchMedia(HOVER_QUERY).matches;
const getHoverOnServer = () => false;

/** True on devices with a real hover (mouse/trackpad); false for touch and on the server */
function useCanHover() {
  return useSyncExternalStore(subscribeHover, getHover, getHoverOnServer);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SwipeToDelete({
  onDelete,
  children,
  label = 'item',
  actionWidth = 96,
  threshold = 0.6,
  revealOnHover = true,
  hoverPeek = 56,
  disabled = false,
  className,
}: SwipeToDeleteProps) {
  const shouldReduceMotion = useReducedMotion();
  const canHover = useCanHover();
  const outerRef = useRef<HTMLDivElement>(null);
  const committedRef = useRef(false);
  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const x = useMotionValue(0);
  const rowControls = useAnimationControls();
  const outerControls = useAnimationControls();
  const [isDeleting, setIsDeleting] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const [peeked, setPeeked] = useState(false);
  const holdTimeoutRef = useRef<number | null>(null);

  // The icon is always centred in whatever part of the zone is uncovered, so
  // it rides along with the reveal instead of hiding behind the row edge
  const exposed = useTransform(x, (latest) => Math.min(actionWidth, Math.max(0, -latest)));

  // Pop the trash icon exactly when the drag crosses the commit point (and
  // un-pop when dragged back); the peek preview gets an in-between size
  useMotionValueEvent(x, 'change', (latest) => {
    setPastThreshold(latest <= -actionWidth * threshold);
    setPeeked(latest <= -Math.min(hoverPeek, actionWidth) + 1);
  });

  // Clear the announcement hold if the row unmounts mid-delete
  useEffect(
    () => () => {
      if (holdTimeoutRef.current !== null) {
        window.clearTimeout(holdTimeoutRef.current);
      }
    },
    [],
  );

  // Rest position for pointer users: peeked while hovered/focused, closed otherwise
  const settle = useCallback(() => {
    if (committedRef.current || draggingRef.current) return;
    const wantPeek =
      revealOnHover && canHover && !disabled && (hoveredRef.current || focusedRef.current);
    void rowControls.start({
      x: wantPeek ? -Math.min(hoverPeek, actionWidth) : 0,
      transition: shouldReduceMotion ? { duration: 0 } : wantPeek ? PEEK_SPRING : SNAP_BACK_SPRING,
    });
  }, [revealOnHover, canHover, disabled, hoverPeek, actionWidth, rowControls, shouldReduceMotion]);

  const commit = useCallback(async () => {
    if (disabled || committedRef.current) return;
    committedRef.current = true;
    setIsDeleting(true);

    const node = outerRef.current;
    const height = node?.offsetHeight ?? 0;
    const marginBottom = node ? getComputedStyle(node).marginBottom : 0;

    // Snap fully open so the action zone reads before the row leaves
    if (!shouldReduceMotion) {
      await rowControls.start({ x: -actionWidth, transition: SNAP_OPEN_SPRING });
    }

    outerControls.set({ height, marginBottom });
    await outerControls.start({
      height: 0,
      opacity: 0,
      marginBottom: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: COLLAPSE_DURATION, ease: COLLAPSE_EASE },
    });
    // The row is already invisible here, so this hold is imperceptible — it
    // keeps the live-region announcement mounted long enough for screen
    // readers to read it before onDelete unmounts the component
    await new Promise<void>((resolve) => {
      holdTimeoutRef.current = window.setTimeout(resolve, ANNOUNCE_HOLD_MS);
    });
    onDelete();
  }, [disabled, shouldReduceMotion, actionWidth, rowControls, outerControls, onDelete]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      draggingRef.current = false;
      if (committedRef.current) return;
      const commitPoint = -actionWidth * threshold;
      if (x.get() <= commitPoint || info.velocity.x < FLING_VELOCITY) {
        void commit();
      } else {
        // Back to the peek if the pointer is still over the row, else closed
        settle();
      }
    },
    [actionWidth, threshold, x, commit, settle],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Only when the row wrapper itself is focused, never inside its content
      if (disabled || event.target !== event.currentTarget) return;
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        void commit();
      }
    },
    [disabled, commit],
  );

  return (
    <motion.div
      ref={outerRef}
      role="group"
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => {
        hoveredRef.current = true;
        settle();
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
        settle();
      }}
      onFocus={() => {
        focusedRef.current = true;
        settle();
      }}
      onBlur={(event) => {
        // Focus moving within the row (e.g. onto the zone) keeps the preview
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        focusedRef.current = false;
        settle();
      }}
      initial={false}
      animate={outerControls}
      className={cn(
        'group/swipe relative w-full rounded-xl',
        'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
        isDeleting && 'overflow-hidden',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        {/* Delete zone: revealed by the drag or the hover preview, and clickable
            wherever it is uncovered. Kept out of the tab order — the focused
            row handles Delete/Backspace — so keyboard users get one stop. */}
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Delete ${label}`}
          disabled={disabled || isDeleting}
          onClick={() => void commit()}
          className={cn(
            'absolute inset-y-0 right-0 bg-rose-500 text-white outline-hidden transition-colors duration-150',
            'hover:bg-rose-600 active:bg-rose-700 disabled:pointer-events-none',
          )}
          style={{ width: actionWidth }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 right-0 flex items-center justify-center"
            style={{ width: exposed }}
          >
            <motion.span
              className="flex"
              initial={false}
              animate={{
                scale: shouldReduceMotion || pastThreshold ? 1 : peeked ? 0.9 : 0.7,
              }}
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
          </motion.span>
        </button>

        {/* Draggable row */}
        <motion.div
          drag={disabled || isDeleting ? false : 'x'}
          dragConstraints={{ left: -actionWidth, right: 0 }}
          dragElastic={DRAG_ELASTIC}
          dragMomentum={false}
          onDragStart={() => {
            draggingRef.current = true;
          }}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={rowControls}
          style={{ x }}
          className={cn(
            // touch-pan-y leaves vertical scroll to the page; drag="x" only
            // captures the pointer once a horizontal gesture wins
            'relative w-full touch-pan-y select-none bg-white dark:bg-neutral-900',
            !disabled && !isDeleting && 'cursor-grab active:cursor-grabbing',
          )}
        >
          {children}
        </motion.div>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {isDeleting ? `${label} deleted` : ''}
      </span>
    </motion.div>
  );
}
