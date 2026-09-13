/**
 * One brand across every footer preview: Spectrum UI itself.
 *
 * The wave shipped with three invented companies — an enterprise, an AI lab and
 * a two-person product — so each footer had copy that fitted its job. It read as
 * three unrelated demos. Dogfooding the library's own brand is the stronger
 * showing: a visitor scrolling /blocks/footers sees eighteen footers that could
 * all ship on this site tomorrow, with real routes behind the links.
 *
 * Numbers are plausible and fixed. Nothing here derives from Date.now(), so the
 * server and the client render the same thing.
 */

import type { FooterLinkGroup } from '../footer-kit';

export const SPECTRUM_SITEMAP: FooterLinkGroup[] = [
  {
    title: 'Library',
    links: [
      { label: 'Components', href: '/docs/components' },
      { label: 'Blocks', href: '/blocks' },
      { label: 'Charts', href: '/blocks/charts' },
      { label: 'Tables', href: '/blocks/tables' },
      { label: 'Footers', href: '/blocks/footers', badge: 'New' },
      { label: 'AI assistants', href: '/blocks/ai-assistants' },
      { label: 'Pricing sections', href: '/blocks/pricing' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'CLI', href: '/docs/cli' },
      { label: 'MCP server', href: '/docs/mcp' },
      { label: 'Theming', href: '/docs/theming' },
      { label: 'Dark mode', href: '/docs/dark-mode' },
    ],
  },
  {
    title: 'Build with',
    links: [
      { label: 'Next.js', href: '/nextjs-ui-library' },
      { label: 'Tailwind CSS', href: '/tailwind-component-library' },
      { label: 'shadcn/ui', href: '/design-system-integration' },
      { label: 'Motion', href: '/animation-library' },
      { label: 'TypeScript', href: '/react-component-library' },
      { label: 'v0 and Cursor', href: '/llm-info' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/docs/guides' },
      { label: 'Comparisons', href: '/compare' },
      { label: 'Templates', href: '/templates' },
      { label: 'Colors', href: '/colors' },
      { label: 'Brand kit', href: '/brandkit' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: 'https://github.com/arihantcodes/spectrum-ui' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Sponsor', href: '/sponsor' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Founder story', href: '/founder-story' },
    ],
  },
];

/** The mega sitemap stacks two groups per column; this is that arrangement. */
export const SPECTRUM_COLUMNS: { groups: FooterLinkGroup[] }[] = [
  {
    groups: [
      SPECTRUM_SITEMAP[0],
      {
        title: 'Install',
        links: [
          { label: 'shadcn CLI', href: '/docs/cli' },
          { label: 'Copy and paste', href: '/copy-paste-react-components' },
          { label: 'Registry JSON', href: '/llm-info' },
          { label: 'MCP', href: '/docs/mcp' },
        ],
      },
    ],
  },
  {
    groups: [
      SPECTRUM_SITEMAP[1],
      {
        title: 'Patterns',
        links: [
          { label: 'Hero sections', href: '/hero-sections' },
          { label: 'Auth', href: '/authentication-components' },
          { label: 'Dashboards', href: '/dashboard-components' },
          { label: 'Landing pages', href: '/landing-page-components' },
        ],
      },
    ],
  },
  { groups: [SPECTRUM_SITEMAP[2]] },
  {
    groups: [
      SPECTRUM_SITEMAP[3],
      {
        title: 'Compare',
        links: [
          { label: 'vs MUI', href: '/compare' },
          { label: 'vs Chakra', href: '/compare' },
          { label: 'vs Mantine', href: '/compare' },
          { label: 'vs Flowbite', href: '/compare' },
        ],
      },
    ],
  },
  { groups: [SPECTRUM_SITEMAP[4]] },
];

export const SPECTRUM_UTILITY = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/tos' },
  { label: 'License', href: '/docs/license' },
  { label: 'Status', href: '/blocks/footers' },
];

/* ── Status ─────────────────────────────────────────────── */

export type ServiceHealth = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface ServiceStatus {
  name: string;
  health: ServiceHealth;
  history: number[];
  uptime: string;
}

const ok = (n: number) => Array.from({ length: n }, () => 1);
const days = (spec: number[]) => [...ok(30 - spec.length), ...spec];

export const SPECTRUM_SERVICES: ServiceStatus[] = [
  {
    name: 'Registry API',
    health: 'operational',
    history: days([0.99, 1, 1, 1, 1, 1]),
    uptime: '99.99%',
  },
  {
    name: 'Docs site',
    health: 'operational',
    history: days([1, 0.994, 1, 1, 1, 1, 1, 1]),
    uptime: '99.97%',
  },
  {
    name: 'MCP server',
    health: 'degraded',
    history: days([0.96, 0.82, 0.74, 0.88, 0.91, 0.93, 0.9, 0.97, 1, 1, 1, 1]),
    uptime: '99.42%',
  },
  { name: 'CDN', health: 'operational', history: ok(30), uptime: '100%' },
  {
    name: 'Preview builds',
    health: 'maintenance',
    history: days([1, 1, 0.99, 1, 1, 0.6, 0.6, 0.6]),
    uptime: '99.81%',
  },
];

export const SPECTRUM_INCIDENTS = [
  'MCP server — elevated latency on search, mitigation deployed',
  'Preview builds — scheduled maintenance until 04:00 UTC',
  'Registry API — all regions nominal for 14 days',
];

/* ── Trust ──────────────────────────────────────────────── */

export interface ComplianceBadge {
  id: string;
  label: string;
  scope: string;
  issued: string;
  href: string;
}

export const SPECTRUM_COMPLIANCE: ComplianceBadge[] = [
  {
    id: 'soc2',
    label: 'SOC 2 Type II',
    scope: 'Registry, docs and preview infrastructure',
    issued: 'Report issued 12 Mar 2026',
    href: '/privacy-policy',
  },
  {
    id: 'iso27001',
    label: 'ISO 27001',
    scope: 'Information security management system',
    issued: 'Certified 28 Jan 2026',
    href: '/privacy-policy',
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    scope: 'EU data processing and sub-processor register',
    issued: 'DPA updated 04 Feb 2026',
    href: '/privacy-policy',
  },
  {
    id: 'hipaa',
    label: 'HIPAA',
    scope: 'BAA available for enterprise plans',
    issued: 'Attested 19 Dec 2025',
    href: '/pricing',
  },
  {
    id: 'pci',
    label: 'PCI DSS 4.0',
    scope: 'Payments handled by a Level 1 processor',
    issued: 'SAQ-A filed 07 Jan 2026',
    href: '/pricing',
  },
];

/* ── Regions ────────────────────────────────────────────── */

export interface FooterRegion {
  id: string;
  name: string;
  flag: string;
  locale: string;
  currency: string;
  residency: string;
  utcOffset: number;
}

export const SPECTRUM_REGIONS: FooterRegion[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    locale: 'English (US)',
    currency: 'USD',
    residency: 'us-east-1',
    utcOffset: -4,
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    locale: 'English (IN)',
    currency: 'INR',
    residency: 'ap-south-1',
    utcOffset: 5.5,
  },
  {
    id: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    locale: 'Deutsch',
    currency: 'EUR',
    residency: 'eu-central-1',
    utcOffset: 2,
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    flag: '🇬🇧',
    locale: 'English (UK)',
    currency: 'GBP',
    residency: 'eu-west-2',
    utcOffset: 1,
  },
  {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    locale: '日本語',
    currency: 'JPY',
    residency: 'ap-northeast-1',
    utcOffset: 9,
  },
  {
    id: 'br',
    name: 'Brazil',
    flag: '🇧🇷',
    locale: 'Português',
    currency: 'BRL',
    residency: 'sa-east-1',
    utcOffset: -3,
  },
];

/* ── Careers ────────────────────────────────────────────── */

export interface OpenRole {
  title: string;
  department: string;
  location: string;
  type: string;
}

export const SPECTRUM_ROLES: OpenRole[] = [
  { title: 'Design Engineer', department: 'Design', location: 'Remote', type: 'Full-time' },
  {
    title: 'Component Library Maintainer',
    department: 'Engineering',
    location: 'Bengaluru',
    type: 'Full-time',
  },
  { title: 'Docs and DX Writer', department: 'Design', location: 'Remote', type: 'Contract' },
  { title: 'Motion Designer', department: 'Design', location: 'Remote', type: 'Part-time' },
  { title: 'Developer Advocate', department: 'Growth', location: 'Remote (US)', type: 'Full-time' },
  {
    title: 'Accessibility Engineer',
    department: 'Engineering',
    location: 'Berlin',
    type: 'Full-time',
  },
  { title: 'Community Manager', department: 'Growth', location: 'Remote', type: 'Part-time' },
];

/* ── Policy ─────────────────────────────────────────────── */

export const SPECTRUM_COOKIES = [
  {
    id: 'essential',
    label: 'Essential',
    blurb: 'Session, theme and auth. Cannot be switched off.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    blurb: 'Which components get copied, in aggregate.',
    required: false,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    blurb: 'Your package manager and code style choices.',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    blurb: 'Not used. Listed so the register stays complete.',
    required: false,
  },
];

/* ── Changelog ──────────────────────────────────────────── */

export interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  kind: 'model' | 'api' | 'platform';
}

export const SPECTRUM_RELEASES: ReleaseEntry[] = [
  {
    version: 'v2.4.0',
    date: '12 Sep 2026',
    title: 'Footers — eighteen page-width blocks',
    kind: 'platform',
  },
  {
    version: 'v2.3.2',
    date: '09 Sep 2026',
    title: 'Charts moved into the Blocks section',
    kind: 'platform',
  },
  {
    version: 'v2.3.0',
    date: '02 Sep 2026',
    title: 'Typed data-table engine and fifteen table blocks',
    kind: 'api',
  },
  {
    version: 'v2.2.4',
    date: '21 Aug 2026',
    title: 'MCP server: search, install and read any block',
    kind: 'api',
  },
  {
    version: 'v2.2.0',
    date: '08 Aug 2026',
    title: 'Next 16, React 19 and Tailwind v4',
    kind: 'model',
  },
];

/* ── Ask the docs ───────────────────────────────────────── */

export const SPECTRUM_ANSWER =
  'Run `npx shadcn add @spectrumui/<name>` and the CLI writes the source into your project — no runtime package, no wrapper. Every block is plain React and Tailwind, so you own the file the moment it lands and can edit it like anything else in your codebase.';

export const SPECTRUM_CITATIONS = [
  { label: 'Installation', href: '/docs/installation' },
  { label: 'CLI reference', href: '/docs/cli' },
  { label: 'Registry JSON', href: '/llm-info' },
];

export const SPECTRUM_PROMPTS = [
  'How do I install a block?',
  'Does it support dark mode?',
  'Can I use it with v0?',
];

/* ── Manifesto ──────────────────────────────────────────── */

export const SPECTRUM_MANIFESTO =
  'We build components you can read. The source is on the page, the animation is in CSS, and nothing is hidden behind a wrapper you did not write.';

export const SPECTRUM_META = [
  { label: 'Components', value: '58' },
  { label: 'Blocks', value: '93' },
  { label: 'Dependencies added', value: '0' },
  { label: 'License', value: 'Apache-2.0' },
];

/* ── Social proof ───────────────────────────────────────── */

export const SPECTRUM_STATS = [
  { label: 'GitHub stars', value: 1200, suffix: '+' },
  { label: 'Blocks and variants', value: 250, suffix: '+' },
  { label: 'Weekly installs', value: 18, suffix: 'K' },
  { label: 'Rating', value: 4.9, suffix: '/5' },
];

export const SPECTRUM_WAITLIST_AVATARS = [
  { initials: 'AR', src: '/avatars/people/02.jpg' },
  { initials: 'MK', src: '/avatars/people/05.jpg' },
  { initials: 'JT', src: '/avatars/people/08.jpg' },
  { initials: 'LN', src: '/avatars/people/11.jpg' },
  { initials: 'PV', src: '/avatars/people/13.jpg' },
];

export const SPECTRUM_CONTACT = {
  email: 'hello@spectrumhq.in',
  phone: '+91 80 4567 2210',
  address: 'Indiranagar, Bengaluru, KA',
  hours: 'Mon–Fri, 10:00–18:00 IST',
  utcOffset: 5.5,
};
