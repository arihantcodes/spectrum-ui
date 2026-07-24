import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Typography for Developers: The Only Guide You Need',
  excerpt:
    "Typography makes or breaks your UI. Here's everything a developer needs to know about fonts, sizing, spacing, and readability.",
  tagline: 'Five decisions and your type just works.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 6, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        You don&rsquo;t need a decade of type theory. You need five decisions, made once and applied
        everywhere. Get them right and your interface reads clean on every screen and every size.
        Get them fuzzy and no amount of shadow or spacing will save it. Here&rsquo;s the whole
        system in five moves.
      </p>

      <h2 id="one-family">Pick one family</h2>
      <p>
        Ship one typeface for the whole app. A solid variable sans — Inter, Geist, or the native
        system stack — handles UI, headings, and body text without a second font download. You get
        hierarchy from <strong>weight and size, not a second family</strong>. Add a mono face only
        for code and hard numbers. Two families is plenty; three is a smell.
      </p>

      <h2 id="build-a-scale">Build a scale</h2>
      <p>
        Stop picking sizes by feel. Define six or seven steps and use only those — say 12, 14, 16,
        20, 24, 32, 48px, each roughly 1.2–1.25× the last. Body sits at 16px, and nothing users
        actually read goes below 14px. Put the steps in CSS variables so a size that isn&rsquo;t on
        the list literally can&rsquo;t ship. One scale kills the 15px-here, 17px-there drift that
        makes a UI look amateur.
      </p>

      <h2 id="leading-by-size">Leading by size</h2>
      <p>
        Line height isn&rsquo;t one global number. Small text needs air; large text needs to close
        up. Body at 16px wants about 1.5. A 32–48px heading wants 1.1, or it reads double-spaced.
        The rule you can&rsquo;t forget: <strong>the bigger the text, the tighter the leading</strong>.
        Set it per step, not once at the root.
      </p>

      <h2 id="measure-and-numbers">Measure and numbers</h2>
      <p>
        Long lines tire the eye — by the time you track back to the left edge, you&rsquo;ve lost
        your place. Cap body text at 45–75 characters with <code>max-width: 65ch</code>; that single
        line fixes most walls of text. And anywhere digits change — prices, counts, timers, tables —
        set <code>font-variant-numeric: tabular-nums</code> so numbers line up in columns instead of
        jittering as they update.
      </p>
      <Callout>
        Quick gut check: body at <code>16px</code>, <code>line-height: 1.5</code>,{' '}
        <code>max-width: 65ch</code>, then read one full paragraph on your phone. If it feels calm
        and you never squint, your defaults are right. Style everything else on top of that.
      </Callout>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Set these five as tokens today: one family, a fixed scale, leading that tightens with size,
        a capped measure, and tabular numbers. That&rsquo;s a real type system, and it takes an
        afternoon. Do it once and you stop re-litigating font size in every PR. Everything after —
        tracking on labels, all-caps eyebrows, pairing two weights — is a tweak on a foundation that
        already reads well.
      </p>
    </>
  ),
};

export default post;
