'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

interface Flag {
  id: string;
  name: string;
  key: string;
  envs: string[];
  rollout: number;
  updated: string;
  defaultOn: boolean;
}

const FLAGS: Flag[] = [
  {
    id: 'f1',
    name: 'New onboarding flow',
    key: 'onboarding_v3',
    envs: ['Production', 'Staging'],
    rollout: 100,
    updated: '2 hours ago',
    defaultOn: true,
  },
  {
    id: 'f2',
    name: 'Usage-based billing',
    key: 'metered_billing',
    envs: ['Staging'],
    rollout: 25,
    updated: 'Yesterday',
    defaultOn: true,
  },
  {
    id: 'f3',
    name: 'AI summaries',
    key: 'ai_summaries',
    envs: ['Production', 'Staging'],
    rollout: 50,
    updated: '3 days ago',
    defaultOn: true,
  },
  {
    id: 'f4',
    name: 'Command palette v2',
    key: 'cmdk_v2',
    envs: ['Staging'],
    rollout: 10,
    updated: 'Sep 4',
    defaultOn: false,
  },
  {
    id: 'f5',
    name: 'Legacy export path',
    key: 'legacy_export',
    envs: ['Production'],
    rollout: 100,
    updated: 'Aug 18',
    defaultOn: false,
  },
];

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full transition-colors duration-150 ease-out focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300 ${
        on ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-neutral-200 dark:bg-neutral-700'
      }`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute start-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm dark:bg-neutral-900"
        initial={false}
        animate={{ x: on ? 16 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </button>
  );
}

export function FeatureFlagsTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Compact';
}) {
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(FLAGS.map((flag) => [flag.id, flag.defaultOn])),
  );

  const columns = React.useMemo<DataTableColumn<Flag>[]>(
    () => [
      {
        id: 'name',
        header: 'Flag',
        sortable: true,
        value: (row) => row.name,
        cell: (row) => (
          <span className="block min-w-0">
            <span className="block truncate">{row.name}</span>
            <span className="block font-mono text-xs font-normal text-neutral-500 dark:text-neutral-400">
              {row.key}
            </span>
          </span>
        ),
      },
      {
        id: 'envs',
        header: 'Environments',
        hideBelow: 'sm',
        value: (row) => row.envs.join(' '),
        cell: (row) => (
          <span className="flex gap-1">
            {row.envs.map((env) => (
              <span
                key={env}
                className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/15 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15"
              >
                {env}
              </span>
            ))}
          </span>
        ),
      },
      {
        id: 'rollout',
        header: 'Rollout',
        sortable: true,
        numeric: true,
        value: (row) => row.rollout,
        cell: (row) => (
          <span className="flex items-center justify-end gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
            >
              <span
                className="block h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
                style={{ width: `${row.rollout}%` }}
              />
            </span>
            <span className="w-9 tabular-nums">{row.rollout}%</span>
          </span>
        ),
      },
      { id: 'updated', header: 'Updated', hideBelow: 'md', value: (row) => row.updated },
      {
        id: 'toggle',
        header: 'Enabled',
        align: 'end',
        value: (row) => (enabled[row.id] ? 'on' : 'off'),
        cell: (row) => (
          <Toggle
            on={enabled[row.id]}
            onChange={(next) => setEnabled((state) => ({ ...state, [row.id]: next }))}
            label={`${enabled[row.id] ? 'Disable' : 'Enable'} ${row.name}`}
          />
        ),
      },
    ],
    [enabled],
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={FLAGS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Feature flags with environment coverage, rollout percentage and a live toggle."
        density={variant === 'Compact' ? 'compact' : 'default'}
        title="Feature flags"
      />
    </div>
  );
}
