import React from "react";
import { H1, H2, P } from "@/components/ui/HeadingAnchor";
import { cn } from "@/lib/utils";

interface PageTemplateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageTemplate = ({
  title,
  description,
  children,
  className,
}: PageTemplateProps) => {
  return (
    <section className={cn("flex flex-col gap-3 pb-10", className)}>
      <H1 className="text-xl">{title}</H1>
      <P className="text-lg">{description}</P>
      {children}
    </section>
  );
};

const PageSubTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <H2
      className="mb-2 border-b border-b-gray-600 pb-2 text-[18px]"
      anchor={children?.toString()}
    >
      {children}
    </H2>
  );
};

export { PageTemplate, PageSubTitle };
