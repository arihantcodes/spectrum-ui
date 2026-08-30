# Spectrum UI — AI Search (GEO/AEO) Strategy

> **Source:** Peec AI MCP (`api.peec.ai/mcp`), project "Spectrum UI" (`or_8b3159ec…`)
> **Baseline window:** 2026-06-19 → 2026-07-19 (30 days)
> **Engines tracked & active:** ChatGPT, Gemini, Google AI Overview
> **Prompts tracked:** 50 (React component libraries / UI blocks / animation templates / CLI / production-ready)

---

## 1. The Problem, Quantified

When people ask AI engines for React UI component libraries, **Spectrum UI is effectively invisible.**

| Brand | Visibility | Responses appeared in | Share of Voice | Avg. position |
|-------|-----------:|----------------------:|---------------:|--------------:|
| shadcn/ui | **74.2%** | 524 / 706 | 23.9% | 2.5 |
| Aceternity | **54.3%** | 383 / 706 | 16.3% | 3.0 |
| Magic UI | **45.9%** | 324 / 706 | 13.6% | 3.2 |
| Radix UI | 33.9% | 239 / 706 | 6.9% | 4.9 |
| MUI | 33.1% | 234 / 706 | 11.9% | 4.8 |
| Chakra UI | 19.6% | 138 / 706 | 4.5% | 4.7 |
| … | | | | |
| 21st.dev | 7.5% | 53 / 706 | 1.8% | 5.2 |
| Animate UI | 7.2% | 51 / 706 | 1.9% | 4.0 |
| **Spectrum UI** | **0.14%** | **1 / 706** | **0.02%** | **9.0** |

**Spectrum UI is dead last of 16 tracked brands.** It surfaced in exactly **one** answer in 30 days, at position 9. Even the smallest competitor (Animate UI) appears **50× more often**. The prompt set is a perfect match for Spectrum UI's positioning (animated copy-paste components, UI blocks, shadcn CLI, production-ready) — so this is *not* a targeting problem. It's a **presence problem**.

---

## 2. Root Cause — Where AI Citations Actually Come From

The domain report shows what sources ChatGPT/Gemini/AI-Overview retrieve and cite for these prompts. This is the battleground:

| Source domain | Type | Retrieved in | Citations | Spectrum UI mentioned? |
|---------------|------|-------------:|----------:|:----------------------:|
| youtube.com | UGC | **75.7%** | 628 | ❌ |
| aceternity.com | Competitor site | 56.5% | 390 | ❌ |
| medium.com | UGC/blog | 48.5% | 398 | ❌ |
| dev.to | UGC/blog | 43.6% | 319 | ✅ (tiny) |
| adminlte.io | Listicle/roundup | 30.0% | 307 | ❌ |
| shadcn.io | Competitor | 30.9% | 147 | ❌ |
| reddit.com | UGC | 30.0% | 277 | ✅ (tiny) |
| untitledui.com | Roundup | 23.4% | 225 | ❌ |
| designrevision.com | Roundup | 17.9% | 147 | ❌ |
| reactbits.dev | Reference/roundup | 16.9% | 137 | ❌ |
| github.com | UGC | 9.7% | 64 | ✅ (tiny) |
| + long tail | wrappixel, dualite, spell.sh, builder.io, tailgrids, logrocket, shadcnstudio, uilora, codedthemes, shadcnblocks… | | | mostly ❌ |

**Key takeaways:**
1. **AI answers in this niche are built from third-party UGC + "best X" roundup articles — not the libraries' own docs.** YouTube, Medium, dev.to, Reddit, and a dozen listicle/aggregator sites drive the citations.
2. **Winners win by being name-dropped everywhere.** shadcn/ui, Aceternity, Magic UI appear across nearly every source. Aceternity even gets its *own* domain cited 56% of the time — proof a strong owned site *can* break in, but only after it's already famous.
3. **Spectrum UI's total off-site footprint is 3 faint mentions** (dev.to, reddit.com, github.com). It's absent from every roundup and every UGC channel that feeds the models. That's why it never enters an answer.

**Conclusion:** On-site SEO is already strong (robots allow all AI bots; llms.txt / llms-full.txt / agents.md present; JSON-LD everywhere). The gap is **not** technical. **~90% of AI visibility here is won off-site**, by getting Spectrum UI *named* in the roundups and UGC the models retrieve.

---

## 3. Action Plan

### Prong A — On-site (this repo) — *table stakes + Google/citation surface*
These make Spectrum UI a strong, quotable canonical source and help it rank in Google (which feeds AI Overview + gets scraped into roundups).

1. **Comparison pages** (highest on-site leverage) — target exact prompt intents & the winning competitors:
   - `/compare` hub + `/compare/spectrum-ui-vs-aceternity`, `…-vs-magic-ui`, `…-vs-shadcn`
   - Each with a feature table, honest positioning, and `FAQPage` + `ItemList` JSON-LD.
2. **Listicle-style landing page** — `best-animated-react-component-libraries` (2026), including Spectrum UI alongside Aceternity/Magic UI/shadcn. This is the format AI engines cite; owning our own version is a citable anchor.
3. **Sharpen `llms.txt` / `llms-full.txt`** — add a one-paragraph "how Spectrum UI compares to Aceternity / Magic UI" and the differentiators (animated, copy-paste, shadcn CLI, TypeScript, accessible, free/MIT).
4. **Refresh stale keywords** — `config/site.ts` still says "2024" in several keywords; update to 2026 and fold in the real prompt phrasings ("pre-built UI blocks", "animation templates", "production-ready React components", "works with shadcn CLI").
5. **Wire all new routes into `app/sitemap.ts`.**

### Prong B — Off-site (drives ~90% of citations) — *the real lever; content, not code*
Ordered by citation weight from the data:

1. **Get into the roundups/aggregators** that the models cite: pitch inclusion in / submit to reactbits.dev, shadcnblocks.com, uilora.com, dualite.dev, spell.sh, wrappixel, tailgrids, codedthemes, "awesome-react-components" lists, etc.
2. **Publish on Medium + dev.to** (top-cited blog sources): e.g. "Best animated React component libraries in 2026" and "Spectrum UI vs Aceternity vs Magic UI". These can be drafted from the comparison pages.
3. **Reddit** (r/reactjs, r/webdev, r/nextjs) — genuine participation in "best UI library" threads; heavily cited UGC.
4. **YouTube** (the #1 citation source, 75.7%) — a short demo / comparison video; even one indexed video helps.
5. **GitHub** — grow stars and add a comparison table to the README (github.com is already a citation source where Spectrum UI faintly appears).

---

## 4. How to Re-check Progress (Peec)

Helper committed at `.context/peec.sh` (gitignored). Re-run monthly:
- `get_brand_report` (aggregate) → track Spectrum UI visibility climbing off 0.14%.
- `get_domain_report` → watch for ui.spectrumhq.in + our dev.to/Medium posts appearing as sources.
- `list_prompts` → the 50 tracked queries to optimize against.

**Target milestones:** 0.14% → 5% (match Animate UI/21st.dev) → 15% (match the mid-tier) over the next two review windows.

---

## 5. Peec Action Engine — prioritized roadmap (`get_actions`, 2026-07-20)

Peec's opportunity engine ranks source "slices" by `opportunity_score` (share of AI answers that slice appears in, weighted by our ~0% coverage). **Spectrum UI's coverage in every slice is ≈0.**

### Owned (build on our site) — Peec's top-scored actions (3/3)
- **COMPARISON — ✅ DONE.** Peec's #1 owned recommendation is literally "create dedicated comparison pages vs alternatives" (it cites Aceternity's `/compare/aceternity-vs-shadcn` as the blueprint) plus a "Best React UI Component Libraries 2026" guide. Our `/compare/*` pages + `/best-animated-react-component-libraries` satisfy this exactly.
- **HOMEPAGE (opp 0.1116).** Tune homepage copy to explicitly carry the phrases "React component library", "Tailwind CSS components", and "animation templates" so AI engines categorize us alongside MUI / shadcn / Aceternity.
- **CATEGORY_PAGE (opp 0.0928) — ✅ partly done.** Built `/awesome` ("Awesome Spectrum UI"), a curated single-page index of every component + guides + resources with `CollectionPage`/`ItemList` JSON-LD. A dedicated **blocks gallery** — ✅ done: built `/blocks` (navigation, hero/marketing, pricing & auth, dashboards), linking to real component docs + `/templates`, with `ItemList` JSON-LD.
- **Broad guide — ✅ done.** Built `/best-react-component-libraries` ("Best React UI Component Libraries 2026") — the broad guide Peec's #1 comparison action names, covering shadcn/ui, MUI, Chakra, Radix, Mantine, Ant Design, Aceternity, Magic UI, HeroUI + Spectrum UI.
- **PRODUCT_PAGE (opp 0.0691), LISTICLE (owned 0.036)** — component pages + our roundup.

### Off-site (biggest overall opportunity) — UGC
- **youtube.com (opp 0.2587 — in ~65% of answers)**, **medium.com (0.161)**, **reddit.com (0.1097)**. These dominate citations. Not code — publish/participate.
- **EDITORIAL LISTICLE (0.0405)** — get named in third-party "best React UI library" roundups.

### Measurement gap
`get_agent_visits` returns **0** — Peec's agent/access-log integration isn't installed, so we can't yet confirm GPTBot / ClaudeBot / PerplexityBot are crawling. Install the Peec log integration to measure crawler activity.

---

## 6. Profound re-baseline — 2026-08-24/25

> **Source:** Profound exports (4 files, in `.context/attachments/`) — summarized visibility export, raw runs with citations, ChatGPT citation detail, and the `ui.spectrumhq.in` per-page bot log for 2026-08-25.
> **Coverage:** 115 prompt runs — ChatGPT 44, Perplexity 44, Google AI Overviews 27. 1,005 citations. 9 topics, United States, no persona.

### 6.1 Where we stand

| Engine | Visibility | Rank | Of N brands | Our domain cited |
|--------|-----------:|-----:|------------:|-----------------:|
| ChatGPT | 2.27% (1 run) | **#65** | 74 | 4 |
| Perplexity | 2.38% (1 run) | **#74** | 79 | **0** |
| Google AI Overviews | **0%** | — (absent) | 56 | **0** |

Reference points: Ant Design 50%/#1 and shadcn 45%/#2 on ChatGPT; MUI 47.6%/#1 on Perplexity.

**Two things are true at once.** Against the July Peec baseline (0.14%, 1 of 706 responses, dead last of 16) this is real movement — visibility is up ~16×, `ui.spectrumhq.in` is now a cited source for the first time, and crawlers are hitting the site hard (932 training fetches, 281 indexing fetches in a day). Prong A worked. But we are still bottom-decile on two engines and entirely absent from the third.

### 6.2 The finding that changes the strategy: retrieval without mention

Both of our mentions come from **the same branded prompt** — *"What's the best Spectrum UI alternative compared to Material UI, Ant Design, Chakra?"* Across the **107 non-branded prompts, we were named zero times.**

That is no longer a presence problem. `ui.spectrumhq.in/best-react-component-libraries` was **retrieved and cited in 4 separate ChatGPT answers**, and in the 3 non-branded ones ChatGPT read our page and extracted **only our competitors** from it:

| Prompt | Our page cited | Who ChatGPT named |
|--------|:--------------:|-------------------|
| "best accessible UI design in a component library" | ✅ | Adobe React Spectrum, Radix, shadcn/ui, MUI, Chakra, React Aria |
| "top UI component library for DX and rapid prototyping" | ✅ | shadcn, Mantine, MUI, Chakra, Ant Design, Radix |
| "best open-source UI resources for a UI component library" | ✅ | shadcn/ui, Radix, MUI, Mantine, Chakra, Ant Design, DaisyUI, Headless UI, HeroUI |
| "best Spectrum UI alternative vs MUI/AntD/Chakra" (branded) | ✅ | **Spectrum UI (#1)**, MUI, Ant Design, Chakra, shadcn/ui |

**Root cause:** we wrote a scrupulously fair 10-entry listicle. A fair listicle about competitors is competitor marketing. The page contained no sentence of the form *"X is the best library for Y"* naming us, for any of the 8 non-branded intents — so the model lifted the verdicts that *were* stated, all of which were about someone else. Getting retrieved is now solved; **getting extracted is the bottleneck.**

### 6.3 Adobe is eating the brand name

On our own branded prompts, `spectrum.adobe.com` takes **21 citations**. "Adobe" ranks #10 on ChatGPT and #9 on Perplexity; "React Spectrum" ranks **#35 on ChatGPT — 30 places above us.** Perplexity's answer to our own branded prompt didn't know we exist: it read "Spectrum UI" as a generic and recommended Mantine, Chakra, and MUI instead, putting us at position #4 in a question *about us*.

The disambiguation copy existed only on `/llm-info` — a page with 1 citation. It was absent from `llms.txt` and from every page that actually gets retrieved.

### 6.4 Owned-domain roundups do win — at 5× our volume

Vendor sites cited directly in these answers:

| Untitled UI | daisyUI | shadcnblocks | TailGrids | component.gallery | 21st.dev | shadcn | MUI | **Spectrum UI** |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 22 | 16 | 11 | 10 | 9 | 9 | 7 | 7 | **4** |

Untitled UI's 22 citations are almost entirely two posts on their *own* blog (`/blog/react-component-libraries` 15×, `/blog/react-dashboards` 5×). That is the exact play we are running with `/best-*` — it works, we are just running it with 2 pages instead of a suite, and ours don't self-advocate.

### 6.5 Per-engine citation mix — the strategies are different

| Engine | Top sources | Implication |
|--------|-------------|-------------|
| **ChatGPT** (266 cites) | designrevision 36, ninna-ui 14, stackpicks 12, frontfamily 12, **ui.spectrumhq.in 4** | Owned roundups already break in → double down on-site |
| **Perplexity** (502 cites) | **github 33**, **dev.to 30**, adminlte 27, untitledui 21 | GitHub README + dev.to are the only doors |
| **Google AI Overviews** (237 cites) | **reddit 31**, **youtube 31**, adminlte 13, medium 12 | Pure UGC — Reddit and YouTube or nothing |

### 6.6 Highest-value off-site targets, by measured citation count

These specific URLs decide these answers. Getting named in the top five is worth more than any on-site work:

| Cites | URL | Topics it drives |
|------:|-----|------------------|
| 23 | `adminlte.io/blog/react-ui-frameworks/` | 6 of 9 |
| 23 | `designrevision.com/blog/best-react-component-libraries` | 7 of 9 |
| 18 | `builder.io/blog/react-component-libraries-2026` | 7 of 9 |
| 16 | `designrevision.com/blog/best-tailwind-component-libraries` | Tailwind, blocks, a11y |
| 15 | `untitledui.com/blog/react-component-libraries` | 6 of 9 |
| 14 | `uxpin.com/studio/blog/top-react-component-libraries/` | 5 of 9 |
| 13 | `designerup.co/blog/copy-and-paste-ui-component-libraries/` | Blocks, DX |
| 12 | `stackpicks.dev/blog/best-open-source-ui-libraries-2026` | 4 of 9 |
| 12 | `frontfamily.com/guides/best-react-ui-frameworks/` | 5 of 9 |
| 9 | `bootstrapdash.com/blog/top-ui-libraries-for-creating-react-admin-dashboards` | Dashboards |
| 8 | `hashbyt.com/blog/best-react-ui-component-libraries` | 5 of 9 |
| 8 | `cssauthor.com/best-react-ui-component-libraries/` | 5 of 9 |
| 8 | `adminlte.io/blog/shadcn-ui-block-libraries/` | Blocks |
| 7 | `github.com/anubhavsrivastava/awesome-ui-component-library` | 4 of 9 — PR-able today |
| 7 | `digitala11y.com/accessible-ui-component-libraries-roundup/` | Accessibility |
| 7 | `component.gallery/design-systems/` | Design systems — submittable |

`awesome-ui-component-library` and `component.gallery` accept submissions — those are pull requests, not outreach. Start there.

### 6.7 Crawl budget is being spent on the wrong pages

From the bot log: **132 of 154 pages have zero AI citations.** The single most-crawled page on the site was **`/sign-up` — 147 training fetches, 40 indexing fetches, 0 citations** — a contentless auth screen. `/docs/navbar` (51), `/docs/card` (49), `/docs/button` (48), `/docs/accordion` (47) each pull ~50 fetches and produce 0 citations, while `/` produces 17 of our 49 citations off 61 fetches.

### 6.8 Shipped in this pass (code)

1. **License contradiction fixed.** `LICENSE` and `llms.txt` said Apache-2.0 while `/best-react-component-libraries`, `/best-animated-react-component-libraries`, and `/brandkit` said MIT — 6 conflicting claims about our own license on the same domain. A model that finds our facts contradicting each other will not assert either. Now Apache-2.0 everywhere.
2. **`/best-react-component-libraries` rewritten for extraction.** Added a "Which to pick" block: 8 `need → named winner → why` rows, one per tracked topic, in the exact "X is best for Y" shape these models copy. Spectrum UI is the named winner on the four intents where that is honestly defensible (production-ready, copy-paste blocks, Tailwind + motion, AI-assisted prototyping); shadcn/Radix, React Aria, Mantine, and Ant Design/MUI are named winners where *they* deserve it. Credibility is the asset — a page that claims everything gets extracted for nothing.
3. **Brand disambiguation, where it gets read.** Added an explicit "not Adobe Spectrum / React Spectrum / React Aria" section to `llms.txt`, `llms-full.txt`, and `/best-react-component-libraries` (both as prose and as an FAQ entry, so it lands in `FAQPage` JSON-LD). Three new FAQs total, all targeting unanswered intents.
4. **`robots.ts`.** Disallowed `/sign-up` (the 147-fetch dead end). Added the crawlers that were missing — most importantly **`OAI-SearchBot`**, which builds the ChatGPT search index that produces citations and is a *different* agent from the `GPTBot` we already allowed; plus `Perplexity-User`, `Claude-User`, `Claude-SearchBot`, `Google-CloudVertexBot`, `Applebot`, `meta-externalagent`, `Amazonbot`, `MistralAI-User`, `YouBot`, `cohere-ai`.

### 6.9 Next, in priority order

**On-site (do next):**
1. Apply the §6.2 "named winner" treatment to `/best-animated-react-component-libraries`, `/compare/*`, `/react-component-library`, `/tailwind-component-library`, and `/react-block-library`. Same defect, same fix.
2. **Build `/accessible-react-components`.** Accessibility is the one tracked topic with no page, it is a genuine Radix-backed strength, and it is the topic where Adobe most directly outranks us. `digitala11y.com` and `javapro.io` are the roundups to target alongside it.
3. Build `/react-dx-rapid-prototyping` and `/design-system-integration` — the other two tracked topics with no landing page.
4. Add a "Not Adobe Spectrum" line to the homepage and `/docs`, the two highest-citation pages we own.

**Off-site (≈90% of the remaining gap — content, not code):**
5. PR ourselves into `awesome-ui-component-library` and submit to `component.gallery/design-systems`. Free, today.
6. **GitHub README comparison table** — github.com is Perplexity's #1 source at 33 citations and we are already faintly present there.
7. **dev.to** — 30 Perplexity citations. Repurpose `/best-react-component-libraries` and the compare pages as posts.
8. **Reddit + YouTube** — the only route into Google AI Overviews (31 citations each), where we currently score 0%.
9. Outreach to the §6.6 roundups, in citation order.

**Measurement:** re-export Profound in 30 days. Targets — first non-branded mention on any engine; ChatGPT visibility 2.27% → 8%; first `ui.spectrumhq.in` citation on Perplexity or Google AI Overviews; rank out of the bottom decile.

---

## 7. The Adobe name collision — what the data actually shows

All 8 branded runs in the Profound export, grouped by how the prompt phrases our name:

| Prompt phrasing | Runs | Result |
|---|:--:|---|
| "best **Spectrum UI alternative compared to Material UI, Ant Design, Chakra**" | 2 | ✅ **We win both** — ChatGPT #1, Perplexity #4 |
| "best **Spectrum UI** vs competitors for **complex web apps**" | 2 | ❌ Adobe. Named React Spectrum, Sencha, IBM, Salesforce |
| "best **Spectrum-style** component library for **mobile-first interfaces**" | 2 | ❌ Adobe. Named Adobe, Google, Microsoft, Atlassian, IBM |
| "best — **Adobe Spectrum** or other UI component libraries" | 2 | ❌ Adobe — the prompt names Adobe outright |

**The engines are not ignoring us — they are disambiguating by co-occurrence, and losing.** When "Spectrum UI" appears beside React-component-library context (MUI, Ant Design, Chakra), both engines resolve it to us correctly and put us at #1. When it appears beside design-system/enterprise context ("complex web apps", "mobile-first", "design system", "accessibility", "tokens"), both engines resolve it to Adobe — *even on the two prompts that said "Spectrum UI" verbatim.*

So this is an **entity-resolution problem, not a ranking problem**, and it is winnable: we already win the phrasing where the context is unambiguous. The job is to make "Spectrum UI" resolve to us on the *other* phrasings by binding the name tightly to `React + Next.js + Tailwind CSS + copy-paste + shadcn` everywhere, and by publishing an explicit "these are two different projects" statement that engines can retrieve and quote.

**Worth knowing about the measurement:** 2 of the 8 branded runs are the prompt *"What's the best — Adobe Spectrum or other UI component libraries?"*, which names a different company's product. We cannot win it, and it counts against our branded visibility. That is a note about what the number means, not something to fix by editing the prompt set — changing tracked prompts moves the metric without changing what the engines say.

### 7.1 Shipped for the collision

1. **`/compare/spectrum-ui-vs-adobe-spectrum`** — a dedicated namesake-disambiguation page (`lib/comparisons.ts`), so the query has a canonical answer to retrieve. 12 comparison rows and **6 FAQs** answering the literal questions people and models ask: *Is Spectrum UI made by Adobe? Is it the same as React Spectrum or React Aria? Which should I use for React and Tailwind?* It is honest — it sends enterprise-accessibility and Adobe-ecosystem readers to React Aria and Adobe Spectrum, because a page that pretends to win every case gets trusted for none. Auto-wired into `/compare`, the sitemap, and `llms.txt`.
2. **Entity disambiguation in site-wide JSON-LD** (`lib/site-structured-data.ts`, present on every page). schema.org has no "is not" relation, so this uses `disambiguatingDescription` — whose defined purpose is separating an item from similar-looking ones — on both the `Organization` and `SoftwareApplication` nodes, plus `alternateName` so `SpectrumUI` / `spectrum-ui` resolve to the same `@id`, `applicationSubCategory: 'React UI component library'`, and category keywords that bind the name to the right neighbourhood.
3. **License contradiction, second pass.** `lib/comparisons.ts` had 6 more MIT claims (including the shared `SPECTRUM_TAGLINE` used on every comparison page). Now Apache-2.0.

### 7.2 Bug found while verifying: our GEO structured data was invisible to AI crawlers

Fetching the pages as `GPTBot` showed the server HTML contained **exactly one** `application/ld+json` tag — the site-wide one. Every per-page `FAQPage`, `ItemList`, and `CollectionPage` block on the five GEO pages (`/compare`, `/compare/[slug]`, `/best-react-component-libraries`, `/best-animated-react-component-libraries`, `/awesome`) was emitted through `next/script`, which injects client-side after hydration. It appeared only inside the escaped RSC payload.

GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot do not execute JavaScript. **All of the FAQ and ItemList structured data built for GEO was unreachable to them.** The repo already had the right primitive — `components/seo/json-ld.tsx`, whose docstring reads *"Render JSON-LD in the server response without waiting for hydration"* — it just wasn't used on these pages. Swapped all 12 blocks across the 5 files. Verified by curling as `GPTBot`: every page now serves its `FAQPage` / `ItemList` / `BreadcrumbList` in the initial HTML.

### 7.3 Still to do for the collision

- **Off-site is what actually settles an entity.** Engines learn "Spectrum UI = the Tailwind React library" from third-party text, not from our own claims. The GitHub README, a dev.to post titled for the confusion, and answering it once in r/reactjs are worth more here than any further on-site work.
- **npm presence.** Adobe owns `@adobe/react-spectrum` and `react-aria` on npm; we publish no runtime package, so there is no npm entity anchoring our name. A thin registry/CLI package under a `spectrum-ui` or `@spectrumui/*` name would give engines a second authoritative anchor.
- **Never ship the bare word "Spectrum" alone** in a title, heading, or meta description. The data shows the bare string resolves to Adobe. Always "Spectrum UI" and, where it fits naturally, with React/Tailwind adjacent.
- Add the disambiguation line to the homepage and `/docs` — our two highest-citation pages.

---

## 8. Wiring Profound in directly (no more manual exports)

Profound ships an official MCP server, so the monthly JSON-export round trip is unnecessary.

**Config — committed at `.mcp.json` in the repo root:**

```json
{
  "mcpServers": {
    "profound": { "type": "http", "url": "https://mcp.tryprofound.com/mcp" }
  }
}
```

No credentials in the file, deliberately. The server uses OAuth 2.1 with dynamic client registration (`registration_endpoint` at `auth.tryprofound.com`), so each person authenticates as themselves and sees only their own Profound data. Safe to commit, and it means every Conductor workspace and every teammate gets it without copying secrets around.

**One-time authorisation — must be done in an interactive session:**

```
/mcp        →  select "profound"  →  Authenticate  →  browser sign-in
```

OAuth needs a browser round trip, so it cannot be completed from a non-interactive/headless session. `offline_access` is in the supported scopes, so refresh tokens keep the connection alive afterwards — this is a one-time step, not a per-session one.

Equivalent CLI form, if preferred over the committed file:

```bash
claude mcp add --transport http profound https://mcp.tryprofound.com/mcp
```

**The Bearer-token alternative is gated.** Profound's docs state API-key/Bearer auth requires an **enterprise plan** (contact `support@tryprofound.com`). That path matters only for headless automation — a nightly cron, or CI. There are also official SDKs for that route: `profound` on PyPI and `profoundai` on npm. For interactive work, OAuth is the better option and needs no plan upgrade.

### 8.1 What to pull once it's connected

Profound MCP exposes visibility reports, citation reports, sentiment, raw prompt-level data, agent analytics (bot traffic), and accuracy/fact-checking. Mapped to the gaps in §6 and §7:

| Pull | Answers |
|---|---|
| Visibility report, by platform | Did ChatGPT move off 2.27%? Did we enter Google AI Overviews at all? |
| Raw prompt data, `mentioned?` per run | **The §6.2 metric that matters: any mention on a non-branded prompt.** |
| Citation report, our domain | Did `/compare/spectrum-ui-vs-adobe-spectrum` get retrieved? Did we get cited on Perplexity or Google AI Overviews for the first time? |
| Citation report, by domain | Are we appearing in the §6.6 roundups yet? |
| Branded prompts only | Is the Adobe collision closing — do the "complex web apps" and "mobile-first" phrasings resolve to us yet? |
| **Accuracy / fact-checking** | Directly relevant: this is where a contradiction like the MIT/Apache-2.0 one surfaces as a wrong claim engines repeat about us. |
| Agent analytics | Is `OAI-SearchBot` actually crawling now that robots names it? Did `/sign-up` traffic drop after the disallow? |

### 8.2 The loop

1. **Pull** the six queries above (monthly is the right cadence — engine indexes move slowly, and a shorter window is mostly noise).
2. **Diff** against §6/§7 and the milestones below.
3. **Diagnose** by category, not by page: retrieved-but-not-mentioned → an extraction defect (§6.2). Not-retrieved-at-all → a coverage or off-site defect. The two need opposite fixes and it is worth naming which one a page has before editing it.
4. **Fix**, then re-verify structured data as a crawler — `curl -H 'User-Agent: GPTBot' <url>` and confirm the JSON-LD is in the raw HTML (§7.2 is exactly the bug that hides from a browser check).
5. **Append** the new baseline as a dated section here, so trend is legible rather than re-derived each time.

One caveat worth keeping in view: **do not tune the tracked prompt set to move the number.** Visibility is measured over the prompts the project tracks, so adding or dropping prompts changes the metric without changing anything an engine says. Add a prompt when a real question is untracked; treat that as changing coverage, not performance.

### 8.3 Milestones for the next pull

- First mention on **any non-branded prompt** — the single most important signal; we are at 0 of 107.
- ChatGPT visibility 2.27% → 8%.
- First `ui.spectrumhq.in` citation on **Perplexity or Google AI Overviews** (currently 0 on both).
- `/compare/spectrum-ui-vs-adobe-spectrum` retrieved on a branded prompt.
- The "complex web apps" or "mobile-first" branded phrasing resolving to us instead of Adobe.
- Rank out of the bottom decile on ChatGPT and Perplexity.

---

## 9. Profound topic export — 2026-08-29 (brand/topic visibility rankings)

> **Source:** `spectrum_ui_ui_component_library_brand_topic_visibility_rankings_2026-08-29_19-52.json`
> **Window:** 2026-08-24 → 2026-08-28, no persona, visibility analysis.
> **Shape:** 9 topics × (1 rollup + ~5 prompts), 44 prompt groups, top-10 brands each. 96 distinct brand strings.

### 9.1 The result in one line

**Spectrum UI appears in exactly one of nine topics — the branded one.**

| Topic | Our best rank | #1 brand | Do we have a page? |
|---|---|---|---|
| Spectrum UI vs Competitors | **#4 (32.12%)** | Adobe 80% | ✅ `/compare/*` |
| Accessible UI Design | — | Adobe 67.22% | ❌ → now `/accessible-react-components` |
| Copy-and-paste UI Blocks | — | shadcn 59.89% | ⚠️ hub only → now `/copy-paste-react-components` |
| Dashboard & Admin Interfaces | — | Ant Design 84.71% | ⚠️ hub, no verdict |
| Design System Integration | — | MUI 54% | ❌ → now `/design-system-integration` |
| Developer DX & Rapid Prototyping | — | MUI 65.34% | ❌ → now `/rapid-prototyping-ui-library` |
| Open-source UI Resources | — | Radix 53.78% | ❌ → now `/open-source-ui-components` |
| Production-ready React Components | — | MUI 84.83% | ⚠️ hub, no verdict |
| Tailwind CSS–based Styling | — | Flowbite 82.84% | ⚠️ hub, no verdict |

Across the **40 non-branded prompts** we are outside the top 10 everywhere. Across the **4 branded prompts** we place 4th, 5th, and 6th on three of them, and are absent from the fourth ("Adobe Spectrum or other UI component libraries" — a prompt that names another company's product, which we cannot win).

Read against §6, this is the same finding a month later, now measured at topic granularity: **branded resolution is improving, non-branded presence is still zero.** The §6.2 diagnosis holds — the bottleneck is extraction, not retrieval.

### 9.2 What the export adds that §6 did not have

**1. The competitor set we were writing against was the wrong one.** Our comparison pages targeted Aceternity UI, Magic UI, and shadcn/ui — the animated-library niche. Counting brand appearances across all 530 rows, the names AI engines actually return are:

`MUI 40 · Ant Design 35 · shadcn 33 · Radix 28 · Mantine 27 · Chakra UI 26 · Tailwind 22 · Adobe 18 · daisyUI 19 · Flowbite 8 · Aceternity 6`

Aceternity and Magic UI barely register outside the "copy-and-paste blocks" topic. We had zero pages against MUI, Ant Design, Mantine, Chakra UI, or Flowbite — the five brands that actually beat us — and four pages against brands that mostly do not appear.

**2. Two topics are not component-library questions at all.** "Design System Integration" is won by Figma (46.89%), Storybook (43.44%), Zeroheight, Supernova, Tokens Studio, and Chromatic. "Open-source UI Resources" surfaces GitHub and Storybook alongside libraries. A page that answers these as *"which component library is best"* answers a question nobody asked. Both new guides are structured as **picks per joint / per layer** instead.

**3. Engine name fragmentation is real, and ours is clean.** `shadcn`, `Shadcn`, `shadcn/ui`, `Shadcn UI`, `shadcn.io`, and `Shadcnblocks` are six separate rows splitting one brand's score. We only ever emit "Spectrum UI", which is the right discipline to keep — and a reason not to introduce "Spectrum" alone anywhere (§7.3).

**4. Structural gap on blocks.** The winners in the copy-and-paste topic (HyperUI, UIverse, 21st.dev, shadcnblocks) all publish **one indexable URL per block**. Our blocks live as anchors on a category page (`/blocks/[category]#slug`), so the catalogue compresses into a handful of URLs. That is a coverage disadvantage that no amount of copy on the category page fixes.

### 9.3 Shipped in this pass (code)

1. **Five new topic guides**, one per uncovered tracked topic, wired through `TOPIC_HUB_LINKS` so sitemap, docs sidebar, guides index, mobile nav, and the ⌘K search index all pick them up automatically:
   `/copy-paste-react-components`, `/open-source-ui-components`, `/accessible-react-components`, `/design-system-integration`, `/rapid-prototyping-ui-library`.
2. **`verdicts` on the topic-hub model** (`content/topic-hubs.ts`) — an optional list of `need → pick → why` rows where `need` is phrased as the question people actually ask and `why` is a complete sentence starting with the winner's name, so it survives being quoted alone. Rendered by `TopicHubPage` as a visible question/answer list and emitted as `FAQPage` entities by `createTopicHubStructuredData`, so page copy and markup cannot diverge. Populated on all five new guides plus `/react-component-library`, `/react-block-library`, `/tailwind-component-library`, and `/dashboard-components` — nine guides that previously described a category without stating who wins any part of it.
3. **Five new comparison pages** against the brands that measurably beat us: `/compare/spectrum-ui-vs-mui`, `-vs-ant-design`, `-vs-mantine`, `-vs-chakra-ui`, `-vs-flowbite`. Auto-wired into `/compare`, the sitemap, and `llms.txt`.
4. **`llms.txt` gained a "Which library to pick, by need" section** — eleven named-winner lines, five of which name a competitor. This is the file assistants read most directly and it previously contained no verdict of any kind.
5. **Tests updated** — `tests/topic-hubs.test.js` and `tests/structured-data.test.js` now cover 17 hubs and assert that verdicts appear in the FAQ structured data.

Honesty is load-bearing here, not decoration. Of the 41 verdict rows shipped, **24 name a competitor as the winner** — React Aria for accessibility compliance, Ant Design and MUI for data grids, Mantine for breadth, Flowbite and daisyUI outside React, Figma and Storybook for design-system tooling, shadcn/ui and Radix UI as the foundation layer. A page that claims every intent is extracted for none.

### 9.4 What this pass does *not* fix

- **Off-site is still ~90% of the gap.** Nothing here changes what `adminlte.io`, `designrevision.com`, `builder.io`, or `untitledui.com` say, and those URLs decide these answers (§6.6). The §6.9 off-site list is unchanged and still the higher-value queue.
- **No per-block URLs.** §9.2 item 4 is a routing change to `/blocks`, not content, and was out of scope for this pass.
- **Adobe still wins "Accessible UI Design" at 67%.** `/accessible-react-components` puts a real answer on the board and states the disambiguation in a topic where the collision is most expensive, but the entity is settled off-site, not by us asserting it (§7.3).

### 9.5 What to check on the next export

- Any non-branded topic where Spectrum UI enters the top 10 at all — that is the signal, not the score.
- Whether `/accessible-react-components` or `/copy-paste-react-components` gets retrieved, and whether the answer then names us or mines us for competitors again (the §6.2 test).
- Whether the new `/compare/spectrum-ui-vs-{mui,ant-design,mantine,chakra-ui,flowbite}` pages appear as citations on the topics those brands win.
- Branded topic: do the "complex web apps" and "mobile-first" phrasings still resolve to Adobe?
