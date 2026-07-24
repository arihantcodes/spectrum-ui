import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'The Psychology of UI: Why Good Engineers Should Study Design Principles',
  excerpt:
    "Understanding why users behave the way they do makes your UI components way better. Here are the design psychology principles every frontend developer should know.",
  tagline: 'Four perception rules you can ship today.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 24, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        You don’t need a psychology degree to build a better dropdown. You need four rules that
        predict how people read, click, and give up. They’re old, they’re boring, and they hold up
        in every usability test. None of this is theory — it’s what shows up every time you watch
        someone struggle. Learn them once and half your interface decisions make themselves.
      </p>

      <h2 id="fewer-choices">Fewer choices, faster clicks</h2>
      <p>
        Hick’s law says the time to make a choice grows with the number of options. A flat list of
        12 nav items isn’t just slower to read — people scan every entry before they commit to one.
        Group them into three sets of four, or tuck the rare ones behind a “More” control. Your
        top-level nav wants five items, not fifteen. Every extra option is a small tax on everyone
        who never wanted it.
      </p>

      <h2 id="big-close-targets">Big targets, close targets</h2>
      <p>
        Fitts’s law: the time to hit something depends on its size and how far the pointer travels.
        So make the primary button large and park it near where the hand already rests. On touch,
        never ship a tap target smaller than <strong>44×44px</strong>. And remember screen edges
        are effectively infinite — the cursor physically can’t overshoot them — which is why bottom
        tab bars and the macOS menu bar feel so effortless to hit.
      </p>

      <h2 id="show-less">Show less, reveal later</h2>
      <p>
        Most settings screens dump every option on you at once. Don’t. Show the fields the common
        case needs and hide the rest behind “Advanced”. A checkout with five visible fields will
        out-convert one with fifteen, even when you collect the exact same data at the end.
        Progressive disclosure isn’t hiding features. It’s <strong>respecting the user’s
        attention</strong>, and the power users still find their toggles one click down.
      </p>

      <Callout>
        Watch one real person use your app, just once. The spot where they hover, squint, and pause
        before clicking is almost always a Hick or Fitts problem — too many options, or a target
        that’s too small or too far. You’ll see it in ten seconds.
      </Callout>

      <h2 id="defaults-decide">Defaults do the deciding</h2>
      <p>
        Here’s the rule that outweighs the other three: most people never change a default. Ship
        with dark mode off and the majority live in light mode forever. Pre-check a box and you
        collect consent nobody meant to give. So treat every default as a decision you’re making on
        the user’s behalf, and choose the honest, common option. <strong>Get the defaults
        right</strong> and Hick, Fitts, and disclosure quietly handle the rest. Design the defaults,
        and you’ve designed most of the experience.
      </p>
    </>
  ),
};

export default post;
