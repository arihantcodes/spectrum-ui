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

function IconSparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="translate(1.99962, 2.5001)"
        d="M15.9188758,11.82 C15.6598758,12.071 15.5408758,12.434 15.5998758,12.79 L16.4888758,17.71 C16.5638758,18.127 16.3878758,18.549 16.0388758,18.79 C15.6968758,19.04 15.2418758,19.07 14.8688758,18.87 L10.4398758,16.56 C10.2858758,16.478 10.1148758,16.434 9.93987581,16.429 L9.66887581,16.429 C9.57487581,16.443 9.48287581,16.473 9.39887581,16.519 L4.96887581,18.84 C4.74987581,18.95 4.50187581,18.989 4.25887581,18.95 C3.66687581,18.838 3.27187581,18.274 3.36887581,17.679 L4.25887581,12.759 C4.31787581,12.4 4.19887581,12.035 3.93987581,11.78 L0.32887581,8.28 C0.0268758104,7.987 -0.0781241896,7.547 0.0598758104,7.15 C0.19387581,6.754 0.53587581,6.465 0.94887581,6.4 L5.91887581,5.679 C6.29687581,5.64 6.62887581,5.41 6.79887581,5.07 L8.98887581,0.58 C9.04087581,0.48 9.10787581,0.388 9.18887581,0.31 L9.27887581,0.24 C9.32587581,0.188 9.37987581,0.145 9.43987581,0.11 L9.54887581,0.07 L9.71887581,5.32907052e-15 L10.1398758,5.32907052e-15 C10.5158758,0.039 10.8468758,0.264 11.0198758,0.6 L13.2388758,5.07 C13.3988758,5.397 13.7098758,5.624 14.0688758,5.679 L19.0388758,6.4 C19.4588758,6.46 19.8098758,6.75 19.9488758,7.15 C20.0798758,7.551 19.9668758,7.991 19.6588758,8.28 L15.9188758,11.82 Z"
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes su-wait-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
@keyframes su-wait-sheen { 0% { transform: translateX(-120%) } 55%, 100% { transform: translateX(220%) } }
`;

export type WaitlistFooterVariant = 'Waitlist' | 'Launched';

export interface WaitlistAvatar {
  /** Photo URL. Alt text stays empty — the count beside the stack says the thing. */
  src: string;
  /** Used as the React key and as the fallback monogram if the photo 404s. */
  initials: string;
}

export interface WaitlistFooterProps {
  brand: string;
  headline?: string;
  blurb?: string;
  avatars?: WaitlistAvatar[];
  count?: number;
  ctaLabel?: string;
  onJoin?: (email: string) => void;
  links?: { label: string; href: string }[];
  copyright?: string;
  variant?: WaitlistFooterVariant;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistFooter({
  brand,
  headline = 'Get in before we open the doors.',
  blurb = 'Invites go out in the order they were requested. No queue-jumping, no referral loops.',
  avatars = [],
  count = 2418,
  ctaLabel = 'Request an invite',
  onJoin,
  links = [],
  copyright,
  variant = 'Waitlist',
  className,
}: WaitlistFooterProps) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);
  const inputId = useId();
  const launched = variant === 'Launched';

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setJoined(true);
    onJoin?.(email.trim());
  }

  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden border-t border-white/[0.07] bg-[#08080A] text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.09),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[720px] px-6 py-14 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-400">
          <IconSparkle className="size-3" />
          {launched ? `${brand} is live` : `${brand} · private beta`}
        </span>

        <h2 className="mt-4 text-balance text-[clamp(24px,3.6vw,36px)] font-semibold leading-[1.14] tracking-[-1px]">
          {launched ? 'Doors are open. Come in.' : headline}
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-pretty text-[13.5px] leading-[1.65] text-neutral-400">
          {blurb}
        </p>

        {joined ? (
          <div
            role="status"
            className="mx-auto mt-7 flex w-full max-w-[420px] animate-[su-wait-in_300ms_cubic-bezier(0.23,1,0.32,1)] items-center justify-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] px-4 py-3.5 motion-reduce:animate-none"
          >
            <IconCheck className="size-4 shrink-0 text-emerald-400" />
            <span className="text-[13.5px]">
              You are number{' '}
              <span className="font-mono tabular-nums text-neutral-100">
                {(count + 1).toLocaleString('en-US')}
              </span>{' '}
              in line.
            </span>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-7 w-full max-w-[420px]">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <div
              className={cn(
                'flex h-12 items-center gap-2 rounded-2xl border bg-white/[0.04] pl-4 pr-1.5 transition-[border-color,box-shadow] duration-200',
                error
                  ? 'border-red-500/50'
                  : 'border-white/[0.1] focus-within:border-white/[0.28] focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.04)]',
              )}
            >
              <input
                id={inputId}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                aria-invalid={error}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(false);
                }}
                className="min-w-0 flex-1 bg-transparent text-[14px] text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="relative h-9 shrink-0 overflow-hidden rounded-xl bg-neutral-100 px-4 text-[13px] font-medium text-neutral-900 transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] animate-[su-wait-sheen_3.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent motion-reduce:animate-none"
                />
                <span className="relative">{ctaLabel}</span>
              </button>
            </div>
            <p
              aria-live="polite"
              className={cn('mt-2 text-[12px]', error ? 'text-red-400' : 'text-neutral-400')}
            >
              {error
                ? 'That does not look like an email address.'
                : 'One email when your invite is ready.'}
            </p>
          </form>
        )}

        {avatars.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <span aria-hidden className="flex -space-x-1">
              {avatars.map((avatar, index) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={avatar.initials}
                  src={avatar.src}
                  alt=""
                  loading="lazy"
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover ring-2 ring-[#08080A] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transition-none"
                  style={{ zIndex: avatars.length - index }}
                />
              ))}
            </span>
            <span className="font-mono text-[11.5px] tabular-nums text-neutral-400">
              {(joined ? count + 1 : count).toLocaleString('en-US')} waiting
            </span>
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.07] pt-6 text-[12px] text-neutral-400 sm:flex-row sm:justify-between">
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

export default WaitlistFooter;
