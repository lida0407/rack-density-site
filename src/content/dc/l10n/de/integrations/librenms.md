---
title: "LibreNMS in 3D: Verbindungen, Sensoren und Ports — DC Sim"
description: "Geplanter LibreNMS-Connector für DC Sim: LLDP-Links als Kabel, PDU-/USV-Sensoren als Messwerte, Port-Zähler als Auslastung im 3D-Zwilling des Rechenzentrums."
h1: "LibreNMS, in 3D"
navLabel: "LibreNMS"
directAnswer: "Ein LibreNMS-Connector für DC Sim ist geplant. Er würde LibreNMS über die API mit einem Read-only-Token lesen und das, was LibreNMS bereits erkennt, im 3D-Zwilling platzieren: Verbindungen, Stromsensoren und Port-Datenverkehr. Heute gelangen LibreNMS-Daten als Export über die Blätter der Vorlage in DC Sim."
section: "integrations"
order: 7.5
badge: "planned"
badgeNote: "Die Nachfrage entscheidet, welcher Connector als Nächstes kommt."
faq: [{"q": "Lässt sich DC Sim heute schon mit LibreNMS verbinden?", "a": "Nicht direkt. Der LibreNMS-Connector ist geplant. Heute können Sie Geräte und Sensorwerte aus LibreNMS exportieren und über die Blätter der Vorlage importieren (Devices, Cables, Readings)."}, {"q": "Was würde der LibreNMS-Connector abbilden?", "a": "LLDP-Nachbarn auf Kabel und die Ebene Netzwerk, SNMP-Sensoren an PDUs und USVs (Last, Stromstärke, Laufzeit, Batterie, Batteriebetrieb) auf Messwerte der Ebene Strom und Port-Zähler auf die Verbindungsauslastung in der Netzwerkansicht."}, {"q": "Würde er etwas in LibreNMS ändern?", "a": "Nein. Er würde ein Read-only-API-Token verwenden und nichts zurückschreiben. LibreNMS überwacht weiter; DC Sim ergänzt den Raum, die Stromversorgungskette und die Was-wäre-wenn-Analyse."}, {"q": "Wie bekomme ich ihn früher?", "a": "Klicken Sie auf dieser Seite auf „Ich habe Interesse“ und hinterlassen Sie Ihre E-Mail-Adresse. Connectors entstehen in der Reihenfolge, in der sie angefragt werden, und wir melden uns, sobald Sie ihn ausprobieren können."}]
---

## Was er abbilden würde

LibreNMS erkennt bereits das meiste, was ein Zwilling braucht, der Connector müsste es also vor allem an die richtige Stelle setzen. **LLDP-Nachbarn** werden zu Kabeln zwischen den richtigen Ports und zu den Verbindungen der Ebene Netzwerk; Topologie und Kabelverfolgung beruhen dann auf dem, was die Switches melden, nicht auf einer von Hand gepflegten Tabelle. **SNMP-Sensoren an PDUs und USVs** (Last, Stromstärke je Ausgang oder Phase, Laufzeit, Batterieladung, Batteriebetrieb) werden zu Messwerten an den passenden Knoten der Ebene Strom, wo Sie eine USV ausfallen lassen und sehen, was dunkel wird. **Port-Zähler** werden zur Verbindungsauslastung in der Netzwerkansicht. Geräte würden dem Zwilling über Hostname, sysName oder Seriennummer zugeordnet; was nicht passt, würde aufgelistet, damit Sie es einmalig zuordnen können.

## Heute

Exportieren Sie aus LibreNMS und importieren Sie über die [Blätter der Vorlage](../../resources/excel-template/): Geräte in Devices, Verbindungen in Cables, Sensorwerte in Readings. Sie erhalten denselben Importbericht und dieselben Prüfungen wie bei jedem Excel-Upload, dazu den Raum in 3D.
