'use client';

import * as React from 'react';
import { Bookmark, Copy, Link2, Pencil, Share2, Trash2 } from 'lucide-react';
import { ExpandableActionBar } from '@/components/motion/expandable-action-bar';

const ITEMS = [
  { id: 'edit', label: 'Edit', icon: <Pencil className="size-4" />, shortcut: 'E' },
  { id: 'copy', label: 'Duplicate', icon: <Copy className="size-4" />, shortcut: '⌘D' },
  { id: 'link', label: 'Copy link', icon: <Link2 className="size-4" /> },
  { id: 'share', label: 'Share', icon: <Share2 className="size-4" /> },
  { id: 'save', label: 'Save', icon: <Bookmark className="size-4" />, badge: 3 },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="size-4" /> },
];

export default function ExpandableActionBarDemo() {
  const [last, setLast] = React.useState<string | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <ExpandableActionBar items={ITEMS} onAction={(item) => setLast(String(item.label))} />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {last
          ? `Last action: ${last}`
          : 'Hover or focus the bar — the icons expand into labeled controls.'}
      </p>
    </div>
  );
}
