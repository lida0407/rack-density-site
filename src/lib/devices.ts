// Device database (/devices/): the public catalog subset (specs + list prices, CC BY 4.0). Nothing else from the
// catalog is published (no components, LEDs or performance) — SEO decisions 2026-10-15 §2.
import data from '../data/devices/public.json';

export interface Device {
  id: string; vendor: string; model: string; name: string; category: string; status: string;
  rack_units: number | null; form_factor: string | null;
  dimensions_mm: { width_body: number | null; height: number | null; depth: number | null } | null;
  weight_kg: number | null; power_w: { idle: number | null; typical: number | null; max: number | null } | null;
  ports: { kind: string; count: number }[] | null; ports_summary: string | null; airflow: string | null;
  list_price: { usd: number; date: string | null; kind: string | null; config?: string | null; source: string | null } | null;
  sources: { tier?: number; title?: string; url: string; retrieved?: string }[]; estimated: string[]; updated: string;
}
export const CATALOG = data as unknown as { name: string; license: string; license_url: string; attribution: string; notice: string; count: number; devices: Device[] };
export const DEVICES = CATALOG.devices;

export const CATEGORIES: Record<string, { label: string; one: string; edition: 'homelab' | 'dc' | 'both' }> = {
  server: { label: 'Servers', one: 'server', edition: 'both' }, switch: { label: 'Network switches', one: 'switch', edition: 'both' },
  mini_pc: { label: 'Mini PCs', one: 'mini PC', edition: 'homelab' }, gpu: { label: 'GPUs', one: 'GPU', edition: 'both' },
  gpu_server: { label: 'GPU servers', one: 'GPU server', edition: 'dc' }, ups: { label: 'UPS', one: 'UPS', edition: 'both' },
  drive: { label: 'Drives', one: 'drive', edition: 'homelab' }, rack: { label: 'Racks', one: 'rack', edition: 'both' },
  storage: { label: 'Storage arrays', one: 'storage array', edition: 'dc' }, nas: { label: 'NAS', one: 'NAS', edition: 'homelab' },
  psu: { label: 'Power supplies', one: 'power supply', edition: 'homelab' }, rack_pdu: { label: 'Rack PDUs', one: 'rack PDU', edition: 'dc' },
  cpu: { label: 'CPUs', one: 'CPU', edition: 'both' }, cdu: { label: 'Coolant distribution units', one: 'CDU', edition: 'dc' },
  crah: { label: 'Cooling units (CRAH)', one: 'cooling unit', edition: 'dc' }, sbc: { label: 'Single-board computers', one: 'single-board computer', edition: 'homelab' },
  genset: { label: 'Generators', one: 'generator', edition: 'dc' }, fire_suppression: { label: 'Fire suppression', one: 'fire suppression system', edition: 'dc' },
  accelerator: { label: 'AI accelerators', one: 'AI accelerator', edition: 'dc' }, enclosure: { label: 'Enclosures and 10-inch accessories', one: 'enclosure', edition: 'homelab' },
  fire_detection: { label: 'Fire detection', one: 'fire detection system', edition: 'dc' }, inrow: { label: 'In-row cooling', one: 'in-row cooler', edition: 'dc' },
  leak_detection: { label: 'Leak detection', one: 'leak detection system', edition: 'dc' }, router: { label: 'Routers', one: 'router', edition: 'homelab' },
  ap: { label: 'Wi-Fi access points', one: 'access point', edition: 'homelab' }, rack_system: { label: 'Rack-scale systems', one: 'rack-scale system', edition: 'dc' },
  rear_door_hx: { label: 'Rear-door heat exchangers', one: 'rear-door heat exchanger', edition: 'dc' },
};
export const catLabel = (c: string) => CATEGORIES[c]?.label ?? c.replace(/_/g, ' ');
export const catSlug = (c: string) => c.replace(/_/g, '-');
export const deviceParts = (d: Device) => { const [c, vendor, model] = d.id.split('/'); return { category: catSlug(c), vendor, model }; };
export const devicePath = (d: Device) => { const p = deviceParts(d); return `/devices/${p.category}/${p.vendor}/${p.model}`; };
export const byCategory = () => {
  const m = new Map<string, Device[]>();
  for (const d of DEVICES) (m.get(d.category) ?? m.set(d.category, []).get(d.category)!).push(d);
  for (const list of m.values()) list.sort((a, b) => a.vendor.localeCompare(b.vendor) || a.model.localeCompare(b.model));
  return new Map([...m].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])));
};

export { median } from './calc/stats';
/** Which published values are our estimates (the export names source fields such as power.idle_w). */
export const isEstimated = (d: Device, field: 'idle' | 'typical' | 'max' | 'weight') =>
  field === 'weight' ? d.estimated.some((e) => e === 'weight_kg' || e === 'weight_kg.net') : d.estimated.includes(`power.${field}_w`);
const n0 = (x: number) => x.toLocaleString('en-US', { maximumFractionDigits: x < 10 ? 1 : 0 });
export const fmtW = (x: number | null | undefined) => (x == null ? '—' : `${n0(x)} W`);
export const fmtNum = n0;
/** "List $1,299 (2023)" — the year matters (most prices are launch list prices); null → nothing, never $0. */
export const fmtPrice = (d: Device) => {
  const p = d.list_price; if (!p || !p.usd) return null;
  const year = p.date ? ` (${p.date.slice(0, 4)})` : '';
  return `List $${p.usd.toLocaleString('en-US', { maximumFractionDigits: 0 })}${year}`;
};
export const PRICE_KIND: Record<string, string> = { launch_msrp: 'launch list price', vendor_store: "vendor's store price", reseller: 'reseller price' };
