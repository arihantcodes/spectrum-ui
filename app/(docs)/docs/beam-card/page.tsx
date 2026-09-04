import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import BeamCardDemo from './beam-card-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Beam Card',
  description:
    'A card wrapped in an animated border beam, traveling or breathing, in four color palettes. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'border beam card',
    'animated border React',
    'glowing border card',
    'border-beam package',
    'feature card animation',
    'Next.js card glow',
    'Tailwind beam border',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/beam-card',
});

const page = () => {
  const description =
    'A card wrapped in an animated border beam, traveling or breathing, in four color palettes.';

  return (
    <SEOWrapper
      componentName="Beam Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/beam-card"
      keywords={[
        'border beam card',
        'animated border React',
        'glowing border card',
        'border-beam package',
      ]}
    >
      <PageTemplate title="Beam Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/beam-card/beam-card-demo.tsx"
          installCodePath="components/spectrumui/beam-card.tsx"
          cli="@spectrumui/beam-card"
          installScript="npm i border-beam"
        >
          <BeamCardDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { BeamCard } from "@/components/spectrumui/beam-card"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<BeamCard\n  size="pulse-outside"\n  colorVariant="ocean"\n  eyebrow="Pro"\n  title="Edge inference"\n  description="Models run in the region closest to the user."\n/>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">BeamCard</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Wraps a card surface in BorderBeam from the border-beam package (Jakub Antalík, MIT). The
          beam reads the card&apos;s own border radius, so it hugs the corners at any size. The
          rotate family travels around the edge; the pulse family breathes.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'eyebrow',
                required: false,
                type: 'string',
                description: 'Small mono label above the title',
              },
              {
                prop: 'title',
                required: false,
                type: 'string',
                description: 'Card title',
              },
              {
                prop: 'description',
                required: false,
                type: 'string',
                description: 'Supporting copy under the title',
              },
              {
                prop: 'children',
                required: false,
                type: 'ReactNode',
                description: 'Body content rendered under the description',
              },
              {
                prop: 'size',
                required: false,
                type: '"md" | "sm" | "pulse-inner" | "pulse-outside"',
                description:
                  'md travels, pulse-inner breathes inside, pulse-outside blooms outward',
                default: '"md"',
              },
              {
                prop: 'colorVariant',
                required: false,
                type: '"colorful" | "ocean" | "sunset" | "mono"',
                description: 'Beam palette',
                default: '"colorful"',
              },
              {
                prop: 'theme',
                required: false,
                type: '"auto" | "dark" | "light"',
                description: 'auto follows a .dark/.light class on <html>, then the OS preference',
                default: '"auto"',
              },
              {
                prop: 'active',
                required: false,
                type: 'boolean',
                description: 'Play, or fade the beam out',
                default: 'true',
              },
              {
                prop: 'strength',
                required: false,
                type: 'number',
                description: 'Beam intensity from 0 to 1',
                default: '1',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the inner card',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
