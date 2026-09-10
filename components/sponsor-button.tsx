'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { BorderBeam } from 'border-beam';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/events';
import { useSurfaceTheme } from '@/components/spectrumui/use-surface-theme';

/**
 * GitHub Sponsors CTA. Uses the same `border-beam` package as BeamCard so the
 * traveling edge glow matches the rest of the library. `size="sm"` is the
 * compact preset meant for pills; colorful keeps it the highlighted control
 * in the navbar.
 */
export function SponsorButton({
  className,
  fullWidth = false,
  source = 'navbar',
  onNavigate,
}: {
  className?: string;
  fullWidth?: boolean;
  source?: 'navbar' | 'mobile_nav';
  onNavigate?: () => void;
}) {
  const theme = useSurfaceTheme();

  const handleClick = () => {
    trackEvent({
      name: 'sponsor_button_clicked',
      properties: { source },
    });
    onNavigate?.();
  };

  return (
    <BorderBeam
      size="sm"
      colorVariant="colorful"
      theme={theme}
      borderRadius={999}
      className={cn('inline-flex shrink-0 rounded-full', fullWidth && 'w-full', className)}
    >
      <Link
        href={siteConfig.links.sponsors}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={`Sponsor ${siteConfig.author.name} on GitHub`}
        className={cn(
          'group inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-background px-2 font-mono text-xs font-medium text-foreground/80 shadow-xs transition-colors hover:border-neutral-300 hover:text-foreground dark:border-neutral-800 dark:hover:border-neutral-700 sm:px-3',
          fullWidth && 'h-10 w-full px-4 text-sm',
        )}
      >
        <Heart
          aria-hidden
          className="size-3.5 shrink-0 transition-all duration-300 group-hover:fill-rose-500 group-hover:stroke-rose-500 motion-safe:group-hover:scale-110"
        />
        <span className={cn(!fullWidth && 'hidden sm:inline')}>Sponsor Me</span>
      </Link>
    </BorderBeam>
  );
}
