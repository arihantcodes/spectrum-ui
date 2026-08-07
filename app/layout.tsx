import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter, Spectral } from "next/font/google";
import localFont from "next/font/local";

const calSans = localFont({
  src: "./fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
  weight: "600",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});
import Footer from "@/components/footer";
import "./globals.css";
import { inject } from "@vercel/analytics";
import { auth } from "@/auth";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { LinkPrefetch } from "@/components/seo/link-prefetch";
import { TalkToUs } from "@/components/talk-to-us";
import { JsonLd } from "@/components/seo/json-ld";
import { AdSenseScript } from "@/components/seo/adsense-script";
import { generateSiteStructuredData } from "@/lib/site-structured-data";

inject();

export const metadata: Metadata = {
  title: {
    default: "Spectrum UI — Animated React Components & Blocks",
    template: "%s | Spectrum UI",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Spectrum UI",
      url: siteConfig.url,
    },
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: "Arihant Jain",
  publisher: "Spectrum UI",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": siteConfig.url,
    },
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/llms-full.txt", title: "llms-full.txt" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: "Spectrum UI — Animated React Components & Blocks",
    description: siteConfig.description,
    siteName: "Spectrum UI",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum UI — Animated React Components & Blocks",
    description: siteConfig.description,
    images: [siteConfig.ogImage.url],
    creator: "@arihantcodes",
    site: "@spectrumui",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    // The next/font variables must live on <html>, not <body>. Tailwind v4
    // resolves @theme entries like `--font-mono: var(--font-geist-mono), …` at
    // :root; if the font variables are only declared on <body> they are empty
    // at :root, every font-* utility becomes invalid, and text silently falls
    // back to the system stack.
    <html
      lang={siteConfig.locale.split("-")[0]}
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${spectral.variable} ${calSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-8119622964025792" />
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        {/* Defer non-critical scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K7ZP6JB4MG"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-K7ZP6JB4MG');
            `.trim(),
          }}
        />
        <JsonLd
          id="spectrum-ui-structured-data"
          data={generateSiteStructuredData()}
        />
        <AdSenseScript />
      </head>
      <body className="font-regular" suppressHydrationWarning>
        <Providers>
          <Analytics />
          <LinkPrefetch />

          <SiteHeader session={session} />
          <main className="flex flex-1 flex-col">
            {" "}
            {children}
          </main>
          <TalkToUs />

          <Toaster />
        
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
