import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Spacing Systems: Why Your UI Looks Off (And How to Fix It)',
  excerpt:
    "Inconsistent spacing is the #1 reason UIs look unprofessional. Here's how to set up a spacing system that makes everything look clean and aligned.",
  tagline: 'Build every gap on a 4px unit.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 19, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        Open any rough UI and the problem is almost always spacing. 13px here, 20px there, 6px
        somewhere else — nothing lines up, and the whole thing feels sloppy without anyone knowing
        why. The fix isn&rsquo;t taste. It&rsquo;s a scale, and it takes an hour to set up.
      </p>

      <h2 id="multiples-of-four">Multiples of four</h2>
      <p>
        Pick one base unit and multiply it. Four works because it divides cleanly and still gives
        you fine control at the small end. Every margin, padding, and gap becomes a multiple: 4, 8,
        12, 16, 24, 32, 48, 64px. If a value isn&rsquo;t on that list, it&rsquo;s a bug, not a
        decision. Skip odd bases like 5 or 6 — halves and quarters stop landing on whole pixels and edges start to look fuzzy. Tailwind&rsquo;s default spacing already works this way — one unit equals 4px.
      </p>

      <h2 id="five-not-twenty">Five values, not twenty</h2>
      <p>
        You don&rsquo;t need every multiple. Most interfaces run on about six spacing values, and
        reaching for a seventh usually means two elements should share one.{' '}
        <strong>Fewer options make every layout call faster and more consistent</strong>. Name them
        once as tokens and stop typing raw numbers. Cut the options and you spend less time deciding spacing and more time shipping it.
      </p>
      <Code
        filename="globals.css"
        lang="css"
        code={`:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
}`}
      />

      <h2 id="gap-over-margin">Gap over margin</h2>
      <p>
        Stop pushing elements around with margins. Set the parent to <code>display: flex</code> or{' '}
        <code>grid</code> and control the rhythm with <code>gap</code>. One property spaces every
        child evenly — no margin-collapsing surprises, no leftover space clinging to the last item.
        When spacing lives on the container, adding or removing a child never breaks the layout. It also makes responsive work trivial: change one gap value at a breakpoint and the whole row reflows on its own.
      </p>
      <Callout>
        Two elements touching with no space? That&rsquo;s a spacing bug too. Zero is a value on the
        scale — decide it on purpose. A deliberate <code>gap: 0</code> reads differently from a
        forgotten one when someone reviews the diff.
      </Callout>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Delete every hard-coded spacing value and swap in a token from your six-step scale. Lay out
        with <code>gap</code>, not margins. Do that and alignment stops being something you eyeball
        — it falls out of the system for free, on every screen you build after this one. Six values, one base, spacing on the container — that&rsquo;s the whole system.
      </p>
    </>
  ),
};

export default post;
