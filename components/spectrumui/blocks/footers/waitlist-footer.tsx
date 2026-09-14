'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';
import { IconCheck, IconSparkle, FooterBar, type FooterSocial } from './footer-kit';

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
  socials?: FooterSocial[];
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
  socials,
  brand,
  headline = 'Get in before we open the doors.',
  blurb = 'Invites go out in the order they were requested. No queue-jumping, no referral loops.',
  avatars = [],
  count = 2418,
  ctaLabel = 'Request an invite',
  onJoin,
  links,
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
                /* Stacked under 420px, same reason as the newsletter: an
                   inline CTA this wide leaves no room to read your own
                   address back. */
                'flex flex-col gap-2 rounded-2xl border bg-white/[0.04] p-1.5 transition-[border-color,box-shadow] duration-200 min-[420px]:h-12 min-[420px]:flex-row min-[420px]:items-center min-[420px]:py-0 min-[420px]:pl-4 min-[420px]:pr-1.5',
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
                className="h-9 min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden min-[420px]:h-auto min-[420px]:px-0"
              />
              <button
                type="submit"
                className="relative h-9 shrink-0 overflow-hidden rounded-xl bg-neutral-100 px-4 text-center text-[13px] font-medium text-neutral-900 transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
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

        <FooterBar
          brand={brand}
          copyright={copyright}
          links={links}
          socials={socials}
          tone="dark"
          className="mt-10"
        />
      </div>
    </footer>
  );
}

export default WaitlistFooter;
