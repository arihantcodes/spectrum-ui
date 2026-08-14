import { MetadataRoute } from 'next';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/lib/blog';
import { COMPONENT_CATALOG, componentDocsPath } from '@/lib/component-catalog';
import { TOPIC_HUB_LINKS, topicHubPath } from '@/lib/topic-hub-links';
import { comparisons } from '@/lib/comparisons';
import { BLOCK_CATEGORIES, blockCategoryPath } from '@/lib/block-catalog';

type SitemapEntry = MetadataRoute.Sitemap[number];
type RouteConfig = Pick<SitemapEntry, 'changeFrequency' | 'priority'>;

const projectRoot = process.cwd();
const appDirectory = path.join(projectRoot, 'app');
const pageFilePattern = /^page\.(?:js|jsx|mdx|ts|tsx)$/;
const componentRoutes = new Set(
  COMPONENT_CATALOG.map((component) => componentDocsPath(component.slug)),
);
const topicHubRoutes = new Set(TOPIC_HUB_LINKS.map((hub) => topicHubPath(hub.slug)));
const nonIndexableRoutes = new Set([
  // Redirects to the first block category; the category pages are indexed below.
  '/blocks',
  '/bookmarks',
  '/create-user',
  '/dashboard',
  '/demo',
  '/payment-success',
  '/profile',
  '/registry/responsive-modal',
  '/sign-in',
  '/success',
  '/unsubscribe',
  // Delisted components: pages still resolve but are not part of the shipped
  // 44-component catalog, so keep them out of the sitemap.
  '/docs/animatedtestimonials',
  '/docs/animatedtext',
  '/docs/bento-grid',
  '/docs/command-palette',
  '/docs/discloseimage',
  '/docs/dock',
  '/docs/eventcalendar',
  '/docs/footer',
  '/docs/github-card',
  '/docs/heading-with-anchor',
  '/docs/input',
  '/docs/navbar',
  '/docs/product-card',
  '/docs/responsive-modal',
  '/docs/skeleton',
  '/docs/statuscode',
  '/docs/testimonials',
]);

const routeConfig: Record<string, RouteConfig> = {
  '/': { changeFrequency: 'weekly', priority: 1 },
  '/awesome': { changeFrequency: 'weekly', priority: 0.7 },
  '/best-animated-react-component-libraries': {
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  '/best-react-component-libraries': {
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  '/blog': { changeFrequency: 'weekly', priority: 0.8 },
  '/changelog': { changeFrequency: 'weekly', priority: 0.7 },
  '/charts': { changeFrequency: 'weekly', priority: 0.9 },
  '/colors': { changeFrequency: 'monthly', priority: 0.5 },
  '/compare': { changeFrequency: 'monthly', priority: 0.7 },
  '/docs': { changeFrequency: 'weekly', priority: 0.9 },
  '/docs/charts': { changeFrequency: 'weekly', priority: 0.8 },
  '/docs/guides': { changeFrequency: 'monthly', priority: 0.7 },
  '/docs/installation': { changeFrequency: 'monthly', priority: 0.8 },
  '/docs/mcp': { changeFrequency: 'monthly', priority: 0.7 },
  '/faqs': { changeFrequency: 'monthly', priority: 0.5 },
  '/founder-story': { changeFrequency: 'yearly', priority: 0.3 },
  '/privacy-policy': { changeFrequency: 'yearly', priority: 0.2 },
  '/sponsor': { changeFrequency: 'monthly', priority: 0.3 },
  '/templates': { changeFrequency: 'monthly', priority: 0.7 },
  '/tos': { changeFrequency: 'yearly', priority: 0.2 },
};

function discoverPageFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return discoverPageFiles(entryPath);
    return pageFilePattern.test(entry.name) ? [entryPath] : [];
  });
}

function routeFromPageFile(filePath: string): string | null {
  const routeSegments = path
    .relative(appDirectory, path.dirname(filePath))
    .split(path.sep)
    .filter((segment) => segment && !segment.startsWith('('));

  if (routeSegments.some((segment) => segment.startsWith('[') || segment.startsWith('@'))) {
    return null;
  }

  return routeSegments.length ? '/' + routeSegments.join('/') : '/';
}

function latestModified(sourceFiles: string[]): Date | undefined {
  const timestamps = sourceFiles.flatMap((sourceFile) => {
    try {
      return [statSync(sourceFile).mtimeMs];
    } catch {
      return [];
    }
  });

  if (!timestamps.length) return undefined;
  return new Date(Math.max(...timestamps));
}

function validDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getRouteConfig(route: string): RouteConfig {
  if (componentRoutes.has(route)) {
    return { changeFrequency: 'weekly', priority: 0.8 };
  }

  if (topicHubRoutes.has(route)) {
    return { changeFrequency: 'weekly', priority: 0.8 };
  }

  if (route.startsWith('/templates/')) {
    return { changeFrequency: 'monthly', priority: 0.6 };
  }

  return routeConfig[route] ?? { changeFrequency: 'monthly', priority: 0.5 };
}

function createEntry({
  route,
  sourceFiles,
  fallbackDate,
  config = getRouteConfig(route),
}: {
  route: string;
  sourceFiles: string[];
  fallbackDate?: Date;
  config?: RouteConfig;
}): SitemapEntry {
  const lastModified = latestModified(sourceFiles) ?? fallbackDate;

  return {
    url: route === '/' ? siteConfig.url : siteConfig.url + route,
    ...(lastModified ? { lastModified } : {}),
    ...config,
  };
}

async function getBlogPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const blogPosts = await getAllBlogPosts();

    return blogPosts
      .filter((post) => post.slug)
      .map((post) =>
        createEntry({
          route: '/blog/' + post.slug,
          sourceFiles: [path.join(projectRoot, 'content', 'blog', post.slug + '.tsx')],
          fallbackDate: validDate(post.date),
          config: { changeFrequency: 'monthly', priority: 0.7 },
        }),
      );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = discoverPageFiles(appDirectory).flatMap((filePath) => {
    const route = routeFromPageFile(filePath);

    if (!route || nonIndexableRoutes.has(route)) return [];

    const sourceFiles = [filePath];
    const localLayout = path.join(path.dirname(filePath), 'layout.tsx');
    if (existsSync(localLayout)) sourceFiles.push(localLayout);

    if (route === '/') {
      sourceFiles.push(path.join(appDirectory, 'layout.tsx'));
    }

    if (route === '/docs') {
      sourceFiles.push(
        path.join(appDirectory, '(docs)', 'docs', 'docs-catalog.tsx'),
        path.join(projectRoot, 'content', 'component-catalog.json'),
      );
    }

    if (topicHubRoutes.has(route)) {
      sourceFiles.push(
        path.join(projectRoot, 'components', 'topic-hub-page.tsx'),
        path.join(projectRoot, 'content', 'topic-hubs.ts'),
        path.join(projectRoot, 'lib', 'topic-hub-metadata.ts'),
        path.join(projectRoot, 'lib', 'topic-hub-structured-data.ts'),
      );
    }

    return [createEntry({ route, sourceFiles })];
  });

  const machineReadablePages = [
    createEntry({
      route: '/llms.txt',
      sourceFiles: [path.join(projectRoot, 'public', 'llms.txt')],
      config: { changeFrequency: 'weekly', priority: 0.6 },
    }),
    createEntry({
      route: '/llms-full.txt',
      sourceFiles: [path.join(projectRoot, 'public', 'llms-full.txt')],
      config: { changeFrequency: 'weekly', priority: 0.5 },
    }),
    createEntry({
      route: '/agents.md',
      sourceFiles: [path.join(projectRoot, 'public', 'agents.md')],
      config: { changeFrequency: 'monthly', priority: 0.4 },
    }),
  ];

  // Dynamic /blocks/[category] specimen pages are not covered by filesystem
  // discovery either.
  const blockCategorySource = path.join(
    appDirectory,
    '(blocks)',
    'blocks',
    '[category]',
    'page.tsx',
  );
  const blockCategoryPages = BLOCK_CATEGORIES.map((category) =>
    createEntry({
      route: blockCategoryPath(category.slug),
      sourceFiles: [blockCategorySource, path.join(projectRoot, 'content', 'block-catalog.json')],
      config: { changeFrequency: 'weekly', priority: 0.7 },
    }),
  );

  // Dynamic /compare/[slug] pages are not covered by filesystem discovery.
  const comparisonSource = path.join(appDirectory, '(marketing)', 'compare', '[slug]', 'page.tsx');
  const comparisonPages = comparisons.map((comparison) =>
    createEntry({
      route: '/compare/' + comparison.slug,
      sourceFiles: [comparisonSource, path.join(projectRoot, 'lib', 'comparisons.ts')],
      config: { changeFrequency: 'monthly', priority: 0.7 },
    }),
  );

  const blogPages = await getBlogPages();
  const entries = [
    ...staticPages,
    ...machineReadablePages,
    ...blockCategoryPages,
    ...comparisonPages,
    ...blogPages,
  ];
  const uniqueEntries = new Map(entries.map((entry) => [entry.url, entry]));

  return [...uniqueEntries.values()].sort((a, b) => a.url.localeCompare(b.url));
}
