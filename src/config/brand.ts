// Product facts and feature flags — one place. Copy reads names and prices from here, never as literals.
// Flip a flag only when ~/Sensaka/share/updatehl.md logs the feature as done AND deployed (see CLAIMS.md in the plan repo).
export { SITE_URL, BASE } from '../../site.config.mjs';

export const PRODUCT_NAME = 'Homelab Twin';     // renamed from Homelab Sim 2026-10-15 — change here only
export const BRAND = 'RACKDENSITY';
// Entity rule (Dali 2026-10-15): Mustard Seed Solutions is the company; Sensaka and RACKDENSITY are its brands.
export const COMPANY = { name: 'Mustard Seed Solutions', url: 'https://mustardseedmt.com', country: 'MT' } as const;
export const PARTNER = { name: 'Sensaka', url: 'https://sensaka.com' } as const; // the Sensaka brand shown on products, not a company
export const CONTACT_EMAIL = 'da@mustardseedmt.com';

/** The app. Dali 2026-10-15: no public demo — both apps stay behind the password page. `live` stays false until he opens a
 *  public Try; until then every CTA is "See it" (clips + stills on /homelab/try/) and "Request a walkthrough" (mailto). */
export const TRY = {
  live: false,
  url: '',                                       // public Try URL, only when Dali opens one
  comingNote: 'by walkthrough for now',
} as const;
export const WALKTHROUGH = { subject: 'Homelab Twin walkthrough', body: 'I would like a walkthrough of Homelab Twin. My lab: (rack size, devices, what you want to see).' };
export const NOTIFY = { subject: 'Tell me when Homelab Twin Try opens', body: 'One e-mail when the self-serve Try opens, please.' };

// Waitlist (marketing/WAITLIST.md): /homelab/waitlist/ + Pages Function functions/api/waitlist (D1 + Turnstile).
// Live since 2026-10-15 (D1 + Turnstile created by the planner); an empty key would fall back to the mailto CTAs. WAITLIST_SITEKEY at build time overrides it (local tests with the test key).
const env = typeof process !== 'undefined' && process.env ? process.env : {};
const TURNSTILE_SITEKEY = env.WAITLIST_SITEKEY ?? '0x4AAAAAAFW6HYzPounMOy66'; // Turnstile widget "rack-density waitlist" (public key)
// Cloudflare Web Analytics (cookieless, no consent banner; planner 2026-10-15: no GA4). Paste the site token the planner
// logs; empty = no tag anywhere and the privacy page keeps saying "no analytics".
export const CF_WEB_ANALYTICS_TOKEN = '';

export const WAITLIST = { live: TURNSTILE_SITEKEY !== '', siteKey: TURNSTILE_SITEKEY, api: '/api/waitlist' } as const;

export const PRICES = { account: { month: 5, year: 50 }, pro: { month: 20, year: 200 }, currency: 'USD' } as const;

export const FLAGS = {
  agentLive: false,          // agent reads real Proxmox / Home Assistant / NUT / UniFi → allows "live" wording
  billingLive: false,        // Account / Pro purchasable (Dali 2026-10-14 16:00: no accounts for now)
  failInTry: true,           // Fail what-if in every tier (decided 16:00)
  aiUnblurredInTry: false,
  phoneVerified: false,
  showcase: false,
  leaderboard: false,
} as const;

export type Status = 'available' | 'roadmap';
export const FEATURE_STATUS: Record<string, Status> = {
  import3d: 'available', views: 'available', diagrams: 'available', failWhatIf: 'available', checks: 'available',
  shareImage: 'available', downloadLab: 'available', aiTokensPerSecond: 'available', flawFinder: 'available',
  cablingView: 'available', aiTokensPerKwh: 'available', pdfExport: 'available', savedLab: 'available',
  history: 'available', shareLink: 'available', fourRacks: 'available',
  upgradePlanner: 'roadmap', alerts: 'roadmap', agent: 'roadmap',
};
export const MAILTO = `mailto:${CONTACT_EMAIL}`;

// The other product line on rack-density.com. Its own constants live in src/config/dc/product.ts (DC marketing owns them);
// this mirror is only for the hub, the shared footer and the Organization schema.
export { PRODUCT_NAME as DC_PRODUCT_NAME } from './dc/product.ts';
