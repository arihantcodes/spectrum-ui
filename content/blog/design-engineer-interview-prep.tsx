import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';

const post: BlogPostInput = {
  title: 'How to Prepare for a Design Engineer Interview',
  excerpt:
    "Design engineer interviews are different from regular frontend interviews. Here's what to expect and how to prepare for each stage.",
  tagline: 'Build live, talk tradeoffs, show details.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 29, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Workflow & Career',
  content: (
    <>
      <p>
        A design engineer interview isn’t a LeetCode grind, and it isn’t a pure design crit. It’s
        someone watching how you turn a vague request into a real, accessible component in
        forty-five minutes. Three things decide the outcome, and none of them is memorized syntax.
      </p>

      <h2 id="build-something-live">Build something live</h2>
      <p>
        You’ll get a prompt like “build a button with a loading state” and an empty file. They
        aren’t looking for clever code. They want a component that handles{' '}
        <strong>the states real buttons actually have</strong>: default, disabled, loading, and
        focus.
      </p>
      <Code
        filename="Button.tsx"
        lang="tsx"
        code={`type Props = React.ComponentProps<'button'> & { loading?: boolean };
export function Button({ loading, disabled, children, ...props }: Props) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}`}
      />
      <p>
        The detail that lands: disabling on <code>loading</code>, an <code>aria-busy</code> flag,
        and spreading the native props so the thing stays a drop-in. That small stuff is the entire
        signal.
      </p>

      <h2 id="narrate-your-tradeoffs">Narrate your tradeoffs</h2>
      <p>
        Silence reads as luck. Say the why out loud as you type: “I’m spreading props so this stays
        a drop-in for a native button.” “I’d reach for <code>cva</code> here if we had five variants,
        but that’s overkill for one.” <strong>Naming the option you didn’t take</strong> is what
        separates senior from mid-level, more than the code itself.
      </p>

      <h2 id="bring-a-details-portfolio">Bring a details portfolio</h2>
      <p>
        Skip the case-study novels nobody reads. Bring{' '}
        <strong>three interactions you can open in a browser</strong> right there: a menu that traps
        focus, a form that validates on blur, a transition that respects{' '}
        <code>prefers-reduced-motion</code>. Talk about the bug you fought and fixed, not the Figma
        file you were handed.
      </p>

      <h2 id="practice-this-week">Practice this week</h2>
      <p>
        Set a timer for forty-five minutes and build one component from a one-line prompt, out loud,
        into an empty file. Record your screen and voice. Watch it back once. You’ll hear every
        place you went quiet or skipped a state, and that’s your prep list for the real thing.
      </p>
    </>
  ),
};

export default post;
