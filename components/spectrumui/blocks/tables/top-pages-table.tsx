'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

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

interface Page {
  id: string;
  path: string;
  visitors: number;
  change: number;
  avgTime: string;
}

const PAGES: Page[] = [
  { id: 'p1', path: '/', visitors: 48210, change: 12.4, avgTime: '1m 42s' },
  { id: 'p2', path: '/pricing', visitors: 19340, change: 8.1, avgTime: '2m 08s' },
  { id: 'p3', path: '/docs/getting-started', visitors: 12880, change: -3.2, avgTime: '4m 31s' },
  { id: 'p4', path: '/blog/launch-week-recap', visitors: 9640, change: 64.9, avgTime: '3m 12s' },
  { id: 'p5', path: '/changelog', visitors: 5220, change: 4.6, avgTime: '1m 05s' },
  { id: 'p6', path: '/docs/api/webhooks', visitors: 3980, change: -1.8, avgTime: '5m 44s' },
  { id: 'p7', path: '/templates', visitors: 2410, change: 22.7, avgTime: '2m 51s' },
];

const MAX_VISITORS = Math.max(...PAGES.map((page) => page.visitors));

function buildColumns(bars: boolean): DataTableColumn<Page>[] {
  return [
    {
      id: 'path',
      header: 'Page',
      sortable: true,
      value: (row) => row.path,
      cell: (row) => <span className="font-mono text-[13px]">{row.path}</span>,
    },
    {
      id: 'visitors',
      header: 'Visitors',
      sortable: true,
      numeric: true,
      value: (row) => row.visitors,
      formatTotal: (sum) => Math.round(sum).toLocaleString('en-US'),
      cell: (row) =>
        bars ? (
          <span className="flex items-center justify-end gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
            >
              <span
                className="block h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
                style={{ width: `${Math.max(4, (row.visitors / MAX_VISITORS) * 100)}%` }}
              />
            </span>
            <span className="w-14 font-medium text-neutral-900 dark:text-neutral-100">
              {row.visitors.toLocaleString('en-US')}
            </span>
          </span>
        ) : (
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {row.visitors.toLocaleString('en-US')}
          </span>
        ),
    },
    {
      id: 'change',
      header: 'Change',
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
          {Math.abs(row.change).toFixed(1)}%
        </span>
      ),
    },
    {
      id: 'avgTime',
      header: 'Avg. time',
      numeric: true,
      hideBelow: 'sm',
      value: (row) => row.avgTime,
    },
  ];
}

export function TopPagesTable({ variant = 'Bars' }: { variant?: 'Bars' | 'Plain' }) {
  const columns = React.useMemo(() => buildColumns(variant === 'Bars'), [variant]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <DataTable
        data={PAGES}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.path}
        caption="Most visited pages in the last 30 days, with share bars and week-over-week change."
        variant="minimal"
        density="compact"
        title="Top pages"
        totals={['visitors']}
        defaultSort={{ columnId: 'visitors', direction: 'desc' }}
      />
    </div>
  );
}
