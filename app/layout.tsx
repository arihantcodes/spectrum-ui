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

inject();

export const metadata: Metadata = {
  title: {
    default: "Spectrum UI — React & Next.js Component Library",
    template: "%s | Spectrum UI",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    // Critical Top-Ranking Keywords
    "React UI components",
    "best UI library",
    "React component library",
    "Next.js components",
    "Tailwind CSS components",
    "modern design system",
    "UI components",
    "frontend components",

    // Primary Technology Keywords
    "Next.js UI library",
    "Next.js 14 components",
    "React Tailwind components",
    "Tailwind component library",
    "TypeScript React components",
    "Vercel components",
    "Next.js app router components",
    "React server components",

    // Component Type Keywords
    "React button component",
    "React form components",
    "React modal component",
    "React card component",
    "React table component",
    "React navigation components",
    "dashboard components",
    "admin panel components",

    // Quality & Features
    "accessible React components",
    "responsive UI components",
    "dark mode components",
    "animated React components",
    "customizable UI components",
    "production-ready components",
    "enterprise UI library",
    "WCAG compliant components",

    // Use Cases
    "SaaS UI components",
    "e-commerce components",
    "landing page components",
    "authentication components",
    "data visualization components",
    "form builder components",
    "admin dashboard UI",
    "web app components",

    // Alternative & Comparison
    "shadcn alternative",
    "shadcn ui alternative",
    "Material UI alternative",
    "Chakra UI alternative",
    "best React UI library 2024",
    "free UI component library",
    "open source design system",

    // Action & Intent Keywords
    "copy paste components",
    "download React components",
    "free Tailwind components",
    "React UI kit",
    "UI template library",
    "component code snippets",
    "ready-to-use React components",

    // Framework & Stack
    "Next.js Tailwind template",
    "React TypeScript components",
    "Radix UI components",
    "Framer Motion React",
    "React Hook Form components",
    "modern React components",

    // Learning & Tutorial
    "React components examples",
    "UI component tutorial",
    "how to build React components",
    "React design patterns",
    "component library guide",

    // Specific Solutions
    "React component library for startups",
    "fastest React UI library",
    "lightweight component library",
    "zero-config UI components",
    "headless UI components",
    "composable React components",

    ...siteConfig.keywords,
  ],
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
    title: "Spectrum UI — React & Next.js Component Library",
    description: siteConfig.description,
    siteName: "Spectrum UI",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum UI — React & Next.js Component Library",
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
    <html lang={siteConfig.locale.split("-")[0]} suppressHydrationWarning>
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
        <Script
          id="schema-org-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              author: {
                "@type": "Person",
                name: siteConfig.author.name,
                url: siteConfig.author.url,
              },
              license: siteConfig.license,
              version: siteConfig.version,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteConfig.url}/docs?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Spectrum UI",
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.svg`,
              description: siteConfig.description,
              founder: {
                "@type": "Person",
                name: siteConfig.author.name,
                url: siteConfig.author.url,
              },
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
              ],
            }),
          }}
        />
        <Script
          id="adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8119622964025792"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${spectral.variable} ${calSans.variable} font-regular`}
        suppressHydrationWarning
      >
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
