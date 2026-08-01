import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DesignItem } from "@/lib/design/types";
import { CardVideo } from "./card-video";

/** Column widths the feed actually renders at, so `sizes` matches reality. */
const CARD_SIZES =
  "(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function pickSrc(srcSet: Record<string, string>): string | null {
  if (!srcSet) return null;
  const widths = Object.keys(srcSet)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);
  if (widths.length === 0) return null;
  // 1080 is the sweet spot for a masonry column on a 2x display.
  const chosen = widths.find((w) => w >= 1080) ?? widths[widths.length - 1];
  return srcSet[String(chosen)] ?? null;
}

export function MediaCard({
  item,
  priority = false,
  aspectRatio,
}: {
  item: DesignItem;
  /** First row only — these are the LCP candidates. */
  priority?: boolean;
  /** Forced ratio for uniform-grid sections; masonry passes undefined. */
  aspectRatio?: number | null;
}) {
  const cover = item.media[0];
  if (!cover) return null;

  const src = pickSrc(cover.srcSet);
  const ratio = aspectRatio ?? cover.width / cover.height;

  return (
    <article
      className={cn(
        "group relative mb-3 break-inside-avoid",
        // Reserve the exact box before the image loads. This is what keeps CLS ~0.
        "overflow-hidden rounded-lg",
      )}
      style={{ aspectRatio: aspectRatio ? String(aspectRatio) : undefined }}
    >
      <Link
        href={`/design/i/${item.slug}`}
        className="block focus-visible:outline-hidden"
        aria-label={`${item.title} by ${item.authorName}`}
      >
        <div
          className="relative w-full overflow-hidden rounded-lg bg-[var(--design-media-placeholder)]"
          style={{ aspectRatio: String(ratio) }}
        >
          {cover.kind === "video" && cover.videoUrl ? (
            <CardVideo
              src={cover.videoUrl}
              webm={cover.videoWebm}
              poster={cover.posterUrl ?? src}
              className="absolute inset-0 size-full object-cover"
            />
          ) : src ? (
            <Image
              src={src}
              alt={item.title}
              fill
              sizes={CARD_SIZES}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              decoding="async"
              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.015]"
              style={
                cover.dominantColor
                  ? { backgroundColor: cover.dominantColor }
                  : undefined
              }
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
              {item.title}
            </div>
          )}

          {/* Inset hairline so light images still read as cards. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.08]"
          />

          {/* Slide count */}
          {item.media.length > 1 && (
            <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/60 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white backdrop-blur-xs">
              {item.media.length}
            </span>
          )}
        </div>
      </Link>

      {/* Attribution stays visible at rest (recent.design mechanics — credit is
          part of the card, not a reward for hovering); the outbound arrow still
          fades in on hover/focus via its own opacity transition below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-2">
        {item.authorUrl ? (
          <a
            href={item.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 py-1 pl-1 pr-2.5 text-[11px] text-white backdrop-blur-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
          >
            {item.authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.authorAvatar}
                alt=""
                width={18}
                height={18}
                className="size-[18px] rounded-full object-cover"
              />
            ) : (
              <span className="grid size-[18px] place-items-center rounded-full bg-white/20 text-[9px]">
                {item.authorName.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="max-w-[12ch] truncate">{item.authorName}</span>
          </a>
        ) : (
          <span />
        )}

        <a
          href={`/go/${item.shortId}?s=feed`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the original post for ${item.title}`}
          className="pointer-events-auto grid size-7 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-xs transition-opacity duration-150 hover:bg-black/80 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white group-hover:opacity-100"
        >
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
