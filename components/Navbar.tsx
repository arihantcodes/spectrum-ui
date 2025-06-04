"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "./Icon";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { NumberTicker } from "./magicui/NumberTicker";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-grid sticky top-0 z-[50]  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper ">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MobileNav />
          <MainNav />

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            {pathname !== "/blocks" && (
              <Link
                href="https://shadcnblocks.com"
                className="hidden md:flex items-center gap-2 bg-neutral-100 border dark:bg-secondary rounded-md px-5 h-9 hover:bg-neutral-200 dark:hover:bg-secondary/80 transition-colors"
              >
                <Icons.shadcnblock className="h-4 w-4" />
                <div className="flex flex-col xl:flex-row gap-3 items-center">
                  <p className="text-sm font-medium hidden lg:block">
                    Shadcnblocks.com
                  </p>
                  <p className="text-[11px] text-neutral-700 dark:text-neutral-400 hidden xl:block">
                    [ 600+ extra shadcn blocks]
                  </p>
                </div>
              </Link>
            )}

            <div className="hidden md:flex items-center gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.gitHub className="h-5 w-4 mr-2" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.twitter className="h-3 w-4 mr-2" />
              </Link>
            </div>

            <nav className="flex items-center gap-0.5">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
