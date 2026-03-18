import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: "Building Forms That Don't Make Users Want to Quit",
  excerpt:
    "Forms are where most users drop off. Here's how to build forms that are easy to fill out, validate properly, and actually feel good to use.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 23, 2026',
  readTime: '8 min read',
  icon: '📝',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Why Forms Are So Hard to Get Right
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Forms look simple. A few inputs, a button, done. But they&apos;re actually the hardest UI to build
        well. Validation, error states, loading states, accessibility, keyboard navigation, multi-step flows,
        responsive layout. Get any of these wrong and people leave. Here&apos;s how to get them right.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Structure First
      </h2>

      <CodeBlock
        filename="form-structure.tsx"
        language="tsx"
        code={`// Good form structure
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Group related fields */}
  <fieldset className="space-y-4">
    <legend className="text-lg font-semibold">Personal Info</legend>

    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input id="firstName" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input id="lastName" required />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" required />
      <p className="text-sm text-muted-foreground">
        We'll never share your email.
      </p>
    </div>
  </fieldset>

  <Button type="submit">Submit</Button>
</form>

// Key points:
// - Labels are linked to inputs with htmlFor/id
// - Related fields grouped in fieldset with legend
// - Helper text below inputs
// - Consistent spacing throughout`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Validation That Helps
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Bad validation yells at people. Good validation guides them:
      </p>

      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Validate on blur, not on type.</strong> Don&apos;t show errors while someone is still typing.</li>
          <li><strong>Clear errors when they fix it.</strong> Remove the error as soon as the input becomes valid.</li>
          <li><strong>Say what&apos;s wrong AND how to fix it.</strong> Not &quot;Invalid input.&quot; Instead: &quot;Email must include @.&quot;</li>
          <li><strong>Mark required fields.</strong> Either mark required or optional. Not both. Most forms mark optional since most fields are required.</li>
          <li><strong>Use native validation when possible.</strong> <code>type=&quot;email&quot;</code>, <code>required</code>, <code>pattern</code> work great.</li>
        </ul>
      </div>

      <CodeBlock
        filename="validation.tsx"
        language="tsx"
        code={`// React Hook Form + Zod = best combo
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur', // validate on blur, not on change
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input {...register('email')} aria-invalid={!!errors.email} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" {...register('password')} />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit">Sign up</Button>
    </form>
  );
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Loading and Success States
      </h2>

      <CodeBlock
        filename="submit-states.tsx"
        language="tsx"
        code={`function SubmitButton({ isSubmitting, isSuccess }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Submitting...
        </span>
      ) : isSuccess ? (
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Done!
        </span>
      ) : (
        'Submit'
      )}
    </Button>
  );
}

// After success, either:
// 1. Show a success message in place of the form
// 2. Redirect to the next page
// 3. Show a toast and reset the form
// DON'T just do nothing. Users need confirmation.`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Accessibility Checklist
      </h2>
      <div className="border border-dashed border-neutral-200 dark:border-neutral-800 p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Every input has a visible <code>&lt;Label&gt;</code> linked with htmlFor</li>
          <li>Error messages are linked to inputs with <code>aria-describedby</code></li>
          <li>Invalid inputs have <code>aria-invalid=&quot;true&quot;</code></li>
          <li>Required fields are marked with <code>aria-required=&quot;true&quot;</code></li>
          <li>Tab order follows visual order</li>
          <li>Form can be submitted with Enter key</li>
          <li>Focus moves to first error after failed submission</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        UX Tips
      </h2>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Single column.</strong> Multi-column forms are harder to scan. One column is almost always better.</li>
        <li><strong>Big enough inputs.</strong> Minimum height of 40px. 44px is better for touch.</li>
        <li><strong>Autofocus the first field.</strong> Save users a click.</li>
        <li><strong>Use the right input type.</strong> <code>type=&quot;email&quot;</code> shows the @ keyboard on mobile. <code>type=&quot;tel&quot;</code> shows the number pad.</li>
        <li><strong>Break long forms into steps.</strong> Show progress. Let people go back.</li>
        <li><strong>Save progress.</strong> If the form is long, save to localStorage so people don&apos;t lose their work.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Label every input. Use htmlFor. No exceptions.</li>
          <li>Validate on blur, not on type. Clear errors when fixed.</li>
          <li>Show what&apos;s wrong and how to fix it</li>
          <li>Use React Hook Form + Zod for validation</li>
          <li>Always show loading and success states on submit</li>
          <li>Single column, big inputs, right input types</li>
          <li>Break long forms into steps with saved progress</li>
        </ul>
      </div>
    </div>
  ),
};

export default blogPost;
