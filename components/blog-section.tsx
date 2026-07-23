import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { getAllBlogPosts } from "@/lib/blog";

export async function BlogSection() {
  const allPosts = await getAllBlogPosts();
  const posts = allPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="container py-16">
      {/* Header */}
      <div className="flex flex-col gap-3">
        {/* Category */}
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="-rotate-90">
            <span className="block size-[9px] border-b-2 border-r-2 border-neutral-400 dark:border-neutral-500" />
          </span>
          <span className="font-inter text-[12px] font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-200">
            Blogs
          </span>
        </div>

        <h2 className="text-balance font-regular text-[24px] font-semibold leading-[28.8px] tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
          Notes from
          <br />
          building components
        </h2>
      </div>

      {/* Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-[15px]"
          >
            <div className="aspect-square w-full overflow-hidden rounded-[20px] border border-neutral-200 bg-neutral-100 transition-colors group-hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:group-hover:border-neutral-700" />

            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-2 font-regular text-[18px] font-semibold leading-[25.2px] tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
                {post.title}
              </h3>
              <p className="line-clamp-2 font-inter text-[14px] leading-[1.6] text-neutral-600 dark:text-neutral-400">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Read More */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex h-[48px] items-center justify-center gap-1 rounded-full bg-black pl-[23px] pr-[27px] font-inter text-[16px] leading-[22.4px] text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Read More
          <ChevronDown className="size-5" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
