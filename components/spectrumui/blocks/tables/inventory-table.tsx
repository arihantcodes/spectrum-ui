'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function IconBag(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2.5, 2)"
        d="M9.51,0 C11.929,0 13.889,2 13.918,4.47 L13.918,4.47 L14.123,4.47 C16.815,4.47 19,6.72 19,9.48 L19,9.48 L19,15 C19,17.76 16.815,20 14.123,20 L14.123,20 L4.877,20 C2.185,20 0,17.76 0,15 L0,15 L0,9.48 C0,6.72 2.185,4.47 4.877,4.47 L4.877,4.47 L5.082,4.47 C5.101,3.27 5.56,2.15 6.389,1.31 C7.227,0.46 8.3,0.03 9.51,0 Z M13.206,5.66 C12.806,5.66 12.475,6 12.475,6.41 L12.475,6.41 L12.475,7.57 C12.475,7.98 12.806,8.32 13.206,8.32 C13.616,8.32 13.938,7.98 13.938,7.57 L13.938,7.57 L13.938,6.41 C13.938,6 13.616,5.66 13.206,5.66 Z M5.706,5.66 C5.306,5.66 4.974,6 4.974,6.41 L4.974,6.41 L4.974,7.57 C4.974,7.98 5.306,8.32 5.706,8.32 C6.116,8.32 6.437,7.98 6.437,7.57 L6.437,7.57 L6.437,6.41 C6.437,6 6.116,5.66 5.706,5.66 Z M9.51,1.5 C8.759,1.5 7.978,1.81 7.413,2.38 C6.867,2.94 6.564,3.68 6.545,4.47 L6.545,4.47 L12.455,4.47 C12.426,2.83 11.119,1.5 9.51,1.5 Z"
      />
    </svg>
  );
}

type Stock = 'in' | 'low' | 'out';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  capacity: number;
  price: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Field jacket — moss',
    sku: 'FJ-MOSS-M',
    category: 'Outerwear',
    stock: 184,
    capacity: 200,
    price: 148,
  },
  {
    id: 'p2',
    name: 'Wool overshirt — charcoal',
    sku: 'WO-CHAR-S',
    category: 'Outerwear',
    stock: 32,
    capacity: 150,
    price: 189,
  },
  {
    id: 'p3',
    name: 'Down parka — ink',
    sku: 'DP-INK-M',
    category: 'Outerwear',
    stock: 0,
    capacity: 120,
    price: 420,
  },
  {
    id: 'p4',
    name: 'Trail socks — 3 pack',
    sku: 'TS-3PK',
    category: 'Accessories',
    stock: 412,
    capacity: 500,
    price: 44,
  },
  {
    id: 'p5',
    name: 'Beanie — rust',
    sku: 'BN-RUST',
    category: 'Accessories',
    stock: 18,
    capacity: 240,
    price: 38,
  },
  {
    id: 'p6',
    name: 'Canvas tote — natural',
    sku: 'CT-NAT',
    category: 'Bags',
    stock: 96,
    capacity: 160,
    price: 89,
  },
];

function stockState(row: Product): Stock {
  if (row.stock === 0) return 'out';
  if (row.stock / row.capacity < 0.2) return 'low';
  return 'in';
}

const STOCK_META: Record<Stock, { label: string; text: string; bar: string }> = {
  in: {
    label: 'In stock',
    text: 'text-neutral-500 dark:text-neutral-400',
    bar: 'bg-emerald-600 dark:bg-emerald-400',
  },
  low: {
    label: 'Low stock',
    text: 'text-amber-700 dark:text-amber-300',
    bar: 'bg-amber-500 dark:bg-amber-400',
  },
  out: {
    label: 'Out of stock',
    text: 'text-rose-700 dark:text-rose-300',
    bar: 'bg-rose-500 dark:bg-rose-400',
  },
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const columns: DataTableColumn<Product>[] = [
  {
    id: 'name',
    header: 'Product',
    sortable: true,
    value: (row) => row.name,
    cell: (row) => (
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
        >
          <IconBag className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate">{row.name}</span>
          <span className="block font-mono text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.sku}
          </span>
        </span>
      </span>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    sortable: true,
    hideBelow: 'md',
    value: (row) => row.category,
  },
  {
    id: 'stock',
    header: 'Stock',
    sortable: true,
    numeric: true,
    value: (row) => row.stock,
    formatTotal: (sum) => `${Math.round(sum).toLocaleString('en-US')} units`,
    cell: (row) => {
      const state = stockState(row);
      return (
        <span className="flex items-center justify-end gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
          >
            <span
              className={`block h-full rounded-full ${STOCK_META[state].bar}`}
              style={{ width: `${Math.min(100, (row.stock / row.capacity) * 100)}%` }}
            />
          </span>
          <span className="w-8 tabular-nums">{row.stock}</span>
        </span>
      );
    },
  },
  {
    id: 'state',
    header: 'Status',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => stockState(row),
    cell: (row) => {
      const state = stockState(row);
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium ${STOCK_META[state].text}`}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
          {STOCK_META[state].label}
        </span>
      );
    },
  },
  {
    id: 'price',
    header: 'Price',
    sortable: true,
    numeric: true,
    value: (row) => row.price,
    cell: (row) => money.format(row.price),
  },
];

export function InventoryTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Bordered';
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={PRODUCTS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Inventory levels with stock bars, thresholds and pricing."
        variant={variant === 'Bordered' ? 'bordered' : 'default'}
        title="Inventory"
        totals={['stock']}
        searchable
        searchPlaceholder="Search products"
        defaultSort={{ columnId: 'stock', direction: 'asc' }}
      />
    </div>
  );
}
