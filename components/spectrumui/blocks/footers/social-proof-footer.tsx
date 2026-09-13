'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

/* Iconly Pro (Bold) glyphs, inlined so the block copies out with no icon
   dependency — the same convention the Tables wave uses. */
type IconProps = SVGProps<SVGSVGElement>;

function IconStar(props: IconProps) {
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
@keyframes su-proof-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
`;

export type SocialProofFooterVariant = 'Marquee' | 'Grid';

export interface ProofStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface SocialProofFooterProps {
  brand: string;
  customers: string[];
  stats: ProofStat[];
  rating?: number;
  ratingSource?: string;
  links?: { label: string; href: string }[];
  copyright?: string;
  speed?: number;
  variant?: SocialProofFooterVariant;
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

function useCountUp(target: number, run: boolean) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!run || reduced) return;
    const duration = 900;
    let start: number | null = null;

    function step(now: number) {
      if (start === null) start = now;
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    }

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [reduced, run, target]);

  return reduced && run ? target : value;
}

function StatValue({ stat, run }: { stat: ProofStat; run: boolean }) {
  const value = useCountUp(stat.value, run);
  const decimals = Number.isInteger(stat.value) ? 0 : 1;
  return (
    <span className="font-mono text-[24px] leading-none tabular-nums tracking-[-0.8px]">
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {stat.suffix}
    </span>
  );
}

export function SocialProofFooter({
  brand,
  customers,
  stats,
  rating = 4.9,
  ratingSource = 'G2 · 214 reviews',
  links = [],
  copyright,
  speed = 34,
  variant = 'Marquee',
  className,
}: SocialProofFooterProps) {
  const [run, setRun] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRun(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const track = [...customers, ...customers];

  return (
    <footer
      ref={root}
      className={cn(
        'w-full border-t border-black/[0.08] bg-white text-neutral-900 dark:border-white/[0.09] dark:bg-[#0A0A0B] dark:text-neutral-100',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="py-12">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              Trusted by product teams
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((index) => (
                  <IconStar
                    key={index}
                    className={cn(
                      'size-3.5',
                      index < Math.round(rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300 dark:text-neutral-700',
                    )}
                  />
                ))}
              </span>
              <span className="font-mono text-[11.5px] tabular-nums text-neutral-500 dark:text-neutral-400">
                {rating.toFixed(1)} · {ratingSource}
              </span>
            </span>
          </div>
        </div>

        {variant === 'Marquee' ? (
          <div
            className="group relative mt-6 overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            }}
          >
            <ul
              aria-label="Customers"
              className="flex w-max animate-[su-proof-marquee_var(--su-speed)_linear_infinite] items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ ['--su-speed' as string]: `${speed}s` }}
            >
              {track.map((customer, index) => (
                <li
                  key={`${customer}-${index}`}
                  aria-hidden={index >= customers.length}
                  className="shrink-0 text-[17px] font-medium tracking-[-0.3px] text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {customer}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul
            aria-label="Customers"
            className="mx-auto mt-6 grid w-full max-w-[1180px] grid-cols-2 gap-x-8 gap-y-5 px-6 sm:grid-cols-4"
          >
            {customers.map((customer) => (
              <li
                key={customer}
                className="text-[16px] font-medium tracking-[-0.3px] text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {customer}
              </li>
            ))}
          </ul>
        )}

        <div className="mx-auto mt-10 w-full max-w-[1180px] px-6">
          <dl className="grid gap-6 border-y border-black/[0.07] py-7 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd>
                  <StatValue stat={stat} run={run} />
                </dd>
                <dt className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 text-[12px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="tabular-nums">{copyright ?? `© ${brand}. All rights reserved.`}</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {links.map((link) => (
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
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SocialProofFooter;
