// Proof clips and the home hero loop: what is on screen, in order (= the burned-in captions), for the visible
// transcript under each clip and the VideoObject schema (SEO-GEO-PLAN §3: transcripts are indexable text).
// Durations from ffprobe; uploadDate = the day the recording was published on the site.
export interface ClipMeta { title: string; seconds: number; uploadDate: string; transcript: string[] }

export const CLIPS: Record<string, ClipMeta> = {
  "feed-a-fails-lightsoff": {
    title: "Lose feed A at peak in DC Sim",
    seconds: 31,
    uploadDate: "2026-10-14",
    transcript: [
      "Demo hall: 13 racks, fed from feed A and feed B, in the Power layer with the room lights off.",
      "Lose feed A at peak: the one-line power diagram shows the chain from utility and generator through the ATS, UPS-A and UPS-B, the panels and every rack PDU.",
      "Fail UPS-A. Banner: 2 devices lose power, 90 run on one feed, overloaded: PDU-R05-B at 113.9 %.",
      "Single-corded devices go dark and the other PDU overloads; the 3D room shows the racks on one feed in amber.",
      "The scenario timeline lists which services stop and which racks survive on one feed.",
      "End card: Fail anything. See what goes dark.",
    ],
  },
  "crah-stops": {
    title: "A cooling unit stops: minutes to 27, 32 and 35 °C",
    seconds: 31,
    uploadDate: "2026-10-14",
    transcript: [
      "Air layer: rack inlet temperatures as a floor heat map, estimated.",
      "The CRAH unit AC-1 stops at peak load (Simulate failure in its inspector).",
      "The scenario panel shows the minutes until the hottest rack inlet passes 27, 32 and 35 °C (10:35, 21:15 and 28:00 in this run), estimated by a zonal air model, not CFD; peak inlet 35.9 °C, no devices off.",
      "The alarm comes with advice before the real one: the remaining units AC-2 and AC-3 run at 95 % of capacity.",
      "End card: Design it. Run it. Fail it first.",
    ],
  },
  leak: {
    title: "Manifold leak on a liquid-cooled GPU row",
    seconds: 31,
    uploadDate: "2026-10-14",
    transcript: [
      "Water layer: coolant distribution units, manifolds and the liquid-cooled GPU rows of the AI hall demo.",
      "A leak at manifold R02.",
      "1.4 L released (estimated); the valve isolates the manifold; 2 devices (16 GPUs) are throttled or trip; tokens lost: 7.8 M.",
      "Who is on this loop and what they run: the racks, devices, workloads and tenants on the isolated manifold.",
      "End card: Liquid and air in one model.",
    ],
  },
  "excel-to-3d": {
    title: "From an Excel file to a 3D data center twin",
    seconds: 50,
    uploadDate: "2026-10-14",
    transcript: [
      "One file: the demo hall workbook in Excel. Devices is the only required sheet (rack, U, model, name, role, power cords, owner, warranty, what runs on it); the Cables sheet adds the cords.",
      "Import: the preview counts 121 devices, 13 racks, 910 cables and 35 power items and lists the matched models.",
      "Checks with 3D locations: U overlaps, breakers above 80 %, both power supplies on the same feed, heat above cooling.",
      "Apply: the room builds from the spreadsheet; Overview, Power (load per rack) and the Cabling view.",
      "Back in Excel one row is edited (a server moved from U2 to U30) and the file re-uploaded: the change list shows exactly what changed.",
      "End card: Download the template.",
    ],
  },
};

/** The 30 s home hero loop (dark = lights off; the bright take shows the same beats in a lit room). */
export const HERO_CLIP: ClipMeta = {
  title: "DC Sim tour: views, a UPS failure, network, tokens and lights off",
  seconds: 30,
  uploadDate: "2026-10-14",
  transcript: [
    "Overview of the demo hall in 3D.",
    "The View menu opens and the cursor moves down the layers: Floor, Air, Water, Fire, Power, Cabling, Network, Device, Token.",
    "Power: load per rack in 3D, then the one-line diagram; UPS-A is failed and the impact banner reads: 2 devices lose power, 90 run on one feed, PDU-R05-B at 113.9 %.",
    "Network: utilisation on every link, and one cable traced end to end.",
    "Token: tokens per second per rack as bars with numbers, coloured by tokens per kWh.",
    "Lights off: the room goes dark, device LEDs blink, and walking in lights one row.",
  ],
};

export const isoDuration = (s: number) => `PT${Math.floor(s / 60) ? `${Math.floor(s / 60)}M` : ""}${s % 60}S`;
