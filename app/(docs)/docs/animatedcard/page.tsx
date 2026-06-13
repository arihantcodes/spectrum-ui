import React from "react";
import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import AnimatedCardDemo from "./animatedcarddemo";
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
        path="app/(docs)/docs/animatedcard/animatedcarddemo.tsx"
        cli="@spectrumui/animated-card"
        installScript="npm i lucide-react framer-motion"
        installCodePath="app/(docs)/docs/animatedcard/animatedcard.tsx"
      >
        <AnimatedCardDemo />
      </PreviewCodeCard>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
