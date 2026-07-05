import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

/* Emoji icons are usable; some posts store a stray className ("h-10 w-10") — skip those. */
function displayEmoji(icon?: string) {
  if (!icon) return null;
  return /[a-z]/i.test(icon) ? null : icon;
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-2 font-inter text-[14px] leading-[21px] text-[#777169] dark:text-neutral-400">
      {post.category ? (
        <>
          <span>{post.category}</span>
          <span className="size-1 rounded-full bg-current opacity-50" />
        </>
      ) : null}
      <span>{post.date}</span>
    </div>
  );
}

/**
 * Card cover — flat #F5F3F1 placeholder for now.
 * Drop your own background (gradient / image) into this element later.
 */
function Cover({
  post,
  className,
  showEmoji = true,
}: {
  post: BlogPost;
  className?: string;
  showEmoji?: boolean;
}) {
  const emoji = showEmoji ? displayEmoji(post.icon) : null;
  return (
    <div className={cn("relative overflow-hidden bg-[#F5F3F1] dark:bg-neutral-900", className)}>
     
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
      <Cover
        post={post}
        className="aspect-square w-full rounded-[20px] border border-black/[0.08] dark:border-white/[0.08]"
      />
      <div className="flex flex-col gap-2 px-1">
        <h3 className="line-clamp-2 font-inter text-[20px] leading-[27px] text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-white">
          {post.title}
        </h3>
        <Meta post={post} />
      </div>
    </Link>
  );
}

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#F5F3F1] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border-white/[0.06] dark:bg-neutral-900"
    >
      <div className="flex flex-col-reverse md:flex-row">
        {/* Text panel */}
        <div className="flex flex-1 flex-col justify-between gap-8 p-7 md:min-h-[520px] md:p-10">
          <div className="flex flex-col gap-3">
            <h2 className="max-w-xl font-inter text-[28px] leading-[1.15] text-neutral-900 md:text-[34px] dark:text-neutral-50">
              {post.title}
            </h2>
            <Meta post={post} />
          </div>
          <p className="max-w-md font-inter text-[14px] leading-[21px] text-[#59544f] line-clamp-3 dark:text-neutral-400">
            {post.excerpt}
          </p>
        </div>
        {/* Cover placeholder */}
        <Cover
          post={post}
          showEmoji={false}
          className="aspect-[16/11] border-b border-black/[0.06] md:aspect-auto md:min-h-[520px] md:flex-1 md:border-b-0 md:border-l dark:border-white/[0.06]"
        />
      </div>
    </Link>
  );
}
