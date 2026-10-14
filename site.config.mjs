// Where the site lives — the ONE place for the address. Production is rack-density.com on Cloudflare Pages.
// Other targets override it at build time with env vars (the GitHub Pages workflow sets
// SITE_URL=https://lida0407.github.io and SITE_BASE=/rack-density-site). Nothing else in the code knows the address.
const env = typeof process !== 'undefined' && process.env ? process.env : {};
export const SITE_URL = env.SITE_URL || 'https://rack-density.com';
export const BASE = env.SITE_BASE || '/';
/** Alias used by the DC section's code (imported from dcsim-site). */
export const BASE_PATH = BASE;
/** Section prefixes on the merged site. */
export const SECTIONS = { homelab: '/homelab', dc: '/dc' };
