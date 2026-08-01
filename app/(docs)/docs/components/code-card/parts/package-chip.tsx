"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/events";
import { useAuthGate } from "@/hooks/use-auth-gate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NpmIcon,
  Copy1Icon,
} from "@/app/(docs)/layout-parts/docs-icons";
import {
  PACKAGE_MANAGERS,
  type PackageManagerId,
} from "@/app/(docs)/docs/components/code-card/parts/command-figure";

interface PackageChipProps {
  /** Registry slug, e.g. "@spectrumui/input" */
  cli: string;
  componentName?: string;
  className?: string;
}

/**
 * Header chip next to the Preview/Code tabs: npm logo + registry slug with a
 * one-click install-command copy (package manager selectable via the chevron)
 * and a "Copy Prompt" button for MCP-driven installs.
 */
const PackageChip = ({ cli, componentName, className }: PackageChipProps) => {
  const [pm, setPm] = useState<PackageManagerId>("pnpm");
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const slug = cli.replace(/^@spectrumui\//, "");
  const activePm = PACKAGE_MANAGERS.find((p) => p.id === pm)!;
  const command = `${activePm.command} ${cli}`;
  const prompt = `Install the ${slug} component from Spectrum UI`;

  const handleCopyCommand = () => {
    if (!isAuthenticated) {
      trackEvent({ name: "copy_cli_clicked", properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(command);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
    trackEvent({ name: "copy_cli_clicked", properties: { authenticated: true } });
    posthog.capture("cli_command_copied", {
      command,
      package_manager: pm,
      ...(componentName && { component_name: componentName }),
    });
  };

  const handleCopyPrompt = () => {
    if (!isAuthenticated) {
      trackEvent({
        name: "copy_mcp_prompt_clicked",
        properties: { authenticated: false },
      });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    trackEvent({
      name: "copy_mcp_prompt_clicked",
      properties: { authenticated: true, component: slug },
    });
    posthog.capture("mcp_prompt_copied", { component: slug });
  };

  return (
    <div
      className={cn(
        "flex h-8 min-w-0 items-center gap-1 rounded-lg bg-[#f3f3f3] p-0.5 dark:bg-white/6",
        className,
      )}
    >
      {/* npm slug + copy + package-manager chevron */}
      <div className="flex h-7 min-w-0 items-center rounded-[7px] border border-black/5 bg-white pl-1.5 pr-1 dark:border-white/6 dark:bg-neutral-900">
        <NpmIcon className="size-5 shrink-0" />
        <span className="ml-1.5 truncate font-mono text-xs leading-5 text-black/60 dark:text-white/60">
          {cli}
        </span>
        <button
          type="button"
          onClick={handleCopyCommand}
          aria-label={`Copy ${pm} install command`}
          className="ml-1.5 shrink-0 opacity-70 transition hover:opacity-100"
        >
          {copiedCommand ? (
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy1Icon className="size-3.5 text-[#262626] dark:text-neutral-300" />
          )}
        </button>
        <span
          aria-hidden="true"
          className="mx-1.5 h-[18px] w-px shrink-0 bg-black/10 dark:bg-white/10"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Choose package manager"
              className="shrink-0 rounded p-0.5 text-black/50 transition hover:text-black dark:text-white/50 dark:hover:text-white"
            >
              <ChevronDown className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-32">
            {PACKAGE_MANAGERS.map((p) => (
              <DropdownMenuItem
                key={p.id}
                onClick={() => setPm(p.id)}
                className="font-mono text-xs"
              >
                <span className="flex-1">{p.name}</span>
                {pm === p.id && <Check className="size-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Copy Prompt (MCP) */}
      <button
        type="button"
        onClick={handleCopyPrompt}
        className="flex h-7 shrink-0 items-center gap-[3px] rounded-lg border border-[#e5e5e5] bg-white px-1.5 font-mono text-xs font-medium leading-4 text-black/60 transition hover:text-black dark:border-white/10 dark:bg-neutral-900 dark:text-white/60 dark:hover:text-white"
      >
        {copiedPrompt ? "Copied!" : "Copy Prompt"}
        {copiedPrompt ? (
          <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy1Icon className="size-3.5" />
        )}
      </button>
    </div>
  );
};

export default PackageChip;
