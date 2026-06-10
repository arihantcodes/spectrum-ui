# @spectrumui/mcp

**Model Context Protocol server for [Spectrum UI](https://spectrumhq.in)**

Lets AI assistants (Claude, Cursor, Windsurf, Zed) browse, search, and install Spectrum UI components directly into your codebase — no copy-pasting.

```
You: "Add the AnimatedDrawer from Spectrum UI to my project"

Claude (via MCP):
  → calls spectrum_ui.search_components("animated drawer")
  → calls spectrum_ui.get_component("animateddrawer")
  → calls spectrum_ui.install_component("animateddrawer")
     runs: bunx --bun shadcn@latest add @spectrumui/animateddrawer
  → component installed, import ready ✅
```

---

## Setup

### Claude Desktop

Add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}
```

Restart Claude Desktop. You'll see "spectrum-ui" in the tools list.

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "spectrum-ui": {
      "command": "npx",
      "args": ["-y", "@spectrumui/mcp"]
    }
  }
}
```

---

## Tools

| Tool | Description |
|---|---|
| `list_components` | List all components, optionally filtered by category |
| `search_components` | Fuzzy search by keyword — returns ranked matches |
| `get_component` | Full metadata + install instructions for a component |
| `list_categories` | All categories with component counts |
| `install_component` | Runs `npx shadcn@latest add` to install into your project |

---

## Example prompts

- *"Show me all Spectrum UI animation components"*
- *"Find a date picker in Spectrum UI"*
- *"Install the kanban board component from Spectrum UI"*
- *"What categories does Spectrum UI have?"*
- *"Get details for the event-calendar component"*

---

## Requirements

- Node.js 18+
- A project using Next.js + Tailwind CSS + shadcn/ui (for `install_component`)

---

## Links

- **Website**: https://spectrumhq.in
- **Docs**: https://spectrumhq.in/docs
- **GitHub**: https://github.com/arihantcodes/spectrum-ui

---

MIT License © Arihant Jain
