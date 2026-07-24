import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'How to Build a Design System That Actually Scales',
  excerpt:
    'Design systems are not just for big companies. Here is how to build one that grows with your team, from startup to enterprise, without overthinking it.',
  tagline: 'Four layers, and governance that lives in PRs.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 21, 2025',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        Most design systems don’t die from bad taste. They rot — one hardcoded hex, one snowflake
        component, one undocumented prop at a time. The fix isn’t more process. A system that scales
        isn’t bigger than a small one; it’s layered, so a change in one place can’t quietly break
        the rest.
      </p>

      <h2 id="four-layers">The four layers</h2>
      <p>
        Picture four layers, each built on the one below. Tokens are the raw decisions: color,
        spacing, radius, type scale. Primitives are the components that read those tokens — button,
        input, card.
      </p>
      <p>
        Patterns compose primitives into real jobs: a login form, a page header, a data table. Docs
        sit on top and say when to reach for each. The order is the point —{' '}
        <strong>every layer depends only on the ones beneath it</strong>, never sideways.
      </p>
      <p>
        Docs aren’t a wiki nobody opens. They’re the short usage note next to each component: what
        it’s for, and which pattern to grab instead when it isn’t the right fit.
      </p>

      <h2 id="why-order-holds">Why the order holds</h2>
      <p>
        When dependencies point one direction, a change stays contained. Retheme the whole app? Edit
        tokens and every primitive inherits it. Fix a button’s focus ring once and every pattern
        using that button updates for free.
      </p>
      <p>
        Break the rule — a pattern reaching past primitives to hardcode <code>#2563eb</code> — and
        the rot starts. That one shortcut is how a codebase ends up with forty grays nobody chose.
        Sideways dependencies turn every fix into whack-a-mole.
      </p>

      <h2 id="governance-in-prs">Governance lives in PRs</h2>
      <p>
        Most teams try to govern a system in committee meetings and shared-doc debates. That’s where
        systems stall. The real gate is <strong>the pull request</strong>.
      </p>
      <p>
        A new component earns its place by passing a checklist in review: does a primitive already
        cover this, does it use tokens, is it keyboard-accessible, is it documented? If a reviewer
        can’t say yes to all four, it doesn’t merge. No committee, no roadmap slide — just a diff
        held to a standard.
      </p>
      <Callout>
        One check catches most rot: fail the build on any raw hex or px value outside the token
        file. If a color isn’t a token, CI won’t let it ship — and nobody has to police it by hand.
      </Callout>

      <h2 id="start-here">Start here</h2>
      <p>
        Define ten tokens and one button this week, then ship them. Add a primitive only when a
        screen actually needs it, a pattern only when two screens repeat the same shape, and a doc
        the moment someone asks how a thing works.
      </p>
      <p>
        The system earns each layer instead of guessing at all four up front. That’s the difference
        between one that scales and one you rewrite in a year.
      </p>
    </>
  ),
};

export default post;
