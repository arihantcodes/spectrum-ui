'use client';

import { useState } from 'react';
import { MessageSquare, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ConversationEntry {
  id: string;
  title: string;
  group: string;
  pinned?: boolean;
}

export type ConversationListVariant = 'Default' | 'Compact';

export interface ConversationListProps {
  conversations: ConversationEntry[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  variant?: ConversationListVariant;
  className?: string;
}

export function ConversationList({
  conversations,
  activeId: activeProp,
  onSelect,
  onTogglePin,
  variant = 'Default',
  className,
}: ConversationListProps) {
  const [activeState, setActiveState] = useState(conversations[0]?.id);
  const [pins, setPins] = useState<Set<string>>(
    new Set(conversations.filter((c) => c.pinned).map((c) => c.id)),
  );
  const active = activeProp !== undefined ? activeProp : activeState;
  const compact = variant === 'Compact';

  function select(id: string) {
    setActiveState(id);
    onSelect?.(id);
  }

  function togglePin(id: string) {
    setPins((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    onTogglePin?.(id);
  }

  const groups: string[] = [];
  for (const conversation of conversations) {
    if (!groups.includes(conversation.group)) groups.push(conversation.group);
  }

  return (
    <nav
      aria-label="Conversations"
      className={cn(
        'w-full max-w-[300px] rounded-2xl border border-black/[0.08] bg-white p-2 shadow-xs dark:border-white/[0.09] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      {groups.map((group) => (
        <div key={group} className="[&:not(:first-child)]:mt-3">
          <p className="px-2 pb-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600">
            {group}
          </p>
          <ul>
            {conversations
              .filter((conversation) => conversation.group === group)
              .map((conversation) => {
                const isActive = conversation.id === active;
                const pinned = pins.has(conversation.id);
                return (
                  <li key={conversation.id} className="group/item relative">
                    <button
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => select(conversation.id)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2 text-left transition-[background-color,transform] duration-150 active:scale-[0.99]',
                        compact ? 'py-1.5' : 'py-2',
                        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                        isActive
                          ? 'bg-black/[0.05] dark:bg-white/[0.07]'
                          : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]',
                      )}
                    >
                      <MessageSquare
                        className={cn(
                          'size-3.5 shrink-0',
                          isActive
                            ? 'text-neutral-700 dark:text-neutral-200'
                            : 'text-neutral-300 dark:text-neutral-600',
                        )}
                      />
                      <span
                        className={cn(
                          'min-w-0 flex-1 truncate pr-6',
                          compact ? 'text-[12px]' : 'text-[12.5px]',
                          isActive
                            ? 'font-medium text-neutral-900 dark:text-neutral-50'
                            : 'text-neutral-600 dark:text-neutral-400',
                        )}
                      >
                        {conversation.title}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={pinned ? `Unpin ${conversation.title}` : `Pin ${conversation.title}`}
                      aria-pressed={pinned}
                      onClick={() => togglePin(conversation.id)}
                      className={cn(
                        'absolute right-1.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md',
                        'transition-[opacity,color,transform] duration-150 active:scale-[0.9]',
                        'focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                        pinned
                          ? 'text-neutral-700 dark:text-neutral-200'
                          : 'text-neutral-400 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/item:opacity-100 dark:text-neutral-500',
                      )}
                    >
                      <Pin className={cn('size-3', pinned && 'fill-current')} />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default ConversationList;
