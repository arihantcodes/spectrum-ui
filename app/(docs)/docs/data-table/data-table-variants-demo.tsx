'use client';

import * as React from 'react';

import {
  DataTable,
  type DataTableColumn,
  type DataTableDensity,
  type DataTableVariant,
} from '@/components/spectrumui/data-table';

interface Service {
  id: string;
  name: string;
  region: string;
  requests: number;
  p95: number;
  errors: string;
}

const SERVICES: Service[] = [
  {
    id: 'gateway',
    name: 'api-gateway',
    region: 'iad1',
    requests: 1284000,
    p95: 92,
    errors: '0.02%',
  },
  {
    id: 'billing',
    name: 'billing-worker',
    region: 'fra1',
    requests: 41200,
    p95: 310,
    errors: '0.41%',
  },
  {
    id: 'search',
    name: 'search-index',
    region: 'sfo1',
    requests: 268400,
    p95: 148,
    errors: '0.06%',
  },
  { id: 'mailer', name: 'mailer', region: 'iad1', requests: 9800, p95: 64, errors: '0.00%' },
  {
    id: 'webhooks',
    name: 'webhook-relay',
    region: 'sin1',
    requests: 76500,
    p95: 221,
    errors: '0.18%',
  },
];

const compact = new Intl.NumberFormat('en-US', { notation: 'compact' });

const columns: DataTableColumn<Service>[] = [
  { id: 'name', header: 'Service', sortable: true, value: (row) => row.name },
  { id: 'region', header: 'Region', sortable: true, value: (row) => row.region },
  {
    id: 'requests',
    header: 'Requests',
    sortable: true,
    numeric: true,
    value: (row) => row.requests,
    cell: (row) => compact.format(row.requests),
  },
  {
    id: 'p95',
    header: 'p95',
    sortable: true,
    numeric: true,
    value: (row) => row.p95,
    cell: (row) => `${row.p95} ms`,
  },
  { id: 'errors', header: 'Errors', numeric: true, hideBelow: 'sm', value: (row) => row.errors },
];

const VARIANTS: DataTableVariant[] = ['default', 'bordered', 'striped', 'minimal', 'panel'];
const DENSITIES: DataTableDensity[] = ['compact', 'default', 'relaxed'];

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-500">
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-xl bg-neutral-100 p-0.5 dark:bg-neutral-900"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded-[10px] px-2.5 py-1 text-sm capitalize transition-colors duration-100 ease-out focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:focus-visible:ring-neutral-300 ${
              value === option
                ? 'bg-white font-medium text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DataTableVariantsDemo() {
  const [variant, setVariant] = React.useState<DataTableVariant>('default');
  const [density, setDensity] = React.useState<DataTableDensity>('default');

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Segmented label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
        <Segmented label="Density" options={DENSITIES} value={density} onChange={setDensity} />
      </div>

      <DataTable
        data={SERVICES}
        columns={columns}
        rowId={(row) => row.id}
        variant={variant}
        density={density}
        caption="Service traffic for the last hour, by region."
        defaultSort={{ columnId: 'requests', direction: 'desc' }}
      />
    </div>
  );
}
