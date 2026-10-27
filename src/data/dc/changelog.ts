// Public wording of the DC Sim build log (dcsim-plan: share/updatedc.md, the truth source). Newest first. Used by the
// changelog page and the feeds (/dc/rss.xml, the site-wide /rss.xml and /llms-full.txt via src/pages/dc/_feed.ts).
// Only shipped and deployed work goes here; unfinished items go in `inProgress`.
export interface ChangelogEntry { id: string; date: string; title: string; items: string[] }

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: "airflow-heat-visible",
    date: "2026-10-24",
    title: "Airflow and heat you can see",
    items: [
      "Rack fronts are coloured band by band up the rack with the inlet temperature the zonal model estimates, on the same scale as the floor heat map. In a cooling what-if they change live: stop AC-1 and the fronts go from blue to amber while the floor turns red.",
      "An Airflow switch in the Air view shows the air moving from supply through the racks to the return; particle speed follows each rack's load. Racks with a rear door exhale air cooled to the door's supply temperature.",
      "Coolant along the pipes takes the CDU's supply temperature and each rack's return temperature. All of it is estimated and labelled, not CFD.",
    ],
  },
  {
    id: "trays-sag-cables",
    date: "2026-10-24",
    title: "Cable trays, sag and every cable drawn",
    items: [
      "Ladder trays are drawn where the cables run: a data level and a power level over the racks, with crossings at the row ends.",
      "Free spans hang with a realistic sag, from the service loop at each port to plant that sits outside a rack; cables in a tray lie on it.",
      "Every cable is drawn as a line in one pass (910 in the demo hall); traced cables and the ones near the camera become full tubes, so the room stays smooth.",
    ],
  },
  {
    id: "device-fronts-rears",
    date: "2026-10-23",
    title: "Device fronts and rears from the catalog",
    items: [
      "152 rack models show their real front and rear: drive bays, network ports with link and activity LEDs, SFP and QSFP cages, power supplies, fans, PCIe slots, displays and control panels, in the vendor's colours.",
      "Each face is drawn once per model and reused, so a full hall keeps its frame rate.",
    ],
  },
  {
    id: "lights-off-leds",
    date: "2026-10-15",
    title: "Lights off with each device's own LEDs",
    items: [
      "162 models carry the LED legend from their manual: position, colour and pattern (solid, activity, blinking, breathing). Identify and fault LEDs stay dark until there is a fault.",
      "A model without a legend uses the default set for its kind (server, GPU, storage, switch, UPS, PDU and others).",
    ],
  },
  {
    id: "template-1-5-liquid",
    date: "2026-10-15",
    title: "Liquid loops in the import (template v1.5)",
    items: [
      "An optional Liquid sheet adds CDUs, manifolds, direct liquid cooling, immersion and rear-door heat exchangers to a loop, with the racks each one serves.",
      "Leak what-if per manifold: the leaking manifold's valve closes (noted as assumed) and only its racks lose cooling.",
      "Cooling units can name the chiller that feeds them; the Excel export writes loops and chillers back, and older files still import.",
    ],
  },
  {
    id: "imagined-giants",
    date: "2026-10-15",
    title: "Imagined giants: three fictional gigawatt campuses",
    items: [
      "A 5 GW AI campus, a 1 GW hydro and seawater fjord campus and a 1 GW solar and storage hub, designed in DC Sim from catalog devices and public numbers, each with one fully modelled hall you can open and fail.",
      "Every figure is from the engine and labelled; each giant is marked Imagined, a fictional design. See them on the famous data centers page.",
    ],
  },
  {
    id: "estate-globe",
    date: "2026-10-15",
    title: "Estate view: every site on one globe (template v1.4)",
    items: [
      "New Sites and Links sheets put each site at its coordinates with IT kW and PUE, and draw WAN and cable links as arcs with bandwidth, latency and protection. NetBox sites with coordinates and circuits come in the same way.",
      "Import checks for a site without coordinates, a link to an unknown site, latency below the physical minimum, unprotected replication links and links above 80 % utilisation.",
      "Cut a link or lose a site to see which sites are isolated, then fly into any hall. The globe has country borders and an optional photo earth.",
      "Famous data centers: 100 well-known sites and 25 estates from public data, which you can open and run the same what-ifs on.",
    ],
  },
  {
    id: "open-device-data",
    date: "2026-10-15",
    title: "Open device data",
    items: [
      "The specs and dated list prices behind the device catalog are published as open data under CC BY 4.0, with sources, and the values we estimate are marked.",
    ],
  },
  {
    id: "template-1-2-device-picker",
    date: "2026-10-14",
    title: "Device picker, custom devices, Excel export (template v1.2)",
    items: [
      "Add a device from the catalog in a few clicks (category, brand, model, or search), with its drawn front panel, size, weight, power and ports; place it at a free U or outside a rack.",
      "Describe a device the catalog does not know (brand, model, size, power, ports) and reuse it by name; a UPS or PDU added this way becomes part of the power chain.",
      "Export the model as the filled Excel template; it re-imports to the same devices, custom devices, cables and power chain. Template v1.2 adds the optional CustomDevices sheet.",
    ],
  },
  {
    id: "zabbix-netbox",
    date: "2026-10-14",
    title: "Connect Zabbix and NetBox",
    items: [
      "Connect NetBox or Zabbix from the ⋯ menu: paste the URL and a read-only API token, press Test, preview, import. Tested against live demo instances (NetBox 4.7 with 24 sites, Zabbix 6.0 with 1,417 hosts).",
      "NetBox: pick one site; its racks, devices, cables, power panels, feeds and PDUs, and VLANs become the template sheets, with the same import report and checks as an Excel upload. Older and newer token formats both work.",
      "Zabbix: hosts are matched to devices by name; power, temperature, UPS and CPU values become readings; open problems become alarms on the device.",
      "Inside your own network, the same connectors run in the agent, which only dials out.",
    ],
  },
  {
    id: "lights-off",
    date: "2026-10-14",
    title: "Lights off, and a brighter room",
    items: [
      "Lights On, Off and Auto: in the dark, every LED on a device front blinks with its simulated load, screens and aisle strips stay lit, devices that are off go dark. The Power layer shows the lighting load and the monthly saving; still 60 frames per second.",
      "Rooms are drawn bright by default: light tiles, off-white walls and ceiling light panels.",
    ],
  },
  {
    id: "template-1-1",
    date: "2026-10-14",
    title: "Template v1.1: phase balance, UPS runtime from your sheet, unracked devices",
    items: [
      "Phase balance: with phases on power cables and power items (L1/L2/L3), every three-phase node shows its per-phase load; a phase above 80 % of its share, or an imbalance above 15 %, is flagged. Without phase data the import report says so.",
      "UPS runtime comes from your runtime_min or battery_kwh first, then the catalog, otherwise it is estimated and labelled; failing one UPS shortens the other's runtime with its new load.",
      "Devices with an empty U are kept as devices outside a rack, on an open shelf named after their location, instead of being skipped.",
      "Mini racks: width_in = 10 draws a 10-inch rack (also inferred from the rack name). The power type accepts wall outlet.",
      "Additions only: nothing was renamed, so v1.0 files still import.",
    ],
  },
  {
    id: "view-menu",
    date: "2026-10-14",
    title: "One View menu instead of a wall of buttons",
    items: [
      "A single View dropdown groups the nine layers (Facility: Floor, Air, Water, Fire, Power · Connectivity: Cabling, Network · IT: Device, Token), with a one-line hint and an issue count per view.",
      "A Mode dropdown (Design, Monitor, Simulate, Replay) changes the side panel and the primary button; Import is always one click.",
      "At rest the desktop screen shows six controls plus the time slider; on a phone, four. Views keep 60 frames per second on desktop and phone emulation.",
    ],
  },
  {
    id: "excel-import-first",
    date: "2026-10-14",
    title: "Excel import, Cabling, Power and Network views, Fail what-if",
    items: [
      "Excel or CSV import with a preview, an import report, checks pinned in 3D and a change list on re-upload. Values only: formulas, macros, encrypted and oversized files are refused.",
      "Cabling view: every cable routed through rear managers, trays or under the floor; trace any cable end to end.",
      "Power one-line diagram with A/B paths and load per node, and a Network topology built from the cables. Click any node, Fail, and see what goes dark, what survives on one feed and which services stop.",
      "Scenario library generated from the model: utility loss, generator failure, feed loss, UPS, cooling and liquid failures, leak, fire, more load.",
    ],
  },
];

export const IN_PROGRESS = [
  "Live connectors for Prometheus and Grafana, Redfish, SNMP and the other monitoring tools",
  "AI design assistant",
];
