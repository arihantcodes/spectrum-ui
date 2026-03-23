'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from './icon';
import { useI18n } from './i18n-provider';

export function MainNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <div className="mr-4  md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <div className="h-6 w-6 bg-neutral-100 border-neutral-300 border dark:bg-white rounded-md flex items-center justify-center p-1">
          <Icons.logo className="h-6 w-6 rounded-md text-black " />
        </div>

        <span className=" font-bold lg:inline-block">Spectrum UI</span>
      </Link>
      <nav className=" items-center gap-4 text-sm xl:gap-6 hidden md:flex">
        <Link
          href="/docs"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs/installation' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {t('Navbar.components')}
        </Link>
           <Link
          href="/pro"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/pro') ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {t('Navbar.templates')}
          <span className="text-xs ml-1 px-1.5 py-0.5 rounded-full bg-yellow-400/30 dark:bg-[#eaec8a]/16 text-yellow-600 dark:text-[#eaec8a] [text-shadow:0_1px_1.5px_rgb(0,0,0,0.16)]">
            Pro
          </span>
        </Link>
        <Link
          href="/blocks"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/blocks') ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {t('Navbar.blocks')}
        </Link>
        <Link href="/blog" className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === '/blog' ? 'text-foreground' : 'text-foreground/80',
        )}>
          {t('Navbar.blogs')}
        </Link>
      </nav>
    </div>
  );
}
