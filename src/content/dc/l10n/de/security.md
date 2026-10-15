---
title: "Sicherheit und Datenverarbeitung: DC Sim"
description: "Mandantentrennung, Agent ohne eingehende Ports, Hosting in der EU und in China, Schwärzung, kein Training mit Kundendaten, Export und Löschung auf Anfrage."
h1: "Sicherheit & Daten"
directAnswer: "DC Sim speichert ein Modell Ihres Raums, nicht Ihres Netzwerks. Der Browser erhält gerenderte Frames; Simulations-Engine, Importer und Ihre Daten bleiben serverseitig in einem isolierten Mandanten. Live-Daten kommen über einen Agenten, der Verbindungen nur nach außen aufbaut. Sie können Ihr Modell und dessen Verlauf jederzeit exportieren und die Löschung verlangen."
navLabel: "Sicherheit & Daten"
section: "company"
order: 2
faq: [{"q": "Lässt sich der Zwilling on-premises installieren?", "a": "Derselbe Container läuft auch on-premises und ist Teil der Enterprise-Lizenz (später). Fragen Sie uns, wenn Sie ihn früher benötigen."}, {"q": "Was wird der Agent senden?", "a": "Sobald die Live-Connectors verfügbar sind: Metriknamen, Werte, Zeitstempel und die Host-Bezeichnung, sonst nichts. Mit einem Dry-Run-Flag gibt er genau aus, was gesendet würde, bevor er überhaupt eine Verbindung aufbaut."}, {"q": "Wer kann meinen Raum sehen?", "a": "Heute, während einer Vorführung, nur Sie und wir (Mustard Seed Solutions). Im Produkt: Ihre Benutzer und die Partner, die Sie einladen; unser Support nur mit Ihrer Erlaubnis im Rahmen eines Tickets."}, {"q": "Bewahren Sie meine Tabelle auf?", "a": "Die Werte werden in Ihr Modell überführt. Sie können das Modell als ausgefüllte Vorlage herunterladen und uns bitten, das Modell und die Originaldatei zu löschen; wir bestätigen die Löschung innerhalb von 30 Tagen schriftlich."}, {"q": "Werden Kundendaten zur Verbesserung des Katalogs verwendet?", "a": "Nur wenn Sie sich entscheiden, ein Datenblatt beizusteuern, und dann nur die öffentlichen Fakten daraus, mit Quellenangabe."}]
---

## Die Architektur in fünf Zeilen

1. **Browser:** erhält Frames und Diagramme; das Web-Bundle enthält keine Secrets und keinen Engine-Code.
2. **Server:** Simulations-Engine, Importer und Katalog laufen auf dem Server; jeder Kunde ist eine eigene Organisation mit eigenen Standorten, Versionen und eigenem Verlauf.
3. **Agent (für Zabbix, NetBox und künftige Connectors in Ihrem Netzwerk):** eine einzelne Binärdatei in Ihrem Netzwerk, die Ihre Quellen abfragt und Metrikwerte über eine einzige ausgehende WebSocket-Verbindung sendet. Kein Port, der auf eingehende Verbindungen wartet. Zugangsdaten bleiben in seiner Konfigurationsdatei auf Ihrem Rechner.
4. **Speicherung:** Modell und Messwerte in einer Postgres-kompatiblen Datenbank je Deployment.
5. **Editionen:** Die englischsprachige Edition wird von Mustard Seed Solutions betrieben und in der EU gehostet; die chinesischsprachige Edition betreibt CloudSino in China. Die beiden teilen keine Daten.

## Was wir mit Ihren Dateien und Daten tun

- **Excel-/CSV-Import:** serverseitig verarbeitet, nur Werte. Formeln werden nie ausgewertet; Dateien mit Makros, verschlüsselte Dateien und Zip-Bomben werden abgelehnt; 10 MB pro Datei, 50.000 Zeilen pro Blatt.
- **Handbücher und Datenblätter, die Sie für den Katalog senden:** Gespeichert werden nur die Fakten (Abmessungen, Gewicht, Leistung, Komponenten), mit Quellenangabe; das Dokument selbst wird nach der Extraktion nicht aufbewahrt, sofern Sie nicht ausdrücklich zustimmen.
- **Kein Training mit Kundendaten.** Ihr Modell, Ihre Telemetrie und Ihre Dateien werden nicht zum Training von KI-Modellen verwendet, weder von uns noch von Dritten. Der KI-Planungsassistent (Roadmap) wird nur den Katalog und das Briefing sehen, das Sie eingeben.
- **Schwärzung (auf Anfrage):** Vor einer gemeinsamen Vorführung, einer Fallstudie oder einer Support-Sitzung werden Gerätenamen, Eigentümer und Mandantennamen durch Platzhalter ersetzt.
- **Export und Löschung:** Laden Sie Ihr Modell jederzeit als ausgefüllte Excel-Vorlage herunter; Löschanfragen für Ihr Modell und Ihre Dateien werden innerhalb von 30 Tagen umgesetzt.

## Zugriff

Heute läuft das Produkt in Vorführungen auf unseren Servern, mit Demodaten und den Dateien, die Sie senden. Self-Service-Konten stehen auf der Roadmap; das Produkt trennt bereits Organisationen, Benutzer und Rollen, und der Zugriff eines Partners auf den Standort eines Kunden erfolgt per Einladung und kann vom Kunden widerrufen werden. SSO (SAML/OIDC) ist Teil von Enterprise (später). Der gesamte Datenverkehr läuft über TLS; der Agent wird WSS verwenden.

## Was wir nicht tun

- Wir benötigen keine eingehenden Ports, keine VPNs und keine Appliances.
- Wir steuern nichts: Der Agent liest, der Zwilling simuliert; nichts schreibt zurück in Ihre USV, PDU oder Gebäudeleittechnik (BMS).
- Wir verkaufen Ihre Daten nicht und geben sie nicht weiter. Logos und Namen von Kunden erscheinen nur mit schriftlicher Genehmigung.

## Hosting und Compliance, klar gesagt

Hosting in der EU für die englischsprachige Edition. Backups je Deployment. Eine schriftliche Sicherheitszusammenfassung, ein Auftragsverarbeitungsvertrag (AVV) und die Liste der Unterauftragsverarbeiter sind auf Anfrage erhältlich. Wir führen keine Zertifizierungen an. Fragen Sie uns, und wir sagen Ihnen genau, was vorhanden ist und was nicht.
