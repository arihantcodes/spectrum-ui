'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconlyBookmark, IconlyLogout, IconlyUser } from '@/components/icons/iconly';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { Session } from 'next-auth';

// Rows share one geometry so the menu reads as a single system: 36px tall,
// 10px inner radius (menu is 16px with 6px padding — inner ≈ outer − padding).
const itemClass =
  'h-9 cursor-pointer gap-2.5 rounded-[10px] px-2.5 text-sm font-normal transition-colors duration-150';

export function UserNav({ session }: { session: Session }) {
  const user = session?.user;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative ml-2 h-9 w-9 rounded-full outline-none hover:shadow-[0_0_0_2px_hsl(var(--border))] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:shadow-[0_0_0_2px_hsl(var(--border))]"
        >
          <Avatar className="h-9 w-9">
            {user.image && <AvatarImage src={user.image} alt={user.name ?? ''} />}
            <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-2xl p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_40px_-16px_rgba(0,0,0,0.8)]"
        align="end"
        sideOffset={8}
        forceMount
      >
        <DropdownMenuLabel className="px-2.5 pb-2 pt-1.5 font-normal">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium leading-tight text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs leading-tight text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="-mx-1.5" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className={itemClass}>
            <Link href="/profile">
              <IconlyUser className="size-[17px] text-muted-foreground" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className={itemClass}>
            <Link href="/bookmarks">
              <IconlyBookmark className="size-[17px] text-muted-foreground" />
              Bookmarks
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="-mx-1.5" />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className={`${itemClass} text-red-600 focus:bg-red-500/10 focus:text-red-600 dark:text-red-500 dark:focus:text-red-500`}
        >
          <IconlyLogout className="size-[17px]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
