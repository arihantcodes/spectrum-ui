import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { ReloadableHologram } from './reload/holo';
import { ReloadableInk } from './reload/ink';
import { ReloadableOrbital } from './reload/orbital';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Text Animations',
  description: 'A collection of text effects including holographic, ink morph, and orbital reveals. Free React and Next.js components built with Framer Motion.',
  keywords: [
    "text animations",
    "animated text",
    "React text animation",
    "Next.js animation",
    "holographic text",
    "ink morph text",
    "orbital text",
    "Framer Motion text",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animatedtext",
});

const Textanimation = () => {
  return (
    <SEOWrapper
      componentName="Text Animations"
      description="A collection of text effects including holographic, ink morph, and orbital reveals."
      url="https://ui.spectrumhq.in/docs/animatedtext"
      keywords={[
        "text animations",
        "animated text",
        "React text animation",
        "Next.js animation",
        "holographic text",
        "ink morph text",
        "orbital text",
        "Framer Motion text",
      ]}
    >
      <PageTemplate
        title="Text Animations"
        description="A collection of text effects including holographic, ink morph, and orbital reveals."
        className="mt-6"
      >
      <PageSubTitle>Holographic Scan Reveal</PageSubTitle>

      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/hologram-text.tsx"
        cli="@spectrumui/holographic"
      
        installScript="npx shadcn@latest add @spectrumui/holographic"
        installCodePath="app/(docs)/docs/animatedtext/usage/holo.tsx"
      >
        <ReloadableHologram />
      </PreviewCodeCard>

      <PageSubTitle>Orbital Letters</PageSubTitle>

      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/orbital-text.tsx"
        cli="@spectrumui/orbital-letters"
      
        installScript="npx shadcn@latest add @spectrumui/orbital-letters"
        installCodePath="app/(docs)/docs/animatedtext/usage/orbital.tsx"
      >
        <ReloadableOrbital />
      </PreviewCodeCard>

      <PageSubTitle>Fluid Ink Morph</PageSubTitle>

      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/ink-morph.tsx"
        cli="@spectrumui/ink"
      
        installScript="npx shadcn@latest add @spectrumui/ink"
        installCodePath="app/(docs)/docs/animatedtext/usage/ink.tsx"
      >
        <ReloadableInk />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default Textanimation;
