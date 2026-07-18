import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

import Usage from "@/app/(docs)/docs/components/usage";

import Footerdemo from "./footerdemo";
import AnimatedWaveFooter from "./usage/animatefooter";
import StackedCircularFooter from "./usage/stackedfooter";
import GradientFooter from "./usage/particlefooter";
import Footer from "@/components/footer";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Footer",
  description:
    "A collection of footers with wave, stacked, and particle animation styles. Free React and Next.js components built with Framer Motion and Tailwind CSS.",
  keywords: [
    "footer component",
    "React footer",
    "Next.js footer",
    "animated footer",
    "website footer",
    "landing page footer",
    "footer design",
    "responsive footer",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/footer",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Footer"
      description="A collection of footers with wave, stacked, and particle animation styles."
      url="https://ui.spectrumhq.in/docs/footer"
      keywords={[
        "footer component",
        "React footer",
        "Next.js footer",
        "animated footer",
        "website footer",
        "landing page footer",
        "footer design",
        "responsive footer",
      ]}
    >
      <PageTemplate
        title="Footer"
        description="A collection of footers with wave, stacked, and particle animation styles."
      >
      <PreviewCodeCard
        path="app/(docs)/docs/footer/footerdemo.tsx"
        cli="@spectrumui/footers-demo"
      
        installScript="npm i lucide-react"
        installCodePath="app/(docs)/docs/footer/footerdemo.tsx"
      >
        <Footerdemo />
      </PreviewCodeCard>

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="AnimatedWave Footer"
        path="app/(docs)/docs/footer/usage/animatefooter.tsx"
      >
        <AnimatedWaveFooter />
      </Usage>
      <Usage
        title="StackedCircular Footer"
        path="app/(docs)/docs/footer/usage/stackedfooter.tsx"
        cli="@spectrumui/stackedcircular-footer"
      >
        <StackedCircularFooter />
      </Usage>
      <Usage
        title="Gradient Footer"
        path="app/(docs)/docs/footer/usage/particlefooter.tsx"
        cli="@spectrumui/floatingparticle-footer"
      >
        <GradientFooter />
      </Usage>
      <Usage
        title="Footer"
        path="components/footer.tsx"
        cli="@spectrumui/footer"
      >
        <Footer />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
