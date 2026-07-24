import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'Building a Color System for Your Web App (Without a Designer)',
  excerpt:
    "You don't need a designer to have great colors. Here's a practical system for choosing, organizing, and using colors in your web app.",
  tagline: 'Build ramps, not one-off colors.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 25, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        You picked a nice blue for your buttons. Then you needed a lighter one for hover, a darker
        one for the pressed state, and a faint one for a background tint. Now you have nine blues,
        all slightly wrong. The fix is to stop choosing colors and start building ramps.
      </p>

      <h2 id="build-ramps">Build ramps, not colors</h2>
      <p>
        A ramp is one hue at eleven fixed lightness steps: 50, 100, 200, all the way up to 900 and
        950. 50 is your faintest tint; 950 is near-black. You generate it once — Radix Colors or an
        OKLCH generator does the math — and every shade you&rsquo;ll ever need already exists and
        stays in the same family. Ten or eleven steps is the sweet spot: enough range for hover, borders, and disabled states without a pile of near-duplicates.
      </p>

      <h2 id="alias-by-meaning">Alias by meaning</h2>
      <p>
        Components should never reference <code>blue-600</code> directly. Add a layer of semantic
        tokens on top and point each one at a step in a ramp.{' '}
        <strong>Rebranding then means repointing a handful of aliases, not find-and-replacing hex
        across the whole app.</strong> A component then says <code>bg-background</code> or{' '}
        <code>text-foreground</code> and never learns which hue sits underneath.
      </p>
      <Code
        filename="globals.css"
        lang="css"
        code={`:root {
  --primary: var(--blue-600);
  --primary-hover: var(--blue-700);
  --background: var(--gray-50);
  --foreground: var(--gray-950);
  --border: var(--gray-200);
}`}
      />

      <h2 id="contrast-floor">Meet the contrast floor</h2>
      <p>
        Color isn&rsquo;t done until it&rsquo;s readable. Body text needs a{' '}
        <strong>4.5:1 contrast ratio</strong> against its background; large text and UI can drop to
        3:1. This is where fixed steps pay off — test each pair once and you know{' '}
        <code>gray-600</code> on <code>gray-50</code> always passes. Never ship a gray you
        haven&rsquo;t checked. Run each pair through a contrast checker once — Chrome DevTools has one built in — and you never have to guess again.
      </p>

      <h2 id="dark-isnt-reversed">Dark isn&rsquo;t light reversed</h2>
      <p>
        The rookie move is flipping the ramp — 50 becomes 950 — and shipping it. It looks wrong
        because dark UIs need less contrast, not inverted contrast. Build a separate dark ramp:
        near-black surfaces around <code>gray-950</code>, off-white text near <code>gray-100</code>,
        and brand hues nudged brighter and less saturated so they don&rsquo;t glow. Same aliases,
        second set of values.
      </p>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Generate two ramps, alias five semantic tokens, check every pair against 4.5:1, and you have
        a color system a designer would sign off on. Component libraries like{' '}
        <Link href="/components">Spectrum UI</Link> ship these tokens by default, so you can borrow
        the structure instead of hand-rolling it. Either way: ramps first, aliases second, raw hex
        never.
      </p>
    </>
  ),
};

export default post;
