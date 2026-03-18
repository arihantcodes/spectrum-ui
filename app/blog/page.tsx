import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { Icons } from '@/components/icon';
import { Metadata } from 'next';
import { generateBlogListingStructuredData, generateBlogBreadcrumbs } from '@/lib/seo-utils';

const categories = [
  'All Posts',
  'Engineering',
 
  'Changelog',
  'Press',
];

export const metadata: Metadata = {
  title: 'Blog | Spectrum UI - UI Components & Design System',
  description: 'Learn about UI components, React development, design systems, and frontend best practices. Expert insights on building scalable web applications with modern tools.',
  keywords: [
    'UI components blog',
    'React development',
    'design system',
    'frontend development',
    'web development',
    'UI/UX',
    'component library',
    'Tailwind CSS',
    'Next.js',
    'shadcn/ui',
    'engineering blog',
    'web design',
    'user interface',
    'frontend engineering',
  ].join(', '),
  authors: [{ name: 'Arihant Jain', url: 'https://ui.spectrumhq.in' }],
  creator: 'Arihant Jain',
  publisher: 'Spectrum UI',
  openGraph: {
    title: 'Blog | Spectrum UI - UI Components & Design System',
    description: 'Learn about UI components, React development, design systems, and frontend best practices. Expert insights on building scalable web applications.',
    url: 'https://ui.spectrumhq.in/blog',
    siteName: 'Spectrum UI',
    images: [
      {
        url: 'https://ui.spectrumhq.in/og.png',
        width: 1200,
        height: 630,
        alt: 'Spectrum UI Blog - UI Components & Design System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Spectrum UI - UI Components & Design System',
    description: 'Learn about UI components, React development, design systems, and frontend best practices.',
    creator: '@arihantcodes',
    images: ['https://ui.spectrumhq.in/og.png'],
  },
  alternates: {
    canonical: 'https://ui.spectrumhq.in/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  console.log(
    'Blog posts fetched:',
    blogPosts.map((post) => post),
  );

  const baseUrl = "https://ui.spectrumhq.in";
  
  // Generate structured data for blog listing
  const structuredData = generateBlogListingStructuredData(
    blogPosts.map(post => ({
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      author: { name: post.author.name },
    }))
  );

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
  ]);

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
      
      <div className="min-h-screen bg-background text-foreground container-wrapper font-inter">
      {/* Navigation */}
      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? 'default' : 'ghost'}
                  className={`rounded-full text-sm ${
                    index === 0
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts"
                  className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-ring rounded-xl"
                />
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Blog Introduction */}
  

      {/* Blog Grid with Dotted Borders */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts found. Add your content to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-dashed border-neutral-200 dark:border-neutral-800">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="border-r border-b border-dashed border-neutral-200 dark:border-neutral-800 p-8 hover:bg-accent/20 transition-colors cursor-pointer group min-h-[400px] flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                  <div className="h-6 w-6 bg-neutral-100 border-neutral-300 border dark:bg-white rounded-md flex items-center justify-center p-1">
          <Icons.logo className="h-5 w-5 text-black " />
        </div>
                    <span className="text-sm text-muted-foreground font-mono">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 line-clamp-6">
                    {post.excerpt || 'No excerpt available for this post.'}
                  </p>
                  <div className="flex items-center space-x-3 mt-auto">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={post.author.avatar || '/placeholder.svg'} />
                      <AvatarFallback className="text-xs bg-muted">
                        {post.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{post.author.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      {/* <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Build Amazing UIs?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our collection of React components and start building faster with Spectrum UI. 
            Copy, paste, and customize components for your Next.js applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Components
              </Button>
            </Link>
            <Link href="/colors">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Color Palette
              </Button>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
    </>
  );
}
