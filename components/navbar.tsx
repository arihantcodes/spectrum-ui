'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/mobile-nav';
import { MainNav } from './main-nav';
import { CommandMenuTrigger } from './command-menu-trigger';
import { GithubStarButton } from './github-star-button';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { Button } from './ui/button';
import type { Session } from 'next-auth';

export function SiteHeader({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/10 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container-frame">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MobileNav />
          <MainNav />

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            {/* 
            <div className="hidden md:flex items-center gap-2">
              <Link 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
              >
                <Icons.gitHub className="h-5 w-4 mr-2" />
              </Link>
              <Link 
                href={siteConfig.links.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                <Icons.twitter className="h-3 w-4 mr-2" />
              </Link>
            </div> */}

            <nav className="flex items-center gap-1.5 sm:gap-2">
              <CommandMenuTrigger />
              <GithubStarButton />
              {/* On phones the switcher lives inside the mobile menu — the
                  header row is too narrow for all three controls */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              {session ? (
                <UserNav session={session} />
              ) : (
                <Link href={`/sign-up?callbackUrl=${encodeURIComponent(pathname)}`}>
                  <Button
                    size="sm"
                    className="h-8 px-3 sm:px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-[#0a0a0a] text-xs sm:text-sm font-medium transition-colors shadow-xs"
                  >
                    Create Account
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
