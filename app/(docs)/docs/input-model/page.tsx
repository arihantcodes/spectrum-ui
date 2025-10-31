import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import InputModel from './input-model';

export const metadata: Metadata = baseMetadata({
  title: 'Spectrum UI - Input Model',
  description: 'An input model that allows you to select a range of values.',
});

const DualRangeSliderPage = () => {
  return (
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
  );
};

export default DualRangeSliderPage;
