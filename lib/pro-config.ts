export const PRO_CONFIG = {
  name: 'Spectrum Pro',
  tagline: 'Premium templates, components, and support for serious builders.',
  /** Full launch price shown on the card */
  launchPriceUsd: Number(process.env.NEXT_PUBLIC_PRO_LAUNCH_PRICE ?? 199),
  /** Amount charged today to join the waitlist (early-bird lock-in) */
  waitlistFeeUsd: Number(process.env.NEXT_PUBLIC_PRO_WAITLIST_FEE ?? 199),
  /** Optional yearly renewal for updates (shown in footer) */
  renewalPriceUsd: Number(process.env.NEXT_PUBLIC_PRO_RENEWAL_PRICE ?? 79),
  dodoProductId: process.env.DODO_PRO_WAITLIST_PRODUCT_ID ?? '',
} as const

export const PRO_FEATURES = [
  { label: 'All premium Next.js templates', icon: 'templates' },
  { label: 'Pro React components & blocks', icon: 'components' },
  { label: 'Private Discord community', icon: 'discord' },
  { label: 'Priority email support', icon: 'support' },
  { label: 'Lifetime license — yours forever', icon: 'license' },
  { label: 'All future template drops included', icon: 'updates' },
] as const
