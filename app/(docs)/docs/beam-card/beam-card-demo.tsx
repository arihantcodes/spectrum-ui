'use client';

import * as React from 'react';
import { BeamCard } from '@/components/spectrumui/beam-card';

export default function BeamCardDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="grid w-full max-w-[720px] gap-6 sm:grid-cols-2">
        <BeamCard
          eyebrow="Traveling · colorful"
          title="Realtime collaboration"
          description="Cursors, comments and presence sync in under 40ms, everywhere."
        >
          <div className="flex -space-x-2">
            {['AC', 'MR', 'PN', '+4'].map((initials) => (
              <span
                key={initials}
                className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-[11px] font-medium text-neutral-600 dark:border-neutral-950 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {initials}
              </span>
            ))}
          </div>
        </BeamCard>
        <BeamCard
          size="pulse-outside"
          colorVariant="ocean"
          eyebrow="Breathing · ocean"
          title="Edge inference"
          description="Models run in the region closest to the user, with a warm cache."
        >
          <p className="font-mono text-2xl font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
            18 <span className="text-sm text-neutral-500">ms p95</span>
          </p>
        </BeamCard>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Traveling and breathing beams that hug the radius of each card.
      </p>
    </div>
  );
}
