"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "./Icon";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4  md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className=" font-bold lg:inline-block">Spectrum UI</span>
      </Link>
      <nav className=" items-center gap-4 text-sm xl:gap-6 hidden md:flex">
        <Link
          href="/docs/installation"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs/installation"
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Docs
        </Link>

        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Blocks
        </Link>

        <Link
          href="/colors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Colors
        </Link>
      </nav>
    </div>
  );
}
