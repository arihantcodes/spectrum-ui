import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "How to Build a Design System That Actually Scales",
  excerpt:
    "Design systems are not just for big companies. Here is how to build one that grows with your team, from startup to enterprise, without overthinking it.",
  author: {
    name: "Arihant Jain",
    role: "Engineering",
    avatar: "/arihant.jpeg",
  },
  date: "Oct 21, 2025",
  readTime: "15 min read",
  icon: "📐",
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        What Is a Design System and Why Does Every Team Need One?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A design system is your team&apos;s single source of truth for building UI. It&apos;s not just a collection of React components sitting in a folder. It&apos;s everything that defines how your app looks, feels, and behaves. Colors, spacing, typography, component patterns, accessibility rules, and the documentation that ties it all together. Think of it as a shared language between designers and developers that everyone on the team speaks fluently.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Without a design system, every developer on your team makes their own decisions about button styles, spacing values, and color choices. You end up with five different shades of blue, three different button sizes, and spacing that looks different on every page. Sound familiar? A scalable design system fixes all of this by giving everyone a common toolkit to work with.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The best part is you don&apos;t need to be a big company to benefit. Even solo developers building with Next.js and Tailwind CSS can use these principles to ship faster, maintain consistency, and create better user experiences. Let&apos;s break down exactly how to build a design system that grows with you, step by step.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Building a Scalable Design System:

┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Tokens    │────▶│  Components  │────▶│  Patterns   │
│             │     │              │     │             │
│ Colors      │     │ Button       │     │ Login Form  │
│ Spacing     │     │ Input        │     │ Dashboard   │
│ Typography  │     │ Card         │     │ Data Table  │
│ Shadows     │     │ Dialog       │     │ Settings    │
└─────────────┘     └──────────────┘     └─────────────┘
      │                    │                    │
      └────────────────────┼────────────────────┘
                           ▼
                  ┌─────────────────┐
                  │  Documentation  │
                  │  + Guidelines   │
                  └─────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Start with Design Tokens: The Foundation of Everything
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Design tokens are the atomic values that define your visual language. They&apos;re the colors, spacing, fonts, shadows, and border radiuses that every component in your system uses. Put these in one place and you can change your entire app&apos;s look by updating a few variables. This is what makes a design system truly scalable. Imagine your product manager says &quot;we&apos;re rebranding, change the primary color.&quot; Without tokens, you&apos;re searching through hundreds of files. With tokens, you change one line and everything updates.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Setting Up Your Tokens with CSS Variables
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        CSS custom properties are the best way to manage design tokens in a modern frontend stack. They work everywhere, they cascade naturally, and frameworks like Tailwind CSS and shadcn use them out of the box. Here&apos;s how to set up a complete token system for your web dev projects:
      </p>

      <CodeBlock
        filename="globals.css"
        language="css"
        code={`@layer base {
  :root {
    /* Colors - using HSL for easy manipulation */
    --primary: 221.2 83.2% 53.3%;
    --secondary: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    /* Spacing scale (4px base grid) */
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */

    /* Typography */
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'Fira Code', monospace;

    /* Border radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Override tokens for dark mode */
  }
}

/* Change --primary and your ENTIRE theme updates instantly */`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why Tokens Matter for Scalability
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Tokens are the single biggest lever for scalability in a design system. When your app supports light and dark mode, tokens let you swap entire themes by changing one class. When you need to support multiple brands or white-label products, tokens make it possible without duplicating your component code. Every major design system, from Material Design to Shopify&apos;s Polaris, is built on tokens. You should be too.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Organizing Your Components: The Three-Tier Approach
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A folder full of random components is not a design system. You need structure. The three-tier approach organizes components by complexity and reusability, making it easy for anyone on your team to find what they need and add new components in the right place.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Tier 1: Primitives (Basic Building Blocks)
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        These are your simplest components. Buttons, inputs, labels, cards, badges. They do one thing well, they&apos;re highly reusable, and they form the foundation for everything else. In a shadcn-based project, these live in your <code>components/ui/</code> folder. Keep them focused, flexible with variants, and fully accessible.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Key Principles for Primitives
      </h5>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Keep them focused on a single responsibility</li>
          <li>Make them flexible with variants (size, color, style) using CVA</li>
          <li>Support all necessary accessibility and ARIA attributes</li>
          <li>Accept a <code>className</code> prop for customization with Tailwind CSS</li>
          <li>Use <code>forwardRef</code> so parent components can access the DOM element</li>
        </ul>
      </div>

      <CodeBlock
        filename="button.tsx"
        language="tsx"
        code={`// components/ui/button.tsx - A well-structured primitive
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Tier 2: Patterns (Composed Components)
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Patterns combine multiple primitives to solve common UI problems. A login form combines inputs, labels, and a button. A user card combines an avatar, text, and a badge. These are more specific than primitives but still reusable across your app. They live in a <code>components/patterns/</code> folder and save your team from rebuilding the same combinations over and over.
      </p>

      <CodeBlock
        filename="contact-form.tsx"
        language="tsx"
        code={`// components/patterns/forms/contact-form.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ContactForm({ onSubmit }: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// Combines primitives into a ready-to-use pattern`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Tier 3: Layouts (Page Templates)
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Layouts define how entire pages are structured. A dashboard layout with a sidebar and navbar. An auth layout centered on the page. A marketing layout with a hero section. These are the most specific tier but they make building new pages incredibly fast because all the structure is already defined and consistent.
      </p>

      <CodeBlock
        filename="dashboard-layout.tsx"
        language="tsx"
        code={`// components/layouts/dashboard-layout.tsx
import { Navbar } from "@/components/patterns/navigation/navbar"
import { Sidebar } from "@/components/patterns/navigation/sidebar"

export function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

// Creating new dashboard pages is now trivial:
export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <h1>Analytics</h1>
      {/* Your page content here */}
    </DashboardLayout>
  )
}`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Folder Structure That Scales
      </h4>
      <CodeBlock
        filename="project-structure"
        language="bash"
        code={`components/
├── ui/                    # Tier 1: Primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── patterns/              # Tier 2: Composed components
│   ├── forms/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── navigation/
│   │   ├── navbar.tsx
│   │   └── sidebar.tsx
│   └── data-display/
│       ├── data-table.tsx
│       └── stats-card.tsx
└── layouts/               # Tier 3: Page templates
    ├── dashboard-layout.tsx
    ├── auth-layout.tsx
    └── marketing-layout.tsx

lib/
├── utils.ts               # Utility functions (cn, etc.)
└── design-tokens.ts       # Token values for JS usage

styles/
└── globals.css            # Design tokens & base styles`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Documentation: The Make-or-Break Factor
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A design system without documentation is just a bunch of components nobody knows how to use. This is where most design systems fail. The components exist, but no one on the team knows when to use a dialog versus a drawer, or what button variant to pick for a destructive action. Great documentation is the difference between a design system that gets adopted and one that gets ignored.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        The Five Questions Your Docs Must Answer
      </h5>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>What is it?</strong> A clear, one-sentence description of the component</li>
          <li><strong>When do I use it?</strong> The specific scenarios where this component is the right choice</li>
          <li><strong>How do I use it?</strong> Code examples developers can copy and paste into their React app</li>
          <li><strong>When should I NOT use it?</strong> Common misuse patterns and better alternatives</li>
          <li><strong>Accessibility notes:</strong> Any ARIA attributes, keyboard shortcuts, or focus management details</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Spectrum UI comes with examples and documentation for each component. You can also use tools like Storybook to create interactive documentation, or build your own docs site with Next.js. The format matters less than the habit of documenting every new component you add to the system.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Versioning and Breaking Changes
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your design system will evolve. Components will change. APIs will improve. Sometimes you&apos;ll need to make breaking changes. Here&apos;s how to handle evolution without making everyone on your team frustrated.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Change Management Process
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ol className="space-y-3 list-decimal list-inside">
          <li><strong>Use semantic versioning:</strong> Major.minor.patch (2.0.0 for breaking changes, 1.1.0 for features, 1.0.1 for fixes)</li>
          <li><strong>Deprecate before removing:</strong> Mark old APIs as deprecated with warnings before you remove them</li>
          <li><strong>Write migration guides:</strong> Show developers exactly how to update their code step by step</li>
          <li><strong>Keep a changelog:</strong> Document every change so teams can see what&apos;s new and different</li>
          <li><strong>Let teams upgrade on their own timeline:</strong> Don&apos;t force immediate adoption of breaking changes</li>
        </ol>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Governance: Who Gets to Add Components?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Without clear rules about who can add components and how they get approved, your design system turns into a dumping ground for random one-off components that nobody else reuses. You need a lightweight process that encourages contribution without creating bottlenecks.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Component Addition Workflow:

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Proposal │───▶│  Design  │───▶│  Build   │───▶│  Review  │
│          │    │  Review  │    │          │    │          │
│ Why do   │    │ Does it  │    │ Code it  │    │ Quality  │
│ we need  │    │ fit the  │    │ to spec  │    │ check +  │
│ this?    │    │ system?  │    │ + a11y   │    │ merge    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
                                                     ▼
                                              ┌──────────┐
                                              │  Docs +  │
                                              │  Announce │
                                              └──────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Measuring Success: How Do You Know It&apos;s Working?
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building a design system is an investment of time and energy. You need to track whether that investment is actually paying off. Here are the metrics that matter and what to watch for.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Adoption and Usage Metrics
      </h5>
      <ul className="space-y-2 list-disc list-inside ml-4 my-4">
        <li><strong>Component coverage:</strong> What percentage of your UI uses design system components?</li>
        <li><strong>Development velocity:</strong> Are teams shipping features faster than before?</li>
        <li><strong>Visual consistency:</strong> Does the UI look the same across all pages and features?</li>
        <li><strong>Accessibility compliance:</strong> Are components passing automated and manual a11y tests?</li>
        <li><strong>Developer satisfaction:</strong> Do developers enjoy using the system? Run periodic surveys.</li>
        <li><strong>Contribution rate:</strong> Are teams adding components back to the system or just consuming?</li>
      </ul>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Red Flags to Watch For
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If developers are constantly overriding component styles with custom Tailwind classes, your primitives are not flexible enough. If new components keep getting added but never reused, your patterns are too specific. If teams are building their own components instead of using the system, you have an adoption problem that likely stems from poor documentation or overly rigid APIs.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistakes That Will Kill Your Design System
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-3 list-disc list-inside">
          <li><strong>Building everything at once:</strong> Start small, add what you actually need. Don&apos;t build 50 components before anyone has used one.</li>
          <li><strong>Not asking developers:</strong> They&apos;re the ones using the system every day. Get their feedback early and often.</li>
          <li><strong>Making it too strict:</strong> Let people customize when they need to. A rigid system gets abandoned fast.</li>
          <li><strong>No documentation:</strong> Nobody will use components they don&apos;t understand how to implement correctly.</li>
          <li><strong>Forgetting accessibility:</strong> Build it in from the start. Retrofitting a11y later is painful and expensive.</li>
          <li><strong>Not maintaining it:</strong> A design system needs constant care. Budget ongoing time for updates and improvements.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Practical Roadmap: Start Small, Scale Fast
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t try to build everything at once. Here&apos;s a realistic timeline that works for teams of any size, whether you&apos;re a solo developer or a team of twenty building with React and Next.js.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Week 1: The Foundation
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-1 list-disc list-inside">
          <li>Set up design tokens in CSS variables (colors, spacing, typography, shadows)</li>
          <li>Create your Button component with multiple variants using CVA</li>
          <li>Build Input, Textarea, and Label components</li>
          <li>Write basic usage documentation for each component</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Month 1: Core Components
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-1 list-disc list-inside">
          <li>Add Card, Dialog, Dropdown, and Select components</li>
          <li>Build common patterns like login form, signup form, and settings page</li>
          <li>Add responsive utilities and ensure all components work on mobile</li>
          <li>Test everything with screen readers and keyboard navigation</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Month 3: Advanced Features
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-1 list-disc list-inside">
          <li>Data tables, charts, and complex interactive components</li>
          <li>Page layout templates for dashboards, auth pages, and marketing</li>
          <li>Formal contribution process for adding new components to the system</li>
          <li>Automated visual regression tests and accessibility audits in CI</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Bottom Line
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Start with design tokens: colors and spacing are the foundation everything else builds on</li>
          <li>Organize components in three tiers: primitives, patterns, and layouts</li>
          <li>Write documentation for every component. Nobody uses what they don&apos;t understand.</li>
          <li>Encourage contributions but maintain quality through a clear review process</li>
          <li>Measure adoption, velocity, and developer satisfaction to know if it&apos;s working</li>
          <li>Start small and add what you actually need. Don&apos;t over-engineer.</li>
          <li>Accessibility and mobile support are requirements, not nice-to-haves</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A well-built scalable design system is one of the highest-leverage investments you can make in your frontend. It makes development faster, designs more consistent, and maintenance significantly easier. Spectrum UI gives you a solid starting point built on shadcn, Radix UI, and Tailwind CSS. Use it as your foundation and customize it to fit your brand. The goal isn&apos;t perfection from day one. It&apos;s building something your team actually uses and improving it continuously over time.
      </p>
    </div>
  ),
};

export default blogPost;
