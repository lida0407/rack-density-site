// Data for the /dc/world/ globe, fetched after the page has loaded (keeps the HTML small).
import { SITES, ESTATES, TYPE_LABEL, KIND_LABEL, countryName } from "../../../lib/dc/world";
import { u } from "../../../lib/dc/url";

export function GET() {
  const sites = SITES.map((s) => ({
    id: s.id, n: s.name, op: s.operator ?? "", t: s.tenant_type ?? "", tl: TYPE_LABEL[s.tenant_type ?? ""] ?? "", r: s.region ?? "",
    p: [s.city, countryName(s.country)].filter(Boolean).join(", "), lat: s.lat, lng: s.lon, mw: s.it_mw ?? null, pue: s.pue?.value ?? null,
    pk: s.pue?.kind ?? "", y: s.year_opened ?? null, f: s.famous_for ?? "", st: s.story ?? "", nt: (s.notable ?? []).slice(0, 3), url: u(`world/${s.id}/`),
  }));
  const estates = ESTATES.map((e) => ({
    id: e.id, n: e.name, k: e.kind ?? "", kl: KIND_LABEL[e.kind ?? ""] ?? "", f: e.famous_for ?? "", url: u(`world/estates/${e.id}/`),
    s: e.sites.map((x) => ({ c: x.site, lat: x.lat, lng: x.lon, p: [x.city, countryName(x.country)].filter(Boolean).join(", "), ref: x.site_ref ?? null })),
    l: e.links.map((x) => ({ a: x.site_a, b: x.site_b, t: x.type ?? "", pr: x.protected ?? "", km: x.length_km ?? null })),
  }));
  return new Response(JSON.stringify({ sites, estates }), { headers: { "Content-Type": "application/json" } });
}
