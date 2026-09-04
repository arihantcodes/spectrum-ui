'use client';

import * as React from 'react';
import { BeamSearch } from '@/components/spectrumui/beam-search';

const ITEMS = [
  'Accordion',
  'Animated Switch',
  'Avatar Stack',
  'Beam Card',
  'Command Search',
  'Dynamic Island',
  'Kanban Board',
  'Metal Button',
  'Number Ticker',
  'Swipe to Delete',
];

export default function BeamSearchDemo() {
  const [query, setQuery] = React.useState('');
  const matches = ITEMS.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-[520px]">
        <BeamSearch
          placeholder="Search components…"
          onChange={setQuery}
          trailing={
            <kbd className="rounded-md border border-black/10 px-1.5 py-0.5 font-mono text-[11px] text-neutral-500 dark:border-white/12 dark:text-neutral-400">
              ⌘K
            </kbd>
          }
        />
        <ul className="mt-3 grid grid-cols-2 gap-1 text-sm text-neutral-600 dark:text-neutral-300">
          {matches.slice(0, 6).map((item) => (
            <li key={item} className="truncate rounded-lg px-2 py-1">
              {item}
            </li>
          ))}
          {matches.length === 0 && (
            <li className="col-span-2 px-2 py-1 text-neutral-400">No matches</li>
          )}
        </ul>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Focus the field — the beam travels along the bottom edge while you type.
      </p>
    </div>
  );
}
