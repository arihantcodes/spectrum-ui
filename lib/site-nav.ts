/**
 * The header's navigation, in one place.
 *
 * The desktop bar and the mobile sheet render this same list, so a destination
 * cannot exist on one and be missing from the other — which is how the phone
 * ended up with a hundred rows the desktop never had.
 */
export interface SiteNavLink {
  label: string;
  href: string;
  /** `prefix` lights the link on every page beneath it, not just its index. */
  match?: 'exact' | 'prefix';
}

export const SITE_NAV: readonly SiteNavLink[] = [
  { label: 'Components', href: '/docs', match: 'prefix' },
  { label: 'Blogs', href: '/blog', match: 'prefix' },
  { label: 'Colors', href: '/colors' },
  { label: 'Blocks', href: '/blocks', match: 'prefix' },
];

export function isNavLinkActive(link: SiteNavLink, pathname: string | null) {
  if (!pathname) return false;
  if (link.match === 'prefix')
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === link.href;
}
