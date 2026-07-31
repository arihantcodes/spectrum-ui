/**
 * The changelog's single source of truth. Newest entry first.
 *
 * Every entry maps to real shipped work — dates come from git history, not
 * marketing. `demo` names a block slug the page renders LIVE inside the entry,
 * which is the one thing a static changelog screenshot can never do.
 */

export type ChangelogArea = 'blocks' | 'mcp' | 'docs' | 'site';

export interface ChangelogSection {
  label: string;
  items: string[];
}

export interface ChangelogLink {
  label: string;
  href: string;
}

export interface ChangelogEntry {
  slug: string;
  /** ISO date, e.g. "2026-07-31". */
  date: string;
  area: ChangelogArea;
  title: string;
  /** Prose paragraphs. */
  body: string[];
  sections?: ChangelogSection[];
  /** Slug of a live block demo embedded in the entry. */
  demo?: 'thinking-dots' | 'loading-state';
  links?: ChangelogLink[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    slug: 'ai-assistant-blocks',
    date: '2026-07-31',
    area: 'blocks',
    title: '27 AI Assistant blocks',
    body: [
      'Blocks are a new tier above components: composed interface sections for products built on LLMs, presented on a single specimen page where every block runs live at actual size. Variant pills switch each block’s state in place, and the demo below is not a screenshot — it is the real component, running here the same way it runs on the blocks page.',
      'The set covers the surfaces AI products keep rebuilding: streaming answers with citations, reasoning traces with live timers, agent tool timelines, prompt composers with IME-safe submit, approval cards, usage meters, voice input, and inline AI editing. Every block is presentational — data in, callbacks out — and shares one message contract, so they compose into a working chat surface.',
      'Each block installs three ways from its code drawer: the shadcn CLI with package-manager tabs, an agent prompt for editors connected to the Spectrum UI MCP server, or the raw source — all Shiki-highlighted in vesper and github-light.',
    ],
    sections: [
      {
        label: 'Details',
        items: [
          'Every success moment — a task completing, a diff being accepted, an approval landing — uses the same 200ms confirm pop, and settles instantly under reduced motion.',
          'Demos loop their real behavior and yield permanently the moment you interact with them.',
          'Blocks are self-contained: keyframes ship inside each component, so installs never touch globals.css.',
          'Streaming text is hidden from screen readers while it arrives and announced once when complete.',
        ],
      },
    ],
    demo: 'thinking-dots',
    links: [{ label: 'Browse the blocks', href: '/blocks/ai-assistants' }],
  },
  {
    slug: 'mcp-0-2-0',
    date: '2026-07-29',
    area: 'mcp',
    title: 'MCP server 0.2.0 and registry repairs',
    body: [
      'The registry index the MCP server reads had drifted 38 items behind the registry the CLI installs from — they fail independently, which is how asking an editor for an avatar stack could recommend a footer while the install command worked fine. Both are now generated from one source and a parity test fails the build if they ever diverge.',
      'Five installs that were broken in production — a duplicated registry name, two dependencies that never existed, and two components with no payload at all — were found by sweeping the registry and verified fixed by installing each one end to end.',
    ],
    sections: [
      {
        label: 'Improved',
        items: [
          'Exact-name matches now rank first in search, so agents install the component instead of its demo.',
          'Docs links returned by the server resolve to real pages instead of guessed slugs.',
          'The registry cache expires after five minutes, so long editor sessions see new components.',
          'Telemetry now records installs and detects which editor is driving the server.',
        ],
      },
    ],
    links: [{ label: 'Set up the MCP server', href: '/docs/mcp' }],
  },
  {
    slug: 'docs-card-redesign',
    date: '2026-07-28',
    area: 'docs',
    title: '50 production-ready cards',
    body: [
      'The card page was rebuilt as fifty curated, production-ready cards — login, pricing, dashboards, AI chat — each with a live preview and copyable source generated straight from the component files, so the code you copy is always the code that renders.',
      'A day later the site gained /llm-info: a plain monospace document written for AI assistants, so tools that read pages instead of browsing them get the library’s facts without the chrome.',
    ],
    links: [{ label: 'See the cards', href: '/docs/card' }],
  },
  {
    slug: 'blog-and-auth-redesign',
    date: '2026-07-24',
    area: 'site',
    title: 'A calmer blog and a matching auth gate',
    body: [
      'The blog moved to a centered reading view with three-minute posts, richer covers, and reader highlights. The auth gate that protects component source was redesigned to match the sign-in experience, so hitting it mid-flow no longer feels like leaving the site.',
    ],
  },
  {
    slug: 'honest-catalog',
    date: '2026-07-23',
    area: 'docs',
    title: 'An honest catalog: 44 components',
    body: [
      'The docs catalog was corrected to the 44 components the library actually ships, with New badges restored in the sidebar. Around it landed the AI-search groundwork: twelve topic hubs connecting related components, comparison pages against other libraries, and structured data on every component page.',
    ],
    links: [{ label: 'Browse components', href: '/docs' }],
  },
  {
    slug: 'mcp-server-launch',
    date: '2026-06-10',
    area: 'mcp',
    title: 'The Spectrum UI MCP server',
    body: [
      'One config line — npx -y @spectrumui/mcp — and Cursor, Claude Code, Windsurf, or VS Code can browse, search, and install any Spectrum UI component by name. Five tools over stdio: list, search, get, categories, and install.',
    ],
    links: [{ label: 'Install the MCP server', href: '/docs/mcp' }],
  },
];

export const AREA_LABELS: Record<ChangelogArea, string> = {
  blocks: 'blocks',
  mcp: 'mcp',
  docs: 'docs',
  site: 'site',
};

export function changelogDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
