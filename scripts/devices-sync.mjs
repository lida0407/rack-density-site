// Copy the public device catalog (DC dev: ~/Sensaka/dc-catalog/dist/public.{json,csv}, CC BY 4.0) into the site.
// Run: npm run devices (CI never reads the plan repo; the copies are committed). SEO-GEO-PLAN §4.1 + SEO decisions §2.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const SRC = process.env.CATALOG_DIST ?? join(process.env.HOME, 'Sensaka/dc-catalog/dist');
mkdirSync('src/data/devices', { recursive: true }); mkdirSync('public/devices', { recursive: true });
const data = JSON.parse(readFileSync(join(SRC, 'public.json'), 'utf8'));
if (!Array.isArray(data.devices) || data.devices.some((d) => 'components' in d || 'performance' in d || 'render' in d)) throw new Error('public.json must hold the published subset only');
// No "Sensaka" on rack-density.com (Dali 2026-10-15): the attribution names RACKDENSITY only.
const copy = (from, to) => writeFileSync(to, readFileSync(join(SRC, from), 'utf8').replaceAll('by Sensaka / RACKDENSITY', 'by RACKDENSITY'));
copy('public.json', 'src/data/devices/public.json');
copy('public.json', 'public/devices/rack-density-devices.json');
copy('public.csv', 'public/devices/rack-density-devices.csv');
copy('PUBLIC-LICENSE.txt', 'public/devices/LICENSE.txt');
console.log(`devices: ${data.devices.length} records (${data.license}) copied`);
