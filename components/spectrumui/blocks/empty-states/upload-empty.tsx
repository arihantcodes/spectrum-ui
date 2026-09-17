'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  DropTarget,
  EmptyAction,
  EmptyHint,
  EmptyMeter,
  EmptyPanel,
  EmptyState,
  IconDocument,
  IconTickSquare,
  IconUpload,
  SPRING_FLUID,
  SPRING_SNAPPY,
} from './empty-state-kit';

export type UploadEmptyVariant = 'Dropzone' | 'Compact' | 'Uploading';

export interface UploadEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  accept?: string;
  maxLabel?: string;
  browseLabel?: string;
  onFiles?: (files: File[]) => void;
  variant?: UploadEmptyVariant;
  className?: string;
}

interface Landed {
  id: number;
  name: string;
  size: string;
  progress: number;
}

const SAMPLE: Omit<Landed, 'id' | 'progress'>[] = [
  { name: 'q3-revenue.csv', size: '2.4 MB' },
  { name: 'cohorts-2026.parquet', size: '18.1 MB' },
  { name: 'schema.sql', size: '11 KB' },
];

function formatSize(bytes: number) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1000) return `${Math.round(bytes / 1000)} KB`;
  return `${bytes} B`;
}

export function UploadEmpty({
  panelTitle = 'Files',
  title = 'Nothing uploaded yet',
  description = 'Drop files anywhere on this panel, or pick them from your machine. Uploads resume if the connection drops.',
  accept = '.csv,.parquet,.sql,.json',
  maxLabel = 'CSV, Parquet, SQL or JSON up to 2 GB',
  browseLabel = 'Choose files',
  onFiles,
  variant = 'Dropzone',
  className,
}: UploadEmptyProps) {
  const [over, setOver] = React.useState(false);
  const [files, setFiles] = React.useState<Landed[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const nextId = React.useRef(0);
  const reduced = useReducedMotion();
  const depth = React.useRef(0);

  React.useEffect(() => {
    if (variant !== 'Uploading' || files.length) return;
    setFiles(SAMPLE.map((file) => ({ ...file, id: (nextId.current += 1), progress: 0 })));
  }, [variant, files.length]);

  /* One interval drives every row, so the bars advance together instead of
     drifting apart the way per-row timers do. */
  React.useEffect(() => {
    if (!files.some((file) => file.progress < 1)) return;
    const tick = setInterval(
      () => {
        setFiles((current) =>
          current.map((file, index) =>
            file.progress >= 1
              ? file
              : { ...file, progress: Math.min(1, file.progress + 0.08 + index * 0.02) },
          ),
        );
      },
      reduced ? 40 : 160,
    );
    return () => clearInterval(tick);
  }, [files, reduced]);

  const add = React.useCallback(
    (incoming: File[]) => {
      if (!incoming.length) return;
      setFiles((current) => [
        ...current,
        ...incoming.map((file) => ({
          id: (nextId.current += 1),
          name: file.name,
          size: formatSize(file.size),
          progress: 0,
        })),
      ]);
      onFiles?.(incoming);
    },
    [onFiles],
  );

  /* dragenter fires again for every child the pointer crosses, so a counter is
     the only way to know when it has genuinely left the target. */
  function onDragEnter(event: React.DragEvent) {
    event.preventDefault();
    depth.current += 1;
    setOver(true);
  }

  function onDragLeave(event: React.DragEvent) {
    event.preventDefault();
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setOver(false);
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    depth.current = 0;
    setOver(false);
    add(Array.from(event.dataTransfer.files));
  }

  const done = files.length > 0 && files.every((file) => file.progress >= 1);

  return (
    <EmptyPanel
      title={panelTitle}
      meta={files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : 'Empty'}
      className={className}
      bodyClassName="p-3 sm:p-4"
    >
      <DropTarget
        active={over}
        onDragEnter={onDragEnter}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn('px-5 py-14 sm:px-8', variant === 'Compact' && 'py-9')}
      >
        <EmptyState
          icon={<IconUpload />}
          medallionSize={variant === 'Compact' ? 'sm' : 'md'}
          backdrop={variant === 'Compact' ? 'none' : 'beam'}
          tone={done ? 'positive' : 'neutral'}
          title={
            done
              ? `${files.length} file${files.length > 1 ? 's' : ''} ready`
              : over
                ? 'Drop them here'
                : title
          }
          description={variant === 'Compact' ? undefined : description}
          actions={
            <>
              <EmptyAction icon={<IconUpload />} onClick={() => inputRef.current?.click()}>
                {browseLabel}
              </EmptyAction>
              {files.length > 0 && (
                <EmptyAction emphasis="quiet" onClick={() => setFiles([])}>
                  Clear
                </EmptyAction>
              )}
            </>
          }
          footnote={<EmptyHint>{maxLabel}</EmptyHint>}
        >
          {files.length > 0 && (
            <AnimatePresence initial={false}>
              <motion.ul
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full max-w-[420px] flex-col gap-1.5"
              >
                {files.map((file) => (
                  <motion.li
                    key={file.id}
                    layout
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={SPRING_SNAPPY}
                    className="flex min-w-0 items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-2 text-left dark:border-white/[0.09] dark:bg-white/[0.03]"
                  >
                    <span
                      className={cn(
                        'shrink-0 [&_svg]:size-4',
                        file.progress >= 1
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-neutral-400 dark:text-neutral-500',
                      )}
                    >
                      {file.progress >= 1 ? <IconTickSquare /> : <IconDocument />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex min-w-0 items-baseline justify-between gap-3">
                        <span className="truncate text-[12.5px] font-medium text-neutral-800 dark:text-neutral-100">
                          {file.name}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
                          {file.size}
                        </span>
                      </span>
                      {file.progress < 1 && (
                        <EmptyMeter value={file.progress} className="mt-1.5 h-1" />
                      )}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          )}
        </EmptyState>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            add(Array.from(event.target.files ?? []));
            event.target.value = '';
          }}
        />
      </DropTarget>

      <AnimatePresence>
        {over && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_FLUID}
            aria-live="polite"
            className="sr-only"
          >
            Release to upload
          </motion.p>
        )}
      </AnimatePresence>
    </EmptyPanel>
  );
}
