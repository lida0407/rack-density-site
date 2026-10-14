#!/usr/bin/env node
// Generate 1200×630 OG images and the 512 px icon into public/. Run locally: npm run og (outputs are committed).
// Two variants per page (SITE-THEME-VIDEO.md §1): dark (<name>.png, the og:image) and bright (<name>-bright.png, lit room,
// bright tokens) for posts and newsletters that sit on a light background. Colours are the tokens' values.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { PRODUCT_NAME } from '../src/config/brand.ts';
const PAGES = {
  hub: ['Racks you can see through', 'Free rack density calculator, plus 3D twins for the homelab and the data center.'],
  home: ['Your homelab rack, in 3D.', 'Watts, cost per month, cables and what goes dark when one thing fails.'],
  try: ['See Homelab Twin', 'Clips and stills of the demo lab, or book a walkthrough.'],
  calculator: ['Rack Density Calculator', 'Devices per rack by space, power and cooling, with a live rack diagram.'],
  pricing: ['Free, $5 or $20 a month', 'Try stores nothing. Account keeps your lab. Pro explains it.'],
  learn: ['Homelab guides & calculators', 'Power cost, tokens per watt, 10-inch racks, Proxmox power.'],
  'tokens-per-watt': ['Tokens per watt', 'Tokens per kWh and cost per million tokens for your local AI box.'],
  '10-inch-mini-rack-planner': ['10-inch mini rack planner', 'Will it fit? Width, depth and U, plus a power budget.'],
  'homelab-power-calculator': ['What your homelab costs', 'Average watts × 730 ÷ 1,000 × your price per kWh, device by device.'],
  'proxmox-power-usage': ['Proxmox power usage', 'Measure it at the wall, then cut idle watts. Payback calculator.'],
};
const HUB = new Set(['hub', 'calculator']); // hub pages: public/og/, no product footer
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const V = {
  dark: { shot: 'src/assets/shots/overview.png', bright: 0.55, mid: .8, bg: '#0b0a09', ink: '#f2f1ee', muted: '#a8a5a0', acc: '#e57000', acc2: '#22c55e', suffix: '' },
  bright: { shot: 'src/assets/shots/hero-office.png', bright: 1.04, mid: .92, bg: '#ffffff', ink: '#15171a', muted: '#4f4c46', acc: '#ad4a00', acc2: '#137a34', suffix: '-bright' },
};
for (const v of Object.values(V)) {
  const bg = await sharp(v.shot).resize(1200, 630, { fit: 'cover', position: 'right' }).modulate({ brightness: v.bright }).toBuffer();
  for (const [name, [title, sub]] of Object.entries(PAGES)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${v.bg}" stop-opacity=".97"/><stop offset=".62" stop-color="${v.bg}" stop-opacity="${v.mid}"/><stop offset="1" stop-color="${v.bg}" stop-opacity=".1"/></linearGradient></defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <g transform="translate(64,62) scale(2)"><rect width="16" height="16" rx="1" fill="${v.ink}"/><rect x="3" y="2" width="10" height="2" fill="${v.bg}"/><rect x="3" y="5" width="10" height="2" fill="${v.bg}"/><rect x="3" y="8" width="10" height="2" fill="${v.bg}"/><rect x="3" y="11" width="10" height="2" fill="${v.bg}"/><rect x="11" y="2" width="2" height="2" fill="${v.acc}"/><rect x="11" y="5" width="2" height="2" fill="${v.acc2}"/></g>
      <text x="110" y="90" font-family="Menlo, Courier, monospace" font-size="26" font-weight="700" letter-spacing="4" fill="${v.ink}">RACK<tspan fill="${v.acc}">DENSITY</tspan></text>
      <text x="64" y="300" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="${v.ink}">${esc(title)}</text>
      <text x="64" y="370" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${v.muted}">${esc(sub)}</text>
      <text x="64" y="566" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="${v.acc}">${HUB.has(name) ? 'Free · runs in your browser, no data leaves it' : `${esc(PRODUCT_NAME)} · demo lab, simulated data`}</text>
    </svg>`;
    await sharp(bg).composite([{ input: Buffer.from(svg) }]).png({ compressionLevel: 9, palette: true }).toFile(HUB.has(name) ? `public/og/${name}${v.suffix}.png` : `public/homelab/og/${name}${v.suffix}.png`);
    console.log(name + v.suffix);
  }
}
await sharp(readFileSync('public/brand/favicon-rackdensity.svg'), { density: 1200 }).resize(512, 512).png().toFile('public/icon-512.png');
console.log('icon-512.png');
