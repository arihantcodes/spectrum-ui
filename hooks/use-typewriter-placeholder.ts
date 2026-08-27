'use client';

import * as React from 'react';

/** What the palette can find, one example at a time. */
const EXAMPLES = [
  'kanban board',
  'pricing blocks',
  'candlestick chart',
  'dark mode',
  'the MCP server',
  'tailwind v4 guide',
];

/** Shown instead of the animation when the visitor asked for less motion. */
const STATIC_TEXT = 'components, blocks, charts…';

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1500;
const GAP_MS = 320;

type Phase = 'typing' | 'holding' | 'deleting';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * Types the example queries out one character at a time, so an empty palette
 * says what it can actually find instead of sitting there blank.
 *
 * Runs only while `enabled` — an empty, open palette — and stops dead the
 * moment someone types, so it never competes with a real query.
 */
export function useTypewriterPlaceholder(enabled: boolean) {
  const reduceMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  const [index, setIndex] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>('typing');

  const animating = enabled && !reduceMotion;
  const word = EXAMPLES[index % EXAMPLES.length];

  React.useEffect(() => {
    if (!animating) return;

    const step = () => {
      if (phase === 'typing') {
        if (length < word.length) setLength(length + 1);
        else setPhase('holding');
        return;
      }

      if (phase === 'holding') {
        setPhase('deleting');
        return;
      }

      if (length > 0) {
        setLength(length - 1);
        return;
      }

      setIndex((previous) => previous + 1);
      setPhase('typing');
    };

    const delay =
      phase === 'holding'
        ? HOLD_MS
        : phase === 'deleting'
          ? length
            ? DELETE_MS
            : GAP_MS
          : TYPE_MS;

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [animating, length, phase, word]);

  // Rewound on the way out, so the next open starts from the first character
  // rather than halfway through whatever it was typing.
  React.useEffect(() => {
    if (!animating) return;
    return () => {
      setLength(0);
      setPhase('typing');
    };
  }, [animating]);

  if (!enabled) return { text: '', caret: false };
  if (reduceMotion) return { text: STATIC_TEXT, caret: false };

  return { text: word.slice(0, length), caret: true };
}
