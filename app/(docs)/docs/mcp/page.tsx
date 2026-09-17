import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';
import { PageSectionTitle } from '@/app/(docs)/docs/components/page-template';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { InlineCode } from '@/components/ui/inline-code';

import QuickStart, { CODEX_CONFIG, MCP_CONFIG } from './quick-start';
import CopyPageButton from './copy-page-button';

export const metadata: Metadata = baseMetadata({
  title: 'MCP Server',
  description:
    'Use Spectrum UI with AI coding assistants like Claude, Cursor, and Windsurf. Browse, search, and install components directly from your AI editor via the @spectrumui/mcp server.',
  keywords: [
    'MCP server',
    'Spectrum UI MCP',
    'AI component installer',
    'Claude components',
    'Cursor MCP',
    'Model Context Protocol',
    'install React components AI',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/mcp',
});

/* ── Typographic primitives (docs scale) ─────────────────────────────────── */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

/** Major section: hairline separator + generous grouping + Cal Sans h2 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-black/6 pt-8 dark:border-white/[0.07]">
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
  <p className="mb-4 text-[16px] leading-[27px] text-neutral-600 dark:text-neutral-400">
    {children}
  </p>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium text-neutral-900 dark:text-neutral-50">{children}</strong>
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
    className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900 dark:text-neutral-50 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
  >
    {children}
  </Link>
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
          <tr className="border-b border-black/8 dark:border-white/10">
            <th className="w-[220px] px-4 pb-2.5 pt-1 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {head[0]}
            </th>
            <th className="px-4 pb-2.5 pt-1 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([left, right], i) => (
            <tr key={i} className="border-b border-black/6 dark:border-white/[0.07]">
              <td className="px-4 py-2.5 align-middle text-sm leading-[22px]">{left}</td>
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
      schemaType="techArticle"
      keywords={['MCP server', 'Claude', 'Cursor', 'AI components']}
    >
      <main className="[font-family:var(--font-inter),Inter,system-ui,sans-serif] mx-auto w-full min-w-0 max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[26px] font-semibold leading-9 tracking-[-0.02em] text-neutral-900 dark:text-neutral-50 sm:text-[28px]">
            MCP Server
          </h1>
          <CopyPageButton />
        </div>
        <p className="mt-1.5 max-w-xl text-base leading-[26px] text-neutral-500 dark:text-neutral-400">
          Use the Spectrum UI MCP server to browse, search, and install components from your AI
          assistant.
        </p>

        {/* Intro */}
        <div className="mt-8">
          <P>
            <A href="https://modelcontextprotocol.io">Model Context Protocol</A> lets an AI
            assistant call tools directly. With the Spectrum UI server connected, you can ask it to
            &quot;add the kanban board&quot; or &quot;build a landing page with Spectrum UI&quot;
            and it browses the registry and runs the install itself. It ships as{' '}
            <InlineCode>@spectrumui/mcp</InlineCode> and runs through <InlineCode>npx</InlineCode> —
            nothing to install globally.
          </P>
        </div>

        {/* Quick Start */}
        <Section title="Quick Start">
          <P>
            Pick your client. To wire it up by hand instead, see{' '}
            <A href="#configuration">Configuration</A>.
          </P>
          <QuickStart />
        </Section>

        {/* Configuration */}
        <Section title="Configuration">
          <P>
            Every client but Codex takes the same JSON. Codex takes the same server as a TOML table.
          </P>
          <div className="my-5">
            <CodeHighlight code={MCP_CONFIG} lang="json" title="mcp.json" requireAuth={false} />
          </div>
          <div className="my-5">
            <CodeHighlight
              code={CODEX_CONFIG}
              lang="toml"
              title="~/.codex/config.toml"
              requireAuth={false}
            />
          </div>
          <DocsTable
            head={['Client', 'Config file']}
            rows={[
              [<Strong key="c">Claude Code</Strong>, <InlineCode key="p">.mcp.json</InlineCode>],
              [
                <Strong key="c">Claude Desktop</Strong>,
                <InlineCode key="p">claude_desktop_config.json</InlineCode>,
              ],
              [<Strong key="c">Cursor</Strong>, <InlineCode key="p">.cursor/mcp.json</InlineCode>],
              [
                <Strong key="c">Codex</Strong>,
                <InlineCode key="p">~/.codex/config.toml</InlineCode>,
              ],
              [
                <Strong key="c">Windsurf</Strong>,
                <InlineCode key="p">~/.codeium/windsurf/mcp_config.json</InlineCode>,
              ],
              [<Strong key="c">VS Code</Strong>, <InlineCode key="p">.vscode/mcp.json</InlineCode>],
            ]}
          />
          <P>
            You need Node 18 or newer. Installing a component also needs a{' '}
            <InlineCode>components.json</InlineCode> at your project root — that is, a project
            shadcn has already been initialised in.
          </P>
        </Section>

        {/* Tools */}
        <Section title="Available Tools">
          <DocsTable
            head={['Tool', 'Description']}
            rows={[
              [
                <InlineCode key="t">list_components</InlineCode>,
                'List all components, optionally filtered by category',
              ],
              [
                <InlineCode key="t">search_components</InlineCode>,
                'Fuzzy search by keyword, ranked by relevance',
              ],
              [
                <InlineCode key="t">get_component</InlineCode>,
                'Full metadata and install instructions for one component',
              ],
              [
                <InlineCode key="t">list_categories</InlineCode>,
                'All categories with component counts',
              ],
              [
                <InlineCode key="t">install_component</InlineCode>,
                'Runs the CLI to install into your project',
              ],
            ]}
          />
          <P>
            <InlineCode>install_component</InlineCode> shells out to the shadcn CLI —{' '}
            <InlineCode>bunx</InlineCode> first, falling back to <InlineCode>npx</InlineCode>:
          </P>
          <div className="my-5">
            <CodeHighlight
              code={`bunx --bun shadcn@latest add @spectrumui/<component>\n# or\nnpx shadcn@latest add @spectrumui/<component>`}
              lang="bash"
              requireAuth={false}
            />
          </div>
        </Section>

        {/* Troubleshooting */}
        <Section title="Troubleshooting">
          <PageSectionTitle className="mt-4">The server never appears</PageSectionTitle>
          <P>
            Quit the editor completely and reopen it — closing the window is not enough in Claude
            Desktop. In Claude Code, run <InlineCode>/mcp</InlineCode> to see the server&apos;s
            status; in Codex, run <InlineCode>codex mcp list</InlineCode>.
          </P>

          <PageSectionTitle>Installs fail</PageSectionTitle>
          <P>
            Run the install command yourself in a terminal first. If that fails too, the project has
            no <InlineCode>components.json</InlineCode> and needs{' '}
            <InlineCode>npx shadcn@latest init</InlineCode>.
          </P>

          <PageSectionTitle>Cursor does not list it</PageSectionTitle>
          <P>
            <InlineCode>mcp.json</InlineCode> has to sit in <InlineCode>.cursor/</InlineCode> at the
            project root, not in a global folder. Reload the window after adding it.
          </P>
        </Section>

        {/* Learn more */}
        <Section title="Learn More">
          <div className="flex flex-col gap-3">
            {[
              {
                label: 'npm — @spectrumui/mcp',
                href: 'https://www.npmjs.com/package/@spectrumui/mcp',
              },
              {
                label: 'GitHub — spectrum-ui repo',
                href: 'https://github.com/arihantcodes/spectrum-ui',
              },
              {
                label: 'Model Context Protocol spec',
                href: 'https://modelcontextprotocol.io',
              },
              {
                label: 'shadcn/ui CLI docs',
                href: 'https://ui.shadcn.com/docs/cli',
              },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-1.5 text-[16px] leading-7 text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900 dark:text-neutral-50 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
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
