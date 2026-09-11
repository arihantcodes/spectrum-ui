'use client';

import * as React from 'react';

import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

interface Key {
  id: string;
  label: string;
  scope: string;
  lastUsed: string;
  calls: number;
}

const KEYS: Key[] = [
  { id: 'k1', label: 'Production', scope: 'read · write', lastUsed: '2 min ago', calls: 84210 },
  { id: 'k2', label: 'Staging', scope: 'read · write', lastUsed: '3 hours ago', calls: 6120 },
  { id: 'k3', label: 'CI runner', scope: 'read', lastUsed: 'Yesterday', calls: 1408 },
  { id: 'k4', label: 'Zapier', scope: 'read', lastUsed: '6 days ago', calls: 92 },
];

const columns: DataTableColumn<Key>[] = [
  { id: 'label', header: 'Key', sortable: true, value: (row) => row.label },
  { id: 'scope', header: 'Scope', value: (row) => row.scope, hideBelow: 'sm' },
  { id: 'lastUsed', header: 'Last used', value: (row) => row.lastUsed },
  {
    id: 'calls',
    header: 'Calls',
    sortable: true,
    numeric: true,
    value: (row) => row.calls,
    cell: (row) => row.calls.toLocaleString('en-US'),
  },
];

const STATES = ['data', 'loading', 'empty'] as const;
type State = (typeof STATES)[number];

export default function DataTableStatesDemo() {
  const [state, setState] = React.useState<State>('loading');

  return (
    <div className="w-full p-4 sm:p-6">
      <div
        role="group"
        aria-label="Table state"
        className="mb-5 inline-flex rounded-xl bg-neutral-100 p-0.5 dark:bg-neutral-900"
      >
        {STATES.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={state === option}
            onClick={() => setState(option)}
            className={`rounded-[10px] px-2.5 py-1 text-sm capitalize transition-colors duration-100 ease-out focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300 ${
              state === option
                ? 'bg-white font-medium text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <DataTable
        data={state === 'empty' ? [] : KEYS}
        columns={columns}
        rowId={(row) => row.id}
        loading={state === 'loading'}
        skeletonRows={4}
        variant="panel"
        density="compact"
        caption="API keys for this workspace."
      />
    </div>
  );
}
