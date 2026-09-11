'use client';

import * as React from 'react';

import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

/* Iconly / Bold icons, filled with currentColor. */
type IconProps = React.SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

/** Iconly / Bold / More Circle. */
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

/** Iconly / Bold / Download. */
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

/** Iconly / Bold / Delete. */
function IconDelete(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(3, 2)"
        d="M15.939,6.697 C16.138,6.697 16.319,6.784 16.462,6.931 C16.596,7.088 16.663,7.283 16.643,7.489 C16.643,7.557 16.11,14.297 15.806,17.134 C15.615,18.875 14.493,19.932 12.809,19.961 C11.515,19.99 10.25,20 9.004,20 C7.681,20 6.388,19.99 5.132,19.961 C3.505,19.922 2.382,18.846 2.201,17.134 C1.888,14.287 1.364,7.557 1.355,7.489 C1.345,7.283 1.411,7.088 1.545,6.931 C1.678,6.784 1.868,6.697 2.069,6.697 L15.939,6.697 Z M11.065,0 C11.949,0 12.738,0.617 12.967,1.497 L12.967,1.497 L13.13,2.227 C13.263,2.822 13.778,3.243 14.371,3.243 L14.371,3.243 L17.287,3.243 C17.676,3.243 18,3.566 18,3.977 L18,3.977 L18,4.357 C18,4.758 17.676,5.091 17.287,5.091 L17.287,5.091 L0.714,5.091 C0.324,5.091 0,4.758 0,4.357 L0,4.357 L0,3.977 C0,3.566 0.324,3.243 0.714,3.243 L0.714,3.243 L3.63,3.243 C4.222,3.243 4.737,2.822 4.871,2.228 L4.871,2.228 L5.023,1.546 C5.261,0.617 6.041,0 6.935,0 L6.935,0 Z"
      />
    </Glyph>
  );
}

type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

interface Payment {
  id: string;
  customer: string;
  email: string;
  avatar: string;
  status: PaymentStatus;
  method: string;
  date: string;
  amount: number;
  plan: string;
  seats: number;
}

const PAYMENTS: Payment[] = [
  {
    id: 'in_4021',
    customer: 'Marta Halapin',
    email: 'marta@northsail.co',
    avatar: '/avatars/people/01.jpg',
    status: 'paid',
    method: 'Visa •• 4242',
    date: '2026-09-08',
    amount: 1840,
    plan: 'Scale (annual)',
    seats: 24,
  },
  {
    id: 'in_4020',
    customer: 'Devansh Rao',
    email: 'devansh@quillbase.io',
    avatar: '/avatars/people/02.jpg',
    status: 'pending',
    method: 'ACH transfer',
    date: '2026-09-08',
    amount: 420,
    plan: 'Team (monthly)',
    seats: 6,
  },
  {
    id: 'in_4019',
    customer: 'Ines Almeida',
    email: 'ines@fold.studio',
    avatar: '/avatars/people/03.jpg',
    status: 'paid',
    method: 'Mastercard •• 8801',
    date: '2026-09-07',
    amount: 96,
    plan: 'Starter (monthly)',
    seats: 2,
  },
  {
    id: 'in_4018',
    customer: 'Tobias Werner',
    email: 'tobias@heliolab.de',
    avatar: '/avatars/people/04.jpg',
    status: 'failed',
    method: 'Visa •• 1119',
    date: '2026-09-07',
    amount: 2400,
    plan: 'Scale (annual)',
    seats: 32,
  },
  {
    id: 'in_4017',
    customer: 'Amara Okonjo',
    email: 'amara@brightpath.ng',
    avatar: '/avatars/people/05.jpg',
    status: 'paid',
    method: 'Amex •• 3005',
    date: '2026-09-06',
    amount: 780,
    plan: 'Team (annual)',
    seats: 12,
  },
  {
    id: 'in_4016',
    customer: 'Rafael Costa',
    email: 'rafael@medela.com.br',
    avatar: '/avatars/people/06.jpg',
    status: 'refunded',
    method: 'Visa •• 6710',
    date: '2026-09-05',
    amount: 96,
    plan: 'Starter (monthly)',
    seats: 2,
  },
  {
    id: 'in_4015',
    customer: 'Suki Tanaka',
    email: 'suki@kirin-works.jp',
    avatar: '/avatars/people/07.jpg',
    status: 'paid',
    method: 'Wire transfer',
    date: '2026-09-05',
    amount: 5600,
    plan: 'Enterprise',
    seats: 140,
  },
  {
    id: 'in_4014',
    customer: 'Elliot Brandt',
    email: 'elliot@zoning.app',
    avatar: '/avatars/people/08.jpg',
    status: 'pending',
    method: 'ACH transfer',
    date: '2026-09-04',
    amount: 320,
    plan: 'Team (monthly)',
    seats: 5,
  },
  {
    id: 'in_4013',
    customer: 'Nour Haddad',
    email: 'nour@carbonline.me',
    avatar: '/avatars/people/09.jpg',
    status: 'paid',
    method: 'Mastercard •• 2260',
    date: '2026-09-03',
    amount: 1120,
    plan: 'Scale (monthly)',
    seats: 18,
  },
  {
    id: 'in_4012',
    customer: 'Priya Venkat',
    email: 'priya@loomstack.in',
    avatar: '/avatars/people/10.jpg',
    status: 'paid',
    method: 'Visa •• 9033',
    date: '2026-09-02',
    amount: 240,
    plan: 'Team (monthly)',
    seats: 4,
  },
  {
    id: 'in_4011',
    customer: 'Kwame Mensah',
    email: 'kwame@arcfield.gh',
    avatar: '/avatars/people/11.jpg',
    status: 'failed',
    method: 'Visa •• 4477',
    date: '2026-09-02',
    amount: 780,
    plan: 'Team (annual)',
    seats: 12,
  },
  {
    id: 'in_4010',
    customer: 'Lena Fischer',
    email: 'lena@paperkite.ch',
    avatar: '/avatars/people/12.jpg',
    status: 'paid',
    method: 'Amex •• 7712',
    date: '2026-09-01',
    amount: 3200,
    plan: 'Enterprise',
    seats: 80,
  },
  {
    id: 'in_4009',
    customer: 'Owen Whitcombe',
    email: 'owen@tidepool.uk',
    avatar: '/avatars/people/13.jpg',
    status: 'paid',
    method: 'Visa •• 5521',
    date: '2026-08-31',
    amount: 96,
    plan: 'Starter (monthly)',
    seats: 1,
  },
  {
    id: 'in_4008',
    customer: 'Sara Lindqvist',
    email: 'sara@nordform.se',
    avatar: '/avatars/people/14.jpg',
    status: 'refunded',
    method: 'Mastercard •• 1044',
    date: '2026-08-30',
    amount: 420,
    plan: 'Team (monthly)',
    seats: 6,
  },
];

const STATUS_STYLE: Record<PaymentStatus, string> = {
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/20',
  pending:
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formatted by hand rather than by locale, so the server and client agree. */
function shortDate(iso: string) {
  const [, month, day] = iso.split('-');
  return `${MONTHS[Number(month) - 1]} ${Number(day)}`;
}

function StatusPill({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLE[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

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
    cell: (row) => <StatusPill status={row.status} />,
  },
  {
    id: 'date',
    header: 'Date',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => row.date,
    cell: (row) => <span className="tabular-nums">{shortDate(row.date)}</span>,
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

export default function DataTableDemo() {
  const [rows, setRows] = React.useState(PAYMENTS);
  const removed = PAYMENTS.length - rows.length;

  return (
    <div className="w-full py-4">
      <DataTable
        data={rows}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `payment from ${row.customer}`}
        caption="Payments from the last two weeks, with status, method, date and amount."
        quickFilter={{ columnId: 'status', label: 'Filter by status' }}
        totals={['amount']}
        onDelete={(ids) => setRows((current) => current.filter((row) => !ids.includes(row.id)))}
        toolbar={
          <>
            {removed > 0 && (
              <button
                type="button"
                onClick={() => setRows(PAYMENTS)}
                className="rounded-full px-2 text-sm font-medium text-neutral-500 underline underline-offset-2 transition-colors duration-100 ease-out hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
              >
                Restore {removed}
              </button>
            )}
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-full bg-neutral-900 px-4 text-sm font-medium text-neutral-100 transition-colors duration-100 ease-out hover:bg-neutral-800 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-neutral-300"
            >
              <IconDownload className="size-4" />
              Export
            </button>
          </>
        }
        selectable
        defaultSort={{ columnId: 'date', direction: 'desc' }}
        pageSize={6}
        renderDetail={(row) => (
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
            {[
              ['Invoice', row.id],
              ['Plan', row.plan],
              ['Seats', String(row.seats)],
              ['Method', row.method],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-neutral-500 dark:text-neutral-400">{label}</dt>
                <dd className="mt-0.5 font-medium text-neutral-900 tabular-nums dark:text-neutral-100">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        rowActions={(row) => (
          <button
            type="button"
            aria-label={`Open actions for ${row.customer}`}
            className="grid size-8 place-items-center rounded-xl text-neutral-400 transition-colors duration-100 ease-out hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
          >
            <IconMore className="size-4" />
          </button>
        )}
        bulkActions={({ ids, clear, remove }) => (
          <>
            <button
              type="button"
              onClick={clear}
              aria-label={`Export ${ids.length} payments`}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors duration-100 ease-out hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:hover:bg-black/10"
            >
              <IconDownload className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              type="button"
              onClick={remove}
              aria-label={`Delete ${ids.length} payments`}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-rose-300 transition-colors duration-100 ease-out hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:text-rose-700 dark:hover:bg-black/10"
            >
              <IconDelete className="size-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </>
        )}
      />
    </div>
  );
}
