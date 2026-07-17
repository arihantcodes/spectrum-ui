import React from 'react';
import { PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import InputModel from './input-model';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Input Model',
  description: 'A modal dialog with an input form for quick data entry. A free React and Next.js component built with Tailwind CSS.',
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
      description="A modal dialog with an input form for quick data entry."
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
      <PageTemplate
        title="Input Model"
        description="A modal dialog with an input form for quick data entry."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/input-model/input-model.tsx"
        cli="@spectrumui/input-model"
      
        installScript="npx shadcn@latest add @spectrumui/input-model"
        installCodePath="app/(docs)/docs/input-model/input-model.tsx"
      >
        <InputModel />
      </PreviewCodeCard>

    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
