'use client';

import * as React from 'react';
import Link from 'next/link';
import { animate, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RevenueAreaChart } from '@/app/registry/charts/revenue-area';
import { LiveTrafficChart } from '@/app/registry/charts/live-traffic';
import { RouteThroughputChart } from '@/app/registry/charts/route-throughput';
import { ShareRingChart } from '@/app/registry/charts/share-ring';
import { ActualForecastChart } from '@/app/registry/charts/actual-forecast';
import { PeriodCompareChart } from '@/app/registry/charts/period-compare';
import { LatencyBandsChart } from '@/app/registry/charts/latency-bands';
import { QuotaGaugeChart } from '@/app/registry/charts/quota-gauge';
import { InfraTrioChart } from '@/app/registry/charts/infra-trio';
import { ActivityLatticeChart } from '@/app/registry/charts/activity-lattice';
import { ConversionCascadeChart } from '@/app/registry/charts/conversion-cascade';
import { CohortRetentionChart } from '@/app/registry/charts/cohort-retention';

const CANVAS_W = 1680;
const CANVAS_H = 1480;
const FOCUS_INTERVAL_MS = 4200;
const MIN_HOP = 720;

const previewClass = 'h-full min-h-0 rounded-[5px] border-0 shadow-none dark:shadow-none';

type StageCard = {
  id: string;
  title: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  node: React.ReactNode;
};

const CARDS: StageCard[] = [
  {
    id: 'revenue-area',
    title: 'revenue-area.tsx',
    href: '/docs/charts/revenue-area',
    x: 40,
    y: 20,
    w: 500,
    h: 320,
    node: <RevenueAreaChart className={previewClass} />,
  },
  {
    id: 'live-traffic',
    title: 'live-traffic.tsx',
    href: '/docs/charts/live-traffic',
    x: 40,
    y: 370,
    w: 500,
    h: 300,
    node: <LiveTrafficChart className={previewClass} />,
  },
  {
    id: 'route-throughput',
    title: 'route-throughput.tsx',
    href: '/docs/charts/route-throughput',
    x: 40,
    y: 700,
    w: 500,
    h: 340,
    node: <RouteThroughputChart className={previewClass} />,
  },
  {
    id: 'share-ring',
    title: 'share-ring.tsx',
    href: '/docs/charts/share-ring',
    x: 40,
    y: 1070,
    w: 500,
    h: 320,
    node: <ShareRingChart className={previewClass} />,
  },
  {
    id: 'period-compare',
    title: 'period-compare.tsx',
    href: '/docs/charts/period-compare',
    x: 580,
    y: 60,
    w: 500,
    h: 310,
    node: <PeriodCompareChart className={previewClass} />,
  },
  {
    id: 'actual-forecast',
    title: 'actual-forecast.tsx',
    href: '/docs/charts/actual-forecast',
    x: 580,
    y: 400,
    w: 500,
    h: 310,
    node: <ActualForecastChart className={previewClass} />,
  },
  {
    id: 'latency-bands',
    title: 'latency-bands.tsx',
    href: '/docs/charts/latency-bands',
    x: 580,
    y: 740,
    w: 500,
    h: 310,
    node: <LatencyBandsChart className={previewClass} />,
  },
  {
    id: 'quota-gauge',
    title: 'quota-gauge.tsx',
    href: '/docs/charts/quota-gauge',
    x: 580,
    y: 1080,
    w: 500,
    h: 320,
    node: <QuotaGaugeChart className={previewClass} />,
  },
  {
    id: 'infra-trio',
    title: 'infra-trio.tsx',
    href: '/docs/charts/infra-trio',
    x: 1120,
    y: 20,
    w: 500,
    h: 300,
    node: <InfraTrioChart className={previewClass} />,
  },
  {
    id: 'activity-lattice',
    title: 'activity-lattice.tsx',
    href: '/docs/charts/activity-lattice',
    x: 1120,
    y: 350,
    w: 500,
    h: 310,
    node: <ActivityLatticeChart className={previewClass} />,
  },
  {
    id: 'conversion-cascade',
    title: 'conversion-cascade.tsx',
    href: '/docs/charts/conversion-cascade',
    x: 1120,
    y: 690,
    w: 500,
    h: 330,
    node: <ConversionCascadeChart className={previewClass} />,
  },
  {
    id: 'cohort-retention',
    title: 'cohort-retention.tsx',
    href: '/docs/charts/cohort-retention',
    x: 1120,
    y: 1050,
    w: 500,
    h: 330,
    node: <CohortRetentionChart className={previewClass} />,
  },
];

const START_INDEX = 0;

function clamp(min: number, value: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hopDistance(a: number, b: number) {
  const ca = CARDS[a];
  const cb = CARDS[b];
  return Math.hypot(ca.x + ca.w / 2 - (cb.x + cb.w / 2), ca.y + ca.h / 2 - (cb.y + cb.h / 2));
}

function shuffle(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function flightDuration(distance: number) {
  return clamp(1.2, 0.9 + distance / 1100, 2.4);
}

function ComponentGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.1" fill="currentColor" />
    </svg>
  );
}

function CardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[8px] bg-neutral-100 p-1 dark:bg-neutral-900">
      <div className="flex h-7 shrink-0 items-center gap-1.5 px-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
        <ComponentGlyph />
        <span className="truncate">{title}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[5px] border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        {children}
      </div>
    </div>
  );
}

export function ChartStage({ className }: { className?: string }) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = React.useState({ w: 0, h: 0 });
  const [active, setActive] = React.useState(START_INDEX);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);
  const [engaged, setEngaged] = React.useState(false);
  const queueRef = React.useRef<number[]>([]);
  const lastPickRef = React.useRef(START_INDEX);
  const shownRef = React.useRef(START_INDEX);
  const flightRef = React.useRef<ReturnType<typeof animate> | null>(null);
  const reducedMotion = Boolean(useReducedMotion());

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => {
      if (queueRef.current.length === 0) {
        queueRef.current = shuffle(CARDS.length);
      }
      const current = lastPickRef.current;
      let pickAt = queueRef.current.findIndex((i) => hopDistance(i, current) >= MIN_HOP);
      if (pickAt === -1) {
        pickAt = queueRef.current.reduce(
          (best, i, k, queue) =>
            hopDistance(i, current) > hopDistance(queue[best], current) ? k : best,
          0,
        );
      }
      const next = queueRef.current.splice(pickAt, 1)[0];
      lastPickRef.current = next;
      setEngaged(true);
      setActive(next);
    }, FOCUS_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused]);

  const measured = viewport.w > 0 && viewport.h > 0;
  const scale = measured ? clamp(0.48, Math.min(viewport.w / 980, viewport.h / 860), 0.92) : 0.7;
  const focus = CARDS[active];
  const focusDelay = !reducedMotion && engaged ? 0.7 : 0;

  React.useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el || !measured) return;
    const setCamera = (lookX: number, lookY: number, s: number) => {
      el.style.transform = `translate(${viewport.w / 2 - lookX * s}px, ${viewport.h / 2 - lookY * s}px) scale(${s})`;
    };
    const targetX = focus.x + focus.w / 2;
    const targetY = focus.y + focus.h / 2;

    flightRef.current?.stop();
    if (!engaged || reducedMotion || shownRef.current === active) {
      setCamera(targetX, targetY, scale);
    } else {
      const computed = getComputedStyle(el).transform;
      const matrix = computed !== 'none' ? new DOMMatrix(computed) : null;
      const fromScale = matrix ? matrix.a : scale;
      const fromX = matrix ? (viewport.w / 2 - matrix.e) / fromScale : targetX;
      const fromY = matrix ? (viewport.h / 2 - matrix.f) / fromScale : targetY;
      const distance = Math.hypot((targetX - fromX) * scale, (targetY - fromY) * scale);
      const duration = flightDuration(distance);
      const zoomDepth = scale * 0.18;

      flightRef.current = animate(0, 1, {
        duration,
        ease: 'linear',
        onUpdate: (t) => {
          const pan = smoothstep(t);
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
  }, [active, focus, measured, scale, viewport.w, viewport.h, engaged, reducedMotion]);

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
      {measured ? (
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{ width: CANVAS_W, height: CANVAS_H, transformOrigin: '0 0' }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-[1200px] bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"
          />
          {CARDS.map((card, index) => {
            const isFocused = index === active;
            const isLifted = isFocused || (!reducedMotion && hovered === index);
            return (
              <motion.div
                key={card.id}
                className={cn(
                  'absolute rounded-[8px] transition-shadow duration-500',
                  isFocused ? 'shadow-2xl' : 'shadow-md',
                )}
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.w,
                  height: card.h,
                  zIndex: isFocused ? 10 : hovered === index ? 5 : 1,
                }}
                initial={false}
                animate={{
                  opacity: reducedMotion || isLifted ? 1 : 0.32,
                  scale: !reducedMotion && isFocused ? 1.05 : 1,
                }}
                transition={{
                  opacity: {
                    duration: 0.85,
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
                onPointerEnter={() => setHovered(index)}
                onPointerLeave={() => setHovered((prev) => (prev === index ? null : prev))}
              >
                <Link href={card.href} className="block h-full" aria-label={card.title}>
                  <CardShell title={card.title}>
                    <div className="pointer-events-none h-full">{card.node}</div>
                  </CardShell>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
