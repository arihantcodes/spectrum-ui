import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

import Usage from "@/app/(docs)/docs/components/usage";

import Footerdemo from "./footerdemo";
import AnimatedWaveFooter from "./usage/animatefooter";
import StackedCircularFooter from "./usage/stackedfooter";
import ParticleAnimationFooter from "./usage/particlefooter";
import Footer from "@/components/footer";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Footer",
  description:
    "Beautiful footer components for React and Next.js. Includes animated wave, stacked circular, and particle animation footers. Perfect for websites, landing pages, and applications. Built with Framer Motion and Tailwind CSS.",
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
      description="Beautiful footer components for React and Next.js. Includes animated wave, stacked circular, and particle animation footers. Perfect for websites, landing pages, and applications. Built with Framer Motion and Tailwind CSS."
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
      <PageTemplate title="Footers">
      <PreviewCodeCard
        path="app/(docs)/docs/footer/footerdemo.tsx"
        cli="@spectrumui/footers-demo"
      >
        <Footerdemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/footer/footerdemo.tsx"
        withEnd
        installScript="npm i lucide-react"
      />

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
        title="FloatingParticle Footer"
        path="app/(docs)/docs/footer/usage/particlefooter.tsx"
        cli="@spectrumui/floatingparticle-footer"
      >
        <ParticleAnimationFooter />
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
