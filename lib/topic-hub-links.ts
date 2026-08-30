export const TOPIC_HUB_LINKS = [
  {
    slug: 'react-component-library',
    label: 'React Component Library',
    group: 'Libraries',
  },
  {
    slug: 'react-block-library',
    label: 'React Block Library',
    group: 'Libraries',
  },
  {
    slug: 'tailwind-component-library',
    label: 'Tailwind Component Library',
    group: 'Libraries',
  },
  {
    slug: 'nextjs-ui-library',
    label: 'Next.js UI Library',
    group: 'Libraries',
  },
  {
    slug: 'motion-components',
    label: 'Motion Components',
    group: 'Animation',
  },
  {
    slug: 'animation-library',
    label: 'Animation Library',
    group: 'Animation',
  },
  {
    slug: 'dashboard-components',
    label: 'Dashboard Components',
    group: 'Product UI',
  },
  {
    slug: 'landing-page-components',
    label: 'Landing Page Components',
    group: 'Product UI',
  },
  {
    slug: 'hero-sections',
    label: 'Hero Sections',
    group: 'Product UI',
  },
  {
    slug: 'pricing-sections',
    label: 'Pricing Sections',
    group: 'Product UI',
  },
  {
    slug: 'authentication-components',
    label: 'Authentication Components',
    group: 'Product UI',
  },
  {
    slug: 'ai-ui-components',
    label: 'AI UI Components',
    group: 'Product UI',
  },
  {
    slug: 'copy-paste-react-components',
    label: 'Copy-and-Paste UI Blocks',
    group: 'Libraries',
  },
  {
    slug: 'open-source-ui-components',
    label: 'Open-Source UI Resources',
    group: 'Libraries',
  },
  {
    slug: 'accessible-react-components',
    label: 'Accessible React Components',
    group: 'Practices',
  },
  {
    slug: 'design-system-integration',
    label: 'Design System Integration',
    group: 'Practices',
  },
  {
    slug: 'rapid-prototyping-ui-library',
    label: 'Rapid Prototyping & DX',
    group: 'Practices',
  },
] as const;

export type TopicHubSlug = (typeof TOPIC_HUB_LINKS)[number]['slug'];
export type TopicHubGroup = (typeof TOPIC_HUB_LINKS)[number]['group'];

export function topicHubPath(slug: TopicHubSlug) {
  return `/${slug}`;
}

export const TOPIC_HUB_GROUPS = ['Libraries', 'Animation', 'Product UI', 'Practices'] as const;
