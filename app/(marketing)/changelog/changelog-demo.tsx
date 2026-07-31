'use client';

import { LoadingState } from '@/components/spectrumui/blocks/ai-assistants/loading-state';
import { ThinkingDots } from '@/components/spectrumui/blocks/ai-assistants/thinking-dots';

/**
 * Live block demos embedded in changelog entries — the real component running
 * inside the entry, not a screenshot of it. Kept to the two smallest blocks so
 * the changelog stays light.
 */
export function ChangelogDemo({ demo }: { demo: 'thinking-dots' | 'loading-state' }) {
  if (demo === 'loading-state') {
    return <LoadingState label="Shipping" />;
  }
  return <ThinkingDots label="Portside is thinking" />;
}
