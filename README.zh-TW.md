<div align="center">

[ [English](README.md) ] · [ [简体中文](README.zh-CN.md) ] · [ **繁體中文** ] · [ [日本語](README.ja.md) ] · [ [한국어](README.ko.md) ] · [ [Deutsch](README.de.md) ] · [ [Français](README.fr.md) ] · [ [Español](README.es.md) ] · [ [Русский](README.ru.md) ]

# ✨ Lexora

**一款 Typora 風格、本機優先、極速響應的 Markdown 閱讀與原位所見即所得編輯器。**

[![Release](https://img.shields.io/badge/release-latest-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 本機優先</b> • <b>⚡ 毫秒級極速冷啟動 (&lt;400ms)</b> • <b>📝 無需分割視窗即時排版</b> • <b>🌐 9 種語言介面</b> • <b>📦 輕量安裝包 (~3.6 MB)</b>
</p>

[**📥 立即下載最新版**](#-一鍵直接下載) • [**🌟 核心功能**](#-核心功能亮點) • [**⌨️ 常用快捷鍵**](#-常用快捷鍵) • [**📖 開發者文件**](docs/DEVELOPMENT.md)

</div>

---

## 📥 一鍵直接下載

完全無需 GitHub 使用經驗！點擊對應作業系統一鍵直接下載最新安裝包：

### 🪟 Windows (10 / 11)

| 安裝包類型 | 系統架構 | 體積 | 一鍵直鏈下載 | 說明 |
|---|---|---|---|---|
| **⭐ 標準安裝包 (推薦)** | `x64` (64 位元) | **~3.6 MB** | [⬇️ **下載最新 Windows 安裝包 (`.exe`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64-setup.exe) | 自動安裝精靈，支援 `.md`、`.txt` 檔案按兩下直接關聯開啟 |
| **🏢 企業級 MSI** | `x64` (64 位元) | **~5.2 MB** | [⬇️ **下載最新 Windows 企業包 (`.msi`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64_en-US.msi) | Windows Installer 標準封裝，適合企業 IT 部署 |

---

### 🍎 macOS (macOS 11+)

| 安裝包類型 | 系統架構 | 體積 | 一鍵直鏈下載 | 說明 |
|---|---|---|---|---|
| **⭐ Apple Silicon (推薦)** | `M1 / M2 / M3 / M4` | **~5.0 MB** | [⬇️ **下載最新 Apple Silicon 映像檔 (`.dmg`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Apple-Silicon.dmg) | 專為 Apple M 系列晶片最佳化的原生 DMG 映像檔 |
| **Intel Mac** | `x64` (Intel) | **~5.3 MB** | [⬇️ **下載最新 Intel Mac 映像檔 (`.dmg`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_x64.dmg) | 適用於 Intel 處理器的 Mac 原生 DMG |

---

### 🐧 Linux (Ubuntu / Debian / Fedora / Arch)

| 安裝包類型 | 系統架構 | 體積 | 一鍵直鏈下載 | 說明 |
|---|---|---|---|---|
| **⭐ AppImage (通用)** | `x86_64` (64 位元) | **~65 MB** | [⬇️ **下載最新通用 AppImage**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.AppImage) | 便攜免安裝，支援各大主流 Linux 發行版 |
| **Debian / Ubuntu 套件** | `amd64` (64 位元) | **~5.1 MB** | [⬇️ **下載最新 Debian/Ubuntu 套件 (`.deb`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_amd64.deb) | 適用於 Debian、Ubuntu、Linux Mint 等 |
| **RedHat / Fedora 套件** | `x86_64` (64 位元) | **~5.0 MB** | [⬇️ **下載最新 Fedora/RHEL 套件 (`.rpm`)**](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora-x86_64.rpm) | 適用於 Fedora、RHEL、openSUSE 等 |

> 💡 *如需查看歷史版本、校驗碼或原始碼歸檔，請造訪 [**GitHub Releases 發行頁面**](https://github.com/BerryUIKI/Lexora/releases/latest)。*

---

## 📖 專案簡介

**Lexora** 是一款為作家、開發者與學者量身打造的開源 Markdown 編輯器。它徹底摒棄傳統編輯器“左邊寫程式碼、右邊看預覽”的分割視窗模式，採用如同 Typora 的原位即時排版渲染。

基於 **Tauri 2 + Rust + SolidJS** 現代技術棧構建，擁有流暢原生效能與極簡沉浸的寫作體驗。

---

## 🌟 核心功能亮點

| 功能分類 | 特性說明 | 狀態 |
|---|---|:---:|
| 🌐 **9 語言國際化** | 原生支援 **繁體中文**、**簡體中文**、**English**、**日本語**、**한국어**、**Deutsch**、**Français**、**Español**、**Русский**，自動辨識系統語言 | ✅ 已就緒 |
| 🪟 **VS Code 風格標題列** | 無邊框設計，自訂可拖曳標題列、跟隨佈景主題配色的頂級選單與標準視窗控制按鈕 | ✅ 已就緒 |
| 🏷️ **Windows `.md` 檔案關聯** | 自動註冊關聯 `.md`、`.markdown`、`.mdx` 與 `.txt`，在檔案總管中按兩下直接開啟 | ✅ 已就緒 |
| 🔄 **三態顯示模式** | 一鍵無縫切換：**閱讀模式** (唯讀渲染)、**寫作模式** (所見即所得) 與 **原始碼模式** (行號同步) | ✅ 已就緒 |
| 📥 **智慧拖曳** | 拖曳檔案即開、拖至分頁列開啟新分頁、拖至文字內自動插入格式化連結 | ✅ 已就緒 |
| ✍️ **原位快捷排版** | 選取文字直接快捷排版 (<kbd>Ctrl+B</kbd> 粗體、<kbd>Ctrl+0</kbd> 正文段落、<kbd>Ctrl+1~6</kbd> 標題) | ✅ 已就緒 |
| 🔲 **單色向量圖示** | 全域採用自適應佈景主題色的單色向量 SVG 圖示 (`stroke="currentColor"`) | ✅ 已就緒 |
| 💾 **防當機原子化儲存** | 採用 Rust 原子寫入機制 (`.tmp` 寫入 -> 瞬間原子重新命名)，杜絕掉電遺失檔案 | ✅ 已就緒 |
| 📂 **工作區與多分頁** | 支援多文件分頁瀏覽、側邊欄遞迴檔案目錄管理與快速切換器 (<kbd>Ctrl+P</kbd>) | ✅ 已就緒 |
| 🌈 **程式碼語法突顯** | 基於 Rust `syntect` 高效能著色，帶語言標籤與一鍵複製按鈕 | ✅ 已就緒 |
| 📑 **動態大綱目錄** | 擷取各級標題產生階層化文件大綱，點擊平滑滾動定位 | ✅ 已就緒 |
| 📊 **Mermaid 圖表與數學公式** | 支援流程圖、循序圖、類別圖與 LaTeX / KaTeX 數學公式渲染 | ✅ 已就緒 |
| 🔍 **Ripgrep 全域搜尋** | 極速全工作區全文檢索 (<kbd>Ctrl+Shift+F</kbd>) 與單文件搜尋取代 (<kbd>Ctrl+F</kbd>) | ✅ 已就緒 |
| 📤 **獨立 HTML 匯出** | 一鍵將任意 Markdown 匯出為自包含、離線樣式的獨立網頁 (<kbd>Ctrl+E</kbd>) | ✅ 已就緒 |

---

## ⌨️ 常用快捷鍵

| 分類 | 快捷鍵 | 功能操作 |
|---|---|---|
| **文件操作** | <kbd>Ctrl</kbd> + <kbd>N</kbd> | 新增文件 |
| | <kbd>Ctrl</kbd> + <kbd>O</kbd> | 開啟檔案... |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | 開啟工作區資料夾... |
| | <kbd>Ctrl</kbd> + <kbd>S</kbd> | 儲存目前文件 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | 另存新檔... |
| | <kbd>Ctrl</kbd> + <kbd>W</kbd> | 關閉目前分頁 |
| | <kbd>Ctrl</kbd> + <kbd>E</kbd> | 匯出為獨立 HTML 檔案... |
| **文字排版** | <kbd>Ctrl</kbd> + <kbd>B</kbd> | 切換粗體 |
| | <kbd>Ctrl</kbd> + <kbd>I</kbd> | 切換斜體 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> | 切換刪除線 |
| | <kbd>Ctrl</kbd> + <kbd>K</kbd> | 插入 / 包裝超連結 |
| | <kbd>Ctrl</kbd> + <kbd>`</kbd> | 切換行內程式碼 |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> | 轉換為標準正文段落 |
| | <kbd>Ctrl</kbd> + <kbd>1</kbd> ~ <kbd>6</kbd> | 轉換為 1 級 ~ 6 級標題 |
| **檢索導覽** | <kbd>Ctrl</kbd> + <kbd>P</kbd> | 快速文件切換器 |
| | <kbd>Ctrl</kbd> + <kbd>F</kbd> | 文件內搜尋 |
| | <kbd>Ctrl</kbd> + <kbd>H</kbd> | 文件內取代 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | 全工作區全文搜尋 |
| **檢視外觀** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | 折疊 / 展開側邊欄 (檔案 / 大綱) |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | 切換專注模式 (隱藏介面干擾) |
| | <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>-</kbd> | 放大 / 縮小字級 |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> (數字鍵盤) | 重設預設字級 (16px) |

*(在 macOS 上，請將 <kbd>Ctrl</kbd> 替換為 <kbd>Cmd</kbd>)*

---

## 📄 開源許可證

本專案基於 **GNU Affero General Public License v3.0 (AGPL-3.0)** 許可證開源。詳情請參閱 [LICENSE](LICENSE) 檔案。
