import React from 'react';
import { PageSubTitle, PageTemplate } from '@/app/(docs)/docs/components/page-template';
import { Steppers } from '@/components/ui/steppers';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import Testimonial from './testimonialsdemo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Testimonials',
  description: 'Beautiful testimonials component for React and Next.js. Display customer reviews, feedback, and social proof with elegant animations. Perfect for landing pages and marketing sites.',
  keywords: [
    "testimonials component",
    "React testimonials",
    "customer reviews",
    "testimonial card",
    "social proof",
    "reviews component",
    "Next.js testimonials",
    "animated testimonials",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/testimonials",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Testimonials"
      description="Beautiful testimonials component for React and Next.js. Display customer reviews, feedback, and social proof with elegant animations. Perfect for landing pages and marketing sites."
      url="https://ui.spectrumhq.in/docs/testimonials"
      keywords={[
        "testimonials component",
        "React testimonials",
        "customer reviews",
        "testimonial card",
        "social proof",
        "reviews component",
        "Next.js testimonials",
        "animated testimonials",
      ]}
    >
      <PageTemplate title="Testimonials" className='mt-5'>
      <PreviewCodeCard
        path="app/(docs)/docs/testimonials/testimonialsdemo.tsx"
        cli="@spectrumui/testimonials"
      >
        <Testimonial />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/testimonials/testimonialsdemo.tsx"
        withEnd
        installScript="npx shadcn@latest add @spectrumui/testimonials"
      />

     
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
