'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface BlocksNavItem {
  label: string;
  href: string;
}

export interface BlocksNavGroup {
  key: string;
  label: string;
  href: string;
  items: BlocksNavItem[];
}

/**
 * The left rail of the Blocks section, built to the same anatomy as the docs
 * rail: one collapsible group per category, its blocks beneath. The group a
 * reader is inside starts open and the others start closed, so the rail opens
 * on the page they are actually looking at.
 */
export function BlocksNav({ groups }: { groups: BlocksNavGroup[] }) {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    groups.findIndex((group) => group.href === pathname),
  );

  return (
    <nav aria-label="Blocks navigation" className="flex flex-col gap-1 pt-6 pb-10 lg:pt-8">
      {groups.map((group, index) => (
        <BlocksNavSection
          // Keyed by pathname so navigating re-seeds each group's open state:
          // arriving at a category opens it and folds the one you came from.
          key={`${group.key}-${pathname}`}
          group={group}
          pathname={pathname}
          // The open category can run to dozens of blocks, so the other
          // categories would scroll out of reach. Headers above the open one
          // pin to the top of the rail, headers below it pin to the bottom —
          // every category stays one click away at any scroll position.
          pin={index <= activeIndex ? 'top' : 'bottom'}
        />
      ))}
    </nav>
  );
}

function BlocksNavSection({
  group,
  pathname,
  pin,
}: {
  group: BlocksNavGroup;
  pathname: string;
  pin: 'top' | 'bottom';
}) {
  const [open, setOpen] = React.useState(pathname === group.href);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="data-[state=open]:mb-2">
      <CollapsibleTrigger
        className={cn(
          'sticky z-10 flex w-full items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 text-left outline-hidden transition-colors',
          pin === 'top' ? 'top-0' : 'bottom-0',
          open && 'mb-1.5',
          'hover:bg-black/3 dark:hover:bg-white/4',
          'focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20',
        )}
      >
        <span className="font-mono text-[13px] font-medium leading-4 tracking-[-0.06px] text-[#262626] antialiased dark:text-neutral-200">
          {group.label}
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
        <ul className="flex flex-col gap-0.5">
          {group.items.map((item) => {
            const isActive = pathname === group.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm leading-5 antialiased transition-colors duration-150',
                    'font-normal text-[#727272] hover:bg-black/3 hover:text-[#262626] dark:text-neutral-400 dark:hover:bg-white/4 dark:hover:text-neutral-100',
                    isActive && 'hover:bg-black/4 dark:hover:bg-white/6',
                  )}
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
