import React from "react"
import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { ActivityLatticeDemo } from "./demo"

export const metadata: Metadata = baseMetadata({
  title: "Activity Lattice",
  description:
    "A yearly activity lattice with a floating day card and a five-stop intensity scale. A free React and Next.js component built with Motion and Tailwind CSS.",
  keywords: [
    "heatmap chart",
    "activity calendar",
    "contribution grid",
    "year lattice",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts/activity-lattice",
})

export default function Page() {
  return (
    <SEOWrapper
      componentName="Activity Lattice"
      description="A yearly activity lattice with a floating day card and a five-stop intensity scale."
      url="https://ui.spectrumhq.in/docs/charts/activity-lattice"
      keywords={["heatmap chart", "activity calendar", "contribution grid", "year lattice"]}
    >
      <PageTemplate title="Activity Lattice" description="A yearly activity lattice with a floating day card and a five-stop intensity scale.">
        <PreviewCodeCard
          path="app/(docs)/docs/charts/activity-lattice/demo.tsx"
          installCodePath="app/registry/charts/activity-lattice.tsx"
          cli="@spectrumui/activity-lattice"
          installScript="npm i framer-motion"
        >
          <ActivityLatticeDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
