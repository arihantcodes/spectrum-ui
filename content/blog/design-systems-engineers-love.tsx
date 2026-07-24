import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';
import Link from 'next/link';

const post: BlogPostInput = {
  title: 'Building Design Systems That Engineers Actually Want to Use',
  excerpt:
    "Most design systems fail because engineers hate using them. Here's how to build a React component library with Tailwind CSS that devs actually enjoy and adopt.",
  tagline: 'Adoption comes from ownership, not enforcement.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 6, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        You can’t mandate a design system into existence. You’ve seen the pattern — a polished
        library launches, and six months later adoption sits at 30% while everyone quietly ships
        their own button. Systems that win aren’t enforced; they’re the ones engineers reach for
        because using them beats rolling their own.
      </p>

      <h2 id="give-them-code">Give them the code</h2>
      <p>
        The biggest shift is <strong>ownership</strong>. A package you <code>npm install</code> is a
        black box: when it doesn’t fit, the engineer files an issue and waits, or forks it and eats
        the maintenance. That gap between wanting a change and getting one is where trust leaks out.
      </p>
      <p>
        Copy-paste ownership flips that. The component lands in <code>components/ui</code> as plain
        source you can read, edit, and delete. This is the model shadcn/ui popularized, and it’s why
        libraries like <Link href="/components">Spectrum UI</Link> hand you the code instead of a
        dependency to version-bump.
      </p>

      <h2 id="type-the-props">Type the props</h2>
      <p>
        Engineers trust components they can’t misuse. A real union —{' '}
        <code>{"variant: 'default' | 'ghost' | 'destructive'"}</code> — turns the docs into
        autocomplete and a typo into a red squiggle instead of a runtime surprise.
      </p>
      <p>
        Skip the <code>any</code>. Every loosely typed prop is a question someone has to ask in
        Slack, and every question is a small tax on adoption. The library that answers questions
        before they’re asked is the one that spreads.
      </p>

      <h2 id="zero-lock-in">Zero lock-in</h2>
      <p>
        The fear that kills adoption is getting trapped. If your system can’t express one specific
        design and there’s no way out, engineers won’t risk building on it at all.
      </p>
      <p>
        So leave the exits in from the start: a <code>className</code> passthrough, an{' '}
        <code>asChild</code> prop, defaults you can override. When people know they can bail out on
        the one hard case, they’ll happily use you for the other ninety-nine. A visible exit is what
        makes people comfortable walking in.
      </p>
      <Callout>
        Watch your own escape hatches. If more than one usage in five needs <code>className</code>{' '}
        to override your defaults, the defaults are wrong — fix the component instead of blaming the
        callers.
      </Callout>

      <h2 id="the-test">The test</h2>
      <p>
        Ship one component the copy-paste way and watch what happens. If an engineer pulls it in,
        tweaks two lines, and never files an issue, you built the right thing. No survey needed; the
        issue tracker tells you everything.
      </p>
      <p>
        Adoption isn’t a rollout plan or a lunch-and-learn. It’s the moment your system is simply{' '}
        <strong>easier than the alternative</strong> — and the only way there is to make the easy
        path the good one.
      </p>
    </>
  ),
};

export default post;
