---
title: "Digitaler Zwilling fürs Rechenzentrum aus Excel — DC Sim"
description: "Neun Ebenen, vier Modi, eine Arbeitsfläche: Fläche, Luft, Wasser, Brand, Strom, Verkabelung, Netzwerk, Gerät und Token aus Ihrer Tabelle, im Browser."
h1: "Von der Tabelle zum lebendigen 3D-Zwilling"
navLabel: "Überblick"
directAnswer: "Ein digitaler Zwilling eines Rechenzentrums ist ein Modell Ihres Raums, das die Frage „Was passiert, wenn …?“ beantwortet. DC Sim baut ihn aus einer einzigen Excel-Datei: Racks, Geräte, Stromversorgungskette, Kabel, Kühlung. Neun Ebenen zeigen den Raum aus unterschiedlichen Blickwinkeln, vier Modi begleiten ihn von der Planung bis zur Rekonstruktion eines Vorfalls, und jeder Wert, den die Engine schätzt, ist auch als geschätzt gekennzeichnet."
section: "product"
order: 0
shots:
  - { name: "hero-lightsoff", alt: "Eine Halle mit 96 Racks bei ausgeschaltetem Licht: Nur Server-LEDs, Leuchtstreifen in den Gängen und die Monitorwand des NOC leuchten.", caption: "Licht aus: derselbe Zwilling, abgedunkelt; jedes laufende Gerät leuchtet mit seinen eigenen LEDs.", light: { name: "hero-lit-crop", alt: "Dieselbe Rechenzentrumshalle bei eingeschaltetem Licht: weiße Wände, hellgrauer Boden, Reihen schwarzer Racks, Kühlgeräte entlang der Wände.", caption: "Licht an: dieselbe Halle, dieselben Werte." } }
  - { name: "view-menu", alt: "DC Sim mit geöffnetem Menü View über der 3D-Demohalle: Überblick, darunter Infrastruktur (Fläche, Luft, Wasser, Brand, Strom), Konnektivität (Verkabelung, Netzwerk) und IT (Gerät, Token), jeweils mit einem einzeiligen Hinweis und der Anzahl der Befunde.", caption: "Ein Menü View: neun Ebenen in drei Gruppen, mit der Anzahl der Befunde je Ansicht." }
faq: [{"q": "Wie lange dauert der erste Zwilling?", "a": "Wenige Minuten, wenn Ihr Blatt Devices fertig ist: Rack, HE und Modell pro Zeile. Der Katalog ergänzt Abmessungen, Gewicht, Leistungsaufnahme und Bauteile für bekannte Modelle; unbekannte Modelle erscheinen als einfache Quader mit dem Vermerk „später identifizieren“."}, {"q": "Was passiert, wenn meine Tabelle Fehler enthält?", "a": "Fehlerhafte Zeilen blockieren den Import nie. Jede übersprungene Zeile wird mit Blatt, Zeile und Grund aufgeführt; Prüfungen wie HE-Überschneidungen, zu schwere Racks und Schutzschalter über 80 % werden direkt in 3D markiert."}, {"q": "Kann ich CSV statt Excel verwenden?", "a": "Ja: dieselben Blätter als CSV- oder TSV-Dateien (Komma, Semikolon oder Tabulator; UTF-8, UTF-16 oder GBK). Bis zu 10 MB pro Datei und 50.000 Zeilen pro Blatt."}, {"q": "Wird der Zwilling aktualisiert, wenn sich mein Raum ändert?", "a": "Laden Sie die Datei erneut hoch: Geräte werden über die Seriennummer zugeordnet, dann über den Namen, dann über Rack und HE, und Sie erhalten eine Änderungsliste, bevor irgendetwas übernommen wird. Angebundene Zabbix- und NetBox-Quellen werden auf dieselbe Weise neu synchronisiert."}, {"q": "Ist das ein DCIM-System?", "a": "DC Sim setzt auf DCIM und Monitoring auf, statt sie zu ersetzen. Es dokumentiert weniger und simuliert mehr: Es geht um „Fällt das aus, was wird dunkel?“, nicht um Asset-Verwaltung."}]
---

## Eine Arbeitsfläche, ein Ansichtsmenü

Der ganze Bildschirm ist der Raum. Das Menü **View** (Ansicht) wechselt den Blickwinkel, das Menü **Mode** (Modus) bestimmt, was Sie gerade tun. Ein Zeitschieberegler fährt durch die vergangene Woche, den Live-Zustand oder eine 24-Stunden-Prognose. Dazu eine Legende, eine Suche und eine Hauptschaltfläche. Mehr ist im Ruhezustand nicht zu sehen: sechs Bedienelemente am Desktop, vier auf dem Smartphone.

## Neun Ebenen

| Gruppe | Ebenen | Was Sie sehen | Welche Was-wäre-wenn-Frage sie beantwortet |
|---|---|---|---|
| **Infrastruktur** ([mehr](/product/facility/)) | Fläche · Luft · Wasser · Brand · Strom | Bodenplatten, Gänge, Racks mit HE- und kW-Budget; Zuluft- und Ablufttemperatur; Kühlmittelkreisläufe; Brandschutzzonen; die Stromversorgungskette als Einlinienschaltbild | Passt das? Ein Kühlgerät fällt aus: Minuten bis zum Grenzwert (geschätzt). Eine Leckage: Racks werden abgetrennt. Ein Brand: die Löschsequenz. Ein beliebiger Knoten der Stromversorgung fällt aus: was dunkel wird |
| **Konnektivität** ([mehr](/product/connectivity/)) | Verkabelung · Netzwerk | jedes Kabel in 3D verlegt; eine Topologie, die aus den Kabeln entsteht | Ein Kabel kappen; einen Switch oder Link ausfallen lassen: wer jeden Pfad verliert |
| **IT** ([mehr](/product/it/)) | Gerät · Token | Status, Fehler, LEDs; jeden Server öffnen und zerlegen; Token pro Sekunde und Token pro kWh | Ein Fehler an einem Bauteil: betroffene Workloads und Mandanten; verlorene Token in jedem Szenario |

## Vier Modi, dazu Import und Report

| Modus | Aufgabe | Highlights |
|---|---|---|
| **Design** | einen Raum oder eine Änderung planen | 2D-Plan; Racks und Kühlgeräte platzieren, ziehen, drehen und löschen; Live-Designprüfungen; N−1-Resilienzaudit; als Version veröffentlichen → [Design-Modus](/product/design/) |
| **Monitor** | täglicher Betrieb | KPIs (IT-kW, PUE, Token/s, Token pro kWh, höchste Zulufttemperatur), Alarme mit Handlungsempfehlung, die stärksten Token-Produzenten |
| **Simulate** | Übungen und Was-wäre-wenn-Analysen zur Kapazität | eine aus Ihrem Modell erzeugte Szenariobibliothek; eigene Ausfälle; jeder Lauf neben einer unveränderten Baseline → [Simulation](/product/simulate/) |
| **Replay** | Vorfallsanalyse | die kritischen und schwerwiegenden Alarme der Woche auf dem Zeitschieberegler; Export eines Vorfallsprotokolls |

**Import** ist immer nur einen Klick entfernt: Excel oder CSV, Vorschau, Importbericht, Änderungsliste beim erneuten Hochladen, Vorlage und Beispieldateien zum Download. **Export** gibt Ihnen das Modell als ausgefüllte Vorlage zurück. **Report** liefert Energie, PUE, CO₂ und Kosten; Token nach Workload, Mandant, Modell und Server; Kapazitätsreichweite; Thermik; Vorfälle; Garantie. KPI-Werte, die aus dem Modell statt von einem Sensor stammen, tragen die Kennzeichnung **geschätzt**.

## Was-wäre-wenn in zwei Geschwindigkeiten

**Fail** startet auf dem Server eine schnelle Ausbreitung durch den Graphen: Stromausfälle schalten Geräte dunkel, der Netzwerkgraph verliert sie, und Schaltbild, 3D-Ansicht und Banner aktualisieren sich sofort. **Simulate it** spielt denselben Ausfall im vollständigen Simulator durch (Batterien, Start der Netzersatzanlage, thermische Transienten, Auslösekennlinien der Schutzschalter, verlorene Token), sodass Sie den zeitlichen Verlauf sehen, nicht nur den Endzustand.

## Licht an, Licht aus

Drücken Sie **L** oder wählen Sie im Menü View den Eintrag Lights Off, und der Raum wird dunkel wie eine echte Halle: Was noch leuchtet, läuft auch. Jede LED auf einer Gerätefront blinkt im Takt der simulierten Last dieses Geräts, Bildschirme und Leuchtstreifen in den Gängen bleiben an, ausgeschaltete Geräte werden dunkel. Auto schaltet das Licht nach Zeitplan, und die Ebene Strom zeigt die Beleuchtungslast und was die Dunkelheit pro Monat einspart.

## Auf Ehrlichkeit ausgelegt

- Zonale Thermik- und Fluidmodelle mit der Kennzeichnung „geschätzt“. Keine CFD, und wir behaupten auch nie etwas anderes.
- Standardwerte sind im Importbericht als **angenommen** markiert (2N-Stromversorgung A/B, abwechselnde Gänge, eine Kühlzone), bis Sie echte Daten liefern.
- Die Simulations-Engine läuft auf dem Server; Ihr Browser empfängt Frames. Der Importer wertet niemals Formeln oder Makros aus.

## Zwei Wege hinein

- **Excel oder CSV**, heute verfügbar: Das Blatt Devices ist Pflicht, sechs weitere sind optional. → [die Excel-Vorlage](/resources/excel-template/)
- **Zabbix und NetBox**, verfügbar: URL und ein Read-only-Token einfügen, auf Test klicken, Vorschau prüfen, importieren. NetBox liefert Racks, Geräte, Kabel, Stromversorgung und VLANs; Zabbix liefert Messwerte und Alarme. → [Integrationen](/integrations/)
- **Weitere Monitoring-Tools** <span class="badge badge-roadmap">Roadmap</span> für Live-Connectors; schon heute passt der Export jedes Tools in das Blatt Readings.
