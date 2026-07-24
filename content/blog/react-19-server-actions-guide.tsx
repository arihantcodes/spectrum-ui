import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'React 19 Server Actions: The Complete Guide to Full-Stack React Components',
  excerpt:
    'Master React 19 Server Actions to build full-stack components that handle data mutations, form submissions, and server-side logic without writing API routes.',
  tagline: 'Forms that submit straight to the server.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 22, 2026',
  readTime: '3 min read',
  category: 'Engineering',
  topic: 'React & Performance',
  content: (
    <>
      <p>
        You built an API route, a fetch wrapper, a loading flag, and an error toast — all to save
        one form. React 19 deletes most of that. A Server Action is a function that runs on the
        server and wires straight into your form: no route, no fetch, no client glue.
      </p>

      <h2 id="the-action">The action</h2>
      <p>
        Mark a function with <code>use server</code> and it becomes callable from the client without
        an endpoint. Pass it to a form’s <code>action</code> prop and the browser posts to it
        directly. You read fields off <code>FormData</code>, do the work, and revalidate.
      </p>
      <Code
        filename="app/actions.ts"
        lang="ts"
        code={`"use server";

export async function createTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required" };
  await db.todo.create({ data: { title } });
  revalidatePath("/todos");
}`}
      />
      <p>
        That one file replaces a route handler, a client fetch, and the type you kept in sync between
        them. Delete all three.
      </p>

      <h2 id="state-and-pending">State and pending</h2>
      <p>
        For feedback, wrap the action in <code>useActionState</code>. It hands you the latest return
        value, a wrapped action for the form, and an <code>isPending</code> flag — no{' '}
        <code>useState</code>, no manual try/catch.
      </p>
      <p>
        Return an object with field-level errors and render them next to each input.{' '}
        <strong>One function does the mutation and the messaging.</strong>
      </p>
      <p>
        For a plain submit button, <code>useFormStatus</code> is lighter still. It reads the parent
        form’s pending state, so you can disable the button and swap its label while the action runs.
      </p>

      <h2 id="progressive-enhancement">Progressive enhancement</h2>
      <p>
        Because the action sits on the form’s <code>action</code> prop, the form works before any
        JavaScript loads. Submit early, on a slow phone, with JS disabled — the browser posts, the
        server runs, the page updates.
      </p>
      <p>
        Once React hydrates, that same submit becomes an in-place update with no full reload. You
        wrote it once and got both behaviors free.
      </p>
      <p>
        This matters more than it sounds. The slowest moment for any visitor is that first load,
        before the JavaScript is ready — and that’s exactly when a plain <code>action</code> form
        still works.
      </p>
      <Callout>
        Treat every action as a public endpoint — anyone can post to it. <code>useActionState</code>{' '}
        gives you the form plumbing, not authorization. Check the session and validate input at the
        top of the function, every time.
      </Callout>

      <h2 id="the-rule">The rule</h2>
      <p>
        Client validation is a courtesy. The server is the wall. Validate every field there with
        something like Zod, and confirm auth before you touch the database.
      </p>
      <p>
        Keep each action small — one job per function. Composition beats a 200-line mega-action you
        can’t test in isolation.
      </p>
      <p>
        So: one function, <code>use server</code>, wired to <code>action</code>. Validate on the
        server, return errors as data, let the form degrade gracefully. That’s the whole pattern.
      </p>
    </>
  ),
};

export default post;
