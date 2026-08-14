import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { InfraTrioDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Infra Trio",
  description:
    "Three aligned infrastructure sparks that share one hover cursor across host metrics. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "sparkline",
    "infrastructure metrics",
    "CPU chart",
    "server metrics",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/infra-trio",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Infra Trio"
      description="Three aligned infrastructure sparks that share one hover cursor across host metrics."
      url="https://ui.spectrumhq.in/docs/charts/infra-trio"
      keywords={["sparkline", "infrastructure metrics", "CPU chart", "server metrics"]}
    >
      <PageTemplate title="Infra Trio" description="Three aligned infrastructure sparks that share one hover cursor across host metrics.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/infra-trio/demo.tsx"
          installCodePath="app/registry/charts/infra-trio.tsx"
          cli="@spectrumui/infra-trio"
          installScript="npm i recharts framer-motion"
        >
          <InfraTrioDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
