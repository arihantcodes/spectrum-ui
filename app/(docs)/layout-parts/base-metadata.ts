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

export function baseMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  openGraph,
  twitter,
  article,
}: BaseMetadataProps): Metadata {
  const fullTitle = title ? `${title} - Spectrum UI` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const url = canonicalUrl || siteConfig.url;
  
  // Generate dynamic OG image URL for each component
  const ogImageUrl = openGraph?.images?.[0]?.url || 
    `${siteConfig.url}/api/og?title=${encodeURIComponent(title || siteConfig.name)}`;

  // SEO-optimized keywords - comprehensive list for maximum coverage
  const seoKeywords = [
    ...keywords,
    // Core Keywords
    "React UI components",
    "React component library",
    "Next.js components",
    "Tailwind CSS components",
    "UI library",
    "design system",
    "modern UI components",
    
    // Technology Stack
    "Next.js UI library",
    "Next.js 14 components",
    "React Tailwind components",
    "TypeScript React components",
    "Vercel components",
    "Next.js app router components",
    
    // Quality Keywords
    "accessible components",
    "responsive UI components",
    "production-ready components",
    "WCAG compliant components",
    "TypeScript components",
    "customizable UI components",
    
    // Use Cases
    "dashboard components",
    "admin panel components",
    "SaaS UI components",
    "web app components",
    "frontend components",
    
    // Action Keywords
    "copy paste components",
    "free UI components",
    "open source UI library",
    "ready-to-use components",
    
    // Alternatives
    "shadcn alternative",
    "Material UI alternative",
    "Chakra UI alternative",
    "best UI library 2024",
    
    ...siteConfig.keywords,
  ];

  return {
    title: fullTitle,
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
      url: url,
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: openGraph?.images?.[0]?.alt || `${title} - React UI Component`,
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
      title: twitter?.title || fullTitle,
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
