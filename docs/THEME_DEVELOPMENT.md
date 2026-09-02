# Theme & Skin Development Guide

This guide explains how to design, package, test, and publish custom themes and skins for **Lexora**.

---

## 🎨 Theme Architecture

Lexora uses a design-token-driven CSS architecture. When an active theme is applied, Lexora dynamically overrides design tokens without restarting the app, modifying configuration files, or triggering full DOM reconstructs.

Themes are stored in the user application data directory:
- **Windows**: `%APPDATA%/Lexora/themes/<theme-id>/`
- **macOS**: `~/Library/Application Support/Lexora/themes/<theme-id>/`
- **Linux**: `~/.config/lexora/themes/<theme-id>/`

---

## 📁 Theme Directory Structure

Each theme resides in its own subfolder named after its unique `id`:

```
themes/my-custom-theme/
├── theme.json    # Metadata and palette swatches
├── theme.css     # CSS variable overrides
└── README.md     # Theme description and usage notes
```

---

## 1. `theme.json` Specification

`theme.json` defines the theme metadata displayed in the Lexora Theme settings and marketplace browser.

```json
{
  "id": "my-custom-theme",
  "name": "My Custom Theme",
  "version": "1.0.0",
  "description": "A soothing, minimalist dark theme crafted for long writing sessions.",
  "author": "Your Name",
  "type": "dark",
  "accentColor": "#88c0d0",
  "backgroundColor": "#2e3440",
  "textColor": "#d8dee9",
  "entryFile": "theme.css",
  "tags": ["dark", "minimalist", "blue"]
}
```

### Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique identifier (`^[a-z0-9-_]{1,64}$`). Must match directory name. |
| `name` | `string` | **Yes** | Human-readable name displayed in menus and theme picker. |
| `version` | `string` | **Yes** | Semantic version (e.g. `1.0.0`). |
| `description` | `string` | **Yes** | Short summary of theme aesthetic and intent. |
| `author` | `string` | **Yes** | Author or organization attribution. |
| `type` | `"dark" \| "light" \| "dual"` | **Yes** | Whether the theme is optimized for dark mode, light mode, or both. |
| `accentColor` | `string` | **Yes** | Hex color code used for the accent preview swatch. |
| `backgroundColor` | `string` | **Yes** | Hex color code used for the background preview swatch. |
| `textColor` | `string` | **Yes** | Hex color code used for the typography preview swatch. |
| `entryFile` | `string` | No | CSS stylesheet filename (defaults to `theme.css`). |
| `tags` | `string[]` | No | Search keywords and categorization tags. |

---

## 2. `theme.css` Token Reference

In `theme.css`, apply overrides to `:root, [data-theme], body` using `!important` to ensure clean precedence over built-in presets:

```css
:root,
[data-theme],
body {
  /* ── Canvas & Layout ────────────────────────────── */
  --color-bg-primary: #282a36 !important;
  --color-bg-secondary: #21222c !important;
  --color-border: #44475a !important;

  /* ── Typography & Content ───────────────────────── */
  --color-text-primary: #f8f8f2 !important;
  --color-text-secondary: #6272a4 !important;

  /* ── Accents & Interactive ──────────────────────── */
  --color-accent: #bd93f9 !important;
  --color-accent-hover: #ff79c6 !important;
  --color-hover: rgba(255, 255, 255, 0.08) !important;

  /* ── Editor & Sidebar Surfaces ──────────────────── */
  --color-editor-bg: #282a36 !important;
  --color-sidebar-bg: #21222c !important;
  --color-statusbar-bg: #191a21 !important;

  /* ── Syntax Highlighting ────────────────────────── */
  --color-code-bg: #21222c !important;
  --color-code-text: #f8f8f2 !important;
  --color-code-keyword: #ff79c6 !important;
  --color-code-string: #f1fa8c !important;
  --color-code-comment: #6272a4 !important;
  --color-code-function: #50fa7b !important;

  /* ── Markdown Block Elements ────────────────────── */
  --color-blockquote-border: #bd93f9 !important;
  --color-link: #8be9fd !important;
}
```

---

## 3. Local Development & Testing

1. In Lexora, navigate to **File ➔ Preferences ➔ Settings** (<kbd>Ctrl+,</kbd>) and select the **Theme** tab.
2. Scroll to the **Custom & Community Themes** section and click **"Open Themes Folder"**.
3. Create a folder matching your theme ID (e.g. `my-custom-theme/`).
4. Place your `theme.json` and `theme.css` in that folder.
5. In Lexora, your theme will immediately appear under **Installed Themes**. Click **"Apply"** to test your styles in real time.

---

## 4. Publishing to the Official Registry

To make your theme discoverable in Lexora's in-app marketplace:

1. Fork the official extension hub: [`BerryUIKI/Lexora-Plugins`](https://github.com/BerryUIKI/Lexora-Plugins).
2. Add your theme folder under `themes/<your-theme-id>/`.
3. Add your entry into `themes.json`.
4. Open a Pull Request targeting the **`dev`** branch of `BerryUIKI/Lexora-Plugins`.
