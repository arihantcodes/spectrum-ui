/**
 * Spectrum UI — MetalPromptBar
 *
 * An AI prompt bar whose send button wears a live liquid-metal ring painted by
 * `metal-fx` (Jakub Antalík, MIT, https://metal.jakubantalik.com). The chips
 * beside it are passed to MetalFx as reflection targets, so in dark mode they
 * pick up a soft mirrored glint of the ring — the composer from the metal-fx
 * showcase, wired for React state: auto-growing textarea, Enter to send,
 * Shift+Enter for newlines, and a disabled send state while empty.
 *
 * Dependencies: metal-fx, lucide-react, @/lib/utils
 *
 * @example
 * <MetalPromptBar onSubmit={(text) => ask(text)} />
 */

'use client';

import * as React from 'react';
import { MetalFx, type MetalFxPreset } from 'metal-fx';
import { ArrowUp, Paperclip } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSurfaceTheme, type SurfaceTheme } from '@/components/spectrumui/use-surface-theme';

export interface MetalPromptBarProps {
  /** Placeholder for the empty composer. Default "Build anything…" */
  placeholder?: string;
  /** Pills shown bottom-left; each one reflects the metal ring in dark mode. Default ["Agent", "Auto"] */
  chips?: string[];
  /** Metal palette for the send ring. Default "chromatic" */
  preset?: MetalFxPreset;
  /** "auto" follows a `.dark`/`.light` class on <html>, then the OS. Default "auto" */
  theme?: SurfaceTheme;
  /** Fires with the trimmed text on Enter or the send button; the field clears afterwards */
  onSubmit?: (text: string) => void;
  /** Fires when a chip is clicked */
  onChipClick?: (chip: string) => void;
  /** Max textarea rows before it scrolls. Default 6 */
  maxRows?: number;
  className?: string;
}

export function MetalPromptBar({
  placeholder = 'Build anything…',
  chips = ['Agent', 'Auto'],
  preset = 'chromatic',
  theme = 'auto',
  onSubmit,
  onChipClick,
  maxRows = 6,
  className,
}: MetalPromptBarProps) {
  const resolved = useSurfaceTheme(theme);
  const [text, setText] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  // Stable refs per chip so MetalFx can paint reflections onto them
  const chipRefs = React.useMemo(
    () => chips.map(() => React.createRef<HTMLButtonElement>()),
    [chips],
  );
  const canSend = text.trim().length > 0;

  const resize = (el: HTMLTextAreaElement) => {
    el.style.height = '0px';
    const line = parseFloat(getComputedStyle(el).lineHeight) || 24;
    el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
  };

  const submit = () => {
    if (!canSend) return;
    onSubmit?.(text.trim());
    setText('');
    const el = textareaRef.current;
    if (el) {
      el.value = '';
      resize(el);
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-[22px] border border-black/8 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]',
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        placeholder={placeholder}
        aria-label="Prompt"
        onChange={(event) => {
          setText(event.target.value);
          resize(event.target);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            submit();
          }
        }}
        className="block w-full resize-none bg-transparent px-1 pt-1 text-[15px] leading-6 text-neutral-900 outline-hidden placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Attach"
          className="flex size-9 items-center justify-center rounded-full border border-black/8 text-neutral-600 transition-colors hover:bg-black/4 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/6"
        >
          <Paperclip className="size-4" />
        </button>
        {chips.map((chip, index) => (
          <button
            key={chip}
            ref={chipRefs[index]}
            type="button"
            onClick={() => onChipClick?.(chip)}
            className="h-9 rounded-full border border-black/8 px-3.5 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-black/4 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/6"
          >
            {chip}
          </button>
        ))}
        <span className="ms-auto hidden text-xs text-neutral-400 sm:block dark:text-neutral-500">
          Enter to send
        </span>
        <MetalFx
          variant="circle"
          preset={preset}
          theme={resolved}
          reflectionTargets={chipRefs}
          className={cn('inline-flex', !canSend && 'opacity-70')}
        >
          <button
            type="button"
            aria-label="Send"
            disabled={!canSend}
            onClick={submit}
            className="flex size-9 items-center justify-center rounded-full text-neutral-900 transition-transform active:scale-95 disabled:cursor-not-allowed dark:text-white"
          >
            <ArrowUp className="size-4" />
          </button>
        </MetalFx>
      </div>
    </div>
  );
}
