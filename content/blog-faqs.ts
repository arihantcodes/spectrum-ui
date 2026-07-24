import { FAQS_PART_A } from "./blog-faqs.part-a";
import { FAQS_PART_B } from "./blog-faqs.part-b";
import { FAQS_PART_C } from "./blog-faqs.part-c";

/**
 * Per-post FAQ, keyed by slug. Feeds both the visible "Frequently asked
 * questions" section and the FAQPage JSON-LD — the strongest AEO signal for
 * getting posts cited in AI answers and "People also ask".
 */
export const BLOG_FAQS: Record<string, { question: string; answer: string }[]> = {
  ...FAQS_PART_A,
  ...FAQS_PART_B,
  ...FAQS_PART_C,
};
