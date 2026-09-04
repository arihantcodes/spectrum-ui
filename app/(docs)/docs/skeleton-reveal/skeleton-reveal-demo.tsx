'use client';

import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import { SkeletonReveal } from '@/components/spectrumui/skeleton-reveal';

const PULSES = 2;
const PULSE_MS = 900;

export default function SkeletonRevealDemo() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setLoading(false), PULSES * PULSE_MS);
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-[420px] rounded-2xl border border-black/8 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
        <SkeletonReveal
          loading={loading}
          pulseCount={PULSES}
          pulseDuration={PULSE_MS}
          skeleton={
            <div className="flex items-center gap-3">
              <span className="size-11 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <span className="flex-1 space-y-2">
                <span className="block h-3.5 w-2/5 rounded bg-neutral-200 dark:bg-neutral-800" />
                <span className="block h-3 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
              </span>
            </div>
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
              AC
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                Ava Chen
              </span>
              <span className="block truncate text-sm text-neutral-500 dark:text-neutral-400">
                Design review notes — the new empty states look great
              </span>
            </span>
          </div>
        </SkeletonReveal>
      </div>
      <button
        type="button"
        onClick={() => setLoading(true)}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 underline-offset-4 hover:underline disabled:opacity-50 dark:text-neutral-300"
      >
        <RotateCcw className="size-3.5" /> Replay
      </button>
    </div>
  );
}
