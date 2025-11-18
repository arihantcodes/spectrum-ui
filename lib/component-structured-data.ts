import { siteConfig } from "@/config/site";

/**
 * Generate structured data (JSON-LD) for component pages
 * This helps Google understand the content and improves SEO rankings
 */
export function generateComponentStructuredData({
  name,
  description,
  url,
  keywords = [],
}: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  const baseUrl = siteConfig.url;
  
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${name} - React UI Component`,
    description: description,
    url: url,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
    },
    runtimePlatform: {
      "@type": "SoftwareApplication",
      name: "React",
      applicationCategory: "WebApplication",
      url: "https://reactjs.org/",
    },
    codeRepository: {
      "@type": "SoftwareSourceCode",
      url: siteConfig.repository.url,
      codeRepository: siteConfig.repository.url,
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.twitter,
        siteConfig.links.linkedin,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Spectrum UI",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    keywords: keywords.join(", "),
    about: {
      "@type": "Thing",
      name: "React UI Component",
      description: "A reusable UI component for React and Next.js applications",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    license: siteConfig.license,
  };
}

/**
 * Generate breadcrumb structured data for component pages
 */
export function generateComponentBreadcrumbs({
  componentName,
  componentUrl,
}: {
  componentName: string;
  componentUrl: string;
}) {
  const baseUrl = siteConfig.url;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Components",
        item: `${baseUrl}/docs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: componentName,
        item: componentUrl,
      },
    ],
  };
}

