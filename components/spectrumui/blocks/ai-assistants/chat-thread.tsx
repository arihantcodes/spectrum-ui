'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Message } from './types';

export interface ChatThreadProps {
  messages: Message[];
  /** True while the last assistant message is still arriving. */
  isGenerating?: boolean;
  /** Name shown above assistant messages. */
  assistantName?: string;
  /** Rendered under an assistant message — pass <MessageActions />. */
  renderActions?: (message: Message) => React.ReactNode;
  /** Rendered above an assistant message — pass <ReasoningTrace /> or <AgentSteps />. */
  renderBefore?: (message: Message) => React.ReactNode;
  variant?: 'default' | 'compact' | 'bubbles';
  className?: string;
}

/**
 * A conversation thread with streaming, markdown, and correct scroll behaviour.
 *
 * The hard part is not the layout, it is the scrolling. Calling scrollIntoView on
 * every token fights the reader: scroll up to re-read something and the next
 * token yanks you back to the bottom. Here, autoscroll is a mode that switches
 * off the moment you scroll away from the bottom and back on when you return.
 *
 * Screen readers are handled the same way: the streaming text is aria-hidden
 * while it arrives — announcing every token is unusable — and the finished
 * message is announced once through a polite live region.
 */
export function ChatThread({
  messages,
  isGenerating = false,
  assistantName = 'Assistant',
  renderActions,
  renderBefore,
  variant = 'default',
  className,
}: ChatThreadProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const [stickToBottom, setStickToBottom] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  // Track reader intent. A 32px tolerance keeps sub-pixel scroll positions and
  // momentum overscroll from reading as "the user scrolled away".
  function handleScroll() {
    const element = viewport.current;
    if (!element) return;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    setStickToBottom(distanceFromBottom < 32);
  }

  // Layout effect, not effect: scrolling after paint shows one frame at the old
  // position, which reads as a jump.
  useLayoutEffect(() => {
    if (!stickToBottom) return;
    const element = viewport.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages, stickToBottom]);

  // Announce only completed assistant messages, and only once each.
  const announced = useRef(new Set<string>());
  useEffect(() => {
    for (const message of messages) {
      if (message.role !== 'assistant') continue;
      if (message.state === 'streaming') continue;
      if (announced.current.has(message.id)) continue;
      announced.current.add(message.id);
      setAnnouncement(`${assistantName} said: ${stripMarkdown(message.content)}`);
    }
  }, [messages, assistantName]);

  const isBubbles = variant === 'bubbles';
  const gap = variant === 'compact' ? 'space-y-4' : 'space-y-7';

  return (
    <div className={cn('relative flex h-full flex-col', className)}>
      <div
        ref={viewport}
        onScroll={handleScroll}
        role="log"
        aria-label="Conversation"
        aria-roledescription="conversation"
        aria-busy={isGenerating}
        tabIndex={0}
        className={cn(
          'flex-1 overflow-y-auto px-5 py-6',
          // Lets the browser hold scroll position when content grows above.
          '[overflow-anchor:auto] focus-visible:outline-none',
          gap,
        )}
      >
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            assistantName={assistantName}
            bubbles={isBubbles}
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
          className={cn(
            'absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-3 py-1.5',
            'text-[12px] font-medium text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900',
            'transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
          )}
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
  bubbles,
  before,
  actions,
}: {
  message: Message;
  assistantName: string;
  bubbles: boolean;
  before?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const isUser = message.role === 'user';
  const isStreaming = message.state === 'streaming';

  return (
    <article
      className={cn('group/message flex flex-col', isUser && bubbles && 'items-end')}
      aria-label={isUser ? 'You said' : `${assistantName} said`}
    >
      {!isUser && (
        <div className="mb-2 flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
            {assistantName.charAt(0)}
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-500">
            {assistantName}
          </span>
        </div>
      )}

      {before}

      <div
        className={cn(
          'text-[14px] leading-[1.65] text-neutral-800 dark:text-neutral-200',
          isUser && bubbles && 'max-w-[85%] rounded-2xl bg-neutral-100 px-4 py-2.5 dark:bg-neutral-800',
          isUser && !bubbles && 'font-medium text-neutral-900 dark:text-neutral-100',
        )}
      >
        <MessageContent content={message.content} streaming={isStreaming} />
      </div>

      {actions && <div className="mt-2">{actions}</div>}
    </article>
  );
}

/**
 * Minimal markdown: bold, inline code, and fenced code blocks.
 *
 * Deliberately not react-markdown. A streaming message re-renders on every
 * token, and re-parsing the whole string each time is O(n²) — noticeable by a
 * few hundred tokens. This handles the subset assistants actually emit, and
 * tolerates an unclosed fence mid-stream instead of flashing raw backticks.
 */
function MessageContent({ content, streaming }: { content: string; streaming?: boolean }) {
  const segments = splitFences(content);

  return (
    // While streaming, hide from assistive tech; the completed message is
    // announced once by the thread's live region instead.
    <div aria-hidden={streaming ? 'true' : undefined}>
      {segments.map((segment, index) =>
        segment.type === 'code' ? (
          <pre
            key={index}
            tabIndex={0}
            aria-label={`Code block${segment.lang ? ` in ${segment.lang}` : ''}`}
            className="my-3 overflow-x-auto rounded-lg bg-neutral-950 p-3 font-mono text-[12.5px] leading-[1.6] text-neutral-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9452d] dark:bg-black"
          >
            <code>{segment.value}</code>
          </pre>
        ) : (
          <p key={index} className="whitespace-pre-wrap [&:not(:first-child)]:mt-3">
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
  // Split on **bold**, `code`, and [1] citation markers in one pass.
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
              className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[12.5px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (/^\[\d+\]$/.test(part)) {
          return (
            <sup
              key={index}
              className="ml-0.5 inline-grid size-[15px] place-items-center rounded bg-neutral-200 align-super font-mono text-[9px] font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
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
