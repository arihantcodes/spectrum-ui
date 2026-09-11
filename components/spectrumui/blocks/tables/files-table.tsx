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

function IconFolder(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2)"
        d="M7.05,0 C7.981,-0.01 8.85,0.42 9.42,1.15 L9.42,1.15 L10.3,2.32 C10.58,2.67 11,2.88 11.45,2.88 L11.45,2.88 L14.52,2.88 C18.21,2.88 20.01,4.85 20,8.89 L20,8.89 L20,13.76 C20,17.62 17.62,20 13.75,20 L13.75,20 L6.24,20 C2.39,20 0,17.62 0,13.75 L0,13.75 L0,6.24 C0,2.1 1.84,0 5.47,0 L5.47,0 Z M14.63,11.79 L5.37,11.79 C4.95,11.79 4.62,12.12 4.62,12.54 C4.62,12.95 4.95,13.29 5.37,13.29 L5.37,13.29 L14.63,13.29 C15.04,13.29 15.37,12.95 15.37,12.54 C15.37,12.12 15.04,11.79 14.63,11.79 L14.63,11.79 Z"
      />
    </Glyph>
  );
}

function IconPaper(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(3.5, 2)"
        d="M9.752,0 C10.01,0 10.208,0.21 10.208,0.46 L10.208,0.46 L10.208,3.68 C10.208,5.51 11.703,7.01 13.515,7.02 C14.267,7.02 14.861,7.03 15.317,7.03 L15.485,7.029 C15.79,7.027 16.2,7.02 16.554,7.02 C16.802,7.02 17,7.22 17,7.47 L17,7.47 L17,15.51 C17,17.99 15.01,20 12.554,20 L12.554,20 L4.673,20 C2.099,20 0,17.89 0,15.29 L0,15.29 L0,4.51 C0,2.03 2,0 4.465,0 L4.465,0 Z M10.812,12.9 L5.426,12.9 C5.02,12.9 4.683,13.23 4.683,13.64 C4.683,14.05 5.02,14.39 5.426,14.39 L5.426,14.39 L10.812,14.39 C11.218,14.39 11.554,14.05 11.554,13.64 C11.554,13.23 11.218,12.9 10.812,12.9 L10.812,12.9 Z M8.772,7.9 L5.426,7.9 C5.02,7.9 4.683,8.24 4.683,8.65 C4.683,9.06 5.02,9.39 5.426,9.39 L5.426,9.39 L8.772,9.39 C9.178,9.39 9.515,9.06 9.515,8.65 C9.515,8.24 9.178,7.9 8.772,7.9 L8.772,7.9 Z M11.651,0.906 C11.651,0.475 12.169,0.261 12.465,0.572 C13.535,1.696 15.405,3.661 16.451,4.759 C16.74,5.062 16.528,5.565 16.111,5.566 C15.297,5.569 14.338,5.566 13.648,5.559 C12.553,5.559 11.651,4.648 11.651,3.542 L11.651,3.542 Z"
      />
    </Glyph>
  );
}

function IconImage(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2)"
        d="M14.334,0 C17.723,0 20,2.378 20,5.917 L20,14.083 C20,17.622 17.723,20 14.333,20 L5.666,20 C2.277,20 0,17.622 0,14.083 L0,5.917 C0,2.378 2.277,0 5.666,0 L14.334,0 Z M15.437,10.55 C14.365,9.881 13.537,10.82 13.314,11.121 C13.099,11.411 12.914,11.731 12.719,12.051 C12.242,12.84 11.696,13.75 10.751,14.28 C9.377,15.04 8.334,14.34 7.584,13.83 C7.302,13.64 7.029,13.46 6.756,13.341 C6.085,13.051 5.48,13.381 4.583,14.52 C4.113,15.116 3.646,15.706 3.174,16.294 C2.891,16.646 2.958,17.189 3.34,17.424 C3.948,17.799 4.69,18 5.529,18 L13.956,18 C14.432,18 14.909,17.935 15.363,17.786 C16.387,17.452 17.199,16.686 17.624,15.675 C17.982,14.825 18.156,13.793 17.821,12.934 C17.709,12.649 17.542,12.384 17.308,12.151 C16.694,11.541 16.119,10.971 15.437,10.55 Z M6.499,4 C5.12,4 4,5.122 4,6.5 C4,7.878 5.12,9 6.499,9 C7.876,9 8.998,7.878 8.998,6.5 C8.998,5.122 7.876,4 6.499,4 Z"
      />
    </Glyph>
  );
}

function IconVideo(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 4.5)"
        d="M9.905,0 C12.327,0 14.018,1.669 14.018,4.061 L14.018,10.939 C14.018,13.331 12.327,15 9.905,15 L4.113,15 C1.691,15 0,13.331 0,10.939 L0,4.061 C0,1.669 1.691,0 4.113,0 L9.905,0 Z M17.958,2.379 C18.397,2.156 18.912,2.179 19.331,2.443 C19.75,2.706 20,3.163 20,3.662 L20,11.338 C20,11.839 19.75,12.295 19.331,12.558 C19.102,12.701 18.846,12.774 18.588,12.774 C18.373,12.774 18.158,12.723 17.957,12.621 L16.476,11.873 C15.928,11.595 15.588,11.037 15.588,10.417 L15.588,4.583 C15.588,3.962 15.928,3.403 16.476,3.127 L17.958,2.379 Z"
      />
    </Glyph>
  );
}

type Kind = 'folder' | 'doc' | 'image' | 'video';

interface Entry {
  id: string;
  name: string;
  kind: Kind;
  meta: string;
  size: number | null;
  shared: string[];
  modified: string;
}

const ENTRIES: Entry[] = [
  {
    id: 'e1',
    name: 'Brand refresh',
    kind: 'folder',
    meta: '24 items',
    size: null,
    shared: ['/avatars/people/01.jpg', '/avatars/people/03.jpg', '/avatars/people/06.jpg'],
    modified: 'Today',
  },
  {
    id: 'e2',
    name: 'Q3 board deck.key',
    kind: 'doc',
    meta: 'Keynote',
    size: 48_400_000,
    shared: ['/avatars/people/01.jpg', '/avatars/people/05.jpg'],
    modified: 'Yesterday',
  },
  {
    id: 'e3',
    name: 'hero-banner@2x.png',
    kind: 'image',
    meta: 'PNG · 2880×1620',
    size: 6_200_000,
    shared: ['/avatars/people/12.jpg'],
    modified: 'Sep 6',
  },
  {
    id: 'e4',
    name: 'onboarding-walkthrough.mp4',
    kind: 'video',
    meta: 'MP4 · 4m 12s',
    size: 184_000_000,
    shared: ['/avatars/people/03.jpg', '/avatars/people/13.jpg'],
    modified: 'Sep 5',
  },
  {
    id: 'e5',
    name: 'Pricing research',
    kind: 'folder',
    meta: '9 items',
    size: null,
    shared: ['/avatars/people/05.jpg'],
    modified: 'Sep 4',
  },
  {
    id: 'e6',
    name: 'annual-report-draft.pdf',
    kind: 'doc',
    meta: 'PDF · 32 pages',
    size: 12_800_000,
    shared: [
      '/avatars/people/01.jpg',
      '/avatars/people/06.jpg',
      '/avatars/people/08.jpg',
      '/avatars/people/12.jpg',
    ],
    modified: 'Sep 2',
  },
];

const KIND_ICON: Record<Kind, (props: IconProps) => React.ReactElement> = {
  folder: (props) => <IconFolder {...props} />,
  doc: (props) => <IconPaper {...props} />,
  image: (props) => <IconImage {...props} />,
  video: (props) => <IconVideo {...props} />,
};

function formatSize(bytes: number | null) {
  if (bytes === null) return '—';
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1000)} KB`;
}

const columns: DataTableColumn<Entry>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    value: (row) => row.name,
    cell: (row) => (
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
        >
          {KIND_ICON[row.kind]({ className: 'size-4' })}
        </span>
        <span className="min-w-0">
          <span className="block truncate">{row.name}</span>
          <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {row.meta}
          </span>
        </span>
      </span>
    ),
  },
  {
    id: 'size',
    header: 'Size',
    sortable: true,
    numeric: true,
    value: (row) => row.size ?? -1,
    cell: (row) => formatSize(row.size),
  },
  {
    id: 'shared',
    header: 'Shared with',
    hideBelow: 'sm',
    value: (row) => String(row.shared.length),
    cell: (row) => (
      <span className="flex -space-x-1.5">
        {row.shared.slice(0, 4).map((avatar) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={avatar}
            src={avatar}
            alt=""
            loading="lazy"
            width={24}
            height={24}
            className="size-6 rounded-full object-cover ring-2 ring-white dark:ring-neutral-950"
          />
        ))}
      </span>
    ),
  },
  {
    id: 'modified',
    header: 'Modified',
    sortable: true,
    hideBelow: 'md',
    value: (row) => row.modified,
  },
];

export function FilesTable({ variant = 'Comfortable' }: { variant?: 'Comfortable' | 'Compact' }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <DataTable
        data={ENTRIES}
        columns={columns}
        rowId={(row) => row.id}
        rowLabel={(row) => row.name}
        caption="Shared drive contents with file types, sizes and collaborators."
        density={variant === 'Compact' ? 'compact' : 'default'}
        variant="minimal"
        title="Shared drive"
        searchable
        searchPlaceholder="Search files"
      />
    </div>
  );
}
