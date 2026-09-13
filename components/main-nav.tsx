'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from './icon';
import { ScrambleText } from './scramble-text';
import { SITE_NAV, isNavLinkActive } from '@/lib/site-nav';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-2 shrink-0 md:mr-4 md:flex">
      <Link href="/" className="flex items-center gap-2 md:mr-4 md:gap-2.5 lg:mr-8">
        <div className="h-7 w-7 bg-neutral-900 dark:bg-white rounded-md flex items-center justify-center p-1.5">
          <Icons.logo className="h-full w-full text-white dark:text-black" />
        </div>

        <ScrambleText
          text="Spectrum UI"
          className="font-mono text-sm font-medium uppercase whitespace-nowrap text-foreground/80 tracking-[0.5px] max-[339px]:hidden sm:text-base"
        />
      </Link>
      <nav className="hidden items-center gap-6 font-mono text-[13px] uppercase tracking-wide md:flex xl:gap-8">
        {SITE_NAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'whitespace-nowrap transition-colors hover:text-foreground',
              isNavLinkActive(link, pathname) ? 'text-foreground' : 'text-foreground/80',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
