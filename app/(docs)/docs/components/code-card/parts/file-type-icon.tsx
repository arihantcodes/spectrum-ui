import React from 'react';
import { cn } from '@/lib/utils';

/**
 * File-type badge for the Code tab's file switcher.
 *
 * Deliberately not the shared `Icons.typeScript`: that one carries a gradient
 * with a hardcoded id, and the switcher renders several icons per card across
 * several cards on a page — duplicate ids in one document make the fill
 * resolve against whichever definition happens to win. Flat single-path marks
 * have no ids to collide.
 */
export function FileTypeIcon({ name, className }: { name: string; className?: string }) {
  const ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase();
  const shared = cn('size-3.5 shrink-0', className);

  if (ext === 'ts' || ext === 'tsx') {
    return (
      <svg viewBox="0 0 24 24" className={shared} aria-hidden focusable="false">
        <rect width="24" height="24" rx="2.5" fill="#3178C6" />
        <path
          fill="#fff"
          d="M13.03 18.66v2.06c.34.17.73.3 1.19.39.46.09.94.13 1.45.13.5 0 .97-.05 1.42-.14a3.5 3.5 0 0 0 1.18-.47c.34-.22.6-.51.8-.87.19-.36.29-.8.29-1.32 0-.38-.06-.71-.17-1a2.5 2.5 0 0 0-.49-.76c-.21-.22-.47-.42-.76-.6a8 8 0 0 0-1-.5l-.74-.33a5 5 0 0 1-.55-.29 1.5 1.5 0 0 1-.35-.3.6.6 0 0 1-.13-.37c0-.13.04-.25.11-.36a1 1 0 0 1 .31-.28c.14-.08.3-.14.5-.18.19-.05.4-.07.65-.07.18 0 .37.01.57.04.2.03.4.07.6.13.2.05.4.12.59.2.19.09.36.19.51.3v-1.93a4.7 4.7 0 0 0-1.04-.27 8.6 8.6 0 0 0-1.29-.09c-.5 0-.98.06-1.42.17-.45.1-.84.28-1.17.5-.34.23-.6.52-.8.88-.2.35-.3.77-.3 1.26 0 .62.19 1.15.55 1.59.36.44.9.81 1.63 1.11.28.12.54.23.78.34.24.11.46.23.63.35.18.12.32.25.42.4.1.13.16.29.16.47 0 .13-.04.25-.1.36a.9.9 0 0 1-.3.28c-.13.09-.3.15-.5.2a3 3 0 0 1-.69.07 3.9 3.9 0 0 1-2.56-.95Zm-2.5-6.2H13V10.8H5.5v1.66h2.46v7.6h2.06Z"
        />
      </svg>
    );
  }

  if (ext === 'js' || ext === 'jsx' || ext === 'mjs') {
    return (
      <svg viewBox="0 0 24 24" className={shared} aria-hidden focusable="false">
        <rect width="24" height="24" rx="2.5" fill="#F7DF1E" />
        <path
          fill="#000"
          d="M12.9 18.2c.42.68 1 1.18 1.95 1.18.82 0 1.34-.4 1.34-.97 0-.67-.53-.9-1.42-1.3l-.49-.2c-1.4-.6-2.34-1.35-2.34-2.94 0-1.46 1.12-2.57 2.86-2.57 1.24 0 2.13.43 2.77 1.56l-1.52.97c-.33-.6-.7-.83-1.25-.83-.57 0-.93.36-.93.83 0 .58.36.82 1.2 1.18l.48.21c1.65.7 2.6 1.43 2.6 3.06 0 1.75-1.38 2.71-3.23 2.71-1.8 0-2.97-.86-3.55-1.99Zm-6.6.17 1.52-.92c.3.52.56.96 1.2.96.62 0 1.01-.24 1.01-1.18v-6.4h1.87v6.43c0 1.94-1.14 2.82-2.8 2.82-1.5 0-2.37-.78-2.81-1.71Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={shared} aria-hidden focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M13.5 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8.5Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M13.5 3v5.5H19" />
    </svg>
  );
}
