<div align="center">

[ [English](README.md) ] · [ **简体中文** ] · [ [繁體中文](README.zh-TW.md) ] · [ [日本語](README.ja.md) ] · [ [한국어](README.ko.md) ] · [ [Deutsch](README.de.md) ] · [ [Français](README.fr.md) ] · [ [Español](README.es.md) ] · [ [Русский](README.ru.md) ]

# ✨ Lexora

**一款 Typora 风格、本地优先、极速响应的 Markdown 阅读与原位所见即所得编辑器。**

[![Release](https://img.shields.io/badge/release-latest-4361ee.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases/latest)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-10b981.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-6366f1.svg?style=for-the-badge)](https://github.com/BerryUIKI/Lexora/releases)
[![Tauri 2](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.85+-DEA584?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9+-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/)

<p align="center">
  <b>🚀 本地优先</b> • <b>⚡ 毫秒级极速冷启动 (&lt;400ms)</b> • <b>📝 无需分屏实时排版</b> • <b>🌐 9 种语言界面</b> • <b>📦 轻量安装包 (~3.6 MB)</b>
</p>

[**📥 立即下载最新版**](#-一键直接下载) • [**🌟 核心功能**](#-核心功能亮点) • [**⌨️ 常用快捷键**](#-常用快捷键) • [**📖 开发者文档**](docs/DEVELOPMENT.md)

</div>

---

## 📥 一键直接下载

选择操作系统和安装包：

- **Windows x86_64：** [安装程序 (`.exe`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.exe) · [MSI](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.msi)
- **macOS Apple Silicon：** [DMG](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_aarch64.dmg)
- **macOS Intel：** [DMG](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_x86_64.dmg)
- **Linux x86_64：** [AppImage](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.AppImage) · [Debian/Ubuntu (`.deb`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.deb) · [Fedora/RHEL (`.rpm`)](https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.rpm)

[查看全部发行版和源码归档](https://github.com/BerryUIKI/Lexora/releases/latest)。

---

## 📖 项目简介

**Lexora** 是一款为作家、开发者与学者量身定制的开源 Markdown 编辑器。它彻底摒弃了传统编辑器“左边写代码、右边看预览”的分屏模式，采用如同 Typora 的原位即时排版渲染。

基于 **Tauri 2 + Rust + SolidJS** 现代技术栈开发，拥有近乎原生的桌面性能与极简沉浸的交互体验。

---

## 🌟 核心功能亮点

| 功能分类 | 特性说明 | 状态 |
|---|---|:---:|
| 🌐 **9 语言国际化** | 原生支持 **简体中文**、**繁體中文**、**English**、**日本語**、**한국어**、**Deutsch**、**Français**、**Español**、**Русский**，自动识别系统语言 | ✅ 已就绪 |
| 🪟 **平台原生窗口外观** | Windows/Linux 使用紧凑的自定义控件，macOS 保留原生“红黄绿”窗口按钮 | ✅ 已就绪 |
| 🏷️ **Windows `.md` 关联** | 自动注册关联 `.md`、`.markdown`、`.mdx` 与 `.txt`，在资源管理器中双击即刻打开 | ✅ 已就绪 |
| 🔄 **三态显示模式** | 一键无缝切换：**阅读模式** (只读渲染)、**写作模式** (所见即所得) 与 **源码模式** (行号同步) | ✅ 已就绪 |
| 📥 **智能拖拽** | 拖拽文件即开、拖到标签栏开启新标签页、拖到文本内自动插入格式化链接 | ✅ 已就绪 |
| ✍️ **原位快捷排版** | 选中文字直接快捷排版 (<kbd>Ctrl+B</kbd> 加粗、<kbd>Ctrl+0</kbd> 正文段落、<kbd>Ctrl+1~6</kbd> 标题) | ✅ 已就绪 |
| 🔲 **单色矢量图标** | 全局采用自适应主题色的单色矢量 SVG 图标 (`stroke="currentColor"`)，告别杂乱视觉干扰 | ✅ 已就绪 |
| 💾 **防崩溃原子化保存** | 采用 Rust 原子写入机制 (`.tmp` 写入 -> 瞬间原子重命名)，杜绝掉电与崩溃丢文件 | ✅ 已就绪 |
| 📂 **工作区与多标签** | 支持多文档分标签浏览、侧边栏递归文件目录管理与快捷切换器 (<kbd>Ctrl+P</kbd>) | ✅ 已就绪 |
| 🌈 **代码块语法高亮** | 基于 Rust `syntect` 高性能着色，带语言标签与一键复制按钮 | ✅ 已就绪 |
| 📑 **动态大纲目录** | 提取各级标题生成层次化文档大纲，点击平滑滚动定位 | ✅ 已就绪 |
| 📊 **Mermaid 图表与数学公式** | 支持流程图、时序图、类图与 LaTeX / KaTeX 数学公式渲染 | ✅ 已就绪 |
| 🔍 **Ripgrep 全局搜索** | 极速全工作区全文检索 (<kbd>Ctrl+Shift+F</kbd>) 与单文档查找替换 (<kbd>Ctrl+F</kbd>) | ✅ 已就绪 |
| 📤 **独立 HTML 导出** | 一键将任意 Markdown 导出为自包含、离线离线样式的独立网页 (<kbd>Ctrl+E</kbd>) | ✅ 已就绪 |

---

## ⌨️ 常用快捷键

| 分类 | 快捷键 | 功能操作 |
|---|---|---|
| **文档操作** | <kbd>Ctrl</kbd> + <kbd>N</kbd> | 新建文档 |
| | <kbd>Ctrl</kbd> + <kbd>O</kbd> | 打开文件... |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | 打开工作区文件夹... |
| | <kbd>Ctrl</kbd> + <kbd>S</kbd> | 保存当前文档 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | 另存为... |
| | <kbd>Ctrl</kbd> + <kbd>W</kbd> | 关闭当前标签页 |
| | <kbd>Ctrl</kbd> + <kbd>E</kbd> | 导出为独立 HTML 文件... |
| **文本排版** | <kbd>Ctrl</kbd> + <kbd>B</kbd> | 粗体切换 |
| | <kbd>Ctrl</kbd> + <kbd>I</kbd> | 斜体切换 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> | 删除线切换 |
| | <kbd>Ctrl</kbd> + <kbd>K</kbd> | 插入 / 包装超链接 |
| | <kbd>Ctrl</kbd> + <kbd>`</kbd> | 行内代码切换 |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> | 转换为标准正文段落 |
| | <kbd>Ctrl</kbd> + <kbd>1</kbd> ~ <kbd>6</kbd> | 转换为 1 级 ~ 6 级标题 |
| **检索导航** | <kbd>Ctrl</kbd> + <kbd>P</kbd> | 快速文档切换器 |
| | <kbd>Ctrl</kbd> + <kbd>F</kbd> | 文档内查找 |
| | <kbd>Ctrl</kbd> + <kbd>H</kbd> | 文档内替换 |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | 全工作区全文搜索 |
| **视图外观** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | 折叠 / 展开侧边栏 (文件 / 大纲) |
| | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> | 切换专注模式 (隐藏界面干扰) |
| | <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>-</kbd> | 放大 / 缩小字号 |
| | <kbd>Ctrl</kbd> + <kbd>0</kbd> (数字键盘) | 恢复默认字号 (16px) |

*(在 macOS 上，请将 <kbd>Ctrl</kbd> 替换为 <kbd>Cmd</kbd>)*

---

## 💻 开发者指南

### 环境要求
* [Node.js](https://nodejs.org/) 20+
* [pnpm](https://pnpm.io/) 9+
* [Rust](https://rustup.rs/) 1.85+
* [Tauri 2 环境配置](https://v2.tauri.app/start/prerequisites/)

### 本地运行与构建
```bash
git clone https://github.com/BerryUIKI/Lexora.git
cd Lexora

# 安装前端依赖
pnpm install

# 启动本地 Tauri 开发环境
pnpm tauri dev

# 编译各平台生产版安装包
pnpm tauri build
```

---

## 📄 开源许可证

本项目基于 **GNU Affero General Public License v3.0 (AGPL-3.0)** 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。
