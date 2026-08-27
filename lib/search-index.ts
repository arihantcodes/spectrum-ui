/**
 * Builds the ⌘K palette's document set from the catalogs that already exist —
 * components, blocks, charts, topic guides, comparisons, blog posts and the
 * curated top-level pages. Every entry derives from its source of truth, so a
 * new component or block shows up in search the moment it ships.
 *
 * Server-only on purpose. It reaches into lib/blog, whose posts are React
 * trees, and the catalogs together are far too heavy to ship to the browser.
 * The client fetches the built index from /api/search-index instead.
 */

import { getAllBlogPosts } from '@/lib/blog';
import { BLOCK_CATEGORIES, LIVE_BLOCKS, blockCategoryPath, blockPath } from '@/lib/block-catalog';
import { CHART_LIBRARY, chartLibraryPath } from '@/lib/chart-library';
import { COMPONENT_CATALOG, componentDocsPath } from '@/lib/component-catalog';
import { comparisons } from '@/lib/comparisons';
import { TOPIC_HUB_LINKS, topicHubPath } from '@/lib/topic-hub-links';
import type { SearchDocument } from '@/lib/search';

/** Bump when the document shape changes so stale caches are ignored. */
export const SEARCH_INDEX_VERSION = 1;

/** Long prose adds bytes without adding matches. One sentence is plenty. */
const KEYWORD_LIMIT = 180;

function keywords(...parts: (string | readonly string[] | undefined)[]) {
  const flat = parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .filter((part): part is string => Boolean(part))
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  return flat.slice(0, KEYWORD_LIMIT);
}

/**
 * The destinations that aren't in any catalog. Curated rather than crawled:
 * search results should be the pages worth landing on, and the keywords are
 * what people actually type when they want them.
 */
const STATIC_PAGES: readonly Omit<SearchDocument, 'id' | 'group'>[] = [
  { title: 'Home', href: '/', keywords: 'landing start overview spectrum ui' },
  {
    title: 'Components',
    href: '/docs',
    subtitle: 'Docs',
    keywords: 'all components catalog browse library introduction docs',
  },
  {
    title: 'Installation',
    href: '/docs/installation',
    subtitle: 'Docs',
    keywords: 'install setup cli npx shadcn tailwind getting started',
  },
  {
    title: 'Guides',
    href: '/docs/guides',
    subtitle: 'Docs',
    keywords: 'how to guides recipes patterns',
  },
  {
    title: 'MCP Server',
    href: '/docs/mcp',
    subtitle: 'Integrations',
    keywords: 'mcp cursor claude ai editor agent model context protocol',
  },
  {
    title: 'Blocks',
    href: '/blocks',
    keywords: 'sections composed layouts full page blocks',
  },
  {
    title: 'Charts',
    href: '/charts',
    keywords: 'charts graphs data visualisation dashboards recharts svg',
  },
  {
    title: 'Colors',
    href: '/colors',
    keywords: 'color palette tailwind hex rgb hsl copy swatches',
  },
  { title: 'Blog', href: '/blog', keywords: 'articles writing posts design engineering' },
  {
    title: 'Templates',
    href: '/templates',
    keywords: 'dashboard templates full pages starter kits',
  },
  { title: 'Brand Kit', href: '/brandkit', keywords: 'logo wordmark assets press brand svg' },
  { title: 'Changelog', href: '/changelog', keywords: 'releases updates whats new shipped' },
  { title: 'FAQs', href: '/faqs', keywords: 'questions answers help support license' },
  {
    title: 'Compare',
    href: '/compare',
    keywords: 'vs alternatives comparison shadcn aceternity magic ui',
  },
  { title: 'Bookmarks', href: '/bookmarks', keywords: 'saved favourites starred my components' },
  { title: 'Sponsor', href: '/sponsor', keywords: 'support donate github sponsors funding' },
  { title: 'Awesome', href: '/awesome', keywords: 'resources links awesome list tools' },
  {
    title: 'Founder Story',
    href: '/founder-story',
    keywords: 'about arihant jain why we built spectrum ui',
  },
  {
    title: 'LLM Info',
    href: '/llm-info',
    keywords: 'llms txt ai crawlers machine readable facts',
  },
  { title: 'Privacy Policy', href: '/privacy-policy', keywords: 'privacy data gdpr' },
  { title: 'Terms of Service', href: '/tos', keywords: 'terms legal license apache' },
];

export async function buildSearchIndex(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = [];

  for (const component of COMPONENT_CATALOG) {
    documents.push({
      id: `component:${component.slug}`,
      title: component.name,
      group: 'Components',
      href: componentDocsPath(component.slug),
      subtitle: component.category,
      keywords: keywords(component.description, component.category, component.slug, 'component'),
      registry: component.slug,
      ...(component.new ? { new: true } : {}),
    });
  }

  for (const category of BLOCK_CATEGORIES) {
    documents.push({
      id: `block-category:${category.slug}`,
      title: category.name,
      group: 'Blocks',
      href: blockCategoryPath(category.slug),
      subtitle: 'All blocks',
      keywords: keywords(category.tagline, category.slug, 'blocks category section'),
    });
  }

  for (const block of LIVE_BLOCKS) {
    documents.push({
      id: `block:${block.slug}`,
      title: block.name,
      group: 'Blocks',
      href: blockPath(block.category, block.slug),
      subtitle: block.subcategory,
      keywords: keywords(
        block.description,
        block.subcategory,
        block.variants,
        block.composedOf,
        'block',
      ),
      registry: block.slug,
    });
  }

  for (const chart of CHART_LIBRARY) {
    documents.push({
      id: `chart:${chart.slug}`,
      title: chart.name,
      group: 'Charts',
      href: chartLibraryPath(chart.slug),
      subtitle: 'Chart',
      keywords: keywords(chart.description, chart.exportName, chart.slug, 'chart graph'),
      registry: chart.registryName,
    });
  }

  for (const hub of TOPIC_HUB_LINKS) {
    documents.push({
      id: `guide:${hub.slug}`,
      title: hub.label,
      group: 'Guides',
      href: topicHubPath(hub.slug),
      subtitle: hub.group,
      keywords: keywords(hub.slug.replace(/-/g, ' '), 'guide overview'),
    });
  }

  for (const comparison of comparisons) {
    documents.push({
      id: `compare:${comparison.slug}`,
      title: comparison.heading,
      group: 'Guides',
      href: `/compare/${comparison.slug}`,
      subtitle: 'Comparison',
      keywords: keywords(comparison.competitor, comparison.keywords, 'vs compare alternative'),
    });
  }

  const posts = await getAllBlogPosts();
  for (const post of posts) {
    documents.push({
      id: `post:${post.slug}`,
      title: post.title,
      group: 'Blog',
      href: `/blog/${post.slug}`,
      subtitle: post.topic,
      keywords: keywords(post.tagline, post.excerpt, post.category, post.slug.replace(/-/g, ' ')),
    });
  }

  for (const page of STATIC_PAGES) {
    documents.push({
      ...page,
      id: `page:${page.href}`,
      group: 'Pages',
      keywords: keywords(page.keywords),
    });
  }

  return documents;
}
