import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import KanbanGlassForest from './kanban01';


export const metadata: Metadata = baseMetadata({
  title: 'Spectrum UI-Kanban Board',
  description:
    'Spectrum UI Kanban Board is a drag-and-drop task management tool that allows users to organize tasks into columns, making it easy to visualize and manage workflows. It features a clean and modern design with customizable columns and tasks.',
});

const KanbanBoard = () => {
  return (
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
  );
};

export default KanbanBoard;
