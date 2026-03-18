import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'The Art of Prototyping: When to Code, When to Design',
  excerpt:
    "Should you prototype in Figma or jump straight to code? It depends on what you're trying to learn. Here's a simple way to decide.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 4, 2026',
  readTime: '15 min read',
  icon: '🧪',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Figma or Code? The Eternal Question
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You&apos;ve got a new feature to explore. You open your laptop, stare at the screen, and face
        the same question every design engineer asks: do I open Figma or my code editor? It seems
        like a trivial decision, but picking the wrong tool can waste days. I&apos;ve spent hours
        building coded prototypes for stuff that should&apos;ve been three Figma screens. I&apos;ve
        also spent hours in Figma faking complex interactions that would&apos;ve taken 20 minutes to
        build for real in React.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The trick isn&apos;t about which tool is better. It&apos;s about which tool answers your
        specific question fastest. Once you internalize this framework, you&apos;ll stop wasting time
        on the wrong approach and start shipping prototypes that actually teach you something useful.
        This guide walks you through exactly how to make that decision for every feature, every time.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────────────────────────────────────────────────┐
│                  Prototyping Decision Tree                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  What are you testing?                                       │
│       │                                                      │
│       ├── Layout & visual design?                            │
│       │       └── ✅ Figma (faster for static exploration)   │
│       │                                                      │
│       ├── User flow & navigation?                            │
│       │       └── ✅ Figma (click-through prototypes)        │
│       │                                                      │
│       ├── Complex interaction or animation?                   │
│       │       └── ✅ Code (Figma can't fake this well)       │
│       │                                                      │
│       ├── Real data & edge cases?                            │
│       │       └── ✅ Code (needs real API / data volume)     │
│       │                                                      │
│       └── Performance or accessibility?                      │
│               └── ✅ Code (only real browsers can test this) │
│                                                              │
│  Rule of thumb: If Figma can answer it, use Figma.           │
│  It's always faster for static exploration.                  │
└──────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Understanding the Fidelity Spectrum
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before diving into when to use which tool, let&apos;s talk about fidelity. Prototyping isn&apos;t
        binary. It&apos;s a spectrum from rough sketches to production code, and each level serves a
        different purpose. The mistake most frontend developers make is jumping straight to high
        fidelity when low fidelity would answer their question in a fraction of the time.
      </p>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Whiteboard / Paper:</strong> 5 minutes. Just scribble the flow and talk about it. Great for brainstorming and alignment.</li>
          <li><strong>Figma wireframes:</strong> 30 minutes. Gray boxes and basic layout. Test structure and navigation ideas without getting distracted by visual design.</li>
          <li><strong>Figma high-fidelity:</strong> A few hours. Real colors, real typography, realistic content. Good for showing stakeholders and getting sign-off.</li>
          <li><strong>Coded prototype:</strong> Half a day. Real interactions, real data, real behavior. Needed when Figma can&apos;t answer your question.</li>
          <li><strong>Production code:</strong> Days to weeks. The real thing with all the edge cases, error handling, accessibility, and tests.</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Match Fidelity to Uncertainty
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a principle that took me years to learn: the more uncertain you are about a feature,
        the lower the fidelity should be. If you don&apos;t even know what the feature should do yet,
        a whiteboard sketch is perfect. If you know the general direction but need to validate the
        layout, Figma wireframes are ideal. If the layout is settled but you&apos;re unsure about an
        interaction, code a quick prototype. Always start low and increase fidelity as certainty grows.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        When Figma Is the Better Choice
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Figma is your best friend when speed matters most and when non-technical people need to see
        and understand the work. It&apos;s faster than code for anything visual and static. Here are
        the specific situations where Figma wins every time.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Exploring Multiple Options Quickly
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You can make five different layout ideas in Figma in the time it takes to code one. Duplicate
        a frame, try a different arrangement, see how it feels. There&apos;s no compile step, no state
        management, no routing. Just pure visual exploration. This is incredibly valuable in the early
        stages of frontend development when you&apos;re still figuring out the right approach.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Communicating with Stakeholders
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Non-technical people understand Figma prototypes instantly. They can click through flows, leave
        comments, and give feedback without running a dev server. If your goal is getting approval or
        buy-in from product managers, executives, or clients, Figma is the obvious choice. Nobody wants
        to clone a repo and run <code>npm install</code> just to see a feature concept.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Visual Design Decisions
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Colors, fonts, spacing, layout composition. These are all faster to iterate on in Figma than
        in code. You can adjust a font size with a slider instead of changing a Tailwind CSS class,
        rebuilding, and checking the browser. For pure visual polish, Figma wins hands down.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        User Flow Testing
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Figma&apos;s prototyping mode lets you create click-through flows that feel surprisingly real.
        You can run usability tests with users using just Figma prototypes, which is much faster than
        building the whole flow in React. If you&apos;re testing navigation patterns or multi-step
        processes, Figma prototypes are perfectly adequate.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        When Code Is the Better Choice
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Code wins when you need to test things Figma simply cannot fake. No matter how good your
        Figma skills are, there are certain questions that only a real browser with real code can
        answer. Here&apos;s when you should skip Figma entirely and go straight to your code editor.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Real Data at Scale
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        How does the UI look with 3 items? 300? 3,000? What about items with names that are 5
        characters long versus 200 characters? Figma can show you one state at a time, but code
        lets you test the full range of data variations. If data volume or content length affects
        your UI design, you need to prototype in code.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Complex Interactions and Animations
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Drag and drop, gesture-based interfaces, real-time collaborative features, physics-based
        animations, complex form validation with dynamic rules. These interactions are either
        impossible or painfully awkward to fake in Figma. A 30-minute coded prototype with React
        and a library like Framer Motion will tell you more than a day spent trying to fake it in
        Figma&apos;s prototyping mode.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Performance Validation
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Will this animation run at 60fps? Can the browser handle rendering 1,000 list items with
        virtual scrolling? Does this layout cause expensive reflows? Figma can&apos;t answer any of
        these questions. Performance testing requires real code running in a real browser.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Accessibility Testing
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Screen readers can&apos;t parse a Figma prototype. Keyboard navigation doesn&apos;t work in
        Figma. If you need to validate that a component is accessible, you need to build it in code
        and test it with real assistive technology. This is especially important for complex UI
        components like modals, dropdown menus, and tabbed interfaces.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Quick React Prototyping Setup
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When I decide to prototype in code, speed matters more than anything. I&apos;m not writing
        production code. I&apos;m writing throwaway code to learn something. Here&apos;s my exact
        setup that gets me from zero to building in about two minutes.
      </p>

      <CodeBlock
        filename="setup.bash"
        language="bash"
        code={`# Quick start - takes about 2 minutes
npx create-next-app@latest prototype --typescript --tailwind --app
cd prototype
npx shadcn@latest add button card input dialog tabs

# Done. Start building your prototype.
# You've got Next.js, Tailwind CSS, TypeScript,
# and polished UI components ready to go.`}
      />

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Prototype Code Example: Kanban Board
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a real example. We needed to test whether drag-and-drop kanban boards would feel
        natural for our task management feature. Figma couldn&apos;t answer this. So I coded a quick
        prototype using the HTML drag and drop API.
      </p>

      <CodeBlock
        filename="Prototype.tsx"
        language="tsx"
        code={`// Quick prototype: testing drag-and-drop between columns
import { useState } from 'react';
import { Card } from '@/components/ui/card';

const SAMPLE_DATA = [
  { id: '1', title: 'Design homepage', status: 'todo' },
  { id: '2', title: 'Build API endpoints', status: 'in-progress' },
  { id: '3', title: 'Write tests', status: 'todo' },
  { id: '4', title: 'Deploy to staging', status: 'done' },
];

export function KanbanPrototype() {
  const [tasks, setTasks] = useState(SAMPLE_DATA);
  const [dragging, setDragging] = useState<string | null>(null);

  const moveTask = (taskId: string | null, newStatus: string) => {
    if (!taskId) return;
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {['todo', 'in-progress', 'done'].map(status => (
        <div
          key={status}
          className="rounded-lg bg-muted/50 p-4 min-h-[400px]"
          onDragOver={e => e.preventDefault()}
          onDrop={() => moveTask(dragging, status)}
        >
          <h3 className="font-semibold mb-3 capitalize">
            {status.replace('-', ' ')}
          </h3>
          {tasks
            .filter(t => t.status === status)
            .map(task => (
              <Card
                key={task.id}
                draggable
                onDragStart={() => setDragging(task.id)}
                className="p-3 mb-2 cursor-grab active:cursor-grabbing"
              >
                {task.title}
              </Card>
            ))}
        </div>
      ))}
    </div>
  );
}

// This is throwaway code! No error handling, no tests,
// no edge cases. That's fine. It's a prototype.
// We're testing ONE thing: does drag-and-drop feel good?`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Rules for Prototype Code
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Prototype code has different rules than production code. Understanding this difference is key
        to moving fast. Here&apos;s how I approach it:
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>No tests.</strong> You&apos;re going to throw this away. Tests would be wasted effort.</li>
        <li><strong>Inline everything.</strong> No abstractions, no shared utilities, no clever patterns. Keep it all in one file.</li>
        <li><strong>Hardcode data.</strong> Don&apos;t build an API for a prototype. Use a const array at the top of the file.</li>
        <li><strong>Skip error handling.</strong> Happy path only. If it crashes on edge cases, that&apos;s fine for now.</li>
        <li><strong>Use component libraries.</strong> shadcn/ui gives you polished components instantly. Don&apos;t build from scratch.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Decision Framework
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Not sure which tool to pick? Ask yourself these five questions. They&apos;ll give you the
        answer every time. I&apos;ve used this framework on dozens of projects and it hasn&apos;t
        steered me wrong yet.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ol className="space-y-3 list-decimal list-inside">
          <li><strong>What are you testing?</strong> Layout and visual design → Figma. Interaction and behavior → Code.</li>
          <li><strong>Who needs to see it?</strong> Stakeholders and non-technical people → Figma. Engineers and technical team → Code.</li>
          <li><strong>How complex is the interaction?</strong> Click-through flows → Figma. Drag/scroll/real-time/gesture → Code.</li>
          <li><strong>Does data volume matter?</strong> If 10 items vs 10,000 items changes the design → Code. Fixed content → Figma.</li>
          <li><strong>How fast do you need it?</strong> Under an hour → Figma almost always. Can invest half a day → Code if the question requires it.</li>
        </ol>
      </div>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Day 1-2        │     │   Day 3-4        │     │   Day 5+         │
│   EXPLORE        │     │   VALIDATE       │     │   BUILD          │
│                 │     │                 │     │                 │
│  Figma wireframe │────▶│  Figma hi-fi +   │────▶│  Production code │
│  3-5 directions  │     │  Code prototype  │     │  with confidence │
│  Quick & broad   │     │  of tricky parts │     │  about the UX    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
       │                        │                        │
       ▼                        ▼                        ▼
  "Which direction      "Does this actually     "Build it right
   should we go?"        work in practice?"      for production"`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Best Approach: Use Both Strategically
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Honestly, the best approach for any significant feature uses both tools. The key is using each
        one where it shines. Here&apos;s the workflow I follow on most projects, and it consistently
        catches problems early when they&apos;re cheap to fix instead of halfway through production
        development.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Ideal Prototyping Workflow
      </h3>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Day 1:</strong> Explore 3-5 directions in Figma wireframes. Quick, broad, low fidelity. Get feedback from the team on direction.</li>
        <li><strong>Day 2:</strong> Pick the best direction. Flesh it out in Figma with real content, proper typography, and realistic data.</li>
        <li><strong>Day 3:</strong> Code the tricky interactions that Figma can&apos;t represent. Test with real data volumes and edge cases.</li>
        <li><strong>Day 4:</strong> Combine what you learned from both. Update the Figma design based on code learnings. Update the prototype based on design refinements.</li>
        <li><strong>Day 5:</strong> Start building for real with confidence. You know the layout works (Figma told you), the interactions work (code told you), and stakeholders are aligned (Figma presentations told you).</li>
      </ul>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Why This Workflow Saves Time Overall
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This might seem slow. Five days before writing production code? But here&apos;s what actually
        happens without prototyping: you spend two weeks building a feature, ship it, get feedback
        that the interaction feels wrong, and spend another week rebuilding it. Three weeks total.
        With prototyping, you spend one week exploring and validating, then one week building with
        confidence. Two weeks total and a better result.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Figma-to-Code Handoff Tips
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Whether you&apos;re handing off to yourself or to other developers, there are some practices
        that make the transition from Figma prototype to React code much smoother.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Name Your Figma Layers Like Components
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you name your Figma frames and components the same way you&apos;d name your React components,
        the mental translation is instant. A frame called &quot;TaskCard&quot; maps directly to a
        <code>&lt;TaskCard /&gt;</code> component. A frame called &quot;Sidebar/NavItem&quot; maps to
        your component structure. This tiny habit saves significant time during implementation.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Figma Auto Layout for Everything
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Auto Layout in Figma maps directly to CSS Flexbox, which maps to Tailwind CSS utility classes.
        If your Figma design uses Auto Layout everywhere, translating it to
        <code>flex flex-col gap-4</code> in Tailwind is nearly mechanical. Fixed positioning in Figma,
        on the other hand, tells you nothing about how the layout should actually behave in code.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Document the Edge Cases
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Your Figma prototype shows the happy path. But what happens when the list is empty? When there&apos;s
        an error? When content is loading? When the user&apos;s name is 50 characters long? Add Figma
        frames for these states. They&apos;re quick to create in Figma and they prevent developers from
        having to guess during implementation. This is where design systems really shine in frontend
        development.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Tools for Faster Prototyping
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Figma + FigJam:</strong> FigJam for the initial brainstorm, Figma for the refined prototype. Use them together.</li>
          <li><strong>Next.js + shadcn/ui:</strong> The fastest way to get a coded prototype running. Pre-built React components with Tailwind CSS styling.</li>
          <li><strong>v0.dev:</strong> Vercel&apos;s AI tool can generate UI components from descriptions. Great for quick starting points.</li>
          <li><strong>Storybook:</strong> Build and test individual components in isolation before assembling the full prototype.</li>
          <li><strong>CodeSandbox / StackBlitz:</strong> Browser-based IDEs for quick prototypes you can share via URL. No setup required.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Prototyping Mindset
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The most important thing about prototyping isn&apos;t which tool you use. It&apos;s your
        mindset. A prototype exists to answer a question. Before you start, write down the question
        you&apos;re trying to answer. &quot;Will users understand this navigation pattern?&quot;
        &quot;Can we render 10,000 rows without lag?&quot; &quot;Does this color palette work in
        dark mode?&quot; If you can&apos;t articulate the question, you&apos;re not prototyping.
        You&apos;re just building stuff and hoping for the best.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Prototypes Are Meant to Be Thrown Away
      </h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is the hardest lesson for developers to internalize. That beautiful coded prototype you
        spent half a day on? Delete it. Don&apos;t refactor it into production code. Production code
        has different requirements: error handling, accessibility, testing, performance optimization,
        edge cases. Trying to evolve a prototype into production code creates technical debt from day
        one. Build the prototype, learn from it, then build the real thing from scratch with all the
        knowledge you gained.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Prototyping Checklist
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Write down the question your prototype needs to answer before you start</li>
          <li>Start at the lowest fidelity that can answer your question</li>
          <li>Figma for exploring ideas, layouts, and talking to non-technical stakeholders</li>
          <li>Code for real interactions, real data, performance, and accessibility</li>
          <li>Use Next.js + shadcn/ui + Tailwind CSS for the fastest coded prototypes</li>
          <li>Match fidelity to uncertainty. More uncertainty = lower fidelity.</li>
          <li>The best workflow uses both: Figma first for exploration, then code for validation</li>
          <li>Name Figma layers like React components for seamless handoff</li>
          <li>Document edge cases in Figma: empty states, errors, loading, long content</li>
          <li>Prototypes are disposable. Never refactor a prototype into production code.</li>
          <li>Spending a week prototyping saves two weeks of building the wrong thing</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Prototyping isn&apos;t a luxury. It&apos;s an investment. Every hour spent prototyping saves
        multiple hours of building, rebuilding, and arguing about what should have been built in the
        first place. Whether you reach for Figma or your code editor, the important thing is that
        you&apos;re exploring before committing. That&apos;s what separates good design engineering
        from just writing code and hoping it works.
      </p>
    </div>
  ),
};

export default blogPost;
