'use client';

import * as React from 'react';

import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Level = 'info' | 'warn' | 'error';

interface Event {
  id: string;
  time: string;
  level: Level;
  actor: string;
  action: string;
  target: string;
  ms: number;
}

const ACTORS = [
  'marta@northsail.co',
  'ops-bot',
  'devansh@quillbase.io',
  'ci-runner',
  'ines@fold.studio',
  'billing-worker',
];
const ACTIONS = [
  'seat.added',
  'invoice.finalized',
  'key.rotated',
  'webhook.retried',
  'member.invited',
  'export.requested',
  'plan.changed',
  'session.revoked',
];
const TARGETS = ['workspace/acme', 'org/northsail', 'project/atlas', 'team/platform'];

/** Deterministic, so the server and the client agree on every row. */
const EVENTS: Event[] = Array.from({ length: 32 }, (_, index) => {
  const minute = 58 - index * 3;
  const hour = 14 + Math.floor(minute / 60);
  const level: Level = index % 11 === 3 ? 'error' : index % 5 === 2 ? 'warn' : 'info';
  return {
    id: `ev_${9000 - index}`,
    time: `${String(hour).padStart(2, '0')}:${String(((minute % 60) + 60) % 60).padStart(2, '0')}`,
    level,
    actor: ACTORS[index % ACTORS.length],
    action: ACTIONS[index % ACTIONS.length],
    target: TARGETS[index % TARGETS.length],
    ms: 12 + ((index * 37) % 480),
  };
});

const LEVEL_STYLE: Record<Level, string> = {
  info: 'text-neutral-500 dark:text-neutral-400',
  warn: 'text-amber-700 dark:text-amber-300',
  error: 'text-rose-700 dark:text-rose-300',
};

const columns: DataTableColumn<Event>[] = [
  {
    id: 'time',
    header: 'Time',
    sortable: true,
    value: (row) => row.time,
    cell: (row) => <span className="tabular-nums">{row.time}</span>,
  },
  {
    id: 'level',
    header: 'Level',
    sortable: true,
    value: (row) => row.level,
    cell: (row) => (
      <span className={`inline-flex items-center gap-1.5 font-medium ${LEVEL_STYLE[row.level]}`}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.level}
      </span>
    ),
  },
  { id: 'action', header: 'Action', sortable: true, value: (row) => row.action },
  { id: 'actor', header: 'Actor', sortable: true, hideBelow: 'sm', value: (row) => row.actor },
  { id: 'target', header: 'Target', hideBelow: 'lg', value: (row) => row.target },
  {
    id: 'ms',
    header: 'Duration',
    sortable: true,
    numeric: true,
    value: (row) => row.ms,
    cell: (row) => `${row.ms} ms`,
  },
];

export default function DataTableStickyDemo() {
  const [opened, setOpened] = React.useState<Event | null>(null);

  return (
    <div className="w-full py-4">
      <DataTable
        data={EVENTS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `${row.action} at ${row.time}`}
        caption="Audit events for this workspace, newest first."
        variant="bordered"
        density="compact"
        stickyHeader
        maxHeight={332}
        searchable
        searchPlaceholder="Search events"
        defaultSort={{ columnId: 'time', direction: 'desc' }}
        onRowClick={setOpened}
      />
      <p
        aria-live="polite"
        className="mt-3 text-sm text-neutral-500 tabular-nums dark:text-neutral-400"
      >
        {opened ? `Opened ${opened.id} — ${opened.action}` : 'Pick a row to open its event.'}
      </p>
    </div>
  );
}
