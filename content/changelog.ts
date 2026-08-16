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
  | { kind: 'terminal'; command: string };

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
    slug: 'aug-16-2026',
    date: '2026-08-16',
    groups: [
      {
        label: 'New',
        items: [
          '25 production-ready [website footers](/docs/footer) for SaaS, enterprise, developer, and marketing sites — each with a distinct layout, viewport previews, and a CLI install.',
        ],
      },
    ],
    media: { kind: 'terminal', command: 'npx shadcn@latest add @spectrumui/enterprise-grid-footer' },
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
