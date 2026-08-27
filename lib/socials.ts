/**
 * Every public Spectrum UI / Arihant handle, in one place.
 *
 * The URLs come from `siteConfig.links` so the palette, the footer and the
 * structured data can never disagree about where a profile lives; the handle is
 * spelled out in the title rather than tucked into a subtitle, because the
 * subtitle column is hidden on phones and a handle you can't read is no use.
 */

import { siteConfig } from '@/config/site';

export type SocialIcon = 'x' | 'github' | 'linkedin';

export interface SocialLink {
  id: string;
  /** Platform first so "linkedin" finds it, handle second so "@arihant" does too. */
  title: string;
  handle: string;
  href: string;
  icon: SocialIcon;
  keywords: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'social:x',
    title: 'X — @arihantcodes',
    handle: '@arihantcodes',
    href: siteConfig.links.twitter,
    icon: 'x',
    keywords: 'x twitter tweet follow social arihantcodes arihant jain',
  },
  {
    id: 'social:github-repo',
    title: 'GitHub — spectrum-ui',
    handle: 'arihantcodes/spectrum-ui',
    href: siteConfig.links.github,
    icon: 'github',
    keywords: 'github repo repository source code star issues open source',
  },
  {
    id: 'social:github-profile',
    title: 'GitHub — @arihantcodes',
    handle: '@arihantcodes',
    href: 'https://github.com/arihantcodes',
    icon: 'github',
    keywords: 'github profile author maintainer arihant jain',
  },
  {
    id: 'social:linkedin',
    title: 'LinkedIn — in/arihantcodes',
    handle: 'in/arihantcodes',
    href: siteConfig.links.linkedin,
    icon: 'linkedin',
    keywords: 'linkedin connect work hire arihant jain',
  },
];
