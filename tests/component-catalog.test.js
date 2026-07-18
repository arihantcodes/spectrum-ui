const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(projectRoot, "app", "(docs)", "docs");
const catalog = require(path.join(
  projectRoot,
  "content",
  "component-catalog.json",
));
const nonComponentRoutes = new Set(["guides", "installation", "mcp"]);

const routeSlugs = fs
  .readdirSync(docsRoot, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !nonComponentRoutes.has(entry.name) &&
      fs.existsSync(path.join(docsRoot, entry.name, "page.tsx")),
  )
  .map((entry) => entry.name)
  .sort();

const catalogSlugs = catalog.map((component) => component.slug).sort();

assert.equal(catalog.length, 61, "The component catalog should contain 61 routes");
assert.equal(
  new Set(catalogSlugs).size,
  catalog.length,
  "Component slugs must be unique",
);
assert.equal(
  new Set(catalog.map((component) => component.name)).size,
  catalog.length,
  "Component names must be unique",
);
assert.deepEqual(
  catalogSlugs,
  routeSlugs,
  "The component catalog must match the component docs routes",
);

for (const component of catalog) {
  assert.ok(component.name.trim(), `${component.slug} must have a name`);
  assert.ok(
    component.description.trim(),
    `${component.slug} must have a description`,
  );
  assert.ok(component.category.trim(), `${component.slug} must have a category`);
}

console.log(`Component catalog validated: ${catalog.length} routes`);
