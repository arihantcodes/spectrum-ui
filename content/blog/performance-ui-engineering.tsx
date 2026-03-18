import CodeBlock from '@/components/blog-code';

const blogPost = {
  title: 'UI Performance: How to Make Your React App Feel Instant',
  excerpt:
    "Users don't care about your Lighthouse score. They care about how fast your app feels. Here's how to make your UI feel instant.",
  author: {
    name: 'Arihant Jain',
    role: 'Engineering',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 31, 2026',
  readTime: '8 min read',
  icon: '⚡',
  category: 'Design Engineering',
  content: (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Perceived Speed vs Actual Speed
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        A page that loads in 2 seconds with a nice skeleton feels faster than one that loads in 1.5
        seconds with a blank screen. Performance isn&apos;t just about milliseconds. It&apos;s about how
        fast things feel. Design engineers can make a huge impact here because we control what users see
        while they wait.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Show Something Immediately
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        The number one rule: never show a blank screen. Show the layout with skeleton placeholders
        while data loads.
      </p>

      <CodeBlock
        filename="skeleton.tsx"
        language="tsx"
        code={`// Skeleton that matches the real layout
function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border">
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

// Use it while data loads
function UserList() {
  const { data, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return data.map(user => <UserCard key={user.id} user={user} />);
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Lazy Load What&apos;s Not Visible
      </h2>

      <CodeBlock
        filename="lazy-load.tsx"
        language="tsx"
        code={`import dynamic from 'next/dynamic';

// Heavy components load only when needed
const Chart = dynamic(() => import('@/components/chart'), {
  loading: () => <div className="h-64 rounded bg-muted animate-pulse" />,
});

const MarkdownEditor = dynamic(() => import('@/components/editor'), {
  ssr: false, // Don't render on server
});

// Images load when they scroll into view
<img
  src={url}
  alt={alt}
  loading="lazy"
  className="rounded-lg"
/>

// Next.js Image handles this automatically
import Image from 'next/image';
<Image src={url} alt={alt} width={400} height={300} />`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Optimize Re-Renders
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Unnecessary re-renders are the most common performance killer in React apps:
      </p>

      <CodeBlock
        filename="re-renders.tsx"
        language="tsx"
        code={`// Problem: SearchResults re-renders every time input changes
function Page() {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ExpensiveList /> {/* Re-renders on every keystroke! */}
    </div>
  );
}

// Fix 1: Memo the expensive component
const ExpensiveList = React.memo(function ExpensiveList() {
  // Only re-renders when its own props change
  return <div>{/* heavy stuff */}</div>;
});

// Fix 2: Move state closer to where it's used
function Page() {
  return (
    <div>
      <SearchBar /> {/* State lives here now */}
      <ExpensiveList /> {/* Doesn't re-render */}
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Animations That Don&apos;t Stutter
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Only animate <code>transform</code> and <code>opacity</code>. These use the GPU.</li>
          <li>Never animate <code>width</code>, <code>height</code>, <code>margin</code>, or <code>padding</code>. They trigger layout.</li>
          <li>Use <code>will-change: transform</code> sparingly for elements that animate often.</li>
          <li>Test on slow devices. Your MacBook Pro hides performance problems.</li>
        </ul>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Bundle Size Matters
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Big bundles mean slow first loads. A few things that help:
      </p>
      <ul className="space-y-2 list-disc list-inside ml-4">
        <li><strong>Import icons individually:</strong> <code>import &#123; Search &#125; from &apos;lucide-react&apos;</code> not the whole library</li>
        <li><strong>Use dynamic imports</strong> for heavy components (charts, editors, maps)</li>
        <li><strong>Check your bundle</strong> with <code>@next/bundle-analyzer</code> regularly</li>
        <li><strong>Tree-shake CSS</strong> - Tailwind does this automatically in production</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        Optimistic Updates
      </h2>
      <p className="text-base font-normal text-neutral-800 dark:text-neutral-200">
        Don&apos;t wait for the server to respond. Show the result immediately and fix it if the request fails:
      </p>

      <CodeBlock
        filename="optimistic.tsx"
        language="tsx"
        code={`// Toggle a like button optimistically
function LikeButton({ postId, liked, likeCount }) {
  const [optimisticLiked, setOptimisticLiked] = useState(liked);
  const [optimisticCount, setOptimisticCount] = useState(likeCount);

  async function toggleLike() {
    // Update UI immediately
    setOptimisticLiked(!optimisticLiked);
    setOptimisticCount(c => optimisticLiked ? c - 1 : c + 1);

    try {
      await api.toggleLike(postId);
    } catch {
      // Revert if it fails
      setOptimisticLiked(liked);
      setOptimisticCount(likeCount);
    }
  }

  return (
    <button onClick={toggleLike}>
      <Heart filled={optimisticLiked} /> {optimisticCount}
    </button>
  );
}`}
      />

      <h2 className="text-xl font-medium mt-8 mb-4 text-neutral-800 dark:text-neutral-200">
        The Short Version
      </h2>
      <div className="bg-muted p-6 rounded-lg my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Show skeletons immediately. Never show blank screens.</li>
          <li>Lazy load heavy components and images</li>
          <li>Memoize expensive components or move state closer to where it&apos;s used</li>
          <li>Only animate transform and opacity for smooth 60fps</li>
          <li>Watch your bundle size. Import things individually.</li>
          <li>Use optimistic updates for instant-feeling interactions</li>
          <li>Test on slow devices and throttled networks</li>
        </ul>
      </div>
    </div>
  ),
};

export default blogPost;
