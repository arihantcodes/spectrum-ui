'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconArrowRight, IconCheck, FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-news-success { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: none } }
@keyframes su-news-shake { 0%, 100% { transform: translateX(0) } 20% { transform: translateX(-4px) } 40% { transform: translateX(4px) } 60% { transform: translateX(-2px) } 80% { transform: translateX(2px) } }
`;

export type NewsletterFooterVariant = 'Panel' | 'Inline';

export interface NewsletterFooterProps {
  links?: { label: string; href: string }[];
  brand: string;
  headline?: string;
  blurb?: string;
  cadence?: string;
  /** Three lines of "what actually lands in your inbox". Carries the panel. */
  perks?: string[];
  /** Reader avatars beside the count. Photos, not initials. */
  readers?: { src: string; initials: string }[];
  groups?: { title: string; links: { label: string; href: string }[] }[];
  socials?: FooterSocial[];
  onSubscribe?: (email: string) => void;
  copyright?: string;
  variant?: NewsletterFooterVariant;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DEFAULT_PERKS = [
  'New blocks the week they ship',
  'Breaking changes before you hit them',
  "The occasional teardown of somebody else's UI",
];

export function NewsletterFooter({
  links,
  brand,
  headline = 'One short email when something worth reading ships.',
  blurb = 'Product notes, teardown posts, and the occasional postmortem. No drip sequence.',
  cadence = 'Roughly monthly · 2,400 readers',
  perks = DEFAULT_PERKS,
  readers = [],
  groups = [],
  socials,
  onSubscribe,
  copyright,
  variant = 'Panel',
  className,
}: NewsletterFooterProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');
  const inputId = useId();
  const errorId = `${inputId}-error`;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState('error');
      return;
    }
    setState('done');
    onSubscribe?.(email.trim());
  }

  const panel = variant === 'Panel';

  return (
    <footer
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <div
          className={cn(
            panel &&
              'overflow-hidden rounded-[20px] border border-black/[0.08] bg-[#FAFAFA] p-6 dark:border-white/[0.09] dark:bg-white/[0.025] sm:p-9',
          )}
        >
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            {/* min-w-0: grid items refuse to shrink below their min-content by
                default, which pushed the panel past the viewport on a phone. */}
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-neutral-400">
                <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
                {cadence}
              </span>
              <h2 className="mt-4 max-w-[20ch] text-balance text-[clamp(24px,3vw,32px)] font-semibold leading-[1.12] tracking-[-1px]">
                {headline}
              </h2>
              <p className="mt-3 max-w-[46ch] text-pretty text-[14px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
                {blurb}
              </p>

              {perks.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5]">
                      <IconCheck className="mt-[3px] size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-neutral-700 dark:text-neutral-300">{perk}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="min-w-0 lg:w-full lg:max-w-[400px] lg:justify-self-end">
              {state === 'done' ? (
                <div
                  role="status"
                  className="flex animate-[su-news-success_280ms_cubic-bezier(0.23,1,0.32,1)] items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-4 py-3.5 motion-reduce:animate-none"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500/15">
                    <IconCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium">Check your inbox</span>
                    <span className="block truncate text-[12px] text-neutral-500 dark:text-neutral-400">
                      Confirmation sent to {email.trim()}
                    </span>
                  </span>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <div
                    className={cn(
                      'flex h-[52px] items-center gap-2 rounded-xl border bg-white pl-4 pr-1.5 transition-[border-color,box-shadow] duration-200 dark:bg-white/[0.04]',
                      state === 'error'
                        ? 'animate-[su-news-shake_320ms_ease-out] border-red-500/45 motion-reduce:animate-none'
                        : 'border-black/[0.1] focus-within:border-black/[0.3] focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.05)] dark:border-white/[0.1] dark:focus-within:border-white/[0.32] dark:focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]',
                    )}
                  >
                    <input
                      id={inputId}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      aria-invalid={state === 'error'}
                      aria-describedby={state === 'error' ? errorId : undefined}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      className="min-w-0 flex-1 bg-transparent text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden dark:text-neutral-100 dark:placeholder:text-neutral-600"
                    />
                    <button
                      type="submit"
                      className="group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[9px] bg-neutral-900 px-4 text-[13.5px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
                    >
                      Subscribe
                      <IconArrowRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </button>
                  </div>
                  <p
                    id={errorId}
                    aria-live="polite"
                    className={cn(
                      'mt-2 text-[12px] transition-opacity duration-150',
                      state === 'error'
                        ? 'text-red-600 opacity-100 dark:text-red-400'
                        : 'text-neutral-500 opacity-100 dark:text-neutral-400',
                    )}
                  >
                    {state === 'error'
                      ? 'That does not look like an email address.'
                      : 'Unsubscribe in one click. We never sell the list.'}
                  </p>

                  {readers.length > 0 && (
                    <div className="mt-5 flex items-start gap-3">
                      <span aria-hidden className="flex shrink-0 -space-x-2">
                        {readers.map((reader, index) => (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            key={reader.initials}
                            src={reader.src}
                            alt=""
                            loading="lazy"
                            width={28}
                            height={28}
                            className="size-7 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 ring-2 ring-[#FAFAFA] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transition-none dark:outline-white/10 dark:ring-[#0B0B0C]"
                            style={{ zIndex: readers.length - index }}
                          />
                        ))}
                      </span>
                      <span className="text-[12.5px] text-neutral-500 dark:text-neutral-400">
                        Read by design engineers at large teams and two-person studios.
                      </span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {groups.length > 0 && (
          <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-neutral-600 transition-colors duration-150 hover:text-neutral-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}

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

export default NewsletterFooter;
