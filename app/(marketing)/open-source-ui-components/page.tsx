import type { Metadata } from 'next';

import { TopicHubPage } from '@/components/topic-hub-page';
import { getTopicHub } from '@/content/topic-hubs';
import { createTopicHubMetadata } from '@/lib/topic-hub-metadata';

const hub = getTopicHub('open-source-ui-components');

export const metadata: Metadata = createTopicHubMetadata(hub);

export default function OpenSourceUiComponentsPage() {
  return <TopicHubPage hub={hub} />;
}
