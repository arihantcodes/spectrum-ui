import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'The Art of Prototyping: When to Code, When to Design',
  excerpt:
    "Should you prototype in Figma or jump straight to code? It depends on what you're trying to learn. Here's a simple way to decide.",
  tagline: 'One prototype answers one question.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 4, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        Most prototypes fail because they try to be the product. They get polished, reviewed, argued
        over, and eventually shipped half-finished. A prototype has one job: answer a single
        question, then get thrown away. The throwing away is the point, not the failure.
      </p>

      <h2 id="one-question">One question</h2>
      <p>
        Before you open Figma or your editor, write the question down. “Does this onboarding feel too
        long?” “Can a user tell these two states apart?” One question, one prototype.
      </p>
      <p>
        <strong>If you can’t name the question, you’re not prototyping — you’re building.</strong>{' '}
        Vague goals produce prototypes that never end, because there’s no moment where they’re
        clearly done.
      </p>

      <h2 id="the-fidelity-ladder">The fidelity ladder</h2>
      <p>
        Match effort to the question. Climbing higher than you need is the most common way to burn a
        week.
      </p>
      <ul>
        <li>Paper or a whiteboard: is the flow right?</li>
        <li>Figma clickthrough: does the layout make sense?</li>
        <li>Coded prototype: does the interaction feel good at real speed?</li>
        <li>Real-data build: does it hold up with long, messy, empty content?</li>
      </ul>
      <p>
        Start on the lowest rung that can answer your question. A flow problem doesn’t need React,
        and a 200ms timing problem can’t be felt in a static frame.
      </p>

      <h2 id="throwaway-is-the-point">Throwaway is the point</h2>
      <p>
        Prototype code should be fast and ugly. Hard-coded arrays, no tests, no error handling, one
        big file. You’re buying an answer, not building an asset.
      </p>
      <p>
        The trap is falling for code that was never meant to last. When the question is answered,
        delete it and rebuild clean. <strong>The knowledge survives; the code shouldn’t.</strong>
      </p>
      <Callout>
        Timebox it. Give a prototype a day, sometimes an hour. A deadline forces you to cut fidelity
        down to exactly what answers the question — which is the whole skill.
      </Callout>

      <h2 id="the-rule">The rule</h2>
      <p>
        One prototype, one question, the lowest fidelity that answers it, deleted when you’re done.
        Write the question at the top of the file so future-you remembers what you were actually
        testing. Answer it, keep the lesson, throw the code away, and move on.
      </p>
    </>
  ),
};

export default post;
