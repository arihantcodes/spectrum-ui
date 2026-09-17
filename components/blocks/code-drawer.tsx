'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { InstallFigure } from '@/components/blocks/install-figure';
import { CopyButton } from '@/components/blocks/copy-button';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';
import { cn } from '@/lib/utils';

interface CodeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  slug: string;
  /** One line about the block, so the drawer says what it is before how to get it. */
  description?: string;
  /** The CLI item — `@spectrumui/<registryName>`. Charts install under a longer name than their anchor. */
  registryName: string;
  /** Where the CLI writes the file. */
  filePath?: string;
  source: string;
}

/**
 * Enters are staged, so the three paths read as an order rather than arriving
 * as one block. `delay-*` is transition-delay and does nothing to a keyframe
 * animation, so these are animation-delay.
 */
const STEP_DELAY = [
  '[animation-delay:40ms]',
  '[animation-delay:110ms]',
  '[animation-delay:180ms]',
] as const;

/**
 * The code surface for a block.
 *
 * It answers exactly one question — how do I get this? — with three answers in
 * the order people reach for them: the CLI, an agent, or the file itself. The
 * previous version labelled them `INSTALLATION` / `MCP` / `CODE` in 10px mono
 * at 2.5:1, which named the sections without explaining any of them and left
 * all three weighted the same. Each is a heading you can act on now, with one
 * line under it saying what it does.
 */
export function CodeDrawer({
  open,
  onOpenChange,
  name,
  slug,
  description,
  registryName,
  filePath,
  source,
}: CodeDrawerProps) {
  const path = filePath ?? `components/spectrumui/blocks/${slug}.tsx`;
  const lines = source.split('\n').length;
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        /* Radix focuses the first tabbable child on open, which landed the
           keyboard on the `bun` tab — three levels into a widget before the
           reader has seen the title. Focus the heading instead. */
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          headingRef.current?.focus();
        }}
        className={cn(
          'flex w-full flex-col gap-0 overflow-y-auto overscroll-contain p-0 sm:max-w-[640px]',
          'ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=open]:duration-[380ms] data-[state=closed]:duration-[240ms]',
        )}
      >
        <SheetHeader className="space-y-0 border-b border-black/[0.07] px-5 pb-5 pt-6 text-left sm:px-6 dark:border-white/[0.08]">
          <SheetTitle
            ref={headingRef}
            tabIndex={-1}
            className="text-[19px] font-semibold leading-[1.25] tracking-[-0.015em] outline-hidden"
          >
            {name}
          </SheetTitle>
          {description ? (
            <SheetDescription className="mt-1.5 max-w-[52ch] text-pretty text-[13.5px] leading-[1.6] tracking-[-0.003em] text-neutral-600 dark:text-neutral-400">
              {description}
            </SheetDescription>
          ) : (
            <SheetDescription className="sr-only">
              Install commands and source for {name}
            </SheetDescription>
          )}

          <FileMeta path={path} lines={lines} />
        </SheetHeader>

        <div className="flex flex-col gap-7 px-5 pb-12 pt-6 sm:px-6">
          <Step
            index={0}
            id={`${slug}-cli`}
            heading="Install with the CLI"
            hint="Writes the file into your project and pulls in anything it depends on."
            badge="Fastest"
          >
            <InstallFigure cli={`@spectrumui/${registryName}`} componentName={registryName} />
          </Step>

          <McpStep slug={slug} registryName={registryName} />

          <Step
            index={2}
            id={`${slug}-source`}
            heading="Or copy the source"
            hint={`${lines} lines of TSX. Nothing here is generated — this is the file the CLI writes.`}
          >
            <CodeHighlight
              code={source}
              title={path.split('/').pop() ?? `${slug}.tsx`}
              /* overscroll-contain so reaching the end of the source does not
                 hand the scroll to the drawer underneath it. */
              maxHeightClassName="max-h-[460px] overscroll-contain"
              scrollLabel={`${name} source code`}
              requireAuth
            />
          </Step>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** Where the CLI writes the file, and how much file there is. */
function FileMeta({ path, lines }: { path: string; lines: number }) {
  const parts = path.split('/');
  const file = parts.pop();

  return (
    <p className="mt-3.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 font-mono text-[12px] leading-[1.5]">
      <span className="text-neutral-600 dark:text-neutral-400">{parts.join('/')}/</span>
      <span className="font-medium text-neutral-800 dark:text-neutral-100">{file}</span>
      <span aria-hidden className="text-neutral-400 dark:text-neutral-600">
        ·
      </span>
      <span className="tabular-nums text-neutral-600 dark:text-neutral-400">{lines} lines</span>
    </p>
  );
}

/**
 * One way in: a heading you can act on, a line saying what it does, the payload.
 * The three steps stage in on a short delay so the order reads as an order.
 */
function Step({
  index,
  id,
  heading,
  hint,
  badge,
  children,
}: {
  index: number;
  id: string;
  heading: string;
  hint: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn('motion-safe:animate-fade-up', STEP_DELAY[index] ?? STEP_DELAY[2])}
    >
      <div className="mb-1 flex items-center gap-2">
        <h3
          id={id}
          className="text-[14.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-neutral-900 dark:text-neutral-50"
        >
          {heading}
        </h3>
        {badge && (
          <span className="rounded-full border border-black/[0.08] px-1.5 py-px text-[11px] font-medium text-neutral-600 dark:border-white/[0.12] dark:text-neutral-400">
            {badge}
          </span>
        )}
      </div>
      <p className="mb-3 max-w-[56ch] text-pretty text-[12.5px] leading-[1.6] tracking-[-0.002em] text-neutral-600 dark:text-neutral-400">
        {hint}
      </p>
      {children}
    </section>
  );
}

/**
 * The prompt an agent turns into an install. Same anatomy as the CLI figure —
 * hairline header, icon-only copy with the blur crossfade, payload in mono —
 * so the three cards read as one system rather than three unrelated boxes.
 */
function McpStep({ slug, registryName }: { slug: string; registryName: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { isAuthenticated, openAuthModal } = useAuthGate();
  const prompt = `Install the ${registryName} block from Spectrum UI`;

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleCopy() {
    if (!isAuthenticated) {
      trackEvent({ name: 'copy_mcp_prompt_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
    trackEvent({
      name: 'copy_mcp_prompt_clicked',
      properties: { authenticated: true, component: slug },
    });
    posthog.capture('mcp_prompt_copied', { component: slug });
  }

  return (
    <Step
      index={1}
      id={`${slug}-mcp`}
      heading="Install with an agent"
      hint="Paste this into Cursor, Claude Code, or any editor connected to the Spectrum UI MCP server."
    >
      <figure className="overflow-hidden rounded-lg border border-black/[0.08] dark:border-white/[0.1]">
        <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] px-2.5 py-1.5 dark:border-white/[0.08]">
          <div className="flex min-w-0 items-center gap-2">
            <Sparkles className="size-3.5 shrink-0 text-neutral-600 dark:text-neutral-400" />
            <span className="truncate font-mono text-[12px] text-neutral-600 dark:text-neutral-400">
              Prompt
            </span>
          </div>
          <CopyButton
            copied={copied}
            onCopy={handleCopy}
            label="Copy the agent prompt"
            copiedLabel="Prompt copied"
          />
        </div>

        <div className="overflow-x-auto">
          <code className="block whitespace-nowrap px-3.5 py-3 font-mono text-[12.5px] leading-normal">
            <span aria-hidden className="mr-2 select-none text-neutral-400 dark:text-neutral-600">
              ❯
            </span>
            <span className="text-neutral-800 dark:text-neutral-200">{prompt}</span>
          </code>
        </div>
      </figure>

      {/* On its own line, not buried mid-sentence: a link nobody can see is a
          link nobody follows. */}
      <Link
        href="/docs/mcp"
        className="group mt-2.5 inline-flex items-center gap-1 rounded-sm text-[12.5px] font-medium text-neutral-800 underline-offset-4 hover:underline focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:text-neutral-100 dark:focus-visible:ring-neutral-300"
      >
        Set up the MCP server
        <ArrowUpRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-px group-hover:translate-x-px" />
      </Link>
    </Step>
  );
}
