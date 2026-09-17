import * as React from 'react';
import { cn } from '@/lib/utils';

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <code
      className={cn(
        'relative inline-flex items-center rounded-md bg-black/5 px-[6px] py-[2px] font-mono text-[14px] font-normal leading-[21px] tracking-[0.01em] text-neutral-700 dark:bg-white/9 dark:text-neutral-300',
        className,
      )}
      {...props}
    />
  );
}
