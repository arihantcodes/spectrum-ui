'use client';

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FooterBar, type FooterSocial } from './footer-kit';

export type WordmarkSpotlightFooterVariant = 'Spotlight' | 'Static';

export interface WordmarkSpotlightFooterProps {
  socials?: FooterSocial[];
  wordmark: string;
  tagline?: string;
  groups?: { title: string; links: { label: string; href: string }[] }[];
  legal?: { label: string; href: string }[];
  copyright?: string;
  radius?: number;
  variant?: WordmarkSpotlightFooterVariant;
  className?: string;
}

export function WordmarkSpotlightFooter({
  socials,
  wordmark,
  tagline,
  groups = [],
  legal,
  copyright,
  radius = 260,
  variant = 'Spotlight',
  className,
}: WordmarkSpotlightFooterProps) {
  const stage = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const box = stage.current?.getBoundingClientRect();
    if (!box) return;
    setPointer({ x: event.clientX - box.left, y: event.clientY - box.top });
  }, []);

  const lit = variant === 'Spotlight' && pointer !== null;
  const fontSize = `clamp(36px, ${(140 / Math.max(1, wordmark.length)).toFixed(2)}cqi, 240px)`;

  return (
    <footer
      className={cn('w-full border-t border-white/[0.07] bg-[#08080A] text-neutral-100', className)}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-12">
        {groups.length > 0 && (
          <nav aria-label="Footer" className="grid gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[13px] font-medium text-neutral-50">{group.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-neutral-400 transition-colors duration-150 hover:text-neutral-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
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
          brand={wordmark}
          copyright={copyright}
          links={legal}
          socials={socials}
          tone="dark"
          className="pb-6"
        />
      </div>

      <div
        ref={stage}
        onPointerMove={variant === 'Spotlight' ? onPointerMove : undefined}
        onPointerLeave={() => setPointer(null)}
        className="relative select-none overflow-hidden px-6 pb-6"
        style={{ containerType: 'inline-size' }}
      >
        {tagline && (
          <p className="mx-auto mb-4 max-w-[1180px] text-pretty text-[13px] leading-[1.6] text-neutral-400">
            {tagline}
          </p>
        )}

        <div className="relative mx-auto max-w-[1180px]">
          <p
            aria-hidden
            className="whitespace-nowrap font-semibold leading-[0.82] tracking-[-0.05em] text-white/[0.055]"
            style={{ fontSize }}
          >
            {wordmark}
          </p>

          <p
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 whitespace-nowrap font-semibold leading-[0.82] tracking-[-0.05em] text-white transition-opacity duration-300 ease-out motion-reduce:transition-none',
              lit ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              fontSize,
              WebkitMaskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, #000 0%, rgba(0,0,0,0.45) 45%, transparent 72%)`
                : undefined,
              maskImage: pointer
                ? `radial-gradient(${radius}px circle at ${pointer.x}px ${pointer.y}px, #000 0%, rgba(0,0,0,0.45) 45%, transparent 72%)`
                : undefined,
            }}
          >
            {wordmark}
          </p>

          <span className="sr-only">{wordmark}</span>
        </div>
      </div>
    </footer>
  );
}

export default WordmarkSpotlightFooter;
