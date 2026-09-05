'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { DOCS } from '@/app/(docs)/layout-parts/documentation.constant';
import { TreeNav } from '@/components/spectrumui/tree-nav';
import { compareComponentNames } from '@/lib/component-catalog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function LeftSide() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-1 pb-10">
      {DOCS.map((group) => {
        const children =
          group.groupKey === 'components'
            ? [...group.children].sort((a, b) => compareComponentNames(a.label, b.label))
            : group.children;

        return (
          <DocsNavGroup
            key={group.groupKey}
            groupValue={group.groupValue}
            items={children}
            pathname={pathname}
          />
        );
      })}
    </nav>
  );
}

interface DocsNavChild {
  label: string;
  value: string;
  url: string;
  new?: boolean;
}

function DocsNavGroup({
  groupValue,
  items,
  pathname,
}: {
  groupValue: string;
  items: DocsNavChild[];
  pathname: string;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="data-[state=open]:mb-2">
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left outline-hidden transition-colors',
          open && 'mb-1.5',
          'hover:bg-black/3 dark:hover:bg-white/4',
          'focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20',
        )}
      >
        <span className="font-mono text-[13px] font-medium leading-4 tracking-[-0.06px] text-[#262626] antialiased dark:text-neutral-200">
          {groupValue}
        </span>
        {open ? (
          <ChevronDown
            className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400"
            aria-hidden
          />
        ) : (
          <ChevronRight
            className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400"
            aria-hidden
          />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        {/* Same TreeNav we ship in the library: tree rail, dot terminal, and a
            marker that follows the pointer and springs back to the active page. */}
        <TreeNav
          items={items.map((child) => ({
            label: child.label,
            href: child.url,
            badge: child.new ? 'New' : undefined,
            external: child.url.startsWith('http'),
          }))}
          activeHref={pathname}
          linkComponent={Link}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
