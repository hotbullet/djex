# studioworth — Claude Session Guide

## What This Is

Free standalone website: scan your plugin folder, see what your studio is worth at MSRP list price.
Share the card. No judgment. Mac and PC. No signup. Nothing uploaded.

Separate product from djex — same brand, same dark theme, different repo, different URL.
Viral marketing tool for djex. Free forever.

## Core Principles (Non-Negotiable)

- **MSRP always** — list price, never sale/discount/bundle price. Makes the number bigger. More pride.
- **No judgment** — cracked, legit, trial, pirated — all count if installed. We are not a license auditor.
- **100% local** — File System Access API scans in browser. Nothing leaves the machine. Ever.
- **Free forever** — viral marketing tool. studioworth funnels to getdjex.com.
- **Pride first** — every number, every insight, every label should make the user feel proud of what they built.

## File Structure

```
studioworth/
├── index.html              # Shell — hero, scanning state, report card
├── style.css               # Full CSS — dark theme matching djex brand
├── prices.js               # Plugin price database (133+ plugins) + normalizeName() + lookupPlugin()
├── scanner.js              # File System Access API folder scanner
├── report.js               # UI logic, renderReport(), count-up animation
├── djex-studio-report.html # One-time generated report for the owner's real machine (not user-facing)
├── CLAUDE.md               # This file
└── README.md               # Public-facing project readme
```

## How to Run Locally

Just open `index.html` in Chrome or Edge. No build step. No server needed.

```
Chrome → File → Open File → index.html
```

Or serve with any static server:
```
npx serve .
```

## Key Technical Notes

- **File System Access API** — `window.showDirectoryPicker()` — Chrome/Edge only (Safari/Firefox not supported)
- **Plugin file extensions**: `.vst3`, `.dll` (Win VST2), `.vst` (Mac VST2), `.component` (Mac AU), `.aax` (Pro Tools)
- **`normalizeName()`** — strips extension, lowercases, replaces dashes/underscores with spaces
- **`lookupPlugin()`** — exact match first, then partial match against keys in PRICES
- **⚠️ Known bug**: keys with dashes (e.g. `"tsar-1"`) won't partial-match normalized filenames with spaces (`"tsar 1 reverb"`). Fix: normalize keys in lookupPlugin too.
- **Deduplication** — `seen` Set prevents counting same plugin twice (e.g. VST2 + VST3 of same plugin)
- **Max depth 4** — scanner recurses up to 4 folders deep

## Default Plugin Paths

| Platform | VST3 | VST2 | AU |
|----------|------|------|-----|
| Windows | `C:\Program Files\Common Files\VST3` | `C:\Program Files\VstPlugins` | — |
| Mac | `/Library/Audio/Plug-Ins/VST3` | `/Library/Audio/Plug-Ins/VST` | `/Library/Audio/Plug-Ins/Components` |

## Price Database (`prices.js`)

- **133+ plugins** currently in database (as of 2026-05-22)
- **Source**: Plugin Boutique MSRP prices — verified manually per plugin
- Key = normalized name (lowercase, spaces, no extension)
- Value = `{ name, price, brand, category }`
- Price = MSRP USD list price (0 for free/bundled plugins — still counted)
- `category` field drives the category breakdown on the report card

### Categories Used
`Synth`, `Sampler`, `Drums`, `EQ`, `Compressor`, `Limiter`, `Reverb`, `Delay`,
`Saturation`, `Distortion`, `Modulation`, `Effect`, `Amp Sim`, `Channel Strip`,
`Mastering`, `Vocal`, `Transient`, `Filter`, `Gate`, `Chorus`, `Instrument`,
`DJ Software`, `DAW`, `Bundle`

### How to Add a Plugin
```js
"plugin name": { name: "Display Name", price: 199, brand: "Brand", category: "Synth" },
```
Key must be the result of `normalizeName(filename)` — lowercase, spaces, no extension.

## Report Card Design

### Current: djex-studio-report.html (one-time generated)
- **Width**: 390px (phone frame — screenshot on computer, shares like a phone photo)
- **Background**: #05080d dark, centered on page
- **Layout**: Portrait card with all sections stacked

### Card Sections (top to bottom)
1. **Header** — djex mark logo + "Studio Report" + date
2. **Hero value** — `$` + animated count-up number (MSRP total)
3. **Value note** — "verified MSRP · Plugin Boutique · N plugins priced · no judgment"
4. **Stats row** — Plugins (cyan) / Projects (green) / DAWs (pink)
5. **By Category** — 2-column grid, plugin count per category
6. **🧠 Personality Insights** — 5–6 bullets, human observations about the collection
7. **Projects by DAW** — 2-column grid, project count per DAW (.als / .flp / .bwproject / .cpr)
8. **Footer** — "Still Creating ❤" tagline + getdjex.com

### Personality Insights Engine
Insights are data-driven observations about the plugin collection.
Each one highlights something surprising, impressive, or characterful.

**Insight rules (examples):**
| Condition | Insight |
|-----------|---------|
| compressors > reverbs | "More compressors than reverbs — tone sculptor, not ambience chaser" |
| 3+ saturation suites | "X different tape/saturation suites — warmth is non-negotiable" |
| 4+ amp sims | "X Marshall amp sims alone — guitar-flavoured production energy" |
| has both Serum and Serum2 | "Serum AND Serum2 — always keeping it current" |
| full plugin brand suite | "Full [Brand] suite — deep commitment, not casual" |
| mastering-grade tools present | "[Plugin] + [Plugin] — mastering-grade tools in the arsenal" |

**Tone rules:**
- Pride first. Never shame.
- Second person: "you're a tone sculptor"
- Never count for counting's sake — the insight must mean something

## Real Numbers (Owner's Machine — May 2026)

Scanned on `C:\Users\HP` machine:

| Source | Count | Value |
|--------|-------|-------|
| VST3 plugins matched | 85 | $12,085 |
| Plugin Alliance suite | 48 | $4,905 |
| Unmatched VST3 | 3 | ~$400 |
| Arturia (estimated) | — | ~$599 |
| **Total verified** | **~136** | **$17,989** |

Full install: ~312 plugins (119 VST3 + 142 VST2 + NI + PA)
Projects: 60 (56 Ableton + 4 Cubase)
DAWs: 4 (Ableton, FL Studio, Cubase 14+15, Bitwig)
DJ apps: 5 (Serato, VirtualDJ, Engine DJ, Mixxx, rekordbox)

## Roadmap

### Phase 1 — MVP (current state)
- [x] Hero page with scan CTA
- [x] File System Access API folder scanner
- [x] Price database (133+ plugins, Plugin Boutique verified)
- [x] Report card — total worth, top 5, stats
- [x] Count-up animation
- [x] Unknown plugins list
- [x] Phone-width portrait card (390px)
- [x] Category breakdown (8 categories shown)
- [x] Personality insights (6 data-driven observations)
- [x] djex-studio-report.html — one-time real report for owner

### Phase 2 — Richer Report
- [ ] Personality insights engine in JS (auto-generated from scan data, not hardcoded)
- [ ] DAW project count — scan for .als / .flp / .bwproject / .cpr files (second folder pick)
- [ ] Category breakdown auto-calculated from scan (not hardcoded)
- [ ] OS detection — show correct default path for Windows vs Mac
- [ ] Share button — screenshot card to clipboard (html2canvas)
- [ ] Fix lookupPlugin key normalization bug (dashes vs spaces)

### Phase 3 — Price Database Growth
- [ ] Expand to 500+ plugins manually
- [ ] Semi-annual manual update pass (don't need automation yet)
- [ ] Stock plugin detection — mark bundled-with-DAW plugins separately

### Phase 4 — Virality
- [ ] Shareable link: studioworth.app/share/[id]
- [ ] "Add missing plugin" — user can manually add plugins not in database
- [ ] DJ gear section → hardware (CDJ, interface, monitors) → link to djex

## What We Are NOT Building (Scope Guard)

- ❌ Supabase / REST API / cloud database — contradicts local-first principle
- ❌ GitHub Actions price scraper — premature infrastructure
- ❌ Analytics / "most used plugin globally" — contradicts local-first principle
- ❌ License checking or piracy detection — contradicts no-judgment principle
- ❌ User accounts — no reason for them

## Brand

- Same dark theme as djex
- Colors: cyan #26d9ff, green #72f2a1, pink #ff5cb0, orange #ffbd5c
- Mark logo: 3-bar gradient (pink→cyan→green) — same as djex
- Tone: pride first — "look what you've built"
- URL: studioworth.app (future) / getdjex.com (current funnel)
