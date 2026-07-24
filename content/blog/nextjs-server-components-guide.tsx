import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Next.js Server Components: The Game-Changer You Need to Know About',
  excerpt:
    'Server Components are changing everything about how we build React apps. Here is how to use them properly and why they are so much better than the old way.',
  tagline: 'Server by default, client where you must.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 23, 2025',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'React & Performance',
  content: (
    <>
      <p>
        You add <code>use client</code> to silence a hook error, and suddenly half your app is
        shipping to the browser. That’s the trap almost everyone hits with Server Components. The
        fix isn’t a new API — it’s a new default in your head: the server renders, the client only
        reacts.
      </p>

      <h2 id="server-by-default">Server by default</h2>
      <p>
        In the App Router, every component is a Server Component until you say otherwise. It runs
        once, on the server, and ships <strong>zero JavaScript</strong> to the user.
      </p>
      <p>
        You get a direct line to your database and secrets that never touch the client. Most of your
        tree should live here — layouts, pages, anything that just reads data and prints markup.
      </p>
      <p>
        Because it renders once and then disappears, there’s no re-render, no effect cleanup, nothing
        to hydrate. The HTML arrives finished.
      </p>

      <h2 id="client-islands">Client islands</h2>
      <p>
        Reach for <code>use client</code> only when a component needs state, an effect, an event
        handler, or a browser API. Picture those as small islands in a server-rendered sea. A button
        with <code>onClick</code>, a form with local state, a widget that reads <code>window</code> —
        each is its own leaf.
      </p>
      <p>
        Here’s the one that bites everyone. You drop <code>use client</code> at the top of a page so
        a single dropdown works, and now the page <em>plus everything it imports</em> ships to the
        browser. Push the directive down to the smallest component that truly needs it.
      </p>
      <p>
        The cost is cumulative. A client component drags in its imports, and their imports, all the
        way down. That’s the difference between a 40KB page and a 300KB one.
      </p>

      <h2 id="where-data-lives">Where data lives</h2>
      <p>
        Fetch data in Server Components, right where it renders. Write an <code>async</code>{' '}
        function, <code>await</code> the query, return JSX — no <code>useEffect</code>, no loading
        flag, no client-side waterfall. Then pass the result down as props.
      </p>
      <p>
        Need the same data in two components? Fetch it in both. React dedupes identical requests
        within a render, so there’s no context or prop-drilling to wire up.
      </p>
      <Code
        filename="app/post/page.tsx"
        lang="tsx"
        code={`// Server Component — no directive needed
import { LikeButton } from "./like-button";

export default async function Page() {
  const post = await db.post.find(id); // runs on the server
  return <LikeButton postId={post.id} likes={post.likes} />;
}`}
      />
      <Callout>
        You can’t pass a function from a Server to a Client Component — props must be serializable.
        Need a mutation? Hand the island a <code>Server Action</code>, or keep the handler inside the
        island and pass it plain data.
      </Callout>

      <h2 id="the-rule">The rule</h2>
      <p>
        Start every component on the server. Add <code>use client</code> only when the build forces
        you, and add it to the leaf, not the layout.
      </p>
      <p>
        If a component just displays props, it stays put. When you’re unsure, ask one question: does
        this need to run in the browser? If the honest answer is no, it belongs on the server.
      </p>
      <p>
        Get that one reflex right and your bundle shrinks without you thinking about it.
      </p>
    </>
  ),
};

export default post;
