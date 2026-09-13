'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type SVGProps } from 'react';
import { cn } from '@/lib/utils';
import { IconStar, FooterBar, type FooterSocial } from './footer-kit';

/**
 * Twelve customer marks, invented and drawn here rather than imported.
 *
 * A logo wall that ships with real companies in it looks convincing on this
 * page and is wrong in every install — whoever copies the block inherits
 * somebody else's trademarks and has to strip them before shipping. These are
 * drawn to the same register instead: one colour, `currentColor`, geometry
 * built from straight lines, rectangles and circles on a 24px grid so the set
 * stays optically consistent and crisp at 20px. Pass your own `customers` and
 * nothing else about the block changes.
 */
type MarkProps = SVGProps<SVGSVGElement>;

function Mark({ children, ...props }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function MarkRidgeline(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M2 19.5h20L14.5 7l-3 4.7L8.2 5.5 2 19.5Z" />
    </Mark>
  );
}

export function MarkPostmark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.25" />
    </Mark>
  );
}

export function MarkCalla(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="3" y="3" width="13" height="13" rx="3.5" opacity="0.45" />
      <rect x="8" y="8" width="13" height="13" rx="3.5" />
    </Mark>
  );
}

export function MarkHollowCreek(props: MarkProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="2.5" />
    </Mark>
  );
}

export function MarkTessellate(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M3 3h8.4v8.4H3V3Z" />
      <path d="M12.6 3H21v8.4h-8.4V3Z" opacity="0.45" />
      <path d="M3 12.6h8.4V21H3v-8.4Z" opacity="0.45" />
      <path d="M12.6 12.6H21V21h-8.4v-8.4Z" />
    </Mark>
  );
}

export function MarkBrightHarbour(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M12 2 21.5 11.5l-2.7 2.7L12 7.4l-6.8 6.8L2.5 11.5 12 2Z" />
      <path d="M12 11.8 19.2 19l-2.7 2.7L12 17.2l-4.5 4.5L4.8 19 12 11.8Z" opacity="0.45" />
    </Mark>
  );
}

export function MarkNineYards(props: MarkProps) {
  return (
    <Mark {...props}>
      {[5, 12, 19].map((y) =>
        [5, 12, 19].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={x === 12 && y === 12 ? 2.4 : 1.7} />
        )),
      )}
    </Mark>
  );
}

export function MarkStudioMono(props: MarkProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="8.4" y="8.4" width="7.2" height="7.2" rx="2" />
    </Mark>
  );
}

export function MarkNorthwind(props: MarkProps) {
  return (
    <Mark {...props}>
      <path d="M12 2 22 21.5 12 16.6 2 21.5 12 2Z" />
    </Mark>
  );
}

export function MarkCobalt(props: MarkProps) {
  return (
    <Mark {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2 22 12 12 22 2 12 12 2Zm0 5.3L7.3 12l4.7 4.7 4.7-4.7L12 7.3Z"
      />
    </Mark>
  );
}

export function MarkLinework(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect x="3" y="9" width="4" height="12" rx="2" opacity="0.45" />
      <rect x="10" y="3.5" width="4" height="17.5" rx="2" />
      <rect x="17" y="12.5" width="4" height="8.5" rx="2" opacity="0.45" />
    </Mark>
  );
}

export function MarkMeridian(props: MarkProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M3.4 9h17.2M3.4 15h17.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </Mark>
  );
}

export const DEFAULT_CUSTOMERS: CustomerLogo[] = [
  { name: 'Ridgeline', mark: MarkRidgeline },
  { name: 'Postmark', mark: MarkPostmark },
  { name: 'Calla', mark: MarkCalla },
  { name: 'Hollow Creek', mark: MarkHollowCreek },
  { name: 'Tessellate', mark: MarkTessellate },
  { name: 'Bright Harbour', mark: MarkBrightHarbour },
  { name: 'Nine Yards', mark: MarkNineYards },
  { name: 'Studio Mono', mark: MarkStudioMono },
  { name: 'Northwind', mark: MarkNorthwind },
  { name: 'Cobalt', mark: MarkCobalt },
  { name: 'Linework', mark: MarkLinework },
  { name: 'Meridian', mark: MarkMeridian },
];

const KEYFRAMES = `
@keyframes su-proof-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes su-proof-cell { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export type SocialProofFooterVariant = 'Marquee' | 'Grid';

export interface CustomerLogo {
  name: string;
  mark: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ProofStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface SocialProofFooterProps {
  socials?: FooterSocial[];
  brand: string;
  customers?: CustomerLogo[];
  stats: ProofStat[];
  /** Link columns. A logo wall with no navigation under it is a banner. */
  groups?: { title: string; links: { label: string; href: string }[] }[];
  eyebrow?: string;
  rating?: number;
  ratingSource?: string;
  links?: { label: string; href: string }[];
  copyright?: string;
  /** Seconds for one full pass of the marquee. Longer is calmer. */
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
    <span className="font-mono text-[26px] leading-none tabular-nums tracking-[-1px]">
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {stat.suffix}
    </span>
  );
}

/** Mark plus wordmark, sized as one optical unit. */
function Logo({ logo, className }: { logo: CustomerLogo; className?: string }) {
  const Glyph = logo.mark;
  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap', className)}>
      <Glyph className="size-6 shrink-0" />
      <span className="text-[16px] font-semibold tracking-[-0.4px]">{logo.name}</span>
    </span>
  );
}

export function SocialProofFooter({
  socials,
  brand,
  customers = DEFAULT_CUSTOMERS,
  stats,
  groups = [],
  eyebrow = 'Trusted by product teams',
  rating = 4.9,
  ratingSource = 'G2 · 214 reviews',
  links,
  copyright,
  speed = 42,
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

  /* The track is the list twice over, and the keyframe travels exactly -50%, so
     the seam lands where the second copy sits pixel-for-pixel on the first. */
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

      <div className="py-14">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
              {eyebrow}
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((index) => (
                  <IconStar
                    key={index}
                    className={cn(
                      'size-3.5',
                      index < Math.round(rating)
                        ? 'text-amber-400'
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
          /* The mask is what makes this read as a wall rather than a widget:
             logos arrive and leave through a fade instead of being chopped by
             the viewport edge. */
          <div
            className="group relative mt-8 overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 11%, #000 89%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, #000 11%, #000 89%, transparent)',
            }}
          >
            <ul
              aria-label="Customers"
              className="flex w-max animate-[su-proof-marquee_var(--su-speed)_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ ['--su-speed' as string]: `${speed}s` }}
            >
              {track.map((logo, index) => (
                <li
                  key={`${logo.name}-${index}`}
                  aria-hidden={index >= customers.length}
                  className="shrink-0 text-neutral-400 transition-[color,opacity] duration-150 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                >
                  <Logo logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Plotted grid: one hairline between cells, drawn with insets rather
             than per-cell borders so the outer edge stays open. */
          <div className="mx-auto mt-8 w-full max-w-[1180px] px-6">
            <ul
              aria-label="Customers"
              className="grid grid-cols-2 border-l border-t border-black/[0.07] dark:border-white/[0.08] sm:grid-cols-3 lg:grid-cols-4"
            >
              {customers.map((logo, index) => (
                <li
                  key={logo.name}
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
                  className="flex animate-[su-proof-cell_420ms_cubic-bezier(0.2,0,0,1)_backwards] items-center justify-center border-b border-r border-black/[0.07] px-4 py-7 text-neutral-400 transition-[color] duration-150 hover:text-neutral-900 motion-reduce:animate-none dark:border-white/[0.08] dark:text-neutral-500 dark:hover:text-neutral-100"
                >
                  <Logo logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mx-auto mt-12 w-full max-w-[1180px] px-6">
          <dl className="grid gap-6 border-y border-black/[0.07] py-8 dark:border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd>
                  <StatValue stat={stat} run={run} />
                </dd>
                <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          {groups.length > 0 && (
            <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group) => (
                <div key={group.title} className="min-w-0">
                  <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-500 dark:text-neutral-400">
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
      </div>
    </footer>
  );
}

export default SocialProofFooter;
