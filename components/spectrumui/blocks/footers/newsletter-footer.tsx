'use client';

import { useId, useState, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(3, 6)"
        d="M7.83655568,6.36070466 L7.8350323,6.00660914 C7.8350323,4.53497338 7.92121308,3.19331742 8.05102968,2.31870755 L8.16475558,1.77483018 C8.22802754,1.48678171 8.31120835,1.15880301 8.39793457,0.991371397 C8.71538527,0.378924178 9.33610502,0 10.0004606,0 L10.0582781,0 C10.4913637,0.0143198091 11.4011709,0.394345511 11.4011709,0.407563797 C12.8651531,1.02183092 15.6895424,2.87571834 16.9940026,4.19738844 L17.3730714,4.59418673 C17.4723361,4.70172939 17.5838596,4.82900679 17.6530951,4.92821737 C17.884365,5.23444098 18,5.61336516 18,5.99228933 C18,6.41527446 17.8701834,6.80851845 17.6247318,7.13016339 L17.2352725,7.55047018 L17.2352725,7.55047018 L17.1480103,7.6401689 C15.9643883,8.9234441 12.8738803,11.0218469 11.2571726,11.6640352 L11.0130847,11.7575787 C10.719361,11.8628603 10.3078205,11.988434 10.0582781,12 C9.74082738,12 9.43755833,11.9261979 9.14847093,11.7807968 C8.7873844,11.5770149 8.49938789,11.2553699 8.34011709,10.8764457 C8.23866377,10.6142831 8.07939298,9.82669359 8.07939298,9.81237378 C7.93338076,9.01825987 7.84871691,7.76518207 7.83655568,6.36070466 Z M1.77635684e-15,5.99955939 C1.77635684e-15,5.1612998 0.673082751,4.48165963 1.50325451,4.48165963 L5.20248239,4.80881219 C5.85374723,4.80881219 6.38174083,5.3419497 6.38174083,5.99955939 C6.38174083,6.65827061 5.85374723,7.19030659 5.20248239,7.19030659 L1.50325451,7.51745915 C0.673082751,7.51745915 1.77635684e-15,6.83781898 1.77635684e-15,5.99955939 Z"
      />
    </svg>
  );
}

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

const KEYFRAMES = `
@keyframes su-news-success { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: none } }
@keyframes su-news-shake { 0%, 100% { transform: translateX(0) } 20% { transform: translateX(-4px) } 40% { transform: translateX(4px) } 60% { transform: translateX(-2px) } 80% { transform: translateX(2px) } }
`;

export type NewsletterFooterVariant = 'Panel' | 'Inline';

export interface NewsletterFooterProps {
  brand: string;
  headline?: string;
  blurb?: string;
  cadence?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  socials?: { label: string; href: string }[];
  onSubscribe?: (email: string) => void;
  copyright?: string;
  variant?: NewsletterFooterVariant;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterFooter({
  brand,
  headline = 'One short email when something worth reading ships.',
  blurb = 'Product notes, teardown posts, and the occasional postmortem. No drip sequence.',
  cadence = 'Roughly monthly · 2,400 readers',
  groups = [],
  socials = [],
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
              'rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-5 dark:border-white/[0.09] dark:bg-white/[0.03] sm:p-7',
            'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center',
          )}
        >
          {/* min-w-0: grid items refuse to shrink below their min-content by
              default, which pushed the panel past the viewport on a phone. */}
          <div className="min-w-0">
            <h2 className="max-w-[22ch] text-balance text-[22px] font-semibold leading-[1.18] tracking-[-0.5px]">
              {headline}
            </h2>
            <p className="mt-2.5 max-w-[44ch] text-pretty text-[13.5px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
              {blurb}
            </p>
            <p className="mt-3 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
              {cadence}
            </p>
          </div>

          <div className="min-w-0 lg:w-full lg:max-w-[380px] lg:justify-self-end">
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
                    'flex h-12 items-center gap-2 rounded-xl border bg-white pl-4 pr-1.5 transition-[border-color,box-shadow] duration-200 dark:bg-white/[0.04]',
                    state === 'error'
                      ? 'animate-[su-news-shake_320ms_ease-out] border-red-500/45 motion-reduce:animate-none'
                      : 'border-black/[0.1] focus-within:border-black/[0.28] focus-within:shadow-[0_2px_14px_-4px_rgba(0,0,0,0.12)] dark:border-white/[0.1] dark:focus-within:border-white/[0.3]',
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
                    className="group inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 text-[13px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-100 dark:text-neutral-900"
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
              </form>
            )}
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

        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.07] pt-6 text-[12px] text-neutral-500 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:text-neutral-200"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default NewsletterFooter;
