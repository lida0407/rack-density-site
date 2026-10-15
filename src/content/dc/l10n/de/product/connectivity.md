---
title: "Ebenen für Verkabelung und Netzwerk — DC Sim"
description: "Jedes Kabel in 3D verlegt, jede Strecke Ende zu Ende verfolgt, Netzwerktopologie aus Ihren Kabeln. Switch oder Link ausfallen lassen: Wer verliert den Pfad?"
h1: "Konnektivitäts-Ebenen: Verkabelung · Netzwerk"
navLabel: "Konnektivität: Verkabelung · Netzwerk"
directAnswer: "Die Konnektivitäts-Ebenen stammen aus einem einzigen Blatt: Cables. Jede Zeile ist ein Kabel, von Gerät und Port zu Gerät und Port, mit Typ, Medium, Geschwindigkeit, Länge und Trassenführung. Daraus zeichnet DC Sim jede Strecke durch Rack und Kabeltrassen in 3D, baut die Netzwerktopologie automatisch auf und lässt Sie ein Kabel kappen oder einen Switch ausfallen lassen, damit Sie sehen, wer die Verbindung verliert."
section: "product"
order: 2
badge: "available"
badgeNote: "Beide Ebenen laufen in den Demo-Räumen und mit jeder Datei, die Sie importieren."
shots:
  - { name: "cabling", alt: "Ebene Verkabelung der Demohalle: Strom-, Netzwerk-, Storage- und Konsolenkabel, geführt durch Kabeltrassen an der Decke und Kabelmanager der Racks, mit geöffnetem Filter nach Kabeltyp.", caption: "Verkabelung: jede Strecke in 3D verlegt, gefiltert nach Typ." }
  - { name: "network-fail", alt: "Netzwerktopologie mit ausgefallenem spine-01: Links in Rot und ein Banner, laut dem vier Geräte jeden Netzwerkpfad verlieren, während zwanzig einen Backup-Link behalten.", caption: "Netzwerk: Lassen Sie einen Spine-Switch ausfallen und sehen Sie, wer jeden Pfad verliert und wer einen Backup-Uplink behält." }
faq: [{"q": "Muss ich jedes Kabel dokumentieren?", "a": "Nein. Beginnen Sie mit den Uplinks und Netzkabeln, auf die es ankommt, und ergänzen Sie den Rest nach und nach. Ein Gerät ohne erfasstes Kabel wird markiert, nie ausgeblendet."}, {"q": "Was, wenn das Blatt Cables ein Gerät nennt, das nicht in Devices steht?", "a": "Die Zeile wird als unbekannter Name gemeldet und übersprungen; der Import gelingt trotzdem."}, {"q": "Kann DC Sim Portzähler von Switches lesen?", "a": "Heute über das Blatt Readings (Item device:port, Metriken link_mbps und port_errors), exportiert aus Ihrem Monitoring. Live-Portzähler über Connectors stehen auf der Roadmap."}, {"q": "Werden Patchpanels und Glasfaser-Trunks unterstützt?", "a": "Ja. Ein Patchpanel ist ein Gerät mit Ports, ein Kabel durch das Panel sind zwei Zeilen, und die Kabelverfolgung folgt beiden."}, {"q": "Kann ich die Topologie exportieren?", "a": "Das Vorfallsprotokoll lässt sich heute exportieren; der Export des Diagramms als PDF oder SVG steht auf der Roadmap."}]
---

## Verkabelung: „Wo verläuft dieses Kabel eigentlich?“

**Was Sie sehen:** Kabel als echte Strecken, vom Geräteport zur Rack-Rückseite, durch die vertikale Kabelführung, entlang der Kabeltrasse an der Decke oder unter dem Boden (gemäß `route`) bis zum anderen Ende. Bündel teilen sich einen Weg. Farbe nach Typ: Strom A rot und B blau, Kupfer, Glasfaser (OM und OS2), DAC, Storage und Konsole jeweils in eigener Farbe, mit einem Filter pro Typ. Standardmäßig blickt die Kamera auf die Rack-Rückseite.

**Kabel verfolgen:** Klicken Sie auf ein Kabel, um beide Enden, Ports, Medium, Geschwindigkeit, Länge, Beschriftung und VLANs zu sehen; **Trace** hebt den gesamten Pfad von Ende zu Ende hervor, auch durch Patchpanels (ein Panel-Kabel sind zwei Zeilen: Gerät zu Panel-Port, Panel-Port zu Switch).

**Prüfungen, direkt in 3D markiert:** ein Gerät ohne Netzwerk- oder Stromkabel; ein doppelt belegter Port; Geschwindigkeit oder Medium, die nicht zum Port passen (10G an einem 1G-Port, OM4 auf OS2); beide Netzteile an derselben Einspeisung; ein Kabel, das kürzer ist als der Abstand zwischen seinen Enden; fehlende Beschriftungen; unbekannte Gerätenamen im Blatt Cables.

**Aus der Tabelle:** Cables (from_device, from_port, to_device, to_port, type, phase, media, speed, length_m, color, label, vlan, route). Ports sind Freitext und werden normalisiert (`Gi1/0/1`, `eth0`, `SFP+1`, `port 5`, `PSU1`, `outlet 3`).

## Netzwerk: „Dieser Switch fällt aus. Wer hat noch einen Pfad?“

**Was Sie sehen (Diagramm):** eine aus den Netzwerkkabeln aufgebaute Topologie, Patchpanels zusammengefasst: Internet, Router und Firewall, Core oder Spine, Leaf oder Access, dann Server und Storage. Die Linienstärke zeigt die Geschwindigkeit, die Farbe die Auslastung (aus `link_mbps`-Messwerten) oder das VLAN (aus dem Blatt Networks); gestrichelte Linien sind Trunks. Storage-Links (SAS, FC) haben einen eigenen Filter.

**Was Sie sehen (3D):** Traffic-Partikel entlang der Netzwerkkabel; Port-LEDs leuchten je nach Auslastung.

**Was-wäre-wenn:** Lassen Sie einen Switch oder einen Link ausfallen und sehen Sie, welche Geräte jeden Pfad verlieren, welche einen Backup-Uplink behalten, welche Dienste stoppen und wer den Storage verliert. Stromausfälle schlagen automatisch auf die Netzwerk-Ebene durch: Ein dunkler Server verschwindet aus der Topologie.

**Prüfungen:** nur ein Uplink an einem Gerät, auf dem etwas läuft; ein Switch mit nur einem Uplink; ein Link mit mehr als 80 % Auslastung; ein VLAN, das auf einem Link genutzt, aber nicht definiert ist; Fehler an einem Port.

**Aus der Tabelle:** Cables vom Typ network oder storage, Networks (vlan, name, purpose, subnet) und Readings-Items `device:port` mit `link_mbps` und `port_errors`.

## Warum das für einen Raum mit 10 bis 50 Racks zählt

Die meisten Ausfälle in kleinen Räumen gehen auf einen einzelnen Uplink zurück, auf ein Patchpanel, das niemand beschriftet hat, oder auf zwei Netzteile an derselben Einspeisung. Die Prüfliste findet genau das in der Tabelle, bevor jemand zum Rack gehen muss.
