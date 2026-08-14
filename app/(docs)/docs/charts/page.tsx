import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { ChartsGallery } from "./charts-gallery"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = baseMetadata({
  title: "Charts",
  description:
    "Animated React chart components for dashboards. Copy-paste source for Next.js, Tailwind CSS, Recharts, and Motion.",
  keywords: [
    "React charts",
    "dashboard charts",
    "Recharts components",
    "animated charts",
    "Next.js charts",
    "Tailwind charts",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/charts",
})

export default function ChartsPage() {
  return (
    <SEOWrapper
      componentName="Charts"
      description="Animated React chart components for dashboards, with copy-paste source for Next.js and Tailwind CSS."
      url="https://ui.spectrumhq.in/docs/charts"
      schemaType="collectionPage"
      keywords={["React charts", "dashboard charts", "Recharts components", "animated charts"]}
    >
      <PageTemplate
        title="Charts"
        description="Production-quality data visualizations with a shared Spectrum identity: monochrome chrome, one accent family per chart, and motion that explains the data."
        slug="charts"
      >
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Related:{" "}
          <Link href="/docs/animatedchart" className="underline-offset-4 hover:underline">
            Animated SVG Chart
          </Link>
        </p>
        <ChartsGallery />
      </PageTemplate>
    </SEOWrapper>
  )
}
