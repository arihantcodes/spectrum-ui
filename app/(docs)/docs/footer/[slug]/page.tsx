import { notFound } from "next/navigation"
import { Metadata } from "next"

import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"
import { FOOTER_CATALOG, getFooterBySlug } from "@/components/spectrumui/footers/catalog"
import { FooterDetail } from "../footer-detail"

export function generateStaticParams() {
  return FOOTER_CATALOG.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getFooterBySlug(slug)
  if (!entry) return {}

  return baseMetadata({
    title: `${entry.title} Footer`,
    description: `${entry.summary} Copy-paste React footer for Next.js and Tailwind CSS.`,
    keywords: [
      `${entry.title} footer`,
      "React footer component",
      "Next.js footer",
      "website footer",
      entry.category,
    ],
    canonicalUrl: `https://ui.spectrumhq.in/docs/footer/${entry.slug}`,
  })
}

export default async function FooterSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getFooterBySlug(slug)
  if (!entry) notFound()

  return (
    <SEOWrapper
      componentName={`${entry.title} Footer`}
      description={entry.summary}
      url={`https://ui.spectrumhq.in/docs/footer/${entry.slug}`}
      keywords={[`${entry.title} footer`, "React footer", "Next.js footer"]}
    >
      <FooterDetail slug={slug} />
    </SEOWrapper>
  )
}
