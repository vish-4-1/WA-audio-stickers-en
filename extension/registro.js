const $ = (id) => document.getElementById(id);
let onlyErrors = false;
let entries = [];

function render() {
  const box = $("log");
  box.textContent = "";
  const list = (onlyErrors ? entries.filter((e) => e.level !== "info") : entries).slice(-2000);
  for (const e of list) {
    const div = document.createElement("div");
    div.className = e.level === "error" ? "e" : e.level === "warn" ? "w" : "";
    div.textContent = `${e.ts.replace("T", " ").slice(0, 19)} [${e.level}] ${e.event}${e.data != null ? " " + JSON.stringify(e.data) : ""}`;
    box.append(div);
  }
  box.scrollTop = box.scrollHeight;
  const errs = entries.filter((e) => e.level === "error").length;
  const warns = entries.filter((e) => e.level === "warn").length;
  const sessions = new Set(entries.map((e) => e.session)).size;
  $("summary").textContent = `${entries.length} entries · ${errs} errors · ${warns} warnings · ${sessions} sessions`;
}

function load() {
  chrome.storage.local.get({ log: [] }, (res) => { entries = res.log || []; render(); });
}

$("dl").addEventListener("click", () => {
  const content = JSON.stringify({ exportado: new Date().toISOString(), version: chrome.runtime.getManifest().version, ua: navigator.userAgent, entradas: entries }, null, 1);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: "application/json" }));
  a.download = "sound-stickers-log-" + new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19) + ".json";
  a.click();
});
$("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(JSON.stringify(entries, null, 1));
  $("copy").textContent = "Copied";
  setTimeout(() => ($("copy").textContent = "Copy"), 1500);
});
$("errors").addEventListener("click", () => {
  onlyErrors = !onlyErrors;
  $("errors").textContent = onlyErrors ? "Show all" : "Errors only";
  render();
});
$("clear").addEventListener("click", () => {
  if (!confirm("Clear the entire log?")) return;
  chrome.storage.local.set({ log: [] }, load);
});
chrome.storage.onChanged.addListener((changes) => { if (changes.log) { entries = changes.log.newValue || []; render(); } });
load();
