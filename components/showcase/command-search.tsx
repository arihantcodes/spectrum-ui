"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CornerDownLeft,
  Search,
  SearchX,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useTypewriter } from "./use-typewriter";

export interface CommandSearchItem {
  label: string;
  icon?: React.ReactNode;
}

export interface CommandSearchGroup {
  label: string;
  items: CommandSearchItem[];
}

export interface CommandSearchProps {
  /** Static text for the search field (used when `autoType` is false). */
  query?: string;
  /** Queries the palette types out and live-filters by. */
  queries?: string[];
  /** Type the queries automatically and filter results as they type. */
  autoType?: boolean;
  placeholder?: string;
  /** Grouped results rendered below the search field. */
  groups?: CommandSearchGroup[];
  /** Called with the item when a row is clicked. */
  onSelect?: (item: CommandSearchItem) => void;
  /** Fixed height of the palette. Content overflows are clipped like a real palette. */
  height?: number;
  className?: string;
}

const DEFAULT_QUERIES = ["anim", "chart", "dialog", "side"];

const DEFAULT_GROUPS: CommandSearchGroup[] = [
  {
    label: "Pages",
    items: [
      { label: "Animated Drawer" },
      { label: "Docs" },
      { label: "Components" },
      { label: "Blocks" },
      { label: "Charts" },
      { label: "Directory" },
      { label: "Create" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Accordion" },
      { label: "Alert" },
      { label: "Alert Dialog" },
      { label: "Animated Beam" },
      { label: "Avatar" },
      { label: "Badge" },
      { label: "Breadcrumb" },
      { label: "Button" },
      { label: "Calendar" },
      { label: "Card" },
      { label: "Carousel" },
      { label: "Chart" },
      { label: "Checkbox" },
      { label: "Combobox" },
      { label: "Command" },
      { label: "Dialog" },
      { label: "Drawer" },
      { label: "Dropdown Menu" },
      { label: "Input" },
      { label: "Navigation Menu" },
      { label: "Popover" },
      { label: "Select" },
      { label: "Sidebar" },
      { label: "Table" },
      { label: "Tabs" },
      { label: "Tooltip" },
    ],
  },
];

const ROW_SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-[2px] h-[18px] w-[1.5px] shrink-0 rounded-full bg-foreground"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

export function CommandSearch({
  query = "anim",
  queries,
  autoType = true,
  placeholder = "Search…",
  groups = DEFAULT_GROUPS,
  onSelect,
  height = 408,
  className,
}: CommandSearchProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-10% 0px" });

  const { text: typed } = useTypewriter(queries ?? DEFAULT_QUERIES, {
    typeMs: 170,
    deleteMs: 80,
    holdMs: 2800,
    gapMs: 1000,
    enabled: autoType && inView,
  });

  const displayQuery = autoType ? typed : query;
  const needle = displayQuery.trim().toLowerCase();

  const filteredGroups = React.useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: needle
            ? group.items.filter((item) =>
                item.label.toLowerCase().includes(needle),
              )
            : group.items,
        }))
        .filter((group) => group.items.length > 0),
    [groups, needle],
  );

  // The highlight tracks item identity (label), never a numeric index, so it
  // stays correct while rows animate in and out. When the hovered row is
  // filtered away it falls back to the first visible row — no state resets.
  const [hoveredLabel, setHoveredLabel] = React.useState<string | null>(null);
  const visibleLabels = React.useMemo(
    () => new Set(filteredGroups.flatMap((g) => g.items.map((i) => i.label))),
    [filteredGroups],
  );
  const activeLabel =
    hoveredLabel && visibleLabels.has(hoveredLabel)
      ? hoveredLabel
      : filteredGroups[0]?.items[0]?.label ?? null;

  // The highlight is ONE persistent element positioned in the list container,
  // re-measured from the DOM whenever the active row or the filter changes.
  // (A layoutId pill breaks here: the list reflows instantly under the
  // animation and the projected position goes stale between re-renders.)
  const rowRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const [pillY, setPillY] = React.useState<number | null>(null);

  // Remeasure when the active row or filtered list changes so the pill stays
  // aligned while auto-typing reflows results. setState bails out when unchanged.
  React.useLayoutEffect(() => {
    const row = activeLabel ? rowRefs.current.get(activeLabel) : undefined;
    const next = row ? row.offsetTop : null;
    setPillY((prev) => (prev === next ? prev : next));
  }, [activeLabel, filteredGroups]);

  const flatItems = React.useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (flatItems.length === 0) return;

      const currentIndex = Math.max(
        0,
        flatItems.findIndex((item) => item.label === activeLabel),
      );

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = flatItems[(currentIndex + 1) % flatItems.length];
        setHoveredLabel(next.label);
        rowRefs.current.get(next.label)?.scrollIntoView({ block: "nearest" });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prev =
          flatItems[(currentIndex - 1 + flatItems.length) % flatItems.length];
        setHoveredLabel(prev.label);
        rowRefs.current.get(prev.label)?.scrollIntoView({ block: "nearest" });
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selected = flatItems[currentIndex] ?? flatItems[0];
        if (selected) onSelect?.(selected);
      }
    },
    [activeLabel, flatItems, onSelect],
  );

  const activeOptionId = activeLabel
    ? `command-search-option-${activeLabel.replace(/\s+/g, "-").toLowerCase()}`
    : undefined;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="listbox"
      aria-label="Command search"
      aria-activedescendant={activeOptionId}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[14px] bg-white p-2 pb-11 outline-hidden",
        "shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_0_0_1px_rgba(10,10,10,0.05)] drop-shadow-[0_4px_14.2px_rgba(108,108,108,0.25)]",
        "focus-visible:ring-2 focus-visible:ring-neutral-400/40 dark:focus-visible:ring-neutral-500/40",
        "dark:bg-neutral-950 dark:shadow-[0_1px_3px_0_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]",
        className,
      )}
      style={{ height }}
    >
      {/* Search field */}
      <div className="flex h-9 shrink-0 items-center gap-3 rounded-lg border border-border bg-neutral-200/50 px-3 dark:bg-neutral-800/50">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 items-center font-inter text-base text-[#020202] dark:text-neutral-50">
          <span className="whitespace-pre">{displayQuery}</span>
          <Caret />
          {!displayQuery ? (
            <span className="ml-1 truncate text-muted-foreground/60">
              {placeholder}
            </span>
          ) : null}
        </div>
      </div>

      {/* Results — filtering is instant, like a native palette; the animated
          piece is the highlight pill gliding between rows. */}
      <div
        className="relative flex-1 overflow-y-auto overflow-x-hidden"
        onMouseLeave={() => setHoveredLabel(null)}
      >
        <motion.span
          aria-hidden
          initial={false}
          animate={{
            y: pillY ?? 0,
            opacity: pillY === null ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className="pointer-events-none absolute inset-x-0 top-0 h-9 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/60"
        />

        {filteredGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-1 pt-4 text-xs font-medium leading-4 text-muted-foreground">
              {group.label}
            </p>
            {group.items.map((item) => {
              const active = item.label === activeLabel;
              return (
                <motion.button
                  key={item.label}
                  id={`command-search-option-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  ref={(el) => {
                    if (el) rowRefs.current.set(item.label, el);
                    else rowRefs.current.delete(item.label);
                  }}
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={-1}
                  onClick={() => onSelect?.(item)}
                  onMouseEnter={() => setHoveredLabel(item.label)}
                  onFocus={() => setHoveredLabel(item.label)}
                  whileTap={{ scale: 0.985 }}
                  className="relative flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left outline-hidden"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <motion.span
                      animate={{ x: active ? 2 : 0 }}
                      transition={ROW_SPRING}
                      className="shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4"
                    >
                      {item.icon ?? <ArrowRight />}
                    </motion.span>
                    <span
                      className={cn(
                        "truncate text-sm font-medium leading-5 transition-colors duration-150",
                        active
                          ? "text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-900/80 dark:text-neutral-100/80",
                      )}
                    >
                      <Highlighted label={item.label} needle={needle} />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        ))}

          <AnimatePresence>
            {filteredGroups.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col items-center gap-2 pt-10 text-center"
              >
                <SearchX className="h-5 w-5 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  No results for&nbsp;
                  <span className="font-medium text-foreground">
                    “{displayQuery}”
                  </span>
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
      </div>

      {/* Footer hints */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-11 items-center gap-2 rounded-b-[14px] border-t border-border bg-neutral-50 px-4 dark:bg-neutral-900/60">
        <kbd className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-border bg-white dark:bg-neutral-900">
          <ArrowUp className="h-3 w-3 text-muted-foreground" />
        </kbd>
        <kbd className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-border bg-white dark:bg-neutral-900">
          <ArrowDown className="h-3 w-3 text-muted-foreground" />
        </kbd>
        <span className="font-inter text-xs font-medium text-[#71717a] dark:text-neutral-400">
          Navigate
        </span>
        <kbd className="ml-2 flex h-[22px] w-[22px] items-center justify-center rounded-md border border-border bg-white dark:bg-neutral-900">
          <CornerDownLeft className="h-3 w-3 text-muted-foreground" />
        </kbd>
        <span className="font-inter text-xs font-medium text-[#71717a] dark:text-neutral-400">
          Select
        </span>
      </div>
    </div>
  );
}

function Highlighted({ label, needle }: { label: string; needle: string }) {
  if (!needle) return <>{label}</>;
  const start = label.toLowerCase().indexOf(needle);
  if (start === -1) return <>{label}</>;
  const end = start + needle.length;
  return (
    <>
      {label.slice(0, start)}
      <span className="rounded-[3px] bg-amber-200/40 dark:bg-amber-400/15">
        {label.slice(start, end)}
      </span>
      {label.slice(end)}
    </>
  );
}
