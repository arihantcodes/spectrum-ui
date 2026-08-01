/**
 * One conversation, shared by every AI Assistant block preview.
 *
 * The assistant belongs to "Portside", a fictional freight and logistics
 * analytics product. Every block shows a different lens on the same exchange:
 * chat-thread shows the answer, agent-steps shows the tool calls that produced
 * it, citation-sources shows what it cited, usage-meter counts its tokens.
 *
 * The coherence is deliberate. Eight previews of one real conversation read as a
 * product; eight sets of lorem ipsum read as a widget dump. Freight was chosen
 * because it yields concrete numbers, obvious tool calls, and citations that are
 * plausible without naming a real company.
 */

import type {
  Citation,
  Message,
  ModelOption,
  ReasoningStep,
  SuggestedPrompt,
  ToolCall,
  UsageState,
} from '../types';

/**
 * Fixed epoch so previews are deterministic — a relative "now" would make
 * timestamps drift between server and client render and trip hydration.
 */
const T0 = 1_769_000_000_000;

export const PORTSIDE_MODELS: ModelOption[] = [
  { id: 'portside-reasoning', name: 'Portside Reasoning', description: 'Best for multi-step analysis', badge: 'Default' },
  { id: 'portside-fast', name: 'Portside Fast', description: 'Lower latency, shorter answers', badge: 'Fastest' },
  { id: 'portside-audit', name: 'Portside Audit', description: 'Cites every figure it reports' },
  { id: 'portside-vision', name: 'Portside Vision', description: 'Reads scanned bills of lading', disabled: true },
];

export const PORTSIDE_SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: 'delays', label: 'Why did Rotterdam slip last week?', prompt: 'Why did our Rotterdam lane slip last week?' },
  { id: 'cost', label: 'Compare air vs ocean on APAC lanes' },
  { id: 'risk', label: 'Which shipments are at risk this week?' },
  { id: 'carrier', label: 'Rank carriers by on-time delivery' },
];

export const PORTSIDE_CITATIONS: Citation[] = [
  {
    id: 'c1',
    index: 1,
    url: 'https://portside.internal/reports/lane-performance-w28',
    title: 'Lane performance — week 28',
    snippet: 'Rotterdam–Felixstowe on-time delivery fell to 71.4%, down 18.2 points week over week.',
    favicon: 'https://portside.internal/favicon.ico',
  },
  {
    id: 'c2',
    index: 2,
    url: 'https://portside.internal/incidents/2026-07-14-rtm-congestion',
    title: 'Incident: Rotterdam terminal congestion',
    snippet: 'Berth availability at RTM dropped to one of four across 14–17 July following a crane fault.',
  },
  {
    id: 'c3',
    index: 3,
    url: 'https://portside.internal/carriers/meridian-lines/sla',
    title: 'Meridian Lines — contracted SLA',
    snippet: 'Contracted transit 4 days port-to-port, with a 48-hour grace window before penalties apply.',
  },
];

export const PORTSIDE_TOOL_CALLS: ToolCall[] = [
  {
    id: 't1',
    name: 'query_lane_performance',
    args: { lane: 'RTM→FXT', window: 'week_28', metrics: ['on_time_rate', 'avg_transit_days'] },
    result: 'on_time_rate: 0.714 (−0.182 WoW) · avg_transit_days: 6.3 (contracted 4.0)',
    status: 'success',
    startedAt: T0,
    completedAt: T0 + 1_240,
  },
  {
    id: 't2',
    name: 'search_incidents',
    args: { port: 'RTM', from: '2026-07-13', to: '2026-07-20' },
    status: 'success',
    startedAt: T0 + 1_300,
    completedAt: T0 + 2_010,
    result: '1 incident: terminal congestion, 14–17 July, crane fault at Berth 3.',
    children: [
      {
        id: 't2a',
        name: 'fetch_berth_availability',
        args: { port: 'RTM', dates: ['2026-07-14', '2026-07-17'] },
        result: '1 of 4 berths available',
        status: 'success',
        parallel: true,
        startedAt: T0 + 1_320,
        completedAt: T0 + 1_780,
      },
      {
        id: 't2b',
        name: 'fetch_weather_window',
        args: { port: 'RTM', dates: ['2026-07-14', '2026-07-17'] },
        result: 'No weather holds recorded',
        status: 'success',
        parallel: true,
        startedAt: T0 + 1_320,
        completedAt: T0 + 1_690,
      },
    ],
  },
  {
    id: 't3',
    name: 'compare_to_sla',
    args: { carrier: 'meridian-lines', observed_transit_days: 6.3 },
    result: 'Breach: 2.3 days over contracted transit, outside the 48-hour grace window.',
    status: 'success',
    startedAt: T0 + 2_100,
    completedAt: T0 + 2_640,
  },
  {
    id: 't4',
    name: 'draft_carrier_notice',
    args: { carrier: 'meridian-lines', basis: 'sla_breach_w28' },
    status: 'pending',
  },
];

export const PORTSIDE_REASONING_STEPS: ReasoningStep[] = [
  { id: 'r1', content: 'The question is about a specific lane and a specific week, so I should pull lane performance for week 28 before anything else.' },
  { id: 'r2', content: 'On-time delivery is 71.4%, down 18.2 points. That is a large enough drop to have a single cause rather than drift, so I should look for an incident.' },
  { id: 'r3', content: 'There is a terminal congestion incident at Rotterdam across 14–17 July. Berth availability fell to one of four after a crane fault, and no weather holds were recorded — so congestion, not weather.' },
  { id: 'r4', content: 'Average transit ran 6.3 days against a contracted 4.0. That is past the 48-hour grace window, so this is a contractual breach and worth flagging, not just an operational note.' },
];

export const PORTSIDE_CONVERSATION: Message[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'Why did our Rotterdam lane slip last week?',
    createdAt: T0 - 60_000,
    state: 'complete',
  },
  {
    id: 'm2',
    role: 'assistant',
    createdAt: T0,
    state: 'complete',
    content: `Rotterdam–Felixstowe on-time delivery fell to **71.4%** last week, down 18.2 points week over week [1].

The cause was terminal congestion at Rotterdam between 14–17 July. A crane fault at Berth 3 cut berth availability to one of four, and no weather holds were recorded in the same window [2].

Average transit ran **6.3 days** against a contracted 4.0 with Meridian Lines. That is 2.3 days over, outside the 48-hour grace window, so it reads as an SLA breach rather than acceptable variance [3].

\`\`\`ts
// Lanes currently breaching contracted transit
const breaching = lanes.filter(
  (lane) => lane.avgTransitDays > lane.contractedDays + 2,
);
\`\`\`

I have drafted a carrier notice but not sent it — it needs your approval first.`,
    reasoning: {
      steps: PORTSIDE_REASONING_STEPS,
      status: 'complete',
      durationMs: 4_180,
    },
    toolCalls: PORTSIDE_TOOL_CALLS,
    citations: PORTSIDE_CITATIONS,
  },
  {
    id: 'm3',
    role: 'user',
    content: 'Has this happened on that lane before?',
    createdAt: T0 + 120_000,
    state: 'complete',
  },
  {
    id: 'm4',
    role: 'assistant',
    createdAt: T0 + 121_000,
    state: 'streaming',
    content: 'Checking the last four quarters for the same lane. Two comparable dips so far — Q3 last year and',
  },
];

/** Mid-stream slice, for previews that need a message still arriving. */
export const PORTSIDE_STREAMING_MESSAGE = PORTSIDE_CONVERSATION[3];

/** The completed exchange, for previews that should look settled. */
export const PORTSIDE_SETTLED_CONVERSATION = PORTSIDE_CONVERSATION.slice(0, 2);

export const PORTSIDE_USAGE: UsageState = {
  promptTokens: 3_412,
  completionTokens: 688,
  contextWindow: 128_000,
  estimatedCostUsd: 0.0247,
};

export const PORTSIDE_GREETING = {
  title: 'What do you want to know about your freight?',
  subtitle:
    'Portside can query lane performance, investigate incidents, compare carriers against contracted SLAs, and draft the follow-up.',
};
