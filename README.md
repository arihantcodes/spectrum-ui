<div align="center">

<a href="https://ui.spectrumhq.in">
  <img src=".github/assets/hero.png" alt="Spectrum UI" width="960">
</a>

<h1>Spectrum UI</h1>

<p>
  Animated React components you can copy, install with the shadcn CLI,<br/>
  or just ask your AI editor for.
</p>

<p>
  <a href="https://ui.spectrumhq.in">Website</a> ·
  <a href="https://ui.spectrumhq.in/docs">Docs</a> ·
  <a href="https://ui.spectrumhq.in/docs/mcp">MCP Server</a> ·
  <a href="https://github.com/arihantcodes/spectrum-ui/issues">Issues</a>
</p>

<p>
  <a href="https://github.com/arihantcodes/spectrum-ui/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/arihantcodes/spectrum-ui?style=flat&label=Stars&color=000000">
  </a>
  <a href="https://github.com/arihantcodes/spectrum-ui/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg">
  </a>
  <a href="https://github.com/arihantcodes/spectrum-ui/commits/main">
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/arihantcodes/spectrum-ui?style=flat&label=Last%20Commit&color=000000">
  </a>
</p>

</div>

## What it is

Spectrum UI is a free collection of React components built on shadcn/ui, Tailwind CSS, and Motion. Nothing is hidden behind a package. The source lands in your project, and from there it's yours to change.

There are 44 components in the docs today, plus page blocks and a few full templates. Every one has a live preview and its code sitting right underneath.

## Getting a component

Pick whichever way suits you.

**Ask your editor.** Connect the MCP server once and Claude Code, Cursor, or Windsurf can browse and install components for you:

```bash
claude mcp add spectrum-ui -- npx -y @spectrumui/mcp
```

Then just say what you want: _"add the kanban board and animated drawer to my project."_ Setup for the other editors is in the [MCP docs](https://ui.spectrumhq.in/docs/mcp).

**Use the shadcn CLI.** If your project already has shadcn/ui set up:

```bash
npx shadcn@latest add @spectrumui/animated-drawer
```

**Copy it.** Open a component page, hit copy, paste it in. That works too.

## What's in here

- **Components** — forms, cards, buttons, ratings, overlays, media, auth, feedback
- **Blocks** — hero, pricing, FAQ, CTA and footer sections
- **Templates** — dashboards and landing pages you can lift wholesale
- **Colors** — a palette browser at [/colors](https://ui.spectrumhq.in/colors)

## Running it locally

Only needed if you want to work on the site itself.

```bash
git clone https://github.com/arihantcodes/spectrum-ui.git
cd spectrum-ui
yarn install
yarn dev
```

That's [localhost:3000](http://localhost:3000). Docs, components, and the registry all work out of the box. Auth, payments, and bookmarks need keys in a `.env` file, so those pages will be quiet until you add them.

| Command | Does |
|---|---|
| `yarn dev` | Dev server |
| `yarn build` | Production build |
| `yarn lint` | ESLint |
| `yarn test` | Checks the registry, catalog, metadata, and structured data line up |

Built with Next.js 14 (App Router), TypeScript, Tailwind, Radix, and Motion. Supabase and NextAuth handle accounts, Resend sends email, and it all ships on Vercel.

## Contributing

New components, fixes, docs — all welcome.

A component is a few files: the source in `components/spectrumui/`, a docs page under `app/(docs)/docs/`, registry entries in `registry.json` and `public/r/`, and a line in `content/component-catalog.json`. The fastest route is to copy an existing component and follow its shape.

Run `yarn test` before opening a PR. It'll tell you if anything is out of sync.

Missing a component you need? [Open an issue](https://github.com/arihantcodes/spectrum-ui/issues) and say so.

## Contributors

<a href="https://github.com/arihantcodes/spectrum-ui/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=arihantcodes/spectrum-ui" alt="Contributors">
</a>

## License

Apache 2.0. See [LICENSE](LICENSE).

<div align="center">
<br/>

Made by [Arihant](https://github.com/arihantcodes) and everyone above.

</div>
