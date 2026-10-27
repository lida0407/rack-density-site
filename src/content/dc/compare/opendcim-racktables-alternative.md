---
title: "openDCIM and RackTables alternative (2026) — DC Sim"
description: "openDCIM, RackTables and DC Sim from public facts, checked 27 October 2026: project status, licences, what each lists, cost at 10 to 50 racks, moving your data."
h1: "An openDCIM and RackTables alternative for small rooms"
directAnswer: "openDCIM (GPL v3) and RackTables (GPL v2) are free, self-hosted PHP and MySQL web applications for documenting racks, devices and connections. openDCIM also maps power from each device to its source feed and simulates a panel or feed outage; in April 2026 its maintainer announced a search for someone to take over the project, a final release, 26.01, and the retirement of the opendcim.org domain when its registration expires. RackTables' latest stable release is 0.22.0, from February 2022. DC Sim is a different kind of tool: a data center simulator that turns an Excel file, NetBox or Zabbix into a 3D twin you can fail across power, cooling, liquid, fire and network, at $5 per rack per month or one-time per design project. Your openDCIM or RackTables data comes in through the Excel template."
kind: "alternative"
vendor: "openDCIM and RackTables"
order: 5
lastChecked: "2026-10-27"
sources:
  - { label: "openDCIM — project home (goals, features, GPL v3, LAMP requirements, outage simulation)", url: "https://www.opendcim.org/" }
  - { label: "openDCIM — Features (power path mapping, map overlays, outage impact simulation, transfer switches)", url: "https://www.opendcim.org/features.html" }
  - { label: "openDCIM — Downloads (released versions; 23.04 on 15 October 2023)", url: "https://www.opendcim.org/downloads.html" }
  - { label: "openDCIM on GitHub — README (maintainer needed, final release 26.01, domain retirement)", url: "https://github.com/opendcim/openDCIM" }
  - { label: "openDCIM on GitHub — README history (maintainer note added 28 April 2026)", url: "https://github.com/opendcim/openDCIM/commits/master/README.md" }
  - { label: "openDCIM on GitHub — CHANGELOG (changes in 26.01; Data Center Asset Report in Excel; API routes)", url: "https://github.com/opendcim/openDCIM/blob/master/CHANGELOG" }
  - { label: "RackTables — project home (latest stable release 0.22.0, GPL v2, online demo)", url: "https://www.racktables.org/" }
  - { label: "RackTables — About (what it documents; PHP and MySQL)", url: "https://www.racktables.org/about.php" }
  - { label: "RackTables on GitHub — ChangeLog (0.22.0 dated 2022-02-15)", url: "https://github.com/RackTables/racktables/blob/master/ChangeLog" }
  - { label: "RackTables on GitHub — commit history (commits in June 2026)", url: "https://github.com/RackTables/racktables/commits/master" }
  - { label: "NetBox on GitHub (open source under Apache 2)", url: "https://github.com/netbox-community/netbox" }
  - { label: "DC Sim — Pricing", url: "https://rack-density.com/dc/pricing/" }
  - { label: "DC Sim — NetBox integration status", url: "https://rack-density.com/dc/integrations/netbox/" }
faq: [{"q": "Is openDCIM still maintained?", "a": "Its maintainer added a note to the README in April 2026: after nearly 20 years the project needs someone to take over, a final release, 26.01, will be packaged, and the opendcim.org domain will be retired when the registration expires. The newest release on the download page is 23.04 from October 2023 (checked 27 October 2026)."}, {"q": "Is RackTables still maintained?", "a": "Its website lists 0.22.0 as the latest stable release; the ChangeLog dates it 15 February 2022. The GitHub repository has commits from June 2026 (checked 27 October 2026)."}, {"q": "Does openDCIM simulate failures?", "a": "Yes: its features page lists fault tolerance reporting and impact simulation of a panel or source feed outage. DC Sim adds cooling (estimated, zonal model), liquid leaks, fire zones and the network to the same what-if, on a 3D model."}, {"q": "Which free inventory tool does DC Sim connect to?", "a": "NetBox, directly, with a read-only token; it was tested against a NetBox 4.7 demo instance. openDCIM and RackTables data comes in through the Excel template; there is no direct connector for either."}, {"q": "How do I move openDCIM or RackTables data into DC Sim?", "a": "Export racks, devices, connections and power to CSV or Excel, map them to the template's Racks, Devices, Cables and Power sheets, and import. Only Devices is required: rack, U position and model per row."}]
related:
  - { href: "integrations/netbox/", label: "NetBox, in 3D: racks and devices as a twin", kind: "Integration" }
  - { href: "resources/excel-template/", label: "The Excel template that becomes a 3D twin", kind: "Template" }
  - { href: "resources/guides/document-data-center-in-excel/", label: "How to document your data center in Excel", kind: "Guide" }
---

## At a glance

| | openDCIM (public pages) | RackTables (public pages) | DC Sim |
|---|---|---|---|
| What it is | Free web-based DCIM for inventory and capacity | Free data center and server room asset management | Browser-based data center simulator and 3D twin |
| Built for | Replacing spreadsheets for data center inventory, "no matter how small or large" | System and network administrators documenting racks, devices, links and network resources | Small and mid-size data centers and the partners who serve them |
| Licence and price | GPL v3; free | GPL v2; free | Monitor $5 per rack per month ($49 minimum); Design $490–3,900 one-time per project |
| How you run it | Self-hosted LAMP server: Apache with SSL, MySQL 5 or later, PHP 8.0 or later, Linux | Self-hosted PHP application with a MySQL database | In the browser; Excel template today, walkthrough on your own file |
| Status on 27 October 2026 | Maintainer seeking a successor; final release 26.01 announced; newest download 23.04 (October 2023) | Latest stable 0.22.0 (February 2022); repository commits in June 2026 | Commercial product with a public [changelog](../../resources/changelog/) |
| Racks and devices | Cabinets, device templates, chassis, multiple rooms | Racks, enclosures, devices mounted in racks | From your sheet, NetBox or Zabbix: rack, U and model per device |
| Rack and room view | Clickable floor map; graphical cabinet viewer (you supply the images) | Rack diagrams | 3D twin with Floor, Air, Water, Fire, Power, Cabling, Network, Device and Token layers |
| Power | Device → power strip → panel → source feed; integrates with intelligent power strips and UPSs; automatic transfer switches | Not on the public pages | Power chain with A and B feeds, per-phase load and UPS runtime; reads Zabbix directly |
| Failure what-if | Impact simulation of a panel or source feed outage | Not on the public pages | Fail any UPS, feed, breaker, switch, cooling unit or manifold; dark, one-feed and overloaded lists |
| Cooling | Space, power and cooling capacity; temperature overlay on the floor map | Not on the public pages | Estimated minutes to 27, 32 and 35 °C at the rack inlets after a cooling failure (zonal model, not CFD) |
| Network and cabling | Connections inside cabinets and to switches; patch panel path to the endpoint | Physical ports and links; IP addresses and networks, NAT rules, load-balancer configuration | Cabling layer with trace; network topology; fail a switch or link |
| Workflow and users | Basic rack-request workflow; audit log; user rights levels | Users and permissions, tags, file attachments | No asset or change workflows |
| Liquid cooling, tokens per kWh | Not on the public pages | Not on the public pages | Liquid sheet with leak what-if (estimated); Token layer per server and rack |

"Listed" features are those on each project's own pages on the date checked; this is not a review of how well they work.

## Project status, checked 27 October 2026

- **openDCIM.** On 28 April 2026 the maintainer added a "Maintainer needed" note to the README: after nearly 20 years, contributors are invited to take over the project as long as the code stays open source; a final release, 26.01, will be packaged, and the opendcim.org domain will be retired when its registration expires. The newest release on the download page is 23.04 (15 October 2023); the GitHub CHANGELOG lists the changes for 26.01, and the repository had commits in October 2026.
- **RackTables.** racktables.org lists 0.22.0 as the latest stable release, dated 15 February 2022 in the project's ChangeLog. The GitHub repository has commits from June 2026.

## Cost at 10, 20 and 50 racks

| Racks | openDCIM licence | RackTables licence | DC Sim Monitor (per year) | DC Sim Design (one-time, if you plan a room or row) |
|---|---|---|---|---|
| 10 | $0 | $0 | $600 | $490 |
| 20 | $0 | $0 | $1,200 | $490 |
| 50 | $0 | $0 | $3,000 | $1,490 |

The open-source tools cost a server and someone's time to install, patch and back up them; that depends on your setup and is not in the table.

## When openDCIM or RackTables is the better fit

- You want a **free, self-hosted inventory** you own under the GPL, and someone on the team will run a PHP and MySQL server.
- **openDCIM** if you document power paths down to the source feed and its panel and feed outage simulation answers your what-if questions.
- **RackTables** if IP addresses, NAT rules and load-balancer configuration should sit next to the racks and devices.

## When DC Sim is the better fit

- You want the **failure answer across power, cooling, liquid, fire and network** on one 3D model, with estimated thermal impact, not only the power path.
- You are **planning before you buy hardware**: Design mode checks U, weight, breakers and cooling and runs an N−1 audit on a room or row that does not exist yet.
- A **small data center or colocation room** that wants a published price per rack and a 30 % margin for the MSPs and integrators who serve it as partners.
- You run an **AI room** and want tokens per kWh per server next to the power chain.

## Moving your data, or using both

- **Into the template.** Export racks, devices, connections and power from either tool to CSV or Excel. Both keep their data in MySQL, so a query works; openDCIM also has a Data Center Asset Report in Excel and API routes. Map the columns to the [template](../../resources/excel-template/)'s Racks, Devices, Cables and Power sheets: Devices needs only rack, U position and model per row, header names are matched with synonyms, and rows that cannot be read are listed instead of blocking the import. [How to document your data center in Excel](../../resources/guides/document-data-center-in-excel/) walks through each sheet.
- **Keep a free inventory.** If you move your records to NetBox (open source under Apache 2), DC Sim reads a NetBox site directly with a read-only token and re-syncs with a change list ([NetBox, in 3D](../../integrations/netbox/)).
- There is no direct openDCIM or RackTables connector; direct connectors exist today for NetBox and Zabbix only.
