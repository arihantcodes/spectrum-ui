'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-caret-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes su-cmd-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
`;

export type CommandFooterVariant = 'Terminal' | 'Prompt';

export interface FooterCommand {
  command: string;
  description: string;
  hint?: string;
}

export interface CommandFooterProps {
  brand: string;
  prompt?: string;
  commands: FooterCommand[];
  links?: { label: string; href: string }[];
  onRun?: (command: string) => void;
  copyright?: string;
  variant?: CommandFooterVariant;
  className?: string;
}

export function CommandFooter({
  brand,
  prompt = '~/cormorant',
  commands,
  links = [],
  onRun,
  copyright,
  variant = 'Terminal',
  className,
}: CommandFooterProps) {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter(
      (entry) =>
        entry.command.toLowerCase().startsWith(needle) ||
        entry.description.toLowerCase().includes(needle),
    );
  }, [commands, value]);

  const completion =
    value.trim() && matches[cursor]?.command.startsWith(value.trim())
      ? matches[cursor].command.slice(value.trim().length)
      : '';

  function run(command: string) {
    setHistory((current) => [...current.slice(-2), command]);
    setValue('');
    setCursor(0);
    onRun?.(command);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = matches[cursor]?.command ?? value.trim();
      if (target) run(target);
    } else if (event.key === 'Tab' && completion) {
      event.preventDefault();
      setValue(matches[cursor].command);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((current) => (matches.length ? (current + 1) % matches.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((current) =>
        matches.length ? (current - 1 + matches.length) % matches.length : 0,
      );
    }
  }

  const dark = variant === 'Terminal';

  return (
    <footer
      className={cn(
        'w-full border-t',
        dark
          ? 'border-white/[0.08] bg-[#08080A] text-neutral-100'
          : 'border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <p
              className={cn(
                'text-[17px] font-semibold tracking-[-0.3px]',
                dark && 'text-neutral-50',
              )}
            >
              {brand}
            </p>
            <p
              className={cn(
                'mt-2 max-w-[38ch] text-pretty text-[13px] leading-[1.65]',
                dark ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400',
              )}
            >
              Type a command, or press Tab to complete. Arrow keys move the selection.
            </p>

            <div
              onClick={() => inputRef.current?.focus()}
              className={cn(
                'mt-5 cursor-text rounded-xl border p-3.5 font-mono text-[12.5px]',
                dark
                  ? 'border-white/[0.08] bg-white/[0.025]'
                  : 'border-black/[0.09] bg-[#FAFAFA] dark:border-white/[0.1] dark:bg-white/[0.03]',
              )}
            >
              {history.map((entry, index) => (
                <p
                  key={`${entry}-${index}`}
                  className={cn(
                    'animate-[su-cmd-in_180ms_cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none',
                    dark ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400',
                  )}
                >
                  <span className="mr-2">{prompt} $</span>
                  {entry}
                </p>
              ))}

              <div className="flex items-center">
                <span
                  className={cn('mr-2 shrink-0', dark ? 'text-emerald-400' : 'text-emerald-600')}
                >
                  {prompt} $
                </span>
                <span className="relative flex min-w-0 flex-1 items-center">
                  <input
                    ref={inputRef}
                    value={value}
                    aria-label="Footer command"
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(event) => {
                      setValue(event.target.value);
                      setCursor(0);
                    }}
                    onKeyDown={onKeyDown}
                    className={cn(
                      /* min-w-0: an <input> carries an intrinsic min-width of roughly twenty
                         characters, which is what stopped the prompt row shrinking on a phone. */
                      'w-full min-w-0 bg-transparent font-mono text-[12.5px] focus:outline-hidden',
                      dark
                        ? 'text-neutral-100 caret-emerald-400'
                        : 'text-neutral-900 caret-emerald-600 dark:text-neutral-100',
                    )}
                  />
                  {completion && (
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute left-0 whitespace-pre',
                        dark ? 'text-neutral-700' : 'text-neutral-300 dark:text-neutral-700',
                      )}
                    >
                      <span className="invisible">{value}</span>
                      {completion}
                    </span>
                  )}
                  {!value && (
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute left-0 h-[1.1em] w-[7px] animate-[su-caret-blink_1.05s_steps(1,end)_infinite] motion-reduce:animate-none',
                        dark ? 'bg-emerald-400/80' : 'bg-emerald-600/70',
                      )}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>

          <ul className="min-w-0 space-y-0.5 self-center">
            {matches.map((entry, index) => (
              <li key={entry.command}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => run(entry.command)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500',
                    index === cursor
                      ? dark
                        ? 'bg-white/[0.06]'
                        : 'bg-black/[0.05] dark:bg-white/[0.07]'
                      : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]',
                  )}
                >
                  <span
                    className={cn(
                      'w-[92px] shrink-0 font-mono text-[12.5px]',
                      dark ? 'text-neutral-100' : 'text-neutral-900 dark:text-neutral-100',
                    )}
                  >
                    {entry.command}
                  </span>
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate text-[12.5px]',
                      dark ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400',
                    )}
                  >
                    {entry.description}
                  </span>
                  {entry.hint && (
                    <span
                      className={cn(
                        /* Below sm the hint is what squeezes the description down to
                           an ellipsis, and the description is the useful half. */
                        'hidden shrink-0 font-mono text-[10.5px] tabular-nums sm:inline',
                        dark ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400',
                      )}
                    >
                      {entry.hint}
                    </span>
                  )}
                </button>
              </li>
            ))}
            {matches.length === 0 && (
              <li
                className={cn(
                  'px-2.5 py-2 font-mono text-[12.5px]',
                  dark ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400',
                )}
              >
                command not found
              </li>
            )}
          </ul>
        </div>

        <div
          className={cn(
            'mt-10 flex flex-col gap-3 border-t pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between',
            dark
              ? 'border-white/[0.07] text-neutral-400'
              : 'border-black/[0.07] text-neutral-500 dark:border-white/[0.08]',
          )}
        >
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-neutral-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default CommandFooter;
