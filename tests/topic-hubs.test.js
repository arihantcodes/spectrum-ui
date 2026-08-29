const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');

const projectRoot = path.resolve(__dirname, '..');
const componentCatalog = require(path.join(projectRoot, 'content', 'component-catalog.json'));
const registry = require(path.join(projectRoot, 'registry.json'));

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
  const resolvedRequest = request.startsWith('@/')
    ? path.join(projectRoot, request.slice(2))
    : request;
  return originalResolveFilename.call(this, resolvedRequest, parent, isMain, options);
};

require.extensions['.ts'] = function compileTypeScript(module, fileName) {
  const source = fs.readFileSync(fileName, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName,
  }).outputText;

  module._compile(output, fileName);
};

const {
  TOPIC_HUBS,
  getRelatedTopicHubs,
  getTopicHubComponents,
  getTopicHubsForComponent,
} = require(path.join(projectRoot, 'content', 'topic-hubs.ts'));
const { TOPIC_HUB_LINKS, topicHubPath } = require(
  path.join(projectRoot, 'lib', 'topic-hub-links.ts'),
);

const requiredSlugs = [
  'react-component-library',
  'react-block-library',
  'tailwind-component-library',
  'nextjs-ui-library',
  'motion-components',
  'animation-library',
  'dashboard-components',
  'landing-page-components',
  'hero-sections',
  'pricing-sections',
  'authentication-components',
  'ai-ui-components',
  'copy-paste-react-components',
  'open-source-ui-components',
  'accessible-react-components',
  'design-system-integration',
  'rapid-prototyping-ui-library',
];

function hasPublicRoute(href) {
  if (href === '/docs') {
    return fs.existsSync(path.join(projectRoot, 'app', '(docs)', 'docs', 'page.tsx'));
  }

  if (href.startsWith('/docs/')) {
    const slug = href.slice('/docs/'.length);
    const routeDirectory = path.join(projectRoot, 'app', '(docs)', 'docs', slug);
    return ['page.tsx', 'layout.tsx'].some((fileName) =>
      fs.existsSync(path.join(routeDirectory, fileName)),
    );
  }

  if (href.startsWith('/blog/')) {
    const slug = href.slice('/blog/'.length);
    return fs.existsSync(path.join(projectRoot, 'content', 'blog', `${slug}.tsx`));
  }

  return false;
}

function normalizeComponentPath(value) {
  return value.replace(/^@\//, '').replace(/\.(?:js|jsx|ts|tsx)$/, '');
}

function installedComponentPaths(commands) {
  const installedPaths = new Set();
  const visitedRegistryItems = new Set();

  function addRegistryItem(name) {
    if (visitedRegistryItems.has(name)) return;
    visitedRegistryItems.add(name);

    const item = registry.items.find((candidate) => candidate.name === name);
    assert.ok(item, `Unknown Spectrum UI registry item: ${name}`);

    for (const file of item.files ?? []) {
      if (file.target) installedPaths.add(normalizeComponentPath(file.target));
    }

    for (const dependency of item.registryDependencies ?? []) {
      if (dependency.startsWith('@spectrumui/')) {
        addRegistryItem(dependency.slice('@spectrumui/'.length));
      } else {
        installedPaths.add(`components/ui/${dependency}`);
      }
    }
  }

  for (const command of commands) {
    const [, additions = ''] = command.match(/\badd\s+(.+)$/) ?? [];
    assert.ok(additions, `Unrecognized shadcn install command: ${command}`);

    for (const addition of additions.trim().split(/\s+/)) {
      if (addition.startsWith('@spectrumui/')) {
        addRegistryItem(addition.slice('@spectrumui/'.length));
      } else {
        installedPaths.add(`components/ui/${addition}`);
      }
    }
  }

  return installedPaths;
}

assert.equal(TOPIC_HUBS.length, requiredSlugs.length);
assert.deepEqual(
  TOPIC_HUBS.map((hub) => hub.slug),
  requiredSlugs,
);
assert.deepEqual(
  TOPIC_HUB_LINKS.map((hub) => hub.slug),
  requiredSlugs,
);
assert.equal(new Set(TOPIC_HUBS.map((hub) => hub.label)).size, TOPIC_HUBS.length);
assert.equal(new Set(TOPIC_HUBS.map((hub) => hub.title)).size, TOPIC_HUBS.length);
assert.equal(new Set(TOPIC_HUBS.map((hub) => hub.description)).size, TOPIC_HUBS.length);

const catalogSlugs = new Set(componentCatalog.map((component) => component.slug));
const hubSlugs = new Set(requiredSlugs);
const allFaqQuestions = [];

for (const hub of TOPIC_HUBS) {
  const link = TOPIC_HUB_LINKS.find((candidate) => candidate.slug === hub.slug);
  assert.ok(link, `${hub.slug} needs a discovery link`);
  assert.equal(link.label, hub.label, `${hub.slug} label must match its discovery link`);
  assert.ok(hub.metadataTitle.length > 15, `${hub.slug} needs a descriptive metadata title`);
  assert.ok(hub.description.length <= 155, `${hub.slug} metadata description is too long`);
  assert.ok(hub.keywords.length >= 5, `${hub.slug} needs at least five keywords`);
  assert.equal(hub.intro.length, 2, `${hub.slug} needs two introduction paragraphs`);
  assert.equal(hub.definition.length, 2, `${hub.slug} needs two definition paragraphs`);
  assert.equal(hub.whenToUse.length, 3, `${hub.slug} needs three use cases`);
  // Hubs feature a curated subset (the canonical component list), so counts vary per topic.
  assert.ok(hub.componentSlugs.length >= 4, `${hub.slug} needs at least four components`);
  assert.equal(
    new Set(hub.componentSlugs).size,
    hub.componentSlugs.length,
    `${hub.slug} has duplicate components`,
  );
  assert.equal(hub.guideLinks.length, 3, `${hub.slug} needs three guide links`);
  assert.equal(hub.relatedSlugs.length, 3, `${hub.slug} needs three sibling hubs`);
  assert.equal(hub.faqs.length, 4, `${hub.slug} needs four FAQs`);
  assert.ok(hub.codeExample.installCommands.length > 0, `${hub.slug} needs an install command`);
  assert.ok(hub.codeExample.code.includes('export '), `${hub.slug} needs an exported code example`);
  const installedPaths = installedComponentPaths(hub.codeExample.installCommands);
  const localImports = [...hub.codeExample.code.matchAll(/from ['"](@\/components\/[^'"]+)['"]/g)];
  for (const [, importPath] of localImports) {
    assert.ok(
      installedPaths.has(normalizeComponentPath(importPath)),
      `${hub.slug} example imports ${importPath}, but its commands do not install that path`,
    );
  }

  for (const componentSlug of hub.componentSlugs) {
    assert.ok(catalogSlugs.has(componentSlug), `${hub.slug} references unknown ${componentSlug}`);
  }

  for (const guide of hub.guideLinks) {
    assert.ok(hasPublicRoute(guide.href), `${hub.slug} guide route does not exist: ${guide.href}`);
  }

  for (const relatedSlug of hub.relatedSlugs) {
    assert.notEqual(relatedSlug, hub.slug, `${hub.slug} cannot relate to itself`);
    assert.ok(hubSlugs.has(relatedSlug), `${hub.slug} references unknown hub ${relatedSlug}`);
  }

  for (const faq of hub.faqs) {
    assert.ok(faq.question.endsWith('?'), `${hub.slug} FAQ must be a question`);
    assert.ok(faq.answer.length >= 40, `${hub.slug} FAQ answer is too short`);
    allFaqQuestions.push(faq.question);
  }

  const components = getTopicHubComponents(hub);
  assert.equal(components.length, hub.componentSlugs.length);
  assert.ok(components.every((component) => component.href === `/docs/${component.slug}`));
  assert.deepEqual(
    getRelatedTopicHubs(hub).map((related) => related.slug),
    hub.relatedSlugs,
  );

  const pagePath = path.join(projectRoot, 'app', '(marketing)', hub.slug, 'page.tsx');
  assert.ok(fs.existsSync(pagePath), `${topicHubPath(hub.slug)} route is missing`);
  const pageSource = fs.readFileSync(pagePath, 'utf8');
  assert.match(pageSource, new RegExp(`getTopicHub\\('${hub.slug}'\\)`));
  assert.match(pageSource, /createTopicHubMetadata\(hub\)/);
  assert.match(pageSource, /<TopicHubPage hub=\{hub\} \/>/);
}

assert.equal(new Set(allFaqQuestions).size, allFaqQuestions.length, 'Hub FAQs must be unique');

// Topic hubs showcase a curated subset of the catalog. Validate that every
// featured component is real and correctly backlinked (components intentionally
// excluded from the curation are not required to appear on any hub).
const featuredComponentSlugs = new Set();
for (const hub of TOPIC_HUBS) {
  for (const slug of hub.componentSlugs) featuredComponentSlugs.add(slug);
}
for (const slug of featuredComponentSlugs) {
  assert.ok(catalogSlugs.has(slug), `hub features unknown component ${slug}`);
  assert.ok(
    getTopicHubsForComponent(slug).length > 0,
    `${slug} is featured but has no topic-hub backlink`,
  );
}

const sharedPageSource = fs.readFileSync(
  path.join(projectRoot, 'components', 'topic-hub-page.tsx'),
  'utf8',
);
assert.equal(
  sharedPageSource.includes("'use client'"),
  false,
  'Topic hubs must stay server-rendered',
);
assert.match(sharedPageSource, /createTopicHubStructuredData/);

console.log(
  `Topic hubs validated: ${TOPIC_HUBS.length} routes, ${featuredComponentSlugs.size} featured components (of ${componentCatalog.length} in catalog), and ${allFaqQuestions.length} unique FAQs`,
);
