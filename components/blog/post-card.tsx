import Link from 'next/link';

import type { BlogPost } from '@/lib/blog';
import { PostCover } from '@/components/blog/covers';

/**
 * Listing card, after the reference design: the cover tile is the only
 * chrome — title and a one-line description sit straight on the page.
 */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col outline-none">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.07)] transition-shadow duration-200 group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.16),0_12px_32px_-16px_rgba(0,0,0,0.25)] group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] dark:group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_12px_32px_-16px_rgba(0,0,0,0.8)]">
        <PostCover slug={post.slug} title={post.title} />
      </div>
      <h3 className="mt-4 font-spectral text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-foreground [text-wrap:balance]">
        {post.title}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">{post.tagline}</p>
    </Link>
  );
}
