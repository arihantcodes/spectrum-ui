import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { AnimatedDrawer } from './demo';

export const metadata: Metadata = baseMetadata({
  title: 'Spectrum UI - Animated Drawer',
  description:
    'Spectrum UI Animated Drawer is a component that allows you to create an animated drawer that can be used to display content.',
});

const Loginpage = () => {
  return (
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
  );
};

export default Loginpage;
