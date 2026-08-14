import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { LiveTrafficDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Live Traffic",
  description:
    "A live traffic line that appends samples and pauses when you hover the plot. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "live chart",
    "streaming chart",
    "traffic chart",
    "RPS chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/live-traffic",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Live Traffic"
      description="A live traffic line that appends samples and pauses when you hover the plot."
      url="https://ui.spectrumhq.in/docs/charts/live-traffic"
      keywords={["live chart", "streaming chart", "traffic chart", "RPS chart"]}
    >
      <PageTemplate title="Live Traffic" description="A live traffic line that appends samples and pauses when you hover the plot.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/live-traffic/demo.tsx"
          installCodePath="app/registry/charts/live-traffic.tsx"
          cli="@spectrumui/live-traffic"
          installScript="npm i recharts framer-motion"
        >
          <LiveTrafficDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
