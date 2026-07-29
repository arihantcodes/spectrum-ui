'use client';

import { useState } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
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
import { cn } from '@/lib/utils';

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

/**
 * Shares the InstallFigure anatomy — icon + mono label in a hairline header,
 * an icon-only copy control with the blur-crossfade check, the payload in mono
 * below — so the drawer's three cards read as one system instead of three
 * unrelated boxes.
 */
function McpSection({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();
  const prompt = `Install the ${slug} block from Spectrum UI`;

  function handleCopy() {
    if (!isAuthenticated) {
      trackEvent({ name: 'copy_mcp_prompt_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
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
      <figure className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-2.5 py-1.5 dark:border-neutral-800">
          <div className="flex min-w-0 items-center gap-2">
            <Sparkles className="size-3.5 shrink-0 text-neutral-500 dark:text-neutral-400" />
            <span className="truncate font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              agent prompt
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Prompt copied' : 'Copy agent prompt'}
            className="grid size-7 shrink-0 place-items-center rounded-md text-neutral-400 transition-[color,transform] duration-150 hover:text-neutral-700 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-200"
          >
            <span className="relative grid size-3.5 place-items-center">
              <Copy1Icon
                className={cn(
                  'absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  copied ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0',
                )}
              />
              <Check
                className={cn(
                  'absolute size-3.5 text-emerald-600 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-emerald-400',
                  copied ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]',
                )}
              />
            </span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <code className="block whitespace-nowrap px-3.5 py-3 font-mono text-[12px] leading-none">
            <span aria-hidden className="mr-2 select-none text-neutral-300 dark:text-neutral-600">
              ❯
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">{prompt}</span>
          </code>
        </div>

        <figcaption className="border-t border-neutral-200 px-3.5 py-2.5 dark:border-neutral-800">
          <p className="text-xs leading-[1.6] text-neutral-500 dark:text-neutral-400">
            Paste into Cursor, Claude Code, or any editor connected to the Spectrum
            UI MCP server — the agent installs the block for you.{' '}
            <Link
              href="/docs/mcp"
              className="group inline-flex items-center gap-0.5 font-medium text-neutral-800 dark:text-neutral-200"
            >
              Set up MCP
              <ArrowUpRight className="size-3 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
