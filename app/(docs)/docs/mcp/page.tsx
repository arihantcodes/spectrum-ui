import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";
import { PageSectionTitle } from "@/app/(docs)/docs/components/page-template";
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import { InlineCode } from "@/components/ui/inline-code";

import QuickStart, { MCP_CONFIG } from "./quick-start";
import CopyPageButton from "./copy-page-button";

export const metadata: Metadata = baseMetadata({
  title: "MCP Server",
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

/* ── Typographic primitives (docs scale) ─────────────────────────────────── */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

/** Major section: hairline separator + generous grouping + Cal Sans h2 */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-black/[0.06] pt-8 dark:border-white/[0.07]">
      <h2
        id={slugify(title)}
        className="mb-3 scroll-m-24 text-xl font-semibold leading-7 tracking-[-0.02em] text-neutral-900 dark:text-neutral-50"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-[15px] leading-[26px] text-neutral-600 dark:text-neutral-400">
    {children}
  </p>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium text-neutral-900 dark:text-neutral-50">
    {children}
  </strong>
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    {...(href.startsWith("http")
      ? { target: "_blank", rel: "noreferrer" }
      : {})}
    className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900 dark:text-neutral-50 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
  >
    {children}
  </Link>
);

const Ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="mb-4 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-[26px] text-neutral-600 marker:text-neutral-300 dark:text-neutral-400 dark:marker:text-neutral-600">
    {children}
  </ul>
);

function DocsTable({
  head,
  rows,
}: {
  head: [string, string];
  rows: [React.ReactNode, React.ReactNode][];
}) {
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-black/[0.08] dark:border-white/10">
            <th className="w-[220px] px-4 pb-2.5 pt-1 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              {head[0]}
            </th>
            <th className="px-4 pb-2.5 pt-1 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([left, right], i) => (
            <tr
              key={i}
              className="border-b border-black/[0.06] dark:border-white/[0.07]"
            >
              <td className="px-4 py-2.5 align-middle text-sm leading-[22px]">
                {left}
              </td>
              <td className="px-4 py-2.5 align-middle text-sm leading-[22px] text-neutral-600 dark:text-neutral-400">
                {right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function McpPage() {
  return (
    <SEOWrapper
      componentName="MCP Server"
      description="Use Spectrum UI with AI coding assistants via the Model Context Protocol."
      url="https://ui.spectrumhq.in/docs/mcp"
      keywords={["MCP server", "Claude", "Cursor", "AI components"]}
    >
      <main className="mx-auto w-full min-w-0 max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[26px] font-semibold leading-9 tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 sm:text-[28px]">
            MCP Server
          </h1>
          <CopyPageButton />
        </div>
        <p className="mt-1.5 max-w-xl text-base leading-[26px] text-neutral-500 dark:text-neutral-400">
          Use the Spectrum UI MCP server to browse, search, and install
          components from your AI assistant.
        </p>

        {/* Intro */}
        <div className="mt-8">
          <P>
            The Spectrum UI MCP server lets AI assistants interact with the
            component registry. You can browse available components, search for
            specific ones, and install them directly into your project using
            natural language.
          </P>
          <P>
            For example, you can ask an AI assistant to &quot;Build a landing
            page using Spectrum UI components&quot; or &quot;Add the kanban
            board to my project&quot;.
          </P>
          <P>
            The server runs via <InlineCode>npx</InlineCode> from the{" "}
            <InlineCode>@spectrumui/mcp</InlineCode> package — no global
            install needed.
          </P>
        </div>

        {/* Quick Start */}
        <Section title="Quick Start">
          <P>
            Select your MCP client and follow the instructions to configure the
            Spectrum UI MCP server. If you&apos;d like to do it manually, see
            the <A href="#configuration">Configuration</A> section.
          </P>
          <QuickStart />
        </Section>

        {/* What is MCP */}
        <Section title="What is MCP?">
          <P>
            <A href="https://modelcontextprotocol.io">
              Model Context Protocol (MCP)
            </A>{" "}
            is an open protocol that enables AI assistants to securely connect
            to external data sources and tools. With the Spectrum UI MCP
            server, your AI assistant gains direct access to:
          </P>
          <Ul>
            <li>
              <Strong>Browse Components</Strong> — list every component in the
              Spectrum UI registry, optionally filtered by category
            </li>
            <li>
              <Strong>Search the Registry</Strong> — find components by name or
              functionality, ranked by relevance
            </li>
            <li>
              <Strong>Install with Natural Language</Strong> — add components
              using simple conversational prompts like &quot;add a login
              form&quot;
            </li>
            <li>
              <Strong>Get Component Details</Strong> — full metadata,
              dependencies, and install instructions for any component
            </li>
          </Ul>
        </Section>

        {/* How it works */}
        <Section title="How It Works">
          <P>
            When you ask your assistant for a component, it calls one of the
            MCP tools. The server fetches the latest registry from{" "}
            <InlineCode>spectrumhq.in</InlineCode>, and for installs it runs
            the shadcn CLI under the hood — trying{" "}
            <InlineCode>bunx</InlineCode> first, then falling back to{" "}
            <InlineCode>npx</InlineCode> automatically:
          </P>
          <div className="my-5">
            <CodeHighlight
              code={`# What runs behind the scenes (Bun):\nbunx --bun shadcn@latest add @spectrumui/<component-name>\n\n# Fallback (npm/pnpm/yarn):\nnpx shadcn@latest add @spectrumui/<component-name>`}
              lang="bash"
              requireAuth={false}
            />
          </div>
          <P>
            You can also run these commands manually — they&apos;re shown on
            every component&apos;s docs page in the Installation section.
          </P>
        </Section>

        {/* Tools */}
        <Section title="Available Tools">
          <P>The MCP server exposes five tools to your AI assistant:</P>
          <DocsTable
            head={["Tool", "Description"]}
            rows={[
              [
                <InlineCode key="t">list_components</InlineCode>,
                "List all components, optionally filtered by category",
              ],
              [
                <InlineCode key="t">search_components</InlineCode>,
                "Fuzzy search by keyword, ranked by relevance",
              ],
              [
                <InlineCode key="t">get_component</InlineCode>,
                "Full metadata and install instructions for a specific component",
              ],
              [
                <InlineCode key="t">list_categories</InlineCode>,
                "All categories (AI, Forms, Animation…) with component counts",
              ],
              [
                <InlineCode key="t">install_component</InlineCode>,
                "Runs the CLI to install directly into your project",
              ],
            ]}
          />
        </Section>

        {/* Configuration */}
        <Section title="Configuration">
          <P>
            All clients share the same server definition — a command plus its
            arguments. Add it to your client&apos;s MCP config file:
          </P>
          <div className="my-5">
            <CodeHighlight
              code={MCP_CONFIG}
              lang="json"
              title="mcp.json"
              requireAuth={false}
            />
          </div>
          <P>Each client reads its configuration from a different location:</P>
          <DocsTable
            head={["Client", "Config file"]}
            rows={[
              [
                <Strong key="c">Claude Code</Strong>,
                <InlineCode key="p">.mcp.json (project root)</InlineCode>,
              ],
              [
                <Strong key="c">Claude Desktop</Strong>,
                <InlineCode key="p">claude_desktop_config.json</InlineCode>,
              ],
              [
                <Strong key="c">Cursor</Strong>,
                <InlineCode key="p">.cursor/mcp.json</InlineCode>,
              ],
              [
                <Strong key="c">Windsurf</Strong>,
                <InlineCode key="p">
                  ~/.codeium/windsurf/mcp_config.json
                </InlineCode>,
              ],
              [
                <Strong key="c">VS Code</Strong>,
                <InlineCode key="p">.vscode/mcp.json</InlineCode>,
              ],
            ]}
          />
        </Section>

        {/* Example prompts */}
        <Section title="Example Prompts">
          <PageSectionTitle className="mt-4">Browse & Search</PageSectionTitle>
          <Ul>
            <li>
              &quot;Show me all available components in the Spectrum UI
              registry&quot;
            </li>
            <li>&quot;Search for an animated card in Spectrum UI&quot;</li>
            <li>&quot;What categories does Spectrum UI have?&quot;</li>
          </Ul>

          <PageSectionTitle>Install Components</PageSectionTitle>
          <Ul>
            <li>
              &quot;Install the kanban board from Spectrum UI into my
              project&quot;
            </li>
            <li>
              &quot;Add the button, dialog and card components to my
              project&quot;
            </li>
            <li>
              &quot;Create a contact form using Spectrum UI components&quot;
            </li>
          </Ul>

          <PageSectionTitle>Component Details</PageSectionTitle>
          <Ul>
            <li>&quot;Get details for the event-calendar component&quot;</li>
            <li>
              &quot;What dependencies does the animated drawer need?&quot;
            </li>
          </Ul>
        </Section>

        {/* Requirements */}
        <Section title="Requirements">
          <DocsTable
            head={["Requirement", "Details"]}
            rows={[
              [<Strong key="r">Node.js</Strong>, "v18 or higher"],
              [
                <Strong key="r">Package manager</Strong>,
                "npm, pnpm, yarn, or bun",
              ],
              [
                <Strong key="r">Project stack</Strong>,
                "Next.js + Tailwind CSS + shadcn/ui (for install_component)",
              ],
              [
                <Strong key="r">AI editor</Strong>,
                "Claude Code, Claude Desktop, Cursor, Windsurf, VS Code, or any MCP-compatible editor",
              ],
            ]}
          />
        </Section>

        {/* Troubleshooting */}
        <Section title="Troubleshooting">
          <PageSectionTitle className="mt-4">
            MCP Not Responding
          </PageSectionTitle>
          <P>
            Make sure you fully quit and restarted your editor — in Claude
            Desktop, right-click the dock icon and choose Quit, not just close
            the window. In Claude Code, run <InlineCode>/mcp</InlineCode> to
            check the server status.
          </P>

          <PageSectionTitle>Installation Failures</PageSectionTitle>
          <P>
            Run the install command manually in your terminal first to confirm
            shadcn is set up. You need a{" "}
            <InlineCode>components.json</InlineCode> file at your project root.
          </P>

          <PageSectionTitle>Registry Access Issues</PageSectionTitle>
          <P>
            The MCP server fetches the latest registry from{" "}
            <InlineCode>spectrumhq.in</InlineCode>. Check your internet
            connection, or open an issue on GitHub.
          </P>

          <PageSectionTitle>Server Not Showing in Cursor</PageSectionTitle>
          <P>
            The <InlineCode>mcp.json</InlineCode> file must be in the{" "}
            <InlineCode>.cursor/</InlineCode> folder at your project root (not
            a global location). Reload the window after adding it.
          </P>
        </Section>

        {/* Learn more */}
        <Section title="Learn More">
          <div className="flex flex-col gap-3">
            {[
              {
                label: "npm — @spectrumui/mcp",
                href: "https://www.npmjs.com/package/@spectrumui/mcp",
              },
              {
                label: "GitHub — spectrum-ui repo",
                href: "https://github.com/arihantcodes/spectrum-ui",
              },
              {
                label: "Model Context Protocol spec",
                href: "https://modelcontextprotocol.io",
              },
              {
                label: "shadcn/ui CLI docs",
                href: "https://ui.shadcn.com/docs/cli",
              },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-1.5 text-[15px] leading-6 text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900 dark:text-neutral-50 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
              >
                {label}
                <ArrowUpRight className="size-3.5 text-neutral-400 transition group-hover:text-neutral-700 dark:group-hover:text-neutral-300" />
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </SEOWrapper>
  );
}
