import React from "react"
import { Metadata } from "next"

import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import Usage from "@/app/(docs)/docs/components/usage"
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import FooterGallery from "./footer-gallery"
import { FOOTER_CATALOG } from "@/components/spectrumui/footers/catalog"
import { EnterpriseGridFooter } from "@/components/spectrumui/footers/enterprise-grid-footer"
import Footerdemo from "./footerdemo"
import AnimatedWaveFooter from "./usage/animatefooter"
import StackedCircularFooter from "./usage/stackedfooter"
import GradientFooter from "./usage/particlefooter"

export const metadata: Metadata = baseMetadata({
  title: "Footer",
  description:
    "A collection of 25 production-ready website footers for SaaS, enterprise, and marketing sites.",
  keywords: [
    "footer component",
    "React footer",
    "Next.js footer",
    "website footer",
    "SaaS footer",
    "enterprise footer",
    "mega footer",
    "accessible footer",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/footer",
})

const description =
  "A collection of 25 production-ready website footers for SaaS, enterprise, and marketing sites."

export default function FooterPage() {
  return (
    <SEOWrapper
      componentName="Footer"
      description={description}
      url="https://ui.spectrumhq.in/docs/footer"
      keywords={[
        "footer component",
        "React footer",
        "Next.js footer",
        "website footer",
        "SaaS footer",
        "enterprise footer",
      ]}
    >
      <PageTemplate title="Footer" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/footer/enterprise-grid-demo.tsx"
          cli="@spectrumui/enterprise-grid-footer"
          installScript="npm i lucide-react framer-motion"
          installCodePath="components/spectrumui/footers/enterprise-grid-footer.tsx"
        >
          <EnterpriseGridFooter />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Preview every footer at mobile, tablet, laptop, and desktop widths. Switch the isolated
          light and dark themes, copy the component source, or open a footer for its use case and
          properties. Install with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            npx shadcn@latest add @spectrumui/&lt;name&gt;
          </code>
          . Shared types and controls install from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            @spectrumui/footer-primitives
          </code>
          .
        </p>

        <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FOOTER_CATALOG.map((entry) => (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              className="rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-muted/40"
            >
              <span className="font-medium">{entry.title}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{entry.summary}</span>
            </a>
          ))}
        </div>

        <FooterGallery />

        <PropsTable
          title="Properties"
          props={[
            {
              prop: "brand",
              type: "FooterBrand",
              required: false,
              description: "Company name, optional tagline, home href, and optional custom logo.",
            },
            {
              prop: "groups",
              type: "FooterNavGroup[]",
              required: false,
              description: "Named navigation groups. Each group has a title and link list.",
            },
            {
              prop: "socials",
              type: "FooterSocialLink[]",
              required: false,
              description: "Social destinations. Common labels map to icons automatically.",
            },
            {
              prop: "legal",
              type: "FooterLegalLink[]",
              required: false,
              description: "Privacy, terms, cookies, and other legal destinations.",
            },
            {
              prop: "copyright",
              type: "string",
              required: false,
              description: "Copyright line. Defaults to the current year and brand name.",
            },
            {
              prop: "className",
              type: "string",
              required: false,
              description: "Additional classes on the root footer element.",
            },
          ]}
        />

        <PageSubTitle>Classic variants</PageSubTitle>
        <p className="mb-4 text-sm text-muted-foreground">
          Earlier Spectrum UI footers remain available for existing installs.
        </p>
        <Usage title="Newsletter Footer" path="app/(docs)/docs/footer/footerdemo.tsx">
          <Footerdemo />
        </Usage>
        <Usage
          title="AnimatedWave Footer"
          path="app/(docs)/docs/footer/usage/animatefooter.tsx"
          cli="@spectrumui/animated-wave-footer"
        >
          <AnimatedWaveFooter />
        </Usage>
        <Usage
          title="StackedCircular Footer"
          path="app/(docs)/docs/footer/usage/stackedfooter.tsx"
          cli="@spectrumui/stackedcircular-footer"
        >
          <StackedCircularFooter />
        </Usage>
        <Usage
          title="Gradient Footer"
          path="app/(docs)/docs/footer/usage/particlefooter.tsx"
          cli="@spectrumui/floatingparticle-footer"
        >
          <GradientFooter />
        </Usage>
      </PageTemplate>
    </SEOWrapper>
  )
}
