'use client';

import * as React from 'react';
import { Minus, Plus, Shuffle } from 'lucide-react';
import { NumberTicker } from '@/components/motion/number-ticker';

const STEP = 1250;

function RoundButton({
  onClick,
  children,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-black/10 text-neutral-700 transition-colors hover:bg-black/4 active:scale-95 dark:border-white/12 dark:text-neutral-200 dark:hover:bg-white/6"
    >
      {children}
    </button>
  );
}

export default function NumberTickerDemo() {
  const [value, setValue] = React.useState(48250);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="w-full max-w-[360px] rounded-2xl border border-black/8 bg-white p-6 dark:border-white/10 dark:bg-neutral-950">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
          Monthly revenue
        </p>
        <div className="mt-3 text-[40px] font-semibold leading-none tracking-[-0.03em] text-neutral-900 dark:text-neutral-100">
          <NumberTicker value={value} prefix="$" locale blur />
        </div>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Each digit rolls to its new value.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <RoundButton label="Decrease" onClick={() => setValue((v) => Math.max(0, v - STEP))}>
          <Minus className="size-4" />
        </RoundButton>
        <RoundButton
          label="Randomize"
          onClick={() => setValue(Math.round(10000 + Math.random() * 990000))}
        >
          <Shuffle className="size-4" />
        </RoundButton>
        <RoundButton label="Increase" onClick={() => setValue((v) => v + STEP)}>
          <Plus className="size-4" />
        </RoundButton>
      </div>
    </div>
  );
}
