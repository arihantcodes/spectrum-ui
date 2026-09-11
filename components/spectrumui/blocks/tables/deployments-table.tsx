'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Status = 'ready' | 'building' | 'failed';

interface Deployment {
  id: string;
  message: string;
  sha: string;
  env: 'Production' | 'Preview';
  status: Status;
  branch: string;
  duration: string;
  age: string;
  author: string;
  avatar: string;
}

const DEPLOYMENTS: Deployment[] = [
  {
    id: 'd1',
    message: 'fix: debounce search input on the audit view',
    sha: 'a41f20c',
    env: 'Production',
    status: 'ready',
    branch: 'main',
    duration: '42s',
    age: '6m',
    author: 'Freya',
    avatar: '/avatars/people/01.jpg',
  },
  {
    id: 'd2',
    message: 'feat: nightly usage rollups',
    sha: '8c92be1',
    env: 'Preview',
    status: 'building',
    branch: 'feat/rollups',
    duration: '—',
    age: '11m',
    author: 'Mateo',
    avatar: '/avatars/people/03.jpg',
  },
  {
    id: 'd3',
    message: 'chore: bump motion to 12.24',
    sha: 'f03d777',
    env: 'Preview',
    status: 'ready',
    branch: 'chore/deps',
    duration: '38s',
    age: '54m',
    author: 'Aiko',
    avatar: '/avatars/people/06.jpg',
  },
  {
    id: 'd4',
    message: 'feat: SSO domain enforcement',
    sha: '2b6a90d',
    env: 'Preview',
    status: 'failed',
    branch: 'feat/sso-enforce',
    duration: '1m 12s',
    age: '2h',
    author: 'Jonas',
    avatar: '/avatars/people/09.jpg',
  },
  {
    id: 'd5',
    message: 'fix: hydrate locale before first paint',
    sha: 'c7e5514',
    env: 'Production',
    status: 'ready',
    branch: 'main',
    duration: '45s',
    age: '5h',
    author: 'Zara',
    avatar: '/avatars/people/12.jpg',
  },
  {
    id: 'd6',
    message: 'docs: webhook retry policy',
    sha: '90aa3f2',
    env: 'Preview',
    status: 'ready',
    branch: 'docs/webhooks',
    duration: '31s',
    age: '8h',
    author: 'Nils',
    avatar: '/avatars/people/13.jpg',
  },
];

const STATUS_META: Record<Status, { label: string; className: string }> = {
  ready: { label: 'Ready', className: 'text-emerald-700 dark:text-emerald-300' },
  building: { label: 'Building', className: 'text-amber-700 dark:text-amber-300' },
  failed: { label: 'Failed', className: 'text-rose-700 dark:text-rose-300' },
};

const columns: DataTableColumn<Deployment>[] = [
  {
    id: 'message',
    header: 'Deployment',
    sortable: true,
    value: (row) => row.message,
    cell: (row) => (
      <span className="block min-w-0 max-w-72">
        <span className="block truncate">{row.message}</span>
        <span className="block font-mono text-xs font-normal text-neutral-500 dark:text-neutral-400">
          {row.sha}
        </span>
      </span>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    value: (row) => row.status,
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 font-medium ${STATUS_META[row.status].className}`}
      >
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full bg-current ${row.status === 'building' ? 'animate-pulse motion-reduce:animate-none' : ''}`}
        />
        {STATUS_META[row.status].label}
      </span>
    ),
  },
  {
    id: 'env',
    header: 'Environment',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => row.env,
    cell: (row) => (
      <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 ring-1 ring-inset ring-neutral-500/15 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15">
        {row.env}
      </span>
    ),
  },
  {
    id: 'branch',
    header: 'Branch',
    hideBelow: 'lg',
    value: (row) => row.branch,
    cell: (row) => <span className="font-mono text-xs">{row.branch}</span>,
  },
  {
    id: 'duration',
    header: 'Duration',
    numeric: true,
    hideBelow: 'md',
    value: (row) => row.duration,
  },
  {
    id: 'age',
    header: 'Age',
    numeric: true,
    value: (row) => row.age,
    cell: (row) => (
      <span className="flex items-center justify-end gap-2">
        <span className="tabular-nums">{row.age}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.avatar}
          alt={`Deployed by ${row.author}`}
          loading="lazy"
          width={20}
          height={20}
          className="size-5 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </span>
    ),
  },
];

export function DeploymentsTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Compact';
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={DEPLOYMENTS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `deployment ${row.sha}`}
        caption="Recent deployments with build status, environment and age."
        density={variant === 'Compact' ? 'compact' : 'default'}
        title="Deployments"
        quickFilter={{
          columnId: 'env',
          label: 'Filter by environment',
          getValue: (row) => row.env,
        }}
      />
    </div>
  );
}
