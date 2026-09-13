'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import * as React from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

import { Icons } from '@/components/icon';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { cn } from '@/lib/utils';
import {
  UI_COMPONENT_CATALOG,
  compareComponentNames,
  componentDocsPath,
} from '@/lib/component-catalog';
import { CHART_BLOCKS, chartBlockPath } from '@/lib/chart-blocks';
import { BLOCK_CATEGORIES, blockCategoryPath } from '@/lib/block-catalog';
import { TOPIC_HUB_LINKS, topicHubPath } from '@/lib/topic-hub-links';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SponsorButton } from '@/components/sponsor-button';
import { openCommandMenu } from '@/lib/command-menu';

interface NavItem {
  title?: string;
  label?: string;
  href?: string;
  url?: string;
  value?: string;
  items: NavItem[];
  disabled?: boolean;
  event?: string;
  paid?: boolean;
  new?: boolean;
}

interface NavSection {
  title?: string;
  groupKey?: string;
  groupValue?: string;
  items: NavItem[];
  url?: string;
}

const mainNav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Components',
    href: '/docs',
  },
  {
    title: 'Blocks',
    href: '/blocks',
  },
  {
    title: 'Colors',
    href: '/colors',
  },
  {
    title: 'Founder Story',
    href: '/founder-story',
  },
  {
    title: 'Blogs',
    href: '/blog',
  },
  {
    title: 'Sponsor Us',
    href: '/sponsor',
  },
];

const sidebarNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', items: [] },
      { title: 'Installation', href: '/docs/installation', items: [] },
      { title: 'Guides', href: '/docs/guides', items: [] },
    ],
  },
  {
    title: 'Integrations',
    items: [{ title: 'MCP Server', href: '/docs/mcp', items: [] }],
  },
  {
    title: 'Components',
    groupKey: 'components',
    groupValue: 'Components',
    items: [...UI_COMPONENT_CATALOG]
      .sort((a, b) => compareComponentNames(a.name, b.name))
      .map((component) => ({
        label: component.name,
        value: component.slug,
        url: componentDocsPath(component.slug),
        items: [],
      })),
  },
  {
    title: 'Blocks',
    groupKey: 'blocks',
    groupValue: 'Blocks',
    items: BLOCK_CATEGORIES.map((category) => ({
      label: category.name,
      value: category.slug,
      url: blockCategoryPath(category.slug),
      items: [],
      new: category.slug === 'charts',
    })),
  },
  {
    // Deep links to each chart's anchor. Named for what they are: "Charts" is
    // the block category one group above, and two rows with the same word
    // reads as a duplicate rather than a drill-down.
    title: 'Chart types',
    groupKey: 'charts',
    groupValue: 'Charts',
    items: CHART_BLOCKS.map((chart) => ({
      label: chart.name,
      value: chart.slug,
      url: chartBlockPath(chart.slug),
      items: [],
    })),
  },
  {
    title: 'Topic Guides',
    items: TOPIC_HUB_LINKS.map((hub) => ({
      title: hub.label,
      href: topicHubPath(hub.slug),
      items: [],
    })),
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[86%] flex-col p-0 sm:max-w-sm">
        <Link
          href="/"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center h-16 px-4 border-b border-border"
        >
          <Icons.logo className="mr-2 size-4" />
          <span className="font-semibold">Spectrum UI</span>
        </Link>
        <div className="px-4 pt-4">
          {/* One word, left-aligned and truncated. The full sentence wrapped to
              two centred lines in a 290px sheet and read as a broken field. */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openCommandMenu({ source: 'mobile_nav' });
            }}
            className="flex h-10 w-full items-center gap-2.5 rounded-xl border border-border bg-secondary/40 px-3.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Search</span>
          </button>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col space-y-5 p-4">
            {/* Main Navigation */}
            <div className="flex flex-col space-y-0.5">
              {mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setIsOpen}
                      className="text-foreground"
                    >
                      {item.title}
                    </MobileLink>
                  ),
              )}
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-col space-y-3">
              {sidebarNav.map((section, sectionIndex) => (
                <MobileNavSection
                  key={section.title || `section-${sectionIndex}`}
                  section={section}
                  onOpenChange={setIsOpen}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="space-y-3 border-t border-border px-4 py-3">
          <SponsorButton fullWidth source="mobile_nav" onNavigate={() => setIsOpen(false)} />
          {/* The header hides the theme switcher on phones, so it lives here */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/** The route a link points at, without the anchor that follows it. */
function routeOf(item: NavItem) {
  return (item.url || item.href || '').split('#')[0];
}

function MobileNavSection({
  section,
  onOpenChange,
}: {
  section: NavSection;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const holdsCurrentPage = section.items.some((item) => routeOf(item) === pathname);
  /* Components alone is 58 rows. Opening every group by default turned the
     sheet into a hundred-item wall you had to scroll past to reach anything —
     so long groups start closed, and the one you are inside starts open. */
  const [open, setOpen] = React.useState(section.items.length <= 5 || holdsCurrentPage);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      {section.title && (
        <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left outline-hidden transition-colors hover:bg-secondary/50">
          <span className="flex min-w-0 items-baseline gap-1.5">
            <h4 className="truncate text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {section.title}
            </h4>
            {section.items.length > 5 && (
              <span className="text-[11px] tabular-nums text-muted-foreground/60">
                {section.items.length}
              </span>
            )}
          </span>
          {open ? (
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          ) : (
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          )}
        </CollapsibleTrigger>
      )}

      <CollapsibleContent>
        <div className="flex flex-col space-y-0.5">
          {section.items.map((item) => (
            <MobileLink
              key={item.value || item.href || `item-${item.title || item.label}`}
              href={item.url || item.href || '#'}
              onOpenChange={onOpenChange}
            >
              <span className="truncate">{item.title || item.label}</span>
              {item.new && (
                <span className="shrink-0 rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  NEW
                </span>
              )}
            </MobileLink>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href.toString().split('#')[0];

  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
        }}
        className={cn(
          'flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[14.5px] transition-colors',
          isActive
            ? 'bg-secondary font-medium text-foreground'
            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  );
}
