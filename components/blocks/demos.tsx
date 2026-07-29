'use client';

import { useEffect, useState } from 'react';
import { ChatThread } from '@/components/spectrumui/blocks/ai-assistants/chat-thread';
import { LoadingState } from '@/components/spectrumui/blocks/ai-assistants/loading-state';
import { ReasoningTrace } from '@/components/spectrumui/blocks/ai-assistants/reasoning-trace';
import { StreamingText } from '@/components/spectrumui/blocks/ai-assistants/streaming-text';
import { PromptComposer } from '@/components/spectrumui/blocks/ai-assistants/prompt-composer';
import { ChatEmptyState } from '@/components/spectrumui/blocks/ai-assistants/chat-empty-state';
import { MessageActions } from '@/components/spectrumui/blocks/ai-assistants/message-actions';
import { CitationSources } from '@/components/spectrumui/blocks/ai-assistants/citation-sources';
import { AgentSteps } from '@/components/spectrumui/blocks/ai-assistants/agent-steps';
import { ToolChips } from '@/components/spectrumui/blocks/ai-assistants/tool-chips';
import { ApprovalCard } from '@/components/spectrumui/blocks/ai-assistants/approval-card';
import { ModelSelector } from '@/components/spectrumui/blocks/ai-assistants/model-selector';
import { UsageMeter } from '@/components/spectrumui/blocks/ai-assistants/usage-meter';
import { VoiceInput } from '@/components/spectrumui/blocks/ai-assistants/voice-input';
import { InlineEdit } from '@/components/spectrumui/blocks/ai-assistants/inline-edit';
import {
  PORTSIDE_CITATIONS,
  PORTSIDE_CONVERSATION,
  PORTSIDE_GREETING,
  PORTSIDE_MODELS,
  PORTSIDE_REASONING_STEPS,
  PORTSIDE_SUGGESTED_PROMPTS,
  PORTSIDE_TOOL_CALLS,
  PORTSIDE_USAGE,
} from '@/components/spectrumui/blocks/ai-assistants/_fixtures/conversation';
import type {
  Attachment,
  Message,
  ToolCall,
  ToolCallStatus,
} from '@/components/spectrumui/blocks/ai-assistants/types';

/**
 * Live demos, keyed by block slug. The specimen page renders these full-size on
 * the stage — the demo's job is to show the block *working*, on a loop, using
 * the shared Portside fixture. Loops yield to the viewer the moment they
 * interact, and settle to the completed state under prefers-reduced-motion.
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
    <ChatThreadDemo variant={variant.toLowerCase() as 'default' | 'compact' | 'bubbles'} />
  ),
  'streaming-text': (variant) => (
    <StreamingTextDemo variant={variant as 'Answer' | 'Sources'} />
  ),
  'prompt-composer': (variant) => (
    <PromptComposerDemo variant={variant as 'Default' | 'Minimal'} />
  ),
  'chat-empty-state': (variant) => (
    <ChatEmptyState
      title={PORTSIDE_GREETING.title}
      subtitle={PORTSIDE_GREETING.subtitle}
      prompts={PORTSIDE_SUGGESTED_PROMPTS}
      variant={variant as 'Default' | 'Centered'}
    />
  ),
  'message-actions': (variant) => (
    <MessageActionsDemo variant={variant as 'Ghost' | 'Pill'} />
  ),
  'citation-sources': (variant) => (
    <CitationSources
      text="Rotterdam–Felixstowe on-time delivery fell to 71.4% last week [1]. The cause was terminal congestion at Rotterdam following a crane fault at Berth 3 [2], and average transit ran 2.3 days over the contracted SLA with Meridian Lines [3]."
      citations={PORTSIDE_CITATIONS}
      variant={variant as 'Inline' | 'Footnotes'}
    />
  ),
  'agent-steps': (variant) => (
    <AgentStepsDemo variant={variant as 'Default' | 'Compact'} />
  ),
  'tool-chips': (variant) => (
    <ToolChipsDemo variant={variant as 'Row' | 'Stack'} />
  ),
  'approval-card': () => <ApprovalCardDemo />,
  'model-selector': (variant) => (
    <ModelSelector models={PORTSIDE_MODELS} variant={variant as 'List' | 'Segmented'} />
  ),
  'usage-meter': (variant) => (
    <UsageMeterDemo variant={variant as 'Bar' | 'Inline'} />
  ),
  'voice-input': () => <VoiceInputDemo />,
  'inline-edit': () => <InlineEditDemo />,
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

/** Streams `target` word by word; calls back when it settles. */
function useWordStream(target: string, reduced: boolean, holdMs: number, loop: boolean) {
  const words = target.split(' ');
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setCount(0);
    setDone(false);
  }, [target]);

  useEffect(() => {
    if (reduced) return;
    if (!done && count >= words.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    if (done) {
      if (!loop) return;
      const t = setTimeout(() => {
        setCount(0);
        setDone(false);
      }, holdMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((n) => n + 1), 26 + Math.random() * 22);
    return () => clearTimeout(t);
  }, [reduced, done, count, words.length, holdMs, loop]);

  const finished = reduced || done;
  return {
    text: finished ? target : words.slice(0, count).join(' '),
    finished,
    settle: () => setDone(true),
  };
}

/* ── Reasoning Trace ────────────────────────────────────── */

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

/* ── Chat Thread ────────────────────────────────────────── */

const AUTO_REPLY =
  'Checking the last four quarters for the same lane. Two comparable dips so far — Q3 last year during the Felixstowe crane refit, and February this year in storm week. Both recovered within a fortnight, so this one should too once Berth 3 is back.';

const MANUAL_REPLY =
  "Good question — I'll fold that into the lane report and flag anything that moves more than two points week over week.";

const SETTLED: Message[] = PORTSIDE_CONVERSATION.slice(0, 3);

const DEMO_CONVERSATIONS = [
  { id: 'lanes', label: 'Lanes' },
  { id: 'carriers', label: 'Carriers' },
];

function ChatThreadDemo({ variant }: { variant: 'default' | 'compact' | 'bubbles' }) {
  const reduced = usePrefersReducedMotion();
  const [conversation, setConversation] = useState('lanes');
  const [sent, setSent] = useState<Message[]>([]);
  const [target, setTarget] = useState(AUTO_REPLY);
  const stream = useWordStream(target, reduced, 4200, sent.length === 0);

  function handleSend(text: string) {
    setSent((previous) => [
      ...previous,
      { id: `sent-${previous.length}`, role: 'user', content: text, state: 'complete' },
    ]);
    setTarget(text === target ? `${MANUAL_REPLY} ` : MANUAL_REPLY);
  }

  const streamed: Message = {
    id: `demo-stream-${sent.length}`,
    role: 'assistant',
    content: stream.text,
    state: stream.finished ? 'complete' : 'streaming',
  };

  return (
    <div className="h-[480px] w-full max-w-[600px]">
      <ChatThread
        messages={[...SETTLED, ...sent, streamed]}
        isGenerating={!stream.finished}
        assistantName="Portside"
        variant={variant}
        conversations={DEMO_CONVERSATIONS}
        activeConversationId={conversation}
        onConversationChange={setConversation}
        placeholder="Ask about your freight…"
        onSend={handleSend}
        onStop={stream.settle}
      />
    </div>
  );
}

/* ── Streaming Text ─────────────────────────────────────── */

const STREAMING_SUMMARY =
  'Rotterdam–Felixstowe slipped to **71.4% on-time** last week [1] after a crane fault cut berth availability at Rotterdam [2]. Transit ran 2.3 days over the Meridian Lines SLA [3], outside the grace window.';

function StreamingTextDemo({ variant }: { variant: 'Answer' | 'Sources' }) {
  const reduced = usePrefersReducedMotion();
  const stream = useWordStream(STREAMING_SUMMARY, reduced, 5200, true);

  return (
    <StreamingText
      text={stream.text}
      streaming={!stream.finished}
      citations={PORTSIDE_CITATIONS}
      followUps={PORTSIDE_SUGGESTED_PROMPTS.slice(0, 2)}
      variant={variant}
    />
  );
}

/* ── Prompt Composer ────────────────────────────────────── */

function PromptComposerDemo({ variant }: { variant: 'Default' | 'Minimal' }) {
  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: 'a1', name: 'lane-report-w28.pdf', size: 248_000, type: 'application/pdf' },
  ]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!generating) return;
    const t = setTimeout(() => setGenerating(false), 1800);
    return () => clearTimeout(t);
  }, [generating]);

  return (
    <PromptComposer
      placeholder="Ask about your freight…"
      models={PORTSIDE_MODELS}
      attachments={variant === 'Minimal' ? [] : attachments}
      onRemoveAttachment={(id) =>
        setAttachments((previous) => previous.filter((attachment) => attachment.id !== id))
      }
      onAttach={() =>
        setAttachments((previous) =>
          previous.some((attachment) => attachment.id === 'a2')
            ? previous
            : [
                ...previous,
                { id: 'a2', name: 'berth-schedule.csv', size: 61_000, type: 'text/csv' },
              ],
        )
      }
      onSend={() => setGenerating(true)}
      onStop={() => setGenerating(false)}
      isGenerating={generating}
      variant={variant}
    />
  );
}

/* ── Message Actions ────────────────────────────────────── */

function MessageActionsDemo({ variant }: { variant: 'Ghost' | 'Pill' }) {
  return (
    <div className="group/message w-full max-w-[440px] rounded-2xl border border-black/[0.07] bg-white p-4 dark:border-white/[0.08] dark:bg-[#0B0B0D]">
      <p className="text-[13px] leading-[1.65] text-neutral-700 dark:text-neutral-300">
        Average transit ran 6.3 days against a contracted 4.0 — that reads as an
        SLA breach rather than acceptable variance.
      </p>
      <div className="mt-2.5">
        <MessageActions
          content="Average transit ran 6.3 days against a contracted 4.0 — that reads as an SLA breach rather than acceptable variance."
          onBranch={() => {}}
          variant={variant}
        />
      </div>
    </div>
  );
}

/* ── Agent Steps ────────────────────────────────────────── */

function withStatuses(calls: ToolCall[], through: number, running: boolean): ToolCall[] {
  return calls.map((call, index) => {
    const status: ToolCallStatus =
      index < through ? 'success' : index === through ? (running ? 'running' : 'pending') : 'pending';
    return { ...call, status: index === 3 && index <= through ? 'pending' : status };
  });
}

function AgentStepsDemo({ variant }: { variant: 'Default' | 'Compact' }) {
  const reduced = usePrefersReducedMotion();
  const [through, setThrough] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => setThrough((n) => (n >= PORTSIDE_TOOL_CALLS.length + 1 ? 0 : n + 1)),
      through === 0 ? 900 : 1400,
    );
    return () => clearTimeout(t);
  }, [reduced, through]);

  const steps = reduced
    ? PORTSIDE_TOOL_CALLS
    : withStatuses(PORTSIDE_TOOL_CALLS, through, through < PORTSIDE_TOOL_CALLS.length);

  return <AgentSteps steps={steps} variant={variant} />;
}

/* ── Tool Chips ─────────────────────────────────────────── */

function ToolChipsDemo({ variant }: { variant: 'Row' | 'Stack' }) {
  const reduced = usePrefersReducedMotion();
  const [through, setThrough] = useState(PORTSIDE_TOOL_CALLS.length);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => setThrough((n) => (n >= PORTSIDE_TOOL_CALLS.length + 1 ? 0 : n + 1)),
      1600,
    );
    return () => clearTimeout(t);
  }, [reduced, through]);

  const calls = reduced ? PORTSIDE_TOOL_CALLS : withStatuses(PORTSIDE_TOOL_CALLS, through, true);
  return <ToolChips calls={calls} variant={variant} />;
}

/* ── Approval Card ──────────────────────────────────────── */

function ApprovalCardDemo() {
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);

  useEffect(() => {
    if (!decision) return;
    const t = setTimeout(() => setDecision(null), 3200);
    return () => clearTimeout(t);
  }, [decision]);

  return <ApprovalCard decision={decision} onDecide={setDecision} />;
}

/* ── Usage Meter ────────────────────────────────────────── */

function UsageMeterDemo({ variant }: { variant: 'Bar' | 'Inline' }) {
  const reduced = usePrefersReducedMotion();
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (reduced) {
      setFilled(true);
      return;
    }
    const t = setTimeout(() => setFilled((f) => !f), filled ? 4200 : 1200);
    return () => clearTimeout(t);
  }, [reduced, filled]);

  const usage = filled
    ? PORTSIDE_USAGE
    : { ...PORTSIDE_USAGE, promptTokens: 320, completionTokens: 0, estimatedCostUsd: 0.0021 };

  return <UsageMeter usage={usage} variant={variant} />;
}

/* ── Voice Input ────────────────────────────────────────── */

function VoiceInputDemo() {
  const reduced = usePrefersReducedMotion();
  const [manual, setManual] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'recording' | 'processing'>('idle');

  useEffect(() => {
    if (manual || reduced) return;
    const delays = { idle: 1600, recording: 3800, processing: 1400 } as const;
    const next = { idle: 'recording', recording: 'processing', processing: 'idle' } as const;
    const t = setTimeout(() => setPhase((p) => next[p]), delays[phase]);
    return () => clearTimeout(t);
  }, [manual, reduced, phase]);

  if (manual) {
    return <VoiceInput onStart={() => {}} />;
  }

  return (
    <VoiceInput
      state={reduced ? 'recording' : phase}
      onStart={() => setManual(true)}
      onConfirm={() => setManual(true)}
      onCancel={() => setManual(true)}
    />
  );
}

/* ── Inline Edit ────────────────────────────────────────── */

function InlineEditDemo() {
  const reduced = usePrefersReducedMotion();
  const [manual, setManual] = useState(false);
  const [phase, setPhase] = useState<'selected' | 'reviewing' | 'accepted'>('selected');

  useEffect(() => {
    if (manual || reduced) return;
    const delays = { selected: 2000, reviewing: 2600, accepted: 2800 } as const;
    const next = { selected: 'reviewing', reviewing: 'accepted', accepted: 'selected' } as const;
    const t = setTimeout(() => setPhase((p) => next[p]), delays[phase]);
    return () => clearTimeout(t);
  }, [manual, reduced, phase]);

  return (
    <InlineEdit
      before="Meridian Lines ran 2.3 days over the contracted transit window, "
      selection="which is a situation that we think may possibly warrant some kind of formal follow-up"
      suggestion="which warrants a formal SLA-breach notice"
      after=" before the next sailing."
      phase={manual ? undefined : reduced ? 'reviewing' : phase}
      onAccept={() => setManual(true)}
      onReject={() => setManual(true)}
    />
  );
}
