import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'How to Make Shadcn UI Components Actually Yours',
  excerpt:
    'Shadcn UI gives you great components out of the box, but the magic happens when you customize them. Here is how to make them fit your design without breaking everything.',
  tagline: 'You own the code, so bend it.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 24, 2025',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        shadcn isn’t a dependency you install and forget — it’s{' '}
        <strong>source code that lands in your repo</strong>. That’s the whole point, and it’s also
        why most people under-use it. The trick is knowing
        which layer to change, because the wrong one turns every future update into a merge
        conflict.
      </p>

      <h2 id="re-theme-with-variables">Re-theme with variables</h2>
      <p>
        Before you touch a single component, open <code>globals.css</code>. shadcn wires every color
        and radius to a CSS variable, so re-skinning the whole set is a few lines in one place. Most
        of the “customization” people struggle with is just a theme they never bothered to set.
      </p>
      <p>
        The four tokens worth setting first are <code>--background</code>, <code>--foreground</code>,{' '}
        <code>--primary</code>, and <code>--radius</code>. Change those and every button, card, and
        input updates at once. Because they’re plain custom properties, you can even swap them per
        tenant at runtime.
      </p>

      <h2 id="extend-variants-with-cva">Extend variants with cva</h2>
      <p>
        Each component defines its looks in a{' '}
        <a href="https://github.com/joe-bell/cva" target="_blank" rel="noreferrer">
          cva
        </a>{' '}
        call. To add a new style you don’t fork anything — you add a key.
      </p>
      <Code
        filename="button.tsx"
        lang="tsx"
        code={`const button = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        subtle: "bg-muted text-foreground hover:bg-muted/80",
      },
      size: { sm: "h-8 px-3", md: "h-9 px-4", xl: "h-12 px-8 text-base" },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);`}
      />
      <p>
        That adds a <code>subtle</code> variant and an <code>xl</code> size in place. cva merges them
        with the defaults and TypeScript infers the new props, so a <code>subtle</code> extra-large
        button is fully type-checked with zero new files.
      </p>
      <p>
        Need another intent later? Add one more key — the pattern scales without touching call
        sites, and every existing button keeps working.
      </p>

      <h2 id="wrap-dont-rewrite">Wrap, don’t rewrite</h2>
      <p>
        For app-specific behavior — say a submit button that shows a spinner while a form is pending
        — don’t edit the primitive. Wrap it instead.
      </p>
      <p>
        Build a <code>SubmitButton</code> that renders shadcn’s <code>Button</code> inside and owns
        the loading logic. The primitive stays pristine, so your next <code>npx shadcn add</code> run
        merges cleanly instead of overwriting hand edits.
      </p>
      <p>
        The same move works for composition — bundle a <code>Card</code>, its header, and a default
        action into one <code>AppCard</code> your team imports everywhere.
      </p>
      <Callout>
        Treat everything in <code>components/ui</code> as vendored code you don’t hand-edit. Keep
        your own components one folder up, and every shadcn upgrade stays a small, reviewable diff.
      </Callout>

      <h2 id="when-to-fork">When to fork</h2>
      <p>
        Fork only when you’re fighting the structure itself — a different root element, different
        internals, or accessibility wiring the primitive doesn’t expose. That’s genuinely rare. When
        you do, copy the file, rename it, and note why in a comment.
      </p>
      <p>
        The rule: re-theme with variables, extend with cva, wrap for behavior, and{' '}
        <strong>fork only as a last resort</strong>. Follow that order and most of your customization
        never touches the original component.
      </p>
    </>
  ),
};

export default post;
