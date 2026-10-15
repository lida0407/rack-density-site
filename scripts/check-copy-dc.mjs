// Build-time copy check: fails the build if the published HTML breaks the marketing rules.
// - no names of DCIM / twin / simulation competitors (integration partners are allowed), except on the comparison
//   pages under /dc/compare/ (Dali, 2026-10-15: factual, sourced, dated) and their lines in llms.txt,
// - no AI model or AI company names,
// - "CFD" only in the negative ("not CFD", "no CFD", "CFD-grade airflow: not offered"),
// - no leftover spec placeholders.
import { readdirSync, readFileSync, statSync } from "node:fs";
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
files.push(DIST + "llms.txt");

const competitors = /\b(nlyte|hyperview|schneider|ecostruxure|cadence|6sigma|ekkosense|device42|rackdaddy|coldaisle|vertiv|eaton|apc|legrand|raritan|rittal|siemens|fnt command|nautobot|racktables|opendcim|i-doit|netterrain|patch manager|vigilent|omniverse|future facilities)\b/i;
const aiNames = /\b(openai|anthropic|claude|chatgpt|gpt-?\d|gemini|llama|mistral|qwen|deepseek|grok|copilot)\b/i;
const placeholders = /(LeadMagnet|PricingStrip|StatusBadge|DEMO_URL|TODO|TBD|\{\{)/;

const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const problems = [];
for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const rel = f.slice(DIST.length);
  const compare = /^dc\/compare\//.test(rel);
  const t = f.endsWith(".html") ? text(raw) : raw.split("\n").filter((l) => !l.includes("/dc/compare/")).join("\n");
  for (const [name, re] of [["competitor", compare ? null : competitors], ["AI name", aiNames], ["placeholder", placeholders]]) {
    if (!re) continue;
    const m = t.match(re);
    if (m) problems.push(`${rel}: ${name} "${m[0]}" … ${t.slice(Math.max(0, m.index - 50), m.index + 60)}`);
  }
  for (const m of t.matchAll(/CFD/g)) {
    const before = t.slice(Math.max(0, m.index - 12), m.index).toLowerCase();
    const after = t.slice(m.index, m.index + 40).toLowerCase();
    if (!/(not |no |non-|is this |here is )$/.test(before) && !after.startsWith("cfd-grade airflow: not offered")) {
      problems.push(`${rel}: CFD claim? … ${t.slice(Math.max(0, m.index - 60), m.index + 40)}`);
    }
  }
}
if (problems.length) {
  console.error(`check-copy: ${problems.length} problem(s)\n` + problems.join("\n"));
  process.exit(1);
}
console.log(`check-copy: ${files.length} files clean`);
