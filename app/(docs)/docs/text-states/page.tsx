import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import TextStatesDemo from './text-states-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Text States',
  description:
    'A status label that swaps its text in place, exiting up with blur and entering from below. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'text swap animation',
    'button label states',
    'save saving saved animation',
    'transitions.dev text states',
    'status label transition',
    'CSS text swap React',
    'Next.js button feedback',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/text-states',
});

const page = () => {
  const description =
    'A status label that swaps its text in place, exiting up with blur and entering from below.';

  return (
    <SEOWrapper
      componentName="Text States"
      description={description}
      url="https://ui.spectrumhq.in/docs/text-states"
      keywords={[
        'text swap animation',
        'button label states',
        'save saving saved animation',
        'transitions.dev text states',
      ]}
    >
      <PageTemplate title="Text States" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/text-states/text-states-demo.tsx"
          installCodePath="components/spectrumui/text-states.tsx"
          cli="@spectrumui/text-states"
        >
          <TextStatesDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { TextStates } from "@/components/spectrumui/text-states"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<button onClick={save}>\n  <TextStates text={saving ? "Saving…" : saved ? "Saved" : "Save"} />\n</button>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">TextStates</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The Text states swap recipe from transitions.dev (Jakub Antalík), embedded as its
          namespaced t-text-swap CSS with the reduced-motion guard intact. The component runs the
          recipe&apos;s three-phase class sequence every time the text prop changes, so it drops
          into any button or status line.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'text',
                required: true,
                type: 'string',
                description: 'Current text; each change runs the exit and enter swap',
              },
              {
                prop: 'duration',
                required: false,
                type: 'number',
                description: 'Swap duration in ms per phase',
                default: '150',
              },
              {
                prop: 'translateY',
                required: false,
                type: 'number',
                description: 'Travel distance in px',
                default: '4',
              },
              {
                prop: 'blur',
                required: false,
                type: 'number',
                description: 'Blur amount in px',
                default: '2',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the span',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
