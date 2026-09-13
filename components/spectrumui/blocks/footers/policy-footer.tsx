'use client';

import { useId, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72123 18.1441C8.36923 18.1441 8.04323 17.9591 7.86223 17.6561C6.94423 16.1161 5.76323 14.7311 4.35423 13.5401C3.93223 13.1831 3.88023 12.5521 4.23623 12.1301C4.59323 11.7071 5.22323 11.6551 5.64523 12.0121C6.78923 12.9791 7.80023 14.0621 8.66223 15.2441C10.2992 12.5971 13.5172 8.40012 18.5642 5.95512C19.0612 5.71612 19.6592 5.92112 19.9002 6.41912C20.1402 6.91612 19.9332 7.51412 19.4362 7.75512C13.8602 10.4561 10.7022 15.5491 9.60423 17.6141C9.43423 17.9321 9.10623 18.1351 8.74523 18.1441H8.72123Z"
      />
    </svg>
  );
}

function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3.5, 2)"
        d="M9.07075879,0.0995641968 L15.708183,2.32651721 C16.4511557,2.57461017 16.953518,3.25711096 16.9575449,4.02198254 L16.9998279,10.6626368 C17.0129155,12.675818 16.2790035,14.6282017 14.9350081,16.1579449 C14.3168709,16.8600578 13.5245681,17.4631296 12.5127963,18.0024621 L8.94491652,19.909738 C8.8331686,19.9685743 8.71034655,19.998973 8.58651777,19.9999774 C8.46268898,20.0009343 8.3388602,19.9715161 8.22811901,19.9136604 L4.62701688,18.0505117 C3.60417099,17.5200047 2.80482095,16.9257583 2.18064334,16.2334514 C0.814499758,14.719398 0.055419243,12.7758397 0.0423316479,10.7597166 L2.41764636e-05,4.12396542 C-0.00397830397,3.35811323 0.489323357,2.67070942 1.22826911,2.41281041 L7.84052485,0.106428429 C8.2331527,-0.0328174223 8.67108377,-0.035759236 9.07075879,0.0995641968 Z M12.2448026,7.21865543 C11.9478149,6.93329949 11.4696143,6.9352607 11.1766535,7.22453905 L11.1766535,7.22453905 L7.80810788,10.5448662 L6.42887671,9.21908878 C6.13188897,8.93373285 5.65469512,8.93667466 5.3607276,9.22595301 C5.06776682,9.51523137 5.07078703,9.98003794 5.36777476,10.2653939 L5.36777476,10.2653939 L7.28359734,12.1089305 C7.43259457,12.2520988 7.62588829,12.3227023 7.819182,12.3207808 C8.01247571,12.3197605 8.20476269,12.2471957 8.35174645,12.1020663 L8.35174645,12.1020663 L12.250843,8.25809629 C12.5438038,7.96881793 12.5407836,7.50401136 12.2448026,7.21865543 Z"
      />
    </svg>
  );
}

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
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={category.label}
        disabled={category.locked}
        onClick={onToggle}
        className={cn(
          'relative mt-0.5 h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-200 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400',
          checked ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-black/[0.12] dark:bg-white/[0.16]',
          category.locked && 'cursor-not-allowed opacity-55',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'absolute top-[3px] size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-[left] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none dark:bg-neutral-900',
            checked ? 'left-[19px]' : 'left-[3px]',
          )}
        />
      </button>
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
  brand,
  legalName,
  categories,
  legal = [],
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
            className="inline-flex h-9 w-fit items-center gap-2 rounded-full border border-black/[0.09] px-3.5 text-[12.5px] font-medium text-neutral-700 transition-[color,border-color,scale] duration-150 ease-out hover:border-black/[0.2] hover:text-neutral-950 active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/[0.1] dark:text-neutral-300 dark:hover:border-white/[0.22] dark:hover:text-neutral-50"
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
              <button
                type="button"
                onClick={save}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 text-[12.5px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
              >
                Save preferences
              </button>
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

        <div className="mt-8 flex flex-col gap-3 border-t border-black/[0.07] pt-5 text-[12px] text-neutral-500 dark:border-white/[0.08] lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}

export default PolicyFooter;
