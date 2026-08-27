'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  Contrast,
  Keyboard,
  Link2,
  Monitor,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/events';
import {
  loadSearchIndex,
  prefetchSearchIndex,
  subscribeToCommandMenu,
  type CommandMenuView,
  type OpenCommandMenuDetail,
} from '@/lib/command-menu';
import {
  matchItem,
  normalizeQuery,
  registryInstallCommand,
  splitHighlight,
  type HighlightRange,
  type SearchDocument,
} from '@/lib/search';
import {
  SHORTCUTS,
  SHORTCUT_SECTIONS,
  chordKeys,
  paletteKeyHints,
  type Shortcut,
  type ShortcutIcon,
} from '@/lib/shortcuts';
import { SOCIAL_LINKS, type SocialIcon } from '@/lib/socials';
import { useGlobalShortcuts } from '@/hooks/use-global-shortcuts';
import { useIsApplePlatform } from '@/hooks/use-is-apple';
import { useTypewriterPlaceholder } from '@/hooks/use-typewriter-placeholder';
import { siteConfig } from '@/config/site';

/* ── Rows ─────────────────────────────────────────────────────────────────── */

interface Row {
  id: string;
  title: string;
  group: string;
  subtitle?: string;
  keywords?: string;
  icon?: ShortcutIcon | SocialIcon | 'copy' | 'external';
  /** Chips shown on the right — the sequence that also reaches this row. */
  keys?: string[];
  new?: boolean;
  /** shadcn registry name; makes ⌘↵ copy the install command. */
  registry?: string;
  href?: string;
  external?: boolean;
  /** Commands do their own thing instead of navigating. */
  action?: () => void;
  /** Rows that change the palette rather than leave it. */
  keepOpen?: boolean;
}

/** Brand marks are the filled versions — an outline glyph reads as UI, not identity. */
const ICONS: Record<NonNullable<Row['icon']>, React.ComponentType<{ className?: string }>> = {
  search: Search,
  keyboard: Keyboard,
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
  contrast: Contrast,
  copy: Link2,
  external: ArrowUpRight,
  x: FaXTwitter,
  github: FaGithub,
  linkedin: FaLinkedin,
};

/** Group order for the resting state; search results order themselves by score. */
const RESTING_DESTINATIONS = [
  'page:/docs',
  'page:/blocks',
  'page:/charts',
  'page:/colors',
  'page:/blog',
  'page:/docs/installation',
];

/**
 * Enough of the site to be useful before — or without — the fetched index, so
 * ⌘K is never an empty box.
 */
const FALLBACK_DOCUMENTS: SearchDocument[] = [
  { id: 'page:/docs', title: 'Components', group: 'Pages', href: '/docs' },
  { id: 'page:/blocks', title: 'Blocks', group: 'Pages', href: '/blocks' },
  { id: 'page:/charts', title: 'Charts', group: 'Pages', href: '/charts' },
  { id: 'page:/colors', title: 'Colors', group: 'Pages', href: '/colors' },
  { id: 'page:/blog', title: 'Blog', group: 'Pages', href: '/blog' },
  {
    id: 'page:/docs/installation',
    title: 'Installation',
    group: 'Pages',
    href: '/docs/installation',
    subtitle: 'Docs',
  },
];

const GROUP_ORDER = [
  'Recent',
  'Components',
  'Blocks',
  'Charts',
  'Guides',
  'Blog',
  'Pages',
  'Commands',
  'Social',
];

const CARET_KEYFRAMES = '@keyframes cmdk-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }';

const RECENT_KEY = 'spectrum:command-menu:recent';
const RECENT_LIMIT = 5;
const PER_GROUP_LIMIT = 6;
const TOTAL_LIMIT = 40;

interface ResultRow {
  row: Row;
  ranges: HighlightRange[];
}

interface ResultGroup {
  name: string;
  rows: ResultRow[];
}

function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function documentToRow(doc: SearchDocument): Row {
  return {
    id: doc.id,
    title: doc.title,
    group: doc.group,
    subtitle: doc.subtitle,
    keywords: doc.keywords,
    href: doc.href,
    registry: doc.registry,
    new: doc.new,
  };
}

/** Valid, stable and unique — `aria-activedescendant` needs a real element id. */
function rowDomId(id: string) {
  return `command-row-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

/* ── Palette ──────────────────────────────────────────────────────────────── */

export function CommandMenu() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const isApple = useIsApplePlatform();

  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<CommandMenuView>('search');
  const [query, setQuery] = React.useState('');
  const [documents, setDocuments] = React.useState<SearchDocument[]>([]);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  /** Did this session of the palette end in a selection, or an abandonment? */
  const actedRef = React.useRef(false);

  // Anyone touching the keyboard is a plausible ⌘K user — warm the index once
  // on the first keystroke so the first query never waits on a request.
  React.useEffect(() => {
    const warm = () => prefetchSearchIndex();
    window.addEventListener('keydown', warm, { once: true });
    return () => window.removeEventListener('keydown', warm);
  }, []);

  // Fetched once per session; the resting state renders from the fallback until
  // it lands, so opening never waits on the network.
  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    void loadSearchIndex().then((fetched) => {
      if (!cancelled && fetched.length) setDocuments(fetched);
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const openWith = React.useCallback((detail: OpenCommandMenuDetail) => {
    setView(detail.view ?? 'search');
    setQuery(detail.query ?? '');
    // Read on open rather than on mount, so a second tab's picks show up too.
    setRecent(readRecent());
    setOpen(true);
    actedRef.current = false;
    trackEvent({
      name: 'command_palette_opened',
      properties: {
        view: detail.view ?? 'search',
        // Where it was opened from, and from which page — together these answer
        // "is anyone actually using ⌘K, and how do they reach it?"
        source: detail.source ?? 'unknown',
        path: window.location.pathname,
      },
    });
  }, []);

  const closeMenu = React.useCallback(() => {
    setOpen(false);
    setQuery('');
    setView('search');

    if (!actedRef.current) {
      trackEvent({
        name: 'command_palette_dismissed',
        properties: { query_length: query.trim().length },
      });
    }
  }, [query]);

  React.useEffect(() => subscribeToCommandMenu(openWith), [openWith]);

  // ⌘K / Ctrl+K toggles from anywhere, including from inside a text field.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (open) closeMenu();
      else openWith({ source: 'shortcut' });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu, open, openWith]);

  const applyTheme = React.useCallback(
    (theme: 'light' | 'dark' | 'system' | 'toggle') => {
      const next = theme === 'toggle' ? (resolvedTheme === 'dark' ? 'light' : 'dark') : theme;
      setTheme(next);
      trackEvent({ name: 'theme_toggled', properties: { theme: next } });
    },
    [resolvedTheme, setTheme],
  );

  const runShortcut = React.useCallback(
    (shortcut: Shortcut, source: 'keyboard' | 'palette' = 'keyboard') => {
      const { action } = shortcut;

      switch (action.type) {
        case 'navigate':
          router.push(action.href);
          break;
        case 'external':
          window.open(action.href, '_blank', 'noopener,noreferrer');
          break;
        case 'theme':
          applyTheme(action.theme);
          break;
        case 'palette':
          openWith({ view: action.view, source: 'shortcut' });
          break;
        case 'builtin':
          break;
      }

      // Clicking the same thing in the palette is already reported as a
      // palette action; only the key press is a shortcut.
      if (source === 'keyboard') {
        trackEvent({ name: 'keyboard_shortcut_used', properties: { shortcut: shortcut.id } });
      }
    },
    [applyTheme, openWith, router],
  );

  useGlobalShortcuts(runShortcut);

  const copy = React.useCallback(async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error('Could not copy to the clipboard');
    }
  }, []);

  /** Theme, links and clipboard actions — everything that isn't a destination. */
  const commandRows = React.useMemo<Row[]>(() => {
    const fromShortcuts: Row[] = SHORTCUTS.filter((shortcut) => shortcut.command).map(
      (shortcut) => ({
        id: `command:${shortcut.id}`,
        title: shortcut.label,
        group: 'Commands',
        keywords: shortcut.keywords,
        icon: shortcut.icon,
        keys: shortcut.chord ? chordKeys(shortcut.chord, isApple) : undefined,
        keepOpen: shortcut.action.type === 'palette',
        action: () => runShortcut(shortcut, 'palette'),
      }),
    );

    return [
      ...fromShortcuts,
      {
        id: 'command:copy-page-url',
        title: 'Copy this page’s URL',
        group: 'Commands',
        keywords: 'copy link share url address',
        icon: 'copy',
        action: () => void copy(window.location.href, 'Page URL copied'),
      },
      {
        id: 'command:copy-llms',
        title: 'Copy the llms.txt URL for AI tools',
        group: 'Commands',
        keywords: 'llms txt ai chatgpt claude cursor context feed',
        icon: 'copy',
        action: () => void copy(`${siteConfig.url}/llms-full.txt`, 'llms.txt URL copied'),
      },
    ];
  }, [copy, isApple, runShortcut]);

  /** Every handle, searchable by platform or by @name. */
  const socialRows = React.useMemo<Row[]>(
    () =>
      SOCIAL_LINKS.map((social) => ({
        id: social.id,
        title: social.title,
        group: 'Social',
        keywords: social.keywords,
        icon: social.icon,
        href: social.href,
        external: true,
      })),
    [],
  );

  const allRows = React.useMemo<Row[]>(() => {
    const source = documents.length ? documents : FALLBACK_DOCUMENTS;
    return [...source.map(documentToRow), ...commandRows, ...socialRows];
  }, [commandRows, documents, socialRows]);

  const rowsById = React.useMemo(() => new Map(allRows.map((row) => [row.id, row])), [allRows]);

  const groups = React.useMemo<ResultGroup[]>(() => {
    const commandsOnly = query.trimStart().startsWith('>');
    const normalized = normalizeQuery(commandsOnly ? query.trimStart().slice(1) : query);

    // A bare `>` is the command mode's resting state: show everything runnable.
    if (!normalized && commandsOnly) {
      return [{ name: 'Commands', rows: commandRows.map((row) => ({ row, ranges: [] })) }];
    }

    // Resting state: where you were, where most people go, what you can run.
    if (!normalized) {
      const recentRows = recent
        .map((id) => rowsById.get(id))
        .filter((row): row is Row => Boolean(row))
        .slice(0, RECENT_LIMIT);

      // A row shows up once: nothing reads worse than the same entry twice.
      const seen = new Set(recentRows.map((row) => row.id));
      const unseen = (row: Row | undefined): row is Row => Boolean(row) && !seen.has(row!.id);

      const jumpRows = RESTING_DESTINATIONS.map((id) => rowsById.get(id)).filter(unseen);
      jumpRows.forEach((row) => seen.add(row.id));

      const restingCommands = commandRows.filter(unseen).slice(0, 4);
      restingCommands.forEach((row) => seen.add(row.id));

      return [
        { name: 'Recent', rows: recentRows.map((row) => ({ row, ranges: [] })) },
        { name: 'Jump to', rows: jumpRows.map((row) => ({ row, ranges: [] })) },
        { name: 'Commands', rows: restingCommands.map((row) => ({ row, ranges: [] })) },
        { name: 'Social', rows: socialRows.filter(unseen).map((row) => ({ row, ranges: [] })) },
      ].filter((group) => group.rows.length > 0);
    }

    const pool = commandsOnly ? commandRows : allRows;
    const scored: { row: Row; ranges: HighlightRange[]; score: number }[] = [];

    for (const row of pool) {
      const match = matchItem(normalized, row);
      if (match) scored.push({ row, ranges: match.ranges, score: match.score });
    }

    scored.sort((a, b) => b.score - a.score || a.row.title.localeCompare(b.row.title));

    const byGroup = new Map<string, { rows: ResultRow[]; best: number }>();
    let total = 0;

    for (const entry of scored) {
      if (total >= TOTAL_LIMIT) break;
      const group = byGroup.get(entry.row.group) ?? { rows: [], best: entry.score };
      if (group.rows.length >= PER_GROUP_LIMIT) continue;
      group.rows.push({ row: entry.row, ranges: entry.ranges });
      byGroup.set(entry.row.group, group);
      total += 1;
    }

    // Whichever group holds the best match leads — "dark mode" should open with
    // the theme commands, "dialog" with the components.
    return [...byGroup.entries()]
      .map(([name, group]) => ({ name, rows: group.rows, best: group.best }))
      .sort((a, b) => b.best - a.best || GROUP_ORDER.indexOf(a.name) - GROUP_ORDER.indexOf(b.name))
      .map(({ name, rows }) => ({ name, rows }));
  }, [allRows, commandRows, query, recent, rowsById, socialRows]);

  const flatRows = React.useMemo(
    () => groups.flatMap((group) => group.rows.map((entry) => entry.row)),
    [groups],
  );

  // Derived rather than corrected in an effect: as results come and go the
  // highlight falls back to the first row instead of pointing at nothing.
  const activeRow = React.useMemo(
    () => flatRows.find((row) => row.id === activeId) ?? flatRows[0] ?? null,
    [activeId, flatRows],
  );
  const activeRowId = activeRow?.id ?? null;

  React.useEffect(() => {
    if (!open) return;
    const element = listRef.current?.querySelector('[data-active="true"]');
    element?.scrollIntoView({ block: 'nearest' });
  }, [activeRowId, open]);

  // Also covers coming back from the shortcuts view, where the input remounts.
  React.useEffect(() => {
    if (!open || view !== 'search') return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, view]);

  // Debounced so a fast typist reports one query, not eight.
  React.useEffect(() => {
    if (!open || !query.trim()) return;
    const timer = setTimeout(() => {
      trackEvent({
        name: 'search_performed',
        properties: { query: query.trim(), results_count: flatRows.length },
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [flatRows.length, open, query]);

  const rememberRow = React.useCallback((id: string) => {
    setRecent((previous) => {
      const next = [id, ...previous.filter((entry) => entry !== id)].slice(0, RECENT_LIMIT);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        // A blocked storage bucket shouldn't break navigation.
      }
      return next;
    });
  }, []);

  const activate = React.useCallback(
    (row: Row) => {
      actedRef.current = true;
      rememberRow(row.id);

      if (!row.keepOpen) closeMenu();

      if (row.action) {
        row.action();
      } else if (row.href) {
        if (row.external) window.open(row.href, '_blank', 'noopener,noreferrer');
        else router.push(row.href);
      }

      // Reported after the fact: measuring a command must never be able to
      // stop it from running.
      trackEvent({
        name: 'command_palette_action',
        properties: { id: row.id, group: row.group, query: query.trim(), action: 'open' },
      });
    },
    [closeMenu, query, rememberRow, router],
  );

  const copyInstall = React.useCallback(
    (row: Row) => {
      if (!row.registry) return;
      actedRef.current = true;
      rememberRow(row.id);
      void copy(registryInstallCommand(row.registry), `Install command for ${row.title} copied`);
      closeMenu();
      trackEvent({
        name: 'command_palette_action',
        properties: { id: row.id, group: row.group, action: 'copy_install' },
      });
    },
    [closeMenu, copy, rememberRow],
  );

  const move = React.useCallback(
    (delta: number) => {
      if (!flatRows.length) return;
      const current = flatRows.findIndex((row) => row.id === activeRowId);
      const next = (current + delta + flatRows.length) % flatRows.length;
      setActiveId(flatRows[next].id);
    },
    [activeRowId, flatRows],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (view === 'shortcuts') {
        if (event.key === 'Escape' || event.key === 'Backspace') {
          event.preventDefault();
          setView('search');
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          move(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          move(-1);
          break;
        case 'Home':
          if (!query) {
            event.preventDefault();
            setActiveId(flatRows[0]?.id ?? null);
          }
          break;
        case 'End':
          if (!query) {
            event.preventDefault();
            setActiveId(flatRows[flatRows.length - 1]?.id ?? null);
          }
          break;
        case 'Enter': {
          if (!activeRow) return;
          event.preventDefault();
          if ((event.metaKey || event.ctrlKey) && activeRow.registry) copyInstall(activeRow);
          else activate(activeRow);
          break;
        }
        default:
          break;
      }
    },
    [activate, activeRow, copyInstall, flatRows, move, query, view],
  );

  const placeholder = useTypewriterPlaceholder(open && view === 'search' && query === '');

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) setOpen(true);
      else closeMenu();
    },
    [closeMenu],
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-neutral-950/40 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className={cn(
            'fixed left-1/2 top-[12vh] z-[100] w-[calc(100vw-1.5rem)] max-w-[640px] -translate-x-1/2',
            'flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white',
            'shadow-[0_32px_80px_-24px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-neutral-950',
            'duration-150 data-[state=closed]:animate-out data-[state=open]:animate-in',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          <style dangerouslySetInnerHTML={{ __html: CARET_KEYFRAMES }} />
          <DialogPrimitive.Title className="sr-only">Search Spectrum UI</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search components, blocks, charts, guides and posts, or run a command.
          </DialogPrimitive.Description>

          {view === 'shortcuts' ? (
            <ShortcutsView onBack={() => setView('search')} isApple={isApple} />
          ) : (
            <>
              <div className="p-3 pb-1">
                <div className="relative flex h-12 items-center gap-2.5 rounded-xl bg-neutral-100 px-3.5 dark:bg-neutral-900">
                  <Search
                    className="size-4 shrink-0 text-neutral-400 dark:text-neutral-500"
                    aria-hidden="true"
                  />

                  {/* The animated placeholder sits under the input, which hides
                      its own caret while this shows — one caret, at the end of
                      the typing, is the whole effect. */}
                  {query === '' ? (
                    <p
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[42px] flex select-none items-center text-base text-neutral-400 sm:text-[15px] dark:text-neutral-600"
                    >
                      Search&nbsp;{placeholder.text}
                      {placeholder.caret ? (
                        <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.06em] bg-neutral-400 motion-safe:animate-[cmdk-caret_1s_steps(1,end)_infinite] dark:bg-neutral-500" />
                      ) : null}
                    </p>
                  ) : null}

                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="command-menu-list"
                    aria-autocomplete="list"
                    aria-activedescendant={activeRowId ? rowDomId(activeRowId) : undefined}
                    aria-label="Search Spectrum UI"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className={cn(
                      'relative h-full w-full min-w-0 bg-transparent text-base text-neutral-900 outline-hidden sm:text-[15px] dark:text-neutral-100',
                      query === '' && 'caret-transparent',
                    )}
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        inputRef.current?.focus();
                      }}
                      className="shrink-0 rounded-md px-1.5 py-1 text-[12px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20"
                    >
                      Clear
                    </button>
                  ) : (
                    <Kbd className="hidden sm:inline-flex">esc</Kbd>
                  )}
                </div>
              </div>

              <div
                ref={listRef}
                id="command-menu-list"
                role="listbox"
                aria-label="Search results"
                className="h-[min(56vh,380px)] overflow-y-auto overscroll-contain p-2 pt-1"
              >
                {groups.length === 0 ? (
                  <EmptyState query={query} />
                ) : (
                  groups.map((group) => (
                    <div key={group.name} role="group" aria-label={group.name}>
                      <p className="px-3 pb-1 pt-2.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                        {group.name}
                      </p>
                      {group.rows.map(({ row, ranges }) => (
                        <CommandRow
                          key={row.id}
                          row={row}
                          ranges={ranges}
                          active={row.id === activeRowId}
                          onActivate={() => activate(row)}
                          onHover={() => setActiveId(row.id)}
                        />
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-black/8 px-3 py-2.5 dark:border-white/10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <FooterHint keys={['↑', '↓']} label="Navigate" />
                  <FooterHint keys={['↵']} label="Select" />
                  {activeRow?.registry ? (
                    <FooterHint
                      keys={[isApple ? '⌘' : 'Ctrl', '↵']}
                      label="Copy install"
                      className="hidden sm:flex"
                    />
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setView('shortcuts')}
                  className="hidden items-center gap-1.5 rounded-md text-[13px] text-neutral-400 transition-colors hover:text-neutral-800 sm:flex dark:text-neutral-500 dark:hover:text-neutral-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20"
                >
                  <Kbd>{isApple ? '⌘' : 'Ctrl'}</Kbd>
                  <Kbd>/</Kbd>
                  Shortcuts
                </button>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* ── Pieces ───────────────────────────────────────────────────────────────── */

function CommandRow({
  row,
  ranges,
  active,
  onActivate,
  onHover,
}: {
  row: Row;
  ranges: HighlightRange[];
  active: boolean;
  onActivate: () => void;
  onHover: () => void;
}) {
  const Icon = row.icon ? ICONS[row.icon] : row.external ? ArrowUpRight : ArrowRight;

  return (
    <div
      id={rowDomId(row.id)}
      role="option"
      aria-selected={active}
      data-active={active || undefined}
      onClick={onActivate}
      onPointerMove={onHover}
      className={cn(
        'flex h-10 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-[15px] transition-colors',
        active
          ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white'
          : 'text-neutral-700 dark:text-neutral-300',
      )}
    >
      <Icon
        className={cn(
          'size-4 shrink-0',
          active
            ? 'text-neutral-600 dark:text-neutral-300'
            : 'text-neutral-400 dark:text-neutral-500',
        )}
      />
      <span className="min-w-0 flex-1 truncate">
        {splitHighlight(row.title, ranges).map((segment, index) =>
          segment.match ? (
            <mark
              key={index}
              className="rounded-[3px] bg-[#E1F435]/70 px-px text-neutral-900 dark:bg-[#E1F435]/12 dark:text-[#E1F435]"
            >
              {segment.text}
            </mark>
          ) : (
            <React.Fragment key={index}>{segment.text}</React.Fragment>
          ),
        )}
      </span>
      {row.new ? (
        <span className="shrink-0 rounded-full bg-lime-400 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-black">
          New
        </span>
      ) : null}
      {row.keys ? (
        <span className="hidden shrink-0 items-center gap-1 sm:flex">
          {row.keys.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </span>
      ) : row.subtitle ? (
        <span className="hidden shrink-0 text-[12px] text-neutral-400 sm:block dark:text-neutral-500">
          {row.subtitle}
        </span>
      ) : null}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-[15px] text-neutral-600 dark:text-neutral-300">
        No results for <span className="text-neutral-900 dark:text-white">“{query.trim()}”</span>
      </p>
      <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
        Try “kanban”, “chart”, or “dark mode”.
      </p>
    </div>
  );
}

function ShortcutsView({ onBack, isApple }: { onBack: () => void; isApple: boolean }) {
  const modifier = isApple ? '⌘' : 'Ctrl';

  return (
    <>
      <div className="flex items-center gap-2 border-b border-black/8 p-3 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20"
          aria-label="Back to search"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-neutral-900 dark:text-white">
            Keyboard shortcuts
          </p>
          <p className="truncate text-[12px] text-neutral-400 dark:text-neutral-500">
            Every shortcut is held with <span className="font-sans">{modifier}</span> — and
            everything else lives inside the command menu.
          </p>
        </div>
      </div>

      <div className="h-[min(56vh,380px)] overflow-y-auto overscroll-contain p-2 pt-1">
        {SHORTCUT_SECTIONS.map((section) => {
          // Only chords belong on a shortcuts sheet; the rest are palette rows.
          const rows = SHORTCUTS.filter(
            (shortcut) => shortcut.section === section && shortcut.chord,
          );

          if (!rows.length) return null;

          return (
            <div key={section}>
              <p className="px-3 pb-1 pt-2.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                {section}
              </p>
              {rows.map((shortcut) => (
                <ShortcutRow
                  key={shortcut.id}
                  label={shortcut.label}
                  keys={chordKeys(shortcut.chord!, isApple)}
                />
              ))}
            </div>
          );
        })}

        <div>
          <p className="px-3 pb-1 pt-2.5 text-[13px] text-neutral-500 dark:text-neutral-400">
            In the command menu
          </p>
          {paletteKeyHints(isApple).map((hint) => (
            <ShortcutRow key={hint.label} label={hint.label} keys={hint.keys} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-black/8 px-3 py-2.5 dark:border-white/10">
        <FooterHint keys={['esc']} label="Back to search" />
        <span className="hidden text-[13px] text-neutral-400 sm:block dark:text-neutral-500">
          Set an exact theme from the command menu
        </span>
      </div>
    </>
  );
}

function ShortcutRow({ label, keys }: { label: string; keys: string[] }) {
  return (
    <div className="flex h-10 items-center gap-3 rounded-xl px-3 text-[15px] text-neutral-700 dark:text-neutral-300">
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="flex shrink-0 items-center gap-1">
        {keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
    </div>
  );
}

function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  // Geist Mono has no ⌘ glyph — anything outside ASCII renders in the sans stack.
  const isSymbol = typeof children === 'string' && /[^\x20-\x7E]/.test(children);

  return (
    <kbd
      className={cn(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-black/10 bg-white px-1.5 text-[11px] font-medium text-neutral-500 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-white/12 dark:bg-neutral-900 dark:text-neutral-400',
        isSymbol ? 'font-sans text-[12px]' : 'font-mono',
        className,
      )}
    >
      {children}
    </kbd>
  );
}

function FooterHint({
  keys,
  label,
  className,
}: {
  keys: string[];
  label: string;
  className?: string;
}) {
  return (
    <span className={cn('flex items-center gap-1.5', className)}>
      <span className="flex items-center gap-1">
        {keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
      <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</span>
    </span>
  );
}
