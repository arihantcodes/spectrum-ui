import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "Accessibility from Day One: A Design Engineer's Responsibility",
  excerpt:
    "Accessibility isn't something you bolt on later. It's part of building good software. Learn how to bake a11y into your React components from the start.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 26, 2026',
  readTime: '15 min read',
  icon: '♿',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        It&apos;s Not a Checkbox. It&apos;s How You Build Software.
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Let&apos;s get this out of the way right up front. Accessibility isn&apos;t about compliance. Yes, there are laws like WCAG, ADA, and the European Accessibility Act. And yes, you should follow them. But the real reason to care about accessibility is much simpler than that. You&apos;re building something that real people use. And some of those people navigate with keyboards. Some use screen readers. Some have low vision. Some are just sitting outside with their screen brightness cranked up because the sun is bright.
      </p>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Accessibility isn&apos;t about a small percentage of users. It&apos;s about building UI components that work for everyone, in every situation. A good button should be clickable with a mouse, tappable on a phone, activatable with a keyboard, and understandable by a screen reader. That&apos;s not a special feature. That&apos;s a well-built button.
      </p>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        As a design engineer, you touch both design and code. That means you&apos;re in a unique position to catch accessibility problems before they get baked into the product. And even better, you can build accessible patterns into the design system itself, so every team that uses your components gets accessibility for free. That&apos;s real leverage. That&apos;s why this topic matters so much for frontend development.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Design Phase    │────▶│  Build Phase     │────▶│  Test Phase      │
│                  │     │                  │     │                  │
│  Check contrast  │     │  Semantic HTML   │     │  Keyboard test   │
│  Touch targets   │     │  ARIA when needed│     │  Screen reader   │
│  Focus order     │     │  Focus management│     │  Axe-core in CI  │
│  Color not alone │     │  Keyboard support│     │  Zoom to 200%    │
└──────────────────┘     └──────────────────┘     └──────────────────┘

         Accessibility is built in at EVERY phase, not bolted on at the end.`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Same Mistakes, Over and Over Again
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        After years of reviewing code and doing accessibility audits on web applications, I keep seeing the same problems. They&apos;re not complicated to fix. They&apos;re just easy to forget if accessibility isn&apos;t part of your normal workflow. Here are the ones that come up the most.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Images Without Alt Text
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Every image needs an alt attribute. If the image is decorative (like a background pattern), use <code>alt=&quot;&quot;</code> so screen readers skip it. If the image conveys information (like a chart or a photo of a product), the alt text should describe what&apos;s shown. This is one of the simplest accessibility wins in web development.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Clickable Divs Instead of Buttons
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        If a user can click something, it should be a <code>&lt;button&gt;</code> or an <code>&lt;a&gt;</code> tag. Divs with onClick handlers don&apos;t get keyboard focus. They don&apos;t announce themselves to screen readers. They don&apos;t respond to Enter or Space keys. You can add all that behavior manually with tabIndex, role, and onKeyDown, but why would you when the native HTML element gives it to you for free?
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Low Contrast Text
      </h3>
      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        That Light Gray You Love? People Can&apos;t Read It.
      </h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Light gray text on a white background looks subtle and elegant in a design mockup. But if the contrast ratio falls below 4.5:1, a significant number of people literally cannot read it. This includes people with low vision, people on cheap monitors, and everyone who&apos;s ever tried to use their phone outside. Use the WebAIM contrast checker to verify your text colors meet WCAG AA standards.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Missing Form Labels
      </h3>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Every input needs a label. Placeholder text does not count as a label. Placeholders disappear the moment someone starts typing, leaving them with no idea what the field is for. Always use a visible <code>&lt;label&gt;</code> element connected to the input with <code>htmlFor</code>. This is critical for screen reader users and for anyone who needs to tap on a small input field on mobile.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        Other Common Pitfalls
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-3">
          <li><strong>Keyboard traps:</strong> Modals that don&apos;t handle focus correctly. Users open a dialog and can&apos;t Tab their way out. Or worse, focus escapes behind the modal and they&apos;re clicking on things they can&apos;t see.</li>
          <li><strong>No skip link:</strong> Keyboard users have to Tab through 50 navigation items before they can reach the main content. A skip-to-content link at the top of the page fixes this instantly.</li>
          <li><strong>Color alone for meaning:</strong> If red means error and green means success, people with color vision deficiency can&apos;t tell the difference. Always pair color with an icon, text, or pattern.</li>
          <li><strong>Auto-playing media:</strong> Surprising users with sound or video is bad for everyone, but especially for screen reader users whose software gets talked over.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Use the Right HTML First
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The single biggest accessibility win in frontend development is also the simplest. Use the right HTML elements. Semantic HTML gives you keyboard support, screen reader announcements, focus management, and landmark navigation completely for free. No extra code. No ARIA attributes. Just the right tags.
      </p>

      <CodeBlock
        filename="semantic-html.tsx"
        language="tsx"
        code={`// Bad: div soup. No semantics. No keyboard support.
<div className="header">
  <div className="nav">
    <div onClick={goHome}>Home</div>
    <div onClick={goAbout}>About</div>
  </div>
</div>
<div className="main-content">
  <div className="title">My Post</div>
  <div className="text">Content here...</div>
</div>

// Good: semantic HTML. Accessible by default.
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>My Post</h1>
    <p>Content here...</p>
  </article>
</main>`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        What Semantic HTML Gives You for Free
      </h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The second version in that code example gives you landmark navigation (screen readers can jump between header, nav, main, and footer). It gives you focusable, activatable links. It gives you proper heading structure so screen reader users can scan the page by headings. And it gives you correct announcements, so when a screen reader hits a link, it says &quot;Home, link&quot; instead of just &quot;Home.&quot; All of this is completely free. Zero ARIA needed.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        ARIA: When Native HTML Isn&apos;t Enough
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Sometimes you build custom UI components that don&apos;t map to any native HTML element. A toggle switch. A combobox with autocomplete. A drag-and-drop list. That&apos;s when you need ARIA (Accessible Rich Internet Applications). But here&apos;s the golden rule: if a native HTML element can do the job, use the native element. ARIA is a last resort, not a first choice. Bad ARIA is worse than no ARIA because it lies to screen readers about what something is.
      </p>

      <CodeBlock
        filename="aria-patterns.tsx"
        language="tsx"
        code={`// Custom toggle with proper ARIA
function Toggle({ pressed, onToggle, label }) {
  return (
    <button
      role="switch"
      aria-checked={pressed}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 rounded-full transition-colors",
        pressed ? "bg-primary" : "bg-gray-200"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-4 w-4 rounded-full bg-white transition-transform",
          pressed ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

// Tabs with proper roles and keyboard navigation
<div role="tablist" aria-label="Settings sections">
  <button role="tab" aria-selected={true} aria-controls="panel-1">
    General
  </button>
  <button role="tab" aria-selected={false} aria-controls="panel-2">
    Security
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  General settings content here
</div>`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        ARIA Attributes You&apos;ll Use Most
      </h4>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>aria-label:</strong> Gives a name to elements that don&apos;t have visible text (icon buttons, etc.)</li>
          <li><strong>aria-labelledby:</strong> Points to another element that serves as the label</li>
          <li><strong>aria-describedby:</strong> Points to extra descriptive text (like form help text)</li>
          <li><strong>aria-expanded:</strong> Tells screen readers if a dropdown or accordion is open or closed</li>
          <li><strong>aria-hidden:</strong> Hides decorative elements from screen readers</li>
          <li><strong>role:</strong> Tells screen readers what kind of widget something is (dialog, tab, switch, etc.)</li>
          <li><strong>aria-live:</strong> Announces dynamic content changes (like toast notifications)</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Keyboard Navigation Done Right
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Every interactive element in your web application should work with just a keyboard. No mouse required. This is non-negotiable for accessibility, and it&apos;s also great for power users who prefer keyboard shortcuts. Here are the standard patterns that users expect.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        Standard Keyboard Patterns
      </h5>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Tab:</strong> Moves focus between interactive elements (buttons, links, inputs)</li>
          <li><strong>Enter / Space:</strong> Activates buttons and links</li>
          <li><strong>Arrow keys:</strong> Navigates within composite widgets (tabs, menus, radio groups)</li>
          <li><strong>Escape:</strong> Closes modals, dropdowns, popovers, and tooltips</li>
          <li><strong>Home / End:</strong> Jumps to first or last item in a list or menu</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        Focus Trapping in Modals
      </h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When a modal dialog opens, focus should move inside it. When the user tabs through the modal&apos;s interactive elements, focus should loop back to the beginning instead of escaping behind the modal. When the modal closes, focus should return to the element that opened it. This is called focus trapping, and it&apos;s one of the most important keyboard patterns for user experience.
      </p>

      <CodeBlock
        filename="focus-trap.tsx"
        language="tsx"
        code={`// Focus trap for modals - users can't tab out accidentally
function Dialog({ open, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Move focus into the modal when it opens
    first?.focus();

    function handleKey(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
      }
    }

    dialog.addEventListener('keydown', handleKey);
    return () => dialog.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" ref={dialogRef}>
      {children}
    </div>
  );
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Visual Accessibility
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Accessibility isn&apos;t just about screen readers and keyboards. There&apos;s a whole range of visual considerations that affect a huge number of users. Getting these right improves the user experience for everyone, not just people with disabilities.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        Color and Contrast
      </h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Contrast ratios:</strong> Normal text needs 4.5:1 minimum. Large text (18px+ bold or 24px+) needs 3:1. Use the WebAIM contrast checker to verify.</li>
        <li><strong>Don&apos;t rely on color alone:</strong> If red means error, also add an icon or text label. About 8% of men and 0.5% of women have some form of color vision deficiency.</li>
        <li><strong>Focus indicators:</strong> Never remove the focus ring without replacing it with something equally visible. Users need to see where keyboard focus is.</li>
      </ul>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        Sizing and Scaling
      </h5>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Use rem for font sizes:</strong> So text scales when people change their browser font size settings. Using px locks them out.</li>
        <li><strong>Touch targets:</strong> At least 44x44 pixels on mobile. Small tap targets are frustrating for everyone and impossible for some.</li>
        <li><strong>Zoom support:</strong> Your layout should work at 200% zoom without horizontal scrolling or content being cut off.</li>
      </ul>

      <h6 className="text-sm font-semibold mt-3 mb-1 dark:text-neutral-200 text-neutral-800 uppercase tracking-wide">
        Motion and Animation
      </h6>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Some people experience motion sickness or vestibular disorders triggered by animations. Always respect the <code>prefers-reduced-motion</code> media query in your CSS. When reduced motion is requested, disable or simplify animations. Tailwind CSS makes this easy with the <code>motion-reduce:</code> variant.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌────────────────────────────────────────────────────────┐
│                  ACCESSIBILITY CHECKLIST                │
├────────────────────────────────────────────────────────┤
│                                                        │
│  PERCEIVABLE          OPERABLE          UNDERSTANDABLE │
│  ───────────          ────────          ────────────── │
│  ☐ Alt text           ☐ Keyboard nav    ☐ Clear labels │
│  ☐ Contrast 4.5:1     ☐ Focus visible   ☐ Error msgs   │
│  ☐ No color-only      ☐ No traps        ☐ Consistent   │
│  ☐ Captions           ☐ Skip links      ☐ Predictable  │
│  ☐ Resize to 200%     ☐ Touch 44px      ☐ Help text    │
│                                                        │
│  ROBUST                                                │
│  ──────                                                │
│  ☐ Valid HTML          ☐ ARIA correct    ☐ Works w/AT   │
│                                                        │
└────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        How to Test for Accessibility
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        No single tool catches everything. You need a combination of automated testing, manual testing, and assistive technology testing to get real coverage. Here&apos;s the approach that works best for frontend development teams.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        Automated Testing
      </h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Automated tools like axe-core and Lighthouse catch about 30-40% of accessibility issues. That might sound low, but it covers the easy stuff that should never ship: missing alt text, empty buttons, broken ARIA, contrast failures. Run these in your CI pipeline so you catch regressions automatically.
      </p>

      <CodeBlock
        filename="a11y-test.tsx"
        language="tsx"
        code={`// Add automated a11y tests to your React test suite
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('button has no a11y violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  expect(await axe(container)).toHaveNoViolations();
});

it('form has proper labels', async () => {
  const { container } = render(
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </form>
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('button works with keyboard', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  const button = screen.getByRole('button');
  button.focus();
  fireEvent.keyDown(button, { key: 'Enter' });
  expect(onClick).toHaveBeenCalled();
});`}
      />

      <h4 className="text-lg font-semibold mt-5 mb-2 dark:text-neutral-200 text-neutral-800">
        Manual Testing
      </h4>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        The stuff automated tools miss requires a human. Here&apos;s what you should test manually on a regular basis.
      </p>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ol className="space-y-2 list-decimal list-inside">
          <li><strong>Keyboard test:</strong> Unplug your mouse. Try to use your entire app with just the keyboard. Can you reach everything? Can you see where focus is? Can you escape from modals?</li>
          <li><strong>Screen reader test:</strong> Use VoiceOver on Mac or NVDA on Windows. Navigate your app. Does it make sense? Are things announced correctly? Can you find what you need?</li>
          <li><strong>Zoom test:</strong> Zoom your browser to 200%. Does the layout still work? Is anything cut off or overlapping?</li>
          <li><strong>Color blindness test:</strong> Use a simulator like Chrome&apos;s DevTools rendering tab to check how your UI looks with different types of color vision deficiency.</li>
          <li><strong>Reduced motion test:</strong> Enable reduced motion in your OS settings. Do your animations respect it?</li>
        </ol>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        Making Accessibility Part of Your Process
      </h2>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Accessibility can&apos;t be a thing you do at the end. It has to be woven into every step of your design and development process. Here&apos;s how to make that happen without it feeling like a burden.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        In Design Reviews
      </h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Check contrast ratios and touch targets before anyone writes a single line of code. Look at focus order. Make sure information isn&apos;t conveyed through color alone. These are easy to fix in Figma but painful to fix in React code after a component is already built and shipped.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        While Building
      </h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Add ARIA attributes and keyboard support as you build each component, not as a separate pass afterward. It&apos;s much faster to build it right the first time than to retrofit it later. Use semantic HTML as your starting point and only add ARIA when native elements can&apos;t do what you need.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        In Code Reviews
      </h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Make accessibility a standard part of your PR review checklist. Did the developer test with a keyboard? Are there proper labels on form inputs? Are interactive elements using the right HTML tags? This doesn&apos;t need to be exhaustive on every PR, but basic checks should be routine.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 dark:text-neutral-200 text-neutral-800 uppercase tracking-wide">
        In Your CI Pipeline
      </h6>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        Run axe-core in your automated test suite. Fail the build if there are new violations. This creates a safety net that catches regressions before they reach users. Pair this with visual regression testing for a really solid quality gate.
      </p>

      <h5 className="text-base font-semibold mt-4 mb-2 dark:text-neutral-200 text-neutral-800">
        In Your Design System
      </h5>
      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        This is the real multiplier. Build accessible patterns into your base UI components. When your Button component handles keyboard events, focus styles, and ARIA correctly, every team that uses that component gets all of that for free. They don&apos;t even have to think about it. That&apos;s the power of a well-built design system.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 dark:text-neutral-200 text-neutral-800">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Use semantic HTML first. It handles most accessibility for free in your web development projects.</li>
          <li>Only use ARIA when native HTML elements genuinely can&apos;t do the job.</li>
          <li>Every interactive element must work with keyboard alone. No exceptions.</li>
          <li>4.5:1 contrast ratio for text. Never use color alone to convey meaning.</li>
          <li>Test with axe-core for automated checks, plus keyboard and screen reader testing manually.</li>
          <li>Build accessible patterns into your design system components so every team benefits.</li>
          <li>Add accessibility tests to CI to catch regressions before they ship to users.</li>
          <li>Respect <code>prefers-reduced-motion</code> for users sensitive to animation.</li>
        </ul>
      </div>

      <p className="text-base font-normal dark:text-neutral-200 text-neutral-800">
        When you bake accessibility into your design system and your React components from day one, you&apos;re not doing extra work. You&apos;re doing the work right. Every component you build with proper accessibility becomes a building block that makes your entire product better for every user. That&apos;s not a compliance checkbox. That&apos;s just good engineering. And as a design engineer who works at the intersection of design and code, you&apos;re in the perfect position to make it happen.
      </p>
    </div>
  ),
};

export default blogPost;
