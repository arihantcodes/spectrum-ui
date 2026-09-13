/**
 * Three fictional companies, one per audience the footers are built for.
 *
 * The AI Assistants category proved the value of a single coherent fixture:
 * twenty-seven previews of one conversation read as a product, twenty-seven
 * sets of lorem ipsum read as a widget dump. Footers need three, because an
 * enterprise sitemap and a two-person side project want opposite things from
 * the same slot on the page.
 *
 *   Northgate Systems — data infrastructure sold to banks and carriers. Its
 *   footer is a procurement surface: sitemap depth, compliance, regions, SLAs.
 *
 *   Cormorant AI — an inference platform. Its footer talks to engineers:
 *   model availability, latency, curl, the docs.
 *
 *   Fernpost — analytics built by three people. Its footer has one job, which
 *   is to convert, and it is allowed to have a personality.
 *
 * Names are invented. Numbers are plausible and fixed — nothing here derives
 * from Date.now(), so server and client render the same thing.
 */

import type {
  ComplianceBadge,
  FooterLinkGroup,
  FooterRegion,
  FooterSocial,
  ModelStatus,
  OpenRole,
  ReleaseEntry,
  ServiceStatus,
} from '../types';

/* ── Northgate Systems — enterprise ─────────────────────── */

export const NORTHGATE = {
  name: 'Northgate',
  legalName: 'Northgate Systems, Inc.',
  tagline: 'The data plane for regulated infrastructure.',
  founded: 2016,
  headquarters: 'Chicago, IL',
};

export const NORTHGATE_SITEMAP: FooterLinkGroup[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Data plane', href: '#' },
      { label: 'Stream processing', href: '#' },
      { label: 'Governance', href: '#' },
      { label: 'Lineage graph', href: '#', badge: 'New' },
      { label: 'Access control', href: '#' },
      { label: 'Observability', href: '#' },
      { label: 'Cost controls', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Financial services', href: '#' },
      { label: 'Healthcare', href: '#' },
      { label: 'Logistics', href: '#' },
      { label: 'Public sector', href: '#' },
      { label: 'Energy', href: '#' },
      { label: 'Migrations', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'SDKs', href: '#' },
      { label: 'Terraform provider', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Status', href: '#', external: true },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Careers', href: '#', badge: '14' },
      { label: 'Newsroom', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact sales', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Trust center', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Service levels', href: '#' },
      { label: 'Whitepapers', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
];

/**
 * The sitemap as an enterprise site actually carries it: five columns, each
 * stacking two or three sub-groups, sixty-one links. Razorpay ships ~60,
 * GitHub ~35, Google ~30 — a footer with twenty looks like a placeholder.
 */
export const NORTHGATE_COLUMNS: { groups: FooterLinkGroup[] }[] = [
  {
    groups: [
      {
        title: 'Platform',
        links: [
          { label: 'Data plane', href: '#' },
          { label: 'Stream processing', href: '#' },
          { label: 'Governance', href: '#' },
          { label: 'Lineage graph', href: '#', badge: 'New' },
          { label: 'Access control', href: '#' },
          { label: 'Observability', href: '#' },
          { label: 'Cost controls', href: '#' },
        ],
        seeAll: { label: 'All capabilities', href: '#' },
      },
      {
        title: 'Deployment',
        links: [
          { label: 'Managed cloud', href: '#' },
          { label: 'Self-hosted', href: '#' },
          { label: 'Air-gapped', href: '#' },
          { label: 'Bring your own cloud', href: '#' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Solutions',
        links: [
          { label: 'Financial services', href: '#' },
          { label: 'Healthcare', href: '#' },
          { label: 'Logistics', href: '#' },
          { label: 'Public sector', href: '#' },
          { label: 'Energy', href: '#' },
          { label: 'Telecommunications', href: '#' },
        ],
        seeAll: { label: 'All industries', href: '#' },
      },
      {
        title: 'Migrations',
        links: [
          { label: 'From Snowflake', href: '#' },
          { label: 'From Databricks', href: '#' },
          { label: 'From on-premise', href: '#' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Developers',
        links: [
          { label: 'Documentation', href: '#' },
          { label: 'API reference', href: '#' },
          { label: 'SDKs', href: '#' },
          { label: 'Terraform provider', href: '#' },
          { label: 'CLI', href: '#' },
          { label: 'Changelog', href: '#' },
          { label: 'Status', href: '#' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'Forum', href: '#' },
          { label: 'Slack', href: '#' },
          { label: 'Office hours', href: '#' },
          { label: 'Open source', href: '#' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Customers', href: '#' },
          { label: 'Careers', href: '#', badge: '14' },
          { label: 'Newsroom', href: '#' },
          { label: 'Partners', href: '#' },
          { label: 'Investors', href: '#' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'Talk to sales', href: '#' },
          { label: 'Request a demo', href: '#' },
          { label: 'Support', href: '#' },
          { label: 'Report a vulnerability', href: '#' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Trust',
        links: [
          { label: 'Trust center', href: '#' },
          { label: 'Security', href: '#' },
          { label: 'Compliance', href: '#' },
          { label: 'Service levels', href: '#' },
          { label: 'Sub-processors', href: '#' },
          { label: 'Data residency', href: '#' },
        ],
        seeAll: { label: 'Request a report', href: '#' },
      },
      {
        title: 'Learn',
        links: [
          { label: 'Whitepapers', href: '#' },
          { label: 'Webinars', href: '#' },
          { label: 'Benchmarks', href: '#' },
          { label: 'Glossary', href: '#' },
        ],
      },
    ],
  },
];

export const NORTHGATE_LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'DPA', href: '#' },
  { label: 'Sub-processors', href: '#' },
  { label: 'Accessibility', href: '#' },
  { label: 'Modern slavery statement', href: '#' },
];

export const NORTHGATE_SOCIALS: FooterSocial[] = [
  { label: 'LinkedIn', href: '#', handle: 'northgate-systems' },
  { label: 'GitHub', href: '#', handle: 'northgate' },
  { label: 'X', href: '#', handle: '@northgate' },
  { label: 'YouTube', href: '#', handle: 'Northgate' },
];

export const NORTHGATE_REGIONS: FooterRegion[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    locale: 'English (US)',
    currency: 'USD',
    residency: 'us-east-1 · us-west-2',
    utcOffset: -5,
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    locale: 'English (UK)',
    currency: 'EUR',
    residency: 'eu-central-1',
    utcOffset: 1,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    locale: 'English (UK)',
    currency: 'GBP',
    residency: 'eu-west-2',
    utcOffset: 0,
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
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    locale: 'English (AU)',
    currency: 'AUD',
    residency: 'ap-southeast-2',
    utcOffset: 10,
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

export const NORTHGATE_COMPLIANCE: ComplianceBadge[] = [
  {
    id: 'soc2',
    label: 'SOC 2 Type II',
    scope: 'Security, Availability, Confidentiality',
    issued: 'Report dated 12 Mar 2026',
    href: '#',
  },
  {
    id: 'iso',
    label: 'ISO 27001',
    scope: 'Information security management',
    issued: 'Certified through Nov 2027',
    href: '#',
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    scope: 'EU data residency and DPA on request',
    issued: 'Standard contractual clauses',
    href: '#',
  },
  {
    id: 'hipaa',
    label: 'HIPAA',
    scope: 'BAA available on Enterprise plans',
    issued: 'Reviewed 04 Feb 2026',
    href: '#',
  },
  {
    id: 'pci',
    label: 'PCI DSS 4.0',
    scope: 'Level 1 service provider',
    issued: 'AOC dated 22 Jan 2026',
    href: '#',
  },
];

export const NORTHGATE_SERVICES: ServiceStatus[] = [
  {
    name: 'Ingest API',
    health: 'operational',
    history: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 0.99, 1, 1, 1, 1, 1, 1, 0.998, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1,
    ],
    uptime: '99.99%',
  },
  {
    name: 'Query engine',
    health: 'operational',
    history: [
      1, 1, 1, 1, 1, 0.98, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.994, 1, 1, 1, 1, 1, 1, 1, 0.999, 1, 1,
      1, 1,
    ],
    uptime: '99.97%',
  },
  {
    name: 'Streaming',
    health: 'degraded',
    history: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.96, 0.82, 0.74, 0.88, 0.91, 0.93, 0.9,
      0.97, 1, 1, 1, 1, 1,
    ],
    uptime: '99.42%',
  },
  {
    name: 'Console',
    health: 'operational',
    history: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    uptime: '100%',
  },
  {
    name: 'Webhooks',
    health: 'maintenance',
    history: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.6, 0.6,
      0.6, 0.6,
    ],
    uptime: '99.81%',
  },
];

export const NORTHGATE_INCIDENTS = [
  'Streaming — elevated consumer lag in eu-central-1, mitigation in progress',
  'Webhooks — scheduled maintenance, retries queued until 04:00 UTC',
  'Resolved — Query engine p99 regression in us-west-2, 41 minutes',
];

export const NORTHGATE_ROLES: OpenRole[] = [
  {
    title: 'Staff Engineer, Query',
    department: 'Engineering',
    location: 'Chicago / Remote',
    type: 'Full-time',
  },
  {
    title: 'Site Reliability Engineer',
    department: 'Engineering',
    location: 'Berlin',
    type: 'Full-time',
  },
  {
    title: 'Security Compliance Lead',
    department: 'Security',
    location: 'Remote (US)',
    type: 'Full-time',
  },
  {
    title: 'Enterprise Account Executive',
    department: 'Sales',
    location: 'New York',
    type: 'Full-time',
  },
  { title: 'Solutions Architect, FS', department: 'Sales', location: 'London', type: 'Full-time' },
  { title: 'Technical Writer', department: 'Product', location: 'Remote (EU)', type: 'Contract' },
  {
    title: 'Product Designer, Console',
    department: 'Product',
    location: 'Chicago',
    type: 'Full-time',
  },
  {
    title: 'Data Governance PM',
    department: 'Product',
    location: 'Remote (US)',
    type: 'Full-time',
  },
];

export const NORTHGATE_COOKIE_CATEGORIES = [
  {
    id: 'essential',
    label: 'Strictly necessary',
    description: 'Session, load balancing, fraud prevention.',
    locked: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Aggregate page and feature usage.',
    locked: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Attribution for paid campaigns.',
    locked: false,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    description: 'Region, language and theme choices.',
    locked: false,
  },
];

/* ── Cormorant AI ───────────────────────────────────────── */

export const CORMORANT = {
  name: 'Cormorant',
  legalName: 'Cormorant AI Labs',
  tagline: 'Inference that holds its latency under load.',
  wordmark: 'CORMORANT',
};

export const CORMORANT_LINKS: FooterLinkGroup[] = [
  {
    title: 'Models',
    links: [
      { label: 'Cormorant 3 Opus', href: '#', badge: 'GA' },
      { label: 'Cormorant 3 Flash', href: '#' },
      { label: 'Cormorant Vision', href: '#', badge: 'Beta' },
      { label: 'Embeddings', href: '#' },
      { label: 'Model card index', href: '#' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Quickstart', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'Streaming', href: '#' },
      { label: 'Tool use', href: '#' },
      { label: 'Batch inference', href: '#' },
      { label: 'Rate limits', href: '#' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Publications', href: '#' },
      { label: 'Evaluations', href: '#' },
      { label: 'Safety framework', href: '#' },
      { label: 'Red teaming', href: '#' },
      { label: 'Residency', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Trust', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export const CORMORANT_MODELS: ModelStatus[] = [
  {
    id: 'opus',
    name: 'cormorant-3-opus',
    context: '400K',
    latencyMs: 940,
    health: 'operational',
    tier: 'Frontier',
  },
  {
    id: 'flash',
    name: 'cormorant-3-flash',
    context: '200K',
    latencyMs: 210,
    health: 'operational',
    tier: 'Fast',
  },
  {
    id: 'vision',
    name: 'cormorant-vision',
    context: '128K',
    latencyMs: 610,
    health: 'degraded',
    tier: 'Multimodal',
  },
  {
    id: 'embed',
    name: 'cormorant-embed-2',
    context: '8K',
    latencyMs: 45,
    health: 'operational',
    tier: 'Embedding',
  },
  {
    id: 'guard',
    name: 'cormorant-guard',
    context: '32K',
    latencyMs: 120,
    health: 'operational',
    tier: 'Safety',
  },
];

export const CORMORANT_COMMANDS = [
  { command: '/docs', description: 'Open the documentation', hint: 'docs.cormorant.ai' },
  { command: '/quickstart', description: 'Ten lines to your first completion', hint: '~3 min' },
  {
    command: '/status',
    description: 'Live model and API availability',
    hint: 'All systems normal',
  },
  { command: '/pricing', description: 'Per-million-token pricing', hint: 'from $0.25' },
  { command: '/keys', description: 'Create or rotate an API key', hint: 'console' },
  { command: '/support', description: 'Reach an engineer', hint: 'replies in ~4h' },
];

export const CORMORANT_ANSWER = {
  question: 'How do I stream a completion?',
  answer:
    'Pass stream: true and read the server-sent events off the response. Each event carries a delta; concatenate them in order and stop when you receive the done event. The SDK exposes the same thing as an async iterator.',
  citations: [
    { index: 1, title: 'Streaming responses', href: '#' },
    { index: 2, title: 'SDK reference — client.messages.stream', href: '#' },
  ],
};

export const CORMORANT_MANIFESTO =
  'We build inference infrastructure for people who get paged. Predictable latency, published evaluations, and a status page that tells the truth.';

export const CORMORANT_RELEASES: ReleaseEntry[] = [
  {
    version: '3.4.0',
    date: '18 Aug 2026',
    title: 'Opus context extended to 400K tokens',
    kind: 'model',
  },
  {
    version: '3.3.2',
    date: '02 Aug 2026',
    title: 'Structured outputs reach general availability',
    kind: 'api',
  },
  {
    version: '3.3.0',
    date: '21 Jul 2026',
    title: 'Vision preview opens in eu-central',
    kind: 'model',
  },
  {
    version: '3.2.5',
    date: '09 Jul 2026',
    title: 'Batch inference pricing cut by 40%',
    kind: 'platform',
  },
  { version: '3.2.0', date: '24 Jun 2026', title: 'Tool use supports parallel calls', kind: 'api' },
];

export const CORMORANT_ENDPOINTS = [
  {
    id: 'messages',
    label: 'Messages',
    path: '/v1/messages',
    curl: `curl https://api.cormorant.ai/v1/messages \\
  -H "x-api-key: $CORMORANT_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "cormorant-3-flash",
    "max_tokens": 512,
    "messages": [{"role":"user","content":"Ship it."}]
  }'`,
    python: `from cormorant import Cormorant

client = Cormorant()
message = client.messages.create(
    model="cormorant-3-flash",
    max_tokens=512,
    messages=[{"role": "user", "content": "Ship it."}],
)
print(message.content[0].text)`,
    tokens: 42,
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    path: '/v1/embeddings',
    curl: `curl https://api.cormorant.ai/v1/embeddings \\
  -H "x-api-key: $CORMORANT_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "cormorant-embed-2",
    "input": ["harbour", "hull", "manifest"]
  }'`,
    python: `from cormorant import Cormorant

client = Cormorant()
vectors = client.embeddings.create(
    model="cormorant-embed-2",
    input=["harbour", "hull", "manifest"],
)
print(len(vectors.data[0].embedding))`,
    tokens: 9,
  },
];

/* ── Fernpost — product / SMB ───────────────────────────── */

export const FERNPOST = {
  name: 'Fernpost',
  legalName: 'Fernpost Analytics',
  tagline: 'Product analytics that fits on one screen.',
  email: 'hello@fernpost.co',
  phone: '+1 (415) 555-0134',
  address: '19 Bracken Row, Portland, OR',
  hours: 'Mon–Fri, 9:00–17:00 PT',
  utcOffset: -7,
};

export const FERNPOST_LINKS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboards', href: '#' },
      { label: 'Funnels', href: '#' },
      { label: 'Retention', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Open metrics', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
];

export const FERNPOST_SOCIALS: FooterSocial[] = [
  { label: 'X', href: '#', handle: '@fernpost' },
  { label: 'GitHub', href: '#', handle: 'fernpost' },
  { label: 'Bluesky', href: '#', handle: '@fernpost.co' },
  { label: 'RSS', href: '#' },
];

export const FERNPOST_STATS = [
  { label: 'Teams tracking', value: 4820, suffix: '' },
  { label: 'Events / month', value: 91, suffix: 'M' },
  { label: 'Median load', value: 240, suffix: 'ms' },
  { label: 'Rating', value: 4.9, suffix: '/5' },
];

export const FERNPOST_WAITLIST_AVATARS = [
  { initials: 'AR', src: '/avatars/people/02.jpg' },
  { initials: 'MK', src: '/avatars/people/05.jpg' },
  { initials: 'JT', src: '/avatars/people/08.jpg' },
  { initials: 'LN', src: '/avatars/people/11.jpg' },
  { initials: 'PV', src: '/avatars/people/13.jpg' },
];

export const FERNPOST_ACCENTS = [
  { id: 'ember', label: 'Ember', hex: '#f9452d' },
  { id: 'acid', label: 'Acid', hex: '#E1F435' },
  { id: 'moss', label: 'Moss', hex: '#3f9142' },
  { id: 'tide', label: 'Tide', hex: '#2f6fed' },
  { id: 'plum', label: 'Plum', hex: '#8b3fa8' },
];

export const FERNPOST_NOW = [
  'Shipping the new funnel editor',
  'Rewriting the ingest pipeline',
  'Reading every support ticket',
];
