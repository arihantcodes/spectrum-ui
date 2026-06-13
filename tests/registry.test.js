const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const registryPath = path.join(rootDir, 'registry.json');
const docsDir = path.join(rootDir, 'app/(docs)/docs');

// Standard shadcn components that do not need to be in registry.json
const shadcnComponents = new Set([
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'badge',
  'breadcrumb', 'button', 'calendar', 'card', 'carousel', 'checkbox',
  'collapsible', 'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu',
  'form', 'hover-card', 'input', 'input-otp', 'label', 'menubar',
  'navigation-menu', 'pagination', 'popover', 'progress', 'radio-group',
  'resizable', 'scroll-area', 'select', 'separator', 'sheet', 'sidebar',
  'skeleton', 'slider', 'sonner', 'switch', 'table', 'tabs', 'textarea',
  'toast', 'toggle', 'toggle-group', 'tooltip'
]);

let errors = 0;

function logError(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
  errors++;
}

function logSuccess(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

// Helper to recursively find all .tsx files
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx')) {
      files.push(name);
    }
  }
  return files;
}

console.log('--- Spectrum UI Registry Validation Tests ---');

// 1. Validate registry.json structure and file existence
if (!fs.existsSync(registryPath)) {
  logError('registry.json does not exist in the root directory.');
  process.exit(1);
}

let registry;
try {
  registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  logSuccess('registry.json is valid JSON.');
} catch (err) {
  logError(`registry.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

if (!registry.items || !Array.isArray(registry.items)) {
  logError('registry.json is missing the "items" array.');
  process.exit(1);
}

const registeredNames = new Set();
let filesChecked = 0;

for (const item of registry.items) {
  if (!item.name) {
    logError('A registry item is missing the "name" property.');
    continue;
  }
  registeredNames.add(item.name);

  if (!item.files || !Array.isArray(item.files)) {
    logError(`Registry item "${item.name}" is missing the "files" array.`);
    continue;
  }

  for (const fileObj of item.files) {
    if (!fileObj.path) {
      logError(`A file entry in item "${item.name}" is missing the "path" property.`);
      continue;
    }

    const filePath = path.join(rootDir, fileObj.path);
    if (!fs.existsSync(filePath)) {
      logError(`File "${fileObj.path}" referenced by component "${item.name}" does not exist on disk.`);
    } else {
      filesChecked++;
    }
  }
}

logSuccess(`Successfully verified ${registry.items.length} registry components and ${filesChecked} source files on disk.`);

// 2. Cross-reference CLI commands in docs pages with the registry catalog
const tsxFiles = getFiles(docsDir);
console.log(`Scanning ${tsxFiles.length} documentation files for installation commands...`);

const cliRegex = /cli=(?:["']([^"']+)["']|{([^}]+)})/g;
let docsChecked = 0;

for (const file of tsxFiles) {
  const relativePath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = cliRegex.exec(content)) !== null) {
    const val = match[1] || match[2];
    if (!val) continue;

    // Skip dynamic JSX variables, "cli" variable, and whitelisted items
    if (val === 'cli' || val.startsWith('{') || val.includes('$') || val.includes('.') || (!val.includes('@') && shadcnComponents.has(val))) {
      continue;
    }

    docsChecked++;

    if (val.startsWith('@spectrumui/')) {
      const compName = val.replace('@spectrumui/', '');
      if (!registeredNames.has(compName)) {
        logError(`In "${relativePath}": CLI command points to "@spectrumui/${compName}", but "${compName}" is not registered in registry.json!`);
      }
    } else {
      if (!shadcnComponents.has(val) && !registeredNames.has(val)) {
        logError(`In "${relativePath}": CLI command "${val}" is neither a standard shadcn component nor a valid registry item.`);
      } else {
        console.warn(`\x1b[33m[WARN]\x1b[0m In "${relativePath}": CLI command "${val}" is missing the "@spectrumui/" prefix but is a custom component.`);
      }
    }
  }
}

logSuccess(`Verified ${docsChecked} documentation install commands against the registry.`);

console.log('\n--- Test Summary ---');
if (errors > 0) {
  console.error(`\x1b[31mFAIL: ${errors} error(s) found during validation.\x1b[0m`);
  process.exit(1);
} else {
  console.log('\x1b[32mSUCCESS: All registry validation tests passed successfully!\x1b[0m');
  process.exit(0);
}
