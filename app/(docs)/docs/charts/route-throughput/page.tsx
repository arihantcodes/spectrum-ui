import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { RouteThroughputDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Route Throughput",
  description:
    "Ranked API route bars that dim siblings on hover and pin a selected path. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "bar chart",
    "API usage chart",
    "throughput chart",
    "ranked bars",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/route-throughput",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Route Throughput"
      description="Ranked API route bars that dim siblings on hover and pin a selected path."
      url="https://ui.spectrumhq.in/docs/charts/route-throughput"
      keywords={["bar chart", "API usage chart", "throughput chart", "ranked bars"]}
    >
      <PageTemplate title="Route Throughput" description="Ranked API route bars that dim siblings on hover and pin a selected path.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/route-throughput/demo.tsx"
          installCodePath="app/registry/charts/route-throughput.tsx"
          cli="@spectrumui/route-throughput"
          installScript="npm i framer-motion"
        >
          <RouteThroughputDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
