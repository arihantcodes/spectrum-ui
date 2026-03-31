import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "React 19 Server Actions: The Complete Guide to Full-Stack React Components",
  excerpt:
    "Master React 19 Server Actions to build full-stack components that handle data mutations, form submissions, and server-side logic without writing API routes.",
  author: {
    name: "Arihant Jain",
    role: "Engineering",
    avatar: "/arihant.jpeg",
  },
  date: "Mar 22, 2026",
  readTime: "20 min read",
  icon: "⚛️",
  category: "Engineering",
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Introduction: The Biggest Paradigm Shift Since Hooks
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        React 19 is here, and with it comes the most significant change to how we build React applications since the introduction of hooks in React 16.8. Server Actions fundamentally redefine the relationship between your frontend and backend code. They let you write server-side functions that can be called directly from your React components, eliminating the need for a separate API layer, manual fetch calls, and the endless boilerplate that comes with traditional client-server communication.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For years, React developers have followed the same pattern: build your UI in React, create API routes on the backend, wire them together with fetch or a library like Axios, manage loading states with useState, handle errors manually, and hope nothing falls out of sync. Server Actions throw all of that away. Instead, you write a function, mark it with <code>&quot;use server&quot;</code>, and call it from your component. React handles the network request, serialization, error handling, and revalidation automatically. It&apos;s the closest thing to magic that React has ever shipped.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This guide is comprehensive. We&apos;ll cover everything from the basics of what Server Actions are and how they work under the hood, to advanced patterns like optimistic updates, composing multiple actions, integrating with form libraries, and securing your mutations. Whether you&apos;re just starting with React 19 or you&apos;re migrating an existing application, this guide will give you the patterns and knowledge you need to build full-stack React components with confidence. Let&apos;s dive in.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Traditional API Routes vs. Server Actions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before we get into the details, let&apos;s visualize the fundamental difference between the old way and the new way. Understanding this architectural shift is critical to appreciating why Server Actions are such a big deal.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Traditional React + API Routes Data Flow:

┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  ┌──────────────┐   fetch("/api/posts", {    ┌──────────────┐  │
│  │  React       │   method: "POST",          │  Loading...  │  │
│  │  Component   │──────────────────────────▶  │  useState()  │  │
│  │  (form)      │   body: JSON.stringify()    │  useEffect() │  │
│  └──────────────┘                             └──────┬───────┘  │
│                                                      │          │
└──────────────────────────────────────────────────────┼──────────┘
                                                       │
                      HTTP Request (JSON)              │
                                                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SERVER (Node.js)                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  /api/posts/route.ts                                     │    │
│  │                                                          │    │
│  │  export async function POST(req: Request) {              │    │
│  │    const body = await req.json()                         │    │
│  │    // validate, sanitize, authorize...                   │    │
│  │    const post = await db.post.create({ data: body })     │    │
│  │    return NextResponse.json(post)                        │    │
│  │  }                                                       │    │
│  └──────────────────────────────────────┬───────────────────┘    │
│                                         │                        │
│                                         ▼                        │
│                                  ┌──────────────┐                │
│                                  │   Database    │                │
│                                  └──────────────┘                │
└──────────────────────────────────────────────────────────────────┘

Steps: Component ▶ useState ▶ fetch() ▶ API Route ▶ DB ▶ Response ▶ setState
Files: component.tsx + route.ts + types.ts + validation.ts
Lines of code: ~80-120 for a simple form submission


═══════════════════════════════════════════════════════════════════


React 19 Server Actions Data Flow:

┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  ┌──────────────────────────────────┐                           │
│  │  React Component (form)          │                           │
│  │                                  │                           │
│  │  <form action={createPost}>      │                           │
│  │    <input name="title" />        │──── React handles ────▶   │
│  │    <button>Submit</button>       │     the RPC call          │
│  │  </form>                         │     automatically         │
│  └──────────────────────────────────┘                           │
│                                                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    Automatic RPC (not manual fetch)
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER (Node.js)                         │
│                                                                 │
│  ┌──────────────────────────────────┐                           │
│  │  "use server"                    │                           │
│  │                                  │                           │
│  │  async function createPost(      │     ┌──────────────┐     │
│  │    formData: FormData            │────▶│   Database    │     │
│  │  ) {                             │     └──────────────┘     │
│  │    await db.post.create(...)     │                           │
│  │    revalidatePath("/posts")      │── Automatic cache ──▶     │
│  │  }                               │   invalidation            │
│  └──────────────────────────────────┘                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Steps: Component ▶ Server Action ▶ DB ▶ Revalidation (automatic)
Files: component.tsx + actions.ts
Lines of code: ~25-35 for a simple form submission`}
        </pre>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The difference is dramatic. With the traditional approach, you need to manage the full network lifecycle yourself: constructing requests, parsing responses, handling loading and error states, and manually refetching or invalidating stale data. With Server Actions, React abstracts the entire network layer. You write a function, call it, and React does the rest. The result is fewer files, fewer lines of code, fewer bugs, and a significantly better developer experience.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Are Server Actions?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions are asynchronous functions that run exclusively on the server. They are defined using the <code>&quot;use server&quot;</code> directive, which tells React and your bundler that this function should never be included in the client-side JavaScript bundle. When a client component calls a Server Action, React automatically creates an HTTP POST request under the hood, sends the arguments to the server, executes the function, and returns the result. It&apos;s essentially an RPC (Remote Procedure Call) mechanism built directly into React.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>&quot;use server&quot;</code> directive can be placed in two locations. First, at the top of a file, which marks every exported function in that file as a Server Action. Second, at the top of an individual async function body inside a server component, which makes that specific function a Server Action. The first approach is more common for organizing your actions into dedicated files, while the second is useful for quick, inline mutations.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Under the hood, when React encounters a Server Action reference in your client code, it replaces it with a special reference ID. When the action is invoked, React serializes the arguments using a format similar to JSON (but with support for FormData, Dates, and other types), sends them to the server via a POST request to a special endpoint, deserializes them on the server, executes the function, serializes the return value, and sends it back to the client. All of this happens transparently. You never see the network request in your code.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Importantly, Server Actions are deeply integrated with React&apos;s rendering model. After a Server Action completes, React can automatically re-render the affected parts of the page with fresh data from the server. This is what makes <code>revalidatePath</code> and <code>revalidateTag</code> so powerful. You mutate data and React updates the UI in one smooth flow.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The React 19 Rendering Architecture
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        To fully understand Server Actions, you need to see how they fit into the broader React 19 architecture. Server Components, Client Components, and Server Actions work together as three pillars of the full-stack React model.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`React 19 Full-Stack Architecture:

┌─────────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                                │
│                                                                     │
│  ┌─────────────────────┐    ┌────────────────────────────────────┐  │
│  │  Server Components   │    │  Server Actions                    │  │
│  │  (RSC)               │    │  ("use server")                    │  │
│  │                      │    │                                    │  │
│  │  • Render on server  │    │  • Handle mutations                │  │
│  │  • Fetch data        │    │  • Process forms                   │  │
│  │  • Access DB/APIs    │    │  • Validate input                  │  │
│  │  • Zero client JS    │    │  • Update database                 │  │
│  │  • Stream HTML       │    │  • Revalidate cache                │  │
│  │                      │    │  • Redirect after mutation         │  │
│  └──────────┬───────────┘    └──────────────▲─────────────────────┘  │
│             │ renders                        │ called by              │
│             │ HTML + RSC payload             │ client components      │
│             │                                │                        │
└─────────────┼────────────────────────────────┼────────────────────────┘
              │                                │
              ▼                                │
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Client Components ("use client")                            │   │
│  │                                                              │   │
│  │  • useState, useEffect, useRef                               │   │
│  │  • onClick, onChange, onSubmit handlers                       │   │
│  │  • useFormStatus (pending state for forms)                   │   │
│  │  • useActionState (form state + server action)               │   │
│  │  • useOptimistic (instant UI updates)                        │   │
│  │  • Browser APIs (localStorage, etc.)                         │   │
│  │                                                              │   │
│  │  Can CALL Server Actions ──────────────────────────────▶     │   │
│  │  Can RECEIVE data from Server Components via props           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

Data Flow:
  READ:   Server Component ──(fetch)──▶ Database ──(render)──▶ HTML
  WRITE:  Client Component ──(call)──▶ Server Action ──(mutate)──▶ Database
  UPDATE: Server Action ──(revalidate)──▶ Server Component re-renders`}
        </pre>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This architecture creates a clean separation of concerns. Server Components handle <strong>reading</strong> data and rendering. Server Actions handle <strong>writing</strong> data and mutations. Client Components handle <strong>interactivity</strong> and user input. Together, they form a complete full-stack framework where every piece has a clear role.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Getting Started with Server Actions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let&apos;s start from the ground up. If you&apos;re using Next.js 14 or later with the App Router, Server Actions are available out of the box. No additional configuration is needed. React 19 support is baked in, and the <code>&quot;use server&quot;</code> directive just works.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Your First Server Action
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The simplest way to create a Server Action is to define it in a separate file with the <code>&quot;use server&quot;</code> directive at the top. Every exported async function in that file becomes a Server Action that can be imported and used in any component.
      </p>

      <CodeBlock
        filename="app/actions.ts"
        language="typescript"
        code={`"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required")
  }

  await db.todo.create({
    data: {
      title: title.trim(),
      completed: false,
    },
  })

  revalidatePath("/todos")
}

export async function toggleTodo(id: string) {
  const todo = await db.todo.findUnique({ where: { id } })

  if (!todo) {
    throw new Error("Todo not found")
  }

  await db.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  })

  revalidatePath("/todos")
}

export async function deleteTodo(id: string) {
  await db.todo.delete({ where: { id } })
  revalidatePath("/todos")
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Inline vs. Module-Level Server Actions
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        There are two ways to define Server Actions. Module-level actions, as shown above, place <code>&quot;use server&quot;</code> at the top of a file. This is the recommended approach for most cases because it keeps your actions organized and reusable. Inline actions place the directive inside a function body within a server component. This is convenient for one-off mutations but can become messy as your application grows.
      </p>

      <CodeBlock
        filename="app/todos/page.tsx"
        language="tsx"
        code={`// Inline Server Action (defined inside a Server Component)
export default async function TodosPage() {
  const todos = await db.todo.findMany()

  // This is an inline Server Action
  async function addTodo(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    await db.todo.create({ data: { title, completed: false } })
    revalidatePath("/todos")
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Todos</h1>

      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          name="title"
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Best practice: Use module-level actions in app/actions.ts
// for reusability and better code organization`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The module-level approach is generally preferred because it keeps your actions in a central location, makes them easy to import across multiple components, and keeps your page components clean and focused on rendering. Use inline actions only for simple, one-off mutations that are tightly coupled to a specific page.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Form Handling with Server Actions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions truly shine when it comes to form handling. In the old world, you needed an onSubmit handler, event.preventDefault(), a fetch call, error handling, and loading state management. With Server Actions, you pass the action to the form&apos;s <code>action</code> prop and let React handle everything. The form even works without JavaScript enabled, which is called progressive enhancement.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Using useFormStatus for Loading States
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When a Server Action is executing, you want to show users that something is happening. The <code>useFormStatus</code> hook gives you access to the pending state of the parent form. It must be used inside a component that is rendered within a <code>&lt;form&gt;</code> element. This is one of the most useful new hooks in React 19.
      </p>

      <CodeBlock
        filename="components/submit-button.tsx"
        language="tsx"
        code={`"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

// Usage in a Server Component page:
// import { SubmitButton } from "@/components/submit-button"
// import { createPost } from "@/app/actions"
//
// export default function NewPostPage() {
//   return (
//     <form action={createPost} className="space-y-4">
//       <input name="title" required />
//       <textarea name="content" required />
//       <SubmitButton>Create Post</SubmitButton>
//     </form>
//   )
// }`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Using useActionState for Form State Management
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>useActionState</code> hook (formerly <code>useFormState</code>) is the most powerful hook for Server Action forms. It lets you track the return value of your Server Action, giving you a way to display success messages, validation errors, or any other state that comes back from the server. This is the pattern you&apos;ll use most often in production applications.
      </p>

      <CodeBlock
        filename="app/contact/contact-form.tsx"
        language="tsx"
        code={`"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { sendMessage } from "@/app/actions"

type FormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    body?: string[]
  }
}

const initialState: FormState = {
  success: false,
  message: "",
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    initialState
  )

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      {state.message && (
        <div
          className={\`p-3 rounded-md text-sm \${
            state.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }\`}
        >
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Message</Label>
        <Textarea id="body" name="body" rows={5} required />
        {state.errors?.body && (
          <p className="text-sm text-red-500">{state.errors.body[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Validation with Zod + Server Actions
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server-side validation is critical. Never trust client-side validation alone. Combining Zod with Server Actions gives you type-safe, declarative validation that runs on the server. Here&apos;s the pattern you should use for every Server Action that accepts user input.
      </p>

      <CodeBlock
        filename="app/actions.ts"
        language="typescript"
        code={`"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  body: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters"),
})

type FormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    body?: string[]
  }
}

export async function sendMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    body: formData.get("body"),
  }

  const validated = ContactSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validated.error.flatten().fieldErrors,
    }
  }

  try {
    await db.message.create({
      data: validated.data,
    })

    revalidatePath("/contact")

    return {
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}`}
      />

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Notice how the Server Action takes <code>prevState</code> as its first argument when used with <code>useActionState</code>. This is the previous state returned by the action, which React passes automatically. The function returns a new state object that includes success or error information, which the client component then uses to update the UI. This pattern gives you full control over form feedback without any manual fetch calls.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Server Action Execution Lifecycle
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Understanding the full lifecycle of a Server Action call helps you debug issues and write more effective code. Here&apos;s what happens from the moment a user submits a form to when the UI updates.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Server Action Execution Lifecycle:

  User submits form / calls action
            │
            ▼
  ┌─────────────────────────────┐
  │  1. SERIALIZE ARGUMENTS     │
  │                             │
  │  React serializes FormData  │
  │  or function arguments      │
  │  into a POST request body   │
  └──────────────┬──────────────┘
                 │
                 ▼
  ┌─────────────────────────────┐
  │  2. PENDING STATE           │
  │                             │
  │  useFormStatus → pending    │
  │  useActionState → isPending │
  │  useOptimistic → applied    │
  │                             │
  │  UI shows loading state     │
  └──────────────┬──────────────┘
                 │
                 ▼  HTTP POST to server
  ┌─────────────────────────────┐
  │  3. SERVER EXECUTION        │
  │                             │
  │  Arguments deserialized     │
  │  Function body executes     │
  │  DB queries, API calls,     │
  │  validation, etc.           │
  └──────────────┬──────────────┘
                 │
            ┌────┴────┐
            ▼         ▼
     ┌───────────┐  ┌─────────────────┐
     │  SUCCESS   │  │  ERROR           │
     │            │  │                  │
     │  Return    │  │  Throw error or  │
     │  value     │  │  return error    │
     │  sent to   │  │  state to client │
     │  client    │  │                  │
     └─────┬─────┘  └────────┬────────┘
           │                  │
           └────────┬─────────┘
                    │
                    ▼
  ┌─────────────────────────────┐
  │  4. REVALIDATION            │
  │                             │
  │  revalidatePath() or        │
  │  revalidateTag() triggers   │
  │  React to re-fetch and      │
  │  re-render affected server  │
  │  components with fresh data │
  └──────────────┬──────────────┘
                 │
                 ▼
  ┌─────────────────────────────┐
  │  5. UI UPDATE               │
  │                             │
  │  Pending state clears       │
  │  New server data renders    │
  │  Optimistic updates resolve │
  │  Error messages display     │
  │  redirect() navigates       │
  └─────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Advanced Patterns
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Now that you understand the basics, let&apos;s explore the advanced patterns that will make your applications feel polished and professional. These patterns are what separate a simple demo from a production-ready application.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Optimistic Updates with useOptimistic
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Optimistic updates make your app feel instant. Instead of waiting for the server to confirm a change, you update the UI immediately and let the server catch up in the background. If the server action fails, React automatically reverts the optimistic update. This pattern is essential for interactions that need to feel fast, like toggling a favorite, liking a post, or updating a status.
      </p>

      <CodeBlock
        filename="components/todo-list.tsx"
        language="tsx"
        code={`"use client"

import { useOptimistic, useTransition } from "react"
import { toggleTodo, deleteTodo } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Trash2, Check, Circle } from "lucide-react"

type Todo = {
  id: string
  title: string
  completed: boolean
}

type OptimisticAction =
  | { type: "toggle"; id: string }
  | { type: "delete"; id: string }

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state: Todo[], action: OptimisticAction) => {
      switch (action.type) {
        case "toggle":
          return state.map((todo) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        case "delete":
          return state.filter((todo) => todo.id !== action.id)
        default:
          return state
      }
    }
  )

  const [, startTransition] = useTransition()

  function handleToggle(id: string) {
    startTransition(async () => {
      addOptimistic({ type: "toggle", id })
      await toggleTodo(id)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      addOptimistic({ type: "delete", id })
      await deleteTodo(id)
    })
  }

  return (
    <ul className="space-y-2">
      {optimisticTodos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <button
            onClick={() => handleToggle(todo.id)}
            className="flex items-center gap-2"
          >
            {todo.completed ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
              {todo.title}
            </span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(todo.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Revalidating Cached Data
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        After a Server Action mutates data, you need to tell React which parts of the cache are stale. There are two main strategies: <code>revalidatePath</code> for invalidating all data associated with a URL path, and <code>revalidateTag</code> for invalidating specific tagged fetch requests. Path-based revalidation is simpler but less granular, while tag-based revalidation gives you precise control over exactly which data gets refreshed.
      </p>

      <CodeBlock
        filename="app/actions.ts"
        language="typescript"
        code={`"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

// Path-based revalidation: refreshes ALL data on the path
export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string
  const bio = formData.get("bio") as string

  await db.user.update({
    where: { id: getCurrentUserId() },
    data: { name, bio },
  })

  // Revalidate the profile page and any page that shows user data
  revalidatePath("/profile")
  revalidatePath("/dashboard")
}

// Tag-based revalidation: refreshes only specific cached data
export async function publishPost(postId: string) {
  await db.post.update({
    where: { id: postId },
    data: { status: "published", publishedAt: new Date() },
  })

  // Only revalidate data tagged with "posts" - more precise
  revalidateTag("posts")
  revalidateTag(\`post-\${postId}\`)

  redirect(\`/blog/\${postId}\`)
}

// Using tags with fetch in Server Components:
// async function getPosts() {
//   const res = await fetch("https://api.example.com/posts", {
//     next: { tags: ["posts"] }
//   })
//   return res.json()
// }

// Revalidate everything on a layout level
export async function clearAllCache() {
  revalidatePath("/", "layout")
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Error Handling and Error Boundaries
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Robust error handling is critical for production applications. Server Actions can fail for many reasons: database errors, network issues, validation failures, or permission denials. There are two approaches to error handling. The first is returning error state (recommended for form validation errors). The second is throwing errors (for unexpected failures that should be caught by error boundaries).
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When a Server Action throws an error, React will propagate it to the nearest <code>error.tsx</code> error boundary in Next.js. This is useful for unexpected errors that you don&apos;t want to handle inline. For expected errors like validation failures, return an error state object instead. This gives you more control over how the error is displayed and allows the form to remain interactive.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Composing Multiple Server Actions
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Real-world applications often need to perform multiple mutations in a single workflow. For example, creating an order might involve validating inventory, processing payment, creating the order record, and sending a confirmation email. You can compose these operations within a single Server Action, or call multiple actions sequentially from the client.
      </p>

      <CodeBlock
        filename="app/actions/order.ts"
        language="typescript"
        code={`"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { sendEmail } from "@/lib/email"

const OrderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(100),
  shippingAddressId: z.string().uuid(),
})

export async function createOrder(formData: FormData) {
  // Step 1: Authenticate
  const session = await auth()
  if (!session?.user) {
    throw new Error("You must be logged in to place an order")
  }

  // Step 2: Validate input
  const validated = OrderSchema.safeParse({
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
    shippingAddressId: formData.get("shippingAddressId"),
  })

  if (!validated.success) {
    return { success: false, message: "Invalid order data" }
  }

  // Step 3: Check inventory
  const product = await db.product.findUnique({
    where: { id: validated.data.productId },
  })

  if (!product || product.stock < validated.data.quantity) {
    return { success: false, message: "Insufficient stock" }
  }

  // Step 4: Process payment
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price * validated.data.quantity,
    currency: "usd",
    customer: session.user.stripeCustomerId,
  })

  // Step 5: Create order record
  const order = await db.order.create({
    data: {
      userId: session.user.id,
      productId: validated.data.productId,
      quantity: validated.data.quantity,
      total: product.price * validated.data.quantity,
      paymentIntentId: paymentIntent.id,
      shippingAddressId: validated.data.shippingAddressId,
    },
  })

  // Step 6: Update inventory
  await db.product.update({
    where: { id: validated.data.productId },
    data: { stock: { decrement: validated.data.quantity } },
  })

  // Step 7: Send confirmation email (non-blocking)
  sendEmail({
    to: session.user.email,
    subject: "Order Confirmed",
    template: "order-confirmation",
    data: { orderId: order.id },
  }).catch(console.error) // Fire and forget

  // Step 8: Revalidate and redirect
  revalidatePath("/orders")
  revalidatePath(\`/products/\${validated.data.productId}\`)
  redirect(\`/orders/\${order.id}\`)
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Server Actions with shadcn/ui Form Components
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using shadcn/ui with React Hook Form, you can still use Server Actions. The key is to call the Server Action inside the form&apos;s onSubmit handler rather than passing it directly to the form action prop. This gives you the best of both worlds: client-side validation with React Hook Form and server-side execution with Server Actions.
      </p>

      <CodeBlock
        filename="components/profile-form.tsx"
        language="tsx"
        code={`"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { updateProfile } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm({ defaultValues }: { defaultValues: ProfileFormValues }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.set("name", data.name)
    formData.set("email", data.email)
    if (data.bio) formData.set("bio", data.bio)

    try {
      await updateProfile(formData)
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Security Considerations
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions are server-side functions that are exposed as public HTTP endpoints. This is a critical point that many developers overlook. Even though they look like regular functions in your code, anyone can call them with crafted payloads. You must treat every Server Action as a public API endpoint and secure it accordingly.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li><strong>Always validate input:</strong> Never trust data from the client. Use Zod or a similar library to validate every argument before processing it. Check types, lengths, formats, and ranges.</li>
        <li><strong>Always check authentication:</strong> Verify the user is logged in at the beginning of every Server Action that requires it. Do not rely on the calling component to check authentication. The Server Action itself must verify the session.</li>
        <li><strong>Always check authorization:</strong> Just because a user is logged in does not mean they can perform any action. Verify that the current user has permission to perform the specific operation on the specific resource. For example, check that the user owns the post they are trying to delete.</li>
        <li><strong>CSRF protection is built-in:</strong> React Server Actions automatically include CSRF tokens, so you do not need to implement CSRF protection yourself. This is one of the major security advantages over manual API routes.</li>
        <li><strong>Rate limiting:</strong> Implement rate limiting on sensitive actions like login attempts, email sending, and payment processing. You can use middleware or a library like <code>@upstash/ratelimit</code> to prevent abuse.</li>
        <li><strong>Sanitize output:</strong> If your Server Action returns data that will be displayed in the UI, make sure it is properly sanitized to prevent XSS attacks. React handles this for most cases, but be careful with dangerouslySetInnerHTML.</li>
        <li><strong>Never expose secrets:</strong> Server Actions run on the server, so you can safely use environment variables and secrets. However, make sure you never include sensitive data in the return value that gets sent to the client.</li>
      </ul>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Security Layers in a Server Action:

  ┌─────────────────────────────────────────────────────────┐
  │                   INCOMING REQUEST                       │
  │              (from client component)                     │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 1: CSRF VERIFICATION                              │
  │  (Automatic - handled by React)                          │
  │  ✓ Validates origin header                               │
  │  ✓ Checks CSRF token                                     │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 2: RATE LIMITING                                  │
  │  (Your responsibility)                                   │
  │  ✓ Check request frequency per IP/user                   │
  │  ✓ Return 429 if limit exceeded                          │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 3: AUTHENTICATION                                 │
  │  (Your responsibility)                                   │
  │  ✓ Verify session/JWT token                              │
  │  ✓ Reject if not authenticated                           │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 4: INPUT VALIDATION                               │
  │  (Your responsibility - use Zod)                         │
  │  ✓ Validate types, formats, lengths                      │
  │  ✓ Sanitize strings                                      │
  │  ✓ Return field-level errors                             │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 5: AUTHORIZATION                                  │
  │  (Your responsibility)                                   │
  │  ✓ Check user has permission for this action             │
  │  ✓ Verify ownership of the resource                      │
  │  ✓ Check role-based access control                       │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  Layer 6: BUSINESS LOGIC                                 │
  │  (Safe zone - input is validated and user is authorized) │
  │  ✓ Database mutations                                    │
  │  ✓ External API calls                                    │
  │  ✓ Cache revalidation                                    │
  └─────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Performance Patterns
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions are fast by default because they eliminate the client-side fetch overhead, but there are patterns you can use to make them even faster and to avoid common performance pitfalls.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Streaming and Progressive Enhancement
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the most underappreciated features of Server Actions with forms is progressive enhancement. When you pass a Server Action to a form&apos;s <code>action</code> prop, the form works even if JavaScript hasn&apos;t loaded yet or is disabled. The browser submits the form as a standard POST request, the Server Action runs, and the page is refreshed with the new data. Once JavaScript hydrates, React takes over and the form submissions become seamless SPA-style navigations with no page refresh. This means your forms are functional from the very first moment the HTML arrives.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Parallel Mutations
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you need to perform multiple independent mutations, run them in parallel with <code>Promise.all</code> instead of sequentially. This reduces the total time your users wait for the action to complete. Be careful with this pattern though. If one mutation fails, you may need to roll back the others, which adds complexity. Only use parallel mutations when the operations are truly independent.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Reducing Waterfalls
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A common mistake is chaining Server Action calls sequentially when they could be parallelized or combined. If your component calls three Server Actions one after another, each waiting for the previous to complete, you&apos;re creating a waterfall. Instead, combine related mutations into a single Server Action, or use <code>Promise.all</code> on the client side to run independent actions concurrently. This can cut your total mutation time by 50-70% in many cases.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Another performance tip is to be strategic about what you revalidate. Calling <code>revalidatePath(&quot;/&quot;, &quot;layout&quot;)</code> revalidates your entire application. That&apos;s almost never what you want. Instead, revalidate only the specific paths or tags that are affected by your mutation. This keeps revalidation fast and avoids unnecessary re-renders across your application.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Migration Guide: From API Routes to Server Actions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you have an existing Next.js application using API routes for mutations, migrating to Server Actions is straightforward. Here&apos;s a step-by-step approach that minimizes risk and lets you migrate incrementally.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-base text-neutral-800 dark:text-neutral-200">
        <li><strong>Step 1: Identify mutation endpoints.</strong> Look through your <code>/api</code> directory for POST, PUT, PATCH, and DELETE handlers. These are the candidates for migration. GET endpoints that only read data should be replaced with Server Component data fetching instead.</li>
        <li><strong>Step 2: Create an actions file.</strong> Create <code>app/actions.ts</code> (or a directory like <code>app/actions/</code>) and add the <code>&quot;use server&quot;</code> directive at the top. Move the business logic from each API route into an exported async function.</li>
        <li><strong>Step 3: Update the signature.</strong> API routes receive a <code>Request</code> object. Server Actions receive either <code>FormData</code> (when used with forms) or direct arguments (when called programmatically). Update the function signatures accordingly. If you use <code>useActionState</code>, remember to add <code>prevState</code> as the first parameter.</li>
        <li><strong>Step 4: Replace fetch calls.</strong> In your client components, replace <code>fetch(&quot;/api/...&quot;)</code> calls with direct Server Action imports. Replace manual loading state management with <code>useFormStatus</code> or <code>useActionState</code>.</li>
        <li><strong>Step 5: Add revalidation.</strong> Replace manual cache invalidation or SWR mutate calls with <code>revalidatePath</code> or <code>revalidateTag</code> at the end of your Server Actions.</li>
        <li><strong>Step 6: Delete the API route.</strong> Once the Server Action is working and tested, delete the old API route file. Make sure no other parts of your application or external services depend on that endpoint before removing it.</li>
        <li><strong>Step 7: Keep API routes for external consumers.</strong> If your API endpoints are consumed by mobile apps, third-party integrations, or webhooks, keep them as API routes. Server Actions are only for your React frontend. External consumers still need traditional REST or GraphQL endpoints.</li>
      </ul>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You do not need to migrate everything at once. Server Actions and API routes coexist perfectly. Start with the simplest form submission in your application, migrate it to a Server Action, verify it works, and then move on to the next one. This incremental approach reduces risk and lets your team build confidence with the new pattern before tackling more complex migrations.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Conclusion and Best Practices Checklist
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions represent a fundamental shift in how we build full-stack React applications. They eliminate the API layer for internal mutations, reduce boilerplate by an order of magnitude, and integrate deeply with React&apos;s rendering and caching model. The combination of Server Components for reading data and Server Actions for writing data creates a cohesive full-stack architecture that is simpler, faster, and more secure than the traditional API route approach.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here is a checklist of best practices to follow as you adopt Server Actions in your applications:
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Use module-level <code>&quot;use server&quot;</code> files to organize your actions. Keep them in a dedicated <code>actions.ts</code> or <code>actions/</code> directory.</li>
          <li>Always validate input with Zod or a similar library. Never trust client data.</li>
          <li>Always check authentication and authorization at the top of every Server Action.</li>
          <li>Use <code>useActionState</code> for forms that need to display validation errors or success messages from the server.</li>
          <li>Use <code>useFormStatus</code> for simple loading indicators on submit buttons.</li>
          <li>Use <code>useOptimistic</code> for interactions that need to feel instant, like toggles, likes, and status changes.</li>
          <li>Be specific with <code>revalidatePath</code> and <code>revalidateTag</code>. Avoid revalidating more than necessary.</li>
          <li>Return error states instead of throwing for expected errors like validation failures. Throw for unexpected errors that should be caught by error boundaries.</li>
          <li>Use progressive enhancement by passing Server Actions to form <code>action</code> props instead of <code>onSubmit</code> handlers when possible.</li>
          <li>Keep API routes for external consumers like mobile apps, webhooks, and third-party integrations.</li>
          <li>Combine related mutations into a single Server Action to avoid waterfalls.</li>
          <li>Use TypeScript for end-to-end type safety between your forms and Server Actions.</li>
          <li>Test Server Actions like any other server-side function. They are just async functions that run on the server.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Server Actions are not a silver bullet, but they are the right tool for the vast majority of data mutation needs in React applications. They eliminate an entire category of boilerplate code, provide built-in security features, integrate seamlessly with React&apos;s rendering model, and enable patterns like optimistic updates and progressive enhancement that were previously difficult to implement correctly. If you are building with Next.js and React 19, Server Actions should be your default approach for handling mutations. Start using them today, migrate incrementally, and you will find that building full-stack React applications has never been more enjoyable.
      </p>
    </div>
  ),
};

export default blogPost;
