import { SITE_URL, BASE_PATH } from "../../../site.config.mjs";

// Merged site: every DC link lives under <BASE>/dc/. root() is for site-wide files (sitemap, robots, the hub).
const siteBase = BASE_PATH.endsWith("/") ? BASE_PATH : BASE_PATH + "/";
const base = siteBase + "dc/";
export const root = (path = ""): string => siteBase + path.replace(/^\//, "");

/** Section link with the base path, e.g. u("pricing/") -> "/rack-density-site/dc/pricing/". */
export const u = (path = ""): string => {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return base + path.replace(/^\//, "");
};

/** Absolute URL, for canonical tags, sitemaps, JSON-LD and llms.txt. */
export const abs = (path = ""): string => SITE_URL.replace(/\/$/, "") + u(path);
