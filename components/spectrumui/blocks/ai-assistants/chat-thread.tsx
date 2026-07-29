'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, Clock, Plus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation, Message } from './types';

/* ─────────────────────────────────────────────────────────
 * CHAT THREAD — a tabbed chat panel with a composer
 *
 * A complete conversation surface: conversation tabs in the
 * header, a streaming message thread with markdown, code
 * fences and citation markers, and a composer that swaps
 * its send arrow for a stop square while generating.
 *
 * The hard part is the scrolling. Autoscroll here is a
 * mode: it switches off the moment the reader scrolls away
 * from the bottom and back on when they return — instead of
 * yanking the viewport down on every token.
 *
 * Streaming text is aria-hidden while it arrives; the
 * finished message is announced once via a polite live
 * region. aria-live on the streaming node itself would make
 * a screen reader read every token.
 * ───────────────────────────────────────────────────────── */

export interface ChatThreadProps {
  messages: Message[];
  /** True while the last assistant message is still arriving. */
  isGenerating?: boolean;
  assistantName?: string;
  /** Conversation tabs in the header. Omit to hide the header. */
  conversations?: Conversation[];
  activeConversationId?: string;
  onConversationChange?: (id: string) => void;
  placeholder?: string;
  /** Called with the composer text. Omit to hide the composer. */
  onSend?: (text: string) => void;
  onStop?: () => void;
  variant?: 'default' | 'compact' | 'bubbles';
  /** Rendered above an assistant message — a reasoning trace, tool steps. */
  renderBefore?: (message: Message) => React.ReactNode;
  /** Rendered below an assistant message — actions like copy or regenerate. */
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
        'flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-[#0B0B0D]',
        className,
      )}
    >
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

/* ── Header: conversation tabs ──────────────────────────── */

function PanelHeader({
  conversations,
  activeId,
  onChange,
}: {
  conversations: Conversation[];
  activeId: string;
  onChange?: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.07]">
      <div
        role="tablist"
        aria-label="Conversations"
        className="flex gap-0.5 rounded-lg bg-black/[0.04] p-0.5 dark:bg-white/[0.05]"
      >
        {conversations.map((conversation) => {
          const active = conversation.id === activeId;
          return (
            <button
              key={conversation.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(conversation.id)}
              className={cn(
                'rounded-[7px] px-2.5 py-1 text-[12.5px] font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                active
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
              )}
            >
              {conversation.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-0.5 text-neutral-400 dark:text-neutral-500">
        <button
          type="button"
          aria-label="New conversation"
          className="grid size-7 place-items-center rounded-md transition-colors duration-150 hover:bg-black/[0.04] hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
        >
          <Plus className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="History"
          className="grid size-7 place-items-center rounded-md transition-colors duration-150 hover:bg-black/[0.04] hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
        >
          <Clock className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Thread: the message list ───────────────────────────── */

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

  // Reader intent: a 32px tolerance keeps momentum overscroll from reading as
  // "the user scrolled away".
  function handleScroll() {
    const element = viewport.current;
    if (!element) return;
    const fromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    setStickToBottom(fromBottom < 32);
  }

  // Layout effect, not effect: scrolling after paint flashes one frame at the
  // old position, which reads as a jump.
  useLayoutEffect(() => {
    if (!stickToBottom) return;
    const element = viewport.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, stickToBottom]);

  // Announce each completed assistant message exactly once.
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

      {/* Offering a way back down is what makes breaking autoscroll safe. */}
      {!stickToBottom && (
        <button
          type="button"
          onClick={() => setStickToBottom(true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] font-medium text-neutral-700 shadow-md transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-200"
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
      <article aria-label="You said" className="flex justify-end">
        <div
          className={cn(
            'max-w-[82%] rounded-2xl rounded-br-md bg-black/[0.05] px-3.5 py-2 leading-[1.6] text-neutral-900 dark:bg-white/[0.08] dark:text-neutral-100',
            compact ? 'text-[12.5px]' : 'text-[13.5px]',
          )}
        >
          {message.content}
        </div>
      </article>
    );
  }

  return (
    <article aria-label={`${assistantName} said`} className="group/message">
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
            'w-fit max-w-[92%] rounded-2xl rounded-tl-md bg-black/[0.03] px-3.5 py-2.5 dark:bg-white/[0.04]',
        )}
      >
        <MessageContent content={message.content} streaming={isStreaming} />
      </div>

      {actions && <div className="mt-1.5">{actions}</div>}
    </article>
  );
}

/* ── Composer ───────────────────────────────────────────── */

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

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="border-t border-black/[0.06] p-2.5 dark:border-white/[0.07]"
    >
      <div className="flex items-end gap-2 rounded-xl border border-black/[0.07] bg-black/[0.02] px-3 py-2 transition-colors duration-150 focus-within:border-black/[0.16] dark:border-white/[0.08] dark:bg-white/[0.03] dark:focus-within:border-white/[0.22]">
        <textarea
          ref={textarea}
          value={value}
          rows={1}
          placeholder={placeholder}
          aria-label="Message"
          onChange={(event) => {
            setValue(event.target.value);
            // Autosize with a max height that then scrolls.
            event.target.style.height = 'auto';
            event.target.style.height = `${Math.min(event.target.scrollHeight, 96)}px`;
          }}
          onKeyDown={(event) => {
            // isComposing: Enter must not submit mid-IME-composition, or this
            // silently breaks Japanese, Chinese and Korean input.
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-24 min-h-[22px] flex-1 resize-none bg-transparent text-[13.5px] leading-[1.6] text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] dark:bg-neutral-100 dark:text-neutral-900"
          >
            <Square className="size-2.5 fill-current" />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send message"
            disabled={!value.trim()}
            className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] disabled:opacity-30 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <ArrowUp className="size-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}

/* ── Markdown ───────────────────────────────────────────── */

/**
 * Minimal markdown: bold, inline code, fenced code blocks, [n] citations.
 *
 * Deliberately not react-markdown: a streaming message re-renders per token and
 * re-parsing the whole string each time is O(n²). This handles the subset
 * assistants actually emit and tolerates an unclosed fence mid-stream.
 */
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
                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-[caret_1s_steps(1,end)_infinite] bg-current motion-reduce:animate-none"
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

/** Splits fenced code blocks out of markdown, tolerating an unclosed fence. */
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

/** Flattens markdown for the screen-reader announcement. */
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
