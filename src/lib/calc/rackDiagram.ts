// Live rack diagram for the Rack Density Calculator (CALCULATOR-PAGE.md §3). The SVG markup is static
// (components/calc/RackDiagram.astro); drawRack() only moves devices and toggles classes/attributes.
import type { DensityResult, DensityInput } from './rackDensity';
import { rackSlots } from './rackSlots';

export const G = { x: 46, w: 148, top: 78, h: 288, gaugeTop: 96, gaugeH: 220 } as const;
export const level = (u: number, axis: 'space' | 'power' | 'cooling') => (axis === 'space' ? 'data' : u > 0.95 ? 'crit' : u > 0.8 ? 'warn' : 'ok');
/** y and height of device i (0 = bottom) for a layout. */
export const devBox = (i: number, slots: number, perDevice: number) => {
  const sh = G.h / slots;
  return { y: G.top + G.h - (i + 1) * perDevice * sh + 0.75, h: Math.max(1.5, perDevice * sh - 1.5) };
};
const f2 = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // same as the tiles

const timers = new WeakMap<Element, number[]>();
export function drawRack(root: Element, r: DensityResult, i: DensityInput, cost: string) {
  const svg = root.querySelector('svg')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L = rackSlots(i.rackU, i.serverU, r.servers);
  const set = (sel: string, k: string, v: string) => svg.querySelectorAll(sel).forEach((e) => e.setAttribute(k, v));
  svg.querySelector('[data-d="head"]')!.textContent = `${r.servers} devices · ${f2(r.drawKw)} kW · ${cost}/month`;
  svg.querySelector('[data-d="more"]')!.textContent = L.more ? `… ×${r.servers}` : '';
  svg.querySelector('[data-d="circ"]')!.textContent = `${i.supply.volts} V · ${i.supply.amps} A${i.supply.phase === 'three' ? ' · 3φ' : ''}`;
  // Empty slots (dashed) and device positions.
  svg.querySelectorAll<SVGRectElement>('.slot').forEach((s, k) => {
    const b = devBox(k, L.slots, 1);
    s.classList.toggle('off', k >= L.slots); s.setAttribute('y', String(b.y)); s.setAttribute('height', String(b.h));
  });
  const devs = [...svg.querySelectorAll<SVGGElement>('.dev')];
  devs.forEach((d, k) => {
    const b = devBox(k, L.slots, L.perDevice);
    d.parentElement!.setAttribute('transform', `translate(${G.x} ${b.y})`);
    d.querySelector('rect')!.setAttribute('height', String(b.h));
    d.querySelectorAll('circle').forEach((c) => { c.setAttribute('cy', String(b.h / 2)); c.setAttribute('r', String(Math.min(2.4, b.h / 3))); });
  });
  // Devices appear/disappear one at a time (≤ 800 ms for the whole change).
  (timers.get(root) ?? []).forEach(clearTimeout);
  const now = devs.findIndex((d) => !d.classList.contains('on'));
  const cur = now < 0 ? devs.length : now, diff = L.drawn - cur, step = Math.min(30, 800 / Math.max(1, Math.abs(diff)));
  const ids: number[] = [];
  devs.forEach((d, k) => {
    const on = k < L.drawn;
    if (d.classList.contains('on') === on) return;
    const order = on ? k - cur : cur - 1 - k;
    if (reduce) d.classList.toggle('on', on); else ids.push(window.setTimeout(() => d.classList.toggle('on', on), order * step));
  });
  timers.set(root, ids);
  // Gauges: fill = utilisation, colour by rule, the bottleneck pulses.
  (['space', 'power', 'cooling'] as const).forEach((a) => {
    const g = svg.querySelector(`[data-g="${a}"]`)!, u = r.util[a];
    g.setAttribute('class', `gauge g-${level(u, a)}${r.bottleneck === a ? ' limit' : ''}`);
    (g.querySelector('.fill') as SVGElement).style.transform = `scaleY(${Math.min(1, Math.max(0, u))})`;
    g.querySelector('.pct')!.textContent = `${Math.round(u * 100)} %`;
    const [v1, v2] = a === 'space' ? [`${r.servers * i.serverU} U`, `of ${i.rackU} U`] : [`${f2(r.drawKw)} kW`, `of ${f2(a === 'power' ? r.supplyKw : i.coolingKw)} kW`];
    g.querySelector('.v1')!.textContent = v1; g.querySelector('.v2')!.textContent = v2;
  });
  // Power flow speed follows load; heat chevrons follow cooling.
  const flow = svg.querySelector<SVGElement>('.flow')!;
  flow.setAttribute('class', `flow g-${level(r.util.power, 'power')}`);
  flow.style.animationDuration = `${(2.4 - 2 * Math.min(1, Math.max(0, (r.util.power - 0.2) / 0.75))).toFixed(2)}s`;
  const heat = Math.min(1, r.util.cooling), n = 3 + Math.round(3 * heat);
  svg.querySelectorAll<SVGElement>('.chev').forEach((c, k) => {
    c.classList.toggle('off', k >= n);
    c.style.animationDuration = `${(2.8 - 1.4 * heat).toFixed(2)}s`;
  });
  set('.heat', 'class', `heat g-${r.status === 'critical' ? 'crit' : level(r.util.cooling, 'cooling')}`);
  svg.classList.toggle('is-crit', r.status === 'critical');
}
