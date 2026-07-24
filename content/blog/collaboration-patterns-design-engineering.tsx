import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Collaboration Patterns: How Design Engineers Transform Team Dynamics',
  excerpt:
    'Design engineers bridge the gap between design and engineering teams. Here are the collaboration patterns that actually work for shipping better products.',
  tagline: 'Stop handing off. Work in one loop.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 22, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        Most design-engineering friction isn’t about talent. It’s about a broken relay: design
        throws a file over the wall, engineering builds something close, and the gap surfaces in QA
        when it’s expensive to fix. The teams that ship well don’t hand off — they work in the same
        loop. Here are the rituals that actually help.
      </p>

      <h2 id="pair-on-components">Pair on components</h2>
      <p>
        Book 45 minutes with a designer and build one component together, live. They watch the hover
        feel wrong at 300ms; you watch them realize the empty state was never drawn.
      </p>
      <p>
        <strong>The bugs you catch while pairing never reach a ticket.</strong> You’ll fix in one
        sitting what would have been three review rounds, and you both leave with the same mental
        model of how the thing works.
      </p>

      <h2 id="review-inside-the-pr">Review inside the PR</h2>
      <p>
        Design review shouldn’t live in a separate tool. Put a deploy preview link on every PR and
        let designers comment on the running thing, not a screenshot.
      </p>
      <p>
        They’ll catch what a static mock can’t show: the animation that stutters, the focus ring
        that’s missing, the layout that breaks at a real content length. Feedback lands on the
        actual artifact, and it lands before merge instead of after.
      </p>
      <Callout>
        Add a preview URL to your PR template so it’s never optional. A one-click link to the live
        branch turns “looks good” into “I actually clicked through it.”
      </Callout>

      <h2 id="one-shared-vocabulary">One shared vocabulary</h2>
      <p>
        Half of cross-team confusion is words. A designer says “card,” an engineer pictures a
        different component; “primary” means one blue in Figma and another in code.
      </p>
      <p>
        Fix it once: agree that the token is <code>--primary</code>, the component is{' '}
        <code>Card</code>, and the spacing step is <code>space-4</code> everywhere — Figma, code, and
        Slack. <strong>One name per thing, and reviews stop being translation exercises.</strong>
      </p>

      <h2 id="start-small">Start small</h2>
      <p>
        Don’t reorganize the team. Pick one ritual this sprint — usually the PR preview link,
        because it’s the cheapest — and run it for two weeks. Add pairing next. The goal isn’t
        process; it’s a shorter distance between an idea and a thing you can both click on.
      </p>
    </>
  ),
};

export default post;
