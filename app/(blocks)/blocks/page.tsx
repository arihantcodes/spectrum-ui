import { redirect } from 'next/navigation';
import { BLOCK_CATEGORIES, blockCategoryPath } from '@/lib/block-catalog';

/**
 * /blocks forwards to the first category's specimen page. With one live
 * category an index would be a page of one link; this becomes a real index
 * when a second category ships.
 */
export default function BlocksPage() {
  redirect(blockCategoryPath(BLOCK_CATEGORIES[0].slug));
}
