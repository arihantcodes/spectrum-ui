import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Using Storybook to Build Better Design Systems',
  excerpt:
    "Storybook isn't just a component viewer. It's a development environment that changes how you build and maintain design systems.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 27, 2026',
  readTime: '15 min read',
  icon: '📖',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Storybook Changes Everything
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building React components inside a real app is messy. You have to set up data, navigate to the
        right page, get the component into the exact right state, and then squint at it surrounded by
        all the other UI on the screen. It&apos;s slow, frustrating, and you inevitably miss edge
        cases because getting to them requires five clicks and a specific database state.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook completely changes this workflow. It lets you build UI components in isolation.
        Every variant, every state, every edge case, all visible at once on a clean canvas. It&apos;s
        like having a dedicated workbench for UI development. And it&apos;s not just for viewing
        components. It&apos;s a full development environment with testing, documentation, and
        collaboration built in. If you&apos;re building a design system or even just a moderately
        complex Next.js application, Storybook will make your frontend development significantly
        faster and more reliable.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│               Storybook in Your Workflow                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Without Storybook:                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Write    │─▶│ Navigate │─▶│ Set up   │─▶│ Visually │    │
│  │ component│  │ to page  │  │ data/    │  │ check    │    │
│  │ code     │  │ in app   │  │ state    │  │ one state│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  Repeat for EVERY state and variant... 😩                    │
│                                                              │
│  With Storybook:                                             │
│  ┌──────────┐  ┌──────────────────────────────────────┐     │
│  │ Write    │─▶│ See ALL states and variants instantly │     │
│  │ component│  │ in isolated, clean environment       │     │
│  │ + stories│  │ + auto docs + visual tests + a11y    │     │
│  └──────────┘  └──────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Setting Up Storybook in Your Project
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Getting Storybook running is surprisingly easy. The CLI auto-detects your framework (Next.js,
        Vite, Create React App, etc.) and configures everything for you. You don&apos;t need to be a
        tooling expert. Just run the init command and you&apos;re ready to start writing stories.
      </p>

      <CodeBlock
        filename="setup.bash"
        language="bash"
        code={`# Add Storybook to an existing project
npx storybook@latest init

# It detects your framework (Next.js, Vite, etc.)
# and sets everything up automatically.
# Installs dependencies, creates config files,
# and adds some example stories.

# Start Storybook
npm run storybook
# Opens at http://localhost:6006

# If you're using Tailwind CSS, make sure your
# .storybook/preview.ts imports your global styles:
# import '../app/globals.css';`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Configuring Storybook for Tailwind CSS
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Tailwind CSS in your Next.js project (which you probably are if
        you&apos;re building a modern design system), you need to make sure Storybook loads your
        Tailwind styles. This trips up a lot of developers because their components look unstyled in
        Storybook. The fix is simple: import your global CSS file in the Storybook preview configuration.
      </p>

      <CodeBlock
        filename=".storybook/preview.ts"
        language="typescript"
        code={`import type { Preview } from '@storybook/react';
import '../app/globals.css'; // This loads Tailwind CSS!

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Optional: set default viewport
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  // Optional: wrap all stories with theme provider
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export default preview;`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Writing Stories That Actually Help
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A story shows one state of one component. That&apos;s it. The key to useful stories is
        covering every variant and every important state. When someone opens your Storybook, they
        should be able to see exactly what a component looks like in every situation, without having
        to read code or guess.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Basic Story Structure
      </h3>

      <CodeBlock
        filename="Button.stories.tsx"
        language="tsx"
        code={`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // auto-generate documentation
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Every variant gets its own story
export const Default: Story = {
  args: { children: 'Button' },
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const Outline: Story = {
  args: { children: 'Cancel', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Loading: Story = {
  args: { children: 'Saving...', disabled: true },
};

// Show multiple sizes together
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Show all variants together for comparison
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        What Makes a Good Story
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Good stories are self-documenting. Someone who has never seen your component should be able
        to understand what it does, what options it has, and how it behaves just by browsing the
        stories. Here are the patterns I follow for every component in our design system:
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>One story per variant:</strong> Default, Destructive, Outline, Ghost. Each as its own story.</li>
        <li><strong>One story per important state:</strong> Loading, Disabled, Error, Empty, Focused.</li>
        <li><strong>One composition story:</strong> Show all variants side by side for easy comparison.</li>
        <li><strong>Edge case stories:</strong> Very long text, very short text, missing data, overflow scenarios.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Testing Components in Storybook
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook isn&apos;t just for viewing components. It&apos;s a full-featured testing platform.
        You can run visual regression tests, interaction tests, and accessibility audits, all from
        within Storybook. This is one of the biggest reasons to adopt it for your design system.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Visual testing:</strong> Use Chromatic to catch unintended visual changes in every PR. It takes screenshots of every story and diffs them automatically.</li>
          <li><strong>Interaction testing:</strong> Write play functions that simulate user interactions like clicking, typing, and form submission.</li>
          <li><strong>Accessibility testing:</strong> The a11y addon checks every story for WCAG violations automatically. Catches missing labels, poor contrast, and more.</li>
          <li><strong>Responsive testing:</strong> View stories at different viewport sizes to verify mobile, tablet, and desktop layouts.</li>
          <li><strong>Dark mode testing:</strong> Add a theme switcher decorator to preview components in both light and dark modes.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Writing Interaction Tests
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Play functions are one of Storybook&apos;s most powerful features. They let you simulate user
        interactions and assert results, right inside a story. This means your stories double as
        tests. When someone opens the story, they can see the interaction play out in real time.
      </p>

      <CodeBlock
        filename="LoginForm.stories.tsx"
        language="tsx"
        code={`import { within, userEvent, expect } from '@storybook/test';

export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in the email field
    await userEvent.type(
      canvas.getByLabelText('Email'),
      'user@example.com'
    );

    // Type in the password field
    await userEvent.type(
      canvas.getByLabelText('Password'),
      'securepassword123'
    );

    // Click the submit button
    await userEvent.click(
      canvas.getByRole('button', { name: 'Sign In' })
    );

    // Verify success message appears
    await expect(
      canvas.getByText('Welcome back!')
    ).toBeInTheDocument();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit without filling in fields
    await userEvent.click(
      canvas.getByRole('button', { name: 'Sign In' })
    );

    // Verify error messages
    await expect(
      canvas.getByText('Email is required')
    ).toBeInTheDocument();
  },
};`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Accessibility Testing with the A11y Addon
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The accessibility addon runs axe-core checks on every single story. It catches issues like
        missing alt text, insufficient color contrast, missing form labels, and improper heading
        hierarchy. Install it once and every component you build gets automatic accessibility
        auditing. This is incredibly valuable for web development because accessibility bugs are
        much cheaper to fix during component development than after shipping to production.
      </p>

      <CodeBlock
        filename="install-a11y.bash"
        language="bash"
        code={`# Install the accessibility addon
npm install @storybook/addon-a11y --save-dev

# Add it to .storybook/main.ts
// addons: ['@storybook/addon-a11y']

# Now every story shows an "Accessibility" tab
# with automated WCAG violation checks.
# Violations are flagged as errors with
# clear descriptions and fix suggestions.`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Design System Documentation with Storybook
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the biggest pain points with design systems is keeping documentation up to date.
        Storybook solves this elegantly. With the autodocs tag, it generates documentation from your
        stories and TypeScript types automatically. Your docs are always in sync with your code
        because they ARE your code.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Auto-Generated Docs
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you add <code>tags: [&apos;autodocs&apos;]</code> to a story&apos;s meta, Storybook
        creates a documentation page that shows the component description (from JSDoc comments), a
        live interactive example, a props table generated from your TypeScript types, and all your
        stories rendered with their source code. This alone saves hours of documentation writing per
        component.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Custom MDX Documentation Pages
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For guidelines that go beyond individual components (like color usage, spacing rules, or
        design principles), you can write custom MDX pages. MDX lets you mix Markdown with React
        components, so your docs can include live examples right alongside the text.
      </p>

      <CodeBlock
        filename="Colors.mdx"
        language="markdown"
        code={`import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';

<Meta title="Design Tokens/Colors" />

# Colors

Our color system uses CSS custom properties for theming.
All components use semantic tokens, never raw color values.

<ColorPalette>
  <ColorItem
    title="Primary"
    subtitle="--color-primary"
    colors={['hsl(221, 83%, 53%)']}
  />
  <ColorItem
    title="Destructive"
    subtitle="--color-destructive"
    colors={['hsl(0, 84%, 60%)']}
  />
  <ColorItem
    title="Muted"
    subtitle="--color-muted"
    colors={['hsl(220, 14%, 96%)']}
  />
</ColorPalette>

## Usage Guidelines
- Use **primary** for main actions, links, and focus rings
- Use **destructive** only for delete/remove actions
- Use **muted** for subtle backgrounds and secondary surfaces
- Never use raw hex or HSL values in components`}
      />

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│               Documentation Strategy                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Auto-Generated (from code):     Custom MDX Pages:           │
│  ─────────────────────────       ─────────────────           │
│  • Props table from TypeScript   • Design principles         │
│  • Live examples from stories    • Color usage guidelines    │
│  • Component description         • Spacing system docs       │
│  • Source code display           • Icon library overview     │
│  • Controls playground           • Getting started guide     │
│                                                              │
│            ┌──────────────────────────────┐                  │
│            │   Deployed Storybook Site    │                  │
│            │                              │                  │
│            │  Designers browse components │                  │
│            │  PMs check specs             │                  │
│            │  New devs learn the system   │                  │
│            │  QA verifies states          │                  │
│            └──────────────────────────────┘                  │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Visual Regression Testing with Chromatic
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Chromatic is a visual testing service built by the Storybook team. It takes a screenshot of
        every story in every PR and compares them to the baseline. If anything changed visually, it
        flags it for review. This catches the subtle bugs that unit tests miss: a padding change
        that broke a layout, a color variable that got renamed, a font that stopped loading.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        How Chromatic Fits Into Your PR Workflow
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Chromatic runs in your CI pipeline and posts visual diffs directly as PR comments. Designers
        can review and approve UI changes without pulling the branch and running the code locally.
        This is a game-changer for design-engineering collaboration. The designer sees exactly what
        changed, approves it or requests changes, and you keep moving. No more &quot;hey can you
        check if this looks right&quot; Slack messages.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Storybook Addons Worth Installing
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook has a rich addon ecosystem. Here are the ones I install on every project. They&apos;re
        all free and dramatically improve the Storybook experience.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>@storybook/addon-a11y:</strong> Automatic accessibility auditing for every story. Non-negotiable for professional web development.</li>
          <li><strong>@storybook/addon-designs:</strong> Embed Figma frames next to each component. Designers and developers see the source design alongside the implementation.</li>
          <li><strong>@storybook/addon-viewport:</strong> Preview stories at different screen sizes. Essential for responsive Tailwind CSS components.</li>
          <li><strong>@storybook/addon-themes:</strong> Toggle between light mode and dark mode. Test your design tokens in both themes.</li>
          <li><strong>@storybook/addon-measure:</strong> Overlay spacing and size measurements on any component. Great for verifying pixel-perfect implementations.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tips for Teams Using Storybook
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook is powerful on its own, but its real value emerges when a whole team adopts it.
        Here are the practices that make Storybook most effective in a team environment.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Deploy Storybook Publicly
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Deploy your Storybook to a public URL (or at least an internal one). This lets designers
        browse components without running code, product managers reference specific component states
        in tickets, QA engineers verify all variant states, and new developers learn the design system
        by exploring it interactively.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Link Stories to Figma Components
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use the design addon to embed the Figma source next to each component. This creates a direct
        visual connection between the design and the implementation. When a designer updates a Figma
        component, developers can immediately compare it to the current implementation and identify
        what needs to change.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Require Stories for Every New Component
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Make it a team rule: no story, no merge. This ensures your component library stays documented
        and browsable. It also forces developers to think about component states and variants during
        development, not as an afterthought. Add it to your PR checklist or enforce it with a CI check.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Chromatic for Visual Review in PRs
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Chromatic posts visual diffs as PR comments. Designers can approve UI changes directly in
        the PR without pulling the branch. This shortens the feedback loop from days to minutes and
        makes visual QA a natural part of the code review process.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Organizing Your Storybook
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        As your design system grows, organization becomes critical. A messy Storybook is almost as
        bad as no Storybook at all. Here&apos;s the folder structure I use for every React project.
      </p>

      <CodeBlock
        filename="story-organization.ts"
        language="typescript"
        code={`// Organize stories into clear categories using the title property

// Primitives - base building blocks
// title: 'Primitives/Button'
// title: 'Primitives/Input'
// title: 'Primitives/Badge'
// title: 'Primitives/Avatar'

// Composed - components made from primitives
// title: 'Composed/Card'
// title: 'Composed/Dialog'
// title: 'Composed/DataTable'
// title: 'Composed/CommandMenu'

// Patterns - common UI patterns
// title: 'Patterns/Forms/LoginForm'
// title: 'Patterns/Navigation/Sidebar'
// title: 'Patterns/Layout/DashboardLayout'

// Pages - full page compositions
// title: 'Pages/Dashboard'
// title: 'Pages/Settings'
// title: 'Pages/Profile'

// Design Tokens - documentation pages (MDX)
// title: 'Design Tokens/Colors'
// title: 'Design Tokens/Typography'
// title: 'Design Tokens/Spacing'`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Storybook Mistakes to Avoid
      </h2>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Writing Stories Only for the Happy Path
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you only have a &quot;Default&quot; story for each component, you&apos;re missing the point.
        The real value of Storybook is seeing edge cases: empty states, error states, loading states,
        overflow, disabled states. These are the states that cause bugs in production because nobody
        thought to test them.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Not Keeping Stories in Sync with Components
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When you add a new variant or prop to a component, add a story for it at the same time. Stale
        stories that don&apos;t reflect the current component API are worse than no stories because
        they actively mislead people. Include story updates in your PR when you change components.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Overcomplicating Story Setup
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Stories should be simple. If a story requires 50 lines of setup code, your component might
        be doing too much. Good components are easy to render in isolation. If yours isn&apos;t,
        that&apos;s a signal to refactor the component, not to write more complex stories.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Storybook Checklist
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Run <code>npx storybook@latest init</code> to get started in any React or Next.js project</li>
          <li>Import your Tailwind CSS globals in <code>.storybook/preview.ts</code></li>
          <li>Write stories for every variant and every important state of each component</li>
          <li>Add <code>tags: [&apos;autodocs&apos;]</code> to every component meta for automatic documentation</li>
          <li>Install the a11y addon for automatic accessibility testing on every story</li>
          <li>Use play functions for interaction testing of complex components</li>
          <li>Write custom MDX pages for design guidelines and token documentation</li>
          <li>Set up Chromatic for visual regression testing in your CI pipeline</li>
          <li>Deploy Storybook publicly so the whole team can browse components</li>
          <li>Link Figma designs to stories using the design addon</li>
          <li>Require stories for every new component. No story, no merge.</li>
          <li>Organize stories into clear categories: Primitives, Composed, Patterns, Pages</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Storybook has become an essential tool in modern frontend development. It transforms how you
        build, test, document, and collaborate on UI components. If you&apos;re maintaining a design
        system or building any React application with more than a handful of components, Storybook
        will pay for itself within the first sprint. Start with basic stories, add autodocs, then
        gradually adopt testing and visual regression. Your design system will be better for it.
      </p>
    </div>
  ),
};

export default blogPost;
