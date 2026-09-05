/**
 * Spectrum UI — TextStates
 *
 * A status label that swaps its text in place: the old text exits up with a
 * touch of blur, the new one enters from below. The motion is the
 * "Text states swap" recipe from transitions.dev (Jakub Antalík) — its
 * namespaced `t-text-swap` CSS is embedded verbatim, including the
 * reduced-motion guard — and this component runs the recipe's three-phase
 * class sequence whenever the `text` prop changes. Drop it inside a button
 * for Save → Saving… → Saved.
 *
 * Dependencies: @/lib/utils
 *
 * @example
 * <TextStates text={saving ? "Saving…" : saved ? "Saved" : "Save"} />
 */

'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextStatesProps {
  /** Current text. Each change runs the exit/enter swap */
  text: string;
  /** Swap duration in ms (each phase). Default 150 */
  duration?: number;
  /** Travel distance in px. Default 4 */
  translateY?: number;
  /** Blur amount in px. Default 2 */
  blur?: number;
  className?: string;
}

// transitions.dev · text-states-swap · defaults match the live tuning
const CSS = `
.t-text-swap{display:inline-block;transform:translateY(0);filter:blur(0);opacity:1;transition:transform var(--text-swap-dur) var(--text-swap-ease),filter var(--text-swap-dur) var(--text-swap-ease),opacity var(--text-swap-dur) var(--text-swap-ease);will-change:transform,filter,opacity}
.t-text-swap.is-exit{transform:translateY(calc(var(--text-swap-translate-y) * -1));filter:blur(var(--text-swap-blur));opacity:0}
.t-text-swap.is-enter-start{transform:translateY(var(--text-swap-translate-y));filter:blur(var(--text-swap-blur));opacity:0;transition:none}
@media (prefers-reduced-motion: reduce){.t-text-swap{transition:none !important}}
`;

export function TextStates({
  text,
  duration = 150,
  translateY = 4,
  blur = 2,
  className,
}: TextStatesProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [shown, setShown] = React.useState(text);

  // Phase 1: exit the old text, then commit the new text after one duration
  React.useEffect(() => {
    if (text === shown) return;
    const el = ref.current;
    if (!el) return;
    el.classList.add('is-exit');
    const timer = window.setTimeout(() => setShown(text), duration);
    return () => window.clearTimeout(timer);
  }, [text, shown, duration]);

  // Phases 2–3: jump below without transition, force a reflow, then release
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.classList.contains('is-exit')) return;
    el.classList.remove('is-exit');
    el.classList.add('is-enter-start');
    void el.offsetHeight;
    el.classList.remove('is-enter-start');
  }, [shown]);

  return (
    <>
      <style>{CSS}</style>
      <span
        ref={ref}
        className={cn('t-text-swap', className)}
        style={
          {
            '--text-swap-dur': `${duration}ms`,
            '--text-swap-translate-y': `${translateY}px`,
            '--text-swap-blur': `${blur}px`,
            '--text-swap-ease': 'ease-in-out',
          } as React.CSSProperties
        }
      >
        {shown}
      </span>
    </>
  );
}
