import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'The Design Engineer Toolbox: What I Use Every Day in 2026',
  excerpt:
    'A practical rundown of the tools, extensions, and setups I use daily as a design engineer. No fluff, just what actually helps.',
  tagline: 'Tools that shorten the design-to-code loop.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 8, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        You don’t need forty extensions. You need four tools that hand work to each other cleanly,
        so an idea moves from your head to a merged PR without stalling. I’ve tried the big
        kitchen-sink setups, and they slow me down. Here’s the stack I actually open every day in
        2026, and the one test I use before adding anything to it.
      </p>

      <h2 id="the-loop-is-the-metric">The loop is the metric</h2>
      <p>
        Every tool earns its slot by one number: how long from “I have an idea” to “it’s live in the
        product.” That’s the design-to-code loop, and it’s the only thing worth optimizing. A messy
        stack turns a small feature into a week of context-switching. A tight one gets it to an
        afternoon. So I judge every tool by how much of that loop it removes, and I stay ruthless
        about the rest.
      </p>

      <h2 id="the-four-i-open-daily">The four I open daily</h2>
      <p>
        Four stages, one tool each: design, write, verify, track. Anything past that is usually a
        distraction dressed up as productivity.
      </p>
      <ul>
        <li>
          <strong>Figma</strong> for deciding what to build — layout and states settled before I
          write a line, not pixel-pushing.
        </li>
        <li>
          <strong>Cursor or Claude</strong> as a pair — scaffolds, refactors, and the boring 80% of
          every component.
        </li>
        <li>
          <strong>Storybook</strong> for building in isolation — every state of a component on one
          page, no app to click through.
        </li>
        <li>
          <strong>Linear</strong> for what’s next — one keyboard-driven queue instead of a status
          meeting.
        </li>
      </ul>
      <p>
        That’s it. Notice what’s not here: no second chat tool, no note-taking app I abandon in a
        week, no dashboard I open once a month.
      </p>

      <h2 id="skip-the-shiny-stuff">Skip the shiny stuff</h2>
      <p>
        I ignore most launches. A new tool has to either replace one I already trust or cut a
        measurable step from the loop — “it’s neat” isn’t a reason to add it. My “tried and dropped”
        list is longer than my active one, and that’s a feature, not a failure. Every tool you keep
        is one more thing to update, learn, and debug when it breaks at the worst time.
      </p>
      <Callout>
        Before you add a tool, name the exact step it removes. If you can’t name one, it’s a toy,
        not part of the stack. Re-run that test every few months on the tools you already have —
        some stop earning their place.
      </Callout>

      <h2 id="start-here">Start here</h2>
      <p>
        Pick one tool per stage — design, code, component, tracking — and wire them so each one’s
        output is the next one’s input: a Figma frame becomes a Cursor prompt, becomes a{' '}
        <Link href="/blog/storybook-design-systems">Storybook story</Link>, becomes a Linear ticket.
        Then time your next feature from idea to merge. That number is the only benchmark that
        matters, not your tool count.
      </p>
    </>
  ),
};

export default post;
