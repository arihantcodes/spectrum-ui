import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BaseMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    type?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
}

const CORE_KEYWORDS = [
  "React UI components",
  "Next.js components",
  "Tailwind CSS components",
  "Spectrum UI",
  "React component library",
  "copy paste components",
  "free UI components",
];

export function baseMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  openGraph,
  twitter,
  article,
}: BaseMetadataProps): Metadata {
  // Absolute title avoids double-branding from the root `%s | Spectrum UI` template
  const brandedTitle = title
    ? `${title} | Spectrum UI`
    : "Spectrum UI — React & Next.js Component Library";
  const fullDescription = description || siteConfig.description;
  const url = canonicalUrl || siteConfig.url;
  const ogImageUrl =
    openGraph?.images?.[0]?.url ||
    `${siteConfig.url}/api/og?title=${encodeURIComponent(title || "Spectrum UI")}`;

  const seoKeywords = Array.from(
    new Set([...keywords, ...CORE_KEYWORDS].filter(Boolean))
  );

  return {
    title: {
      absolute: brandedTitle,
    },
    description: fullDescription,
    keywords: seoKeywords,
    authors: [
      { name: "Arihant Jain", url: "https://ui.spectrumhq.in/" },
      { name: "Spectrum UI", url: siteConfig.url },
    ],
    creator: "Arihant Jain",
    publisher: "Spectrum UI",
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: article ? "article" : "website",
      locale: "en_US",
      url,
      title: openGraph?.title || brandedTitle,
      description: openGraph?.description || fullDescription,
      siteName: "Spectrum UI",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt:
            openGraph?.images?.[0]?.alt ||
            `${title || "Spectrum UI"} — React UI Component`,
        },
      ],
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        section: article.section,
        tags: article.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@spectrumui",
      creator: "@arihantcodes",
      title: twitter?.title || brandedTitle,
      description: twitter?.description || fullDescription,
      images: twitter?.images || [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
