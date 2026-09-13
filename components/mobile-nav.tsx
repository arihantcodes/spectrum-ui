'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import * as React from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

import { Icons } from '@/components/icon';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { cn } from '@/lib/utils';
import { SITE_NAV, isNavLinkActive } from '@/lib/site-nav';
import {
  UI_COMPONENT_CATALOG,
  compareComponentNames,
  componentDocsPath,
} from '@/lib/component-catalog';
import { BLOCK_CATEGORIES, blockCategoryPath } from '@/lib/block-catalog';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SponsorButton } from '@/components/sponsor-button';
import { openCommandMenu } from '@/lib/command-menu';

interface CatalogSection {
  title: string;
  items: { label: string; href: string }[];
}

const CATALOG_SECTIONS: CatalogSection[] = [
  {
    title: 'Components',
    items: [...UI_COMPONENT_CATALOG]
      .sort((a, b) => compareComponentNames(a.name, b.name))
      .map((component) => ({ label: component.name, href: componentDocsPath(component.slug) })),
  },
  {
    title: 'Blocks',
    items: BLOCK_CATEGORIES.map((category) => ({
      label: category.name,
      href: blockCategoryPath(category.slug),
    })),
  },
];

/**
 * The header's menu on phones: the same four destinations the desktop bar
 * shows, and nothing else.
 *
 * It used to inline the entire catalog — 58 components, 19 charts and 17 topic
 * guides, all expanded — which made opening the menu a hundred-row scroll for
 * links the desktop header never offered. Components has its own index at
 * /docs, and the command menu searches every page, so the sheet does not need
 * to be a second sitemap.
 */
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
          onClick={() => setIsOpen(false)}
          className="flex h-16 items-center border-b border-border px-4"
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
            className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-border bg-secondary/40 px-3.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Search</span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          <div className="flex flex-col gap-0.5">
            {SITE_NAV.map((link) => (
              <MobileLink key={link.href} href={link.href} onOpenChange={setIsOpen}>
                {link.label}
              </MobileLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {CATALOG_SECTIONS.map((section) => (
              <CatalogGroup key={section.title} section={section} onOpenChange={setIsOpen} />
            ))}
          </div>
        </nav>

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

/**
 * A catalog the desktop header only links to: 58 components, four block
 * categories. Closed unless it holds the page you are on, so the sheet opens
 * on four destinations rather than on a wall of rows.
 */
function CatalogGroup({
  section,
  onOpenChange,
}: {
  section: CatalogSection;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const holdsCurrentPage = section.items.some((item) => item.href === pathname);
  const [open, setOpen] = React.useState(holdsCurrentPage);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      <CollapsibleTrigger className="flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left outline-hidden transition-colors hover:bg-secondary/50">
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {section.title}
          </span>
          <span className="text-[11px] tabular-nums text-muted-foreground/60">
            {section.items.length}
          </span>
        </span>
        {open ? (
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="flex flex-col gap-0.5">
          {section.items.map((item) => (
            <MobileLink key={item.href} href={item.href} onOpenChange={onOpenChange}>
              <span className="truncate">{item.label}</span>
            </MobileLink>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const target = href.toString();
  const link = SITE_NAV.find((entry) => entry.href === target);
  const isActive = link ? isNavLinkActive(link, pathname) : pathname === target;

  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={() => {
          router.push(target);
          onOpenChange?.(false);
        }}
        className={cn(
          'flex min-h-11 items-center justify-between gap-2 rounded-lg px-3 py-2 text-[15px] transition-colors',
          isActive
            ? 'bg-secondary font-medium text-foreground'
            : 'text-foreground/80 hover:bg-secondary/50 hover:text-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  );
}
