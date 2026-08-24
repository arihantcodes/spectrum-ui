'use client';
import React, { useState } from 'react';
import posthog from 'posthog-js';

import { MonitorIcon, TerminalIcon } from '@/app/(docs)/layout-parts/docs-icons';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import InstallationTabs from '@/app/(docs)/docs/components/code-card/parts/installation-tabs';
import { FileTypeIcon } from '@/app/(docs)/docs/components/code-card/parts/file-type-icon';
import PackageChip from '@/app/(docs)/docs/components/code-card/parts/package-chip';
import { PageSubTitle } from '@/app/(docs)/docs/components/page-template';
import { cn } from '@/lib/utils';

interface CodeCardProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
  CLI?: string;
  componentName?: string;
  /** Bash install command shown in the Installation section, e.g. "npm i framer-motion" */
  installScript?: string;
  /** Full source of the component file shown in the Installation section */
  installCode?: string;
  /**
   * Extra files for the Code tab. The demo alone is not enough to copy a
   * component by hand — you also need the component and anything it imports.
   */
  files?: { name: string; code: string }[];
  /** Optional custom content to show in the installation section */
  installContent?: React.ReactNode;
  /** Hide the auto-rendered "Installation" section (kept for special pages) */
  withInstallation?: boolean;
}

const TABS = [
  { id: 'preview', label: 'Preview', icon: MonitorIcon },
  { id: 'code', label: 'Code', icon: TerminalIcon },
] as const;

type TabId = (typeof TABS)[number]['id'];

const CodeCard = ({
  children,
  code,
  className,
  CLI,
  componentName,
  installScript,
  installCode,
  installContent,
  files,
  withInstallation = true,
}: CodeCardProps) => {
  const [tab, setTab] = useState<TabId>('preview');
  const [activeFile, setActiveFile] = useState(0);
  const hasInstallation =
    withInstallation && !!(CLI || installScript || installCode || installContent);

  const handleTabChange = (next: TabId) => {
    setTab(next);
    posthog.capture('tab_switched', {
      tab: next,
      ...(componentName && { component_name: componentName }),
    });
  };

  return (
    <div className={cn(className)}>
      {/* Header row: Preview/Code pills + package chip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Preview or code"
          className="flex h-8 items-center gap-[11px] rounded-[10px] bg-black/4 pl-1 pr-1.5 dark:bg-white/6"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(id)}
                className={cn(
                  'flex items-center text-sm font-medium leading-5 transition-colors px-1.5',
                  isActive
                    ? 'gap-1 rounded-lg bg-white px-2.5 py-1 text-[#262626] dark:bg-neutral-900 dark:text-neutral-100'
                    : 'gap-[3px] text-[#686868]/70 hover:text-[#262626] dark:text-neutral-500 dark:hover:text-neutral-200',
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
        {CLI && <PackageChip cli={CLI} componentName={componentName} />}
      </div>

      {/* Panel — both tabs stay mounted so switching neither remounts the demo
          nor re-highlights the code, and the equal heights stop the page from
          jumping when toggling Preview/Code. */}
      <div className="mt-4">
        <div
          className={cn(
            'overflow-hidden rounded-[14px] border border-black/8 bg-white dark:border-white/10 dark:bg-neutral-950',
            tab !== 'preview' && 'hidden',
          )}
        >
          <div className="flex min-h-[450px] w-full items-center justify-center overflow-auto p-6 sm:p-10">
            {children}
          </div>
        </div>
        <div className={cn(tab !== 'code' && 'hidden')}>
          {files && files.length > 1 ? (
            <>
              {/* File switcher — copying by hand needs every file, not just
                  the demo that imports them. */}
              <div
                role="tablist"
                aria-label="Source files"
                className="mb-3 inline-flex h-8 max-w-full items-center gap-0.5 overflow-x-auto rounded-[10px] bg-black/4 px-1 dark:bg-white/6"
              >
                {files.map((file, index) => {
                  const isActive = index === activeFile;
                  return (
                    <button
                      key={file.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFile(index)}
                      className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[12px] leading-5 transition-colors duration-150',
                        isActive
                          ? 'bg-white text-[#262626] shadow-xs dark:bg-neutral-900 dark:text-neutral-100'
                          : 'text-[#686868]/70 hover:text-[#262626] dark:text-neutral-500 dark:hover:text-neutral-200',
                      )}
                    >
                      <FileTypeIcon
                        name={file.name}
                        className={cn('transition-opacity duration-150', !isActive && 'opacity-55')}
                      />
                      {file.name}
                    </button>
                  );
                })}
              </div>
              {/* Every file stays mounted so switching never re-highlights. */}
              {files.map((file, index) => (
                <div key={file.name} className={cn(index !== activeFile && 'hidden')}>
                  <CodeHighlight code={file.code} inTab requireAuth />
                </div>
              ))}
            </>
          ) : (
            <CodeHighlight code={code} inTab requireAuth />
          )}
        </div>
      </div>

      {/* Installation */}
      {hasInstallation && (
        <>
          <PageSubTitle>Installation</PageSubTitle>
          <InstallationTabs
            cli={CLI}
            installScript={installScript}
            installCode={installCode}
            installContent={installContent}
            componentName={componentName}
          />
        </>
      )}
    </div>
  );
};

export default CodeCard;
