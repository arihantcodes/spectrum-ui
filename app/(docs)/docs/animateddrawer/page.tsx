import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { AnimatedDrawer } from './demo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Animated Drawer',
  description:
    'Smooth animated drawer component for React and Next.js. Slide-in side panels with beautiful animations. Perfect for mobile menus, settings panels, and sidebars. Built with Framer Motion and Vaul.',
  keywords: [
    "animated drawer",
    "drawer component",
    "React drawer",
    "slide panel",
    "side drawer",
    "Next.js drawer",
    "mobile drawer",
    "animated sidebar",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animateddrawer",
});

const Loginpage = () => {
  return (
    <SEOWrapper
      componentName="Animated Drawer"
      description="Smooth animated drawer component for React and Next.js. Slide-in side panels with beautiful animations. Perfect for mobile menus, settings panels, and sidebars. Built with Framer Motion and Vaul."
      url="https://ui.spectrumhq.in/docs/animateddrawer"
      keywords={[
        "animated drawer",
        "drawer component",
        "React drawer",
        "slide panel",
        "side drawer",
        "Next.js drawer",
        "mobile drawer",
        "animated sidebar",
      ]}
    >
      <PageTemplate title="Animated Drawer">
      <PreviewCodeCard
        path="app/(docs)/docs/animateddrawer/demo.tsx"
        cli="@spectrumui/animated-drawer"
      >
        <AnimatedDrawer />
      </PreviewCodeCard>
      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/animateddrawer/demo.tsx"
        withEnd
        installScript="npm i lucide-react motion vaul react-use-measure"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default Loginpage;
