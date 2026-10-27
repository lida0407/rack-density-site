---
title: "Gratis-Excel-Vorlage fürs Rechenzentrum: Racks, Strom, Kabel"
description: "Eine Datei, zwölf Blätter, nur Devices ist Pflicht. Ergibt einen 3D-Zwilling mit Prüfungen zu Strom, Phasen, Kühlung, Flüssigkühlung, Verkabelung, Netzwerk. Version 1.5."
h1: "Die Excel-Vorlage, aus der ein 3D-Zwilling wird"
navLabel: "Excel-Vorlage"
directAnswer: "Die Vorlage von DC Sim ist eine Excel-Arbeitsmappe mit zwölf Blättern: Devices (Geräte), Cables (Kabel), Sites (Standorte), Rooms (Räume), Racks, Power (Stromversorgung), Networks (Netzwerke), Links (Verbindungen zwischen Standorten), Cooling (Kühlung), Liquid (Flüssigkühlung), CustomDevices (eigene Geräte) und Readings (Messwerte). Pflicht ist nur Devices: je Zeile Rack, HE-Position und Modell. Jedes weitere Blatt schaltet eine weitere Ebene des digitalen Zwillings frei. Nach dem Import sehen Sie den Raum in 3D und dazu eine Prüfliste mit Überschneidungen, Überlastungen und Single Points of Failure."
section: "resources"
order: 1
ctaTop: true
faq: [{"q": "Kann ich stattdessen CSV verwenden?", "a": "Ja: eine CSV-Datei pro Blatt mit denselben Spalten; der Importer liest Komma, Semikolon und Tabulator als Trennzeichen."}, {"q": "Was ist, wenn meine Tabelle andere Spaltennamen verwendet?", "a": "Gängige Synonyme werden erkannt; alles andere können Sie in der Kopfzeile umbenennen. Die Reihenfolge der Spalten spielt keine Rolle."}, {"q": "Brauche ich alle zwölf Blätter?", "a": "Nein. Schon Devices allein liefert den Raum in 3D und die Leistung je Rack; weitere Blätter ergänzen Sie, sobald Sie die Daten haben."}, {"q": "Wird meine Datei gespeichert?", "a": "Der Import läuft auf dem Server, liest nur Werte und erstellt Ihr Modell. Bitten Sie uns, Modell und Datei zu löschen, und wir bestätigen dies innerhalb von 30 Tagen. Siehe Sicherheit & Daten."}, {"q": "Ändert sich die Vorlage?", "a": "Blatt- und Spaltennamen sind verbindlich festgelegt und gelten genauso für die Homelab-Edition. Neue optionale Spalten können hinzukommen, wie in Version 1.1; bestehende werden nie umbenannt."}]
clips:
  - { name: "excel-to-3d", title: "Von der Excel-Datei zum 3D-Zwilling", caption: "Die Blätter Devices und Cables, der Import, die Prüfergebnisse in 3D markiert, dann ein erneuter Upload mit Änderungsliste (50 s)." }
---

## Was jedes Blatt freischaltet

| Blatt | Pflichtspalten | Optionale Spalten | Schaltet frei |
|---|---|---|---|
| **Devices** (Pflicht) | rack, u, model | name, role, height_u, power_cords (A/B/AB), serial, owner, warranty_end, runs | 3D-Racks, Gewicht, Leistung und Wärme je Rack, Luftstrom, jedes Gerät öffnen, Garantiehinweise |
| Cables | from_device, to_device, type | from_port, to_port, phase, media, speed, length_m, color, label, vlan, route | Ansicht Verkabelung mit Kabelverfolgung, Strom- und Netzwerkdiagramme, Port-Prüfungen |
| Sites | site, lat, lon | city, country, timezone, role, provider, it_kw, pue | die Standortansicht (Estate): jeder Standort auf dem Globus (Vorlage v1.4) |
| Rooms | room | site, length_m, width_m, height_m, raised_floor_mm, lighting_w, timezone | eine Halle je Raum, Raumgröße und Beleuchtungslast (Vorlage v1.3; `site` ab v1.4) |
| Racks | rack, row, position | room, height_u, depth_mm, width_in, front_faces (A/B), max_kw | das reale Raumlayout, Warm- und Kaltgänge, Rack-Budgets; `depth_mm` (nutzbare Tiefe, Vorlage v1.5) meldet Geräte, die tiefer sind als das Rack |
| Power | name, type, rating | fed_from, feed, rack, voltage, phases, phase, runtime_min, battery_kwh, model | „Was, wenn Einspeisung A, eine USV oder ein Schutzschalter ausfällt?“, Überlastprüfungen |
| Networks | vlan, name | purpose, subnet | VLAN-Farben in der Netzwerkansicht |
| Links | site_a, site_b, type | bandwidth_gbps, latency_ms, utilization_pct, protected, carrier | WAN- und Kabelverbindungen zwischen Standorten; eine Verbindung kappen oder einen Standort verlieren (Vorlage v1.4) |
| Cooling | name, type | capacity_kw, serves, model, chilled_from | Kühlleistung gegen Wärmelast, „Was, wenn AC-1 ausfällt?“; `chilled_from` nennt den Kaltwassersatz, der ein Umluftkühlgerät versorgt, leer = DX (Vorlage v1.5) |
| Liquid | loop, type (dlc, rdhx, immersion), serves | cdu, capacity_kw, supply_c, return_c, flow_lpm, coolant, secondary, manifold | Direktkühlung am Chip, Rücktür-Wärmetauscher und Immersionskühlung mit CDUs und Verteilern; „Was, wenn ein Verteiler leckt?“ (Vorlage v1.5) |
| CustomDevices | name, category | brand, model, height_u, width_in, depth_mm, weight_kg, psu_count, psu_w, idle_w, typical_w, max_w, airflow, inlet_max_c, ports | Geräte, die der Katalog nicht kennt, per Name wiederverwendbar (Vorlage v1.2) |
| Readings | time, item, metric, value | | das Modell, abgeglichen mit Ihrem realen Raum; der CSV-Export jedes Monitoring-Tools passt hierher |

## Was sich seit Version 1.0 geändert hat

Nur Ergänzungen, deshalb lassen sich ältere Dateien weiterhin importieren.

**Version 1.5:** ein optionales Blatt **Liquid**: Jede Zeile fügt einem Kreislauf eine CDU, einen Verteiler oder beides hinzu, vom Typ `dlc` (Direktkühlung am Chip), `rdhx` (Rücktür-Wärmetauscher) oder `immersion`, mit den versorgten Racks (Namen, Reihen oder Bereiche wie `R01-R08`), Leistung, Vor- und Rücklauftemperatur, Durchfluss, Kühlmittel und Sekundärkreis. Die Leckage-Simulation läuft dann je Verteiler: Das Ventil des leckenden Verteilers schließt (als Annahme gekennzeichnet), und nur seine Racks verlieren die Kühlung. Dazu `Cooling.chilled_from` (der Kaltwassersatz, der ein Umluftkühlgerät versorgt; leer = DX-Gerät) und `Racks.depth_mm`: Tragen Sie die nutzbare Racktiefe ein, und der Import meldet jedes Gerät, das tiefer ist als das Rack, anhand der Tiefen aus dem Katalog; bleibt das Feld leer, ist die Tiefe unbekannt und wird nicht geprüft.

**Version 1.4:** optionale Blätter **Sites** (Koordinaten, Rolle, Provider, IT-kW, PUE) und **Links** (zwischen Standorten: Typ, Bandbreite, Latenz, Auslastung, geschützt, Carrier) sowie `Rooms.site`. Daraus entsteht die Standortansicht (Estate): alle Standorte auf einer Erdkugel, die Verbindungen als Bögen und Was-wäre-wenn-Szenarien über Standorte hinweg (Verbindung kappen, Standort verlieren). Der Importbericht markiert einen Standort ohne Koordinaten, eine Verbindung zu einem unbekannten Standort, eine Latenz unter dem physikalischen Minimum, eine ungeschützte Verbindung, über die Replikation läuft, und eine Auslastung über 80 %.

**Version 1.3:** ein optionales Blatt **Rooms** (Größe, Doppelboden, Beleuchtungslast, Zeitzone) und `Racks.room`, um jedes Rack seinem Raum zuzuordnen; jeder Raum wird zu einer eigenen Halle.

**Version 1.2:** ein optionales Blatt **CustomDevices** für Geräte, die der Katalog nicht kennt (Marke, Modell, Größe, Leistung, Ports). Der Importer liest es, und beim Export landet das Modell wieder in denselben Blättern.

**Version 1.1:**

- **Cables:** `phase` (L1, L2, L3) bei Stromkabeln.
- **Power:** `phase`, dazu `runtime_min` und `battery_kwh` in USV-Zeilen; die Spalte `type` akzeptiert `wall outlet` (Wandsteckdose).
- **Racks:** `width_in` (standardmäßig 19, 10 für Miniracks).

Was sie bewirken: Phasen ergeben die Last je Phase und eine Schieflastprüfung an jedem dreiphasigen Knoten (80 % je Phase; Schieflast über 15 % wird markiert); `runtime_min` oder `battery_kwh` legen die USV-Laufzeit fest und haben Vorrang vor dem Katalogwert; `width_in` = 10 zeichnet ein Minirack (wird auch aus einem Namen wie „Mini rack 2“ abgeleitet).

**Geräte ohne HE-Angabe:** Eine Zeile mit leerem `u` bleibt als Gerät außerhalb eines Racks erhalten; ihr Wert in `rack` wird zum Aufstellort und als offenes Regal dargestellt (zum Beispiel ein Switch auf dem Schreibtisch im NOC). Sie wird nie übersprungen.

## Was beim Import passiert

1. Spaltenüberschriften werden ohne Beachtung der Groß- und Kleinschreibung und auch über Synonyme erkannt („U position“, „Rack name“, „Hostname“, „Model number“).
2. Der Modelltext wird mit dem Gerätekatalog abgeglichen (exakt, über Aliase, über Modellcodes, dann unscharf). Unbekannte Modelle werden zu einfachen Quadern in der angegebenen Höhe, mit dem Vermerk „später identifizieren“. Die technischen Daten und Listenpreise des Katalogs sind offen einsehbar: Sie finden sie in den [Gerätedaten](../../../devices/).
3. Fehlende Ebenen erhalten Standardwerte, die als **angenommen** markiert sind (2N-Stromversorgung A/B, reihenweise abwechselnde Gänge, eine Kühlzone); sie werden im Bericht aufgeführt, damit Sie wissen, was Sie ersetzen sollten.
4. Eine Prüfliste mit Positionen in 3D: HE-Überschneidungen, zu schwere Racks, PDU oder Schutzschalter über 80 %, Geräte mit nur einem Netzkabel oder mit beiden Netzteilen an derselben Einspeisung, Wärmelast über der Kühlleistung, Garantieende innerhalb von 12 Monaten, Geräte, die tiefer sind als das Rack (wenn `depth_mm` ausgefüllt ist), unbekannte Modelle, Kabel- und Portprobleme.
5. Erneutes Hochladen bedeutet Aktualisieren. Geräte werden über die Seriennummer zugeordnet, dann über den Namen, dann über Rack und HE; Sie sehen eine Änderungsliste, bevor etwas übernommen wird.

**Grenzen und Sicherheit:** XLSX oder CSV/TSV (Komma, Semikolon, Tabulator; UTF-8, UTF-16, GBK). Nur Werte: Formeln werden nie ausgewertet; Dateien mit Makros, verschlüsselte Dateien und Zip-Bomben werden abgelehnt. 10 MB pro Datei, 50.000 Zeilen pro Blatt. Fehlerhafte Zeilen blockieren nie den Import; jede wird mit Blatt, Zeile und Grund aufgeführt.

## Tipps aus den ersten Importen

- Schreiben Sie den Modellnamen so, wie der Hersteller ihn angibt; „R740xd“ und „PowerEdge R740XD“ werden beide erkannt.
- Ein Kabel über ein Patchpanel braucht zwei Zeilen; die `route` eines Kabels kann zum Beispiel „in rack“, „overhead tray T2“ oder „under floor“ lauten.
- Nutzen Sie `power_cords` (A, B oder AB) in Devices, wenn Sie noch nicht jedes Stromkabel einzeln erfassen möchten.
- Exportieren Sie die Sensorwerte der letzten Woche aus Ihrem Monitoring in Readings, dann passen sich die Ebenen Luft und Strom an Ihren Raum an.
- Unsicher, wo Sie anfangen sollen? Öffnen Sie das [ausgefüllte Beispiel](/downloads/demo-hall.xlsx) neben der leeren Vorlage.
