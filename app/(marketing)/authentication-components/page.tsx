import type { Metadata } from 'next';

import { TopicHubPage } from '@/components/topic-hub-page';
import { getTopicHub } from '@/content/topic-hubs';
import { createTopicHubMetadata } from '@/lib/topic-hub-metadata';

const hub = getTopicHub('authentication-components');

export const metadata: Metadata = createTopicHubMetadata(hub);

export default function AuthenticationComponentsPage() {
  return <TopicHubPage hub={hub} />;
}
