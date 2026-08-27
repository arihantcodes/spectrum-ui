/**
 * The ⌘K palette's search core.
 *
 * Deliberately free of data imports: the documents are built on the server
 * (lib/search-index.ts) and fetched once from /api/search-index, so the client
 * only ever ships the matcher — not the catalogs.
 */

export const SEARCH_GROUPS = ['Components', 'Blocks', 'Charts', 'Guides', 'Blog', 'Pages'] as const;

export type SearchGroup = (typeof SEARCH_GROUPS)[number];

export interface SearchDocument {
  /** Stable and lowercase, e.g. `component:accordion`. Used for recents. */
  id: string;
  title: string;
  group: SearchGroup;
  href: string;
  /** Right-aligned context: a component's category, a block's subcategory, a post's topic. */
  subtitle?: string;
  /** Extra words the row matches on. Lowercased when the index is built. */
  keywords?: string;
  /** shadcn registry name, when the row installs something — this is what ⌘↵ copies. */
  registry?: string;
  new?: boolean;
}

export interface SearchIndexPayload {
  version: number;
  documents: SearchDocument[];
}

/** `[start, end)` offsets into a title, for the highlight. */
export type HighlightRange = readonly [number, number];

export interface Match {
  score: number;
  ranges: HighlightRange[];
}

/** Anything the matcher can score — documents and command rows both qualify. */
export interface Matchable {
  title: string;
  subtitle?: string;
  keywords?: string;
  group?: string;
}

/**
 * A nudge, not a verdict: enough to break ties between equally good text
 * matches so "dialog" leads with the component rather than a blog post.
 */
const GROUP_WEIGHT: Record<string, number> = {
  Commands: 11,
  Components: 10,
  Blocks: 9,
  Charts: 8,
  Pages: 7,
  Guides: 5,
  Blog: 3,
};

const DEFAULT_GROUP_WEIGHT = 6;

/** Everything a query is compared against is lowercase and single-spaced. */
export function normalizeQuery(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

function isWordBoundary(text: string, index: number) {
  return index === 0 || !/[a-z0-9]/.test(text[index - 1]);
}

/**
 * Initials match — "kb" finds "Kanban Board", "asc" finds "Animated SVG Chart".
 *
 * Deliberately narrower than a free subsequence: letting query characters land
 * anywhere made "kan" match "Building Forms That Don't Ma(k)e Users W(an)t",
 * which is noise dressed up as a result. Word starts only.
 */
function scoreInitials(title: string, query: string): Match | null {
  if (query.length < 2) return null;

  const lower = title.toLowerCase();
  const offsets: number[] = [];
  let initials = '';

  for (let index = 0; index < lower.length; index += 1) {
    if (/[a-z0-9]/.test(lower[index]) && isWordBoundary(lower, index)) {
      initials += lower[index];
      offsets.push(index);
    }
  }

  const found = initials.indexOf(query);
  if (found === -1) return null;

  return {
    score: (found === 0 ? 450 : 380) - title.length,
    ranges: offsets
      .slice(found, found + query.length)
      .map((offset) => [offset, offset + 1] as HighlightRange),
  };
}

/** Scores one query term against a title, and says where it landed. */
function scoreTitle(title: string, query: string): Match | null {
  const haystack = title.toLowerCase();

  if (haystack === query) return { score: 1000, ranges: [[0, title.length]] };

  const index = haystack.indexOf(query);
  if (index === 0) return { score: 900 - title.length, ranges: [[0, query.length]] };
  if (index > 0) {
    const score = (isWordBoundary(haystack, index) ? 800 : 650) - title.length;
    return { score, ranges: [[index, index + query.length]] };
  }

  return scoreInitials(title, query);
}

/** Keyword and subtitle hits rank below the title and carry no highlight. */
function scoreMetadata(item: Matchable, query: string): Match | null {
  if (item.keywords) {
    const index = item.keywords.indexOf(query);
    if (index >= 0) {
      return { score: isWordBoundary(item.keywords, index) ? 340 : 220, ranges: [] };
    }
  }

  const subtitle = item.subtitle?.toLowerCase();
  if (subtitle?.includes(query)) return { score: 300, ranges: [] };

  return null;
}

function scoreTerm(item: Matchable, term: string): Match | null {
  return scoreTitle(item.title, term) ?? scoreMetadata(item, term);
}

function mergeRanges(ranges: HighlightRange[]): HighlightRange[] {
  if (ranges.length < 2) return ranges;

  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: HighlightRange[] = [sorted[0]];

  for (const [start, end] of sorted.slice(1)) {
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      merged[merged.length - 1] = [last[0], Math.max(last[1], end)];
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

/**
 * Scores a row against an already-normalized query, or returns null when it
 * doesn't match at all. Multi-word queries are AND — every term has to land
 * somewhere, which is what makes "pricing block" behave the way people expect.
 */
export function matchItem(query: string, item: Matchable): Match | null {
  if (!query) return null;

  const weight = GROUP_WEIGHT[item.group ?? ''] ?? DEFAULT_GROUP_WEIGHT;
  const whole = scoreTerm(item, query);
  if (whole) return { score: whole.score + weight, ranges: whole.ranges };

  const terms = query.split(' ');
  if (terms.length < 2) return null;

  let total = 0;
  const ranges: HighlightRange[] = [];

  for (const term of terms) {
    const match = scoreTerm(item, term);
    if (!match) return null;
    total += match.score;
    ranges.push(...match.ranges);
  }

  // Averaged, then docked, so a two-term match never outranks a clean one.
  return {
    score: Math.round(total / terms.length) - 60 + weight,
    ranges: mergeRanges(ranges),
  };
}

export interface HighlightSegment {
  text: string;
  match: boolean;
}

/** Splits a title into plain and matched segments for rendering. */
export function splitHighlight(text: string, ranges: HighlightRange[]): HighlightSegment[] {
  if (!ranges.length) return [{ text, match: false }];

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const [start, end] of mergeRanges(ranges)) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });

  return segments;
}

/** The command every installable row copies with ⌘↵. */
export function registryInstallCommand(registry: string) {
  return `npx shadcn@latest add @spectrumui/${registry}`;
}
