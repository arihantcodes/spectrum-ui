'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const path = points
    .map(
      (value, index) =>
        `${((index / (points.length - 1)) * 62 + 1).toFixed(1)},${(
          17 -
          ((value - min) / (max - min || 1)) * 14
        ).toFixed(1)}`,
    )
    .join(' ');

  return (
    <svg viewBox="0 0 64 20" fill="none" aria-hidden="true" className="h-5 w-16">
      <polyline
        points={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
        }
      />
    </svg>
  );
}

function DeltaChevron({ up, ...props }: { up: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform={up ? 'rotate(180 12 12) translate(6, 7)' : 'translate(6, 7)'}
        d="M4.869,9.631 C4.811,9.574 4.563,9.361 4.359,9.162 C3.076,7.997 0.976,4.958 0.335,3.367 C0.232,3.125 0.014,2.514 0,2.188 C0,1.875 0.072,1.577 0.218,1.293 C0.422,0.938 0.743,0.654 1.122,0.498 C1.385,0.397 2.172,0.242 2.186,0.242 C3.047,0.086 4.446,0 5.992,0 C7.465,0 8.807,0.086 9.681,0.213 C9.695,0.228 10.673,0.384 11.008,0.554 C11.62,0.867 12,1.478 12,2.132 L12,2.188 C11.985,2.614 11.605,3.509 11.591,3.509 C10.949,5.014 8.952,7.983 7.625,9.177 C7.625,9.177 7.284,9.513 7.071,9.659 C6.765,9.887 6.386,10 6.007,10 C5.584,10 5.19,9.872 4.869,9.631"
      />
    </svg>
  );
}

interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  trend: number[];
  cap: string;
}

const ASSETS: Asset[] = [
  {
    id: 'a1',
    symbol: 'NVX',
    name: 'Novex Systems',
    price: 842.12,
    change: 2.41,
    trend: [64, 66, 65, 69, 72, 71, 76],
    cap: '$2.08T',
  },
  {
    id: 'a2',
    symbol: 'HLO',
    name: 'Helio Labs',
    price: 214.55,
    change: -1.18,
    trend: [82, 79, 80, 76, 74, 75, 71],
    cap: '$412B',
  },
  {
    id: 'a3',
    symbol: 'DRF',
    name: 'Driftlab',
    price: 96.4,
    change: 5.62,
    trend: [40, 42, 41, 47, 52, 55, 61],
    cap: '$88B',
  },
  {
    id: 'a4',
    symbol: 'KEL',
    name: 'Keelworks',
    price: 47.83,
    change: 0.34,
    trend: [58, 57, 59, 58, 60, 59, 60],
    cap: '$36B',
  },
  {
    id: 'a5',
    symbol: 'FRN',
    name: 'Fernwerk AG',
    price: 128.9,
    change: -3.75,
    trend: [77, 74, 75, 70, 66, 62, 58],
    cap: '$54B',
  },
  {
    id: 'a6',
    symbol: 'CPL',
    name: 'Copperline',
    price: 12.06,
    change: 1.02,
    trend: [30, 31, 29, 33, 32, 35, 36],
    cap: '$4.2B',
  },
];

const price = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const columns: DataTableColumn<Asset>[] = [
  {
    id: 'symbol',
    header: 'Asset',
    sortable: true,
    value: (row) => row.symbol,
    cell: (row) => (
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 font-mono text-[10px] font-medium text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {row.symbol.slice(0, 2)}
        </span>
        <span className="min-w-0">
          <span className="block">{row.symbol}</span>
          <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.name}
          </span>
        </span>
      </span>
    ),
  },
  {
    id: 'price',
    header: 'Price',
    sortable: true,
    numeric: true,
    value: (row) => row.price,
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {price.format(row.price)}
      </span>
    ),
  },
  {
    id: 'change',
    header: '24h',
    sortable: true,
    numeric: true,
    value: (row) => row.change,
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1 font-medium tabular-nums ${
          row.change >= 0
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-rose-700 dark:text-rose-300'
        }`}
      >
        <DeltaChevron up={row.change >= 0} className="size-3" />
        {Math.abs(row.change).toFixed(2)}%
      </span>
    ),
  },
  {
    id: 'trend',
    header: 'Last 7 days',
    align: 'end',
    hideBelow: 'sm',
    value: (row) => row.change,
    cell: (row) => (
      <span className="inline-flex justify-end">
        <Sparkline points={row.trend} up={row.trend[row.trend.length - 1] >= row.trend[0]} />
      </span>
    ),
  },
  { id: 'cap', header: 'Market cap', numeric: true, hideBelow: 'md', value: (row) => row.cap },
];

export function MarketTable({ variant = 'Comfortable' }: { variant?: 'Comfortable' | 'Dense' }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <DataTable
        data={ASSETS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Watchlist with live prices, 24-hour change and a seven-day sparkline."
        variant="minimal"
        density={variant === 'Dense' ? 'compact' : 'default'}
        title="Watchlist"
      />
    </div>
  );
}
