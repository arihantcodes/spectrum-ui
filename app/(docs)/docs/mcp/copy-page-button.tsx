"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Copy1Icon } from "@/app/(docs)/layout-parts/docs-icons";

const PAGE_MARKDOWN = `# Spectrum UI MCP Server

Use the Spectrum UI MCP server to browse, search, and install components from your AI assistant.

## Quick Start

### Claude Code

\`\`\`bash
claude mcp add spectrum-ui -- npx -y @spectrumui/mcp
\`\`\`

### Claude Desktop / Cursor / Windsurf

Add to claude_desktop_config.json, .cursor/mcp.json, or ~/.codeium/windsurf/mcp_config.json:

\`\`\`json
{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}
\`\`\`

### VS Code

Add to .vscode/mcp.json:

\`\`\`json
{
  "servers": {
    "spectrum-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}
\`\`\`

## Tools

- list_components — list all components, optionally filtered by category
- search_components — fuzzy search by keyword, ranked by relevance
- get_component — full metadata and install instructions for a component
- list_categories — all categories with component counts
- install_component — runs the CLI to install directly into your project

## Example prompts

- "Show me all available components in the Spectrum UI registry"
- "Add the kanban board and animated drawer to my project"
- "Build a testimonial section using Spectrum UI components"

Requirements: Node.js 18+, an MCP-compatible editor, and a Next.js + Tailwind CSS + shadcn/ui project for installs.
`;

export default function CopyPageButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PAGE_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-[#e5e5e5] bg-white px-2.5 text-[13px] font-medium leading-4 text-[#262626] transition hover:bg-black/2 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-white/4"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Copy1Icon className="size-3.5" />
      )}
      {copied ? "Copied!" : "Copy Page"}
    </button>
  );
}
