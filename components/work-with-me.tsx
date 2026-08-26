'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Icons } from './icon';

/** Floating hire-me CTA. Replaces the former "Talk to us" chat launcher: the
 *  chat widget was only reachable through that button, so pointing this at X
 *  retires the widget entirely rather than leaving its script loading unused.
 *
 *  Hidden on auth screens (nothing to pitch mid-signup) and on /charts, whose
 *  full-bleed canvas the pill would overlap. */
export function WorkWithMe() {
  const pathname = usePathname();
  const hideOnRoutes = ['/sign-in', '/sign-up', '/create-user', '/profile'];
  const hidden =
    pathname === '/charts' ||
    hideOnRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (hidden) return null;

  return (
    <Button
      asChild
      data-work-with-me
      className="fixed bottom-4 right-4 z-50 h-[40px] gap-2 rounded-full border border-neutral-200 px-4 py-2.5 font-inter text-base font-normal tracking-wide shadow-md"
    >
      <Link
        href={siteConfig.links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Work with ${siteConfig.author.name} — opens ${siteConfig.author.twitter} on X in a new tab`}
      >
        {/* Sizing comes from the Button's [&_svg]:size-4 rule. */}
        <Icons.twitter aria-hidden />
        Work with me
      </Link>
    </Button>
  );
}
