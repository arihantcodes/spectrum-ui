import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'Motion Design for Engineers: Making Interfaces Feel Alive',
  excerpt:
    "Good animations aren't just pretty. They guide users, give feedback, and make your React app feel polished. Here's how to do motion right with CSS and Framer Motion.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Mar 2, 2026',
  readTime: '15 min read',
  icon: '✨',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <div className="bg-muted p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">TL;DR</h3>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Animation in web development is a tool, not decoration. It shows users what happened, where things
          went, and what to focus on. CSS transitions handle 80% of what you need. Framer Motion handles the
          rest, like exit animations and layout shifts. Keep durations between 150-300ms, always use easing
          curves, only animate transform and opacity for performance, and always respect the
          prefers-reduced-motion setting for accessibility.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Motion Matters in Web Development
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Open any app you love. Linear. Raycast. Arc. Pay attention to the little movements. A sidebar
        slides in. A button gives a tiny bounce when you click. A list shuffles smoothly when you reorder
        things. Those animations aren&apos;t just for show. They help you understand what&apos;s happening.
        They make the app feel fast and alive.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The difference between a web app that feels &quot;janky&quot; and one that feels &quot;polished&quot;
        is almost always animation. And here&apos;s the good news: you don&apos;t need a design degree to
        do it well. You just need to understand a few fundamental rules and the right tools.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Whether you&apos;re building React components with Tailwind CSS, working on a Next.js application,
        or maintaining a design system, adding the right motion can transform your user experience. Let me
        show you exactly how to do it.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Fundamental Rules of UI Animation
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Before writing any animation code, you need to internalize these four rules. They apply to every
        animation you&apos;ll ever build, whether it&apos;s a simple hover effect or a complex page transition.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌─────────────────────────────────────────────────────────────────┐
│                   THE FOUR RULES OF UI MOTION                    │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  ┌─────────┐│
│  │   SPEED      │  │   EASING     │  │  PURPOSE  │  │ COORD.  ││
│  │              │  │              │  │           │  │         ││
│  │ 150-300ms    │  │ Never linear │  │ Answer a  │  │ Related ││
│  │ for most UI  │  │ ease-out in  │  │ question  │  │ things  ││
│  │ animations   │  │ ease-in out  │  │ for the   │  │ move    ││
│  │              │  │              │  │ user      │  │ together││
│  └──────────────┘  └──────────────┘  └───────────┘  └─────────┘│
└─────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Rule 1: Speed</h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most UI animations should be between 150 and 300 milliseconds. Under 100ms feels instant, like
        nothing happened. Over 500ms feels slow, like the app is lagging. The sweet spot is right in
        the middle. For tiny things like button hovers, go shorter (150ms). For bigger things like
        page transitions, go longer (300ms).
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Duration Guidelines</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Micro-interactions (hover, focus):</strong> 100-150ms</li>
        <li><strong>Standard transitions (show/hide, expand):</strong> 200-300ms</li>
        <li><strong>Page transitions:</strong> 300-400ms</li>
        <li><strong>Complex choreography:</strong> 400-600ms total</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">Rule 2: Easing</h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Never use linear easing. Nothing in the real world moves at constant speed. Things accelerate and
        decelerate. Use <code>ease-out</code> for things appearing (they arrive fast and slow down). Use
        <code> ease-in</code> for things leaving (they start slow and speed away). Use <code>ease-in-out</code> for
        things that move within the view.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Rule 3: Purpose</h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every animation should answer a question for the user. Where did this come from? What changed? Where
        did it go? If an animation doesn&apos;t answer any of these questions, it&apos;s decoration and you
        should probably remove it. Purposeful animation is the hallmark of great frontend development.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Rule 4: Coordination</h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Related things should move together, with slight delays (staggering) between them. When a list of
        items appears, they should cascade in one by one, not all pop in at the same time. This creates a
        natural, flowing feel that guides the user&apos;s eye.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        CSS Transitions: Your Starting Point
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For most stuff in web development, CSS transitions are all you need. They&apos;re fast, simple,
        don&apos;t need JavaScript, and work perfectly with Tailwind CSS. Start here and only reach for
        heavier tools when CSS can&apos;t do what you need.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Button Hover Effects</h4>

      <CodeBlock
        filename="transitions.css"
        language="css"
        code={`/* Button hover - a tiny lift */
.button {
  transition: all 150ms ease-out;
}
.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.button:active {
  transform: translateY(0);
  transition-duration: 75ms;
}

/* Card hover - feels like you're picking it up */
.card {
  transition: box-shadow 200ms ease-out, transform 200ms ease-out;
}
.card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Tailwind CSS Transitions</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You can do most of this directly in Tailwind CSS without writing custom CSS. Classes like
        <code> transition-all duration-150 ease-out hover:-translate-y-0.5</code> give you the same
        effect inline. This is one of the reasons Tailwind CSS is so popular for rapid UI development.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        CSS Keyframes: For More Complex Motion
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        When transitions aren&apos;t enough, like entrance animations, loading states, or multi-step
        sequences, use CSS keyframes. They give you fine-grained control over each step of the animation.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Entrance Animations</h4>

      <CodeBlock
        filename="keyframes.css"
        language="css"
        code={`/* Slide in from the right - great for toasts */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter {
  animation: slide-in-right 300ms ease-out forwards;
}

/* Fade up - nice for page content */
@keyframes fade-up {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Stagger list items for a nice cascade effect */
.list-item { animation: fade-up 300ms ease-out forwards; opacity: 0; }
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Using Keyframes in Tailwind CSS</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You can define custom keyframes in your <code>tailwind.config.ts</code> and use them as utility
        classes. This keeps your animation definitions consistent across your entire design system and
        makes them easy to reuse across React components.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Framer Motion: When CSS Isn&apos;t Enough
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        For layout animations, exit animations, gesture interactions, and spring physics, Framer Motion is
        the go-to library in the React ecosystem. It handles stuff that CSS simply can&apos;t do, and it
        does it with a really nice declarative API.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Animated List Example</h4>

      <CodeBlock
        filename="MotionList.tsx"
        language="tsx"
        code={`import { motion, AnimatePresence } from 'framer-motion';

// List that smoothly adds and removes items
export function TaskList({ tasks, onRemove }) {
  return (
    <AnimatePresence mode="popLayout">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3 p-3 rounded-lg border mb-2"
        >
          <span className="flex-1">{task.title}</span>
          <button onClick={() => onRemove(task.id)}>
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Why Framer Motion Shines</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The <code>AnimatePresence</code> component is what makes Framer Motion special. It lets you animate
        elements as they leave the DOM, which is impossible with pure CSS. The <code>layout</code> prop
        automatically animates position changes when items reorder. These two features alone justify adding
        Framer Motion to your React project.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Spring Physics</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Framer Motion&apos;s spring animations feel more natural than CSS easing functions because they
        simulate real physics. Instead of specifying a duration and easing curve, you specify stiffness,
        damping, and mass. The animation figures out the timing naturally. This is what makes interactions
        in apps like Linear feel so good.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Small Animations That Make a Big Difference
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You don&apos;t need complex animation sequences to make your web app feel polished. These small,
        subtle animations have the biggest impact on perceived quality.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">High-Impact Micro-Interactions</h4>
        <ul className="space-y-3">
          <li><strong>Button press:</strong> A tiny scale-down on click (scale 0.97) tells people the button registered their tap.</li>
          <li><strong>Focus ring:</strong> Fade the focus ring in over 150ms instead of having it pop in instantly. Way smoother.</li>
          <li><strong>Loading to content:</strong> Cross-fade between skeleton screens and real content. Don&apos;t just snap from one to the other.</li>
          <li><strong>Toast notifications:</strong> Slide in from the edge of the screen and stack naturally with spring physics.</li>
          <li><strong>Form errors:</strong> Shake the input gently on error. Slide the error message in instead of showing it suddenly.</li>
          <li><strong>Page transitions:</strong> Fade content out and in when navigating between pages in your Next.js app.</li>
        </ul>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">The Stagger Pattern</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        One of the most effective animation patterns is staggering. When multiple items appear at the same
        time, delay each one by 50-100ms. This creates a cascade effect that guides the user&apos;s eye down
        the list and feels much more intentional than everything appearing at once.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Performance: Keep Animations Smooth
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A pretty animation that stutters is worse than no animation. Performance is non-negotiable in
        frontend development. Here&apos;s the cheat sheet for keeping things running at 60fps.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">What to Animate (and What Not To)</h4>

      <CodeBlock
        filename="performance.css"
        language="css"
        code={`/* These are fast (GPU accelerated) - animate these */
transform: translateX(0);
opacity: 1;

/* These are slow (trigger layout recalculation) - don't animate these */
width: 100px;
height: 100px;
margin-left: 0;
padding: 16px;

/* IMPORTANT: respect people who don't want motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
      />

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌────────────────────────────────────────────────────────────┐
│              ANIMATION PERFORMANCE GUIDE                    │
│                                                            │
│  FAST (GPU)              │  SLOW (CPU)                     │
│  ────────────            │  ──────────                     │
│  transform: translate    │  width / height                 │
│  transform: scale        │  margin / padding               │
│  transform: rotate       │  top / left / right / bottom    │
│  opacity                 │  font-size                      │
│                          │  border-width                   │
│  ✓ Animate these!        │  ✗ Avoid animating these!       │
│                          │                                 │
│  Composited on GPU       │  Triggers layout recalculation  │
│  Runs at 60fps           │  Causes janky frames            │
└────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Accessibility: Reduced Motion</h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        That last part about <code>prefers-reduced-motion</code> isn&apos;t optional. Some people get
        motion sickness from animations on screen. Others have vestibular disorders that make motion
        painful. Always respect the user&apos;s system setting. In React, you can check this with the
        <code> useReducedMotion</code> hook from Framer Motion.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">Non-Negotiable</h6>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Every web application you build should handle <code>prefers-reduced-motion</code>. This is not a
        nice-to-have. It&apos;s a web accessibility requirement. Add the CSS media query above to your
        global styles and you&apos;re covered for most cases.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Common Motion Design Mistakes
      </h2>

      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Too Much Animation</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          If everything bounces, slides, and fades, nothing feels special. Be picky about what gets animated.
          The most polished apps have fewer animations than you think. They just use them in the right places.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Too Slow</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          If people notice the animation duration, it&apos;s too long. Good animations are felt, not seen.
          They should be so fast and natural that users don&apos;t consciously register them. When in doubt,
          make it faster.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Linear Easing</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Nothing moves at constant speed in the real world. Always use easing curves. <code>ease-out</code> is
          the safe default for most UI animations. Linear easing makes everything feel robotic and cheap.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Missing Exit Animations</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          If something animates in, it should animate out too. An element that fades in beautifully but
          disappears instantly feels broken. This is where Framer Motion&apos;s <code>AnimatePresence</code> is
          essential for React components.
        </p>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Ignoring Reduced Motion</h4>
        <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
          Always check <code>prefers-reduced-motion</code>. This is a web accessibility requirement, not
          a suggestion. Some of your users will have this setting enabled, and ignoring it can make your
          web app unusable for them.
        </p>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        CSS vs. JavaScript: When to Use Which
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A common question in frontend development is when to use CSS animations versus JavaScript
        animation libraries. Here&apos;s a simple guide.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Use CSS Transitions When:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>The animation is triggered by hover, focus, or a CSS class change</li>
          <li>You&apos;re moving or fading elements (transform, opacity)</li>
          <li>It&apos;s a simple A-to-B change without complex sequencing</li>
          <li>You want maximum performance with zero JavaScript overhead</li>
          <li>You&apos;re using Tailwind CSS utility classes for quick styling</li>
        </ul>

        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Use Framer Motion When:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>Elements are entering or leaving the DOM (exit animations)</li>
          <li>Elements are shifting position due to layout changes (list reordering)</li>
          <li>You need drag, swipe, or pinch gesture support</li>
          <li>You want spring physics for natural-feeling motion</li>
          <li>You need to orchestrate complex animation sequences</li>
          <li>You&apos;re building React components that need state-driven animation</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Building an Animation System for Your Design System
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re working on a design system, you should standardize your animations just like you
        standardize colors and spacing. Create a set of animation tokens that the whole team uses.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Animation Tokens to Define</h4>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Durations:</strong> fast (150ms), normal (200ms), slow (300ms), very-slow (500ms)</li>
        <li><strong>Easings:</strong> ease-out for entering, ease-in for leaving, ease-in-out for moving</li>
        <li><strong>Springs:</strong> snappy (stiffness: 300, damping: 30), gentle (stiffness: 100, damping: 20)</li>
        <li><strong>Stagger delays:</strong> 50ms between items for lists, 100ms for cards</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">Shared Motion Config</h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Create a shared motion configuration file that all your React components import from. This keeps
        animation behavior consistent across your entire web application and makes it easy to tweak
        timing globally.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Complete Motion Design Playbook
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">Summary</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Animation is a communication tool, not decoration. It shows what happened.</li>
          <li>150-300ms for most things. Always use easing curves, never linear.</li>
          <li>CSS transitions handle 80% of what you need in web development</li>
          <li>Framer Motion for exit animations, layout changes, gestures, and spring physics</li>
          <li>Only animate transform and opacity for smooth 60fps performance</li>
          <li>Always respect <code>prefers-reduced-motion</code> for accessibility</li>
          <li>Less is more. Be picky about what gets animated.</li>
          <li>If users notice the animation duration, it&apos;s too slow</li>
          <li>Standardize animation tokens in your design system like you do colors</li>
          <li>Tailwind CSS utility classes are great for quick transition effects</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Motion design is one of those skills that separates good frontend development from great frontend
        development. It doesn&apos;t take much code to make a huge difference. A few well-placed transitions
        and a couple of Framer Motion animations can transform a static-feeling React app into something that
        feels alive and polished. Start small, follow the rules, and your users will feel the difference
        even if they can&apos;t explain why.
      </p>
    </div>
  ),
};

export default blogPost;
