// studioworth — Report rendering and UI logic

const heroSection     = document.getElementById("heroSection");
const scanningSection = document.getElementById("scanningSection");
const reportSection   = document.getElementById("reportSection");
const scanBtn         = document.getElementById("scanBtn");
const scanAgainBtn    = document.getElementById("scanAgainBtn");
const screenshotBtn   = document.getElementById("screenshotBtn");

// ── Scan button ─────────────────────────────────────────────────────
scanBtn.addEventListener("click", async () => {
  if (!("showDirectoryPicker" in window)) {
    alert("Please use Chrome or Edge to scan your plugin folder.\n\nSafari and Firefox don't support folder scanning yet.");
    return;
  }
  try {
    show("scanning");
    document.getElementById("scanLabel").textContent = "Checking plugins…";
    document.getElementById("scanCount").textContent = "0 found";

    const results = await scanPluginFolder();
    if (!results) { show("hero"); return; }

    renderReport(results);
    show("report");
  } catch (err) {
    show("hero");
    if (err.name === "SecurityError" || (err.message && err.message.toLowerCase().includes("system"))) {
      alert(
        "Chrome can't open that folder — it's a protected system folder.\n\n" +
        "Try this instead:\n" +
        "• Click 'Check my plugins' again\n" +
        "• In the folder picker, navigate INTO the VST3 folder\n" +
        "• Select the VST3 folder itself (don't select Program Files)\n\n" +
        "Windows path: C:\\Program Files\\Common Files\\VST3\n" +
        "Mac path: /Library/Audio/Plug-Ins/VST3"
      );
    } else {
      alert(`Something went wrong: ${err.message}`);
    }
  }
});

scanAgainBtn.addEventListener("click", () => show("hero"));

// ── Download card as PNG (html2canvas) ──────────────────────────────
screenshotBtn.addEventListener("click", async () => {
  if (typeof html2canvas === "undefined") {
    // Fallback if CDN failed to load
    document.getElementById("reportCard").scrollIntoView({ behavior: "smooth", block: "center" });
    screenshotBtn.textContent = "📱 Screenshot it now!";
    setTimeout(() => { screenshotBtn.textContent = "💾 Download Card"; }, 3000);
    return;
  }

  screenshotBtn.disabled = true;
  screenshotBtn.textContent = "⏳ Generating…";

  try {
    await new Promise(r => setTimeout(r, 60)); // let DOM settle

    const cardEl = document.getElementById("reportCard");
    const canvas = await html2canvas(cardEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#05080d",
      logging: false,
      width:  cardEl.offsetWidth,
      height: cardEl.offsetHeight,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const link = document.createElement("a");
    link.download = "studioworth-report.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    screenshotBtn.disabled = false;
    screenshotBtn.textContent = "✅ Saved! Check your Downloads";
    setTimeout(() => { screenshotBtn.textContent = "💾 Download Card"; }, 3000);
  } catch (err) {
    screenshotBtn.disabled = false;
    screenshotBtn.textContent = "💾 Download Card";
    alert("Could not generate image: " + err.message);
  }
});

// ── Render report ───────────────────────────────────────────────────
function renderReport(results) {
  const totalWorth = results.matched.reduce((sum, p) => sum + (p.price || 0), 0);
  const top5 = [...results.matched]
    .filter(p => p.price > 0)
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const now = new Date();
  document.getElementById("cardDate").textContent =
    now.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  animateCount(document.getElementById("worthAmount"), totalWorth);
  document.getElementById("worthSub").textContent = "total studio value at list price";

  document.getElementById("statPlugins").textContent = results.total.toLocaleString();
  document.getElementById("statMatched").textContent = results.matched.length.toLocaleString();
  document.getElementById("statUnknown").textContent = results.unknown.length.toLocaleString();

  // Top plugins list
  const topList = document.getElementById("topPlugins");
  topList.innerHTML = "";
  if (top5.length === 0) {
    topList.innerHTML = `<li style="color:rgba(255,255,255,0.3);font-size:12px;">No priced plugins found in this folder.</li>`;
  } else {
    for (const p of top5) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="plugin-name">${p.name}</span>
        <span class="plugin-price">$${p.price.toLocaleString()}</span>
      `;
      topList.appendChild(li);
    }
  }

  // Category breakdown
  renderCategoryBreakdown(results.matched);

  // Personality insights — pure rules engine, no AI
  renderInsights(results.matched);

  // Unknown plugins
  const unknownSection = document.getElementById("unknownSection");
  const unknownList    = document.getElementById("unknownList");
  const unknownCount   = document.getElementById("unknownCount");
  unknownList.innerHTML = "";

  if (results.unknown.length > 0) {
    unknownSection.classList.remove("hidden");
    unknownCount.textContent = results.unknown.length;
    const showUnknown = results.unknown.slice(0, 20);
    for (const name of showUnknown) {
      const li = document.createElement("li");
      li.textContent = name;
      unknownList.appendChild(li);
    }
    if (results.unknown.length > 20) {
      const li = document.createElement("li");
      li.textContent = `…and ${results.unknown.length - 20} more`;
      li.style.color = "rgba(255,255,255,0.2)";
      unknownList.appendChild(li);
    }
  } else {
    unknownSection.classList.add("hidden");
  }
}

// ── Category breakdown ──────────────────────────────────────────────
function renderCategoryBreakdown(matched) {
  const catEl = document.getElementById("categoryBreakdown");
  if (!catEl) return;

  // Count by category
  const counts = {};
  for (const p of matched) {
    const cat = p.category || "Other";
    counts[cat] = (counts[cat] || 0) + 1;
  }

  // Sort by count descending, take top 8
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  catEl.innerHTML = "";
  for (const [cat, count] of sorted) {
    const div = document.createElement("div");
    div.className = "cat-item";
    div.innerHTML = `
      <span class="cat-name">${cat}</span>
      <span class="cat-count">${count}</span>
    `;
    catEl.appendChild(div);
  }
}

// ── Personality insights — pure rules engine ────────────────────────
// No AI. No server. Just counting categories and brands.
// Each rule checks the scan data and fires an insight string if conditions are met.
function generateInsights(matched) {
  const insights = [];

  // Build lookup structures
  const byCat   = {};   // category → count
  const byBrand = {};   // brand → count
  const pluginNames = new Set(matched.map(p => (p.name || "").toLowerCase()));

  for (const p of matched) {
    if (p.category) byCat[p.category]   = (byCat[p.category]   || 0) + 1;
    if (p.brand)    byBrand[p.brand]    = (byBrand[p.brand]    || 0) + 1;
  }

  const get = (cat) => byCat[cat] || 0;

  // ── Rule 1: Compressors vs Reverbs ───────────────────────────────
  const compressors = get("Compressor") + get("Limiter") + get("Dynamics");
  const reverbs     = get("Reverb");
  if (compressors > 0 || reverbs > 0) {
    if (compressors > reverbs && compressors >= 4) {
      insights.push(`<strong>${compressors} compressors, ${reverbs} reverbs</strong> — tone sculptor, not an ambience chaser`);
    } else if (reverbs > compressors && reverbs >= 4) {
      insights.push(`<strong>${reverbs} reverbs, ${compressors} compressors</strong> — you live in the space between sounds`);
    } else if (compressors >= 4 && reverbs >= 4) {
      insights.push(`<strong>${compressors} compressors and ${reverbs} reverbs</strong> — balanced engineer`);
    }
  }

  // ── Rule 2: Saturation/tape brand diversity ───────────────────────
  const satPlugins    = matched.filter(p => ["Saturation", "Distortion", "Effect"].includes(p.category));
  const satBrands     = new Set(satPlugins.map(p => p.brand).filter(Boolean));
  const satTotal      = get("Saturation") + get("Distortion");
  if (satBrands.size >= 3) {
    insights.push(`<strong>${satBrands.size} different saturation suites</strong> — warmth is non-negotiable`);
  } else if (satTotal >= 6) {
    insights.push(`<strong>${satTotal} saturation plugins</strong> — you know what harmonic distortion does to a mix`);
  }

  // ── Rule 3: Amp sims ─────────────────────────────────────────────
  const ampSims = get("Amp Sim");
  if (ampSims >= 4) {
    insights.push(`<strong>${ampSims} amp sims</strong> — guitar-flavoured production energy`);
  } else if (ampSims >= 2) {
    insights.push(`<strong>${ampSims} amp sims</strong> — you like the sound of something breathing`);
  }

  // ── Rule 4: Serum AND Serum2 ─────────────────────────────────────
  const hasSerum  = matched.some(p => p.name === "Xfer Serum");
  const hasSerum2 = matched.some(p => (p.name || "").toLowerCase().includes("serum2") || (p.name || "").toLowerCase().includes("serum 2"));
  if (hasSerum && hasSerum2) {
    insights.push(`<strong>Serum AND Serum2</strong> — always keeping it current`);
  }

  // ── Rule 5: Deep brand commitment (6+ from same brand) ───────────
  const deepBrands = Object.entries(byBrand)
    .filter(([brand, count]) => count >= 6 && brand !== "Native Instruments") // NI excluded — everyone has NI
    .sort((a, b) => b[1] - a[1]);
  if (deepBrands.length > 0) {
    const [brand, count] = deepBrands[0];
    insights.push(`<strong>${count} ${brand} plugins</strong> — deep commitment, not a casual choice`);
  }

  // ── Rule 6: Mastering-grade tools ────────────────────────────────
  const masteringPlugins = matched.filter(p => p.category === "Mastering" && p.price >= 149);
  if (masteringPlugins.length >= 2) {
    const topTwo = masteringPlugins.slice(0, 2).map(p => p.name).join(" + ");
    insights.push(`<strong>${topTwo}</strong> — mastering-grade tools in the arsenal`);
  } else if (masteringPlugins.length === 1) {
    insights.push(`<strong>${masteringPlugins[0].name}</strong> — you're not guessing at the final stage`);
  }

  // ── Rule 7: EQ collection ────────────────────────────────────────
  const eqs = get("EQ") + get("Channel Strip");
  if (eqs >= 10) {
    insights.push(`<strong>${eqs} EQs and channel strips</strong> — every frequency has its own doctor`);
  } else if (eqs >= 6) {
    insights.push(`<strong>${eqs} EQs</strong> — you don't reach for the same one twice`);
  }

  // ── Rule 8: Average plugin value (quality signal) ─────────────────
  const pricedPlugins = matched.filter(p => p.price > 0);
  if (pricedPlugins.length > 0) {
    const avg = pricedPlugins.reduce((s, p) => s + p.price, 0) / pricedPlugins.length;
    if (avg >= 130) {
      insights.push(`<strong>$${Math.round(avg)} average per plugin</strong> — premium taste, no compromises`);
    }
  }

  // ── Rule 9: Synth count ───────────────────────────────────────────
  const synths = get("Synth") + get("Instrument");
  if (synths >= 10) {
    insights.push(`<strong>${synths} synths and instruments</strong> — the sound design never stops`);
  }

  // ── Rule 10: Creative/modular FX ─────────────────────────────────
  const creative = matched.filter(p =>
    ["Unfiltered Audio", "Output"].includes(p.brand) && p.category === "Effect"
  );
  if (creative.length >= 4) {
    const brands = [...new Set(creative.map(p => p.brand))].join(" + ");
    insights.push(`<strong>${creative.length} creative FX from ${brands}</strong> — not afraid to break the sound`);
  }

  // Return top 6 — prioritize the most specific/impressive
  return insights.slice(0, 6);
}

function renderInsights(matched) {
  const el = document.getElementById("insightsContainer");
  if (!el) return;

  const insights = generateInsights(matched);
  el.innerHTML = "";

  if (insights.length === 0) {
    el.innerHTML = `<p style="font-size:12px;color:rgba(255,255,255,0.3);">Scan more plugins to unlock insights.</p>`;
    return;
  }

  for (const text of insights) {
    const div = document.createElement("div");
    div.className = "insight-item";
    div.innerHTML = `
      <div class="insight-dot"></div>
      <div class="insight-text">${text}</div>
    `;
    el.appendChild(div);
  }
}

// ── Count-up animation ──────────────────────────────────────────────
function animateCount(el, target) {
  const duration = 1200;
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ── Section switcher ────────────────────────────────────────────────
function show(section) {
  heroSection.classList.toggle("hidden", section !== "hero");
  scanningSection.classList.toggle("hidden", section !== "scanning");
  reportSection.classList.toggle("hidden", section !== "report");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
