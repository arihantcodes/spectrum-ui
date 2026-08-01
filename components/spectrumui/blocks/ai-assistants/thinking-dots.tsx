'use client';

import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes su-dot { 0%, 60%, 100% { opacity: 0.25; transform: translateY(0) } 30% { opacity: 1; transform: translateY(-2px) } }
@keyframes su-bar-slide { 0% { transform: translateX(-100%) } 100% { transform: translateX(400%) } }
`;

export type ThinkingDotsVariant = 'Dots' | 'Bar';

export interface ThinkingDotsProps {
  label?: string;
  variant?: ThinkingDotsVariant;
  className?: string;
}

export function ThinkingDots({
  label = 'Assistant is thinking',
  variant = 'Dots',
  className,
}: ThinkingDotsProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'flex w-fit items-center gap-2.5 text-neutral-500 dark:text-neutral-400',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {variant === 'Dots' ? (
        <span aria-hidden className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="size-1.5 rounded-full bg-current motion-reduce:!animate-none"
              style={{ animation: `su-dot 1.2s ease-in-out ${index * 160}ms infinite` }}
            />
          ))}
        </span>
      ) : (
        <span
          aria-hidden
          className="relative h-1 w-10 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.09]"
        >
          <span
            className="absolute inset-y-0 w-1/4 rounded-full bg-current motion-reduce:!animate-none"
            style={{ animation: 'su-bar-slide 1.1s ease-in-out infinite' }}
          />
        </span>
      )}

      <span className="text-[12.5px]">{label}</span>
    </div>
  );
}

export default ThinkingDots;
