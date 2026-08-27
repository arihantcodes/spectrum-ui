/**
 * Every keyboard shortcut on the site, in one list.
 *
 * The same descriptors drive three things, which is the point: the global key
 * handler (hooks/use-global-shortcuts.ts), the palette's Commands group, and
 * the cheatsheet behind ⌘/. Nothing can drift out of sync because there is
 * only one list.
 *
 * Every shortcut is a chord held with ⌘ (Ctrl off Apple). Bare letters were
 * tried first and they are a bad fit for a site: they only fire when focus is
 * nowhere in particular, so they feel broken exactly when you reach for them.
 * A chord fires everywhere, including from inside a text field.
 *
 * The chord list is deliberately short. Browsers own most of ⌘-space — ⌘T, ⌘W,
 * ⌘N, ⌘M and ⌘H can't even be intercepted — so instead of inventing a dozen
 * fragile bindings, every other command lives one keystroke away inside ⌘K.
 */

export type ShortcutAction =
  | { type: 'navigate'; href: string }
  | { type: 'external'; href: string }
  | { type: 'theme'; theme: 'light' | 'dark' | 'system' | 'toggle' }
  | { type: 'palette'; view: 'search' | 'shortcuts' }
  /** Documented here, but handled by the dialog itself. */
  | { type: 'builtin' };

export type ShortcutIcon = 'search' | 'keyboard' | 'sun' | 'moon' | 'monitor' | 'contrast';

/** `mod` is ⌘ on Apple hardware and Ctrl everywhere else. */
export interface ShortcutChord {
  /** Single character, matched case-insensitively against `event.key`. */
  key: string;
  shift?: boolean;
}

export interface Shortcut {
  id: string;
  /** The chord that fires it, or null for palette-only commands. */
  chord: ShortcutChord | null;
  label: string;
  section: 'General' | 'Theme';
  action: ShortcutAction;
  icon: ShortcutIcon;
  /** Offer it as a row in the palette's Commands group. */
  command?: boolean;
  /** Words the palette row should also match on. Lowercase. */
  keywords?: string;
}

export const SHORTCUTS: readonly Shortcut[] = [
  // ── General ────────────────────────────────────────────────────────────────
  {
    id: 'open-palette',
    chord: { key: 'k' },
    label: 'Open the command menu',
    section: 'General',
    action: { type: 'builtin' },
    icon: 'search',
  },
  {
    id: 'open-shortcuts',
    chord: { key: '/' },
    label: 'Keyboard shortcuts',
    section: 'General',
    action: { type: 'palette', view: 'shortcuts' },
    icon: 'keyboard',
    command: true,
    keywords: 'keyboard shortcuts keys cheatsheet help hotkeys',
  },

  // ── Theme ──────────────────────────────────────────────────────────────────
  {
    id: 'theme-toggle',
    chord: { key: 'l', shift: true },
    label: 'Toggle light and dark',
    section: 'Theme',
    action: { type: 'theme', theme: 'toggle' },
    icon: 'contrast',
    command: true,
    keywords: 'theme appearance switch invert light dark mode',
  },
  {
    id: 'theme-light',
    chord: null,
    label: 'Switch to the light theme',
    section: 'Theme',
    action: { type: 'theme', theme: 'light' },
    icon: 'sun',
    command: true,
    keywords: 'theme appearance light mode day bright',
  },
  {
    id: 'theme-dark',
    chord: null,
    label: 'Switch to the dark theme',
    section: 'Theme',
    action: { type: 'theme', theme: 'dark' },
    icon: 'moon',
    command: true,
    keywords: 'theme appearance dark mode night',
  },
  {
    id: 'theme-system',
    chord: null,
    label: 'Match the system theme',
    section: 'Theme',
    action: { type: 'theme', theme: 'system' },
    icon: 'monitor',
    command: true,
    keywords: 'theme appearance system automatic os preference',
  },
];

export const SHORTCUT_SECTIONS = ['General', 'Theme'] as const;

/** Chips for a chord, in the order they're pressed. */
export function chordKeys(chord: ShortcutChord, isApple: boolean): string[] {
  const keys = [isApple ? '⌘' : 'Ctrl'];
  if (chord.shift) keys.push('⇧');
  keys.push(chord.key.length === 1 ? chord.key.toUpperCase() : chord.key);
  return keys;
}

/**
 * Keys the palette itself handles. Display-only — the dialog owns them — but
 * they belong on the cheatsheet, because they are the shortcuts people use most.
 */
export function paletteKeyHints(isApple: boolean): { keys: string[]; label: string }[] {
  return [
    { keys: ['↑', '↓'], label: 'Move through results' },
    { keys: ['↵'], label: 'Open the selected result' },
    {
      keys: [isApple ? '⌘' : 'Ctrl', '↵'],
      label: 'Copy the install command for the selected result',
    },
    { keys: ['>'], label: 'Type this first to list commands only' },
    { keys: ['esc'], label: 'Close the command menu' },
  ];
}
