'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from './icon';
import { ScrambleText } from './scramble-text';

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
          className="font-mono text-sm font-medium uppercase whitespace-nowrap text-foreground/80 tracking-[0.5px] sm:text-base"
        />
      </Link>
      <nav className="items-center gap-6 xl:gap-8 hidden md:flex font-mono text-[13px] uppercase tracking-wide">
        <Link
          href="/docs"
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === '/docs/installation' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Components
        </Link>
        <Link
          href="/charts"
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === '/charts' || pathname?.startsWith('/docs/charts')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Charts
        </Link>
        {/* <Link
          href="/templates"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/templates') ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Templates
        </Link> */}

        <Link
          href="/blog"
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === '/blog' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Blogs
        </Link>
        <Link
          href="/colors"
          className={cn(
            'transition-colors hover:text-foreground whitespace-nowrap',
            pathname === '/colors' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Colors
        </Link>
        <Link
          href="/blocks"
          className={cn(
            'transition-colors hover:text-foreground whitespace-nowrap',
            pathname === '/blocks' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Blocks
        </Link>
      </nav>
    </div>
  );
}
