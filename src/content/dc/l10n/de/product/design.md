---
title: "Planungssoftware für Rechenzentren vor dem Bau — DC Sim"
description: "Racks und Kühlgeräte im 2D-Plan anordnen, HE, Gewicht, Schutzschalter und Kühlung live prüfen, N−1-Audit, Versionen. KI-Planungsassistent auf der Roadmap."
h1: "Erst planen, dann bauen"
navLabel: "Design-Modus"
directAnswer: "Der Design-Modus ist für den Raum, den es noch nicht gibt, oder für die Reihe, die Sie als Nächstes ergänzen. Auf einem 2D-Plan platzieren, ziehen, drehen und löschen Sie Racks und Kühlgeräte und fügen Geräte aus dem Katalog hinzu, während die Designprüfungen live mitlaufen: HE-Passung, Gewicht, Abstände, Last an den Schutzschaltern, Kühlung gegen Wärmelast. Führen Sie das N−1-Audit aus, veröffentlichen Sie eine Version, und dasselbe Modell wird zum Zwilling des laufenden Raums."
section: "product"
order: 4
badge: "available"
badgeNote: "Design-Modus, Geräteauswahl und Excel-Export laufen heute. Der KI-Planungsassistent (ohne Aufpreis enthalten, sobald er erscheint) und ein Stücklisten-Export (BOM) stehen auf der Roadmap."
faq: [{"q": "Ist der KI-Planungsassistent schon verfügbar?", "a": "Noch nicht. Er steht auf der Roadmap, ist in der Design-Lizenz ohne Aufpreis enthalten, sobald er erscheint, und kommt zuerst als Early Access zu Design-Kunden. Der Design-Modus selbst (Plan, Geräteauswahl, Prüfungen, N−1-Audit, Versionen, Excel-Export) läuft heute."}, {"q": "Was umfasst eine Design-Lizenz heute?", "a": "Den Design-Modus mit Geräteauswahl, allen Prüfungen und dem N−1-Audit, das vollständige Was-wäre-wenn, den Excel-Export des Modells, drei Monate pro Projekt (verlängerbar) und die Übergabe an Monitor mit drei kostenlosen Monaten. Der KI-Planungsassistent kommt ohne Aufpreis hinzu, sobald er erscheint; ein Stücklisten-Export steht auf der Roadmap."}, {"q": "Kann ich von einem bestehenden Raum aus planen?", "a": "Ja. Importieren Sie den Raum und ändern Sie ihn: eine Reihe ergänzen, auf flüssigkeitsgekühlte Racks umstellen, ein Kühlgerät versetzen. Die Prüfungen und das Audit zeigen, was die Änderung bewirkt."}, {"q": "Liefert DC Sim Zeichnungen für den Errichter?", "a": "Es exportiert die Planung als ausgefüllte Excel-Vorlage (Racks, Geräte, eigene Geräte, Kabel, Stromversorgungskette), die der Errichter lesen kann und die sich unverändert wieder importieren lässt. Ein Stücklisten-Export und der Import von DXF/IFC stehen auf der Roadmap."}, {"q": "Was weiß der Katalog über ein Modell?", "a": "Abmessungen, Gewicht, Leistungsaufnahme, Luftstrom, Kühlungsart und die verbauten Komponenten, aus öffentlicher Dokumentation. Performance-Felder (Rechenleistung, GPU-Durchsatz, Storage-IOPS, Netzwerkbandbreite) werden derzeit für die Dimensionierung ergänzt."}]
shots:
  - { name: "design-n1-audit", alt: "Design-Modus auf dem 2D-Plan der Demohalle mit dem N−1-Resilienzaudit: Die Netzersatzanlage und jedes Klimagerät überstehen den Ausfall, UPS-A und UPS-B verursachen jeweils einen Ausfall, mit Auflistung der Geräte, Dienste, ausgelösten Schutzschalter und verlorenen Token.", caption: "N−1-Audit: Lassen Sie jede USV, jede Einspeisung und jedes Kühlgerät nacheinander ausfallen und lesen Sie ab, was übersteht." }
  - { name: "power-diagram", alt: "Einlinienschaltbild der Demohalle: Netzeinspeisung und Netzersatzanlage auf eine ATS, UPS-A und UPS-B, Unterverteilungen A und B und die Rack-PDUs mit Lastbalken.", caption: "Jede Planung erhält ihre Stromversorgungskette als Einlinienschaltbild, mit der Last an jedem Knoten." }
---

## Was Sie im Design-Modus tun

- **Planen Sie auf der 2D-Arbeitsfläche** und wechseln Sie jederzeit in 3D: Racks und Kühlgeräte platzieren, ziehen, drehen und löschen.
- **Beliebige Geräte hinzufügen:** aus dem Katalog wählen (Kategorie, Hersteller, Modell oder Suche, mit gezeichneter Frontblende, HE, Tiefe, Gewicht sowie Leistungsaufnahme im Leerlauf, typisch und maximal) oder ein eigenes Gerät einmal beschreiben und per Name wiederverwenden. Platzieren Sie es auf einer freien HE oder außerhalb eines Racks auf einem Tisch oder Regal.
- **Live-Prüfungen** beim Platzieren: HE-Überschneidungen und Kollisionen, Rack-Gewicht, Abstände, Last an Schutzschaltern und PDUs über 80 %, Wärmelast über der Kühlleistung, Geräte an nur einer Einspeisung.
- **N−1-Resilienzaudit:** Jedes Kühlgerät, jedes USV-Modul, jede Einspeisung und jeder Switch fällt nacheinander aus; der Bericht listet, was übersteht und was nicht.
- **Versionen:** Veröffentlichen Sie eine Planung und arbeiten Sie an der nächsten weiter; laden Sie später die As-built-Datei hoch und erhalten Sie eine Änderungsliste mit allen Abweichungen.
- **Schätzungen, gekennzeichnet:** kW und Wärmelast pro Rack stammen aus Katalogwerten und tragen die Kennzeichnung „geschätzt“, bis echte Messwerte vorliegen.
- **Excel-Export:** Laden Sie das Modell als ausgefüllte Vorlage herunter; beim erneuten Import entstehen dieselben Geräte, eigenen Geräte, Kabel und dieselbe Stromversorgungskette. Ein **Stücklisten-Export (BOM)** <span class="badge badge-roadmap">Roadmap</span>

## Design → Monitor in einem Werkzeug

Darauf kommt es bei diesem Produkt an. Die Planung, mit der Sie das Projekt gewinnen, ist das Modell, mit dem der Kunde jahrelang arbeitet: keine erneute Erfassung in einem DCIM, keine zweite Zeichnung. Importieren Sie den As-built-Stand, und Monitor übernimmt dieselben Racks, Ketten und Kabel. Ein Design-Kunde, der in Betrieb geht, erhält die ersten drei Monate Monitor kostenlos.

## KI-Planungsassistent <span class="badge badge-roadmap">Roadmap</span> · ohne Aufpreis enthalten

Beschreiben Sie den Raum in einem kurzen Briefing: Fläche, verfügbare kW, die Kühlung, die Sie bekommen können, die Workload („64 GPU-Knoten für Training, 2 PB Storage, 40 Standardserver“), Redundanzziel, Budget und Wachstum. Der KI-Planungsassistent wird Rack-Anzahl und Leistungsdichte, Reihen- und Ganganordnung, Luft- oder Flüssigkühlung, USV- und PDU-Dimensionierung mit A/B-Ketten, Kühlgeräte, Brandschutzzonen und eine Stückliste aus dem Katalog vorschlagen, mit zwei oder drei Alternativen (am günstigsten, am dichtesten, am ausfallsichersten).

**Der Assistent schlägt vor, die Engine prüft.** Jeder Vorschlag wird in den Simulator geladen und geprüft (HE-Passung, Gewicht, 80 % an den Schutzschaltern, Kühlung gegen Wärmelast, Redundanzpfade), bevor Sie ihn sehen, und das Ergebnis ist die ausgefüllte Excel-Vorlage, sodass der Weg von Design zu Monitor ein Schritt bleibt. Er ist in der Design-Lizenz ohne Aufpreis enthalten, sobald er erscheint, und Design-Kunden erhalten ihn zuerst als Early Access. [Nach Early Access fragen](mailto:da@mustardseedmt.com?subject=DC%20Sim%20AI%20design%20assistant%20early%20access).

## Für Systemhäuser und Berater

Bringen Sie den Zwilling ins Angebot. Führen Sie den Kunden in 3D durch den Raum, bevor ein Rack bestellt ist, zeigen Sie das N−1-Audit und bleiben Sie nach der Inbetriebnahme am Zwilling dran. → [Partnerprogramm](/partners/)

Die Stromplanung für einen GPU-Cluster in einem kleinen Raum ist eine Frage der Dichte: kW pro Rack, A/B-Einspeisungen, Kühlung pro Reihe. Der Design-Modus zeigt für jeden Knoten, den Sie platzieren, die Folgen für Schutzschalter und Kühlung. Für die ersten Zahlen nutzen Sie den [Rackleistungsrechner](/resources/calculators/rack-power/).
