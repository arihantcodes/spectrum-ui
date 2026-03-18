import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "UI Mistakes That Drive Users Away (And How to Fix Them)",
  excerpt:
    "These common UI mistakes are everywhere, and they are killing your user experience. Here is how to spot them and fix them before your users bounce.",
  author: {
    name: "Arihant Jain",
    role: "Engineering",
    avatar: "/arihant.jpeg",
  },
  date: "Oct 22, 2025",
  readTime: "15 min read",
  icon: "🎯",
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why These Mistakes Actually Matter
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A pretty interface is useless if users can&apos;t figure out how to use it. We&apos;ve all been there. You click a button and nothing happens. You fill out a form and get a mysterious &quot;error occurred&quot; message. You try to use a website on your phone and everything is tiny and broken. These small UI mistakes add up fast, and they&apos;re the reason people abandon shopping carts, close tabs, and choose your competitors instead.
      </p>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The good news? Most of these mistakes are shockingly easy to fix once you know what to look for. Whether you&apos;re building with React, Next.js, or any other frontend framework, these patterns apply everywhere. And if you&apos;re already using a design system like Spectrum UI or shadcn components with Tailwind CSS, you&apos;ve avoided many of them by default. Let&apos;s walk through the seven most common UI and UX mistakes in web dev and exactly how to fix every single one.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Bad UI/UX   │────▶│  Frustrated  │────▶│  Users Leave │
│  Patterns    │     │  Users       │     │  For Good    │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Fix These   │────▶│  Smooth      │────▶│  Users Stay  │
│  7 Mistakes  │     │  Experience  │     │  & Convert   │
└──────────────┘     └──────────────┘     └──────────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 1: Terrible Loading Screens
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You click a link and see a blank screen. Or maybe a lonely spinning wheel with no context. Is the app broken? Is it loading? Should you wait or refresh? This uncertainty is one of the biggest UX killers on the web today. Studies show that users start feeling frustrated after just one second of waiting, and after three seconds, a huge chunk of them will leave your site entirely.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        The Problem: Blank or Vague Loading States
      </h3>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most developers just slap a &quot;Loading...&quot; text or a spinner on the page and call it done. But this tells users nothing about what&apos;s happening or how long they should wait. It feels lazy and unprofessional. Your frontend deserves better, and so do your users.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Fix: Skeleton Screens
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use skeleton screens that show the shape of the content that&apos;s coming. This technique, used by Facebook, YouTube, and LinkedIn, keeps users engaged because they can see what the page will look like. It sets expectations and makes the wait feel shorter. Spectrum UI has skeleton components you can drop in right away.
      </p>

      <CodeBlock
        filename="UserList-with-skeletons.tsx"
        language="tsx"
        code={`function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

// Skeleton screens show content structure while loading
// Users understand what's coming and feel less frustrated`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Pro Tip: Use Suspense in Next.js
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        If you&apos;re using Next.js server components, wrap slow-loading parts of your page in Suspense boundaries with skeleton fallbacks. This way, the fast parts of your page show immediately while the slow parts stream in. Users see useful content right away instead of staring at a blank screen. It&apos;s one of the best features of the Next.js App Router.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 2: Buttons That Don&apos;t Talk Back
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Here&apos;s a scenario we&apos;ve all experienced: you click a &quot;Submit&quot; button and nothing visible happens. Did it work? Should you click again? You click again, and now the form submitted twice. Or maybe it did work, but you have no idea because there&apos;s zero feedback. Every single button click in your React app should produce a visible response. This is one of the most fundamental principles of good frontend design engineering.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Fix: Visual Feedback for Every Action
      </h4>
      <CodeBlock
        filename="SubmitButton-with-feedback.tsx"
        language="tsx"
        code={`const [isSubmitting, setIsSubmitting] = useState(false)

<Button onClick={handleSubmit} disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    "Submit Form"
  )}
</Button>

// After success:
toast.success("Form submitted successfully!")

// After error:
toast.error("Unable to submit. Please try again.")`}
      />

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Three Types of Feedback You Need
      </h5>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Immediate feedback:</strong> The button changes to a loading state the instant it&apos;s clicked. Users know something is happening.</li>
          <li><strong>Progress feedback:</strong> Show a spinner, progress bar, or &quot;Submitting...&quot; text while the action is processing on the server.</li>
          <li><strong>Result feedback:</strong> A toast notification or inline message confirming success or clearly explaining what went wrong.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 3: Useless Error Messages
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        &quot;Something went wrong.&quot; Thanks, that&apos;s super helpful. Error messages like this are everywhere on the web, and they&apos;re completely useless. Users have no idea what happened, why it happened, or what to do about it. This leads to support tickets, frustrated users, and people giving up on your app entirely. Good error messages are specific, helpful, and tell users exactly what to do next.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Fix: Specific, Actionable Messages
      </h4>
      <CodeBlock
        filename="error-handling-done-right.tsx"
        language="tsx"
        code={`catch (error) {
  if (error.code === "EMAIL_EXISTS") {
    toast.error("This email is already registered. Try logging in instead.")
  } else if (error.code === "WEAK_PASSWORD") {
    toast.error(
      "Password must be at least 8 characters with a number and special character."
    )
  } else if (error.code === "NETWORK_ERROR") {
    toast.error(
      "Can't reach our servers. Check your internet and try again."
    )
  } else {
    toast.error(
      "Unable to create account. Please try again or contact support."
    )
  }
}

// Every error message answers two questions:
// 1. What happened?
// 2. What should I do now?`}
      />

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Error Message Checklist
      </h6>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Does it explain what went wrong in plain language?</li>
          <li>Does it tell the user what to do next?</li>
          <li>Is it shown near the relevant field, not just at the top of the page?</li>
          <li>Does it avoid technical jargon that users won&apos;t understand?</li>
          <li>Does it stay visible long enough for users to actually read it?</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 4: Forms That Make Users Want to Scream
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Forms are where you win or lose users. A bad form experience is the number one reason people abandon signups, checkouts, and any other conversion funnel in your app. And yet, forms are where frontend developers make the most mistakes. Let&apos;s talk about the most common ones and how to fix them in your React and Next.js projects.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        Common Form Problems
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-3">
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">
            <strong>Labels that don&apos;t work:</strong> Screen readers can&apos;t identify fields, and clicking the label doesn&apos;t focus the input. Always use <code>htmlFor</code> to connect labels and inputs.
          </li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">
            <strong>Required fields are unclear:</strong> Users don&apos;t know what they have to fill out and what&apos;s optional. Mark required fields clearly with an asterisk or helper text.
          </li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">
            <strong>Bad validation timing:</strong> Showing errors while the user is still typing is annoying and distracting. Wait until they leave the field or submit the form.
          </li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">
            <strong>Asking for too much:</strong> Every extra field you add reduces your conversion rate. Only ask for information you absolutely need right now.
          </li>
        </ul>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        A Properly Built Accessible Form
      </h5>
      <CodeBlock
        filename="accessible-form.tsx"
        language="tsx"
        code={`<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">
      Email <span className="text-destructive">*</span>
    </Label>
    <Input
      id="email"
      type="email"
      placeholder="you@example.com"
      required
      aria-describedby="email-error"
    />
    {errors.email && (
      <p id="email-error" className="text-sm text-destructive">
        {errors.email}
      </p>
    )}
  </div>
  <Button type="submit">Sign Up</Button>
</form>

// Clear labels, visible required indicators, accessible error messages
// Works with screen readers and keyboard navigation`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 5: Forgetting About Phones
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Over 60% of web traffic comes from mobile devices, yet so many apps are still built desktop-first. Tiny buttons you can barely tap. Text so small you have to pinch to zoom. Pages that scroll sideways because some element overflows. Popups that are bigger than the screen. These aren&apos;t minor inconveniences. They&apos;re deal-breakers for the majority of your users.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Fix: Mobile-First Development with Tailwind CSS
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Start by designing for the smallest screen, then add complexity for larger screens. Tailwind CSS makes this natural with its mobile-first breakpoint system. The base styles are for mobile, and you layer on <code>md:</code> and <code>lg:</code> prefixes for bigger screens. Use responsive utilities for everything: buttons, spacing, layouts, and especially touch targets.
      </p>

      <CodeBlock
        filename="mobile-responsive.tsx"
        language="tsx"
        code={`// Full-width buttons on mobile, auto-width on desktop
<Button className="w-full md:w-auto">
  Click Me
</Button>

// Minimum 44px touch targets on all interactive elements
<button className="min-h-[44px] min-w-[44px] p-4">
  <MenuIcon />
</button>

// Responsive dialog: modal on desktop, drawer on mobile
import { useMediaQuery } from "@/hooks/use-media-query"

const isDesktop = useMediaQuery("(min-width: 768px)")

{isDesktop ? (
  <Dialog>
    <DialogContent>{content}</DialogContent>
  </Dialog>
) : (
  <Drawer>
    <DrawerContent>{content}</DrawerContent>
  </Drawer>
)}`}
      />

      <div className="bg-muted p-6 rounded-lg my-6 font-mono text-sm overflow-x-auto">
        <pre className="text-center">
{`Mobile-First Design Flow:

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Mobile  │────▶│  Tablet  │────▶│  Desktop │────▶│  Large   │
│  (base)  │     │  (md:)   │     │  (lg:)   │     │  (xl:)   │
│          │     │          │     │          │     │          │
│ Stack    │     │ 2-col    │     │ 3-col    │     │ Sidebar  │
│ Full-w   │     │ Grid     │     │ Grid     │     │ + Grid   │
│ Drawer   │     │ Drawer   │     │ Modal    │     │ Modal    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘`}
        </pre>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 6: Ignoring Accessibility
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Accessibility isn&apos;t optional anymore. It&apos;s required by law in many countries, and more importantly, it makes your app better for everyone. A user with a broken arm can&apos;t use a mouse. A user in bright sunlight needs good contrast. A user multitasking might rely on keyboard navigation. When you build your frontend with accessibility in mind, every single user benefits.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Most Common Accessibility Fails
      </h4>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Images without alt text descriptions that screen readers can announce</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Poor color contrast that makes text impossible to read in sunlight or for users with low vision</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">No keyboard navigation support. Try using your app with just Tab and Enter. Can you do everything?</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Icon buttons with no text labels, so screen readers just say &quot;button&quot; with no context</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">No visible focus indicators when tabbing through the page, so keyboard users lose track</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Form inputs without associated labels, making forms unusable for assistive technology</li>
        </ul>
      </div>

      <h5 className="text-base font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200">
        Use Component Libraries That Get It Right
      </h5>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        This is one of the biggest advantages of using a component library like Spectrum UI or shadcn. These components are built on top of Radix UI, which handles all the accessibility primitives for you. Focus management, keyboard navigation, screen reader announcements, ARIA attributes. It&apos;s all baked in from the start. You still need to test your app, but you start from a much better place than building everything from scratch.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Mistake 7: Everything Looks Different on Every Page
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Buttons are blue on one page and green on another. The spacing is different everywhere. Card borders have different radiuses on different pages. Users have to relearn your interface on every single page they visit. This inconsistency kills trust and makes your app feel amateurish, no matter how good the individual components are. Consistency in your UI is not a nice-to-have. It&apos;s essential.
      </p>

      <h4 className="text-lg font-semibold mt-5 mb-2 text-neutral-800 dark:text-neutral-200">
        The Fix: Adopt a Scalable Design System
      </h4>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Use a design system like Spectrum UI. Pick your colors, spacing, typography, and border radius once through design tokens, then use them everywhere. Give every developer on your team the same React components to work with. When new pages get built, they automatically look like they belong with the rest of your app. This is how companies like Airbnb, GitHub, and Shopify keep their UIs consistent across hundreds of pages built by dozens of different developers.
      </p>

      <h6 className="text-sm font-semibold mt-3 mb-1 text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
        Design System Consistency Checklist
      </h6>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>All buttons use the same variants and sizes from your design system</li>
          <li>Colors come from design tokens or CSS variables, not hardcoded hex values</li>
          <li>Spacing follows a consistent scale like the 4px grid with Tailwind CSS</li>
          <li>Typography uses a defined type scale across all pages</li>
          <li>Border radius and shadows are consistent everywhere in your app</li>
          <li>Interactive states like hover, focus, and active feel the same on all components</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Easy Fixes You Can Do Today
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        You don&apos;t need to rewrite your entire application. Start with these quick wins and you&apos;ll see an immediate improvement in your user experience. Pick one or two, implement them this week, and build from there.
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <ol className="space-y-3 list-decimal list-inside">
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Add skeleton screens:</strong> Replace every &quot;Loading...&quot; text with skeleton components that show content structure</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Make buttons talk back:</strong> Every click needs immediate visual feedback, a loading state, and result confirmation</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Rewrite error messages:</strong> Tell users exactly what went wrong and give them a clear next step</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Test on real phones:</strong> Not just browser DevTools. Actually pick up a phone and try to use your app with your thumb</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Adopt a design system:</strong> Consistency makes everything look professional with minimal extra effort</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Test with keyboard only:</strong> Navigate your entire app using just Tab, Enter, and Escape. Fix anything that breaks.</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200"><strong>Simplify forms:</strong> Remove every field that isn&apos;t absolutely necessary for completing the task</li>
        </ol>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Bottom Line
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Show loading states with skeleton screens, never blank pages or raw spinners</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Give immediate visual feedback for every user action in your app</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Write helpful, specific error messages that guide users to a solution</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Build for mobile first with Tailwind CSS, then enhance for desktop</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Accessibility helps everyone, not just users with disabilities</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Consistent design using a shared design system builds user trust</li>
          <li className="text-base font-normal text-neutral-800 dark:text-neutral-200">Use proven component libraries like Spectrum UI built on shadcn and Radix to avoid these mistakes from the start</li>
        </ul>
      </div>

      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Most UI mistakes happen because we as developers don&apos;t think like our users. We get caught up in the code and forget that real people have to actually use what we build. The fix is simple but requires discipline: test your app with real people, on real devices, doing real tasks. Watch where they struggle. Listen to what confuses them. The problems you find and fix will directly improve your conversion rates, reduce support tickets, and make your users genuinely happier. Great frontend work isn&apos;t just about making things look good. It&apos;s about making things work beautifully for the humans who use them every day.
      </p>
    </div>
  ),
};

export default blogPost;
