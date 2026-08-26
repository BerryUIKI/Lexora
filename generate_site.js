// generate_site.js — Builds static landing & download pages for all 9 languages
const fs = require('fs');
const path = require('path');

const languages = {
  'en': {
    code: 'en',
    dir: '',
    name: 'English',
    htmlLang: 'en',
    title: 'Lexora — In-Place WYSIWYG Markdown Reader & Editor',
    metaDesc: 'A minimalist in-place WYSIWYG Markdown reader & editor. Render-as-you-type with zero split panes — built on Tauri 2 + Rust + SolidJS for instant response.',
    nav: { features: 'Features', download: 'Download', architecture: 'Architecture', shortcuts: 'Shortcuts', faq: 'FAQ & Notes', github: 'GitHub' },
    selectLang: 'Select display language',
    hero: {
      badge: 'v0.1.3 Released · AGPL-3.0 Open Source',
      title: 'Markdown, in&nbsp;place.',
      subtitle: 'A minimalist, high-performance in-place WYSIWYG Markdown reader & editor. Render-as-you-type with zero split panes — built on Tauri 2 + Rust + SolidJS for instant response.',
      downloadBtn: 'Download Now',
      githubBtn: 'View on GitHub',
      chips: ['<400ms cold start', 'Zero split panes', '9 languages', 'Fully offline']
    },
    mockup: {
      menu: ['File', 'Edit', 'View', 'Window', 'Help'],
      title: 'Lexora — README.md',
      outline: 'Outline',
      workspace: 'Workspace',
      introTitle: '# Introduction',
      introP1: 'Lexora eliminates split-screen previews by rendering Markdown directly in place with pure typography.',
      introP2: 'Zero split-panes · In-place WYSIWYG · Full-text ripgrep search.',
      metrics: ['Startup Time', '< 400 ms', 'Instant Cold Start', 'Full-text Search', 'ripgrep', 'Whole Workspace'],
      modes: ['Reading', 'Writing', 'Code'],
      status: 'Ln 1, Col 1  ·  1,420 words  ·  UTF-8  ·  LF'
    },
    features: {
      tag: 'CORE FEATURES',
      title: 'Focused writing, zero distractions',
      subtitle: 'Render-as-you-type. From outline and multi-tabs to ripgrep search, everything is tuned for clean, productive writing.',
      items: [
        { title: 'Tri-State Display Modes', desc: 'Reading / Writing / Code modes with synchronized line numbers and hotkey switching.' },
        { title: '9-Language i18n', desc: 'UI auto-detects system locale across 9 native languages with instant runtime switching.' },
        { title: 'Syntax Highlighting', desc: 'Syntect-powered syntax highlighting with language tags and one-click code copy button.' },
        { title: 'Mermaid & LaTeX', desc: 'Live interactive flowcharts, sequence diagrams, class diagrams, and KaTeX math formulas.' },
        { title: 'Ripgrep Full-Text Search', desc: 'Instant whole-workspace search (Ctrl+Shift+F) and in-document Find & Replace (Ctrl+F/H).' },
        { title: 'Crash-Safe Atomic Saving', desc: 'Atomic file writes (.tmp rename pattern) and real-time dirty-state tracking protect your edits.' },
        { title: 'Smart Drag & Drop', desc: 'Drop files into window to open, onto tab bar for new tabs, or into text to insert formatted links.' },
        { title: 'Standalone HTML Export', desc: 'One shortcut (Ctrl+E) to export self-contained, beautifully styled offline HTML files.' }
      ]
    },
    downloadSec: {
      tag: 'DOWNLOAD',
      title: 'Free download, get started now',
      subtitle: 'Automatically detects your operating system and highlights the recommended installer for Windows, macOS, and Linux.',
      recommended: 'RECOMMENDED FOR YOUR SYSTEM',
      winBtn: 'Download for Windows (.exe)',
      macBtn: 'Download for Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Download AppImage',
      otherDownloads: 'View All Packages & Checksums on Downloads Page →'
    },
    arch: {
      tag: 'ARCHITECTURE',
      title: 'Rust core, lightweight frontend',
      subtitle: 'Tauri 2 bridges a memory-safe Rust backend with a fine-grained reactive SolidJS webview — zero GC pauses and under 16ms input latency.',
      frontend: 'FRONTEND',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['Reactive UI Signals', 'Milkdown / ProseMirror', '9-Locale i18n', 'Typed IPC Wrappers'],
      ipc: 'IPC BRIDGE',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['Zero-Copy Commands', 'Event Channel Bus', 'Scoped Capabilities'],
      rust: 'RUST BACKEND',
      rustTitle: 'Native Engine',
      rustChips: ['pulldown-cmark AST', 'syntect Highlight', 'notify File Watcher', 'Atomic Write I/O']
    },
    shortcuts: {
      tag: 'SHORTCUTS',
      title: 'Keep your hands on the keys',
      subtitle: 'All standard Markdown shortcuts are supported — format, navigate, and manage documents seamlessly without leaving the keyboard.',
      doc: 'Document & File',
      edit: 'Formatting',
      nav: 'Navigation & View',
      items: [
        { group: 'doc', label: 'New document', key: 'Ctrl+N' },
        { group: 'doc', label: 'Open file', key: 'Ctrl+O' },
        { group: 'doc', label: 'Save document', key: 'Ctrl+S' },
        { group: 'doc', label: 'Save As...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Export to HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Bold', key: 'Ctrl+B' },
        { group: 'edit', label: 'Italic', key: 'Ctrl+I' },
        { group: 'edit', label: 'Headings 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Paragraph (Body text)', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insert link', key: 'Ctrl+K' },
        { group: 'nav', label: 'Quick file switcher', key: 'Ctrl+P' },
        { group: 'nav', label: 'Find in document', key: 'Ctrl+F' },
        { group: 'nav', label: 'Replace in document', key: 'Ctrl+H' },
        { group: 'nav', label: 'Workspace search', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Toggle display mode', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FAQ',
      title: 'Frequently asked questions',
      subtitle: 'Have a question or feedback? Open an issue or start a discussion on our GitHub repository.',
      changelogTitle: 'Latest Release',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'Native macOS window chrome controls',
        'Standardized release asset filenames',
        '9-language localized documentation',
        'Improved table contrast across all themes'
      ],
      items: [
        { q: 'What makes Lexora unique?', a: 'Lexora provides true in-place WYSIWYG editing with zero split panes. Markdown renders live as you type, and raw syntax reveals seamlessly under your cursor. Powered by Rust and Tauri 2, it delivers native speed without Electron bulk.' },
        { q: 'Is my data private and secure?', a: '100% local-first. All documents stay strictly on your local device with zero cloud telemetry. Atomic writes ensure you never lose work even during unexpected system shutdowns.' },
        { q: 'Which Markdown extensions are supported?', a: 'Lexora supports full GitHub Flavored Markdown (GFM), tables, task lists, code block syntax highlighting, Mermaid diagrams (flowcharts, sequence, class diagrams), and KaTeX math formulas.' },
        { q: 'Is Lexora free and open source?', a: 'Yes. Lexora is free and open-source under the GNU AGPL-3.0 license. Community contributions, bug reports, and translations are warmly welcome.' }
      ]
    },
    downloadPage: {
      title: 'Download Lexora — All Platforms',
      metaDesc: 'Download Lexora for Windows, macOS and Linux. Direct links to release assets — no redirects.',
      tag: 'v0.1.3 · Latest release',
      heading: 'Download Lexora',
      subheading: 'Every button links straight to the release asset — the download starts immediately, no redirects. We auto-detect your OS on the homepage.',
      backHome: '← Back to home',
      note: 'Asset naming follows <span class="font-medium text-ink-secondary">Lexora_&lt;OS&gt;_&lt;architecture&gt;</span> without embedded versions — <span class="font-mono">releases/latest/download</span> links always point to the newest build.',
      allReleases: 'All releases & source archives',
      viewGh: 'View on GitHub'
    }
  },

  'zh-CN': {
    code: 'zh-CN',
    dir: 'zh-CN',
    name: '简体中文',
    htmlLang: 'zh-CN',
    title: 'Lexora — 原位所见即所得 Markdown 阅读与编辑器',
    metaDesc: '基于 Tauri 2 + Rust + SolidJS 构建的极简本地优先 Markdown 阅读与即时所见即所得编辑器。告别分屏，原位即时渲染排版。',
    nav: { features: '核心特性', download: '下载安装', architecture: '技术架构', shortcuts: '快捷键', faq: '常见问题', github: 'GitHub' },
    selectLang: '选择界面显示语言',
    hero: {
      badge: 'v0.1.3 正式发布 · AGPL-3.0 开源协议',
      title: '原位排版，所见即所得。',
      subtitle: '极简、极速的本地优先 Markdown 原位所见即所得阅读与编辑器。告别传统双栏分屏，打字即时排版——基于 Tauri 2 + Rust + SolidJS 打造毫秒级流畅响应。',
      downloadBtn: '立即下载',
      githubBtn: 'GitHub 开源仓库',
      chips: ['<400ms 极速冷启动', '无需分屏原位渲染', '9 种原生语言', '100% 本地离线']
    },
    mockup: {
      menu: ['文件', '编辑', '视图', '窗口', '帮助'],
      title: 'Lexora — README.md',
      outline: '大纲目录',
      workspace: '工作区',
      introTitle: '# 项目简介',
      introP1: 'Lexora 彻底摒弃了传统“左边写代码、右边看预览”的分屏模式，采用极简沉浸的原位即时排版。',
      introP2: '零分屏 · 原位所见即所得 · Ripgrep 全局全文本搜索。',
      metrics: ['冷启动耗时', '< 400 毫秒', '毫秒级极速就绪', '全文搜索', 'ripgrep', '工作区全局秒搜'],
      modes: ['阅读', '写作', '源码'],
      status: '第 1 行, 第 1 列  ·  1,420 字  ·  UTF-8  ·  LF'
    },
    features: {
      tag: '核心特性',
      title: '专注纯粹写作，告别一切干扰',
      subtitle: '所见即所得打字排版。从文档大纲、多标签页到工作区全文搜索，所有设计皆为高效沉浸的写作体验而生。',
      items: [
        { title: '三态模式自由切换', desc: '一键无缝切换阅读模式（只读浏览）、写作模式（原位所见即所得）与源码模式（行号同步）。' },
        { title: '9 种语言国际化支持', desc: '内置 9 国本地化语言，根据系统环境全自动识别，随时在菜单中即时无缝切换。' },
        { title: '高性能代码高亮', desc: '基于 syntect 原生引擎打造，支持上百种编程语言高亮、语言徽标与一键复制功能。' },
        { title: 'Mermaid 图表与 LaTeX 数学', desc: '原生支持流程图、时序图、类图等 Mermaid 图表实时渲染，以及 KaTeX 行内/多行数学公式。' },
        { title: 'Ripgrep 全局全文秒搜', desc: '毫秒级工作区全文本快速搜索（Ctrl+Shift+F）与文档内查找替换（Ctrl+F/H）。' },
        { title: '崩溃级安全原子保存', desc: '采用临时文件原子覆写（.tmp rename）机制与实时脏状态追踪，从根源杜绝数据损坏或丢失。' },
        { title: '智能拖拽交互', desc: '拖入文件立即打开、拖到标签栏新建标签页、拖入文字区域自动生成规范 Markdown 超链接。' },
        { title: '单文件独立 HTML 导出', desc: '一键快捷键（Ctrl+E）导出样式完整、无需外链依赖的独立离线 HTML 网页。' }
      ]
    },
    downloadSec: {
      tag: '下载安装',
      title: '免费下载，即刻开启沉浸写作',
      subtitle: '自动识别您的操作系统，智能推荐适配 Windows、macOS 与 Linux 的最新安装包。',
      recommended: '当前操作系统推荐',
      winBtn: '下载 Windows 安装包 (.exe)',
      macBtn: '下载 Apple Silicon 安装镜像 (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: '下载通用 AppImage',
      otherDownloads: '前往完整下载列表查看全部安装包与校验码 →'
    },
    arch: {
      tag: '技术架构',
      title: 'Rust 系统级内核，轻量 SolidJS 前端',
      subtitle: '基于 Tauri 2 构建，Rust 原生后端与 SolidJS 细粒度响应式前端深度协作——内存安全、零垃圾回收卡顿、击键延迟低于 16ms。',
      frontend: '前端层',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['细粒度响应式 Signals', 'Milkdown / ProseMirror', '9 语言 i18n 引擎', '类型安全 IPC 封装'],
      ipc: 'IPC 通信桥',
      ipcTitle: 'Tauri 2 核心桥接',
      ipcChips: ['零拷贝 Commands', '异步 Event 事件总线', '最小权限安全能力管控'],
      rust: '系统内核',
      rustTitle: 'Rust 原生引擎',
      rustChips: ['pulldown-cmark AST 解析', 'syntect 语法高亮', 'notify 文件系统监听', '原子级文件 I/O 写入']
    },
    shortcuts: {
      tag: '常用快捷键',
      title: '双手无需离开键盘',
      subtitle: '支持所有主流 Markdown 常用快捷键，格式排版、文件管理与全局搜索皆可在指尖瞬间完成。',
      doc: '文档与文件',
      edit: '排版与格式',
      nav: '导航与视图',
      items: [
        { group: 'doc', label: '新建文档', key: 'Ctrl+N' },
        { group: 'doc', label: '打开文件', key: 'Ctrl+O' },
        { group: 'doc', label: '保存当前文档', key: 'Ctrl+S' },
        { group: 'doc', label: '另存为...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: '导出为 HTML', key: 'Ctrl+E' },
        { group: 'edit', label: '加粗', key: 'Ctrl+B' },
        { group: 'edit', label: '斜体', key: 'Ctrl+I' },
        { group: 'edit', label: '1~6 级标题', key: 'Ctrl+1~6' },
        { group: 'edit', label: '正文段落', key: 'Ctrl+0' },
        { group: 'edit', label: '插入超链接', key: 'Ctrl+K' },
        { group: 'nav', label: '快速文件切换器', key: 'Ctrl+P' },
        { group: 'nav', label: '文档内查找', key: 'Ctrl+F' },
        { group: 'nav', label: '文档内替换', key: 'Ctrl+H' },
        { group: 'nav', label: '工作区全文搜索', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '切换显示模式', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: '常见问题',
      title: '常见问题解答',
      subtitle: '有疑问或建议？欢迎前往 GitHub 提交 Issue 或参与讨论交流。',
      changelogTitle: '最新版本',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'macOS 原生红绿灯窗口控制按钮适配',
        '统一标准化发布安装包命名规范',
        '9 种语言本地化文档与下载矩阵',
        '全面优化表格对比度与暗黑主题显示'
      ],
      items: [
        { q: 'Lexora 与传统 Markdown 编辑器有何不同？', a: 'Lexora 采用彻底的原位所见即所得渲染，告别左右分屏。打字时光标所在处即时排版，无 Electron 的笨重包袱，冷启动仅需数百毫秒，带来极致轻快的原生桌面体验。' },
        { q: '我的文档数据安全吗？', a: '100% 本地优先。所有文档均完整保存在您的本地磁盘中，不上传任何云端服务器。配合底层原子写入机制，即便电脑突发断电也不会损坏文件。' },
        { q: '支持哪些 Markdown 扩展语法？', a: '完整支持 GitHub Flavored Markdown (GFM)、表格、任务列表、代码高亮、Mermaid 图表（流程图、时序图、类图等）以及 KaTeX 数学公式渲染。' },
        { q: 'Lexora 是否免费开源？如何参与贡献？', a: '是的，Lexora 基于 GNU AGPL-3.0 协议完全免费且开源。欢迎提交 Issue 反馈缺陷、参与多语言翻译或发起 Pull Request。' }
      ]
    },
    downloadPage: {
      title: '下载 Lexora — 全平台安装包',
      metaDesc: '下载适用于 Windows、macOS 和 Linux 的 Lexora。官方直链下载，无跳转极速就绪。',
      tag: 'v0.1.3 · 最新正式版',
      heading: '下载 Lexora',
      subheading: '所有下载按钮均直接指向 GitHub Releases 最新安装包资源，点击即刻开始下载。',
      backHome: '← 返回首页',
      note: '安装包命名遵循 <span class="font-medium text-ink-secondary">Lexora_&lt;系统&gt;_&lt;架构&gt;</span> 规范，<span class="font-mono">releases/latest/download</span> 链接将始终指向最新构建版本。',
      allReleases: '查看历史版本与源码归档',
      viewGh: 'GitHub 开源仓库'
    }
  },

  'zh-TW': {
    code: 'zh-TW',
    dir: 'zh-TW',
    name: '繁體中文',
    htmlLang: 'zh-TW',
    title: 'Lexora — 原位所見即所得 Markdown 閱讀與編輯器',
    metaDesc: '基於 Tauri 2 + Rust + SolidJS 構建的極簡本機優先 Markdown 閱讀與即時所見即所得編輯器。告別分割視窗，原位即時排版渲染。',
    nav: { features: '核心特色', download: '下載安裝', architecture: '技術架構', shortcuts: '快捷鍵', faq: '常見問題', github: 'GitHub' },
    selectLang: '選擇介面顯示語言',
    hero: {
      badge: 'v0.1.3 正式發布 · AGPL-3.0 開源協議',
      title: '原位排版，所見即所得。',
      subtitle: '極簡、極速的本機優先 Markdown 原位所見即所得閱讀與編輯器。徹底摒棄傳統雙欄分割視窗，打字即時排版——基於 Tauri 2 + Rust + SolidJS 打造毫秒級流暢響應。',
      downloadBtn: '立即下載',
      githubBtn: 'GitHub 開源儲存庫',
      chips: ['<400ms 毫秒級冷啟動', '無需分割視窗原位渲染', '9 種原生語言', '100% 本機離線']
    },
    mockup: {
      menu: ['檔案', '編輯', '檢視', '視窗', '說明'],
      title: 'Lexora — README.md',
      outline: '大綱目錄',
      workspace: '工作區',
      introTitle: '# 專案簡介',
      introP1: 'Lexora 徹底摒棄了傳統“左邊寫程式碼、右邊看預覽”的分割視窗模式，採用極簡沉浸的原位即時排版。',
      introP2: '零分割視窗 · 原位所見即所得 · Ripgrep 全域全文本搜尋。',
      metrics: ['冷啟動耗時', '< 400 毫秒', '毫秒級極速就緒', '全文搜尋', 'ripgrep', '工作區全域秒搜'],
      modes: ['閱讀', '寫作', '源碼'],
      status: '第 1 行, 第 1 列  ·  1,420 字  ·  UTF-8  ·  LF'
    },
    features: {
      tag: '核心特色',
      title: '專注純粹寫作，告別一切干擾',
      subtitle: '所見即所得打字排版。從文件大綱、多分頁到工作區全文搜尋，所有設計皆為高效沉浸的寫作體驗而生。',
      items: [
        { title: '三態模式自由切換', desc: '一鍵無縫切換閱讀模式（唯讀瀏覽）、寫作模式（原位所見即所得）與源碼模式（行號同步）。' },
        { title: '9 種語言國際化支援', desc: '內建 9 國在地化語言，依據系統環境全自動辨識，隨時在選單中即時無縫切換。' },
        { title: '高效能程式碼高亮', desc: '基於 syntect 原生引擎打造，支援上百種程式語言高亮、語言標籤與一鍵複製功能。' },
        { title: 'Mermaid 圖表與 LaTeX 數學', desc: '原生支援流程圖、循序圖、類別圖等 Mermaid 圖表即時渲染，以及 KaTeX 行內/多行數學公式。' },
        { title: 'Ripgrep 全域全文秒搜', desc: '毫秒級工作區全文字快速搜尋（Ctrl+Shift+F）與文件內尋找取代（Ctrl+F/H）。' },
        { title: '當機級安全原子儲存', desc: '採用暫存檔原子覆寫（.tmp rename）機制與即時中繼狀態追蹤，從根本杜絕資料損壞或遺失。' },
        { title: '智慧拖曳互動', desc: '拖入檔案立即開啟、拖到分頁列新增分頁、拖入文字區域自動產生規範 Markdown 超連結。' },
        { title: '單一檔案獨立 HTML 匯出', desc: '一鍵快捷鍵（Ctrl+E）匯出樣式完整、無需外部依賴的獨立離線 HTML 網頁。' }
      ]
    },
    downloadSec: {
      tag: '下載安裝',
      title: '免費下載，即刻開啟沉浸寫作',
      subtitle: '自動識別您的作業系統，智慧推薦適配 Windows、macOS 與 Linux 的最新安裝套件。',
      recommended: '目前作業系統推薦',
      winBtn: '下載 Windows 安裝套件 (.exe)',
      macBtn: '下載 Apple Silicon 安裝映像檔 (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: '下載通用 AppImage',
      otherDownloads: '前往完整下載清單查看全部安裝套件與校驗碼 →'
    },
    arch: {
      tag: '技術架構',
      title: 'Rust 系統級核心，輕量 SolidJS 前端',
      subtitle: '基於 Tauri 2 構建，Rust 原生後端與 SolidJS 細粒度響應式前端深度協作——記憶體安全、零垃圾回收卡頓、按鍵延遲低於 16ms。',
      frontend: '前端層',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['細粒度響應式 Signals', 'Milkdown / ProseMirror', '9 語言 i18n 引擎', '型別安全 IPC 封裝'],
      ipc: 'IPC 通訊橋',
      ipcTitle: 'Tauri 2 核心橋接',
      ipcChips: ['零複製 Commands', '非同步 Event 事件匯流排', '最小權限安全能力管控'],
      rust: '系統核心',
      rustTitle: 'Rust 原生引擎',
      rustChips: ['pulldown-cmark AST 解析', 'syntect 語法高亮', 'notify 檔案系統監聽', '原子級檔案 I/O 寫入']
    },
    shortcuts: {
      tag: '常用快捷鍵',
      title: '雙手無需離開鍵盤',
      subtitle: '支援所有主流 Markdown 常用快捷鍵，格式排版、檔案管理與全域搜尋皆可在指尖瞬間完成。',
      doc: '文件與檔案',
      edit: '排版與格式',
      nav: '導覽與檢視',
      items: [
        { group: 'doc', label: '新增文件', key: 'Ctrl+N' },
        { group: 'doc', label: '開啟檔案', key: 'Ctrl+O' },
        { group: 'doc', label: '儲存目前文件', key: 'Ctrl+S' },
        { group: 'doc', label: '另存新檔...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: '匯出為 HTML', key: 'Ctrl+E' },
        { group: 'edit', label: '粗體', key: 'Ctrl+B' },
        { group: 'edit', label: '斜體', key: 'Ctrl+I' },
        { group: 'edit', label: '1~6 級標題', key: 'Ctrl+1~6' },
        { group: 'edit', label: '本文段落', key: 'Ctrl+0' },
        { group: 'edit', label: '插入超連結', key: 'Ctrl+K' },
        { group: 'nav', label: '快速檔案切換器', key: 'Ctrl+P' },
        { group: 'nav', label: '文件內尋找', key: 'Ctrl+F' },
        { group: 'nav', label: '文件內取代', key: 'Ctrl+H' },
        { group: 'nav', label: '工作區全文搜尋', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '切換顯示模式', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: '常見問題',
      title: '常見問題解答',
      subtitle: '有疑問或建議？歡迎前往 GitHub 提交 Issue 或參與討論交流。',
      changelogTitle: '最新版本',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'macOS 原生紅綠燈視窗控制按鈕適配',
        '統一標準化發布安裝套件命名規範',
        '9 種語言在地化文件與下載矩陣',
        '全面最佳化表格對比度與暗黑主題顯示'
      ],
      items: [
        { q: 'Lexora 與傳統 Markdown 編輯器有何不同？', a: 'Lexora 採用徹底的原位所見即所得渲染，告別左右分割視窗。打字時游標所在處即時排版，無 Electron 的沉重包袱，冷啟動僅需數百毫秒，帶來極致輕快的原生桌面體驗。' },
        { q: '我的文件資料安全嗎？', a: '100% 本機優先。所有文件均完整儲存在您的本機磁碟中，不傳送任何雲端伺服器。配合底層原子寫入機制，即便電腦突發斷電也不會損壞檔案。' },
        { q: '支援哪些 Markdown 擴充語法？', a: '完整支援 GitHub Flavored Markdown (GFM)、表格、任務清單、程式碼高亮、Mermaid 圖表（流程圖、循序圖、類別圖等）以及 KaTeX 數學公式渲染。' },
        { q: 'Lexora 是否免費開源？如何參與貢獻？', a: '是的，Lexora 基於 GNU AGPL-3.0 協議完全免費且開源。歡迎提交 Issue 反饋缺陷、參與多語言翻譯或發起 Pull Request。' }
      ]
    },
    downloadPage: {
      title: '下載 Lexora — 全平台安裝套件',
      metaDesc: '下載適用於 Windows、macOS 和 Linux 的 Lexora。官方直鏈下載，無跳轉極速就緒。',
      tag: 'v0.1.3 · 最新正式版',
      heading: '下載 Lexora',
      subheading: '所有下載按鈕均直接指向 GitHub Releases 最新安裝套件資源，點擊即刻開始下載。',
      backHome: '← 返回首頁',
      note: '安裝套件命名遵循 <span class="font-medium text-ink-secondary">Lexora_&lt;系統&gt;_&lt;架構&gt;</span> 規範，<span class="font-mono">releases/latest/download</span> 連結將始終指向最新建置版本。',
      allReleases: '查看歷史版本與原始碼歸檔',
      viewGh: 'GitHub 開源儲存庫'
    }
  },

  'ja': {
    code: 'ja',
    dir: 'ja',
    name: '日本語',
    htmlLang: 'ja',
    title: 'Lexora — インプレース WYSIWYG Markdown リーダー＆エディター',
    metaDesc: 'Tauri 2、Rust、SolidJS で構築された、ローカルファーストのインプレース WYSIWYG Markdown リーダー＆エディター。2画面分割を廃止し、入力位置でそのまま美しくレンダリング。',
    nav: { features: '機能', download: 'ダウンロード', architecture: 'アーキテクチャ', shortcuts: 'ショートカット', faq: 'よくある質問', github: 'GitHub' },
    selectLang: '言語を選択',
    hero: {
      badge: 'v0.1.3 リリース · AGPL-3.0 オープンソース',
      title: 'その場で整う、Markdown。',
      subtitle: 'ミニマリストで超高速なインプレース WYSIWYG Markdown リーダー＆エディター。左右分割プレビューを排除し、タイピングと同時にその場でレンダリング — Tauri 2 + Rust + SolidJS によるミリ秒単位の応答性。',
      downloadBtn: '今すぐダウンロード',
      githubBtn: 'GitHub で見る',
      chips: ['<400ms 高速起動', '2画面分割なし', '9言語ネイティブ対応', '完全オフライン']
    },
    mockup: {
      menu: ['ファイル', '編集', '表示', 'ウィンドウ', 'ヘルプ'],
      title: 'Lexora — README.md',
      outline: 'アウトライン',
      workspace: 'ワークスペース',
      introTitle: '# はじめに',
      introP1: 'Lexora は画面分割プレビューを排除し、入力位置で直接リアルタイムにタイポグラフィを描画します。',
      introP2: '分割画面ゼロ · インプレース WYSIWYG · Ripgrep 全文検索。',
      metrics: ['起動時間', '< 400 ms', '瞬時のコールドスタート', '全文検索', 'ripgrep', 'ワークスペース全体秒速検索'],
      modes: ['閲覧', '執筆', 'ソース'],
      status: '行 1, 列 1  ·  1,420 文字  ·  UTF-8  ·  LF'
    },
    features: {
      tag: '主な機能',
      title: 'ノイズのない、純粋な執筆体験',
      subtitle: 'タイピングと同時にレンダリング。目次アウトライン、マルチタブ、ワークスペース全文検索まで、すべてが快適な執筆のために設計されています。',
      items: [
        { title: '3つの表示モード切替', desc: '閲覧モード（読み取り専用）、執筆モード（インプレース WYSIWYG）、ソースモード（行番号同期）をワンクリック切替。' },
        { title: '9言語ネイティブ対応', desc: 'OS設定に合わせて自動認識。英語、日本語、中国語、韓国語、ドイツ語など9言語を瞬時に切り替え可能。' },
        { title: '高速シンタックスハイライト', desc: 'syntect ネイティブエンジンにより、多数の言語に対応した高精度コードブロック描画とワンクリックコピーを提供。' },
        { title: 'Mermaid & LaTeX 数式', desc: 'フローチャート、シーケンス図、クラス図などの Mermaid 図表および KaTeX による数式をリアルタイム描画。' },
        { title: 'Ripgrep 全文検索', desc: 'ワークスペース全体の超高速検索（Ctrl+Shift+F）および文書内の一括検索・置換（Ctrl+F/H）を搭載。' },
        { title: '安全なアトミック保存', desc: '一時ファイル書き込み（.tmp rename）と編集状態追跡により、クラッシュ時もデータを保護します。' },
        { title: '直感的なドラッグ＆ドロップ', desc: 'ウィンドウへのファイルドロップで開く、タブバーへのドロップで新規タブ、本文へのドロップでリンク挿入。' },
        { title: '単一 HTML エクスポート', desc: 'ショートカットキー（Ctrl+E）1つで、スタイル完全内蔵のオフライン HTML ファイルとして書き出し。' }
      ]
    },
    downloadSec: {
      tag: 'ダウンロード',
      title: '無料ダウンロードですぐに始める',
      subtitle: 'お使いのOSを自動検出し、Windows、macOS、Linux に最適なインストーラーをハイライト表示します。',
      recommended: 'お使いのOSに推奨',
      winBtn: 'Windows 用インストーラー (.exe)',
      macBtn: 'Apple Silicon 用 DMG (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Linux 用 AppImage',
      otherDownloads: 'すべてのパッケージ一覧とチェックサムを確認 →'
    },
    arch: {
      tag: 'アーキテクチャ',
      title: 'Rust ネイティブコア × 軽量 SolidJS フロントエンド',
      subtitle: 'Tauri 2 を基盤に、メモリ安全な Rust バックエンドと細粒度リアクティブな SolidJS が連携 — GC 停止なし、タイピング遅延 16ms 未満。',
      frontend: 'フロントエンド',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['細粒度リアクティブ Signals', 'Milkdown / ProseMirror', '9言語 i18n エンジン', '型安全 IPC ラッパー'],
      ipc: 'IPC ブリッジ',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['ゼロコピー Commands', '非同期 Event バス', '最小権限ケーパビリティ'],
      rust: 'バックエンド',
      rustTitle: 'Rust ネイティブエンジン',
      rustChips: ['pulldown-cmark AST', 'syntect ハイライト', 'notify ファイル監視', 'アトミックファイル I/O']
    },
    shortcuts: {
      tag: 'ショートカット',
      title: 'キーボードから手を離さない',
      subtitle: '標準的な Markdown ショートカットを網羅。書式設定、ファイル操作、検索まで指先だけで完結します。',
      doc: 'ドキュメント操作',
      edit: '書式設定',
      nav: 'ナビゲーション & 表示',
      items: [
        { group: 'doc', label: '新規ドキュメント', key: 'Ctrl+N' },
        { group: 'doc', label: 'ファイルを開く', key: 'Ctrl+O' },
        { group: 'doc', label: '上書き保存', key: 'Ctrl+S' },
        { group: 'doc', label: '名前を付けて保存...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'HTML エクスポート', key: 'Ctrl+E' },
        { group: 'edit', label: '太字 (Bold)', key: 'Ctrl+B' },
        { group: 'edit', label: '斜体 (Italic)', key: 'Ctrl+I' },
        { group: 'edit', label: '見出し 1〜6', key: 'Ctrl+1~6' },
        { group: 'edit', label: '本文段落', key: 'Ctrl+0' },
        { group: 'edit', label: 'リンク挿入', key: 'Ctrl+K' },
        { group: 'nav', label: 'クイックファイル切替', key: 'Ctrl+P' },
        { group: 'nav', label: '文書内検索', key: 'Ctrl+F' },
        { group: 'nav', label: '文書内置換', key: 'Ctrl+H' },
        { group: 'nav', label: 'ワークスペース全文検索', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '表示モード切替', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FAQ',
      title: 'よくある質問',
      subtitle: 'ご不明な点や改善要望がありましたら、GitHub の Issue や Discussion でお気軽にお知らせください。',
      changelogTitle: '最新リリース',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'macOS ネイティブのウィンドウ操作ボタン対応',
        'リリース配布ファイル命名規則の統一',
        '9言語の多言語ドキュメント＆ダウンロード構成',
        '全テーマにおけるテーブル表示のコントラスト向上'
      ],
      items: [
        { q: '従来の Markdown エディターとの違いは何ですか？', a: '左右に分割されたプレビュー画面がなく、入力位置でそのままレンダリングされる真のインプレース WYSIWYG を提供します。Electron を使わず Rust と Tauri 2 で構築されているため、圧倒的に高速で軽量です。' },
        { q: 'データのプライバシーと安全性はどうなっていますか？', a: '100% ローカルファーストです。すべての文書はお手元のデバイスにのみ保存され、クラウドへの無断送信はありません。アトミック書き込みにより急な電源断でもファイルを破損から守ります。' },
        { q: 'どのような Markdown 拡張構文に対応していますか？', a: 'GitHub Flavored Markdown (GFM)、テーブル、タスクリスト、コードブロック構文ハイライト、Mermaid 図表（フローチャート・シーケンス図等）、KaTeX 数式に対応しています。' },
        { q: '無料で利用できますか？ 貢献方法は？', a: 'はい、GNU AGPL-3.0 ライセンスに基づく完全無料のオープンソースソフトウェアです。GitHub での Issue 報告、翻訳、Pull Request を大歓迎します。' }
      ]
    },
    downloadPage: {
      title: 'Lexora ダウンロード — 全プラットフォーム',
      metaDesc: 'Windows、macOS、Linux 用の Lexora をダウンロード。リダイレクトなしの公式ダイレクトリンク。',
      tag: 'v0.1.3 · 最新リリース',
      heading: 'Lexora のダウンロード',
      subheading: 'すべてのダウンロードボタンは GitHub Releases の最新アセットに直結しており、クリック後すぐにダウンロードが始まります。',
      backHome: '← トップページに戻る',
      note: 'ファイル名は <span class="font-medium text-ink-secondary">Lexora_&lt;OS&gt;_&lt;アーキテクチャ&gt;</span> の命名規則に従い、<span class="font-mono">releases/latest/download</span> リンクから常に最新版を入手できます。',
      allReleases: '過去のリリースとソースコード',
      viewGh: 'GitHub リポジトリ'
    }
  },

  'ko': {
    code: 'ko',
    dir: 'ko',
    name: '한국어',
    htmlLang: 'ko',
    title: 'Lexora — 인플레이스 WYSIWYG 마크다운 뷰어 & 에디터',
    metaDesc: 'Tauri 2, Rust, SolidJS 로 제작된 로컬 우선 미니멀 마크다운 뷰어 및 실시간 WYSIWYG 에디터. 분할 화면 없이 입력한 위치에서 즉시 렌더링됩니다.',
    nav: { features: '주요 기능', download: '다운로드', architecture: '아키텍처', shortcuts: '단축키', faq: '자주 묻는 질문', github: 'GitHub' },
    selectLang: '언어 선택',
    hero: {
      badge: 'v0.1.3 출시 · AGPL-3.0 오픈소스',
      title: '입력하는 그 자리에서, 마크다운.',
      subtitle: '미니멀하고 강력한 로컬 우선 인플레이스 WYSIWYG 마크다운 뷰어 & 에디터. 좌우 분할 창 없이 타이핑하는 즉시 아름답게 렌더링 — Tauri 2 + Rust + SolidJS 기반의 즉각적인 반응성.',
      downloadBtn: '지금 다운로드',
      githubBtn: 'GitHub 에서 보기',
      chips: ['<400ms 초고속 실행', '화면 분할 없는 원위치 편집', '9개 언어 지원', '완전 오프라인']
    },
    mockup: {
      menu: ['파일', '편집', '보기', '창', '도움말'],
      title: 'Lexora — README.md',
      outline: '문서 개요',
      workspace: '워크스페이스',
      introTitle: '# 프로젝트 소개',
      introP1: 'Lexora 는 번거로운 화면 분할 미리보기를 없애고, 입력한 위치에서 곧바로 깔끔하게 서식을 렌더링합니다.',
      introP2: '분할창 제로 · 인플레이스 WYSIWYG · Ripgrep 전체 텍스트 검색.',
      metrics: ['시작 시간', '< 400 ms', '초고속 실행', '전체 검색', 'ripgrep', '워크스페이스 전체 검색'],
      modes: ['읽기', '쓰기', '소스'],
      status: '1행, 1열  ·  1,420 단어  ·  UTF-8  ·  LF'
    },
    features: {
      tag: '주요 기능',
      title: '방해 요소 없는 순수한 글쓰기',
      subtitle: '타이핑과 동시에 이뤄지는 실시간 서식 렌더링. 개요, 다중 탭부터 전체 텍스트 검색까지 오직 글쓰기 경험에 집중합니다.',
      items: [
        { title: '3가지 디스플레이 모드', desc: '읽기 모드(보기 전용), 쓰기 모드(인플레이스 WYSIWYG), 코드 모드(줄 번호 동기화)를 단축키로 자유롭게 전환.' },
        { title: '9개 국어 다국어 지원', desc: '운영체제 언어를 자동으로 감지하며 메뉴에서 언제든 9개 언어로 즉시 전환 가능합니다.' },
        { title: '고성능 코드 구문 강조', desc: 'syntect 엔진 기반으로 수백 가지 프로그래밍 언어의 코드 블록 강조 및 원클릭 복사를 지원합니다.' },
        { title: 'Mermaid 다이어그램 & LaTeX 수식', desc: '플로우차트, 시퀀스, 클래스 다이어그램 등 Mermaid 차트와 KaTeX 수학 수식을 실시간 렌더링.' },
        { title: 'Ripgrep 전체 텍스트 검색', desc: '워크스페이스 전체를 밀리초 단위로 검색(Ctrl+Shift+F)하고 문서 내 찾기/바꾸기(Ctrl+F/H)를 지원합니다.' },
        { title: '안전한 원자적 파일 저장', desc: '임시 파일 교체(.tmp rename) 방식과 실시간 미저장 상태 추적으로 데이터 유실을 방지합니다.' },
        { title: '스마트 드래그 앤 드롭', desc: '파일을 창으로 끌어다 열기, 탭 바로 끌어 새 탭 열기, 본문으로 끌어 마크다운 링크 자동 삽입.' },
        { title: '독립형 HTML 내보내기', desc: '단축키(Ctrl+E) 한 번으로 모든 스타일이 내장된 독립 실행형 오프라인 HTML 파일로 내보냅니다.' }
      ]
    },
    downloadSec: {
      tag: '다운로드',
      title: '무료 다운로드로 지금 바로 시작하세요',
      subtitle: '사용 중인 운영체제를 자동 감지하여 Windows, macOS, Linux 에 가장 알맞은 설치 파일을 추천합니다.',
      recommended: '현재 운영체제 추천',
      winBtn: 'Windows 설치 파일 (.exe)',
      macBtn: 'Apple Silicon 설치 파일 (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Linux AppImage 다운로드',
      otherDownloads: '모든 플랫폼 설치 파일 및 체크섬 보기 →'
    },
    arch: {
      tag: '아키텍처',
      title: 'Rust 코어와 가벼운 SolidJS 프론트엔드',
      subtitle: 'Tauri 2 를 기반으로 메모리 안전한 Rust 백엔드와 반응형 SolidJS 웹뷰가 결합 — GC 지연 없는 16ms 미만의 입력 레이턴시.',
      frontend: '프론트엔드',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['반응형 Signals', 'Milkdown / ProseMirror', '9개 언어 i18n 엔진', '타입 안전 IPC'],
      ipc: 'IPC 브리지',
      ipcTitle: 'Tauri 2 코어',
      ipcChips: ['Zero-Copy Commands', '비동기 Event 버스', '최소 권한 보안'],
      rust: '백엔드',
      rustTitle: 'Rust 네이티브 엔진',
      rustChips: ['pulldown-cmark AST', 'syntect 구문 강조', 'notify 파일 감시', '원자적 파일 I/O']
    },
    shortcuts: {
      tag: '단축키',
      title: '키보드만으로 모든 조작을 완성하세요',
      subtitle: '자주 쓰이는 모든 마크다운 단축키를 기본 지원하여 손을 떼지 않고 빠르게 문서를 작성할 수 있습니다.',
      doc: '문서 및 파일',
      edit: '서식 지정',
      nav: '탐색 및 보기',
      items: [
        { group: 'doc', label: '새 문서', key: 'Ctrl+N' },
        { group: 'doc', label: '파일 열기', key: 'Ctrl+O' },
        { group: 'doc', label: '문서 저장', key: 'Ctrl+S' },
        { group: 'doc', label: '다른 이름으로 저장...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'HTML 로 내보내기', key: 'Ctrl+E' },
        { group: 'edit', label: '굵게', key: 'Ctrl+B' },
        { group: 'edit', label: '기울임꼴', key: 'Ctrl+I' },
        { group: 'edit', label: '제목 1~6', key: 'Ctrl+1~6' },
        { group: 'edit', label: '본문 단락', key: 'Ctrl+0' },
        { group: 'edit', label: '링크 삽입', key: 'Ctrl+K' },
        { group: 'nav', label: '빠른 파일 전환', key: 'Ctrl+P' },
        { group: 'nav', label: '문서 내 찾기', key: 'Ctrl+F' },
        { group: 'nav', label: '문서 내 바꾸기', key: 'Ctrl+H' },
        { group: 'nav', label: '워크스페이스 전체 검색', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '표시 모드 전환', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FAQ',
      title: '자주 묻는 질문',
      subtitle: '궁금한 점이나 건의사항이 있으신가요? GitHub 저장소에서 이슈를 생성하거나 토론에 참여하세요.',
      changelogTitle: '최신 릴리스',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'macOS 네이티브 창 제어 버튼 지원',
        '릴리스 배포 파일명 표준화',
        '9개 국어 다국어 문서 및 다운로드 구성',
        '모든 테마에서 표(Table) 대비 및 가독성 개선'
      ],
      items: [
        { q: '기존 마크다운 편집기와 무엇이 다른가요?', a: 'Lexora 는 화면 분할 없이 글을 쓰는 위치에서 즉시 서식이 완성되는 실시간 인플레이스 WYSIWYG 방식을 채택했습니다. Electron 없이 Rust 와 Tauri 2 로 개발되어 가볍고 빠릅니다.' },
        { q: '내 데이터는 안전한가요?', a: '100% 로컬 우선입니다. 모든 문서는 사용자의 기기에만 보관되며 외부 서버로 전송되지 않습니다. 원자적 파일 저장 구조로 예기치 않은 종료 시에도 파일이 안전하게 보존됩니다.' },
        { q: '어떤 마크다운 확장 문법을 지원하나요?', a: 'GitHub Flavored Markdown (GFM), 표, 작업 목록, 코드 구문 강조, Mermaid 다이어그램(순서도, 시퀀스 등), KaTeX 수학 수식을 모두 지원합니다.' },
        { q: '무료인가요? 기여하려면 어떻게 해야 하나요?', a: '네, GNU AGPL-3.0 라이선스 기반의 완전 무료 오픈소스입니다. 버그 제보, 번역, Pull Request 등 다양한 기여를 환영합니다.' }
      ]
    },
    downloadPage: {
      title: 'Lexora 다운로드 — 모든 플랫폼',
      metaDesc: 'Windows, macOS, Linux 용 Lexora 다운로드. 리디렉션 없는 공식 직접 링크.',
      tag: 'v0.1.3 · 최신 릴리스',
      heading: 'Lexora 다운로드',
      subheading: '모든 다운로드 버튼은 GitHub Releases 최신 빌드 자산으로 직접 연결되어 즉시 다운로드가 시작됩니다.',
      backHome: '← 메인으로 돌아가기',
      note: '배포 파일은 <span class="font-medium text-ink-secondary">Lexora_&lt;운영체제&gt;_&lt;아키텍처&gt;</span> 명명 규칙을 따르며, <span class="font-mono">releases/latest/download</span> 링크는 항상 최신 빌드를 제공합니다.',
      allReleases: '이전 릴리스 및 소스코드 아카이브',
      viewGh: 'GitHub 저장소'
    }
  },

  'de': {
    code: 'de',
    dir: 'de',
    name: 'Deutsch',
    htmlLang: 'de',
    title: 'Lexora — Nahtloser In-Place WYSIWYG Markdown Reader & Editor',
    metaDesc: 'Ein minimalistischer, lokal orientierter Markdown-Reader und nahtloser In-Place-WYSIWYG-Editor, entwickelt mit Tauri 2, Rust und SolidJS. Keine geteilten Ansichten — sofortige visuelle Darstellung beim Tippen.',
    nav: { features: 'Funktionen', download: 'Download', architecture: 'Architektur', shortcuts: 'Tastenkürzel', faq: 'FAQ & Hinweise', github: 'GitHub' },
    selectLang: 'Sprache auswählen',
    hero: {
      badge: 'v0.1.3 veröffentlicht · AGPL-3.0 Open Source',
      title: 'Markdown, direkt am Platz.',
      subtitle: 'Ein minimalistischer, blitzschneller In-Place WYSIWYG Markdown-Reader und Editor. Keine störenden Split-Panes — formatiert direkt beim Schreiben, angetrieben von Tauri 2 + Rust + SolidJS.',
      downloadBtn: 'Jetzt herunterladen',
      githubBtn: 'Auf GitHub ansehen',
      chips: ['<400ms Kaltstart', 'Keine Split-Panes', '9 Sprachen', 'Vollständig offline']
    },
    mockup: {
      menu: ['Datei', 'Bearbeiten', 'Ansicht', 'Fenster', 'Hilfe'],
      title: 'Lexora — README.md',
      outline: 'Gliederung',
      workspace: 'Arbeitsbereich',
      introTitle: '# Einführung',
      introP1: 'Lexora verzichtet vollständig auf geteilte Vorschaubildschirme und formatiert Markdown direkt am Cursor.',
      introP2: 'Keine Split-Panes · In-Place WYSIWYG · Ripgrep-Volltextsuche.',
      metrics: ['Startzeit', '< 400 ms', 'Sofort einsatzbereit', 'Volltextsuche', 'ripgrep', 'Im gesamten Arbeitsbereich'],
      modes: ['Lesen', 'Schreiben', 'Quellcode'],
      status: 'Zl 1, Sp 1  ·  1.420 Wörter  ·  UTF-8  ·  LF'
    },
    features: {
      tag: 'KERNFUNKTIONEN',
      title: 'Fokussiertes Schreiben ohne Ablenkung',
      subtitle: 'Echtzeit-Formatierung beim Tippen. Von Gliederung und Tabs bis hin zur Volltextsuche ist alles für ein sauberes Schreiberlebnis optimiert.',
      items: [
        { title: 'Drei Anzeigemodi', desc: 'Nahtloses Umschalten zwischen Lese-Modus, In-Place-Schreibmodus und synchronisiertem Quellcode-Modus.' },
        { title: '9 Sprachen (i18n)', desc: 'Erkennt automatisch Ihre Systemsprache und unterstützt 9 Sprachen mit sofortigem Wechsel.' },
        { title: 'Syntax-Hervorhebung', desc: 'Leistungsstarke syntect-Hervorhebung mit Sprach-Tags und Ein-Klick-Code-Kopierfunktion.' },
        { title: 'Mermaid & LaTeX', desc: 'Interaktive Flussdiagramme, Sequenzdiagramme und KaTeX-Mathematikformeln in Echtzeit.' },
        { title: 'Ripgrep-Volltextsuche', desc: 'Blitzschnelle arbeitsbereichsweite Suche (Ctrl+Shift+F) und Suchen & Ersetzen im Dokument (Ctrl+F/H).' },
        { title: 'Absturzsicheres Speichern', desc: 'Atomare Dateischreibvorgänge (.tmp rename) und Dirty-State-Tracking schützen Ihre Texte vor Datenverlust.' },
        { title: 'Intelligentes Drag & Drop', desc: 'Dateien durch Ziehen öffnen, neue Tabs erstellen oder automatisch Markdown-Links einfügen.' },
        { title: 'Eigenständiger HTML-Export', desc: 'Ein Tastenkürzel (Ctrl+E) exportiert vollformatierte, eigenständige Offline-HTML-Dateien.' }
      ]
    },
    downloadSec: {
      tag: 'DOWNLOAD',
      title: 'Kostenlos herunterladen & sofort starten',
      subtitle: 'Erkennt automatisch Ihr Betriebssystem und empfiehlt das passende Paket für Windows, macOS und Linux.',
      recommended: 'FÜR IHR SYSTEM EMPFOHLEN',
      winBtn: 'Download für Windows (.exe)',
      macBtn: 'Download für Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Download AppImage',
      otherDownloads: 'Alle Pakete & Prüfsummen auf der Download-Seite anzeigen →'
    },
    arch: {
      tag: 'ARCHITEKTUR',
      title: 'Rust-Kern & leichtgewichtiges SolidJS-Frontend',
      subtitle: 'Tauri 2 verbindet ein speichersicheres Rust-Backend mit einer reaktiven SolidJS-Webview — keine GC-Pausen und unter 16ms Eingabelatenz.',
      frontend: 'FRONTEND',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['Feingranulare Signals', 'Milkdown / ProseMirror', '9-Sprachen i18n', 'Typsichere IPC'],
      ipc: 'IPC-BRÜCKE',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['Zero-Copy Commands', 'Asynchroner Event-Bus', 'Sichere Capabilities'],
      rust: 'RUST-KERN',
      rustTitle: 'Native Engine',
      rustChips: ['pulldown-cmark AST', 'syntect Highlighter', 'notify File Watcher', 'Atomare Datei-I/O']
    },
    shortcuts: {
      tag: 'TASTENKÜRZEL',
      title: 'Alle Tastenkombinationen im Griff',
      subtitle: 'Unterstützt alle gängigen Markdown-Shortcuts — formatieren, navigieren und verwalten Sie Dokumente ohne die Maus.',
      doc: 'Dokument & Datei',
      edit: 'Formatierung',
      nav: 'Navigation & Ansicht',
      items: [
        { group: 'doc', label: 'Neues Dokument', key: 'Ctrl+N' },
        { group: 'doc', label: 'Datei öffnen', key: 'Ctrl+O' },
        { group: 'doc', label: 'Dokument speichern', key: 'Ctrl+S' },
        { group: 'doc', label: 'Speichern unter...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Als HTML exportieren', key: 'Ctrl+E' },
        { group: 'edit', label: 'Fett', key: 'Ctrl+B' },
        { group: 'edit', label: 'Kursiv', key: 'Ctrl+I' },
        { group: 'edit', label: 'Überschriften 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Absatz (Standardtext)', key: 'Ctrl+0' },
        { group: 'edit', label: 'Link einfügen', key: 'Ctrl+K' },
        { group: 'nav', label: 'Schnelle Dateiauswahl', key: 'Ctrl+P' },
        { group: 'nav', label: 'Im Dokument suchen', key: 'Ctrl+F' },
        { group: 'nav', label: 'Im Dokument ersetzen', key: 'Ctrl+H' },
        { group: 'nav', label: 'Arbeitsbereich durchsuchen', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Anzeigemodus wechseln', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FAQ',
      title: 'Häufig gestellte Fragen (FAQ)',
      subtitle: 'Haben Sie Fragen oder Anregungen? Eröffnen Sie gerne ein Issue oder eine Diskussion auf GitHub.',
      changelogTitle: 'Neueste Version',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'Native macOS Fensterbedienelemente integriert',
        'Standardisierte Namensgebung für Release-Dateien',
        'Lokalisierte Dokumentation & Downloads in 9 Sprachen',
        'Verbesserter Tabellenkontrast über alle Farbthemen'
      ],
      items: [
        { q: 'Was unterscheidet Lexora von anderen Markdown-Editoren?', a: 'Lexora bietet echtes In-Place-WYSIWYG ohne geteilte Bildschirme. Markdown formatiert sich direkt beim Tippen. Entwickelt mit Rust und Tauri 2 ist es blitzschnell und frei von Electron-Ballast.' },
        { q: 'Sind meine Daten sicher und privat?', a: '100% lokal zuerst. Alle Dateien verbleiben vollständig auf Ihrem Gerät. Atomare Schreibvorgänge schützen Ihre Texte zuverlässig vor Beschädigung.' },
        { q: 'Welche Markdown-Erweiterungen werden unterstützt?', a: 'GitHub Flavored Markdown (GFM), Tabellen, Aufgabenlisten, Quellcode-Hervorhebung, Mermaid-Diagramme und KaTeX-Mathematikformeln.' },
        { q: 'Ist Lexora kostenlos und quelloffen?', a: 'Ja. Lexora ist unter der GNU AGPL-3.0 Lizenz frei und quelloffen verfügbar. Beiträge, Übersetzungen und Fehlerberichte sind jederzeit willkommen.' }
      ]
    },
    downloadPage: {
      title: 'Lexora herunterladen — Alle Plattformen',
      metaDesc: 'Laden Sie Lexora für Windows, macOS und Linux herunter. Direkte Download-Links ohne Weiterleitungen.',
      tag: 'v0.1.3 · Neueste Version',
      heading: 'Lexora herunterladen',
      subheading: 'Jeder Download-Link verweist direkt auf die Release-Dateien von GitHub — der Download startet sofort ohne Weiterleitungen.',
      backHome: '← Zurück zur Startseite',
      note: 'Die Dateinamen folgen dem Muster <span class="font-medium text-ink-secondary">Lexora_&lt;OS&gt;_&lt;Architektur&gt;</span>, wodurch <span class="font-mono">releases/latest/download</span> stets auf die neueste Version verweist.',
      allReleases: 'Alle Versionen & Quellcode-Archive',
      viewGh: 'Auf GitHub ansehen'
    }
  },

  'fr': {
    code: 'fr',
    dir: 'fr',
    name: 'Français',
    htmlLang: 'fr',
    title: 'Lexora — Lecteur & Éditeur Markdown WYSIWYG In-Situ',
    metaDesc: 'Un lecteur et éditeur Markdown WYSIWYG local-first minimaliste conçu avec Tauri 2, Rust et SolidJS. Zéro panneau divisé — rendu instantané sur place pendant la frappe.',
    nav: { features: 'Fonctionnalités', download: 'Télécharger', architecture: 'Architecture', shortcuts: 'Raccourcis', faq: 'FAQ & Notes', github: 'GitHub' },
    selectLang: 'Choisir la langue',
    hero: {
      badge: 'v0.1.3 disponible · Open Source AGPL-3.0',
      title: 'Le Markdown, directement sur place.',
      subtitle: 'Un lecteur et éditeur Markdown WYSIWYG in-situ ultra-rapide et épuré. Finis les doubles panneaux de prévisualisation : mise en page en direct au fil de la frappe avec Tauri 2 + Rust + SolidJS.',
      downloadBtn: 'Télécharger',
      githubBtn: 'Voir sur GitHub',
      chips: ['Démarrage <400ms', 'Zéro écran partagé', '9 langues natives', '100% Hors-ligne']
    },
    mockup: {
      menu: ['Fichier', 'Édition', 'Affichage', 'Fenêtre', 'Aide'],
      title: 'Lexora — README.md',
      outline: 'Plan du document',
      workspace: 'Espace de travail',
      introTitle: '# Introduction',
      introP1: 'Lexora élimine le double affichage en rendant le Markdown directement sur place avec une typographie soignée.',
      introP2: 'Zéro panneau divisé · WYSIWYG in-situ · Recherche textuelle ripgrep.',
      metrics: ['Temps de lancement', '< 400 ms', 'Démarrage instantané', 'Recherche textuelle', 'ripgrep', 'Espace entier'],
      modes: ['Lecture', 'Écriture', 'Code'],
      status: 'Lg 1, Col 1  ·  1 420 mots  ·  UTF-8  ·  LF'
    },
    features: {
      tag: 'FONCTIONNALITÉS CLÉS',
      title: 'Écriture focalisée, zéro distraction',
      subtitle: 'Rendu instantané à la frappe. Du plan dynamique aux onglets multiples et à la recherche globale, tout est pensé pour le confort d\'écriture.',
      items: [
        { title: 'Trois modes d\'affichage', desc: 'Basculez d\'un clic entre le mode Lecture (lecture seule), Écriture (WYSIWYG direct) et Code (numéros de ligne synchronisés).' },
        { title: 'Internationalisation (9 langues)', desc: 'Détection automatique de la langue système parmi 9 langues avec changement instantané en direct.' },
        { title: 'Coloration syntaxique', desc: 'Coloration ultra-rapide via syntect avec étiquettes de langage et bouton de copie en un clic.' },
        { title: 'Mermaid & Formules LaTeX', desc: 'Rendu en direct de diagrammes Mermaid (flux, séquence, classes) et de formules mathématiques KaTeX.' },
        { title: 'Recherche globale Ripgrep', desc: 'Recherche textuelle instantanée dans tout l\'espace de travail (Ctrl+Shift+F) et recherche/remplacement (Ctrl+F/H).' },
        { title: 'Sauvegarde atomique sécurisée', desc: 'Écritures atomiques (.tmp rename) et suivi des modifications pour ne jamais perdre une seule ligne de texte.' },
        { title: 'Glisser-déposer intelligent', desc: 'Glissez des fichiers pour les ouvrir, déposez sur la barre d\'onglets ou insérez des liens formatés.' },
        { title: 'Export HTML autonome', desc: 'Un raccourci (Ctrl+E) pour générer des fichiers HTML autonomes, élégamment stylisés et lisibles hors-ligne.' }
      ]
    },
    downloadSec: {
      tag: 'TÉLÉCHARGEMENT',
      title: 'Téléchargement gratuit, commencez dès maintenant',
      subtitle: 'Détecte automatiquement votre système d\'exploitation et vous recommande le paquet idéal pour Windows, macOS et Linux.',
      recommended: 'RECOMMANDÉ POUR VOTRE SYSTÈME',
      winBtn: 'Télécharger pour Windows (.exe)',
      macBtn: 'Télécharger pour Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Télécharger AppImage',
      otherDownloads: 'Voir tous les paquets et sommes de contrôle →'
    },
    arch: {
      tag: 'ARCHITECTURE',
      title: 'Cœur Rust & frontend SolidJS ultra-léger',
      subtitle: 'Tauri 2 associe un backend Rust sécurisé à une webview réactive SolidJS — aucune pause de ramasse-miettes et latence de frappe inférieure à 16ms.',
      frontend: 'FRONTEND',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['Signaux réactifs', 'Milkdown / ProseMirror', 'i18n 9 langues', 'IPC typé'],
      ipc: 'PONT IPC',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['Commandes zéro-copie', 'Bus d\'événements', 'Sécurité par capacités'],
      rust: 'CŒUR RUST',
      rustTitle: 'Moteur natif',
      rustChips: ['pulldown-cmark AST', 'Coloration syntect', 'Surveillance notify', 'I/O atomique']
    },
    shortcuts: {
      tag: 'RACCOURCIS',
      title: 'Gardez vos mains sur le clavier',
      subtitle: 'Tous les raccourcis Markdown standards sont pris en charge pour formater, naviguer et organiser vos textes sans toucher la souris.',
      doc: 'Document & Fichier',
      edit: 'Formatage',
      nav: 'Navigation & Vue',
      items: [
        { group: 'doc', label: 'Nouveau document', key: 'Ctrl+N' },
        { group: 'doc', label: 'Ouvrir un fichier', key: 'Ctrl+O' },
        { group: 'doc', label: 'Enregistrer le document', key: 'Ctrl+S' },
        { group: 'doc', label: 'Enregistrer sous...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Exporter en HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Gras', key: 'Ctrl+B' },
        { group: 'edit', label: 'Italique', key: 'Ctrl+I' },
        { group: 'edit', label: 'Titres 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Paragraphe (Corps)', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insérer un lien', key: 'Ctrl+K' },
        { group: 'nav', label: 'Sélecteur rapide de fichier', key: 'Ctrl+P' },
        { group: 'nav', label: 'Rechercher dans le texte', key: 'Ctrl+F' },
        { group: 'nav', label: 'Remplacer dans le texte', key: 'Ctrl+H' },
        { group: 'nav', label: 'Recherche dans l\'espace', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Changer de mode', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FAQ',
      title: 'Foire aux questions (FAQ)',
      subtitle: 'Une question ou une suggestion ? N\'hésitez pas à ouvrir un ticket ou à participer aux discussions sur GitHub.',
      changelogTitle: 'Dernière version',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'Contrôles de fenêtre natifs pour macOS',
        'Standardisation des noms de fichiers de release',
        'Documentation et téléchargements traduits en 9 langues',
        'Contraste et lisibilité des tableaux grandement améliorés'
      ],
      items: [
        { q: 'En quoi Lexora est-il différent des autres éditeurs ?', a: 'Lexora offre un rendu WYSIWYG direct sans panneau divisé. Le texte se met en page au fur et à mesure que vous tapez. Construit en Rust et Tauri 2, il démarre en quelques millisecondes sans la lourdeur d\'Electron.' },
        { q: 'Mes données sont-elles protégées ?', a: '100% local-first. Tous vos documents restent sur votre machine sans aucune transmission dans le cloud. L\'écriture atomique protège vos textes contre toute corruption.' },
        { q: 'Quelles extensions Markdown sont supportées ?', a: 'GitHub Flavored Markdown (GFM), tableaux, listes de tâches, coloration de code, diagrammes Mermaid et formules mathématiques KaTeX.' },
        { q: 'Lexora est-il gratuit et open source ?', a: 'Oui, Lexora est entièrement libre et gratuit sous licence GNU AGPL-3.0. Les retours de bugs, traductions et contributions sont les bienvenus.' }
      ]
    },
    downloadPage: {
      title: 'Télécharger Lexora — Toutes plateformes',
      metaDesc: 'Téléchargez Lexora pour Windows, macOS et Linux. Liens directs officiels sans redirection.',
      tag: 'v0.1.3 · Dernière version',
      heading: 'Télécharger Lexora',
      subheading: 'Chaque lien pointe directement vers les fichiers d\'installation de GitHub Releases. Le téléchargement démarre immédiatement.',
      backHome: '← Retour à l\'accueil',
      note: 'Les fichiers sont nommés selon le schéma <span class="font-medium text-ink-secondary">Lexora_&lt;OS&gt;_&lt;Architecture&gt;</span> et le lien <span class="font-mono">releases/latest/download</span> pointe toujours vers la version la plus récente.',
      allReleases: 'Toutes les versions et sources',
      viewGh: 'Dépôt GitHub'
    }
  },

  'es': {
    code: 'es',
    dir: 'es',
    name: 'Español',
    htmlLang: 'es',
    title: 'Lexora — Lector y Editor Markdown WYSIWYG In-Situ',
    metaDesc: 'Un lector y editor Markdown WYSIWYG local-first minimalista creado con Tauri 2, Rust y SolidJS. Sin división de pantalla — renderizado en tiempo real mientras escribes.',
    nav: { features: 'Características', download: 'Descargar', architecture: 'Arquitectura', shortcuts: 'Atajos', faq: 'Preguntas Frecuentes', github: 'GitHub' },
    selectLang: 'Seleccionar idioma',
    hero: {
      badge: 'v0.1.3 publicado · Código abierto AGPL-3.0',
      title: 'Markdown, directamente en su lugar.',
      subtitle: 'Un lector y editor Markdown WYSIWYG in-situ rápido y minimalista. Olvídate de la doble pantalla: formateo instantáneo en tiempo real con Tauri 2 + Rust + SolidJS.',
      downloadBtn: 'Descargar Ahora',
      githubBtn: 'Ver en GitHub',
      chips: ['Inicio <400ms', 'Sin panel dividido', '9 idiomas nativos', 'Totalmente offline']
    },
    mockup: {
      menu: ['Archivo', 'Editar', 'Ver', 'Ventana', 'Ayuda'],
      title: 'Lexora — README.md',
      outline: 'Esquema',
      workspace: 'Espacio de trabajo',
      introTitle: '# Introducción',
      introP1: 'Lexora elimina la doble pantalla al renderizar Markdown en el lugar exacto con una tipografía limpia.',
      introP2: 'Sin división de pantalla · WYSIWYG in-situ · Búsqueda global ripgrep.',
      metrics: ['Tiempo de inicio', '< 400 ms', 'Arranque instantáneo', 'Búsqueda de texto', 'ripgrep', 'Todo el espacio'],
      modes: ['Lectura', 'Escritura', 'Código'],
      status: 'Lín 1, Col 1  ·  1.420 palabras  ·  UTF-8  ·  LF'
    },
    features: {
      tag: 'CARACTERÍSTICAS CLAVE',
      title: 'Escritura enfocada, sin distracciones',
      subtitle: 'Renderizado en tiempo real. Desde el esquema del documento y pestañas hasta la búsqueda ripgrep, todo está diseñado para una escritura fluida.',
      items: [
        { title: 'Tres modos de visualización', desc: 'Alterna al instante entre modo Lectura (solo lectura), Escritura (WYSIWYG in-situ) y Código (código fuente sincronizado).' },
        { title: 'Internacionalización (9 idiomas)', desc: 'Detecta automáticamente el idioma de tu sistema entre 9 lenguas con cambio instantáneo.' },
        { title: 'Resaltado de sintaxis', desc: 'Motor syntect de alto rendimiento con etiquetas de lenguaje y botón de copia con un clic.' },
        { title: 'Mermaid y fórmulas LaTeX', desc: 'Visualización interactiva de diagramas de flujo, secuencia y clases Mermaid, además de fórmulas KaTeX.' },
        { title: 'Búsqueda global Ripgrep', desc: 'Búsqueda ultra rápida en todo el espacio de trabajo (Ctrl+Shift+F) y buscar/reemplazar en el documento (Ctrl+F/H).' },
        { title: 'Guardado atómico seguro', desc: 'Escritura atómica (.tmp rename) y seguimiento de cambios que previenen la pérdida accidental de datos.' },
        { title: 'Arrastrar y soltar inteligente', desc: 'Arrastra archivos a la ventana para abrirlos, a las pestañas o al texto para insertar enlaces Markdown.' },
        { title: 'Exportación a HTML autónomo', desc: 'Un atajo (Ctrl+E) para exportar archivos HTML independientes y listos para compartir sin conexión.' }
      ]
    },
    downloadSec: {
      tag: 'DESCARGA',
      title: 'Descarga gratuita, empieza ahora',
      subtitle: 'Detecta automáticamente tu sistema operativo y recomienda el instalador para Windows, macOS y Linux.',
      recommended: 'RECOMENDADO PARA TU SISTEMA',
      winBtn: 'Descargar para Windows (.exe)',
      macBtn: 'Descargar para Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Descargar AppImage',
      otherDownloads: 'Ver todos los paquetes y sumas de verificación →'
    },
    arch: {
      tag: 'ARQUITECTURA',
      title: 'Motor en Rust y frontend ligero en SolidJS',
      subtitle: 'Tauri 2 conecta un backend seguro en Rust con una interfaz webview en SolidJS — sin pausas de recolección de basura y latencia menor a 16ms.',
      frontend: 'FRONTEND',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['Señales reactivas', 'Milkdown / ProseMirror', 'i18n 9 idiomas', 'IPC tipado'],
      ipc: 'PUENTE IPC',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['Comandos zero-copy', 'Bus de eventos', 'Seguridad por permisos'],
      rust: 'NÚCLEO RUST',
      rustTitle: 'Motor nativo',
      rustChips: ['pulldown-cmark AST', 'Resaltado syntect', 'Monitor notify', 'I/O atómico']
    },
    shortcuts: {
      tag: 'ATAJOS DE TECLADO',
      title: 'Todo el control desde tu teclado',
      subtitle: 'Compatibilidad con todos los atajos habituales de Markdown para dar formato, navegar y organizar documentos sin tocar el ratón.',
      doc: 'Documento y Archivo',
      edit: 'Formato',
      nav: 'Navegación y Vista',
      items: [
        { group: 'doc', label: 'Nuevo documento', key: 'Ctrl+N' },
        { group: 'doc', label: 'Abrir archivo', key: 'Ctrl+O' },
        { group: 'doc', label: 'Guardar documento', key: 'Ctrl+S' },
        { group: 'doc', label: 'Guardar como...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Exportar a HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Negrita', key: 'Ctrl+B' },
        { group: 'edit', label: 'Cursiva', key: 'Ctrl+I' },
        { group: 'edit', label: 'Encabezados 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Párrafo estándar', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insertar enlace', key: 'Ctrl+K' },
        { group: 'nav', label: 'Cambio rápido de archivo', key: 'Ctrl+P' },
        { group: 'nav', label: 'Buscar en el documento', key: 'Ctrl+F' },
        { group: 'nav', label: 'Reemplazar en el documento', key: 'Ctrl+H' },
        { group: 'nav', label: 'Buscar en espacio de trabajo', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Cambiar modo de vista', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'PREGUNTAS FRECUENTES',
      title: 'Preguntas frecuentes (FAQ)',
      subtitle: '¿Tienes alguna duda o sugerencia? Abre una incidencia o participa en las discusiones en GitHub.',
      changelogTitle: 'Última versión',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'Controles de ventana nativos en macOS',
        'Estandarización de nombres de instaladores',
        'Documentación y descargas en 9 idiomas',
        'Contraste y visibilidad de tablas mejorados'
      ],
      items: [
        { q: '¿Qué hace diferente a Lexora de otros editores?', a: 'Lexora ofrece edición WYSIWYG real en el mismo lugar donde escribes, sin paneles divididos. Desarrollado en Rust y Tauri 2, es ligero, rápido y no depende del sobrepeso de Electron.' },
        { q: '¿Mis datos están seguros?', a: '100% local-first. Todos tus documentos se guardan exclusivamente en tu equipo sin envío a la nube. El guardado atómico protege tus textos de cierres inesperados.' },
        { q: '¿Qué funciones de Markdown están soportadas?', a: 'GitHub Flavored Markdown (GFM), tablas, listas de tareas, resaltado de código, diagramas Mermaid y fórmulas matemáticas KaTeX.' },
        { q: '¿Es gratuito y de código abierto?', a: 'Sí, Lexora es software libre bajo licencia GNU AGPL-3.0. Agradecemos comentarios, traducciones y colaboraciones en GitHub.' }
      ]
    },
    downloadPage: {
      title: 'Descargar Lexora — Todas las plataformas',
      metaDesc: 'Descarga Lexora para Windows, macOS y Linux. Enlaces directos oficiales sin redirecciones.',
      tag: 'v0.1.3 · Última versión',
      heading: 'Descargar Lexora',
      subheading: 'Cada enlace descarga directamente el paquete oficial desde GitHub Releases sin esperas ni redirecciones.',
      backHome: '← Volver al inicio',
      note: 'Los archivos siguen el formato <span class="font-medium text-ink-secondary">Lexora_&lt;OS&gt;_&lt;Arquitectura&gt;</span> y el enlace <span class="font-mono">releases/latest/download</span> siempre apunta a la versión más reciente.',
      allReleases: 'Ver todas las versiones y código fuente',
      viewGh: 'Repositorio en GitHub'
    }
  },

  'ru': {
    code: 'ru',
    dir: 'ru',
    name: 'Русский',
    htmlLang: 'ru',
    title: 'Lexora — Интерактивный WYSIWYG Markdown-ридер и редактор',
    metaDesc: 'Минималистичный локальный Markdown-ридер и интерактивный WYSIWYG-редактор на базе Tauri 2, Rust и SolidJS. Никаких раздельных панелей — мгновенное форматирование прямо по месту ввода.',
    nav: { features: 'Возможности', download: 'Скачать', architecture: 'Архитектура', shortcuts: 'Горячие клавиши', faq: 'Вопросы и ответы', github: 'GitHub' },
    selectLang: 'Выбрать язык',
    hero: {
      badge: 'Релиз v0.1.3 · Open Source AGPL-3.0',
      title: 'Markdown прямо на месте.',
      subtitle: 'Минималистичный, молниеносный локальный WYSIWYG Markdown-ридер и редактор. Без разделения экрана — мгновенное форматирование по мере ввода на базе Tauri 2 + Rust + SolidJS.',
      downloadBtn: 'Скачать сейчас',
      githubBtn: 'Открыть на GitHub',
      chips: ['Запуск <400 мс', 'Без разделения экрана', '9 языков', '100% Офлайн']
    },
    mockup: {
      menu: ['Файл', 'Правка', 'Вид', 'Окно', 'Справка'],
      title: 'Lexora — README.md',
      outline: 'Оглавление',
      workspace: 'Рабочая область',
      introTitle: '# Введение',
      introP1: 'Lexora избавляет от раздельного экрана, форматируя текст прямо по месту ввода с безупречной типографикой.',
      introP2: 'Без сплит-экрана · Интерактивный WYSIWYG · Полнотекстовый поиск ripgrep.',
      metrics: ['Время запуска', '< 400 мс', 'Мгновенный старт', 'Полнотекстовый поиск', 'ripgrep', 'По всей рабочей области'],
      modes: ['Чтение', 'Запись', 'Исходник'],
      status: 'Стр 1, Кол 1  ·  1 420 слов  ·  UTF-8  ·  LF'
    },
    features: {
      tag: 'КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ',
      title: 'Чистое письмо без отвлекающих факторов',
      subtitle: 'Форматирование в реальном времени. От структуры документа и вкладок до поиска ripgrep — всё подчинено идеальному процессу работы с текстом.',
      items: [
        { title: 'Три режима отображения', desc: 'Быстрое переключение между режимом Чтения (только чтение), Записи (интерактивный WYSIWYG) и Кода (с синхронизацией строк).' },
        { title: 'Локализация на 9 языков', desc: 'Автоматическое определение системного языка среди 9 доступных с возможностью мгновенной смены.' },
        { title: 'Подсветка синтаксиса', desc: 'Встроенный высокопроизводительный движок syntect с бейджами языков и копированием кода в один клик.' },
        { title: 'Диаграммы Mermaid и формулы LaTeX', desc: 'Прямой рендеринг блок-схем, диаграмм последовательностей Mermaid и математических формул KaTeX.' },
        { title: 'Полнотекстовый поиск Ripgrep', desc: 'Мгновенный поиск по всей рабочей области (Ctrl+Shift+F) и поиск/замена в текущем документе (Ctrl+F/H).' },
        { title: 'Безопасное атомарное сохранение', desc: 'Атомарная запись через .tmp и отслеживание несохраненных правок защищают текст от сбоев питания.' },
        { title: 'Умное перетаскивание Drag & Drop', desc: 'Открытие файлов перетаскиванием в окно, открытие новых вкладок и быстрая вставка Markdown-ссылок.' },
        { title: 'Автономный экспорт в HTML', desc: 'Экспорт одной комбинацией клавиш (Ctrl+E) в самодостаточный HTML-документ со всеми стилями.' }
      ]
    },
    downloadSec: {
      tag: 'СКАЧАТЬ',
      title: 'Скачать бесплатно и начать работу',
      subtitle: 'Автоматически определяет вашу операционную систему и рекомендует подходящий установщик для Windows, macOS и Linux.',
      recommended: 'РЕКОМЕНДОВАНО ДЛЯ ВАШЕЙ СИСТЕМЫ',
      winBtn: 'Скачать для Windows (.exe)',
      macBtn: 'Скачать для Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Скачать AppImage',
      otherDownloads: 'Посмотреть все сборки и контрольные суммы →'
    },
    arch: {
      tag: 'АРХИТЕКТУРА',
      title: 'Ядро на Rust и легковесный интерфейс SolidJS',
      subtitle: 'Tauri 2 связывает безопасный Rust-бэкенд с реактивным SolidJS-интерфейсом — без задержек сборщика мусора и с откликом ввода менее 16 мс.',
      frontend: 'ФРОНТЕНД',
      frontendTitle: 'SolidJS + Webview',
      frontendChips: ['Реактивные сигналы', 'Milkdown / ProseMirror', 'i18n на 9 языках', 'Типизированный IPC'],
      ipc: 'IPC-МОСТ',
      ipcTitle: 'Tauri 2 Core',
      ipcChips: ['Zero-Copy команды', 'Шина событий Event', 'Минимальные права доступа'],
      rust: 'RUST-ЯДРО',
      rustTitle: 'Нативный движок',
      rustChips: ['pulldown-cmark AST', 'Подсветка syntect', 'Слежение notify', 'Атомарный I/O']
    },
    shortcuts: {
      tag: 'ГОРЯЧИЕ КЛАВИШИ',
      title: 'Все под рукой на клавиатуре',
      subtitle: 'Поддержка всех стандартных комбинаций Markdown — форматируйте, перемещайтесь и управляйте документами без мыши.',
      doc: 'Документ и Файл',
      edit: 'Форматирование',
      nav: 'Навигация и Вид',
      items: [
        { group: 'doc', label: 'Новый документ', key: 'Ctrl+N' },
        { group: 'doc', label: 'Открыть файл', key: 'Ctrl+O' },
        { group: 'doc', label: 'Сохранить документ', key: 'Ctrl+S' },
        { group: 'doc', label: 'Сохранить как...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Экспорт в HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Полужирный', key: 'Ctrl+B' },
        { group: 'edit', label: 'Курсив', key: 'Ctrl+I' },
        { group: 'edit', label: 'Заголовки 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Обычный абзац', key: 'Ctrl+0' },
        { group: 'edit', label: 'Вставить ссылку', key: 'Ctrl+K' },
        { group: 'nav', label: 'Быстрый выбор файлов', key: 'Ctrl+P' },
        { group: 'nav', label: 'Найти в документе', key: 'Ctrl+F' },
        { group: 'nav', label: 'Заменить в документе', key: 'Ctrl+H' },
        { group: 'nav', label: 'Поиск по рабочей области', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Сменить режим', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'ВОПРОСЫ И ОТВЕТЫ',
      title: 'Часто задаваемые вопросы',
      subtitle: 'Есть вопросы или предложения? Создайте Issue или присоединяйтесь к обсуждениям на GitHub.',
      changelogTitle: 'Последний релиз',
      changelogVer: 'v0.1.3',
      changelogItems: [
        'Нативные кнопки управления окном для macOS',
        'Стандартизация имен файлов в релизах',
        'Документация и загрузки на 9 языках',
        'Улучшен контраст таблиц во всех темах'
      ],
      items: [
        { q: 'Чем Lexora отличается от других Markdown-редакторов?', a: 'Lexora форматирует текст непосредственно в месте ввода без разделения экрана на код и превью. Благодаря Rust и Tauri 2 приложение мгновенно запускается и не тратит лишнюю память.' },
        { q: 'Безопасны ли мои данные?', a: '100% локально. Все файлы сохраняются исключительно на вашем диске и не передаются в облако. Атомарная запись защитит документы от повреждения при сбоях.' },
        { q: 'Какие расширения Markdown поддерживаются?', a: 'GitHub Flavored Markdown (GFM), таблицы, списки задач, подсветка синтаксиса, диаграммы Mermaid и математические формулы KaTeX.' },
        { q: 'Lexora бесплатна? Как я могу помочь?', a: 'Да, Lexora полностью бесплатна и открыта под лицензией GNU AGPL-3.0. Мы рады сообщениям об ошибках, переводам и Pull Request на GitHub.' }
      ]
    },
    downloadPage: {
      title: 'Скачать Lexora — Все платформы',
      metaDesc: 'Скачайте Lexora для Windows, macOS и Linux. Прямые официальные ссылки без перенаправлений.',
      tag: 'v0.1.3 · Последний релиз',
      heading: 'Скачать Lexora',
      subheading: 'Все ссылки ведут напрямую к файлам GitHub Releases. Загрузка начинается моментально без задержек.',
      backHome: '← На главную',
      note: 'Файлы имеют имена <span class="font-medium text-ink-secondary">Lexora_&lt;ОС&gt;_&lt;Архитектура&gt;</span>, а ссылка <span class="font-mono">releases/latest/download</span> всегда скачивает свежую версию.',
      allReleases: 'Все релизы и архивы исходного кода',
      viewGh: 'Репозиторий GitHub'
    }
  }
};

function renderLangOptions(currentCode, isRoot) {
  return Object.values(languages).map(lang => {
    const isCur = lang.code === currentCode;
    const targetUrl = lang.code === 'en' ? (isRoot ? './' : '../') : (isRoot ? `./${lang.dir}/` : `../${lang.dir}/`);
    if (isCur) {
      return `          <a href="${targetUrl}" onclick="setLang('${lang.code}')" class="lang-opt flex items-center justify-between px-[10px] py-[7px] rounded-[6px] text-[12px] bg-bg-tag text-accent font-medium">${lang.name} <span class="text-[11px] font-semibold">✓</span></a>`;
    } else {
      return `          <a href="${targetUrl}" onclick="setLang('${lang.code}')" class="lang-opt flex items-center justify-between px-[10px] py-[7px] rounded-[6px] text-[12px] text-ink hover:bg-bg-subtle transition-colors">${lang.name} <span class="text-[11px] text-ink-tertiary">${lang.code}</span></a>`;
    }
  }).join('\n');
}

function renderLangDownloadOptions(currentCode, isRoot) {
  return Object.values(languages).map(lang => {
    const isCur = lang.code === currentCode;
    const targetUrl = lang.code === 'en' ? (isRoot ? './download.html' : '../download.html') : (isRoot ? `./${lang.dir}/download.html` : `../${lang.dir}/download.html`);
    if (isCur) {
      return `          <a href="${targetUrl}" onclick="setLang('${lang.code}')" class="lang-opt flex items-center justify-between px-[10px] py-[7px] rounded-[6px] text-[12px] bg-bg-tag text-accent font-medium">${lang.name} <span class="text-[11px] font-semibold">✓</span></a>`;
    } else {
      return `          <a href="${targetUrl}" onclick="setLang('${lang.code}')" class="lang-opt flex items-center justify-between px-[10px] py-[7px] rounded-[6px] text-[12px] text-ink hover:bg-bg-subtle transition-colors">${lang.name} <span class="text-[11px] text-ink-tertiary">${lang.code}</span></a>`;
    }
  }).join('\n');
}

function buildIndex(lang) {
  const isRoot = lang.code === 'en';
  const iconPath = isRoot ? 'app-icon.svg' : '../app-icon.svg';
  const homePath = isRoot ? '#' : '#';
  const dlPagePath = isRoot ? 'download.html' : 'download.html';
  const langOptionsHtml = renderLangOptions(lang.code, isRoot);

  return `<!DOCTYPE html>
<html lang="${lang.htmlLang}" class="h-full">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lang.title}</title>
  <meta name="description" content="${lang.metaDesc}" />
  
  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${lang.title}" />
  <meta property="og:description" content="${lang.metaDesc}" />
  <meta property="og:image" content="${iconPath}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${lang.title}" />
  <meta name="twitter:description" content="${lang.metaDesc}" />

  <link rel="icon" type="image/svg+xml" href="${iconPath}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

  <style type="text/tailwindcss">
    @theme {
      --color-bg: #FFFFFF;
      --color-bg-subtle: #FAFAFA;
      --color-bg-soft: #F5F5FA;
      --color-bg-tag: #EDEDFA;
      --color-ink: #0D0D0F;
      --color-ink-secondary: #636366;
      --color-ink-tertiary: #8F8F94;
      --color-border: #E6E6E8;
      --color-accent: #4361EE;
      --color-arrow: #A6A6AC;
      --font-display: "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); color: var(--color-ink); background: var(--color-bg); }
    .shot-shadow { box-shadow: 0 24px 48px -12px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.06); }
    .dropdown-shadow { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08); }
  </style>
</head>
<body class="h-full antialiased" style="padding-top:72px">

  <!-- ═══════════ Header ═══════════ -->
  <header class="fixed top-0 inset-x-0 z-50 h-[72px] px-[48px] bg-bg/95 backdrop-blur-md flex items-center justify-between border-b border-border/80 max-[768px]:px-4">
    <a href="${homePath}" class="flex items-center gap-[10px]">
      <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lgH" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4361ee"/><stop offset="1" stop-color="#3a0ca3"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lgH)"/><rect x="120" y="96" width="272" height="320" rx="20" fill="white" opacity="0.95"/><rect x="160" y="160" width="120" height="24" rx="6" fill="#4361ee"/><rect x="160" y="210" width="192" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="240" width="160" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="270" width="180" height="14" rx="4" fill="#6c757d" opacity="0.6"/><polygon points="310,380 390,300 420,330 340,410 300,420" fill="#4cc9f0"/></svg>
      <span class="font-display text-[18px] font-bold text-ink">Lexora</span>
    </a>
    <nav class="hidden lg:flex items-center gap-[28px] text-[14px] text-ink-secondary">
      <a href="#features" class="hover:text-ink transition-colors">${lang.nav.features}</a>
      <a href="#download" class="hover:text-ink transition-colors">${lang.nav.download}</a>
      <a href="#architecture" class="hover:text-ink transition-colors">${lang.nav.architecture}</a>
      <a href="#shortcuts" class="hover:text-ink transition-colors">${lang.nav.shortcuts}</a>
      <a href="#faq" class="hover:text-ink transition-colors">${lang.nav.faq}</a>
    </nav>
    <div class="flex items-center gap-[10px]">
      <div class="relative" id="langSwitcher">
        <button id="langBtn" class="flex items-center gap-[6px] px-[10px] py-[7px] rounded-[8px] border border-border text-[13px] text-ink-secondary hover:text-ink transition-colors" aria-label="${lang.selectLang}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" stroke="currentColor" stroke-width="1.8"/></svg>
          <span id="langLabel" class="font-medium">${lang.name}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div id="langMenu" class="hidden absolute top-[44px] right-0 w-[220px] rounded-[10px] bg-bg border border-border dropdown-shadow p-[6px] flex flex-col gap-[2px] z-50">
          <p class="px-[10px] py-[4px] text-[11px] text-ink-tertiary">${lang.selectLang}</p>
${langOptionsHtml}
        </div>
      </div>
      <a href="https://github.com/BerryUIKI/Lexora" target="_blank" rel="noopener" class="hidden sm:flex items-center px-[10px] py-[7px] rounded-[8px] border border-border text-ink-secondary hover:text-ink transition-colors" aria-label="GitHub">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" fill="#636366"/></svg>
      </a>
      <a href="#download" class="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] bg-ink text-white text-[14px] font-semibold hover:opacity-85 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${lang.nav.download}
      </a>
    </div>
  </header>

  <main>
    <!-- ═══════════ Hero ═══════════ -->
    <section class="bg-bg pt-[88px] pb-[72px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[28px]">
      <div class="flex items-center gap-[8px] px-[14px] py-[7px] rounded-full bg-bg-subtle border border-border text-[13px] text-ink-secondary">
        <span class="w-[6px] h-[6px] rounded-full bg-[#34C759]"></span>
        ${lang.hero.badge}
      </div>
      <h1 class="font-display text-[64px] font-bold leading-[1.1] tracking-[-1.5px] text-ink text-center max-[768px]:text-[40px]">${lang.hero.title}</h1>
      <p class="max-w-[720px] text-center text-[18px] leading-[30px] text-ink-secondary">
        ${lang.hero.subtitle}
      </p>
      <div class="flex items-center gap-[12px]">
        <a href="#download" class="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-ink text-white text-[16px] font-semibold hover:opacity-85 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${lang.hero.downloadBtn}
        </a>
        <a href="https://github.com/BerryUIKI/Lexora" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-bg border border-border text-[16px] font-semibold text-ink hover:bg-bg-subtle transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" fill="#0D0D0F"/></svg>
          ${lang.hero.githubBtn}
        </a>
      </div>
      <div class="flex items-center gap-[36px] text-[14px] text-ink-tertiary max-[768px]:flex-wrap max-[768px]:justify-center">
        <span class="flex items-center gap-[8px]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#8F8F94"/></svg>${lang.hero.chips[0]}</span>
        <span class="flex items-center gap-[8px]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="7" height="16" rx="1.5" stroke="#8F8F94" stroke-width="1.8"/><rect x="14" y="4" width="7" height="16" rx="1.5" stroke="#8F8F94" stroke-width="1.8"/></svg>${lang.hero.chips[1]}</span>
        <span class="flex items-center gap-[8px]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#8F8F94" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" stroke="#8F8F94" stroke-width="1.8"/></svg>${lang.hero.chips[2]}</span>
        <span class="flex items-center gap-[8px]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3a7 7 0 0 1 7 7c0 1.5-.5 2.9-1.3 4M5.3 7.3A7 7 0 0 0 5 10a7 7 0 0 0 3.5 6.1M3 3l18 18" stroke="#8F8F94" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${lang.hero.chips[3]}</span>
      </div>

      <!-- Real UI Mockup -->
      <div class="w-full h-[620px] max-[1200px]:h-[480px] max-[768px]:h-[300px] rounded-[16px] bg-bg border border-border shot-shadow overflow-hidden flex flex-col">
        <div class="flex items-center justify-between px-[16px] h-[34px] bg-[#F6F6F7] border-b border-border">
          <div class="flex items-center gap-[18px] text-[12px] text-ink-secondary">
            ${lang.mockup.menu.map(m => `<span>${m}</span>`).join('')}
          </div>
          <span class="text-[12px] text-ink-secondary">${lang.mockup.title}</span>
          <div class="flex items-center gap-[14px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#636366" stroke-width="1.8"/><path d="M16.5 16.5L21 21" stroke="#636366" stroke-width="1.8" stroke-linecap="round"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="#636366" stroke-width="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="#636366" stroke-width="1.8" stroke-linecap="round"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" fill="#636366"/></svg>
          </div>
        </div>
        <div class="flex items-center gap-[8px] px-[12px] h-[36px] border-b border-border">
          <span class="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] bg-bg-tag text-[12px] text-ink"><span class="w-[6px] h-[6px] rounded-full bg-accent"></span>README.md</span>
          <span class="px-[12px] py-[6px] rounded-[6px] text-[12px] text-ink-tertiary">notes.md</span>
          <span class="ml-auto w-[20px] h-[20px] rounded-[5px] border border-[#BFBFC5] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="#8F8F94" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
        </div>
        <div class="flex-1 flex min-h-0">
          <aside class="w-[224px] max-[768px]:hidden shrink-0 bg-bg-subtle border-r border-border p-[16px] flex flex-col gap-[6px]">
            <span class="text-[11px] font-semibold text-ink-tertiary pt-[8px]">${lang.mockup.outline}</span>
            <span class="text-[12px] text-ink-secondary">- ${lang.mockup.introTitle.replace('# ', '')}</span>
            <span class="text-[12px] text-ink-secondary">- ${lang.nav.features}</span>
            <span class="text-[12px] text-ink-secondary">- ${lang.nav.shortcuts}</span>
            <span class="text-[11px] font-semibold text-ink-tertiary pt-[10px]">${lang.mockup.workspace}</span>
            <span class="text-[12px] text-ink-secondary pl-[4px]">docs/</span>
            <span class="text-[12px] text-ink-secondary pl-[4px]">src/</span>
          </aside>
          <div class="flex-1 p-[32px] flex flex-col gap-[10px] overflow-hidden">
            <h2 class="font-display text-[22px] font-bold text-ink">${lang.mockup.introTitle}</h2>
            <p class="text-[13px] leading-[22px] text-ink-secondary">${lang.mockup.introP1}</p>
            <p class="text-[13px] leading-[22px] text-ink-secondary">${lang.mockup.introP2}</p>
            <div class="pt-[8px]">
              <div class="flex border-y border-border">
                <span class="w-[180px] py-[6px] text-[11px] font-semibold text-ink">${lang.mockup.metrics[0]}</span>
                <span class="w-[160px] py-[6px] text-[11px] font-semibold text-ink">${lang.mockup.metrics[1]}</span>
                <span class="flex-1 py-[6px] text-[11px] font-semibold text-ink">${lang.mockup.metrics[2]}</span>
              </div>
              <div class="flex border-b border-border">
                <span class="w-[180px] py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[0]}</span>
                <span class="w-[160px] py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[1]}</span>
                <span class="flex-1 py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[2]}</span>
              </div>
              <div class="flex">
                <span class="w-[180px] py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[3]}</span>
                <span class="w-[160px] py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[4]}</span>
                <span class="flex-1 py-[5px] text-[11px] text-ink-secondary">${lang.mockup.metrics[5]}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between px-[14px] h-[28px] bg-[#F6F6F7] border-t border-border">
          <div class="flex items-center gap-[10px] text-[11px]">
            <span class="text-ink-tertiary">${lang.mockup.modes[0]}</span>
            <span class="font-semibold text-accent">${lang.mockup.modes[1]}</span>
            <span class="text-ink-tertiary">${lang.mockup.modes[2]}</span>
          </div>
          <span class="text-[11px] text-ink-tertiary">${lang.mockup.status}</span>
        </div>
      </div>
    </section>

    <!-- ═══════════ Features ═══════════ -->
    <section id="features" class="bg-bg-subtle py-[96px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[48px]">
      <div class="flex flex-col items-center gap-[12px]">
        <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${lang.features.tag}</span>
        <h2 class="text-[40px] font-bold text-ink max-[768px]:text-[28px]">${lang.features.title}</h2>
        <p class="max-w-[600px] text-center text-[16px] leading-[26px] text-ink-secondary">${lang.features.subtitle}</p>
      </div>
      <div class="grid grid-cols-4 gap-[16px] w-full max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
        ${lang.features.items.map((item, i) => {
          const icons = [
            '<path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0D0D0F" stroke-width="1.8" stroke-linejoin="round"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
            '<circle cx="12" cy="12" r="9" stroke="#0D0D0F" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" stroke="#0D0D0F" stroke-width="1.8"/>',
            '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path d="M4 4h16M4 4l7 8-7 8M4 20h16" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
            '<circle cx="11" cy="11" r="7" stroke="#0D0D0F" stroke-width="1.8"/><path d="M16.5 16.5L21 21" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round"/>',
            '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="#0D0D0F" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 21v-8H7v8M7 3v5h8" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path d="M5 3l14 9-6 1-3 6-5-16z" stroke="#0D0D0F" stroke-width="1.8" stroke-linejoin="round"/>',
            '<path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5M4 21h16" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
          ];
          return `<div class="bg-bg border border-border rounded-[12px] p-[24px] flex flex-col gap-[12px]"><div class="w-[40px] h-[40px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${icons[i]}</svg></div><h3 class="text-[16px] font-semibold text-ink">${item.title}</h3><p class="text-[13px] leading-[21px] text-ink-secondary">${item.desc}</p></div>`;
        }).join('\n        ')}
      </div>
    </section>

    <!-- ═══════════ Download ═══════════ -->
    <section id="download" class="bg-bg py-[96px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[40px]">
      <div class="flex flex-col items-center gap-[12px]">
        <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${lang.downloadSec.tag}</span>
        <h2 class="text-[40px] font-bold text-ink max-[768px]:text-[28px]">${lang.downloadSec.title}</h2>
        <p class="max-w-[600px] text-center text-[16px] leading-[26px] text-ink-secondary">${lang.downloadSec.subtitle}</p>
      </div>
      <div class="grid grid-cols-3 gap-[16px] w-full max-[1000px]:grid-cols-1">
        <!-- Windows card -->
        <div id="os-win" class="os-card bg-bg border-2 border-accent rounded-[12px] p-[28px] flex flex-col gap-[16px]">
          <span class="os-badge w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5L10.5 4.3v7.2H3zM10.5 11.5v7.2L3 17.5v-6zM11.5 4.1L21 2.8v8.7h-9.5zM21 11.5v8.7l-9.5-1.3v-7.4z" fill="#0D0D0F"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">Windows</h3><p class="os-detected text-[12px] text-ink-tertiary">Windows x86_64</p></div>
          </div>
          <a id="win-btn" href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.exe" class="flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-accent text-white text-[15px] font-semibold hover:opacity-90 transition-opacity">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.winBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <span>MSI:</span>
            <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.msi" class="text-accent hover:underline font-mono text-[11px]">Lexora_Windows_x86_64.msi</a>
          </div>
        </div>
        <!-- macOS card -->
        <div id="os-macos" class="os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[16px]">
          <span class="os-badge hidden w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.6zM14.6 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" fill="#0D0D0F"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">macOS</h3><p class="os-detected text-[12px] text-ink-tertiary">Apple Silicon / Intel</p></div>
          </div>
          <a id="mac-btn" href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_aarch64.dmg" class="flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-ink text-white text-[15px] font-semibold hover:opacity-85 transition-opacity">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.macBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <span>Intel Mac:</span>
            <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_x86_64.dmg" class="text-accent hover:underline font-mono text-[11px]">Lexora_macOS_x86_64.dmg</a>
          </div>
        </div>
        <!-- Linux card -->
        <div id="os-linux" class="os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[16px]">
          <span class="os-badge hidden w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0D0D0F" stroke-width="1.8"/><path d="M7 9l3 3-3 3M13 15h4" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">Linux</h3><p class="os-detected text-[12px] text-ink-tertiary">x86_64</p></div>
          </div>
          <a id="linux-btn" href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.AppImage" class="flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-ink text-white text-[15px] font-semibold hover:opacity-85 transition-opacity">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.linuxBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.deb" class="text-accent hover:underline">Debian (.deb)</a>
            <span>·</span>
            <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.rpm" class="text-accent hover:underline">Fedora (.rpm)</a>
          </div>
        </div>
      </div>
      <a href="${dlPagePath}" class="flex items-center justify-center gap-[8px] py-[14px] w-full rounded-[8px] border border-border bg-bg text-[15px] font-medium text-ink hover:bg-bg-subtle transition-colors">${lang.downloadSec.otherDownloads}</a>
    </section>

    <!-- ═══════════ Architecture ═══════════ -->
    <section id="architecture" class="bg-bg-subtle py-[96px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[48px]">
      <div class="flex flex-col items-center gap-[12px]">
        <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${lang.arch.tag}</span>
        <h2 class="text-[40px] font-bold text-ink max-[768px]:text-[28px]">${lang.arch.title}</h2>
        <p class="max-w-[620px] text-center text-[16px] leading-[26px] text-ink-secondary">${lang.arch.subtitle}</p>
      </div>
      <div class="w-full bg-bg border border-border rounded-[16px] p-[48px] max-[768px]:p-[24px] flex items-center justify-between gap-[24px]">
        <div class="flex-1 flex flex-col gap-[10px]">
          <span class="font-display text-[11px] font-semibold tracking-[1.5px] text-accent">${lang.arch.frontend}</span>
          <span class="font-display text-[18px] font-semibold text-ink">${lang.arch.frontendTitle}</span>
          <div class="flex flex-wrap gap-[8px]">${lang.arch.frontendChips.map(c => `<span class="px-[10px] py-[5px] rounded-[6px] bg-bg-soft text-[12px] text-ink-secondary">${c}</span>`).join('')}</div>
        </div>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 max-[768px]:hidden"><path d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" stroke="#A6A6AC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="flex-1 flex flex-col gap-[10px]">
          <span class="font-display text-[11px] font-semibold tracking-[1.5px] text-accent">${lang.arch.ipc}</span>
          <span class="font-display text-[18px] font-semibold text-ink">${lang.arch.ipcTitle}</span>
          <div class="flex flex-wrap gap-[8px]">${lang.arch.ipcChips.map(c => `<span class="px-[10px] py-[5px] rounded-[6px] bg-bg-soft text-[12px] text-ink-secondary">${c}</span>`).join('')}</div>
        </div>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 max-[768px]:hidden"><path d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" stroke="#A6A6AC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="flex-1 flex flex-col gap-[10px]">
          <span class="font-display text-[11px] font-semibold tracking-[1.5px] text-accent">${lang.arch.rust}</span>
          <span class="font-display text-[18px] font-semibold text-ink">${lang.arch.rustTitle}</span>
          <div class="flex flex-wrap gap-[8px]">${lang.arch.rustChips.map(c => `<span class="px-[10px] py-[5px] rounded-[6px] bg-bg-soft text-[12px] text-ink-secondary">${c}</span>`).join('')}</div>
        </div>
      </div>
    </section>

    <!-- ═══════════ Shortcuts ═══════════ -->
    <section id="shortcuts" class="bg-bg py-[96px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[48px]">
      <div class="flex flex-col items-center gap-[12px]">
        <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${lang.shortcuts.tag}</span>
        <h2 class="text-[40px] font-bold text-ink max-[768px]:text-[28px]">${lang.shortcuts.title}</h2>
        <p class="max-w-[600px] text-center text-[16px] leading-[26px] text-ink-secondary">${lang.shortcuts.subtitle}</p>
      </div>
      <div class="grid grid-cols-3 gap-[16px] w-full max-[1000px]:grid-cols-1">
        <div class="bg-bg-subtle border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <h3 class="text-[16px] font-semibold text-ink">${lang.shortcuts.doc}</h3>
          ${lang.shortcuts.items.filter(it => it.group === 'doc').map(it => `<div class="flex items-center justify-between"><span class="text-[14px] text-ink-secondary">${it.label}</span><span class="px-[10px] py-[4px] rounded-[6px] bg-bg border border-border text-[12px] text-ink font-mono">${it.key}</span></div>`).join('\n          ')}
        </div>
        <div class="bg-bg-subtle border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <h3 class="text-[16px] font-semibold text-ink">${lang.shortcuts.edit}</h3>
          ${lang.shortcuts.items.filter(it => it.group === 'edit').map(it => `<div class="flex items-center justify-between"><span class="text-[14px] text-ink-secondary">${it.label}</span><span class="px-[10px] py-[4px] rounded-[6px] bg-bg border border-border text-[12px] text-ink font-mono">${it.key}</span></div>`).join('\n          ')}
        </div>
        <div class="bg-bg-subtle border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <h3 class="text-[16px] font-semibold text-ink">${lang.shortcuts.nav}</h3>
          ${lang.shortcuts.items.filter(it => it.group === 'nav').map(it => `<div class="flex items-center justify-between"><span class="text-[14px] text-ink-secondary">${it.label}</span><span class="px-[10px] py-[4px] rounded-[6px] bg-bg border border-border text-[12px] text-ink font-mono">${it.key}</span></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    <!-- ═══════════ FAQ + Changelog ═══════════ -->
    <section id="faq" class="bg-bg-subtle py-[96px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex gap-[64px] max-[1000px]:flex-col">
      <div class="w-[380px] max-[1000px]:w-full flex flex-col gap-[32px]">
        <div class="flex flex-col gap-[12px]">
          <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${lang.faq.tag}</span>
          <h2 class="font-display text-[36px] font-bold text-ink">${lang.faq.title}</h2>
          <p class="text-[15px] leading-[25px] text-ink-secondary">${lang.faq.subtitle}</p>
        </div>
        <div class="bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <div class="flex items-center justify-between">
            <h3 class="text-[16px] font-semibold text-ink">${lang.faq.changelogTitle}</h3>
            <span class="px-[8px] py-[3px] rounded-full bg-bg-tag text-[12px] text-accent font-semibold">${lang.faq.changelogVer}</span>
          </div>
          ${lang.faq.changelogItems.map(item => `<div class="flex items-center gap-[10px]"><span class="w-[5px] h-[5px] rounded-full bg-accent"></span><span class="text-[14px] text-ink-secondary">${item}</span></div>`).join('\n          ')}
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-[16px]">
        ${lang.faq.items.map(it => `<div class="bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[10px]"><h3 class="text-[16px] font-semibold text-ink">${it.q}</h3><p class="text-[14px] leading-[24px] text-ink-secondary">${it.a}</p></div>`).join('\n        ')}
      </div>
    </section>
  </main>

  <!-- ═══════════ Footer ═══════════ -->
  <footer class="bg-[#0D0D0F] pt-[80px] pb-[40px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col gap-[56px]">
    <div class="flex gap-[96px] max-[1000px]:flex-col max-[1000px]:gap-[48px]">
      <div class="w-[420px] max-[1000px]:w-full flex flex-col gap-[18px]">
        <div class="flex items-center gap-[10px]">
          <svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lgF" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4361ee"/><stop offset="1" stop-color="#3a0ca3"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lgF)"/><rect x="120" y="96" width="272" height="320" rx="20" fill="white" opacity="0.95"/><rect x="160" y="160" width="120" height="24" rx="6" fill="#4361ee"/><rect x="160" y="210" width="192" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="240" width="160" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="270" width="180" height="14" rx="4" fill="#6c757d" opacity="0.6"/><polygon points="310,380 390,300 420,330 340,410 300,420" fill="#4cc9f0"/></svg>
          <span class="font-display text-[20px] font-bold text-white">Lexora</span>
        </div>
        <p class="text-[14px] leading-[24px] text-white/70">${lang.metaDesc}</p>
        <p class="text-[11px] leading-[18px] text-white/40 w-[380px] max-[1000px]:w-full">English · 简体中文 · 繁體中文 · 日本語 · 한국어 · Deutsch · Français · Español · Русский</p>
      </div>
      <div class="flex-1 flex flex-col gap-[12px]">
        <h4 class="text-[14px] font-semibold text-white">Product</h4>
        <a href="#download" class="text-[13px] text-white/60 hover:text-white transition-colors">${lang.nav.download}</a>
        <a href="#features" class="text-[13px] text-white/60 hover:text-white transition-colors">${lang.nav.features}</a>
        <a href="#shortcuts" class="text-[13px] text-white/60 hover:text-white transition-colors">${lang.nav.shortcuts}</a>
        <a href="#faq" class="text-[13px] text-white/60 hover:text-white transition-colors">${lang.nav.faq}</a>
      </div>
      <div class="flex-1 flex flex-col gap-[12px]">
        <h4 class="text-[14px] font-semibold text-white">Resources</h4>
        <a href="https://github.com/BerryUIKI/Lexora" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">GitHub Repository</a>
        <a href="https://github.com/BerryUIKI/Lexora/tree/main/docs" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Documentation</a>
        <a href="https://github.com/BerryUIKI/Lexora/releases" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Releases</a>
        <a href="https://github.com/BerryUIKI/Lexora/blob/main/AGENTS.md" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">AGENTS.md</a>
      </div>
      <div class="flex-1 flex flex-col gap-[12px]">
        <h4 class="text-[14px] font-semibold text-white">Open Source</h4>
        <a href="https://github.com/BerryUIKI/Lexora/blob/main/LICENSE" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">AGPL-3.0 License</a>
        <a href="https://github.com/BerryUIKI/Lexora/blob/main/docs/CONTRIBUTING.md" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Contributing Guide</a>
        <a href="https://github.com/BerryUIKI/Lexora/issues" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Open an Issue</a>
        <a href="https://github.com/BerryUIKI/Lexora/security" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Security</a>
      </div>
    </div>
    <div class="h-px w-full bg-white/[0.12]"></div>
    <div class="flex items-center justify-between text-[12px] max-[768px]:flex-col max-[768px]:gap-[8px]">
      <span class="text-white/50">Copyright © 2026 Lexora Contributors · Licensed under AGPL-3.0</span>
      <span class="text-white/40">Built with Tauri 2 · Rust · SolidJS</span>
    </div>
  </footer>

  <script>
    function setLang(lang) {
      localStorage.setItem('lexora_user_lang', lang);
    }

    const sw = document.getElementById('langSwitcher');
    const menu = document.getElementById('langMenu');
    const btn = document.getElementById('langBtn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => menu.classList.add('hidden'));

    ${isRoot ? `// System & Browser Language Detection Logic:
    // 1. User manual selection (localStorage) takes top priority
    // 2. Detect browser/system languages (navigator.languages / navigator.language)
    // 3. Fallback to English (no redirect) if undetected or unsupported
    (function detectLanguage() {
      const savedLang = localStorage.getItem('lexora_user_lang');
      if (savedLang) {
        // If user explicitly picked English, stay on root
        if (savedLang !== 'en' && !sessionStorage.getItem('lexora_navigated')) {
          sessionStorage.setItem('lexora_navigated', '1');
          window.location.replace('./' + savedLang + '/');
        }
        return;
      }

      // First visit: inspect browser/system language preferences
      if (sessionStorage.getItem('lexora_navigated')) return;

      const candidateLangs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || 'en'];

      let detected = 'en'; // default fallback
      for (let i = 0; i < candidateLangs.length; i++) {
        const l = (candidateLangs[i] || '').toLowerCase();
        if (l.startsWith('zh-tw') || l.startsWith('zh-hk') || l.startsWith('zh-mo') || l.includes('hant')) {
          detected = 'zh-TW';
          break;
        } else if (l.startsWith('zh')) {
          detected = 'zh-CN';
          break;
        } else if (l.startsWith('ja')) {
          detected = 'ja';
          break;
        } else if (l.startsWith('ko')) {
          detected = 'ko';
          break;
        } else if (l.startsWith('de')) {
          detected = 'de';
          break;
        } else if (l.startsWith('fr')) {
          detected = 'fr';
          break;
        } else if (l.startsWith('es')) {
          detected = 'es';
          break;
        } else if (l.startsWith('ru')) {
          detected = 'ru';
          break;
        } else if (l.startsWith('en')) {
          detected = 'en';
          break;
        }
      }

      // If detected non-English on first visit, redirect to corresponding localized path
      if (detected !== 'en') {
        sessionStorage.setItem('lexora_navigated', '1');
        window.location.replace('./' + detected + '/');
      }
    })();` : ''}

    // OS detection: highlight recommended card
    const ua = navigator.userAgent.toLowerCase();
    let os = 'win';
    if (ua.includes('mac')) os = 'macos';
    else if (ua.includes('linux')) os = 'linux';

    document.querySelectorAll('.os-card').forEach(c => {
      c.classList.remove('border-2', 'border-accent');
      c.classList.add('border', 'border-border');
      const b = c.querySelector('.os-badge');
      if (b) b.classList.add('hidden');
    });

    const card = document.getElementById('os-' + os);
    if (card) {
      card.classList.remove('border', 'border-border');
      card.classList.add('border-2', 'border-accent');
      const badge = card.querySelector('.os-badge');
      if (badge) badge.classList.remove('hidden');
    }
  </script>
</body>
</html>`;
}

function buildDownload(lang) {
  const isRoot = lang.code === 'en';
  const iconPath = isRoot ? 'app-icon.svg' : '../app-icon.svg';
  const homePath = isRoot ? 'index.html' : 'index.html';
  const langOptionsHtml = renderLangDownloadOptions(lang.code, isRoot);

  return `<!DOCTYPE html>
<html lang="${lang.htmlLang}" class="h-full">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lang.downloadPage.title}</title>
  <meta name="description" content="${lang.downloadPage.metaDesc}" />

  <link rel="icon" type="image/svg+xml" href="${iconPath}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

  <style type="text/tailwindcss">
    @theme {
      --color-bg: #FFFFFF;
      --color-bg-subtle: #FAFAFA;
      --color-bg-soft: #F5F5FA;
      --color-bg-tag: #EDEDFA;
      --color-ink: #0D0D0F;
      --color-ink-secondary: #636366;
      --color-ink-tertiary: #8F8F94;
      --color-border: #E6E6E8;
      --color-accent: #4361EE;
      --font-display: "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    body { font-family: var(--font-body); color: var(--color-ink); background: var(--color-bg); }
    .dropdown-shadow { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08); }
  </style>
</head>
<body class="h-full antialiased">

  <header class="h-[72px] px-[48px] max-[768px]:px-4 bg-bg flex items-center justify-between border-b border-border">
    <a href="${homePath}" class="flex items-center gap-[10px]">
      <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lgD1" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4361ee"/><stop offset="1" stop-color="#3a0ca3"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lgD1)"/><rect x="120" y="96" width="272" height="320" rx="20" fill="white" opacity="0.95"/><rect x="160" y="160" width="120" height="24" rx="6" fill="#4361ee"/><rect x="160" y="210" width="192" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="240" width="160" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="270" width="180" height="14" rx="4" fill="#6c757d" opacity="0.6"/><polygon points="310,380 390,300 420,330 340,410 300,420" fill="#4cc9f0"/></svg>
      <span class="font-display text-[18px] font-bold text-ink">Lexora</span>
    </a>
    <div class="flex items-center gap-[14px]">
      <div class="relative" id="langSwitcher">
        <button id="langBtn" class="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[8px] border border-border text-[13px] text-ink-secondary hover:text-ink transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z" stroke="currentColor" stroke-width="1.8"/></svg>
          <span class="font-medium">${lang.name}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div id="langMenu" class="hidden absolute top-[40px] right-0 w-[200px] rounded-[10px] bg-bg border border-border dropdown-shadow p-[6px] flex flex-col gap-[2px] z-50">
${langOptionsHtml}
        </div>
      </div>
      <a href="${homePath}" class="text-[14px] text-ink-secondary hover:text-ink transition-colors font-medium">${lang.downloadPage.backHome}</a>
    </div>
  </header>

  <main>
    <section class="bg-bg pt-[72px] pb-[64px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col items-center gap-[20px]">
      <div class="flex items-center gap-[8px] px-[14px] py-[7px] rounded-full bg-bg-subtle border border-border text-[13px] text-ink-secondary">
        <span class="w-[6px] h-[6px] rounded-full bg-[#34C759]"></span>
        ${lang.downloadPage.tag}
      </div>
      <h1 class="font-display text-[48px] font-bold text-ink text-center max-[768px]:text-[32px]">${lang.downloadPage.heading}</h1>
      <p class="max-w-[640px] text-center text-[16px] leading-[26px] text-ink-secondary">
        ${lang.downloadPage.subheading}
      </p>

      <!-- Platform matrix -->
      <div class="grid grid-cols-3 gap-[16px] w-full pt-[16px] max-[1000px]:grid-cols-1">
        <!-- Windows -->
        <div class="bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5L10.5 4.3v7.2H3zM10.5 11.5v7.2L3 17.5v-6zM11.5 4.1L21 2.8v8.7h-9.5zM21 11.5v8.7l-9.5-1.3v-7.4z" fill="#0D0D0F"/></svg></div>
            <div><h2 class="font-display text-[20px] font-semibold text-ink">Windows</h2><p class="text-[12px] text-ink-tertiary">x86_64</p></div>
          </div>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.exe" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Setup (.exe)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_Windows_x86_64.exe</span>
          </a>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Windows_x86_64.msi" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">MSI (.msi)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_Windows_x86_64.msi</span>
          </a>
        </div>
        <!-- macOS -->
        <div class="bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.6zM14.6 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" fill="#0D0D0F"/></svg></div>
            <div><h2 class="font-display text-[20px] font-semibold text-ink">macOS</h2><p class="text-[12px] text-ink-tertiary">Apple Silicon / Intel</p></div>
          </div>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_aarch64.dmg" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Apple Silicon (DMG)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_macOS_aarch64.dmg</span>
          </a>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_macOS_x86_64.dmg" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Intel (DMG)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_macOS_x86_64.dmg</span>
          </a>
        </div>
        <!-- Linux -->
        <div class="bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px]">
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0D0D0F" stroke-width="1.8"/><path d="M7 9l3 3-3 3M13 15h4" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div><h2 class="font-display text-[20px] font-semibold text-ink">Linux</h2><p class="text-[12px] text-ink-tertiary">x86_64</p></div>
          </div>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.AppImage" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">AppImage</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_Linux_x86_64.AppImage</span>
          </a>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.deb" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Debian / Ubuntu (.deb)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_Linux_x86_64.deb</span>
          </a>
          <a href="https://github.com/BerryUIKI/Lexora/releases/latest/download/Lexora_Linux_x86_64.rpm" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Fedora / RHEL (.rpm)</span><span class="text-[10px] text-ink-tertiary font-mono">Lexora_Linux_x86_64.rpm</span>
          </a>
        </div>
      </div>

      <p class="text-[12px] leading-[20px] text-ink-tertiary text-center max-w-[720px] pt-[8px]">
        ${lang.downloadPage.note}
      </p>

      <div class="flex items-center gap-[16px] pt-[16px]">
        <a href="https://github.com/BerryUIKI/Lexora/releases" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[8px] border border-border bg-bg text-[14px] font-medium text-ink hover:bg-bg-subtle transition-colors">${lang.downloadPage.allReleases}</a>
        <a href="https://github.com/BerryUIKI/Lexora" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[8px] bg-ink text-white text-[14px] font-medium hover:opacity-85 transition-opacity">${lang.downloadPage.viewGh}</a>
      </div>
    </section>
  </main>

  <footer class="bg-[#0D0D0F] pt-[64px] pb-[40px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col gap-[40px]">
    <div class="flex items-center justify-between max-[1000px]:flex-col max-[1000px]:gap-[16px] max-[1000px]:items-start">
      <div class="flex items-center gap-[10px]">
        <svg width="26" height="26" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lgD2" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4361ee"/><stop offset="1" stop-color="#3a0ca3"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lgD2)"/><rect x="120" y="96" width="272" height="320" rx="20" fill="white" opacity="0.95"/><rect x="160" y="160" width="120" height="24" rx="6" fill="#4361ee"/><rect x="160" y="210" width="192" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="240" width="160" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="270" width="180" height="14" rx="4" fill="#6c757d" opacity="0.6"/><polygon points="310,380 390,300 420,330 340,410 300,420" fill="#4cc9f0"/></svg>
        <span class="font-display text-[18px] font-bold text-white">Lexora</span>
      </div>
      <span class="text-[11px] text-white/40">English · 简体中文 · 繁體中文 · 日本語 · 한국어 · Deutsch · Français · Español · Русский</span>
    </div>
    <div class="h-px w-full bg-white/[0.12]"></div>
    <div class="flex items-center justify-between text-[12px] max-[768px]:flex-col max-[768px]:gap-[8px]">
      <span class="text-white/50">Copyright © 2026 Lexora Contributors · Licensed under AGPL-3.0</span>
      <span class="text-white/40">Built with Tauri 2 · Rust · SolidJS</span>
    </div>
  </footer>

  <script>
    function setLang(lang) {
      localStorage.setItem('lexora_user_lang', lang);
    }
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => menu.classList.add('hidden'));
  </script>
</body>
</html>`;
}

// Generate all pages
for (const lang of Object.values(languages)) {
  const baseDir = lang.dir ? path.join(__dirname, lang.dir) : __dirname;
  if (lang.dir && !fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const indexPath = path.join(baseDir, 'index.html');
  const dlPath = path.join(baseDir, 'download.html');

  fs.writeFileSync(indexPath, buildIndex(lang), 'utf8');
  fs.writeFileSync(dlPath, buildDownload(lang), 'utf8');
  console.log(`Generated [${lang.code}] -> ${indexPath} and ${dlPath}`);
}
console.log('All 9 language pages built successfully!');
