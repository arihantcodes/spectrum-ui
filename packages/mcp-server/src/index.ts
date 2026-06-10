#!/usr/bin/env node
/**
 * Spectrum UI MCP Server
 *
 * Lets AI assistants (Claude, Cursor, Windsurf, etc.) browse, search,
 * and install Spectrum UI components directly into user projects.
 *
 * Usage:
 *   npx @spectrumui/mcp
 *
 * Claude Desktop config:
 *   {
 *     "mcpServers": {
 *       "spectrum-ui": {
 *         "command": "npx",
 *         "args": ["-y", "@spectrumui/mcp"]
 *       }
 *     }
 *   }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { listComponents } from "./tools/list-components.js";
import { searchComponents } from "./tools/search-components.js";
import { getComponent } from "./tools/get-component.js";
import { listCategories } from "./tools/list-categories.js";
import { installComponent } from "./tools/install-component.js";

const server = new McpServer({
  name: "spectrum-ui",
  version: "0.1.0",
});

// ─── Tool: list_components ──────────────────────────────────────────────────
server.tool(
  "list_components",
  "List all available Spectrum UI components. Optionally filter by category (e.g. 'AI', 'Forms', 'Animation').",
  {
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter. Use list_categories to see valid values."
      ),
  },
  async ({ category }) => {
    const components = await listComponents(category);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              total: components.length,
              category: category ?? "all",
              components,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ─── Tool: search_components ────────────────────────────────────────────────
server.tool(
  "search_components",
  "Search Spectrum UI components by keyword. Returns ranked results by relevance.",
  {
    query: z
      .string()
      .describe(
        "Search term — e.g. 'chat', 'animated drawer', 'date picker', 'kanban'"
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(20)
      .default(8)
      .optional()
      .describe("Maximum number of results to return (default: 8)"),
  },
  async ({ query, limit }) => {
    const results = await searchComponents(query, limit ?? 8);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { query, results_found: results.length, results },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ─── Tool: get_component ────────────────────────────────────────────────────
server.tool(
  "get_component",
  "Get full details and install instructions for a specific Spectrum UI component.",
  {
    name: z
      .string()
      .describe(
        "Component name or search term — e.g. 'animated-card', 'kanbanboard', 'event-calendar'"
      ),
  },
  async ({ name }) => {
    const component = await getComponent(name);
    if (!component) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${name}" not found. Use search_components to find the correct name.`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(component, null, 2),
        },
        {
          type: "text",
          text: component.installInstructions,
        },
      ],
    };
  }
);

// ─── Tool: list_categories ──────────────────────────────────────────────────
server.tool(
  "list_categories",
  "List all Spectrum UI component categories with component counts.",
  {},
  async () => {
    const categories = await listCategories();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ categories }, null, 2),
        },
      ],
    };
  }
);

// ─── Tool: install_component ────────────────────────────────────────────────
server.tool(
  "install_component",
  "Install a Spectrum UI component into the user's project using the shadcn CLI. This runs `npx shadcn@latest add` with the Spectrum UI registry URL.",
  {
    name: z
      .string()
      .describe("Component name to install — e.g. 'animated-card', 'kanbanboard'"),
    project_dir: z
      .string()
      .optional()
      .describe(
        "Absolute path to the project root. Defaults to current working directory."
      ),
  },
  async ({ name, project_dir }) => {
    const result = await installComponent(name, project_dir);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
        ...(result.nextSteps
          ? [{ type: "text" as const, text: result.nextSteps }]
          : []),
      ],
      isError: !result.success,
    };
  }
);

// ─── Start ──────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("Spectrum UI MCP server running on stdio");
