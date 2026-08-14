import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { ConversionCascadeDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Conversion Cascade",
  description:
    "A conversion cascade of rounded stages with drop-off percentages between each step. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "funnel chart",
    "conversion chart",
    "cascade chart",
    "drop-off visualization",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/conversion-cascade",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Conversion Cascade"
      description="A conversion cascade of rounded stages with drop-off percentages between each step."
      url="https://ui.spectrumhq.in/docs/charts/conversion-cascade"
      keywords={["funnel chart", "conversion chart", "cascade chart", "drop-off visualization"]}
    >
      <PageTemplate title="Conversion Cascade" description="A conversion cascade of rounded stages with drop-off percentages between each step.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/conversion-cascade/demo.tsx"
          installCodePath="app/registry/charts/conversion-cascade.tsx"
          cli="@spectrumui/conversion-cascade"
          installScript="npm i framer-motion"
        >
          <ConversionCascadeDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
