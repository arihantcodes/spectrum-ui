import { Card } from "@/components/UI/Card";

import { Snippet } from "@/components/Snippet";

export default function Component() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="text-sm ">Installation</div>
          <h1 className="text-2xl font-bold">Spectrum UI</h1>
          <p className="">Install and configure Next.js.</p>
        </div>

        {/* Warning Box */}
        <div className="bg-zinc-100 dark:bg-zinc-950  border rounded-lg p-4">
          <p className="text-sm">
            If you&apos;re using Next.js 15, see the{" "}
            <a
              href="https://ui.shadcn.com/docs/react-19"
              className="text-blue-400 hover:underline"
            >
              Next.js 15 + React 19 guide
            </a>
            .
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-lg font-mono border px-2 py-0.5 rounded">
                1
              </div>
              <h2 className="text-lg font-semibold">Create project</h2>
            </div>
            <p className="text-gray-400">
              Run the{" "}
              <code className=" dark:bg-zinc-800 px-1 rounded">init</code>{" "}
              command to create a new Next.js project or to setup an existing
              one:
            </p>

            <div className="p-0 md:p-4 space-y-4">
              <Snippet text="npx create-next-app@latest" width="740px" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-lg font-mono border px-2 py-0.5 rounded">
                2
              </div>
              <h2 className="text-lg font-semibold">Install Shadcn UI</h2>
            </div>

            <div className="p-0 md:p-4 space-y-4">
              <Snippet text="npx shadcn@latest init" width="740px" />
              <div>
                <Card className="flex flex-col gap-7 p-6">
                  <p className="text-sm text-gray-400">
                    You can use the{" "}
                    <code className="bg-gray-200 dark:bg-zinc-800 px-1 rounded">
                      -d
                    </code>{" "}
                    flag for defaults i.e.{" "}
                    <code className=" dark:bg-zinc-800 px-1 rounded">
                      new-york
                    </code>
                    ,{" "}
                    <code className="bg-gray-200 dark:bg-zinc-800 px-1 rounded">
                      zinc
                    </code>{" "}
                    and{" "}
                    <code className="bg-gray-200 dark:bg-zinc-800 px-1 rounded">
                      yes
                    </code>{" "}
                    for the css variables.
                  </p>
                  <Snippet text="npx shadcn@latest init -d" width="600px" />
                </Card>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-lg font-mono border px-2 py-0.5 rounded">
                3
              </div>
              <h2 className="text-lg font-semibold">
                Configure components.json
              </h2>
            </div>
            <p className="text-gray-400">
              You will be asked a few questions to configure{" "}
              <code className=" bg-gray-200 dark:bg-zinc-800 px-1 rounded">
                components.json
              </code>
              :
            </p>
            <Card className="bg-gray-200 dark:bg-zinc-800  p-4">
              <pre className="text-sm  space-y-2">
                <div>
                  <span className="text-gray-500">1</span> Which style would you
                  like to use? {">"}
                  <span className=""> New York</span>
                </div>
                <div>
                  <span className="text-gray-500">2</span> Which color would you
                  like to use as base color? {">"}
                  <span className=""> Zinc</span>
                </div>
                <div>
                  <span className="text-gray-500">3</span> Do you want to use
                  CSS variables for colors? {">"}
                  <span className=""> no / yes</span>
                </div>
              </pre>
            </Card>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-lg font-mono border px-2 py-0.5 rounded">
                4
              </div>
              <h2 className="text-lg font-semibold">That&apos;s it</h2>
            </div>
            <p className="text-gray-400">
              You can now start adding components to your project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
