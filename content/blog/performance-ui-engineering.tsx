import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'UI Performance: How to Make Your React App Feel Instant',
  excerpt:
    "Users don't care about your Lighthouse score. They care about how fast your app feels. Here's how to make your UI feel instant.",
  tagline: 'Fast is a feeling, not a score.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 31, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'React & Performance',
  content: (
    <>
      <p>
        Your Lighthouse score is 98 and the app still feels sluggish. Score and feel aren’t the same
        thing. The speed a user notices comes from three moments: the first paint, things not
        jumping around, and clicks that respond right now.
      </p>

      <h2 id="first-paint">The first paint</h2>
      <p>
        The largest thing on screen — hero image, headline, banner — should land in under{' '}
        <strong>2.5 seconds</strong>. That’s your LCP, and it’s the number people actually feel.
      </p>
      <p>
        Render it from the server, preload the hero image, and don’t hide it behind a spinner or a
        font swap. If it’s an image, give it a real width and height so the browser fetches it early
        and holds its place.
      </p>
      <p>
        Fonts are the sneaky one. Use <code>font-display: swap</code> and preload the file, or your
        headline paints twice and the whole page feels late.
      </p>

      <h2 id="reserve-the-space">Reserve the space</h2>
      <p>
        Nothing feels cheaper than content that jumps. An image loads and shoves the paragraph down;
        an ad slot pops in and you tap the wrong thing. That’s layout shift, and your target is zero.
      </p>
      <p>
        The fix is boring and total: reserve the space before the content arrives. Set explicit{' '}
        <code>width</code> and <code>height</code> on media, give async slots a fixed{' '}
        <code>min-height</code>, and use skeletons sized like the real thing.
      </p>
      <Callout>
        Open DevTools, throttle to Slow 4G, and reload while you watch. If anything jumps after the
        first paint, you just found a layout shift the fast-connection demo was hiding.
      </Callout>

      <h2 id="answer-the-click">Answer the click</h2>
      <p>
        When someone taps a like, a toggle, a delete — update the UI immediately, then let the
        server catch up. If it fails, roll it back. A 200ms round trip you hide feels instant; a
        200ms spinner feels slow.
      </p>
      <p>
        <code>useOptimistic</code> makes this a few lines in React. The perceived win is bigger than
        any query you could shave.
      </p>
      <p>
        Don’t fake it for things that genuinely fail often, though, like a payment. There, an honest
        pending state beats a success you have to walk back.
      </p>

      <h2 id="ship-less-javascript">Ship less JavaScript</h2>
      <p>
        Every kilobyte of JS gets parsed and run on the main thread — the same thread that answers
        taps. The cheapest speed-up is sending less of it.
      </p>
      <ul>
        <li>Keep components on the server; only interactive leaves ship.</li>
        <li>
          Load heavy widgets like charts and editors with <code>next/dynamic</code>.
        </li>
        <li>
          Trade a 40KB date library for a small helper or the <code>Intl</code> API.
        </li>
      </ul>
      <p>
        LCP under 2.5s, zero shift, instant feedback, a smaller bundle. Do those four and the app
        feels fast — whatever the score says.
      </p>
    </>
  ),
};

export default post;
