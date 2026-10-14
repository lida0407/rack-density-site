#!/usr/bin/env node
// Generate 1200×630 OG images and the 512 px icon into public/. Run locally: npm run og (outputs are committed).
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { PRODUCT_NAME } from '../src/config/brand.ts';
const PAGES = {
  hub: ['Racks you can see through', 'Free rack density calculator, plus 3D twins for the homelab and the data center.'],
  home: ['Your homelab rack, in 3D.', 'Watts, cost per month, cables and what goes dark when one thing fails.'],
  try: ['Try it: your rack in 3D', 'Demo lab and import template. No account, nothing stored.'],
  calculator: ['Rack Density Calculator', 'Devices per rack by space, power and cooling, plus cost per month.'],
  pricing: ['Free, $5 or $20 a month', 'Try stores nothing. Account keeps your lab. Pro explains it.'],
  learn: ['Homelab guides & calculators', 'Power cost, tokens per watt, 10-inch racks, Proxmox power.'],
  'tokens-per-watt': ['Tokens per watt', 'Tokens per kWh and cost per million tokens for your local AI box.'],
  '10-inch-mini-rack-planner': ['10-inch mini rack planner', 'Will it fit? Width, depth and U, plus a power budget.'],
  'homelab-power-calculator': ['What your homelab costs', 'Average watts × 730 ÷ 1,000 × your price per kWh, device by device.'],
  'proxmox-power-usage': ['Proxmox power usage', 'Measure it at the wall, then cut idle watts. Payback calculator.'],
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const bg = await sharp('src/assets/shots/overview.png').resize(1200, 630, { fit: 'cover', position: 'right' }).modulate({ brightness: 0.55 }).toBuffer();
for (const [name, [title, sub]] of Object.entries(PAGES)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b0a09" stop-opacity=".97"/><stop offset=".62" stop-color="#0b0a09" stop-opacity=".8"/><stop offset="1" stop-color="#0b0a09" stop-opacity=".1"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <g transform="translate(64,62) scale(2)"><rect width="16" height="16" rx="1" fill="#f2f1ee"/><rect x="3" y="2" width="10" height="2" fill="#0b0a09"/><rect x="3" y="5" width="10" height="2" fill="#0b0a09"/><rect x="3" y="8" width="10" height="2" fill="#0b0a09"/><rect x="3" y="11" width="10" height="2" fill="#0b0a09"/><rect x="11" y="2" width="2" height="2" fill="#e57000"/><rect x="11" y="5" width="2" height="2" fill="#22c55e"/></g>
    <text x="110" y="90" font-family="Menlo, Courier, monospace" font-size="26" font-weight="700" letter-spacing="4" fill="#f2f1ee">RACK<tspan fill="#e57000">DENSITY</tspan></text>
    <text x="64" y="300" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#f2f1ee">${esc(title)}</text>
    <text x="64" y="370" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#a8a5a0">${esc(sub)}</text>
    <text x="64" y="566" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#e57000">${esc(PRODUCT_NAME)} · demo lab, simulated data</text>
  </svg>`;
  await sharp(bg).composite([{ input: Buffer.from(svg) }]).png({ compressionLevel: 9, palette: true }).toFile(name === 'hub' ? 'public/og/hub.png' : `public/homelab/og/${name}.png`);
  console.log(name);
}
await sharp(readFileSync('public/brand/favicon-rackdensity.svg'), { density: 1200 }).resize(512, 512).png().toFile('public/icon-512.png');
console.log('icon-512.png');
