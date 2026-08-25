<div align="center">

# ✨ Lexora

**A Typora-style, local-first, high-performance Markdown reader & in-place WYSIWYG editor.**

[![Release](https://img.shields.io/badge/release-v0.1.1-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/tag/v0.1.1)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 Local-first</b> • <b>⚡ Blazing fast (<400ms startup)</b> • <b>📝 Zero split-panes</b> • <b>🌐 9 Languages</b> • <b>📦 Lightweight (~3.6 MB)</b>
</p>

[**📥 Download Latest Release**](#-instant-downloads) • [**🌟 Features**](#-key-features) • [**⌨️ Shortcuts**](#-keyboard-shortcuts) • [**📖 Documentation**](docs/DEVELOPMENT.md)

</div>

---

## 📥 Instant Downloads

No GitHub experience required! Click your platform below to download the installer directly:

### 🪟 Windows (10 / 11)

| Package Type | Architecture | Size | Direct Download Link | Description |
|---|---|---|---|---|
| **⭐ Standard Setup (Recommended)** | `x64` (64-bit) | **3.62 MB** | [⬇️ **Download `Lexora_0.1.1_x64-setup.exe`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_x64-setup.exe) | Automatic installation with `.md` & `.txt` double-click file associations |
| **🏢 Enterprise MSI** | `x64` (64-bit) | **5.19 MB** | [⬇️ **Download `Lexora_0.1.1_x64_en-US.msi`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_x64_en-US.msi) | Windows Installer package suitable for enterprise/IT deployment |

---

### 🍎 macOS (macOS 11+)

| Package Type | Architecture | Size | Direct Download Link | Description |
|---|---|---|---|---|
| **⭐ Apple Silicon (Recommended)** | `M1 / M2 / M3 / M4` | **4.98 MB** | [⬇️ **Download `Lexora_0.1.1_Apple-Silicon.dmg`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_Apple-Silicon.dmg) | Native DMG build optimized for Apple Silicon Macs |
| **Intel Mac** | `x64` (Intel) | **5.34 MB** | [⬇️ **Download `Lexora_0.1.1_x64.dmg`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_x64.dmg) | Native DMG build for Intel-based Macs |

---

### 🐧 Linux (Ubuntu / Debian / Fedora / Arch)

| Package Type | Architecture | Size | Direct Download Link | Description |
|---|---|---|---|---|
| **⭐ AppImage (Universal)** | `x86_64` (64-bit) | **64.8 MB** | [⬇️ **Download `Lexora_0.1.1_amd64.AppImage`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_amd64.AppImage) | Portable, run directly across all Linux distributions |
| **Debian / Ubuntu Package** | `amd64` (64-bit) | **5.14 MB** | [⬇️ **Download `Lexora_0.1.1_amd64.deb`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora_0.1.1_amd64.deb) | Native `.deb` package for Debian, Ubuntu, Linux Mint |
| **RedHat / Fedora Package** | `x86_64` (64-bit) | **4.99 MB** | [⬇️ **Download `Lexora-0.1.1-1.x86_64.rpm`**](https://github.com/BerryUIKI/Lexora/releases/download/v0.1.1/Lexora-0.1.1-1.x86_64.rpm) | Native `.rpm` package for Fedora, RHEL, openSUSE |

> 💡 *View all release assets, source code archives, and previous releases on our [**GitHub Releases Page**](https://github.com/BerryUIKI/Lexora/releases).*

---

## 📖 Introduction

**Lexora** is an open-source Markdown reader and editor engineered for writers, developers, and researchers who want the speed of plain-text Markdown without the cognitive overhead of split-screen previews.

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

| Feature | Highlights | Status |
|---|---|:---:|
| 🌐 **9-Language i18n System** | Native support for **English**, **简体中文**, **繁體中文**, **日本語**, **한국어**, **Deutsch**, **Français**, **Español**, and **Русский** with OS auto-detection | ✅ Complete |
| 🪟 **VS Code-Style Custom Titlebar** | Frameless window with custom draggable titlebar, theme-matched menus (`File`, `Edit`, `View`, `Window`, `Help`), and min/max/close controls | ✅ Complete |
| 🏷️ **Windows `.md` File Association** | Automatically associates `.md`, `.markdown`, `.mdx`, and `.txt` files; double-click in Windows Explorer to open directly | ✅ Complete |
| 🔄 **Tri-State Display Modes** | Quickly switch between **Reading** (read-only), **Writing** (Typora-style WYSIWYG), and **Code** (source code with line sync) | ✅ Complete |
| 📥 **Intelligent Drag & Drop** | Drag file into window to open; drag onto tab bar for new tabs; drag into text to insert formatted Markdown links | ✅ Complete |
| ✍️ **In-Place Formatting** | Format selections directly with standard shortcuts (<kbd>Ctrl+B</kbd> for bold, <kbd>Ctrl+0</kbd> for paragraph, <kbd>Ctrl+1~6</kbd> for headings) | ✅ Complete |
| 🔲 **Monochrome Vector UI** | Pure, minimalist theme-adaptive vector SVGs (`stroke="currentColor"`) that keep focus on your text | ✅ Complete |
| 💾 **Crash-Safe Atomic Saving** | Never lose your work with atomic file writes (`write to .tmp -> rename`) and dirty state tracking | ✅ Complete |
| 📂 **Workspace Tree & Tabs** | Multi-document tabs, recursive file tree CRUD operations, and quick file switcher (<kbd>Ctrl+P</kbd>) | ✅ Complete |
| 🌈 **Code Syntax Highlighting** | High-performance code block highlighting via `syntect` with language tags and copy button | ✅ Complete |
| 📑 **TOC Outline Navigation** | Auto-generated Table of Contents with smooth anchor scrolling across all display modes | ✅ Complete |
| 🔍 **Find & Replace** | In-document regex search with case matching (<kbd>Ctrl+F</kbd>/<kbd>Ctrl+H</kbd>) | ✅ Complete |
| 🔎 **Global Workspace Search** | Multi-file full-text ripgrep-grade search across workspace folders (<kbd>Ctrl+Shift+F</kbd>) | ✅ Complete |
| 📤 **Standalone HTML Export** | Export self-contained styled HTML documents with clean print typography (<kbd>Ctrl+E</kbd>) | ✅ Complete |
| 📊 **Mermaid Diagrams & Math** | Live rendering containers for Mermaid diagrams and LaTeX KaTeX math formulas | ✅ Complete |
| 🧘 **Zen & Focus Modes** | Distraction-free full-screen writing environment (<kbd>F11</kbd> / <kbd>Ctrl+Shift+D</kbd>) | ✅ Complete |

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
| <kbd>Ctrl</kbd> + <kbd>N</kbd> | Create new document tab |
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

- **Shell & Security**: [Tauri 2](https://tauri.app) with granular least-privilege security capabilities
- **Native Backend**: [Rust 1.85](https://www.rust-lang.org) (edition 2024)
- **Frontend Framework**: [SolidJS 1.9](https://www.solidjs.com) (fine-grained reactive DOM)
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
# 1. Clone repository
git clone https://github.com/BerryUIKI/Lexora.git
cd Lexora

# 2. Install dependencies
pnpm install

# 3. Run local development environment
pnpm tauri dev
```

### Verification & Testing
```bash
# Run Vitest test suite
pnpm vitest run

# Strict TypeScript type check
pnpm tsc --noEmit

# Run Rust backend test suite
cargo test --manifest-path src-tauri/Cargo.toml

# Production package build
pnpm tauri build
```

---

## 🤝 Contributing & Community

Contributions, feature suggestions, and bug reports are warmly welcome!
- **GitHub Repository**: [github.com/BerryUIKI/Lexora](https://github.com/BerryUIKI/Lexora)
- **Issue Tracker**: [github.com/BerryUIKI/Lexora/issues](https://github.com/BerryUIKI/Lexora/issues)
- **Contribution Guide**: [CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 📄 License

Lexora is open-source software licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).
Copyright &copy; 2026 Lexora Contributors.
