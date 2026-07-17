"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

import { Input } from "@/components/ui/input";
import { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

import { BlogCard, FeaturedBlogCard } from "./blog-card";

const POSTS_PER_PAGE = 9;

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogPosts.forEach((post) => post.category && cats.add(post.category));
    return ["All", ...Array.from(cats)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  // Reset to first page whenever the result set changes.
  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  const featured = filteredPosts[0] ?? null;
  const gridPosts = filteredPosts.slice(1);
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = gridPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  return (
    <div className="relative min-h-screen font-inter text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Page-wide grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] dark:opacity-[0.05]"
      />

      <div className="relative z-10">
        {/* Hero + filters */}
        <section className="container-frame border-b border-border">
          <div className="px-5 pb-6 pt-14 sm:px-8 sm:pt-20 lg:px-[52px]">
            <motion.header
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex max-w-2xl flex-col gap-4"
            >
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
                />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-neutral-900 dark:text-neutral-100">
                  The Journal
                </span>
              </span>
              <h1 className="font-spectral text-[40px] font-light leading-[1.02] tracking-[-0.03em] text-neutral-900 md:text-[54px] dark:text-neutral-50">
                Notes on design & engineering.
              </h1>
              <p className="max-w-xl font-inter text-[15px] leading-[1.65] text-[#646464] dark:text-neutral-400">
                Essays, guides, and field notes on building interfaces that feel
                right — design systems, animation, React, and the craft in
                between.
              </p>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "h-9 rounded-full px-4 font-inter text-[13px] leading-none transition-colors duration-200 active:scale-[0.97]",
                      activeCategory === category
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-white/60 text-[#59544f] ring-1 ring-inset ring-black/[0.06] hover:bg-white hover:text-neutral-900 dark:bg-white/[0.06] dark:text-neutral-300 dark:ring-white/[0.08] dark:hover:bg-white/[0.12]",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777169] dark:text-neutral-400" />
                <Input
                  placeholder="Search posts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-full border-transparent bg-white/70 pl-9 text-[13px] text-neutral-900 ring-1 ring-inset ring-black/[0.06] placeholder:text-[#777169] focus-visible:ring-neutral-400 dark:bg-white/[0.06] dark:text-neutral-100 dark:ring-white/[0.08]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts */}
        <section className="container-frame border-b border-border">
          <div className="px-5 pb-20 pt-12 sm:px-8 lg:px-[52px]">
            {filteredPosts.length === 0 ? (
              <div className="py-24 text-center font-inter text-[15px] text-[#777169] dark:text-neutral-400">
                No posts found matching your criteria.
              </div>
            ) : (
              <>
                {/* Featured (only on the first page) */}
                {featured && currentPage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
                  >
                    <FeaturedBlogCard post={featured} />
                  </motion.div>
                )}

                {/* Grid */}
                {pagePosts.length > 0 && (
                  <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {pagePosts.map((post, i) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.5,
                          delay: Math.min(i, 5) * 0.05,
                          ease: EASE,
                        }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Blog pagination"
                    className="mt-16 flex items-center justify-center gap-1.5"
                  >
                    <PageButton
                      disabled={currentPage === 1}
                      onClick={() => setPage(currentPage - 1)}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </PageButton>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PageButton
                          key={p}
                          active={p === currentPage}
                          onClick={() => setPage(p)}
                          aria-label={`Page ${p}`}
                          aria-current={p === currentPage ? "page" : undefined}
                        >
                          {p}
                        </PageButton>
                      ),
                    )}

                    <PageButton
                      disabled={currentPage === totalPages}
                      onClick={() => setPage(currentPage + 1)}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </PageButton>
                  </nav>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function PageButton({
  active,
  disabled,
  children,
  ...props
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-inter text-[13px] leading-none transition-all duration-200 active:scale-[0.95]",
        active
          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          : "text-[#59544f] ring-1 ring-inset ring-black/[0.06] hover:bg-white hover:text-neutral-900 dark:text-neutral-300 dark:ring-white/[0.08] dark:hover:bg-white/[0.1]",
        disabled && "cursor-not-allowed opacity-40 hover:bg-transparent",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
