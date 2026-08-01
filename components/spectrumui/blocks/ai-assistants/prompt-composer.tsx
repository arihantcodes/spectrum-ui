'use client';

import { useRef, useState } from 'react';
import { ArrowUp, Check, ChevronDown, Paperclip, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Attachment, ModelOption } from './types';

export type PromptComposerVariant = 'Default' | 'Minimal';

export interface PromptComposerProps {
  placeholder?: string;
  models?: ModelOption[];
  defaultModelId?: string;
  attachments?: Attachment[];
  onRemoveAttachment?: (id: string) => void;
  onAttach?: () => void;
  onSend?: (text: string, modelId?: string) => void;
  onStop?: () => void;
  isGenerating?: boolean;
  maxLength?: number;
  variant?: PromptComposerVariant;
  className?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function PromptComposer({
  placeholder = 'Ask anything…',
  models = [],
  defaultModelId,
  attachments = [],
  onRemoveAttachment,
  onAttach,
  onSend,
  onStop,
  isGenerating = false,
  maxLength = 2000,
  variant = 'Default',
  className,
}: PromptComposerProps) {
  const [value, setValue] = useState('');
  const [modelId, setModelId] = useState(defaultModelId ?? models[0]?.id);
  const [pickerOpen, setPickerOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const activeModel = models.find((model) => model.id === modelId);
  const canSend = value.trim().length > 0 && !isGenerating;
  const minimal = variant === 'Minimal';

  function submit() {
    if (!canSend) return;
    onSend?.(value.trim(), modelId);
    setValue('');
    if (textarea.current) textarea.current.style.height = 'auto';
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className={cn(
        'w-full max-w-[560px] rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-[border-color,box-shadow] duration-150 focus-within:border-black/[0.18] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] dark:border-white/[0.09] dark:bg-[#0B0B0D] dark:focus-within:border-white/[0.24] dark:focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]',
        className,
      )}
    >
      {attachments.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 px-3 pt-3">
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="flex items-center gap-1.5 rounded-lg border border-black/[0.07] bg-black/[0.02] py-1 pl-2 pr-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <Paperclip className="size-3 text-neutral-400 dark:text-neutral-500" />
              <span className="max-w-[140px] truncate text-[11.5px] font-medium text-neutral-700 dark:text-neutral-300">
                {attachment.name}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-neutral-400 dark:text-neutral-600">
                {formatSize(attachment.size)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${attachment.name}`}
                onClick={() => onRemoveAttachment?.(attachment.id)}
                className="grid size-4 place-items-center rounded text-neutral-400 transition-[color,transform] duration-150 hover:text-neutral-700 active:scale-[0.9] dark:hover:text-neutral-200"
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="px-3.5 pt-3">
        <textarea
          ref={textarea}
          value={value}
          rows={minimal ? 1 : 2}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label="Prompt"
          onChange={(event) => {
            setValue(event.target.value);
            event.target.style.height = 'auto';
            event.target.style.height = `${Math.min(event.target.scrollHeight, 132)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-[132px] w-full resize-none bg-transparent text-[13.5px] leading-[1.6] text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1.5">
        <div className="flex min-w-0 items-center gap-1">
          {!minimal && (
            <button
              type="button"
              aria-label="Attach a file"
              onClick={onAttach}
              className="grid size-7 shrink-0 place-items-center rounded-lg text-neutral-400 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-700 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
            >
              <Paperclip className="size-3.5" />
            </button>
          )}

          {!minimal && models.length > 0 && (
            <div className="relative min-w-0">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen((open) => !open)}
                className="flex min-w-0 items-center gap-1 rounded-lg px-2 py-1 font-mono text-[11px] text-neutral-500 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.04] hover:text-neutral-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-neutral-200"
              >
                <span className="truncate">{activeModel?.name ?? 'Model'}</span>
                <ChevronDown
                  className={cn(
                    'size-3 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                    pickerOpen && 'rotate-180',
                  )}
                />
              </button>

              {pickerOpen && (
                <ul
                  role="listbox"
                  aria-label="Model"
                  className="absolute bottom-full left-0 z-10 mb-1.5 w-56 rounded-xl border border-black/[0.08] bg-white p-1 shadow-lg dark:border-white/[0.1] dark:bg-neutral-900"
                >
                  {models.map((model) => {
                    const selected = model.id === modelId;
                    return (
                      <li key={model.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          disabled={model.disabled}
                          onClick={() => {
                            setModelId(model.id);
                            setPickerOpen(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                            model.disabled
                              ? 'cursor-not-allowed opacity-40'
                              : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06]',
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12.5px] font-medium text-neutral-800 dark:text-neutral-200">
                              {model.name}
                            </span>
                            {model.description && (
                              <span className="block truncate text-[11px] text-neutral-400 dark:text-neutral-500">
                                {model.description}
                              </span>
                            )}
                          </span>
                          {model.badge && !selected && (
                            <span className="shrink-0 rounded bg-black/[0.05] px-1 py-0.5 font-mono text-[9px] uppercase tracking-wide text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-400">
                              {model.badge}
                            </span>
                          )}
                          {selected && <Check className="size-3.5 shrink-0 text-neutral-600 dark:text-neutral-300" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!minimal && (
            <span
              className={cn(
                'font-mono text-[10.5px] tabular-nums transition-colors duration-150',
                value.length > maxLength * 0.9
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-neutral-300 dark:text-neutral-600',
              )}
            >
              {value.length}/{maxLength}
            </span>
          )}

          <button
            type={isGenerating ? 'button' : 'submit'}
            onClick={isGenerating ? onStop : undefined}
            aria-label={isGenerating ? 'Stop generating' : 'Send prompt'}
            disabled={!isGenerating && !canSend}
            className="grid size-7 place-items-center rounded-full bg-neutral-900 text-white transition-[transform,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.92] disabled:opacity-30 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <span className="relative grid size-3.5 place-items-center">
              <ArrowUp
                className={cn(
                  'absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  isGenerating ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0',
                )}
              />
              <Square
                className={cn(
                  'absolute size-2.5 fill-current transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  isGenerating ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]',
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PromptComposer;
