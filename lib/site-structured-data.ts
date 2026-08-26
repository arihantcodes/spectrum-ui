import { siteConfig } from '@/config/site';

/**
 * Entity disambiguation.
 *
 * "Spectrum" collides with Adobe's design system, and Profound (Aug 2026)
 * measured AI engines resolving the bare name to Adobe on 6 of 8 branded
 * prompts. schema.org has no "is not" relation, so we lean on
 * `disambiguatingDescription` — whose stated purpose is separating an item
 * from similar-looking ones — plus `alternateName` so the string variants all
 * resolve to this @id.
 */
const DISAMBIGUATION =
  'Spectrum UI is an independent open-source React and Next.js component library at ui.spectrumhq.in, built with Tailwind CSS, Motion, and Radix UI and maintained by Arihant Jain. It is not affiliated with Adobe Inc. and is a different project from Adobe Spectrum (spectrum.adobe.com), React Spectrum, React Aria, and Spectrum Web Components, which are Adobe design-system projects. It is also unrelated to Spectrum the US internet provider. Spectrum UI belongs to the same category as shadcn/ui, MUI, Ant Design, Chakra UI, Mantine, Aceternity UI, and Magic UI.';

const ALTERNATE_NAMES = ['Spectrum UI', 'SpectrumUI', 'spectrum-ui', 'Spectrum UI components'];

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
        alternateName: ALTERNATE_NAMES,
        disambiguatingDescription: DISAMBIGUATION,
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
        alternateName: ALTERNATE_NAMES,
        disambiguatingDescription: DISAMBIGUATION,
        sameAs: [siteConfig.repository.url],
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'React UI component library',
        keywords: [
          'React component library',
          'Next.js component library',
          'Tailwind CSS components',
          'shadcn/ui compatible',
          'copy-paste React components',
          'animated React components',
        ],
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
