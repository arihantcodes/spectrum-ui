import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { QuotaGaugeDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Quota Gauge",
  description:
    "A quota gauge with tick marks that warms when usage crosses eighty-five percent. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "radial gauge",
    "quota chart",
    "usage gauge",
    "progress arc",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/quota-gauge",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Quota Gauge"
      description="A quota gauge with tick marks that warms when usage crosses eighty-five percent."
      url="https://ui.spectrumhq.in/docs/charts/quota-gauge"
      keywords={["radial gauge", "quota chart", "usage gauge", "progress arc"]}
    >
      <PageTemplate title="Quota Gauge" description="A quota gauge with tick marks that warms when usage crosses eighty-five percent.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/quota-gauge/demo.tsx"
          installCodePath="app/registry/charts/quota-gauge.tsx"
          cli="@spectrumui/quota-gauge"
          installScript="npm i framer-motion"
        >
          <QuotaGaugeDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
