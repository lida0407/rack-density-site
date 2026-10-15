// /dc/world/ data sync (marketing/WORLD-PAGE.md §2): ~/Sensaka/dc-world → src/data/dc/world/*.json + public/dc/world/data/.
//   node scripts/dc/world.mjs [dc-world dir]
// A new Gemini batch = re-run this script and rebuild; no page edits. Images: a record's CC image is shown only when
// public/dc/world/img/<country>-<slug>.jpg exists (copied with its credit); nothing is hot-linked.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const SRC = process.argv[2] ?? path.join(os.homedir(), "Sensaka/dc-world");
const OUT = "src/data/dc/world";
const PUB = "public/dc/world/data";
const walk = (d) => fs.readdirSync(d).flatMap((f) => { const p = path.join(d, f); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(PUB, "estates"), { recursive: true });

const pick = (o, keys) => Object.fromEntries(keys.filter((k) => o[k] !== undefined).map((k) => [k, o[k]]));
const SITE_KEYS = ["id", "name", "names", "operator", "owner", "tenant_type", "kind", "city", "country", "region", "lat", "lon", "year_opened", "status",
  "expansions", "site_area_m2", "building_area_m2", "it_mw", "total_mw", "racks_est", "pue", "cooling", "power", "certifications", "famous_for",
  "notable", "story", "image", "sources", "confidence", "estimated", "website", "wikidata", "updated"];
const sites = walk(path.join(SRC, "data")).filter((f) => f.endsWith(".json"))
  .map((f) => pick(JSON.parse(fs.readFileSync(f, "utf8")), SITE_KEYS))
  .filter((s) => s.id && Number.isFinite(s.lat) && Number.isFinite(s.lon))
  .sort((a, b) => a.name.localeCompare(b.name));
const estates = fs.readdirSync(path.join(SRC, "estates")).filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(SRC, "estates", f), "utf8")))
  .sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(path.join(OUT, "sites.json"), JSON.stringify(sites));
fs.writeFileSync(path.join(OUT, "estates.json"), JSON.stringify(estates));

// Downloads (CC BY 4.0): GeoJSON, CSV, estate workbooks.
for (const f of ["dc-world.geojson", "dc-world.csv"]) if (fs.existsSync(path.join(SRC, "dist", f))) fs.copyFileSync(path.join(SRC, "dist", f), path.join(PUB, f));
for (const f of fs.readdirSync(path.join(SRC, "dist", "estates"))) if (f.endsWith(".xlsx")) fs.copyFileSync(path.join(SRC, "dist", "estates", f), path.join(PUB, "estates", f));
fs.writeFileSync(path.join(OUT, "meta.json"), JSON.stringify({ synced: new Date().toISOString().slice(0, 10), sites: sites.length, estates: estates.length,
  withImage: sites.filter((s) => s.image).length }));
console.log(`world: ${sites.length} sites, ${estates.length} estates → ${OUT}; downloads → ${PUB}`);
