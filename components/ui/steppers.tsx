import fs from "fs/promises";
import nodePath from "path";
import dynamic from "next/dynamic";

const InstallationTabs = dynamic(
  () =>
    import(
      "@/app/(docs)/docs/components/code-card/parts/installation-tabs"
    ),
);

interface SteppersProps {
  className?: string;
  installScript?: string;
  codePath?: string;
  steps?: { title: string; children?: React.ReactNode }[];
  withInstall?: boolean;
  withEnd?: boolean;
}

/** Extract a registry slug from a shadcn add command so the CLI tab can offer
 * package-manager switching, e.g. "npx shadcn@latest add input" → "input". */
const slugFromInstallScript = (script?: string) => {
  if (!script) return undefined;
  const match = script.match(
    /^(?:npx|pnpm dlx|bunx(?: --bun)?|yarn dlx) shadcn@latest add (\S+)$/,
  );
  return match?.[1];
};

export async function Steppers({
  className,
  installScript,
  codePath,
  steps = [],
  withInstall = false,
}: SteppersProps) {
  let codeFromFile = "";

  if (withInstall && codePath) {
    try {
      const absolutePath = nodePath.join(process.cwd(), codePath);
      codeFromFile = await fs.readFile(absolutePath, "utf8");
    } catch (error) {
      codeFromFile = "// Could not load file";
    }
  }

  const cli = slugFromInstallScript(installScript);

  return (
    <div className={className}>
      {withInstall && (
        <InstallationTabs
          cli={cli}
          installScript={cli ? undefined : installScript}
          installCode={codeFromFile || undefined}
        />
      )}

      {steps.map((s) => (
        <div key={s.title} className="mt-6">
          <p className="text-sm font-medium text-[#262626] dark:text-neutral-200">
            {s.title}
          </p>
          {s.children && (
            <div className="mt-2 text-sm text-[#686868] dark:text-neutral-400">
              {s.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
