import React from 'react';
import { PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import KanbanGlassForest from './kanban01';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Kanban Board',
  description:
    'A drag-and-drop kanban board for organizing tasks into columns. A free React and Next.js component built with Framer Motion and Tailwind CSS.',
  keywords: [
    "kanban board",
    "drag and drop",
    "React kanban",
    "Next.js kanban",
    "task board",
    "project management",
    "trello board",
    "workflow board",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/kanban",
});

const KanbanBoard = () => {
  return (
    <SEOWrapper
      componentName="Kanban Board"
      description="A drag-and-drop kanban board for organizing tasks into columns."
      url="https://ui.spectrumhq.in/docs/kanban"
      keywords={[
        "kanban board",
        "drag and drop",
        "React kanban",
        "Next.js kanban",
        "task board",
        "project management",
        "trello board",
        "workflow board",
      ]}
    >
      <PageTemplate
        title="Kanban Board"
        description="A drag-and-drop kanban board for organizing tasks into columns."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/kanban/kanban01.tsx"
        cli="@spectrumui/kanbanboard"
      
        installScript="npx shadcn@latest add @spectrumui/kanbanboard"
        installCodePath="app/(docs)/docs/kanban/kanban01.tsx"
      >
        <KanbanGlassForest />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default KanbanBoard;
