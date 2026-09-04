/**
 * Spectrum UI — SkeletonReveal
 *
 * A placeholder that pulses while loading, then cross-fades and un-blurs into
 * the real content. The motion is the "Skeleton loader and reveal" recipe from
 * transitions.dev (Jakub Antalík): its namespaced `t-skel` CSS is embedded
 * verbatim (with one change — the content layer stays in flow so the slot
 * sizes itself), and this component drives the `is-pulsing` / `is-revealed` /
 * `is-resetting` classes from a `loading` prop, including the snap-back when
 * loading starts again.
 *
 * Dependencies: @/lib/utils
 *
 * @example
 * <SkeletonReveal loading={isLoading} skeleton={<RowSkeleton />}>
 *   <Row user={user} />
 * </SkeletonReveal>
 */

'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SkeletonRevealProps {
  /** While true the skeleton shows and pulses; flipping to false reveals the content */
  loading: boolean;
  /** Placeholder layer — bring your own bars and avatar */
  skeleton: React.ReactNode;
  /** Real content, rendered in the same slot */
  children: React.ReactNode;
  /** Pulse cycles before settling. Default 1 */
  pulseCount?: number;
  /** One pulse cycle in ms. Default 1000 */
  pulseDuration?: number;
  /** Cross-fade duration in ms. Default 400 */
  revealDuration?: number;
  className?: string;
}

// transitions.dev · skeleton-loader-and-reveal · content layer kept in flow
const CSS = `
.t-skel{position:relative}
.t-skel-skeleton{position:absolute;inset:0;z-index:1;opacity:1;filter:blur(0);transition:opacity var(--reveal-dur) var(--reveal-ease),filter var(--reveal-dur) var(--reveal-ease)}
.t-skel-content{position:relative;z-index:2;opacity:0;filter:blur(var(--reveal-blur));transition:opacity var(--reveal-dur) var(--reveal-ease),filter var(--reveal-dur) var(--reveal-ease)}
.t-skel.is-revealed .t-skel-skeleton{opacity:0;filter:blur(var(--reveal-blur))}
.t-skel.is-revealed .t-skel-content{opacity:1;filter:blur(0)}
.t-skel.is-resetting .t-skel-skeleton,.t-skel.is-resetting .t-skel-content{transition:none !important}
.t-skel-skeleton.is-pulsing > *{animation:t-skel-pulse var(--pulse-dur) ease-in-out var(--pulse-count)}
@keyframes t-skel-pulse{0%,100%{opacity:1}50%{opacity:var(--pulse-min)}}
@media (prefers-reduced-motion: reduce){.t-skel-skeleton,.t-skel-content{transition:none !important}.t-skel-skeleton.is-pulsing > *{animation:none !important}}
`;

export function SkeletonReveal({
  loading,
  skeleton,
  children,
  pulseCount = 1,
  pulseDuration = 1000,
  revealDuration = 400,
  className,
}: SkeletonRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const wasLoading = React.useRef(loading);

  // Replaying: snap back to the skeleton without animating the reverse
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (loading && !wasLoading.current) {
      el.classList.add('is-resetting');
      void el.offsetWidth;
      el.classList.remove('is-resetting');
    }
    wasLoading.current = loading;
  }, [loading]);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className={cn('t-skel', !loading && 'is-revealed', className)}
        aria-busy={loading || undefined}
        style={
          {
            '--pulse-dur': `${pulseDuration}ms`,
            '--pulse-count': pulseCount,
            '--pulse-min': 0.5,
            '--reveal-dur': `${revealDuration}ms`,
            '--reveal-blur': '2px',
            '--reveal-ease': 'ease-in-out',
          } as React.CSSProperties
        }
      >
        <div className={cn('t-skel-skeleton', loading && 'is-pulsing')} aria-hidden>
          {skeleton}
        </div>
        <div className="t-skel-content">{children}</div>
      </div>
    </>
  );
}
