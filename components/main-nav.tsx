'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from './icon';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 md:flex shrink-0">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <div className="h-6 w-6 bg-neutral-100 border-neutral-300 border dark:bg-white rounded-md flex items-center justify-center p-1">
          <Icons.logo className="h-6 w-6 rounded-md text-black " />
        </div>

        <span className="font-bold whitespace-nowrap">Spectrum UI</span>
      </Link>
      <nav className=" items-center gap-4 text-sm xl:gap-6 hidden md:flex">
        <Link
          href="/docs"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs/installation' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Components
        </Link>
        <Link
          href="/pro"
          className={cn(
            'transition-colors hover:text-foreground/80 flex items-center',
            pathname?.startsWith('/pro') ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Pro
          <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
            Early Bird
          </span>
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
        <Link href="/blog" className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/blog' ? 'text-foreground' : 'text-foreground/80',
        )}>
          Blogs
        </Link>
        <Link href="/founder-story" className={cn(
          'transition-colors hover:text-foreground/80 flex items-center',
          pathname === '/founder-story' ? 'text-foreground' : 'text-foreground/80',
        )}>
          Founder Story
        </Link>
        <Link href="/sponsor" className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/sponsor' ? 'text-foreground' : 'text-foreground/80',
        )}>
          Sponsor Us
          <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            New
          </span>
        </Link>
      </nav>
    </div>
  );
}
