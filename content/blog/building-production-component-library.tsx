import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title:
    'Building a Production Component Library: From shadcn Primitives to Your Own Design System',
  excerpt:
    'A complete guide to building, packaging, and shipping your own component library on top of shadcn/ui primitives. Learn monorepo setup, versioning, documentation, testing, and distribution strategies.',
  tagline: 'A folder of components is not a product.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 18, 2026',
  readTime: '3 min read',
  category: 'Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        You built twenty components. They live in a <code>components/</code> folder, copy-pasted
        into three apps that have already drifted apart. That’s not a library — it’s{' '}
        <strong>a maintenance bill</strong>. Turning it into a product is mostly unglamorous
        plumbing, and that plumbing is exactly
        what makes people trust it.
      </p>

      <h2 id="publish-dont-copy">Publish, don’t copy</h2>
      <p>
        The moment two apps share a button, stop copying files between them. Move the components
        into one package — call it <code>@acme/ui</code> — with a build step and an{' '}
        <code>exports</code> map. A workspace tool like pnpm or Turborepo keeps that package and its
        consumers in one repo without publishing to npm on every change.
      </p>
      <p>
        Now consumers install a version instead of reaching into your source. The question changes
        from “which copy is correct?” to a single number in a <code>package.json</code>, and the
        whole class of “works in app A, breaks in app B” bugs quietly disappears.
      </p>

      <h2 id="version-like-an-api">Version like an API</h2>
      <p>
        Every prop you expose is a contract. Renaming the <code>ghost</code> variant to{' '}
        <code>subtle</code> is a breaking change, even when nothing on screen looks different.
      </p>
      <p>
        Adopt semver and let{' '}
        <a href="https://github.com/changesets/changesets" target="_blank" rel="noreferrer">
          Changesets
        </a>{' '}
        track it for you. A major bump with a written changelog is how downstream teams plan an
        upgrade instead of dreading one.
      </p>

      <h2 id="docs-are-the-product">Docs are the product</h2>
      <p>
        Nobody reads your source to learn an API. Each component needs one page: a live example, a
        props table, and a note on keyboard and screen-reader behavior.
      </p>
      <p>
        Generate that props table from your types so it can never drift from the real interface. If
        a component isn’t documented, treat it as unshipped — adoption happens in the docs, not in
        the code.
      </p>

      <h2 id="the-boring-20">The boring 20%</h2>
      <p>
        The last fifth is what separates a real library from a nice repo. It’s tedious, and it’s the
        entire point.
      </p>
      <ul>
        <li>
          <strong>Visual regression tests</strong>, so a shadow tweak can’t silently break forty
          screens.
        </li>
        <li>An automated accessibility check running in CI on every pull request.</li>
        <li>
          A published changelog and a <code>deprecated</code> path for props you retire.
        </li>
        <li>
          One <code>peerDependencies</code> range for React, never a bundled copy.
        </li>
      </ul>
      <Callout>
        Before you publish, delete every component you can’t name a second use for. A tight set of
        twelve that people actually import beats forty where half are dead weight.
      </Callout>

      <h2 id="ship-0-1">Ship version 0.1</h2>
      <p>
        Don’t model the whole system on day one. Publish one package with three components, a
        changelog, and a docs page for each.
      </p>
      <p>
        Then let real usage tell you what’s missing. A small library people install beats a perfect
        one that never leaves your laptop.
      </p>
    </>
  ),
};

export default post;
