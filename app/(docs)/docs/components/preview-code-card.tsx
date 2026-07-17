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
  /** Bash install command shown in the Installation section, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Path to the component source file shown in the Installation section */
  installCodePath?: string;
  /** Optional custom content to show in the installation section (e.g. PropsTable) */
  installContent?: React.ReactNode;
  /** Set false to hide the auto-rendered "Installation" section */
  withInstallation?: boolean;
}

const PreviewCodeCard = async ({
  className,
  path,
  children,
  cli,
  installScript,
  installCodePath,
  installContent,
  withInstallation,
}: PreviewCodeCardProps) => {
  // Read the demo file
  let demoCode: string;
  try {
    const absolutePath = nodePath.join(process.cwd(), path);
    demoCode = await fs.readFile(absolutePath, 'utf8');
  } catch {
    demoCode = '// Could not load source file';
  }

  // Read the component source file (for the Installation section)
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
      className={cn('relative mt-8', className)}
      CLI={cli}
      installScript={installScript}
      installCode={installCode}
      installContent={installContent}
      withInstallation={withInstallation}
    >
      {children}
    </CodeCardWrapper>
  );
};

export default PreviewCodeCard;
