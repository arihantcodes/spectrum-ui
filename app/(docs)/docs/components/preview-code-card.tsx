import React from 'react';
import fs from 'fs/promises';
import nodePath from 'path';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const CodeCardWrapper = dynamic(() => import('@/app/(docs)/docs/components/code-card-wrapper'));

interface PreviewCodeCardProps {
  className?: string;
  /** Path to the demo component file (shown in Code tab) */
  path: string;
  children?: React.ReactNode;
  /** spectrum-ui CLI slug e.g. "@spectrumui/animated-card" */
  cli?: string;
  /** Bash install command shown in Installation tab, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Path to the component source file shown in Installation tab */
  installCodePath?: string;
}

const PreviewCodeCard = async ({
  className,
  path,
  children,
  cli,
  installScript,
  installCodePath,
}: PreviewCodeCardProps) => {
  // Read the demo file
  let demoCode: string;
  try {
    const absolutePath = nodePath.join(process.cwd(), path);
    demoCode = await fs.readFile(absolutePath, 'utf8');
  } catch {
    demoCode = '// Could not load source file';
  }

  // Read the component source file (for Installation tab)
  let installCode: string | undefined;
  if (installCodePath) {
    try {
      const absolutePath = nodePath.join(process.cwd(), installCodePath);
      installCode = await fs.readFile(absolutePath, 'utf8');
    } catch {
      installCode = '// Could not load component file';
    }
  }

  if (!demoCode) return null;

  return (
    <CodeCardWrapper
      code={demoCode}
      className={cn('relative mb-14 mt-5', className)}
      CLI={cli}
      installScript={installScript}
      installCode={installCode}
    >
      <div className="flex items-center justify-center py-10">{children}</div>
    </CodeCardWrapper>
  );
};

export default PreviewCodeCard;
