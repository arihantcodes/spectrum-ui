import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(
  readFileSync(path.join(projectRoot, 'content', 'component-catalog.json'), 'utf8'),
);
const registry = JSON.parse(readFileSync(path.join(projectRoot, 'registry.json'), 'utf8'));
const outputPath = path.join(projectRoot, 'content', 'component-docs.json');

const CONTEXTS_BY_CATEGORY = {
  Action: ['SaaS workflows', 'onboarding flows', 'admin toolbars'],
  Calendar: ['scheduling dashboards', 'booking flows', 'operations tools'],
  Card: ['SaaS dashboards', 'product pages', 'account portals'],
  Control: ['settings screens', 'preference panels', 'admin forms'],
  Data: ['analytics dashboards', 'reporting views', 'admin panels'],
  Disclosure: ['documentation pages', 'support centers', 'settings screens'],
  Feedback: ['form workflows', 'support tools', 'account dashboards'],
  Form: ['authentication flows', 'settings forms', 'admin workflows'],
  Input: ['forms', 'search workflows', 'settings screens'],
  Interaction: ['product interfaces', 'onboarding flows', 'interactive demos'],
  Layout: ['dashboard layouts', 'landing pages', 'admin panels'],
  Media: ['landing pages', 'portfolio pages', 'product detail views'],
  Navigation: ['application shells', 'dashboards', 'documentation sites'],
  Overlay: ['settings workflows', 'mobile navigation', 'confirmation flows'],
  Profile: ['account pages', 'team directories', 'community products'],
  Progress: ['upload flows', 'onboarding steps', 'background tasks'],
  Rating: ['feedback forms', 'review flows', 'support surveys'],
  Review: ['landing pages', 'case-study pages', 'product marketing'],
  Status: ['dashboards', 'operations tables', 'account pages'],
  Chart: ['analytics dashboards', 'SaaS metrics views', 'operations consoles'],
  Text: ['landing-page headings', 'product launches', 'editorial sections'],
  Utility: ['application interfaces', 'documentation examples', 'admin tools'],
};

const CATEGORY_CLUSTERS = [
  ['Action', 'Control', 'Form', 'Input', 'Progress', 'Rating'],
  ['Calendar', 'Chart', 'Data', 'Feedback', 'Status'],
  ['Card', 'Layout', 'Media', 'Profile', 'Review', 'Text'],
  ['Disclosure', 'Navigation', 'Overlay'],
  ['Interaction', 'Utility'],
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function readRouteSource(slug) {
  const routeDirectory = path.join(projectRoot, 'app', '(docs)', 'docs', slug);
  return ['layout.tsx', 'page.tsx']
    .map((fileName) => path.join(routeDirectory, fileName))
    .filter(existsSync)
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .join('\n');
}

function collectAttributes(source, name) {
  const values = [];
  const expression = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, 'g');
  let match;

  while ((match = expression.exec(source)) !== null) values.push(match[1]);
  return unique(values);
}

function resolveSourcePath(value, routeDirectory) {
  const basePath = value.startsWith('@/')
    ? path.join(projectRoot, value.slice(2))
    : value.startsWith('.')
      ? path.resolve(routeDirectory, value)
      : path.join(projectRoot, value);
  const candidates = [
    basePath,
    `${basePath}.tsx`,
    `${basePath}.ts`,
    path.join(basePath, 'index.tsx'),
  ];
  return candidates.find(existsSync);
}

function importedSourcePaths(source, routeDirectory) {
  const values = [];
  const expression = /from\s+["']([^"']+)["']/g;
  let match;

  while ((match = expression.exec(source)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('@/components/spectrumui/') && !importPath.startsWith('.')) continue;
    const resolved = resolveSourcePath(importPath, routeDirectory);
    if (
      resolved &&
      (importPath.startsWith('@/components/spectrumui/') ||
        resolved.startsWith(`${routeDirectory}${path.sep}`))
    ) {
      values.push(resolved);
    }
  }

  return values;
}

function packageDependencies(installScripts) {
  const packages = [];
  const expression = /^(?:npm (?:i|install)|pnpm add|yarn add|bun add)\s+(.+)$/;

  for (const script of installScripts) {
    const match = script.match(expression);
    if (!match) continue;
    for (const packageName of match[1].split(/\s+/)) {
      if (!packageName.startsWith('-')) packages.push(packageName);
    }
  }

  return packages;
}

function memberDescription(member, sourceFile, propName) {
  const comments = member.jsDoc
    ?.map((entry) => (typeof entry.comment === 'string' ? entry.comment : ''))
    .filter(Boolean);
  if (comments?.length) return comments.join(' ');
  if (propName === 'className') return 'Additional classes accepted by the component source.';
  if (propName === 'children') return 'Content rendered inside the component.';
  if (/^on[A-Z]/.test(propName)) return 'Callback exposed by the component source.';
  return `Value accepted by the ${propName} property in the exported source type.`;
}

function extractProps(sourcePaths) {
  const props = [];

  for (const sourcePath of sourcePaths) {
    const source = readFileSync(sourcePath, 'utf8');
    const sourceFile = ts.createSourceFile(
      sourcePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );

    function addMembers(typeName, members) {
      if (!/props/i.test(typeName)) return;
      for (const member of members) {
        if (!ts.isPropertySignature(member) || !member.name) continue;
        const name = member.name.getText(sourceFile).replace(/["']/g, '');
        if (name.startsWith('[')) continue;
        props.push({
          name,
          type: member.type?.getText(sourceFile) || 'unknown',
          required: !member.questionToken,
          description: memberDescription(member, sourceFile, name),
        });
      }
    }

    function visit(node) {
      if (ts.isInterfaceDeclaration(node)) addMembers(node.name.text, node.members);
      if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
        addMembers(node.name.text, node.type.members);
      }
      if (ts.isTypeAliasDeclaration(node) && ts.isIntersectionTypeNode(node.type)) {
        for (const typeNode of node.type.types) {
          if (ts.isTypeLiteralNode(typeNode)) addMembers(node.name.text, typeNode.members);
        }
      }
      if (ts.isFunctionDeclaration(node) && node.name && node.parameters[0]?.type) {
        const parameterType = node.parameters[0].type;
        if (ts.isTypeLiteralNode(parameterType))
          addMembers(`${node.name.text}Props`, parameterType.members);
        if (ts.isIntersectionTypeNode(parameterType)) {
          for (const typeNode of parameterType.types) {
            if (ts.isTypeLiteralNode(typeNode))
              addMembers(`${node.name.text}Props`, typeNode.members);
          }
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }

  const deduplicated = new Map();
  for (const prop of props) {
    const current = deduplicated.get(prop.name);
    if (!current || current.type === 'unknown') deduplicated.set(prop.name, prop);
  }
  return [...deduplicated.values()].slice(0, 20);
}

function relatedComponents(component) {
  const cluster =
    CATEGORY_CLUSTERS.find((categories) => categories.includes(component.category)) || [];
  const sameCategory = catalog.filter(
    (candidate) => candidate.slug !== component.slug && candidate.category === component.category,
  );
  const sameCluster = catalog.filter(
    (candidate) =>
      candidate.slug !== component.slug &&
      candidate.category !== component.category &&
      cluster.includes(candidate.category),
  );
  const fallback = catalog.filter(
    (candidate) => candidate.slug !== component.slug && !cluster.includes(candidate.category),
  );
  return [...sameCategory, ...sameCluster, ...fallback]
    .slice(0, 4)
    .map(({ slug, name, description }) => ({
      slug,
      name,
      description,
    }));
}

function buildComponentDocs(component) {
  const routeDirectory = path.join(projectRoot, 'app', '(docs)', 'docs', component.slug);
  const routeSource = readRouteSource(component.slug);
  const cliValues = collectAttributes(routeSource, 'cli');
  const installScripts = collectAttributes(routeSource, 'installScript');
  const installPaths = unique([
    ...collectAttributes(routeSource, 'installCodePath'),
    ...collectAttributes(routeSource, 'codePath'),
  ]);
  const demoPaths = unique([...collectAttributes(routeSource, 'path')]);
  const registryItems = cliValues
    .filter((value) => value.startsWith('@spectrumui/'))
    .map((value) => value.slice('@spectrumui/'.length))
    .map((name) => registry.items.find((item) => item.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);
  const registryFiles = registryItems.flatMap((item) => item.files || []);
  const importedPaths = importedSourcePaths(routeSource, routeDirectory);
  const resolvedPaths = unique([
    ...installPaths.map((value) => resolveSourcePath(value, routeDirectory)),
    ...demoPaths.map((value) => resolveSourcePath(value, routeDirectory)),
    ...registryFiles.map((file) => resolveSourcePath(file.path, routeDirectory)),
    ...registryFiles.map((file) => resolveSourcePath(file.target, routeDirectory)),
    ...importedPaths,
  ]);
  const fallbackPage = path.join(routeDirectory, 'page.tsx');
  const sourcePaths = resolvedPaths.length
    ? resolvedPaths
    : existsSync(fallbackPage)
      ? [fallbackPage]
      : [];
  const propSourcePaths = unique([
    ...installPaths.map((value) => resolveSourcePath(value, routeDirectory)),
    ...registryFiles.map((file) => resolveSourcePath(file.path, routeDirectory)),
    ...registryFiles.map((file) => resolveSourcePath(file.target, routeDirectory)),
    ...importedPaths.filter((filePath) =>
      filePath.includes(`${path.sep}components${path.sep}spectrumui${path.sep}`),
    ),
  ]);
  const sourceText = sourcePaths.map((filePath) => readFileSync(filePath, 'utf8')).join('\n');
  const registryDependencies = unique(
    registryItems.flatMap((item) => item.registryDependencies || []),
  );
  const shadcnDependencies = registryDependencies.filter(
    (dependency) => !dependency.startsWith('@spectrumui/'),
  );
  const dependencies = unique([
    ...registryItems.flatMap((item) => item.dependencies || []),
    ...packageDependencies(installScripts),
  ]);
  const cliCommands = unique(
    cliValues
      .map((value) => `npx shadcn@latest add ${value}`)
      .concat(installScripts.filter((value) => /shadcn@latest add/.test(value))),
  );
  const manualPaths = unique([
    ...collectAttributes(routeSource, 'installCodePath'),
    ...collectAttributes(routeSource, 'codePath'),
    ...registryFiles.map((file) => file.target || file.path),
    ...[...routeSource.matchAll(/from\s+["']@\/components\/spectrumui\/([^"']+)["']/g)].map(
      (match) => `components/spectrumui/${match[1]}.tsx`,
    ),
  ]);
  if (!manualPaths.length && existsSync(fallbackPage)) {
    manualPaths.push(path.relative(projectRoot, fallbackPage));
  }
  const hasMotion =
    /(?:framer-motion|from ["']motion\/|["']motion["'])/.test(sourceText) ||
    dependencies.some((dependency) => /motion/.test(dependency));
  const hasTailwind = /className\s*=/.test(sourceText);
  const hasShadcn = shadcnDependencies.length > 0 || /@\/components\/ui\//.test(sourceText);
  const hasRadix = /@radix-ui\//.test(sourceText);
  const hasNext = /from ["']next\//.test(sourceText);
  const hasReducedMotion = /useReducedMotion|prefers-reduced-motion|motion-reduce:/.test(
    sourceText,
  );
  const hasAria = /aria-[a-z]+|role\s*=/.test(sourceText);
  const hasKeyboard = /onKey(?:Down|Up|Press)/.test(sourceText);
  const hasResponsiveClasses = /(?:sm|md|lg|xl|2xl):/.test(sourceText);
  const hasClassNameProp = /className\??\s*:|className[,}\s]/.test(sourceText);
  const isClientComponent = /["']use client["']/.test(sourceText);
  const technologies = unique([
    sourcePaths.some((filePath) => filePath.endsWith('.tsx')) ? 'React' : undefined,
    sourcePaths.some((filePath) => /\.tsx?$/.test(filePath)) ? 'TypeScript' : undefined,
    hasTailwind ? 'Tailwind CSS' : undefined,
    hasMotion ? 'Motion' : undefined,
    hasShadcn ? 'shadcn/ui' : undefined,
    hasRadix ? 'Radix UI' : undefined,
    hasNext ? 'Next.js' : undefined,
  ]);
  const contextOptions = CONTEXTS_BY_CATEGORY[component.category] || CONTEXTS_BY_CATEGORY.Utility;
  const purpose = component.description
    .replace(/[.]$/, '')
    .replace(/^./, (letter) => letter.toLowerCase());
  const useCases = [`interfaces that need ${purpose}`, ...contextOptions.slice(0, 2)];
  const features = unique([
    'Copy-paste source that remains in your repository',
    technologies.includes('TypeScript')
      ? 'TypeScript source included with the component'
      : undefined,
    hasTailwind ? 'Tailwind CSS classes editable in the component source' : undefined,
    hasMotion ? 'Animation implemented with Motion' : undefined,
    hasShadcn
      ? `shadcn/ui dependencies: ${shadcnDependencies.join(', ') || 'local UI primitives'}`
      : undefined,
    registryDependencies.some((dependency) => dependency.startsWith('@spectrumui/'))
      ? `Spectrum UI registry dependencies: ${registryDependencies
          .filter((dependency) => dependency.startsWith('@spectrumui/'))
          .join(', ')}`
      : undefined,
    hasResponsiveClasses ? 'Responsive Tailwind variants present in the source' : undefined,
    hasReducedMotion ? 'Reduced-motion handling present in the source' : undefined,
  ]);
  const accessibility = unique([
    hasRadix
      ? 'The source uses Radix UI primitives for the interactions detected on this component.'
      : undefined,
    hasAria
      ? 'The source includes ARIA attributes or roles; preserve them when customizing the component.'
      : undefined,
    hasKeyboard
      ? 'The source includes keyboard event handling; verify it alongside pointer behavior.'
      : undefined,
    hasReducedMotion
      ? 'The source checks reduced-motion preferences or includes motion-reduce styles.'
      : hasMotion
        ? 'No reduced-motion marker was detected; add or verify a reduced-motion path before production use.'
        : undefined,
    'Test focus order, keyboard operation, labels, contrast, and screen-reader output in the final application context.',
  ]);
  const customization = unique([
    hasTailwind
      ? 'Edit the Tailwind utility classes in the copied source to match your spacing, color, and typography tokens.'
      : undefined,
    hasClassNameProp
      ? 'Use the documented className surface for local layout adjustments, then edit the source for structural changes.'
      : 'Edit the copied source directly for visual or structural changes.',
    hasMotion
      ? 'Adjust Motion transitions in the source and keep the reduced-motion behavior aligned with the final interaction.'
      : undefined,
  ]);
  const installationAnswer = cliCommands.length
    ? `Run ${cliCommands.join(' or ')}. The page also exposes the source for manual installation.`
    : `No registry CLI command is declared for ${component.name}. Use the manual source shown on the page${manualPaths[0] ? ` at ${manualPaths[0]}` : ''}.`;
  const shadcnAnswer = hasShadcn
    ? `${component.name} uses ${shadcnDependencies.length ? `the ${shadcnDependencies.join(', ')} shadcn/ui dependencies` : 'local shadcn/ui primitives'}${hasRadix ? ' and imports Radix UI directly' : ''}.`
    : `No shadcn/ui or Radix UI dependency was detected in the documented ${component.name} source.`;
  const accessibilityAnswer =
    hasReducedMotion || hasAria || hasKeyboard || hasRadix
      ? `The source includes ${unique([
          hasRadix ? 'Radix UI primitives' : undefined,
          hasAria ? 'ARIA markup' : undefined,
          hasKeyboard ? 'keyboard handlers' : undefined,
          hasReducedMotion ? 'reduced-motion handling' : undefined,
        ]).join(', ')}. Test the finished interface with keyboard and screen-reader workflows.`
      : `No component-specific accessibility mechanism was detected automatically. Test keyboard operation, focus, labels, contrast, and screen-reader output before shipping.`;
  const faqs = [
    {
      question: `Is ${component.name} free to use in commercial projects?`,
      answer: `Yes. The public ${component.name} source is available under the Apache License 2.0, including for commercial use, subject to the LICENSE terms.`,
    },
    { question: `How do I install ${component.name}?`, answer: installationAnswer },
    {
      question: `Does ${component.name} require Motion?`,
      answer: hasMotion
        ? `Yes. Motion usage was detected in the documented source or registry dependencies for ${component.name}.`
        : `No Motion dependency was detected in the documented source or registry entry for ${component.name}.`,
    },
    { question: `Does ${component.name} use shadcn/ui or Radix UI?`, answer: shadcnAnswer },
    {
      question: `Can I use ${component.name} in Next.js?`,
      answer: `The documented React source is used in this Next.js application.${isClientComponent ? ' Keep its use client directive when copying it into the App Router.' : ''} Install the detected dependencies and verify any application-specific data or image configuration.`,
    },
    {
      question: `What accessibility checks should I run for ${component.name}?`,
      answer: accessibilityAnswer,
    },
  ];

  return {
    ...component,
    technologies,
    dependencies,
    registryDependencies,
    installation: {
      cliCommands,
      dependencyCommands: installScripts.filter((value) => !/shadcn@latest add/.test(value)),
      manualPaths,
    },
    coverage: {
      installation: /<PreviewCodeCard|<Steppers[\s\S]*?withInstall|>Installation</.test(
        routeSource,
      ),
      usage: />Usage</.test(routeSource),
      props: /<PropsTable|>API Reference<|>Properties</.test(routeSource),
    },
    props: extractProps(propSourcePaths.length ? propSourcePaths : sourcePaths),
    useCases,
    features,
    accessibility,
    customization,
    related: relatedComponents(component),
    faqs,
  };
}

const output = `${JSON.stringify(catalog.map(buildComponentDocs), null, 2)}\n`;

if (process.argv.includes('--write')) {
  writeFileSync(outputPath, output);
  console.log(`Generated ${path.relative(projectRoot, outputPath)} for ${catalog.length} routes`);
} else if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== output) {
    console.error(`Stale generated file: ${path.relative(projectRoot, outputPath)}`);
    process.exit(1);
  }
  console.log(`Component documentation data is current for ${catalog.length} routes`);
} else {
  console.error('Usage: node scripts/generate-component-docs.mjs --write | --check');
  process.exit(1);
}
