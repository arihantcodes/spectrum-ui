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
import { ThinkingDots } from '@/components/spectrumui/blocks/ai-assistants/thinking-dots';
import { TaskRows, type TaskRow } from '@/components/spectrumui/blocks/ai-assistants/task-rows';
import { AgentPlan } from '@/components/spectrumui/blocks/ai-assistants/agent-plan';
import { WebSearch, type SearchResult } from '@/components/spectrumui/blocks/ai-assistants/web-search';
import { ContextChunks } from '@/components/spectrumui/blocks/ai-assistants/context-chunks';
import { DiffView } from '@/components/spectrumui/blocks/ai-assistants/diff-view';
import { CodeBlock } from '@/components/spectrumui/blocks/ai-assistants/code-block';
import { InsightCards } from '@/components/spectrumui/blocks/ai-assistants/insight-cards';
import { ErrorState } from '@/components/spectrumui/blocks/ai-assistants/error-state';
import { QuotaBanner } from '@/components/spectrumui/blocks/ai-assistants/quota-banner';
import { MemoryChips, type MemoryItem } from '@/components/spectrumui/blocks/ai-assistants/memory-chips';
import { CompareOutputs } from '@/components/spectrumui/blocks/ai-assistants/compare-outputs';
import { SuggestionBanner, type SuggestionState } from '@/components/spectrumui/blocks/ai-assistants/suggestion-banner';
import { StatusTracker } from '@/components/spectrumui/blocks/ai-assistants/status-tracker';
import { ConversationList } from '@/components/spectrumui/blocks/ai-assistants/conversation-list';
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
  'thinking-dots': (variant) => (
    <ThinkingDots label="Portside is thinking" variant={variant as 'Dots' | 'Bar'} />
  ),
  'task-rows': (variant) => <TaskRowsDemo variant={variant as 'Default' | 'Compact'} />,
  'agent-plan': (variant) => (
    <AgentPlan steps={PLAN_STEPS} variant={variant as 'Default' | 'Compact'} onRun={() => {}} />
  ),
  'web-search': (variant) => <WebSearchDemo variant={variant as 'Default' | 'Compact'} />,
  'context-chunks': (variant) => (
    <ContextChunks chunks={CHUNKS} totalCount={32} variant={variant as 'Cards' | 'List'} />
  ),
  'diff-view': (variant) => <DiffViewDemo variant={variant as 'Default' | 'Summary'} />,
  'code-block': (variant) => (
    <CodeBlock
      code={SAMPLE_CODE}
      filename="lane-report.ts"
      collapsedLines={7}
      variant={variant as 'Default' | 'Numbered'}
    />
  ),
  'insight-cards': (variant) => (
    <InsightCards insights={INSIGHTS} variant={variant as 'Grid' | 'Row'} />
  ),
  'error-state': (variant) => <ErrorState variant={variant as 'Card' | 'Inline'} />,
  'quota-banner': (variant) => (
    <QuotaBanner used={18} limit={20} resetsInSeconds={252} variant={variant as 'Banner' | 'Compact'} />
  ),
  'memory-chips': (variant) => <MemoryChipsDemo variant={variant as 'Panel' | 'Row'} />,
  'compare-outputs': (variant) => (
    <CompareOutputs
      prompt="Summarise last week on the Rotterdam lane"
      outputs={COMPARED_OUTPUTS}
      variant={variant as 'Side' | 'Stacked'}
    />
  ),
  'suggestion-banner': (variant) => (
    <SuggestionBannerDemo variant={variant as 'Inline' | 'Floating'} />
  ),
  'status-tracker': (variant) => (
    <StatusTrackerDemo variant={variant as 'Default' | 'Minimal'} />
  ),
  'conversation-list': (variant) => (
    <ConversationList conversations={CONVERSATION_ENTRIES} variant={variant as 'Default' | 'Compact'} />
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


/* ── Fixture data for the second wave ───────────────────── */

const PLAN_STEPS = [
  { id: 'p1', title: 'Pull week-28 lane performance', detail: 'query_lane_performance on RTM→FXT' },
  { id: 'p2', title: 'Cross-check incidents at Rotterdam', detail: 'search_incidents, 13–20 July' },
  { id: 'p3', title: 'Compare observed transit to the SLA', detail: 'compare_to_sla for Meridian Lines' },
  { id: 'p4', title: 'Draft the carrier notice', detail: 'Held for your approval before sending' },
];

const TASKS: TaskRow[] = [
  { id: 't1', title: 'Verified vendor records', detail: '12 suppliers', status: 'completed', note: 'All cold-chain certifications present; two renewals due next month.' },
  { id: 't2', title: 'Rebuilt lane performance index', detail: '4 lanes', status: 'completed', note: 'Week 28 figures now include the Rotterdam congestion window.' },
  { id: 't3', title: 'Drafting carrier notice', status: 'running' },
  { id: 't4', title: 'Schedule follow-up review', status: 'queued' },
];

const SEARCH_RESULTS: SearchResult[] = [
  { id: 's1', title: 'Port of Rotterdam berth status', domain: 'portofrotterdam.com', snippet: 'Berth 3 crane maintenance completed; full availability restored as of 21 July.' },
  { id: 's2', title: 'North Sea congestion tracker', domain: 'seaintel.com', snippet: 'Rotterdam dwell times normalising after last week\'s equipment fault.' },
  { id: 's3', title: 'Meridian Lines service updates', domain: 'meridianlines.com', snippet: 'Schedule recovery expected across North Europe strings within one week.' },
];

const CHUNKS = [
  { id: 'c1', title: 'Vendor onboarding rule', content: 'Cold-chain certification must be verified before a new carrier can be added to the reorder workflow.', source: 'Carrier Onboarding SOP.pdf', characters: 290, relevance: 0.92 },
  { id: 'c2', title: 'SLA grace windows', content: 'Contracted transit windows carry a 48-hour grace period; breaches beyond it accrue per-day penalties.', source: 'Meridian Lines MSA §4.2', characters: 214, relevance: 0.87 },
  { id: 'c3', title: 'Escalation matrix', content: 'Lane-level breaches route to the carrier manager; repeated breaches within a quarter escalate to procurement.', source: 'Ops Handbook — Escalations', characters: 246, relevance: 0.74 },
];

const DIFFS = [
  {
    id: 'd1',
    path: 'reports/weekly-lanes.ts',
    additions: 4,
    deletions: 1,
    lines: [
      { type: 'context' as const, text: 'const lanes = await fetchLanes(week);' },
      { type: 'remove' as const, text: 'const flagged = [];' },
      { type: 'add' as const, text: 'const flagged = lanes.filter(' },
      { type: 'add' as const, text: '  (lane) => lane.transitDays > lane.slaDays + GRACE,' },
      { type: 'add' as const, text: ');' },
      { type: 'add' as const, text: 'report.append(breachSection(flagged));' },
    ],
  },
];

const SAMPLE_CODE = `export function breachSection(lanes: Lane[]) {
  if (lanes.length === 0) return null;
  const rows = lanes.map((lane) => ({
    lane: lane.code,
    overBy: lane.transitDays - lane.slaDays,
    carrier: lane.carrier,
  }));
  return {
    title: "SLA breaches",
    severity: rows.length > 2 ? "high" : "medium",
    rows,
  };
}`;

const INSIGHTS = [
  { id: 'i1', label: 'On-time delivery', value: '71.4%', change: -18.2, spark: [82, 88, 85, 90, 87, 71], note: 'Dip traces to the Rotterdam crane fault, not carrier performance.' },
  { id: 'i2', label: 'Avg transit — RTM→FXT', value: '6.3d', change: 57.5, spark: [40, 42, 38, 41, 44, 96], note: '2.3 days over the contracted SLA window.' },
];

const MEMORIES: MemoryItem[] = [
  { id: 'm1', fact: 'Prefers weekly digests on Monday' },
  { id: 'm2', fact: 'Meridian Lines is the primary carrier' },
  { id: 'm3', fact: 'Escalate breaches over 48h' },
  { id: 'm4', fact: 'Reports in metric units' },
];

const COMPARED_OUTPUTS: [
  { id: string; model: string; content: string; latency?: string },
  { id: string; model: string; content: string; latency?: string },
] = [
  { id: 'o1', model: 'portside-reasoning', latency: '4.2s', content: 'On-time delivery fell to 71.4% — an 18-point drop caused by the Berth 3 crane fault at Rotterdam, not carrier performance. Transit breached the Meridian SLA by 2.3 days; a notice is drafted and awaiting approval.' },
  { id: 'o2', model: 'portside-fast', latency: '1.1s', content: 'Rotterdam lane slipped last week due to port congestion. Deliveries were late and the SLA was exceeded. Recommend contacting the carrier.' },
];

const TRACKER_STAGES = [
  { id: 'g1', label: 'Queued' },
  { id: 'g2', label: 'Embedding' },
  { id: 'g3', label: 'Indexing' },
  { id: 'g4', label: 'Ready' },
];

const CONVERSATION_ENTRIES = [
  { id: 'v1', title: 'Rotterdam lane slip', group: 'Today', pinned: true },
  { id: 'v2', title: 'Carrier SLA comparison', group: 'Today' },
  { id: 'v3', title: 'Q3 air freight budget', group: 'Yesterday' },
  { id: 'v4', title: 'Customs delay playbook', group: 'Yesterday' },
  { id: 'v5', title: 'APAC reroute options', group: 'Previous 7 days' },
];

/* ── Second-wave demo loops ─────────────────────────────── */

function TaskRowsDemo({ variant }: { variant: 'Default' | 'Compact' }) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setStep((n) => (n >= 4 ? 0 : n + 1)), 1700);
    return () => clearTimeout(t);
  }, [reduced, step]);

  const tasks = reduced
    ? TASKS
    : TASKS.map((task, index) => ({
        ...task,
        status:
          index < step ? ('completed' as const) : index === step ? ('running' as const) : ('queued' as const),
      }));

  return <TaskRows tasks={tasks} variant={variant} />;
}

function WebSearchDemo({ variant }: { variant: 'Default' | 'Compact' }) {
  const reduced = usePrefersReducedMotion();
  const [reading, setReading] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setReading((n) => (n + 1) % (SEARCH_RESULTS.length + 1)), 1800);
    return () => clearTimeout(t);
  }, [reduced, reading]);

  const results = SEARCH_RESULTS.map((result, index) => ({
    ...result,
    state: reduced
      ? ('read' as const)
      : index < reading
        ? ('read' as const)
        : index === reading
          ? ('reading' as const)
          : ('idle' as const),
  }));

  return <WebSearch query="rotterdam berth 3 crane status" results={results} moreCount={7} variant={variant} />;
}

function DiffViewDemo({ variant }: { variant: 'Default' | 'Summary' }) {
  const [epoch, setEpoch] = useState(0);
  const [decidedAt, setDecidedAt] = useState<number | null>(null);

  useEffect(() => {
    if (decidedAt === null) return;
    const t = setTimeout(() => {
      setEpoch((n) => n + 1);
      setDecidedAt(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [decidedAt]);

  return (
    <DiffView
      key={epoch}
      diffs={DIFFS}
      variant={variant}
      onAccept={() => setDecidedAt(Date.now())}
      onReject={() => setDecidedAt(Date.now())}
    />
  );
}

function MemoryChipsDemo({ variant }: { variant: 'Panel' | 'Row' }) {
  const [memories, setMemories] = useState(MEMORIES);

  return (
    <MemoryChips
      key={memories.length}
      memories={memories}
      variant={variant}
      onAdd={() =>
        setMemories((previous) =>
          previous.some((memory) => memory.id === 'm5')
            ? previous
            : [...previous, { id: 'm5', fact: 'Flag Rotterdam lanes first' }],
        )
      }
    />
  );
}

function SuggestionBannerDemo({ variant }: { variant: 'Inline' | 'Floating' }) {
  const [state, setState] = useState<SuggestionState>('open');

  useEffect(() => {
    if (state === 'open') return;
    const t = setTimeout(() => setState('open'), 2800);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <SuggestionBanner
      state={state}
      variant={variant}
      onApply={() => setState('applied')}
      onDismiss={() => setState('dismissed')}
    />
  );
}

function StatusTrackerDemo({ variant }: { variant: 'Default' | 'Minimal' }) {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setTick((n) => (n >= 13 ? 0 : n + 1)), 700);
    return () => clearTimeout(t);
  }, [reduced, tick]);

  const activeIndex = reduced ? 2 : Math.min(4, Math.floor(tick / 3));
  const progress = reduced ? 0.6 : (tick % 3) / 3;

  return (
    <StatusTracker
      stages={TRACKER_STAGES}
      activeIndex={activeIndex}
      progress={progress}
      detail={activeIndex >= 4 ? 'Knowledge base ready' : 'Indexing 1,204 documents'}
      variant={variant}
    />
  );
}
