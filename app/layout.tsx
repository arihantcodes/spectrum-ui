import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "@/components/footer";
import "./globals.css";
import { inject } from "@vercel/analytics";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import Cta from "@/components/cta";
import CrispChat from "@/components/crips-chat";
import { PostHogProvider } from "@/components/provider";
import { LinkPrefetch } from "@/components/seo/link-prefetch";

inject();

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
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
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
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
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale.split("-")[0]} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteConfig.url} />
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/geist-mono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Defer non-critical scripts */}
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
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-regular`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <LinkPrefetch />

          {/* <div className="bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-3 text-left font-sans text-base font-medium tracking-tight text-white md:text-center">
            <Link
              href="/docs/profile"
              className="flex items-center justify-center"
            >
              ✨ Introducing Spectrum CLI – Your favorite UI blocks, now just
              one command away.
              <ChevronRight className=" h-4 w-4 mt-1 ml-2 " />
            </Link>
          </div> */}

          <SiteHeader />
          <main className="flex flex-1 flex-col">
            {" "}
            <PostHogProvider>{children}</PostHogProvider>
          </main>
          <CrispChat />

          <Toaster />
          <Cta />
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
