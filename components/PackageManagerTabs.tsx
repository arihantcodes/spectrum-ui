"use client";

import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

import InstallCommand from "@/app/(docs)/docs/components/code-card/parts/installcommand";

const packageManagers = [
  {
    id: "pnpm",
    name: "pnpm",
    command: "pnpm dlx shadcn@latest add",
  },
  {
    id: "npm",
    name: "npm",
    command: "npx shadcn@latest add",
  },
  {
    id: "yarn",
    name: "yarn",
    command: "yarn dlx shadcn@latest add",
  },
  {
    id: "bun",
    name: "bun",
    command: "bunx --bun shadcn@latest add",
  },
];

interface PackageManagerTabsProps {
  CLI: string;
}

export default function PackageManagerTabs({ CLI }: PackageManagerTabsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Command copied successfully",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full mt-5">
      <Tabs defaultValue="bun" className="w-full">
        <div className=" rounded-lg border  overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {/* Tab Header */}
          <div className=" bg-neutral-100  dark:bg-neutral-900  text-neutral-900 dark:text-neutral-100 flex items-center   px-4 py-1">
            <TabsList className="bg-transparent p-0 gap-1 bg-neutral-100 dark:bg-neutral-900">
              {packageManagers.map((pm) => (
                <TabsTrigger
                  key={pm.id}
                  value={pm.id}
                  className="px-3 py-1 text-sm  rounded-lg 
                  data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 data-[state=active]:border data-[state=active]:border-neutral-300
                  
                  dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white dark:data-[state=active]:border dark:data-[state=active]:border-white/20 text-neutral-700 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {pm.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Command Display */}
          {packageManagers.map((pm) => (
            <TabsContent key={pm.id} value={pm.id} className="rounded-2xl  ">
              <InstallCommand code={`${pm.command} ${CLI}`} lang="bash" inTab />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
