import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import ExpandableActionBarDemo from './expandable-action-bar-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Expandable Action Bar',
  description:
    'Compact icon actions that expand into labeled controls on hover or focus with shared layout motion. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'expandable action bar',
    'floating toolbar React',
    'icon bar expand on hover',
    'beUI action bar',
    'shared layout toolbar',
    'contextual actions component',
    'Next.js toolbar',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/expandable-action-bar',
});

const page = () => {
  const description =
    'Compact icon actions that expand into labeled controls on hover or focus with shared layout motion.';

  return (
    <SEOWrapper
      componentName="Expandable Action Bar"
      description={description}
      url="https://ui.spectrumhq.in/docs/expandable-action-bar"
      keywords={[
        'expandable action bar',
        'floating toolbar React',
        'icon bar expand on hover',
        'beUI action bar',
      ]}
    >
      <PageTemplate title="Expandable Action Bar" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/expandable-action-bar/expandable-action-bar-demo.tsx"
          installCodePath="components/motion/expandable-action-bar.tsx"
          cli="@spectrumui/expandable-action-bar"
          installScript="npm i motion clsx tailwind-merge"
        >
          <ExpandableActionBarDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { ExpandableActionBar } from "@/components/motion/expandable-action-bar"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<ExpandableActionBar\n  items={[\n    { id: "edit", label: "Edit", icon: <Pencil className="size-4" />, shortcut: "E" },\n    { id: "share", label: "Share", icon: <Share2 className="size-4" /> },\n  ]}\n  onAction={(item) => run(item.id)}\n/>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">ExpandableActionBar</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          beUI&apos;s Expandable Action Bar block (beui.dev, MIT), installed from its shadcn
          registry into components/motion with its gesture hooks. Icons expand into labeled controls
          on hover or focus; on touch the first tap expands and the second acts.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'items',
                required: true,
                type: 'ExpandableActionBarItem[]',
                description:
                  'Actions: { id, label, icon, onClick?, disabled?, active?, badge?, shortcut? }',
              },
              {
                prop: 'expanded',
                required: false,
                type: 'boolean',
                description: 'Controlled expanded state',
              },
              {
                prop: 'defaultExpanded',
                required: false,
                type: 'boolean',
                description: 'Initial expanded state when uncontrolled',
              },
              {
                prop: 'onExpandedChange',
                required: false,
                type: '(expanded: boolean) => void',
                description: 'Fires when the bar expands or collapses',
              },
              {
                prop: 'activeId',
                required: false,
                type: 'string',
                description: 'Id of the highlighted action',
              },
              {
                prop: 'onAction',
                required: false,
                type: '(item: ExpandableActionBarItem) => void',
                description: 'Fires when an action is triggered',
              },
              {
                prop: 'size',
                required: false,
                type: '"sm" | "md"',
                description: 'Control size',
                default: '"md"',
              },
              {
                prop: 'expandOnHover',
                required: false,
                type: 'boolean',
                description: 'Expand when a hovering pointer rests on the bar',
                default: 'true',
              },
              {
                prop: 'expandOnFocus',
                required: false,
                type: 'boolean',
                description: 'Expand when a control receives focus',
              },
              {
                prop: 'collapseDelay',
                required: false,
                type: 'number',
                description: 'Delay in ms before collapsing after leave',
              },
              {
                prop: 'renderItem',
                required: false,
                type: '(item, state) => ReactNode',
                description: 'Custom renderer for an action',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the bar',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
