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
import {
  Reference,
  ReferenceBorder,
} from "@/app/(docs)/docs/components/reference";
import ProgressWithValueDemo from "@/app/(docs)/docs/progress-with-value/progress-with-value-demo";
import ProgressWithValuePosition from "@/app/(docs)/docs/progress-with-value/usage/progress-with-value-position";
import ProgressWithValueLabel from "@/app/(docs)/docs/progress-with-value/usage/progress-with-value-label";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Progress With Value",
  description: "Progress bar component with value display for React and Next.js. Show progress percentage, custom labels, and value positioning. Perfect for file uploads, form completion, and task progress. Built with Radix UI.",
  keywords: [
    "progress bar",
    "progress component",
    "React progress",
    "progress with value",
    "Next.js progress",
    "progress indicator",
    "Radix progress",
    "upload progress",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/progress-with-value",
});

const DualRangeSliderPage = () => {
  return (
    <SEOWrapper
      componentName="Progress With Value"
      description="Progress bar component with value display for React and Next.js. Show progress percentage, custom labels, and value positioning. Perfect for file uploads, form completion, and task progress. Built with Radix UI."
      url="https://ui.spectrumhq.in/docs/progress-with-value"
      keywords={[
        "progress bar",
        "progress component",
        "React progress",
        "progress with value",
        "Next.js progress",
        "progress indicator",
        "Radix progress",
        "upload progress",
      ]}
    >
      <PageTemplate
      title="Progress With Value"
      description="A progress bar that displays the current value."
    >
      <ReferenceBorder>
        <Reference href="https://www.radix-ui.com/themes/docs/components/progress" />
      </ReferenceBorder>
      <PreviewCodeCard
        path="app/(docs)/docs/progress-with-value/progress-with-value-demo.tsx"
        cli="@spectrumui/progress-with-value"
      >
        <ProgressWithValueDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/progress-with-value.tsx"
        withEnd
        installScript="npm i @radix-ui/react-progress"
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Value Position"
        path="app/(docs)/docs/progress-with-value/usage/progress-with-value-position.tsx"
        cli="@spectrumui/value-position"
      >
        <ProgressWithValuePosition />
      </Usage>
      <Usage
        title="Custom Label"
        path="app/(docs)/docs/progress-with-value/usage/progress-with-value-label.tsx"
        cli="@spectrumui/custom-label"
      >
        <ProgressWithValueLabel />
      </Usage>
    </PageTemplate>
    </SEOWrapper>
  );
};

export default DualRangeSliderPage;
