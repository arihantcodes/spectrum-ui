/**
 * One price book, shared by every pricing block preview.
 *
 * Four fictional sellers, because no single company plausibly sells seats,
 * inference tokens, prepaid credits and a $18 flat rate at once — and a pricing
 * library that pretends otherwise reads as fifteen unrelated widgets:
 *
 *   Portside   — freight and logistics analytics, sold per seat. The same
 *                product the AI Assistants blocks talk to.
 *   Cormorant  — an AI inference platform, sold by the token and the credit.
 *   Fernpost   — a three-person analytics tool on one flat price.
 *   Northgate  — enterprise data infrastructure, quoted not listed.
 *
 * Numbers are internally consistent: the annual column is always the monthly
 * one less 20%, graduated tiers only ever step down, and the worked examples
 * add up if you check them.
 */

import type {
  AddOn,
  ComplianceItem,
  CreditPack,
  CreditRate,
  FeatureGroup,
  MeteredProduct,
  ModelRate,
  Plan,
  PlanFamily,
  RecommenderQuestion,
  UsageDimension,
} from '../types';

export const PORTSIDE_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'One route, one dashboard, no card.',
    price: { monthly: 0, annual: 0 },
    unit: 'forever',
    cta: 'Start for free',
    features: [
      '1 tracked lane',
      '7-day shipment history',
      'Daily data refresh',
      'Community support',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For a first operations hire.',
    price: { monthly: 15, annual: 12 },
    unit: 'per user / month',
    cta: 'Start free trial',
    inherits: 'Free',
    features: [
      '10 tracked lanes',
      '90-day shipment history',
      'Hourly data refresh',
      'CSV and Sheets export',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For teams running live freight.',
    price: { monthly: 25, annual: 20 },
    unit: 'per user / month',
    cta: 'Start free trial',
    featured: true,
    badge: 'Most popular',
    inherits: 'Starter',
    features: [
      'Unlimited tracked lanes',
      '3-year shipment history',
      'Live carrier webhooks',
      'Anomaly alerts and SLA breach rules',
      'API access, 100k calls / month',
      'Priority support, 4-hour first response',
    ],
    footnote: '14-day trial. No card required.',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For global networks and audit trails.',
    price: null,
    unit: 'annual contract',
    cta: 'Talk to sales',
    inherits: 'Pro',
    features: [
      'SAML SSO and SCIM provisioning',
      'Unlimited history and data residency',
      'Private carrier connectors',
      '99.99% uptime SLA',
      'Named solutions architect',
    ],
  },
];

export const PORTSIDE_LADDER: Plan[] = [
  PORTSIDE_PLANS[0],
  PORTSIDE_PLANS[1],
  PORTSIDE_PLANS[2],
  {
    id: 'business',
    name: 'Business',
    tagline: 'For multi-region operations teams.',
    price: { monthly: 50, annual: 40 },
    unit: 'per user / month',
    cta: 'Start free trial',
    inherits: 'Pro',
    features: [
      'Unlimited API calls',
      'Custom SLA rules per carrier',
      'Audit log with 2-year retention',
      'SAML SSO',
      'Sandbox environments',
    ],
  },
  PORTSIDE_PLANS[3],
];

export const PORTSIDE_FAMILIES: PlanFamily[] = [
  {
    id: 'individual',
    label: 'Individual',
    description: 'One operator, one workspace, billed on a card.',
    plans: [PORTSIDE_PLANS[0], PORTSIDE_PLANS[1]],
    footnote: 'Upgrade, downgrade or cancel from the billing page. No contract.',
  },
  {
    id: 'team',
    label: 'Teams',
    description: 'Shared lanes, shared alert routing, one invoice.',
    plans: [PORTSIDE_PLANS[2], PORTSIDE_LADDER[3]],
    footnote: 'Seats are pooled across the workspace and prorated the day you add them.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    description: 'Procurement, security review and a signed SLA.',
    plans: [PORTSIDE_PLANS[3]],
    footnote: 'Annual order form, net-30 invoicing, PO numbers and security questionnaires.',
  },
];

export const PORTSIDE_COMPARISON: FeatureGroup[] = [
  {
    label: 'Tracking',
    rows: [
      { label: 'Tracked lanes', values: ['1', '10', 'Unlimited', 'Unlimited'] },
      { label: 'Shipment history', values: ['7 days', '90 days', '3 years', 'Unlimited'] },
      {
        label: 'Data refresh',
        hint: 'How often carrier feeds are pulled.',
        values: ['Daily', 'Hourly', 'Live webhooks', 'Live webhooks'],
      },
      { label: 'Carrier connectors', values: ['4', '24', 'All 60', 'All 60 + private'] },
    ],
  },
  {
    label: 'Alerting',
    rows: [
      { label: 'SLA breach alerts', values: [false, true, true, true] },
      { label: 'Anomaly detection', values: [false, false, true, true] },
      { label: 'Alert routing rules', values: ['—', '3', 'Unlimited', 'Unlimited'] },
      { label: 'Slack and Teams delivery', values: [false, true, true, true] },
    ],
  },
  {
    label: 'Platform',
    rows: [
      { label: 'API calls / month', values: ['—', '10k', '100k', 'Unlimited'] },
      { label: 'Seats', values: ['1', '5', 'Unlimited', 'Unlimited'] },
      { label: 'SAML SSO and SCIM', values: [false, false, false, true] },
      { label: 'Data residency', values: [false, false, 'EU or US', 'Any region'] },
      { label: 'Audit log', values: [false, false, '90 days', '2 years'] },
    ],
  },
  {
    label: 'Support',
    rows: [
      { label: 'Channel', values: ['Community', 'Email', 'Priority email', 'Slack Connect'] },
      { label: 'First response', values: ['—', '2 days', '4 hours', '1 hour'] },
      { label: 'Uptime SLA', values: [false, false, '99.9%', '99.99%'] },
      { label: 'Named architect', values: [false, false, false, true] },
    ],
  },
];

export const PORTSIDE_ADDONS: AddOn[] = [
  {
    id: 'residency',
    name: 'Data residency',
    description: 'Pin storage and processing to the EU, UK or Singapore.',
    price: 90,
  },
  {
    id: 'connectors',
    name: 'Private carrier connectors',
    description: 'We build and maintain a feed for a carrier we do not cover.',
    price: 250,
    unit: 'per connector',
  },
  {
    id: 'audit',
    name: 'Extended audit log',
    description: 'Two years of immutable events with SIEM streaming.',
    price: 120,
  },
  {
    id: 'sandbox',
    name: 'Sandbox environments',
    description: 'Three isolated environments with seeded shipment data.',
    price: 60,
    defaultOn: true,
  },
  {
    id: 'onboarding',
    name: 'Guided onboarding',
    description: 'Four sessions with a solutions architect in your first month.',
    price: 15,
    perSeat: true,
  },
];

export const PORTSIDE_QUESTIONS: RecommenderQuestion[] = [
  {
    id: 'size',
    label: 'How many people will log in?',
    options: [
      {
        id: 'solo',
        label: 'Just me',
        scores: { free: 3, starter: 1 },
        reason: 'a single operator does not need shared alert routing',
      },
      {
        id: 'small',
        label: '2 to 10',
        scores: { starter: 3, pro: 1 },
        reason: 'up to ten seats fits inside Starter',
      },
      {
        id: 'mid',
        label: '11 to 50',
        scores: { pro: 3 },
        reason: 'past ten seats, unlimited seats is cheaper than counting them',
      },
      {
        id: 'large',
        label: 'More than 50',
        scores: { pro: 1, enterprise: 3 },
        reason: 'over fifty seats you will want SCIM provisioning',
      },
    ],
  },
  {
    id: 'need',
    label: 'What is the job to be done?',
    options: [
      {
        id: 'track',
        label: 'See where freight is',
        scores: { free: 2, starter: 1 },
        reason: 'lane tracking is in every plan including Free',
      },
      {
        id: 'alert',
        label: 'Catch SLA breaches',
        scores: { starter: 2, pro: 2 },
        reason: 'breach alerts start on Starter, anomaly detection on Pro',
      },
      {
        id: 'warehouse',
        label: 'Feed our warehouse',
        scores: { pro: 3 },
        reason: 'the API and webhook feeds are Pro features',
      },
      {
        id: 'audit',
        label: 'Pass a customer audit',
        scores: { enterprise: 4 },
        reason: 'a two-year audit log and SOC 2 evidence are Enterprise',
      },
    ],
  },
  {
    id: 'hosting',
    label: 'Where does the data have to live?',
    options: [
      {
        id: 'anywhere',
        label: 'Anywhere is fine',
        scores: { free: 1, starter: 1, pro: 1 },
      },
      {
        id: 'region',
        label: 'EU or US only',
        scores: { pro: 3 },
        reason: 'region pinning is available from Pro',
      },
      {
        id: 'vpc',
        label: 'Inside our own network',
        scores: { enterprise: 4 },
        reason: 'private deployment is an Enterprise arrangement',
      },
    ],
  },
];

export const PORTSIDE_FAQ: { question: string; answer: string }[] = [
  {
    question: 'What counts as a tracked lane?',
    answer:
      'One origin–destination pair on one carrier. Rotterdam–Felixstowe on Meridian Lines is one lane; the same route on a second carrier is a second lane.',
  },
  {
    question: 'What happens when I go over 100k API calls?',
    answer:
      'Nothing breaks. Calls beyond the included volume are billed at $0.90 per thousand, and we email you at 80% so it is never a surprise.',
  },
  {
    question: 'Can I mix plans across a team?',
    answer:
      'Seats are billed at one plan level per workspace. Most teams run a Pro workspace for operations and a Free one for their data team.',
  },
];

export const CORMORANT_MODELS: ModelRate[] = [
  {
    id: 'flash',
    name: 'cormorant-flash',
    context: '128k',
    input: 0.15,
    output: 0.6,
    cacheWrite: 0.19,
    cacheRead: 0.015,
    badge: 'Fastest',
  },
  {
    id: 'core',
    name: 'cormorant-core',
    context: '256k',
    input: 1.1,
    output: 4.4,
    cacheWrite: 1.38,
    cacheRead: 0.11,
    badge: 'Balanced',
  },
  {
    id: 'pro',
    name: 'cormorant-pro',
    context: '1M',
    input: 3,
    output: 15,
    cacheWrite: 3.75,
    cacheRead: 0.3,
  },
  {
    id: 'embed',
    name: 'cormorant-embed',
    context: '8k',
    input: 0.02,
    output: 0,
    cacheWrite: 0,
    cacheRead: 0,
  },
];

export const CORMORANT_METERED: MeteredProduct[] = [
  {
    id: 'input',
    name: 'Input tokens',
    description: 'Everything you send us, on cormorant-core.',
    unit: 'M tokens',
    unitPlural: 'million input tokens',
    included: 2,
    tiers: [
      { from: 0, to: 2, unitPrice: 0 },
      { from: 2, to: 50, unitPrice: 1.1 },
      { from: 50, to: 500, unitPrice: 0.88 },
      { from: 500, to: 5000, unitPrice: 0.66 },
      { from: 5000, unitPrice: 0.44 },
    ],
  },
  {
    id: 'output',
    name: 'Output tokens',
    description: 'Everything the model generates.',
    unit: 'M tokens',
    unitPlural: 'million output tokens',
    included: 0,
    tiers: [
      { from: 0, to: 20, unitPrice: 4.4 },
      { from: 20, to: 200, unitPrice: 3.52 },
      { from: 200, to: 2000, unitPrice: 2.64 },
      { from: 2000, unitPrice: 1.76 },
    ],
  },
  {
    id: 'vectors',
    name: 'Vector storage',
    description: 'Indexed embeddings held warm for retrieval.',
    unit: 'M vectors',
    unitPlural: 'million vectors',
    included: 1,
    tiers: [
      { from: 0, to: 1, unitPrice: 0 },
      { from: 1, to: 25, unitPrice: 0.28 },
      { from: 25, to: 250, unitPrice: 0.19 },
      { from: 250, unitPrice: 0.12 },
    ],
  },
  {
    id: 'gpu',
    name: 'Dedicated GPU',
    description: 'Reserved H100 capacity, metered by the second.',
    unit: 'GPU hours',
    unitPlural: 'GPU hours',
    included: 0,
    tiers: [
      { from: 0, to: 100, unitPrice: 4.2 },
      { from: 100, to: 1000, unitPrice: 3.6 },
      { from: 1000, to: 10000, unitPrice: 2.95 },
      { from: 10000, unitPrice: 2.4 },
    ],
  },
  {
    id: 'egress',
    name: 'Egress',
    description: 'Data leaving our network. Ingress is always free.',
    unit: 'GB',
    unitPlural: 'GB',
    included: 100,
    tiers: [
      { from: 0, to: 100, unitPrice: 0 },
      { from: 100, to: 10000, unitPrice: 0.05 },
      { from: 10000, unitPrice: 0.03 },
    ],
  },
];

export const CORMORANT_DIMENSIONS: UsageDimension[] = [
  {
    id: 'input',
    label: 'Input tokens',
    unit: 'M / month',
    min: 0,
    max: 2000,
    step: 10,
    defaultValue: 240,
  },
  {
    id: 'output',
    label: 'Output tokens',
    unit: 'M / month',
    min: 0,
    max: 500,
    step: 2,
    defaultValue: 48,
  },
  {
    id: 'vectors',
    label: 'Vectors stored',
    unit: 'M',
    min: 0,
    max: 400,
    step: 5,
    defaultValue: 40,
  },
];

export const CORMORANT_PACKS: CreditPack[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 5_000,
    bonus: 0,
    price: 49,
    note: 'Enough to ship a prototype.',
  },
  {
    id: 'build',
    name: 'Build',
    credits: 25_000,
    bonus: 2_500,
    price: 199,
    featured: true,
    note: 'What most teams buy first.',
  },
  {
    id: 'scale',
    name: 'Scale',
    credits: 100_000,
    bonus: 15_000,
    price: 699,
    note: 'Best rate per credit.',
  },
];

export const CORMORANT_CREDIT_RATES: CreditRate[] = [
  { id: 'chat', label: 'Chat completion', credits: 1, per: 1000, unitLabel: 'tokens' },
  { id: 'image', label: 'Image generation', credits: 14, per: 1, unitLabel: 'images' },
  { id: 'transcribe', label: 'Transcription', credits: 3, per: 1, unitLabel: 'audio minutes' },
  { id: 'embed', label: 'Embedding', credits: 1, per: 10_000, unitLabel: 'embedded tokens' },
];

export const CORMORANT_PLANS: Plan[] = [
  {
    id: 'developer',
    name: 'Developer',
    tagline: 'Metered from the first token.',
    price: { monthly: 0, annual: 0 },
    unit: 'pay as you go',
    cta: 'Get an API key',
    features: [
      '2M tokens included monthly',
      'All four models',
      '60 requests / minute',
      'Community Discord',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'Shared quota and a real rate limit.',
    price: { monthly: 250, annual: 200 },
    unit: 'per month + usage',
    cta: 'Start on Team',
    featured: true,
    badge: 'Recommended',
    inherits: 'Developer',
    features: [
      '$250 usage credit included',
      '6,000 requests / minute',
      'Batch API at 50% off',
      'Prompt caching, 90% off reads',
      'Email support, 1 business day',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'Committed volume, dedicated capacity.',
    price: null,
    unit: 'annual commitment',
    cta: 'Talk to sales',
    inherits: 'Team',
    features: [
      'Volume discounts from 20%',
      'Reserved H100 capacity',
      'Zero data retention option',
      '99.9% uptime SLA',
      'Slack Connect with the inference team',
    ],
  },
];

/**
 * A worked month for a 20-person team, so the rate card above stops being
 * abstract. Every line is the graduated maths actually applied, not a guess.
 */
export const CORMORANT_INVOICE: { label: string; detail: string; amount: number }[] = [
  { label: 'Team subscription', detail: '1 workspace × $250 / month', amount: 250 },
  {
    label: 'Input tokens',
    detail: '240M — 2M free, 48M at $1.10, 190M at $0.88',
    amount: 220,
  },
  {
    label: 'Output tokens',
    detail: '48M — 20M at $4.40, 28M at $3.52',
    amount: 186.56,
  },
  {
    label: 'Vector storage',
    detail: '40M — 1M free, 24M at $0.28, 15M at $0.19',
    amount: 9.57,
  },
  { label: 'Dedicated GPU', detail: '62 GPU hours at $4.20', amount: 260.4 },
  { label: 'Egress', detail: '340 GB — 100 GB free, 240 GB at $0.05', amount: 12 },
  { label: 'Usage credit', detail: '$250 included with Team', amount: -250 },
];

export const FERNPOST_PLAN = {
  name: 'Fernpost',
  tagline: 'Product analytics that fits on one screen.',
  monthly: 18,
  annual: 180,
  seats: 'Unlimited seats',
  features: [
    'Unlimited events',
    'Unlimited dashboards',
    'Funnels, retention and paths',
    'Every integration, no add-ons',
    'Self-serve data export',
    'Two-year retention',
    'Email support from the founders',
    'One-click account deletion',
  ],
  guarantee: 'Cancel any time. We refund the current month, no questions asked.',
  absences: ['Seat tiers', 'Event caps', 'Sales calls', 'Annual lock-in', 'Add-ons'],
};

export const NORTHGATE_TIERS: Plan[] = [
  {
    id: 'core',
    name: 'Core',
    tagline: 'For teams bringing structure to their data estate for the first time.',
    price: { monthly: 2400, annual: 2400 },
    unit: '/month',
    cta: 'Talk to an expert',
    features: [
      'Designated infrastructure lead partnered with 1 team',
      'Quarterly capacity reviews to align the next priorities',
      'Northgate console used by a single lead to centralise pipelines, lineage, and evidence in one place',
    ],
  },
  {
    id: 'managed',
    name: 'Managed',
    tagline: 'For platform owners embedding governance across teams and systems.',
    price: null,
    unit: '',
    cta: 'Talk to an expert',
    inherits: 'Core',
    features: [
      'Registered platform architect collaborating with up to 10 teams',
      'Monthly operations workshops',
      'Company-wide runbook wiki and e-training',
      'Northgate console used collaboratively across teams to manage reviews, actions, and evidence in real time',
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    tagline: 'For large estates with higher-maturity and legally demanding residency obligations.',
    price: null,
    unit: '',
    cta: 'Talk to an expert',
    inherits: 'Managed',
    features: [
      'Registered platform architect collaborating with unlimited teams',
      'Live training',
      'Tabletop failover exercises',
      'Independent attestations',
      'Northgate embedded across company-wide workflows — delivering continuous assurance',
    ],
  },
];

export const NORTHGATE_COMPLIANCE: ComplianceItem[] = [
  { id: 'soc2', label: 'SOC 2 Type II', detail: 'Audited annually by Prescott & Vance' },
  { id: 'iso', label: 'ISO 27001', detail: 'Certified since 2021' },
  { id: 'hipaa', label: 'HIPAA', detail: 'BAA available on request' },
  { id: 'gdpr', label: 'GDPR and DPF', detail: 'EU, UK and Swiss transfers covered' },
  { id: 'pentest', label: 'Third-party pen test', detail: 'Quarterly, report on request' },
  { id: 'vpc', label: 'VPC and on-prem', detail: 'Deploy inside your own network' },
];

export const NORTHGATE_METRICS: { value: string; label: string }[] = [
  { value: '99.99%', label: 'Contractual uptime' },
  { value: '< 1 hr', label: 'Sev-1 response' },
  { value: '14 days', label: 'Median time to production' },
  { value: '340 PB', label: 'Under management' },
];

export const NORTHGATE_LOGOS = [
  'Meridian Lines',
  'Halcyon Freight',
  'Brightwater',
  'Ostend Rail',
  'Kestrel Logistics',
  'Ardent Port Group',
];
