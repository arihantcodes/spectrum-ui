/**
 * Plumbing shared by everything that talks to the ⌘K palette: a one-line way
 * for any component to open it, and the fetch-once cache for its documents.
 *
 * The palette itself listens for the event, so triggers never need a context
 * provider or a lifted state — a button anywhere on the page can call
 * `openCommandMenu()` and be done.
 */

import type { SearchDocument, SearchIndexPayload } from '@/lib/search';

export type CommandMenuView = 'search' | 'shortcuts';

export interface OpenCommandMenuDetail {
  view?: CommandMenuView;
  query?: string;
  /** Where the open came from — reported with the analytics event. */
  source?: 'shortcut' | 'header' | 'mobile_nav' | 'docs' | 'unknown';
}

const OPEN_EVENT = 'spectrum:command-menu:open';

export function openCommandMenu(detail: OpenCommandMenuDetail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<OpenCommandMenuDetail>(OPEN_EVENT, { detail }));
}

export function subscribeToCommandMenu(handler: (detail: OpenCommandMenuDetail) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<OpenCommandMenuDetail>).detail ?? {});
  };

  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

const SEARCH_INDEX_ENDPOINT = '/api/search-index';

let documents: SearchDocument[] | null = null;
let inFlight: Promise<SearchDocument[]> | null = null;

/**
 * Resolves with the documents, or an empty list if the request fails — the
 * palette's commands and static destinations work either way, so a flaky
 * network degrades search rather than breaking ⌘K.
 */
export function loadSearchIndex(): Promise<SearchDocument[]> {
  if (documents) return Promise.resolve(documents);

  inFlight ??= fetch(SEARCH_INDEX_ENDPOINT)
    .then((response) => {
      if (!response.ok) throw new Error(`search index: ${response.status}`);
      return response.json() as Promise<SearchIndexPayload>;
    })
    .then((payload) => {
      documents = payload.documents ?? [];
      return documents;
    })
    .catch(() => {
      // Let the next attempt retry rather than caching the failure.
      inFlight = null;
      return [];
    });

  return inFlight;
}

/** Warm the cache on intent — hovering the trigger, or the first keystroke. */
export function prefetchSearchIndex() {
  if (typeof window === 'undefined') return;
  void loadSearchIndex();
}
