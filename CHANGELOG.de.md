# Änderungsprotokoll

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh-CN.md) · [繁體中文](CHANGELOG.zh-TW.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Français](CHANGELOG.fr.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [0.1.4] - 2026-08-27

### Hinzugefügt
- Signierte In-App-Updates für Windows, macOS und Linux mit Downloadfortschritt und Bestätigung vor der Installation.
- Tägliche Prüfung des stabilen Kanals mit zufälliger Startverzögerung und Opt-out in den Einstellungen.
- Lokalisierte Versionshinweise für alle neun unterstützten Sprachen.

### Geändert
- Vor der Installation erscheint eine eindeutige Warnung, wenn geöffnete Tabs ungespeicherte Änderungen enthalten.
- Die App-Version wird zentral aus `package.json` bezogen und in CI gegen Cargo-Version und Release-Tag geprüft.

Ältere Einträge stehen im [vollständigen englischen Änderungsprotokoll](CHANGELOG.md).
