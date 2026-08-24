# Changelog

All notable changes to Lexora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned (Phase 2 — v0.2.0)
- In-place Typora-style WYSIWYG editor powered by Milkdown + ProseMirror
- Undo / Redo transaction history
- Keyboard shortcuts for formatting (Bold, Italic, Heading levels, Lists)
- Atomic file saving (<kbd>Ctrl+S</kbd>) with dirty state indicators
- Source Mode / WYSIWYG Mode switcher

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
