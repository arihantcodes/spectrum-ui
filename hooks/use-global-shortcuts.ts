'use client';

import * as React from 'react';

import { SHORTCUTS, type Shortcut } from '@/lib/shortcuts';

/**
 * Everything with a chord except the ones the dialog owns — ⌘K needs toggle
 * semantics, so the palette listens for it directly.
 */
const CHORDS = SHORTCUTS.filter((shortcut) => shortcut.chord && shortcut.action.type !== 'builtin');

/**
 * Binds the ⌘-chords in lib/shortcuts.ts.
 *
 * Chords are safe to listen for unconditionally: unlike a bare letter they
 * can't be confused with typing, so they fire from inside a search field or a
 * dialog exactly the way they do on an idle page.
 */
export function useGlobalShortcuts(run: (shortcut: Shortcut) => void) {
  const runRef = React.useRef(run);

  React.useEffect(() => {
    runRef.current = run;
  }, [run]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ⌥ is excluded so ⌘⌥-combos stay with the browser's devtools.
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.isComposing) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const match = CHORDS.find(
        (shortcut) =>
          shortcut.chord!.key === key && Boolean(shortcut.chord!.shift) === event.shiftKey,
      );

      if (!match) return;

      event.preventDefault();
      runRef.current(match);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
