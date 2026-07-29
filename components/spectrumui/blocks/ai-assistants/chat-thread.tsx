'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, Clock, Plus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation, Message } from './types';

const KEYFRAMES = `
@keyframes su-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes su-msg-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export interface ChatThreadProps {
  messages: Message[];
  isGenerating?: boolean;
  assistantName?: string;
  conversations?: Conversation[];
  activeConversationId?: string;
  onConversationChange?: (id: string) => void;
  placeholder?: string;
  onSend?: (text: string) => void;
  onStop?: () => void;
  variant?: 'default' | 'compact' | 'bubbles';
  renderBefore?: (message: Message) => React.ReactNode;
  renderActions?: (message: Message) => React.ReactNode;
  className?: string;
}

export function ChatThread({
  messages,
  isGenerating = false,
  assistantName = 'Assistant',
  conversations,
  activeConversationId,
  onConversationChange,
  placeholder = 'Ask anything…',
  onSend,
  onStop,
  variant = 'default',
  renderBefore,
  renderActions,
  className,
}: ChatThreadProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm dark:border-white/[0.08] dark:bg-[#0B0B0D]',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {conversations && conversations.length > 0 && (
        <PanelHeader
          conversations={conversations}
          activeId={activeConversationId ?? conversations[0].id}
          onChange={onConversationChange}
        />
      )}

      <Thread
        messages={messages}
        isGenerating={isGenerating}
        assistantName={assistantName}
        variant={variant}
        renderBefore={renderBefore}
        renderActions={renderActions}
      />

      {onSend && (
        <Composer
          placeholder={placeholder}
          isGenerating={isGenerating}
          onSend={onSend}
          onStop={onStop}
        />
      )}
    </div>
  );
}

function PanelHeader({
  conversations,
  activeId,
  onChange,
}: {
  conversations: Conversation[];
  activeId: string;
  onChange?: (id: string) => void;
}) {
  const activeIndex = Math.max(
    0,
    conversations.findIndex((conversation) => conversation.id === activeId),
  );

  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.07]">
      <div
        role="tablist"
        aria-label="Conversations"
        className="relative isolate grid grid-flow-col auto-cols-fr rounded-lg bg-black/[0.04] p-0.5 dark:bg-white/[0.05]"
      >
        <span
          aria-hidden
          className="absolute inset-y-0.5 left-0.5 -z-10 rounded-[7px] bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-800"
          style={{
            width: `calc((100% - 4px) / ${conversations.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {conversations.map((conversation) => {
          const active = conversation.id === activeId;
          return (
            <button
              key={conversation.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(conversation.id)}
              className={cn(
                'rounded-[7px] px-2.5 py-1 text-[12.5px] font-medium transition-[color,transform] duration-150 active:scale-[0.96]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                active
                  ? 'text-neutral-900 dark:text-neutral-50'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
              )}
            >
              {conversation.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-0.5 text-neutral-400 dark:text-neutral-500">
        <HeaderButton label="New conversation">
          <Plus className="size-3.5" />
        </HeaderButton>
        <HeaderButton label="History">
          <Clock className="size-3.5" />
        </HeaderButton>
      </div>
    </div>
  );
}

function HeaderButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-7 place-items-center rounded-md transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
    >
      {children}
    </button>
  );
}

function Thread({
  messages,
  isGenerating,
  assistantName,
  variant,
  renderBefore,
  renderActions,
}: {
  messages: Message[];
  isGenerating: boolean;
  assistantName: string;
  variant: 'default' | 'compact' | 'bubbles';
  renderBefore?: (message: Message) => React.ReactNode;
  renderActions?: (message: Message) => React.ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [stickToBottom, setStickToBottom] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  function handleScroll() {
    const element = viewport.current;
    if (!element) return;
    const fromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    setStickToBottom(fromBottom < 32);
  }

  useLayoutEffect(() => {
    if (!stickToBottom) return;
    const element = viewport.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, stickToBottom]);

  const announced = useRef(new Set<string>());
  useEffect(() => {
    for (const message of messages) {
      if (message.role !== 'assistant' || message.state === 'streaming') continue;
      if (announced.current.has(message.id)) continue;
      announced.current.add(message.id);
      setAnnouncement(`${assistantName} said: ${stripMarkdown(message.content)}`);
    }
  }, [messages, assistantName]);

  const compact = variant === 'compact';

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={viewport}
        onScroll={handleScroll}
        role="log"
        aria-label="Conversation"
        aria-roledescription="conversation"
        aria-busy={isGenerating}
        tabIndex={0}
        className={cn(
          'h-full overflow-y-auto px-4 [overflow-anchor:auto] focus-visible:outline-none',
          compact ? 'space-y-3.5 py-3.5' : 'space-y-5 py-5',
        )}
      >
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            assistantName={assistantName}
            variant={variant}
            before={renderBefore?.(message)}
            actions={renderActions?.(message)}
          />
        ))}
      </div>

      {!stickToBottom && (
        <button
          type="button"
          onClick={() => setStickToBottom(true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] font-medium text-neutral-700 shadow-md transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] motion-safe:animate-[su-msg-in_200ms_cubic-bezier(0.23,1,0.32,1)_both] dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-200"
        >
          Jump to latest
        </button>
      )}

      <p aria-live="polite" role="status" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

function MessageRow({
  message,
  assistantName,
  variant,
  before,
  actions,
}: {
  message: Message;
  assistantName: string;
  variant: 'default' | 'compact' | 'bubbles';
  before?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const isUser = message.role === 'user';
  const isStreaming = message.state === 'streaming';
  const compact = variant === 'compact';
  const bubbles = variant === 'bubbles';

  if (isUser) {
    return (
      <article
        aria-label="You said"
        className="flex justify-end motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]"
      >
        <div
          className={cn(
            'max-w-[82%] rounded-[16px] rounded-br-[6px] bg-black/[0.05] px-3.5 py-2 leading-[1.6] text-neutral-900 dark:bg-white/[0.08] dark:text-neutral-100',
            compact ? 'text-[12.5px]' : 'text-[13.5px]',
          )}
        >
          {message.content}
        </div>
      </article>
    );
  }

  return (
    <article
      aria-label={`${assistantName} said`}
      className="group/message motion-safe:animate-[su-msg-in_240ms_cubic-bezier(0.23,1,0.32,1)_both]"
    >
      <div className={cn('mb-1.5 flex items-center gap-1.5', compact && 'mb-1')}>
        <span className="grid size-4 place-items-center rounded-full bg-neutral-900 text-[8.5px] font-bold text-white dark:bg-neutral-100 dark:text-neutral-900">
          {assistantName.charAt(0)}
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-neutral-400 dark:text-neutral-500">
          {assistantName}
        </span>
      </div>

      {before}

      <div
        className={cn(
          'leading-[1.65] text-neutral-700 dark:text-neutral-300',
          compact ? 'text-[12.5px]' : 'text-[13.5px]',
          bubbles &&
            'w-fit max-w-[92%] rounded-[16px] rounded-tl-[6px] bg-black/[0.03] px-3.5 py-2.5 dark:bg-white/[0.04]',
        )}
      >
        <MessageContent content={message.content} streaming={isStreaming} />
      </div>

      {actions && <div className="mt-1.5">{actions}</div>}
    </article>
  );
}

function Composer({
  placeholder,
  isGenerating,
  onSend,
  onStop,
}: {
  placeholder: string;
  isGenerating: boolean;
  onSend: (text: string) => void;
  onStop?: () => void;
}) {
  const [value, setValue] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const text = value.trim();
    if (!text || isGenerating) return;
    onSend(text);
    setValue('');
    if (textarea.current) textarea.current.style.height = 'auto';
  }

  const canSend = value.trim().length > 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="border-t border-black/[0.06] p-2.5 dark:border-white/[0.07]"
    >
      <div className="flex items-end gap-2 rounded-xl border border-black/[0.07] bg-black/[0.02] px-3 py-2 transition-[border-color,box-shadow] duration-150 focus-within:border-black/[0.16] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:focus-within:border-white/[0.22] dark:focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]">
        <textarea
          ref={textarea}
          value={value}
          rows={1}
          placeholder={placeholder}
          aria-label="Message"
          onChange={(event) => {
            setValue(event.target.value);
            event.target.style.height = 'auto';
            event.target.style.height = `${Math.min(event.target.scrollHeight, 96)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-24 min-h-[22px] flex-1 resize-none bg-transparent text-[13.5px] leading-[1.6] text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        <button
          type={isGenerating ? 'button' : 'submit'}
          onClick={isGenerating ? onStop : undefined}
          aria-label={isGenerating ? 'Stop generating' : 'Send message'}
          disabled={!isGenerating && !canSend}
          className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] disabled:opacity-30 dark:bg-neutral-100 dark:text-neutral-900"
        >
          <span className="relative grid size-3.5 place-items-center">
            <ArrowUp
              className={cn(
                'absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                isGenerating ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0',
              )}
            />
            <Square
              className={cn(
                'absolute size-2.5 fill-current transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                isGenerating ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]',
              )}
            />
          </span>
        </button>
      </div>
    </form>
  );
}

function MessageContent({ content, streaming }: { content: string; streaming?: boolean }) {
  const segments = splitFences(content);

  return (
    <div aria-hidden={streaming ? 'true' : undefined}>
      {segments.map((segment, index) =>
        segment.type === 'code' ? (
          <pre
            key={index}
            tabIndex={0}
            aria-label={`Code block${segment.lang ? ` in ${segment.lang}` : ''}`}
            className="my-2.5 overflow-x-auto rounded-lg bg-neutral-950 p-3 font-mono text-[11.5px] leading-[1.6] text-neutral-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-black"
          >
            <code>{segment.value}</code>
          </pre>
        ) : (
          <p key={index} className="whitespace-pre-wrap [&:not(:first-child)]:mt-2.5">
            <InlineMarkdown value={segment.value} />
            {streaming && index === segments.length - 1 && (
              <span
                aria-hidden
                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-[su-caret_1s_steps(1,end)_infinite] bg-current motion-reduce:animate-none"
              />
            )}
          </p>
        ),
      )}
    </div>
  );
}

function InlineMarkdown({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|`[^`]+`|\[\d+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-neutral-900 dark:text-neutral-50">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="rounded bg-black/[0.05] px-1 py-0.5 font-mono text-[11.5px] text-neutral-800 dark:bg-white/[0.08] dark:text-neutral-200"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (/^\[\d+\]$/.test(part)) {
          return (
            <sup
              key={index}
              className="ml-0.5 inline-grid size-[14px] place-items-center rounded bg-black/[0.07] align-super font-mono text-[8.5px] font-semibold text-neutral-600 dark:bg-white/[0.1] dark:text-neutral-300"
            >
              {part.slice(1, -1)}
            </sup>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

type Segment = { type: 'text' | 'code'; value: string; lang?: string };

function splitFences(content: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /```(\w*)\n([\s\S]*?)(?:```|$)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(content)) !== null) {
    if (match.index > cursor) {
      segments.push({ type: 'text', value: content.slice(cursor, match.index).trimEnd() });
    }
    segments.push({ type: 'code', value: match[2].replace(/\n$/, ''), lang: match[1] || undefined });
    cursor = match.index + match[0].length;
  }
  if (cursor < content.length) {
    segments.push({ type: 'text', value: content.slice(cursor) });
  }
  return segments.filter((segment) => segment.value.length > 0);
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, ' code block ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(\d+)\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default ChatThread;
