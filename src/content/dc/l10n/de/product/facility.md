---
title: "Ebenen für Fläche, Luft, Wasser, Brand und Strom — DC Sim"
description: "Rackleistung, Kapazität, Kalt-/Warmgänge, Kühlkreisläufe, Leckagen, Brandschutzzonen, Stromversorgungskette mit Ausfall je Knoten. Geschätzt, gekennzeichnet, in 3D."
h1: "Infrastruktur-Ebenen: Fläche · Luft · Wasser · Brand · Strom"
navLabel: "Infrastruktur: Fläche · Luft · Wasser · Brand · Strom"
directAnswer: "Die Infrastruktur-Ebenen zeigen den Raum selbst: wo die Racks stehen und wie voll sie sind, wie Luft und Kühlmittel strömen, welche Brandschutzzone welches Rack abdeckt und wie der Strom jedes Netzteil erreicht. Jede Ebene entsteht aus Ihren Excel-Blättern (Racks, Cooling, Power, Devices), und jede beantwortet eine „Was, wenn das ausfällt?“-Frage mit einer geschätzten, gekennzeichneten Antwort."
section: "product"
order: 1
badge: "available"
badgeNote: "Alle fünf Ebenen laufen in den Demo-Räumen und mit jeder Datei, die Sie importieren."
faq: [{"q": "Sind die Temperaturen echt?", "a": "Importierte Messwerte sind echte Werte aus Ihrem Raum. Alles, was das Modell hochrechnet, etwa die Minuten bis zum Grenzwert, die Heatmap zwischen den Sensoren oder die Laufzeit ohne USV-Messwert, trägt die Kennzeichnung „geschätzt“."}, {"q": "Brauche ich einen Doppelboden oder eine Gebäudeleittechnik (GLT/BMS)?", "a": "Nein. Für den Start genügen die Blätter Racks und Cooling. Sensorverläufe lassen sich schon heute als Blatt Readings ergänzen; Live-Connectors für GLT/BMS und Sensoren stehen auf der Roadmap."}, {"q": "Lassen sich 2N und N+1 abbilden?", "a": "Ja. Einspeisungen A und B, eine ATS, die aus fed_from-Listen aufgebaut wird, Netzersatzanlagen und USV-Module; das N−1-Audit im Design-Modus und das Was-wäre-wenn per Fail nutzen dieselbe Kette."}, {"q": "Prüft DC Sim die Phasensymmetrie?", "a": "Ja, wenn Ihre Blätter angeben, auf welcher Phase jedes Kabel oder Element der Stromversorgung liegt (Vorlage v1.1). Jeder dreiphasige Knoten wird je Phase gegen 80 % geprüft, und eine Schieflast über 15 % wird markiert. Ohne Phasendaten vermerkt der Importbericht, dass die Phasensymmetrie nicht geprüft wurde."}, {"q": "Ist die Ebene Brand ein Compliance-Werkzeug?", "a": "Sie zeigt den Ablauf sowie die betroffenen Racks und Dienste. Sie ersetzt weder die Planung durch einen Fachplaner für Brandschutz noch die Genehmigung durch die zuständige Behörde."}]
shots:
  - { name: "water-gpu-row", alt: "Ebene Wasser einer Halle mit 96 Racks: eine flüssigkeitsgekühlte GPU-Reihe, eingefärbt nach der Rücklauftemperatur des Kühlmittels (geschätzt), im Hintergrund CDUs und USV-Anlagen.", caption: "Wasser: Rücklauftemperatur des Kühlmittels entlang einer flüssigkeitsgekühlten GPU-Reihe, geschätzt." }
  - { name: "fire-sequence", alt: "Brandszenario in Pod A: Zonen auf einem Grundriss in Draufsicht und ein Seitenpanel mit der Ausfallübersicht: 4 Geräte aus, 6,6 Mio. verlorene Token und eine Zeitleiste vom Rauch in R13 bis zum Ausfall des Dienstes.", caption: "Brand: Rauch in einer Zone, der Ablauf auf einer Zeitleiste, die betroffenen Geräte und Dienste." }
  - { name: "air-topdown", alt: "Ebene Luft der Demohalle in Draufsicht mit einer Heatmap der Zulufttemperatur von 16 bis 36 °C, gekennzeichnet als geschätzt, und drei Klimageräten an einer Wand.", caption: "Luft: Zulufttemperaturen im gesamten Raum, geschätzt mit einem zonalen Modell." }
  - { name: "power-fail-ups-a", alt: "Einlinienschaltbild mit ausgefallener USV UPS-A: Einspeisung A ausgegraut, ein Banner listet die Geräte an nur einer Einspeisung und die überlastete PDU-R05-B.", caption: "Strom: Lassen Sie UPS-A ausfallen und lesen Sie ab, wer dunkel wird, wer nur noch an einer Einspeisung läuft und welche PDU überlastet ist." }
clips:
  - { name: "crah-stops", title: "Kühlgerät AC-1 fällt aus", caption: "AC-1 fällt bei Spitzenlast aus: Minuten bis 27, 32 und 35 °C, geschätzt mit einem zonalen Modell, keine CFD (31 s)." }
  - { name: "leak", title: "Leckage am Verteiler einer flüssigkeitsgekühlten GPU-Reihe", caption: "Ein Verteiler leckt: 1,4 Liter ausgetreten (geschätzt), das Ventil sperrt ab, 7,8 Mio. Token verloren (31 s)." }
---

## Fläche: „Passt das?“

**Was Sie sehen:** Räume, Bodenraster, Kalt- und Warmgänge, Racks mit belegten HE, kW im Verhältnis zum Budget und Gewicht pro Rack. Die Gänge wechseln Reihe für Reihe, sofern Ihr Blatt Racks nichts anderes vorgibt (`front_faces` A oder B).

**Prüfungen, direkt in 3D markiert:** HE-Überschneidungen, zu schwere Racks, kW über dem Rack-Budget, unbekannte Modelle als einfache Quader, die später identifiziert werden.

**Aus der Tabelle:** Racks (rack, row, position, height_u, width_in, front_faces, max_kw) und Devices (rack, u, model, height_u).

Ein Werkzeug für die Kalt-/Warmgang-Aufstellung sollte aus Reihen und Racks selbst die Gänge ableiten, statt eine Zeichenübung zu verlangen. Tragen Sie im Blatt Racks Reihe und Position ein; Raum, Gänge und Rack-Budgets erscheinen. Ändern Sie `front_faces`, und der Gang dreht sich um.

## Luft: „Ein Kühlgerät fällt aus. Wie viele Minuten bleiben?“

**Was Sie sehen:** Zuluft- und Ablufttemperatur je Rack, eine Heatmap über die Fläche, Luftstrom-Partikel; die höchste Zulufttemperatur als KPI im Monitor.

**Was-wäre-wenn:** Lassen Sie ein Umluftkühlgerät (CRAH), einen Kaltwassersatz oder ein Klimagerät ausfallen, und die Zulufttemperaturen steigen; Minuten bis 27, 32 und 35 °C je Rack, **geschätzt** mit einem zonalen Modell und entsprechend gekennzeichnet. Keine CFD.

**Aus der Tabelle:** Cooling (name, type, capacity_kw, serves, model), dazu der Temperaturverlauf im Blatt Readings, falls vorhanden. Wärmelast über der Kühlleistung wird beim Import markiert.

## Wasser: „Welche Racks legt diese Leckage lahm?“

**Was Sie sehen:** Kaltwasserkreisläufe, CDUs, Verteiler, Rücklauftemperatur des Kühlmittels, Strömungspartikel.

**Was-wäre-wenn:** Eine CDU fällt aus; ein Verteiler leckt: ausgetretene Liter (geschätzt), das Absperrventil schließt, Racks werden außer Betrieb genommen. Gedacht für kleine Räume, die neben luftgekühlten Racks eine flüssigkeitsgekühlte GPU-Reihe ergänzen: Beides steckt in einem Modell.

**Aus der Tabelle:** das Blatt Liquid (Vorlage v1.5): Kreislauf, Typ (dlc, rdhx oder immersion), die versorgten Racks, CDU, Leistung, Vor- und Rücklauftemperatur, Durchfluss, Kühlmittel, Sekundärkreis und Verteiler.

Die Planung der Flüssigkühlung für ein kleines Rechenzentrum beginnt mit einer Frage: Welche Racks kommen an den Kreislauf, und was passiert mit ihnen, wenn die CDU ausfällt? Bilden Sie es ab, bevor die Rohre bestellt sind.

## Brand: „Wie ist der Ablauf, und wer ist betroffen?“

**Was Sie sehen:** Meldebereiche nach Zustand, Melder, Löschmittelbehälter.

**Was-wäre-wenn:** Rauch in einer Zone, danach Voralarm, Alarm, Lüftungsverriegelung (HVAC), Löschmittelfreigabe und Not-Aus (EPO), als Zeitleiste mit den Racks und Diensten der Zone. Brand ist hier eine modellierte Ebene, nicht nur ein Alarmeingang: Sie sehen den Ablauf, nicht nur ein rotes Symbol.

**Aus der Tabelle:** Zonen werden angenommen (eine Zone pro Raum), bis Sie sie ergänzen; der Importbericht weist darauf hin.

## Strom: „Einspeisung A fällt bei Spitzenlast weg. Wer wird dunkel?“

**Was Sie sehen (3D):** kW-Säulen je Rack, PDU-Leisten eingefärbt nach Last, Stromfluss entlang der Netzkabel.

**Was Sie sehen (Schaltbild):** ein automatisch erzeugtes Einlinienschaltbild (Netzeinspeisung, Netzersatzanlage und ATS, USV, Unterverteilung, PDU, Netzteil im Gerät) mit farbigen A- und B-Pfaden, Last in % an jedem Knoten und USV-Laufzeit: zuerst Ihr `runtime_min` oder `battery_kwh` aus der Tabelle, dann der Katalog, andernfalls geschätzt und gekennzeichnet.

**Was-wäre-wenn:** Klicken Sie auf einen beliebigen Knoten, dann auf **Fail**, und sehen Sie, was dunkel wird, was an einer Einspeisung weiterläuft, welche Dienste stoppen und was überlastet ist. **Simulate it** spielt den Ausfall im vollständigen Modell durch: Batterien, Start der Netzersatzanlage, Auslösekennlinien, thermische Transienten, verlorene Token.

**Prüfungen:** jeder Knoten über 80 % seiner Nennleistung; Last je Phase gegen 80 % und Schieflast über 15 % (wenn die Blätter Phasen angeben); Geräte mit nur einem Netzkabel oder mit beiden Netzkabeln an derselben Einspeisung; USV-Laufzeit unter 5 Minuten bei aktueller Last.

**Aus der Tabelle:** Power (name, type, rating, fed_from, feed, rack, voltage, phases, phase, runtime_min, battery_kwh, model) und Cables vom Typ power, oder die Abkürzung `power_cords` (A, B oder AB) im Blatt Devices.

Kapazitätsplanung für die Rackleistung ohne Werkzeug heißt: eine Tabelle mit Watt vom Typenschild und viel Raterei beim Derating. Hier liefert das Blatt Devices die kW pro Rack aus dem Katalog, das Blatt Power die Last an Schutzschaltern und PDUs, und die 80-%-Regel wird für Sie geprüft. Die Analyse der Folgen eines USV-Ausfalls ist ein Klick: USV ausfallen lassen, Liste der verwaisten Geräte, gestoppten Dienste und überlasteten PDUs ablesen. Probieren Sie den [Rackleistungsrechner](/resources/calculators/rack-power/) aus oder lesen Sie [USV-Ausfall-Analyse in 20 Minuten](/resources/guides/ups-failure-impact-analysis/).
