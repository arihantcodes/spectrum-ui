import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";
import Link from "next/link";

export const metadata: Metadata = baseMetadata({
  title: "MCP Server — Spectrum UI",
  description:
    "Use Spectrum UI with AI coding assistants like Claude, Cursor, and Windsurf. Browse, search, and install components directly from your AI editor via the @spectrumui/mcp server.",
  keywords: [
    "MCP server",
    "Spectrum UI MCP",
    "AI component installer",
    "Claude components",
    "Cursor MCP",
    "Model Context Protocol",
    "install React components AI",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/mcp",
});

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800">
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">{lang}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-neutral-100 font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center mt-0.5">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function EditorCard({
  name,
  icon,
  configPath,
  configJson,
}: {
  name: string;
  icon: React.ReactNode;
  configPath: string;
  configJson: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        {icon}
        <span className="font-semibold text-sm">{name}</span>
        <span className="ml-auto font-mono text-[11px] text-neutral-500">{configPath}</span>
      </div>
      <div className="bg-neutral-950">
        <pre className="p-5 overflow-x-auto text-sm">
          <code className="text-neutral-100 font-mono leading-relaxed">{configJson}</code>
        </pre>
      </div>
    </div>
  );
}

const CLAUDE_CONFIG = `{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

const CURSOR_CONFIG = `{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

const WINDSURF_CONFIG = `{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

export default function McpPage() {
  return (
    <SEOWrapper
      componentName="MCP Server"
      description="Use Spectrum UI with AI coding assistants via the Model Context Protocol."
      url="https://ui.spectrumhq.in/docs/mcp"
      keywords={["MCP server", "Claude", "Cursor", "AI components"]}
    >
      <main className="relative py-6 lg:py-8">
        <div className="mx-auto w-full min-w-0 max-w-3xl">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              New — Just shipped
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              MCP Server
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Install and use Spectrum UI components directly from your AI coding assistant.
              No copy-pasting, no tab-switching — just ask Claude, Cursor, or Windsurf.
            </p>
          </div>

          {/* What is MCP */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">What is an MCP server?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The <strong>Model Context Protocol (MCP)</strong> is an open standard that lets AI assistants
              talk directly to external tools and data sources. The Spectrum UI MCP server gives your
              AI assistant full access to every component in our library — so it can browse, search,
              and install components into your project with a single prompt.
            </p>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-5">
              <p className="text-sm text-muted-foreground mb-3 font-medium">Example conversation:</p>
              <div className="space-y-3">
                {[
                  { role: "you", text: "Add the AnimatedDrawer from Spectrum UI to my project" },
                  { role: "ai", text: "Searching for AnimatedDrawer in Spectrum UI registry..." },
                  { role: "ai", text: "Running: bunx --bun shadcn@latest add @spectrumui/animateddrawer" },
                  { role: "ai", text: "✅ Done! AnimatedDrawer installed to components/spectrumui/animated-drawer.tsx" },
                ].map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "you" ? "" : "opacity-80"}`}>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded self-start mt-0.5 flex-shrink-0 ${
                      msg.role === "you"
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                        : "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                    }`}>
                      {msg.role === "you" ? "You" : "AI"}
                    </span>
                    <p className="text-sm leading-relaxed pt-0.5">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Available tools */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">What the AI can do</h2>
            <p className="text-muted-foreground mb-4 text-sm">The MCP server exposes 5 tools to your AI assistant:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { tool: "list_components", desc: "List all components, optionally filtered by category" },
                { tool: "search_components", desc: "Fuzzy search by keyword — ranked by relevance" },
                { tool: "get_component", desc: "Full metadata + install instructions for a specific component" },
                { tool: "list_categories", desc: "All categories (AI, Forms, Animation…) with counts" },
                { tool: "install_component", desc: "Runs the CLI to install directly into your project" },
              ].map((t) => (
                <div key={t.tool} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-2 py-0.5 rounded">
                    {t.tool}
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Setup */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Setup</h2>

            <Step n={1} title="Make sure Node.js 18+ is installed">
              <p className="text-sm text-muted-foreground mb-2">The server runs via <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">npx</code> — no global install needed.</p>
              <CodeBlock code="node --version   # should print v18 or higher" />
            </Step>

            <Step n={2} title="Add to your AI editor config">
              <p className="text-sm text-muted-foreground mb-4">Choose your editor and paste the config:</p>

              <div className="space-y-4">
                <EditorCard
                  name="Claude Desktop"
                  configPath="~/.claude/claude_desktop_config.json"
                  configJson={CLAUDE_CONFIG}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                  }
                />
                <EditorCard
                  name="Cursor"
                  configPath=".cursor/mcp.json (project root)"
                  configJson={CURSOR_CONFIG}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  }
                />
                <EditorCard
                  name="Windsurf"
                  configPath="~/.codeium/windsurf/mcp_config.json"
                  configJson={WINDSURF_CONFIG}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-teal-500">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                    </svg>
                  }
                />
              </div>
            </Step>

            <Step n={3} title="Restart your editor">
              <p className="text-sm text-muted-foreground">
                After saving the config, fully restart the app. In Claude Desktop you should see <strong>spectrum-ui</strong> listed in the tools panel (hammer icon).
              </p>
            </Step>

            <Step n={4} title="Try it out">
              <p className="text-sm text-muted-foreground mb-3">Open a new chat and try one of these:</p>
              <div className="space-y-2">
                {[
                  "List all Spectrum UI components",
                  "Search for an animated card in Spectrum UI",
                  "Install the kanban board from Spectrum UI into my project",
                  "What categories does Spectrum UI have?",
                  "Get details for the event-calendar component",
                ].map((prompt) => (
                  <div key={prompt} className="flex items-start gap-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2.5">
                    <span className="text-neutral-400 mt-0.5">›</span>
                    <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">&quot;{prompt}&quot;</span>
                  </div>
                ))}
              </div>
            </Step>
          </section>

          {/* Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Requirements</h2>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                    <th className="text-left px-4 py-3 font-medium">Requirement</th>
                    <th className="text-left px-4 py-3 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {[
                    ["Node.js", "v18 or higher"],
                    ["Package manager", "npm, pnpm, yarn, or bun"],
                    ["Project stack", "Next.js + Tailwind CSS + shadcn/ui (for install_component)"],
                    ["AI editor", "Claude Desktop, Cursor, Windsurf, or any MCP-compatible editor"],
                  ].map(([req, detail]) => (
                    <tr key={req}>
                      <td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{req}</td>
                      <td className="px-4 py-3 text-muted-foreground">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How install works */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">How component installation works</h2>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              When you ask the AI to install a component, it runs the Spectrum UI CLI command under the hood.
              The server tries <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">bunx</code> first (faster if you have bun),
              then falls back to <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">npx</code> automatically.
            </p>
            <CodeBlock code={`# What runs behind the scenes (Bun):\nbunx --bun shadcn@latest add @spectrumui/<component-name>\n\n# Fallback (npm/pnpm/yarn):\nnpx shadcn@latest add @spectrumui/<component-name>`} />
            <p className="text-sm text-muted-foreground mt-2">
              You can also run these commands manually — they&apos;re shown in every component&apos;s docs page under the CLI tab.
            </p>
          </section>

          {/* Troubleshooting */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              {[
                {
                  q: "The server doesn't appear in Claude Desktop",
                  a: "Make sure you fully quit and restarted Claude Desktop (not just closed the window). On macOS, right-click the dock icon → Quit.",
                },
                {
                  q: "install_component fails with permission errors",
                  a: "Run the command manually in your terminal first to confirm shadcn is set up in your project. You need a components.json file at your project root.",
                },
                {
                  q: "Components not found / registry errors",
                  a: "The MCP server fetches the latest registry from spectrumhq.in. Check your internet connection, or open an issue on GitHub.",
                },
                {
                  q: "The server works but Cursor doesn't show it",
                  a: "In Cursor, the mcp.json must be in the .cursor/ folder at your project root (not a global location). Reload the window after adding it.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="rounded-xl border border-neutral-200 dark:border-neutral-800 group">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none">
                    {q}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-open:rotate-180 text-neutral-400 flex-shrink-0 ml-4">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-muted-foreground border-t border-neutral-200 dark:border-neutral-800 pt-4">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Links */}
          <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6">
            <h2 className="text-base font-semibold mb-4">Links & Resources</h2>
            <div className="space-y-2">
              {[
                { label: "npm — @spectrumui/mcp", href: "https://www.npmjs.com/package/@spectrumui/mcp" },
                { label: "GitHub — spectrum-ui repo", href: "https://github.com/arihantcodes/spectrum-ui" },
                { label: "Model Context Protocol spec", href: "https://modelcontextprotocol.io" },
                { label: "shadcn/ui CLI docs", href: "https://ui.shadcn.com/docs/cli" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {label}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </SEOWrapper>
  );
}
