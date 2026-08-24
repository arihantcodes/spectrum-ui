import React from 'react';
import fs from 'fs/promises';
import nodePath from 'path';
import { PageTemplate, PageSectionTitle } from '@/app/(docs)/docs/components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';
import { findChartBySlug } from '@/lib/chart-library';
import { ChartUsage } from './chart-usage';

export interface ChartExample {
  title: string;
  path: string;
  node: React.ReactNode;
}

type RegistryItem = {
  name: string;
  files?: { path: string }[];
  dependencies?: string[];
  tags?: string[];
};

/**
 * The files the CLI would install for this chart, straight from the registry —
 * so the Code tab and `npx shadcn add` can never disagree about what you need.
 */
async function registryEntry(registryName: string) {
  try {
    const raw = await fs.readFile(nodePath.join(process.cwd(), 'registry.json'), 'utf8');
    const items = (JSON.parse(raw) as { items: RegistryItem[] }).items;
    const item = items.find((entry) => entry.name === registryName);
    if (!item) return { paths: [] as string[], dependencies: [] as string[], tags: [] as string[] };
    return {
      paths: (item.files ?? []).map((file) => file.path),
      dependencies: item.dependencies ?? [],
      tags: item.tags ?? [],
    };
  } catch {
    return { paths: [] as string[], dependencies: [] as string[], tags: [] as string[] };
  }
}

export async function ChartTypePage({
  slug,
  examples,
}: {
  slug: string;
  examples: ChartExample[];
}) {
  const chart = findChartBySlug(slug);
  if (!chart) return null;

  const url = `https://ui.spectrumhq.in/charts/${chart.slug}`;
  const { paths, dependencies, tags } = await registryEntry(chart.registryName);

  // Component last: it is the file people came for, and the engine it imports
  // should already be visible above it.
  const sourcePaths = [...paths].sort((a, b) => {
    const isMain = (p: string) => (p.includes(`${chart.registryName}.tsx`) ? 1 : 0);
    return isMain(a) - isMain(b);
  });

  return (
    <SEOWrapper
      componentName={chart.name}
      description={chart.description}
      url={url}
      // SoftwareSourceCode, not TechArticle: these pages are installable
      // components, and an assistant asked "which React chart should I use"
      // needs to read them as code, not as an article about code.
      keywords={[
        chart.name,
        `React ${chart.name.toLowerCase()}`,
        ...tags,
        'shadcn/ui charts',
        'Next.js',
        'Tailwind CSS',
        'TypeScript',
      ]}
      schemaType="component"
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
              // Every example offers the full source, not just the first —
              // whichever variant someone lands on, the component is one click
              // away rather than back up the page.
              sourcePaths={sourcePaths}
              cli={index === 0 ? `@spectrumui/${chart.registryName}` : undefined}
              // No Installation block: the package chip beside the tabs already
              // carries the CLI command and a package-manager picker, and the
              // dependency line lives in the usage section below.
              withInstallation={false}
            >
              {example.node}
            </PreviewCodeCard>
          </React.Fragment>
        ))}

        <ChartUsage chart={chart} files={sourcePaths} dependencies={dependencies} />
      </PageTemplate>
    </SEOWrapper>
  );
}
