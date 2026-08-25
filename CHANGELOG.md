# Changelog

All notable changes to Lexora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- macOS now uses native traffic-light window controls and overlay title-bar styling while Windows and Linux retain Lexora's custom window controls.
- Release assets now use stable `Lexora_<OS>_<architecture>` names without embedded app versions, and README download lists have been simplified.
- Markdown tables no longer apply header, row, or column background fills, improving text contrast across platforms and themes.

## [0.1.2] - 2026-08-25

### Added
- **Dedicated Language Selection Modal (`LanguageModal`)**:
  - Independent, full-featured language picker dialog supporting all 9 languages with flags and `Auto (Follow System)` toggle.
  - Replaced nested dropdown hover trigger to eliminate menu collision and hover-closing glitches.
  - Fully localized subtitle and description dynamically following active language.
- **Rust Native GitHub Update Detection (`check_github_update`)**:
  - Implemented high-performance native HTTPS client in Rust (`reqwest` + `tokio`), completely bypassing browser WebView CSP and CORS restrictions.
  - Three-state version comparison (`UpdateStatus`): Update Available, Up to Date, and Ahead of Release (Preview Build).
  - Explicit rate-limit detection (HTTP 403 / 429), strict repository format validation, and draft/prerelease release filtering.
  - Added "🌟 领先于官方发行版 (Ahead of Public Release)" state with full 9-language localization.
- **Apple Silicon Native Artifact Naming & Permanent Latest Aliases**:
  - Automated aliasing in CI to generate `Lexora_Apple-Silicon.dmg`, `Lexora_x64-setup.exe`, `Lexora_amd64.AppImage`, etc.
- **9-Language Localized READMEs & Instant Direct Downloads**:
  - Added dedicated READMEs for all 9 supported languages with top navigation switcher.
  - Embedded permanent 1-click latest direct download matrix (`/releases/latest/download/...`).

---

## [0.1.1] - 2026-08-25

### Added
- **9-Language Internationalization (i18n) Engine**:
  - Full native localization support for 9 languages:
    - English (`en-US` - Primary default fallback)
    - Simplified Chinese (`zh-CN` - 简体中文)
    - Traditional Chinese (`zh-TW` - 繁體中文)
    - Japanese (`ja-JP` - 日本語)
    - Korean (`ko-KR` - 한국어)
    - German (`de-DE` - Deutsch)
    - French (`fr-FR` - Français)
    - Spanish (`es-ES` - Español)
    - Russian (`ru-RU` - Русский)
  - Automatic system language detection on initial launch (`navigator.language`) with English fallback.
  - Persistent user preference stored in `localStorage` under `lexora_locale_setting`.
  - Type-safe reactive translation function `t(key, params)` providing seamless, instant UI updates without page reload.
- **Top MenuBar Language Switcher (`Help -> Language`)**:
  - Added dedicated `Language (语言)` submenu under the `Help` menu with native language labels and active checkmark indicators.
  - Includes an `Auto (Follow System)` option to dynamically adapt to OS language changes.

### Changed
- **Open-Source License Migration**:
  - Migrated repository license from MIT to **GNU Affero General Public License v3.0 (AGPL-3.0)** across `LICENSE`, `package.json`, `Cargo.toml`, `README.md`, and the About dialog.

---

## [1.5.0] - 2026-08-25

### Added
- **VS Code-Style In-App Top Menu Bar**:
  - Custom themed top Menu Bar (`File`, `Edit`, `View`, `Window`, `Help`) with smooth hover switching, keyboard navigation, and shortcut indicators.
  - Centered document name badge with modified indicator dot.
  - Direct quick action controls for file palette, theme switching, and GitHub repository access.
- **Windows `.md` Shell File Associations & CLI Startup Resolver**:
  - Configured installer bundle file associations registering `.md`, `.markdown`, `.mdx`, and `.txt` with the Windows shell.
  - Implemented `get_cli_args` command in Rust backend and initial startup resolver to automatically open documents when double-clicked in Windows Explorer.
- **Official GitHub Repository Integration**:
  - Integrated [BerryUIKI/Lexora](https://github.com/BerryUIKI/Lexora) repository links in the Help menu, Top Menu Bar, Welcome Hub, and About dialog.
  - Added About Lexora dialog detailing version, open-source MIT license, author contributors, and technology stack.
- **Multi-Language Internationalization (i18n) Roadmap**:
  - Added Phase 8 / Milestone 8 roadmap plan to support English, Simplified Chinese, Traditional Chinese, Japanese, German, French, and Spanish.

---

## [1.4.0] - 2026-08-25

### Added
- **Content-Focused Shortcut Architecture**:
  - Restored <kbd>Ctrl+B</kbd> to standard text bolding across Writing and Code modes.
  - Added <kbd>Ctrl+0</kbd> shortcut for normal paragraph / text formatting, and <kbd>Ctrl+1~6</kbd> for H1~H6 headings.
  - Added <kbd>Ctrl+I</kbd> (Italic), <kbd>Ctrl+K</kbd> (Link), <kbd>Ctrl+`</kbd> (Inline Code), <kbd>Ctrl+Shift+X</kbd> (Strikethrough).
  - Migrated sidebar toggle shortcut to <kbd>Ctrl+Shift+B</kbd>.
- **Monochrome Vector Iconography**:
  - Completely removed colorful emojis from the status bar, format toolbar, and sidebar mode switcher.
  - Standardized on minimalist, clean vector line SVG icons using `stroke="currentColor"` that adapt to any theme.
- **In-Place Formatting & Selection Support**:
  - Refactored Writing Mode (Milkdown) and Code Mode format execution to transform active selection or current block in-place.
  - Added Paragraph (`¶ Text`) block format option in the editor toolbar.
- **Outline-First Sidebar & Cross-Mode Smooth Scrolling**:
  - Sidebar defaults to document Outline (TOC), allowing immediate navigation.
  - Rust parser generates explicit `id="{slug}"` anchor attributes on heading HTML tags.
  - Seamless smooth scrolling to heading anchors in Reading, Writing, and Code modes.
- **Code Mode Line Numbers Synchronized Scrolling**:
  - Synchronized line numbers gutter scroll position directly with textarea scrolling.
- **Welcome Hub / Home Workspace**:
  - Integrated modern Welcome Hub shown when no document is open, featuring quick creation/opening, recent file history, keyboard shortcuts cheat sheet, and drop hints.

---

## [1.3.0] - 2026-08-25

### Added
- **Intelligent Drag & Drop File Integration**:
  - Dragging files into the window when no document is open opens the document directly.
  - Dragging files onto the top Tab Bar when a document is open opens the file in a new tab.
  - Dragging files onto the active Editor / Text Area automatically inserts Markdown links (image files insert as `![name](path)`, documents and other files insert as `[name](path)`).
  - Real-time animated drop hint overlays for window, tab bar, and editor targets.
  - Comprehensive unit test suite for drag-and-drop parsing and routing logic.

---

## [1.2.0] - 2026-08-24

### Added
- **Global Workspace Full-Text Search**:
  - <kbd>Ctrl+Shift+F</kbd> search modal scanning across all Markdown documents in the workspace.
  - Line-by-line result match previews and instant navigation.
- **Diagrams & Math Rendering**:
  - Live Mermaid.js diagram container rendering for `mermaid` fenced code blocks.
  - Math formula wrappers for KaTeX `$$...$$` blocks.
- **Distraction-Free Zen & Focus Modes**:
  - Zen Mode (<kbd>F11</kbd> / <kbd>Ctrl+Shift+Z</kbd>) toggling full-screen editor without sidebars, tab bars, or toolbars.
  - Focus Mode (<kbd>Ctrl+Shift+X</kbd>).

---

## [1.1.0] - 2026-08-24

### Added
- **Find & Replace Toolbar**:
  - Full in-document search with regex, case sensitivity, previous/next match jumping, and replace/replace-all (<kbd>Ctrl+F</kbd>, <kbd>Ctrl+H</kbd>).
- **Standalone Document Export**:
  - Export document to styled, self-contained HTML/PDF with print typography and responsive layouts via Rust backend (`export_document`).
- **Editor Quick Format Toolbar**:
  - Instant insertion buttons for Tables, Images, Quotes, Task Lists, Bullet Lists, and Headings.
- **Background Auto-Save**:
  - Periodic background auto-saver for modified open documents.

---

## [1.0.0] - 2026-08-24

### Added
- **Automated Test Suite**:
  - Full Vitest reactive store unit tests (`editor.test.ts`, `files.test.ts`, `settings.test.ts`).
  - Comprehensive Rust unit tests for `pulldown-cmark` GFM parsing, TOC extraction, word counting, `syntect` syntax highlighting, atomic writes, and recursive directory tree scanning.
- **Security & Capabilities**:
  - Audited Tauri v2 capability configuration (`capabilities/default.json`) strictly scoped to essential filesystem and dialog operations.
- **Production Readiness**:
  - Multi-platform GitHub Actions automated CI matrix and release builder.

---

## [0.4.0] - 2026-08-24

### Added
- **Server-Side Code Highlighting (`syntect`)**:
  - Direct integration into AST parser for fenced code blocks with Ocean Dark theme.
  - Automatic language badge on code block header.
  - One-click copy-to-clipboard button on every code snippet.
- **Advanced Status Bar**:
  - Real-time word count & character count display.
  - Encoding (UTF-8) and line-ending detector (LF / CRLF).
  - Quick-switch toggle buttons for themes and display modes.

---

## [0.3.0] - 2026-08-24

### Added
- **Workspace File Tree**:
  - "Open Folder" workspace root browser via native dialog.
  - Recursive directory scanner in Rust (`list_directory_tree`) filtering build artifacts and hidden directories.
  - Interactive nested File Tree with folder expansion, file icons, and file creation, deletion, and rename actions.
  - Sidebar mode switcher: 📁 **Workspace** / 📑 **Outline**.
- **Multi-Document Tabs**:
  - `TabBar` component with tab switching, dirty indicator dots, and tab close buttons.
- **Quick Switcher Command Palette**:
  - <kbd>Ctrl+P</kbd> palette for fast keyboard fuzzy search and document switching.
- **Enhanced Keyboard Navigation**:
  - <kbd>Ctrl+B</kbd> to toggle the sidebar.

---

## [0.2.0] - 2026-08-24

### Added
- **Tri-State Display Modes**:
  - Seamless toggle between 📖 **Reading Mode** (read-only rendered view), ✍️ **Writing Mode** (Typora-style in-place WYSIWYG editor), and 💻 **Code Mode** (raw Markdown source view with line numbers).
  - Status bar mode switcher button and global shortcut <kbd>Ctrl+/</kbd>.
- **In-Place WYSIWYG Editor**:
  - Milkdown v7 editor integration inside SolidJS component lifecycle.
  - Live GFM rendering with in-place Markdown formatting.
  - ProseMirror undo/redo transaction history stack (<kbd>Ctrl+Z</kbd> / <kbd>Ctrl+Y</kbd>).
- **Code Viewport**:
  - Monospace raw source editor with dynamically synchronized line number gutter.
- **Atomic File Saving & Safety**:
  - Native atomic save (<kbd>Ctrl+S</kbd>) and Save As dialog with `.tmp` rename pattern.
  - Real-time dirty state tracking (`● unsaved` badge).
  - New Document creation (<kbd>Ctrl+N</kbd>).

---

## [0.1.0] - 2026-08-24

### Added
- **Core Markdown Reader Layout**:
  - Resizable three-part layout (TOC Sidebar, Main Viewport, Status Bar).
  - Dynamic Table of Contents generation with smooth-scrolling section anchors.
  - Sidebar drag-to-resize handle (160px–500px).
- **Backend Document Architecture**:
  - Native file open dialog supporting `.md`, `.markdown`, `.mdx`, and `.txt` files.
  - Rust-managed `ActiveDocument` state inside `AppState`.
  - Zero-copy GFM AST parsing, heading extraction, and word counting via `pulldown-cmark`.
- **Live File Watcher**:
  - Background file system watcher (`notify`) detecting external file modifications.
  - UI notification banner with instant reload action.
- **Theming System**:
  - Dark / Light / System theme palette with Tokyo Night styling.
  - Real-time OS color scheme detection and persistence in `localStorage`.
- **Status Bar Footer**:
  - Live status indicators for filename, word count, theme cycle button, and external modification badge.
- **Production Build & Packaging**:
  - Standalone executable (`lexora.exe`).
  - Lightweight NSIS Windows installer (3.38 MB).
  - WiX MSI Windows installer (4.92 MB).
- **Documentation Suite**:
  - Architecture specifications, Design Decisions (ADRs), Development & Contributing guides.
  - Milestone tracking (`docs/MILESTONES.md`), Collaboration handbook (`docs/COLLABORATION.md`), and Phase 2 blueprint (`docs/NEXT_STEPS.md`).
