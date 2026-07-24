import type { BlogPostInput } from '@/lib/blog';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'UI Mistakes That Drive Users Away (And How to Fix Them)',
  excerpt:
    "These common UI mistakes are everywhere, and they are killing your user experience. Here is how to spot them and fix them before your users bounce.",
  tagline: 'The six things a design review always flags.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 22, 2025',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        Sit in enough design reviews and you start catching the same six things every time. None of
        them are hard to fix. They&rsquo;re just easy to miss when you&rsquo;re close to the work —
        and together they&rsquo;re the difference between a UI that feels sharp and one that feels
        off.
      </p>

      <h2 id="twelve-grays">Twelve grays</h2>
      <p>
        Count the grays in your app. Most have ten or twelve, all slightly different, because
        everyone eyeballed a new one instead of reusing the last. You need about{' '}
        <strong>four neutrals</strong>: a background, a subtle surface, a border, and text. Pull them
        from one ramp and delete the rest. The same trap bites brand color: ship one blue, not four almost-blues that only you can tell apart.
      </p>

      <h2 id="dead-states">Dead states</h2>
      <p>
        Two states get forgotten. The first is hover — a button that doesn&rsquo;t react to the
        cursor feels broken, so give every interactive element a real <code>:hover</code> change.
        The second is focus. If you&rsquo;ve ever written <code>outline: none</code> and stopped
        there, you orphaned keyboard users — they can&rsquo;t see where they are. Style focus with
        <code>:focus-visible</code>, don&rsquo;t delete it.
      </p>

      <h2 id="tiny-targets">Tiny targets</h2>
      <p>
        That 20px icon button is a coin flip on a phone. Touch targets should be at least{' '}
        <strong>44×44px</strong> — Apple&rsquo;s number, and a good floor everywhere. If the icon is
        smaller, pad the hit area with padding or a pseudo-element so the tappable zone is bigger
        than the thing you can see. Leave at least 8px between targets as well, so a thumb doesn&rsquo;t trigger the one beside it.
      </p>

      <h2 id="alignment-and-radii">Alignment and radii</h2>
      <p>
        Two polish killers here. First, optical centering: a play triangle or a chevron looks off
        when it&rsquo;s mathematically centered, because your eye weights the mass, not the bounding
        box — nudge it a pixel or two. Second, radii: a 6px card holding an 8px button looks
        accidental. Pick two or three corner values, put them on a scale, and reuse them everywhere. Icons inside buttons carry the same problem: size them optically instead of dropping in a 24px glyph and hoping.
      </p>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Run this list before your next review: four grays, live hover and focus states, 44px
        targets, optical nudges, one radii scale. Or start from a component library that bakes these
        in — <Link href="/components">Spectrum UI</Link> ships accessible states and consistent radii,
        so you inherit the fixes instead of catching them one by one.
      </p>
    </>
  ),
};

export default post;
