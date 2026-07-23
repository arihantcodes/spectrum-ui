import { FAQSection } from '@/components/faq-section';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { faqs } from '@/content/faqs';
import { generateFAQStructuredData } from '@/lib/seo-utils';

export const metadata: Metadata = baseMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers about installing Spectrum UI, using its MCP server, shadcn/ui compatibility, code ownership, updates, and commercial projects.',
  canonicalUrl: 'https://ui.spectrumhq.in/faqs',
});

export default function FAQPage() {
  return (
    <>
      <JsonLd id="faq-page-structured-data" data={generateFAQStructuredData(faqs)} />
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="pt-8">
          <BreadcrumbNav items={[{ label: 'Frequently Asked Questions' }]} className="mb-6" />
          <h1 className="sr-only">Spectrum UI frequently asked questions</h1>
          <FAQSection />
        </div>
      </div>
    </>
  );
}
