import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'From Figma to Functional: My Design-to-Development Workflow',
  excerpt:
    "Turning Figma designs into clean React code doesn't have to be painful. Here's the exact workflow I use to go from mockup to production-ready Next.js components.",
  tagline: 'From frame to component without drift.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 8, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        The drift starts small. The button is 8px of radius in Figma, 6px in code; the heading is
        24px there, 22px shipped. None of it is a bug, so none of it gets caught, and the product
        slowly stops matching the design. Here’s the workflow that kills drift before it starts.
      </p>

      <h2 id="tokens-first">Tokens first</h2>
      <p>
        <strong>Translate tokens, not pixels.</strong> Before you write a single component, pull the
        design’s primitives — color, spacing, radius, type scale — into{' '}
        <Link href="/blog/design-tokens-single-source">shared tokens</Link> that both sides agree
        on.
      </p>
      <Code
        filename="globals.css"
        lang="css"
        code={`:root {
  --space-4: 1rem;      /* 16px */
  --radius-md: 0.5rem;  /* 8px  */
  --text-lg: 1.125rem;  /* 18px */
  --primary: 240 6% 10%;
}`}
      />
      <p>
        Now <code>16px</code> isn’t a number you eyeball off the canvas; it’s <code>--space-4</code>{' '}
        in both places. When design bumps the scale, you change one line, not forty components.
      </p>

      <h2 id="name-parity">Name parity</h2>
      <p>
        The fastest way to lose a design is to rename it in code. If the Figma layer is{' '}
        <code>Card/Header</code>, your component is <code>CardHeader</code> — same words, same
        structure. A Large variant in Figma becomes <code>size=&quot;lg&quot;</code> in the API.
      </p>
      <p>
        When names match, a new engineer can read a Figma file and already know the component tree.
        Search works across both. Reviews stop being a game of guess-which-thing-this-is.
      </p>

      <h2 id="build-states">Build states, not screens</h2>
      <p>
        A screen is a snapshot; a component is a state machine. Don’t rebuild the “Dashboard —
        Filled” frame. Build the <code>DataTable</code> and give it empty, loading, error, and
        populated states.
      </p>
      <p>
        Designers hand you three frames; <strong>you owe the product all four states</strong>,
        including the one they forgot to draw. Ask for the empty state on day one — it’s the one
        that gets skipped and the one users hit first.
      </p>

      <h2 id="the-workflow">The workflow</h2>
      <p>
        Tokens in a shared file. Names that mirror the design tree. Every component built as its
        full set of states. Do those three and the mockup and the running app stay in sync on their
        own — no pixel-diffing, no “why doesn’t it match” thread in review.
      </p>
    </>
  ),
};

export default post;
