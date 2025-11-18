import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { ReloadableHologram } from './reload/holo';
import { ReloadableInk } from './reload/ink';
import { ReloadableOrbital } from './reload/orbital';
import { Steppers } from '@/components/ui/steppers';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Text Animations',
  description: 'Collection of animated text effects for React and Next.js. Includes holographic, ink morph, and orbital text animations. Perfect for hero sections, headings, and interactive UI elements. Built with Framer Motion.',
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
      description="Collection of animated text effects for React and Next.js. Includes holographic, ink morph, and orbital text animations. Perfect for hero sections, headings, and interactive UI elements. Built with Framer Motion."
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
      <PageTemplate title="Holographic Scan Reveal" className="mt-6">
      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/hologram-text.tsx"
        cli="@spectrumui/holographic"
      >
        <ReloadableHologram />
      </PreviewCodeCard>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/animatedtext/usage/holo.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/holographic"
      />

      <PageSubTitle>Orbital Letters</PageSubTitle>

      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/orbital-text.tsx"
        cli="@spectrumui/orbital-letters"
      >
        <ReloadableOrbital />
      </PreviewCodeCard>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/animatedtext/usage/orbital.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/orbital-letters"
      />
      <PageSubTitle>Fluid Ink Morph</PageSubTitle>

      <PreviewCodeCard
        path="app/(docs)/docs/animatedtext/components/ink-morph.tsx"
        cli="@spectrumui/ink-morph"
      >
        <ReloadableInk />
      </PreviewCodeCard>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/animatedtext/usage/ink.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/ink-morph"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default Textanimation;
