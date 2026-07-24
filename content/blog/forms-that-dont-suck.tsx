import type { BlogPostInput } from '@/lib/blog';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: "Building Forms That Don't Make Users Want to Quit",
  excerpt:
    "Forms are where most users drop off. Here's how to build forms that are easy to fill out, validate properly, and actually feel good to use.",
  tagline: 'Labels up, validate on blur, one column.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 23, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Interface Craft',
  content: (
    <>
      <p>
        Forms are where users quit. Every bit of friction — a label that vanished, an error that
        fires while you&rsquo;re still typing, a layout that zigzags across the page — costs you
        completions. Good forms aren&rsquo;t clever. They&rsquo;re calm, and four rules get you most
        of the way. The good news is that the fixes are boring, and they all work.
      </p>

      <h2 id="keep-labels-visible">Keep labels visible</h2>
      <p>
        Placeholder-as-label is the most common form bug. The moment someone types, the label is
        gone, and now they&rsquo;re guessing which field they&rsquo;re in. Put a real{' '}
        <code>&lt;label&gt;</code> above every input and leave it there. Placeholders are for a
        format hint — <em>you@company.com</em> — not the field name. Tie that <code>&lt;label&gt;</code> to the input with <code>htmlFor</code> so screen readers announce it too, not just sighted users.
      </p>

      <h2 id="validate-on-blur">Validate on blur</h2>
      <p>
        Don&rsquo;t validate on every keystroke. Flagging <em>invalid email</em> while someone is on
        the second character is nagging, not helping. Wait for <code>blur</code> — when they leave
        the field — to run the first check.{' '}
        <strong>Once a field has errored, then re-check on input</strong> so they watch it clear in
        real time.
      </p>

      <h2 id="say-how-to-fix-it">Say how to fix it</h2>
      <p>
        &ldquo;Invalid input&rdquo; tells the user nothing. Error copy has one job: say what&rsquo;s
        wrong and how to fix it. &ldquo;Password needs at least 8 characters&rdquo; beats
        &ldquo;Invalid password&rdquo; every time. Put the message right under the field, don&rsquo;t
        rely on red alone, and never wipe what they already typed.
      </p>

      <h2 id="one-column">One column</h2>
      <p>
        Side-by-side fields make the eye zigzag, and the second column gets skipped. Stack everything
        in a single column so there&rsquo;s one clear path down the page. The one fair exception is
        tightly related pairs — city and state, expiry and CVC — that read as a single unit.
        Everything else goes top to bottom. A single column also keeps the form narrow, which reads faster and drops onto a phone with no rethink.
      </p>
      <Callout>
        Test your form by tabbing through it with the keyboard only. If focus jumps somewhere weird,
        a label doesn&rsquo;t get announced, or you can&rsquo;t reach submit, real users hit the same
        wall — they just leave instead of telling you.
      </Callout>

      <h2 id="ship-it">Ship it</h2>
      <p>
        Labels above, validation on blur, errors that name the fix, one column top to bottom. None
        of it is hard; it&rsquo;s just usually skipped. Fix these four and your completion rate
        climbs before you touch anything fancier.
      </p>
    </>
  ),
};

export default post;
