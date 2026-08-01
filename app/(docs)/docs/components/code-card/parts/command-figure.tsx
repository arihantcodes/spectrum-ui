'use client';

import React, { useState } from 'react';
import posthog from 'posthog-js';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/events';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { ShadcnIcon, Copy1Icon, LockBoldIcon } from '@/app/(docs)/layout-parts/docs-icons';

export const PACKAGE_MANAGERS = [
  { id: 'bun', name: 'bun', command: 'bunx --bun shadcn@latest add' },
  { id: 'npm', name: 'npm', command: 'npx shadcn@latest add' },
  { id: 'pnpm', name: 'pnpm', command: 'pnpm dlx shadcn@latest add' },
  { id: 'yarn', name: 'yarn', command: 'yarn dlx shadcn@latest add' },
] as const;

export type PackageManagerId = (typeof PACKAGE_MANAGERS)[number]['id'];

/** Terminal-style token colors: binary green, flags muted, packages blue */
const tokenClass = (tokens: string[], index: number) => {
  const token = tokens[index];
  if (index === 0) return 'text-emerald-600 dark:text-emerald-400';
  if (token.startsWith('-')) return 'text-neutral-400 dark:text-neutral-500';
  if (token.includes('@') || tokens[index - 1] === 'create')
    return 'text-sky-600 dark:text-sky-400';
  return 'text-[#262626] dark:text-neutral-200';
};

interface CommandFigureProps {
  /** Registry slug, e.g. "@spectrumui/input" — renders package-manager tabs */
  cli?: string;
  /** Raw command shown as-is when no cli slug is given, e.g. "npm i framer-motion" */
  command?: string;
  /**
   * Full command per package manager, e.g. { npm: "npx create-next-app@latest" }.
   * Renders the package-manager tabs like `cli`, but for arbitrary commands.
   */
  commands?: Partial<Record<PackageManagerId, string>>;
  componentName?: string;
  className?: string;
  /**
   * Gate the command behind auth (default: false). Set on registry install
   * commands — logged-out users get the "Login to view" panel instead.
   */
  requireAuth?: boolean;
}

/**
 * Bordered command box: header row with shadcn icon + package-manager tabs,
 * the command in Geist Mono below, and a copy button in the top-right corner.
 */
const CommandFigure = ({
  cli,
  command,
  commands,
  componentName,
  className,
  requireAuth = false,
}: CommandFigureProps) => {
  const [pm, setPm] = useState<PackageManagerId>('pnpm');
  const [copied, setCopied] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const isLocked = requireAuth && !isAuthenticated;

  const activePm = PACKAGE_MANAGERS.find((p) => p.id === pm)!;
  const withPmTabs = !!cli || !!commands;
  const fullCommand = cli
    ? `${activePm.command} ${cli}`
    : commands
      ? (commands[pm] ?? '')
      : (command ?? '');

  const handleCopy = () => {
    if (isLocked) {
      trackEvent({ name: 'copy_cli_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent({ name: 'copy_cli_clicked', properties: { authenticated: isAuthenticated } });
    posthog.capture('cli_command_copied', {
      command: fullCommand,
      ...(componentName && { component_name: componentName }),
      ...(withPmTabs && { package_manager: pm }),
    });
  };

  // Locked: same "Login to view" treatment as the code panel, compact.
  // The command itself is never rendered for logged-out visitors.
  if (isLocked) {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-center rounded-[14px] border border-black/8 bg-white px-6 py-6 dark:border-white/10 dark:bg-neutral-950',
          className,
        )}
      >
        <span className="flex size-[34px] items-center justify-center rounded-md border border-[#e5e5e5] dark:border-white/10">
          <LockBoldIcon className="text-black dark:text-white" />
        </span>
        <span className="mt-2 flex max-w-96 flex-col text-center text-sm leading-5">
          <span className="font-medium text-black dark:text-neutral-100">
            Login to view command
          </span>
          <span className="text-black/60 dark:text-neutral-400">
            Create a free account to access the install command
          </span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-4 h-7 rounded-full bg-neutral-900 px-10 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-[#0a0a0a] dark:hover:bg-neutral-100"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-[14px] border border-black/8 bg-white dark:border-white/10 dark:bg-neutral-950',
        className,
      )}
    >
      <div className="flex h-[41px] items-center gap-2 border-b border-black/5 px-4 dark:border-white/6">
        <ShadcnIcon className="size-4 shrink-0 text-[#262626] dark:text-neutral-200" />
        {withPmTabs && (
          <div className="flex items-center">
            {PACKAGE_MANAGERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPm(p.id)}
                className={cn(
                  'h-8 rounded-[10px] px-2.5 text-sm leading-5 transition-colors',
                  pm === p.id
                    ? 'bg-black/4 text-[#262626] dark:bg-white/8 dark:text-neutral-100'
                    : 'text-[#686868]/70 hover:text-[#262626] dark:text-neutral-500 dark:hover:text-neutral-200',
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy command"
          className="ml-auto flex size-8 items-center justify-center rounded-[10px] opacity-70 transition hover:bg-black/4 hover:opacity-100 dark:hover:bg-white/6"
        >
          {copied ? (
            <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy1Icon className="size-4 text-[#262626] dark:text-neutral-300" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-[18px]">
        <code className="whitespace-pre font-mono text-[13px] leading-[13px]">
          {fullCommand.split(' ').map((token, i, tokens) => (
            <span key={`${token}-${i}`} className={tokenClass(tokens, i)}>
              {i > 0 ? ' ' : ''}
              {token}
            </span>
          ))}
        </code>
      </div>
    </figure>
  );
};

export default CommandFigure;
