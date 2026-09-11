'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function IconDelete(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3, 2)"
        d="M15.939,6.697 C16.138,6.697 16.319,6.784 16.462,6.931 C16.596,7.088 16.663,7.283 16.643,7.489 C16.643,7.557 16.11,14.297 15.806,17.134 C15.615,18.875 14.493,19.932 12.809,19.961 C11.515,19.99 10.25,20 9.004,20 C7.681,20 6.388,19.99 5.132,19.961 C3.505,19.922 2.382,18.846 2.201,17.134 C1.888,14.287 1.364,7.557 1.355,7.489 C1.345,7.283 1.411,7.088 1.545,6.931 C1.678,6.784 1.868,6.697 2.069,6.697 L15.939,6.697 Z M11.065,0 C11.949,0 12.738,0.617 12.967,1.497 L12.967,1.497 L13.13,2.227 C13.263,2.822 13.778,3.243 14.371,3.243 L14.371,3.243 L17.287,3.243 C17.676,3.243 18,3.566 18,3.977 L18,3.977 L18,4.357 C18,4.758 17.676,5.091 17.287,5.091 L17.287,5.091 L0.714,5.091 C0.324,5.091 0,4.758 0,4.357 L0,4.357 L0,3.977 C0,3.566 0.324,3.243 0.714,3.243 L0.714,3.243 L3.63,3.243 C4.222,3.243 4.737,2.822 4.871,2.228 L4.871,2.228 L5.023,1.546 C5.261,0.617 6.041,0 6.935,0 L6.935,0 Z"
      />
    </svg>
  );
}

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  secret: string;
  scopes: string[];
  lastUsed: string;
  calls: number;
}

const KEYS: ApiKey[] = [
  {
    id: 'k1',
    name: 'Production',
    prefix: 'sk_live_',
    secret: '4tR8wq2Zx9Lm',
    scopes: ['read', 'write'],
    lastUsed: '2 min ago',
    calls: 84210,
  },
  {
    id: 'k2',
    name: 'Staging',
    prefix: 'sk_test_',
    secret: 'Jd83kPq0Nv1c',
    scopes: ['read', 'write'],
    lastUsed: '3 hours ago',
    calls: 6120,
  },
  {
    id: 'k3',
    name: 'CI runner',
    prefix: 'sk_test_',
    secret: 'Vc29mTx7Qw4e',
    scopes: ['read'],
    lastUsed: 'Yesterday',
    calls: 1408,
  },
  {
    id: 'k4',
    name: 'Analytics export',
    prefix: 'sk_live_',
    secret: 'Bn61sYh3Kf8u',
    scopes: ['read'],
    lastUsed: '4 days ago',
    calls: 340,
  },
  {
    id: 'k5',
    name: 'Zapier',
    prefix: 'sk_live_',
    secret: 'Gp05dRw6Mz2a',
    scopes: ['read'],
    lastUsed: 'Aug 22',
    calls: 92,
  },
];

function buildColumns(revealed: boolean): DataTableColumn<ApiKey>[] {
  return [
    { id: 'name', header: 'Name', sortable: true, value: (row) => row.name },
    {
      id: 'secret',
      header: 'Key',
      value: (row) => row.prefix + row.secret,
      cell: (row) => (
        <code className="rounded-[6px] bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700 dark:bg-neutral-100/10 dark:text-neutral-300">
          {row.prefix}
          {revealed ? row.secret : '••••••••••••'}
        </code>
      ),
    },
    {
      id: 'scopes',
      header: 'Scopes',
      hideBelow: 'sm',
      value: (row) => row.scopes.join(' '),
      cell: (row) => (
        <span className="flex gap-1">
          {row.scopes.map((scope) => (
            <span
              key={scope}
              className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/15 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15"
            >
              {scope}
            </span>
          ))}
        </span>
      ),
    },
    { id: 'lastUsed', header: 'Last used', hideBelow: 'md', value: (row) => row.lastUsed },
    {
      id: 'calls',
      header: 'Calls (30d)',
      sortable: true,
      numeric: true,
      value: (row) => row.calls,
      cell: (row) => row.calls.toLocaleString('en-US'),
    },
  ];
}

export function ApiKeysTable({ variant = 'Masked' }: { variant?: 'Masked' | 'Revealed' }) {
  const columns = React.useMemo(() => buildColumns(variant === 'Revealed'), [variant]);
  const [keys, setKeys] = React.useState(KEYS);
  const removed = KEYS.length - keys.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={keys}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `${row.name} key`}
        caption="API keys with masked secrets, scopes and recent usage."
        variant="panel"
        density="compact"
        title="API keys"
        onDelete={(ids) => setKeys((current) => current.filter((row) => !ids.includes(row.id)))}
        toolbar={
          removed > 0 ? (
            <button
              type="button"
              onClick={() => setKeys(KEYS)}
              className="rounded-full px-2 text-sm font-medium text-neutral-500 underline underline-offset-2 transition-colors duration-100 ease-out hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
            >
              Restore {removed}
            </button>
          ) : null
        }
        rowActions={(row, { remove }) => (
          <button
            type="button"
            onClick={remove}
            aria-label={`Revoke ${row.name} key`}
            className="grid size-8 place-items-center rounded-xl text-neutral-400 transition-colors duration-100 ease-out hover:bg-rose-50 hover:text-rose-700 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:hover:bg-rose-400/10 dark:hover:text-rose-300 dark:focus-visible:ring-neutral-300"
          >
            <IconDelete className="size-4" />
          </button>
        )}
      />
    </div>
  );
}
