"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT = "ca-pub-8119622964025792";

/**
 * AdSense is deliberately kept off the /design gallery routes.
 *
 * The gallery sells sponsorship inventory directly (sidebar, feed cards,
 * right-rail units). Running AdSense on the same surface would cannibalise that
 * inventory and cheapen the page for a fraction of the revenue. Everywhere else
 * — docs, blog, marketing — is unchanged.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  if (pathname?.startsWith("/design")) return null;

  return (
    <Script
      id="adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
