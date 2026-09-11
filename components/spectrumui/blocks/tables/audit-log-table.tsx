'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Level = 'info' | 'warn' | 'error';

interface AuditEvent {
  id: string;
  time: string;
  actor: string;
  avatar: string | null;
  action: string;
  target: string;
  ip: string;
  level: Level;
}

const ACTORS: { name: string; avatar: string | null }[] = [
  { name: 'Freya Lindgren', avatar: '/avatars/people/01.jpg' },
  { name: 'ops-bot', avatar: null },
  { name: 'Mateo Alvarez', avatar: '/avatars/people/03.jpg' },
  { name: 'Aiko Watanabe', avatar: '/avatars/people/06.jpg' },
  { name: 'ci-runner', avatar: null },
  { name: 'Zara Osei', avatar: '/avatars/people/12.jpg' },
];

const ACTIONS = [
  'member.invited',
  'key.rotated',
  'billing.plan_changed',
  'webhook.retried',
  'sso.enforced',
  'export.requested',
  'session.revoked',
  'role.granted',
];

const TARGETS = ['workspace/driftlab', 'org/keelworks', 'project/atlas', 'team/platform'];

const EVENTS: AuditEvent[] = Array.from({ length: 28 }, (_, index) => {
  const minute = 56 - index * 2;
  const hour = 15 + Math.floor(minute / 60);
  const actor = ACTORS[index % ACTORS.length];
  return {
    id: `ev_${7200 - index}`,
    time: `${String(hour).padStart(2, '0')}:${String(((minute % 60) + 60) % 60).padStart(2, '0')}`,
    actor: actor.name,
    avatar: actor.avatar,
    action: ACTIONS[index % ACTIONS.length],
    target: TARGETS[index % TARGETS.length],
    ip: `203.0.113.${(index * 13) % 255}`,
    level: index % 13 === 4 ? 'error' : index % 6 === 2 ? 'warn' : 'info',
  };
});

const LEVEL_STYLE: Record<Level, string> = {
  info: 'text-neutral-500 dark:text-neutral-400',
  warn: 'text-amber-700 dark:text-amber-300',
  error: 'text-rose-700 dark:text-rose-300',
};

const columns: DataTableColumn<AuditEvent>[] = [
  {
    id: 'time',
    header: 'Time',
    sortable: true,
    value: (row) => row.time,
    cell: (row) => <span className="tabular-nums">{row.time}</span>,
  },
  {
    id: 'actor',
    header: 'Actor',
    sortable: true,
    value: (row) => row.actor,
    cell: (row) => (
      <span className="flex items-center gap-2 font-normal">
        {row.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={row.avatar}
            alt=""
            loading="lazy"
            width={20}
            height={20}
            className="size-5 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-5 shrink-0 place-items-center rounded-full bg-neutral-100 font-mono text-[9px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {'>_'}
          </span>
        )}
        <span className="truncate">{row.actor}</span>
      </span>
    ),
  },
  {
    id: 'action',
    header: 'Action',
    sortable: true,
    value: (row) => row.action,
    cell: (row) => <span className="font-mono text-xs">{row.action}</span>,
  },
  { id: 'target', header: 'Target', hideBelow: 'lg', value: (row) => row.target },
  {
    id: 'ip',
    header: 'IP',
    hideBelow: 'md',
    value: (row) => row.ip,
    cell: (row) => <span className="font-mono text-xs">{row.ip}</span>,
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
];

export function AuditLogTable({ variant = 'Pinned' }: { variant?: 'Pinned' | 'Paged' }) {
  const pinned = variant === 'Pinned';

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={EVENTS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `${row.action} at ${row.time}`}
        caption="Audit events for this workspace, newest first."
        variant="bordered"
        density="compact"
        searchable
        searchPlaceholder="Search events"
        quickFilter={{ columnId: 'level', label: 'Filter by level' }}
        resizableColumns
        pinFirstColumn
        stickyHeader={pinned}
        maxHeight={pinned ? 340 : undefined}
        pageSize={pinned ? undefined : 8}
        defaultSort={{ columnId: 'time', direction: 'desc' }}
      />
    </div>
  );
}
