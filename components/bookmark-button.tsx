'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/lib/bookmark-store';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  slug: string;
  type: 'component' | 'block' | 'template';
  title?: string;
  /** Size variant — defaults to 'icon' (square icon button) */
  variant?: 'icon' | 'default';
  className?: string;
}

export function BookmarkButton({
  slug,
  type,
  title,
  variant = 'icon',
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isLoading } = useBookmarks();
  const saved = isBookmarked(slug, type);

  const handleClick = async (e: React.MouseEvent) => {
    // Prevent the click from propagating to parent Link elements
    e.preventDefault();
    e.stopPropagation();
    await toggleBookmark(slug, type, title);
  };

  if (variant === 'default') {
    return (
      <Button
        id={`bookmark-btn-${slug}-${type}`}
        variant={saved ? 'default' : 'outline'}
        size="sm"
        onClick={handleClick}
        disabled={isLoading}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark this component'}
        aria-pressed={saved}
        className={cn(
          'flex items-center gap-1.5 transition-all duration-200',
          saved && 'bg-foreground text-background hover:bg-foreground/90',
          className,
        )}
      >
        {saved ? (
          <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )}
        <span className="text-xs">{saved ? 'Saved' : 'Save'}</span>
      </Button>
    );
  }

  return (
    <Button
      id={`bookmark-icon-btn-${slug}-${type}`}
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isLoading}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this component'}
      aria-pressed={saved}
      className={cn(
        'h-8 w-8 rounded-md transition-all duration-200',
        saved
          ? 'text-foreground hover:text-foreground/80'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {saved ? (
        <BookmarkCheck
          className={cn(
            'h-4 w-4 fill-current transition-transform duration-200',
            saved && 'scale-110',
          )}
        />
      ) : (
        <Bookmark className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
      )}
    </Button>
  );
}
