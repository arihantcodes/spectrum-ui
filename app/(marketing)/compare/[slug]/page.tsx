import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ComparisonView } from "@/components/compare/comparison-view";
import { comparisons, getComparison } from "@/lib/comparisons";
import {
  generateFAQStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";

const REVIEWED_LABEL = "July 2026";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const data = getComparison(params.slug);
  if (!data) return {};

  const url = `${siteConfig.url}/compare/${data.slug}`;
  return {
    title: { absolute: data.title },
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url,
      type: "article",
      siteName: "Spectrum UI",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

export default function ComparePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = getComparison(params.slug);
  if (!data) notFound();

  const url = `${siteConfig.url}/compare/${data.slug}`;

  const faqLd = generateFAQStructuredData(data.faqs);
  const breadcrumbLd = generateBreadcrumbStructuredData([
    { name: "Home", url: siteConfig.url },
    { name: "Compare", url: `${siteConfig.url}/compare` },
    { name: data.heading, url },
  ]);

  return (
    <>
      <Script
        id={`faq-ld-${data.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id={`breadcrumb-ld-${data.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ComparisonView data={data} reviewedLabel={REVIEWED_LABEL} />
    </>
  );
}
