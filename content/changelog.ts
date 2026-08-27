/**
 * The changelog's single source of truth. Newest first.
 *
 * Deliberately terse: a date, a few labelled groups, one or two short bullets
 * each. Dates come from git history. Items support one inline markup form —
 * [text](/href) — rendered as an underlined link.
 */

export interface ChangelogGroup {
  label: string;
  items: string[];
}

export type ChangelogMediaKind =
  | { kind: 'blocks' }
  | { kind: 'codeblock' }
  | { kind: 'terminal'; command: string }
  /**
   * A product screenshot, captured light and dark so the panel matches the
   * page it sits on. Both files must share the same dimensions.
   */
  | { kind: 'image'; src: string; srcDark: string; alt: string; width: number; height: number };

export interface ChangelogEntry {
  slug: string;
  /** ISO date, e.g. "2026-07-31". */
  date: string;
  groups: ChangelogGroup[];
  /** Optional live preview panel, rendered at the column's width. */
  media?: ChangelogMediaKind;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    slug: 'aug-27-2026',
    date: '2026-08-27',
    groups: [
      {
        label: 'New',
        items: [
          'A command menu on every page: press ⌘K to search all [44 components](/docs), every [block](/blocks), [chart](/charts), guide and [post](/blog) at once, with the matched text highlighted. ⌘↵ on a result copies its install command.',
          '⌘/ lists the shortcuts, ⌘⇧L flips the theme, and typing > shows commands only. The X, GitHub and LinkedIn handles are in there too.',
        ],
      },
    ],
    media: {
      kind: 'image',
      src: '/changelog/command-menu-light.webp',
      srcDark: '/changelog/command-menu-dark.webp',
      alt: 'The Spectrum UI command menu open with a search for “chart”, showing matched results grouped by type.',
      width: 720,
      height: 570,
    },
  },
  {
    slug: 'aug-16-2026',
    date: '2026-08-16',
    groups: [
      {
        label: 'New',
        items: [
          '[Spectrum Charts](/charts) — candlesticks, order books, depth, cohort retention and calendar heatmaps: the set shadcn/ui leaves out, not another re-skin of the defaults.',
          'Each chart installs with the shadcn CLI and arrives as editable source, like every other Spectrum component.',
        ],
      },
    ],
    media: {
      kind: 'image',
      src: '/changelog/charts-light.webp',
      srcDark: '/changelog/charts-dark.webp',
      alt: 'The /charts landing page with a live candlestick chart beside the headline.',
      width: 1400,
      height: 630,
    },
  },
  {
    slug: 'aug-07-2026',
    date: '2026-08-07',
    groups: [
      {
        label: 'New',
        items: [
          '[/brandkit](/brandkit): marks, wordmarks, type specimens, copyable brand colors and press-quality product screenshots — one at a time, or the whole kit as a ZIP.',
          'The assets are generated from the canonical logo glyph, so what you download can’t drift from what the site renders.',
        ],
      },
    ],
    media: {
      kind: 'image',
      src: '/changelog/brandkit-light.webp',
      srcDark: '/changelog/brandkit-dark.webp',
      alt: 'The Spectrum UI brand kit page with its download-the-whole-kit card.',
      width: 1020,
      height: 380,
    },
  },
  {
    slug: 'aug-01-2026',
    date: '2026-08-01',
    groups: [
      {
        label: 'Improvements',
        items: [
          'The site runs on Next 16, React 19 and Tailwind v4 — CSS-first theming, ESLint 9, TypeScript 5.9 and a single lockfile.',
          '78 files and 38 packages with no path in the import graph are gone. No routes, pages or components were removed.',
        ],
      },
    ],
  },
  {
    slug: 'jul-31-2026',
    date: '2026-07-31',
    groups: [
      {
        label: 'New',
        items: [
          '27 AI Assistant blocks — streaming text, reasoning traces, agent steps, voice input and more, each [running live on one page](/blocks/ai-assistants).',
          'Every block installs three ways from its code drawer: the shadcn CLI, an [MCP prompt](/docs/mcp), or the raw source.',
        ],
      },
    ],
    media: { kind: 'blocks' },
  },
  {
    slug: 'jul-29-2026',
    date: '2026-07-29',
    groups: [
      {
        label: 'Improvements',
        items: [
          'The MCP server can see every component again — its index had drifted 38 items behind the CLI. A parity test now fails the build if they ever diverge.',
          'Fixed five installs that were broken in production, each verified end to end.',
        ],
      },
    ],
    media: { kind: 'terminal', command: 'npx shadcn@latest add @spectrumui/agent-steps' },
  },
  {
    slug: 'jul-28-2026',
    date: '2026-07-28',
    groups: [
      {
        label: 'New',
        items: [
          'The card page was rebuilt as [50 production-ready cards](/docs/card) — the code you copy is always the code that renders.',
          '[/llm-info](/llm-info): the library’s facts in plain text, for AI assistants that read pages instead of browsing them.',
        ],
      },
    ],
    media: { kind: 'codeblock' },
  },
  {
    slug: 'jul-24-2026',
    date: '2026-07-24',
    groups: [
      {
        label: 'Improvements',
        items: [
          'The [blog](/blog) moved to a centered reading view with richer covers and reader highlights.',
          'The auth gate now matches the sign-in design, so hitting it mid-flow no longer feels like leaving the site.',
        ],
      },
    ],
  },
  {
    slug: 'jul-23-2026',
    date: '2026-07-23',
    groups: [
      {
        label: 'Improvements',
        items: [
          'The catalog was corrected to the [44 components](/docs) the library actually ships, with New badges restored.',
          'Twelve topic hubs now connect related components, with comparison pages against other libraries.',
        ],
      },
    ],
  },
  {
    slug: 'jun-10-2026',
    date: '2026-06-10',
    groups: [
      {
        label: 'New',
        items: [
          'The [Spectrum UI MCP server](/docs/mcp): one config line, and Cursor, Claude Code, or Windsurf can install any component by name.',
        ],
      },
    ],
    media: { kind: 'terminal', command: 'claude mcp add spectrum-ui -- npx -y @spectrumui/mcp' },
  },
];

export function changelogDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
