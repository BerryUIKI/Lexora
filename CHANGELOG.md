# Changelog

All notable changes to Lexora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
