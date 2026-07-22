'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@//lib/utils';

type AnimateEnterProps = {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  isWhileInView?: boolean;
  duration?: number;
};

/**
 * Entrance reveal, CSS-driven. The previous version animated with
 * framer-motion from `opacity: 0` — if the JS animation loop stalled (busy
 * main thread, slow device), the hero copy and CTAs stayed invisible
 * forever. CSS animations run on the compositor, so the reveal can't be
 * starved; and the server-rendered resting state is fully visible, so with
 * no JS at all the content still shows.
 *
 * Load-time entrances (`isWhileInView={false}`) are a pure CSS animation.
 * Scroll reveals hide an element only *after* confirming it's below the
 * viewport (pre-paint, so nothing flashes), then transition it in when it
 * intersects — an element can never be trapped hidden.
 */
export function AnimateEnter({
  className,
  delay = 0,
  children,
  duration = 0.6,
  isWhileInView = true,
}: AnimateEnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'pending' | 'shown'>('idle');

  useLayoutEffect(() => {
    if (!isWhileInView) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    // Only elements starting below the fold get hidden — they aren't painted
    // yet, so there's no flash; everything already on screen stays visible.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && rect.bottom > 0) return;

    setPhase('pending');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('shown');
          io.disconnect();
        }
      },
      { rootMargin: '-80px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isWhileInView]);

  if (!isWhileInView) {
    return (
      <div
        className={cn('enter-fx', className)}
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-reveal={phase}
      className={cn('reveal-fx', className)}
      style={
        phase === 'shown'
          ? { transitionDelay: `${delay}s`, transitionDuration: `${duration}s` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
