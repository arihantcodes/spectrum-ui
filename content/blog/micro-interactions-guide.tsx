import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Micro-Interactions That Make Users Say "This App Feels Nice"',
  excerpt:
    "The small details make the big difference. Here are the micro-interactions that turn a functional app into one people actually enjoy using.",
  tagline: 'Fast feedback, calm transitions.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 10, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        The gap between an app that feels cheap and one that feels expensive is usually 200
        milliseconds of feedback. Not a redesign. Not a new font. Just the small stuff: what happens
        when you press, hover, submit, or wait. Here’s where that budget goes.
      </p>

      <h2 id="feedback-under-100ms">Feedback under 100ms</h2>
      <p>
        When someone clicks, they need to know it registered before they consciously notice the
        delay — that window is <strong>about 100ms</strong>. Under 100ms feels instant. So the press
        state, the highlight, the spinner appearing: fire them immediately, on the same frame as the
        input. Never wait for the network to confirm before you show that something happened. Paint
        the optimistic state first and reconcile later.
      </p>

      <h2 id="transition-timing">Keep transitions near 200ms</h2>
      <p>
        State changes that move or fade — a dropdown opening, a tab sliding, a card expanding — want
        150 to 250ms. Faster than 150ms and the eye can’t track it, so it reads as a jump. Slower
        than 300ms and you’re making people wait on your taste. Pick <strong>200ms as your
        default</strong> and deviate only with a reason. Bigger distances get a little longer: a
        full-screen sheet can take 300ms, a checkbox 120ms.
      </p>

      <h2 id="press-scale">Press it down</h2>
      <p>
        The cheapest win in the whole list: scale the element down slightly while it’s pressed. Use{' '}
        <code>active:scale-[0.98]</code> on a button, or <code>0.97</code> for something chunky like
        a card. It mimics a real, physical push, and paired with a fast color shift it makes every
        tap feel connected to the pixel under your finger. Keep it subtle — go below 0.95 and it
        looks broken.
      </p>

      <Callout>
        One trap: animate on change, not on every state. A spinner that fades in after 400ms of
        waiting feels considered. One that flickers on every 50ms request feels broken. Debounce the
        loading state before you show it.
      </Callout>

      <h2 id="when-not-to-animate">When not to animate</h2>
      <p>
        Restraint is the senior move. Skip the motion when it gets in the way:
      </p>
      <ul>
        <li>Anything a user is waiting on — search results, validation errors, a price update.</li>
        <li>The same element twice in one interaction; pick one moment and commit to it.</li>
        <li>
          Everything decorative, once <code>prefers-reduced-motion: reduce</code> is set.
        </li>
      </ul>
      <p>
        The best micro-interactions are the ones people feel but never notice. Add them where they
        confirm an action, and nowhere else.
      </p>
    </>
  ),
};

export default post;
