"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Icons } from '@/components/icon';
import { BlogPost } from '@/lib/blog';

export function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogPosts.forEach((post) => {
      if (post.category) {
        cats.add(post.category);
      }
    });
    return ['All Posts', ...Array.from(cats)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground container-wrapper font-inter">
      {/* Navigation */}
      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'ghost'}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full text-sm ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-ring rounded-xl w-full md:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid with Dotted Borders */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-dashed border-neutral-200 dark:border-neutral-800">
            {filteredPosts.map((post) => (
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
    </div>
  );
}
