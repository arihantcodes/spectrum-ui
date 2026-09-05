'use client';

import * as React from 'react';
import { Mic, Music2, Phone, Timer } from 'lucide-react';
import { DynamicIsland, DynamicIslandView } from '@/components/motion/dynamic-island';

const VIEWS = [
  { id: 'timer', label: 'Timer', icon: Timer },
  { id: 'music', label: 'Music', icon: Music2 },
  { id: 'call', label: 'Call', icon: Phone },
] as const;

export default function DynamicIslandDemo() {
  const [view, setView] = React.useState<string | null>('timer');

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="flex min-h-[120px] w-full items-start justify-center">
        <DynamicIsland
          view={view}
          compact={
            <span className="flex items-center gap-2 px-3 py-2 text-white">
              <Mic className="size-3.5 text-emerald-400" />
              <span className="size-1.5 rounded-full bg-orange-400" />
            </span>
          }
        >
          <DynamicIslandView id="timer">
            <div className="flex items-center gap-4 px-4 py-3 text-white">
              <span className="flex size-9 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                <Timer className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-wide text-white/60">Focus</p>
                <p className="font-mono text-xl tabular-nums">24:59</p>
              </div>
              <button
                type="button"
                className="ms-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                Pause
              </button>
            </div>
          </DynamicIslandView>
          <DynamicIslandView id="music">
            <div className="flex items-center gap-4 px-4 py-3 text-white">
              <span className="size-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-orange-400" />
              <div className="leading-tight">
                <p className="text-sm font-medium">Midnight City</p>
                <p className="text-xs text-white/60">M83</p>
              </div>
              <span className="ms-3 flex items-end gap-0.5">
                {[8, 14, 10, 16].map((h, i) => (
                  <span key={i} className="w-1 rounded-full bg-emerald-400" style={{ height: h }} />
                ))}
              </span>
            </div>
          </DynamicIslandView>
          <DynamicIslandView id="call">
            <div className="flex items-center gap-4 px-4 py-3 text-white">
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Phone className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">Marcus Reid</p>
                <p className="text-xs text-white/60">02:14 · mobile</p>
              </div>
              <button
                type="button"
                className="ms-2 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-medium hover:bg-rose-400"
              >
                End
              </button>
            </div>
          </DynamicIslandView>
        </DynamicIsland>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setView(null)}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${view === null ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-black/10 text-neutral-600 hover:bg-black/4 dark:border-white/12 dark:text-neutral-300 dark:hover:bg-white/6'}`}
        >
          Compact
        </button>
        {VIEWS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${view === id ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-black/10 text-neutral-600 hover:bg-black/4 dark:border-white/12 dark:text-neutral-300 dark:hover:bg-white/6'}`}
          >
            <Icon className="size-3.5" /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
