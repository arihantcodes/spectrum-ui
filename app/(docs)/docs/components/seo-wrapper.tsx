import Script from "next/script";
import {
  generateComponentStructuredData,
  generateComponentBreadcrumbs,
} from "@/lib/component-structured-data";

interface SEOWrapperProps {
  componentName: string;
  description: string;
  url: string;
  keywords?: string[];
  children: React.ReactNode;
}

/**
 * SEO Wrapper Component
 * Automatically adds structured data (JSON-LD) to component pages
 * This helps Google understand the content and improves SEO rankings
 */
export function SEOWrapper({
  componentName,
  description,
  url,
  keywords = [],
  children,
}: SEOWrapperProps) {
  const structuredData = generateComponentStructuredData({
    name: componentName,
    description,
    url,
    keywords,
  });

  const breadcrumbData = generateComponentBreadcrumbs({
    componentName,
    componentUrl: url,
  });

  return (
    <>
      <Script
        id={`${componentName.toLowerCase().replace(/\s+/g, "-")}-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id={`${componentName.toLowerCase().replace(/\s+/g, "-")}-breadcrumbs`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      {children}
    </>
  );
}

