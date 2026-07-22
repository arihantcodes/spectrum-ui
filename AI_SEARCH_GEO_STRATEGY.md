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
