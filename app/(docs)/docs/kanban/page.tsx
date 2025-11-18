import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import KanbanGlassForest from './kanban01';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Kanban Board',
  description:
    'Drag-and-drop Kanban board component for React and Next.js. Organize tasks into columns with beautiful animations. Perfect for project management, task tracking, and workflow visualization. Built with Framer Motion and Tailwind CSS.',
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
      description="Drag-and-drop Kanban board component for React and Next.js. Organize tasks into columns with beautiful animations. Perfect for project management, task tracking, and workflow visualization. Built with Framer Motion and Tailwind CSS."
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
      <PageTemplate title="kanban Board">
      <PreviewCodeCard
        path="app/(docs)/docs/kanban/kanban01.tsx"
        cli="@spectrumui/kanbanboard"
      >
        <KanbanGlassForest />
      </PreviewCodeCard>
      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/kanban/kanban01.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/kanbanboard"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default KanbanBoard;
