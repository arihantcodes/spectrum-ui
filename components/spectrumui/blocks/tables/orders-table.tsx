'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type Status = 'fulfilled' | 'processing' | 'cancelled';

interface OrderLine {
  item: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  avatar: string;
  status: Status;
  date: string;
  total: number;
  lines: OrderLine[];
}

const ORDERS: Order[] = [
  {
    id: '#4821',
    customer: 'Freya Lindgren',
    avatar: '/avatars/people/01.jpg',
    status: 'fulfilled',
    date: 'Sep 8',
    total: 236,
    lines: [
      { item: 'Field jacket — moss, M', qty: 1, price: 148 },
      { item: 'Trail socks — 3 pack', qty: 2, price: 44 },
    ],
  },
  {
    id: '#4820',
    customer: 'Mateo Alvarez',
    avatar: '/avatars/people/03.jpg',
    status: 'processing',
    date: 'Sep 8',
    total: 89,
    lines: [{ item: 'Canvas tote — natural', qty: 1, price: 89 }],
  },
  {
    id: '#4819',
    customer: 'Aiko Watanabe',
    avatar: '/avatars/people/06.jpg',
    status: 'fulfilled',
    date: 'Sep 7',
    total: 312,
    lines: [
      { item: 'Wool overshirt — charcoal, S', qty: 1, price: 189 },
      { item: 'Beanie — rust', qty: 1, price: 38 },
      { item: 'Trail socks — 3 pack', qty: 1, price: 44 },
      { item: 'Gift wrap', qty: 1, price: 41 },
    ],
  },
  {
    id: '#4818',
    customer: 'Jonas Keller',
    avatar: '/avatars/people/09.jpg',
    status: 'cancelled',
    date: 'Sep 7',
    total: 148,
    lines: [{ item: 'Field jacket — sand, L', qty: 1, price: 148 }],
  },
  {
    id: '#4817',
    customer: 'Zara Osei',
    avatar: '/avatars/people/12.jpg',
    status: 'fulfilled',
    date: 'Sep 6',
    total: 512,
    lines: [
      { item: 'Down parka — ink, M', qty: 1, price: 420 },
      { item: 'Liner gloves', qty: 2, price: 46 },
    ],
  },
  {
    id: '#4816',
    customer: 'Leila Haddad',
    avatar: '/avatars/people/05.jpg',
    status: 'processing',
    date: 'Sep 6',
    total: 76,
    lines: [{ item: 'Beanie — rust', qty: 2, price: 38 }],
  },
];

const STATUS_STYLE: Record<Status, string> = {
  fulfilled:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25',
  processing:
    'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  cancelled:
    'bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15',
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Order>[] = [
  {
    id: 'id',
    header: 'Order',
    sortable: true,
    value: (row) => row.id,
    cell: (row) => (
      <span>
        <span className="font-mono text-[13px]">{row.id}</span>
        <span className="block text-xs font-normal text-neutral-500 dark:text-neutral-400">
          {row.lines.length} {row.lines.length === 1 ? 'item' : 'items'}
        </span>
      </span>
    ),
  },
  {
    id: 'customer',
    header: 'Customer',
    sortable: true,
    value: (row) => row.customer,
    cell: (row) => (
      <span className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.avatar}
          alt=""
          loading="lazy"
          width={24}
          height={24}
          className="size-6 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <span className="truncate font-normal">{row.customer}</span>
      </span>
    ),
  },
  {
    id: 'status',
    header: 'Fulfillment',
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
  { id: 'date', header: 'Date', sortable: true, hideBelow: 'sm', value: (row) => row.date },
  {
    id: 'total',
    header: 'Total',
    sortable: true,
    numeric: true,
    value: (row) => row.total,
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {money.format(row.total)}
      </span>
    ),
  },
];

export function OrdersTable({ variant = 'Comfortable' }: { variant?: 'Comfortable' | 'Bordered' }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={ORDERS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `order ${row.id}`}
        caption="Recent orders with fulfillment status, customer and total."
        variant={variant === 'Bordered' ? 'bordered' : 'default'}
        title="Orders"
        quickFilter={{ columnId: 'status', label: 'Filter by fulfillment' }}
        renderDetail={(row) => (
          <ul className="flex flex-col gap-2 text-sm">
            {row.lines.map((line) => (
              <li key={line.item} className="flex items-baseline justify-between gap-4">
                <span className="text-neutral-700 dark:text-neutral-300">
                  {line.item}
                  <span className="ms-2 text-xs text-neutral-500 dark:text-neutral-400">
                    ×{line.qty}
                  </span>
                </span>
                <span className="font-medium text-neutral-900 tabular-nums dark:text-neutral-100">
                  {money.format(line.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}
