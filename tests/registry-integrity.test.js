/**
 * Guards the install path: `npx shadcn add @spectrumui/<name>`.
 *
 * The @spectrumui namespace is registered in shadcn's public registry index
 * (https://ui.shadcn.com/r/registries.json) pointing at
 * https://ui.spectrumhq.in/r/{name}.json — so the CLI reads per-item payloads,
 * while the MCP server reads the public/r/registry.json index. Both must agree
 * with registry.json or installs 404 and the MCP recommends the wrong component.
 *
 * Every failure below shipped to production at least once:
 *   - image-preview declared @spectrumui/image-preview-dependencies, but that
 *     item was misnamed image-preview (duplicating the component name)
 *   - footer declared @spectrumui/icon-dependencies, which did not exist
 *   - multiple-selector-with-form declared @spectrumui/loading-button, which
 *     did not exist (the real item is loading-button-dependencies)
 *   - disclose-image and github-profile-card had no payload at all
 *   - the index sat at 116 items against registry.json's 154, so the MCP server
 *     could not see 38 shipped components
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(rootDir, 'registry.json'), 'utf8'));
const indexPath = path.join(rootDir, 'public/r/registry.json');
const payloadDir = path.join(rootDir, 'public/r');

let errors = 0;
const fail = (message) => {
  console.error(`  ✗ ${message}`);
  errors += 1;
};

const names = registry.items.map((item) => item.name);
const nameSet = new Set(names);

// 1. No duplicate item names — the CLI would resolve one arbitrarily.
const duplicates = names.filter((name, i) => names.indexOf(name) !== i);
if (duplicates.length) fail(`duplicate item names: ${[...new Set(duplicates)].join(', ')}`);

// 2. Every @spectrumui registryDependency resolves to a real item.
for (const item of registry.items) {
  for (const dep of item.registryDependencies ?? []) {
    if (!dep.startsWith('@spectrumui/')) continue;
    const target = dep.slice('@spectrumui/'.length);
    if (!nameSet.has(target)) {
      fail(`${item.name} depends on ${dep}, which is not in registry.json`);
    }
  }
}

// 3. Every referenced source file exists on disk.
for (const item of registry.items) {
  for (const file of item.files ?? []) {
    if (!fs.existsSync(path.join(rootDir, file.path))) {
      fail(`${item.name} references a missing file: ${file.path}`);
    }
  }
}

// 4. Every item has a per-item payload with inlined content — this is what the
//    CLI actually fetches.
for (const item of registry.items) {
  const payloadPath = path.join(payloadDir, `${item.name}.json`);
  if (!fs.existsSync(payloadPath)) {
    fail(`no payload at public/r/${item.name}.json — CLI install would 404`);
    continue;
  }
  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  } catch (error) {
    fail(`public/r/${item.name}.json is not valid JSON: ${error.message}`);
    continue;
  }
  if (payload.name !== item.name) {
    fail(`public/r/${item.name}.json declares name "${payload.name}"`);
  }
  if ((payload.files ?? []).length !== (item.files ?? []).length) {
    fail(`public/r/${item.name}.json has ${payload.files?.length ?? 0} files, expected ${item.files.length}`);
  }
  for (const file of payload.files ?? []) {
    if (typeof file.content !== 'string' || file.content.length === 0) {
      fail(`public/r/${item.name}.json: ${file.path} has no inlined content`);
    }
  }
}

// 5. The index the MCP server reads is at full parity with registry.json.
if (!fs.existsSync(indexPath)) {
  fail('public/r/registry.json is missing — the MCP server has no index to read');
} else {
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const indexNames = new Set(index.items.map((item) => item.name));
  const missing = names.filter((name) => !indexNames.has(name));
  const extra = [...indexNames].filter((name) => !nameSet.has(name));
  if (missing.length) {
    fail(
      `index is missing ${missing.length} item(s) the MCP server cannot see: ` +
        `${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ', …' : ''}`,
    );
  }
  if (extra.length) fail(`index has ${extra.length} item(s) not in registry.json: ${extra.join(', ')}`);
}

if (errors > 0) {
  console.error(`\nRegistry integrity: ${errors} error(s)`);
  process.exit(1);
}
console.log(`Registry integrity: ${registry.items.length} items, payloads and index in parity`);
