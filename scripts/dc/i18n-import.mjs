// DC translations → site (marketing/I18N.md, plan repo marketing/i18n/dc/README.md). Run after the staged copy changes:
//   node scripts/dc/i18n-import.mjs [~/Sensaka/marketing/i18n/dc]
// Strings: <locale>/*.strings.json ({key: {en, de|zh}}) → src/i18n/dc/strings/<name>.json ({key: {en, de, zh}}), with the
// placeholders normalised to {expr} (a "$" in front of a price stays a literal dollar sign) and JSX attributes made plain HTML.
// Markdown: <locale>/{product,integrations,resources,…}.md → src/content/dc/l10n/<de|zh>/… (same relative paths as the English).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SRC = process.argv[2] ?? path.join(os.homedir(), "Sensaka/marketing/i18n/dc");
const ROOT = new URL("../../", import.meta.url).pathname;
const LOCALES = { de: "de-DE", zh: "zh-CN" };
const STRINGS = ["home", "pricing", "privacy", "components", "clips", "integrations-index"];
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
for (const name of STRINGS) {
  // The German files define the keys; the Chinese translators named theirs differently, so Chinese entries are matched
  // to the German keys by their English text.
  const read = (dir) => { const f = path.join(SRC, dir, `${name}.strings.json`); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {}; };
  const merged = {};
  const byEn = new Map();
  for (const [k, v] of Object.entries(read(LOCALES.de))) {
    merged[k] = { en: norm(v.en), ...(v.de ? { de: norm(v.de) } : {}) };
    byEn.set(merged[k].en, [...(byEn.get(merged[k].en) ?? []), k]); // one English text can sit under several keys
  }
  let orphans = 0;
  for (const [k, v] of Object.entries(read(LOCALES.zh))) {
    if (!v.zh) continue;
    const keys = byEn.get(norm(v.en)) ?? [];
    if (!keys.length) { orphans++; continue; }
    for (const key of keys) if (!merged[key].zh || key === k) merged[key].zh = norm(v.zh);
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
