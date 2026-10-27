// DC translations → site (marketing/I18N.md, plan repo marketing/i18n/dc/README.md). Run after the staged copy changes:
//   node scripts/dc/i18n-import.mjs [~/Sensaka/marketing/i18n/dc]
// Strings: <locale>/*.strings.json ({key: {en, de|zh}}) → src/i18n/dc/strings/<name>.json ({key: {en, de, zh}}), with the
// placeholders normalised to {expr} (a "$" in front of a price stays a literal dollar sign) and JSX attributes made plain HTML.
// Markdown: <locale>/{product,integrations,resources,…}.md → src/content/dc/l10n/<de|zh>/… (same relative paths as the English).
// Site-side corrections (OVERRIDES, a JSON file next to the output): "en" = the English as the page has it now where the
// staged "en" drifted (that key's de/zh are dropped until the staged file is refreshed, so the page falls back to English);
// "zh" = Chinese for a German key whose Chinese was staged split differently, composed from staged Chinese keys [[zh:key]].
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SRC = process.argv[2] ?? path.join(os.homedir(), "Sensaka/marketing/i18n/dc");
const ROOT = new URL("../../", import.meta.url).pathname;
const LOCALES = { de: "de-DE", zh: "zh-CN" };
const STRINGS = ["home", "pricing", "privacy", "components", "clips", "integrations-index", "world-ui"];
const OVERRIDES = { "world-ui": "world-overrides.json" };
// Hand-written strings with no staged translation (loaded next to the generated file by src/i18n/dc/index.ts).
const EXTRA = { "world-ui": "world-extra.json" };
const MD = ["product.md", "product", "integrations", "partners.md", "contact.md", "security.md", "resources"];

const MONEY = /^PRICES\./;
/** `${x}` from template literals → {x}; `$${x}` and JSX `${PRICES…}` keep the dollar sign; href={…} → href="…". */
export const norm = (s) => s
  .replace(/=\{`([^`]*)`\}/g, '="$1"')
  .replace(/\$\$\{([^}]+)\}/g, "$\u0000{$1}")
  .replace(/\$\{([^}]+)\}/g, (_, x) => (MONEY.test(x) ? `$\u0000{${x}}` : `\u0000{${x}}`))
  .replace(/=\{((?:u|root)\("[^"]*"\)|[^{}"]+)\}/g, '="{$1}"')
  .replace(/\u0000/g, "");

const out = path.join(ROOT, "src/i18n/dc/strings");
fs.mkdirSync(out, { recursive: true });
// A Chinese string matched by its English text without the leading/trailing spaces keeps the German key's spacing only
// where Chinese typography wants it (before "·", not around 。 or ：).
const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/;
const respace = (en, zh) => {
  const t = zh.trim(), lead = en.match(/^\s*/)[0], trail = en.match(/\s*$/)[0];
  return (lead && !CJK.test(t[0] ?? "") ? lead : "") + t + (trail && !CJK.test(t.at(-1) ?? "") ? trail : "");
};
for (const name of STRINGS) {
  // The German files define the keys; the Chinese translators named theirs differently, so Chinese entries are matched
  // to the German keys by their English text (exactly, else ignoring leading and trailing spaces).
  const read = (dir) => { const f = path.join(SRC, dir, `${name}.strings.json`); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {}; };
  const merged = {};
  const byEn = new Map(), byTrim = new Map();
  const add = (m, en, k) => m.set(en, [...(m.get(en) ?? []), k]); // one English text can sit under several keys
  for (const [k, v] of Object.entries(read(LOCALES.de))) {
    merged[k] = { en: norm(v.en), ...(v.de ? { de: norm(v.de) } : {}) };
    add(byEn, merged[k].en, k);
    add(byTrim, merged[k].en.trim(), k);
  }
  let orphans = 0;
  const zhStaged = read(LOCALES.zh);
  for (const [k, v] of Object.entries(zhStaged)) {
    if (!v.zh) continue;
    const exact = byEn.get(norm(v.en)) ?? [];
    const keys = exact.length ? exact : byTrim.get(norm(v.en).trim()) ?? [];
    if (!keys.length) { orphans++; continue; }
    for (const key of keys) if (!merged[key].zh || key === k) merged[key].zh = exact.length ? norm(v.zh) : respace(merged[key].en, norm(v.zh));
  }
  const ovFile = OVERRIDES[name] && path.join(out, OVERRIDES[name]);
  const ov = ovFile && fs.existsSync(ovFile) ? JSON.parse(fs.readFileSync(ovFile, "utf8")) : {};
  for (const [k, en] of Object.entries(ov.en ?? {})) {
    if (!merged[k]) { console.log(`  override en: no staged key "${k}"`); continue; }
    if (merged[k].en === en) { console.log(`  override en "${k}": the staged English matches again, remove the override`); continue; }
    console.log(`  override en "${k}": English drifted, de/zh dropped until the staged files are refreshed`);
    merged[k] = { en };
  }
  for (const [k, tpl] of Object.entries(ov.zh ?? {})) {
    if (!merged[k]) { console.log(`  override zh: no staged key "${k}"`); continue; }
    if (merged[k].zh) { console.log(`  override zh "${k}": the staged Chinese now matches directly, remove the override`); continue; }
    if (ov.en?.[k]) continue;
    const refs = [...tpl.matchAll(/\[\[zh:([^\]]+)\]\]/g)].map((m) => m[1]);
    const missing = refs.filter((r) => !zhStaged[r]?.zh);
    if (missing.length) { console.log(`  override zh "${k}": staged Chinese key(s) missing: ${missing.join(", ")}`); continue; }
    merged[k].zh = tpl.replace(/\[\[zh:([^\]]+)\]\]/g, (_, r) => norm(zhStaged[r].zh));
  }
  const exFile = EXTRA[name] && path.join(out, EXTRA[name]);
  if (exFile && fs.existsSync(exFile)) {
    const staged = Object.keys(JSON.parse(fs.readFileSync(exFile, "utf8"))).filter((k) => merged[k]);
    if (staged.length) console.log(`  ${EXTRA[name]}: now staged (the staged copy wins, remove them there): ${staged.join(", ")}`);
  }
  fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(merged, null, 1) + "\n");
  const n = Object.keys(merged).length, zh = Object.values(merged).filter((e) => e.zh).length;
  console.log(`strings ${name}: ${n} keys, de ${Object.values(merged).filter((e) => e.de).length}, zh ${zh}${orphans ? ` (${orphans} Chinese strings without a German key)` : ""}`);
}

const copyMd = (from, to) => {
  if (fs.statSync(from).isDirectory()) return fs.readdirSync(from).forEach((f) => copyMd(path.join(from, f), path.join(to, f)));
  if (!from.endsWith(".md")) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};
for (const [loc, dir] of Object.entries(LOCALES)) {
  const dest = path.join(ROOT, "src/content/dc/l10n", loc);
  fs.rmSync(dest, { recursive: true, force: true });
  for (const m of MD) if (fs.existsSync(path.join(SRC, dir, m))) copyMd(path.join(SRC, dir, m), path.join(dest, m));
  console.log(`markdown ${loc}: ${fs.readdirSync(dest, { recursive: true }).filter((f) => String(f).endsWith(".md")).length} files`);
}
