// components/code-card-wrapper.tsx
"use client";

import CodeCard from "@/app/(docs)/docs/components/code-card/code-card";

interface Props {
  code: string;
  className?: string;
  children?: React.ReactNode;
  CLI?: string;
  installScript?: string;
  installCode?: string;
  installContent?: React.ReactNode;
}

const CodeCardWrapper = ({ code, className, children, CLI, installScript, installCode, installContent }: Props) => {
  return (
    <CodeCard
      code={code}
      className={className}
      CLI={CLI}
      installScript={installScript}
      installCode={installCode}
      installContent={installContent}
    >
      {children}
    </CodeCard>
  );
};

export default CodeCardWrapper;
