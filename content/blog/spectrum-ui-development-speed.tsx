import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'How Spectrum UI Accelerates Development Speed and Design Consistency',
  excerpt:
    "We spend too much time rebuilding the same primitives. Spectrum UI solves this by providing composable, accessible components that you own, cutting development time without sacrificing quality.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Oct 25, 2025',
  readTime: '8 min read',
  icon: '⚡',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Reality of Frontend Development
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Rebuilding the same button, modal, or dropdown menu for the tenth time is a massive drain on engineering resources. Teams waste countless hours debating padding, hover states, and focus outlines instead of shipping actual product features. 
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The tradeoff historically has been: move fast and ship an inconsistent, inaccessible mess, or move slow and build perfect custom components from scratch. Spectrum UI eliminates this tradeoff. You get the speed of a UI library with the control and consistency of a bespoke design system.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="font-medium text-foreground mb-4">The Workflow Shift</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-dashed border-destructive/50 bg-destructive/5 p-4 rounded-md">
            <h4 className="font-semibold text-sm mb-2 text-destructive">The Old Way</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>1. Design from scratch</li>
              <li>2. Build custom component</li>
              <li>3. Fight CSS specificity</li>
              <li>4. Discover accessibility bugs</li>
              <li>5. Repeat for every new view</li>
            </ul>
          </div>
          <div className="border border-dashed border-primary/50 bg-primary/5 p-4 rounded-md">
            <h4 className="font-semibold text-sm mb-2 text-primary">The Spectrum Way</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>1. Copy the primitive</li>
              <li>2. Paste into your codebase</li>
              <li>3. Compose and customize</li>
              <li>4. Ship feature</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Traditional Component Libraries Fail
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Traditional npm-installed component libraries trap you in their ecosystem. When you need a variant they don't support, you end up writing hacky CSS overrides or filing feature requests that take months to resolve. Spectrum UI adopts the <i>copy-paste</i> philosophy. The code lives in your repository. You own it.
      </p>

      <CodeBlock
        filename="CustomButton.tsx"
        language="tsx"
        code={`// The Spectrum UI approach: You own the code.
import { Button } from '@/components/ui/button'

export function GradientButton({ children, ...props }) {
  return (
    <Button
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
      {...props}
    >
      {children}
    </Button>
  )
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Enforcing Consistency Through Tokens
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Consistency isn't achieved through design reviews; it's achieved through constraints. Spectrum UI uses CSS variables to define a strict set of design tokens. When every developer pulls from the same token scale, the app naturally converges on a cohesive look and feel.
      </p>

      <CodeBlock
        filename="theme.css"
        language="css"
        code={`@layer base {
  :root {
    --primary: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Accessibility Is Non-Negotiable
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building an accessible dropdown menu or modal from scratch takes days. Spectrum UI primitives are built on top of Radix UI, meaning keyboard navigation, focus trapping, and screen reader announcements are handled out of the box. You get enterprise-grade accessibility without the overhead.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Summary
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Stop treating UI components like special snowflakes. Leverage Spectrum UI to handle the repetitive boilerplate, enforce strict design constraints, and ensure baseline accessibility. This lets you focus your engineering cycles on building actual product logic rather than wrestling with flexbox alignment for the hundredth time.
      </p>
    </div>
  ),
};

export default blogPost;
