import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'The Design Engineer Toolbox: What I Use Every Day in 2026',
  excerpt:
    "A practical rundown of the tools, extensions, and setups I use daily as a design engineer. No fluff, just what actually helps.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 8, 2026',
  readTime: '15 min read',
  icon: '🧰',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every few months, someone on Twitter asks &quot;what tools do design engineers actually use?&quot; and the replies are always a mix of genuinely useful recommendations and tools people tried once for a blog post and never opened again. I wanted to write something different. These are the tools I actually open every single working day. The ones that have survived months of use, the ones I&apos;d miss immediately if they disappeared. No sponsorships, no affiliate links, just honest recommendations from someone who lives at the intersection of design and frontend development.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        My philosophy on tools is simple: keep it small, master what you have. I&apos;d rather be excellent with five tools than mediocre with twenty. Every tool you add to your workflow has a maintenance cost: updates, keyboard shortcuts to remember, context switching overhead. So I&apos;m ruthless about what stays in my toolbox. If it doesn&apos;t save me time or make my work measurably better, it&apos;s gone.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Let&apos;s break it down by category. I&apos;ll cover my code editor setup, design tools, development stack, browser extensions, component development workflow, AI tools, and daily resources. Whether you&apos;re just getting into design engineering or you&apos;re a veteran looking to sharpen your toolkit, there&apos;s something here for you.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Code Editor Setup
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your code editor is where you spend most of your day, so getting it right matters more than almost any other tool decision. I bounce between VS Code and Cursor depending on the task. For most React and Next.js work, Cursor&apos;s AI features give me a noticeable speed boost, especially for generating component boilerplate and writing repetitive Tailwind CSS patterns. For detailed debugging or when I need maximum control, VS Code is still king.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mt-6 mb-3">Essential Extensions</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Tailwind CSS IntelliSense</strong> - Autocompletes classes, shows color previews, and sorts classes. This is genuinely non-negotiable for any Tailwind CSS project. The autocomplete alone saves me hundreds of keystrokes per day.</li>
          <li><strong>Error Lens</strong> - Shows errors and warnings inline right next to the problematic code instead of making you hover. Once you use this, you can&apos;t go back to squinting at red underlines.</li>
          <li><strong>Pretty TypeScript Errors</strong> - TypeScript errors can be absolutely unreadable. This extension formats them into something a human can actually parse. Essential for frontend development with TypeScript.</li>
          <li><strong>SVG Preview</strong> - See SVG files rendered right in the editor. Super useful when working with icon systems.</li>
          <li><strong>Color Highlight</strong> - Shows actual colors next to hex, rgb, and hsl values in your code. Tiny thing but incredibly useful when theming.</li>
          <li><strong>GitLens</strong> - Inline git blame, line history, and branch comparisons. Helpful when you need to understand why a design decision was made months ago.</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Editor Settings That Matter
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Beyond extensions, a few settings make a big difference for design engineering work. I use a font with ligatures (JetBrains Mono or Fira Code) because the arrow and comparison ligatures make JSX easier to scan visually. I set my tab size to 2 spaces for consistent indentation with the React and Tailwind CSS ecosystem. And I enable format-on-save with Prettier so I never think about formatting. These sound like small things, but they compound. Every micro-decision you automate frees up brain power for actual design and engineering work.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Terminal Setup
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I use the integrated terminal in VS Code with oh-my-zsh and a minimal prompt. Having your terminal right next to your code means you never lose context. I keep it split horizontally so I can see my dev server output while browsing files. For standalone terminal work, Warp is excellent with its AI command suggestions and block-based output format.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Design Tools
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        As a design engineer, you need to be fluent in design tools even if you&apos;re not the one creating the designs. You&apos;ll spend a lot of time inspecting designs, extracting values, and understanding design intent. Here&apos;s what I use daily.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Figma</strong> - For inspecting designs, grabbing specs, and understanding component structure. Dev Mode is a genuine game changer for extracting CSS values and understanding spacing. I spend at least 30 minutes a day in Figma.</li>
        <li><strong>Tokens Studio</strong> - Figma plugin for design tokens that syncs to GitHub automatically. This is the bridge between design and code. When a designer updates a token, it creates a PR in our repo. Incredibly powerful for maintaining a consistent design system.</li>
        <li><strong>WebAIM Contrast Checker</strong> - I use this constantly for accessibility. Quick way to verify that your text color has sufficient contrast against its background. I have it bookmarked and open it multiple times a day when working on themes or new UI components.</li>
        <li><strong>Phosphor Icons</strong> - Clean, consistent icon set with React components. They&apos;re lightweight, well-designed, and have great TypeScript support. I used to use Lucide but switched to Phosphor for the broader set of weights and styles.</li>
        <li><strong>Coolors</strong> - For generating color palettes when I need to create or extend a theme. It&apos;s faster than tweaking HSL values manually and gives me good starting points that I can fine-tune.</li>
      </ul>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`My Daily Tool Flow:

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Figma    │    │  VS Code  │    │  Browser  │    │  Deploy   │
│  Inspect  │───▶│  / Cursor │───▶│  DevTools │───▶│  Preview  │
│  Design   │    │  Build    │    │  Test     │    │  Review   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
      │                │               │               │
      ▼                ▼               ▼               ▼
  Extract         Write React      Check a11y     Get design
  tokens &        components       responsive     feedback
  spacing         with Tailwind    dark mode      iterate`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Development Stack
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        My go-to stack has been remarkably stable for the past year. Next.js with the App Router, Tailwind CSS for styling, shadcn/ui as the component foundation, and Framer Motion for animations. This combination gives me the best balance of speed, flexibility, and polish. Here&apos;s the exact setup I use when starting a new project.
      </p>

      <CodeBlock
        filename="stack.bash"
        language="bash"
        code={`# My go-to project setup
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir
cd my-app

# Core UI dependencies
npx shadcn@latest init
npx shadcn@latest add button card input dialog sheet tabs

# Animation
npm install framer-motion

# Utilities
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react  # icons

# Form handling
npm install react-hook-form @hookform/resolvers zod

# Dev tools
npm install -D @axe-core/react  # accessibility checking
npm install -D prettier prettier-plugin-tailwindcss`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Why This Stack Works
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every piece of this stack earns its place. Next.js gives me server components, file-based routing, and seamless deployment to Vercel. Tailwind CSS keeps styling co-located with components and eliminates CSS naming debates. shadcn/ui provides accessible, well-designed UI components that I own and can customize freely. Framer Motion handles the animations that make interfaces feel alive. And the utility trio of clsx, tailwind-merge, and class-variance-authority makes building variant-based component APIs a breeze.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Utility Functions I Can&apos;t Live Without
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>cn()</code> utility from shadcn/ui combines clsx and tailwind-merge into one function. It lets you conditionally apply classes and intelligently merge conflicting Tailwind utilities. I use it in literally every component I build. If there&apos;s one utility function that defines modern React design system development, this is it.
      </p>

      <CodeBlock
        filename="utils.ts"
        language="typescript"
        code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// The most important utility in my entire codebase
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage: merge base styles with conditional and override classes
<div className={cn(
  "rounded-lg border p-4",           // base
  isActive && "border-primary",       // conditional
  className                           // consumer override
)} />`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Browser Extensions
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your browser is your testing environment. These extensions turn it into a powerful inspection and debugging tool for web development. I use Chrome as my primary browser for development because of the DevTools, but most of these work in Firefox too.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>axe DevTools</strong> - Find accessibility issues on any page. It catches WCAG violations, missing alt text, poor contrast ratios, and more. I run this on every page I build before considering it done. It&apos;s the single most impactful accessibility tool I use.</li>
        <li><strong>VisBug</strong> - Inspect and edit any page visually. Drag elements around, change colors, tweak spacing. Great for quick experiments and showing designers what a change would look like without writing code.</li>
        <li><strong>Responsive Viewer</strong> - See multiple screen sizes at once in a single tab. Way faster than resizing the browser window back and forth. I use it for responsive Tailwind CSS layouts.</li>
        <li><strong>ColorZilla</strong> - Grab colors from any webpage with an eyedropper. Useful when trying to match a design or investigate how another site handles their color system.</li>
        <li><strong>Fonts Ninja</strong> - Identify fonts, sizes, and line heights on any website. Great for design research and competitive analysis.</li>
        <li><strong>React DevTools</strong> - Inspect component trees, props, and state. Essential for debugging React applications and understanding component hierarchies.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Component Development Workflow
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Building UI components in isolation is a best practice that dramatically improves both quality and speed. When you build a component in context (on a full page), you tend to miss edge cases because you only see one configuration. Building in isolation forces you to think about all the variants, states, and edge cases upfront. Here are the tools that support this workflow.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Storybook</strong> - Build React components in isolation. Show all variants, states, and props combinations in a single place. It&apos;s also amazing documentation for your design system. When a new engineer joins the team, they can browse every component visually.</li>
        <li><strong>Chromatic</strong> - Visual regression testing that catches unintended UI changes in pull requests. Every PR gets screenshots compared against the baseline. If a button shadow changes by 1px, you&apos;ll know about it before it ships.</li>
        <li><strong>shadcn/ui</strong> - Copy-paste components that you own. The best starting point for any design system. I don&apos;t use it as-is for production. I use it as a foundation and customize heavily. That&apos;s the whole point.</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        My Component Building Process
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I have a consistent process for building every new component. It sounds rigid but it saves me from constantly going back to add things I forgot. Start with the component API (what props does it accept?), then build the structure with semantic HTML, add styling with Tailwind CSS, implement interactive states, add accessibility attributes, and finally polish with animations. I&apos;ll detail this workflow below.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Component Building Pipeline:

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  1. API   │    │  2. HTML  │    │ 3. Style  │    │ 4. A11y  │
│  Design   │───▶│  Semantic │───▶│  Tailwind │───▶│  ARIA    │
│  Props    │    │  Structure│    │  Tokens   │    │  Focus   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                    ┌──────────┐    ┌──────────┐      │
                    │ 6. Test   │◀───│ 5. Polish│◀─────┘
                    │  Edge     │    │  Motion  │
                    │  Cases    │    │  Hover   │
                    └──────────┘    └──────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        AI Tools That Actually Help
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        I&apos;m selective about AI tools. There&apos;s a lot of hype and a lot of tools that sound amazing in demos but don&apos;t hold up in real daily work. Here are the ones that have genuinely stuck in my workflow and that I reach for regularly.
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Cursor</strong> - AI coding assistant built into a VS Code fork. Great for generating React component boilerplate, writing repetitive Tailwind CSS patterns, and autocompleting based on context. It&apos;s not perfect, but it&apos;s fast enough that the time savings outweigh the occasional wrong suggestion. I use it daily.</li>
        <li><strong>v0 by Vercel</strong> - Generates React and Tailwind CSS components from text descriptions. The quality is surprisingly good for starting points. I use it when I need a component structure quickly and want to skip the boilerplate phase. I always rewrite the output, but it gives me a solid skeleton.</li>
        <li><strong>Claude</strong> - For rubber-ducking design decisions, reviewing component APIs, brainstorming interaction patterns, and writing documentation. It&apos;s excellent at thinking through the edge cases of a component API design. I also use it to draft accessibility strategies for complex UI components.</li>
      </ul>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Where AI Falls Short
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        AI is great for scaffolding but terrible for final polish. It generates decent structure but mediocre design taste. It can write a form component but it won&apos;t obsess over the 2px spacing adjustment that makes it feel right. The detail work, the craft, the design sensibility, that&apos;s still 100% human. Use AI to go fast, then slow down and apply your own judgment for the finishing touches.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Websites and Resources I Check Daily
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Staying current in the frontend development space requires intentional information consumption. Here are the resources I actually visit regularly, not just bookmarked and forgot about.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>ui.shadcn.com</strong> - Component reference, new additions, and example layouts. I check this weekly for new components and patterns.</li>
          <li><strong>tailwindcss.com/docs</strong> - I still look up Tailwind CSS classes regularly. No shame. The docs are excellent and I always discover utilities I forgot existed.</li>
          <li><strong>motion.dev</strong> - Framer Motion docs and examples. Animation APIs are complex enough that I reference these regularly.</li>
          <li><strong>a11yproject.com</strong> - Accessibility checklist and resources. Great for quick reference when building interactive components.</li>
          <li><strong>github.com/trending</strong> - See what&apos;s new in UI and design tools. I filter by TypeScript and check weekly.</li>
          <li><strong>nextjs.org/blog</strong> - Stay updated on Next.js features and best practices. The framework moves fast.</li>
          <li><strong>web.dev</strong> - Google&apos;s web development resource for performance, accessibility, and modern web APIs.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        My Daily Workflow
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s what a typical day of design engineering work looks like for me. The order matters because each step builds on the previous one. Skipping steps or doing them out of order usually leads to rework.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ol className="space-y-2 list-decimal list-inside">
          <li><strong>Open Figma, inspect the design, write down questions.</strong> Don&apos;t start coding until you understand the design intent. Identify which parts map to existing components and which are new.</li>
          <li><strong>Map design values to existing tokens.</strong> Open VS Code, check your Tailwind config or CSS variables. Every color, spacing value, and font size should map to an existing token. If it doesn&apos;t, talk to the designer.</li>
          <li><strong>Build components in isolation.</strong> Start with structure, add styling, then behavior. If using Storybook, create stories for all variants.</li>
          <li><strong>Check accessibility with axe DevTools.</strong> Run the checker on every component page. Fix issues immediately while the context is fresh.</li>
          <li><strong>Test responsive behavior with browser dev tools.</strong> Check at least 375px, 768px, and 1280px. Use the responsive viewer extension for a quick overview.</li>
          <li><strong>Add micro-interactions last.</strong> Hover states, focus rings, transitions, and entrance animations. These are the polish that makes it feel professional.</li>
          <li><strong>Get a design review before merging.</strong> Deploy a preview, share the link with the designer, and iterate. This catches issues that are only visible in a real browser.</li>
        </ol>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>VS Code or Cursor plus Tailwind CSS IntelliSense is non-negotiable for modern frontend development</li>
          <li>Figma Dev Mode for inspecting designs and extracting accurate values</li>
          <li>shadcn/ui as a component foundation that you own and customize</li>
          <li>axe DevTools for catching accessibility issues before they ship</li>
          <li>AI tools for scaffolding and boilerplate, not for final code or design decisions</li>
          <li>Build components in isolation, then integrate into pages</li>
          <li>Keep your toolbox small and master what you have</li>
          <li>Stay current with a few key resources rather than trying to follow everything</li>
          <li>Always get a design review on a real deployed preview before merging</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The tools don&apos;t make the design engineer. Your eye for detail, your understanding of user experience, and your ability to bridge the gap between design and code, those are what make you valuable. But the right tools remove friction and let you focus on the craft instead of fighting your environment. Find the tools that work for your workflow, master them, and don&apos;t chase every shiny new thing that shows up on your timeline. The best toolbox is one you actually use every day.
      </p>
    </div>
  ),
};

export default blogPost;
