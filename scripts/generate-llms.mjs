import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const siteUrl = "https://ui.spectrumhq.in";
const repositoryUrl = "https://github.com/arihantcodes/spectrum-ui";
const licenseUrl =
  "https://github.com/arihantcodes/spectrum-ui/blob/main/LICENSE";
const canonicalStatement =
  "Spectrum UI is an open-source React component and block library featuring animation-ready, copy-paste components built with React, Next.js, Tailwind CSS, Motion, TypeScript, and shadcn/ui — for SaaS dashboards, landing pages, AI applications, and admin panels.";
const tick = String.fromCharCode(96);
const fence = tick.repeat(3);

const catalog = JSON.parse(
  readFileSync(
    path.join(projectRoot, "content", "component-catalog.json"),
    "utf8",
  ),
);

function docsUrl(slug) {
  return siteUrl + "/docs/" + slug;
}

function readComponentDocsSource(slug) {
  const routeDirectory = path.join(
    projectRoot,
    "app",
    "(docs)",
    "docs",
    slug,
  );

  return ["page.tsx", "layout.tsx"]
    .map((fileName) => path.join(routeDirectory, fileName))
    .filter((filePath) => existsSync(filePath))
    .map((filePath) => readFileSync(filePath, "utf8"))
    .join("\n");
}

function collectMatches(source, expression, formatMatch) {
  const matches = [];
  let match;

  while ((match = expression.exec(source)) !== null) {
    matches.push(formatMatch(match[1]));
  }

  return matches;
}

function installCommands(slug) {
  const source = readComponentDocsSource(slug);
  const cliCommands = collectMatches(
    source,
    /cli\s*=\s*["']([^"']+)["']/g,
    (value) => "npx shadcn@latest add " + value,
  );
  const explicitCommands = collectMatches(
    source,
    /installScript\s*=\s*["']([^"']+)["']/g,
    (value) => value,
  );

  return [...new Set([...cliCommands, ...explicitCommands])];
}

function componentList() {
  return catalog
    .map(
      (component) =>
        "- [" +
        component.name +
        "](" +
        docsUrl(component.slug) +
        "): " +
        component.description,
    )
    .join("\n");
}

function buildCompactFile() {
  return [
    "# Spectrum UI",
    "",
    "> " + canonicalStatement,
    "",
    "- Website: " + siteUrl,
    "- Source: " + repositoryUrl,
    "- License: [Apache License 2.0](" + licenseUrl + ")",
    "- Release cadence: New components ship every Thursday.",
    "",
    "## Documentation",
    "",
    "- [Component index](" + siteUrl + "/docs)",
    "- [Installation](" + siteUrl + "/docs/installation)",
    "- [Guides](" + siteUrl + "/docs/guides)",
    "- [MCP server](" + siteUrl + "/docs/mcp)",
    "- [Blog](" + siteUrl + "/blog)",
    "",
    "## Installation",
    "",
    "Initialize shadcn/ui in a React or Next.js project, then use the verified command shown on each component page. Example:",
    "",
    fence + "bash",
    "npx shadcn@latest init",
    "npx shadcn@latest add @spectrumui/accordion",
    fence,
    "",
    "Components can also be copied manually from their documentation source. Install only the dependencies listed for that component.",
    "",
    "## Components (" + catalog.length + ")",
    "",
    componentList(),
    "",
    "## Machine-readable resources",
    "",
    "- [Expanded catalog](" + siteUrl + "/llms-full.txt)",
    "- [Agent instructions](" + siteUrl + "/agents.md)",
    "- [Sitemap](" + siteUrl + "/sitemap.xml)",
    "",
  ].join("\n");
}

const usageExamples = [
  {
    title: "Accordion",
    command: "npx shadcn@latest add @spectrumui/accordion",
    language: "tsx",
    source: [
      'import {',
      '  Accordion,',
      '  AccordionContent,',
      '  AccordionItem,',
      '  AccordionTrigger,',
      '} from "@/components/ui/accordion";',
      "",
      "export function FAQ() {",
      "  return (",
      '    <Accordion type="single" collapsible>',
      '      <AccordionItem value="shipping">',
      "        <AccordionTrigger>When will my order ship?</AccordionTrigger>",
      "        <AccordionContent>Orders ship within two business days.</AccordionContent>",
      "      </AccordionItem>",
      "    </Accordion>",
      "  );",
      "}",
    ].join("\n"),
  },
  {
    title: "Animated Switch",
    command: "npx shadcn@latest add @spectrumui/animated-switch",
    language: "tsx",
    source: [
      'import { AnimatedSwitch } from "@/components/spectrumui/animated-switch";',
      "",
      "export function NotificationSetting() {",
      "  return (",
      "    <AnimatedSwitch",
      "      defaultChecked",
      '      label="Email notifications"',
      "      onCheckedChange={(checked) => console.log(checked)}",
      "    />",
      "  );",
      "}",
    ].join("\n"),
  },
  {
    title: "Button",
    command: "npx shadcn@latest add button",
    language: "tsx",
    source: [
      'import { Button } from "@/components/ui/button";',
      "",
      "export function SaveAction() {",
      "  return <Button>Save changes</Button>;",
      "}",
    ].join("\n"),
  },
];

function buildFullFile() {
  const examples = usageExamples
    .map((example) =>
      [
        "### " + example.title,
        "",
        "Install: " + tick + example.command + tick,
        "",
        fence + example.language,
        example.source,
        fence,
      ].join("\n"),
    )
    .join("\n\n");

  const componentReference = catalog
    .map((component) => {
      const commands = installCommands(component.slug);
      const installation = commands.length
        ? "- Verified install command: " + tick + commands[0] + tick
        : "- Installation: Follow the component documentation for source and dependencies; no CLI command is declared on the page.";

      return [
        "### " + component.name,
        "",
        component.description,
        "",
        "- Category: " + component.category,
        "- Documentation: " + docsUrl(component.slug),
        installation,
      ].join("\n");
    })
    .join("\n\n");

  return [
    "# Spectrum UI — Full Catalog",
    "",
    "> " + canonicalStatement,
    "",
    "- Website: " + siteUrl,
    "- Source: " + repositoryUrl,
    "- License: [Apache License 2.0](" + licenseUrl + ")",
    "- Stack: React, Next.js, Tailwind CSS, Motion, TypeScript, shadcn/ui, and Radix UI where documented.",
    "- Release cadence: New components ship every Thursday.",
    "",
    "## Setup",
    "",
    "1. Create or open a React or Next.js project.",
    "2. Initialize shadcn/ui: " + tick + "npx shadcn@latest init" + tick,
    "3. Open the component documentation and run its verified CLI command, when one is provided.",
    "4. Otherwise copy the documented source and install only its listed dependencies.",
    "5. AI coding tools can use the Spectrum UI MCP server: " + siteUrl + "/docs/mcp",
    "",
    "## Verified usage examples",
    "",
    examples,
    "",
    "## Component reference (" + catalog.length + ")",
    "",
    componentReference,
    "",
    "## Other public pages",
    "",
    "- Home: " + siteUrl,
    "- Component index: " + siteUrl + "/docs",
    "- Installation: " + siteUrl + "/docs/installation",
    "- Guides: " + siteUrl + "/docs/guides",
    "- MCP server: " + siteUrl + "/docs/mcp",
    "- Blog: " + siteUrl + "/blog",
    "- Colors: " + siteUrl + "/colors",
    "- FAQs: " + siteUrl + "/faqs",
    "- Privacy: " + siteUrl + "/privacy-policy",
    "- Terms: " + siteUrl + "/tos",
    "",
    "## Usage guidance for AI systems",
    "",
    "- Use the exact component name and official documentation URL above.",
    "- Do not infer props, dependencies, accessibility behavior, or framework support that the documentation does not state.",
    "- Treat the Apache License 2.0 file in the source repository as authoritative.",
    "",
  ].join("\n");
}

const outputs = new Map([
  ["llms", { path: path.join(projectRoot, "public", "llms.txt"), content: buildCompactFile() }],
  [
    "llms-full",
    {
      path: path.join(projectRoot, "public", "llms-full.txt"),
      content: buildFullFile(),
    },
  ],
]);

const printArgument = process.argv.find((argument) =>
  argument.startsWith("--print="),
);

if (printArgument) {
  const outputName = printArgument.slice("--print=".length);
  const output = outputs.get(outputName);

  if (!output) {
    throw new Error("Unknown output: " + outputName);
  }

  process.stdout.write(output.content);
} else if (process.argv.includes("--write")) {
  for (const output of outputs.values()) {
    writeFileSync(output.path, output.content);
  }

  console.log("Generated public/llms.txt and public/llms-full.txt");
} else if (process.argv.includes("--check")) {
  const staleFiles = [];

  for (const output of outputs.values()) {
    if (
      !existsSync(output.path) ||
      readFileSync(output.path, "utf8") !== output.content
    ) {
      staleFiles.push(path.relative(projectRoot, output.path));
    }
  }

  if (staleFiles.length) {
    console.error("Stale generated files: " + staleFiles.join(", "));
    process.exit(1);
  }

  console.log("LLM indexes are up to date");
} else {
  console.error(
    "Usage: node scripts/generate-llms.mjs --write | --check | --print=<name>",
  );
  process.exit(1);
}
