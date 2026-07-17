import React from 'react';
import { PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { AnimatedDrawer } from './demo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Animated Drawer',
  description:
    'A drawer panel that slides in smoothly for menus, settings, and sidebars. A free React and Next.js component built with Framer Motion and Vaul.',
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
      description="A drawer panel that slides in smoothly for menus, settings, and sidebars."
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
      <PageTemplate
        title="Animated Drawer"
        description="A drawer panel that slides in smoothly for menus, settings, and sidebars."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/animateddrawer/demo.tsx"
        cli="@spectrumui/animated-drawer"
      
        installScript="npm i lucide-react motion vaul react-use-measure"
        installCodePath="app/(docs)/docs/animateddrawer/demo.tsx"
      >
        <AnimatedDrawer />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default Loginpage;
