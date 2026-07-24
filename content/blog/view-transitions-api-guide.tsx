import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'View Transitions API: Building Smooth Page Animations Without JavaScript',
  excerpt:
    'Learn how the View Transitions API enables native-feeling page transitions in web apps. Build cinematic route animations, shared element transitions, and smooth state changes with minimal code.',
  tagline: 'Native crossfades, one function call.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 20, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'CSS & Layout',
  content: (
    <>
      <p>
        You want the new page to fade in instead of snapping. The old way: a motion library,{' '}
        <code>AnimatePresence</code>, and a fight with unmount timing. The new way is one function the
        browser already ships: it snapshots the old state, snapshots the new one, and animates
        between them in CSS.
      </p>

      <h2 id="one-function">One function</h2>
      <p>
        Wrap the DOM change that matters in <code>document.startViewTransition(() =&gt; update())</code>.
        The browser takes a before-and-after screenshot and crossfades them by default — you write no
        keyframes at all.
      </p>
      <p>
        Everything inside the callback is the new state; everything before it is the old. The browser
        diffs the two frames and tweens between them for you.
      </p>
      <p>
        That’s the entire entry point. In Next.js, turn on the experimental{' '}
        <code>viewTransition</code> flag and route changes pick it up automatically.
      </p>

      <h2 id="name-what-moves">Name what moves</h2>
      <p>
        A crossfade is nice. A thing that flies from one spot to the next is the effect people
        remember. Give the same element a <code>view-transition-name</code> on both pages — say{' '}
        <code>hero</code> on a grid thumbnail and on the full image it turns into.
      </p>
      <p>
        The browser matches them by name and animates position, size, and shape between the two.{' '}
        <strong>A grid photo morphs into a detail hero with zero position math from you.</strong>
      </p>
      <p>
        Names must be unique on the page — two elements sharing <code>hero</code> at once will throw.
        Set it, run the transition, then clear it if the element sticks around.
      </p>

      <h2 id="style-and-fall-back">Style and fall back</h2>
      <p>
        Style the transition with plain CSS on the <code>::view-transition-old</code> and{' '}
        <code>::view-transition-new</code> pseudo-elements — change the duration, swap the easing,
        trade the crossfade for a slide.
      </p>
      <p>
        Keep durations short. 200–300ms reads as responsive; past 500ms it starts to feel like the
        app is stalling.
      </p>
      <p>
        Support isn’t everywhere yet, and that’s fine. The callback runs either way; unsupported
        browsers just skip the animation and update instantly. Call{' '}
        <code>document.startViewTransition?.(update)</code> and nothing breaks.
      </p>
      <Callout>
        Respect <code>prefers-reduced-motion</code>: wrap the animation in that media query and set
        the transition duration to <code>0s</code>. Same instant update, no movement for people who
        asked for less.
      </Callout>

      <h2 id="where-it-pays">Where it pays</h2>
      <p>Don’t transition everything. It earns its keep in a few specific spots:</p>
      <ul>
        <li>A gallery thumbnail opening into its full detail view.</li>
        <li>A list item expanding into a full page.</li>
        <li>Tab or filter changes that reorder cards.</li>
      </ul>
      <p>
        Use it there, leave the rest instant, and gate it behind reduced motion. It’s the rare polish
        that costs a few lines and reads like weeks of work.
      </p>
    </>
  ),
};

export default post;
