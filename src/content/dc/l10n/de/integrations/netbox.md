---
title: "NetBox-3D-Ansicht: Racks und Geräte als Zwilling — DC Sim"
description: "NetBox per URL und Read-only-Token anbinden, Standort wählen: Racks, Geräte, Kabel, Einspeisungen und VLANs als 3D-Zwilling mit Was-wäre-wenn-Analyse."
h1: "NetBox, in 3D"
navLabel: "NetBox"
directAnswer: "DC Sim liest einen NetBox-Standort über die NetBox-API mit einem Read-only-Token und überführt ihn in die Blätter der Vorlage: Racks, Geräte, Kabel, Einspeisungen und VLANs. Sie sehen denselben Importbericht und dieselben Prüfungen wie beim Excel-Upload und danach den Standort als 3D-Zwilling, in dem Sie Knoten für Knoten Ausfälle durchspielen können. NetBox bleibt Ihre maßgebliche Datenquelle; es wird nichts zurückgeschrieben."
section: "integrations"
order: 2
badge: "available"
badgeNote: "Import aus NetBox: durchgängig getestet mit einer laufenden NetBox-4.7-Demoinstanz (24 Standorte). Zwei-Wege-Synchronisierung und ein NetBox-Plugin stehen auf der Roadmap."
shots:
  - { name: "replay", alt: "Das geöffnete Menü von DC Sim über der 3D-Ansicht eines Kühlgeräts, mit dem Eintrag „Connect NetBox or Zabbix: inventory, readings and alarms“.", caption: "NetBox oder Zabbix über das Menü ⋯ anbinden." }
faq: [{"q": "Welche NetBox-Versionen werden unterstützt?", "a": "NetBox 3.x und 4.x über die REST-API. Getestet wurde mit NetBox 4.7, sowohl mit dem älteren als auch mit dem neueren Token-Format."}, {"q": "Welche Zugangsdaten werden benötigt?", "a": "Ein NetBox-API-Token für einen Benutzer mit reinen Leserechten. Das Token wird nur an NetBox gesendet; es wird nie im Browser angezeigt oder in einem Bericht gespeichert."}, {"q": "Ändert DC Sim etwas in NetBox?", "a": "Nein. DC Sim liest nur. Einen Entwurf als geplante Objekte zurück nach NetBox zu übertragen, steht auf der Roadmap und wird nur per Opt-in aktiviert."}, {"q": "Meine NetBox-Instanz hat viele Standorte. Was passiert dann?", "a": "Der Test listet die Standorte auf, die größten zuerst, mit der Anzahl ihrer Racks und Geräte. Sie importieren jeweils einen Standort, denn ein ganzer Standortverbund ist kein einzelner Raum."}, {"q": "Kann ich stattdessen weiterhin einen CSV-Export verwenden?", "a": "Ja. Auch die CSV-Exporte von NetBox selbst lassen sich den Blättern der Vorlage zuordnen; Spaltenüberschriften werden auch über Synonyme erkannt."}]
---

## Was Sie bekommen

- **Ebene Fläche:** jedes Rack des Standorts in seiner Reihe, mit belegten HE und kW im Verhältnis zum Rack-Budget. Die Prüfliste beim Import ergänzt, was NetBox nicht abbildet: zu schwere Racks, PDUs oder Schutzschalter über 80 %, Geräte mit nur einem Netzkabel oder mit beiden Netzteilen an derselben Einspeisung, Phasensymmetrie.
- **Ebene Strom:** Unterverteilungen, Einspeisungen und PDUs werden zum Einlinienschaltbild mit den Farben für A und B. Klicken Sie auf eine Einspeisung, drücken Sie **Fail** und sehen Sie, welche Racks dunkel werden und welche Dienste ausfallen.
- **Ebenen Verkabelung und Netzwerk:** NetBox-Kabel werden in 3D über rückseitige Kabelmanager, Kabeltrassen oder unter dem Doppelboden geführt; jeden Kabelweg können Sie nachverfolgen. Die Netzwerktopologie entsteht aus denselben Kabeln; lassen Sie einen Switch ausfallen und sehen Sie, wer dann jeden Pfad verliert.

## So binden Sie NetBox an

1. Erstellen Sie in NetBox ein API-Token für einen Benutzer mit **reinen Leserechten**.
2. Öffnen Sie in DC Sim **⋯ → Connect NetBox or Zabbix**, wählen Sie NetBox, fügen Sie URL und Token ein und drücken Sie **Test**. Der Test zeigt die NetBox-Version und alle Standorte mit ihren Racks und Geräten, die größten zuerst.
3. Wählen Sie den **Standort**. **Preview** (Vorschau) zeigt ihn als Blätter der Vorlage (Racks, Devices, Cables, Power, Networks), mit demselben Importbericht und denselben Prüfungen wie beim Excel-Upload.
4. **Import.** Synchronisieren Sie später erneut, erhalten Sie eine Änderungsliste, bevor etwas übernommen wird.

Innerhalb Ihres eigenen Netzwerks läuft derselbe Connector im Agenten von DC Sim, der Verbindungen nur nach außen aufbaut.

## Was wir auslesen

| NetBox | Vorlage von DC Sim | Hinweise |
|---|---|---|
| Racks: Name, Location, Höhe, Breite | Racks: rack, row, height_u, width_in | die Location wird zur Reihe; Breite 10 zeichnet ein Minirack |
| Geräte: Name, Rack, Position, Gerätetyp, Rolle, Seriennummer, Mandant | Devices: name, rack, u, model, role, serial, owner | Gerätetypen werden mit dem Katalog abgeglichen; ein Gerät ohne Rack bleibt an seiner Location als Gerät außerhalb eines Racks erhalten; Blades wandern mit ihrem Chassis mit |
| benutzerdefinierte Felder `warranty_end`, `runs` | Devices: warranty_end, runs | sofern Sie sie pflegen |
| Verteiler (Power Panels) und Einspeisungen (Power Feeds), primär und redundant | Power: Verteiler mit Schutzschaltern je Einspeisung, A und B | Einspeisungen ohne Nennwert werden im Bericht markiert |
| PDUs und die Feed Legs (Phasen) ihrer Ausgänge | Power-Zeilen, gespeist von der verkabelten Einspeisung; Cables: phase | Last je Phase und Phasensymmetrie |
| Kabel: beide Enden, Typ, Länge und Einheit, Farbe, Beschriftung | Cables: Gerät und Port an beiden Enden (from/to), type, media, length_m, color, label | Längen werden in Meter umgerechnet; Provider-Circuits werden ausgelassen und aufgelistet |
| VLANs und Präfixe | Networks: vlan, name, purpose, subnet | |

Die Gerätetyp-Bibliothek der NetBox-Community steht unter der Lizenz CC0 und wird derzeit in den Gerätekatalog von DC Sim übernommen. So erhalten immer mehr Gerätetypen eine echte Höhe in HE, ein Gewicht und eine Leistungsaufnahme; alles, was sich nicht zuordnen lässt, wird zu einem einfachen Quader mit dem Vermerk „später identifizieren“.

## Später

| Vorhaben | Status |
|---|---|
| Schnittstellengeschwindigkeiten aus NetBox auslesen (heute: aus Portnamen und dem Katalog) | <span class="badge badge-roadmap">Roadmap</span> |
| Zwei-Wege-Synchronisierung: einen Entwurf aus DC Sim als geplante Objekte zurück in NetBox übertragen | <span class="badge badge-roadmap">Roadmap</span> |
| Ein NetBox-Plugin: „Open in DC Sim“ an einem Rack oder Gerät | <span class="badge badge-roadmap">Roadmap</span> |

## Keine eingehenden Verbindungen

Für eine NetBox-Instanz innerhalb Ihres Netzwerks läuft der Connector in einem kleinen Agenten, der eine einzige ausgehende WebSocket-Verbindung aufbaut und nie auf einem Port auf eingehende Verbindungen wartet; bricht die Verbindung ab, werden die Daten-Batches auf der Festplatte zwischengespeichert und in der richtigen Reihenfolge nachgeliefert. Das Token bleibt in der Konfiguration des Agenten. DC Sim schreibt nie in NetBox.
