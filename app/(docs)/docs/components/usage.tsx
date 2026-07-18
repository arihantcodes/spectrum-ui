import React from "react";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { PageSectionTitle } from "@/app/(docs)/docs/components/page-template";
import { cn } from "@/lib/utils";

interface UsageProps {
  className?: string;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  path: string;
  cli?: string;
}
const Usage = ({
  className,
  children,
  title,
  path,
  description,
  cli,
}: UsageProps) => {
  return (
    <div className={cn(className)}>
      {title && <PageSectionTitle>{title}</PageSectionTitle>}
      {description && (
        <div className="mt-2 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          {description}
        </div>
      )}
      <PreviewCodeCard path={path} cli={cli} withInstallation={false} className="mt-4">
        {children}
      </PreviewCodeCard>
    </div>
  );
};

export default Usage;
