const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const catalog = require(path.join(projectRoot, 'content', 'block-catalog.json'));
const registry = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'registry.json'), 'utf8'),
);

const live = catalog.blocks.filter((block) => block.status === 'live');
const footerBlocks = live.filter((block) => block.category === 'footers');
const registryNames = new Set(registry.items.map((item) => item.name));

assert.ok(
  catalog.categories.some((category) => category.slug === 'footers'),
  'block catalog must include a footers category',
);
assert.equal(footerBlocks.length, 25, 'footers category must ship 25 live blocks');

const slugs = new Set();
for (const block of live) {
  assert.equal(slugs.has(block.slug), false, `duplicate block slug: ${block.slug}`);
  slugs.add(block.slug);
  assert.ok(registryNames.has(block.slug), `${block.slug} must exist in registry.json`);

  const sourceFile = block.sourceFile
    ?? path.join('components', 'spectrumui', 'blocks', block.category, `${block.slug}.tsx`);
  assert.ok(
    fs.existsSync(path.join(projectRoot, sourceFile)),
    `missing source for ${block.slug}: ${sourceFile}`,
  );
}

for (const block of footerBlocks) {
  assert.equal(block.stage, 'full-bleed', `${block.slug} should preview full-bleed`);
  assert.ok(block.sourceFile.startsWith('components/spectrumui/footers/'));
}

console.log(
  `block-catalog.test.js: ${live.length} live blocks, ${footerBlocks.length} footers`,
);
