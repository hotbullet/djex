// ── studioworth sample cards ──────────────────────────────────────────────────
// Shown on the landing page so visitors see what they could pull.
// Fake data, real animations. Same CSS as the generated flex card.

const SAMPLE_DATA = [
  {
    name:      "DJ NOVA",
    cardType:  "synth",
    typeName:  "SYNTH WIZARD",
    typeIcon:  "🎹",
    typeBadge: "🎹 SYNTHESIS TYPE",
    rarity:    { label:"EPIC", stars:"★ EPIC", color:"#b06bff", bg:"rgba(176,107,255,0.1)", border:"rgba(176,107,255,0.6)" },
    total:     42800,
    moves:     [
      { name:"Serum 2",          icon:"🎹", price:"$189" },
      { name:"Arturia V Collection", icon:"⚡", price:"$599" },
      { name:"Vital",            icon:"🌊", price:"$80"  },
      { name:"Omnisphere 2",     icon:"🔮", price:"$499" },
    ],
    habit:     "12 synths & samplers · sound design is the music",
    weakness:  "Deadlines",
    resistance:"Writer's Block",
    retreat:   "2 Coffees ☕",
    cardNum:   "47/151",
    mood:      "🌙 Late Night Mix",
    egg:       null,
    secret:    "The Eternal WIP",
    isFoil:    false,
  },
  {
    name:      "BEATLAB",
    cardType:  "drums",
    typeName:  "DRUM MACHINE",
    typeIcon:  "🥁",
    typeBadge: "🥁 RHYTHM TYPE",
    rarity:    { label:"RARE", stars:"◆◆◆", color:"#26d9ff", bg:"rgba(38,217,255,0.08)", border:"rgba(38,217,255,0.5)" },
    total:     19500,
    moves:     [
      { name:"Battery 4",        icon:"🥁", price:"$199" },
      { name:"Addictive Drums 2",icon:"⚡", price:"$179" },
      { name:"DrumBrute",        icon:"💥", price:"$349" },
      { name:"Slate Drums",      icon:"🔊", price:"$149" },
    ],
    habit:     "8 drum plugins · the groove comes first, always",
    weakness:  "Cable Mgmt",
    resistance:"Distraction",
    retreat:   "1 Track 🎵",
    cardNum:   "12/151",
    mood:      "🎯 Weekend Warrior",
    egg:       { badge:"⚡ The Squeeze God", color:"#b06bff" },
    secret:    "Bass First, Questions Later",
    isFoil:    false,
  },
  {
    name:      "MR. LOUD",
    cardType:  "mastering",
    typeName:  "MASTERING CHAIN",
    typeIcon:  "🏆",
    typeBadge: "🏆 MASTERING TYPE",
    rarity:    { label:"LEGENDARY", stars:"★★ LEGEND", color:"#ffbd5c", bg:"rgba(255,189,92,0.1)", border:"rgba(255,189,92,0.7)" },
    total:     71200,
    moves:     [
      { name:"Ozone 11 Advanced", icon:"🏆", price:"$499" },
      { name:"Weiss DS1-MK3",     icon:"⚡", price:"$449" },
      { name:"Pro-L 2",           icon:"🔊", price:"$179" },
      { name:"Neutron 4",         icon:"🎯", price:"$179" },
    ],
    habit:     "11 mastering plugins · the loudness war ends here",
    weakness:  "Sleep",
    resistance:"Noise Complaints",
    retreat:   "Free",
    cardNum:   "1/151",
    mood:      "💀 Procrastinating Again",
    egg:       { badge:"💎 1% Producer", color:"#ffbd5c" },
    secret:    "Loudness War Veteran",
    isFoil:    true,
  },
  {
    name:      "EQ QUEEN",
    cardType:  "eq",
    typeName:  "EQ SURGEON",
    typeIcon:  "🔬",
    typeBadge: "🔬 FREQUENCY TYPE",
    rarity:    { label:"UNCOMMON", stars:"◆◆", color:"#72f2a1", bg:"rgba(114,242,161,0.08)", border:"rgba(114,242,161,0.5)" },
    total:     11400,
    moves:     [
      { name:"Fab-Filter Pro-Q 4", icon:"🔬", price:"$179" },
      { name:"Kirchhoff EQ",       icon:"✂️", price:"$149" },
      { name:"Pultec EQP-1A",      icon:"🎯", price:"$99"  },
      { name:"Gullfoss",           icon:"🌊", price:"$199" },
    ],
    habit:     "9 EQ & filter plugins · you cut before you boost",
    weakness:  "Client Notes",
    resistance:"Bad Monitors",
    retreat:   "1 Coffee ☕",
    cardNum:   "88/151",
    mood:      "☕ Morning Producer",
    egg:       null,
    secret:    "Abusing the Undo Button",
    isFoil:    false,
  },
  {
    name:      "TAPE LORD",
    cardType:  "saturation",
    typeName:  "TAPE DESTROYER",
    typeIcon:  "🔥",
    typeBadge: "🔥 SATURATION TYPE",
    rarity:    { label:"EPIC", stars:"★ EPIC", color:"#b06bff", bg:"rgba(176,107,255,0.1)", border:"rgba(176,107,255,0.6)" },
    total:     38900,
    moves:     [
      { name:"Soundtoys Decapitator", icon:"🔥", price:"$149" },
      { name:"Kush Audio Omega",      icon:"⚡", price:"$149" },
      { name:"Tape Cassette 2",       icon:"💢", price:"$49"  },
      { name:"Saturn 2",              icon:"🎸", price:"$179" },
    ],
    habit:     "7 saturation & distortion plugins · clean is boring",
    weakness:  "Sample Packs",
    resistance:"Latency",
    retreat:   "1 Nap 💤",
    cardNum:   "66/151",
    mood:      "🦉 Night Owl Session",
    egg:       { badge:"✅ SoundCloud Certified", color:"#ff5cb0" },
    secret:    "Sidechain Everything",
    isFoil:    true,
  },
];

function buildArtHTML(cardType, C, B) {
  const arts = {
    synth: `
      <div class="sc-synth-stage">
        <div class="sc-knob-col">
          <div class="sc-knob sc-kc"><div class="sc-knob-dot"></div></div>
          <span class="sc-klabel">CUTOFF</span>
          <div class="sc-knob sc-knob-sm sc-kr"><div class="sc-knob-dot"></div></div>
          <span class="sc-klabel">RES</span>
        </div>
        <div class="sc-scope-col">
          <div class="sc-scope">
            <svg width="100" height="54" viewBox="0 0 100 54">
              <path class="sc-osc-path" d="M0,27 C9,27 13,7 20,7 S30,47 37,47 S48,7 55,7 S65,47 72,47 S83,7 90,7 S97,27 100,27"
                fill="none" stroke="${C}" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="sc-wave-btns">
            <div class="sc-wave-btn sc-active">∿</div>
            <div class="sc-wave-btn">⊓</div>
            <div class="sc-wave-btn">∧</div>
          </div>
        </div>
      </div>`,

    drums: `
      <div class="sc-seq-stage">
        ${[
          { l:"BD", on:[0,4,8,12] },
          { l:"SD", on:[4,12], g:[6,14] },
          { l:"HH", on:[0,2,4,6,8,10,12,14] },
          { l:"CL", on:[3,7,11,15] },
        ].map(r=>`
        <div class="sc-seq-row">
          <span class="sc-seq-lbl">${r.l}</span>
          ${Array(16).fill(0).map((_,i)=>`<div class="sc-pad${r.on?.includes(i)?' sc-on':r.g?.includes(i)?' sc-on sc-ghost':''}"></div>`).join('')}
        </div>`).join('')}
        <div class="sc-ph"></div>
      </div>`,

    mastering: `
      <div class="sc-master-stage">
        <div class="sc-spk-wrap">
          <div class="sc-spk-body"></div>
          <div class="sc-spk-cone"><div class="sc-spk-cap"></div></div>
          <div class="sc-sw1"></div><div class="sc-sw2"></div><div class="sc-sw3"></div>
        </div>
        <div class="sc-lufs-col">
          <span class="sc-lufs-label">LUFS</span>
          ${[["−6","#ff4444",78],["−9","#ffbd5c",62],["−12","#ffbd5c",48],["−14","#72f2a1",35],["−18","#72f2a1",22]].map(([lbl,col,w])=>`
          <div class="sc-lufs-row">
            <span class="sc-lufs-tag">${lbl}</span>
            <div class="sc-lufs-bar" style="width:${w}px;background:${col};--d:${(0.7+Math.random()*0.5).toFixed(1)}s"></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="sc-ceil-bar"></div>`,

    eq: `
      <div class="sc-eq-stage">
        <div class="sc-knob-row">
          ${["LO","MID","Q","HI"].map((lbl,i)=>`
          <div class="sc-knob-wrap">
            <div class="sc-knob sc-k${i%3}"><div class="sc-knob-dot"></div></div>
            <span class="sc-klabel">${lbl}</span>
          </div>`).join('')}
        </div>
        <svg width="100%" height="34" viewBox="0 0 260 34" preserveAspectRatio="none">
          <defs><linearGradient id="eqg2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="${C}" stop-opacity=".45"/>
            <stop offset="100%" stop-color="${C}" stop-opacity="0"/>
          </linearGradient></defs>
          <path class="sc-eq-path" fill="url(#eqg2)" stroke="${C}" stroke-width="1.5"
            d="M0,22 Q40,22 65,10 Q90,2 120,15 Q150,26 185,6 Q215,0 260,18 L260,34 L0,34 Z"/>
        </svg>
      </div>`,

    saturation: `
      <div class="sc-tape-stage">
        <div class="sc-reel"><div class="sc-reel-outer">
          ${[0,60,120,180,240,300].map(d=>`<div class="sc-spoke" style="transform:rotate(${d}deg) translateX(-50%)"></div>`).join('')}
          <div class="sc-reel-hub"></div>
        </div></div>
        <div class="sc-tape-line"></div>
        <div class="sc-reel sc-reel-r"><div class="sc-reel-outer sc-reel-rev">
          ${[0,60,120,180,240,300].map(d=>`<div class="sc-spoke" style="transform:rotate(${d}deg) translateX(-50%)"></div>`).join('')}
          <div class="sc-reel-hub"></div>
        </div></div>
      </div>`,

    reverb: `
      <div class="sc-reverb-stage">
        <div class="sc-rings">
          <div class="sc-ring"></div><div class="sc-ring"></div>
          <div class="sc-ring"></div><div class="sc-ring"></div>
          <svg class="sc-hp" width="52" height="40" viewBox="0 0 52 40" fill="none">
            <path d="M5 26 Q5 5 26 5 Q47 5 47 26" stroke="${C}" stroke-width="3" stroke-linecap="round"/>
            <rect x="0" y="22" width="10" height="16" rx="4" fill="${B}" stroke="${C}" stroke-width="1.5"/>
            <rect x="42" y="22" width="10" height="16" rx="4" fill="${B}" stroke="${C}" stroke-width="1.5"/>
          </svg>
        </div>
      </div>`,

    compressor: `
      <div class="sc-bars">
        ${[65,90,45,100,75,55,85,40,95,70,50,80,60,88,42].map((h,i)=>`
          <div class="sc-bar" style="height:${h}%;background:linear-gradient(180deg,${C},rgba(38,217,255,0.2));--d:${0.4+i*0.09}s;opacity:${0.45+h/220}"></div>`).join('')}
      </div>
      <div class="sc-vu-needle"><div class="sc-needle"></div></div>`,
  };
  return arts[cardType] || arts.compressor;
}

function renderSampleCard(d) {
  const C = d.rarity.color;
  const B = d.rarity.bg;
  const art = buildArtHTML(d.cardType, C, B);

  return `
  <div class="sc-scene">
    <div class="sc-wrap">
      <div class="sc-holo" style="
        background:conic-gradient(from var(--sc-a,0deg),${C},#ff5cb0,#ffbd5c,#72f2a1,#26d9ff,${C});
        animation:sc-spin 4s linear infinite;
        ${d.isFoil ? 'animation-duration:2s;' : ''}
      "></div>
      <div class="sc-card" style="
        background:linear-gradient(170deg,${B.replace(/[\d.]+\)$/,'0.25)')} 0%,#080f1a 40%,#060a12 100%);
        ${d.isFoil ? '--foil:1' : '--foil:0'}
      ">
        ${d.isFoil ? `<div class="sc-foil-overlay"></div><div class="sc-foil-badge">✨ FOIL</div>` : ''}

        <!-- header -->
        <div class="sc-header">
          <div>
            <div class="sc-subtype">${d.typeName}</div>
            <div class="sc-name">${d.name}</div>
          </div>
          <div class="sc-hp-block">
            <span class="sc-hp-num" style="color:${C}">$${Math.round(d.total/1000)}K</span>
            <span class="sc-hp-label">HP</span>
            <span class="sc-type-icon">${d.typeIcon}</span>
          </div>
        </div>

        <!-- art -->
        <div class="sc-art" style="
          background:linear-gradient(160deg,${B.replace(/[\d.]+\)$/,'0.2)')},rgba(0,0,0,0.55));
          border-color:${C.replace('rgb','rgba').replace(')',',0.2)')};
        ">
          ${art}
          <span class="sc-art-wm">studioworth</span>
        </div>

        <!-- flavor -->
        <div class="sc-flavor" style="background:${B};border-color:${C.replace('rgb','rgba').replace(')',',0.15)')}">
          "${d.secret}" · ${d.mood}
        </div>

        <!-- body -->
        <div class="sc-body">
          ${d.egg ? `<div class="sc-egg" style="background:${d.egg.color};color:#060a10">${d.egg.badge}</div>` : ''}
          <div class="sc-moves">
            ${d.moves.map(m=>`
            <div class="sc-move">
              <span class="sc-move-icon">${m.icon}</span>
              <span class="sc-move-name">${m.name}</span>
              <div class="sc-move-right">
                <span class="sc-move-type" style="color:${C}">DMG</span>
                <span class="sc-move-dmg" style="color:${C}">${m.price}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <!-- bottom -->
        <div class="sc-bottom">
          <div class="sc-stat"><span class="sc-stat-lbl">Weakness</span><span class="sc-stat-val" style="color:#ff5cb0">${d.weakness}</span></div>
          <div class="sc-stat-div"></div>
          <div class="sc-stat"><span class="sc-stat-lbl">Resistance</span><span class="sc-stat-val" style="color:#72f2a1">${d.resistance}</span></div>
          <div class="sc-stat-div"></div>
          <div class="sc-stat"><span class="sc-stat-lbl">Retreat</span><span class="sc-stat-val">${d.retreat}</span></div>
        </div>

        <!-- foot -->
        <div class="sc-foot">
          <span class="sc-num">${d.cardNum} · ${d.rarity.stars} ${d.rarity.label}</span>
          <span class="sc-site">getdjex.com</span>
        </div>
      </div>
    </div>
  </div>`;
}

// Inject cards + styles on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sampleScroll");
  if (!container) return;

  // Wire second scan button
  const btn2 = document.getElementById("scanBtn2");
  if (btn2) btn2.addEventListener("click", () => document.getElementById("scanBtn").click());

  container.innerHTML = SAMPLE_DATA.map(renderSampleCard).join("");

  // Inject card CSS
  const style = document.createElement("style");
  style.textContent = `
@property --sc-a{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes sc-spin{to{--sc-a:360deg}}
@keyframes sc-shimmer{0%{background-position:200% 0%}100%{background-position:-200% 0%}}
@keyframes sc-osc{from{stroke-dasharray:240;stroke-dashoffset:240}to{stroke-dashoffset:-240}}
@keyframes sc-knob{from{transform:translateX(-50%) rotate(-120deg)}to{transform:translateX(-50%) rotate(120deg)}}
@keyframes sc-ph{from{left:28px}to{left:calc(100% - 10px)}}
@keyframes sc-ring{0%{width:18px;height:18px;opacity:.9}100%{width:100px;height:100px;opacity:0}}
@keyframes sc-reel{to{transform:rotate(360deg)}}
@keyframes sc-lufs{from{filter:brightness(.7)}to{filter:brightness(1.3)}}
@keyframes sc-ceil{0%,100%{opacity:.2}50%{opacity:.9}}
@keyframes sc-needle{from{transform:rotate(-32deg)}to{transform:rotate(18deg)}}
@keyframes sc-sw{0%{width:8px;height:8px;opacity:.8;margin-top:-4px;border:1.5px solid currentColor;border-radius:50%}100%{width:38px;height:38px;opacity:0;margin-top:-19px;border:1px solid currentColor;border-radius:50%}}
@keyframes sc-eq-breathe{from{d:path("M0,22 Q40,22 65,10 Q90,2 120,15 Q150,26 185,6 Q215,0 260,18 L260,34 L0,34 Z")}to{d:path("M0,26 Q40,20 65,6 Q90,0 120,13 Q150,24 185,4 Q215,0 260,16 L260,34 L0,34 Z")}}
@keyframes sc-foil{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes sc-comp{0%,40%{transform:scaleY(1)}50%,70%{transform:scaleY(.18)}100%{transform:scaleY(1)}}

.sc-scene{flex-shrink:0;width:260px}
.sc-wrap{position:relative;width:260px}
.sc-holo{position:absolute;inset:-2px;border-radius:18px}
.sc-card{position:relative;width:260px;border-radius:16px;overflow:hidden;color:#fff;font-family:Inter,-apple-system,sans-serif}
.sc-card::after{content:'';position:absolute;inset:0;border-radius:16px;
  background:linear-gradient(125deg,transparent 35%,rgba(255,255,255,0.05) 50%,transparent 65%);
  background-size:200% 200%;animation:sc-shimmer 3s ease-in-out infinite;pointer-events:none;z-index:20}
.sc-foil-overlay{position:absolute;inset:0;border-radius:16px;z-index:15;pointer-events:none;
  background:linear-gradient(125deg,rgba(255,0,128,.12) 0%,rgba(255,165,0,.12) 15%,rgba(255,255,0,.12) 30%,rgba(0,255,0,.12) 45%,rgba(0,200,255,.12) 60%,rgba(128,0,255,.12) 75%,rgba(255,0,128,.12) 100%);
  background-size:300% 300%;animation:sc-foil 3s ease-in-out infinite;mix-blend-mode:screen}
.sc-foil-badge{position:absolute;top:7px;right:7px;z-index:30;padding:2px 6px;border-radius:20px;font-size:7px;font-weight:900;letter-spacing:.1em;color:#fff;
  background:linear-gradient(135deg,#ff0080,#ff8c00,#ffff00,#00ff80,#00c8ff,#8000ff);background-size:200% 200%;animation:sc-foil 2s linear infinite}

/* header */
.sc-header{display:flex;align-items:flex-start;justify-content:space-between;padding:10px 12px 6px}
.sc-subtype{font-size:7px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:1px}
.sc-name{font-size:14px;font-weight:900;line-height:1}
.sc-hp-block{display:flex;align-items:center;gap:3px;padding-top:1px}
.sc-hp-num{font-size:17px;font-weight:900;letter-spacing:-1px;line-height:1}
.sc-hp-label{font-size:9px;font-weight:800;color:rgba(255,255,255,.35);align-self:flex-end;padding-bottom:1px}
.sc-type-icon{font-size:16px;align-self:flex-end;padding-bottom:1px}

/* art */
.sc-art{height:126px;margin:0 8px;border-radius:8px;position:relative;overflow:hidden;border-width:1.5px;border-style:solid;display:flex;align-items:center;justify-content:center}
.sc-art-wm{position:absolute;bottom:6px;right:10px;font-size:7px;font-weight:700;color:rgba(255,255,255,.1);letter-spacing:.08em;text-transform:uppercase}

/* flavor */
.sc-flavor{font-size:8px;font-style:italic;color:rgba(255,255,255,.5);margin:5px 8px 0;padding:4px 8px;border-radius:5px;border-width:1px;border-style:solid;line-height:1.4}

/* body */
.sc-body{padding:6px 12px}
.sc-egg{font-size:8px;font-weight:900;padding:2px 7px;border-radius:20px;display:inline-block;margin-bottom:5px}
.sc-moves{display:flex;flex-direction:column;gap:0}
.sc-move{display:flex;align-items:center;gap:5px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.sc-move:last-child{border:none}
.sc-move-icon{font-size:11px;flex-shrink:0}
.sc-move-name{font-size:10px;font-weight:700;color:rgba(255,255,255,.8);flex:1}
.sc-move-right{display:flex;flex-direction:column;align-items:flex-end;gap:0}
.sc-move-type{font-size:6px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.6}
.sc-move-dmg{font-size:11px;font-weight:900}

/* bottom */
.sc-bottom{display:flex;justify-content:space-between;align-items:center;margin:4px 8px;padding:5px 8px;background:rgba(0,0,0,.25);border-radius:6px}
.sc-stat{display:flex;flex-direction:column;align-items:center;gap:2px}
.sc-stat-lbl{font-size:6px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.2)}
.sc-stat-val{font-size:9px;font-weight:800;color:rgba(255,255,255,.5)}
.sc-stat-div{width:1px;height:22px;background:rgba(255,255,255,.07)}
.sc-foot{display:flex;justify-content:space-between;padding:4px 12px 8px}
.sc-num{font-size:7px;color:rgba(255,255,255,.18);font-weight:700;letter-spacing:.05em}
.sc-site{font-size:7px;color:rgba(255,255,255,.18);font-weight:600}

/* ── Synth art ── */
.sc-synth-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-around;padding:8px 14px}
.sc-knob-col{display:flex;flex-direction:column;align-items:center;gap:8px}
.sc-knob{width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#1e2d3e,#060c14);border:2px solid currentColor;position:relative}
.sc-knob-sm{width:24px;height:24px}
.sc-knob-dot{position:absolute;width:2px;height:11px;top:5px;left:50%;transform-origin:center bottom;border-radius:2px;background:currentColor}
.sc-kc .sc-knob-dot{animation:sc-knob 3s ease-in-out infinite alternate}
.sc-kr .sc-knob-dot{animation:sc-knob 5s ease-in-out infinite alternate-reverse}
.sc-k0 .sc-knob-dot{animation:sc-knob 3s ease-in-out infinite alternate}
.sc-k1 .sc-knob-dot{animation:sc-knob 4.5s ease-in-out infinite alternate-reverse}
.sc-k2 .sc-knob-dot{animation:sc-knob 2.8s ease-in-out infinite alternate}
.sc-klabel{font-size:6px;font-weight:800;letter-spacing:.08em;color:rgba(255,255,255,.3);text-transform:uppercase}
.sc-scope-col{display:flex;flex-direction:column;align-items:center;gap:5px}
.sc-scope{width:86px;height:50px;border:1px solid rgba(255,255,255,.1);border-radius:5px;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.sc-osc-path{stroke-dasharray:240;stroke-dashoffset:0;animation:sc-osc 1.8s linear infinite}
.sc-wave-btns{display:flex;gap:3px}
.sc-wave-btn{width:22px;height:14px;border:1px solid rgba(255,255,255,.12);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:8px;color:rgba(255,255,255,.3)}
.sc-wave-btn.sc-active{border-color:currentColor;color:currentColor}

/* ── Drum sequencer art ── */
.sc-seq-stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px}
.sc-seq-row{display:flex;gap:2px;align-items:center}
.sc-seq-lbl{font-size:6px;font-weight:800;letter-spacing:.06em;color:rgba(255,255,255,.25);width:14px;text-align:right;text-transform:uppercase;flex-shrink:0}
.sc-pad{width:11px;height:11px;border-radius:1.5px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
.sc-pad.sc-on{background:currentColor;border-color:currentColor}
.sc-pad.sc-ghost{opacity:.45}
.sc-ph{position:absolute;top:0;bottom:0;width:1.5px;background:rgba(255,255,255,.35);border-radius:1px;animation:sc-ph 2s steps(16,end) infinite}

/* ── Mastering art ── */
.sc-master-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-around;padding:8px 12px}
.sc-spk-wrap{position:relative;display:flex;align-items:center}
.sc-spk-body{width:16px;height:36px;background:rgba(0,0,0,.4);border:2px solid currentColor;border-radius:2px;opacity:.7}
.sc-spk-cone{width:0;height:0;border-top:18px solid transparent;border-bottom:18px solid transparent;border-left:26px solid currentColor;opacity:.25;position:relative}
.sc-spk-cap{width:7px;height:7px;background:currentColor;border-radius:50%;position:absolute;right:-4px;top:50%;transform:translateY(-50%)}
.sc-sw1,.sc-sw2,.sc-sw3{position:absolute;left:100%;color:currentColor;animation:sc-sw 1.2s ease-out infinite}
.sc-sw2{animation-delay:.4s}.sc-sw3{animation-delay:.8s}
.sc-lufs-col{display:flex;flex-direction:column;gap:2px}
.sc-lufs-label{font-size:6px;font-weight:800;letter-spacing:.1em;color:rgba(255,255,255,.25);text-transform:uppercase;margin-bottom:1px}
.sc-lufs-row{display:flex;align-items:center;gap:3px}
.sc-lufs-tag{font-size:6px;color:rgba(255,255,255,.2);font-weight:600;width:18px;text-align:right}
.sc-lufs-bar{height:5px;border-radius:1.5px;animation:sc-lufs var(--d,.9s) ease-in-out infinite alternate}
.sc-ceil-bar{position:absolute;right:12px;left:auto;width:72px;height:1px;background:currentColor;opacity:.6;top:14px;animation:sc-ceil 1.2s ease-in-out infinite}

/* ── EQ art ── */
.sc-eq-stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:8px}
.sc-knob-row{display:flex;gap:12px;align-items:flex-end}
.sc-knob-wrap{display:flex;flex-direction:column;align-items:center;gap:3px}
.sc-eq-path{animation:sc-eq-breathe 3s ease-in-out infinite alternate}

/* ── Tape art ── */
.sc-tape-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16px}
.sc-reel{position:relative;width:48px;height:48px}
.sc-reel-outer{width:48px;height:48px;border-radius:50%;border:2.5px solid currentColor;background:rgba(0,0,0,.5);position:relative;animation:sc-reel 2s linear infinite}
.sc-reel-rev{animation-direction:reverse;animation-duration:3s}
.sc-spoke{position:absolute;width:2px;height:50%;background:currentColor;opacity:.6;border-radius:1px;transform-origin:bottom center;top:0;left:50%;margin-left:-1px}
.sc-reel-hub{position:absolute;inset:14px;border-radius:50%;background:currentColor;opacity:.2;border:1.5px solid currentColor;opacity:.4}
.sc-tape-line{width:16px;height:2.5px;background:currentColor;opacity:.4;border-radius:2px}

/* ── Reverb art ── */
.sc-reverb-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.sc-rings{position:relative;width:100px;height:100px;display:flex;align-items:center;justify-content:center}
.sc-ring{position:absolute;border-radius:50%;border:1.5px solid currentColor;animation:sc-ring 2.4s ease-out infinite}
.sc-ring:nth-child(1){animation-delay:0s}.sc-ring:nth-child(2){animation-delay:.6s}
.sc-ring:nth-child(3){animation-delay:1.2s}.sc-ring:nth-child(4){animation-delay:1.8s}
.sc-hp{position:absolute}

/* ── Compressor art ── */
.sc-bars{position:absolute;bottom:0;left:12px;right:44px;display:flex;align-items:flex-end;gap:3px;height:80px}
.sc-bar{border-radius:2px 2px 0 0;width:12px;animation:sc-comp var(--d,.8s) ease-in-out infinite alternate}
.sc-vu-needle{position:absolute;right:10px;top:8px;width:30px;height:72px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px}
.sc-needle{width:1.5px;height:48px;background:currentColor;border-radius:1px;transform-origin:bottom center;animation:sc-needle .8s ease-in-out infinite alternate}
  `;
  document.head.appendChild(style);
});
