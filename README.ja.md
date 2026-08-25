<div align="center">

[ [English](README.md) ] · [ [简体中文](README.zh-CN.md) ] · [ [繁體中文](README.zh-TW.md) ] · [ **日本語** ] · [ [한국어](README.ko.md) ] · [ [Deutsch](README.de.md) ] · [ [Français](README.fr.md) ] · [ [Español](README.es.md) ] · [ [Русский](README.ru.md) ]

# ✨ Lexora

**Typora スタイルのローカルファースト、超高速 Markdown リーダー & インプレース WYSIWYG エディター。**

[![Release](https://img.shields.io/badge/release-latest-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 ローカルファースト</b> • <b>⚡ 超高速起動 (&lt;400ms)</b> • <b>📝 画面分割なしの即時レンダリング</b> • <b>🌐 9言語対応</b> • <b>📦 軽量 (~3.6 MB)</b>
</p>

[**📥 最新版をダウンロード**](#-ダイレクトダウンロード) • [**🌟 主な機能**](#-主な機能) • [**⌨️ ショートカット**](#-ショートカット一覧) • [**📖 開発ドキュメント**](docs/DEVELOPMENT.md)

</div>

---

## 📥 ダイレクトダウンロード

GitHub の操作知識は不要です！お使いの OS をクリックして最新インストーラーをダウンロードできます：

### 🪟 Windows (10 / 11)

| パッケージ | アーキテクチャ | サイズ | ダウンロードリンク | 説明 |
|---|---|---|---|---|
| **⭐ 標準インストーラー (推奨)** | `x64` (64ビット) | **~3.6 MB** | [⬇️ **最新 Windows インストーラー (`.exe`) をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64-setup.exe) | 自動インストール、`.md` と `.txt` のダブルクリック関連付け対応 |
| **🏢 企業向け MSI** | `x64` (64ビット) | **~5.2 MB** | [⬇️ **最新 Windows MSI (`.msi`) をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64_en-US.msi) | Windows Installer 形式、企業の一括展開に最適 |

---

### 🍎 macOS (macOS 11+)

| パッケージ | アーキテクチャ | サイズ | ダウンロードリンク | 説明 |
|---|---|---|---|---|
| **⭐ Apple Silicon (推奨)** | `M1 / M2 / M3 / M4` | **~5.0 MB** | [⬇️ **最新 Apple Silicon DMG をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Apple-Silicon.dmg) | Apple M シリーズチップに最適化されたネイティブ DMG |
| **Intel Mac** | `x64` (Intel) | **~5.3 MB** | [⬇️ **最新 Intel Mac DMG をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64.dmg) | Intel プロセッサ搭載 Mac 用 DMG |

---

### 🐧 Linux (Ubuntu / Debian / Fedora / Arch)

| パッケージ | アーキテクチャ | サイズ | ダウンロードリンク | 説明 |
|---|---|---|---|---|
| **⭐ AppImage (汎用)** | `x86_64` (64ビット) | **~65 MB** | [⬇️ **最新 AppImage をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.AppImage) | ポータブル、主要な Linux ディストリビューションで即座に実行可能 |
| **Debian / Ubuntu パッケージ** | `amd64` (64ビット) | **~5.1 MB** | [⬇️ **最新 Debian/Ubuntu パッケージ (`.deb`) をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.deb) | Debian、Ubuntu、Linux Mint 等に対応 |
| **RedHat / Fedora パッケージ** | `x86_64` (64ビット) | **~5.0 MB** | [⬇️ **最新 Fedora/RHEL パッケージ (`.rpm`) をダウンロード**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora-x86_64.rpm) | Fedora、RHEL、openSUSE 等に対応 |

> 💡 *過去のリリースやソースコードは [**GitHub Releases ページ**](https://github.com/BerryUIKI/Lexora/releases/latest) をご覧ください。*

---

## 🌟 主な機能

* 🌐 **9言語マルチリンガル**: 日本語、英語、簡体字中国語、繁体字中国語、韓国語、ドイツ語、フランス語、スペイン語、ロシア語をネイティブサポート。
* 🪟 **VS Code 風カスタムタイトルバー**: フレームレスウィンドウ、ドラッグ対応タイトルバー、テーマ適応メニュー。
* 🏷️ **Windows `.md` 関連付け**: `.md` ファイルのダブルクリックで直接起動。
* 🔄 **3つの表示モード**: リーディングモード (閲覧)、ライティングモード (WYSIWYG)、コードモード (行番号同期)。
* 💾 **クラッシュ防止アトミック保存**: 一時ファイル書き込み + アトミックリネームでデータ損失をゼロに。
* 🌈 **シンタックスハイライト**: `syntect` による高速コードブロック着色、コピーボタン付き。
* 📊 **Mermaid 図表 & 数式**: フローチャートや LaTeX 数式レンダリングに対応。
* 🔍 **全ワークスペース全文検索**: Ripgrep レベルの超高速全文検索 (<kbd>Ctrl+Shift+F</kbd>)。

---

## 📄 ライセンス

本プロジェクトは **GNU Affero General Public License v3.0 (AGPL-3.0)** のもとで公開されています。
