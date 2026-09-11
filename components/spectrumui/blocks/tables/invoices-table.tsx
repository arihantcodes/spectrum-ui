'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function IconDownload(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 2.5)"
        d="M9.23,4.791 L9.23,0.782 C9.23,0.355 9.57,0 10,0 C10.385,0 10.711,0.298 10.763,0.677 L10.77,0.782 L10.77,4.791 L15.55,4.791 C17.93,4.791 19.885,6.74 19.995,9.17 L20,9.386 L20,14.425 C20,16.873 18.113,18.882 15.768,18.995 L15.56,19 L4.44,19 C2.06,19 0.114,17.061 0.005,14.621 L0,14.405 L0,9.376 C0,6.928 1.878,4.909 4.222,4.796 L4.43,4.791 L9.23,4.791 L9.23,11.193 L7.63,9.541 C7.33,9.231 6.84,9.231 6.54,9.541 C6.39,9.696 6.32,9.902 6.32,10.109 C6.32,10.266 6.365,10.429 6.46,10.568 L6.54,10.667 L9.45,13.682 C9.59,13.837 9.79,13.919 10,13.919 C10.167,13.919 10.333,13.862 10.465,13.753 L10.54,13.682 L13.45,10.667 C13.75,10.357 13.75,9.851 13.45,9.541 C13.177,9.259 12.748,9.234 12.446,9.464 L12.36,9.541 L10.77,11.193 L10.77,4.791 L9.23,4.791 Z"
      />
    </svg>
  );
}

type Status = 'paid' | 'due' | 'overdue';

interface Invoice {
  id: string;
  number: string;
  period: string;
  issued: string;
  status: Status;
  amount: number;
}

const INVOICES: Invoice[] = [
  {
    id: 'i1',
    number: 'INV-2041',
    period: 'Aug 2026',
    issued: 'Sep 1',
    status: 'due',
    amount: 1140,
  },
  {
    id: 'i2',
    number: 'INV-2033',
    period: 'Jul 2026',
    issued: 'Aug 1',
    status: 'paid',
    amount: 1140,
  },
  {
    id: 'i3',
    number: 'INV-2025',
    period: 'Jun 2026',
    issued: 'Jul 1',
    status: 'paid',
    amount: 980,
  },
  {
    id: 'i4',
    number: 'INV-2017',
    period: 'May 2026',
    issued: 'Jun 1',
    status: 'paid',
    amount: 980,
  },
  {
    id: 'i5',
    number: 'INV-2009',
    period: 'Apr 2026',
    issued: 'May 1',
    status: 'overdue',
    amount: 860,
  },
  {
    id: 'i6',
    number: 'INV-2001',
    period: 'Mar 2026',
    issued: 'Apr 1',
    status: 'paid',
    amount: 860,
  },
];

const STATUS_STYLE: Record<Status, string> = {
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25',
  due: 'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  overdue:
    'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-300/25',
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Invoice>[] = [
  {
    id: 'number',
    header: 'Invoice',
    sortable: true,
    value: (row) => row.number,
    cell: (row) => <span className="font-mono text-[13px]">{row.number}</span>,
  },
  { id: 'period', header: 'Billing period', value: (row) => row.period },
  { id: 'issued', header: 'Issued', hideBelow: 'sm', value: (row) => row.issued },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    value: (row) => row.status,
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLE[row.status]}`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.status}
      </span>
    ),
  },
  {
    id: 'amount',
    header: 'Amount',
    sortable: true,
    numeric: true,
    value: (row) => row.amount,
    formatTotal: (sum) => money.format(sum),
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {money.format(row.amount)}
      </span>
    ),
  },
];

export function InvoicesTable({ variant = 'Panel' }: { variant?: 'Panel' | 'Minimal' }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <DataTable
        data={INVOICES}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `invoice ${row.number}`}
        caption="Billing history with period, status and amount."
        variant={variant === 'Minimal' ? 'minimal' : 'panel'}
        title="Invoices"
        totals={['amount']}
        rowActions={(row) => (
          <button
            type="button"
            aria-label={`Download ${row.number} as PDF`}
            className="grid size-8 place-items-center rounded-xl text-neutral-400 transition-colors duration-100 ease-out hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
          >
            <IconDownload className="size-4" />
          </button>
        )}
      />
    </div>
  );
}
