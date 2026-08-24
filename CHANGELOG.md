# Changelog

All notable changes to Lexora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned (Phase 3 — v0.3.0)
- Workspace folder open & recursive directory scanner
- Nested virtualized file tree sidebar with file management actions (create, rename, delete)
- Multi-document tabs with drag reordering and dirty indicators
- Quick file switcher palette (<kbd>Ctrl+P</kbd>)

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
