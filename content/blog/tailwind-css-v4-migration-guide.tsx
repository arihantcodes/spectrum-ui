import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Tailwind CSS v4: Complete Migration Guide and Game-Changing New Features',
  excerpt:
    "Tailwind CSS v4 is the biggest release in the framework's history, replacing JavaScript configuration with a CSS-first approach. Here is everything you need to know to migrate your project and take advantage of the powerful new features.",
  tagline: 'Config moves from JS into CSS.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 28, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'CSS & Layout',
  content: (
    <>
      <p>
        Tailwind v4 changes how the framework is configured. Your <code>tailwind.config.js</code> is
        gone, and <strong>the theme now lives in CSS</strong>. The engine is faster and setup is simpler, but a
        handful of renames will break your build on the first run — so here’s the migration in the
        order that actually works.
      </p>

      <h2 id="config-in-css">Config lives in CSS</h2>
      <p>
        You pull in Tailwind with one import and define your theme inside an <code>@theme</code>{' '}
        block. Every token becomes a real CSS variable, so <code>--color-brand</code> is readable in
        devtools and at runtime. Your design tokens and your styles finally share one source instead
        of hiding in a JS file nothing else can see.
      </p>
      <Code
        filename="app.css"
        lang="css"
        code={`@import "tailwindcss";

@theme {
  --color-brand: oklch(0.68 0.19 264);
  --font-display: "Cal Sans", sans-serif;
  --radius-card: 0.75rem;
}`}
      />
      <p>
        There’s no <code>content</code> array to maintain either — v4 scans your template files
        automatically, and you only reach for <code>@source</code> when it can’t find one. Folding
        that scan into the engine is a big part of why v4 builds noticeably faster.
      </p>

      <h2 id="what-breaks">What actually breaks</h2>
      <p>
        The renames are the tripwire. <code>shadow-sm</code> is now <code>shadow-xs</code>,{' '}
        <code>outline-none</code> becomes <code>outline-hidden</code>, and the old{' '}
        <code>@tailwind</code> directives are replaced by a single import. Spacing, ring, and border
        defaults shifted too, so expect a few pixels to move.
      </p>
      <p>
        The PostCSS plugin also moved to its own package, <code>@tailwindcss/postcss</code>. Don’t
        fix any of this by hand — <strong>the official codemod does it for you</strong>, and it runs
        cleanest on a branch with nothing else in flight.
      </p>

      <h2 id="migration-order">Migration order</h2>
      <p>
        Run it in this sequence, on a fresh branch you can throw away if it goes sideways. Skipping a
        step is how people end up debugging a half-migrated build.
      </p>
      <ol>
        <li>Upgrade to Node 20+ and set a modern browser target.</li>
        <li>
          Run <code>npx @tailwindcss/upgrade</code> and read every line of the diff.
        </li>
        <li>
          Move your <code>theme.extend</code> values into an <code>@theme</code> block.
        </li>
        <li>
          Delete <code>tailwind.config.js</code> once nothing imports it.
        </li>
      </ol>

      <h2 id="when-to-wait">When to wait</h2>
      <p>
        Migrate now if you own your styles and target current browsers. The payoff is a faster build
        and a config you can actually read, and most apps clear that bar today. A theme you can read
        at a glance is worth the afternoon by itself.
      </p>
      <p>
        Hold off if a critical plugin hasn’t shipped a v4 build, or you still support older engines.
        v4 leans on <code>@property</code> and <code>oklch()</code>, which old browsers silently
        ignore, so check your own analytics before committing.
      </p>
      <Callout>
        v4 assumes Safari 16.4+, Chrome 111+, and Firefox 128+. If your traffic still shows a
        meaningful share below those versions, stay on 3.4 until it drops off.
      </Callout>
    </>
  ),
};

export default post;
