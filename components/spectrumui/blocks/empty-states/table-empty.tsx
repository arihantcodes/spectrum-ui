'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EMPTY_FONT,
  EmptyAction,
  EmptyState,
  IconDocument,
  IconPlus,
  IconUpload,
  SPRING_ENTRANCE,
  SPRING_FLUID,
  usePropState,
} from './empty-state-kit';

export type TableEmptyVariant = 'Overlay' | 'Inline' | 'Loading';

export interface TableColumn {
  id: string;
  label: string;
  align?: 'left' | 'right';
  width?: string;
}

export interface TableRowSeed {
  id: string;
  cells: string[];
}

export interface TableEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  columns?: TableColumn[];
  /** Rows the demo inserts, one per press, so the empty state can be left. */
  seedRows?: TableRowSeed[];
  addLabel?: string;
  importLabel?: string;
  onAdd?: () => void;
  variant?: TableEmptyVariant;
  className?: string;
}

const COLUMNS: TableColumn[] = [
  { id: 'customer', label: 'Customer' },
  { id: 'plan', label: 'Plan', width: '22%' },
  { id: 'seats', label: 'Seats', align: 'right', width: '14%' },
  { id: 'mrr', label: 'MRR', align: 'right', width: '18%' },
];

const SEED: TableRowSeed[] = [
  { id: 'r1', cells: ['Northbend Labs', 'Team', '12', '$708'] },
  { id: 'r2', cells: ['Harbour Freight', 'Pro', '4', '$96'] },
  { id: 'r3', cells: ['Ostrom & Co', 'Enterprise', '86', '$4,300'] },
];

export function TableEmpty({
  panelTitle = 'Accounts',
  title = 'No accounts yet',
  description = 'The table keeps its columns so you can see the shape of what goes here. Add a row by hand or import the ones you already have.',
  columns = COLUMNS,
  seedRows = SEED,
  addLabel = 'Add row',
  importLabel = 'Import CSV',
  onAdd,
  variant = 'Overlay',
  className,
}: TableEmptyProps) {
  const [rows, setRows] = usePropState<TableRowSeed[]>([], variant);
  const [loading, setLoading] = usePropState(variant === 'Loading', variant);
  const reduced = useReducedMotion();

  /* The skeleton resolves on a timer; the effect ends the loading state rather
     than starting it, so nothing is set synchronously on mount. */
  React.useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), reduced ? 250 : 1400);
    return () => clearTimeout(timer);
  }, [loading, reduced, setLoading]);

  function addRow() {
    const next = seedRows[rows.length];
    if (!next) return;
    setRows((current) => [...current, next]);
    onAdd?.();
  }

  const empty = rows.length === 0;

  return (
    <section
      className={cn(
        EMPTY_FONT,
        'w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-28px_rgba(0,0,0,0.35)]',
        'dark:border-white/[0.09] dark:bg-neutral-950 dark:shadow-none',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.07]">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-[-0.1px] text-neutral-800 dark:text-neutral-100">
            {panelTitle}
          </p>
          <p className="mt-0.5 font-mono text-[12.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
            {loading ? 'loading…' : `${rows.length} rows`}
          </p>
        </div>
        <EmptyAction
          emphasis="secondary"
          icon={<IconPlus />}
          onClick={addRow}
          disabled={rows.length >= seedRows.length}
          className="h-8 px-3 text-[13.5px]"
        >
          {addLabel}
        </EmptyAction>
      </header>

      <div className="relative">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.07]">
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  style={{ width: column.width }}
                  className={cn(
                    'px-4 py-2.5 text-[12.5px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-500',
                    column.align === 'right' ? 'text-right' : 'text-left',
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((row) => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={SPRING_ENTRANCE}
                  className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.05]"
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={columns[index]?.id ?? index}
                      className={cn(
                        'truncate px-4 py-3 text-[14px] text-neutral-700 dark:text-neutral-200',
                        columns[index]?.align === 'right' && 'text-right font-mono tabular-nums',
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>

            {/* Ghost rows hold the table's height so the overlay never floats in
                a 40px strip, and so adding the first row does not jolt the page. */}
            {empty &&
              Array.from({ length: 6 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.05]"
                >
                  {columns.map((column) => (
                    <td key={column.id} className="px-4 py-3.5">
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={
                          loading && !reduced
                            ? { opacity: [0.18, 0.4, 0.18] }
                            : { opacity: Math.max(0.08, 0.28 - index * 0.06) }
                        }
                        transition={
                          loading && !reduced
                            ? { duration: 1.2, repeat: Infinity, delay: index * 0.1 }
                            : SPRING_FLUID
                        }
                        className={cn(
                          'block h-2 rounded-full bg-neutral-400 dark:bg-white/40',
                          column.align === 'right' ? 'ml-auto w-10' : 'w-[70%]',
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <AnimatePresence>
          {empty && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING_FLUID}
              className={cn(
                'inset-x-0 bottom-0 flex items-center justify-center px-6',
                variant === 'Inline'
                  ? 'relative py-10'
                  : /* Starts below the header row: the column labels are the
                       one thing an empty table still has to say. */
                    'absolute top-10 bg-gradient-to-b from-white/85 via-white/98 to-white dark:from-neutral-950/85 dark:via-neutral-950/98 dark:to-neutral-950',
              )}
            >
              <EmptyState
                icon={<IconDocument />}
                medallionSize="sm"
                backdrop="none"
                title={title}
                description={description}
                actions={
                  <>
                    <EmptyAction icon={<IconPlus />} onClick={addRow}>
                      {addLabel}
                    </EmptyAction>
                    <EmptyAction emphasis="secondary" icon={<IconUpload />}>
                      {importLabel}
                    </EmptyAction>
                  </>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
