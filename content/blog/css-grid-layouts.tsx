import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';

const post: BlogPostInput = {
  title: 'CSS Grid Layouts You Will Use on Every Project',
  excerpt:
    "Stop Googling CSS Grid every time. Here are the grid patterns that solve 90% of layout problems, with copy-paste code.",
  tagline: 'Four grid patterns, copy and paste.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Feb 2, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'CSS & Layout',
  content: (
    <>
      <p>
        Flexbox is for one dimension: a row, or a column. The moment you need rows and columns to
        line up together, you’re fighting it. Grid is for two dimensions, and these four patterns
        cover almost everything you’ll build. Copy them and stop re-Googling.
      </p>

      <h2 id="auto-fit-minmax">auto-fit and minmax</h2>
      <p>
        The responsive card grid, with <strong>zero media queries</strong>:
      </p>
      <Code
        filename="cards.css"
        lang="css"
        code={`.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}`}
      />
      <p>
        <code>auto-fit</code> packs in as many columns as fit; <code>minmax(240px, 1fr)</code> says
        each column is at least 240px and grows to share the leftover space. Resize the window and
        the cards reflow on their own. One rule replaces three breakpoints.
      </p>

      <h2 id="template-areas">Template areas for layout</h2>
      <p>
        For a page skeleton — header, sidebar, main, footer — named areas beat counting column
        numbers. You draw the layout in the <code>grid-template-areas</code> string, then give each
        child a <code>grid-area</code> name. It’s self-documenting: anyone reading the CSS sees the
        shape. And rearranging for mobile is one line — rewrite the areas string inside a media
        query and the children follow.
      </p>

      <h2 id="subgrid">Subgrid aligns card internals</h2>
      <p>
        Here’s the one people miss. In a row of cards, each with a title, body, and button, the
        buttons don’t line up because every card sizes itself. <code>subgrid</code> fixes it: the
        card inherits the parent grid’s rows, so titles, bodies, and footers align across the whole
        row. Set <code>grid-template-rows: subgrid</code> on the card and span the rows it should
        share. It’s in every modern browser now.
      </p>

      <h2 id="when-flex-wins">When flex still wins</h2>
      <p>
        Grid isn’t always the answer. Reach for flexbox when the content should decide the size, not
        a track: a row of tags that wrap, a toolbar of buttons, a nav where items hug their labels.
        Rule of thumb — if you’re placing items into a defined structure, use grid; if you’re
        distributing items along a line, use flex. Most real pages use both: <strong>grid for the
        page, flex inside the pieces</strong>.
      </p>
    </>
  ),
};

export default post;
