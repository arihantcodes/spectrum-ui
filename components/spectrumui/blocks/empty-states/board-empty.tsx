'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropTarget,
  EmptyAction,
  EmptyHint,
  EmptyPanel,
  EmptyState,
  IconCategory,
  IconPlus,
  SPRING_ENTRANCE,
  SPRING_FLUID,
  usePropState,
} from './empty-state-kit';

export type BoardEmptyVariant = 'Board' | 'Column';

export interface BoardCard {
  id: string;
  title: string;
  tag: string;
}

export interface BoardColumn {
  id: string;
  name: string;
  cards: BoardCard[];
}

export interface BoardEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  columns?: BoardColumn[];
  /** Which column starts empty. It is the one the block is really about. */
  emptyColumnId?: string;
  addLabel?: string;
  onMove?: (cardId: string, toColumnId: string) => void;
  variant?: BoardEmptyVariant;
  className?: string;
}

const COLUMNS: BoardColumn[] = [
  {
    id: 'todo',
    name: 'Backlog',
    cards: [
      { id: 'c1', title: 'Audit the retry budget', tag: 'infra' },
      { id: 'c2', title: 'Ship the CSV importer', tag: 'growth' },
    ],
  },
  { id: 'doing', name: 'In progress', cards: [] },
  {
    id: 'done',
    name: 'Shipped',
    cards: [{ id: 'c3', title: 'Region picker in the footer', tag: 'ui' }],
  },
];

export function BoardEmpty({
  panelTitle = 'Sprint 14',
  title = 'Nothing in progress',
  description = 'Drag a card in from the backlog, or write one straight into the column.',
  columns = COLUMNS,
  emptyColumnId = 'doing',
  addLabel = 'Add card',
  onMove,
  variant = 'Board',
  className,
}: BoardEmptyProps) {
  const [board, setBoard] = usePropState(columns, columns);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [over, setOver] = React.useState(false);
  const [composing, setComposing] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const nextId = React.useRef(0);
  const reduced = useReducedMotion();

  const target = board.find((column) => column.id === emptyColumnId);
  const shown = variant === 'Column' && target ? [target] : board;

  function move(cardId: string) {
    setBoard((current) => {
      const card = current.flatMap((column) => column.cards).find((item) => item.id === cardId);
      if (!card) return current;
      return current.map((column) =>
        column.id === emptyColumnId
          ? { ...column, cards: [...column.cards, card] }
          : { ...column, cards: column.cards.filter((item) => item.id !== cardId) },
      );
    });
    onMove?.(cardId, emptyColumnId);
  }

  function commit(event: React.FormEvent) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    const card = { id: `n${(nextId.current += 1)}`, title: value, tag: 'new' };
    setBoard((current) =>
      current.map((column) =>
        column.id === emptyColumnId ? { ...column, cards: [...column.cards, card] } : column,
      ),
    );
    setDraft('');
    setComposing(false);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={`${board.reduce((sum, column) => sum + column.cards.length, 0)} cards`}
      className={className}
      bodyClassName="px-4 py-5 sm:px-5 sm:py-6"
    >
      <div
        className={cn(
          'grid gap-3',
          variant === 'Column' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3',
        )}
      >
        {shown.map((column) => {
          const isTarget = column.id === emptyColumnId;
          const isEmpty = column.cards.length === 0;

          return (
            <div key={column.id} className="min-w-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
                  {column.name}
                </span>
                <span className="font-mono text-[12.5px] tabular-nums text-neutral-600 dark:text-neutral-400">
                  {column.cards.length}
                </span>
              </div>

              <DropTarget
                active={isTarget && over}
                onDragOver={(event) => {
                  if (!isTarget) return;
                  event.preventDefault();
                  setOver(true);
                }}
                onDragLeave={() => isTarget && setOver(false)}
                onDrop={(event) => {
                  if (!isTarget) return;
                  event.preventDefault();
                  setOver(false);
                  const id = event.dataTransfer.getData('text/plain');
                  if (id) move(id);
                  setDragging(null);
                }}
                className={cn(
                  'flex min-h-[188px] flex-col gap-2 p-2',
                  !isTarget && 'border-transparent bg-black/[0.02] dark:bg-white/[0.03]',
                )}
              >
                <AnimatePresence initial={false}>
                  {column.cards.map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: dragging === card.id ? 0.45 : 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={SPRING_ENTRANCE}
                    >
                      {/* The native drag handlers live on a plain element: motion
                          owns `onDragStart` for its own gesture, and the two
                          signatures are not the same event. */}
                      <div
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData('text/plain', card.id);
                          event.dataTransfer.effectAllowed = 'move';
                          setDragging(card.id);
                        }}
                        onDragEnd={() => setDragging(null)}
                        className="cursor-grab rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] active:cursor-grabbing dark:border-white/[0.1] dark:bg-neutral-900"
                      >
                        <p className="text-[13.5px] font-medium text-neutral-800 dark:text-neutral-100">
                          {card.title}
                        </p>
                        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.07em] text-neutral-600 dark:text-neutral-400">
                          {card.tag}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTarget && isEmpty && !composing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={SPRING_FLUID}
                    className="flex flex-1 items-center justify-center py-2"
                  >
                    <EmptyState
                      icon={<IconCategory />}
                      medallionSize="sm"
                      backdrop="none"
                      title={over ? 'Drop it here' : title}
                      description={description}
                      className="max-w-[260px]"
                      actions={
                        <EmptyAction
                          emphasis="secondary"
                          icon={<IconPlus />}
                          onClick={() => setComposing(true)}
                          className="h-8 px-3 text-[13px]"
                        >
                          {addLabel}
                        </EmptyAction>
                      }
                    />
                  </motion.div>
                )}

                {isTarget && composing && (
                  <motion.form
                    onSubmit={commit}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={SPRING_FLUID}
                    className="flex flex-col gap-1.5"
                  >
                    <Input
                      autoFocus
                      value={draft}
                      placeholder="Card title"
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          setComposing(false);
                          setDraft('');
                        }
                      }}
                      className="h-8 rounded-xl border-black/[0.12] bg-white text-[13.5px] shadow-none dark:border-white/[0.14] dark:bg-white/[0.05]"
                    />
                    <div className="flex gap-1.5">
                      <EmptyAction type="submit" className="h-8 px-3 text-[13px]">
                        Add
                      </EmptyAction>
                      <EmptyAction
                        emphasis="quiet"
                        type="button"
                        onClick={() => setComposing(false)}
                        className="h-8 px-2.5 text-[13px]"
                      >
                        Cancel
                      </EmptyAction>
                    </div>
                  </motion.form>
                )}

                {isTarget && !isEmpty && !composing && (
                  <EmptyAction
                    emphasis="quiet"
                    icon={<IconPlus />}
                    onClick={() => setComposing(true)}
                    className="h-8 justify-start px-2 text-[13px]"
                  >
                    {addLabel}
                  </EmptyAction>
                )}
              </DropTarget>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center">
        <EmptyHint>Cards are draggable — the backlog column is a real source.</EmptyHint>
      </p>
    </EmptyPanel>
  );
}
