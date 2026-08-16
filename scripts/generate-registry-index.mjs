/**
 * Generates public/r/registry.json — the registry INDEX.
 *
 * Two different consumers read two different things:
 *   - the shadcn CLI reads per-item files, public/r/<name>.json
 *   - the MCP server reads this index, to answer list/search/categories
 *
 * The index was previously hand-maintained and drifted to 116 items against
 * registry.json's 154, so the MCP server could not see 38 shipped components —
 * searching "avatar stack" returned a footer. Deriving it here keeps the two in
 * lockstep, and `--check` fails CI if someone edits registry.json without
 * regenerating.
 *
 * Categories are joined from content/component-catalog.json so the MCP server
 * can filter on real data instead of guessing from the name with a regex.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(projectRoot, 'registry.json');
const catalogPath = path.join(projectRoot, 'content', 'component-catalog.json');
const outputPath = path.join(projectRoot, 'public', 'r', 'registry.json');

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

const categoryBySlug = new Map(catalog.map((entry) => [entry.slug, entry.category]));
const isNewBySlug = new Map(catalog.map((entry) => [entry.slug, Boolean(entry.new)]));

/**
 * Registry item names and catalog slugs mostly agree, but not always: demos and
 * dependency items are suffixed (`avatar-stack-demo`), and some routes are
 * de-hyphenated (`image-preview` is documented at /docs/imagepreview).
 *
 * Resolving these matters because `docsUrl` is what the MCP server hands to an
 * agent — an unresolved name fell back to /docs/<item-name>, which 404s for
 * every de-hyphenated route. Normalising lifts coverage from 52 to 65 items.
 */
function catalogSlugFor(name) {
  const base = name.replace(/-(demo|example|preview|usage|dependencies|dependecies|as-child)$/, '');
  for (const candidate of [name, base, name.replace(/-/g, ''), base.replace(/-/g, '')]) {
    if (categoryBySlug.has(candidate)) return candidate;
  }
  if (name.includes('footer') && categoryBySlug.has('footer')) return 'footer';
  return null;
}

function chartLibraryPathFor(name) {
  if (name === 'chart-kit') return '/charts';
  const match = name.match(/^(bar|line|area|pie|radar|radial|composed|candlestick|sparkline|price)-chart$/);
  return match ? `/charts/${match[1]}` : null;
}

const duplicates = [];
const seen = new Set();

const items = registry.items.map((item) => {
  if (seen.has(item.name)) duplicates.push(item.name);
  seen.add(item.name);

  const slug = catalogSlugFor(item.name);
  const chartPath = chartLibraryPathFor(item.name);

  // Preserve key order so diffs stay readable: identity fields, then files,
  // then dependency arrays, then the metadata we add.
  const next = {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: item.files,
  };
  if (item.dependencies) next.dependencies = item.dependencies;
  if (item.registryDependencies) next.registryDependencies = item.registryDependencies;

  // Explicit category beats the join; the join beats nothing at all.
  const category = item.category ?? (slug ? categoryBySlug.get(slug) : undefined);
  if (category) next.category = category;
  if (item.tags) next.tags = item.tags;
  if (slug) {
    next.docsUrl = `${registry.homepage}/docs/${slug}`;
    if (isNewBySlug.get(slug)) next.new = true;
  } else if (chartPath) {
    next.docsUrl = `${registry.homepage}${chartPath}`;
  }

  return next;
});

if (duplicates.length) {
  console.error(`Duplicate item names in registry.json: ${duplicates.join(', ')}`);
  process.exit(1);
}

const index = {
  $schema: registry.$schema,
  name: registry.name,
  homepage: registry.homepage,
  items,
};

const output = `${JSON.stringify(index, null, 2)}\n`;
const categorised = items.filter((item) => item.category).length;

if (process.argv.includes('--write')) {
  writeFileSync(outputPath, output);
  console.log(
    `Generated ${path.relative(projectRoot, outputPath)} with ${items.length} items ` +
      `(${categorised} categorised)`,
  );
} else if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== output) {
    console.error(
      `Stale generated file: ${path.relative(projectRoot, outputPath)}\n` +
        `Run: npm run generate:registry-index`,
    );
    process.exit(1);
  }
  console.log(`Registry index is current with ${items.length} items`);
} else {
  console.error('Usage: node scripts/generate-registry-index.mjs --write | --check');
  process.exit(1);
}
