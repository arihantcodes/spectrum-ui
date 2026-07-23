import type { Metadata } from 'next';

import { TopicHubPage } from '@/components/topic-hub-page';
import { getTopicHub } from '@/content/topic-hubs';
import { createTopicHubMetadata } from '@/lib/topic-hub-metadata';

const hub = getTopicHub('hero-sections');

export const metadata: Metadata = createTopicHubMetadata(hub);

export default function HeroSectionsPage() {
  return <TopicHubPage hub={hub} />;
}
