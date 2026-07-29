'use client';

import { useState } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { ArrowUpRight, Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { InstallFigure } from '@/components/blocks/install-figure';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { Copy1Icon } from '@/app/(docs)/layout-parts/docs-icons';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';

interface CodeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  slug: string;
  source: string;
}

/**
 * The code surface for a block: a right-to-left drawer with the three install
 * paths — CLI, MCP, and the raw source — all reusing the docs code-card parts
 * (same icons, same Shiki themes, same auth gate). Copying any of the three
 * requires login, exactly like /docs/<component>.
 */
export function CodeDrawer({ open, onOpenChange, name, slug, source }: CodeDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-5 sm:max-w-[600px] sm:p-6"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-[17px] tracking-[-0.2px]">{name}</SheetTitle>
          <SheetDescription className="font-mono text-[11.5px]">
            components/spectrumui/blocks/ai-assistants/{slug}.tsx
          </SheetDescription>
        </SheetHeader>

        {/* 1 — CLI: package-manager tabs, same figure as the docs pages. */}
        <section aria-labelledby={`${slug}-install`} className="mt-6">
          <h3
            id={`${slug}-install`}
            className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600"
          >
            Installation
          </h3>
          <InstallFigure cli={`@spectrumui/${slug}`} componentName={slug} />
        </section>

        {/* 2 — MCP: the prompt an agent turns into an install. */}
        <McpSection slug={slug} />

        {/* 3 — Manual: the source, Shiki-highlighted and login-gated. */}
        <section aria-labelledby={`${slug}-code`} className="mt-7">
          <h3
            id={`${slug}-code`}
            className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600"
          >
            Code
          </h3>
          <CodeHighlight code={source} title={`${slug}.tsx`} requireAuth />
        </section>
      </SheetContent>
    </Sheet>
  );
}

function McpSection({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();
  const prompt = `Install the ${slug} block from Spectrum UI`;

  // Same gate + events as the docs PackageChip, so analytics stay comparable.
  function handleCopy() {
    if (!isAuthenticated) {
      trackEvent({ name: 'copy_mcp_prompt_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent({
      name: 'copy_mcp_prompt_clicked',
      properties: { authenticated: true, component: slug },
    });
    posthog.capture('mcp_prompt_copied', { component: slug });
  }

  return (
    <section aria-labelledby={`${slug}-mcp`} className="mt-7">
      <h3
        id={`${slug}-mcp`}
        className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-600"
      >
        MCP
      </h3>
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-3 px-3.5 py-3">
          <p className="min-w-0 truncate font-mono text-xs text-black/60 dark:text-white/60">
            {prompt}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-7 shrink-0 items-center gap-[3px] rounded-lg border border-[#e5e5e5] bg-white px-1.5 font-mono text-xs font-medium leading-4 text-black/60 transition hover:text-black dark:border-white/10 dark:bg-neutral-900 dark:text-white/60 dark:hover:text-white"
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
            {copied ? (
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy1Icon className="size-3.5" />
            )}
          </button>
        </div>
        <div className="border-t border-neutral-200 px-3.5 py-2.5 dark:border-neutral-800">
          <p className="text-xs leading-[1.6] text-neutral-500 dark:text-neutral-400">
            Paste this into Cursor, Claude Code, or any editor connected to the
            Spectrum UI MCP server, and the agent installs the block for you.{' '}
            <Link
              href="/docs/mcp"
              className="group inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200"
            >
              Set up MCP
              <ArrowUpRight className="size-3 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
