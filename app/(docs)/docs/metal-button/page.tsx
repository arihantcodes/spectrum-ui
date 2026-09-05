import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import MetalButtonDemo from './metal-button-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Metal Button',
  description:
    'A pill button framed by a real-time WebGL liquid-metal ring, in chromatic, silver and gold presets. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'metal button',
    'liquid metal button React',
    'WebGL button effect',
    'chrome button',
    'metal-fx React',
    'premium CTA button',
    'Next.js metal button',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/metal-button',
});

const page = () => {
  const description =
    'A pill button framed by a real-time WebGL liquid-metal ring, in chromatic, silver and gold presets.';

  return (
    <SEOWrapper
      componentName="Metal Button"
      description={description}
      url="https://ui.spectrumhq.in/docs/metal-button"
      keywords={[
        'metal button',
        'liquid metal button React',
        'WebGL button effect',
        'chrome button',
      ]}
    >
      <PageTemplate title="Metal Button" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/metal-button/metal-button-demo.tsx"
          installCodePath="components/spectrumui/metal-button.tsx"
          cli="@spectrumui/metal-button"
          installScript="npm i metal-fx"
        >
          <MetalButtonDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { MetalButton } from "@/components/spectrumui/metal-button"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={'<MetalButton preset="gold" size="lg">Upgrade to Pro</MetalButton>'}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">MetalButton</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Wraps a native button in MetalFx from the metal-fx package (Jakub Antalík, MIT). One
          shared WebGL shader paints every ring on the page, pauses offscreen and renders a
          transparent placeholder on the server. All native button attributes pass through.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'preset',
                required: false,
                type: '"chromatic" | "silver" | "gold"',
                description: 'Metal palette',
                default: '"chromatic"',
              },
              {
                prop: 'theme',
                required: false,
                type: '"auto" | "dark" | "light"',
                description: 'auto follows a .dark/.light class on <html>, then the OS preference',
                default: '"auto"',
              },
              {
                prop: 'strength',
                required: false,
                type: 'number',
                description: 'Ring intensity from 0 to 1',
                default: '1',
              },
              {
                prop: 'size',
                required: false,
                type: '"sm" | "md" | "lg"',
                description: 'Pill height and type size',
                default: '"md"',
              },
              {
                prop: 'paused',
                required: false,
                type: 'boolean',
                description: 'Freeze the shader on its current frame',
                default: 'false',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the inner button',
              },
              {
                prop: 'wrapperClassName',
                required: false,
                type: 'string',
                description: 'Classes for the MetalFx wrapper',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
