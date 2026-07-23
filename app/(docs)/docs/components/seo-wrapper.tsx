import { JsonLd } from '@/components/seo/json-ld';
import { getComponentDocFromUrl } from '@/lib/component-docs';
import { generateFAQStructuredData } from '@/lib/seo-utils';
import {
  generateComponentBreadcrumbs,
  generateComponentStructuredData,
  generateCollectionPageStructuredData,
  generateTechArticleStructuredData,
} from '@/lib/component-structured-data';

type SchemaType = 'component' | 'techArticle' | 'collectionPage';

interface SEOWrapperProps {
  componentName: string;
  description: string;
  url: string;
  keywords?: string[];
  schemaType?: SchemaType;
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
  schemaType = 'component',
  children,
}: SEOWrapperProps) {
  const structuredData =
    schemaType === 'techArticle'
      ? generateTechArticleStructuredData({
          name: componentName,
          description,
          url,
          keywords,
        })
      : schemaType === 'collectionPage'
        ? generateCollectionPageStructuredData({
            name: componentName,
            description,
            url,
          })
        : generateComponentStructuredData({
            name: componentName,
            description,
            url,
            keywords,
          });

  const breadcrumbData = generateComponentBreadcrumbs({
    componentName,
    componentUrl: url,
    parentName: schemaType === 'component' ? 'Components' : 'Documentation',
  });

  const schemaId = componentName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const componentDoc = schemaType === 'component' ? getComponentDocFromUrl(url) : undefined;

  return (
    <>
      <JsonLd id={`${schemaId}-structured-data`} data={structuredData} />
      <JsonLd id={`${schemaId}-breadcrumbs`} data={breadcrumbData} />
      {componentDoc ? (
        <JsonLd id={`${schemaId}-faqs`} data={generateFAQStructuredData(componentDoc.faqs)} />
      ) : null}
      {children}
    </>
  );
}
