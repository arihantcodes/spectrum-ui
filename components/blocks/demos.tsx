'use client';

import { useEffect, useState } from 'react';
import { ChatThread } from '@/components/spectrumui/blocks/ai-assistants/chat-thread';
import { LoadingState } from '@/components/spectrumui/blocks/ai-assistants/loading-state';
import { ReasoningTrace } from '@/components/spectrumui/blocks/ai-assistants/reasoning-trace';
import {
  PORTSIDE_CONVERSATION,
  PORTSIDE_REASONING_STEPS,
} from '@/components/spectrumui/blocks/ai-assistants/_fixtures/conversation';
import type { Message } from '@/components/spectrumui/blocks/ai-assistants/types';

/**
 * Live demos, keyed by block slug. The specimen page renders these full-size on
 * the stage — the demo's job is to show the block *working*, on a loop, using
 * the shared Portside fixture. Every loop respects prefers-reduced-motion by
 * settling on the completed state instead of cycling.
 *
 * A block without a demo here cannot be marked `live` in the catalog.
 */
export const BLOCK_DEMOS: Record<string, (variant: string) => React.ReactNode> = {
  'loading-state': (variant) => (
    <LoadingState variant={variant as 'Drive' | 'Dots' | 'Orbit'} />
  ),
  'reasoning-trace': (variant) => (
    <ReasoningTraceDemo variant={variant as 'Steps' | 'Reasoning'} />
  ),
  'chat-thread': (variant) => (
    <ChatThreadDemo variant={variant as 'default' | 'compact' | 'bubbles'} />
  ),
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Thinks through the fixture steps, completes, holds, and starts over. */
function ReasoningTraceDemo({ variant }: { variant: 'Steps' | 'Reasoning' }) {
  const reduced = usePrefersReducedMotion();
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [status, setStatus] = useState<'thinking' | 'complete'>('thinking');

  useEffect(() => {
    if (reduced) return;
    if (status === 'thinking') {
      if (visibleSteps >= PORTSIDE_REASONING_STEPS.length) {
        const t = setTimeout(() => setStatus('complete'), 700);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setVisibleSteps((n) => n + 1), 1100);
      return () => clearTimeout(t);
    }
    // Hold the finished trace, then think again.
    const t = setTimeout(() => {
      setVisibleSteps(1);
      setStatus('thinking');
    }, 3600);
    return () => clearTimeout(t);
  }, [reduced, status, visibleSteps]);

  if (reduced) {
    return (
      <ReasoningTrace
        steps={PORTSIDE_REASONING_STEPS}
        status="complete"
        durationMs={4180}
        variant={variant}
        defaultOpen
      />
    );
  }

  return (
    <ReasoningTrace
      steps={PORTSIDE_REASONING_STEPS.slice(0, visibleSteps)}
      status={status}
      durationMs={PORTSIDE_REASONING_STEPS.length * 1100}
      variant={variant}
      defaultOpen
    />
  );
}

/** The full target text of the message the demo streams in. */
const STREAM_TARGET =
  'Checking the last four quarters for the same lane. Two comparable dips so far — Q3 last year during the Felixstowe crane refit, and February this year in storm week. Both recovered within a fortnight, so this one should too once Berth 3 is back.';

const SETTLED: Message[] = PORTSIDE_CONVERSATION.slice(0, 3);

/** Streams the fourth message word by word, completes, holds, and restarts. */
function ChatThreadDemo({ variant }: { variant: 'default' | 'compact' | 'bubbles' }) {
  const reduced = usePrefersReducedMotion();
  const words = STREAM_TARGET.split(' ');
  const [wordCount, setWordCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!done && wordCount >= words.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    if (done) {
      const t = setTimeout(() => {
        setWordCount(0);
        setDone(false);
      }, 4200);
      return () => clearTimeout(t);
    }
    // ~28ms/word with jitter reads as inference, not a typewriter.
    const t = setTimeout(() => setWordCount((n) => n + 1), 26 + Math.random() * 22);
    return () => clearTimeout(t);
  }, [reduced, done, wordCount, words.length]);

  const finished = reduced || done;
  const streamed: Message = {
    id: 'demo-stream',
    role: 'assistant',
    content: finished ? STREAM_TARGET : words.slice(0, wordCount).join(' '),
    state: finished ? 'complete' : 'streaming',
  };

  return (
    <div className="h-[420px] w-full max-w-[560px] overflow-hidden rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-[#0B0B0D]">
      <ChatThread
        messages={[...SETTLED, streamed]}
        isGenerating={!finished}
        assistantName="Portside"
        variant={variant}
      />
    </div>
  );
}
