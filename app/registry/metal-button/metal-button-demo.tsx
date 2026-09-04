'use client';

import * as React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { MetalButton } from '@/components/spectrumui/metal-button';

export default function MetalButtonDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <MetalButton preset="chromatic">
          <Sparkles className="size-4" />
          Upgrade to Pro
        </MetalButton>
        <MetalButton preset="silver">Continue</MetalButton>
        <MetalButton preset="gold" size="lg">
          Get started
          <ArrowUpRight className="size-4" />
        </MetalButton>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        One shared WebGL shader paints every ring — chromatic, silver and gold presets.
      </p>
    </div>
  );
}
