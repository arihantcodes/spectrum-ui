import { PageTemplate } from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { ScratchCardDemo } from "./scratch-card-demo"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"

export const metadata: Metadata = baseMetadata({
  title: "Scratch Card",
  description:
    "Scratch-to-reveal coupon card for React and Next.js. Interactive HTML5 canvas foil that scratches off on drag with dust particles and a reveal callback at a configurable threshold. Built with Framer Motion.",
  keywords: [
    "scratch card component",
    "React scratch card",
    "scratch to reveal",
    "Next.js coupon card",
    "canvas scratch effect",
    "gamified discount component",
    "coupon reveal component",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/scratch-card",
})

export default function ScratchCardDocsPage() {
  const description =
    "A scratch-to-reveal coupon card built on an HTML5 canvas overlay. Drag to scratch off the foil with dust particles on progress, and trigger a reveal callback once more than half the surface is cleared. Supports keyboard reveal and reduced motion."

  return (
    <SEOWrapper
      componentName="Scratch Card"
      description={description}
      url="https://ui.spectrumhq.in/docs/scratch-card"
      keywords={[
        "scratch card component",
        "scratch to reveal",
        "canvas scratch effect",
        "coupon reveal component",
      ]}
    >
      <PageTemplate title="Scratch Card" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/scratch-card/scratch-card-demo.tsx"
          installCodePath="components/spectrumui/scratch-card.tsx"
          cli="@spectrumui/scratch-card"
          installScript="npm i framer-motion lucide-react"
        >
          <ScratchCardDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}
