/**
 * Generates public/r/<name>.json — the per-item payloads the shadcn CLI fetches.
 *
 * `npx shadcn add @spectrumui/<name>` resolves to
 * https://ui.spectrumhq.in/r/<name>.json (that URL template is registered for
 * the @spectrumui namespace in shadcn's public registry index), so every item in
 * registry.json needs a file here with its source inlined as `content`.
 *
 * These were hand-written before, which is why `disclose-image` and
 * `github-profile-card` shipped in registry.json with no payload — the CLI 404'd
 * on both. Generating from registry.json + disk keeps them in lockstep.
 *
 * Verified byte-identical against the previously hand-written payloads.
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(projectRoot, 'registry.json');
const outputDir = path.join(projectRoot, 'public', 'r');

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));

/** The index is generated separately by generate-registry-index.mjs. */
const INDEX_FILE = 'registry.json';

function buildItem(item) {
  // Key order matches the hand-written payloads so regeneration produces a
  // clean diff rather than reordering all 220 files.
  const payload = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    title: item.title,
    description: item.description,
  };
  if (item.dependencies) payload.dependencies = item.dependencies;
  if (item.registryDependencies) payload.registryDependencies = item.registryDependencies;

  payload.files = item.files.map((file) => {
    const absolute = path.join(projectRoot, file.path);
    if (!existsSync(absolute)) {
      throw new Error(`${item.name}: source file not found — ${file.path}`);
    }
    return {
      path: file.path,
      content: readFileSync(absolute, 'utf8'),
      type: file.type,
      target: file.target,
    };
  });

  payload.type = item.type;
  return payload;
}

const generated = new Map();
for (const item of registry.items) {
  generated.set(`${item.name}.json`, `${JSON.stringify(buildItem(item), null, 2)}\n`);
}

/**
 * Files in public/r that no registry item claims. Mostly underscore-named
 * duplicates left over from hand-generation (loading_button_demo.json alongside
 * loading-button-demo.json). Reported, never deleted — a stale payload is inert,
 * but removing one that something still links to is not.
 */
const orphans = readdirSync(outputDir)
  .filter((file) => file.endsWith('.json') && file !== INDEX_FILE && !generated.has(file))
  .sort();

if (process.argv.includes('--write')) {
  let written = 0;
  for (const [file, contents] of generated) {
    const target = path.join(outputDir, file);
    if (!existsSync(target) || readFileSync(target, 'utf8') !== contents) {
      writeFileSync(target, contents);
      written += 1;
    }
  }
  console.log(`Generated ${generated.size} registry item payloads (${written} changed)`);
  if (orphans.length) {
    console.log(`  ${orphans.length} unclaimed payload(s) left in place: ${orphans.join(', ')}`);
  }
} else if (process.argv.includes('--check')) {
  const stale = [];
  for (const [file, contents] of generated) {
    const target = path.join(outputDir, file);
    if (!existsSync(target) || readFileSync(target, 'utf8') !== contents) stale.push(file);
  }
  if (stale.length) {
    console.error(
      `Stale or missing registry payloads (${stale.length}): ${stale.slice(0, 10).join(', ')}` +
        `${stale.length > 10 ? ', …' : ''}\nRun: npm run generate:registry`,
    );
    process.exit(1);
  }
  console.log(`Registry item payloads are current (${generated.size} items)`);
} else {
  console.error('Usage: node scripts/generate-registry-items.mjs --write | --check');
  process.exit(1);
}
