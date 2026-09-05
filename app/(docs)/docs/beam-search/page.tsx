import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import BeamSearchDemo from './beam-search-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Beam Search Bar',
  description:
    'A search bar whose bottom edge lights up with a traveling beam while it has focus. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'animated search bar',
    'search input glow',
    'border beam line',
    'focus animation input',
    'border-beam React',
    'command search bar',
    'Next.js search input',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/beam-search',
});

const page = () => {
  const description =
    'A search bar whose bottom edge lights up with a traveling beam while it has focus.';

  return (
    <SEOWrapper
      componentName="Beam Search Bar"
      description={description}
      url="https://ui.spectrumhq.in/docs/beam-search"
      keywords={[
        'animated search bar',
        'search input glow',
        'border beam line',
        'focus animation input',
      ]}
    >
      <PageTemplate title="Beam Search Bar" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/beam-search/beam-search-demo.tsx"
          installCodePath="components/spectrumui/beam-search.tsx"
          cli="@spectrumui/beam-search"
          installScript="npm i border-beam lucide-react"
        >
          <BeamSearchDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { BeamSearch } from "@/components/spectrumui/beam-search"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<BeamSearch\n  placeholder="Search components…"\n  onChange={setQuery}\n  onSubmit={runSearch}\n/>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">BeamSearch</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Uses the line preset of BorderBeam from the border-beam package (Jakub Antalík, MIT): a
          glow travels along the bottom edge only. The beam fades in on focus and out on blur
          through the library&apos;s active prop, so idle bars stay quiet. Escape clears the field.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'value',
                required: false,
                type: 'string',
                description: 'Controlled value',
              },
              {
                prop: 'defaultValue',
                required: false,
                type: 'string',
                description: 'Initial value when uncontrolled',
                default: '""',
              },
              {
                prop: 'onChange',
                required: false,
                type: '(value: string) => void',
                description: 'Fires on every change',
              },
              {
                prop: 'onSubmit',
                required: false,
                type: '(value: string) => void',
                description: 'Fires on Enter with the current value',
              },
              {
                prop: 'placeholder',
                required: false,
                type: 'string',
                description: 'Placeholder text',
                default: '"Search…"',
              },
              {
                prop: 'alwaysOn',
                required: false,
                type: 'boolean',
                description: 'Keep the beam running without focus',
                default: 'false',
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
                prop: 'trailing',
                required: false,
                type: 'ReactNode',
                description: 'Right-hand slot, e.g. a keyboard hint',
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
