// components/code-card-wrapper.tsx
"use client";

import CodeCard from "@/app/(docs)/docs/components/code-card/code-card";

interface Props {
  code: string;
  className?: string;
  children?: React.ReactNode;
  CLI?: string;
  componentName?: string;
  installScript?: string;
  installCode?: string;
  installContent?: React.ReactNode;
  files?: { name: string; code: string }[];
  withInstallation?: boolean;
}

const CodeCardWrapper = ({
  code,
  className,
  children,
  CLI,
  componentName,
  installScript,
  installCode,
  installContent,
  files,
  withInstallation,
}: Props) => {
  return (
    <CodeCard
      code={code}
      className={className}
      CLI={CLI}
      componentName={componentName}
      installScript={installScript}
      installCode={installCode}
      installContent={installContent}
      files={files}
      withInstallation={withInstallation}
    >
      {children}
    </CodeCard>
  );
};

export default CodeCardWrapper;
