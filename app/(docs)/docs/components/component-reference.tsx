import Link from 'next/link';

import type { ComponentDoc } from '@/lib/component-docs';
import { getTopicHubsForComponent } from '@/content/topic-hubs';
import { Badge } from '@/components/ui/badge';
import { InlineCode } from '@/components/ui/inline-code';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const sectionClassName = 'mt-14 border-t border-border pt-10';
const headingClassName =
  'scroll-m-24 text-xl font-medium leading-7 tracking-[-0.01em] text-foreground';
const bodyClassName = 'mt-4 text-sm leading-6 text-muted-foreground sm:text-base';

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={sectionClassName}>
      <h2 id={id} className={headingClassName}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm">
      <code>{children}</code>
    </pre>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
      {items.map((item) => (
        <li key={item} className="list-disc pl-1 marker:text-muted-foreground/60">
          {item}
        </li>
      ))}
    </ul>
  );
}

function formatList(items: string[]) {
  if (items.length < 2) return items[0] || 'application interfaces';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

export function ComponentOverview({ component }: { component: ComponentDoc }) {
  return (
    <>
      <section aria-labelledby="overview" className="mt-8">
        <h2 id="overview" className={headingClassName}>
          Overview
        </h2>
        <div className="mt-4 flex max-w-3xl flex-col gap-3 text-sm leading-6 text-muted-foreground sm:text-base">
          <p>{component.description}</p>
          <p>
            This {component.category.toLowerCase()} component is intended for{' '}
            {formatList(component.useCases)}. Its implementation is provided as editable source so
            the final behavior and styling stay inside your project.
          </p>
        </div>
      </section>

      <Section id="technologies" title="Technologies">
        <div className="mt-5 flex flex-wrap gap-2">
          {component.technologies.map((technology) => (
            <Badge key={technology} variant="secondary">
              {technology}
            </Badge>
          ))}
        </div>
        {component.dependencies.length > 0 ? (
          <p className={bodyClassName}>
            Detected package dependencies:{' '}
            {component.dependencies.map((dependency, index) => (
              <span key={dependency}>
                {index > 0 ? ', ' : ''}
                <InlineCode>{dependency}</InlineCode>
              </span>
            ))}
            .
          </p>
        ) : (
          <p className={bodyClassName}>
            No additional package dependency is declared for this component.
          </p>
        )}
      </Section>
    </>
  );
}

function MissingInstallation({ component }: { component: ComponentDoc }) {
  if (component.coverage.installation) return null;

  return (
    <Section id="installation" title="Installation">
      {component.installation.cliCommands.length > 0 ? (
        <>
          <h3 className="mt-5 text-base font-medium text-foreground">CLI</h3>
          {component.installation.cliCommands.map((command) => (
            <CodeBlock key={command}>{command}</CodeBlock>
          ))}
        </>
      ) : (
        <p className={bodyClassName}>
          A registry CLI command is not declared for this component. Use the manual source below.
        </p>
      )}
      <h3 className="mt-6 text-base font-medium text-foreground">Manual</h3>
      <p className={bodyClassName}>
        Copy the documented source and preserve its imports. Install only the dependencies listed in
        the Technologies section.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {component.installation.manualPaths.map((sourcePath) => (
          <li key={sourcePath}>
            <InlineCode>{sourcePath}</InlineCode>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function MissingUsage({ component }: { component: ComponentDoc }) {
  if (component.coverage.usage) return null;

  return (
    <Section id="usage" title="Usage">
      <p className={bodyClassName}>
        The live preview and its Code tab above are the working example for this component. Copy the
        example after installation, then provide the required values from its TypeScript signature.
      </p>
    </Section>
  );
}

function MissingProps({ component }: { component: ComponentDoc }) {
  if (component.coverage.props) return null;

  return (
    <Section id="properties" title="Props">
      <Table className="mt-5 min-w-[680px]">
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {component.props.length > 0 ? (
            component.props.map((prop) => (
              <TableRow key={`${prop.name}-${prop.type}`}>
                <TableCell>
                  <InlineCode>{prop.name}</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>{prop.type}</InlineCode>
                </TableCell>
                <TableCell>{prop.required ? 'Yes' : 'No'}</TableCell>
                <TableCell className="max-w-md text-muted-foreground">{prop.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell aria-label="No prop">—</TableCell>
              <TableCell>
                <InlineCode>No shared Props type</InlineCode>
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell className="max-w-md text-muted-foreground">
                The installable source does not expose one shared custom prop contract. Review the
                exported TypeScript signatures for the individual variants shown on this page.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Section>
  );
}

function RelatedComponents({ component }: { component: ComponentDoc }) {
  return (
    <Section id="related-components" title="Related components">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {component.related.map((related) => (
          <Link key={related.slug} href={`/docs/${related.slug}`} className="group rounded-lg">
            <Card className="h-full transition-colors group-hover:bg-muted/40">
              <CardHeader>
                <CardTitle className="text-base">{related.name}</CardTitle>
                <CardDescription className="leading-5">{related.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function RelatedTopicGuides({ component }: { component: ComponentDoc }) {
  const topicHubs = getTopicHubsForComponent(component.slug);

  if (!topicHubs.length) return null;

  return (
    <Section id="topic-guides" title="Topic guides">
      <p className={bodyClassName}>
        See how this component fits into broader interface patterns, implementation decisions, and
        working examples.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {topicHubs.map((hub) => (
          <Link
            key={hub.slug}
            href={hub.href}
            className="rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {hub.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}

function ComponentFAQ({ component }: { component: ComponentDoc }) {
  return (
    <Section id="faq" title={`${component.name} FAQ`}>
      <div className="mt-5 divide-y divide-border border-y">
        {component.faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="cursor-pointer font-medium text-foreground marker:text-muted-foreground">
              {faq.question}
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function ComponentReference({ component }: { component: ComponentDoc }) {
  return (
    <div className="pb-12">
      <MissingInstallation component={component} />
      <MissingUsage component={component} />
      <MissingProps component={component} />

      <Section id="use-cases" title="Use cases">
        <BulletList items={component.useCases} />
      </Section>

      <Section id="features" title="Features">
        <BulletList items={component.features} />
      </Section>

      <Section id="accessibility" title="Accessibility">
        <BulletList items={component.accessibility} />
      </Section>

      <Section id="customization" title="Customization">
        <BulletList items={component.customization} />
      </Section>

      <RelatedComponents component={component} />
      <RelatedTopicGuides component={component} />
      <ComponentFAQ component={component} />
    </div>
  );
}
