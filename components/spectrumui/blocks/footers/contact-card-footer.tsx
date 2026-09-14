'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  IconCheck,
  IconClock,
  IconCopy,
  IconLocation,
  IconMail,
  IconPhone,
  FooterBar,
  type FooterSocial,
} from './footer-kit';

export type ContactCardFooterVariant = 'Card' | 'Row';

export interface ContactCardFooterProps {
  socials?: FooterSocial[];
  brand: string;
  blurb?: string;
  email: string;
  phone?: string;
  address?: string;
  hours?: string;
  utcOffset?: number;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: ContactCardFooterVariant;
  className?: string;
}

function useLocalTime(utcOffset?: number) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (utcOffset === undefined) return;
    function tick() {
      const now = new Date();
      const shifted = new Date(now.getTime() + (utcOffset! * 60 + now.getTimezoneOffset()) * 60000);
      setTime(
        `${String(shifted.getHours()).padStart(2, '0')}:${String(shifted.getMinutes()).padStart(2, '0')}`,
      );
    }
    tick();
    const timer = setInterval(tick, 15000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  return time;
}

function CopyRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    /* min-w-0: the value below is `truncate`, which sets white-space: nowrap —
       so this row's min-content is the whole unbroken address, and as a grid
       item with the default min-width:auto it refused to shrink below it. */
    <div className="group flex min-w-0 items-center gap-3 rounded-xl border border-black/[0.07] px-3.5 py-2.5 transition-colors duration-200 hover:border-black/[0.14] dark:border-white/[0.08] dark:hover:border-white/[0.16]">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-black/[0.04] text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
        {icon}
      </span>
      <a
        href={href}
        className="min-w-0 flex-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
        <span className="block truncate text-[13.5px] text-neutral-800 dark:text-neutral-200">
          {value}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        className="grid size-8 shrink-0 place-items-center rounded-lg text-neutral-300 opacity-0 transition-[color,opacity,transform] duration-150 ease-out hover:text-neutral-700 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 group-hover:opacity-100 active:scale-[0.96] dark:text-neutral-600 dark:hover:text-neutral-200"
      >
        <span className="relative grid size-3.5 place-items-center">
          <IconCheck
            aria-hidden
            className={cn(
              'absolute size-3.5 text-emerald-600 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:text-emerald-400',
              copied ? 'scale-100 opacity-100 blur-0' : 'scale-[0.25] opacity-0 blur-[4px]',
            )}
          />
          <IconCopy
            aria-hidden
            className={cn(
              'size-3.5 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
              copied ? 'scale-[0.25] opacity-0 blur-[4px]' : 'scale-100 opacity-100 blur-0',
            )}
          />
        </span>
      </button>
    </div>
  );
}

export function ContactCardFooter({
  socials,
  brand,
  blurb = 'Real people answer. Usually within a working day.',
  email,
  phone,
  address,
  hours,
  utcOffset,
  links,
  copyright,
  variant = 'Card',
  className,
}: ContactCardFooterProps) {
  const time = useLocalTime(utcOffset);

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div className="min-w-0">
            <p className="text-[17px] font-semibold tracking-[-0.3px]">{brand}</p>
            <p className="mt-2 max-w-[34ch] text-pretty text-[13.5px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {blurb}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-neutral-500 dark:text-neutral-400">
              {hours && (
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="size-3.5 text-neutral-400" />
                  {hours}
                </span>
              )}
              {time && (
                <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                  <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
                  {time} local
                </span>
              )}
            </div>
          </div>

          <div
            className={cn(
              'grid min-w-0 gap-2',
              variant === 'Row' ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-1',
            )}
          >
            <CopyRow
              icon={<IconMail className="size-4" />}
              label="Email"
              value={email}
              href={`mailto:${email}`}
            />
            {phone && (
              <CopyRow
                icon={<IconPhone className="size-4" />}
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              />
            )}
            {address && (
              <CopyRow
                icon={<IconLocation className="size-4" />}
                label="Studio"
                value={address}
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              />
            )}
          </div>
        </div>

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default ContactCardFooter;
