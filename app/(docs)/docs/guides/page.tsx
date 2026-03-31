import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Code2, Sparkles, Zap } from "lucide-react";
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper";

export const metadata: Metadata = baseMetadata({
  title: "Guides & Tutorials",
  description: "Learn how to build modern React applications with Spectrum UI. Step-by-step tutorials, best practices, and real-world examples.",
  keywords: [
    "React tutorials",
    "UI component guide",
    "Next.js tutorials",
    "React best practices",
    "component library tutorial",
    "modern UI development",
    "React design patterns",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/guides",
});

export default function GuidesPage() {
  const guides = [
    {
      title: "Getting Started with Spectrum UI",
      description: "Learn how to set up Spectrum UI in your React or Next.js project in under 5 minutes.",
      icon: Zap,
      href: "/docs/installation",
      tag: "Beginner",
    },
    {
      title: "Building a Dashboard with React Components",
      description: "Create a fully functional admin dashboard using Spectrum UI components. Includes data tables, charts, and forms.",
      icon: Code2,
      href: "/docs/guides/dashboard-tutorial",
      tag: "Intermediate",
    },
    {
      title: "Best Practices for React UI Components",
      description: "Learn industry best practices for building accessible, performant, and maintainable React components.",
      icon: Book,
      href: "/docs/guides/best-practices",
      tag: "Advanced",
    },
    {
      title: "Advanced Component Customization",
      description: "Master the art of customizing Spectrum UI components to match your brand and design system.",
      icon: Sparkles,
      href: "/docs/guides/customization-guide",
      tag: "Advanced",
    },
  ];

  return (
    <SEOWrapper
      componentName="Guides & Tutorials"
      description="Learn how to build modern React applications with Spectrum UI. Step-by-step tutorials, best practices, and real-world examples."
      url="https://ui.spectrumhq.in/docs/guides"
      keywords={[
        "React tutorials",
        "UI component guide",
        "Next.js tutorials",
        "React best practices",
        "component library tutorial",
        "modern UI development",
        "React design patterns",
      ]}
    >
      <main className="relative py-6 lg:gap-10 lg:py-8">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Guides & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides to help you master React UI development with Spectrum UI.
              From beginner tutorials to advanced patterns.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 mb-12">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link key={guide.href} href={guide.href}>
                  <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                          {guide.tag}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* SEO Content Section */}
          <section className="my-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Spectrum UI for Your React Projects?
              </h2>
              <p className="text-muted-foreground mb-4">
                Spectrum UI is a comprehensive React component library designed for modern web applications.
                Built with TypeScript, Tailwind CSS, and accessibility in mind, it provides everything you need
                to build beautiful, responsive user interfaces quickly and efficiently.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                What You&apos;ll Learn
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>How to integrate Spectrum UI components into your React or Next.js applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Best practices for building accessible, performant user interfaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Advanced customization techniques to match your brand identity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Real-world examples and patterns used in production applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Performance optimization strategies for React components</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border p-6 bg-muted/50">
              <h3 className="text-xl font-semibold mb-2">Popular Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These tutorials are most popular among developers learning to use Spectrum UI:
              </p>
              <div className="space-y-2">
                <Link href="/docs/installation" className="block text-primary hover:underline">
                  → Quick Start Guide: Install and Setup Spectrum UI
                </Link>
                <Link href="/docs/accordion" className="block text-primary hover:underline">
                  → Building Accessible Accordions in React
                </Link>
                <Link href="/docs/button" className="block text-primary hover:underline">
                  → Creating Custom Button Variants with Tailwind CSS
                </Link>
                <Link href="/docs/card" className="block text-primary hover:underline">
                  → Designing Beautiful Card Layouts for Modern Web Apps
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SEOWrapper>
  );
}

