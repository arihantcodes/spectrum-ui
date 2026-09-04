import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import MetalPromptBarDemo from './metal-prompt-bar-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Metal Prompt Bar',
  description:
    'An AI prompt bar with a live liquid-metal send button that reflects onto the chips beside it. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'AI prompt bar',
    'chat composer React',
    'liquid metal send button',
    'metal-fx composer',
    'agent input component',
    'AI chat input Next.js',
    'prompt input Tailwind',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/metal-prompt-bar',
});

const page = () => {
  const description =
    'An AI prompt bar with a live liquid-metal send button that reflects onto the chips beside it.';

  return (
    <SEOWrapper
      componentName="Metal Prompt Bar"
      description={description}
      url="https://ui.spectrumhq.in/docs/metal-prompt-bar"
      keywords={[
        'AI prompt bar',
        'chat composer React',
        'liquid metal send button',
        'metal-fx composer',
      ]}
    >
      <PageTemplate title="Metal Prompt Bar" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/metal-prompt-bar/metal-prompt-bar-demo.tsx"
          installCodePath="components/spectrumui/metal-prompt-bar.tsx"
          cli="@spectrumui/metal-prompt-bar"
          installScript="npm i metal-fx lucide-react"
        >
          <MetalPromptBarDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={'import { MetalPromptBar } from "@/components/spectrumui/metal-prompt-bar"'}
            requireAuth={false}
          />
          <CodeHighlight
            code={
              '<MetalPromptBar\n  chips={["Agent", "Auto", "Tools"]}\n  onSubmit={(text) => ask(text)}\n/>'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">MetalPromptBar</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The composer from the metal-fx showcase, wired for React: an auto-growing textarea, Enter
          to send and Shift+Enter for newlines, and a send button wrapped in MetalFx. The chips are
          passed as reflection targets, so in dark mode they pick up a soft mirrored glint of the
          ring.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'placeholder',
                required: false,
                type: 'string',
                description: 'Placeholder for the empty composer',
                default: '"Build anything…"',
              },
              {
                prop: 'chips',
                required: false,
                type: 'string[]',
                description: 'Pills shown bottom-left; each one reflects the ring in dark mode',
                default: '["Agent", "Auto"]',
              },
              {
                prop: 'preset',
                required: false,
                type: '"chromatic" | "silver" | "gold"',
                description: 'Metal palette for the send ring',
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
                prop: 'onSubmit',
                required: false,
                type: '(text: string) => void',
                description:
                  'Fires with the trimmed text on Enter or the send button; the field clears afterwards',
              },
              {
                prop: 'onChipClick',
                required: false,
                type: '(chip: string) => void',
                description: 'Fires when a chip is clicked',
              },
              {
                prop: 'maxRows',
                required: false,
                type: 'number',
                description: 'Max textarea rows before it scrolls',
                default: '6',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the outer card',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
