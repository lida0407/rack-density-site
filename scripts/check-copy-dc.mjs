// Build-time copy check: fails the build if the published HTML breaks the marketing rules.
// - no names of DCIM / twin / simulation competitors (integration partners are allowed), except on the comparison
//   pages under /dc/compare/ (Dali, 2026-10-15: factual, sourced, dated) and their lines in llms.txt,
// - no AI model or AI company names,
// - "CFD" only in the negative ("not CFD", "no CFD", "CFD-grade airflow: not offered"),
// - no leftover spec placeholders.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Merged site: the DC rules apply to the /dc section and the site-wide llms.txt.
const DIST = new URL("../dist/", import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (/\.(html|txt|xml)$/.test(f)) files.push(p);
});
walk(DIST + "dc");
// Translated DC pages (marketing/I18N.md) follow the same rules.
for (const l of ["de", "zh"]) if (existsSync(DIST + l + "/dc")) walk(DIST + l + "/dc");
files.push(DIST + "llms.txt");

const competitors = /\b(nlyte|hyperview|schneider|ecostruxure|cadence|6sigma|ekkosense|device42|rackdaddy|coldaisle|vertiv|eaton|apc|legrand|raritan|rittal|siemens|fnt command|nautobot|racktables|opendcim|i-doit|netterrain|patch manager|vigilent|omniverse|future facilities)\b/i;
// /dc/world/ shows third-party records verbatim (WORLD-PAGE.md §3): DCIM / monitoring software names stay forbidden there,
// hardware makers and AI company or model names that appear as facts in a record are allowed.
const worldCompetitors = /\b(nlyte|hyperview|ecostruxure|cadence|6sigma|ekkosense|device42|rackdaddy|coldaisle|fnt command|nautobot|racktables|opendcim|i-doit|netterrain|patch manager|vigilent|omniverse|future facilities|sunbird)\b/i;
const aiNames = /\b(openai|anthropic|claude|chatgpt|gpt-?\d|gemini|llama|mistral|qwen|deepseek|grok|copilot)\b/i;
const placeholders = /(LeadMagnet|PricingStrip|StatusBadge|DEMO_URL|TODO|TBD|\{\{)/;

const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const problems = [];
for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const rel = f.slice(DIST.length);
  const compare = /^(de\/|zh\/)?dc\/compare\//.test(rel);
  const world = /^(de\/|zh\/)?dc\/(preview\/)?world\//.test(rel); // held translations live under /<locale>/dc/preview/
  const t = f.endsWith(".html") ? text(raw) : raw.split("\n").filter((l) => !l.includes("/dc/compare/") && !l.includes("/dc/world/")).join("\n");
  for (const [name, re] of [["competitor", compare ? null : world ? worldCompetitors : competitors], ["AI name", world ? null : aiNames], ["placeholder", placeholders]]) {
    if (!re) continue;
    const m = t.match(re);
    if (m) problems.push(`${rel}: ${name} "${m[0]}" … ${t.slice(Math.max(0, m.index - 50), m.index + 60)}`);
  }
  // Dali 2026-10-15 evening: no "Sensaka" anywhere on rack-density.com; only Mustard Seed Solutions. Checked on the raw
  // file (JSON-LD included) minus the shared header/footer, which homelab marketing owns; the site-wide llms.txt is theirs.
  if (rel !== "llms.txt") {
    const own = raw.replace(/<header[\s\S]*?<\/header>/g, " ").replace(/<footer[\s\S]*?<\/footer>/g, " ");
    const s = own.match(/sensaka/i);
    if (s) problems.push(`${rel}: brand "Sensaka" … ${own.slice(Math.max(0, s.index - 60), s.index + 40).replace(/\s+/g, " ")}`);
  }
  for (const m of world ? [] : t.matchAll(/CFD/g)) { // world records describe other sites' workloads, not our product
    const before = t.slice(Math.max(0, m.index - 12), m.index).toLowerCase();
    const after = t.slice(m.index, m.index + 40).toLowerCase();
    // Negations in English, German (/de/dc/) and Chinese (/zh/dc/): "no CFD", "keine CFD", "ohne CFD", "不是 CFD" …
    const negated = /(not |no |non-|is this |here is |keine |kein |ohne |ist das |不是 ?|并非 ?|不做 ?|不提供 ?|这是 ?|非 ?|没有任何内容是 ?)$/.test(before);
    if (!negated && !/^cfd(-grade airflow: not offered|-qualität: nicht im angebot| ?级气流分析：不提供| ?吗)/.test(after)) {
      problems.push(`${rel}: CFD claim? … ${t.slice(Math.max(0, m.index - 60), m.index + 40)}`);
    }
  }
}
if (problems.length) {
  console.error(`check-copy: ${problems.length} problem(s)\n` + problems.join("\n"));
  process.exit(1);
}
console.log(`check-copy: ${files.length} files clean`);
