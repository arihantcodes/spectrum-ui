import React from "react";
import { PageTemplate } from "../components/page-template";
import PreviewCodeCard from "../components/preview-code-card";
import { Chart } from "./animateddemo";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Animated SVG Chart",
  description:
    "Animated SVG chart component for React and Next.js. Beautiful data visualization with smooth animations. Perfect for dashboards, analytics, and data presentation. Built with Framer Motion and SVG.",
  keywords: [
    "animated chart",
    "SVG chart",
    "React chart",
    "Next.js chart",
    "data visualization",
    "animated graph",
    "chart component",
    "Framer Motion chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/animatedchart",
});

const page = () => {
  let baseurl =
    process.env.NODE_ENV === "development"
      ? "https://ui.spectrumhq.in"
      : "https://ui.spectrumhq.in";

  return (
    <SEOWrapper
      componentName="Animated SVG Chart"
      description="Animated SVG chart component for React and Next.js. Beautiful data visualization with smooth animations. Perfect for dashboards, analytics, and data presentation. Built with Framer Motion and SVG."
      url="https://ui.spectrumhq.in/docs/animatedchart"
      keywords={[
        "animated chart",
        "SVG chart",
        "React chart",
        "Next.js chart",
        "data visualization",
        "animated graph",
        "chart component",
        "Framer Motion chart",
      ]}
    >
      <div>
        <PageTemplate title="Animated SVG Chart" className="mt-8">
        <PreviewCodeCard
          className=""
          path="app/(docs)/docs/animatedchart/animateddemo.tsx"
          cli="@spectrumui/animated-SVG-chart"
        
        installScript="npm i framer-motion mini-svg-data-uri"
        installCodePath="lib/sample.ts"
      >
          <Chart />
        </PreviewCodeCard>

      </PageTemplate>
      </div>
    </SEOWrapper>
  );
};

export default page;
