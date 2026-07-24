export const FAQS_PART_C: Record<string, { question: string; answer: string }[]> = {
  "nextjs-server-components-guide": [
    {
      question: "When should I use the use client directive in Next.js?",
      answer:
        "Add use client only when a component needs state, an effect, an event handler, or a browser API; everything else stays a Server Component. Push the directive down to the smallest leaf that needs it, because it forces that component and everything it imports to ship to the browser.",
    },
    {
      question: "How do I fetch data in React Server Components?",
      answer:
        "Fetch data directly inside a Server Component by writing an async function, awaiting the query, and returning JSX, with no useEffect or loading flag. React dedupes identical requests within a render, so you can fetch the same data in two components without context or prop-drilling.",
    },
    {
      question: "Why do Next.js Server Components make my bundle smaller?",
      answer:
        "A Server Component runs once on the server and ships zero JavaScript to the browser, so most of your tree costs nothing to hydrate. The bundle only grows for client islands, which is why misplacing use client on a page can turn a 40KB page into a 300KB one.",
    },
  ],
  "react-19-server-actions-guide": [
    {
      question: "What is a Server Action in React 19?",
      answer:
        "A Server Action is a function marked with the use server directive that runs on the server and is callable from the client without an API route. You pass it to a form's action prop, read fields off FormData, perform the mutation, and revalidate the affected path.",
    },
    {
      question: "How do I show loading and error states with React 19 Server Actions?",
      answer:
        "Wrap the action in useActionState to get the latest return value, a wrapped action for the form, and an isPending flag, with no useState or manual try/catch. For a plain submit button, useFormStatus reads the parent form's pending state so you can disable it and swap its label.",
    },
    {
      question: "Are React 19 Server Actions secure by default?",
      answer:
        "No. Treat every Server Action as a public endpoint, because anyone can post to it. useActionState handles form plumbing, not authorization, so check the session and validate every field on the server, using something like Zod, before touching the database.",
    },
  ],
  "design-engineer-playbook": [
    {
      question: "What does a design engineer do?",
      answer:
        "A design engineer owns the seam between design and code: the interaction decisions no handoff document covers, like focus rings, loading and empty states, and how an error reads. The role is part designer, part frontend engineer, and wholly responsible for how the product feels.",
    },
    {
      question: "How do I become a design engineer?",
      answer:
        "Pick one component your team ships this week and build every state it can be in, not just the happy path. Sit with a designer and a backend developer, write down every question the mockup didn't answer, then repeat for the next component until the role becomes a habit.",
    },
  ],
  "figma-to-functional-workflow": [
    {
      question: "How do I turn a Figma design into React code without drift?",
      answer:
        "Translate tokens, not pixels: pull color, spacing, radius, and type scale into shared tokens both sides agree on, so 16px becomes --space-4 everywhere. Mirror Figma layer names in your components, and build each component as its full set of states rather than rebuilding individual screens.",
    },
    {
      question: "Why should component names match Figma layer names?",
      answer:
        "Matching names lets a new engineer read a Figma file and already know the component tree, and makes search work across both design and code. If the Figma layer is Card/Header, the component is CardHeader, and a Large variant in Figma becomes a size prop set to lg in the API.",
    },
  ],
  "art-of-prototyping": [
    {
      question: "Should I prototype in Figma or jump straight to code?",
      answer:
        "It depends on the question you are trying to answer, so use the lowest fidelity that works. Reach for paper or a whiteboard to test a flow, a Figma clickthrough for layout, and a coded prototype only when you need to feel an interaction at real speed, like 200ms timing.",
    },
    {
      question: "What makes a good prototype?",
      answer:
        "A good prototype answers a single named question, then gets thrown away. Write the question down first; if you can't name it, you're building, not prototyping. Keep the code fast and ugly with hard-coded data and no tests, timebox it, then delete it and rebuild clean.",
    },
  ],
  "design-handoff-checklist": [
    {
      question: "What should a design handoff include?",
      answer:
        "A complete handoff covers four things: all four states of every data-driven component (empty, loading, error, and full), token names instead of raw values, motion specified in numbers, and one line naming who owns the component next. It fits in about ten lines pasted into the ticket.",
    },
    {
      question: "How should designers specify animation in a design handoff?",
      answer:
        "Specify motion in numbers, not adjectives: a duration in milliseconds, an easing curve, and the trigger, such as fade and rise 8px over 150ms, ease-out, on mount. Always include the reduced-motion behavior, or someone forgets it and the accessibility audit catches it later.",
    },
  ],
  "collaboration-patterns-design-engineering": [
    {
      question: "How can design and engineering teams collaborate better?",
      answer:
        "Work in one loop instead of handing files over a wall. Pair on a component live for 45 minutes, put a deploy preview link on every pull request so designers comment on the running feature, and agree on one shared vocabulary where each token, component, and spacing step has a single name.",
    },
    {
      question: "Why put a deploy preview link on every pull request?",
      answer:
        "A preview link lets designers review the running feature instead of a static screenshot, so they catch what a mock can't show: a stuttering animation, a missing focus ring, or a layout that breaks at real content length. Feedback then lands before merge instead of after.",
    },
  ],
  "design-engineer-tools-2026": [
    {
      question: "What tools do design engineers use in 2026?",
      answer:
        "A tight stack of four, one per stage: Figma for deciding what to build, Cursor or Claude as an AI pair for scaffolds and refactors, Storybook for building components in isolation, and Linear for tracking what's next. Each tool's output feeds directly into the next.",
    },
    {
      question: "How do I decide whether to add a new tool to my workflow?",
      answer:
        "Name the exact step it removes from your design-to-code loop; if you can't, it's a toy, not part of the stack. A new tool has to either replace one you already trust or cut a measurable step from idea to merged pull request.",
    },
  ],
  "design-engineer-interview-prep": [
    {
      question: "What should I expect in a design engineer interview?",
      answer:
        "Expect a live build, not a LeetCode grind or a pure design crit. You get a prompt like build a button with a loading state and an empty file, and you're judged on handling the states real components have (default, disabled, loading, and focus) plus accessibility details like aria-busy.",
    },
    {
      question: "How do I prepare for a design engineer interview?",
      answer:
        "Practice building one component from a one-line prompt in 45 minutes, out loud, while recording your screen, then watch it back to catch where you went quiet or skipped a state. Bring three real interactions you can open in a browser, and narrate your tradeoffs as you build.",
    },
  ],
  "ai-powered-ui-development": [
    {
      question: "How should I use AI to build UI components?",
      answer:
        "Treat AI like a fast, literal junior developer: let it handle the boring 80%, such as scaffolds, variants, translating a Figma spec or Tailwind classes into a first pass, and boilerplate like prop types and Storybook stories. Then review every diff the way you would a teammate's pull request.",
    },
    {
      question: "What are the risks of AI-generated UI code?",
      answer:
        "AI output looks correct but ships subtle failures, often accessibility ones, like a clickable div with no keyboard access, focus ring, or role that a screen reader user can't operate. It also stalls on novel interactions and taste-level calls, so read every line, run it, and check the states before merging.",
    },
  ],
  "future-of-design-engineering": [
    {
      question: "Will AI replace design engineers?",
      answer:
        "No. As AI drives the cost of writing code toward zero, the code stops being the valuable part, and deciding what to build and whether it's any good becomes the whole game. That work, which is taste, systems thinking, and judgment, gets more valuable, not less.",
    },
    {
      question: "What skills should design engineers focus on for the future?",
      answer:
        "Invest in judgment over any specific framework or model, since those age out in a few years. Three skills appreciate as typing gets cheap: taste, or knowing why one version feels right; systems thinking, designing the token rather than the button; and judgment about what to ship or cut.",
    },
  ],
};
