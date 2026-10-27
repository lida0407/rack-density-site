// Site icons from the RACKDENSITY mark (public/brand/favicon-rackdensity.svg, a 16-px pixel design), rendered by sharp:
// /favicon.ico (16, 32, 48 px PNG frames in an ICO container), /apple-touch-icon.png (180 px, opaque: iOS rounds the corners
// itself), /icon-192.png and /icon-512.png (site.webmanifest, schema logo). Run: npm run icons (the files are committed).
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/brand/favicon-rackdensity.svg');
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(svg, { density: (72 * s) / 16 }).resize(s, s).png().toBuffer()));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s % 256, e); head.writeUInt8(s % 256, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(pngs[i].length, e + 8); head.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([head, ...pngs]));
console.log(`public/favicon.ico: ${sizes.join(', ')} px, ${offset} bytes`);
const BG = '#f2f1ee'; // the mark's own light tile
const png = (s, opaque) => { const i = sharp(svg, { density: (72 * s) / 16 }).resize(s, s); return (opaque ? i.flatten({ background: BG }) : i).png().toFile(`public/${s === 180 ? 'apple-touch-icon' : `icon-${s}`}.png`); };
await Promise.all([png(180, true), png(192, false), png(512, false)]);
console.log('public/apple-touch-icon.png (180, opaque), icon-192.png, icon-512.png');
