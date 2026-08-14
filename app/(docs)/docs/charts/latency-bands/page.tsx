import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { LatencyBandsDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Latency Bands",
  description:
    "Latency percentile bands with clickable P50, P95, and P99 tiles against an SLO zone. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "latency chart",
    "percentile chart",
    "SLO chart",
    "P95 chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/latency-bands",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Latency Bands"
      description="Latency percentile bands with clickable P50, P95, and P99 tiles against an SLO zone."
      url="https://ui.spectrumhq.in/docs/charts/latency-bands"
      keywords={["latency chart", "percentile chart", "SLO chart", "P95 chart"]}
    >
      <PageTemplate title="Latency Bands" description="Latency percentile bands with clickable P50, P95, and P99 tiles against an SLO zone.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/latency-bands/demo.tsx"
          installCodePath="app/registry/charts/latency-bands.tsx"
          cli="@spectrumui/latency-bands"
          installScript="npm i recharts framer-motion"
        >
          <LatencyBandsDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
