'use client';

import React, { useRef, useState } from 'react';
import { RiClaudeFill, RiCursorAiFill, RiOpenaiFill } from '@remixicon/react';
import { IconBrandVscode } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import CommandFigure from '@/app/(docs)/docs/components/code-card/parts/command-figure';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { InlineCode } from '@/components/ui/inline-code';

export const MCP_CONFIG = `{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

/**
 * Codex reads TOML, not JSON, and keys the table `mcp_servers` rather than
 * `mcpServers`. Pasting the JSON config into `config.toml` silently does
 * nothing, which is the failure everyone hits first.
 */
export const CODEX_CONFIG = `[mcp_servers.spectrum-ui]
command = "npx"
args = ["-y", "@spectrumui/mcp"]`;

const VSCODE_CONFIG = `{
  "servers": {
    "spectrum-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}`;

/** Windsurf's triple sail, simplified — neither icon set we ship carries it. */
function WindsurfMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 3.5c5.6.4 9.4 2.6 11.4 6.9l-6.6-.1c-2.3-1.4-3.9-3.7-4.8-6.8Z" />
      <path d="M7.6 11.4c4.6.3 7.8 2.2 9.5 5.7l-5.5-.1c-1.9-1.2-3.2-3-4-5.6Z" />
      <path d="M10.7 18.6c3.5.2 6 1.6 7.3 4.4l-4.2-.1c-1.5-.9-2.5-2.3-3.1-4.3Z" />
    </svg>
  );
}

const PROMPTS = [
  'Show me all available components in the Spectrum UI registry',
  'Add the kanban board and animated drawer to my project',
  'Build a testimonial section using Spectrum UI components',
];

function Lead({ strong, rest }: { strong: string; rest: string }) {
  return (
    <p className="text-[16px] leading-[27px] text-neutral-600 dark:text-neutral-400">
      <strong className="font-medium text-neutral-900 dark:text-neutral-50">{strong}</strong>
      {rest}
    </p>
  );
}

function PromptList({ restart }: { restart: string }) {
  return (
    <>
      <Lead strong={`Restart ${restart}`} rest=" and try the following prompts:" />
      <ul className="my-1 flex list-disc flex-col gap-2.5 pl-5 text-[16px] leading-[27px] text-neutral-600 marker:text-neutral-300 dark:text-neutral-400 dark:marker:text-neutral-600">
        {PROMPTS.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </>
  );
}

const CLIENTS = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: RiClaudeFill,
    content: (
      <div className="flex flex-col gap-4">
        <Lead strong="Run the following command" rest=" in your project:" />
        <CommandFigure command="claude mcp add spectrum-ui -- npx -y @spectrumui/mcp" />
        <PromptList restart="Claude Code" />
        <p className="text-[16px] leading-[27px] text-neutral-600 dark:text-neutral-400">
          <strong className="font-medium text-neutral-900 dark:text-neutral-50">Note:</strong> You
          can use the <InlineCode>/mcp</InlineCode> command in Claude Code to debug the MCP server.
        </p>
      </div>
    ),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: RiCursorAiFill,
    content: (
      <div className="flex flex-col gap-4">
        <Lead
          strong="Add the following"
          rest=" to your project root, then enable the server in Cursor Settings → MCP:"
        />
        <CodeHighlight code={MCP_CONFIG} lang="json" title=".cursor/mcp.json" requireAuth={false} />
        <PromptList restart="Cursor" />
      </div>
    ),
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: RiOpenaiFill,
    content: (
      <div className="flex flex-col gap-4">
        <Lead strong="Run the following command" rest=" in your project:" />
        <CommandFigure command="codex mcp add spectrum-ui -- npx -y @spectrumui/mcp" />
        <Lead
          strong="Or add it by hand"
          rest=" to ~/.codex/config.toml — note the TOML table, not the JSON the other clients use:"
        />
        <CodeHighlight
          code={CODEX_CONFIG}
          lang="toml"
          title="~/.codex/config.toml"
          requireAuth={false}
        />
        <PromptList restart="Codex" />
      </div>
    ),
  },
  {
    id: 'claude-desktop',
    name: 'Claude Desktop',
    icon: RiClaudeFill,
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
        <p className="text-[16px] leading-[27px] text-neutral-600 dark:text-neutral-400">
          <strong className="font-medium text-neutral-900 dark:text-neutral-50">Note:</strong> You
          should see <InlineCode>spectrum-ui</InlineCode> listed in the tools panel (hammer icon)
          after restarting.
        </p>
      </div>
    ),
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: WindsurfMark,
    content: (
      <div className="flex flex-col gap-4">
        <Lead strong="Add the following" rest=" to your Windsurf MCP config file:" />
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
    id: 'vscode',
    name: 'VS Code',
    icon: IconBrandVscode,
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
  const pills = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeClient = CLIENTS.find((c) => c.id === active)!;
  const activeIndex = CLIENTS.findIndex((c) => c.id === active);

  /** Roving radiogroup: arrows move and select, Home/End jump. */
  function onArrowKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0;
    let next = activeIndex;
    if (step !== 0) next = (activeIndex + step + CLIENTS.length) % CLIENTS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = CLIENTS.length - 1;
    else return;
    event.preventDefault();
    const id = CLIENTS[next].id;
    setActive(id);
    pills.current[id]?.focus();
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="AI tool"
        onKeyDown={onArrowKey}
        className="mb-6 flex flex-wrap gap-2"
      >
        {CLIENTS.map((client) => {
          const selected = active === client.id;
          const Mark = client.icon;
          return (
            <button
              key={client.id}
              ref={(node) => {
                pills.current[client.id] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(client.id)}
              className={cn(
                'flex h-8 cursor-pointer items-center gap-1.5 rounded-full pl-2.5 pr-3 text-[13.5px]',
                'transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.96]',
                'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950',
                selected
                  ? 'border border-transparent bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border border-black/[0.09] bg-white text-neutral-800 shadow-xs hover:border-black/[0.18] dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/25',
              )}
            >
              <Mark aria-hidden className="size-[15px] shrink-0" strokeWidth={1.8} />
              {client.name}
            </button>
          );
        })}
      </div>
      {activeClient.content}
    </div>
  );
}
