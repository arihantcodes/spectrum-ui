import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog"
import { Metadata } from "next"
import { generateBlogStructuredData, generateBlogBreadcrumbs } from "@/lib/seo-utils"

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const baseUrl = "https://ui.spectrumhq.in"
  const blogUrl = `${baseUrl}/blog/${post.slug}`
  
  return {
    title: `${post.title} | Spectrum UI Blog`,
    description: post.excerpt,
    keywords: [
      "UI components",
      "React components", 
      "Tailwind CSS",
      "Next.js",
      "shadcn/ui",
      "design system",
      "frontend development",
      "web development",
      "UI/UX",
      "component library",
      post.category?.toLowerCase() || "",
      ...post.title.toLowerCase().split(" "),
    ].filter(Boolean).join(", "),
    authors: [{ name: post.author.name, url: "https://ui.spectrumhq.in" }],
    creator: post.author.name,
    publisher: "Spectrum UI",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: blogUrl,
      siteName: "Spectrum UI",
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category || "Engineering",
      tags: [
        "UI components",
        "React",
        "Tailwind CSS",
        "Next.js",
        post.category || "Engineering",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@arihantcodes",
      images: [`${baseUrl}/og.png`],
    },
    alternates: {
      canonical: blogUrl,
    },
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
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const baseUrl = "https://ui.spectrumhq.in"
  const blogUrl = `${baseUrl}/blog/${post.slug}`
  
  // Generate structured data
  const structuredData = generateBlogStructuredData({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: blogUrl,
    image: `${baseUrl}/og.png`,
    category: post.category || "Engineering",
  })

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: blogUrl },
  ])

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <div className="w-full max-w-5xl mx-auto min-h-screen bg-background text-foreground border-x border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
      
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-6 sm:mb-8 -ml-2 sm:-ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Blog
        </Button>
      </Link>
  
      {/* Article Header */}
      <article itemScope itemType="https://schema.org/BlogPosting">
        <header className="text-center mb-8 sm:mb-12">
          <h1 itemProp="headline" className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl mx-auto font-bold text-foreground mb-6 leading-snug sm:leading-tight">
            {post.title}
          </h1>
  
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-sm bg-muted">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div itemProp="author" itemScope itemType="https://schema.org/Person" className="text-sm text-center sm:text-left">
              <span itemProp="name" className="text-foreground font-medium">{post.author.name}</span>
              <span className="text-muted-foreground ml-2">Design Engineer</span>
            </div>
          </div>
        </header>
  
        {/* Article Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-border gap-2 sm:gap-0">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <time itemProp="datePublished" dateTime={post.date}>
            {post.date}
          </time>
        </div>
  
        {/* Article Content */}
        <div itemProp="articleBody" className="prose prose-neutral dark:prose-invert prose-base sm:prose-lg max-w-none font-inter">
          <div className="text-neutral-800 dark:text-neutral-200 leading-relaxed space-y-6 font-normal">{post.content}</div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Related Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/" className="group">
            <div className="p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                Explore Spectrum UI Components
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover our collection of React components built with Tailwind CSS and shadcn/ui
              </p>
            </div>
          </Link>
          <Link href="/colors" className="group">
            <div className="p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                Color Palette & Design Tokens
              </h3>
              <p className="text-sm text-muted-foreground">
                Browse our carefully curated color palettes and design system tokens
              </p>
            </div>
          </Link>
        </div>
      </section>
        </div>
      </div>
      </>
  )
}
