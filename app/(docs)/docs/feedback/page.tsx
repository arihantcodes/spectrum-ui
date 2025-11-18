import React from "react";
import { PageSubTitle, PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Feedback } from "./feedbackdemo";
import { Steppers } from "@/components/ui/steppers";
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
        >
          <Feedback />
        </PreviewCodeCard>

        <PageSubTitle>Installation</PageSubTitle>
        <p className="text-gray-400">
          Make Utils.ts file in lib and paste the code from Step-2
        </p>
        <Steppers
          className=""
          installScript="npm i framer-motion lucide-react"
          steps={[{ title: "Create feedback component & paste the code" }]}
          withInstall
          codePath="lib/utils.ts"
        />
      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
