export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageState = 'streaming' | 'complete' | 'error';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  previewUrl?: string;
}

export interface Citation {
  id: string;
  index: number;
  url: string;
  title: string;
  snippet?: string;
  favicon?: string;
}

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error' | 'cancelled';

export interface ToolCall {
  id: string;
  name: string;
  args?: Record<string, unknown>;
  result?: string;
  status: ToolCallStatus;
  startedAt?: number;
  completedAt?: number;
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
  durationMs?: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt?: number;
  state?: MessageState;
  attachments?: Attachment[];
  citations?: Citation[];
  toolCalls?: ToolCall[];
  reasoning?: Reasoning;
}

export interface Conversation {
  id: string;
  label: string;
}

export interface ModelOption {
  id: string;
  name: string;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt?: string;
}

export type MessageFeedback = 'positive' | 'negative';

export interface UsageState {
  promptTokens: number;
  completionTokens: number;
  contextWindow: number;
  estimatedCostUsd?: number;
}
