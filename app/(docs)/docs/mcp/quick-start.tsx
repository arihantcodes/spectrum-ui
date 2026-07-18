"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CommandFigure from "@/app/(docs)/docs/components/code-card/parts/command-figure";
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight";
import { InlineCode } from "@/components/ui/inline-code";

export const MCP_CONFIG = `{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

const VSCODE_CONFIG = `{
  "servers": {
    "spectrum-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

const PROMPTS = [
  "Show me all available components in the Spectrum UI registry",
  "Add the kanban board and animated drawer to my project",
  "Build a testimonial section using Spectrum UI components",
];

function Lead({ strong, rest }: { strong: string; rest: string }) {
  return (
    <p className="text-[15px] leading-[26px] text-neutral-600 dark:text-neutral-400">
      <strong className="font-medium text-neutral-900 dark:text-neutral-50">
        {strong}
      </strong>
      {rest}
    </p>
  );
}

function PromptList({ restart }: { restart: string }) {
  return (
    <>
      <Lead strong={`Restart ${restart}`} rest=" and try the following prompts:" />
      <ul className="my-1 flex list-disc flex-col gap-2.5 pl-5 text-[15px] leading-[26px] text-neutral-600 marker:text-neutral-300 dark:text-neutral-400 dark:marker:text-neutral-600">
        {PROMPTS.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </>
  );
}

const CLIENTS = [
  {
    id: "claude-code",
    name: "Claude Code",
    content: (
      <div className="flex flex-col gap-4">
        <Lead strong="Run the following command" rest=" in your project:" />
        <CommandFigure command="claude mcp add spectrum-ui -- npx -y @spectrumui/mcp" />
        <PromptList restart="Claude Code" />
        <p className="text-[15px] leading-[26px] text-neutral-600 dark:text-neutral-400">
          <strong className="font-medium text-neutral-900 dark:text-neutral-50">
            Note:
          </strong>{" "}
          You can use the <InlineCode>/mcp</InlineCode> command in Claude Code
          to debug the MCP server.
        </p>
      </div>
    ),
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    content: (
      <div className="flex flex-col gap-4">
        <Lead
          strong="Add the following"
          rest=" to your Claude Desktop config file, then fully quit and reopen the app:"
        />
        <CodeHighlight
          code={MCP_CONFIG}
          lang="json"
          title="claude_desktop_config.json"
          requireAuth={false}
        />
        <PromptList restart="Claude Desktop" />
        <p className="text-[15px] leading-[26px] text-neutral-600 dark:text-neutral-400">
          <strong className="font-medium text-neutral-900 dark:text-neutral-50">
            Note:
          </strong>{" "}
          You should see <InlineCode>spectrum-ui</InlineCode> listed in the
          tools panel (hammer icon) after restarting.
        </p>
      </div>
    ),
  },
  {
    id: "cursor",
    name: "Cursor",
    content: (
      <div className="flex flex-col gap-4">
        <Lead
          strong="Add the following"
          rest=" to your project root, then enable the server in Cursor Settings → MCP:"
        />
        <CodeHighlight
          code={MCP_CONFIG}
          lang="json"
          title=".cursor/mcp.json"
          requireAuth={false}
        />
        <PromptList restart="Cursor" />
      </div>
    ),
  },
  {
    id: "windsurf",
    name: "Windsurf",
    content: (
      <div className="flex flex-col gap-4">
        <Lead
          strong="Add the following"
          rest=" to your Windsurf MCP config file:"
        />
        <CodeHighlight
          code={MCP_CONFIG}
          lang="json"
          title="~/.codeium/windsurf/mcp_config.json"
          requireAuth={false}
        />
        <PromptList restart="Windsurf" />
      </div>
    ),
  },
  {
    id: "vscode",
    name: "VS Code",
    content: (
      <div className="flex flex-col gap-4">
        <Lead
          strong="Add the following"
          rest=" to your workspace, then start the server from the Chat view in agent mode:"
        />
        <CodeHighlight
          code={VSCODE_CONFIG}
          lang="json"
          title=".vscode/mcp.json"
          requireAuth={false}
        />
        <PromptList restart="VS Code" />
      </div>
    ),
  },
];

export default function QuickStart() {
  const [active, setActive] = useState(CLIENTS[0].id);
  const activeClient = CLIENTS.find((c) => c.id === active)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="MCP client"
        className="mb-5 flex gap-6 overflow-x-auto border-b border-black/[0.08] dark:border-white/10"
      >
        {CLIENTS.map((client) => (
          <button
            key={client.id}
            type="button"
            role="tab"
            aria-selected={active === client.id}
            onClick={() => setActive(client.id)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 pb-2.5 text-sm leading-5 transition-colors",
              active === client.id
                ? "border-[#262626] font-medium text-[#262626] dark:border-white dark:text-white"
                : "border-transparent text-muted-foreground hover:text-[#262626] dark:hover:text-neutral-200",
            )}
          >
            {client.name}
          </button>
        ))}
      </div>
      {activeClient.content}
    </div>
  );
}
