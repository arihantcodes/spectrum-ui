import {
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import BentoGridDemo from "@/app/registry/bento-grid/bento-grid-demo";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Bento Grid",
  description:
    "A premium, interactive bento grid component for React and Next.js. Features framer-motion physics, scroll-based animations, and responsive layouts.",
  keywords: [
    "bento grid",
    "bento box",
    "React bento grid",
    "animated grid",
    "Next.js grid",
    "framer motion grid",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/bento-grid",
});

export default function BentoGridPage() {
  return (
    <SEOWrapper
      componentName="Bento Grid"
      description="A premium, interactive bento grid component for React and Next.js. Features framer-motion physics, scroll-based animations, and responsive layouts."
      url="https://ui.spectrumhq.in/docs/bento-grid"
      keywords={[
        "bento grid",
        "bento box",
        "React bento grid",
        "animated grid",
        "Next.js grid",
        "framer motion grid",
      ]}
    >
      <PageTemplate
        title="Bento Grid"
        description="A premium, interactive bento grid component with physics-based hover effects, dynamic background elements, and scroll animations."
      >
        <PreviewCodeCard
          path="app/registry/bento-grid/bento-grid-demo.tsx"
          installCodePath="app/registry/bento-grid/bento-grid.tsx"
          cli="@spectrumui/bento-grid"
          installScript="npm install framer-motion lucide-react"
        >
          {<BentoGridDemo />}
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  );
}
