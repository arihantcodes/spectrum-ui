'use client';

import * as React from 'react';

import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Stage = 'won' | 'negotiation' | 'proposal' | 'lost';

interface Deal {
  id: string;
  account: string;
  owner: string;
  avatar: string;
  stage: Stage;
  region: string;
  closes: string;
  probability: number;
  value: number;
}

const OWNERS = [
  { name: 'Freya Lindgren', avatar: '/avatars/people/01.jpg' },
  { name: 'Mateo Alvarez', avatar: '/avatars/people/03.jpg' },
  { name: 'Aiko Watanabe', avatar: '/avatars/people/06.jpg' },
  { name: 'Zara Osei', avatar: '/avatars/people/12.jpg' },
  { name: 'Leila Haddad', avatar: '/avatars/people/05.jpg' },
];

const ACCOUNTS = [
  'Northsail Group',
  'Quillbase',
  'Fold Studio',
  'Heliolab',
  'Brightpath',
  'Medela Brasil',
  'Kirin Works',
  'Zoning',
  'Carbonline',
  'Loomstack',
  'Arcfield',
  'Paperkite',
  'Tidepool',
  'Nordform',
  'Copperline',
  'Havenpoint',
];
const STAGES: Stage[] = ['won', 'negotiation', 'proposal', 'lost'];
const REGIONS = ['EMEA', 'AMER', 'APAC'];

/** Deterministic, so the server and the client agree on every row. */
const DEALS: Deal[] = ACCOUNTS.map((account, index) => {
  const owner = OWNERS[index % OWNERS.length];
  return {
    id: `deal_${4100 - index}`,
    account,
    owner: owner.name,
    avatar: owner.avatar,
    stage: STAGES[index % STAGES.length],
    region: REGIONS[index % REGIONS.length],
    closes: `Q${(index % 4) + 1} 2026`,
    probability: 10 + ((index * 17) % 90),
    value: 12_000 + ((index * 8_400) % 180_000),
  };
});

const STAGE_STYLE: Record<Stage, string> = {
  won: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25',
  negotiation:
    'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  proposal:
    'bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15',
  lost: 'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-300/25',
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Deal>[] = [
  {
    id: 'account',
    header: 'Account',
    sortable: true,
    value: (row) => row.account,
  },
  {
    id: 'stage',
    header: 'Stage',
    sortable: true,
    value: (row) => row.stage,
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STAGE_STYLE[row.stage]}`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.stage}
      </span>
    ),
  },
  {
    id: 'owner',
    header: 'Owner',
    sortable: true,
    value: (row) => row.owner,
    cell: (row) => (
      <span className="flex items-center gap-2 font-normal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.avatar}
          alt=""
          loading="lazy"
          width={20}
          height={20}
          className="size-5 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <span className="truncate">{row.owner}</span>
      </span>
    ),
  },
  { id: 'region', header: 'Region', sortable: true, hideBelow: 'md', value: (row) => row.region },
  { id: 'closes', header: 'Closes', sortable: true, hideBelow: 'lg', value: (row) => row.closes },
  {
    id: 'probability',
    header: 'Win %',
    sortable: true,
    numeric: true,
    hideBelow: 'sm',
    value: (row) => row.probability,
    cell: (row) => `${row.probability}%`,
  },
  {
    id: 'value',
    header: 'Value',
    sortable: true,
    numeric: true,
    value: (row) => row.value,
    formatTotal: (sum) => money.format(sum),
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {money.format(row.value)}
      </span>
    ),
  },
];

const KEYS: [string, string][] = [
  ['↑ ↓', 'Move the cursor'],
  ['⇧ ↑ ↓', 'Extend the selection'],
  ['Space', 'Select the row'],
  ['⌘ A', 'Select the page'],
  ['⌘ C', 'Copy as TSV'],
  ['Esc', 'Clear'],
];

export default function DataTablePowerDemo() {
  return (
    <div className="w-full py-4">
      <DataTable
        data={DEALS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `the ${row.account} deal`}
        caption="Open pipeline with stage, owner, win probability and value."
        variant="bordered"
        density="compact"
        quickFilter={{ columnId: 'stage', label: 'Filter by stage' }}
        selectable
        totals={['value']}
        resizableColumns
        pinFirstColumn
        stickyHeader
        maxHeight={332}
        defaultSort={{ columnId: 'value', direction: 'desc' }}
        bulkActions={({ ids, clear }) => (
          <button
            type="button"
            onClick={clear}
            className="rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors duration-100 ease-out hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:hover:bg-black/10"
          >
            Assign {ids.length === 1 ? 'deal' : `${ids.length} deals`}
          </button>
        )}
      />

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {KEYS.map(([keys, what]) => (
          <li
            key={keys}
            className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400"
          >
            <kbd className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-sans text-[11px] font-medium text-neutral-700 dark:bg-neutral-100/10 dark:text-neutral-300">
              {keys}
            </kbd>
            {what}
          </li>
        ))}
      </ul>
    </div>
  );
}
