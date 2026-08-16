const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const catalog = require(path.join(projectRoot, 'content', 'component-catalog.json'));
const componentDocs = require(path.join(projectRoot, 'content', 'component-docs.json'));
const docsRoot = path.join(projectRoot, 'app', '(docs)', 'docs');

assert.equal(componentDocs.length, 45, 'Every component route needs generated documentation');
assert.deepEqual(
  componentDocs.map((component) => component.slug).sort(),
  catalog.map((component) => component.slug).sort(),
  'Documentation data must match the component catalog',
);

const allFaqQuestions = [];

for (const component of componentDocs) {
  const catalogEntry = catalog.find((candidate) => candidate.slug === component.slug);
  assert.ok(catalogEntry, `${component.slug} must exist in the catalog`);
  assert.equal(component.name, catalogEntry.name);
  assert.equal(component.description, catalogEntry.description);
  assert.ok(component.technologies.length > 0, `${component.slug} needs verified technologies`);
  assert.ok(component.useCases.length >= 3, `${component.slug} needs at least three use cases`);
  assert.ok(component.features.length >= 2, `${component.slug} needs verified features`);
  assert.ok(component.accessibility.length > 0, `${component.slug} needs accessibility guidance`);
  assert.ok(component.customization.length > 0, `${component.slug} needs customization guidance`);
  assert.equal(component.related.length, 4, `${component.slug} needs four related components`);
  assert.equal(component.faqs.length, 6, `${component.slug} needs six visible FAQs`);
  assert.equal(new Set(component.faqs.map((faq) => faq.question)).size, component.faqs.length);
  assert.ok(
    component.installation.manualPaths.length > 0,
    `${component.slug} needs a verified manual source path`,
  );
  assert.ok(
    component.installation.cliCommands.length > 0,
    `${component.slug} needs a verified CLI command`,
  );
  assert.ok(
    component.coverage.usage || component.coverage.installation,
    `${component.slug} needs an existing or generated working usage example`,
  );

  for (const related of component.related) {
    assert.notEqual(related.slug, component.slug);
    assert.ok(catalog.some((candidate) => candidate.slug === related.slug));
  }

  for (const faq of component.faqs) {
    assert.ok(faq.question.includes(component.name));
    assert.ok(faq.answer.trim());
    allFaqQuestions.push(faq.question);
  }

  const routeSource = ['layout.tsx', 'page.tsx']
    .map((fileName) => path.join(docsRoot, component.slug, fileName))
    .filter(fs.existsSync)
    .map((fileName) => fs.readFileSync(fileName, 'utf8'))
    .join('\n');
  assert.match(routeSource, /<PageTemplate/, `${component.slug} must use the shared page template`);
}

assert.equal(new Set(allFaqQuestions).size, allFaqQuestions.length, 'FAQ questions must be unique');

const pageTemplateSource = fs.readFileSync(
  path.join(docsRoot, 'components', 'page-template.tsx'),
  'utf8',
);
assert.match(pageTemplateSource, /<ComponentOverview/);
assert.match(pageTemplateSource, /<ComponentReference/);

const seoWrapperSource = fs.readFileSync(
  path.join(docsRoot, 'components', 'seo-wrapper.tsx'),
  'utf8',
);
assert.match(seoWrapperSource, /generateFAQStructuredData\(componentDoc\.faqs\)/);

console.log(
  `Component documentation validated: ${componentDocs.length} routes, ${allFaqQuestions.length} visible and mirrored FAQs`,
);
