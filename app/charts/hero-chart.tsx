/**
 * The hero chart. A real, scrubbable market chart rather than a screenshot or
 * a decorative loop — the fastest way to show the set is worth installing is
 * to let someone drag a crosshair across it before they read anything.
 */

'use client';

import * as React from 'react';
import { MarketChart } from '@/app/registry/charts/market-chart';

export function HeroChart() {
  return (
    <div className="group/hero relative">
      {/* Offset frame — a hairline echo behind the card, so the chart reads as
          a specimen on a page rather than a floating screenshot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-2xl border border-border transition-transform duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/hero:translate-x-0.5 group-hover/hero:translate-y-0.5 sm:block"
      />
      <div className="relative rounded-2xl border border-border bg-background p-5 md:p-6">
        <MarketChart height={330} defaultRange="3M" />
        <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] text-[#080808]/50 dark:text-neutral-500">
          Drag across the plot — specimen data, not a live feed.
        </p>
      </div>
    </div>
  );
}
