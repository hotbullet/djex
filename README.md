# studioworth

**What's my studio worth?**

Not what you paid. Not what you remember paying. The real number — every plugin, at full list price, added up.

Most producers have no idea. They bought things on sale, in bundles, over years. It blurs. studioworth unblurs it.

→ **[try it at getdjex.com/studioworth](https://www.getdjex.com)**

---

## What happens when you use it

You pick your plugin folder. studioworth reads the filenames — nothing else. No audio. No projects. No personal data. Just filenames.

It matches them against a database of 133+ plugins at MSRP list price from Plugin Boutique. It adds them up. It shows you the number.

Then it tells you something about yourself.

> *"23 compressors, 18 reverbs — tone sculptor, not an ambience chaser."*
> *"3 different saturation suites — warmth is non-negotiable."*
> *"Shadow Hills + Weiss — mastering-grade tools in the arsenal."*

These aren't AI. No API call, no model, no server. Just a rules engine that counts your categories and draws conclusions. The same way a producer would, looking at someone else's rack.

---

## The number is always list price

Not what you paid. Not the bundle price. Not the Black Friday deal.

List price. Always.

A producer who bought everything on sale for 70% off still deserves to see the full value of what they own. The number should make you feel proud — not guilty, not accurate, not audited.

This is not accounting software.

---

## Nothing leaves your computer

The scan happens in your browser using the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API). Your plugin names never leave your machine. There's no server receiving anything.

You can read every line of this code and verify that yourself. That's why it's open source.

---

## No judgment

Cracked plugins count. Trial versions count. Pirated stuff counts. If it's in the folder, it counts.

studioworth is not a license auditor. It has no opinion on how you got your plugins. It just counts what you built.

---

## The card

At the end of the scan you get a portrait card — 390px wide, designed to look like a phone screenshot on a desktop. Download it. Post it. That's the whole point.

---

## How it works technically

```
showDirectoryPicker()          — browser asks user to pick a folder
  → reads filenames recursively (max depth 4)
  → normalizeName(filename)    — strips extension, lowercase, spaces
  → lookupPlugin(name)         — exact match, then partial match in prices.js
  → sum prices                 — MSRP total
  → generateInsights(matched)  — 10 rules engine, returns top 6 observations
  → render card
```

No build step. No framework. No dependencies except html2canvas for the download button.

Open `index.html` in Chrome or Edge and it works.

---

## Where do the prices come from?

Every price in studioworth is the **MSRP list price** verified manually on [Plugin Boutique](https://www.pluginboutique.com) — the largest plugin retailer. Not sale price. Not bundle price. Not what you paid. The full list price, as published by the developer.

We chose Plugin Boutique because it lists almost every major plugin with a consistent public price. If a plugin is free or bundled with a DAW, its price is $0 — it still counts toward your total plugin count.

The database currently covers 133+ plugins and is updated manually. If your plugin isn't in the database yet, it shows up in the "Unrecognised" list at the bottom of your report.

---

## Adding plugins to the database

`prices.js` is the entire database. One object. Add a line:

```js
"plugin name": { name: "Display Name", price: 199, brand: "Brand", category: "Synth" },
```

The key must be the normalised filename — lowercase, spaces instead of dashes, no extension.

Source: [Plugin Boutique](https://www.pluginboutique.com) MSRP. Never sale price.

---

## Built by djex

studioworth is a free standalone product by **[djex](https://www.getdjex.com)** — a tool for DJs and producers to see their entire creative life.

If you DJ as well as produce, djex packs your crates, exports to USB, and gets you CDJ-ready. Free to try. www.getdjex.com.

---

## Does it need internet?

**studioworth: never.** The whole thing runs in your browser, reads your local files, and never makes a network request. No server. No account. No upload. You can use it with your wifi off.

**djex desktop (the DJ app):** the free version needs no internet at all. If you buy a license key to unlock unlimited exports, the app connects to the internet **once** — when you type your key in for the first time. That's it. After activation it reads a local file and never phones home again. Works at a gig in a basement with no signal. Always.

---

**Support your local djex.**

---

## License

MIT © 2026 djex

The studioworth web tool is open source. The djex desktop app is commercial software and is not included here.
