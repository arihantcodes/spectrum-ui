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
    "Beautiful feedback card component for React and Next.js. Collect user feedback with rating, comments, and emoji reactions. Perfect for surveys, reviews, and user satisfaction forms. Built with Framer Motion and Tailwind CSS.",
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
      description="Beautiful feedback card component for React and Next.js. Collect user feedback with rating, comments, and emoji reactions. Perfect for surveys, reviews, and user satisfaction forms. Built with Framer Motion and Tailwind CSS."
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
        <PageTemplate title="Feedback" className="mt-5">
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
