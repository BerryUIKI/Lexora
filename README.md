<div align="center">

# ✨ Lexora

**A Typora-style, high-performance Markdown reader & editor built with Tauri 2 + Rust + SolidJS.**

[![Release](https://img.shields.io/badge/release-v0.1.0-4361ee.svg?style=flat-square)](https://github.com/BerryUIKI/Lexora/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=flat-square&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=flat-square&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=flat-square&logo=solid&logoColor=white)](https://www.solidjs.com/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](docs/CONTRIBUTING.md)

<p align="center">
  <b>Local-first</b> • <b>Blazing fast</b> • <b>Zero split-panes</b> • <b>Tiny bundle (~3.4 MB)</b>
</p>

</div>

---

## 📖 Introduction

**Lexora** is an open-source Markdown reader and editor engineered for writers, developers, and researchers who want the power of plain-text Markdown without the cognitive overhead of split-screen previews.

Built on **Tauri 2** and **Rust** with a fine-grained reactive **SolidJS** frontend, Lexora combines native desktop responsiveness with a minimalist, distraction-free aesthetic.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Lexora                                                                — □ ✕ │
├───────────────┬─────────────────────────────────────────────────────────────┤
│ TABLE OF CONT │                                                             │
│               │   # Introduction                                            │
│ • Overview    │                                                             │
│ • Features    │   Lexora eliminates split-screen previews by rendering      │
│ • Architecture│   Markdown directly in place.                               │
│ • Roadmap     │                                                             │
│               │   | Feature         | Performance  | Memory  |              │
│               │   |-----------------|--------------|---------|              │
│               │   | Startup Time    | < 500 ms     | ~30 MB  |              │
│               │   | Parsing Speed   | Zero-copy    | Minimal |              │
│               │                                                             │
├───────────────┴─────────────────────────────────────────────────────────────┤
│ ◧  📂  README.md                 Ln 1, Col 1  |  1,420 words   |  ☀ Light   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Key Features

| Feature | Description | Status |
|---|---|:---:|
| 📑 **TOC Navigation** | Auto-generated Table of Contents with smooth scrolling to sections | ✅ v0.1.0 |
| ⚡ **Zero-Copy Parsing** | High-throughput AST parsing in Rust powered by `pulldown-cmark` | ✅ v0.1.0 |
| 🛡️ **File Watcher** | Real-time background detection of external file edits via `notify` | ✅ v0.1.0 |
| 🎨 **Theme Palette** | Tokyo Night-inspired dark mode, clean light mode, and system sync | ✅ v0.1.0 |
| 📦 **Tiny Footprint** | Complete NSIS installer under **3.4 MB**; launch time under 500 ms | ✅ v0.1.0 |
| ✍️ **In-Place WYSIWYG** | Typora-style inline editing; reveal syntax on focus, render on blur | 🚧 v0.2.0 |
| 💾 **Atomic File I/O** | Crash-safe atomic saving (`write to .tmp -> rename`) with dirty state | 🚧 v0.2.0 |
| 📂 **Workspace & Tabs** | Multi-document tabs, recursive file tree, and quick switcher (<kbd>Ctrl+P</kbd>) | ⏳ v0.3.0 |
| 🌈 **Code Syntax** | Sublime-grade code block syntax highlighting via `syntect` | ⏳ v0.4.0 |
| 🔍 **Search & Outline** | In-document Find & Replace (<kbd>Ctrl+F</kbd>) and workspace-wide search | ⏳ v0.5.0 |
| 📐 **KaTeX & Mermaid** | Rich LaTeX math formulas (`$$...$$`) and dynamic diagrams (`mermaid`) | ⏳ v0.6.0 |
| 📄 **Export Engine** | High-fidelity export to PDF, HTML, and EPUB | ⏳ v1.0.0 |

---

## 📥 Installation & Download

### Windows
Download the latest binaries from our [**GitHub Releases**](https://github.com/BerryUIKI/Lexora/releases):

- **Standard Installer (Recommended)**: [`Lexora_0.1.0_x64-setup.exe`](https://github.com/BerryUIKI/Lexora/releases) *(3.38 MB)*
- **Enterprise MSI Package**: [`Lexora_0.1.0_x64_en-US.msi`](https://github.com/BerryUIKI/Lexora/releases) *(4.92 MB)*
- **Standalone Portable**: [`lexora.exe`](https://github.com/BerryUIKI/Lexora/releases) *(run directly without installation)*

### macOS & Linux
*macOS `.dmg` and Linux `.AppImage` / `.deb` packaging are scheduled for milestone v0.3.0+. You can build from source today.*

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open Markdown file via native dialog |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save active document *(v0.2.0)* |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Toggle Bold formatting *(v0.2.0)* |
| <kbd>Ctrl</kbd> + <kbd>I</kbd> | Toggle Italic formatting *(v0.2.0)* |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | Undo *(v0.2.0)* |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Redo *(v0.2.0)* |
| <kbd>Ctrl</kbd> + <kbd>1..6</kbd> | Set Heading level 1–6 *(v0.2.0)* |

---

## 🏗️ Architecture & Technology Stack

Lexora is built with a dual-runtime architecture emphasizing safety and performance:

```mermaid
graph TB
    subgraph Frontend ["Frontend — Webview (SolidJS)"]
        UI["SolidJS UI Chrome"]
        TOC["TOC Sidebar"]
        View["Markdown Viewport"]
        Store["Signals / State Store"]
        IPC_FE["Typed IPC Wrappers"]
    end

    subgraph Backend ["Backend — Native Process (Rust)"]
        CMD["Tauri Command Handlers"]
        Parser["pulldown-cmark Parser"]
        Watcher["notify File Watcher"]
        FsService["Atomic FsService"]
        State["AppState (Mutex)"]
    end

    Disk[("Local Filesystem (.md)")]

    UI --> TOC
    UI --> View
    View --> Store
    Store --> IPC_FE
    IPC_FE -- "invoke() / events" --> CMD
    CMD --> Parser
    CMD --> Watcher
    CMD --> FsService
    CMD --> State
    FsService <--> Disk
    Watcher -. "watch" .-> Disk
```

- **Backend**: [Rust](https://www.rust-lang.org/) + [Tauri 2](https://tauri.app/) for native capabilities, system windowing, security sandboxing, and atomic file I/O.
- **Frontend**: [SolidJS](https://www.solidjs.com/) + [TypeScript](https://www.typescriptlang.org/) for surgical DOM updates without virtual DOM overhead.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom CSS custom properties for dynamic theming.
- **Parsing**: [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark) for zero-copy, CommonMark & GFM compliant parsing.
- **Syntax Highlighting**: [syntect](https://github.com/trishume/syntect) for Sublime Text-grade syntax coloring.

---

## 🛠️ Development & Building from Source

### Prerequisites
- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- [Rust](https://rustup.rs/) 1.85+
- [Tauri Environment Prerequisites](https://v2.tauri.app/start/prerequisites/)

### Setup & Run
```bash
# Clone repository
git clone https://github.com/BerryUIKI/Lexora.git
cd Lexora

# Install dependencies
pnpm install

# Start development app with live HMR
pnpm tauri dev
```

### Run Tests
```bash
# Run Rust backend test suite
cargo test --manifest-path src-tauri/Cargo.toml

# Typecheck frontend
pnpm tsc --noEmit

# Test production build
pnpm build
```

### Build Production Bundle
```bash
pnpm tauri build
```
The compiled binaries will be output to `src-tauri/target/release/bundle/`.

---

## 📚 Documentation Index

- 📐 [**System Architecture & Data Flow**](docs/ARCHITECTURE.md)
- 🎯 [**Milestones & Release Schedule**](docs/MILESTONES.md)
- 🚀 [**Next Steps: Phase 2 Execution Plan**](docs/NEXT_STEPS.md)
- 🌿 [**Collaboration & Engineering Handbook**](docs/COLLABORATION.md)
- 🗺️ [**Phased Roadmap & MoSCoW Matrix**](docs/ROADMAP.md)
- ⚖️ [**Architectural Decision Records (ADRs)**](docs/DESIGN_DECISIONS.md)
- 💻 [**Development Guide & Setup**](docs/DEVELOPMENT.md)
- 🤝 [**Contributing Guidelines**](docs/CONTRIBUTING.md)
- 📜 [**Changelog**](CHANGELOG.md)

---

## 📄 License

Lexora is open-source software licensed under the [**MIT License**](LICENSE).
