import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: "Accessibility from Day One: A Design Engineer's Responsibility",
  excerpt:
    "Accessibility isn't something you bolt on later. It's part of building good software. Learn how to bake a11y into your React components from the start.",
  tagline: 'Accessibility is a default, not an audit.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 26, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'React & Performance',
  content: (
    <>
      <p>
        Most teams find their accessibility bugs in an audit two weeks before launch, then scramble.
        It’s always the same three: a <code>div</code> that should’ve been a <code>button</code>,
        focus you can’t see, tap targets you can’t hit. Bake those in as defaults and the audit finds
        almost nothing.
      </p>

      <h2 id="reach-for-real-tags">Reach for real tags</h2>
      <p>
        The browser hands you focus, keyboard handling, and a role for free — but only if you use the
        right element. A <code>button</code> is focusable, fires on Enter and Space, and announces
        itself. A <code>div</code> with <code>onClick</code> does none of that until you rebuild it
        all by hand.
      </p>
      <p>
        Use <code>button</code> for actions, <code>a</code> for navigation, a <code>label</code>{' '}
        tied to every input, and headings in order. Reach for <code>role</code> and{' '}
        <code>aria-*</code> only when no native element fits.
      </p>
      <p>
        Screen readers narrate this structure — landmarks, headings, roles. A page that reads well as
        a plain outline reads well aloud.
      </p>

      <h2 id="keep-focus-visible">Keep focus visible</h2>
      <p>
        Someone called the focus ring ugly, so <code>outline: none</code> shipped, and now keyboard
        users are lost. <strong>Never remove the ring — restyle it.</strong>
      </p>
      <p>
        Use <code>:focus-visible</code> so it shows for keyboard and pen but not on mouse clicks.
        Give it a solid 2px outline with an offset and at least a 3:1 contrast ratio against the
        background. Being obvious is the whole point.
      </p>
      <p>
        The default browser ring is fine, honestly. The bug is almost always someone deleting it, not
        the ring itself.
      </p>
      <Callout>
        Quick check: click into your app, then hit Tab once. If nothing on screen changes, your
        focus styles are broken — fix that before any <code>aria</code> work.
      </Callout>

      <h2 id="make-targets-bigger">Make targets bigger</h2>
      <p>
        Tiny icon buttons are the top complaint on touch. Give interactive targets at least{' '}
        <code>44px</code> by <code>44px</code> — the number in Apple’s guidelines and WCAG alike.
      </p>
      <p>
        If the glyph is 20px, extend the hit area with padding; don’t shrink the whole control. This
        helps everyone. Thumbs on phones miss small things constantly.
      </p>
      <p>
        Space them out, too. Two 44px buttons jammed edge to edge still cause mis-taps; 8px between
        them fixes it.
      </p>

      <h2 id="test-with-the-keyboard">Test with the keyboard</h2>
      <p>
        You don’t need a full audit to catch most of this. Put the mouse down and Tab through the
        page.
      </p>
      <ul>
        <li>Can you reach every control, in an order that makes sense?</li>
        <li>Can you see where you are the whole way?</li>
        <li>Do Enter and Space activate what you’d expect?</li>
        <li>Can you close a dialog with Escape?</li>
      </ul>
      <p>
        Answer yes to those and you’ve handled what real audits flag. Build it in from day one and
        accessibility stops being a fire drill.
      </p>
    </>
  ),
};

export default post;
