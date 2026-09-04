import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import NumberTickerDemo from './number-ticker-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Number Ticker',
  description:
    'A rolling digit ticker that counts to a value with per-digit stagger, padding and blur. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'number ticker React',
    'rolling digits animation',
    'odometer counter',
    'animated stat number',
    'beUI number ticker',
    'count up component',
    'Next.js KPI ticker',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/number-ticker',
});

const page = () => {
  const description =
    'A rolling digit ticker that counts to a value with per-digit stagger, padding and blur.';

  return (
    <SEOWrapper
      componentName="Number Ticker"
      description={description}
      url="https://ui.spectrumhq.in/docs/number-ticker"
      keywords={[
        'number ticker React',
        'rolling digits animation',
        'odometer counter',
        'animated stat number',
      ]}
    >
      <PageTemplate title="Number Ticker" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/number-ticker/number-ticker-demo.tsx"
          installCodePath="components/motion/number-ticker.tsx"
          cli="@spectrumui/number-ticker"
          installScript="npm i motion clsx tailwind-merge"
        >
          <NumberTickerDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { NumberTicker } from "@/components/motion/number-ticker"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={'<NumberTicker value={48250} prefix="$" locale blur />'}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">NumberTicker</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          beUI&apos;s Number Ticker (beui.dev, MIT), installed from its shadcn registry into
          components/motion. Each digit rolls vertically to its new value with a small stagger;
          group separators and a prefix or suffix stay put.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'value',
                required: true,
                type: 'number',
                description: 'Value to display',
              },
              {
                prop: 'pad',
                required: false,
                type: 'number',
                description: 'Digits to pad to on the left',
              },
              {
                prop: 'duration',
                required: false,
                type: 'number',
                description: 'Per-digit roll duration in seconds',
              },
              {
                prop: 'stagger',
                required: false,
                type: 'number',
                description: 'Stagger between digits in seconds',
              },
              {
                prop: 'startOnView',
                required: false,
                type: 'boolean',
                description: 'Only roll once the element enters the viewport',
              },
              {
                prop: 'prefix',
                required: false,
                type: 'string',
                description: 'Text before the digits, e.g. "$"',
              },
              {
                prop: 'suffix',
                required: false,
                type: 'string',
                description: 'Text after the digits, e.g. "%"',
              },
              {
                prop: 'blur',
                required: false,
                type: 'boolean',
                description: 'Add a small blur during rolls',
              },
              {
                prop: 'locale',
                required: false,
                type: 'boolean',
                description: 'Insert locale group separators',
              },
              {
                prop: 'format',
                required: false,
                type: '(value: number) => string',
                description: 'Custom formatter (client-only)',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the wrapper',
              },
              {
                prop: 'digitClassName',
                required: false,
                type: 'string',
                description: 'Classes for each digit slot',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
