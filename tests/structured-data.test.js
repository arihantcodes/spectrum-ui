const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');

const projectRoot = path.resolve(__dirname, '..');
const catalog = require(path.join(projectRoot, 'content', 'component-catalog.json'));
const componentDocs = require(path.join(projectRoot, 'content', 'component-docs.json'));

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
  const resolvedRequest = request.startsWith('@/')
    ? path.join(projectRoot, request.slice(2))
    : request;
  return originalResolveFilename.call(this, resolvedRequest, parent, isMain, options);
};

function compileTypeScript(module, fileName) {
  const source = fs.readFileSync(fileName, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName,
  }).outputText;

  module._compile(output, fileName);
}

require.extensions['.ts'] = compileTypeScript;
require.extensions['.tsx'] = compileTypeScript;

const {
  generateComponentBreadcrumbs,
  generateComponentStructuredData,
  generateCollectionPageStructuredData,
  generateTechArticleStructuredData,
} = require(path.join(projectRoot, 'lib', 'component-structured-data.ts'));
const { generateBlogStructuredData, generateFAQStructuredData, toIsoDate } = require(
  path.join(projectRoot, 'lib', 'seo-utils.ts'),
);
const { generateSiteStructuredData } = require(
  path.join(projectRoot, 'lib', 'site-structured-data.ts'),
);
const { serializeJsonLd } = require(path.join(projectRoot, 'components', 'seo', 'json-ld.tsx'));
const { faqs } = require(path.join(projectRoot, 'content', 'faqs.ts'));
const { TOPIC_HUBS } = require(path.join(projectRoot, 'content', 'topic-hubs.ts'));
const { createTopicHubStructuredData } = require(
  path.join(projectRoot, 'lib', 'topic-hub-structured-data.ts'),
);

function assertSerializable(value, label) {
  const serialized = JSON.stringify(value);
  assert.ok(serialized, `${label} must be JSON serializable`);
  assert.deepEqual(JSON.parse(serialized), value, `${label} must round-trip`);
}

const siteSchema = generateSiteStructuredData();
assert.equal(siteSchema['@context'], 'https://schema.org');
assert.equal(siteSchema['@graph'].length, 3);
const siteTypes = siteSchema['@graph'].flatMap((item) => item['@type']);
for (const requiredType of ['WebSite', 'Organization', 'SoftwareApplication']) {
  assert.ok(siteTypes.includes(requiredType), `Missing ${requiredType} schema`);
}
const software = siteSchema['@graph'].find((item) =>
  item['@type'].includes?.('SoftwareApplication'),
);
assert.equal(software.license.endsWith('/LICENSE'), true);
assert.deepEqual(software.programmingLanguage, ['TypeScript', 'JavaScript']);
assert.equal(software.offers.price, '0');
assert.equal(JSON.stringify(siteSchema).includes('SearchAction'), false);
assertSerializable(siteSchema, 'Site schema');

const docsRoot = path.join(projectRoot, 'app', '(docs)', 'docs');
for (const component of catalog) {
  const url = `https://ui.spectrumhq.in/docs/${component.slug}`;
  const schema = generateComponentStructuredData({
    name: component.name,
    description: component.description,
    url,
    keywords: [component.category],
  });
  const breadcrumbs = generateComponentBreadcrumbs({
    componentName: component.name,
    componentUrl: url,
  });

  assert.equal(schema['@type'], 'SoftwareSourceCode');
  assert.equal(schema.url, url);
  assert.equal(typeof schema.codeRepository, 'string');
  assert.equal(schema.license.endsWith('/LICENSE'), true);
  assert.equal(breadcrumbs['@type'], 'BreadcrumbList');
  assert.equal(breadcrumbs.itemListElement.at(-1).item, url);
  assertSerializable(schema, `${component.name} schema`);

  const componentDoc = componentDocs.find((candidate) => candidate.slug === component.slug);
  assert.ok(componentDoc, `${component.slug} needs component documentation data`);
  const componentFaqSchema = generateFAQStructuredData(componentDoc.faqs);
  assert.equal(componentFaqSchema['@type'], 'FAQPage');
  assert.deepEqual(
    componentFaqSchema.mainEntity.map((question) => ({
      question: question.name,
      answer: question.acceptedAnswer.text,
    })),
    componentDoc.faqs,
  );

  const routeDirectory = path.join(docsRoot, component.slug);
  const wrapperSource = ['layout.tsx', 'page.tsx']
    .map((fileName) => path.join(routeDirectory, fileName))
    .filter(fs.existsSync)
    .map((fileName) => fs.readFileSync(fileName, 'utf8'))
    .join('\n');
  assert.match(
    wrapperSource,
    /<SEOWrapper/,
    `${component.slug} must render component and breadcrumb schema`,
  );
}

const installation = generateTechArticleStructuredData({
  name: 'Installation',
  description: 'Install Spectrum UI.',
  url: 'https://ui.spectrumhq.in/docs/installation',
});
const guides = generateCollectionPageStructuredData({
  name: 'Guides',
  description: 'Spectrum UI guides.',
  url: 'https://ui.spectrumhq.in/docs/guides',
});
assert.equal(installation['@type'], 'TechArticle');
assert.equal(guides['@type'], 'CollectionPage');

for (const hub of TOPIC_HUBS) {
  const { collection, breadcrumbs, faq } = createTopicHubStructuredData(hub);
  assert.equal(collection['@type'], 'CollectionPage');
  assert.equal(collection.mainEntity['@type'], 'ItemList');
  assert.equal(collection.mainEntity.numberOfItems, hub.componentSlugs.length);
  assert.equal(collection.mainEntity.itemListElement.length, hub.componentSlugs.length);
  assert.equal(breadcrumbs['@type'], 'BreadcrumbList');
  assert.equal(breadcrumbs.itemListElement.at(-1).name, hub.label);
  assert.equal(faq['@type'], 'FAQPage');
  assert.deepEqual(
    faq.mainEntity.map((question) => ({
      question: question.name,
      answer: question.acceptedAnswer.text,
    })),
    hub.faqs,
  );
  assertSerializable(collection, `${hub.label} collection schema`);
  assertSerializable(breadcrumbs, `${hub.label} breadcrumb schema`);
  assertSerializable(faq, `${hub.label} FAQ schema`);
}

const blog = generateBlogStructuredData({
  title: 'Example article',
  description: 'An example technical article.',
  author: { name: 'Arihant Jain' },
  datePublished: 'Mar 18, 2026',
  url: 'https://ui.spectrumhq.in/blog/example',
  image: 'https://ui.spectrumhq.in/og.png',
  category: 'Engineering',
});
assert.ok(blog['@type'].includes('TechArticle'));
assert.equal(blog.datePublished, '2026-03-18T00:00:00.000Z');
assert.equal(toIsoDate('not a date'), undefined);
assertSerializable(blog, 'Blog schema');

const faqSchema = generateFAQStructuredData(faqs);
assert.equal(faqSchema['@type'], 'FAQPage');
assert.equal(faqSchema.mainEntity.length, faqs.length);
faqSchema.mainEntity.forEach((question, index) => {
  assert.equal(question.name, faqs[index].question);
  assert.equal(question.acceptedAnswer.text, faqs[index].answer);
});

const dangerousValue = '</script><script>alert(1)</script>';
const safeJson = serializeJsonLd({ value: dangerousValue });
assert.equal(safeJson.includes('</script>'), false);
assert.equal(JSON.parse(safeJson).value, dangerousValue);

console.log(
  `Structured data validated: site graph, ${catalog.length} component schemas, ${TOPIC_HUBS.length} topic hubs, guides, blog, and ${faqs.length} site FAQs`,
);
