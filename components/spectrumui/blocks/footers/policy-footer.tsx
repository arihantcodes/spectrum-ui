'use client';

import { useId, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconCheck, IconShield, FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-policy-panel { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type PolicyFooterVariant = 'Bar' | 'Panel';

export interface CookieCategory {
  id: string;
  label: string;
  description: string;
  locked?: boolean;
}

export interface PolicyFooterProps {
  socials?: FooterSocial[];
  brand: string;
  legalName?: string;
  categories: CookieCategory[];
  legal?: { label: string; href: string }[];
  entities?: string[];
  onSave?: (enabled: string[]) => void;
  copyright?: string;
  variant?: PolicyFooterVariant;
  className?: string;
}

function Toggle({
  category,
  checked,
  onToggle,
}: {
  category: CookieCategory;
  checked: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3 py-3">
      {/* shadcn's Switch rather than a hand-rolled button with role="switch".
          It animates the thumb with a transform instead of `left`, which the
          compositor can run, and it brings the disabled and focus states with
          it. */}
      <Switch
        id={id}
        checked={checked}
        disabled={category.locked}
        onCheckedChange={onToggle}
        aria-label={category.label}
        className={cn('mt-0.5 shrink-0', category.locked && 'cursor-not-allowed opacity-55')}
      />
      <label htmlFor={id} className="min-w-0 cursor-pointer select-none">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
          {category.label}
          {category.locked && (
            <span className="rounded-full bg-black/[0.05] px-1.5 py-px font-mono text-[9.5px] uppercase tracking-[0.06em] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
              Always on
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-pretty text-[11.5px] leading-[1.5] text-neutral-500 dark:text-neutral-400">
          {category.description}
        </span>
      </label>
    </div>
  );
}

export function PolicyFooter({
  socials,
  brand,
  legalName,
  categories,
  legal,
  entities = [],
  onSave,
  copyright,
  variant = 'Bar',
  className,
}: PolicyFooterProps) {
  const [enabled, setEnabled] = useState<string[]>(
    categories.filter((category) => category.locked).map((category) => category.id),
  );
  const [open, setOpen] = useState(variant === 'Panel');
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSaved(false);
    setEnabled((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  }

  function save() {
    onSave?.(enabled);
    setSaved(true);
  }

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] font-semibold tracking-[-0.2px]">{legalName ?? brand}</p>
            {entities.length > 0 && (
              <p className="mt-1 text-[11.5px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
                {entities.join(' · ')}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-9 w-fit cursor-pointer items-center gap-2 rounded-full border border-black/[0.09] px-3.5 text-[12.5px] font-medium text-neutral-700 transition-[color,border-color,scale] duration-150 ease-out hover:border-black/[0.2] hover:text-neutral-950 active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:text-neutral-300 dark:hover:border-white/[0.22] dark:hover:text-neutral-50"
          >
            <IconShield className="size-3.5" />
            Cookie preferences
            <span className="font-mono text-[10.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
              {enabled.length}/{categories.length}
            </span>
          </button>
        </div>

        {open && (
          <div className="mt-5 animate-[su-policy-panel_200ms_cubic-bezier(0.23,1,0.32,1)] rounded-xl border border-black/[0.08] bg-[#FAFAFA] px-4 py-1 motion-reduce:animate-none dark:border-white/[0.09] dark:bg-white/[0.03]">
            <div className="divide-y divide-black/[0.06] dark:divide-white/[0.07]">
              {categories.map((category) => (
                <Toggle
                  key={category.id}
                  category={category}
                  checked={enabled.includes(category.id)}
                  onToggle={() => !category.locked && toggle(category.id)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2.5 border-t border-black/[0.06] py-3 dark:border-white/[0.07]">
              <Button
                type="button"
                onClick={save}
                className="h-8 gap-1.5 rounded-full px-3.5 text-[12.5px] transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Save preferences
              </Button>
              <button
                type="button"
                onClick={() => {
                  setEnabled(categories.map((category) => category.id));
                  setSaved(false);
                }}
                className="h-8 rounded-full px-3 text-[12.5px] text-neutral-500 transition-[color,scale] duration-150 ease-out active:scale-[0.96] hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Accept all
              </button>
              <span
                aria-live="polite"
                className={cn(
                  'inline-flex items-center gap-1 text-[12px] text-emerald-600 transition-opacity duration-200 dark:text-emerald-400',
                  saved ? 'opacity-100' : 'opacity-0',
                )}
              >
                <IconCheck className="size-3.5" />
                Saved
              </span>
            </div>
          </div>
        )}

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={legal}
          socials={socials}
          className="mt-8"
        />
      </div>
    </footer>
  );
}

export default PolicyFooter;
