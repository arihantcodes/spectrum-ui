/**
 * Spectrum UI — BeamCard
 *
 * A card wrapped in an animated border beam from `border-beam` (Jakub Antalík,
 * MIT, https://libraries.dev/beam). The beam either travels around the edge
 * (rotate family) or breathes (pulse family), in four palettes, and reads the
 * card's own border radius so it always hugs the corners. This wrapper adds a
 * ready-made card surface with an eyebrow, title, description and slot, plus
 * class-based dark/light detection so the beam matches a `.dark` theme.
 *
 * Dependencies: border-beam, @/lib/utils
 *
 * @example
 * <BeamCard eyebrow="Pro" title="Unlimited projects" description="…" />
 */

'use client';

import * as React from 'react';
import { BorderBeam, type BorderBeamColorVariant, type BorderBeamSize } from 'border-beam';

import { cn } from '@/lib/utils';
import { useSurfaceTheme, type SurfaceTheme } from '@/components/spectrumui/use-surface-theme';

export interface BeamCardProps {
  /** Small mono label above the title */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Body content rendered under the description */
  children?: React.ReactNode;
  /** Beam family: "md" travels, "pulse-inner" breathes inside, "pulse-outside" blooms out. Default "md" */
  size?: Extract<BorderBeamSize, 'md' | 'sm' | 'pulse-inner' | 'pulse-outside'>;
  /** Palette: "colorful" | "ocean" | "sunset" | "mono". Default "colorful" */
  colorVariant?: BorderBeamColorVariant;
  /** "auto" follows a `.dark`/`.light` class on <html>, then the OS. Default "auto" */
  theme?: SurfaceTheme;
  /** Play or fade the beam out. Default true */
  active?: boolean;
  /** Beam intensity 0–1. Default 1 */
  strength?: number;
  /** Classes for the inner card */
  className?: string;
}

export function BeamCard({
  eyebrow,
  title,
  description,
  children,
  size = 'md',
  colorVariant = 'colorful',
  theme = 'auto',
  active = true,
  strength = 1,
  className,
}: BeamCardProps) {
  const resolved = useSurfaceTheme(theme);
  return (
    <BorderBeam
      size={size}
      colorVariant={colorVariant}
      theme={resolved}
      active={active}
      strength={strength}
      className="w-full"
    >
      <div
        className={cn(
          // pulse-outside rides on this 1px border as its idle hairline
          'w-full rounded-2xl border border-black/10 bg-white p-6 dark:border-white/12 dark:bg-neutral-950',
          className,
        )}
      >
        {eyebrow && (
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className="mt-2 text-[17px] font-semibold leading-6 tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1.5 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </BorderBeam>
  );
}
