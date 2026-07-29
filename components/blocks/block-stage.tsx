'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Blocks are authored for a desktop composition and scaled down to fit. */
const AUTHORED_WIDTH = 1280;

interface BlockStageProps {
  children: React.ReactNode;
  /** Aspect of the stage. Chat blocks are tall; marketing sections are wide. */
  ratio?: '16/10' | '4/3' | '1/1';
  /** Renders the stage in dark mode regardless of the page theme. */
  forceDark?: boolean;
  /** Ruler ticks on the frame edges. Off for small in-card stages. */
  rulers?: boolean;
  className?: string;
}

/**
 * The mounting surface every block preview sits on.
 *
 * Blocks render at a fixed authored width and are scaled to fit rather than
 * reflowed. A chat block squeezed into a 380px card would render its mobile
 * layout, which misrepresents what you are installing — scaling shows the real
 * desktop composition, just smaller.
 *
 * The dot grid appears only inside stages. Containing the texture to the
 * mounting surface is what makes it read as deliberate framing instead of
 * decoration sprayed across the page.
 */
export function BlockStage({
  children,
  ratio = '16/10',
  forceDark = false,
  rulers = true,
  className,
}: BlockStageProps) {
  const frame = useRef<HTMLDivElement>(null);
  /**
   * Seeded at a typical two-up card width so the first paint is close before
   * hydration. The stage clips, so a slightly wrong scale is a crop, never
   * invisible content — reveals must not depend on JS.
   */
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width > 0) setScale(width / AUTHORED_WIDTH);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[10px] bg-[#F7F7F8] dark:bg-[#08080A]',
        'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]',
        forceDark && 'dark bg-[#08080A]',
        className,
      )}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      {/* Dot grid — the only texture in the design, and only here. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {rulers && <StageRulers />}

      <div ref={frame} className="absolute inset-0">
        <div
          className="origin-top-left"
          style={{
            width: AUTHORED_WIDTH,
            transform: `scale(${scale})`,
            // Counteract the scale so the child still fills the stage height.
            height: scale > 0 ? `${100 / scale}%` : '100%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Tick marks on the frame edges. Borrowed from the dashed rules already in the
 * codebase (.border-grid, CornerDot) so the section reads as a spec sheet — the
 * right register for something you are about to measure against your own app.
 */
function StageRulers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {(['top', 'bottom'] as const).map((edge) => (
        <div
          key={edge}
          className={cn(
            'absolute inset-x-0 h-1.5 opacity-40 dark:opacity-30',
            edge === 'top' ? 'top-0' : 'bottom-0 rotate-180',
          )}
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 8px)',
          }}
        />
      ))}
    </div>
  );
}
