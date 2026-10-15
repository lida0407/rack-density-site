---
title: "Zabbix-Visualisierung des Rechenzentrums in 3D — DC Sim"
description: "Zabbix per URL und Read-only-Token anbinden: Hosts, aktuelle Werte und offene Probleme landen im 3D-Zwilling Ihres Raums, mit Was-wäre-wenn-Analyse."
h1: "Zabbix, in 3D visualisiert"
navLabel: "Zabbix"
directAnswer: "DC Sim liest Zabbix über die API mit einem Read-only-Token: Hosts und ihr Inventar, die aktuellen Werte der Items für Strom, Temperatur, USV, CPU und Datenverkehr sowie die offenen Probleme. Hosts werden den Geräten in Ihrem digitalen Zwilling zugeordnet, Werte werden zu Messwerten, Probleme zu Alarmen. Zabbix überwacht weiter; DC Sim ergänzt den Raum, die Was-wäre-wenn-Analyse und die Token-Ebene."
section: "integrations"
order: 1
badge: "available"
badgeNote: "Getestet mit einer laufenden Zabbix-6.0-Demoinstanz (1.417 Hosts) und einem Read-only-Token. Zabbix 6.0 und neuer."
shots:
  - { name: "monitor-kpis", alt: "Monitor-Panel über der Demohalle: IT-Last 79,1 kW, PUE 1,16, 488.000 Token pro Sekunde, 22,2 Mio. Token pro kWh, höchste Zulufttemperatur 19,6 °C und zwei Alarme für die Einspeisungen von Rack R05 bei 86 % des Nennwerts, jeweils mit Handlungsempfehlung.", caption: "Messwerte und Alarme im Raum: So sieht ein Zabbix-Problem direkt neben dem Rack aus, zu dem es gehört." }
faq: [{"q": "Welche Zabbix-Versionen werden unterstützt?", "a": "Zabbix 6.0 und neuer, mit einem API-Token oder mit Benutzername und Passwort eines Benutzers mit reinen Leserechten. Getestet wurde mit Zabbix 6.0."}, {"q": "Welche Zugangsdaten werden benötigt?", "a": "Ein API-Token für einen Zabbix-Benutzer mit reinen Leserechten. In Ihrem eigenen Netzwerk bleibt das Token in der Konfiguration des Agenten; im Browser wird es nie angezeigt."}, {"q": "Ändert DC Sim etwas in Zabbix?", "a": "Nein. DC Sim liest Hosts, Items und Probleme. In Zabbix wird nichts geschrieben."}, {"q": "Meine Items heißen anders. Funktioniert es trotzdem?", "a": "Die Zuordnung erfolgt über Item-Key und Einheit, nicht über den Namen: Alles mit einer Einheit für Temperatur, Watt, Lastprozent oder Laufzeit wird erkannt. Hosts werden den Geräten über den Namen zugeordnet, und die Vorschau zeigt Ihnen, wie viele zugeordnet wurden."}]
---

## Was Sie bekommen

- **Ebene Strom:** USV-Last, Laufzeit und Batterieladung im Einlinienschaltbild; PDU- und IPMI-Leistung an den Geräten. Klicken Sie auf die USV, drücken Sie **Fail** und sehen Sie, welche Racks dunkel werden und welche Dienste ausfallen.
- **Ebene Luft:** Temperatur-Items werden zu Messwerten für Zuluft oder Abluft am Rack; der Raum färbt sich entsprechend ein, und wenn Sie ein Kühlgerät ausfallen lassen, wird „Minuten bis 27, 32 und 35 °C“ geschätzt.
- **Alarme am Gerät:** Offene Zabbix-Probleme erscheinen als Alarme am zugehörigen Gerät, neben dessen Workloads und Mandanten.

## So binden Sie Zabbix an

1. Erstellen Sie in Zabbix ein API-Token für einen Benutzer mit reinen Leserechten (oder verwenden Sie Benutzername und Passwort mit reinen Leserechten).
2. Öffnen Sie in DC Sim **⋯ → Connect NetBox or Zabbix**, wählen Sie Zabbix, fügen Sie URL und Token ein und drücken Sie **Test**. Der Test zeigt die Zabbix-Version und wie viele Hosts, Items und offene Probleme er sieht.
3. **Preview** (Vorschau) zeigt, wie viele Hosts zu Geräten in Ihrem Zwilling passen und welche Messwerte und Alarme hinzukommen.
4. **Import.** Jede Synchronisierung übernimmt die neuesten Messwerte und die offenen Probleme.

Innerhalb Ihres eigenen Netzwerks läuft derselbe Connector im Agenten von DC Sim, der Verbindungen nur nach außen aufbaut.

## Was wir auslesen

| Zabbix | DC Sim | Ebene |
|---|---|---|
| Hosts und Host-Inventar (Standort, Rack, Modell, Seriennummer) | über den Namen den Geräten zugeordnet | Gerät |
| Strom-Items (PDU, USV, IPMI) | `power_w` | Strom, Token |
| Items für Zuluft- oder Umgebungstemperatur | `inlet_c` | Luft |
| CPU-Temperatur, Lüfterdrehzahl, Luftfeuchte | `cpu_temp_c`, `fan_rpm`, `humidity_pct` | Gerät, Luft |
| USV-Items für Laufzeit, Last und Batterie | `ups_runtime_min`, `ups_load_pct`, `ups_battery_pct` | Strom |
| CPU-Auslastung, Ping | `util_pct`, erreichbar oder nicht erreichbar | Gerät, Netzwerk |
| offene Probleme | Alarme am zugehörigen Gerät | alle |

## Ebenfalls möglich: Export in die Vorlage

Kein API-Zugang? Exportieren Sie die aktuellen Item-Werte je Host und tragen Sie sie in das Blatt **Readings** (Messwerte) der Vorlage ein (`time`, `item`, `metric`, `value`), die Hosts in das Blatt **Devices** (Geräte).

## Später

| Vorhaben | Status |
|---|---|
| Rack-Positionen automatisch aus dem Host-Inventar übernehmen | <span class="badge badge-roadmap">Roadmap</span> |
| Alarme bleiben über Server-Neustarts hinweg erhalten (heute: die letzten 24 Stunden, im Arbeitsspeicher) | <span class="badge badge-roadmap">Roadmap</span> |
| Ein Zabbix-Template für einen Eintrag dort, wo Zabbix-Nutzer nach Integrationen suchen | <span class="badge badge-roadmap">Roadmap</span> |

## Keine eingehenden Verbindungen

Für eine Zabbix-Instanz innerhalb Ihres Netzwerks läuft der Connector in einem kleinen Agenten, der eine einzige ausgehende WebSocket-Verbindung aufbaut und nie auf einem Port auf eingehende Verbindungen wartet. Bricht die Verbindung ab, werden die Daten-Batches auf der Festplatte zwischengespeichert und anschließend in der richtigen Reihenfolge nachgeliefert. Das Token bleibt in der Konfiguration des Agenten; DC Sim erhält nur Werte und Probleme.
