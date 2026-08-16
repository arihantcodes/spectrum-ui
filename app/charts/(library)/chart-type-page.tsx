import React from 'react';
import { PageTemplate, PageSectionTitle } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';
import { findChartBySlug } from '@/lib/chart-library';

export interface ChartExample {
  title: string;
  path: string;
  node: React.ReactNode;
}

export function ChartTypePage({
  slug,
  examples,
}: {
  slug: string;
  examples: ChartExample[];
}) {
  const chart = findChartBySlug(slug);
  if (!chart) return null;

  const url = `https://ui.spectrumhq.in/charts/${chart.slug}`;

  return (
    <SEOWrapper
      componentName={chart.name}
      description={chart.description}
      url={url}
      keywords={[chart.name, 'React chart', 'Recharts', 'Spectrum UI charts']}
      schemaType="techArticle"
    >
      <PageTemplate title={chart.name} description={chart.description} slug={chart.registryName}>
        {examples.map((example, index) => (
          <React.Fragment key={example.path}>
            <PageSectionTitle className={index === 0 ? 'mt-10' : undefined}>
              {example.title}
            </PageSectionTitle>
            <PreviewCodeCard
              className="mt-3"
              path={example.path}
              cli={index === 0 ? `@spectrumui/${chart.registryName}` : undefined}
              installScript={index === 0 ? 'npm i recharts framer-motion' : undefined}
              installCodePath={
                index === 0 ? `app/registry/charts/${chart.registryName}.tsx` : undefined
              }
              withInstallation={index === 0}
            >
              {example.node}
            </PreviewCodeCard>
          </React.Fragment>
        ))}
      </PageTemplate>
    </SEOWrapper>
  );
}
