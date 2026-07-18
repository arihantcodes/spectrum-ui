import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Feedback } from "./feedbackdemo";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Feedback Card",
  description:
    "A feedback card that collects ratings and comments with emoji reactions. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "feedback card",
    "feedback component",
    "React feedback",
    "Next.js feedback",
    "rating component",
    "review card",
    "user feedback",
    "survey component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/feedback",
});

const page = () => {
  return (
    <SEOWrapper
      componentName="Feedback Card"
      description="A feedback card that collects ratings and comments with emoji reactions."
      url="https://ui.spectrumhq.in/docs/feedback"
      keywords={[
        "feedback card",
        "feedback component",
        "React feedback",
        "Next.js feedback",
        "rating component",
        "review card",
        "user feedback",
        "survey component",
      ]}
    >
      <div>
        <PageTemplate
          title="Feedback Card"
          description="A feedback card that collects ratings and comments with emoji reactions."
          className="mt-5"
        >
        <PreviewCodeCard
          path="app/(docs)/docs/feedback/feedbackdemo.tsx"
          cli="@spectrumui/feedback-demo"
        
        installScript="npm i framer-motion lucide-react"
        installCodePath="lib/utils.ts"
      >
          <Feedback />
        </PreviewCodeCard>

      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
