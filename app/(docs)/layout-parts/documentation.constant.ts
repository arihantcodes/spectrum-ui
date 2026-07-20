import { COMPONENT_CATALOG, componentDocsPath } from "@/lib/component-catalog";
import { TOPIC_HUB_LINKS, topicHubPath } from "@/lib/topic-hub-links";

interface Documentation {
  groupKey: string;
  groupValue: string;
  children: DocumentationChild[];
}

interface DocumentationChild {
  label: string;
  value: string;
  url: string;
  new?: boolean;
}

export const DOCS: Documentation[] = [
  {
    groupKey: 'Follow for more updates',
    groupValue: 'Follow for more updates',
    children: [
      {
        label: 'Twitter @arihantcodes',
        value: 'Twitter @arihantcodes',
        url: 'https://x.com/arihantCodes',
      },
    ],
  },
  {
    groupKey: 'gettingStart',
    groupValue: 'Getting Started',
    children: [
      {
        label: 'Introduction',
        value: 'introduction',
        url: '/docs',
      },
      {
        label: 'Installation',
        value: 'installation',
        url: '/docs/installation',
      },
      {
        label: 'Guides',
        value: 'guides',
        url: '/docs/guides',
      },
    ],
  },
  {
    groupKey: 'integrations',
    groupValue: 'Integrations',
    children: [
      {
        label: 'MCP Server',
        value: 'mcp',
        url: '/docs/mcp',
      },
    ],
  },
  {
    groupKey: 'topicGuides',
    groupValue: 'Topic Guides',
    children: TOPIC_HUB_LINKS.map((hub) => ({
      label: hub.label,
      value: hub.slug,
      url: topicHubPath(hub.slug),
    })),
  },
  {
    groupKey: 'components',
    groupValue: 'Components',
    children: COMPONENT_CATALOG.map((component) => ({
      label: component.name,
      value: component.slug,
      url: componentDocsPath(component.slug),
    })),
  },
];
