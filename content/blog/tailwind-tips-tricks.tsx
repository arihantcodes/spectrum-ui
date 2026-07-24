import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Tailwind CSS Tips That Senior Devs Actually Use',
  excerpt:
    'Most Tailwind tutorials cover the basics. Here are the patterns and tricks that experienced developers use every day to write cleaner, faster UI code.',
  tagline: 'The utilities that stop the margin wars.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 16, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'CSS & Layout',
  content: (
    <>
      <p>
        Most Tailwind advice stops at “use utility classes.” The gap between junior and senior
        Tailwind isn’t knowing more classes — it’s knowing the handful that quietly prevent the
        messes everyone else ships. Here are five I reach for every day.
      </p>

      <h2 id="gap-not-margins">Gap, not margins</h2>
      <p>
        Spacing between siblings? Never put a <code>margin</code> on the children. Wrap them in a{' '}
        <code>flex</code> or <code>grid</code> container and set <code>gap-4</code>.
      </p>
      <p>
        Margins collapse, leak past edges, and force <code>:last-child</code> resets. Gap owns{' '}
        <strong>only the space between items</strong>, so the outer edges stay clean. That one habit
        removes most of the spacing bugs in a typical list.
      </p>

      <h2 id="size-utility">One utility for squares</h2>
      <p>
        Square things — avatars, icon buttons, status dots — used to need <code>h-10 w-10</code>.
        Since v3.4 you write <code>size-10</code> and get both dimensions from one number.
      </p>
      <p>
        It reads cleaner and can’t drift when someone edits the width and forgets the height. Pair it
        with <code>rounded-full</code> and you have a perfect avatar in two classes. One number, both
        dimensions, nothing to keep in sync.
      </p>

      <h2 id="group-and-peer">Style children with group</h2>
      <p>
        To restyle a child when its parent is hovered, add <code>group</code> to the parent and{' '}
        <code>group-hover:</code> to the child. <code>peer</code> is the sibling version, the classic
        trick behind custom checkboxes with <code>peer-checked:</code>.
      </p>
      <p>
        Both keep the state in your markup, so you skip a <code>useState</code> just to drive hover
        and focus styling. You reserve React state for things that are actually stateful.
      </p>
      <Callout>
        Nesting groups? Name them. Put <code>group/row</code> on the row and{' '}
        <code>group-hover/row:</code> on the child, so hovering the outer card doesn’t trigger every
        inner row at once.
      </Callout>

      <h2 id="data-variants">React to data attributes</h2>
      <p>
        Radix and shadcn components expose their state as data attributes, and Tailwind can read
        them. <code>data-[state=open]:rotate-180</code> flips a chevron the moment a dropdown opens.
      </p>
      <p>
        No effect, no ref, no manual class toggling. The component owns the attribute; your utility
        just reacts to it. The same reads <code>data-[side=top]:</code> and{' '}
        <code>data-[disabled]:</code>, so it covers most of Radix in one syntax.
      </p>

      <h2 id="arbitrary-sparingly">Arbitrary values, sparingly</h2>
      <p>
        Arbitrary values like <code>top-[117px]</code> are an escape hatch, not a habit. One honest
        one-off is fine, and a reviewer should be able to ask why it exists. The bracket syntax is
        there for the genuine exception, not the daily driver.
      </p>
      <p>
        The moment the same magic number appears twice, it belongs in your theme as a token.
        Arbitrary values should be rare enough that writing one feels{' '}
        <strong>slightly guilty</strong>.
      </p>
    </>
  ),
};

export default post;
