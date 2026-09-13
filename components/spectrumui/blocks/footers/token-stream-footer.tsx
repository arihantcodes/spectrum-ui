'use client';

import { Fragment, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';
import { FooterBar, type FooterSocial } from './footer-kit';

const KEYFRAMES = `
@keyframes su-token-in { from { opacity: 0; transform: translateY(6px); filter: blur(4px) } to { opacity: 1; transform: none; filter: blur(0) } }
@keyframes su-token-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
`;

export type TokenStreamFooterVariant = 'Stream' | 'Instant';

export interface TokenStreamFooterProps {
  links?: { label: string; href: string }[];
  socials?: FooterSocial[];
  brand: string;
  manifesto: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  meta?: { label: string; value: string }[];
  copyright?: string;
  tokenDelay?: number;
  variant?: TokenStreamFooterVariant;
  className?: string;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function TokenStreamFooter({
  links,
  socials,
  brand,
  manifesto,
  groups = [],
  meta = [],
  copyright,
  tokenDelay = 55,
  variant = 'Stream',
  className,
}: TokenStreamFooterProps) {
  const tokens = useMemo(() => manifesto.split(/(\s+)/), [manifesto]);
  const reduced = usePrefersReducedMotion();
  const immediate = variant === 'Instant' || reduced;
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [renderedFor, setRenderedFor] = useState(manifesto);
  const root = useRef<HTMLElement>(null);

  if (renderedFor !== manifesto) {
    setRenderedFor(manifesto);
    setStarted(false);
    setCount(0);
  }

  useEffect(() => {
    if (immediate || started) return;
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, started]);

  useEffect(() => {
    if (immediate || !started || count >= tokens.length) return;
    const timer = setTimeout(() => setCount((current) => current + 1), tokenDelay);
    return () => clearTimeout(timer);
  }, [count, immediate, started, tokenDelay, tokens.length]);

  const shown = immediate ? tokens.length : count;
  const streaming = !immediate && started && count < tokens.length;

  return (
    <footer
      ref={root}
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto w-full max-w-[1180px] px-6 py-12">
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
          {brand}
        </span>

        <span className="sr-only">{manifesto}</span>
        <p
          aria-hidden
          className="mt-4 max-w-[34ch] text-balance text-[clamp(23px,3.1vw,34px)] font-semibold leading-[1.18] tracking-[-0.9px]"
        >
          {tokens.map((token, index) => {
            const landed = index < shown;
            return (
              <Fragment key={index}>
                {token.trim() === '' ? (
                  <span aria-hidden>{token}</span>
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      'inline-block',
                      landed
                        ? 'animate-[su-token-in_320ms_cubic-bezier(0.23,1,0.32,1)_backwards] motion-reduce:animate-none'
                        : 'invisible',
                    )}
                  >
                    {token}
                  </span>
                )}
                {streaming && index === shown - 1 && (
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-[0.72em] w-[3px] translate-y-[-0.02em] animate-[su-token-caret_1s_steps(1,end)_infinite] bg-current align-middle motion-reduce:animate-none"
                  />
                )}
              </Fragment>
            );
          })}
        </p>

        {meta.length > 0 && (
          <dl className="mt-9 grid gap-6 border-y border-black/[0.07] py-7 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((entry) => (
              <div key={entry.label}>
                <dt className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
                  {entry.label}
                </dt>
                <dd className="mt-2 font-mono text-[22px] leading-none tabular-nums tracking-[-0.6px] text-neutral-900 dark:text-neutral-100">
                  {entry.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {groups.length > 0 && (
          <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

export default TokenStreamFooter;
