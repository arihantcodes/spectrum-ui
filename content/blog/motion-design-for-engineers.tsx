import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Motion Design for Engineers: Making Interfaces Feel Alive',
  excerpt:
    "Good animations aren't just pretty. They guide users, give feedback, and make your React app feel polished. Here's how to do motion right with CSS and Framer Motion.",
  tagline: 'Easing is 90 percent of good motion.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 2, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        Most engineers set <code>transition: all 0.3s ease</code> and move on. That’s why their UIs
        feel mechanical. The duration barely matters; <strong>the easing curve</strong> is what your
        eye reads as natural or fake. Get the curve right and the rest falls into place.
      </p>

      <h2 id="easing-beats-duration">Easing beats duration</h2>
      <p>
        <code>ease</code> and <code>linear</code> are the two curves you should almost never use.
        <code>linear</code> reads as robotic because nothing in the physical world moves at a
        constant speed — real motion accelerates and decelerates. Reach for <code>ease-out</code> as
        your default. It covers about 90% of interface motion. Save a custom{' '}
        <code>cubic-bezier</code> for when you can say out loud why the default feels wrong.
      </p>

      <h2 id="ease-out-entrances">Ease-out for entrances</h2>
      <p>
        When something enters — a modal, a toast, a menu — it should decelerate into place with{' '}
        <code>ease-out</code>. It arrives fast, then settles, which reads as confident. When
        something leaves, use <code>ease-in</code>: it starts slow and accelerates away, so exits
        feel final and don’t linger. Then match duration to distance, not to a fixed number. A
        tooltip travelling 8px wants roughly 120ms; a panel crossing the screen wants around 300ms.
        Same curve, different time.
      </p>

      <h2 id="springs-for-gestures">Springs for gestures</h2>
      <p>
        CSS timing functions are perfect for taps and state changes. But the moment a user is
        dragging — a sheet, a swipe-to-dismiss, a slider — switch to a spring. A spring has no fixed
        duration; it responds to velocity, so when someone flicks fast the animation moves fast.
        That’s the trick behind why iOS feels alive. In React, Framer Motion’s spring transitions do
        this for free: give them a <code>stiffness</code> and <code>damping</code> and skip
        hand-tuned keyframes entirely.
      </p>

      <h2 id="respect-reduced-motion">Always respect reduced motion</h2>
      <p>
        None of this ships without one guard: <code>prefers-reduced-motion</code>. A real slice of
        your users get nauseous from motion, and the OS already knows their preference. When{' '}
        <code>reduce</code> is set, drop transforms and large movements to a near-instant fade or to
        nothing. Keep the feedback, cut the travel.
      </p>
      <Callout>
        The one-liner that covers most cases: wrap a global rule in{' '}
        <code>@media (prefers-reduced-motion: reduce)</code> and force{' '}
        <code>animation-duration: 0.01ms</code> and <code>transition-duration: 0.01ms</code> on
        everything. Ship it once and stop worrying.
      </Callout>
    </>
  ),
};

export default post;
