const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(projectRoot, 'app', '(docs)', 'docs');
const catalog = require(path.join(projectRoot, 'content', 'component-catalog.json'));
// Non-component doc routes, plus the 17 components delisted from the shipped
// catalog. Their pages still resolve (as on main) but are not part of the 56.
const nonComponentRoutes = new Set([
  'guides',
  'installation',
  'mcp',
  'charts',
  'animatedtestimonials',
  'animatedtext',
  'bento-grid',
  'command-palette',
  'discloseimage',
  'dock',
  'eventcalendar',
  'footer',
  'github-card',
  'heading-with-anchor',
  'input',
  'navbar',
  'product-card',
  'responsive-modal',
  'skeleton',
  'statuscode',
  'testimonials',
]);

const routeSlugs = fs
  .readdirSync(docsRoot, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !nonComponentRoutes.has(entry.name) &&
      fs.existsSync(path.join(docsRoot, entry.name, 'page.tsx')),
  )
  .map((entry) => entry.name);

const chartsRoot = path.join(docsRoot, 'charts');
if (fs.existsSync(chartsRoot)) {
  for (const entry of fs.readdirSync(chartsRoot, { withFileTypes: true })) {
    if (
      entry.isDirectory() &&
      fs.existsSync(path.join(chartsRoot, entry.name, 'page.tsx'))
    ) {
      routeSlugs.push(`charts/${entry.name}`);
    }
  }
}

routeSlugs.sort();

const catalogSlugs = catalog.map((component) => component.slug).sort();

assert.equal(catalog.length, 56, 'The component catalog should contain 56 routes');
assert.equal(new Set(catalogSlugs).size, catalog.length, 'Component slugs must be unique');
assert.equal(
  new Set(catalog.map((component) => component.name)).size,
  catalog.length,
  'Component names must be unique',
);
assert.deepEqual(
  catalogSlugs,
  routeSlugs,
  'The component catalog must match the component docs routes',
);

for (const component of catalog) {
  assert.ok(component.name.trim(), `${component.slug} must have a name`);
  assert.ok(component.description.trim(), `${component.slug} must have a description`);
  assert.ok(component.category.trim(), `${component.slug} must have a category`);
}

console.log(`Component catalog validated: ${catalog.length} routes`);
