'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import * as React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { Icons } from '@/components/icon';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { cn } from '@/lib/utils';
import { CHART_CATALOG, UI_COMPONENT_CATALOG, compareComponentNames, componentDocsPath } from '@/lib/component-catalog';
import { TOPIC_HUB_LINKS, topicHubPath } from '@/lib/topic-hub-links';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

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
    title: 'Charts',
    groupKey: 'charts',
    groupValue: 'Charts',
    items: [
      { title: 'Overview', href: '/docs/charts', items: [], new: true },
      ...[...CHART_CATALOG]
        .sort((a, b) => compareComponentNames(a.name, b.name))
        .map((component) => ({
          label: component.name,
          value: component.slug,
          url: componentDocsPath(component.slug),
          items: [],
          new: component.new,
        })),
    ],
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
      <SheetContent side="left" className="flex flex-col p-0">
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
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col space-y-4 p-4">
            {/* Main Navigation */}
            <div className="flex flex-col space-y-1.5">
              {mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink key={item.href} href={item.href} onOpenChange={setIsOpen}>
                      {item.title}
                    </MobileLink>
                  ),
              )}
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-col space-y-4">
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
        {/* The header hides the theme switcher on phones, so it lives here */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
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

function MobileNavSection({
  section,
  onOpenChange,
}: {
  section: NavSection;
  onOpenChange: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
      {section.title && (
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left outline-hidden hover:bg-secondary/50">
          <h4 className="font-medium text-sm text-muted-foreground">{section.title}</h4>
          {open ? (
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          ) : (
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          )}
        </CollapsibleTrigger>
      )}

      <CollapsibleContent>
        <div className="flex flex-col space-y-1">
          {section.items.map((item) => (
            <MobileLink
              key={item.value || item.href || `item-${item.title || item.label}`}
              href={item.url || item.href || '#'}
              onOpenChange={onOpenChange}
              className={item.new ? 'relative' : ''}
            >
              {item.title || item.label}
              {item.new && (
                <span className="absolute right-2 top-1 px-1.5 py-0.5 text-[10px] font-medium rounded-sm bg-primary/20 text-primary">
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
  const isActive = pathname === href;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
        }}
        className={cn(
          'p-2 text-[15px] rounded-md flex items-center justify-between',
          isActive
            ? 'bg-secondary font-medium text-primary border-l-2 border-primary/70'
            : 'text-foreground hover:bg-secondary/50',
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  );
}
