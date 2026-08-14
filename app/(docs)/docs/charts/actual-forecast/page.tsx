import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { ActualForecastDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Actual vs Forecast",
  description:
    "Solid actual and dashed forecast lines with a callout at the plan crossover. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "forecast chart",
    "actual vs plan",
    "composed chart",
    "projection chart",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/actual-forecast",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Actual vs Forecast"
      description="Solid actual and dashed forecast lines with a callout at the plan crossover."
      url="https://ui.spectrumhq.in/docs/charts/actual-forecast"
      keywords={["forecast chart", "actual vs plan", "composed chart", "projection chart"]}
    >
      <PageTemplate title="Actual vs Forecast" description="Solid actual and dashed forecast lines with a callout at the plan crossover.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/actual-forecast/demo.tsx"
          installCodePath="app/registry/charts/actual-forecast.tsx"
          cli="@spectrumui/actual-forecast"
          installScript="npm i recharts framer-motion"
        >
          <ActualForecastDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
