import React from 'react';
import { PageTemplate } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import Testimonial from './testimonialsdemo';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

export const metadata: Metadata = baseMetadata({
  title: 'Testimonials',
  description: 'A testimonials section for showcasing customer reviews and social proof. A free React and Next.js component built with Framer Motion and Tailwind CSS.',
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
      description="A testimonials section for showcasing customer reviews and social proof."
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
      <PageTemplate
        title="Testimonials"
        description="A testimonials section for showcasing customer reviews and social proof."
        className="mt-5"
      >
      <PreviewCodeCard
        path="app/(docs)/docs/testimonials/testimonialsdemo.tsx"
        cli="@spectrumui/testimonials"
      
        installScript="npx shadcn@latest add @spectrumui/testimonials"
        installCodePath="app/(docs)/docs/testimonials/testimonialsdemo.tsx"
      >
        <Testimonial />
      </PreviewCodeCard>

     
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
