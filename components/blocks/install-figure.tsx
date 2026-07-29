'use client';

import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Copy1Icon,
  LockBoldIcon,
  ShadcnIcon,
} from '@/app/(docs)/layout-parts/docs-icons';
import {
  PACKAGE_MANAGERS,
  type PackageManagerId,
} from '@/app/(docs)/docs/components/code-card/parts/command-figure';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

interface InstallFigureProps {
  /** Registry slug, e.g. "@spectrumui/chat-thread". */
  cli: string;
  componentName?: string;
  className?: string;
}

/** Terminal token colors: binary green, subcommands neutral, package blue. */
function tokenClass(tokens: string[], index: number) {
  if (index === 0) return 'text-emerald-600 dark:text-emerald-400';
  if (tokens[index].startsWith('@')) return 'text-sky-600 dark:text-sky-400';
  if (tokens[index].includes('@')) return 'text-sky-600/90 dark:text-sky-400/90';
  return 'text-neutral-700 dark:text-neutral-300';
}

/**
 * The drawer's Installation figure. Everything is Geist Mono — tabs included —
 * because this is a terminal surface, not chrome. The active-tab pill slides
 * between tabs on transform (never layout), the copy glyph crossfades through a
 * 2px blur, and every press scales 0.97. Copying requires login, exactly like
 * the docs pages.
 */
export function InstallFigure({ cli, componentName, className }: InstallFigureProps) {
  const [pm, setPm] = useState<PackageManagerId>('npm');
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const activeIndex = PACKAGE_MANAGERS.findIndex((manager) => manager.id === pm);
  const command = `${PACKAGE_MANAGERS[activeIndex].command} ${cli}`;
  const tokens = command.split(' ');

  function handleCopy() {
    if (!isAuthenticated) {
      trackEvent({ name: 'copy_cli_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    navigator.clipboard.writeText(command);
    setCopied(true);
    trackEvent({ name: 'copy_cli_clicked', properties: { authenticated: true } });
    posthog.capture('cli_command_copied', {
      command,
      package_manager: pm,
      ...(componentName && { component_name: componentName }),
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  if (!isAuthenticated) {
    return (
      <div className={cn('overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800', className)}>
        <div className="flex flex-col items-center justify-center gap-4 bg-neutral-50 px-6 py-10 dark:bg-[#101010]">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white dark:bg-neutral-900">
            <LockBoldIcon className="text-black dark:text-white" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Login to view command</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Create a free account to access the install command
            </p>
          </div>
          <Button
            size="sm"
            className="h-9 px-5 font-medium active:scale-[0.97]"
            onClick={() => {
              trackEvent({ name: 'copy_cli_clicked', properties: { authenticated: false } });
              openAuthModal();
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <figure className={cn('overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-2.5 py-1.5 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <ShadcnIcon className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />

          {/* One relative track; the pill is a single element translated to the
              active tab so the move is interruptible and never reflows. */}
          <div
            role="tablist"
            aria-label="Package manager"
            className="relative isolate grid grid-flow-col auto-cols-fr"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 -z-10 rounded-md bg-black/[0.06] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-white/[0.09]"
              style={{
                width: `${100 / PACKAGE_MANAGERS.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
            {PACKAGE_MANAGERS.map((manager) => {
              const active = manager.id === pm;
              return (
                <button
                  key={manager.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPm(manager.id)}
                  className={cn(
                    'rounded-md px-2 py-[3px] font-mono text-[11px] leading-4 transition-[color,transform] duration-150 active:scale-[0.96]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                    active
                      ? 'font-medium text-neutral-900 dark:text-neutral-50'
                      : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300',
                  )}
                >
                  {manager.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Command copied' : `Copy ${pm} install command`}
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

      {/* Not a <pre>: an unlayered global `pre { padding:12px !important; width:inherit !important }`
          overrides utilities and, in this flex context, forces the one-line command to wrap. */}
      <div className="overflow-x-auto">
        <code className="block whitespace-nowrap px-3.5 py-3 font-mono text-[12px] leading-none">
          {tokens.map((token, index) => (
            <span key={index} className={tokenClass(tokens, index)}>
              {token}
              {index < tokens.length - 1 ? ' ' : ''}
            </span>
          ))}
        </code>
      </div>
    </figure>
  );
}
