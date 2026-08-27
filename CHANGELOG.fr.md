# Journal des modifications

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh-CN.md) · [繁體中文](CHANGELOG.zh-TW.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [Non publié]

### Ajouté
- Liens vers le site officiel dans la barre de titre, le menu Aide et la boîte de dialogue À propos.
- Retour non destructif à l’accueil via l’icône Lexora de la barre de titre.
- Rendu Markdown du HTML en bloc et en ligne, y compris dans les titres.

### Modifié
- La vérification manuelle affiche immédiatement sa progression et conserve la boîte de dialogue À propos ouverte.
- Les notes de mise à jour intégrées proviennent des dictionnaires de traduction en neuf langues de Lexora ; les descriptions GitHub restent en anglais.
- Une coche verte confirme que la version est à jour.

## [0.1.4] - 2026-08-27

### Ajouté
- Mises à jour intégrées signées pour Windows, macOS et Linux, avec progression du téléchargement et confirmation avant installation.
- Vérification quotidienne du canal stable avec délai aléatoire au démarrage et option de désactivation.
- Notes de version localisées dans les neuf langues prises en charge.

### Modifié
- Un avertissement explicite apparaît avant l’installation si un onglet ouvert contient des modifications non enregistrées.
- La version de l’application provient désormais de `package.json` et CI vérifie sa cohérence avec Cargo et le tag de publication.

Les versions antérieures figurent dans le [journal complet en anglais](CHANGELOG.md).
