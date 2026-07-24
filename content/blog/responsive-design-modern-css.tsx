import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Responsive Design in 2026: Modern CSS That Actually Works',
  excerpt:
    "Forget media query spaghetti. Modern CSS gives you responsive layouts with way less code. Here's what you should be using right now.",
  tagline: 'Fluid type, container queries, fewer breakpoints.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 18, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'CSS & Layout',
  content: (
    <>
      <p>
        Breakpoints were always a hack. You’d pick 768px and 1024px because some phone was that wide
        in 2014, then patch the gaps forever. Modern CSS lets the browser do the math instead. Three
        tools replace most of your media queries.
      </p>

      <h2 id="fluid-type-clamp">Fluid type with clamp</h2>
      <p>
        Stop shipping three font sizes for one heading. <code>clamp()</code>{' '}
        <strong>interpolates smoothly</strong> between a minimum and a maximum, driven by the
        viewport:
      </p>
      <Code
        filename="type.css"
        lang="css"
        code={`h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}`}
      />
      <p>
        The middle value scales with the viewport; the outer two clamp it so it never gets tiny on
        phones or absurd on monitors. One line, every screen size, no breakpoints. Use it for
        spacing too — <code>padding: clamp(1rem, 5vw, 4rem)</code> gives you gutters that breathe.
      </p>

      <h2 id="container-queries">Container queries, not viewport</h2>
      <p>
        A card doesn’t care how wide the window is. It cares how much room it has. Container queries
        let a component respond to its own container, so the same card lays out wide in the main
        column and stacked in a sidebar — no viewport math. Set <code>container-type: inline-size</code>{' '}
        on the parent, then style children with <code>@container (min-width: 400px)</code>. This is{' '}
        <strong>the one that actually changes how you build components</strong>.
      </p>

      <h2 id="intrinsic-layouts">Let layouts lay out</h2>
      <p>
        Some layouts need no queries at all. A row of items that wraps when it runs out of room is
        just <code>flex-wrap: wrap</code> with a <code>min-width</code> on each item. A grid that
        adds columns as space allows is <code>repeat(auto-fit, minmax(...))</code>. These are
        intrinsic layouts: they respond to content and available space, not to arbitrary widths.
        Fewer rules, fewer edge cases.
      </p>

      <h2 id="fewer-breakpoints">Fewer breakpoints, better UI</h2>
      <p>
        You’ll still write the occasional media query — a full sidebar collapsing into a drawer
        earns one. But start with fluid values and container queries, and reach for a breakpoint
        only when the layout genuinely needs to change, not just resize. Delete the ones you’re only
        using to nudge a font size. Let the browser interpolate, and your UI stops breaking at
        900px.
      </p>
      <Callout>
        Quick test: open DevTools and drag the width slowly from 320px to 1440px. If anything jumps,
        snaps, or overflows, that’s a breakpoint you can usually replace with <code>clamp()</code>{' '}
        or a container query.
      </Callout>
    </>
  ),
};

export default post;
