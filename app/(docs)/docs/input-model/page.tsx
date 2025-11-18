import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import InputModel from './input-model';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Input Model',
  description: 'Modal input component for React and Next.js. A dialog-based input form that allows users to enter data in a modal overlay. Perfect for quick data entry and form submissions.',
  keywords: [
    "input modal",
    "modal input",
    "React input modal",
    "form modal",
    "dialog input",
    "Next.js modal input",
    "input dialog",
    "modal form",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/input-model",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Input Model"
      description="Modal input component for React and Next.js. A dialog-based input form that allows users to enter data in a modal overlay. Perfect for quick data entry and form submissions."
      url="https://ui.spectrumhq.in/docs/input-model"
      keywords={[
        "input modal",
        "modal input",
        "React input modal",
        "form modal",
        "dialog input",
        "Next.js modal input",
        "input dialog",
        "modal form",
      ]}
    >
      <PageTemplate title="Input Model">
      <PreviewCodeCard
        path="app/(docs)/docs/input-model/input-model.tsx"
        cli="@spectrumui/input-model"
      >
        <InputModel />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/input-model/input-model.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/input-model"
      />
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
