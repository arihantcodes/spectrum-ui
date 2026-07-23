import { siteConfig } from '@/config/site';

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
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: `${name} — React UI Component`,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    programmingLanguage: ['TypeScript', 'JavaScript'],
    runtimePlatform: ['React', 'Next.js'],
    codeRepository: siteConfig.repository.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      sameAs: [siteConfig.links.github, siteConfig.links.twitter, siteConfig.links.linkedin],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Spectrum UI',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    keywords: [name, 'React component', 'TypeScript', 'Tailwind CSS', ...keywords].filter(
      (keyword, index, all) => all.indexOf(keyword) === index,
    ),
    about: {
      '@type': 'SoftwareApplication',
      name: 'React',
      url: 'https://react.dev/',
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    license: siteConfig.licenseUrl,
  };
}

/**
 * Generate breadcrumb structured data for component pages
 */
export function generateComponentBreadcrumbs({
  componentName,
  componentUrl,
  parentName = 'Components',
}: {
  componentName: string;
  componentUrl: string;
  parentName?: string;
}) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: parentName,
        item: `${baseUrl}/docs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: componentName,
        item: componentUrl,
      },
    ],
  };
}

export function generateTechArticleStructuredData({
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
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: name,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    keywords,
    inLanguage: siteConfig.locale,
    isAccessibleForFree: true,
    license: siteConfig.licenseUrl,
  };
}

export function generateCollectionPageStructuredData({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
    },
    inLanguage: siteConfig.locale,
  };
}
