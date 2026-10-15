---
title: "Rechenzentrum simulieren: alles ausfallen lassen — DC Sim"
description: "Einspeisung A fällt bei Spitzenlast weg, Kühlgerät stoppt, Leckage, Brand: eine Szenariobibliothek aus Ihrem Modell, jeder Lauf neben unveränderter Baseline."
h1: "Lassen Sie alles ausfallen. Sehen Sie, was dunkel wird."
navLabel: "Simulation"
directAnswer: "Eine Was-wäre-wenn-Simulation für das Rechenzentrum beantwortet eine Frage, bevor die Realität es tut: Wenn das ausfällt, was fällt noch aus? DC Sim erzeugt aus Ihrem eigenen Modell eine Szenariobibliothek (Netzausfall, Ausfall der Netzersatzanlage, Wegfall von Einspeisung A bei Spitzenlast, Ausfall von USV, Kühlung oder CDU, eine Leckage, ein Brand, 25 % mehr Last), führt jedes Szenario neben einer unveränderten Baseline aus und listet die betroffenen Racks, Geräte, Dienste und Token auf einer Zeitleiste."
section: "product"
order: 5
badge: "available"
badgeNote: "Läuft in den Demo-Räumen und mit jeder Datei, die Sie importieren."
faq: [{"q": "Wie genau ist die Simulation?", "a": "Was-wäre-wenn für Strom und Netzwerk ist exakt für die Kette, die Sie beschreiben: Steht in der Tabelle, dass ein Gerät ein Netzkabel an Einspeisung A hat, wird es dunkel, wenn A ausfällt. Projektionen für Thermik, Flüssigkeitskreisläufe und Laufzeit sind Schätzungen eines zonalen Modells und als „geschätzt“ gekennzeichnet. Das alles ist keine CFD."}, {"q": "Kann ich Szenarien für eine Planung durchspielen, die noch nicht gebaut ist?", "a": "Ja. Design und Simulate nutzen dasselbe Modell; das N−1-Audit ist eine Reihe genau dieser Szenarien."}, {"q": "Verändert ein Szenario meinen Zwilling?", "a": "Nein. Jedes Szenario läuft neben einer unveränderten Baseline; in das Modell Ihres Raums wird nichts geschrieben."}, {"q": "Kann ich Übungen terminieren oder Ergebnisse teilen?", "a": "Das Vorfallsprotokoll lässt sich heute exportieren; terminierte Übungen und Freigabelinks stehen auf der Roadmap."}, {"q": "Was bedeutet „verlorene Token“?", "a": "Die Token pro Sekunde, die die betroffenen GPU-Knoten produziert haben, summiert über die Dauer des Szenarios: die Serving-Kapazität, die ein Ausfall kosten würde, bei gemessener oder geschätzter Rate."}]
shots:
  - { name: "simulate", alt: "Panel Simulate mit einer Liste von Szenarien samt Start-Schaltflächen und Dauer: Netzausfall, Netzausfall mit nicht startender Netzersatzanlage, Wegfall von UPS-A bei Spitzenlast, Ausfall von AC-1, daneben der 3D-Raum.", caption: "Die Szenariobibliothek, erzeugt aus dem Modell Ihres Raums." }
  - { name: "replay", alt: "Panel Replay mit den kritischen und schwerwiegenden Alarmen der Woche (Ausfall eines Kühlgeräts, thermische Abschaltungen von GPU-Servern, ein ausgefallener Inferenzdienst), daneben der Raum zum Zeitpunkt des gewählten Alarms.", caption: "Replay: jeder kritische und schwerwiegende Alarm der Woche; ein Klick, und der Raum springt dorthin." }
clips:
  - { name: "feed-a-fails-lightsoff", title: "Einspeisung A fällt bei Spitzenlast aus, Licht aus", caption: "Einspeisung A fällt bei Spitzenlast aus: Geräte mit nur einem Netzkabel werden dunkel, und die andere PDU ist überlastet (31 s)." }
  - { name: "crah-stops", title: "Kühlgerät AC-1 fällt aus", caption: "AC-1 fällt bei Spitzenlast aus: Minuten bis 27, 32 und 35 °C, geschätzt mit einem zonalen Modell, keine CFD (31 s)." }
  - { name: "leak", title: "Leckage am Verteiler einer flüssigkeitsgekühlten GPU-Reihe", caption: "Ein Verteiler leckt: 1,4 Liter ausgetreten (geschätzt), das Ventil sperrt ab, 7,8 Mio. Token verloren (31 s)." }
---

## Was-wäre-wenn in zwei Geschwindigkeiten

**Fail (sofort).** Klicken Sie auf einen beliebigen Knoten im Einlinienschaltbild, in der Netzwerktopologie oder im 3D-Raum und dann auf Fail. Auf dem Server läuft eine Ausbreitung durch den Graphen: Stromausfälle schalten Geräte dunkel, der Netzwerkgraph verliert sie, und Schaltbild, 3D-Ansicht (Rack-Färbung, Gerätefarben, tote Kabel) und ein Banner zeigen das Ergebnis sofort, zum Beispiel „Fail UPS-A — 2 Geräte ohne Strom · 90 laufen an einer Einspeisung · überlastet: PDU-R05-B 113,9 %“.

**Simulate it (Zeitleiste).** Derselbe Ausfall im vollständigen Simulator (Batterielaufzeit, Start der Netzersatzanlage, Auslösekennlinien, thermische Transienten, verlorene Token), Minute für Minute, neben der Baseline. Geschätzte Werte sind gekennzeichnet.

## Die Szenariobibliothek

| Szenario | Was es beantwortet | Ebenen |
|---|---|---|
| Netzausfall | ob die Netzersatzanlage schnell genug anläuft; Laufzeit auf Batterie bei aktueller Last | Strom |
| Netzersatzanlage startet nicht | welche Racks nur noch begrenzte Zeit haben, und wie lange (geschätzt) | Strom |
| Einspeisung A fällt bei Spitzenlast aus | wer dunkel wird, wer über B weiterläuft, welche PDU überlastet ist | Strom, Netzwerk, Token |
| Ausfall eines USV-Moduls | verwaiste Geräte mit nur einem Netzkabel, ausgefallene Dienste | Strom |
| Ausfall eines Kühlgeräts oder Kaltwassersatzes | Minuten bis 27, 32 und 35 °C je Rack (geschätzt) | Luft |
| CDU-Ausfall oder Leckage am Verteiler | ausgetretene Liter (geschätzt), Absperrventil, abgetrennte Racks | Wasser |
| Brand in einer Zone | Detektion, Alarm, Lüftungsverriegelung, Löschmittelfreigabe, Not-Aus; Racks und Dienste in der Zone | Brand, Strom |
| 25 % mehr Last | welche Schutzschalter, Kühlgeräte und Racks 80 % überschreiten; Kapazitätsreichweite | Strom, Luft, Fläche |
| Benutzerdefiniert | beliebigen Knoten ausfallen lassen, beliebiges Kabel kappen, beliebiges Kühlgerät stoppen | alle |

Jeder Lauf meldet **verlorene Token**, wenn GPU-Knoten betroffen sind.

## Replay und Report

**Replay:** die kritischen und schwerwiegenden Alarme der Woche auf dem Zeitschieberegler. Springen Sie minutengenau dorthin, sehen Sie den Raum, wie er war, exportieren Sie das Vorfallsprotokoll.

**Report:** Energie, PUE, CO₂ und Kosten; Token nach Workload, Mandant, Modell und Server; Token pro kWh; Kapazitätsreichweite; Thermik; Vorfälle; auslaufende Garantien. Schätzungen sind gekennzeichnet.

## Übungen, die nichts kosten

Spielen Sie den Ausfall von Einspeisung A vor dem Wartungsfenster durch, nicht währenddessen. Zeigen Sie dem Kunden das Audit vor dem Vertragsabschluss. Nehmen Sie das Replay des Vorfalls ins Post-Mortem statt einer Skizze am Whiteboard.

Eine Analyse der Folgen eines USV-Ausfalls hieß früher: ein Berater und eine Woche. Hier geht sie so: USV ausfallen lassen, Liste der verwaisten Geräte ablesen, die Geräte mit nur einem Netzkabel korrigieren, erneut ausführen. Schritt für Schritt: [USV-Ausfall-Analyse in 20 Minuten](/resources/guides/ups-failure-impact-analysis/).
