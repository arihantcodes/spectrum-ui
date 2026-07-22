'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  disabled?: boolean;
}

export function SubmitButton({ disabled = false }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={pending}
      className={cn(
        'group flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium outline-none',
        'cursor-pointer transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out active:scale-[0.98]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:bg-primary/90 dark:shadow-[0_1px_3px_rgba(0,0,0,0.5)]',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100',
      )}
    >
      {pending ? (
        <>
          <svg
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Setting up…
        </>
      ) : (
        <>
          Complete setup
          <svg
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </button>
  );
}
