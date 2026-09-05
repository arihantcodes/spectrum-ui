import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import DynamicIslandDemo from './dynamic-island-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Dynamic Island',
  description:
    'An iOS-style island pill that morphs between live activity views with a bouncy resize. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'dynamic island React',
    'iOS dynamic island component',
    'live activity pill',
    'morphing pill animation',
    'beUI dynamic island',
    'status island Next.js',
    'Motion layout animation',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/dynamic-island',
});

const page = () => {
  const description =
    'An iOS-style island pill that morphs between live activity views with a bouncy resize.';

  return (
    <SEOWrapper
      componentName="Dynamic Island"
      description={description}
      url="https://ui.spectrumhq.in/docs/dynamic-island"
      keywords={[
        'dynamic island React',
        'iOS dynamic island component',
        'live activity pill',
        'morphing pill animation',
      ]}
    >
      <PageTemplate title="Dynamic Island" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/dynamic-island/dynamic-island-demo.tsx"
          installCodePath="components/motion/dynamic-island.tsx"
          cli="@spectrumui/dynamic-island"
          installScript="npm i motion clsx tailwind-merge"
        >
          <DynamicIslandDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={
              'import { DynamicIsland, DynamicIslandView } from "@/components/motion/dynamic-island"'
            }
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<DynamicIsland view={view} compact={<Dot />}>\n  <DynamicIslandView id="timer">…</DynamicIslandView>\n  <DynamicIslandView id="music">…</DynamicIslandView>\n</DynamicIsland>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">DynamicIsland</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          beUI&apos;s Dynamic Island block (beui.dev, MIT), installed from its shadcn registry into
          components/motion. The shell animates real width and height on a long spring with
          barely-there bounce, while views crossfade with blur. Set view to null for the compact
          pill.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'view',
                required: true,
                type: 'string | null',
                description: 'Active view id; null shows the compact pill',
              },
              {
                prop: 'compact',
                required: false,
                type: 'ReactNode',
                description: 'Compact pill content shown when no view is active',
              },
              {
                prop: 'children',
                required: false,
                type: 'ReactNode',
                description: 'DynamicIslandView elements',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the shell',
              },
            ]}
          />
        </div>
        <PageSectionTitle className="mt-10">DynamicIslandView</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          One view inside the island. Only the view whose id matches the parent&apos;s view prop is
          rendered.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'id',
                required: true,
                type: 'string',
                description: 'Matches the parent view prop when active',
              },
              {
                prop: 'children',
                required: true,
                type: 'ReactNode',
                description: 'View content',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the view',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
