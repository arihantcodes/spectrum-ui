'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Risk = 'low' | 'medium' | 'high';

interface Customer {
  id: string;
  company: string;
  owner: string;
  avatar: string;
  plan: 'Enterprise' | 'Scale' | 'Team' | 'Starter';
  mrr: number;
  risk: Risk;
  since: string;
}

const CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    company: 'Driftlab',
    owner: 'Freya Lindgren',
    avatar: '/avatars/people/01.jpg',
    plan: 'Enterprise',
    mrr: 4200,
    risk: 'low',
    since: 'Jan 2024',
  },
  {
    id: 'c2',
    company: 'Keelworks',
    owner: 'Mateo Alvarez',
    avatar: '/avatars/people/03.jpg',
    plan: 'Scale',
    mrr: 1840,
    risk: 'low',
    since: 'Mar 2024',
  },
  {
    id: 'c3',
    company: 'Lumenshift',
    owner: 'Aiko Watanabe',
    avatar: '/avatars/people/06.jpg',
    plan: 'Scale',
    mrr: 1420,
    risk: 'medium',
    since: 'Nov 2024',
  },
  {
    id: 'c4',
    company: 'Fernwerk',
    owner: 'Jonas Keller',
    avatar: '/avatars/people/09.jpg',
    plan: 'Team',
    mrr: 640,
    risk: 'high',
    since: 'Feb 2025',
  },
  {
    id: 'c5',
    company: 'Copperline',
    owner: 'Zara Osei',
    avatar: '/avatars/people/12.jpg',
    plan: 'Team',
    mrr: 520,
    risk: 'low',
    since: 'Jun 2025',
  },
  {
    id: 'c6',
    company: 'Havenpoint',
    owner: 'Nils Bakker',
    avatar: '/avatars/people/13.jpg',
    plan: 'Starter',
    mrr: 96,
    risk: 'medium',
    since: 'Apr 2026',
  },
  {
    id: 'c7',
    company: 'Sable & Co',
    owner: 'Leila Haddad',
    avatar: '/avatars/people/05.jpg',
    plan: 'Enterprise',
    mrr: 3600,
    risk: 'low',
    since: 'Sep 2023',
  },
];

const RISK_STYLE: Record<Risk, string> = {
  low: 'text-emerald-700 dark:text-emerald-300',
  medium: 'text-amber-700 dark:text-amber-300',
  high: 'text-rose-700 dark:text-rose-300',
};

const RISK_RANK: Record<Risk, number> = { low: 0, medium: 1, high: 2 };

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Customer>[] = [
  {
    id: 'company',
    header: 'Customer',
    sortable: true,
    value: (row) => row.company,
    cell: (row) => (
      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.avatar}
          alt=""
          loading="lazy"
          width={28}
          height={28}
          className="size-7 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <span className="min-w-0">
          <span className="block truncate">{row.company}</span>
          <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.owner}
          </span>
        </span>
      </div>
    ),
  },
  {
    id: 'plan',
    header: 'Plan',
    sortable: true,
    value: (row) => row.plan,
    cell: (row) => (
      <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 ring-1 ring-inset ring-neutral-500/15 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15">
        {row.plan}
      </span>
    ),
  },
  {
    id: 'mrr',
    header: 'MRR',
    sortable: true,
    numeric: true,
    value: (row) => row.mrr,
    formatTotal: (sum) => money.format(sum),
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {money.format(row.mrr)}
      </span>
    ),
  },
  {
    id: 'risk',
    header: 'Churn risk',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => RISK_RANK[row.risk],
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 font-medium capitalize ${RISK_STYLE[row.risk]}`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.risk}
      </span>
    ),
  },
  { id: 'since', header: 'Since', hideBelow: 'lg', value: (row) => row.since },
];

export function CustomersTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Compact';
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={CUSTOMERS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.company}
        caption="Customers ranked by monthly recurring revenue, with plan and churn risk."
        density={variant === 'Compact' ? 'compact' : 'default'}
        title="Customers"
        quickFilter={{ columnId: 'plan', label: 'Filter by plan', getValue: (row) => row.plan }}
        totals={['mrr']}
        defaultSort={{ columnId: 'mrr', direction: 'desc' }}
      />
    </div>
  );
}
