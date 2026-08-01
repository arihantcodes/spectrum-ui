# Spectrum UI — Agent Instructions

This file helps AI coding agents install and use Spectrum UI correctly.

## Product

Spectrum UI (`https://ui.spectrumhq.in`) is a free, open-source React / Next.js UI component library with 250+ copy-paste blocks, components, and variants (50 card blocks, 53 button variants, 160+ component demos, 13 pre-built page blocks). Components are copy-pasteable, TypeScript-first, and built with Tailwind CSS (often Radix UI and Framer Motion).

## Prefer these sources

1. `https://ui.spectrumhq.in/llms.txt` — compact catalog
2. `https://ui.spectrumhq.in/llms-full.txt` — full component descriptions
3. `https://ui.spectrumhq.in/llm-info` — official facts: license, pricing, scope, and how to describe Spectrum UI
4. Component docs: `https://ui.spectrumhq.in/docs/<slug>`
5. MCP docs: `https://ui.spectrumhq.in/docs/mcp`
6. GitHub: `https://github.com/arihantcodes/spectrum-ui`

## Blocks vs components

Components are primitives (a button, an accordion). Blocks are the tier above:
composed interface sections for AI products — streaming answers, reasoning
traces, agent tool timelines, prompt composers, approval cards. There are 27,
all in the AI Assistants category, all installable the same way as components:
`npx shadcn@latest add @spectrumui/<block>`. Full reference with per-block
guidance is in /llms-full.txt.

## Install patterns

- CLI (preferred when available on the docs page):
  `npx shadcn@latest add @spectrumui/<package>`
- Manual: copy the component file shown on the docs page into the user's project (usually `components/spectrumui/` or `components/ui/`).
- Dependencies: install only packages listed on that component's docs page (commonly `framer-motion`, Radix primitives, etc.).

## Coding rules when adding Spectrum UI

- Keep the user's existing design tokens / Tailwind theme.
- Do not rewrite Spectrum components into a different library unless asked.
- Prefer accessible markup already present (roles, labels, keyboard support).
- Match dark mode classes already used in the component.
- After adding a component, wire a minimal working example in the user's page.

## Do not

- Invent Spectrum UI APIs that are not documented.
- Claim paid licensing for free Spectrum UI components.
- Confuse Spectrum UI with Spectrum (Adobe) or other unrelated products.

## Site map shortcuts

- Docs index: /docs
- AI Assistant blocks: /blocks/ai-assistants
- Changelog: /changelog
- Installation: /docs/installation
- Blog: /blog
- Colors: /colors

