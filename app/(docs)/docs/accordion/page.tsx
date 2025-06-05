import React from "react";
import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import { Steppers } from "@/components/ui/steppers";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { AccordionDemo } from "./accordion-demo";

const tailwindConfigCode = ` extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },`;

export const metadata: Metadata = baseMetadata({
  title: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content.",
});

const SkeletonLoadingPage = () => {
  return (
    <PageTemplate
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/accordion/accordion-demo.tsx"
        cli="https://ui.spectrumhq.in/raccordion-demo.json"
      >
        <AccordionDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers withInstall codePath="components/ui/accordion.tsx" withEnd />
    </PageTemplate>
  );
};

export default SkeletonLoadingPage;
