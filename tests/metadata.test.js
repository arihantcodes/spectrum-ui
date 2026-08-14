const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');

const projectRoot = path.resolve(__dirname, '..');
const catalog = require(path.join(projectRoot, 'content', 'component-catalog.json'));
const titleSuffix = ' | Spectrum UI';

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

const { TOPIC_HUBS } = require(path.join(projectRoot, 'content', 'topic-hubs.ts'));

function truncateAtWord(value, maxLength) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  const candidate = normalized.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(' ');
  const clipped = (lastSpace > maxLength * 0.6 ? candidate.slice(0, lastSpace) : candidate).replace(
    /[,:;.!?\s-]+$/,
    '',
  );

  return clipped + '…';
}

function formatBlogTitle(title) {
  return truncateAtWord(title, 60 - titleSuffix.length) + titleSuffix;
}

function formatDescription(description) {
  return truncateAtWord(description, 155);
}

function readBlogStringProperty(filePath, propertyName) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let value;

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(sourceFile) === propertyName &&
      ts.isStringLiteralLike(node.initializer)
    ) {
      value ??= node.initializer.text;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert.ok(value, `${path.basename(filePath)} must declare ${propertyName}`);
  return value;
}

const componentTitles = catalog.map(
  (component) => `${component.name} — React ${component.category} Component | Spectrum UI`,
);
const componentDescriptions = catalog.map(
  (component) => `${component.description} Copy-paste React source for Next.js and Tailwind CSS.`,
);

const blogDirectory = path.join(projectRoot, 'content', 'blog');
const blogFiles = fs.readdirSync(blogDirectory).filter((fileName) => fileName.endsWith('.tsx'));
const blogTitles = blogFiles.map((fileName) =>
  formatBlogTitle(readBlogStringProperty(path.join(blogDirectory, fileName), 'title')),
);
const blogDescriptions = blogFiles.map((fileName) =>
  formatDescription(readBlogStringProperty(path.join(blogDirectory, fileName), 'excerpt')),
);

const staticTitles = [
  'Spectrum UI — Animated React Components & Blocks',
  'Components | Spectrum UI',
  'Installation | Spectrum UI',
  'Guides & Tutorials | Spectrum UI',
  'MCP Server | Spectrum UI',
  'Blog | Spectrum UI',
  'Animated React Charts | Spectrum UI',
  'Color Palette | Spectrum UI',
  'Frequently Asked Questions | Spectrum UI',
  'Why Spectrum UI Exists | Spectrum UI',
  'Privacy Policy | Spectrum UI',
  'Spectrum UI Pro — Early-Bird Waitlist',
  'Sponsor Spectrum UI | Frontend Developer Audience',
  'React Dashboard Templates | Spectrum UI',
  'Newsletter Dashboard — React Template | Spectrum UI',
  'Pharmacy Dashboard — React Template | Spectrum UI',
  'Terms of Service — Spectrum UI',
];

const staticDescriptions = [
  'Open-source, animation-ready React components and blocks built with Next.js, Tailwind CSS, Motion, TypeScript, and shadcn/ui for SaaS and AI apps.',
  'Browse Spectrum UI’s animation-ready React components and blocks, with copy-paste source for Next.js, Tailwind CSS, Motion, and shadcn/ui projects.',
  'Install Spectrum UI in a Next.js project with Tailwind CSS and shadcn/ui. Step-by-step setup so you can copy-paste React components in minutes.',
  'Learn how to build modern React applications with Spectrum UI. Step-by-step tutorials, best practices, and real-world examples.',
  'Use Spectrum UI with AI coding assistants like Claude, Cursor, and Windsurf. Browse, search, and install components directly from your AI editor via the @spectrumui/mcp server.',
  'UI components, React, design systems, and frontend engineering from Spectrum UI. Practical guides for shipping better Next.js interfaces.',
  'A full-viewport gallery of Spectrum UI chart components. Copy-paste React source for Next.js, Tailwind CSS, Recharts, and Motion. Browse bar, line, area, pie, radar, radial, and composed charts.',
  'Explore curated color palettes for React and Next.js. Copy Tailwind CSS and CSS variable values for your design system.',
  'Answers about installing Spectrum UI, using its MCP server, shadcn/ui compatibility, code ownership, updates, and commercial projects.',
  'Read the founder story behind Spectrum UI, from repeated interface work to an open-source library of animation-ready React components and blocks.',
  'Learn what personal, payment, and account data Spectrum UI collects, how third-party processors are used, and how to request access or deletion.',
  'Join the Spectrum UI Pro waitlist. Lock early-bird pricing for premium Next.js templates, pro components, and founder support.',
  'Reach developers while they browse Spectrum UI documentation and components. Review available sponsor placements across the site and newsletter.',
  'Browse Spectrum UI dashboard templates with copyable Next.js, TypeScript, Tailwind CSS, and shadcn/ui source for product interfaces.',
  'Preview and copy a React newsletter dashboard with subscriber data, campaign analytics, charts, and a responsive Next.js layout.',
  'Preview and copy a React pharmacy dashboard for inventory, prescriptions, sales, and operational data in a responsive Next.js layout.',
  'Read the Spectrum UI Terms of Service covering usage, licensing, payments, and refund policy.',
].map(formatDescription);

const topicHubTitles = TOPIC_HUBS.map((hub) => formatBlogTitle(hub.metadataTitle));
const topicHubDescriptions = TOPIC_HUBS.map((hub) => formatDescription(hub.description));

const publicTitles = [...componentTitles, ...blogTitles, ...staticTitles, ...topicHubTitles];
const publicDescriptions = [
  ...componentDescriptions,
  ...blogDescriptions,
  ...staticDescriptions,
  ...topicHubDescriptions,
];

assert.equal(componentTitles.length, 44);
assert.ok(componentTitles.every((title) => title.length <= 60));
assert.ok(componentDescriptions.every((description) => description.length <= 155));
assert.ok(blogTitles.every((title) => title.length <= 60));
assert.ok(staticTitles.every((title) => title.length <= 60));
assert.ok(topicHubTitles.every((title) => title.length <= 60));
assert.ok(publicDescriptions.every((description) => description.length <= 155));
assert.equal(new Set(componentDescriptions).size, componentDescriptions.length);
assert.equal(new Set(publicTitles).size, publicTitles.length);
assert.equal(new Set(publicDescriptions).size, publicDescriptions.length);

console.log(`Metadata validated: ${publicTitles.length} unique public titles and descriptions`);
