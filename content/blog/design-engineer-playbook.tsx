import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: "The Design Engineer's Playbook: Bridging Creativity and Code",
  excerpt:
    'Discover what a design engineer does, the essential skills needed, and why this hybrid role is transforming modern product teams. A complete career guide for 2026.',
  tagline: 'You own the seam between design and code.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 10, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        You spot the role the first time a mockup runs out of answers. What shows when the list is
        empty, and what does the button do mid-request? Design didn’t specify, engineering guessed,
        and it shipped wrong. A design engineer lives in that gap and closes it — part designer,
        part frontend, wholly responsible for how the product feels.
      </p>

      <h2 id="own-the-seam">Own the seam</h2>
      <p>
        The job isn’t visual design, and it isn’t backend-facing frontend. It’s the seam between
        them: the decisions no handoff document ever covers. Focus rings, loading states, what
        happens at 320px, how an error reads to a person who is already annoyed.
      </p>
      <p>
        <strong>Nobody owns the seam by default, so you volunteer for it.</strong> You’re the one
        who notices the disabled button gives no reason next to it, and the one who fixes it before
        a user files a ticket. That instinct is most of the role.
      </p>

      <h2 id="prototype-in-code">Prototype in code</h2>
      <p>
        Static frames lie about interaction. A hover looks fine in Figma and feels sluggish at 200ms
        in the browser. A modal that’s elegant on the canvas traps keyboard focus the moment it’s
        real.
      </p>
      <p>
        So you build the rough thing early — a React component wired to actual state — and learn in
        an afternoon what a week of review comments never surfaces. Code is your design tool, not
        just your delivery format. The prototype is where the argument gets settled.
      </p>

      <h2 id="run-your-own-bar">Run your own bar</h2>
      <p>
        No one is going to hold you to 4.5:1 contrast or a 40px tap target. You hold yourself to it.
        The role has no gatekeeper, so the standard has to be internal.
      </p>
      <p>
        Keep a short checklist you run before every PR: the keyboard path works, empty and error
        states exist, motion respects <code>prefers-reduced-motion</code>, and text clears contrast
        in both themes. <strong>The bar is personal, which is exactly why it holds.</strong>
      </p>
      <Callout>
        Reviewing your own work? Open it in a screen reader for two minutes and tab through with the
        trackpad untouched. If you can’t reach every control, neither can a chunk of your users.
      </Callout>

      <h2 id="start-here">Start here</h2>
      <p>
        Pick one component your team ships this week. Build every state it can be in, not just the
        happy one. Sit with a designer for twenty minutes, then a backend dev for twenty more, and
        write down every question the mockup didn’t answer. That list is the job — do it for one
        component, then the next, and the role becomes a habit instead of a title.
      </p>
    </>
  ),
};

export default post;
