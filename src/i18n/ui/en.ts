// UI strings, English (the base). de.ts and zh.ts override any subset; anything missing falls back to these.
// Placeholders in {braces} are replaced by the caller. Product and brand names never go through this file.
export const en = {
  skip: 'Skip to content',
  menu: 'Menu', products: 'Products', theme: 'Theme', language: 'Language', main: 'Main', sectionMenu: '{name} menu',
  allProducts: '{brand}: all products', breadcrumb: 'Breadcrumb', by: 'by',
  themeAuto: 'Auto', themeDark: 'Dark', themeBright: 'Bright', themeAutoTitle: 'Auto (follows your system)',
  themeAutoAria: 'Auto theme', themeDarkAria: 'Dark theme', themeBrightAria: 'Bright theme',
  company: 'Company', brandSuffix: '(brand)', legal: '© 2026 {company} · {a} and {b} are brands of {company} · figures marked estimated are estimates',
  faq: 'Questions', fallbackNote: 'Parts of this page are not translated yet and are shown in English.', englishOnly: 'English',
  seeIt: 'See it', walkthrough: 'Request a walkthrough', seeIn3D: 'See it in 3D', seeOnRack: 'See it on your rack',
  simulated: 'simulated data', demoLab: 'Demo lab', transcript: 'What the clip shows', impressum: 'Legal notice',
  /** Nav and footer labels, keyed by the English label (also used for DC labels until DC adds its own). */
  labels: {
    Calculator: 'Calculator', Devices: 'Devices', Learn: 'Learn', Pricing: 'Pricing', Changelog: 'Changelog', 'See it': 'See it',
    'All products': 'All products', 'Rack Density Calculator': 'Rack Density Calculator', 'UPS Runtime Calculator': 'UPS Runtime Calculator',
    'Device database': 'Device database', Overview: 'Overview', Privacy: 'Privacy', 'Legal notice': 'Legal notice',
    Product: 'Product', Integrations: 'Integrations', Partners: 'Partners', Resources: 'Resources', 'Excel template': 'Excel template',
    Guides: 'Guides', 'Security & data': 'Security & data', Contact: 'Contact', Waitlist: 'Waitlist', Comparisons: 'Comparisons', 'Famous data centers': 'Famous data centers',
  } as Record<string, string>,
  usd: '${n}',
  mail: { walkSubject: '{p} walkthrough', walkBody: 'I would like a walkthrough of {p}. My lab: (rack size, devices, what you want to see).', notifySubject: 'Tell me when {p} Try opens', notifyBody: 'One e-mail when the self-serve Try opens, please.' },
  stage: {
    view: 'View', lights: 'Lights', on: 'On', off: 'Off', fail: 'Fail UPS-A', restore: 'Restore', chooseView: 'Choose a view',
    note: 'Recorded from the app. Every control here swaps a clip.', say: '{view} view, lights {lights}', failed: ', UPS-A failed',
    lightsSay: { on: 'on', off: 'off' } as Record<string, string>,
    readout: { homelab: '1.02 kW · €165/mo · UPS 18 min', dc: 'IT 79.1 kW · PUE 1.16 · ▲ 2 alarms' } as Record<string, string>,
    views: { overview: 'Overview', power: 'Power', cables: 'Cables', tokens: 'Tokens', network: 'Network', cabling: 'Cabling', estate: 'Estate' } as Record<string, string>,
  },
  video: { play: 'Play', pause: 'Pause', playAria: 'Play the video', pauseAria: 'Pause the video' },
  price: { label: 'Electricity price', currency: 'Currency', perKwh: 'Price per kWh', hint: 'per kWh: use the price on your bill' },
  density: {
    startFrom: 'Start from', presetsNote: 'Homelab values are typical starting points, not measurements. Change any field.',
    presets: { '10': '10" mini rack (8U)', '12': '12U wall rack', '22': '22U half rack', '42': '42U full rack' } as Record<string, string>,
    rackU: 'Rack height (U)', rackUHint: '42U full · 22–24U half · 12U wall · 6–12U 10-inch',
    devU: 'Device size (U each)', devU8: '8U (GPU / blade)',
    watts: 'Power draw per device (W)', wattsHint: 'Mini PC 10–40 W · NAS 30–80 W · 1U/2U server 100–400 W · GPU box 300–1,200 W',
    cooling: 'Cooling capacity (kW)', coolingHint: 'Closet with a fan ≈ 0.3–1 kW · basement room ≈ 1–3 kW · data-center row 5–30 kW',
    circuit: 'Circuit', single: 'Single-phase', three: 'Three-phase', pf: 'Power factor', unitU: 'U', uN: '{n}U',
    perRack: 'Devices per rack', draw: 'Draw', cost247: 'If it runs 24/7', status: 'Status', util: 'Space · Power · Cooling', perMonth: '/ month',
    ok: 'OK', tight: 'Tight', critical: 'Critical', space: 'Space', power: 'Power', coolingW: 'Cooling',
    msgCritical: '{word} is the bottleneck and has no safe margin. Add capacity or lower density.',
    msgWarn: '{word} is the bottleneck, with under 20 % headroom.', msgOk: '{word} is the limit; power and cooling keep ≥ 20 % headroom.',
    foot: 'Cost = draw (kW) × 730 hours × your price. An estimate: real draw depends on load. Green needs ≥ 20 % headroom on power and cooling.',
  },
  diagram: { unitU: 'U', one: '{n} device', devices: '{n} devices', perMonth: '/month', limit: 'limit', of: 'of {x}', caption: 'Schematic. Devices fill from the bottom; the glowing gauge is what runs out first.' },
};
export type UI = typeof en;
