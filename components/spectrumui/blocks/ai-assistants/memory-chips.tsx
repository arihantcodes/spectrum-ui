'use client';

import { useState } from 'react';
import { Brain, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-msg-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export interface MemoryItem {
  id: string;
  fact: string;
}

export type MemoryChipsVariant = 'Panel' | 'Row';

export interface MemoryChipsProps {
  memories: MemoryItem[];
  title?: string;
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  variant?: MemoryChipsVariant;
  className?: string;
}

export function MemoryChips({
  memories: memoriesProp,
  title = 'Assistant memory',
  onRemove,
  onAdd,
  variant = 'Panel',
  className,
}: MemoryChipsProps) {
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const memories = memoriesProp.filter((memory) => !removed.has(memory.id));

  function remove(id: string) {
    setRemoved((previous) => new Set(previous).add(id));
    onRemove?.(id);
  }

  const chips = (
    <ul className="flex flex-wrap gap-1.5">
      {memories.map((memory, index) => (
        <li
          key={memory.id}
          className="motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]"
          style={{ animationDelay: `${Math.min(index, 5) * 40}ms` }}
        >
          <span className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-1 pl-2.5 pr-1 text-[12px] text-neutral-700 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-neutral-300">
            {memory.fact}
            <button
              type="button"
              aria-label={`Forget: ${memory.fact}`}
              onClick={() => remove(memory.id)}
              className="grid size-4 place-items-center rounded-full text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.06] hover:text-neutral-700 active:scale-[0.85] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.1] dark:hover:text-neutral-200"
            >
              <X className="size-2.5" />
            </button>
          </span>
        </li>
      ))}
      {onAdd && (
        <li>
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1 rounded-full border border-dashed border-black/[0.14] px-2.5 py-1 text-[12px] text-neutral-400 transition-[color,border-color,transform] duration-150 hover:border-black/[0.24] hover:text-neutral-700 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.16] dark:text-neutral-500 dark:hover:border-white/[0.28] dark:hover:text-neutral-300"
          >
            <Plus className="size-3" />
            Add
          </button>
        </li>
      )}
    </ul>
  );

  if (variant === 'Row') {
    return (
      <div className={cn('w-full max-w-[500px]', className)}>
        <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
        {chips}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full max-w-[440px] rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Brain className="size-3.5 text-neutral-400 dark:text-neutral-500" />
          <h3 className="text-[13px] font-semibold tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-neutral-400 dark:text-neutral-600">
          {memories.length} saved
        </span>
      </div>
      {memories.length > 0 ? (
        chips
      ) : (
        <p className="py-2 text-[12.5px] text-neutral-400 dark:text-neutral-500">
          Nothing saved yet — the assistant remembers facts you confirm.
        </p>
      )}
    </div>
  );
}

export default MemoryChips;
