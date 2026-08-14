import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { PeriodCompareDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Period Compare",
  description:
    "This-versus-last period overlay with a 7D, 30D, and 90D toggle that morphs the series. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "comparison chart",
    "period over period",
    "time range chart",
    "overlay chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/period-compare",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Period Compare"
      description="This-versus-last period overlay with a 7D, 30D, and 90D toggle that morphs the series."
      url="https://ui.spectrumhq.in/docs/charts/period-compare"
      keywords={["comparison chart", "period over period", "time range chart", "overlay chart"]}
    >
      <PageTemplate title="Period Compare" description="This-versus-last period overlay with a 7D, 30D, and 90D toggle that morphs the series.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/period-compare/demo.tsx"
          installCodePath="app/registry/charts/period-compare.tsx"
          cli="@spectrumui/period-compare"
          installScript="npm i recharts framer-motion"
        >
          <PeriodCompareDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
