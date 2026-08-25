<div align="center">

# ✨ Lexora

**A Typora-style, high-performance Markdown reader & editor built with Tauri 2 + Rust + SolidJS.**

[![Release](https://img.shields.io/badge/release-v1.5.0-4361ee.svg?style=flat-square)](https://github.com/BerryUIKI/Lexora/releases)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue.svg?style=flat-square)](LICENSE)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=flat-square&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=flat-square&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=flat-square&logo=solid&logoColor=white)](https://www.solidjs.com/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](docs/CONTRIBUTING.md)

<p align="center">
  <b>Local-first</b> • <b>Blazing fast</b> • <b>Zero split-panes</b> • <b>Tiny bundle (~3.6 MB)</b>
</p>

</div>

---

## 📖 Introduction

**Lexora** is an open-source Markdown reader and editor engineered for writers, developers, and researchers who want the power of plain-text Markdown without the cognitive overhead of split-screen previews.

Built on **Tauri 2** and **Rust** with a fine-grained reactive **SolidJS** frontend, Lexora combines native desktop responsiveness with a minimalist, distraction-free aesthetic.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📘 File  Edit  View  Window  Help     Lexora — README.md ●         🔍 ⚙️ 🐙 │
├───────────────┬─────────────────────────────────────────────────────────────┤
│ 📑 Outline    │  [Tab 1: README.md ●]  [Tab 2: notes.md]              +     │
│ ├─ Overview   ├─────────────────────────────────────────────────────────────┤
│ ├─ Features   │   # Introduction                                            │
│ └─ Shortcuts  │                                                             │
│               │   Lexora eliminates split-screen previews by rendering      │
│ 📁 Workspace  │   Markdown directly in place with pure typography.          │
│ • docs/       │                                                             │
│ • src/        │   | Metric          | Value        | Notes   |              │
│               │   |-----------------|--------------|---------|              │
│               │   | Startup Time    | < 400 ms     | Instant |              │
│               │   | Installer Size  | ~3.6 MB      | Compact |              │
│               │                                                             │
├───────────────┴─────────────────────────────────────────────────────────────┤
│ ◧  📖 Reading | ✍️ Writing | 💻 Code   Ln 1, Col 1 | 1,420 words | UTF-8 | LF│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Key Features

| Feature | Description | Status |
|---|---|:---:|
| 🪟 **VS Code-Style Top Menu Bar** | In-app, theme-matched Menu Bar (`File`, `Edit`, `View`, `Window`, `Help`) with smooth keyboard shortcuts | ✅ Complete |
| 🏷️ **Windows `.md` Default Association** | Built-in shell file associations for `.md`, `.markdown`, `.mdx`, and `.txt` with CLI auto-open | ✅ Complete |
| 🔄 **Tri-State Display Modes** | Quickly switch at the bottom: **Reading** (read-only), **Writing** (WYSIWYG), **Code** (raw source) | ✅ Complete |
| 📥 **Intelligent Drag & Drop** | Drag file to window to open; drag onto tab bar for new tab; drag onto editor to insert Markdown links | ✅ Complete |
| ✍️ **In-Place WYSIWYG** | Typora-style inline editing with Milkdown v7 & ProseMirror undo/redo history | ✅ Complete |
| 🔲 **Monochrome Vector Iconography** | Pure, minimalist theme-adaptive vector SVGs that keep focus on your text content | ✅ Complete |
| 💾 **Atomic File I/O** | Crash-safe atomic saving (`write to .tmp -> rename`) with dirty state tracking | ✅ Complete |
| 📂 **Workspace Tree & Tabs** | Multi-document tabs, recursive file tree CRUD, and quick switcher (<kbd>Ctrl+P</kbd>) | ✅ Complete |
| 🌈 **Code Syntax Highlighting** | Sublime-grade code block syntax highlighting via `syntect` with copy button | ✅ Complete |
| 📑 **TOC Outline Navigation** | Auto-generated Table of Contents with smooth scrolling across Reading, Writing, and Code modes | ✅ Complete |
| 🔍 **Find & Replace** | In-document search with regex, case sensitivity, and match jumping (<kbd>Ctrl+F</kbd>/<kbd>Ctrl+H</kbd>) | ✅ Complete |
| 🔎 **Global Workspace Search** | Workspace-wide ripgrep-style search across all files with line previews (<kbd>Ctrl+Shift+F</kbd>) | ✅ Complete |
| 📤 **Standalone HTML Export** | Export self-contained styled HTML documents with print typography | ✅ Complete |
| 📊 **Mermaid Diagrams & Math** | Live rendering containers for `mermaid` diagrams and LaTeX math blocks | ✅ Complete |
| 🧘 **Zen & Focus Modes** | Full-screen distraction-free layout (<kbd>F11</kbd> / <kbd>Ctrl+Shift+Z</kbd>) | ✅ Complete |
| 🏠 **Welcome Hub Dashboard** | Minimalist home dashboard with quick start, recent files history, and shortcut cheat sheet | ✅ Complete |
| 🌍 **Multi-Language Localization (i18n)** | Native support for 9 languages (EN, 中文简体/繁體, 日本語, 한국어, DE, FR, ES, RU) with auto-detect | ✅ Complete |

---

## 📥 Installation & Download

### Windows
Download the latest binaries from our [**GitHub Releases**](https://github.com/BerryUIKI/Lexora/releases):

- **Standard Installer (Recommended)**: [`Lexora_0.1.0_x64-setup.exe`](https://github.com/BerryUIKI/Lexora/releases) *(3.62 MB — auto-registers `.md` file associations)*
- **Enterprise MSI Package**: [`Lexora_0.1.0_x64_en-US.msi`](https://github.com/BerryUIKI/Lexora/releases) *(5.19 MB)*
- **Standalone Portable**: [`lexora.exe`](https://github.com/BerryUIKI/Lexora/releases) *(run directly without installation)*

---

## ⌨️ Keyboard Shortcuts

### 📝 Text Formatting (Content-First)
| Shortcut | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | **Bold Text** (In-place selection toggle) |
| <kbd>Ctrl</kbd> + <kbd>I</kbd> | *Italic Text* (In-place selection toggle) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> | ~~Strikethrough~~ (In-place selection toggle) |
| <kbd>Ctrl</kbd> + <kbd>`</kbd> | `Inline Code` (In-place selection toggle) |
| <kbd>Ctrl</kbd> + <kbd>0</kbd> | Normal Paragraph / Plain Text |
| <kbd>Ctrl</kbd> + <kbd>1</kbd> ~ <kbd>6</kbd> | Heading Levels 1 ~ 6 |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Insert Hyperlink |

### 🛠️ Editor & Workspace Operations
| Shortcut | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>N</kbd> | Create new document |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open Markdown file via native dialog |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save active document (atomic write) |
| <kbd>Ctrl</kbd> + <kbd>E</kbd> | Export document to standalone HTML |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> | Close active tab |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Quick Switcher file palette |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> / <kbd>Ctrl</kbd> + <kbd>H</kbd> | In-document Find & Replace |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | Global workspace full-text search |
| <kbd>Ctrl</kbd> + <kbd>/</kbd> | Cycle Display Mode (Reading / Writing / Code) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | Toggle Outline & Workspace Sidebar |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | Toggle Focus Mode |
| <kbd>F11</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Toggle Distraction-Free Zen Mode |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | Undo |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> | Redo |

---

## 🛠️ Tech Stack & Architecture

- **Shell & Security**: [Tauri 2](https://tauri.app) with granular least-privilege capabilities
- **Native Backend**: [Rust 1.85](https://www.rust-lang.org) (edition 2024)
- **Frontend Framework**: [SolidJS 1.9](https://www.solidjs.com) (fine-grained DOM reactivity)
- **Editor Engine**: [Milkdown v7](https://milkdown.dev) + [ProseMirror](https://prosemirror.net)
- **Markdown Parsing**: [pulldown-cmark](https://github.com/pulldown-cmark/pulldown-cmark) (zero-copy AST)
- **Syntax Highlighting**: [syntect](https://github.com/trishume/syntect) (Sublime Text syntax definitions)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) + Theme CSS Variables

---

## 💻 Development & Building

### Prerequisites
- Node.js 20+ and `pnpm` 9+
- Rust 1.85+ (`rustup default stable`)
- Tauri v2 prerequisites: [v2.tauri.app/start/prerequisites](https://v2.tauri.app/start/prerequisites/)

### Setup & Run
```bash
# 1. Install dependencies
pnpm install

# 2. Run local development environment
pnpm tauri dev
```

### Verification & Testing
```bash
# Frontend test suite
pnpm vitest run

# TypeScript type check
pnpm tsc --noEmit

# Rust test suite
cargo test --manifest-path src-tauri/Cargo.toml

# Production package build
pnpm tauri build
```

---

## 🤝 Contributing & Community

Contributions, feature requests, and bug reports are warmly welcome!
- Repository: [github.com/BerryUIKI/Lexora](https://github.com/BerryUIKI/Lexora)
- Issues: [github.com/BerryUIKI/Lexora/issues](https://github.com/BerryUIKI/Lexora/issues)
- Guide: [CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 📄 License

Lexora is open-source software licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).
Copyright &copy; 2026 Lexora Contributors.
