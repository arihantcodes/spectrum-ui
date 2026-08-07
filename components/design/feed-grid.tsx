import { cn } from "@/lib/utils";
import type { DesignItem } from "@/lib/design/types";
import type { DesignLayout } from "@/content/design-taxonomy";
import { MediaCard } from "./media-card";

/**
 * CSS multi-column masonry rather than a JS masonry library.
 *
 * Columns cost nothing at runtime: no measurement pass, no layout thrash, and
 * it renders correctly from the server on first paint. The tradeoff is that
 * reading order runs down each column rather than across, which is acceptable
 * for a browse surface where order is "recency", not meaning.
 *
 * Uniform sections (websites, OG images, screenshots) use a real grid instead,
 * because a fixed aspect ratio makes columns pointless.
 */
export function FeedGrid({
  items,
  layout,
  aspectRatio,
  /** Number of leading cards to mark priority — the first visible row. */
  priorityCount = 8,
}: {
  items: DesignItem[];
  layout: DesignLayout;
  aspectRatio: number | null;
  priorityCount?: number;
}) {
  if (layout === "icons") {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {items.map((item, i) => (
          <MediaCard
            key={item.id}
            item={item}
            aspectRatio={1}
            priority={i < priorityCount}
          />
        ))}
      </div>
    );
  }

  if (layout === "uniform") {
    return (
      <div
        className={cn(
          "grid gap-4",
          aspectRatio && aspectRatio > 1.8
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {items.map((item, i) => (
          <MediaCard
            key={item.id}
            item={item}
            aspectRatio={aspectRatio}
            priority={i < priorityCount}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
      {items.map((item, i) => (
        <MediaCard key={item.id} item={item} priority={i < priorityCount} />
      ))}
    </div>
  );
}
