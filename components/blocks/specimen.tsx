'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Code2, Copy, Terminal } from 'lucide-react';
import { BLOCK_DEMOS } from '@/components/blocks/demos';
import { cn } from '@/lib/utils';

interface SpecimenProps {
  slug: string;
  /** "01", "02" … position on the page. */
  number: string;
  name: string;
  description: string;
  variants: string[];
  /** Full source of the block, read off disk by the server page. */
  source: string;
  cli: string;
}

/**
 * One block, presented the way a specimen deserves: numbered, described in a
 * line, and rendered live at actual size on a quiet grey stage. No scaling, no
 * screenshots — you watch the real component work, switch its variants in
 * place, and flip to its source without leaving the page.
 */
export function Specimen({ slug, number, name, description, variants, source, cli }: SpecimenProps) {
  const [variant, setVariant] = useState(variants[0] ?? 'default');
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const demo = BLOCK_DEMOS[slug];

  return (
    <section id={slug} aria-labelledby={`${slug}-title`} className="scroll-mt-28">
      {/* Header — number, name and description share one baseline. */}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-[12px] tabular-nums text-neutral-400 dark:text-neutral-600">
          {number}
        </span>
        <h2
          id={`${slug}-title`}
          className="text-[15px] font-semibold tracking-[-0.1px] text-neutral-900 dark:text-neutral-50"
        >
          {name}
        </h2>
        <p className="text-[13.5px] text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>

      {/* Stage */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F2F2F3] dark:border-white/[0.07] dark:bg-white/[0.035]">
        <div className="absolute right-3 top-3 z-10 flex gap-1.5">
          <CopySourceButton source={source} />
          <IconButton
            label={view === 'code' ? 'Show preview' : 'Show code'}
            pressed={view === 'code'}
            onClick={() => setView((v) => (v === 'code' ? 'preview' : 'code'))}
          >
            <Code2 className="size-3.5" />
          </IconButton>
        </div>

        {view === 'preview' ? (
          <div className="flex min-h-[440px] items-center justify-center px-6 py-14 sm:px-10">
            {demo ? demo(variant) : null}
          </div>
        ) : (
          <pre
            tabIndex={0}
            aria-label={`Source of ${name}`}
            className="max-h-[520px] min-h-[440px] overflow-auto p-6 font-mono text-[12px] leading-[1.7] text-neutral-700 focus-visible:outline-none dark:text-neutral-300"
          >
            <code>{source}</code>
          </pre>
        )}

        {view === 'preview' && variants.length > 1 && (
          <div
            role="tablist"
            aria-label={`${name} variants`}
            className="absolute inset-x-0 bottom-4 flex justify-center gap-1"
          >
            {variants.map((v) => {
              const active = v === variant;
              return (
                <button
                  key={v}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setVariant(v)}
                  className={cn(
                    'rounded-full px-3 py-1 text-[12px] font-medium capitalize',
                    'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                    active
                      ? 'border border-black/[0.08] bg-white text-neutral-900 shadow-sm dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-50'
                      : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300',
                  )}
                >
                  {v}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Install row — the reference has nothing here, but installability is the
          whole product; keep it quiet and mono. */}
      <CliRow command={cli} />
    </section>
  );
}

function IconButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'grid size-7 place-items-center rounded-lg border transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
        pressed
          ? 'border-black/[0.1] bg-white text-neutral-900 dark:border-white/[0.14] dark:bg-neutral-900 dark:text-neutral-100'
          : 'border-black/[0.06] bg-white/70 text-neutral-400 hover:text-neutral-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-500 dark:hover:text-neutral-200',
      )}
    >
      {children}
    </button>
  );
}

function CopySourceButton({ source }: { source: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <IconButton label={copied ? 'Source copied' : 'Copy source'} onClick={copy}>
      {copied ? (
        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </IconButton>
  );
}

function CliRow({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Command copied' : `Copy install command: ${command}`}
      className="group mt-3 inline-flex items-center gap-2 font-mono text-[11.5px] text-neutral-400 transition-colors duration-150 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-600 dark:hover:text-neutral-300"
    >
      {copied ? (
        <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Terminal className="size-3" />
      )}
      {command}
    </button>
  );
}
