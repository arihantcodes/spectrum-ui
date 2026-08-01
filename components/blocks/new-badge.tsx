import { cn } from '@/lib/utils';

/**
 * Marks a recently shipped block.
 *
 * Which blocks wear it is decided by `newBlockSlugs()`, which expires the badge
 * after 30 days and suppresses it entirely when every block qualifies — a badge
 * on all of them distinguishes none.
 */
export function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-1.5 py-px',
        'bg-[#f9452d]/10 font-mono text-[9px] font-medium uppercase tracking-[0.08em]',
        'text-[#f9452d] dark:bg-[#E1F435]/10 dark:text-[#E1F435]',
        className,
      )}
    >
      New
    </span>
  );
}
