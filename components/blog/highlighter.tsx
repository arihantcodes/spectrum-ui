'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Medium-style persistent highlighting.
 *
 * Select text inside the article and a small "Highlight" button appears;
 * click it to mark the passage. Highlights are stored as character ranges
 * (offsets into the article's plain text) in localStorage, keyed by slug —
 * so they survive refreshes and navigation until the reader removes them.
 * Because posts are static and server-rendered, the same offsets map back to
 * the same words every time. Click any highlight to remove it.
 */

type Range2 = { start: number; end: number };

const KEY_PREFIX = 'spectrum-blog-highlights:';

function load(key: string): Range2[] {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(key: string, ranges: Range2[]) {
  try {
    if (ranges.length === 0) localStorage.removeItem(KEY_PREFIX + key);
    else localStorage.setItem(KEY_PREFIX + key, JSON.stringify(ranges));
  } catch {
    /* storage full / disabled — highlighting just won't persist */
  }
}

/** Merge overlapping or touching ranges so spans never nest. */
function normalize(ranges: Range2[]): Range2[] {
  const sorted = [...ranges].filter((r) => r.end > r.start).sort((a, b) => a.start - b.start);
  const out: Range2[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else out.push({ ...r });
  }
  return out;
}

/** Character offset of a boundary, measured from the root's start. */
function offsetOf(root: HTMLElement, container: Node, offset: number): number {
  const r = document.createRange();
  r.setStart(root, 0);
  r.setEnd(container, offset);
  return r.toString().length;
}

/** Remove all highlight spans, merging text back so offsets stay stable. */
function unwrapAll(root: HTMLElement) {
  root.querySelectorAll('span.blog-highlight').forEach((span) => {
    const parent = span.parentNode;
    if (!parent) return;
    while (span.firstChild) parent.insertBefore(span.firstChild, span);
    parent.removeChild(span);
  });
  root.normalize();
}

/** Wrap one text-range [start,end) by splitting the text nodes it covers. */
function wrapRange(root: HTMLElement, { start, end }: Range2) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets: { node: Text; from: number; to: number }[] = [];
  let pos = 0;
  let node = walker.nextNode() as Text | null;
  while (node) {
    const len = node.length;
    const s = Math.max(start, pos);
    const e = Math.min(end, pos + len);
    if (s < e && !(node.parentElement && node.parentElement.closest('.blog-highlight'))) {
      targets.push({ node, from: s - pos, to: e - pos });
    }
    pos += len;
    node = walker.nextNode() as Text | null;
  }
  // Wrap after collecting, so splitting nodes mid-walk can't skip any.
  for (const t of targets) {
    const range = document.createRange();
    range.setStart(t.node, t.from);
    range.setEnd(t.node, t.to);
    const span = document.createElement('span');
    span.className = 'blog-highlight';
    span.dataset.hlStart = String(start);
    span.dataset.hlEnd = String(end);
    try {
      range.surroundContents(span);
    } catch {
      /* boundary edge case — skip this fragment */
    }
  }
}

export function BlogHighlighter({
  storageKey,
  children,
}: {
  storageKey: string;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rangesRef = useRef<Range2[]>([]);
  const [toolbar, setToolbar] = useState<{ x: number; y: number } | null>(null);
  const pendingRef = useRef<Range2 | null>(null);

  const render = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    unwrapAll(root);
    for (const r of rangesRef.current) wrapRange(root, r);
  }, []);

  // Restore saved highlights once the article DOM is present.
  useEffect(() => {
    rangesRef.current = normalize(load(storageKey));
    render();
  }, [storageKey, render]);

  // Show the toolbar when the reader finishes a selection inside the article.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) return;

      const start = offsetOf(root, range.startContainer, range.startOffset);
      const end = offsetOf(root, range.endContainer, range.endOffset);
      if (end - start < 1) return;

      pendingRef.current = { start: Math.min(start, end), end: Math.max(start, end) };
      const rect = range.getBoundingClientRect();
      setToolbar({ x: rect.left + rect.width / 2, y: rect.top });
    };

    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) setToolbar(null);
    };

    // Click an existing highlight to remove it.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('span.blog-highlight');
      if (!el) return;
      const start = Number((el as HTMLElement).dataset.hlStart);
      const end = Number((el as HTMLElement).dataset.hlEnd);
      rangesRef.current = rangesRef.current.filter((r) => !(r.start === start && r.end === end));
      save(storageKey, rangesRef.current);
      render();
    };

    root.addEventListener('mouseup', onMouseUp);
    root.addEventListener('click', onClick);
    document.addEventListener('selectionchange', onSelectionChange);
    window.addEventListener('scroll', () => setToolbar(null), { passive: true });
    return () => {
      root.removeEventListener('mouseup', onMouseUp);
      root.removeEventListener('click', onClick);
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [storageKey, render]);

  const addHighlight = () => {
    const pending = pendingRef.current;
    if (!pending) return;
    rangesRef.current = normalize([...rangesRef.current, pending]);
    save(storageKey, rangesRef.current);
    render();
    setToolbar(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <div ref={rootRef}>{children}</div>

      {/* Portal to <body> so `fixed` resolves against the viewport, not the
          transformed .enter-fx ancestor. */}
      {toolbar &&
        typeof document !== 'undefined' &&
        createPortal(
          <button
            type="button"
            // Keep the text selection alive through the click.
            onMouseDown={(e) => e.preventDefault()}
            onClick={addHighlight}
            style={{ left: toolbar.x, top: toolbar.y }}
            className="fixed z-60 flex -translate-x-1/2 -translate-y-[calc(100%+10px)] items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-[12px] font-medium text-white shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] transition-transform duration-100 ease-out active:scale-95 dark:bg-white dark:text-neutral-900"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 20h16M6 16l8.5-8.5a2.12 2.12 0 0 1 3 3L9 19l-4 1 1-4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Highlight
          </button>,
          document.body,
        )}
    </>
  );
}
