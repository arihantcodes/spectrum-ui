"use client";
import React, { useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";

import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import InstallCommand from "@/app/(docs)/docs/components/code-card/parts/installcommand";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/events";
import PackageManagerTabs from "@/components/packageMangers";
import { AppWindowMac, Bot, Check, Clipboard, Command, FileCode, Lock, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthGate } from "@/hooks/use-auth-gate";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeCardProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
  CLI?: string;
  componentName?: string;
  /** Bash install command shown in the Installation tab, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Full source of the component file shown in the Installation tab */
  installCode?: string;
  /** Optional custom content to show in the installation tab */
  installContent?: React.ReactNode;
}

// ─── MCP Tab ─────────────────────────────────────────────────────────────────

function McpTab({ cli }: { cli: string }) {
  const [copied, setCopied] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();

  // Derive a readable name from the CLI slug e.g. "@spectrumui/scratch-card" → "scratch-card"
  const slug = cli.replace(/^@spectrumui\//, "");
  const prompt = `Install the ${slug} component from Spectrum UI`;
  const cliCommand = `bunx --bun shadcn@latest add ${cli}`;

  const handleCopy = () => {
    if (!isAuthenticated) {
      trackEvent({ name: "copy_mcp_prompt_clicked", properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    trackEvent({ name: "copy_mcp_prompt_clicked", properties: { authenticated: true, component: slug } });
    posthog.capture("mcp_prompt_copied", { component: slug });
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Locked state ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <Bot className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Use with your AI editor
          </span>
          <Link
            href="/docs/mcp"
            className="ml-auto text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline underline-offset-4 transition-colors"
          >
            Setup MCP
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-10 px-6 bg-neutral-50 dark:bg-[#101010]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border">
            <Lock className="h-4 w-4 text-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Login to copy the MCP prompt</p>
            <p className="text-xs text-muted-foreground mt-1">
              Create a free account to use the one-prompt install
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              trackEvent({ name: "copy_mcp_prompt_clicked", properties: { authenticated: false } });
              openAuthModal();
            }}
            className="h-9 px-5 font-medium"
          >
            Login to continue
          </Button>
        </div>
      </div>
    );
  }

  // ── Unlocked state ──────────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
        <Bot className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Use with your AI editor
        </span>
        <Link
          href="/docs/mcp"
          className="ml-auto text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline underline-offset-4 transition-colors"
        >
          Setup MCP
        </Link>
      </div>

      <div className="p-5 flex flex-col gap-5 bg-white dark:bg-neutral-950/40">
        {/* Prompt to copy */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            1. Copy this prompt
          </p>
          <div className="relative flex items-center justify-between gap-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3.5">
            <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed">
              &quot;{prompt}&quot;
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy MCP prompt"
              className={cn(
                "flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                "border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-900",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
              )}
            >
              {copied
                ? <Check className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
                : <Clipboard className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
              }
            </button>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            Paste into Claude, Cursor, Windsurf, or any MCP-compatible AI editor.
          </p>
        </div>

        {/* What runs underneath */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            2. The MCP server runs this automatically
          </p>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3">
            <code className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {cliCommand}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CodeCard ────────────────────────────────────────────────────────────────

const CodeCard = ({
  children,
  code,
  className,
  CLI,
  componentName,
  installScript,
  installCode,
  installContent,
}: CodeCardProps) => {
  const hasInstallTab = !!(installScript || installCode || installContent);

  const handleTabChange = (tab: string) => {
    posthog.capture("tab_switched", {
      tab,
      ...(componentName && { component_name: componentName }),
    });
  };

  return (
    <Tabs
      defaultValue="preview"
      className={cn(className)}
      onValueChange={handleTabChange}
    >
      <ScrollArea>
        <TabsList className="mb-3 gap-6 bg-transparent">
          {/* Preview */}
          <TabsTrigger
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            value="preview"
          >
            <AppWindowMac
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Preview
          </TabsTrigger>

          {/* Code */}
          <TabsTrigger
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            value="code"
          >
            <FileCode
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Code
          </TabsTrigger>

          {/* CLI */}
          <TabsTrigger
            value="CLI"
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
          >
            <Command
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            CLI <span className="text-[12px] font-normal text-muted-foreground/70 ml-1">(one command installation)</span>
          </TabsTrigger>

          {/* MCP — shown whenever a CLI slug is present */}
          {CLI && (
            <TabsTrigger
              value="mcp"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            >
              <Bot
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              MCP
              <span className="ml-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white dark:text-neutral-900">
                Popular
              </span>
            </TabsTrigger>
          )}

          {/* Installation — only shown when installScript or installCode or installContent are provided */}
          {hasInstallTab && (
            <TabsTrigger
              value="installation"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none px-4 rounded-lg"
            >
              <PackageOpen
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Installation
            </TabsTrigger>
          )}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ── Preview ─────────────────────────────────────────── */}
      <TabsContent value="preview" className="rounded-md border mt-4">
        {children}
      </TabsContent>

      {/* ── Code (demo file) ────────────────────────────────── */}
      <TabsContent value="code" className="rounded-2xl mt-4">
        <CodeHighlight code={code} inTab requireAuth />
      </TabsContent>

      {/* ── CLI (spectrum-ui install) ────────────────────────── */}
      <TabsContent value="CLI" className="mt-4">
        <PackageManagerTabs CLI={CLI || ""} componentName={componentName} />
      </TabsContent>

      {/* ── MCP (AI editor prompt) ───────────────────────────── */}
      {CLI && (
        <TabsContent value="mcp" className="mt-4">
          <McpTab cli={CLI} />
        </TabsContent>
      )}

      {/* ── Installation (bash + component source) ──────────── */}
      {hasInstallTab && (
        <TabsContent value="installation" className="mt-4">
          <div className="flex flex-col gap-4">
            {/* Step 1 — bash install command */}
            {installScript && (
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-muted-foreground px-1">
                  1. Install dependencies
                </p>
                <InstallCommand
                  code={installScript}
                  lang="bash"
                  inTab
                  requireAuth
                />
              </div>
            )}

            {/* Step 2 — component source code */}
            {installCode && (
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-muted-foreground px-1">
                  {installScript ? "2." : "1."} Copy the component
                </p>
                <CodeHighlight
                  code={installCode}
                  inTab
                  withExpand
                  requireAuth
                />
              </div>
            )}

            {/* Step 3 — custom install content (e.g. PropsTable) */}
            {installContent && (
              <div className="mt-6">
                {installContent}
              </div>
            )}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default CodeCard;
