/**
 * The shared contract for every AI Assistant block.
 *
 * This is the point of the set: eight blocks that speak one language compose
 * into a working chat surface, and wire to Vercel AI SDK's `useChat()` with an
 * adapter rather than a rewrite. Blocks are presentational — they take data in
 * and emit callbacks out. None of them fetch, call a model, or own transport.
 */

export type MessageRole = 'user' | 'assistant' | 'system';

/** Lifecycle of an assistant message. `streaming` drives carets and shimmers. */
export type MessageState = 'streaming' | 'complete' | 'error';

export interface Attachment {
  id: string;
  name: string;
  /** Bytes. Formatted for display by the block, not the caller. */
  size: number;
  /** MIME type, e.g. "image/png". */
  type: string;
  url?: string;
  /** Thumbnail for images; falls back to a file glyph when absent. */
  previewUrl?: string;
}

export interface Citation {
  id: string;
  /** 1-based, matching the inline marker in the message text. */
  index: number;
  url: string;
  title: string;
  snippet?: string;
  favicon?: string;
}

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error' | 'cancelled';

export interface ToolCall {
  id: string;
  /** Tool name as the model called it, e.g. "query_shipments". */
  name: string;
  /** Arguments as passed. Rendered as collapsed, scrollable JSON. */
  args?: Record<string, unknown>;
  result?: string;
  status: ToolCallStatus;
  /** Epoch ms. Pass both to render a duration. */
  startedAt?: number;
  completedAt?: number;
  /** Nested sub-steps. Siblings marked `parallel` render side by side. */
  children?: ToolCall[];
  parallel?: boolean;
}

export interface ReasoningStep {
  id: string;
  content: string;
}

export interface Reasoning {
  steps: ReasoningStep[];
  status: 'thinking' | 'complete';
  /** Milliseconds spent reasoning; shown with tabular numerals. */
  durationMs?: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  /** Markdown. Fenced code blocks are highlighted by the thread. */
  content: string;
  createdAt?: number;
  state?: MessageState;
  attachments?: Attachment[];
  citations?: Citation[];
  toolCalls?: ToolCall[];
  reasoning?: Reasoning;
}

export interface ModelOption {
  id: string;
  name: string;
  description?: string;
  /** Short label such as "Fastest" or "New". */
  badge?: string;
  disabled?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  /** Sent instead of `label` when present, so chips can stay short. */
  prompt?: string;
}

/** Feedback emitted by message-actions. */
export type MessageFeedback = 'positive' | 'negative';

/** Context-window and cost state for usage-meter. */
export interface UsageState {
  promptTokens: number;
  completionTokens: number;
  contextWindow: number;
  estimatedCostUsd?: number;
}
