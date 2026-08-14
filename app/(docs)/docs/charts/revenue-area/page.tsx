import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { RevenueAreaDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Revenue Area",
  description:
    "A revenue area chart whose headline KPI rewinds as you scrub across months. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "revenue chart",
    "area chart",
    "KPI chart",
    "dashboard revenue",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/revenue-area",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Revenue Area"
      description="A revenue area chart whose headline KPI rewinds as you scrub across months."
      url="https://ui.spectrumhq.in/docs/charts/revenue-area"
      keywords={["revenue chart", "area chart", "KPI chart", "dashboard revenue"]}
    >
      <PageTemplate title="Revenue Area" description="A revenue area chart whose headline KPI rewinds as you scrub across months.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/revenue-area/demo.tsx"
          installCodePath="app/registry/charts/revenue-area.tsx"
          cli="@spectrumui/revenue-area"
          installScript="npm i recharts framer-motion"
        >
          <RevenueAreaDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
