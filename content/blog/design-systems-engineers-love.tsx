import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Building Design Systems That Engineers Actually Want to Use',
  excerpt:
    "Most design systems fail because engineers hate using them. Here's how to build a React component library with Tailwind CSS that devs actually enjoy and adopt.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 6, 2026',
  readTime: '15 min read',
  icon: '🏗️',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">TL;DR</h3>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Most design systems don&apos;t fail because the components look bad. They fail because engineers
          would rather build their own stuff than fight with the system. The secret to adoption is simple
          APIs, escape hatches for edge cases, great documentation, and a balance between flexibility and
          consistency. Build your React component library with Tailwind CSS and design tokens, and always
          prioritize developer experience.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Why Most Design Systems Fail
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Here&apos;s the thing nobody talks about. Most design systems don&apos;t fail because the UI components
        look bad. They fail because engineers would rather build their own stuff than fight with the design
        system. If using your system feels like wearing a straitjacket, nobody&apos;s gonna use it. Period.
      </p>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        I&apos;ve seen this happen at company after company. A team of designers and a couple of engineers
        spend months building a beautiful component library. They launch it with great fanfare. Six months
        later, adoption is at 30%. Engineers are still writing custom CSS everywhere. The design system
        team is frustrated and confused.
      </p>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The problem isn&apos;t the components. The problem is the developer experience. The best design
        systems don&apos;t box people in. They make the right thing easy and the wrong thing hard. Let
        me show you exactly how to do that.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│                   DESIGN SYSTEM ADOPTION                      │
│                                                               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐ │
│  │ Simple API   │   │ Escape      │   │ Great docs with     │ │
│  │ Few props    │   │ hatches     │   │ copy-paste examples │ │
│  │ Good defaults│   │ className   │   │ Live previews       │ │
│  │ Composition  │   │ asChild     │   │ Do/Don't guides     │ │
│  └──────┬──────┘   └──────┬──────┘   └──────────┬──────────┘ │
│         │                 │                      │            │
│         └─────────────────┼──────────────────────┘            │
│                           │                                   │
│                           ▼                                   │
│                  ┌─────────────────┐                          │
│                  │  HIGH ADOPTION   │                          │
│                  │  Engineers love   │                          │
│                  │  using it!        │                          │
│                  └─────────────────┘                          │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Three Pillars of a Great Design System
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        After building and maintaining design systems for multiple products, I&apos;ve found that three
        things matter more than everything else combined. Get these right and engineers will actually
        want to use your system.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Pillar 1: Make the API Dead Simple</h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Your component API is what frontend developers deal with every single day. If it&apos;s confusing
        or has too many props, they&apos;ll just write their own button. A component with 20 props that
        nobody can remember versus one with 3 props that does what you need. Which one would you use?
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">The Bad Way: Prop Explosion</h4>

      <CodeBlock
        filename="bad-api.tsx"
        language="tsx"
        code={`// Bad: Way too many props. Nobody wants to write all this.
<Button
  buttonType="primary"
  buttonSize="medium"
  isDisabled={false}
  hasIcon={true}
  iconPosition="left"
  iconName="plus"
  fullWidth={false}
  isLoading={false}
  loadingText="Please wait..."
  onClick={handleClick}
>
  Add Item
</Button>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">The Good Way: Composition and Defaults</h4>

      <CodeBlock
        filename="good-api.tsx"
        language="tsx"
        code={`// Good: Simple, uses composition, has good defaults
<Button variant="default" size="md" onClick={handleClick}>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">API Design Rules I Follow</h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Keep the props count low. Five or fewer for most React components. Make defaults sensible so that
        the most common usage requires zero or one prop. Use the same naming patterns across all components
        in your library.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Consistent naming:</strong> If one component uses <code>variant</code>, they all use <code>variant</code></li>
        <li><strong>Sensible defaults:</strong> The zero-prop version should be the most common usage</li>
        <li><strong>Composition over configuration:</strong> Let developers put children inside, don&apos;t make them pass JSX as props</li>
        <li><strong>TypeScript everywhere:</strong> Autocomplete is the best documentation</li>
      </ul>

      <h6 className="text-sm font-semibold mt-3 mb-1 dark:text-neutral-200 text-neutral-800 uppercase tracking-wide">Rule of Thumb</h6>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        If a developer needs to check the docs every time they use your component, the API is too complicated.
        The best React components feel obvious. You can guess the props just by thinking about what the
        component does.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Pillar 2: Always Give Escape Hatches</h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        You can&apos;t predict every use case. Don&apos;t even try. Instead, give frontend developers ways to
        customize things without breaking the whole design system. This is where most systems go wrong.
        They&apos;re either too rigid or too loose.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Escape Hatch Patterns</h4>

      <CodeBlock
        filename="escape-hatches.tsx"
        language="tsx"
        code={`// Escape hatch 1: className for custom Tailwind CSS styles
<Card className="border-2 border-primary">
  Custom styled card
</Card>

// Escape hatch 2: asChild for custom elements
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>

// Escape hatch 3: Compound components for full layout control
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick one..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
  </SelectContent>
</Select>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Why Escape Hatches Build Trust</h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When engineers know they can always customize things when they need to, they trust the design system
        more. They&apos;re more willing to start with the standard component because they know they won&apos;t
        be stuck if they hit an edge case. More flexibility actually leads to more consistency.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Pillar 3: Write Documentation People Actually Read</h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Let&apos;s be real. Engineers don&apos;t read docs from top to bottom. They scan for the code example
        that looks like what they need, copy it, and tweak it. Your documentation should work for that
        behavior pattern, not fight against it.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">What Great Docs Include</h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Live examples</strong> for every variant that engineers can interact with</li>
          <li><strong>A copy button</strong> on every code block for instant clipboard access</li>
          <li><strong>A props table</strong> that&apos;s easy to scan with types and defaults shown</li>
          <li><strong>Do and Don&apos;t examples</strong> showing correct and incorrect usage</li>
          <li><strong>Composition examples</strong> showing components working together</li>
          <li><strong>Accessibility notes</strong> explaining ARIA attributes and keyboard behavior</li>
        </ul>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Storybook as Living Documentation</h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Storybook is the gold standard for design system documentation. It shows your React components in
        isolation, lets engineers interact with all the props, and automatically generates documentation
        from your TypeScript types. If you&apos;re building a component library, Storybook should be your
        very first setup step.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 dark:text-neutral-200 text-neutral-800 uppercase tracking-wide">Documentation Anti-Patterns</h6>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>Long paragraphs explaining the component philosophy (nobody reads these)</li>
        <li>Missing code examples (the most important part)</li>
        <li>Outdated docs that don&apos;t match the current API</li>
        <li>No search functionality</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Patterns That Work Well in Production
      </h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">Variants with CVA (Class Variance Authority)</h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Class Variance Authority gives you a clean, type-safe way to handle component variants. It works
        beautifully with Tailwind CSS and gives you autocomplete in VS Code for free. This is the pattern
        used by shadcn/ui and most modern React component libraries.
      </p>

      <CodeBlock
        filename="badge.tsx"
        language="tsx"
        code={`import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// Dead simple to use:
<Badge>Default</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Why CVA Works So Well</h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        CVA gives you full TypeScript support. Your editor knows all the valid variants and sizes. It
        merges Tailwind CSS classes properly so you don&apos;t get conflicts. And it plays nicely with
        the <code>className</code> escape hatch we talked about earlier.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Compound Components for Complex UI</h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        For complex UI components, let frontend developers put the pieces together however they want. This
        is the compound component pattern, and it&apos;s what makes libraries like Radix UI so powerful.
      </p>

      <CodeBlock
        filename="card.tsx"
        language="tsx"
        code={`// Each piece is its own component
<Card>
  <CardHeader>
    <CardTitle>Team Members</CardTitle>
    <CardDescription>Manage your team access</CardDescription>
  </CardHeader>
  <CardContent>
    <UserList users={team} />
  </CardContent>
  <CardFooter>
    <Button>Invite Member</Button>
  </CardFooter>
</Card>

// Don't need a header? Just skip it.
<Card className="p-4">
  <p>Simple content, no header needed.</p>
</Card>

// Want a custom layout? Go for it.
<Card>
  <CardContent className="flex gap-4">
    <Avatar />
    <div>
      <CardTitle>Custom Layout</CardTitle>
      <p>Arranged however you want.</p>
    </div>
  </CardContent>
</Card>`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Design Tokens: The Foundation Layer
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Design tokens are the shared values that keep your design system consistent. Colors, font sizes,
        spacing values, border radii, shadows. All of these should be defined as tokens and used everywhere.
        In a Tailwind CSS setup, your tokens live in your <code>tailwind.config.ts</code> file.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────┐
│              DESIGN TOKENS                    │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │  PRIMITIVE TOKENS (raw values)          │  │
│  │  blue-500: #3B82F6                      │  │
│  │  gray-100: #F3F4F6                      │  │
│  │  space-4: 16px                          │  │
│  └────────────────┬────────────────────────┘  │
│                   │                           │
│                   ▼                           │
│  ┌─────────────────────────────────────────┐  │
│  │  SEMANTIC TOKENS (meaning)              │  │
│  │  --primary: var(--blue-500)             │  │
│  │  --background: var(--gray-100)          │  │
│  │  --card-padding: var(--space-4)         │  │
│  └────────────────┬────────────────────────┘  │
│                   │                           │
│                   ▼                           │
│  ┌─────────────────────────────────────────┐  │
│  │  COMPONENT TOKENS (specific)            │  │
│  │  --button-bg: var(--primary)            │  │
│  │  --card-bg: var(--background)           │  │
│  │  Tailwind: bg-primary, bg-background    │  │
│  └─────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Why This Layered Approach Matters</h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When you change your primary brand color, you update one primitive token and everything cascades.
        When you add dark mode, you just swap the semantic token values. This is the power of a
        well-structured token system in your Tailwind CSS configuration.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Flexibility vs. Consistency Balance
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        This is the hardest part of building a design system. Too strict and people work around you. Too
        loose and everything looks different. Here&apos;s the framework I use to decide what to lock down
        and what to leave open.
      </p>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Lock Down Completely</h4>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Colors, font sizes, spacing values, and border radii. These come from design tokens only. No
          exceptions. No arbitrary values in Tailwind CSS. This is your consistency foundation.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Guide With Defaults</h4>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Component variants and standard patterns. Give people the common options through props. Let
          them override with <code>className</code> for edge cases. This covers 90% of use cases while
          leaving room for the other 10%.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Leave Completely Open</h4>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Layout and composition. Let frontend developers arrange React components however they need. Don&apos;t
          force page structures or rigid grid layouts. Every page is different and your design system should
          support that.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Rolling Out to Your Team
      </h2>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Start Small and Grow</h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Don&apos;t try to build 50 components before launching. Start with 5 to 10 that every team needs:
        Button, Input, Card, Dialog, and maybe a few more. Get those right, get teams using them, then
        expand based on what people actually ask for.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Make Migration Easy</h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        If engineers have to rewrite entire pages to adopt your system, they won&apos;t do it. Make your
        React components drop-in replacements that can be adopted one component at a time.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Accept Contributions</h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Open your design system to contributions from other teams. When engineers can add the variants and
        components they need, they feel ownership over the system. That ownership drives adoption more than
        any mandate from leadership.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Contribution Guidelines</h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li>Clear PR template for new components</li>
        <li>Required Storybook stories and TypeScript types</li>
        <li>Accessibility checklist for every new UI component</li>
        <li>Visual regression tests with Chromatic</li>
        <li>Quick review turnaround (48 hours or less)</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        How to Measure Success
      </h2>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Quantitative Metrics</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Adoption rate:</strong> What percentage of the UI uses design system React components?</li>
        <li><strong>Custom CSS volume:</strong> If engineers write lots of custom styles, your system has gaps</li>
        <li><strong>Feature shipping speed:</strong> Are teams building things quicker after adopting the system?</li>
        <li><strong>Bug count:</strong> Are UI bugs decreasing as adoption increases?</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Qualitative Signals</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Developer satisfaction:</strong> Run a quick survey every quarter. Are devs happy using the system?</li>
        <li><strong>Voluntary contributions:</strong> Are engineers contributing new components back? That&apos;s the best sign.</li>
        <li><strong>Word of mouth:</strong> Are engineers recommending the system to other teams without being asked?</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Common Pitfalls to Avoid
      </h2>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Over-Engineering From Day One</h5>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Don&apos;t build for every possible future use case. Build for what you need today and make it
          easy to extend later. A simple component that ships this week is better than a perfect component
          that ships next month.
        </p>

        <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Ignoring Developer Feedback</h5>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          If engineers keep asking for the same feature or complaining about the same friction point, listen
          to them. They&apos;re your users. Their feedback is gold.
        </p>

        <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Breaking Changes Without Migration Paths</h5>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Nothing destroys trust in a design system faster than breaking changes that force engineers to
          rewrite code. Always provide migration guides and codemods. Deprecate before removing.
        </p>

        <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">Design Purity Over Developer Experience</h5>
        <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
          Sometimes the &quot;correct&quot; design pattern creates a terrible developer experience. In those
          cases, developer experience should win. A system that&apos;s slightly impure but highly adopted
          beats a pristine system that nobody uses.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Complete Playbook
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">Summary of Key Principles</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Design systems fail when they care more about design purity than developer experience</li>
          <li>Keep React component APIs simple. Composition over configuration, always.</li>
          <li>Always give escape hatches: className props, asChild pattern, compound components</li>
          <li>Make documentation copy-paste friendly with live examples in Storybook</li>
          <li>Lock down design tokens, guide component usage, leave layout completely open</li>
          <li>Use CVA and Tailwind CSS for type-safe, maintainable component variants</li>
          <li>Start with 5-10 components, ship them, then grow based on real needs</li>
          <li>Measure adoption quantitatively and developer satisfaction qualitatively</li>
          <li>Accept contributions from other teams to build ownership</li>
          <li>Never ship breaking changes without migration paths</li>
        </ul>
      </div>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The best design system is one that engineers reach for because they want to, not because someone
        told them to. Make that your north star and adoption will follow naturally. Every decision you make
        about your React component library, your Tailwind CSS configuration, and your design tokens should
        be filtered through one question: does this make the developer&apos;s life easier?
      </p>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        If the answer is yes, ship it. If the answer is no, rethink it. That simple test will guide you to
        building a design system that engineers genuinely love using.
      </p>
    </div>
  ),
};

export default blogPost;
