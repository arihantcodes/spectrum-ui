'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

function IconDownload(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2.5)"
        d="M9.23,4.791 L9.23,0.782 C9.23,0.355 9.57,0 10,0 C10.385,0 10.711,0.298 10.763,0.677 L10.77,0.782 L10.77,4.791 L15.55,4.791 C17.93,4.791 19.885,6.74 19.995,9.17 L20,9.386 L20,14.425 C20,16.873 18.113,18.882 15.768,18.995 L15.56,19 L4.44,19 C2.06,19 0.114,17.061 0.005,14.621 L0,14.405 L0,9.376 C0,6.928 1.878,4.909 4.222,4.796 L4.43,4.791 L9.23,4.791 L9.23,11.193 L7.63,9.541 C7.33,9.231 6.84,9.231 6.54,9.541 C6.39,9.696 6.32,9.902 6.32,10.109 C6.32,10.266 6.365,10.429 6.46,10.568 L6.54,10.667 L9.45,13.682 C9.59,13.837 9.79,13.919 10,13.919 C10.167,13.919 10.333,13.862 10.465,13.753 L10.54,13.682 L13.45,10.667 C13.75,10.357 13.75,9.851 13.45,9.541 C13.177,9.259 12.748,9.234 12.446,9.464 L12.36,9.541 L10.77,11.193 L10.77,4.791 L9.23,4.791 Z"
      />
    </Glyph>
  );
}

function IconMore(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2)"
        d="M10,0 C15.52,0 20,4.48 20,10 C20,15.52 15.52,20 10,20 C4.47,20 0,15.52 0,10 C0,4.48 4.47,0 10,0 Z M14.48,8.801 C13.81,8.801 13.28,9.34 13.28,10 C13.28,10.66 13.81,11.2 14.48,11.2 C15.14,11.2 15.67,10.66 15.67,10 C15.67,9.34 15.14,8.801 14.48,8.801 Z M10,8.801 C9.34,8.801 8.8,9.34 8.8,10 C8.8,10.66 9.34,11.2 10,11.2 C10.66,11.2 11.19,10.66 11.19,10 C11.19,9.34 10.66,8.801 10,8.801 Z M5.52,8.801 C4.86,8.801 4.32,9.34 4.32,10 C4.32,10.66 4.86,11.2 5.52,11.2 C6.18,11.2 6.71,10.66 6.71,10 C6.71,9.34 6.18,8.801 5.52,8.801 Z"
      />
    </Glyph>
  );
}

type Status = 'succeeded' | 'processing' | 'failed' | 'refunded';

interface Payment {
  id: string;
  customer: string;
  email: string;
  avatar: string;
  status: Status;
  method: string;
  date: string;
  amount: number;
}

const PAYMENTS: Payment[] = [
  {
    id: 'pay_9041',
    customer: 'Freya Lindgren',
    email: 'freya@driftlab.se',
    avatar: '/avatars/people/01.jpg',
    status: 'succeeded',
    method: 'Visa •• 4242',
    date: 'Sep 8',
    amount: 2400,
  },
  {
    id: 'pay_9040',
    customer: 'Mateo Alvarez',
    email: 'mateo@keelworks.mx',
    avatar: '/avatars/people/03.jpg',
    status: 'processing',
    method: 'ACH transfer',
    date: 'Sep 8',
    amount: 640,
  },
  {
    id: 'pay_9039',
    customer: 'Aiko Watanabe',
    email: 'aiko@lumenshift.jp',
    avatar: '/avatars/people/06.jpg',
    status: 'succeeded',
    method: 'Amex •• 3008',
    date: 'Sep 7',
    amount: 180,
  },
  {
    id: 'pay_9038',
    customer: 'Jonas Keller',
    email: 'jonas@fernwerk.de',
    avatar: '/avatars/people/09.jpg',
    status: 'failed',
    method: 'Visa •• 1119',
    date: 'Sep 7',
    amount: 1280,
  },
  {
    id: 'pay_9037',
    customer: 'Zara Osei',
    email: 'zara@copperline.gh',
    avatar: '/avatars/people/12.jpg',
    status: 'succeeded',
    method: 'Mastercard •• 7745',
    date: 'Sep 6',
    amount: 960,
  },
  {
    id: 'pay_9036',
    customer: 'Nils Bakker',
    email: 'nils@havenpoint.nl',
    avatar: '/avatars/people/13.jpg',
    status: 'refunded',
    method: 'Visa •• 6710',
    date: 'Sep 5',
    amount: 180,
  },
  {
    id: 'pay_9035',
    customer: 'Leila Haddad',
    email: 'leila@sable.co',
    avatar: '/avatars/people/05.jpg',
    status: 'succeeded',
    method: 'Wire transfer',
    date: 'Sep 5',
    amount: 5200,
  },
  {
    id: 'pay_9034',
    customer: 'Tomas Vega',
    email: 'tomas@quietriver.ar',
    avatar: '/avatars/people/08.jpg',
    status: 'succeeded',
    method: 'Visa •• 9033',
    date: 'Sep 4',
    amount: 320,
  },
];

const STATUS_STYLE: Record<Status, string> = {
  succeeded:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25',
  processing:
    'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  failed:
    'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-300/25',
  refunded:
    'bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15',
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Payment>[] = [
  {
    id: 'customer',
    header: 'Customer',
    sortable: true,
    value: (row) => row.customer,
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
          <span className="block truncate">{row.customer}</span>
          <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.email}
          </span>
        </span>
      </div>
    ),
  },
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
  { id: 'method', header: 'Method', hideBelow: 'lg', value: (row) => row.method },
  {
    id: 'date',
    header: 'Date',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => row.date,
    cell: (row) => <span className="tabular-nums">{row.date}</span>,
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

export function PaymentsTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Striped';
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={PAYMENTS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `payment from ${row.customer}`}
        caption="Payments from the last week, with status, method, date and amount."
        variant={variant === 'Striped' ? 'striped' : 'default'}
        quickFilter={{ columnId: 'status', label: 'Filter by status' }}
        totals={['amount']}
        selectable
        pageSize={6}
        rowActions={(row) => (
          <button
            type="button"
            aria-label={`Open actions for ${row.customer}`}
            className="grid size-8 place-items-center rounded-xl text-neutral-400 transition-colors duration-100 ease-out hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
          >
            <IconMore className="size-[18px]" />
          </button>
        )}
        bulkActions={({ ids, clear }) => (
          <button
            type="button"
            onClick={clear}
            aria-label={`Export ${ids.length} payments`}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors duration-100 ease-out hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:hover:bg-black/10"
          >
            <IconDownload className="size-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}
      />
    </div>
  );
}
