import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
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

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
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

export default async function ComparePage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
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
      <JsonLd id={`faq-ld-${data.slug}`} data={faqLd} />
      <JsonLd id={`breadcrumb-ld-${data.slug}`} data={breadcrumbLd} />
      <ComparisonView data={data} reviewedLabel={REVIEWED_LABEL} />
    </>
  );
}
