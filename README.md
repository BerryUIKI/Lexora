# Lexora

A Typora-style Markdown reader-editor built on [Tauri 2](https://tauri.app/) + Rust.

## Features (MVP)

- **WYSIWYG Markdown editing** — in-place rendering, no split panes
- **File tree sidebar** — browse and open `.md` files
- **Tabs** — work with multiple documents
- **Syntax highlighting** — code blocks highlighted via Rust `syntect`
- **Dark / Light themes** — automatic OS detection
- **Fast & lightweight** — native performance, ~10 MB installer

## Tech Stack

- **Backend**: Rust + Tauri 2
- **Frontend**: SolidJS + TypeScript + Tailwind CSS 4
- **Editor**: Milkdown (ProseMirror-based, Markdown-native)
- **Parsing**: pulldown-cmark (Rust)
- **Highlighting**: syntect (Rust)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- [Rust](https://rustup.rs/) 1.75+
- [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

### Setup

```bash
pnpm install
pnpm tauri dev
```

### Build

```bash
pnpm tauri build
```

## License

MIT
