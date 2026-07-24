import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';

const post: BlogPostInput = {
  title: 'The Design Handoff Checklist: What Designers Should Give Engineers',
  excerpt:
    "Bad handoffs waste everyone's time. Here's what a complete design handoff looks like and how to make sure nothing gets lost.",
  tagline: 'The ten-line handoff that saves a week.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 21, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        A bad handoff looks complete. Pixel-perfect frames, neat spacing, a shared link. Then you
        start building and the questions pile up: what’s the empty state, what happens on error, how
        fast does this animate. A good handoff answers those before you ask, in about ten lines, and
        it saves a week of back-and-forth.
      </p>

      <h2 id="all-the-states">All the states</h2>
      <p>
        One frame is never enough. Every component that touches data needs four drawings: empty,
        loading, error, and full. <strong>The empty state matters most</strong>, because it’s what a
        new user sees first and the one that never gets designed.
      </p>
      <p>
        If the handoff only has the happy path, that’s not a handoff — it’s a wish. Ask for the
        other three states by name before you write any markup.
      </p>

      <h2 id="names-not-pixels">Names, not pixels</h2>
      <p>
        Don’t hand over <code>#6D28D9</code>. Hand over <code>--primary</code>. Colors, spacing, and
        type should arrive as <strong>token names that already exist in code</strong>, so nothing
        gets eyeballed or re-derived. States belong in the same vocabulary:
      </p>
      <Code
        filename="button.ts"
        lang="ts"
        code={`type ButtonState =
  | 'default'
  | 'hover'
  | 'loading'
  | 'disabled';`}
      />
      <p>
        Now “the third one” never means two different things across a review, and the design file
        reads like the component you’re about to write.
      </p>

      <h2 id="motion-in-numbers">Motion in numbers</h2>
      <p>
        “Make it smooth” is not a spec. Motion needs numbers: a duration in ms, an easing curve, and
        the trigger. “Fade and rise 8px over 150ms, ease-out, on mount” is something you can build
        once and get right.
      </p>
      <p>
        Include the reduced-motion behavior too. If nobody says what happens when a user turns motion
        off, someone forgets it entirely and the accessibility audit finds it later.
      </p>

      <h2 id="who-owns-what">Who owns what</h2>
      <p>
        The handoff isn’t done at merge — it’s done when you both agree who owns the component next.
        Write one line: design owns the visual spec, engineering owns the states and a11y, and
        changes go through a PR you both read.
      </p>
      <p>
        That’s the whole checklist: four states, token names, motion in numbers, and an owner. Ten
        lines pasted into the ticket, and the mockup stops being a mystery.
      </p>
    </>
  ),
};

export default post;
