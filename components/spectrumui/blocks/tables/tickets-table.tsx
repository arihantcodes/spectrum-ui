'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function IconDanger(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 3)"
        d="M8.628,0.353 C9.988,-0.401 11.717,0.094 12.477,1.442 L12.477,1.442 L19.746,14.057 C19.906,14.434 19.976,14.74 19.996,15.058 C20.036,15.801 19.776,16.524 19.266,17.079 C18.756,17.633 18.066,17.96 17.316,18 L17.316,18 L2.679,18 C2.369,17.981 2.059,17.911 1.769,17.802 C0.319,17.217 -0.381,15.572 0.209,14.146 L0.209,14.146 L7.528,1.433 C7.778,0.986 8.158,0.601 8.628,0.353 Z M9.998,12.273 C9.518,12.273 9.118,12.669 9.118,13.146 C9.118,13.62 9.518,14.018 9.998,14.018 C10.478,14.018 10.868,13.62 10.868,13.135 C10.868,12.66 10.478,12.273 9.998,12.273 Z M9.998,6.09 C9.518,6.09 9.118,6.476 9.118,6.952 L9.118,6.952 L9.118,9.756 C9.118,10.231 9.518,10.629 9.998,10.629 C10.478,10.629 10.868,10.231 10.868,9.756 L10.868,9.756 L10.868,6.952 C10.868,6.476 10.478,6.09 9.998,6.09 Z"
      />
    </svg>
  );
}

function IconTime(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 2)"
        d="M10,0 C15.53,0 20,4.48 20,10 C20,15.53 15.53,20 10,20 C4.48,20 0,15.53 0,10 C0,4.48 4.48,0 10,0 Z M9.65,4.93 C9.24,4.93 8.9,5.26 8.9,5.68 L8.9,5.68 L8.9,10.73 C8.9,10.99 9.04,11.23 9.27,11.37 L9.27,11.37 L13.19,13.71 C13.31,13.78 13.44,13.82 13.58,13.82 C13.83,13.82 14.08,13.69 14.22,13.45 C14.43,13.1 14.32,12.64 13.96,12.42 L13.96,12.42 L10.4,10.3 L10.4,5.68 C10.4,5.26 10.06,4.93 9.65,4.93 Z"
      />
    </svg>
  );
}

type Priority = 'urgent' | 'high' | 'normal';
type Status = 'open' | 'pending' | 'solved';

interface Ticket {
  id: string;
  subject: string;
  requester: string;
  requesterAvatar: string;
  priority: Priority;
  sla: string;
  breaching: boolean;
  assignee: string;
  assigneeAvatar: string;
  status: Status;
}

const TICKETS: Ticket[] = [
  {
    id: '#3128',
    subject: 'SSO login loops back to the sign-in page',
    requester: 'Jonas Keller',
    requesterAvatar: '/avatars/people/09.jpg',
    priority: 'urgent',
    sla: '38m left',
    breaching: true,
    assignee: 'Freya',
    assigneeAvatar: '/avatars/people/01.jpg',
    status: 'open',
  },
  {
    id: '#3127',
    subject: 'Webhooks delayed by ~10 minutes',
    requester: 'Zara Osei',
    requesterAvatar: '/avatars/people/12.jpg',
    priority: 'high',
    sla: '3h left',
    breaching: false,
    assignee: 'Mateo',
    assigneeAvatar: '/avatars/people/03.jpg',
    status: 'open',
  },
  {
    id: '#3126',
    subject: 'Cannot download August invoice PDF',
    requester: 'Nils Bakker',
    requesterAvatar: '/avatars/people/13.jpg',
    priority: 'normal',
    sla: '8h left',
    breaching: false,
    assignee: 'Aiko',
    assigneeAvatar: '/avatars/people/06.jpg',
    status: 'pending',
  },
  {
    id: '#3125',
    subject: 'Add seats mid-cycle proration question',
    requester: 'Leila Haddad',
    requesterAvatar: '/avatars/people/05.jpg',
    priority: 'normal',
    sla: '1d left',
    breaching: false,
    assignee: 'Freya',
    assigneeAvatar: '/avatars/people/01.jpg',
    status: 'pending',
  },
  {
    id: '#3124',
    subject: 'API returns 429 on burst traffic',
    requester: 'Tomas Vega',
    requesterAvatar: '/avatars/people/08.jpg',
    priority: 'high',
    sla: 'Met',
    breaching: false,
    assignee: 'Mateo',
    assigneeAvatar: '/avatars/people/03.jpg',
    status: 'solved',
  },
  {
    id: '#3123',
    subject: 'Dark mode logo renders on light emails',
    requester: 'Freya Lindgren',
    requesterAvatar: '/avatars/people/01.jpg',
    priority: 'normal',
    sla: 'Met',
    breaching: false,
    assignee: 'Aiko',
    assigneeAvatar: '/avatars/people/06.jpg',
    status: 'solved',
  },
];

const PRIORITY_RANK: Record<Priority, number> = { urgent: 0, high: 1, normal: 2 };

const PRIORITY_STYLE: Record<Priority, string> = {
  urgent: 'text-rose-700 dark:text-rose-300',
  high: 'text-amber-700 dark:text-amber-300',
  normal: 'text-neutral-500 dark:text-neutral-400',
};

const STATUS_STYLE: Record<Status, string> = {
  open: 'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  pending:
    'bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15',
  solved:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/25',
};

const columns: DataTableColumn<Ticket>[] = [
  {
    id: 'subject',
    header: 'Ticket',
    sortable: true,
    value: (row) => row.subject,
    cell: (row) => (
      <span className="block min-w-0 max-w-72">
        <span className="block truncate">{row.subject}</span>
        <span className="block text-xs font-normal text-neutral-500 dark:text-neutral-400">
          {row.id} · {row.requester}
        </span>
      </span>
    ),
  },
  {
    id: 'priority',
    header: 'Priority',
    sortable: true,
    value: (row) => PRIORITY_RANK[row.priority],
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 font-medium capitalize ${PRIORITY_STYLE[row.priority]}`}
      >
        {row.priority === 'normal' ? (
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        ) : (
          <IconDanger className="size-3.5" />
        )}
        {row.priority}
      </span>
    ),
  },
  {
    id: 'sla',
    header: 'SLA',
    hideBelow: 'sm',
    value: (row) => row.sla,
    cell: (row) => (
      <span
        className={`inline-flex items-center gap-1.5 tabular-nums ${
          row.breaching
            ? 'font-medium text-rose-700 dark:text-rose-300'
            : 'text-neutral-500 dark:text-neutral-400'
        }`}
      >
        <IconTime className="size-3.5" />
        {row.sla}
      </span>
    ),
  },
  {
    id: 'assignee',
    header: 'Assignee',
    sortable: true,
    hideBelow: 'md',
    value: (row) => row.assignee,
    cell: (row) => (
      <span className="flex items-center gap-2 font-normal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.assigneeAvatar}
          alt=""
          loading="lazy"
          width={20}
          height={20}
          className="size-5 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        {row.assignee}
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
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLE[row.status]}`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {row.status}
      </span>
    ),
  },
];

export function TicketsTable({ variant = 'Comfortable' }: { variant?: 'Comfortable' | 'Striped' }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={TICKETS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => `ticket ${row.id}`}
        caption="Open support tickets with priority, SLA countdown and assignee."
        variant={variant === 'Striped' ? 'striped' : 'default'}
        title="Tickets"
        quickFilter={{ columnId: 'status', label: 'Filter by status' }}
        defaultSort={{ columnId: 'priority', direction: 'asc' }}
      />
    </div>
  );
}
