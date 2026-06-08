import React from "react";
import { H1, H2, P } from "@/components/ui/heading-with-anchor";
import { cn } from "@/lib/utils";
import RequestComponents from "@/components/requestcomponets";
import { BookmarkButton } from "@/components/bookmark-button";

interface PageTemplateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  /** Explicit slug for bookmarking; falls back to slugified title */
  slug?: string;
}

const PageTemplate = ({
  title,
  description,
  children,
  className,
  slug,
}: PageTemplateProps) => {
  const bookmarkSlug =
    slug ?? title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ?? "";

  return (
    <section className={cn("flex flex-col gap-3 pb-10", className, "!mt-8")}>
      <div className="flex items-start justify-between gap-4">
        <H1 className="text-xl">{title}</H1>
        {bookmarkSlug && (
          <BookmarkButton
            slug={bookmarkSlug}
            type="component"
            title={title ?? bookmarkSlug}
            className="mt-0.5 shrink-0"
          />
        )}
      </div>
      <P className="text-lg">{description}</P>
      <div className="mb-4">
        <RequestComponents />
      </div>
      {children}
    </section>
  );
};

const PageSubTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <H2
      className="mb-2 border-b border-b-gray-600 pb-2 text-[18px]"
      anchor={children?.toString()}
    >
      {children}
    </H2>
  );
};

export { PageTemplate, PageSubTitle };

