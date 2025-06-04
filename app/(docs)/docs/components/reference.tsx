import React from "react";
import Link, { LinkProps } from "next/link";
import { Badge } from "@/components/ui/Badge";

import { cn } from "@/lib/utils";

interface ReferenceProps extends LinkProps {
  icon?: React.ReactNode;
  text?: string;
}

export const Reference = ({ icon, text, ...props }: ReferenceProps) => {
  return (
    <Link {...props} target="_blank">
      <Badge variant="secondary" className="flex gap-2">
        {icon}
        {text}
      </Badge>
    </Link>
  );
};

export const ReferenceBorder = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cn("mb-5 flex gap-3", className)} />;
};
