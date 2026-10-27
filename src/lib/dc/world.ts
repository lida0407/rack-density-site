// /dc/world/ data and helpers (marketing/WORLD-PAGE.md). Data comes from scripts/dc/world.mjs (dc-world sync).
import sitesJson from "../../data/dc/world/sites.json";
import estatesJson from "../../data/dc/world/estates.json";
import meta from "../../data/dc/world/meta.json";

export interface Source { url: string; title?: string; publisher?: string; date?: string; kind?: string }
export interface Site {
  id: string; name: string; names?: Record<string, string>; operator?: string; owner?: string; tenant_type?: string; kind?: string;
  city?: string; country?: string; region?: string; lat: number; lon: number; year_opened?: number | null; status?: string;
  expansions?: string[]; site_area_m2?: number | null; building_area_m2?: number | null; it_mw?: number | null; total_mw?: number | null;
  racks_est?: number | null; pue?: { value: number; kind?: string; source?: string } | null; cooling?: string[]; power?: Record<string, unknown>;
  certifications?: string[]; famous_for?: string; notable?: string[]; story?: string;
  image?: { url: string; license: string; author: string; source_page: string } | null; sources?: Source[]; confidence?: string;
  estimated?: string[]; website?: string; wikidata?: string; updated?: string;
}
export interface EstateSite { site: string; city?: string; country?: string; lat: number; lon: number; role?: string; provider?: string; it_kw?: number | null; pue?: number | null; site_ref?: string | null }
export interface EstateLink { site_a: string; site_b: string; type?: string; bandwidth_gbps?: number | null; capacity_tbps?: number | null; latency_ms?: number | null; length_km?: number | null; year?: number | null; protected?: string; carrier?: string; sources?: string[] }
export interface Estate { id: string; name: string; operator?: string; kind?: string; year?: number; famous_for?: string; story?: string; notable?: string[]; sites: EstateSite[]; links: EstateLink[]; sources?: Source[]; confidence?: string; updated?: string }

export const SITES = sitesJson as unknown as Site[];
export const ESTATES = estatesJson as unknown as Estate[];
export const WORLD_META = meta as { synced: string; sites: number; estates: number; withImage: number };

export const sitePath = (s: Site) => `world/${s.id}/`;
export const estatePath = (e: Estate) => `world/estates/${e.id}/`;
export const TYPE_LABEL: Record<string, string> = { hyperscale: "Hyperscale", colocation: "Colocation", ai: "AI", hpc: "HPC", research: "Research", enterprise: "Enterprise" };
export const KIND_LABEL: Record<string, string> = { cable: "Submarine cable", hyperscaler: "Cloud backbone", national: "National compute network", ix: "Internet exchange", financial: "Financial route", cdn: "CDN", enterprise: "Enterprise" };
export const REGIONS = ["Europe", "North America", "Asia-Pacific", "Latin America", "Middle East", "Africa"];
/** Dictionary key of a region (labels.region.<key> in src/i18n/dc/strings/world-ui.json); the record value stays English. */
export const REGION_KEY: Record<string, string> = { Europe: "europe", "North America": "northAmerica", "Asia-Pacific": "asiaPacific", "Latin America": "latinAmerica", "Middle East": "middleEast", Africa: "africa" };

const COUNTRY = new Map<string, Intl.DisplayNames>();
/** Country name from the ISO code in a display language (Intl locale, e.g. "de-DE"); English by default. */
export const countryName = (cc?: string, lang = "en") => {
  try {
    if (!cc) return "";
    if (!COUNTRY.has(lang)) COUNTRY.set(lang, new Intl.DisplayNames([lang], { type: "region" }));
    return COUNTRY.get(lang)!.of(cc.toUpperCase()) ?? cc;
  } catch { return cc ?? ""; }
};

/** Great-circle distance in km. */
export const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const R = 6371, rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
/** Estimated one-way fibre latency (ms): route = great circle × 1.5, light in fibre ≈ 5 µs per km. */
export const latencyMs = (distKm: number) => distKm * 1.5 * 0.005;
export const fmt = (n?: number | null, unit = "", intl = "en-US") => (n == null ? "—" : `${n.toLocaleString(intl)}${unit}`);

/** Estates that reference a famous site. */
export const estatesFor = (s: Site) => ESTATES.filter((e) => e.sites.some((x) => x.site_ref === s.id));

// Imagined giants (IMAGINED-GIANTS.md): fictional campuses built from public numbers. Always shown with IMAGINED_LABEL.
import imaginedJson from "../../data/dc/world/imagined.json";
export const IMAGINED_LABEL = "Imagined — a fictional design built from public numbers";
export interface Giant extends Estate {
  imagined: true; label?: string; concept?: string; names?: Record<string, string>; assumptions?: string[];
  derived: Record<string, any>; halls?: { name: string; pods?: number; itMw?: number }[];
  what_ifs?: { name: string; verdict: string; findings?: string[] }[]; zh?: Record<string, any>;
}
export const IMAGINED = imaginedJson as unknown as Giant[];
export const giantPath = (g: Giant) => `world/imagined/${g.id}/`;
/** The giant's own campus site (role primary, else the biggest). */
export const giantMain = (g: Giant) => g.sites.find((s) => s.role === "primary") ?? [...g.sites].sort((a, b) => (b.it_kw ?? 0) - (a.it_kw ?? 0))[0];
