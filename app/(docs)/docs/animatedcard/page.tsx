import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import AnimatedCardDemo from "./animatedCarddemo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Animated Card",
  description:
    "Beautiful animated card component for React and Next.js. Showcase tools, technologies, and features with smooth hover animations and transitions. Built with Framer Motion and Tailwind CSS.",
  keywords: [
    "animated card",
    "card component",
    "React card",
    "animated UI card",
    "hover card",
    "Next.js card",
    "Framer Motion card",
    "interactive card",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animatedcard",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Animated Card"
      description="Beautiful animated card component for React and Next.js. Showcase tools, technologies, and features with smooth hover animations and transitions. Built with Framer Motion and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/animatedcard"
      keywords={[
        "animated card",
        "card component",
        "React card",
        "animated UI card",
        "hover card",
        "Next.js card",
        "Framer Motion card",
        "interactive card",
      ]}
    >
      <PageTemplate title="Animated Card">
      <PreviewCodeCard
        path="app/(docs)/docs/animatedcard/animatedCarddemo.tsx"
        cli="@spectrumui/animated-card"
      >
        <AnimatedCardDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="app/(docs)/docs/animatedcard/animatedCard.tsx"
        withEnd
        installScript="npm i lucide-react framer-motion"
      />

    
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
