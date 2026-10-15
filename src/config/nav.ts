// Shared site navigation (marketing/SITE-NAV.md): one header and one footer for the hub, Homelab Twin and DC Sim.
// Paths are site-root paths; components run them through u(). The DC menu lives in config/dc/nav.ts (DC marketing owns it).
import { PRODUCT_NAME, DC_PRODUCT_NAME, PARTNER, COMPANY, CONTACT_EMAIL } from './brand';
import { TEMPLATE_FILE } from './dc/product';

// DC marketing owns the DC menu (config/dc/nav.ts). Loaded through a glob so the shared header still builds before that file
// lands; the fallback is the DC header's committed menu (2026-10-15).
const dcNav = Object.values(import.meta.glob<{ DC_NAV: NavLink[]; DC_CTA: NavLink; DC_FOOTER: NavLink[] }>('./dc/nav.ts', { eager: true }))[0];
const DC_NAV: NavLink[] = dcNav?.DC_NAV ?? [
  { href: '/dc/product/', label: 'Product' },
  { href: '/dc/integrations/', label: 'Integrations' },
  { href: '/dc/partners/', label: 'Partners' },
  { href: '/dc/pricing/', label: 'Pricing' },
  { href: '/dc/resources/', label: 'Resources' },
];
const DC_CTA: NavLink = dcNav?.DC_CTA ?? { href: `/dc/${TEMPLATE_FILE}`, label: 'Excel template', download: true };
const DC_FOOTER: NavLink[] = dcNav?.DC_FOOTER ?? [{ href: '/dc/', label: 'Overview' }, ...DC_NAV];

export type Section = 'hub' | 'homelab' | 'dc';
export interface NavLink { href: string; label: string; download?: boolean; exact?: boolean }

export const PRODUCTS = [
  { edition: 'homelab', label: PRODUCT_NAME, href: '/homelab' },
  { edition: 'dc', label: DC_PRODUCT_NAME, href: '/dc', suffix: `by ${PARTNER.name}` },
] as const;

/** Section menu. On the hub the two switcher pills are the first two items (Homelab Twin · DC Sim), so the menu adds the rest. */
export const MENU: Record<Section, NavLink[]> = {
  hub: [
    { href: '/calculator', label: 'Calculator' },
    { href: '/devices', label: 'Devices' },
    { href: '/homelab/learn', label: 'Learn' },
  ],
  homelab: [
    { href: '/homelab/learn', label: 'Learn' },
    { href: '/homelab/pricing', label: 'Pricing' },
    { href: '/homelab/changelog', label: 'Changelog' },
    { href: '/calculator', label: 'Calculator' },
  ],
  dc: DC_NAV,
};

export const CTA: Record<Section, NavLink | null> = {
  hub: null,
  homelab: { href: '/homelab/try', label: 'See it' },
  dc: DC_CTA,
};

export const FOOTER = {
  hub: [
    { href: '/', label: 'All products' },
    { href: '/calculator', label: 'Rack Density Calculator' },
    { href: '/calculator/ups-runtime', label: 'UPS Runtime Calculator' },
    { href: '/devices', label: 'Device database' },
    { href: '/homelab/learn', label: 'Learn' },
  ],
  homelab: [
    { href: '/homelab', label: 'Overview' },
    { href: '/homelab/try', label: 'See it' },
    { href: '/homelab/pricing', label: 'Pricing' },
    { href: '/homelab/learn', label: 'Learn' },
    { href: '/homelab/changelog', label: 'Changelog' },
  ],
  dc: DC_FOOTER,
  company: [
    { href: COMPANY.url, label: COMPANY.name },
    { href: PARTNER.url, label: `${PARTNER.name} (brand)` },
    { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
    { href: '/privacy', label: 'Privacy' },
  ],
};
