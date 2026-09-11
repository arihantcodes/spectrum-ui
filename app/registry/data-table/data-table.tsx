'use client';

import * as React from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'motion/react';

import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------
 * Iconly on a 24px grid, recolored with `currentColor`. Outline (Light) is the
 * idle mark — search, clear — and fill (Bold) is reserved for a state that is
 * already on: a copied tick, a document in the empty body.
 * ------------------------------------------------------------------------- */

type IconProps = React.SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

/** 1.5px stroke beside regular (400) text. */
function StrokeGlyph({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Iconly / Bold / Arrow - Down 2, rotated for the other three directions. */
function IconChevron(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(6, 7)"
        d="M4.869,9.631 C4.811,9.574 4.563,9.361 4.359,9.162 C3.076,7.997 0.976,4.958 0.335,3.367 C0.232,3.125 0.014,2.514 0,2.188 C0,1.875 0.072,1.577 0.218,1.293 C0.422,0.938 0.743,0.654 1.122,0.498 C1.385,0.397 2.172,0.242 2.186,0.242 C3.047,0.086 4.446,0 5.992,0 C7.465,0 8.807,0.086 9.681,0.213 C9.695,0.228 10.673,0.384 11.008,0.554 C11.62,0.867 12,1.478 12,2.132 L12,2.188 C11.985,2.614 11.605,3.509 11.591,3.509 C10.949,5.014 8.952,7.983 7.625,9.177 C7.625,9.177 7.284,9.513 7.071,9.659 C6.765,9.887 6.386,10 6.007,10 C5.584,10 5.19,9.872 4.869,9.631"
      />
    </Glyph>
  );
}

/** Iconly / Light / Search — outline, because a search field is idle until it has a query. */
function IconSearch(props: IconProps) {
  return (
    <StrokeGlyph {...props}>
      <circle cx="11.7666" cy="11.7666" r="8.98856" />
      <path d="M18.0183 18.4851L21.5423 22" />
    </StrokeGlyph>
  );
}

/** Iconly / Light / Close — the trailing clear on the search field. */
function IconCloseLine(props: IconProps) {
  return (
    <StrokeGlyph {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </StrokeGlyph>
  );
}

/** Iconly / Bold / Close Square. */
function IconClose(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2)"
        d="M14.34,0 C17.73,0 20,2.38 20,5.92 L20,5.92 L20,14.091 C20,17.621 17.73,20 14.34,20 L14.34,20 L5.67,20 C2.28,20 0,17.621 0,14.091 L0,14.091 L0,5.92 C0,2.38 2.28,0 5.67,0 L5.67,0 Z M13.01,6.971 C12.67,6.63 12.12,6.63 11.77,6.971 L11.77,6.971 L10,8.75 L8.22,6.971 C7.87,6.63 7.32,6.63 6.98,6.971 C6.64,7.311 6.64,7.871 6.98,8.21 L6.98,8.21 L8.76,9.991 L6.98,11.761 C6.64,12.111 6.64,12.661 6.98,13 C7.15,13.17 7.38,13.261 7.6,13.261 C7.83,13.261 8.05,13.17 8.22,13 L8.22,13 L10,11.231 L11.78,13 C11.95,13.181 12.17,13.261 12.39,13.261 C12.62,13.261 12.84,13.17 13.01,13 C13.35,12.661 13.35,12.111 13.01,11.771 L13.01,11.771 L11.23,9.991 L13.01,8.21 C13.35,7.871 13.35,7.311 13.01,6.971 Z"
      />
    </Glyph>
  );
}

/** Iconly / Bold / Document — the empty state. */
function IconDocument(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(3, 2)"
        d="M13.191,0 C16.28,0 18,1.78 18,4.83 L18,4.83 L18,15.16 C18,18.26 16.28,20 13.191,20 L13.191,20 L4.81,20 C1.77,20 0,18.26 0,15.16 L0,15.16 L0,4.83 C0,1.78 1.77,0 4.81,0 L4.81,0 Z M5.08,13.74 C4.78,13.71 4.49,13.85 4.33,14.11 C4.17,14.36 4.17,14.69 4.33,14.95 C4.49,15.2 4.78,15.35 5.08,15.31 L5.08,15.31 L12.92,15.31 C13.319,15.27 13.62,14.929 13.62,14.53 C13.62,14.12 13.319,13.78 12.92,13.74 L12.92,13.74 Z M12.92,9.179 L5.08,9.179 C4.649,9.179 4.3,9.53 4.3,9.96 C4.3,10.39 4.649,10.74 5.08,10.74 L5.08,10.74 L12.92,10.74 C13.35,10.74 13.7,10.39 13.7,9.96 C13.7,9.53 13.35,9.179 12.92,9.179 L12.92,9.179 Z M8.069,4.65 L5.08,4.65 L5.08,4.66 C4.649,4.66 4.3,5.01 4.3,5.44 C4.3,5.87 4.649,6.22 5.08,6.22 L5.08,6.22 L8.069,6.22 C8.5,6.22 8.85,5.87 8.85,5.429 C8.85,5 8.5,4.65 8.069,4.65 L8.069,4.65 Z"
      />
    </Glyph>
  );
}

/** Iconly / Bold / Copy 2 — the clipboard action. */
function IconCopy(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M15.565,6.686 C15.709,6.686 15.825,6.57 15.825,6.426 C15.825,4.076 14.315,2.496 12.055,2.496 L6.285,2.496 C4.025,2.496 2.505,4.076 2.505,6.426 L2.505,11.866 C2.505,14.226 4.025,15.806 6.285,15.806 L6.375,15.806 C6.541,15.806 6.675,15.672 6.675,15.506 L6.675,12.126 C6.675,8.976 8.895,6.686 11.945,6.686 L15.565,6.686 Z" />
      <path d="M17.722,8.186 L11.949,8.186 C9.691,8.186 8.175,9.77 8.175,12.126 L8.175,17.565 C8.175,19.921 9.691,21.505 11.949,21.505 L17.721,21.505 C19.978,21.505 21.495,19.921 21.495,17.565 L21.495,12.126 C21.495,9.77 19.979,8.186 17.722,8.186 Z" />
    </Glyph>
  );
}

/** Iconly / Bold / Tick Square — the copied confirmation. */
function IconTickSquare(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        transform="translate(2, 2)"
        d="M14.34,0 C17.73,0 20,2.38 20,5.92 L20,14.091 C20,17.62 17.73,20 14.34,20 L5.67,20 C2.28,20 0,17.62 0,14.091 L0,5.92 C0,2.38 2.28,0 5.67,0 L14.34,0 Z M14.18,7 C13.84,6.66 13.28,6.66 12.94,7 L8.81,11.13 L7.06,9.38 C6.72,9.04 6.16,9.04 5.82,9.38 C5.48,9.72 5.48,10.27 5.82,10.62 L8.2,12.99 C8.37,13.16 8.59,13.24 8.81,13.24 C9.04,13.24 9.26,13.16 9.43,12.99 L14.18,8.24 C14.52,7.9 14.52,7.35 14.18,7 Z"
      />
    </Glyph>
  );
}

/* ------------------------------------------------------------------------- */

export type DataTableVariant = 'default' | 'bordered' | 'striped' | 'minimal' | 'panel';
export type DataTableDensity = 'compact' | 'default' | 'relaxed';
export type DataTableAlign = 'start' | 'center' | 'end';
export type DataTableSortDirection = 'asc' | 'desc';
export type DataTableValue = string | number | boolean | Date | null | undefined;

export interface DataTableSort {
  columnId: string;
  direction: DataTableSortDirection;
}

export interface DataTableColumn<T> {
  /** Stable key. Doubles as the property read off the row when `value` is absent. */
  id: string;
  header: React.ReactNode;
  /** Rendered cell. Falls back to the column's value, printed as text. */
  cell?: (row: T, index: number) => React.ReactNode;
  /** The comparable, searchable value behind a cell that renders markup. */
  value?: (row: T) => DataTableValue;
  align?: DataTableAlign;
  width?: number | string;
  sortable?: boolean;
  /** End-aligns the column and switches it to tabular figures so digits line up. */
  numeric?: boolean;
  /** Drop the column below this breakpoint instead of letting the table scroll. */
  hideBelow?: 'sm' | 'md' | 'lg';
  /** Renders this column's footer sum. Defaults to a grouped integer. */
  formatTotal?: (sum: number) => string;
  className?: string;
  headerClassName?: string;
}

export interface DataTableQuickFilterOption {
  value: string;
  label?: React.ReactNode;
}

export interface DataTableQuickFilter<T> {
  /** Column whose value the pills match against. */
  columnId: string;
  /** Accessible name for the pill group, e.g. "Filter by status". */
  label?: string;
  /** Read the matchable value off a row when the column's own value is not a plain string. */
  getValue?: (row: T) => string;
  /** Defaults to the distinct values of the column, in data order. */
  options?: DataTableQuickFilterOption[];
  allLabel?: string;
}

export interface DataTableSelectionContext<T> {
  ids: string[];
  rows: T[];
  clear: () => void;
  /** Sweep the selected rows out to the left, then fire `onDelete`. */
  remove: () => void;
}

export interface DataTableRowActionContext {
  /** Sweep this one row out, then fire `onDelete` with its id. */
  remove: () => void;
}

export interface DataTableProps<T> {
  data: readonly T[];
  columns: DataTableColumn<T>[];
  /** Stable identity per row. Selection and disclosure are keyed on it. */
  rowId: (row: T) => string;
  /** Names a row for screen readers, e.g. on its checkbox. Defaults to the first cell. */
  rowLabel?: (row: T) => string;

  variant?: DataTableVariant;
  density?: DataTableDensity;

  /** Sentence describing the table for screen readers. Never painted. */
  caption?: string;
  /** Heading at the start of the toolbar. */
  title?: React.ReactNode;
  /** Controls parked at the end of the toolbar. */
  toolbar?: React.ReactNode;

  searchable?: boolean;
  searchPlaceholder?: string;
  /** Override the haystack a query runs against. */
  searchText?: (row: T) => string;

  /** One-tap value pills at the end of the toolbar, with live counts. */
  quickFilter?: DataTableQuickFilter<T>;

  defaultSort?: DataTableSort | null;
  sort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;

  selectable?: boolean;
  defaultSelectedIds?: string[];
  selectedIds?: string[];
  onSelectedChange?: (ids: string[]) => void;
  /** Actions for the bar that rises over the rows once something is selected. */
  bulkActions?: (context: DataTableSelectionContext<T>) => React.ReactNode;

  /** Panel revealed under a row by a leading disclosure button. One at a time. */
  renderDetail?: (row: T) => React.ReactNode;
  /** Trailing cell, revealed on row hover and on keyboard focus. */
  rowActions?: (row: T, actions: DataTableRowActionContext) => React.ReactNode;

  /**
   * Fires once the removal animation has finished, with the ids that left.
   * Delete them from your own data here — the table has already cleared them
   * from the screen, so nothing flashes back in.
   */
  onDelete?: (ids: string[]) => void;

  /** Rows per page. Omit to render every row. */
  pageSize?: number;

  loading?: boolean;
  skeletonRows?: number;
  emptyState?: React.ReactNode;

  onRowClick?: (row: T) => void;

  /**
   * Arrow-key row cursor, Shift range selection and the ⌘A / ⌘C / Space
   * shortcuts. The grid takes one Tab stop and moves a ring instead of focus.
   */
  keyboardNavigation?: boolean;
  /** Copy the selected rows to the clipboard as TSV, ready to paste into a sheet. */
  clipboard?: boolean;
  /** Column ids to sum in a footer row that recounts as you filter. */
  totals?: string[];
  /** Drag a header's trailing edge to resize it; arrow keys do it too. */
  resizableColumns?: boolean;
  /** Keep the leading cells in place while the table scrolls sideways. */
  pinFirstColumn?: boolean;

  stickyHeader?: boolean;
  /** Caps the scroll area, e.g. `360` or `"60vh"`. Pairs with `stickyHeader`. */
  maxHeight?: number | string;
  /** Set false to drop the reorder, disclosure and selection motion. */
  animate?: boolean;

  className?: string;
}

/* The house spring presets. Fluid repositions things that were already on
 * screen — rows finding a new sort order, a panel opening. Springs retarget
 * from the live value, so clicking a header again mid-flight redirects the
 * motion already running instead of restarting it. */
const SPRING_FLUID = { type: 'spring', stiffness: 300, damping: 30 } as const;
/* Snappy is the micro-pop: the sort caret and the disclosure chevron. */
const SPRING_SNAPPY = { type: 'spring', stiffness: 500, damping: 28 } as const;
/* Contextual icon swaps: scale, opacity, blur. Bounce stays 0. */
const SPRING_ICON = { type: 'spring', duration: 0.3, bounce: 0 } as const;
/* Entrance is for something arriving over the content, i.e. the bulk bar. */
const SPRING_ENTRANCE = { type: 'spring', stiffness: 260, damping: 20 } as const;
/* Press feedback is always 0.96; anything below 0.95 reads as a squash.
 * Named properties so this can sit on the same node as a color hover. */
const PRESS =
  'transition-[transform,color,background-color,opacity,border-color] duration-150 ease-out active:scale-[0.96]';
/* Stroke length is not a position or a scale, so it takes an ease. */
const DRAW = { duration: 0.18, ease: 'easeOut' } as const;
/**
 * A row leaving. It accelerates away to the start edge rather than easing to a
 * stop, the way water pulls back off sand — and because rows leave on a
 * stagger, the set drains as one wave instead of blinking out together.
 */
const UNDERTOW = { duration: 0.42, ease: [0.32, 0, 0.67, 0] } as const;
/** Gap between one row leaving and the next. Slow enough to read as a run. */
const WAVE_STEP = 0.06;
const INSTANT = { duration: 0 } as const;

const FOCUS =
  'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300';
const EASE = 'ease-[cubic-bezier(0.2,0,0,1)]';

const DENSITY: Record<DataTableDensity, { head: string; cell: string; text: string; pad: string }> =
  {
    // 13px is off the type scale on purpose: at `text-xs` a dense table stops
    // being readable, and at `text-sm` it stops being dense.
    compact: { head: 'h-9', cell: 'py-1.5', text: 'text-[13px]', pad: 'px-3' },
    default: { head: 'h-11', cell: 'py-2.5', text: 'text-sm', pad: 'px-4' },
    relaxed: { head: 'h-12', cell: 'py-4', text: 'text-sm', pad: 'px-5' },
  };

interface Surface {
  frame: string;
  head: string;
  /** Under the header row. Lives on the cells so a sticky header keeps it. */
  headRule: string;
  /**
   * Fill for a pinned header, where the variant's own is transparent. A sticky
   * header floats over the rows, so a see-through one reads them right through.
   */
  headPinned?: string;
  divider: string;
  /**
   * Opaque fill behind every row. Two rows swapping places during a re-sort
   * pass over each other, and with no fill the text of both shows at once.
   * Hover and selection tint the cells instead, so they layer on top of this.
   */
  rowFill: string;
  stripe: string;
  cell: string;
}

const SURFACE: Record<DataTableVariant, Surface> = {
  default: {
    frame:
      'rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950',
    head: 'bg-neutral-50 dark:bg-neutral-900',
    headRule: 'border-b border-neutral-200 dark:border-neutral-800',
    divider: 'border-t border-neutral-100 dark:border-neutral-900',
    rowFill: 'bg-white dark:bg-neutral-950',
    stripe: '',
    cell: '',
  },
  bordered: {
    frame:
      'rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950',
    head: 'bg-neutral-50 dark:bg-neutral-900',
    headRule: 'border-b border-neutral-200 dark:border-neutral-800',
    divider: 'border-t border-neutral-200 dark:border-neutral-800',
    rowFill: 'bg-white dark:bg-neutral-950',
    stripe: '',
    cell: 'border-s border-neutral-200 first:border-s-0 dark:border-neutral-800',
  },
  striped: {
    frame:
      'rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950',
    head: 'bg-white dark:bg-neutral-950',
    headRule: 'border-b border-neutral-200 dark:border-neutral-800',
    divider: '',
    rowFill: 'bg-white dark:bg-neutral-950',
    stripe: 'bg-neutral-50 dark:bg-neutral-900',
    cell: '',
  },
  minimal: {
    frame: 'bg-transparent',
    head: 'bg-transparent',
    headPinned: 'bg-white dark:bg-neutral-950',
    headRule: 'border-b border-neutral-200 dark:border-neutral-800',
    divider: 'border-t border-neutral-100 dark:border-neutral-900',
    // No frame to sit on, so no fill either.
    rowFill: 'bg-transparent',
    stripe: '',
    cell: '',
  },
  panel: {
    frame:
      'rounded-2xl bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0_rgba(0,0,0,0.04)] ring-1 ring-neutral-950/8 dark:bg-neutral-950 dark:shadow-none dark:ring-white/10',
    head: 'bg-neutral-50 dark:bg-neutral-900',
    headRule: 'border-b border-neutral-200 dark:border-neutral-800',
    divider: 'border-t border-neutral-100 dark:border-neutral-900',
    rowFill: 'bg-white dark:bg-neutral-950',
    stripe: '',
    cell: '',
  },
};

const ALIGN: Record<DataTableAlign, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

/** Leading control cells are fixed width, so pin offsets need no measuring. */
const DETAIL_COL = 40;
const SELECT_COL = 48;
const MIN_COL = 72;

const HIDE_BELOW = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
} as const;

function isEmpty(value: DataTableValue) {
  return value === null || value === undefined || value === '';
}

function compare(a: DataTableValue, b: DataTableValue) {
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b);
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

function readValue<T>(column: DataTableColumn<T> | undefined, row: T): DataTableValue {
  if (!column) return undefined;
  if (column.value) return column.value(row);
  return (row as Record<string, unknown>)[column.id] as DataTableValue;
}

function printValue(value: DataTableValue) {
  if (isEmpty(value)) return '';
  // ISO rather than a locale format: a client component also renders on the
  // server, and a locale mismatch there is a hydration error.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/**
 * A footer sum that rolls to its new value. Written straight to the DOM node:
 * a spring firing setState 60 times a second would re-render the whole table.
 */
function RollingTotal({
  value,
  format,
  instant,
}: {
  value: number;
  format: (sum: number) => string;
  instant: boolean;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const spring = useSpring(value, { stiffness: 260, damping: 30 });

  React.useEffect(() => {
    if (instant) spring.jump(value);
    else spring.set(value);
  }, [value, instant, spring]);

  useMotionValueEvent(spring, 'change', (latest) => {
    if (ref.current) ref.current.textContent = format(latest);
  });

  // The server renders the settled value, so no number ever pops in from zero.
  return <span ref={ref}>{format(value)}</span>;
}

/** One value of a quick filter. Counts are live, so they read as a summary. */
function FilterPill({
  active,
  onClick,
  label,
  count,
  plain = false,
  layoutId,
  motionOn,
}: {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
  count: number;
  /** Derived values arrive lowercase; explicit labels render untouched. */
  plain?: boolean;
  /** Shared across the group so the fill slides from one pill to the next. */
  layoutId: string;
  motionOn: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'relative flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium',
        PRESS,
        plain && 'capitalize',
        active
          ? 'text-neutral-100 dark:text-neutral-900'
          : 'text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-100/[0.06] dark:hover:text-neutral-100',
        FOCUS,
      )}
    >
      {active &&
        (motionOn ? (
          <motion.span
            layoutId={layoutId}
            className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
            transition={SPRING_FLUID}
          />
        ) : (
          <span className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100" />
        ))}
      <span className="relative z-10">{label}</span>
      <span
        className={cn(
          'relative z-10 tabular-nums',
          active ? 'opacity-60' : 'text-neutral-400 dark:text-neutral-600',
        )}
      >
        {count}
      </span>
    </button>
  );
}

/** A figure that rolls to its next value — pagination range, selected count. */
function FlipDigits({ value, instant }: { value: string | number; instant: boolean }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(value)}
          className="inline-block tabular-nums"
          initial={instant ? false : { y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={instant ? { opacity: 0 } : { y: -8, opacity: 0 }}
          transition={instant ? INSTANT : SPRING_SNAPPY}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const EMPTY_ITEM = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

/** Staggered because an empty body appears once, not on every hover. */
function EmptyHint({
  filtered,
  motionOn,
  onClear,
}: {
  filtered: boolean;
  motionOn: boolean;
  onClear: () => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 text-center"
      initial={motionOn ? 'hidden' : false}
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={EMPTY_ITEM} transition={motionOn ? SPRING_ICON : INSTANT}>
        <IconDocument className="mb-2 size-7 text-neutral-300 dark:text-neutral-700" />
      </motion.div>
      <motion.p
        variants={EMPTY_ITEM}
        transition={motionOn ? SPRING_ICON : INSTANT}
        className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
      >
        {filtered ? 'No matching rows' : 'Nothing here yet'}
      </motion.p>
      <motion.p
        variants={EMPTY_ITEM}
        transition={motionOn ? SPRING_ICON : INSTANT}
        className="text-sm text-neutral-500 dark:text-neutral-400"
      >
        {filtered
          ? 'Try different search terms or filters.'
          : 'Rows appear here once there is data.'}
      </motion.p>
      {filtered && (
        <motion.button
          type="button"
          onClick={onClear}
          variants={EMPTY_ITEM}
          transition={motionOn ? SPRING_ICON : INSTANT}
          className={cn(
            'mt-3 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900',
            PRESS,
            FOCUS,
          )}
        >
          Clear filters
        </motion.button>
      )}
    </motion.div>
  );
}

/** Hand-rolled rather than the platform checkbox, because the tick draws. */
function SelectBox({
  checked,
  indeterminate = false,
  onChange,
  onShiftPick,
  label,
  instant,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  /** Shift-click, which selects the range instead of one row. */
  onShiftPick?: () => void;
  label: string;
  instant: boolean;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  // Mixed state exists only on the DOM node, so it has to be written there.
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const filled = checked || indeterminate;

  return (
    <label className={cn('relative grid size-8 cursor-pointer place-items-center', PRESS)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        aria-label={label}
        onClick={(event) => {
          if (!onShiftPick || !event.shiftKey) return;
          // The change event would toggle one row; the range wants the whole run.
          event.preventDefault();
          onShiftPick();
        }}
        onChange={(event) => onChange(event.currentTarget.checked)}
        className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-xl outline-hidden"
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative grid size-[18px] place-items-center overflow-hidden rounded-[5px] border',
          'transition-[border-color] duration-150 ease-out',
          filled
            ? 'border-neutral-900 dark:border-neutral-100'
            : 'border-neutral-300 bg-white hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-neutral-500',
          'peer-focus-visible:ring-1 peer-focus-visible:ring-neutral-950 dark:peer-focus-visible:ring-neutral-300',
        )}
      >
        <motion.span
          className="absolute inset-[1px] rounded-[4px] bg-neutral-900 dark:bg-neutral-100"
          initial={false}
          animate={{ scale: filled ? 1 : 0.5, opacity: filled ? 1 : 0 }}
          transition={instant ? INSTANT : SPRING_SNAPPY}
        />
        <span className="relative z-10 grid size-full place-items-center text-neutral-100 dark:text-neutral-900">
          {indeterminate ? (
            <span className="block h-[2.2px] w-[9px] rounded-full bg-current" />
          ) : (
            /* Iconly's tick, re-framed on its own bounds rather than inherited
             * from Tick Square: in that icon the glyph fills a third of a
             * 24-unit box because the square takes the rest, which left a
             * 3px check rattling around inside an 18px control. On a 14-unit
             * box drawn at full size the ink spans two thirds of the control,
             * which is the proportion the eye reads as a checkbox.
             *
             * The geometry is centred on 7,7 and then dropped 0.2 — a check's
             * long arm pulls the eye up, so bounding-box centre sits high. No
             * translate hacks: the nudge lives in the points. */
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="block size-full"
            >
              <motion.polyline
                points="3.9 7.35 6.05 9.55 9.9 4.8"
                initial={false}
                animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                transition={instant ? INSTANT : DRAW}
              />
            </svg>
          )}
        </span>
      </span>
    </label>
  );
}

export function DataTable<T>({
  data,
  columns,
  rowId,
  rowLabel,
  variant = 'default',
  density = 'default',
  caption,
  title,
  toolbar,
  searchable = false,
  searchPlaceholder = 'Search',
  searchText,
  quickFilter,
  defaultSort = null,
  sort: sortProp,
  onSortChange,
  selectable = false,
  defaultSelectedIds,
  selectedIds,
  onSelectedChange,
  bulkActions,
  renderDetail,
  rowActions,
  onDelete,
  pageSize,
  loading = false,
  skeletonRows = 5,
  emptyState,
  onRowClick,
  keyboardNavigation = true,
  clipboard = true,
  totals,
  resizableColumns = false,
  pinFirstColumn = false,
  stickyHeader = false,
  maxHeight,
  animate = true,
  className,
}: DataTableProps<T>) {
  const reduced = useReducedMotion();
  const motionOn = animate && !reduced;
  const surface = SURFACE[variant];
  const scale = DENSITY[density];

  const [query, setQuery] = React.useState('');
  const [quickValue, setQuickValue] = React.useState<string | null>(null);
  /** Index into the visible page. The ring, not focus, follows it. */
  const [cursor, setCursor] = React.useState(0);
  const [gridFocused, setGridFocused] = React.useState(false);
  /** Where a Shift range started. */
  const anchorRef = React.useRef<number | null>(null);
  const [copied, setCopied] = React.useState(false);
  /** Ids mid-sweep, in the order they leave. */
  const [leaving, setLeaving] = React.useState<string[]>([]);
  /** Ids whose sweep has finished; dropped from the body so the gap closes. */
  const [gone, setGone] = React.useState<string[]>([]);
  const [widths, setWidths] = React.useState<Record<string, number>>({});
  const [resizing, setResizing] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const [innerSort, setInnerSort] = React.useState<DataTableSort | null>(defaultSort);
  const sort = sortProp !== undefined ? sortProp : innerSort;

  const [innerSelected, setInnerSelected] = React.useState<string[]>(defaultSelectedIds ?? []);
  const selected = selectedIds !== undefined ? selectedIds : innerSelected;
  const selectedSet = React.useMemo(() => new Set(selected), [selected]);

  const setSelected = React.useCallback(
    (ids: string[]) => {
      if (selectedIds === undefined) setInnerSelected(ids);
      onSelectedChange?.(ids);
    },
    [selectedIds, onSelectedChange],
  );

  const rows = React.useMemo(() => {
    const all = Array.from(data);
    // A row is pulled the instant its own sweep ends, not when the whole wave
    // does, so the rows beneath it start closing the gap while the next one is
    // still on its way out.
    return gone.length > 0 ? all.filter((row) => !gone.includes(rowId(row))) : all;
  }, [data, gone, rowId]);

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => {
      const haystack = searchText
        ? searchText(row)
        : columns.map((column) => printValue(readValue(column, row))).join(' ');
      return haystack.toLowerCase().includes(needle);
    });
  }, [rows, query, columns, searchText]);

  const readQuickValue = React.useCallback(
    (row: T) => {
      if (!quickFilter) return '';
      if (quickFilter.getValue) return quickFilter.getValue(row);
      const column = columns.find((candidate) => candidate.id === quickFilter.columnId);
      return printValue(readValue(column, row));
    },
    [quickFilter, columns],
  );

  const quickOptions = React.useMemo<DataTableQuickFilterOption[]>(() => {
    if (!quickFilter) return [];
    if (quickFilter.options) return quickFilter.options;
    const seen: string[] = [];
    for (const row of rows) {
      const value = readQuickValue(row);
      if (value && !seen.includes(value)) seen.push(value);
    }
    return seen.map((value) => ({ value }));
  }, [quickFilter, rows, readQuickValue]);

  // Live counts come from the searched set, so the pills always add up to the
  // rows a click would actually show.
  const quickCounts = React.useMemo(() => {
    if (!quickFilter) return {} as Record<string, number>;
    const counts: Record<string, number> = {};
    for (const row of filtered) {
      const value = readQuickValue(row);
      counts[value] = (counts[value] ?? 0) + 1;
    }
    return counts;
  }, [quickFilter, filtered, readQuickValue]);

  const narrowed = React.useMemo(() => {
    if (!quickFilter || quickValue === null) return filtered;
    return filtered.filter((row) => readQuickValue(row) === quickValue);
  }, [filtered, quickFilter, quickValue, readQuickValue]);

  const sorted = React.useMemo(() => {
    if (!sort) return narrowed;
    const column = columns.find((candidate) => candidate.id === sort.columnId);
    if (!column) return narrowed;
    const direction = sort.direction === 'asc' ? 1 : -1;

    // Sort is stable, so equal rows keep their source order. Blanks stay at the
    // bottom in both directions; a column of empties is not a result.
    return [...narrowed].sort((a, b) => {
      const left = readValue(column, a);
      const right = readValue(column, b);
      const leftEmpty = isEmpty(left);
      const rightEmpty = isEmpty(right);
      if (leftEmpty || rightEmpty) return leftEmpty === rightEmpty ? 0 : leftEmpty ? 1 : -1;
      return compare(left, right) * direction;
    });
  }, [narrowed, sort, columns]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  // Clamped on the way out as well as in an effect, so a shrinking result set
  // never renders a blank page for one frame.
  const safePage = Math.min(page, pageCount - 1);
  const visible = React.useMemo(
    () => (pageSize ? sorted.slice(safePage * pageSize, safePage * pageSize + pageSize) : sorted),
    [sorted, pageSize, safePage],
  );

  // A filtered result set is a different list, so page 3 of it means nothing.
  // Reset from the handler rather than an effect: no extra render pass, and
  // `safePage` already clamps whatever `page` holds.
  const changeQuery = (next: string) => {
    setQuery(next);
    setPage(0);
  };

  const changeQuickValue = (next: string | null) => {
    setQuickValue(next);
    setPage(0);
  };

  const toggleSort = (column: DataTableColumn<T>) => {
    const active = sort?.columnId === column.id;
    // Third click clears, so a table can always be put back in source order.
    const next: DataTableSort | null = !active
      ? { columnId: column.id, direction: 'asc' }
      : sort?.direction === 'asc'
        ? { columnId: column.id, direction: 'desc' }
        : null;
    if (sortProp === undefined) setInnerSort(next);
    onSortChange?.(next);
  };

  const pageIds = visible.map(rowId);
  const selectedOnPage = pageIds.filter((id) => selectedSet.has(id));
  const allOnPage = pageIds.length > 0 && selectedOnPage.length === pageIds.length;

  const toggleAll = (checked: boolean) => {
    if (checked) setSelected(Array.from(new Set([...selected, ...pageIds])));
    else setSelected(selected.filter((id) => !pageIds.includes(id)));
  };

  const toggleRow = (id: string, checked: boolean) => {
    if (checked) setSelected([...selected, id]);
    else setSelected(selected.filter((candidate) => candidate !== id));
  };

  /**
   * Shift-click, and Shift with the arrow keys, run from the last row you
   * touched to this one — the behaviour every file manager and inbox has, and
   * the reason nobody should have to click twelve checkboxes.
   */
  const selectRange = (from: number, to: number) => {
    const [start, end] = from <= to ? [from, to] : [to, from];
    const ids = visible.slice(start, end + 1).map(rowId);
    setSelected(Array.from(new Set([...selected, ...ids])));
  };

  const selectRow = (index: number, event?: { shiftKey?: boolean }) => {
    const id = pageIds[index];
    if (id === undefined) return;
    if (event?.shiftKey && anchorRef.current !== null) {
      selectRange(anchorRef.current, index);
      return;
    }
    anchorRef.current = index;
    toggleRow(id, !selectedSet.has(id));
  };

  /**
   * Marks rows as leaving in the order they appear, so the sweep runs down the
   * table rather than firing at once. `onDelete` lands after the last one.
   */
  const requestRemove = React.useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      const ordered = visible.map(rowId).filter((id) => ids.includes(id));
      const rest = ids.filter((id) => !ordered.includes(id));
      setLeaving([...ordered, ...rest]);
    },
    [visible, rowId],
  );

  // Two rows can finish in the same tick, so the running tally lives on a ref
  // rather than in the state updater — an updater has to stay pure, and this
  // one has to decide when the whole wave has drained.
  const goneRef = React.useRef<string[]>([]);
  const onRowLeft = React.useCallback(
    (id: string) => {
      if (!goneRef.current.includes(id)) goneRef.current = [...goneRef.current, id];
      const next = goneRef.current;
      if (leaving.length > 0 && leaving.every((candidate) => next.includes(candidate))) {
        // Drained. Hand the ids over and reset in one batch, so the caller's own
        // removal and our reset commit together and nothing flashes back in.
        goneRef.current = [];
        onDelete?.(leaving);
        setSelected(selected.filter((candidate) => !leaving.includes(candidate)));
        setLeaving([]);
        setGone([]);
        return;
      }
      setGone(next);
    },
    [leaving, onDelete, selected, setSelected],
  );

  const selectedRows = React.useMemo(
    () => rows.filter((row) => selectedSet.has(rowId(row))),
    [rows, selectedSet, rowId],
  );

  /** Sums follow the filters, so the footer always describes what you can see. */
  const totalsById = React.useMemo(() => {
    if (!totals || totals.length === 0) return {} as Record<string, number>;
    const result: Record<string, number> = {};
    for (const columnId of totals) {
      const column = columns.find((candidate) => candidate.id === columnId);
      if (!column) continue;
      result[columnId] = sorted.reduce((sum, row) => {
        const value = readValue(column, row);
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);
    }
    return result;
  }, [totals, columns, sorted]);

  const copySelection = React.useCallback(async () => {
    const chosen = selectedRows.length > 0 ? selectedRows : [];
    if (chosen.length === 0) return;
    const head = columns.map((column) =>
      typeof column.header === 'string' ? column.header : column.id,
    );
    const body = chosen.map((row) =>
      columns.map((column) => printValue(readValue(column, row))).join('\t'),
    );
    try {
      await navigator.clipboard.writeText([head.join('\t'), ...body].join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied — the selection is unchanged, so the user
      // can try the button again rather than be told about a failed shortcut.
    }
  }, [selectedRows, columns]);

  // Selecting every row on a page rarely means "these six". Offer the rest.
  const allMatchingSelected =
    sorted.length > 0 && sorted.every((row) => selectedSet.has(rowId(row)));
  const showSelectAllBanner =
    selectable && allOnPage && sorted.length > pageIds.length && !allMatchingSelected;

  const columnCount =
    columns.length + (selectable ? 1 : 0) + (renderDetail ? 1 : 0) + (rowActions ? 1 : 0);

  // A pinned header and a pinned column each need to know they are floating
  // over content — one reads scrollTop, the other scrollLeft.
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [scrolledX, setScrolledX] = React.useState(false);
  React.useEffect(() => {
    const element = scrollRef.current;
    if (!element || (!stickyHeader && !pinFirstColumn)) return;
    const onScroll = () => {
      setScrolled(element.scrollTop > 0);
      setScrolledX(Math.abs(element.scrollLeft) > 0);
    };
    onScroll();
    element.addEventListener('scroll', onScroll, { passive: true });
    return () => element.removeEventListener('scroll', onScroll);
  }, [stickyHeader, pinFirstColumn]);

  // Column widths are measured once, then owned by the drag. Fixed layout only
  // switches on after that first measurement, so the table never jumps.
  const headRefs = React.useRef<Record<string, HTMLTableCellElement | null>>({});
  const measured = resizableColumns && Object.keys(widths).length === columns.length;
  React.useEffect(() => {
    if (!resizableColumns) return;
    // Measuring is a read from the DOM, the same shape as the ring below: take
    // the browser's own column widths once, then let the drag own them.
    const measure = () => {
      const next: Record<string, number> = {};
      for (const column of columns) {
        const cell = headRefs.current[column.id];
        if (cell)
          next[column.id] = Math.max(MIN_COL, Math.round(cell.getBoundingClientRect().width));
      }
      if (Object.keys(next).length !== columns.length) return;
      setWidths((current) => {
        const same =
          Object.keys(current).length === Object.keys(next).length &&
          Object.keys(next).every((key) => current[key] === next[key]);
        return same ? current : next;
      });
    };
    const frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [resizableColumns, columns, density]);

  const startResize = (columnId: string, clientX: number) => {
    const from = widths[columnId] ?? MIN_COL;
    const rtl = typeof document !== 'undefined' && document.dir === 'rtl';
    setResizing(columnId);
    const onMove = (event: PointerEvent) => {
      const delta = (event.clientX - clientX) * (rtl ? -1 : 1);
      setWidths((current) => ({ ...current, [columnId]: Math.max(MIN_COL, from + delta) }));
    };
    const onUp = () => {
      setResizing(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const nudgeWidth = (columnId: string, delta: number) => {
    setWidths((current) => ({
      ...current,
      [columnId]: Math.max(MIN_COL, (current[columnId] ?? MIN_COL) + delta),
    }));
  };

  /** Fixed offsets, because the leading cells are fixed widths. */
  const pinStart = {
    detail: 0,
    select: renderDetail ? DETAIL_COL : 0,
    first: (renderDetail ? DETAIL_COL : 0) + (selectable ? SELECT_COL : 0),
  };
  // An outer box-shadow rather than a pseudo-element: the pinned cell clips its
  // own overflow to truncate long values, and that would clip the shadow too.
  const pinnedShadow =
    pinFirstColumn && scrolledX
      ? 'shadow-[12px_0_10px_-10px_rgba(0,0,0,0.12)] dark:shadow-[12px_0_10px_-10px_rgba(0,0,0,0.55)]'
      : '';

  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([]);

  // Measuring is what makes a reorder animate; keeping it off every other
  // render is what keeps hovering a row cheap.
  const layoutToken = `${sort?.columnId ?? ''}:${sort?.direction ?? ''}:${safePage}:${query}:${quickValue ?? ''}`;

  const gridId = React.useId();
  const rowDomId = (index: number) => `${gridId}-row-${index}`;

  /**
   * One Tab stop for the whole grid, then arrows move a ring rather than focus
   * — the pattern a keyboard-first tool uses, and the only way row shortcuts
   * can exist without stealing keys from the controls inside a row.
   */
  const onGridKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    if (!keyboardNavigation || visible.length === 0) return;
    const meta = event.metaKey || event.ctrlKey;

    if (meta && event.key.toLowerCase() === 'c') {
      if (!clipboard || selected.length === 0) return;
      event.preventDefault();
      void copySelection();
      return;
    }
    if (meta && event.key.toLowerCase() === 'a' && selectable) {
      event.preventDefault();
      toggleAll(true);
      return;
    }

    // Anything typed into a control inside a row belongs to that control.
    const target = event.target as HTMLElement;
    if (target !== event.currentTarget && target.closest('input,textarea,select')) return;

    const move = (next: number) => {
      const clamped = Math.max(0, Math.min(visible.length - 1, next));
      event.preventDefault();
      if (event.shiftKey && selectable) {
        if (anchorRef.current === null) anchorRef.current = cursor;
        selectRange(anchorRef.current, clamped);
      }
      setCursor(clamped);
      rowRefs.current[clamped]?.scrollIntoView({ block: 'nearest' });
    };

    switch (event.key) {
      case 'ArrowDown':
        return move(cursor + 1);
      case 'ArrowUp':
        return move(cursor - 1);
      case 'PageDown':
        return move(cursor + 10);
      case 'PageUp':
        return move(cursor - 10);
      case 'Home':
        return move(0);
      case 'End':
        return move(visible.length - 1);
      case ' ': {
        if (!selectable) return;
        event.preventDefault();
        selectRow(cursor, event);
        return;
      }
      case 'Enter': {
        const row = visible[cursor];
        if (!row || !onRowClick) return;
        event.preventDefault();
        onRowClick(row);
        return;
      }
      case 'Escape': {
        if (selected.length === 0) return;
        event.preventDefault();
        setSelected([]);
        return;
      }
      case 'ArrowRight': {
        if (!renderDetail) return;
        event.preventDefault();
        setExpanded(rowId(visible[cursor]));
        return;
      }
      case 'ArrowLeft': {
        if (!renderDetail) return;
        event.preventDefault();
        setExpanded(null);
        return;
      }
      default:
        return;
    }
  };

  const showEmpty = !loading && visible.length === 0;
  const rangeStart = sorted.length === 0 ? 0 : safePage * (pageSize ?? sorted.length) + 1;
  const rangeEnd = pageSize ? Math.min(sorted.length, (safePage + 1) * pageSize) : sorted.length;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('flex flex-col overflow-hidden', surface.frame)}>
        {(searchable || title || toolbar || quickFilter) && (
          <div
            className={cn(
              'flex flex-wrap items-center gap-x-4 gap-y-2 py-3',
              scale.pad,
              variant === 'minimal' && 'px-0 pt-0',
            )}
          >
            {title && (
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {title}
              </h3>
            )}

            {/* Controls live at the end of the toolbar: filter pills first,
                then search, then whatever actions the caller parks here. */}
            <div className="ms-auto flex min-w-0 flex-wrap items-center justify-end gap-2">
              {quickFilter && quickOptions.length > 0 && (
                <LayoutGroup id={`${gridId}-filters`}>
                  <div
                    role="group"
                    aria-label={quickFilter.label ?? 'Filter rows'}
                    className="flex flex-wrap items-center gap-1"
                  >
                    <FilterPill
                      active={quickValue === null}
                      onClick={() => changeQuickValue(null)}
                      label={quickFilter.allLabel ?? 'All'}
                      count={filtered.length}
                      layoutId={`${gridId}-pill`}
                      motionOn={motionOn}
                    />
                    {quickOptions.map((option) => (
                      <FilterPill
                        key={option.value}
                        active={quickValue === option.value}
                        onClick={() =>
                          changeQuickValue(quickValue === option.value ? null : option.value)
                        }
                        label={option.label ?? option.value}
                        plain={option.label === undefined}
                        count={quickCounts[option.value] ?? 0}
                        layoutId={`${gridId}-pill`}
                        motionOn={motionOn}
                      />
                    ))}
                  </div>
                </LayoutGroup>
              )}

              {searchable && (
                <div className="group/search relative w-full transition-[width] duration-300 sm:w-56 sm:focus-within:w-72 ease-[cubic-bezier(0.2,0,0,1)]">
                  <IconSearch className="pointer-events-none absolute inset-y-0 start-2.5 my-auto size-4 text-neutral-400 transition-[color,opacity] duration-150 ease-out group-focus-within/search:text-neutral-700 dark:text-neutral-500 dark:group-focus-within/search:text-neutral-300" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => changeQuery(event.currentTarget.value)}
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                    className={cn(
                      'h-9 w-full rounded-xl border border-neutral-200 bg-white ps-8 pe-8 text-base text-neutral-900 placeholder:text-neutral-400 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500',
                      'transition-[border-color] duration-150 ease-out',
                      'focus:border-neutral-400 dark:focus:border-neutral-500',
                      '[&::-webkit-search-cancel-button]:hidden',
                      FOCUS,
                    )}
                  />
                  <AnimatePresence initial={false}>
                    {query ? (
                      <motion.button
                        type="button"
                        onClick={() => changeQuery('')}
                        aria-label="Clear search"
                        initial={
                          motionOn ? { opacity: 0, scale: 0.25, filter: 'blur(4px)' } : false
                        }
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={
                          motionOn
                            ? { opacity: 0, scale: 0.25, filter: 'blur(4px)' }
                            : { opacity: 0 }
                        }
                        transition={motionOn ? SPRING_ICON : INSTANT}
                        className={cn(
                          'absolute inset-y-0 end-1 my-auto grid size-7 place-items-center rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                          PRESS,
                          FOCUS,
                        )}
                      >
                        <IconCloseLine className="size-3.5" />
                      </motion.button>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}

              {toolbar}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {showSelectAllBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={motionOn ? SPRING_FLUID : INSTANT}
              className="overflow-hidden border-t border-neutral-100 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900/60"
            >
              <p
                className={cn(
                  'flex flex-wrap items-center gap-x-1.5 gap-y-1 py-2 text-sm text-neutral-600 dark:text-neutral-400',
                  scale.pad,
                )}
              >
                <span className="tabular-nums">
                  All {pageIds.length} rows on this page are selected.
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(sorted.map(rowId))}
                  className={cn(
                    'rounded-lg font-medium text-neutral-900 underline underline-offset-2 transition-colors duration-100 ease-out hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400',
                    FOCUS,
                  )}
                >
                  Select all {sorted.length} that match
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <div
            ref={scrollRef}
            className="relative w-full overflow-auto overscroll-x-contain"
            style={maxHeight ? { maxHeight } : undefined}
          >
            <table
              role={keyboardNavigation ? 'grid' : undefined}
              aria-multiselectable={keyboardNavigation && selectable ? true : undefined}
              tabIndex={keyboardNavigation && visible.length > 0 ? 0 : undefined}
              aria-activedescendant={
                keyboardNavigation && gridFocused && visible[cursor] ? rowDomId(cursor) : undefined
              }
              onKeyDown={onGridKeyDown}
              onFocus={(event) => {
                if (event.target === event.currentTarget) setGridFocused(true);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node))
                  setGridFocused(false);
              }}
              className={cn(
                'w-full border-collapse whitespace-nowrap',
                scale.text,
                'outline-hidden focus-visible:outline-hidden',
              )}
              style={
                measured
                  ? { tableLayout: 'fixed', width: 'max-content', minWidth: '100%' }
                  : undefined
              }
              aria-busy={loading || undefined}
            >
              {caption && <caption className="sr-only">{caption}</caption>}

              <thead
                className={cn(
                  surface.head,
                  stickyHeader && surface.headPinned,
                  stickyHeader && 'sticky top-0 z-10',
                  'transition-shadow duration-150 ease-out',
                  stickyHeader && scrolled && 'shadow-[0_6px_10px_-8px_rgba(0,0,0,0.35)]',
                )}
              >
                <tr className={scale.head}>
                  {renderDetail && (
                    <th
                      scope="col"
                      className={cn('w-10', surface.headRule, pinFirstColumn && 'sticky z-1')}
                      style={
                        pinFirstColumn
                          ? { insetInlineStart: pinStart.detail, width: DETAIL_COL }
                          : undefined
                      }
                    />
                  )}
                  {selectable && (
                    <th
                      scope="col"
                      className={cn(
                        'w-12 pe-0',
                        scale.pad,
                        surface.headRule,
                        pinFirstColumn && 'sticky z-1',
                      )}
                      style={
                        pinFirstColumn
                          ? { insetInlineStart: pinStart.select, width: SELECT_COL }
                          : undefined
                      }
                    >
                      <SelectBox
                        checked={allOnPage}
                        indeterminate={selectedOnPage.length > 0 && !allOnPage}
                        onChange={toggleAll}
                        label="Select all rows on this page"
                        instant={!motionOn}
                      />
                    </th>
                  )}
                  {columns.map((column, columnIndex) => {
                    const align = column.align ?? (column.numeric ? 'end' : 'start');
                    const active = sort?.columnId === column.id;
                    const pinned = pinFirstColumn && columnIndex === 0;
                    // Not truncated: a header that can shrink to nothing contributes
                    // no min-content width, so the table would clip its own labels
                    // rather than scroll. Pass `headerClassName="truncate"` to opt in.
                    const label = <span>{column.header}</span>;

                    return (
                      <th
                        key={column.id}
                        scope="col"
                        aria-sort={
                          column.sortable
                            ? active
                              ? sort?.direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                            : undefined
                        }
                        ref={(node) => {
                          headRefs.current[column.id] = node;
                        }}
                        style={{
                          ...(widths[column.id]
                            ? { width: widths[column.id] }
                            : column.width
                              ? { width: column.width }
                              : null),
                          ...(pinned ? { insetInlineStart: pinStart.first } : null),
                        }}
                        className={cn(
                          'relative font-medium text-neutral-600 dark:text-neutral-400',
                          scale.pad,
                          ALIGN[align],
                          surface.cell,
                          surface.headRule,
                          column.hideBelow && HIDE_BELOW[column.hideBelow],
                          pinned && cn('sticky z-1', surface.head, pinnedShadow),
                          column.headerClassName,
                        )}
                      >
                        {column.sortable ? (
                          <button
                            type="button"
                            onClick={() => toggleSort(column)}
                            className={cn(
                              'group/sort -mx-1.5 inline-flex max-w-full items-center gap-1 rounded-xl px-1.5 py-1 font-medium hover:text-neutral-900 dark:hover:text-neutral-100',
                              PRESS,
                              align === 'end' && 'flex-row-reverse',
                              active && 'text-neutral-900 dark:text-neutral-100',
                              FOCUS,
                            )}
                          >
                            {label}
                            {/* Ghosted under the pointer so a sortable column
                                advertises itself, solid once it is the sort,
                                and the flip between asc and desc is a rotation
                                rather than a second glyph. */}
                            <motion.span
                              aria-hidden="true"
                              className={cn(
                                'grid size-3.5 shrink-0 place-items-center',
                                'transition-[opacity,scale] duration-150',
                                EASE,
                                active
                                  ? 'scale-100 opacity-100'
                                  : 'scale-75 opacity-0 group-hover/sort:scale-100 group-hover/sort:opacity-40 group-focus-visible/sort:scale-100 group-focus-visible/sort:opacity-40',
                              )}
                              initial={false}
                              animate={{ rotate: active && sort?.direction === 'asc' ? 180 : 0 }}
                              transition={motionOn ? SPRING_SNAPPY : INSTANT}
                            >
                              <IconChevron className="size-3.5" />
                            </motion.span>
                          </button>
                        ) : (
                          label
                        )}

                        {resizableColumns && (
                          /* A splitter, not a button: arrow keys resize it, and
                             screen readers announce the width they land on. */
                          <span
                            role="separator"
                            aria-orientation="vertical"
                            aria-label={`Resize ${
                              typeof column.header === 'string' ? column.header : column.id
                            } column`}
                            aria-valuenow={Math.round(widths[column.id] ?? MIN_COL)}
                            aria-valuemin={MIN_COL}
                            tabIndex={0}
                            onPointerDown={(event) => {
                              event.preventDefault();
                              startResize(column.id, event.clientX);
                            }}
                            onKeyDown={(event) => {
                              const step = event.shiftKey ? 48 : 16;
                              if (event.key === 'ArrowRight') {
                                event.preventDefault();
                                nudgeWidth(column.id, step);
                              } else if (event.key === 'ArrowLeft') {
                                event.preventDefault();
                                nudgeWidth(column.id, -step);
                              }
                            }}
                            className={cn(
                              'absolute inset-y-0 end-0 z-1 w-2 translate-x-1/2 cursor-col-resize touch-none',
                              "before:absolute before:inset-y-1.5 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-neutral-900 before:opacity-0 before:transition-opacity before:duration-100 before:content-['']",
                              'hover:before:opacity-20 focus-visible:before:opacity-100 dark:before:bg-neutral-100',
                              resizing === column.id && 'before:opacity-100',
                              'focus-visible:outline-hidden',
                            )}
                          />
                        )}
                      </th>
                    );
                  })}
                  {rowActions && (
                    <th scope="col" className={cn('w-12', surface.headRule)}>
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  {Array.from({ length: skeletonRows }).map((_, index) => (
                    <tr key={index} className={cn(index > 0 && surface.divider, surface.rowFill)}>
                      {renderDetail && <td className="w-10" />}
                      {selectable && (
                        <td className={cn('w-12 pe-0', scale.pad, scale.cell)}>
                          <span className="ms-[7px] block size-[18px] rounded-[5px] bg-neutral-100 dark:bg-neutral-900" />
                        </td>
                      )}
                      {columns.map((column, columnIndex) => (
                        <td
                          key={column.id}
                          className={cn(
                            scale.pad,
                            scale.cell,
                            surface.cell,
                            column.hideBelow && HIDE_BELOW[column.hideBelow],
                          )}
                        >
                          <span
                            className="block h-3 origin-left animate-pulse rounded-full bg-neutral-100 rtl:origin-right dark:bg-neutral-900"
                            style={{
                              width: `${52 + ((index * 17 + column.id.length * 7) % 40)}%`,
                              animationDelay: `${index * 80 + columnIndex * 40}ms`,
                              animationDuration: '1.4s',
                            }}
                          />
                        </td>
                      ))}
                      {rowActions && <td className="w-12" />}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {visible.map((row, index) => {
                    const id = rowId(row);
                    const isSelected = selectedSet.has(id);
                    const isExpanded = expanded === id;
                    const leavingAt = leaving.indexOf(id);
                    const isLeaving = leavingAt !== -1;
                    const name =
                      rowLabel?.(row) || printValue(readValue(columns[0], row)) || 'this row';
                    // Hover tints the cells rather than the row, so it paints over
                    // the row's opaque fill instead of under it. Selection is the
                    // checkbox — no extra rail or wash on the row.
                    const tint =
                      'transition-colors duration-100 ease-out group-hover/row:bg-neutral-900/[0.025] dark:group-hover/row:bg-neutral-100/[0.045]';

                    return (
                      <React.Fragment key={id}>
                        <motion.tr
                          id={rowDomId(index)}
                          ref={(node) => {
                            rowRefs.current[index] = node;
                          }}
                          aria-selected={selectable ? isSelected : undefined}
                          aria-hidden={isLeaving || undefined}
                          layout={motionOn ? 'position' : false}
                          layoutDependency={layoutToken}
                          initial={false}
                          animate={isLeaving ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                          onAnimationComplete={() => {
                            if (isLeaving) onRowLeft(id);
                          }}
                          transition={
                            isLeaving
                              ? motionOn
                                ? { ...UNDERTOW, delay: leavingAt * WAVE_STEP }
                                : INSTANT
                              : SPRING_FLUID
                          }
                          data-selected={isSelected || undefined}
                          onPointerDown={() => setCursor(index)}
                          onClick={
                            onRowClick
                              ? (event) => {
                                  // The first cell carries a real button for the
                                  // keyboard; a pointer may land anywhere else.
                                  const target = event.target as HTMLElement;
                                  if (target.closest('a,button,input,select,textarea,label'))
                                    return;
                                  onRowClick(row);
                                }
                              : undefined
                          }
                          className={cn(
                            'group/row',
                            index > 0 && surface.divider,
                            surface.rowFill,
                            index % 2 === 1 && surface.stripe,
                            onRowClick && 'cursor-pointer',
                          )}
                        >
                          {renderDetail && (
                            <td
                              className={cn(
                                'w-10 ps-2',
                                scale.cell,
                                tint,
                                pinFirstColumn && cn('sticky z-1', surface.rowFill),
                              )}
                              style={
                                pinFirstColumn
                                  ? { insetInlineStart: pinStart.detail, width: DETAIL_COL }
                                  : undefined
                              }
                            >
                              <button
                                type="button"
                                onClick={() => setExpanded(isExpanded ? null : id)}
                                aria-expanded={isExpanded}
                                aria-controls={isExpanded ? `${id}-detail` : undefined}
                                aria-label={isExpanded ? `Hide ${name}` : `Show ${name}`}
                                className={cn(
                                  'grid size-8 place-items-center rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                                  PRESS,
                                  FOCUS,
                                )}
                              >
                                <motion.span
                                  className="grid size-4 place-items-center"
                                  initial={false}
                                  animate={{ rotate: isExpanded ? 0 : -90 }}
                                  transition={motionOn ? SPRING_SNAPPY : INSTANT}
                                >
                                  <IconChevron className="size-4" />
                                </motion.span>
                              </button>
                            </td>
                          )}

                          {selectable && (
                            <td
                              className={cn(
                                'w-12 pe-0',
                                scale.pad,
                                scale.cell,
                                tint,
                                pinFirstColumn && cn('sticky z-1', surface.rowFill),
                              )}
                              style={
                                pinFirstColumn
                                  ? { insetInlineStart: pinStart.select, width: SELECT_COL }
                                  : undefined
                              }
                            >
                              <SelectBox
                                checked={isSelected}
                                onChange={() => selectRow(index)}
                                onShiftPick={() => {
                                  setCursor(index);
                                  selectRow(index, { shiftKey: true });
                                }}
                                label={`Select ${name}`}
                                instant={!motionOn}
                              />
                            </td>
                          )}

                          {columns.map((column, columnIndex) => {
                            const align = column.align ?? (column.numeric ? 'end' : 'start');
                            const content = column.cell
                              ? column.cell(row, index)
                              : printValue(readValue(column, row));
                            const activates = Boolean(onRowClick) && columnIndex === 0;

                            return (
                              <td
                                key={column.id}
                                style={
                                  pinFirstColumn && columnIndex === 0
                                    ? { insetInlineStart: pinStart.first }
                                    : undefined
                                }
                                className={cn(
                                  'text-neutral-700 dark:text-neutral-300',
                                  tint,
                                  scale.pad,
                                  scale.cell,
                                  ALIGN[align],
                                  surface.cell,
                                  column.numeric && 'tabular-nums',
                                  column.hideBelow && HIDE_BELOW[column.hideBelow],
                                  // Fixed layout cannot grow, so a long value has
                                  // to end in an ellipsis rather than escape.
                                  measured && 'truncate',
                                  columnIndex === 0 &&
                                    'font-medium text-neutral-900 dark:text-neutral-100',
                                  pinFirstColumn &&
                                    columnIndex === 0 &&
                                    cn('sticky z-1', surface.rowFill, pinnedShadow),
                                  column.className,
                                )}
                              >
                                {activates ? (
                                  <button
                                    type="button"
                                    onClick={() => onRowClick?.(row)}
                                    className={cn(
                                      '-mx-1 flex max-w-[calc(100%+0.5rem)] items-center rounded-xl px-1 text-start',
                                      FOCUS,
                                    )}
                                  >
                                    {content}
                                  </button>
                                ) : (
                                  content
                                )}
                              </td>
                            );
                          })}

                          {rowActions && (
                            <td className={cn('w-12 pe-2 text-end', scale.cell, tint)}>
                              {/* Shown by default, and hidden until hover only
                                  where hovering exists, so touch keeps it. */}
                              <span className="inline-flex opacity-100 transition-opacity duration-100 ease-out group-focus-within/row:opacity-100 group-hover/row:opacity-100 [@media(hover:hover)]:opacity-0">
                                {rowActions(row, { remove: () => requestRemove([id]) })}
                              </span>
                            </td>
                          )}
                        </motion.tr>

                        {renderDetail && (
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.tr
                                id={`${id}-detail`}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="bg-neutral-50 dark:bg-neutral-900"
                              >
                                <td colSpan={columnCount} className="p-0">
                                  <motion.div
                                    variants={{
                                      closed: { height: 0, opacity: 0 },
                                      open: { height: 'auto', opacity: 1 },
                                    }}
                                    transition={motionOn ? SPRING_FLUID : INSTANT}
                                    className="overflow-hidden"
                                  >
                                    <div className={cn(scale.pad, 'py-4')}>{renderDetail(row)}</div>
                                  </motion.div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {showEmpty && (
                    <tr>
                      <td colSpan={columnCount} className="px-6 py-16">
                        {emptyState ?? (
                          <EmptyHint
                            filtered={Boolean(query || quickValue !== null)}
                            motionOn={motionOn}
                            onClear={() => {
                              changeQuery('');
                              changeQuickValue(null);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              )}

              {totals && totals.length > 0 && !loading && sorted.length > 0 && (
                <tfoot>
                  <tr
                    className={cn(
                      surface.rowFill,
                      'border-t border-neutral-200 dark:border-neutral-800',
                    )}
                  >
                    {renderDetail && <td className="w-10" />}
                    {selectable && <td className={cn('w-12 pe-0', scale.pad)} />}
                    {columns.map((column, columnIndex) => {
                      const align = column.align ?? (column.numeric ? 'end' : 'start');
                      const sum = totalsById[column.id];
                      return (
                        <td
                          key={column.id}
                          className={cn(
                            scale.pad,
                            scale.cell,
                            ALIGN[align],
                            surface.cell,
                            column.numeric && 'tabular-nums',
                            column.hideBelow && HIDE_BELOW[column.hideBelow],
                            'font-medium text-neutral-900 dark:text-neutral-100',
                          )}
                        >
                          {sum !== undefined ? (
                            <RollingTotal
                              value={sum}
                              format={
                                column.formatTotal ??
                                ((amount) => Math.round(amount).toLocaleString('en-US'))
                              }
                              instant={!motionOn}
                            />
                          ) : columnIndex === 0 ? (
                            <span className="font-normal text-neutral-500 dark:text-neutral-400">
                              Total
                            </span>
                          ) : null}
                        </td>
                      );
                    })}
                    {rowActions && <td className="w-12" />}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Infrequent, and it changes what the whole toolbar means, so this
              one earns a spring. */}
          {selectable && bulkActions && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <AnimatePresence>
                {selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={motionOn ? SPRING_ENTRANCE : INSTANT}
                    className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full bg-neutral-900 p-1 ps-3 whitespace-nowrap text-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:bg-neutral-100 dark:text-neutral-900"
                  >
                    <span className="pe-1 text-xs font-medium tabular-nums">
                      <FlipDigits value={selected.length} instant={!motionOn} /> selected
                    </span>
                    <span className="h-4 w-px bg-current opacity-20" />
                    {clipboard && (
                      <button
                        type="button"
                        onClick={() => void copySelection()}
                        aria-label={`Copy ${selected.length} rows to the clipboard`}
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:hover:bg-black/10',
                          PRESS,
                        )}
                      >
                        {/* Contextual icon swap: scale, opacity and blur, never
                            a visibility toggle. */}
                        <span className="relative grid size-4 place-items-center">
                          <AnimatePresence initial={false} mode="popLayout">
                            <motion.span
                              key={copied ? 'done' : 'copy'}
                              initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                              transition={motionOn ? SPRING_ICON : INSTANT}
                              className="absolute inset-0 grid place-items-center"
                            >
                              {copied ? (
                                <IconTickSquare className="size-4" />
                              ) : (
                                <IconCopy className="size-4" />
                              )}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                        <span className="relative hidden h-[1.25em] overflow-hidden sm:inline">
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={copied ? 'copied' : 'copy'}
                              className="inline-block"
                              initial={motionOn ? { y: 8, opacity: 0 } : false}
                              animate={{ y: 0, opacity: 1 }}
                              exit={motionOn ? { y: -8, opacity: 0 } : { opacity: 0 }}
                              transition={motionOn ? SPRING_SNAPPY : INSTANT}
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </button>
                    )}
                    {bulkActions({
                      ids: selected,
                      rows: selectedRows,
                      clear: () => setSelected([]),
                      remove: () => requestRemove(selected),
                    })}
                    <button
                      type="button"
                      onClick={() => setSelected([])}
                      aria-label="Clear selection"
                      className={cn(
                        'grid size-7 place-items-center rounded-full opacity-60 hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-current',
                        PRESS,
                      )}
                    >
                      <IconClose className="size-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {pageSize && !loading && sorted.length > 0 && (
          <nav
            aria-label="Pagination"
            className={cn(
              'flex items-center justify-between gap-3 border-t border-neutral-100 py-2.5 dark:border-neutral-900',
              scale.pad,
              variant === 'minimal' && 'px-0',
            )}
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              <FlipDigits
                value={`${rangeStart}–${rangeEnd} of ${sorted.length}`}
                instant={!motionOn}
              />
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(safePage - 1)}
                disabled={safePage === 0}
                aria-label="Previous page"
                className={cn(
                  'group/page grid size-8 place-items-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100',
                  PRESS,
                  FOCUS,
                )}
              >
                <IconChevron className="size-4 rotate-90 transition-transform duration-150 ease-out group-hover/page:-translate-x-px rtl:-rotate-90 rtl:group-hover/page:translate-x-px" />
              </button>
              <button
                type="button"
                onClick={() => setPage(safePage + 1)}
                disabled={safePage >= pageCount - 1}
                aria-label="Next page"
                className={cn(
                  'group/page grid size-8 place-items-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100',
                  PRESS,
                  FOCUS,
                )}
              >
                <IconChevron className="size-4 -rotate-90 transition-transform duration-150 ease-out group-hover/page:translate-x-px rtl:rotate-90 rtl:group-hover/page:-translate-x-px" />
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* One region, always rendered, so repeated counts announce reliably. */}
      <div role="status" aria-live="polite" className="sr-only">
        {loading
          ? 'Loading rows'
          : `${sorted.length} ${sorted.length === 1 ? 'row' : 'rows'}${
              selected.length > 0 ? `, ${selected.length} selected` : ''
            }`}
      </div>
    </div>
  );
}
