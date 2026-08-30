import { redirect } from 'next/navigation';
import { BLOCK_CATEGORIES, blockCategoryPath } from '@/lib/block-catalog';

/**
 * /blocks opens the first category rather than an index of its own. Every
 * category is one click away in the rail, so a landing page in front of them
 * was a stop on the way to somewhere else.
 */
export default function BlocksPage() {
  redirect(blockCategoryPath(BLOCK_CATEGORIES[0].slug));
}
