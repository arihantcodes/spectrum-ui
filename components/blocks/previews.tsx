import { ChatThread } from '@/components/spectrumui/blocks/ai-assistants/chat-thread';
import { PORTSIDE_CONVERSATION } from '@/components/spectrumui/blocks/ai-assistants/_fixtures/conversation';

/**
 * Poster frames — the rest state each block shows on a card.
 *
 * Every poster is a *designed* state with real content mid-flow, never an empty
 * or initial one. A card showing a blank chat teaches nothing; a card showing a
 * three-message exchange with a code block and a citation shows what you get.
 *
 * Keyed by block slug. A block with no entry here cannot be marked `live` in the
 * catalog, which is what keeps the grid honest.
 */
export const BLOCK_POSTERS: Record<string, React.ReactNode> = {
  'chat-thread': (
    // The full exchange, not the settled two-message slice: a poster has to fill
    // its frame. A short conversation in a tall stage top-aligns and leaves half
    // the card empty, which reads as a broken preview rather than a specimen.
    <div className="h-full bg-white dark:bg-[#0B0B0D]">
      <ChatThread messages={PORTSIDE_CONVERSATION} isGenerating assistantName="Portside" />
    </div>
  ),
};

/**
 * Larger previews for the detail page, where there is room for the full
 * composition including the streaming tail.
 */
export const BLOCK_PREVIEWS: Record<string, React.ReactNode> = {
  'chat-thread': (
    <div className="h-full bg-white dark:bg-[#0B0B0D]">
      <ChatThread messages={PORTSIDE_CONVERSATION} isGenerating assistantName="Portside" />
    </div>
  ),
};

export function blockPoster(slug: string) {
  return BLOCK_POSTERS[slug] ?? null;
}

export function blockPreview(slug: string) {
  return BLOCK_PREVIEWS[slug] ?? BLOCK_POSTERS[slug] ?? null;
}
