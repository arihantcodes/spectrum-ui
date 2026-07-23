import { siteConfig } from '@/config/site';

export function generateSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.locale,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.svg`,
        },
        description: siteConfig.description,
        founder: {
          '@type': 'Person',
          name: siteConfig.author.name,
          url: siteConfig.author.url,
        },
        sameAs: [siteConfig.links.github, siteConfig.links.twitter, siteConfig.links.linkedin],
      },
      {
        '@type': ['SoftwareApplication', 'SoftwareSourceCode'],
        '@id': `${siteConfig.url}/#software`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        softwareVersion: siteConfig.version,
        programmingLanguage: ['TypeScript', 'JavaScript'],
        runtimePlatform: ['React', 'Next.js'],
        codeRepository: siteConfig.repository.url,
        license: siteConfig.licenseUrl,
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Person',
          name: siteConfig.author.name,
          url: siteConfig.author.url,
        },
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
    ],
  };
}
