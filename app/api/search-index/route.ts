import { NextResponse } from 'next/server';

import { SEARCH_INDEX_VERSION, buildSearchIndex } from '@/lib/search-index';
import type { SearchIndexPayload } from '@/lib/search';

/**
 * The ⌘K palette's document set, prerendered at build time and served as a
 * static asset. Keeping it out of the page bundle means every visitor pays
 * nothing for search until they actually reach for it — the palette fetches
 * this once, on first intent, and caches it for the session.
 */
export const dynamic = 'force-static';

export async function GET() {
  const payload: SearchIndexPayload = {
    version: SEARCH_INDEX_VERSION,
    documents: await buildSearchIndex(),
  };

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
