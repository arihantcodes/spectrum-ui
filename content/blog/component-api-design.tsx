import type { BlogPostInput } from '@/lib/blog';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'Component API Design: How to Build Components People Love Using',
  excerpt:
    "The difference between a component library people love and one they avoid is the API. Here's how to design component interfaces that just make sense.",
  tagline: "Compose, don't configure. Leave an exit.",
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 14, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        The best components disappear — you reach for one, it does the obvious thing, and you move
        on without opening the docs. The worst make you stop and think: twenty props, half of them
        required, none named the way you’d guess. The gap between them is API design, and it comes
        down to a few conventions applied without exception.
      </p>

      <h2 id="compose-not-configure">Compose, don’t configure</h2>
      <p>
        The instinct is to add a prop for every variation. A card sprouts <code>headerTitle</code>,{' '}
        <code>headerSubtitle</code>, <code>showFooter</code>, <code>footerAlign</code>, and collapses
        under its own options. Every new design becomes another boolean, until the type signature is
        a wall nobody reads.
      </p>
      <p>
        Composition is the way out: <strong>expose the parts</strong>. Ship <code>Card</code>,{' '}
        <code>CardHeader</code>, <code>CardContent</code>, and <code>CardFooter</code> and let people
        arrange them. You write less, and the layout they need but you never imagined is just JSX.
      </p>

      <h2 id="name-variants">Name variants the same way</h2>
      <p>
        Pick a vocabulary and use it in every component. <code>variant</code> for visual style —
        default, ghost, destructive. <code>size</code> for scale — sm, default, lg. Two names,
        learned once, applied to forty components.
      </p>
      <p>
        <strong>Consistency is the whole game here.</strong> When Button, Badge, and Alert all take
        the same <code>variant</code> names, people guess right the first time and stop reading prop
        tables.
      </p>

      <h2 id="escape-hatches">Leave escape hatches</h2>
      <p>
        You won’t predict every use, so build the exits in from the start. Two cover almost
        everything:
      </p>
      <ul>
        <li>
          <code>className</code>, merged with the component’s own classes via tailwind-merge, so a
          caller can adjust one edge case without forking.
        </li>
        <li>
          <code>asChild</code>, which renders your component as its child element through Radix Slot
          — so a <code>Button</code> can become a Next.js <code>Link</code> without duplicating a
          single style.
        </li>
      </ul>
      <p>
        This is why copy-paste libraries feel so flexible. <Link href="/components">Spectrum UI</Link>{' '}
        wires <code>className</code> and <code>asChild</code> in by default, so the hatch is there
        before you reach for it. You inherit the flexibility without having to design for it.
      </p>

      <h2 id="the-rule">The rule</h2>
      <p>
        Design the common case to need zero props, and make the rare case possible without a fork.
        If someone can render your component with{' '}
        <code>&lt;Button&gt;Save&lt;/Button&gt;</code> and also bend it to a one-off without editing
        your source, the API is right.
      </p>
      <p>
        Ship that, and people stop rebuilding what you already gave them — which is the only metric a
        component API really has. The best compliment yours gets is silence: no issues, no forks, no
        Slack thread asking how it works.
      </p>
    </>
  ),
};

export default post;
