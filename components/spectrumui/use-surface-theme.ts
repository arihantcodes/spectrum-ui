/**
 * Spectrum UI — useSurfaceTheme
 *
 * Resolves "auto" to "dark" or "light" by reading a `.dark`/`.light` class on
 * <html> first (shadcn / next-themes convention) and falling back to the OS
 * preference, updating live on either change. metal-fx and border-beam only
 * know about the OS preference, so their wrappers use this to follow the app's
 * own theme toggle.
 */

'use client';

import { useSyncExternalStore } from 'react';

export type SurfaceTheme = 'auto' | 'dark' | 'light';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener('change', onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener('change', onChange);
  };
}

function read(): 'dark' | 'light' {
  const list = document.documentElement.classList;
  if (list.contains('dark')) return 'dark';
  if (list.contains('light')) return 'light';
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

const onServer = () => 'dark' as const;

export function useSurfaceTheme(theme: SurfaceTheme = 'auto'): 'dark' | 'light' {
  const resolved = useSyncExternalStore(subscribe, read, onServer);
  return theme === 'auto' ? resolved : theme;
}
