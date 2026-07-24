import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';

const post: BlogPostInput = {
  title: 'Design Tokens: The Single Source of Truth Your Team Needs',
  excerpt:
    'Design tokens create a shared language between designers and developers for colors, spacing, and fonts. Learn how to set up a token system for your design system.',
  tagline: 'Name by purpose, sync to your Tailwind theme.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 28, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        Open any aging codebase and count the grays; forty is normal. Nobody planned forty — it
        piled up one hardcoded <code>#f3f3f3</code> at a time, because there was no name to reach
        for. Tokens fix that: every visual decision gets one name, defined once and used everywhere.
      </p>

      <h2 id="semantic-beats-raw">Semantic beats raw</h2>
      <p>
        The first mistake is naming a token after what it looks like. <code>--color-blue-500</code>{' '}
        lies the day you rebrand to purple, and now every new hire has to learn that blue means
        purple. <strong>Name by purpose instead.</strong>
      </p>
      <p>
        The four semantic tokens you’ll reach for first are background, foreground, border, and
        primary. A component that says <code>bg-primary</code> doesn’t care what primary is today;
        change the value once and the meaning travels everywhere it’s used. That indirection is the
        entire point of a token.
      </p>

      <h2 id="three-tiers">The three tiers</h2>
      <p>
        Structure tokens in three tiers. Primitives are the raw palette — <code>--blue-600</code>,{' '}
        <code>--gray-50</code>, <code>--space-4</code> — and never appear in component code.
        Semantic tokens map purpose onto them, so <code>--primary</code> points at{' '}
        <code>--blue-600</code>.
      </p>
      <p>
        The third tier is optional: component tokens for one stubborn case, like{' '}
        <code>--button-radius</code>. Rebrand by swapping primitives, add dark mode by swapping the
        semantic layer, tweak one button with a component token — <strong>each change stays at
        exactly one level</strong>.
      </p>

      <h2 id="sync-to-tailwind">Sync to Tailwind</h2>
      <p>
        Tokens only earn their keep when your utility classes read from them. Define the values as
        CSS variables, then point your Tailwind theme at those variables so <code>bg-primary</code>{' '}
        and <code>border-border</code> resolve through the whole chain.
      </p>
      <Code
        filename="globals.css"
        lang="css"
        code={`:root {
  /* primitives — raw palette, never used in components */
  --blue-600: 221 83% 53%;
  --gray-50: 210 20% 98%;

  /* semantic — points at primitives */
  --primary: var(--blue-600);
  --background: var(--gray-50);
}

@theme inline {
  --color-primary: hsl(var(--primary));
  --color-background: hsl(var(--background));
}`}
      />
      <p>
        Now <code>bg-primary</code> pulls straight from the token chain. Switch themes by
        reassigning the CSS variables at runtime — no rebuild, no component edits, no find-and-replace
        across two hundred files. Design tools can point at the same variables, so a color change
        starts in one place and ends in one place.
      </p>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Start with one file and about fifteen tokens: four colors, a spacing scale, three radii.
        Wire them into your theme, then delete every hardcoded value they replace. Colors and
        spacing first; they touch every screen.
      </p>
      <p>
        You don’t need Style Dictionary or a Figma pipeline on day one. You need one place every
        value lives and the discipline to reach for it. Add the automation later, once the names
        have proven they’re right.
      </p>
    </>
  ),
};

export default post;
