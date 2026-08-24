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
  /**
   * Extra source files to offer in the Code tab alongside the demo. The demo
   * only shows how to call the component; copying it by hand needs the
   * component itself and anything it imports.
   */
  sourcePaths?: string[];
  /** Label for the demo file in the Code tab switcher. */
  demoLabel?: string;
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
  sourcePaths,
  demoLabel = 'usage.tsx',
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

  // Read the extra files offered in the Code tab.
  let files: { name: string; code: string }[] | undefined;
  if (sourcePaths?.length) {
    const extra = await Promise.all(
      sourcePaths.map(async (sourcePath) => {
        try {
          const absolute = nodePath.join(process.cwd(), sourcePath);
          return { name: nodePath.basename(sourcePath), code: await fs.readFile(absolute, 'utf8') };
        } catch {
          return null;
        }
      }),
    );
    const loaded = extra.filter((file): file is { name: string; code: string } => file !== null);
    if (loaded.length) files = [{ name: demoLabel, code: demoCode }, ...loaded];
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
      files={files}
      withInstallation={withInstallation}
    >
      {children}
    </CodeCardWrapper>
  );
};

export default PreviewCodeCard;
