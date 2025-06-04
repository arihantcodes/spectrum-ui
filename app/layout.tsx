import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "@/components/Footer";
import "./globals.css";
import { inject } from "@vercel/analytics";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Toaster } from "@/components/UI/Sonner";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RainbowButton } from "@/components/MagicUI/RainbowButton";
import Cta from "@/components/Cta";

inject();

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Vercel",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Spectrum UI",
    "UI Components",
    "Design",
    "100xdevs",
    "web development",
    "web design",
    "starter template",
    "Arihant",
    "spectrum",
    "bootstrap",
    "tailwind",
    "aceternity",
    "shadcn ui",
    ...siteConfig.keywords,
  ],
  authors: [
    {
      name: "spectrum ui",
      url: siteConfig.url,
    },
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: "Arihant Jain & Aman Jain",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
        <Script
          id="schema-org"
          type="application/ld+json"
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

          <div className="bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-3 text-left font-sans text-base font-medium tracking-tight text-white md:text-center">
            <Link
              href="/docs/profile"
              className="flex items-center justify-center"
            >
              ✨ Introducing Spectrum CLI – Your favorite UI blocks, now just
              one command away.
              <ChevronRight className=" h-4 w-4 mt-1 ml-2 " />
            </Link>
          </div>

          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>

          <Toaster />
          <Cta />
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
