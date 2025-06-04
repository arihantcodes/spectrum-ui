import React from "react";
import fs from "fs/promises";
import dynamic from "next/dynamic";


const CodeHighlight = dynamic(() => import('@/app/(docs)/docs/components/code-card/parts/code-highlight'), {
  ssr: false,
});



interface StepperProps {
  title?: string;
  step: number;
  children?: React.ReactNode;
}

function Stepper({ title, step, children }: StepperProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 font-medium shadow-sm transition-colors group-hover:bg-neutral-200 dark:bg-neutral-900/30 dark:text-neutral-400 dark:group-hover:bg-neutral-800/40">
          {step}
        </span>
        <h4 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h4>
      </div>
      {children && (
        <div className="ml-11 mt-2 border-l-2 border-neutral-100 pl-4 text-sm dark:border-neutral-800">
          {children}
        </div>
      )}
    </div>
  );
}

interface SteppersProps {
  className?: string;
  installScript?: string;
  codePath?: string;
  steps?: { title: string; children?: React.ReactNode }[];
  withInstall?: boolean;
  withEnd?: boolean;
}

export async function Steppers({
  className,
  installScript,
  codePath,
  steps = [],
  withInstall = false,
  withEnd = false,
}: SteppersProps) {
  let codeFromFile = "";
  let fileName = "";

  if (withInstall && codePath) {
    try {
      codeFromFile = await fs.readFile(codePath, "utf8");
      fileName = codePath.split(".").pop() || "ts";
    } catch (error) {
      console.error("Failed to read file:", error);
      codeFromFile = "// Could not load file";
    }
  }

  let stepCounter = 1;

  return (
    <div className={`space-y-6 py-2 ${className || ""}`}>
      {withInstall && installScript && (
        <Stepper title="Install the package" step={stepCounter++}>
          <CodeHighlight
            code={installScript}
            lang="bash"
            title="Terminal"
            inTab
          />
        </Stepper>
      )}

      {withInstall && codePath && (
        <Stepper title="Paste this code into your project" step={stepCounter++}>
          <CodeHighlight
            code={codeFromFile}
            title={codePath}
            withExpand={true}
            inTab={false}
          />
        </Stepper>
      )}

      {steps.map((s) => (
        <Stepper key={s.title} title={s.title} step={stepCounter++}>
          {s.children}
        </Stepper>
      ))}

      {withEnd && (
        <Stepper title="Update import paths as needed" step={stepCounter++} />
      )}
    </div>
  );
}
