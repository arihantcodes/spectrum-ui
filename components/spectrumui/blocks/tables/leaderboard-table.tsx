'use client';

import * as React from 'react';
import { DataTable, type DataTableColumn } from '@/components/spectrumui/data-table';

function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(2, 2.5)"
        d="M15.919,11.82 C15.66,12.071 15.541,12.434 15.6,12.79 L16.489,17.71 C16.564,18.127 16.388,18.549 16.039,18.79 C15.697,19.04 15.242,19.07 14.869,18.87 L10.44,16.56 C10.286,16.478 10.115,16.434 9.94,16.429 L9.669,16.429 C9.575,16.443 9.483,16.473 9.399,16.519 L4.969,18.84 C4.75,18.95 4.502,18.989 4.259,18.95 C3.667,18.838 3.272,18.274 3.369,17.679 L4.259,12.759 C4.318,12.4 4.199,12.035 3.94,11.78 L0.329,8.28 C0.027,7.987 -0.078,7.547 0.06,7.15 C0.194,6.754 0.536,6.465 0.949,6.4 L5.919,5.679 C6.297,5.64 6.629,5.41 6.799,5.07 L8.989,0.58 C9.041,0.48 9.108,0.388 9.189,0.31 L9.279,0.24 C9.326,0.188 9.38,0.145 9.44,0.11 L9.549,0.07 L9.719,0 L10.14,0 C10.516,0.039 10.847,0.264 11.02,0.6 L13.239,5.07 C13.399,5.397 13.71,5.624 14.069,5.679 L19.039,6.4 C19.459,6.46 19.81,6.75 19.949,7.15 C20.08,7.551 19.967,7.991 19.659,8.28 L15.919,11.82 Z"
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

interface Player {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  score: number;
  streak: number;
  moved: number;
}

const PLAYERS: Player[] = [
  {
    id: 'l1',
    rank: 1,
    name: 'Aiko Watanabe',
    handle: '@aiko',
    avatar: '/avatars/people/06.jpg',
    score: 12840,
    streak: 21,
    moved: 0,
  },
  {
    id: 'l2',
    rank: 2,
    name: 'Mateo Alvarez',
    handle: '@mateo',
    avatar: '/avatars/people/03.jpg',
    score: 11960,
    streak: 14,
    moved: 2,
  },
  {
    id: 'l3',
    rank: 3,
    name: 'Freya Lindgren',
    handle: '@freya',
    avatar: '/avatars/people/01.jpg',
    score: 11205,
    streak: 9,
    moved: -1,
  },
  {
    id: 'l4',
    rank: 4,
    name: 'Zara Osei',
    handle: '@zara',
    avatar: '/avatars/people/12.jpg',
    score: 9871,
    streak: 17,
    moved: 1,
  },
  {
    id: 'l5',
    rank: 5,
    name: 'Tomas Vega',
    handle: '@tomas',
    avatar: '/avatars/people/08.jpg',
    score: 9412,
    streak: 4,
    moved: -2,
  },
  {
    id: 'l6',
    rank: 6,
    name: 'Leila Haddad',
    handle: '@leila',
    avatar: '/avatars/people/05.jpg',
    score: 8730,
    streak: 11,
    moved: 0,
  },
  {
    id: 'l7',
    rank: 7,
    name: 'Nils Bakker',
    handle: '@nils',
    avatar: '/avatars/people/13.jpg',
    score: 8104,
    streak: 2,
    moved: 3,
  },
];

const MEDAL: Record<number, string> = {
  1: 'bg-amber-50 text-amber-700 ring-amber-600/25 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/25',
  2: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20 dark:bg-neutral-100/10 dark:text-neutral-300 dark:ring-white/15',
  3: 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-300/25',
};

const columns: DataTableColumn<Player>[] = [
  {
    id: 'rank',
    header: '#',
    sortable: true,
    numeric: true,
    align: 'center',
    width: 56,
    value: (row) => row.rank,
    cell: (row) =>
      row.rank <= 3 ? (
        <span
          className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset ${MEDAL[row.rank]}`}
        >
          {row.rank}
        </span>
      ) : (
        <span className="tabular-nums text-neutral-500 dark:text-neutral-400">{row.rank}</span>
      ),
  },
  {
    id: 'name',
    header: 'Player',
    sortable: true,
    value: (row) => row.name,
    cell: (row) => (
      <span className="flex items-center gap-2.5">
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
            {row.handle}
          </span>
        </span>
      </span>
    ),
  },
  {
    id: 'score',
    header: 'Score',
    sortable: true,
    numeric: true,
    value: (row) => row.score,
    cell: (row) => (
      <span className="font-medium text-neutral-900 dark:text-neutral-100">
        {row.score.toLocaleString('en-US')}
      </span>
    ),
  },
  {
    id: 'streak',
    header: 'Streak',
    sortable: true,
    numeric: true,
    hideBelow: 'sm',
    value: (row) => row.streak,
    cell: (row) => (
      <span className="inline-flex items-center gap-1.5 tabular-nums">
        <IconStar className="size-3.5 text-amber-500 dark:text-amber-400" />
        {row.streak} days
      </span>
    ),
  },
  {
    id: 'moved',
    header: 'This week',
    numeric: true,
    hideBelow: 'md',
    value: (row) => row.moved,
    cell: (row) =>
      row.moved === 0 ? (
        <span className="text-neutral-400 dark:text-neutral-500">—</span>
      ) : (
        <span
          className={`inline-flex items-center gap-1 font-medium tabular-nums ${
            row.moved > 0
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-rose-700 dark:text-rose-300'
          }`}
        >
          <DeltaChevron up={row.moved > 0} className="size-3" />
          {Math.abs(row.moved)}
        </span>
      ),
  },
];

export function LeaderboardTable({
  variant = 'Comfortable',
}: {
  variant?: 'Comfortable' | 'Striped';
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <DataTable
        data={PLAYERS}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Weekly leaderboard with rank medals, scores, streaks and movement."
        variant={variant === 'Striped' ? 'striped' : 'panel'}
        title="Leaderboard"
        defaultSort={{ columnId: 'rank', direction: 'asc' }}
      />
    </div>
  );
}
