---
title: "LibreNMS in 3D: links, sensors and ports — DC Sim"
description: "A planned LibreNMS connector for DC Sim: LLDP links as cables, PDU and UPS sensors as readings, port counters as link utilisation on a 3D data center twin."
h1: "LibreNMS, in 3D"
navLabel: "LibreNMS"
directAnswer: "A LibreNMS connector for DC Sim is planned. It would read LibreNMS through its API with a read-only token and place what LibreNMS already discovers on the 3D twin: links, power sensors and port traffic. Today, LibreNMS data reaches DC Sim as exports into the template sheets."
section: "integrations"
order: 7.5
badge: "planned"
badgeNote: "Requests decide which connector comes next."
faq: [{"q": "Does DC Sim connect to LibreNMS today?", "a": "Not directly. The LibreNMS connector is planned. Today you can export devices and sensor values from LibreNMS and import them through the template sheets (Devices, Cables, Readings)."}, {"q": "What would the LibreNMS connector map?", "a": "LLDP neighbours to cables and the Network layer, SNMP sensors on PDUs and UPSs (load, current, runtime, battery, on-battery state) to readings on the Power layer, and port counters to link utilisation in the Network view."}, {"q": "Would it change anything in LibreNMS?", "a": "No. It would use a read-only API token and write nothing back. LibreNMS keeps monitoring; DC Sim adds the room, the power chain and the what-if."}, {"q": "How do I get it sooner?", "a": "Press \"I want this\" on this page and leave your e-mail. Connectors are built in the order people ask for them, and we write when it is ready to try."}]
---

## What it would map

LibreNMS already discovers most of what a twin needs, so the connector would mostly place it: **LLDP neighbours** become cables between the right ports and the links of the Network layer, so the topology and a cable trace come from what the switches report rather than a hand-made sheet; **SNMP sensors on PDUs and UPSs** (load, current per outlet or phase, runtime, battery charge, on-battery state) become readings on the matching nodes of the Power layer, where you can fail a UPS and see what goes dark; and **port counters** become link utilisation in the Network view. Devices would be matched to the twin by hostname, sysName or serial, and anything that does not match would be listed for you to bind once.

## Today

Export from LibreNMS and import through the [template sheets](../../resources/excel-template/): devices into Devices, links into Cables, sensor values into Readings. You get the same import report and checks as any Excel upload, and the room in 3D.
