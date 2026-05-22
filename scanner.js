// StudioWorth — Plugin folder scanner
// Uses File System Access API (Chrome/Edge — Mac and PC)

const PLUGIN_EXTENSIONS = new Set(["vst3", "dll", "vst", "component", "aax"]);

async function scanPluginFolder() {
  // Ask user to pick their plugin folder
  let dirHandle;
  try {
    dirHandle = await window.showDirectoryPicker({ mode: "read" });
  } catch (err) {
    if (err.name === "AbortError") return null; // user cancelled
    throw err;
  }

  const results = { matched: [], unknown: [], total: 0 };
  const seen = new Set(); // deduplicate

  await scanDir(dirHandle, results, seen, 0);
  return results;
}

async function scanDir(dirHandle, results, seen, depth) {
  if (depth > 4) return; // don't go too deep

  for await (const entry of dirHandle.values()) {
    if (entry.kind === "file") {
      const ext = entry.name.split(".").pop().toLowerCase();
      if (!PLUGIN_EXTENSIONS.has(ext)) continue;

      results.total++;
      const norm = normalizeName(entry.name);
      if (seen.has(norm)) continue;
      seen.add(norm);

      // Update scanning UI
      document.getElementById("scanCount").textContent =
        `${results.total} plugin${results.total !== 1 ? "s" : ""} found`;

      const match = lookupPlugin(entry.name);
      if (match) {
        results.matched.push({ filename: entry.name, ...match });
      } else {
        results.unknown.push(entry.name);
      }
    } else if (entry.kind === "directory") {
      // Recurse into subdirectories
      try {
        const subDir = await dirHandle.getDirectoryHandle(entry.name);
        await scanDir(subDir, results, seen, depth + 1);
      } catch {}
    }
  }
}
