'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHART_LIBRARY, chartLibraryPath } from '@/lib/chart-library';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const NAV = [
  { label: 'Overview', href: '/charts' },
  ...CHART_LIBRARY.map((chart) => ({
    label: chart.name,
    href: chartLibraryPath(chart.slug),
  })),
];

export function ChartsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  return (
    <nav aria-label="Charts navigation" className="flex flex-col gap-1 pb-10">
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
            Charts
          </span>
          {open ? (
            <ChevronDown className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400" />
          ) : (
            <ChevronRight className="size-3.5 shrink-0 text-[#727272] dark:text-neutral-400" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => {
              const active =
                item.href === '/charts' ? pathname === '/charts' : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-lg px-3 py-1.5 text-[13px] leading-5 transition-colors',
                      active
                        ? 'bg-black/5 font-medium text-neutral-950 dark:bg-white/8 dark:text-white'
                        : 'text-neutral-600 hover:bg-black/3 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-white/4 dark:hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </nav>
  );
}
