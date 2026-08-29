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
  // Verdicts render on the page as a visible question/answer list, so they
  // belong in FAQPage alongside the authored FAQs. Answer text is joined from
  // the same two visible strings — the markup never states more than the page.
  const verdictEntries = (hub.verdicts ?? []).map((verdict) => ({
    question: verdict.need,
    // `why` is written to start with the pick so it can be quoted alone, which
    // would otherwise read as "Spectrum UI. Spectrum UI is the best…".
    answer: verdict.why.startsWith(verdict.pick) ? verdict.why : `${verdict.pick}. ${verdict.why}`,
  }));
  const faq = generateFAQStructuredData([
    ...verdictEntries,
    ...hub.faqs.map(({ question, answer }) => ({ question, answer })),
  ]);

  return { collection, breadcrumbs, faq };
}
