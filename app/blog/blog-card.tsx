import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

/* Emoji icons are usable; some posts store a stray className ("h-10 w-10") — skip those. */
function displayEmoji(icon?: string) {
  if (!icon) return null;
  return /[a-z]/i.test(icon) ? null : icon;
}

/**
 * Posts ship without cover images, so each cover is a soft, on-brand tinted
 * gradient chosen deterministically from the category. Warm coral ties to the
 * site's #f9452d, chartreuse to #E1F435, plus a few cool tones for variety.
 * Each entry carries its own dark-mode variant so covers stay muted at night.
 */
const COVERS = [
  "from-[#FFF1ED] to-[#FFDCD0] dark:from-[#2a1613] dark:to-[#170d0b]",
  "from-[#FBFCE7] to-[#EEF2C2] dark:from-[#22240e] dark:to-[#131409]",
  "from-[#EEF3FF] to-[#DBE6FF] dark:from-[#111a2e] dark:to-[#0b0f18]",
  "from-[#F6EEFF] to-[#E9DAFF] dark:from-[#1e1430] dark:to-[#120c1c]",
  "from-[#ECFBF2] to-[#D6F1E1] dark:from-[#0f2419] dark:to-[#09140e]",
  "from-[#FFF6E6] to-[#FFE8C4] dark:from-[#2a1f0d] dark:to-[#161006]",
  "from-[#F7F5F3] to-[#E8E3DD] dark:from-[#1c1b19] dark:to-[#121110]",
];

function coverGradient(key?: string) {
  const seed = key ?? "";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return COVERS[Math.abs(hash) % COVERS.length];
}

function CategoryChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.06em] text-[#2d2f2e] ring-1 ring-inset ring-black/[0.06] backdrop-blur-sm dark:bg-white/[0.08] dark:text-neutral-200 dark:ring-white/[0.1]">
      <span
        aria-hidden
        className="h-[7px] w-[7px] border-l-[1.5px] border-t-[1.5px] border-[#f9452d] dark:border-[#E1F435]"
      />
      {label}
    </span>
  );
}

/**
 * Card cover — tinted gradient + grain, with the post's emoji (or first letter)
 * as the centrepiece. Everything animatable is transform/opacity only.
 */
function Cover({
  post,
  className,
  glyphClassName,
  showChip = true,
}: {
  post: BlogPost;
  className?: string;
  glyphClassName?: string;
  showChip?: boolean;
}) {
  const emoji = displayEmoji(post.icon);
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        coverGradient(post.slug || post.title),
        className,
      )}
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.06] mix-blend-multiply dark:opacity-[0.09] dark:mix-blend-screen"
      />
      {/* top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-white/40 blur-2xl dark:bg-white/[0.06]"
      />

      {showChip && post.category ? (
        <div className="absolute left-3 top-3 z-10">
          <CategoryChip label={post.category} />
        </div>
      ) : null}

      <span
        aria-hidden
        className={cn(
          "relative select-none leading-none drop-shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]",
          emoji ? "" : "font-spectral font-light text-[#2d2f2e]/80 dark:text-white/70",
          glyphClassName,
        )}
      >
        {emoji ?? post.title.charAt(0)}
      </span>
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1"
    >
      <Cover
        post={post}
        glyphClassName="text-[52px]"
        className="aspect-[4/3] w-full rounded-[20px] border border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.25)] dark:border-white/[0.07]"
      />
      <div className="flex flex-col gap-2 px-1">
        <h3 className="line-clamp-2 font-spectral text-[19px] font-normal leading-[1.3] tracking-[-0.01em] text-neutral-900 transition-colors group-hover:text-[#f9452d] dark:text-neutral-100 dark:group-hover:text-[#E1F435]">
          {post.title}
        </h3>
        <p className="line-clamp-2 font-inter text-[13.5px] leading-[1.5] text-[#77716a] dark:text-neutral-400">
          {post.excerpt}
        </p>
        <div className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[#9a938b] dark:text-neutral-500">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-50" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-24px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_28px_56px_-24px_rgba(0,0,0,0.28)] dark:border-white/[0.07] dark:bg-neutral-950"
    >
      <div className="flex flex-col-reverse md:grid md:grid-cols-2">
        {/* Text panel */}
        <div className="flex flex-col justify-between gap-8 p-7 md:min-h-[440px] md:p-11">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                Featured{post.category ? ` · ${post.category}` : ""}
              </span>
            </div>
            <h2 className="max-w-xl font-spectral text-[28px] font-light leading-[1.12] tracking-[-0.02em] text-neutral-900 md:text-[36px] dark:text-neutral-50">
              {post.title}
            </h2>
            <p className="max-w-md font-inter text-[14.5px] leading-[1.6] text-[#59544f] line-clamp-3 dark:text-neutral-400">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-[#9a938b] dark:text-neutral-500">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-current opacity-50" />
            <span>{post.readTime}</span>
            <span className="ml-auto flex items-center gap-1 text-neutral-900 transition-colors group-hover:text-[#f9452d] dark:text-neutral-200 dark:group-hover:text-[#E1F435]">
              Read
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
        {/* Cover */}
        <Cover
          post={post}
          showChip={false}
          glyphClassName="text-[88px]"
          className="aspect-[16/11] border-b border-black/[0.06] md:aspect-auto md:min-h-[440px] md:border-b-0 md:border-l dark:border-white/[0.06]"
        />
      </div>
    </Link>
  );
}
