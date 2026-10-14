// Rack Density Calculator presets: used by the calculator (/calculator/) and the hub teaser links (?preset=<id>).
export const DENSITY_PRESETS = [
  { id: '10', label: '10" mini rack (8U)', rackU: 8, serverU: 1, w: 35, cool: 0.5 },
  { id: '12', label: '12U wall rack', rackU: 12, serverU: 1, w: 60, cool: 1 },
  { id: '22', label: '22U half rack', rackU: 22, serverU: 2, w: 150, cool: 2 },
  { id: '42', label: '42U full rack', rackU: 42, serverU: 2, w: 250, cool: 5 },
] as const;
export const DENSITY_DEFAULT = DENSITY_PRESETS[3];
