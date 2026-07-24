export const FAQS_PART_B: Record<string, { question: string; answer: string }[]> = {
  "typography-for-developers": [
    {
      question: "How should developers set up typography in a UI?",
      answer:
        "Make five decisions once and apply them everywhere: pick one variable sans family, define a fixed six to seven step size scale, set line height that tightens as text grows, cap line length at 45-75 characters, and use tabular numbers for changing digits.",
    },
    {
      question: "What font size and line height should body text use?",
      answer:
        "Set body text to 16px with a line height around 1.5, and never drop text people actually read below 14px. Large headings from 32 to 48px want tighter leading near 1.1, since the bigger the text, the tighter the line height should be.",
    },
    {
      question: "How do I stop text lines from being too long to read?",
      answer:
        "Cap body text at 45-75 characters per line with max-width: 65ch. Long lines tire the eye because tracking back to the left edge makes readers lose their place, and that single declaration fixes most walls of text.",
    },
  ],
  "spacing-systems-ui": [
    {
      question: "How do I fix inconsistent spacing that makes my UI look off?",
      answer:
        "Build every margin, padding, and gap on one base unit multiplied out, typically 4px giving 4, 8, 12, 16, 24, and 32px. Eyeballed, off-scale values are the main reason UIs look unprofessional, and a fixed scale makes alignment fall out of the system for free.",
    },
    {
      question: "Should I use gap or margin for spacing in CSS?",
      answer:
        "Use gap. Set the parent to display: flex or grid and control rhythm with gap, which spaces every child evenly with no margin-collapsing surprises. When spacing lives on the container, adding or removing a child never breaks the layout, and responsive tweaks become a single value change.",
    },
    {
      question: "Why is 4px a good base unit for a spacing system?",
      answer:
        "4px divides cleanly, gives fine control at the small end, and lands on whole pixels so edges stay crisp. Tailwind CSS uses this by default, where one spacing unit equals 4px. Odd bases like 5 or 6 push halves onto fractional pixels and make edges look fuzzy.",
    },
  ],
  "color-systems-web-apps": [
    {
      question: "How do I build a color system for a web app without a designer?",
      answer:
        "Stop choosing individual colors and build ramps: one hue at eleven fixed lightness steps from 50 to 950, generated once with a tool like Radix Colors or an OKLCH generator. Then alias semantic tokens on top so components reference meaning instead of raw hex.",
    },
    {
      question: "What contrast ratio does text need to be accessible?",
      answer:
        "Body text needs a 4.5:1 contrast ratio against its background, while large text and UI elements can drop to 3:1. Test each color pair once with a contrast checker such as the one built into Chrome DevTools, and never ship a gray you have not verified.",
    },
    {
      question: "What are semantic color tokens and why should I use them?",
      answer:
        "Semantic tokens are named aliases like background or foreground that point at a step in a color ramp, so components never reference a raw shade like blue-600. Rebranding then means repointing a handful of aliases instead of find-and-replacing hex across the whole app.",
    },
  ],
  "forms-that-dont-suck": [
    {
      question: "How do I build forms with higher completion rates?",
      answer:
        "Follow four rules: keep a visible label above every input, validate on blur rather than on every keystroke, write errors that say how to fix the problem, and stack fields in a single column. Each removes friction at the points where users typically drop off.",
    },
    {
      question: "When should form validation fire, on keystroke or on blur?",
      answer:
        "Validate on blur, when the user leaves a field, not on every keystroke, since flagging an invalid email on the second character nags instead of helps. Once a field has errored, re-check on input so the user watches it clear in real time.",
    },
    {
      question: "Should form fields be laid out in one column or two?",
      answer:
        "Stack fields in a single column so there is one clear path down the page; side-by-side fields make the eye zigzag and the second column gets skipped. The only fair exception is tightly related pairs like city and state or card expiry and CVC.",
    },
  ],
  "common-ui-ux-mistakes": [
    {
      question: "What are the most common UI mistakes and how do I fix them?",
      answer:
        "The recurring ones are too many near-identical grays, missing hover and focus states, tap targets under 44x44px, and inconsistent corner radii. Fix them with about four neutrals from one ramp, styled focus-visible states, 44px targets, and two or three radius values on a scale.",
    },
    {
      question: "How many gray shades should a UI use?",
      answer:
        "Most apps need only about four neutrals: a background, a subtle surface, a border, and text, all pulled from one ramp. Apps accumulate ten or twelve slightly different grays because everyone eyeballs a new one instead of reusing the last, so delete the extras.",
    },
    {
      question: "How big should touch targets be in a UI?",
      answer:
        "Make touch targets at least 44x44px, Apple's guideline number and a solid floor everywhere. If the icon is smaller, pad the hit area rather than shrinking the control, and leave at least 8px between targets so a thumb does not trigger the neighboring one.",
    },
  ],
  "dark-mode-done-right": [
    {
      question: "How do I build dark mode properly in a web app?",
      answer:
        "Treat dark mode as a separate palette with its own rules, not inverted colors. Use near-black backgrounds and off-white text, drive elevation with lightness instead of shadows, define semantic tokens once, and apply the theme before first paint to avoid a flash.",
    },
    {
      question: "Why does my page flash light before switching to dark mode?",
      answer:
        "The flash happens when the theme is applied in JavaScript after hydration. Use next-themes with its class attribute mode, which injects a tiny inline script that sets .dark on the html element before first paint and respects the system preference by default.",
    },
    {
      question: "Should dark mode use pure black and pure white?",
      answer:
        "No. Pure black backgrounds with pure white text create too much contrast and the text appears to vibrate. Start from near-black around #0a0a0a and off-white around #ededed, and desaturate saturated brand colors a step so they do not glow like neon.",
    },
  ],
  "psychology-of-ui": [
    {
      question: "What design psychology principles should frontend developers know?",
      answer:
        "Four hold up in every usability test: Hick's law, that fewer choices mean faster decisions; Fitts's law, that bigger and closer targets are easier to hit; progressive disclosure, showing common fields and hiding the rest; and the power of defaults, since most people never change them.",
    },
    {
      question: "What is Hick's law in UI design?",
      answer:
        "Hick's law states that the time to make a choice grows with the number of options, so people scan every entry before committing. Group items into small sets or hide rare ones behind a More control; top-level navigation works best with about five items, not fifteen.",
    },
    {
      question: "Why do default settings matter so much in UI design?",
      answer:
        "Most people never change a default, so each one is a decision you make on the user's behalf. Ship dark mode off and the majority stay in light mode forever; pre-check a box and you collect consent nobody meant to give, so choose the honest, common option.",
    },
  ],
  "micro-interactions-guide": [
    {
      question: "How long should UI transitions and animations take?",
      answer:
        "Keep state-change transitions like a dropdown opening or a tab sliding near 200ms, within a 150 to 250ms range. Faster than 150ms reads as a jump; slower than 300ms feels like waiting. Scale duration with distance: a full-screen sheet can take 300ms, a checkbox around 120ms.",
    },
    {
      question: "How fast should a UI respond to a click or tap?",
      answer:
        "Show feedback in under 100ms, which feels instant, firing the press state or highlight on the same frame as the input. Never wait for the network to confirm before showing something happened; paint the optimistic state first and reconcile later.",
    },
    {
      question: "How do I make buttons feel physical when pressed?",
      answer:
        "Scale the element down slightly while pressed, using active:scale-[0.98] on a button or 0.97 on something chunky like a card. It mimics a real push, and paired with a fast color shift it makes the tap feel connected. Keep it subtle, since below 0.95 looks broken.",
    },
  ],
  "motion-design-for-engineers": [
    {
      question: "What matters most for good UI animation, duration or easing?",
      answer:
        "The easing curve matters far more than duration; it is what your eye reads as natural or fake. Avoid linear and the plain ease default, and reach for ease-out, which suits about 90% of interface motion. Save a custom cubic-bezier for when you can explain why the default feels wrong.",
    },
    {
      question: "When should I use ease-out versus ease-in for animations?",
      answer:
        "Use ease-out for entrances so elements like a modal or toast decelerate into place and read as confident, and ease-in for exits so they accelerate away and feel final. Match duration to distance: roughly 120ms for an 8px tooltip, around 300ms for a panel crossing the screen.",
    },
    {
      question: "When should I use a spring animation instead of CSS easing in React?",
      answer:
        "Use a spring the moment a user is dragging, such as a sheet, swipe-to-dismiss, or slider, because a spring responds to velocity so fast flicks animate fast. In React, Framer Motion springs do this for free with a stiffness and damping value, skipping hand-tuned keyframes.",
    },
  ],
  "view-transitions-api-guide": [
    {
      question: "How does the View Transitions API work?",
      answer:
        "Wrap the DOM change in document.startViewTransition, and the browser snapshots the old and new states and crossfades between them in CSS with no keyframes. Unsupported browsers skip the animation and update instantly, so calling it with optional chaining means nothing breaks.",
    },
    {
      question: "How do I animate an element flying between two pages?",
      answer:
        "Give the same element a view-transition-name on both pages, such as hero on a grid thumbnail and on the full image, and the browser matches them by name and animates position, size, and shape between them. Names must be unique on the page or the transition throws.",
    },
    {
      question: "Can I use the View Transitions API in Next.js?",
      answer:
        "Yes. Turn on the experimental viewTransition flag in Next.js and route changes pick up native transitions automatically. Keep durations short, around 200 to 300ms, since past 500ms it starts to feel like the app is stalling, and gate the effect behind prefers-reduced-motion.",
    },
  ],
  "accessibility-day-one": [
    {
      question: "How do I make React components accessible from the start?",
      answer:
        "Use real semantic elements so the browser gives you focus, keyboard handling, and roles for free: button for actions, a for navigation, a label tied to every input, and headings in order. Keep focus visible, make targets at least 44x44px, and test by tabbing through with the keyboard.",
    },
    {
      question: "Is it okay to remove the focus outline with outline: none?",
      answer:
        "No. Removing the ring leaves keyboard users unable to see where they are. Restyle it instead, using :focus-visible so it shows for keyboard and pen but not mouse clicks, with a solid 2px outline, an offset, and at least a 3:1 contrast ratio against the background.",
    },
    {
      question: "Why use a button element instead of a div with onClick?",
      answer:
        "A button is focusable, fires on Enter and Space, and announces itself to screen readers, all for free. A div with onClick does none of that until you rebuild every behavior by hand, so reach for role and aria attributes only when no native element fits.",
    },
  ],
  "performance-ui-engineering": [
    {
      question: "How do I make my React app feel instant?",
      answer:
        "Focus on three moments users notice: paint the largest element in under 2.5 seconds, reserve space so nothing jumps, and update the UI immediately on click before the server catches up. Perceived speed matters more to users than a Lighthouse score.",
    },
    {
      question: "What is a good LCP time and how do I improve it?",
      answer:
        "Aim for Largest Contentful Paint under 2.5 seconds. Render the hero element from the server and preload the hero image with explicit width and height so the browser fetches it early, and use font-display: swap with a preloaded font file so the headline does not paint twice.",
    },
    {
      question: "How do I make clicks feel instant in React?",
      answer:
        "Update the UI immediately, then let the server catch up and roll back if it fails; a 200ms round trip you hide feels instant while a 200ms spinner feels slow. React's useOptimistic makes this a few lines. Do not fake it for things that genuinely fail often, like a payment.",
    },
  ],
};
