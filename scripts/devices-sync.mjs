// Copy the public device catalog (DC dev: ~/Sensaka/dc-catalog/dist/public.{json,csv}, CC BY 4.0) into the site.
// Run: npm run devices (CI never reads the plan repo; the copies are committed). SEO-GEO-PLAN §4.1 + SEO decisions §2.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const SRC = process.env.CATALOG_DIST ?? join(process.env.HOME, 'Sensaka/dc-catalog/dist');
mkdirSync('src/data/devices', { recursive: true }); mkdirSync('public/devices', { recursive: true });
const data = JSON.parse(readFileSync(join(SRC, 'public.json'), 'utf8'));
if (!Array.isArray(data.devices) || data.devices.some((d) => 'components' in d || 'performance' in d || 'render' in d)) throw new Error('public.json must hold the published subset only');
copyFileSync(join(SRC, 'public.json'), 'src/data/devices/public.json');
copyFileSync(join(SRC, 'public.json'), 'public/devices/rack-density-devices.json');
copyFileSync(join(SRC, 'public.csv'), 'public/devices/rack-density-devices.csv');
copyFileSync(join(SRC, 'PUBLIC-LICENSE.txt'), 'public/devices/LICENSE.txt');
console.log(`devices: ${data.devices.length} records (${data.license}) copied`);
