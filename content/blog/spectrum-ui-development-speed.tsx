import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'How Spectrum UI Accelerates Development Speed and Design Consistency',
  excerpt:
    'We spend too much time rebuilding the same primitives. Spectrum UI solves this by providing composable, accessible components that you own, cutting development time without sacrificing quality.',
  tagline: 'Copy the component, own the code.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 25, 2025',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        Count the hours you’ve lost rebuilding a dropdown — the markup, the keyboard handling, the
        focus trap, the dark-mode colors, again. Most product work reinvents the same primitives on
        every project. Spectrum UI removes that tax, and because you copy the code in,{' '}
        <strong>you still own every line</strong>.
      </p>

      <h2 id="copy-in-not-install">Copy in, not install</h2>
      <p>
        Spectrum UI isn’t a package you pull from <code>node_modules</code>. Point the shadcn CLI at
        its registry and the component’s source is written straight into your project, where you can
        read it, edit it, and ship it like any other file you wrote.
      </p>
      <p>
        Run <code>npx shadcn add</code> with the component you want and it lands in{' '}
        <code>components/ui</code>, fully editable. There’s no wrapper API to learn and no black box
        to fight when a design changes. Upgrades work the way you already know from shadcn, so
        there’s nothing new to memorize.
      </p>
      <Callout>
        Because the source lives in your repo, delete what you don’t use. An owned component you can
        trim beats a dependency that ships code you’ll never call.
      </Callout>

      <h2 id="components-you-own">44 components you own</h2>
      <p>
        <Link href="/components">Spectrum UI</Link> ships 44 React components built on Tailwind and
        shadcn primitives — dialogs, comboboxes, data tables, the pieces that are tedious and easy to
        get wrong. It’s the boring, must-get-right catalog, finished once.
      </p>
      <p>
        Each one arrives accessible and themed, so a feature that used to cost a day of
        primitive-wrangling starts from working parts. That’s the difference between a starting line
        and a blank page. You spend your hours on the parts that are actually your product.
      </p>

      <h2 id="tokens-keep-it-consistent">Tokens keep it consistent</h2>
      <p>
        Every component reads from <strong>the same CSS variables</strong>, so consistency isn’t a
        review comment — it’s the default. Set <code>--primary</code> once and the whole set matches. Change the
        radius token and every corner in the app rounds together.
      </p>
      <p>
        That’s the quiet payoff of a shared token layer: 44 components can’t drift apart when they
        all point at the same handful of values. New teammates inherit that consistency without
        reading a style guide.
      </p>

      <h2 id="start-with-one">Start with one</h2>
      <p>
        Don’t adopt the whole set at once. Add a single button, retheme it to your brand, and see how
        it feels inside your app — it’s the fastest way to judge fit without committing to anything.
      </p>
      <p>
        If it fits, add the next component when you actually need it. Grow the set at the pace of
        real features, not all at once. Copied-in code you own beats an install you can’t change
        every time the design shifts.
      </p>
    </>
  ),
};

export default post;
