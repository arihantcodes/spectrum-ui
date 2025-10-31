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

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI-Animated Card",
  description:
    "An animated card component that showcases various tools and technologies.",
});

const DualRangeSliderPage = () => {
  return (
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
  );
};

export default DualRangeSliderPage;
