import React from 'react';
import fs from 'fs/promises';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';




const CodeCardWrapper = dynamic(() => import('@/app/(docs)/docs/components/code-card-wrapper'));

interface PreviewCodeCardProps {
  className?: string;
  path: string;
  children?: React.ReactNode;
  cli?: string;
}

const PreviewCodeCard = async ({ className, path, children, cli }: PreviewCodeCardProps) => {
  const demoCode = await fs.readFile(path, 'utf8');

  if (!demoCode) {
    return null;
  }

  return (
    <CodeCardWrapper
      code={demoCode}
      className={cn('relative mb-14 mt-5', className)} // relative so absolute works inside
      CLI={cli}
    >


      <div className="flex items-center justify-center py-10">{children}</div>
    </CodeCardWrapper>
  );
};

export default PreviewCodeCard;
