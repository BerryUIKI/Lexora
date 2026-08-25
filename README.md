<div align="center">

[ **English** ] · [ [简体中文](README.zh-CN.md) ] · [ [繁體中文](README.zh-TW.md) ] · [ [日本語](README.ja.md) ] · [ [한국어](README.ko.md) ] · [ [Deutsch](README.de.md) ] · [ [Français](README.fr.md) ] · [ [Español](README.es.md) ] · [ [Русский](README.ru.md) ]

# ✨ Lexora

**A Typora-style, local-first, high-performance Markdown reader & in-place WYSIWYG editor.**

[![Release](https://img.shields.io/badge/release-latest-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 Local-first</b> • <b>⚡ Blazing fast (&lt;400ms startup)</b> • <b>📝 Zero split-panes</b> • <b>🌐 9 Languages</b> • <b>📦 Lightweight (~3.6 MB)</b>
</p>

[**📥 Download Latest Release**](#-instant-downloads) • [**🌟 Features**](#-key-features) • [**⌨️ Shortcuts**](#-keyboard-shortcuts) • [**📖 Documentation**](docs/DEVELOPMENT.md)

</div>

---

## 📥 Instant Downloads

Choose your platform and package:

- **Windows x86_64:** [Setup (`.exe`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.exe) · [MSI](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.msi)
- **macOS Apple Silicon:** [DMG](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_aarch64.dmg)
- **macOS Intel:** [DMG](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_x86_64.dmg)
- **Linux x86_64:** [AppImage](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.AppImage) · [Debian/Ubuntu (`.deb`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.deb) · [Fedora/RHEL (`.rpm`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.rpm)

[View all releases and source archives](https://github.com/BerryUIKI/Lexora/releases/latest).

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
| 🪟 **Platform-Native Window Chrome** | Theme-matched menus with compact custom controls on Windows/Linux and native traffic-light window controls on macOS | ✅ Complete |
| 🏷️ **Windows `.md` File Association** | Automatically associates `.md`, `.markdown`, `.mdx`, and `.txt` files; double-click in Windows Explorer to open directly | ✅ Complete |
| 🔄 **Tri-State Display Modes** | Quickly switch between **Reading** (read-only), **Writing** (Typora-style WYSIWYG), and **Code** (source code with line sync) | ✅ Complete |
| 📥 **Intelligent Drag & Drop** | Drag file into window to open; drag onto tab bar for new tabs; drag into text to insert formatted Markdown links | ✅ Complete |
| ✍️ **In-Place Formatting** | Format selections directly with standard shortcuts (<kbd>Ctrl+B</kbd> for bold, <kbd>Ctrl+0</kbd> for paragraph, <kbd>Ctrl+1~6</kbd> for headings) | ✅ Complete |
| 🔲 **Monochrome Vector UI** | Pure, minimalist theme-adaptive vector SVGs (`stroke="currentColor"`) that keep focus on your text | ✅ Complete |
| 💾 **Crash-Safe Atomic Saving** | Never lose your work with atomic file writes (`write to .tmp -> rename`) and dirty state tracking | ✅ Complete |
| 📂 **Workspace Tree & Tabs** | Multi-document tabs, recursive file tree CRUD operations, and quick file switcher (<kbd>Ctrl+P</kbd>) | ✅ Complete |
| 🌈 **Code Syntax Highlighting** | High-performance code block highlighting via `syntect` with language tags and copy button | ✅ Complete |
| 📑 **Dynamic Table of Contents** | Interactive document outline with smooth anchor scrolling across all display modes | ✅ Complete |
| 📊 **Mermaid Diagrams & Math** | Rich interactive flowchart, sequence, class diagrams, and LaTeX math formatting | ✅ Complete |
| 🔍 **Full-Text Ripgrep Search** | Instant whole-workspace full-text search (<kbd>Ctrl+Shift+F</kbd>) and in-document Find & Replace (<kbd>Ctrl+F</kbd>) | ✅ Complete |
| 📤 **Standalone HTML Export** | Export any document to self-contained, offline-styled HTML (<kbd>Ctrl+E</kbd>) | ✅ Complete |

---

## ⌨️ Keyboard Shortcuts

| Category | Shortcut | Action |
|---|---|---|
| **Document** | <kbd>Ctrl</kbd> + <kbd>N</kbd> | New Document |
| | <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open File... |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | Open Workspace Folder... |
| | <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save Current Document |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Save As... |
| | <kbd>Ctrl</kbd> + <kbd>W</kbd> | Close Current Tab |
| | <kbd>Ctrl</kbd> + <kbd>E</kbd> | Export Document as HTML... |
| **Editing** | <kbd>Ctrl</kbd> + <kbd>B</kbd> | Toggle Bold Formatting |
| | <kbd>Ctrl</kbd> + <kbd>I</kbd> | Toggle Italic Formatting |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> | Toggle Strikethrough |
| | <kbd>Ctrl</kbd> + <kbd>K</kbd> | Insert / Wrap Link |
| | <kbd>Ctrl</kbd> + <kbd>`</kbd> | Toggle Inline Code |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> | Format as Normal Paragraph |
| | <kbd>Ctrl</kbd> + <kbd>1</kbd> ~ <kbd>6</kbd> | Format as Heading 1 ~ Heading 6 |
| **Navigation & Search** | <kbd>Ctrl</kbd> + <kbd>P</kbd> | Quick File Switcher |
| | <kbd>Ctrl</kbd> + <kbd>F</kbd> | Find in Current Document |
| | <kbd>Ctrl</kbd> + <kbd>H</kbd> | Replace in Current Document |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | Search Across Workspace |
| **View** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | Toggle Sidebar (Files / Outline) |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | Toggle Focus Mode (Distraction-Free) |
| | <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>-</kbd> | Zoom In / Zoom Out Font Size |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> (NumPad) | Reset Font Size (16px) |

*(On macOS, replace <kbd>Ctrl</kbd> with <kbd>Cmd</kbd>)*

---

## 🛠️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│               Frontend (SolidJS + Webview)             │
│   • Reactive UI Components (MenuBar, Sidebar, Tabs)   │
│   • Editor Engine (Milkdown / ProseMirror WYSIWYG)     │
│   • Multi-language Engine (Solid Signals, 9 Locales)   │
│   • Typed IPC Wrappers (invoke / listen)               │
└──────────────────────────┬─────────────────────────────┘
                           │ IPC Bridge (JSON / Events)
┌──────────────────────────▼─────────────────────────────┐
│                 Backend (Rust Native App)              │
│   • State Management (Mutex<AppState>)                 │
│   • Native Update Checker (HTTPS Reqwest Client)       │
│   • Atomic File I/O & FS Watcher (notify crate)        │
│   • Zero-Copy AST Parser (pulldown-cmark)              │
│   • Code Syntax Highlighter (syntect)                  │
└────────────────────────────────────────────────────────┘
```

---

## 💻 Developer Setup

### Prerequisites
* [Node.js](https://nodejs.org/) 20+
* [pnpm](https://pnpm.io/) 9+
* [Rust](https://rustup.rs/) 1.85+
* [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

### Clone & Run Locally
```bash
git clone https://github.com/BerryUIKI/Lexora.git
cd Lexora

# Install frontend dependencies
pnpm install

# Start local Tauri dev server
pnpm tauri dev
```

### Production Build
```bash
# Build standalone executable & OS installers
pnpm tauri build
```

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for details.
