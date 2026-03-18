import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Component API Design: How to Build Components People Love Using',
  excerpt:
    "The difference between a component library people love and one they avoid is the API. Here's how to design component interfaces that just make sense.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 14, 2026',
  readTime: '15 min read',
  icon: '🧩',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a truth that took me a while to learn: the quality of a React component isn&apos;t just
        about what it does. It&apos;s about how easy it is for other developers to use it. You could build
        the most beautiful, feature-rich button component in the world. But if its props are confusing, if
        the naming is inconsistent, if it requires a 20-line setup just to render, nobody will want to use it.
        They&apos;ll build their own instead. Good component API design is what separates a design system
        people love from one they tolerate. And it&apos;s a skill that will make you a better frontend developer
        no matter what UI framework you work with.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;ve spent years building UI components for design systems, open-source libraries, and production
        applications. Along the way, I&apos;ve made every mistake in the book. Components with 20 required
        props. Inconsistent naming that confused everyone, including me. Rigid structures that broke the moment
        someone needed something slightly different. Each mistake taught me a principle, and in this post I&apos;m
        going to share seven rules that have fundamentally changed how I think about component API design
        in React and Next.js projects.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Your API Is Your UX
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When designers talk about UX, they mean the experience of end users clicking buttons and filling out
        forms. But as a frontend developer building UI components, your users are other developers. Your props
        are the interface. Your TypeScript types are the documentation. Your default values set the expectations.
        If a developer has to read a long doc page just to render your component correctly, your API has failed.
        A great component API should feel obvious. You look at the props once and you get it.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Think about the best tools you&apos;ve used in web development. They don&apos;t require a manual.
        Tailwind CSS classes read like plain English. Next.js file-based routing just makes sense. The best
        React component libraries follow the same principle: the API surface is small, naming is intuitive,
        and the defaults are smart enough that most usage requires minimal configuration.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│    Bad API           │     │    OK API             │     │    Great API         │
│                     │     │                       │     │                     │
│  12 required props  │     │  3 required props     │     │  0 required props   │
│  Unclear naming     │────▶│  Decent naming        │────▶│  Obvious naming     │
│  No defaults        │     │  Some defaults        │     │  Smart defaults     │
│  No TypeScript      │     │  Basic types          │     │  Rich types         │
│  Rigid structure    │     │  Some flexibility     │     │  Full composition   │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘

   Your component API is the developer experience (DX).
   Great DX = adoption. Bad DX = everyone builds their own.`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 1: Less Props, More Composition
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is the number one mistake I see in component libraries. Too many props. Every prop is a decision
        the user has to make. Every prop is a code path you have to maintain. And every prop makes the component
        harder to understand at a glance. The solution? Composition. Instead of cramming everything into one
        component via props, break it into smaller pieces that users can assemble.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you add a prop, you&apos;re adding complexity in three places: the API surface, the implementation,
        and the documentation. A component with 12 props has an exponential number of possible combinations.
        Testing all those combinations is practically impossible. But when you split that same functionality
        into composable sub-components, each piece is simple and testable on its own. The user assembles them
        like building blocks, and they can see exactly what their component will look like just by reading the JSX.
      </p>

      <CodeBlock
        filename="less-props.tsx"
        language="tsx"
        code={`// Bad: 12 props. Nobody remembers what these all do.
<Alert
  type="warning"
  title="Heads up"
  description="This action can't be undone"
  icon="triangle"
  iconColor="amber"
  closable={true}
  onClose={handleClose}
  action="Learn more"
  actionHref="/docs"
  bordered={true}
  size="default"
  animate={true}
/>

// Good: composition. You see exactly what's going on.
<Alert variant="warning">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>This action can't be undone</AlertDescription>
  <AlertAction href="/docs">Learn more</AlertAction>
</Alert>

// Even better: users can do things you didn't anticipate
<Alert variant="warning">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>
    This action can't be undone.
    <strong>Your data will be permanently deleted.</strong>
  </AlertDescription>
  <div className="flex gap-2 mt-2">
    <AlertAction href="/docs">Learn more</AlertAction>
    <AlertAction onClick={dismiss} variant="ghost">Dismiss</AlertAction>
  </div>
</Alert>`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Composition Pattern in Practice
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Look at how shadcn/ui designs its components. A Dialog isn&apos;t one component with 15 props. It&apos;s
        <code>Dialog</code>, <code>DialogTrigger</code>, <code>DialogContent</code>, <code>DialogHeader</code>,
        <code>DialogTitle</code>, and <code>DialogDescription</code>. Each piece is simple on its own. Together,
        they&apos;re incredibly flexible. Users can rearrange them, add custom content between them, and build
        layouts you never imagined. This approach has become the gold standard in modern React component
        libraries, and for good reason.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The composition pattern also makes your components more resilient to change. Need to add a footer
        to your Dialog? Just create a <code>DialogFooter</code> component. Existing code doesn&apos;t break.
        No migration needed. Compare that to the prop-heavy approach where adding a footer means adding
        <code>footer</code>, <code>footerClassName</code>, <code>showFooter</code>, and
        <code>footerAlignment</code> props. That&apos;s four new props versus one new component.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        When Props Are Better Than Composition
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Composition isn&apos;t always the answer. For simple variants like color or size, props are perfect.
        You don&apos;t want users to compose a <code>ButtonSmall</code> or <code>ButtonLarge</code>. A
        <code>size</code> prop makes way more sense there. The rule of thumb: use props for simple variations,
        composition for structural flexibility. If a prop controls styling, it&apos;s fine. If a prop controls
        structure or content, consider composition instead.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Decision: Props vs Composition
══════════════════════════════

           ┌──────────────────────────┐
           │  Does the prop control   │
           │  styling or structure?   │
           └────────────┬─────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
     ┌──────────────┐   ┌──────────────────┐
     │   STYLING     │   │   STRUCTURE       │
     │               │   │                  │
     │  Use a prop:  │   │  Use composition: │
     │  - variant    │   │  - AlertTitle    │
     │  - size       │   │  - AlertAction   │
     │  - color      │   │  - DialogHeader  │
     │  - disabled   │   │  - CardFooter    │
     └──────────────┘   └──────────────────┘

  Props for "how it looks."
  Composition for "what it contains."`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 2: Smart Defaults Make Everything Easier
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The simplest version of your component should just work. No required props except maybe
        <code>children</code>. Everything else should have a sensible default. Think about what 80% of users
        will want, and make that the default. This is one of the most important principles in frontend
        development, and it applies to everything from React components to API design.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I call this the &quot;zero-config ideal.&quot; Can a developer use your component without passing
        any props? If yes, you&apos;ve nailed it. Every required prop is friction. Every missing default
        is a decision the user has to make before they can even see something on screen. Think about how
        Next.js works: you create a page file and it just renders. No configuration needed. Your UI components
        should have the same philosophy.
      </p>

      <CodeBlock
        filename="defaults.tsx"
        language="tsx"
        code={`// This should just work. No required props except children.
<Button>Click me</Button>

// Variants are optional enhancements
<Button variant="destructive" size="sm">Delete</Button>

// The component picks sensible defaults internally:
// variant = "default"
// size = "default"
// type = "button" (not "submit" which causes accidental form submissions)
// disabled = false
// asChild = false

// Another example: Input component
<Input />
// Works! Renders a text input with proper styling.
// type defaults to "text", not undefined.

// Card with smart defaults
<Card>
  <CardContent>Just content, no header needed</CardContent>
</Card>
// Works! No required CardHeader, no required title prop.`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The type=&quot;button&quot; Default
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a real-world example of why defaults matter. In HTML, a button&apos;s default type is
        <code>submit</code>. That means if your Button component doesn&apos;t set a default type, every button
        inside a form will submit it when clicked. This causes countless bugs in web applications. Developers
        add a &quot;Cancel&quot; button and suddenly clicking it submits the form. The fix is simple: default
        to <code>type=&quot;button&quot;</code>. Users who want submit behavior can explicitly set
        <code>type=&quot;submit&quot;</code>. This one default prevents hours of debugging.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Progressive Enhancement Through Defaults
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Good defaults enable progressive enhancement. A developer can start with the simplest version of
        your component and gradually customize it as their needs grow. First they use <code>&lt;Button&gt;Save&lt;/Button&gt;</code>.
        Then they discover <code>variant=&quot;outline&quot;</code>. Then they find <code>asChild</code> for
        rendering as a link. Each step adds one concept. They never need to learn everything at once. This
        is what makes a design system approachable and why defaults are so critical for developer experience.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 3: Consistent Naming Across Your Design System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If your Button uses <code>variant</code>, your Badge should too. If your Card accepts
        <code>className</code>, every component should. Consistency means developers learn one pattern and
        apply it everywhere. They don&apos;t have to check the docs for every component. This is perhaps
        the most overlooked aspect of component API design, and it&apos;s what separates a professional
        design system from a collection of random components.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Inconsistency is expensive. If your Button uses <code>color</code> but your Badge uses
        <code>variant</code> and your Alert uses <code>type</code>, developers have to look up the prop
        name for every single component. Multiply that by 50 components and you&apos;ve created a developer
        experience nightmare. Pick a convention early, document it, and enforce it in code reviews.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Naming Conventions That Work</h3>
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li><code>variant</code> for visual variations (default, destructive, outline, ghost, secondary)</li>
          <li><code>size</code> for size variations (sm, default, lg, icon)</li>
          <li><code>className</code> for style overrides (always pass to root element)</li>
          <li><code>asChild</code> for polymorphic rendering (render as a different element)</li>
          <li><code>onValueChange</code> for controlled value changes (not onChange, which collides with native events)</li>
          <li><code>defaultValue</code> for uncontrolled component defaults</li>
          <li><code>open</code> / <code>onOpenChange</code> for disclosure components (dialogs, dropdowns, tooltips)</li>
          <li><code>disabled</code> for disabling interaction (always boolean, never a variant)</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why onValueChange Instead of onChange?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Native HTML elements already have an <code>onChange</code> event. If your custom Select component also
        uses <code>onChange</code>, there&apos;s ambiguity. Does it fire with the native event object or just
        the value? Radix UI popularized <code>onValueChange</code> which always receives just the value.
        It&apos;s cleaner and avoids confusion with native events. This is a great convention to adopt across
        your entire design system. Similarly, <code>onOpenChange</code> for components that open and close is
        much clearer than <code>onToggle</code> or <code>onVisibleChange</code>.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Create a Naming Glossary
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Document your naming conventions in a glossary that all contributors can reference. When someone builds
        a new component, they can check the glossary to see what prop names to use. This prevents the drift
        that naturally happens as more people contribute to a component library. It takes 30 minutes to create
        and saves hundreds of hours of inconsistency cleanup later.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 4: Forward Refs and Spread Props
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your component should behave like a native HTML element as much as possible. That means forwarding refs
        so users can programmatically focus, measure, or scroll to your component. It also means spreading
        remaining props onto the root element so users can add <code>data-testid</code>,
        <code>aria-label</code>, or any other attribute without you explicitly supporting it. This principle
        is fundamental to building flexible UI components that work well with the broader React ecosystem.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Why does this matter so much? Because your component lives in an ecosystem. It needs to work with
        testing libraries that use <code>data-testid</code>. It needs to work with animation libraries that
        need refs. It needs to work with form libraries like React Hook Form that spread <code>ref</code>
        and <code>onChange</code> onto inputs. If your component swallows props or doesn&apos;t forward refs,
        you&apos;re breaking compatibility with the tools developers already use.
      </p>

      <CodeBlock
        filename="forward-ref.tsx"
        language="tsx"
        code={`const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm",
        "ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Now it works with everything:
<Input ref={inputRef} />                    // refs work
<Input data-testid="email" />               // test attributes work
<Input aria-describedby="help" />           // accessibility works
<Input className="border-red-500" />        // style overrides work
<Input {...register("email")} />            // react-hook-form works`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Prop Spreading Pattern
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The pattern is simple: destructure the props you need for your component logic, then spread everything
        else onto the root HTML element. This ensures that any prop you haven&apos;t explicitly handled still
        gets passed through. It&apos;s the difference between a component that works in isolation and one that
        works in any context. Every major UI component library follows this pattern, from shadcn/ui to Radix
        to Material UI. If your components don&apos;t do this, they&apos;ll feel limiting to developers who
        are used to the flexibility of modern React component patterns.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        className Merging with cn()
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Notice how <code>className</code> is destructured separately and merged with default classes using
        <code>cn()</code>. This is critical. If you just spread <code>className</code> with the rest of the
        props, the user&apos;s classes would completely replace your component&apos;s styles instead of
        extending them. The <code>cn()</code> utility (which uses clsx and tailwind-merge under the hood)
        handles conflicts intelligently. If a user passes <code>className=&quot;border-red-500&quot;</code>,
        it replaces the default border color but keeps everything else. This is essential for Tailwind CSS
        based design systems.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 5: Support Both Controlled and Uncontrolled Modes
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Some developers want full control over a component&apos;s state. They manage it in their parent
        component and pass it down. Others want the component to handle its own state internally. A
        well-designed component supports both. This is how native HTML elements work: an input can be
        controlled with <code>value</code> and <code>onChange</code>, or uncontrolled with
        <code>defaultValue</code>. Your custom components should follow the same pattern.
      </p>

      <CodeBlock
        filename="controlled.tsx"
        language="tsx"
        code={`// Uncontrolled - component manages its own state
<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>

// Controlled - parent manages state
const [open, setOpen] = useState("item-1");
<Accordion type="single" value={open} onValueChange={setOpen}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>

// The pattern: if value is provided, component is controlled.
// If only defaultValue is provided, component manages its own state.
// This is exactly how native HTML inputs work.`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Implementing the Controlled/Uncontrolled Pattern
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The trick is to check whether a <code>value</code> prop is provided. If it is, use it as the source
        of truth. If it isn&apos;t, use internal state initialized with <code>defaultValue</code>. Radix UI
        has a <code>useControllableState</code> hook that handles this pattern beautifully. You can also build
        your own. It&apos;s a pattern worth investing in because you&apos;ll use it in almost every interactive
        component in your design system.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Why Not Always Controlled?
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You might wonder why bother with uncontrolled mode at all. Why not require developers to always manage
        state? Because it&apos;s unnecessary friction for simple use cases. If someone just wants an accordion
        that opens and closes, they shouldn&apos;t need to set up useState, create a handler function, and wire
        it all together. The uncontrolled mode lets them get something working in one line, and they can upgrade
        to controlled mode when they need more power. This progressive disclosure of complexity is what makes
        a component API feel truly well-designed.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 6: TypeScript Makes Your Components Self-Documenting
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Good TypeScript types mean developers barely need documentation. Their editor tells them everything:
        which props exist, what values are valid, which ones are optional. Invest in your types. They&apos;re
        the most-read part of your component library. In a world where AI-powered code completion is the norm,
        strong types mean better autocomplete suggestions and fewer bugs. TypeScript is essentially free
        documentation that never goes stale.
      </p>

      <CodeBlock
        filename="types.tsx"
        language="tsx"
        code={`// Extend native HTML attributes for full compatibility
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// The developer's editor now shows:
// - All HTML button attributes (onClick, disabled, type, etc.)
// - variant: "default" | "destructive" | "outline" | "ghost"
// - size: "default" | "sm" | "lg" | "icon"
// - asChild: boolean
// - className: string
// No docs needed for basic usage.

// Use discriminated unions for mutually exclusive props
type LinkProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void };

// This prevents passing both href AND onClick, which is a common bug.

// Use template literal types for more expressive APIs
type SpacingProp = \`\${"p" | "m" | "px" | "py"}-\${1 | 2 | 3 | 4 | 6 | 8}\`;`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Use cva() for Variant Types
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>class-variance-authority</code> (cva) library is a perfect companion for Tailwind CSS
        component development. It lets you define variant styles in a structured way and automatically generates
        TypeScript types for each variant. Combined with <code>VariantProps</code>, your component gets type-safe
        variants for free. No manual type definitions, no keeping types in sync with styles. This is the
        recommended approach in shadcn/ui and has become the de facto standard for building typed React
        components with Tailwind CSS.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Tip: Export Your Types
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Always export your component&apos;s prop types. Other developers might need to reference them when
        building wrapper components or passing props through. A wrapper around your Button that adds analytics
        tracking needs to accept the same props. If your ButtonProps aren&apos;t exported, that developer has
        to manually recreate the types. It&apos;s a small thing, but it shows that you&apos;ve thought about
        the developer experience end to end.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Rule 7: Think About Accessibility from Day One
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Accessible components aren&apos;t optional. They&apos;re a requirement. And the beautiful thing about
        building accessibility into your design system is that every app using your components gets it for free.
        Make sure your components handle keyboard navigation, screen reader announcements, focus management,
        and ARIA attributes out of the box. This is not just an ethical imperative; it&apos;s a legal one in
        many jurisdictions, and it makes your components better for all users, including those using keyboards,
        voice control, or other assistive technologies.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Headless Libraries as a Foundation
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Libraries like Radix UI, React Aria, and Headless UI handle the hard parts of accessibility for you.
        They manage keyboard interactions, focus trapping, screen reader announcements, and ARIA roles. You
        just add your styling on top. This is why most modern design systems, including shadcn/ui, build on
        top of Radix. You get WAI-ARIA compliant components without having to become an accessibility expert
        yourself. It&apos;s the smart way to build UI components for production web applications.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Accessibility Anti-Patterns to Avoid
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        There are a few common mistakes I see in React component libraries. First, using <code>div</code>
        with <code>onClick</code> instead of a proper <code>button</code> element. Second, hiding focus
        outlines without providing an alternative. Third, not providing <code>aria-label</code> for icon-only
        buttons. Fourth, not managing focus when opening modals or drawers. Each of these creates a broken
        experience for assistive technology users. The good news is that if you build on top of Radix or
        similar libraries, most of these are handled automatically.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Real-World API Design Decisions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let me walk through some concrete decisions you&apos;ll face when building components for a web
        development project. These are the questions that come up every time you sit down to design a new
        component API.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Should I Use Children or a Render Prop?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Default to <code>children</code>. It&apos;s the most familiar pattern in React and covers 90% of
        cases. Only reach for render props when the child needs data from the parent component that it can&apos;t
        get any other way. For example, an Autocomplete component might use a render prop for each suggestion
        so it can pass the match highlight information. But a Dialog? Just use children.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Should I Use Boolean Props or String Variants?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Avoid boolean props when there are more than two states. <code>variant=&quot;outline&quot;</code> is
        better than <code>outlined</code> because you can easily add <code>variant=&quot;ghost&quot;</code>
        later. Boolean props lock you into two states forever. They also create confusing combinations: what
        does it mean when both <code>outlined</code> and <code>ghost</code> are true? With a string variant,
        the type system prevents that impossible state entirely.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Should I Accept a className or Style Object?
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        In Tailwind CSS projects, always <code>className</code>. It&apos;s the standard convention, it works
        with all the Tailwind tooling, and the <code>cn()</code> utility handles class merging intelligently.
        Style objects have their place in CSS-in-JS libraries, but if you&apos;re building components for
        a Tailwind-based design system, <code>className</code> is the way to go. Don&apos;t try to support
        both; pick one convention and be consistent.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Bottom Line
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside ml-4">
          <li>Fewer props, more composition. Let users build with flexible pieces.</li>
          <li>The simplest usage should need zero or one prop. Smart defaults handle the rest.</li>
          <li>Same naming across every component. <code>variant</code>, <code>size</code>, <code>className</code> everywhere.</li>
          <li>Forward refs and spread props so components behave like native HTML elements.</li>
          <li>Support both controlled and uncontrolled modes for interactive components.</li>
          <li>Invest in TypeScript types. They replace half your documentation.</li>
          <li>Build on accessible foundations like Radix UI. Don&apos;t reinvent the wheel.</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Component API design is a skill that compounds. Every good decision you make now saves hundreds of
        developers from confusion later. And the best part? These patterns apply whether you&apos;re building
        a small project&apos;s UI components or a company-wide design system. Whether you&apos;re working with
        React, Next.js, Tailwind CSS, or any other modern frontend development stack, get the API right, and
        everything else follows. Your components become a joy to use instead of a source of frustration. And
        that&apos;s the whole point of building a design system in the first place.
      </p>
    </div>
  ),
};

export default blogPost;
