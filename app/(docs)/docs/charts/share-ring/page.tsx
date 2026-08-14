import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { ShareRingDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Share Ring",
  description:
    "A donut chart that puts the active share in the hole and uses the list as a legend. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "donut chart",
    "pie chart",
    "share chart",
    "breakdown chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/share-ring",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Share Ring"
      description="A donut chart that puts the active share in the hole and uses the list as a legend."
      url="https://ui.spectrumhq.in/docs/charts/share-ring"
      keywords={["donut chart", "pie chart", "share chart", "breakdown chart"]}
    >
      <PageTemplate title="Share Ring" description="A donut chart that puts the active share in the hole and uses the list as a legend.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/share-ring/demo.tsx"
          installCodePath="app/registry/charts/share-ring.tsx"
          cli="@spectrumui/share-ring"
          installScript="npm i recharts framer-motion"
        >
          <ShareRingDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
