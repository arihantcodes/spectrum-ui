'use client';

import * as React from 'react';
import { animate, cubicBezier, motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { AccountAccessCard } from '@/components/spectrumui/account-access-card';
import { AIChatCard } from '@/components/spectrumui/ai-chat-card';
import { CommandSearch } from '@/components/spectrumui/command-search';
import { FAQTabsCard } from '@/components/spectrumui/faq-tabs-card';
import { NavListCard, SUPPORT_NAV_ITEMS } from '@/components/spectrumui/nav-list-card';
import { RecentActivity } from '@/components/spectrumui/recent-activity';
import { TransferFundsCard } from '@/components/spectrumui/transfer-funds-card';
import { usePrefersReducedMotion } from '@/components/spectrumui/use-typewriter';

type StageCard = {
  id: string;
  node: React.ReactNode;
};

type StageColumn = {
  width: number;
  /** Top offset so the columns stagger instead of reading as a rigid grid. */
  offset: number;
  cards: StageCard[];
};

type Slot = { x: number; y: number; w: number; h: number };

// Every card keeps a fixed slot on the canvas — only the "camera" (the canvas
// transform) ever moves, so a focus change reads as a pan, never a reshuffle.
// Column widths mirror the old showcase grid (512 / 330 / 378) so each card
// renders at the width it was designed for. The nav pair is one focus target
// so the camera never lands on a half-empty tile.
const COLUMNS: StageColumn[] = [
  {
    width: 512,
    offset: 104,
    cards: [
      { id: 'command-search', node: <CommandSearch /> },
      { id: 'recent-activity', node: <RecentActivity /> },
    ],
  },
  {
    width: 330,
    offset: 0,
    cards: [
      { id: 'account-access', node: <AccountAccessCard /> },
      { id: 'ai-chat', node: <AIChatCard className="min-h-[560px]" /> },
      {
        id: 'nav-list',
        node: (
          <div className="grid grid-cols-2 items-start gap-3">
            <NavListCard />
            <NavListCard title="Support" items={SUPPORT_NAV_ITEMS} />
          </div>
        ),
      },
    ],
  },
  {
    width: 378,
    offset: 56,
    cards: [
      { id: 'transfer-funds', node: <TransferFundsCard /> },
      { id: 'faq-tabs', node: <FAQTabsCard /> },
    ],
  },
];

const CARDS = COLUMNS.flatMap((column) => column.cards);
const COLUMN_GAP = 40;
const CARD_GAP = 32;
const CANVAS_W =
  COLUMNS.reduce((sum, column) => sum + column.width, 0) + COLUMN_GAP * (COLUMNS.length - 1);

const FOCUS_INTERVAL_MS = 4600;
const START_INDEX = CARDS.findIndex((card) => card.id === 'ai-chat');
// Never hop to a card bordering the current one — a focus change should be a
// real flight, roughly a column pitch or more (canvas units).
const MIN_HOP_DISTANCE = 480;

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

const centerOf = (slot: Slot) => ({ x: slot.x + slot.w / 2, y: slot.y + slot.h / 2 });

const hopDistance = (slots: Slot[], a: number, b: number) => {
  const ca = centerOf(slots[a]);
  const cb = centerOf(slots[b]);
  return Math.hypot(ca.x - cb.x, ca.y - cb.y);
};

const sameSlots = (a: Slot[] | null, b: Slot[]) =>
  a !== null &&
  a.length === b.length &&
  a.every((s, i) => s.x === b[i].x && s.y === b[i].y && s.w === b[i].w && s.h === b[i].h);

// ── Camera model ─────────────────────────────────────────────────────────────
// The camera is (lookAt, zoom): the canvas point under the viewport center and
// the scale it renders at. Every frame derives the css transform from those
// two, so the look-at point travels a mathematically straight line while the
// zoom breathes — animating translate and scale as separate channels instead
// makes the view veer sideways whenever the zoom dips.
//
// The look-at glides on one S-curve (slow, fast middle, slow) while the zoom
// follows a sin² bell — zero velocity at both ends, deepest exactly mid-flight.
const flightPanEase = cubicBezier(0.65, 0, 0.35, 1);
const flightDurationFor = (distance: number) => clamp(1.35, 0.95 + distance / 1050, 2.7);
const flightZoomOutFor = (distance: number) => clamp(0.68, 0.86 - distance * 0.00006, 0.86);

function shuffled(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function HeroStage({ className }: { className?: string }) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [viewport, setViewport] = React.useState({ w: 0, h: 0 });
  // Card rects are measured from layout rather than hardcoded so a card whose
  // content grows (fonts, copy changes) never drifts out from under the camera.
  const [slots, setSlots] = React.useState<Slot[] | null>(null);
  const [active, setActive] = React.useState(START_INDEX);
  const [prevActive, setPrevActive] = React.useState(START_INDEX);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);
  // False until the first focus change: the camera must render already settled
  // on page load — any mount-time tween reads as the camera lurching into place.
  const [engaged, setEngaged] = React.useState(false);
  const slotsRef = React.useRef<Slot[] | null>(null);
  const queueRef = React.useRef<number[]>([]);
  const lastPickRef = React.useRef(START_INDEX);
  const shownRef = React.useRef(START_INDEX);
  const flightRef = React.useRef<ReturnType<typeof animate> | null>(null);
  // Starts false on server and first client render alike, so the SSR styles
  // match at hydration; framer's useReducedMotion reads the media query
  // synchronously on the client and mismatches for reduced-motion users.
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const measure = () => {
      const next: Slot[] = [];
      for (const el of cardRefs.current) {
        if (!el) return;
        // offsetParent is the canvas (columns are static), so these are canvas
        // coordinates regardless of the live camera transform.
        next.push({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
      }
      slotsRef.current = next;
      setSlots((prev) => (sameSlots(prev, next) ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    for (const el of cardRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => () => flightRef.current?.stop(), []);

  React.useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      const slots = slotsRef.current;
      if (!slots) return;
      const current = lastPickRef.current;
      // The card on screen was just shown, so it drops out of this cycle; when
      // the cycle is spent, deal a fresh shuffle so every card gets its turn.
      let queue = queueRef.current.filter((i) => i !== current);
      if (queue.length === 0) queue = shuffled(CARDS.length).filter((i) => i !== current);
      // First queued card that is far enough away; when the cycle's tail only
      // holds nearby cards, take the farthest of them instead of stalling.
      let pickAt = queue.findIndex((i) => hopDistance(slots, i, current) >= MIN_HOP_DISTANCE);
      if (pickAt === -1) {
        pickAt = queue.reduce(
          (best, i, k) =>
            hopDistance(slots, i, current) > hopDistance(slots, queue[best], current) ? k : best,
          0,
        );
      }
      const next = queue[pickAt];
      queue.splice(pickAt, 1);
      queueRef.current = queue;
      setPrevActive(current);
      lastPickRef.current = next;
      setEngaged(true);
      setActive(next);
    }, FOCUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, paused]);

  const measured = viewport.w > 0 && viewport.h > 0 && slots !== null;
  // On wide stages the left quarter sits under the fade into the copy column,
  // so the camera parks the focused card a touch right of true center.
  const lookBiasX = viewport.w >= 560 ? viewport.w * 0.06 : 0;
  // Cards render at their designed size on desktop (scale 1) and shrink only
  // when the stage gets narrow; the visible window is ~780×720 canvas px so
  // one card fills the stage with its neighbours peeking in around it.
  const scale = measured ? clamp(0.55, Math.min(viewport.w / 780, viewport.h / 720), 1) : 0.8;
  const focus = slots?.[active];
  const prevFocus = slots?.[prevActive];
  // Estimated flight length (used only for the highlight timing below — the
  // flight itself measures its true start from the live transform).
  const estimatedDistance =
    focus && prevFocus
      ? Math.hypot(
          (focus.x + focus.w / 2 - prevFocus.x - prevFocus.w / 2) * scale,
          (focus.y + focus.h / 2 - prevFocus.y - prevFocus.h / 2) * scale,
        )
      : 0;
  // The incoming card lights up only as the camera descends onto it.
  const focusDelay = !reducedMotion && engaged ? flightDurationFor(estimatedDistance) * 0.65 : 0;

  React.useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el || !measured || !focus) return;
    const cx = viewport.w / 2 + lookBiasX;
    const cy = viewport.h / 2;
    const setCamera = (lookX: number, lookY: number, s: number) => {
      el.style.transform = `translate(${cx - lookX * s}px, ${cy - lookY * s}px) scale(${s})`;
    };
    const targetX = focus.x + focus.w / 2;
    const targetY = focus.y + focus.h / 2;

    flightRef.current?.stop();
    if (!engaged || reducedMotion || shownRef.current === active) {
      // First paint, reduced motion, or a viewport/slot re-measure: settle instantly.
      setCamera(targetX, targetY, scale);
    } else {
      // Recover the current camera from the live transform (matrix is
      // [s 0 0 s tx ty] because translate is applied before scale).
      const computed = getComputedStyle(el).transform;
      const matrix = computed !== 'none' ? new DOMMatrix(computed) : null;
      const fromScale = matrix ? matrix.a : scale;
      const fromX = matrix ? (cx - matrix.e) / fromScale : targetX;
      const fromY = matrix ? (cy - matrix.f) / fromScale : targetY;

      const distance = Math.hypot((targetX - fromX) * scale, (targetY - fromY) * scale);
      const duration = flightDurationFor(distance);
      const zoomDepth = scale * (1 - flightZoomOutFor(distance));

      flightRef.current = animate(0, 1, {
        duration,
        ease: 'linear',
        onUpdate: (t) => {
          const pan = flightPanEase(t);
          const dip = Math.sin(Math.PI * t) ** 2;
          setCamera(
            fromX + (targetX - fromX) * pan,
            fromY + (targetY - fromY) * pan,
            fromScale + (scale - fromScale) * pan - zoomDepth * dip,
          );
        },
      });
    }
    shownRef.current = active;
  }, [active, focus, measured, scale, viewport.w, viewport.h, lookBiasX, engaged, reducedMotion]);

  return (
    <div
      ref={viewportRef}
      className={cn('relative overflow-hidden', className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      {/* The canvas is server-rendered but held transparent until the first
          camera position is known, so it fades in settled instead of jumping. */}
      <div
        ref={canvasRef}
        className={cn(
          'absolute left-0 top-0 flex items-start will-change-transform transition-opacity duration-500 ease-out',
          measured ? 'opacity-100' : 'opacity-0',
        )}
        style={{ width: CANVAS_W, columnGap: COLUMN_GAP, transformOrigin: '0 0' }}
      >
        <div
          aria-hidden
          className="absolute -inset-[1600px] bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[size:26px_26px] opacity-60"
        />
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex shrink-0 flex-col"
            style={{ width: column.width, paddingTop: column.offset, rowGap: CARD_GAP }}
          >
            {column.cards.map((card) => {
              const index = CARDS.indexOf(card);
              const isFocused = index === active;
              const isLifted = isFocused || (!reducedMotion && hovered === index);
              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative"
                  style={{ zIndex: isFocused ? 10 : hovered === index ? 5 : 1 }}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={() => setHovered((prev) => (prev === index ? null : prev))}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: reducedMotion || isLifted ? 1 : 0.3,
                      scale: !reducedMotion && isFocused ? 1.04 : 1,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.9,
                        ease: 'easeInOut',
                        delay: isFocused ? focusDelay : 0,
                      },
                      scale: {
                        type: 'spring',
                        stiffness: 170,
                        damping: 26,
                        delay: isFocused ? focusDelay : 0,
                      },
                    }}
                  >
                    <span className="mb-2.5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.04em] text-neutral-500 dark:text-neutral-400">
                      <span
                        aria-hidden
                        className="h-[7px] w-[7px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
                      />
                      {card.id}
                    </span>
                    {card.node}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
