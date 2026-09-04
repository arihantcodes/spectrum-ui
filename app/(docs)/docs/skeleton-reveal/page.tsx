import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import SkeletonRevealDemo from './skeleton-reveal-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Skeleton Reveal',
  description:
    'A skeleton that pulses while loading, then cross-fades and un-blurs into the real content. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'skeleton loader React',
    'skeleton to content reveal',
    'loading placeholder animation',
    'transitions.dev skeleton',
    'cross-fade skeleton',
    'Next.js loading state',
    'blur reveal content',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/skeleton-reveal',
});

const page = () => {
  const description =
    'A skeleton that pulses while loading, then cross-fades and un-blurs into the real content.';

  return (
    <SEOWrapper
      componentName="Skeleton Reveal"
      description={description}
      url="https://ui.spectrumhq.in/docs/skeleton-reveal"
      keywords={[
        'skeleton loader React',
        'skeleton to content reveal',
        'loading placeholder animation',
        'transitions.dev skeleton',
      ]}
    >
      <PageTemplate title="Skeleton Reveal" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/skeleton-reveal/skeleton-reveal-demo.tsx"
          installCodePath="components/spectrumui/skeleton-reveal.tsx"
          cli="@spectrumui/skeleton-reveal"
        >
          <SkeletonRevealDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { SkeletonReveal } from "@/components/spectrumui/skeleton-reveal"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<SkeletonReveal loading={isLoading} skeleton={<RowSkeleton />}>\n  <Row user={user} />\n</SkeletonReveal>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">SkeletonReveal</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The Skeleton loader and reveal recipe from transitions.dev (Jakub Antalík), embedded as
          its namespaced t-skel CSS. The skeleton pulses while loading is true; flipping it to false
          cross-fades and un-blurs the content in the same slot, and flipping it back snaps to the
          skeleton without animating the reverse.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'loading',
                required: true,
                type: 'boolean',
                description: 'While true the skeleton shows and pulses; false reveals the content',
              },
              {
                prop: 'skeleton',
                required: true,
                type: 'ReactNode',
                description: 'Placeholder layer, sized like the content',
              },
              {
                prop: 'children',
                required: true,
                type: 'ReactNode',
                description: 'Real content rendered in the same slot',
              },
              {
                prop: 'pulseCount',
                required: false,
                type: 'number',
                description: 'Pulse cycles before settling',
                default: '1',
              },
              {
                prop: 'pulseDuration',
                required: false,
                type: 'number',
                description: 'One pulse cycle in ms',
                default: '1000',
              },
              {
                prop: 'revealDuration',
                required: false,
                type: 'number',
                description: 'Cross-fade duration in ms',
                default: '400',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the wrapper',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
