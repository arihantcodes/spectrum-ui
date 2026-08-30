'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { BLOCK_DEMOS } from '@/components/blocks/demos';
import { CodeDrawer } from '@/components/blocks/code-drawer';
import { Copy1Icon } from '@/app/(docs)/layout-parts/docs-icons';
import { useAuthGate } from '@/hooks/use-auth-gate';
import { trackEvent } from '@/lib/events';
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
  /**
   * `bleed` drops the stage padding and centring and moves the variant pills
   * and code buttons into the header row. Page-width blocks — pricing tables,
   * footers — read as cards when floated inside a padded letterbox.
   */
  stage?: 'inset' | 'bleed';
}

/**
 * One block, presented the way a specimen deserves: numbered, described in a
 * line, and rendered live at actual size on a quiet grey stage. Variants switch
 * the block's state in place; the code button opens a right-hand drawer with
 * the three install paths (CLI, MCP, source), each login-gated like /docs.
 */
export function Specimen({
  slug,
  number,
  name,
  description,
  variants,
  source,
  stage = 'inset',
}: SpecimenProps) {
  const [variant, setVariant] = useState(variants[0] ?? 'default');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const demo = BLOCK_DEMOS[slug];
  const bleed = stage === 'bleed';

  const pills =
    variants.length > 1 ? (
      <div role="tablist" aria-label={`${name} variants`} className="flex gap-1">
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
                'transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
                active
                  ? 'border border-black/[0.08] bg-white text-neutral-900 shadow-xs dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-50'
                  : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300',
              )}
            >
              {v}
            </button>
          );
        })}
      </div>
    ) : null;

  const controls = (
    <div className="flex gap-1.5">
      <CopySourceButton source={source} slug={slug} />
      <IconButton
        label={`View ${name} code and install options`}
        onClick={() => setDrawerOpen(true)}
      >
        <CodeGlyph />
      </IconButton>
    </div>
  );

  return (
    <section id={slug} aria-labelledby={`${slug}-title`} className="scroll-mt-28">
      {/* Header — number, name and description share one baseline. On a bleed
          stage the pills and code buttons join it, because there is no padding
          left inside the stage to float them over. */}
      <div className={cn('flex flex-wrap items-baseline gap-x-2.5 gap-y-1', bleed && 'gap-y-3')}>
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
        {bleed && (
          <div className="ml-auto flex items-center gap-2">
            {pills}
            {controls}
          </div>
        )}
      </div>

      {/* Stage */}
      <div
        className={cn(
          'relative mt-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F2F2F3] dark:border-white/[0.07] dark:bg-white/[0.035]',
        )}
      >
        {!bleed && <div className="absolute right-3 top-3 z-10">{controls}</div>}

        <div
          className={cn(
            'flex',
            bleed
              ? 'min-h-[320px] flex-col justify-center p-4 sm:p-6 lg:p-8'
              : 'min-h-[440px] items-center justify-center px-6 py-14 sm:px-10',
          )}
        >
          {demo ? demo(variant) : null}
        </div>

        {!bleed && pills && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center">{pills}</div>
        )}
      </div>

      <CodeDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        name={name}
        slug={slug}
        source={source}
      />
    </section>
  );
}

/** The docs pages' code glyph, kept consistent across surfaces. */
function CodeGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
      <path
        d="m10 4.5 3.5 3.5L10 11.5m-4-7L2.5 8 6 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
        'border-black/[0.06] bg-white/70 text-neutral-400 hover:text-neutral-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-500 dark:hover:text-neutral-200',
      )}
    >
      {children}
    </button>
  );
}

/** Copies the block source — login required, same gate as the docs pages. */
function CopySourceButton({ source, slug }: { source: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { isAuthenticated, openAuthModal } = useAuthGate();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!isAuthenticated) {
      trackEvent({ name: 'view_code_clicked', properties: { authenticated: false } });
      openAuthModal();
      return;
    }
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      return;
    }
    setCopied(true);
    trackEvent({ name: 'view_code_clicked', properties: { authenticated: true, component: slug } });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <IconButton label={copied ? 'Source copied' : 'Copy source'} onClick={copy}>
      {copied ? (
        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Copy1Icon className="size-3.5" />
      )}
    </IconButton>
  );
}
