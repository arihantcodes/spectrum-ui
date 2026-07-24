import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Dark Mode Done Right: A Practical Guide for Web Apps',
  excerpt:
    "Dark mode is more than inverting colors. Here's how to build dark mode that actually looks good and doesn't break your UI.",
  tagline: 'Semantic tokens, not inverted colors.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 12, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        Most dark modes fail the same way: someone flips white to black, black to white, and ships
        it. The result is harsh, flat, and hard to read. Good dark mode is a second palette with
        its own rules — and once you know the three rules, it takes an afternoon, not a rewrite.
      </p>

      <h2 id="dark-is-its-own-palette">Dark is its own palette</h2>
      <p>
        Pure black backgrounds with pure white text create too much contrast — text seems to
        vibrate. Start from near-black (<code>#0a0a0a</code>) and off-white (<code>#ededed</code>)
        instead.
      </p>
      <p>
        Depth also flips. In light mode, shadows separate a card from the page. On a dark
        background shadows are invisible, so elevation comes from <em>lightness</em>: the higher a
        surface sits, the slightly lighter it gets. Saturated brand colors need the opposite
        treatment — desaturate and brighten them a step, or they glow like neon.
      </p>

      <h2 id="tokens-do-the-switching">Tokens do the switching</h2>
      <p>
        Never write <code>dark:</code> against raw hex values all over your app. Define semantic
        tokens once, and let components reference meaning instead of color — the same approach
        shadcn/ui uses:
      </p>
      <Code
        filename="globals.css"
        lang="css"
        code={`:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --card: 0 0% 100%;
  --border: 240 6% 90%;
}

.dark {
  --background: 240 10% 4%;   /* near-black, not #000 */
  --foreground: 0 0% 93%;     /* off-white, not #fff */
  --card: 240 6% 8%;          /* lighter = elevated */
  --border: 240 4% 16%;
}`}
      />
      <p>
        Components now say <code>bg-background</code> or <code>border-border</code> and never know
        which theme is active. Adding a third theme later costs one CSS block, not a codebase
        sweep.
      </p>

      <h2 id="kill-the-flash">Kill the flash</h2>
      <p>
        The classic bug: the page loads light, then snaps dark. That happens when the theme is
        applied in JavaScript after hydration. Use{' '}
        <a href="https://github.com/pacocoursey/next-themes" target="_blank" rel="noreferrer">
          next-themes
        </a>{' '}
        with <code>attribute=&quot;class&quot;</code> — it injects a tiny inline script that sets{' '}
        <code>.dark</code> on <code>&lt;html&gt;</code> before first paint, and it respects the
        system preference by default.
      </p>
      <Callout>
        Test one screen in both themes at 100% and at 80% brightness. If borders disappear in dark
        mode, lighten <code>--border</code> before touching anything else — it fixes most muddy
        dark UIs.
      </Callout>

      <h2 id="start-here">Start here</h2>
      <p>
        Convert your five core tokens first — background, foreground, card, border, primary — and
        ship. Every component you build on top of them inherits dark mode for free. That&rsquo;s
        the whole trick: design the palette once, then never think about it in component code
        again.
      </p>
    </>
  ),
};

export default post;
