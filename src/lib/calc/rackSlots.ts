// Slot layout for the rack diagram (CALCULATOR-PAGE.md §3): how many U slots to draw, how many devices fit in the
// drawing, and how many are left over for the "… ×N" label. DOM-free so it is unit-tested.
export const SLOT_CAP = 60;
export interface SlotLayout { slots: number; perDevice: number; drawn: number; more: number }

export function rackSlots(rackU: number, serverU: number, servers: number, cap = SLOT_CAP): SlotLayout {
  const slots = Math.max(1, Math.min(Math.floor(rackU) || 1, cap));
  const perDevice = Math.max(1, Math.min(Math.round(serverU) || 1, slots));
  const drawn = Math.max(0, Math.min(Math.floor(servers) || 0, Math.floor(slots / perDevice)));
  return { slots, perDevice, drawn, more: Math.max(0, (Math.floor(servers) || 0) - drawn) };
}
