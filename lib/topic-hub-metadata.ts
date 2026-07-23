import type { Metadata } from 'next';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import type { TopicHub } from '@/content/topic-hubs';
import { siteConfig } from '@/config/site';
import { topicHubPath } from '@/lib/topic-hub-links';

export function createTopicHubMetadata(hub: TopicHub): Metadata {
  const canonicalUrl = `${siteConfig.url}${topicHubPath(hub.slug)}`;

  return baseMetadata({
    title: hub.metadataTitle,
    description: hub.description,
    keywords: [...hub.keywords],
    canonicalUrl,
    openGraph: {
      title: hub.metadataTitle,
      description: hub.description,
    },
    twitter: {
      title: hub.metadataTitle,
      description: hub.description,
    },
  });
}
