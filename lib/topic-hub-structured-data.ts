import type { TopicHub } from '@/content/topic-hubs';
import { getTopicHubComponents } from '@/content/topic-hubs';
import { siteConfig } from '@/config/site';
import { generateCollectionPageStructuredData } from '@/lib/component-structured-data';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/lib/seo-utils';
import { topicHubPath } from '@/lib/topic-hub-links';

export function createTopicHubStructuredData(hub: TopicHub) {
  const components = getTopicHubComponents(hub);
  const url = `${siteConfig.url}${topicHubPath(hub.slug)}`;
  const collection = {
    ...generateCollectionPageStructuredData({
      name: hub.title,
      description: hub.description,
      url,
    }),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: components.length,
      itemListElement: components.map((component, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: component.name,
        url: `${siteConfig.url}${component.href}`,
      })),
    },
  };
  const breadcrumbs = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Guides', url: `${siteConfig.url}/docs/guides` },
    { name: hub.label, url },
  ]);
  const faq = generateFAQStructuredData(
    hub.faqs.map(({ question, answer }) => ({ question, answer })),
  );

  return { collection, breadcrumbs, faq };
}
