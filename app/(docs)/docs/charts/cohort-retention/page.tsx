import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { CohortRetentionDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Cohort Retention",
  description:
    "A cohort retention matrix that highlights the hovered row and week together. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "cohort chart",
    "retention matrix",
    "retention heatmap",
    "cohort analysis",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/cohort-retention",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Cohort Retention"
      description="A cohort retention matrix that highlights the hovered row and week together."
      url="https://ui.spectrumhq.in/docs/charts/cohort-retention"
      keywords={["cohort chart", "retention matrix", "retention heatmap", "cohort analysis"]}
    >
      <PageTemplate title="Cohort Retention" description="A cohort retention matrix that highlights the hovered row and week together.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/cohort-retention/demo.tsx"
          installCodePath="app/registry/charts/cohort-retention.tsx"
          cli="@spectrumui/cohort-retention"
          installScript="npm i framer-motion"
        >
          <CohortRetentionDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
