'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LockBoldIcon, ShadcnIcon } from '@/app/(docs)/layout-parts/docs-icons';
import { CopyButton } from '@/components/blocks/copy-button';
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
/**
 * Terminal token colours: binary green, package blue, everything else neutral.
 *
 * The 600 steps measured 3.5–4.0:1 on white, under the 4.5 floor for 13px text.
 * Contrast responds to lightness, so these move down the ramp rather than
 * across the hue.
 */
function tokenClass(tokens: string[], index: number) {
  if (index === 0) return 'text-emerald-700 dark:text-emerald-400';
  if (tokens[index].startsWith('@')) return 'text-sky-700 dark:text-sky-400';
  if (tokens[index].includes('@')) return 'text-sky-700/90 dark:text-sky-400/90';
  return 'text-neutral-700 dark:text-neutral-300';
}

/**
 * The drawer's install figure. Everything inside is mono — the package-manager
 * options included — because this is a terminal surface, not chrome. Copying
 * requires login, exactly like the docs pages.
 */
export function InstallFigure({ cli, componentName, className }: InstallFigureProps) {
  const [pm, setPm] = useState<PackageManagerId>('npm');
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const options = useRef<Partial<Record<PackageManagerId, HTMLButtonElement | null>>>({});
  const { isAuthenticated, openAuthModal } = useAuthGate();

  const activeIndex = PACKAGE_MANAGERS.findIndex((manager) => manager.id === pm);

  /** Arrows move and select, Home/End jump — the radiogroup pattern. */
  function onArrowKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0;
    let next = activeIndex;
    if (step !== 0) {
      next = (activeIndex + step + PACKAGE_MANAGERS.length) % PACKAGE_MANAGERS.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = PACKAGE_MANAGERS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const id = PACKAGE_MANAGERS[next].id;
    setPm(id);
    options.current[id]?.focus();
  }

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
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-black/[0.08] dark:border-white/[0.1]',
          className,
        )}
      >
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
    <figure
      className={cn(
        'overflow-hidden rounded-lg border border-black/[0.08] dark:border-white/[0.1]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] px-2.5 py-1.5 dark:border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <ShadcnIcon className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />

          {/* A radiogroup, not a tablist: `role="tablist"` promises tabpanels and
              `aria-controls`, and this is a single-select control over one
              command, which is what a radiogroup is for. Roving tabindex keeps
              it to one Tab stop. The pill behind it is a single element
              translated to the active option, so the move is interruptible and
              never reflows. */}
          <div
            role="radiogroup"
            aria-label="Package manager"
            onKeyDown={onArrowKey}
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
                  ref={(node) => {
                    options.current[manager.id] = node;
                  }}
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPm(manager.id)}
                  className={cn(
                    'rounded-md px-2 py-[3px] font-mono text-[12px] leading-4 transition-[color,transform] duration-150 active:scale-[0.96]',
                    'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
                    active
                      ? 'font-medium text-neutral-900 dark:text-neutral-50'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
                  )}
                >
                  {manager.name}
                </button>
              );
            })}
          </div>
        </div>

        <CopyButton
          copied={copied}
          onCopy={handleCopy}
          label={`Copy the ${pm} install command`}
          copiedLabel="Command copied"
        />
      </div>

      {/* Not a <pre>: an unlayered global `pre { padding:12px !important; width:inherit !important }`
          overrides utilities and, in this flex context, forces the one-line command to wrap. */}
      <div className="overflow-x-auto">
        <code className="block whitespace-nowrap px-3.5 py-3 font-mono text-[14px] leading-normal tracking-[-0.015em]">
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
