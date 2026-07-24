import type { BlogPostInput } from '@/lib/blog';
import { Code } from '@/components/blog/code';
import { Callout } from '@/components/blog/prose';

const post: BlogPostInput = {
  title: 'Using Storybook to Build Better Design Systems',
  excerpt:
    "Storybook isn't just a component viewer. It's a development environment that changes how you build and maintain design systems.",
  tagline: 'Stories are the spec, tested on every PR.',
  author: {
    name: 'Arihant Jain',
    role: 'Design Engineer',
    avatar: '/arihant.jpeg',
  },
  date: 'Jan 27, 2026',
  readTime: '3 min read',
  category: 'Design Engineering',
  topic: 'Design Systems',
  content: (
    <>
      <p>
        Building a component inside the real app is a slog — wire up data, click four screens to
        reach the empty state, then squint at it buried in the rest of the UI. Storybook pulls the
        component onto a clean bench where every state is <strong>one click away</strong>. Its real
        value, though, is what a story becomes: the component’s contract.
      </p>

      <h2 id="stories-are-spec">Stories are the spec</h2>
      <p>
        A story is a component frozen in one exact state, written as code. List them out and you’ve
        specified the component: default, loading, disabled, error, long-label. If a state isn’t
        worth a story, ask whether it’s worth supporting.
      </p>
      <Code
        filename="button.stories.tsx"
        lang="tsx"
        code={`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = { component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Save' } };
export const Loading: Story = { args: { loading: true } };
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};`}
      />
      <p>
        This is the flip. You’re not documenting the component after the fact — the stories{' '}
        <em>are</em> the definition of done. You build until every one of them renders right.
      </p>

      <h2 id="test-interaction">Test the interaction</h2>
      <p>
        A rendered story is only half the contract; behavior is the other half. Storybook’s{' '}
        <code>play</code> function drives the component after it mounts — click the trigger, assert
        the dialog opens — using that same story as the fixture.
      </p>
      <p>
        Wire it into CI and every story doubles as an <strong>interaction test</strong>. One
        artifact does three jobs: spec, live demo, and regression test.
      </p>

      <h2 id="publish-per-pr">Publish per PR</h2>
      <p>
        The last piece is making stories visible to people who don’t run your dev server. Publish
        the built Storybook on every pull request, through Chromatic or a static deploy, so a
        reviewer opens a URL and sees the actual states.
      </p>
      <p>
        Now designers catch a wrong hover color in review instead of production. The story you wrote
        to build the component becomes the thing the whole team signs off on.
      </p>
      <Callout>
        Keep one story per state, not a mega-story with every variant crammed in. Small stories are
        what let a visual diff or a failed <code>play</code> test point at a single cause.
      </Callout>

      <h2 id="start-here">Start here</h2>
      <p>
        Add Storybook to one component and write a story for every state it can be in. Make those
        stories the checklist for done.
      </p>
      <p>
        Once that feels normal, add a <code>play</code> test and publish on PRs. Your components
        stop being things you hope work and start being things you can prove.
      </p>
    </>
  ),
};

export default post;
