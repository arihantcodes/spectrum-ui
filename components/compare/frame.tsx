import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A full-bleed section band aligned to the site's `container-frame`
 * (shared max-width, no rules drawn), matching the landing page.
 */
export function FrameBand({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('container-frame relative', className)}>{children}</div>;
}
