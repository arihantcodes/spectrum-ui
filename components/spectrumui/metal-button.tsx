/**
 * Spectrum UI — MetalButton
 *
 * A pill button framed by a real-time liquid-metal ring. The ring is painted by
 * `metal-fx` (Jakub Antalík, MIT, https://metal.jakubantalik.com): one shared
 * WebGL shader drives every instance on the page, pauses offscreen and renders
 * a transparent placeholder on the server. This wrapper adds the button
 * surface, sizes, and class-based dark/light detection so the ring matches a
 * shadcn-style `.dark` theme instead of only the OS preference.
 *
 * Dependencies: metal-fx, @/lib/utils, @/components/spectrumui/use-surface-theme
 *
 * @example
 * <MetalButton preset="gold">Upgrade to Pro</MetalButton>
 */

'use client';

import * as React from 'react';
import { MetalFx, type MetalFxPreset } from 'metal-fx';

import { cn } from '@/lib/utils';
import { useSurfaceTheme, type SurfaceTheme } from '@/components/spectrumui/use-surface-theme';

export interface MetalButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  /** Metal palette. Default "chromatic" */
  preset?: MetalFxPreset;
  /** "auto" follows a `.dark`/`.light` class on <html>, then the OS. Default "auto" */
  theme?: SurfaceTheme;
  /** Ring intensity 0–1. Default 1 */
  strength?: number;
  /** Pill height and type size. Default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Freeze the shader on its current frame */
  paused?: boolean;
  /** Classes for the inner button */
  className?: string;
  /** Classes for the MetalFx wrapper */
  wrapperClassName?: string;
}

const SIZE = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-7 text-base',
} as const;

export function MetalButton({
  preset = 'chromatic',
  theme = 'auto',
  strength = 1,
  size = 'md',
  paused = false,
  className,
  wrapperClassName,
  children,
  type = 'button',
  ...props
}: MetalButtonProps) {
  const resolved = useSurfaceTheme(theme);
  return (
    <MetalFx
      variant="button"
      preset={preset}
      theme={resolved}
      strength={strength}
      paused={paused}
      className={cn('inline-flex', wrapperClassName)}
    >
      <button
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color] duration-200 ease-out',
          // metal-fx keeps the host fill transparent so the ring frames the page surface; only the label carries the theme
          'text-neutral-900 hover:opacity-80 active:scale-[0.97] dark:text-white',
          'focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-60',
          SIZE[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </MetalFx>
  );
}
