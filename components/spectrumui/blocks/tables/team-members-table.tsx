'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

type IconProps = React.SVGProps<SVGSVGElement>;

function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3.5, 2)"
        d="M9.071,0.1 L15.708,2.327 C16.451,2.575 16.954,3.257 16.958,4.022 L17,10.663 C17.013,12.676 16.279,14.628 14.935,16.158 C14.317,16.86 13.525,17.463 12.513,18.002 L8.945,19.91 C8.833,19.969 8.71,19.999 8.587,20 C8.463,20.001 8.339,19.972 8.228,19.914 L4.627,18.051 C3.604,17.52 2.805,16.926 2.181,16.233 C0.814,14.719 0.055,12.776 0.042,10.76 L0,4.124 C-0.004,3.358 0.489,2.671 1.228,2.413 L7.841,0.106 C8.233,-0.033 8.671,-0.036 9.071,0.1 Z M12.245,7.219 C11.948,6.933 11.47,6.935 11.177,7.225 L11.177,7.225 L7.808,10.545 L6.429,9.219 C6.132,8.934 5.655,8.937 5.361,9.226 C5.068,9.515 5.071,9.98 5.368,10.265 L5.368,10.265 L7.284,12.109 C7.433,12.252 7.626,12.323 7.819,12.321 C8.012,12.32 8.205,12.247 8.352,12.102 L8.352,12.102 L12.251,8.258 C12.544,7.969 12.541,7.504 12.245,7.219 Z"
      />
    </svg>
  );
}

function IconMore(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 2)"
        d="M10,0 C15.52,0 20,4.48 20,10 C20,15.52 15.52,20 10,20 C4.47,20 0,15.52 0,10 C0,4.48 4.47,0 10,0 Z M14.48,8.801 C13.81,8.801 13.28,9.34 13.28,10 C13.28,10.66 13.81,11.2 14.48,11.2 C15.14,11.2 15.67,10.66 15.67,10 C15.67,9.34 15.14,8.801 14.48,8.801 Z M10,8.801 C9.34,8.801 8.8,9.34 8.8,10 C8.8,10.66 9.34,11.2 10,11.2 C10.66,11.2 11.19,10.66 11.19,10 C11.19,9.34 10.66,8.801 10,8.801 Z M5.52,8.801 C4.86,8.801 4.32,9.34 4.32,10 C4.32,10.66 4.86,11.2 5.52,11.2 C6.18,11.2 6.71,10.66 6.71,10 C6.71,9.34 6.18,8.801 5.52,8.801 Z"
      />
    </svg>
  );
}

type Role = 'Owner' | 'Admin' | 'Editor' | 'Viewer';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  twoFactor: boolean;
  lastActive: string;
}

const MEMBERS: Member[] = [
  {
    id: 'u1',
    name: 'Freya Lindgren',
    email: 'freya@driftlab.se',
    avatar: '/avatars/people/01.jpg',
    role: 'Owner',
    twoFactor: true,
    lastActive: 'Now',
  },
  {
    id: 'u2',
    name: 'Mateo Alvarez',
    email: 'mateo@driftlab.se',
    avatar: '/avatars/people/03.jpg',
    role: 'Admin',
    twoFactor: true,
    lastActive: '5 min ago',
  },
  {
    id: 'u3',
    name: 'Aiko Watanabe',
    email: 'aiko@driftlab.se',
    avatar: '/avatars/people/06.jpg',
    role: 'Editor',
    twoFactor: true,
    lastActive: '1 hour ago',
  },
  {
    id: 'u4',
    name: 'Jonas Keller',
    email: 'jonas@driftlab.se',
    avatar: '/avatars/people/09.jpg',
    role: 'Editor',
    twoFactor: false,
    lastActive: 'Yesterday',
  },
  {
    id: 'u5',
    name: 'Zara Osei',
    email: 'zara@driftlab.se',
    avatar: '/avatars/people/12.jpg',
    role: 'Editor',
    twoFactor: true,
    lastActive: '2 days ago',
  },
  {
    id: 'u6',
    name: 'Nils Bakker',
    email: 'nils@driftlab.se',
    avatar: '/avatars/people/13.jpg',
    role: 'Viewer',
    twoFactor: false,
    lastActive: 'Aug 30',
  },
  {
    id: 'u7',
    name: 'Leila Haddad',
    email: 'leila@driftlab.se',
    avatar: '/avatars/people/05.jpg',
    role: 'Viewer',
    twoFactor: true,
    lastActive: 'Aug 27',
  },
];

const ROLE_RANK: Record<Role, number> = { Owner: 0, Admin: 1, Editor: 2, Viewer: 3 };

const columns: DataTableColumn<Member>[] = [
  {
    id: 'name',
    header: 'Member',
    sortable: true,
    value: (row) => row.name,
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
          <span className="block truncate">{row.name}</span>
          <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.email}
          </span>
        </span>
      </div>
    ),
  },
  {
    id: 'role',
    header: 'Role',
    sortable: true,
    value: (row) => ROLE_RANK[row.role],
    cell: (row) => (
      <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 ring-1 ring-inset ring-neutral-500/15 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15">
        {row.role}
      </span>
    ),
  },
  {
    id: 'twoFactor',
    header: '2FA',
    sortable: true,
    hideBelow: 'sm',
    value: (row) => row.twoFactor,
    cell: (row) =>
      row.twoFactor ? (
        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
          <IconShield className="size-4" />
          Enabled
        </span>
      ) : (
        <span className="text-neutral-400 dark:text-neutral-500">Off</span>
      ),
  },
  {
    id: 'lastActive',
    header: 'Last active',
    hideBelow: 'md',
    value: (row) => row.lastActive,
  },
];

export function TeamMembersTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Compact';
}) {
  const [members, setMembers] = React.useState(MEMBERS);
  const removed = MEMBERS.length - members.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <DataTable
        data={members}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Workspace members with role, two-factor status and last activity."
        density={variant === 'Compact' ? 'compact' : 'default'}
        title="Members"
        quickFilter={{
          columnId: 'role',
          label: 'Filter by role',
          getValue: (row) => row.role,
        }}
        selectable
        defaultSort={{ columnId: 'role', direction: 'asc' }}
        onDelete={(ids) => setMembers((current) => current.filter((row) => !ids.includes(row.id)))}
        toolbar={
          removed > 0 ? (
            <button
              type="button"
              onClick={() => setMembers(MEMBERS)}
              className="rounded-full px-2 text-sm font-medium text-neutral-500 underline underline-offset-2 transition-colors duration-100 ease-out hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
            >
              Restore {removed}
            </button>
          ) : null
        }
        rowActions={(row) => (
          <button
            type="button"
            aria-label={`Open actions for ${row.name}`}
            className="grid size-8 place-items-center rounded-xl text-neutral-400 transition-colors duration-100 ease-out hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-hidden dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-300"
          >
            <IconMore className="size-[18px]" />
          </button>
        )}
        bulkActions={({ ids, remove }) => (
          <button
            type="button"
            onClick={remove}
            className="rounded-full px-2.5 py-1.5 text-sm font-medium text-rose-300 transition-colors duration-100 ease-out hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:text-rose-700 dark:hover:bg-black/10"
          >
            Remove {ids.length === 1 ? 'member' : `${ids.length} members`}
          </button>
        )}
      />
    </div>
  );
}
