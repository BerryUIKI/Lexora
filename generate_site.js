// generate_site.js — Builds user-first landing & download pages for all 9 languages
const fs = require('fs');
const path = require('path');

const LATEST_VERSION = '0.1.8';
const LATEST_VERSION_TAG = 'v' + LATEST_VERSION;

const languages = {
  'en': {
    code: 'en',
    dir: '',
    name: 'English',
    htmlLang: 'en',
    title: 'Taleno — Clean, Fast In-Place Markdown Reader & Editor',
    metaDesc: 'Taleno is a free, lightweight Markdown reader and editor where you type directly into the formatted text. No dual split panes, 100% private and offline, with instant startup and beautiful themes for Windows, macOS, and Linux.',
    nav: { features: 'Features', download: 'Download', architecture: 'Why Taleno', shortcuts: 'Shortcuts', faq: 'FAQ', github: 'GitHub' },
    selectLang: 'Select display language',
    hero: {
      badge: 'v0.1.8 Released · 100% Free & Open Source',
      title: 'Markdown, beautifully simple.',
      subtitle: 'Type directly into the finished page with zero clunky split screens. Taleno opens in the blink of an eye, keeps all your files strictly private on your computer, and lets you focus entirely on your thoughts.',
      downloadBtn: 'Download Taleno',
      githubBtn: 'GitHub Repository',
      chips: ['Opens in an instant', 'No split screens', '100% Offline & Private', '9 Languages']
    },
    mockup: {
      menu: ['File', 'Edit', 'View', 'Window', 'Help'],
      title: 'Taleno — Welcome to effortless writing.md',
      outline: 'Document Outline',
      workspace: 'Workspace Notes',
      introTitle: '# Focus on what you want to say',
      introP1: 'Forget confusing dual-pane editors where you write raw text on the left and squint at a preview on the right. In Taleno, what you see is what you get.',
      introP2: 'Headings, lists, bold text, and tables format live beneath your fingers as you type.',
      metrics: ['Startup Time', 'Under 0.4s', 'Instant launch', 'Smart Search', 'Instant', 'Entire workspace'],
      modes: ['Reading', 'Writing', 'Source'],
      status: 'Ln 1, Col 1  ·  1,420 words  ·  UTF-8  ·  Saved'
    },
    features: {
      tag: 'DESIGNED FOR WRITERS & THINKERS',
      title: 'Everything you need to write, nothing to distract you',
      subtitle: 'From daily notes and study outlines to long-form articles, Taleno gives you a peaceful, responsive writing space.',
      items: [
        { title: 'Three Flexible Views', desc: 'Switch in one click: a clean reading view for relaxed browsing, an interactive writing view, or raw Markdown source code.' },
        { title: 'One-Click Plugins', desc: 'Easily add helpful tools like word goals, timestamp shortcuts, or callout blocks from the built-in plugin gallery.' },
        { title: 'Comfortable Themes', desc: 'Built-in day and night themes, plus popular community styles like Dracula, Nord, and Catppuccin with instant live preview.' },
        { title: 'Speaks Your Language', desc: 'Automatically matches your system language across 9 languages, switchable at any time.' },
        { title: 'Crisp Code Highlighting', desc: 'Neat, colorful syntax highlighting for over 100 programming languages, complete with a one-click copy button.' },
        { title: 'Diagrams & Math Formulas', desc: 'Draw flowcharts and sequence diagrams with Mermaid, or insert crystal-clear mathematical equations with KaTeX.' },
        { title: 'Find Anything Instantly', desc: 'Search across all notes in your folder in milliseconds, or quickly find and replace words in the active document.' },
        { title: 'Never Lose Your Words', desc: 'Continuous background safety and smart safeguards prompt you before closing unsaved documents, keeping your work safe.' },
        { title: 'Effortless Drag & Drop', desc: 'Drop text files into the window to open them, drag onto tabs to multitask, or drop images directly into your text.' },
        { title: 'Share as Clean HTML', desc: 'Turn any note into a self-contained, beautifully styled web page with a single keyboard shortcut (Ctrl+E).' }
      ]
    },
    downloadSec: {
      tag: 'GET TALENO',
      title: 'Free download, ready in seconds',
      subtitle: 'We automatically detect your device and highlight the recommended installer for Windows, macOS, and Linux.',
      recommended: 'RECOMMENDED FOR YOUR SYSTEM',
      winBtn: 'Download for Windows (.exe)',
      macBtn: 'Download for Apple Silicon (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: 'Download AppImage',
      otherDownloads: 'View All Installers & Checksums on Downloads Page →'
    },
    arch: {
      tag: 'UNDER THE HOOD',
      title: 'Engineered for speed, crafted for battery life',
      subtitle: 'Taleno combines a native system core with modern UI engineering to give you instant keystroke response, zero lag, and virtually no battery drain.',
      frontend: 'SMOOTH INTERFACE',
      frontendTitle: 'Fluid, Responsive UI',
      frontendChips: ['Instant Keystrokes', 'Zero Typing Lag', '9 Languages', 'Themes & Plugins'],
      ipc: 'LIGHTWEIGHT BRIDGE',
      ipcTitle: 'Native Integration',
      ipcChips: ['Low Memory Footprint', 'Ultra-fast Startup', 'Sandboxed Security'],
      rust: 'HIGH-PERFORMANCE CORE',
      rustTitle: 'Rock-Solid Engine',
      rustChips: ['Crash-safe Auto-save', 'Instant Search', 'Zero Cloud Tracking', 'Pure Markdown']
    },
    shortcuts: {
      tag: 'KEYBOARD SHORTCUTS',
      title: 'Keep your hands on the keyboard',
      subtitle: 'Format headings, search notes, and manage tabs without reaching for the mouse.',
      doc: 'Files & Documents',
      edit: 'Text & Formatting',
      nav: 'Navigation & Search',
      items: [
        { group: 'doc', label: 'New document', key: 'Ctrl+N' },
        { group: 'doc', label: 'Open file', key: 'Ctrl+O' },
        { group: 'doc', label: 'Save document', key: 'Ctrl+S' },
        { group: 'doc', label: 'Save As...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Export as HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Bold text', key: 'Ctrl+B' },
        { group: 'edit', label: 'Italic text', key: 'Ctrl+I' },
        { group: 'edit', label: 'Headings 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Regular paragraph', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insert link', key: 'Ctrl+K' },
        { group: 'nav', label: 'Quick file switcher', key: 'Ctrl+P' },
        { group: 'nav', label: 'Find in document', key: 'Ctrl+F' },
        { group: 'nav', label: 'Replace words', key: 'Ctrl+H' },
        { group: 'nav', label: 'Search all notes', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Switch view mode', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'QUESTIONS & ANSWERS',
      title: 'Everything you need to know',
      subtitle: 'Need help or want to suggest an idea? Join our friendly community on GitHub.',
      changelogTitle: 'Latest Version',
      changelogVer: 'v0.1.8',
      changelogItems: [
        'Unsaved changes prompt to prevent accidental data loss',
        'Quick title bar access for plugins, themes, and languages',
        'Interactive version indicator with in-place update checks',
        'Refined single-document creation on tab bar double-click'
      ],
      items: [
        {
          q: 'Why choose Taleno over traditional Markdown editors?',
          a: 'Most editors either clutter your screen with two separate panes (one for writing, one for viewing) or feel heavy and sluggish. Taleno renders your Markdown formatting directly in place as you type, launches in a fraction of a second, and uses almost no memory. Your screen stays clean, and your writing stays uninterrupted.'
        },
        {
          q: 'Will my existing Markdown notes work?',
          a: 'Yes, 100%. Taleno uses standard, pure Markdown files (.md). You can open documents created in Obsidian, Typora, Notion, or VS Code, and vice versa. There are no proprietary databases or hidden lock-ins.'
        },
        {
          q: 'Are my notes kept private and offline?',
          a: 'Completely. Your files stay on your computer where they belong. Taleno never uploads your writing to any servers, requires no login or account, and functions flawlessly without an internet connection.'
        },
        {
          q: 'Can I customize the look and feel?',
          a: 'Absolutely! You can choose from built-in clean light and dark themes or install popular community palettes like Dracula, Nord, and Catppuccin with a single click in Settings.'
        },
        {
          q: 'Is Taleno free?',
          a: 'Yes, Taleno is 100% free and open source under the GNU AGPL-3.0 license. There are no paywalls, ads, or artificial feature limits.'
        }
      ]
    },
    downloadPage: {
      title: 'Download Taleno — Clean In-Place Markdown Editor',
      metaDesc: 'Download Taleno for Windows, macOS, and Linux. Free, lightweight in-place WYSIWYG Markdown editor with instant launch and complete privacy.',
      tag: 'v0.1.8 · Latest Official Release',
      heading: 'Download Taleno',
      subheading: 'Direct links straight from GitHub Releases. Choose your platform below and start writing in seconds.',
      backHome: '← Back to Overview',
      note: 'All downloads are official standalone packages hosted on GitHub Releases. When an update is released, your installed app can check and update seamlessly.',
      allReleases: 'View All Releases & Changelog',
      viewGh: 'View GitHub Repository'
    }
  },

  'zh-CN': {
    code: 'zh-CN',
    dir: 'zh-CN',
    name: '简体中文',
    htmlLang: 'zh-CN',
    title: 'Taleno — 极简流畅的原位所见即所得 Markdown 阅读与编辑器',
    metaDesc: 'Taleno 是一款免费轻快的本地优先 Markdown 阅读与编辑器。告别左右分屏，光标处直接排版；秒速启动、100% 离线隐私保护，支持个性化主题与实用插件，适用于 Windows、macOS 与 Linux。',
    nav: { features: '功能特色', download: '免费下载', architecture: '为什么轻快', shortcuts: '快捷键', faq: '常见问答', github: 'GitHub' },
    selectLang: '选择界面显示语言',
    hero: {
      badge: 'v0.1.8 正式发布 · 100% 免费开源',
      title: '所见即所得，落笔即成文。',
      subtitle: '专为纯粹创作打造的原位 Markdown 编辑器。告别“左边写代码、右边看预览”的传统分屏，打字即时排版。秒速开启、不占内存、文档完全保存在本地磁盘，更有丰富主题与实用扩展，让记录成为一种享受。',
      downloadBtn: '免费下载 Taleno',
      githubBtn: 'GitHub 开源仓库',
      chips: ['毫秒级瞬时秒开', '告别分屏原位排版', '100% 本地离线隐私', '完全免费开源']
    },
    mockup: {
      menu: ['文件', '编辑', '视图', '窗口', '帮助'],
      title: 'Taleno — 开启沉浸自然的写作体验.md',
      outline: '文档大纲目录',
      workspace: '工作区笔记',
      introTitle: '# 专注表达，让排版自然发生',
      introP1: '不再需要在两个窗口之间来回分心对齐。在 Taleno 中，你输入标题、列表、粗体或代码时，优美优雅的排版就在光标下方实时展现。',
      introP2: '原位所见即所得 · 极速全文搜索 · 本地安全防护。',
      metrics: ['冷启动耗时', '低于 0.4 秒', '瞬时秒开就绪', '全库搜索', '毫秒级响应', '整个文件夹秒搜'],
      modes: ['阅读视图', '写作视图', '源码视图'],
      status: '第 1 行, 第 1 列  ·  1,420 字  ·  UTF-8  ·  已保存'
    },
    features: {
      tag: '贴心设计，专注纯粹创作',
      title: '只保留写作所需的一切，去除所有杂乱干扰',
      subtitle: '从日常备忘、读书笔记到长篇撰写，Taleno 为你营造安静、流畅且安心的记录空间。',
      items: [
        { title: '三种视图一键切换', desc: '按下快捷键随心切换：安享沉浸阅读的无干扰视图、随写随排的原位写作模式，以及完全掌控语法的源码视图。' },
        { title: '一键扩展插件市场', desc: '内置官方插件库，字数目标、自动时间戳、提示信息卡片等实用小工具，点一下即可安装使用。' },
        { title: '舒适主题与个性换肤', desc: '提供护眼的明暗配色方案，更支持一键换上 Dracula、Nord、Catppuccin 等经典社区主题，实时预览生效。' },
        { title: '原生多语言支持', desc: '内置 9 种语言界面，自动识别电脑系统语言，也能在菜单中随时自由切换。' },
        { title: '清晰代码语法高亮', desc: '内置百余种编程语言的彩色语法高亮，附带语言类型小标签和一键复制代码块功能。' },
        { title: '流程图表与公式渲染', desc: '支持 Mermaid 流程图与时序图绘制，以及 KaTeX 数学公式实时排版，理工科与学术笔记同样得心应手。' },
        { title: '毫秒级笔记全文搜索', desc: '无论文件夹里有多少篇文档，按下 Ctrl+Shift+F 瞬间找到关键词，文档内查找替换同样丝滑。' },
        { title: '贴心防丢与未保存提醒', desc: '底层原子安全保存，关闭未保存文档时主动弹出确认窗口，即使电脑意外断电也绝不损坏文字。' },
        { title: '直观好用的拖拽交互', desc: '把 Markdown 文件拖进窗口直接阅读，拖到标签栏新建文档，拖入图片自动插入对应格式。' },
        { title: '一键导出独立 HTML', desc: '随时按下 Ctrl+E，将当前笔记导出为排版精致、无需连网即可直接发送给同事朋友的独立网页。' }
      ]
    },
    downloadSec: {
      tag: '立即获取',
      title: '免费下载，几秒钟即可就绪',
      subtitle: '系统将自动检测您的电脑设备，并智能推荐适合 Windows、macOS 或 Linux 的安装包。',
      recommended: '当前电脑推荐安装版本',
      winBtn: '下载 Windows 安装包 (.exe)',
      macBtn: '下载 Apple Silicon 安装镜像 (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: '下载通用 AppImage',
      otherDownloads: '前往下载页查看全部安装包与校验码 →'
    },
    arch: {
      tag: '为什么如此轻快',
      title: '极速响应，省电低耗，远离卡顿',
      subtitle: 'Taleno 摒弃了传统笨重庞大的浏览器内核包袱，以现代原生技术打造，带来零延迟的击键反馈与超低电量消耗。',
      frontend: '丝滑流畅界面',
      frontendTitle: '现代轻量化前端',
      frontendChips: ['打字毫无延迟', '告别卡顿掉帧', '9 国语言切换', '精美主题换肤'],
      ipc: '高效原生桥梁',
      ipcTitle: '极简原生连接',
      ipcChips: ['超小内存占用', '秒开无需等待', '安全沙箱防护'],
      rust: '坚固系统内核',
      rustTitle: '可靠系统引擎',
      rustChips: ['断电防丢数据保护', '全局秒速查找', '纯本地零隐私上传', '标准通用格式']
    },
    shortcuts: {
      tag: '快捷按键',
      title: '双手无需离开键盘',
      subtitle: '排版文本、查找笔记、管理标签页，一切操作尽在指尖完成。',
      doc: '文档与文件管理',
      edit: '排版与文字格式',
      nav: '快速导航与搜索',
      items: [
        { group: 'doc', label: '新建文档', key: 'Ctrl+N' },
        { group: 'doc', label: '打开文件', key: 'Ctrl+O' },
        { group: 'doc', label: '保存当前文档', key: 'Ctrl+S' },
        { group: 'doc', label: '另存为...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: '导出为 HTML 网页', key: 'Ctrl+E' },
        { group: 'edit', label: '文字加粗', key: 'Ctrl+B' },
        { group: 'edit', label: '斜体样式', key: 'Ctrl+I' },
        { group: 'edit', label: '1~6 级标题', key: 'Ctrl+1~6' },
        { group: 'edit', label: '恢复正文段落', key: 'Ctrl+0' },
        { group: 'edit', label: '插入超链接', key: 'Ctrl+K' },
        { group: 'nav', label: '快速文件切换器', key: 'Ctrl+P' },
        { group: 'nav', label: '文档内查找', key: 'Ctrl+F' },
        { group: 'nav', label: '文档内替换', key: 'Ctrl+H' },
        { group: 'nav', label: '文件夹全局全文搜索', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '切换浏览/写作模式', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: '常见问答',
      title: '你关心的都在这里',
      subtitle: '有任何疑问或改进建议？欢迎随时前往 GitHub 与我们交流。',
      changelogTitle: '最新版本动态',
      changelogVer: 'v0.1.8',
      changelogItems: [
        '新增未保存文档关闭确认弹窗，全方位防止误关丢字',
        '标题栏新增插件市场、主题换肤与多语言快捷入口',
        '底部状态栏最左侧集成版本号，支持原位快速检测更新',
        '优化标签栏双击新建文档交互，防抖精准创建单份文档'
      ],
      items: [
        {
          q: '相比其他 Markdown 工具，Taleno 的最大亮点是什么？',
          a: '很多笔记工具不是左右双栏分屏显得杂乱，就是安装包庞大、打字发热卡顿。Taleno 彻底做到了光标处原位即时渲染，打开只需零点几秒，内存占用极低。界面清爽干净，让你全身心投入到思路本身。'
        },
        {
          q: '我以前在其他软件里写的 Markdown 笔记能直接用吗？',
          a: '完全可以！Taleno 严格遵循通用的标准 Markdown 规范（.md 文件）。无论是从 Obsidian、Typora、Notion 导出的笔记，还是 GitHub 上的文档，都能直接双击打开并保存，没有任何私有格式绑定。'
        },
        {
          q: '我的笔记安全吗？会不会被上传到云端？',
          a: '绝对安全。Taleno 100% 采用本地优先机制，所有笔记和文件只存放在你自己的电脑硬盘上，不强制注册账号，不收集文档内容，无网络也能完全正常使用。'
        },
        {
          q: '是否支持更换主题与安装插件？',
          a: '支持！你可以在设置界面自由选择内置的浅色/深色主题，也可以一键下载 Dracula、Nord 等经典社区皮肤。想要扩展字数统计、提示块等功能，也能在内置的插件市场随心挑选。'
        },
        {
          q: 'Taleno 是免费的吗？',
          a: '是的，Taleno 基于开源协议完全免费供所有人使用，没有任何付费门槛、无弹出广告，也无任何功能限制。'
        }
      ]
    },
    downloadPage: {
      title: '下载 Taleno — 极速沉浸原位 Markdown 编辑器',
      metaDesc: '免费下载适用于 Windows、macOS 和 Linux 的 Taleno 官方正式安装包。纯本地无上传、毫秒级秒开、原位所见即所得。',
      tag: 'v0.1.8 · 最新官方正式版',
      heading: '免费下载 Taleno',
      subheading: '官方直连 GitHub Releases 镜像，点击即刻高速下载，几秒钟内开启顺畅写作。',
      backHome: '← 返回首页概览',
      note: '所有下载链接均为官方构建发布的安装包，软件内置原地更新检查，后续版本发布后可直接在软件内轻松更新。',
      allReleases: '查看历史版本与更新日志',
      viewGh: '前往 GitHub 开源主页'
    }
  },

  'zh-TW': {
    code: 'zh-TW',
    dir: 'zh-TW',
    name: '繁體中文',
    htmlLang: 'zh-TW',
    title: 'Taleno — 極簡流暢的原位所見即所得 Markdown 閱讀與編輯器',
    metaDesc: 'Taleno 是一款免費輕快的本地優先 Markdown 閱讀與編輯器。告別左右雙欄分屏，游標處直接排版；秒速啟動、100% 離線隱私保護，支援個人化主題與實用外掛，適用於 Windows、macOS 與 Linux。',
    nav: { features: '功能特色', download: '免費下載', architecture: '為何輕快', shortcuts: '快捷鍵', faq: '常見問答', github: 'GitHub' },
    selectLang: '選擇介面顯示語言',
    hero: {
      badge: 'v0.1.8 正式發布 · 100% 免費開源',
      title: '所見即所得，落筆即成文。',
      subtitle: '專為純粹創作打造的原位 Markdown 編輯器。告別「左邊寫代碼、右邊看預覽」的傳統分屏，打字即時排版。秒速開啟、不佔記憶體、文件完全儲存於本地磁碟，更有豐富主題與實用擴充，讓記錄成為一種享受。',
      downloadBtn: '免費下載 Taleno',
      githubBtn: 'GitHub 開源專案',
      chips: ['毫秒級瞬時秒開', '告別分屏原位排版', '100% 本地離線隱私', '完全免費開源']
    },
    mockup: {
      menu: ['檔案', '編輯', '檢視', '視窗', '說明'],
      title: 'Taleno — 開啟沉浸自然的寫作體驗.md',
      outline: '文件大綱目錄',
      workspace: '工作區筆記',
      introTitle: '# 專注表達，讓排版自然發生',
      introP1: '不再需要在兩個視窗之間來回分心對齊。在 Taleno 中，輸入標題、清單、粗體或代碼時，優雅的排版就在游標下方即時展現。',
      introP2: '原位所見即所得 · 極速全文搜尋 · 本地安全防護。',
      metrics: ['冷啟動耗時', '低於 0.4 秒', '瞬時秒開就緒', '全庫搜尋', '毫秒級響應', '整個資料夾秒搜'],
      modes: ['閱讀檢視', '寫作檢視', '原始碼檢視'],
      status: '第 1 行, 第 1 列  ·  1,420 字  ·  UTF-8  ·  已儲存'
    },
    features: {
      tag: '貼心設計，專注純粹創作',
      title: '只保留寫作所需的一切，去除所有雜亂干擾',
      subtitle: '從日常備忘、讀書筆記到長篇撰寫，Taleno 為你營造安靜、流暢且安心的記錄空間。',
      items: [
        { title: '三種檢視一鍵切換', desc: '按下快捷鍵隨心切換：安享沉浸閱讀的無干擾檢視、隨寫隨排的原位寫作模式，以及完全掌控語法的原始碼檢視。' },
        { title: '一鍵擴充外掛市場', desc: '內建官方外掛庫，字數目標、自動時間戳記、提示資訊卡片等實用小工具，點一下即可安裝使用。' },
        { title: '舒適主題與個性換膚', desc: '提供護眼的明暗色彩配置，更支援一鍵換上 Dracula、Nord、Catppuccin 等經典社群主題，即時預覽生效。' },
        { title: '原生多語言支援', desc: '內建 9 種語言介面，自動辨識電腦系統語言，也能在選單中隨時自由切換。' },
        { title: '清晰代碼語法高亮', desc: '內建百餘種程式語言的彩色語法高亮，附帶語言類型小標籤和一鍵複製代碼區塊功能。' },
        { title: '流程圖表與公式渲染', desc: '支援 Mermaid 流程圖與時序圖繪製，以及 KaTeX 數學公式即時排版，理工科與學術筆記同樣得心應手。' },
        { title: '毫秒級筆記全文搜尋', desc: '無論資料夾裡有多少篇文件，按下 Ctrl+Shift+F 瞬間找到關鍵字，文件內尋找替換同樣滑順。' },
        { title: '貼心防丟與未儲存提醒', desc: '底層原子安全儲存，關閉未儲存文件時主動彈出確認視窗，即使電腦意外斷電也絕不損壞文字。' },
        { title: '直覺好用的拖曳互動', desc: '把 Markdown 檔案拖進視窗直接閱讀，拖到分頁列新建文件，拖入圖片自動插入對應格式。' },
        { title: '一鍵匯出獨立 HTML', desc: '隨時按下 Ctrl+E，將當前筆記匯出為排版精緻、無需連線即可直接發送給同事朋友的獨立網頁。' }
      ]
    },
    downloadSec: {
      tag: '立即取得',
      title: '免費下載，幾秒鐘即可就緒',
      subtitle: '系統將自動辨識您的電腦裝置，並智慧推薦適合 Windows、macOS 或 Linux 的安裝套件。',
      recommended: '當前電腦推薦安裝版本',
      winBtn: '下載 Windows 安裝套件 (.exe)',
      macBtn: '下載 Apple Silicon 安裝映像 (.dmg)',
      macIntelBtn: 'Intel Mac (.dmg)',
      linuxBtn: '下載通用 AppImage',
      otherDownloads: '前往下載頁檢視全部安裝套件與校驗碼 →'
    },
    arch: {
      tag: '為何如此輕快',
      title: '極速響應，省電低耗，遠離卡頓',
      subtitle: 'Taleno 摒棄了傳統笨重龐大的瀏覽器核心包袱，以現代原生技術打造，帶來零延遲的擊鍵回饋與超低電量消耗。',
      frontend: '絲滑流暢介面',
      frontendTitle: '現代輕量化前端',
      frontendChips: ['打字毫無延遲', '告別卡頓掉影', '9 國語言切換', '精美主題換膚'],
      ipc: '高效原生橋樑',
      ipcTitle: '極簡原生連接',
      ipcChips: ['超小記憶體佔用', '秒開無需等待', '安全沙箱防護'],
      rust: '堅固系統核心',
      rustTitle: '可靠系統引擎',
      rustChips: ['斷電防丟資料保護', '全域秒速尋找', '純本地零隱私上傳', '標準通用格式']
    },
    shortcuts: {
      tag: '快捷按鍵',
      title: '雙手無需離開鍵盤',
      subtitle: '排版文字、尋找筆記、管理分頁列，一切操作盡在指尖完成。',
      doc: '文件與檔案管理',
      edit: '排版與文字格式',
      nav: '快速導覽與搜尋',
      items: [
        { group: 'doc', label: '新建文件', key: 'Ctrl+N' },
        { group: 'doc', label: '開啟檔案', key: 'Ctrl+O' },
        { group: 'doc', label: '儲存當前文件', key: 'Ctrl+S' },
        { group: 'doc', label: '另存新檔...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: '匯出為 HTML 網頁', key: 'Ctrl+E' },
        { group: 'edit', label: '文字粗體', key: 'Ctrl+B' },
        { group: 'edit', label: '斜體樣式', key: 'Ctrl+I' },
        { group: 'edit', label: '1~6 級標題', key: 'Ctrl+1~6' },
        { group: 'edit', label: '恢復內文段落', key: 'Ctrl+0' },
        { group: 'edit', label: '插入超連結', key: 'Ctrl+K' },
        { group: 'nav', label: '快速檔案切換器', key: 'Ctrl+P' },
        { group: 'nav', label: '文件內尋找', key: 'Ctrl+F' },
        { group: 'nav', label: '文件內替換', key: 'Ctrl+H' },
        { group: 'nav', label: '資料夾全域全文搜尋', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '切換瀏覽/寫作模式', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: '常見問答',
      title: '你關心的都在這裡',
      subtitle: '有任何疑問或改進建議？歡迎隨時前往 GitHub 與我們交流。',
      changelogTitle: '最新版本動態',
      changelogVer: 'v0.1.8',
      changelogItems: [
        '新增未儲存文件關閉確認視窗，全方位防止誤關丟字',
        '標題列新增外掛市場、主題換膚與多語言快捷入口',
        '底部狀態列最左側整合版本號，支援原位快速檢查更新',
        '最佳化分頁列雙擊新建文件互動，防抖精準建立單份文件'
      ],
      items: [
        {
          q: '相比其他 Markdown 工具，Taleno 的最大亮點是什麼？',
          a: '許多筆記工具不是左右雙欄分屏顯得雜亂，就是安裝套件龐大、打字發熱卡頓。Taleno 徹底做到了游標處原位即時渲染，開啟只需零點幾秒，記憶體佔用極低。介面清爽乾淨，讓你全身心投入到思路本身。'
        },
        {
          q: '我以前在其他軟體裡寫的 Markdown 筆記能直接用嗎？',
          a: '完全可以！Taleno 嚴格遵循通用的標準 Markdown 規範（.md 檔案）。無論是從 Obsidian、Typora、Notion 匯出的筆記，還是 GitHub 上的文件，都能直接雙擊開啟並儲存，沒有任何私有格式綁定。'
        },
        {
          q: '我的筆記安全嗎？會不會被上傳到雲端？',
          a: '絕對安全。Taleno 100% 採用本地優先機制，所有筆記和檔案只存放在你自己的電腦硬碟上，不強制註冊帳號，不收集文件內容，無網路也能完全正常使用。'
        },
        {
          q: '是否支援更換主題與安裝外掛？',
          a: '支援！你可以在設定介面自由選擇內建的淺色/深色主題，也可以一鍵下載 Dracula、Nord 等經典社群外觀。想要擴充字數統計、提示區塊等功能，也能在內建的外掛市場隨心挑選。'
        },
        {
          q: 'Taleno 是免費的嗎？',
          a: '是的，Taleno 基於開源協議完全免費供所有人使用，沒有任何付費門檻、無彈出廣告，也無任何功能限制。'
        }
      ]
    },
    downloadPage: {
      title: '下載 Taleno — 極速沉浸原位 Markdown 編輯器',
      metaDesc: '免費下載適用於 Windows、macOS 和 Linux 的 Taleno 官方正式安裝套件。純本地無上傳、毫秒級秒開、原位所見即所得。',
      tag: 'v0.1.8 · 最新官方正式版',
      heading: '免費下載 Taleno',
      subheading: '官方直連 GitHub Releases 鏡像，點擊即刻高速下載，幾秒鐘內開啟順暢寫作。',
      backHome: '← 返回首頁概覽',
      note: '所有下載連結均為官方建置發布的安裝套件，軟體內建原地更新檢查，後續版本發布後可直接在軟體內輕鬆更新。',
      allReleases: '檢視歷史版本與更新日誌',
      viewGh: '前往 GitHub 開源主頁'
    }
  },

  'ja': {
    code: 'ja',
    dir: 'ja',
    name: '日本語',
    htmlLang: 'ja',
    title: 'Taleno — 軽快でシンプルなその場 WYSIWYG Markdown エディタ',
    metaDesc: 'Taleno は、2分割プレビュー画面を排し、入力したその場で美しく書式が整う無料・高速・完全ローカルの Markdown エディタです。オフライン対応、高速起動、テーマ・プラグイン拡張に対応。Windows・macOS・Linux 対応。',
    nav: { features: '機能と特徴', download: 'ダウンロード', architecture: '軽快さの秘密', shortcuts: 'ショートカット', faq: 'よくある質問', github: 'GitHub' },
    selectLang: '表示言語を選択',
    hero: {
      badge: 'v0.1.8 リリース · 100% 無料・オープンソース',
      title: '思考をそのまま、美しい文章に。',
      subtitle: '左右の2画面分割に別れを告げましょう。Taleno は入力と同時にその場で組版される、シンプルで軽快な Markdown エディタです。一瞬で起動し、すべての文書はローカルに安全に保存されます。',
      downloadBtn: 'Taleno をダウンロード',
      githubBtn: 'GitHub リポジトリ',
      chips: ['一瞬で起動', '2画面分割なし', '100% ローカル保存', '完全無料']
    },
    mockup: {
      menu: ['ファイル', '編集', '表示', 'ウィンドウ', 'ヘルプ'],
      title: 'Taleno — 自然で心地よい執筆体験へ.md',
      outline: '目次アウトライン',
      workspace: 'ワークスペース',
      introTitle: '# 思考の邪魔をしない、純粋な執筆空間',
      introP1: '左で書いて右で確認する煩わしさはもう不要です。Taleno では、見出しやリスト、強調を入力した瞬間にカーソル位置で美しく整形されます。',
      introP2: 'その場 WYSIWYG · 高速全文検索 · 安心の自動保存。',
      metrics: ['起動時間', '0.4秒未満', '瞬時に作業開始', '全体検索', '瞬時表示', 'フォルダ全体を検索'],
      modes: ['閲覧モード', '編集モード', 'ソースモード'],
      status: '1行, 1列  ·  1,420 文字  ·  UTF-8  ·  保存済み'
    },
    features: {
      tag: '書き手のためのデザイン',
      title: '書くことに集中できる、快適な機能の数々',
      subtitle: '日々のメモ、学習記録、本格的な論文執筆まで。Taleno は静かで心地よい空間を提供します。',
      items: [
        { title: '3つの表示モード', desc: '快適に読書できる閲覧モード、直感的な編集モード、構文を細かく整えるソースモードをショートカットで自在に切り替え。' },
        { title: 'ワンクリック拡張機能', desc: '目標文字数カウンターやタイムスタンプ挿入など、便利なプラグインをマーケットからワンクリックで追加可能。' },
        { title: '美しいテーマ着せ替え', desc: '目に優しいライト・ダークテーマに加え、Dracula、Nord、Catppuccin などの人気テーマをリアルタイムプレビューで適用できます。' },
        { title: '9言語ネイティブ対応', desc: 'OS の言語設定を自動認識。日本語を含む9つの言語に最初から対応しています。' },
        { title: '見やすいコードハイライト', desc: '100以上のプログラミング言語に対応したシンタックスハイライト。コードブロックのコピーもワンクリックです。' },
        { title: '図表＆数式レンダリング', desc: 'Mermaid によるフローチャートやシーケンス図、KaTeX による数式の美しい組版をリアルタイムに行えます。' },
        { title: 'フォルダ全体の超高速検索', desc: 'メモの数が増えても心配無用。Ctrl+Shift+F でワークスペース全体から目的の言葉を瞬時に検索できます。' },
        { title: '安心のデータ保護設計', desc: '未保存のままウィンドウを閉じる際には確認ダイアログでお知らせ。突然の電源断でもファイルを安全に守ります。' },
        { title: '直感的なドラッグ＆ドロップ', desc: 'ファイルをウィンドウに放り込むだけで閲覧開始。タブバーにドラッグして新規タブ、文章中への画像挿入もスムーズです。' },
        { title: '綺麗な HTML への書き出し', desc: 'Ctrl+E を押すだけで、レイアウトが整った単一の HTML ファイルとしてエクスポート。共有や提出も簡単です。' }
      ]
    },
    downloadSec: {
      tag: 'ダウンロード',
      title: '無料ダウンロード、数秒で準備完了',
      subtitle: 'お使いのパソコンを自動判定し、Windows、macOS、Linux に最適なインストーラーをおすすめします。',
      recommended: 'お使いのシステムにおすすめ',
      winBtn: 'Windows 版をダウンロード (.exe)',
      macBtn: 'Apple Silicon Mac 版 (.dmg)',
      macIntelBtn: 'Intel Mac 版 (.dmg)',
      linuxBtn: 'Linux AppImage をダウンロード',
      otherDownloads: 'すべてのファイルと検証ハッシュを見る →'
    },
    arch: {
      tag: '軽快さの秘密',
      title: '驚くほど速く、バッテリーにも優しい設計',
      subtitle: '従来の重厚なブラウザエンジンを丸ごと抱え込む構造を見直し、タイピングの遅延をゼロにし、メモリ消費を最小限に抑えました。',
      frontend: 'なめらかな UI',
      frontendTitle: '軽快なフロントエンド',
      frontendChips: ['タイピング遅延ゼロ', 'カクつきなし', '多言語対応', 'テーマ切り替え'],
      ipc: '軽量な内部連携',
      ipcTitle: '効率的な設計',
      ipcChips: ['低メモリ消費', '一瞬で起動', '安全なサンドボックス'],
      rust: '堅牢なネイティブコア',
      rustTitle: '安心のシステム基盤',
      rustChips: ['データ消失防止', '高速全文検索', 'クラウド非送信', '標準 Markdown']
    },
    shortcuts: {
      tag: 'ショートカットキー',
      title: 'キーボードから手を離さずに操作',
      subtitle: '見出し設定、書式変更、ノート検索もすべて指先ひとつで完了します。',
      doc: '文書・ファイル操作',
      edit: '書式・スタイル',
      nav: '検索・ナビゲーション',
      items: [
        { group: 'doc', label: '新規ドキュメント', key: 'Ctrl+N' },
        { group: 'doc', label: 'ファイルを開く', key: 'Ctrl+O' },
        { group: 'doc', label: '保存', key: 'Ctrl+S' },
        { group: 'doc', label: '名前を付けて保存...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'HTML 書き出し', key: 'Ctrl+E' },
        { group: 'edit', label: '太字', key: 'Ctrl+B' },
        { group: 'edit', label: '斜体', key: 'Ctrl+I' },
        { group: 'edit', label: '見出し 1〜6', key: 'Ctrl+1〜6' },
        { group: 'edit', label: '標準段落に戻す', key: 'Ctrl+0' },
        { group: 'edit', label: 'リンク挿入', key: 'Ctrl+K' },
        { group: 'nav', label: 'ファイルクイック切替', key: 'Ctrl+P' },
        { group: 'nav', label: '文書内検索', key: 'Ctrl+F' },
        { group: 'nav', label: '文書内置換', key: 'Ctrl+H' },
        { group: 'nav', label: 'フォルダ全体検索', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '表示モード切替', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'よくある質問',
      title: '疑問にお答えします',
      subtitle: 'ご質問や機能のリクエストは、お気軽に GitHub リポジトリまでお寄せください。',
      changelogTitle: '最新リリースの変更点',
      changelogVer: 'v0.1.8',
      changelogItems: [
        '未保存ドキュメントを閉じる際の安全確認ダイアログを追加',
        'タイトルバーにプラグイン・テーマ・言語のクイックボタンを新設',
        'ステータスバー左端にバージョン表示を配置（その場で更新確認可能）',
        'タブバーのダブルクリックで新規ドキュメントを確実に1つ作成'
      ],
      items: [
        {
          q: '他の Markdown エディタとの大きな違いは何ですか？',
          a: '多くのエディタは「左に入力、右にプレビュー」という2画面分割を必要とし、アプリ自体も重くなりがちです。Taleno は打ったその場で綺麗なレイアウトになり、起動も一瞬。画面がすっきりして執筆に没頭できます。'
        },
        {
          q: 'すでに書いた Markdown ファイルはそのまま開けますか？',
          a: 'はい、完全に互換性があります。Taleno は標準的な純粋な .md ファイルを使用します。Obsidian や Typora、Notion などで作成した文書もそのまま開いて編集できます。'
        },
        {
          q: 'ノートの内容が外部サーバーに送信されることはありますか？',
          a: '一切ありません。すべての文書はお使いのパソコン内にのみ保存されます。アカウント登録も不要で、オフライン環境でも完全にご利用いただけます。'
        },
        {
          q: 'テーマやプラグインは利用できますか？',
          a: 'はい！設定画面からお好みのライト/ダークテーマを選択できるほか、Dracula などのコミュニティテーマや便利なプラグインをワンクリックで導入できます。'
        },
        {
          q: '利用料金はかかりますか？',
          a: '完全無料です。オープンソース（GNU AGPL-3.0）として公開されており、有料プランや広告、機能制限などは一切ありません。'
        }
      ]
    },
    downloadPage: {
      title: 'Taleno のダウンロード — 軽快なその場 Markdown エディタ',
      metaDesc: 'Windows、macOS、Linux 向けの Taleno 公式インストーラーをダウンロード。完全ローカル、瞬時起動、その場 WYSIWYG。',
      tag: 'v0.1.8 · 最新公式リリース',
      heading: 'Taleno をダウンロード',
      subheading: 'GitHub Releases の公式直接リンクです。プラットフォームを選択して、快適な執筆を始めましょう。',
      backHome: '← ホームへ戻る',
      note: 'ダウンロードファイルはすべて公式ビルドです。アプリ内からも直接ワンクリックで更新チェックが行えます。',
      allReleases: 'すべてのリリースと更新履歴を見る',
      viewGh: 'GitHub リポジトリへ'
    }
  },

  'ko': {
    code: 'ko',
    dir: 'ko',
    name: '한국어',
    htmlLang: 'ko',
    title: 'Taleno — 가볍고 빠른 인플레이스 WYSIWYG 마크다운 에디터',
    metaDesc: 'Taleno는 분할 화면 없이 입력한 자리에서 바로 완성된 서식이 적용되는 무료 로컬 마크다운 리더 및 에디터입니다. 100% 오프라인 개인정보 보호, 빠른 실행, 다양한 테마와 플러그인을 지원합니다. Windows, macOS, Linux 지원.',
    nav: { features: '주요 기능', download: '다운로드', architecture: '가벼운 이유', shortcuts: '단축키', faq: '자주 묻는 질문', github: 'GitHub' },
    selectLang: '표시 언어 선택',
    hero: {
      badge: 'v0.1.8 정식 출시 · 100% 무료 및 오픈 소스',
      title: '생각을 그대로, 아름다운 글이 되도록.',
      subtitle: '번거로운 좌우 2분할 화면 없이 입력과 동시에 그 자리에서 깔끔하게 정돈되는 미니멀 마크다운 에디터입니다. 눈 깜짝할 사이에 켜지고, 모든 문서는 컴퓨터에 안전하게 보관됩니다.',
      downloadBtn: 'Taleno 무료 다운로드',
      githubBtn: 'GitHub 저장소',
      chips: ['순식간에 실행', '화면 분할 없음', '100% 로컬 저장', '완전 무료 오픈소스']
    },
    mockup: {
      menu: ['파일', '편집', '보기', '창', '도움말'],
      title: 'Taleno — 자연스럽고 편안한 글쓰기.md',
      outline: '문서 목차',
      workspace: '작업 공간 노트',
      introTitle: '# 생각에만 집중할 수 있는 순수한 공간',
      introP1: '왼쪽에서 마크다운 코드를 쓰고 오른쪽에서 미리보기를 번갈아 볼 필요가 없습니다. 제목, 목록, 굵은 글씨를 입력하면 커서 아래에서 즉시 예쁘게 다듬어집니다.',
      introP2: '인플레이스 WYSIWYG · 초고속 전체 검색 · 안전한 자동 저장.',
      metrics: ['시작 속도', '0.4초 미만', '순식간에 준비 완료', '전체 검색', '즉각 반응', '폴더 전체 초고속 검색'],
      modes: ['읽기 모드', '작성 모드', '소스 모드'],
      status: '1행, 1열  ·  1,420 단어  ·  UTF-8  ·  저장됨'
    },
    features: {
      tag: '작성자를 위한 세심한 설계',
      title: '글쓰기에 꼭 필요한 것만, 방해 요소는 제로',
      subtitle: '가벼운 메모부터 깊이 있는 논문이나 블로그 초안까지, Taleno는 고요하고 쾌적한 기록 공간을 만듭니다.',
      items: [
        { title: '3가지 화면 모드', desc: '차분하게 글을 읽는 뷰 모드, 직관적인 작성 모드, 세밀하게 문법을 다루는 소스 모드를 단축키 하나로 전환합니다.' },
        { title: '원클릭 플러그인 확장', desc: '목표 글자수 카운터, 자동 타임스탬프 등 유용한 도구를 내장 플러그인 갤러리에서 손쉽게 추가할 수 있습니다.' },
        { title: '편안한 테마 스킨', desc: '눈이 편한 라이트/다크 테마는 물론, Dracula, Nord, Catppuccin 등 인기 커뮤니티 테마를 실시간 미리보기로 적용합니다.' },
        { title: '9개 국어 지원', desc: '운영체제의 언어를 자동으로 감지하며, 언제든 메뉴에서 자유롭게 원하는 언어로 변경할 수 있습니다.' },
        { title: '선명한 코드 강조', desc: '100여 개 프로그래밍 언어의 구문 강조와 원클릭 코드 복사 버튼을 제공합니다.' },
        { title: '다이어그램 및 수식 지원', desc: 'Mermaid 플로우차트와 시퀀스 다이어그램, KaTeX를 통한 정교한 수학 수식을 실시간으로 렌더링합니다.' },
        { title: '폴더 전체 초고속 검색', desc: '노트가 아무리 많아도 Ctrl+Shift+F 한 번이면 원하는 단어가 포함된 문서를 순식간에 찾아냅니다.' },
        { title: '안심 데이터 보호', desc: '저장되지 않은 문서 닫기 시 확인 창을 띄워 실수를 방지하며, 정전 시에도 글이 유실되지 않도록 보호합니다.' },
        { title: '손쉬운 드래그 앤 드롭', desc: '마크다운 파일을 창 안으로 끌어와 열고, 탭 표시줄에 놓아 새 탭을 만들며, 이미지를 본문에 바로 삽입하세요.' },
        { title: '깔끔한 독립 HTML 내보내기', desc: 'Ctrl+E 단축키로 서식이 완벽히 포함된 단일 웹페이지 파일로 내보내어 동료나 친구에게 손쉽게 공유할 수 있습니다.' }
      ]
    },
    downloadSec: {
      tag: '다운로드',
      title: '무료 다운로드, 몇 초면 준비 완료',
      subtitle: '접속한 기기를 자동으로 인식하여 Windows, macOS, Linux에 알맞은 설치 프로그램을 추천해 드립니다.',
      recommended: '현재 운영체제 권장 버전',
      winBtn: 'Windows 버전 다운로드 (.exe)',
      macBtn: 'Apple Silicon Mac 버전 (.dmg)',
      macIntelBtn: 'Intel Mac 버전 (.dmg)',
      linuxBtn: 'Linux AppImage 다운로드',
      otherDownloads: '모든 설치 파일 및 해시값 보기 →'
    },
    arch: {
      tag: '가벼운 이유',
      title: '빠른 반응 속도, 낮은 배터리 소모',
      subtitle: '무거운 브라우저 엔진 대신 현대적인 네이티브 설계를 적용하여 타이핑 딜레이를 없애고 메모리 사용량을 최소화했습니다.',
      frontend: '매끄러운 인터페이스',
      frontendTitle: '부드러운 반응형 프론트엔드',
      frontendChips: ['타이핑 딜레이 제로', '화면 버벅임 없음', '9개 국어 전환', '테마 실시간 변경'],
      ipc: '가벼운 내부 연결',
      ipcTitle: '효율적인 구조',
      ipcChips: ['초소형 메모리 점유', '순식간에 켜짐', '안전한 샌드박스'],
      rust: '견고한 시스템 코어',
      rustTitle: '신뢰할 수 있는 엔진',
      rustChips: ['문서 유실 방지 보호', '초고속 전체 검색', '클라우드 전송 제로', '표준 마크다운']
    },
    shortcuts: {
      tag: '편리한 단축키',
      title: '키보드에서 손을 뗄 필요 없이',
      subtitle: '제목 지정, 글자 서식 변경, 노트 검색까지 손끝에서 빠르게 완성됩니다.',
      doc: '문서 및 파일 관리',
      edit: '글꼴 및 서식',
      nav: '빠른 탐색 및 검색',
      items: [
        { group: 'doc', label: '새 문서 만들기', key: 'Ctrl+N' },
        { group: 'doc', label: '파일 열기', key: 'Ctrl+O' },
        { group: 'doc', label: '문서 저장', key: 'Ctrl+S' },
        { group: 'doc', label: '다른 이름으로 저장...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'HTML 파일로 내보내기', key: 'Ctrl+E' },
        { group: 'edit', label: '굵은 글씨', key: 'Ctrl+B' },
        { group: 'edit', label: '기울임꼴', key: 'Ctrl+I' },
        { group: 'edit', label: '1~6단계 제목', key: 'Ctrl+1~6' },
        { group: 'edit', label: '일반 본문 단락', key: 'Ctrl+0' },
        { group: 'edit', label: '링크 삽입', key: 'Ctrl+K' },
        { group: 'nav', label: '빠른 파일 전환', key: 'Ctrl+P' },
        { group: 'nav', label: '문서 내 찾기', key: 'Ctrl+F' },
        { group: 'nav', label: '단어 바꾸기', key: 'Ctrl+H' },
        { group: 'nav', label: '폴더 전체 내용 검색', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: '화면 모드 전환', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: '자주 묻는 질문',
      title: '궁금한 점을 확인해 보세요',
      subtitle: '문의 사항이나 새로운 기능 제안은 GitHub 저장소에 언제든 남겨주세요.',
      changelogTitle: '최신 버전 변경 사항',
      changelogVer: 'v0.1.8',
      changelogItems: [
        '저장되지 않은 문서 닫기 시 확인 알림창 추가 (실수 방지)',
        '제목 표시줄에 플러그인, 테마, 언어 빠른 설정 버튼 추가',
        '상태 표시줄 좌측 끝에 버전 배지 배치 (원클릭 업데이트 확인)',
        '탭 표시줄 더블클릭 시 새 문서가 정확히 1개 생성되도록 개선'
      ],
      items: [
        {
          q: '기존 마크다운 편집기와 어떻게 다른가요?',
          a: '많은 편집기는 좌우로 나뉜 2분할 화면을 사용해 답답하거나 앱이 무거워 느려지기 쉽습니다. Taleno는 타이핑하는 즉시 그 자리에서 서식이 적용되며, 1초도 안 되어 바로 실행되고 메모리도 거의 차지하지 않습니다.'
        },
        {
          q: '기존에 작성해 둔 마크다운 파일을 그대로 쓸 수 있나요?',
          a: '네, 100% 호환됩니다! Taleno는 표준 마크다운 파일(.md) 형식을 사용합니다. Obsidian, Typora, Notion 등에서 작성한 글을 그대로 열고 저장할 수 있습니다.'
        },
        {
          q: '내 글이 외부 서버로 유출될 위험은 없나요?',
          a: '전혀 없습니다. Taleno는 100% 로컬 전용으로 작동하여 모든 문서는 사용자의 컴퓨터에만 안전하게 저장됩니다. 계정 가입도 필요 없으며 인터넷이 없는 곳에서도 완벽히 작동합니다.'
        },
        {
          q: '테마와 플러그인을 바꿀 수 있나요?',
          a: '네! 설정에서 기본 라이트/다크 테마 외에도 Dracula, Nord 같은 인기 커뮤니티 스킨을 바로 내려받아 쓸 수 있으며, 유용한 플러그인도 쉽게 추가할 수 있습니다.'
        },
        {
          q: 'Taleno는 무료인가요?',
          a: '네, Taleno는 오픈 소스(GNU AGPL-3.0)로 누구나 무료로 사용할 수 있으며 유료 결제나 광고, 기능 제한이 일체 없습니다.'
        }
      ]
    },
    downloadPage: {
      title: 'Taleno 다운로드 — 가볍고 쾌적한 마크다운 에디터',
      metaDesc: 'Windows, macOS, Linux용 Taleno 공식 버전을 다운로드하세요. 완전 로컬 저장, 순식간에 실행, 분할 없는 인플레이스 WYSIWYG.',
      tag: 'v0.1.8 · 최신 공식 정식 버전',
      heading: 'Taleno 무료 다운로드',
      subheading: 'GitHub Releases 공식 직접 링크입니다. 플랫폼을 선택하여 가볍고 편안한 글쓰기를 시작하세요.',
      backHome: '← 메인 화면으로 돌아가기',
      note: '모든 파일은 공식 빌드 설치 파일이며, 앱 내에서도 클릭 한 번으로 간편하게 최신 버전을 확인할 수 있습니다.',
      allReleases: '모든 버전 및 릴리스 내역 보기',
      viewGh: 'GitHub 저장소 둘러보기'
    }
  },

  'de': {
    code: 'de',
    dir: 'de',
    name: 'Deutsch',
    htmlLang: 'de',
    title: 'Taleno — Schneller, ablenkungsfreier In-Place Markdown-Editor',
    metaDesc: 'Taleno ist ein kostenloser, lokaler Markdown-Reader & Editor ohne geteilte Fenster. Formatierung direkt beim Tippen, 100% Privatsphäre offline, sofortiger Start und ansprechende Themes für Windows, macOS und Linux.',
    nav: { features: 'Funktionen', download: 'Download', architecture: 'Warum so schnell', shortcuts: 'Tastenkombinationen', faq: 'FAQ', github: 'GitHub' },
    selectLang: 'Anzeigesprache wählen',
    hero: {
      badge: 'v0.1.8 veröffentlicht · 100% Kostenlos & Open Source',
      title: 'Markdown, wunderbar einfach.',
      subtitle: 'Schreibe direkt im formatierten Dokument – ganz ohne unübersichtliche geteilte Fenster. Taleno öffnet blitzschnell, speichert alle Notizen sicher auf deinem Computer und lässt dich ungestört schreiben.',
      downloadBtn: 'Taleno herunterladen',
      githubBtn: 'GitHub-Repository',
      chips: ['Startet blitzschnell', 'Keine geteilten Fenster', '100% Offline & Privat', 'Vollständig kostenlos']
    },
    mockup: {
      menu: ['Datei', 'Bearbeiten', 'Ansicht', 'Fenster', 'Hilfe'],
      title: 'Taleno — Willkommen zum entspannten Schreiben.md',
      outline: 'Gliederung',
      workspace: 'Arbeitsbereich',
      introTitle: '# Konzentriere dich auf deine Gedanken',
      introP1: 'Vergiss unübersichtliche Editoren mit zwei Fenstern. In Taleno formatieren sich Überschriften, Listen und Fettschrift direkt unter deinem Cursor, während du tippst.',
      introP2: 'In-Place WYSIWYG · Blitzschnelle Volltextsuche · Schutz vor Datenverlust.',
      metrics: ['Startzeit', 'Unter 0,4 Sek.', 'Sofort einsatzbereit', 'Globale Suche', 'Reaktionsschnell', 'Gesamter Ordner'],
      modes: ['Lesen', 'Schreiben', 'Quellcode'],
      status: 'Zl 1, Sp 1  ·  1.420 Wörter  ·  UTF-8  ·  Gespeichert'
    },
    features: {
      tag: 'FÜR AUTOREN ENTWICKELT',
      title: 'Alles, was du zum Schreiben brauchst – ohne Ablenkung',
      subtitle: 'Ob kurze Gedanken, Lernnotizen oder lange Artikel: Taleno bietet dir einen ruhigen, zuverlässigen Ort für deine Texte.',
      items: [
        { title: 'Drei flexible Ansichten', desc: 'Mit einem Klick umschalten: ruhiger Lesemodus, direkte In-Place-Schreibansicht oder roher Markdown-Quelltext.' },
        { title: 'Einfache Plugins', desc: 'Erweitere deinen Editor um Wortziele, Zeitstempel oder Hinweisboxen mit nur einem Klick aus der Galerie.' },
        { title: 'Angenehme Themes', desc: 'Schone deine Augen mit hellen und dunklen Stilen oder installiere beliebte Themes wie Dracula, Nord und Catppuccin.' },
        { title: 'Spricht deine Sprache', desc: 'Erkennt automatisch deine Systemsprache in 9 Sprachen und lässt sich jederzeit umstellen.' },
        { title: 'Klares Code-Highlighting', desc: 'Farbliche Syntaxhervorhebung für über 100 Programmiersprachen inklusive praktischer Kopierfunktion.' },
        { title: 'Diagramme & Formeln', desc: 'Erstelle Ablaufdiagramme mit Mermaid und binde mathematische Formeln mit KaTeX in Echtzeit ein.' },
        { title: 'Sofortige Notizsuche', desc: 'Egal wie viele Dateien du hast: Mit Strg+Umschalt+F durchsuchst du all deine Notizen in Millisekunden.' },
        { title: 'Kein Datenverlust', desc: 'Sichere Hintergrundspeicherung und intelligente Abfragen vor dem Schließen ungespeicherter Tabs schützen jedes deiner Worte.' },
        { title: 'Intuitive Bedienung', desc: 'Dateien einfach ins Fenster ziehen, auf die Tableiste ablegen oder Bilder direkt im Text platzieren.' },
        { title: 'Als sauberes HTML exportieren', desc: 'Mit Strg+E jede Notiz in eine eigenständige, hübsch gestaltete Webseite für Freunde oder Kollegen verwandeln.' }
      ]
    },
    downloadSec: {
      tag: 'DOWNLOAD',
      title: 'Kostenlos herunterladen, in Sekunden startklar',
      subtitle: 'Dein Betriebssystem wird automatisch erkannt und das passende Paket für Windows, macOS oder Linux hervorgehoben.',
      recommended: 'FÜR DEIN SYSTEM EMPFOHLEN',
      winBtn: 'Für Windows herunterladen (.exe)',
      macBtn: 'Für Apple Silicon Mac (.dmg)',
      macIntelBtn: 'Für Intel Mac (.dmg)',
      linuxBtn: 'AppImage für Linux',
      otherDownloads: 'Alle Installationsdateien auf der Download-Seite ansehen →'
    },
    arch: {
      tag: 'WARUM SO SCHNELL',
      title: 'Enorme Geschwindigkeit, minimaler Akkuverbrauch',
      subtitle: 'Taleno verzichtet auf schwerfällige Browser-Ballaste und setzt auf moderne native Technologie – für verzögerungsfreies Tippen und leise Lüfter.',
      frontend: 'Flüssige Oberfläche',
      frontendTitle: 'Moderne Leichtigkeit',
      frontendChips: ['Tippen ohne Verzögerung', 'Kein Ruckeln', '9 Sprachen', 'Echtzeit-Themes'],
      ipc: 'Schlanke Architektur',
      ipcTitle: 'Effiziente Verbindung',
      ipcChips: ['Sehr wenig RAM', 'Sofortiger Start', 'Sichere Sandbox'],
      rust: 'Solider Systemkern',
      rustTitle: 'Zuverlässiger Motor',
      rustChips: ['Schutz vor Abstürzen', 'Blitzschnelle Suche', 'Keine Cloud-Übertragung', 'Standard-Markdown']
    },
    shortcuts: {
      tag: 'TASTATURBEFEHLE',
      title: 'Die Hände bleiben auf den Tasten',
      subtitle: 'Formatieren, Suchen und Navigieren gelingt mühelos über bewährte Tastenkombinationen.',
      doc: 'Dateien & Dokumente',
      edit: 'Text & Formatierung',
      nav: 'Navigation & Suche',
      items: [
        { group: 'doc', label: 'Neues Dokument', key: 'Strg+N' },
        { group: 'doc', label: 'Datei öffnen', key: 'Strg+O' },
        { group: 'doc', label: 'Speichern', key: 'Strg+S' },
        { group: 'doc', label: 'Speichern unter...', key: 'Strg+Umschalt+S' },
        { group: 'doc', label: 'Als HTML exportieren', key: 'Strg+E' },
        { group: 'edit', label: 'Fett', key: 'Strg+B' },
        { group: 'edit', label: 'Kursiv', key: 'Strg+I' },
        { group: 'edit', label: 'Überschriften 1–6', key: 'Strg+1~6' },
        { group: 'edit', label: 'Normaler Absatz', key: 'Strg+0' },
        { group: 'edit', label: 'Link einfügen', key: 'Strg+K' },
        { group: 'nav', label: 'Schnellwechsler', key: 'Strg+P' },
        { group: 'nav', label: 'Im Dokument suchen', key: 'Strg+F' },
        { group: 'nav', label: 'Ersetzen', key: 'Strg+H' },
        { group: 'nav', label: 'Alle Notizen durchsuchen', key: 'Strg+Umschalt+F' },
        { group: 'nav', label: 'Ansichtsmodus wechseln', key: 'Strg+/' }
      ]
    },
    faq: {
      tag: 'FRAGEN & ANTWORTEN',
      title: 'Häufig gestellte Fragen',
      subtitle: 'Hast du Fragen oder Vorschläge? Besuche unser Repository auf GitHub.',
      changelogTitle: 'Neuerungen der Version',
      changelogVer: 'v0.1.8',
      changelogItems: [
        'Sicherheitsabfrage beim Schließen ungespeicherter Dokumente',
        'Schnellzugriff in der Titelleiste für Plugins, Themes und Sprachen',
        'Versionsanzeige unten links mit direkter Update-Prüfung',
        'Zuverlässiges Erstellen einzelner Dokumente per Doppelklick'
      ],
      items: [
        {
          q: 'Was unterscheidet Taleno von anderen Editoren?',
          a: 'Viele Markdown-Editoren teilen den Bildschirm in zwei Hälften oder fühlen sich schwerfällig an. Taleno formatiert direkt im Text während des Schreibens, startet in unter einer Sekunde und verbraucht kaum Arbeitsspeicher.'
        },
        {
          q: 'Kann ich meine bestehenden Markdown-Notizen öffnen?',
          a: 'Ja, uneingeschränkt! Taleno verwendet reine Standard-Markdown-Dateien (.md). Deine Notizen aus Obsidian, Typora, Notion oder VS Code lassen sich direkt öffnen und bearbeiten.'
        },
        {
          q: 'Bleiben meine Notizen privat?',
          a: 'Zu 100 %. Alle Dokumente verbleiben ausschließlich auf deiner Festplatte. Es gibt keinen Cloud-Zwang, keine Benutzerkonten und Taleno funktioniert komplett offline.'
        },
        {
          q: 'Kann ich das Aussehen anpassen?',
          a: 'Ja! Wähle in den Einstellungen aus hellen und dunklen Themes oder lade beliebte Stile wie Dracula oder Nord mit einem Klick herunter.'
        },
        {
          q: 'Ist Taleno wirklich kostenlos?',
          a: 'Ja, Taleno ist freie Open-Source-Software (GNU AGPL-3.0) ohne versteckte Abos, Werbung oder Funktionseinschränkungen.'
        }
      ]
    },
    downloadPage: {
      title: 'Taleno herunterladen — Schneller In-Place Markdown-Editor',
      metaDesc: 'Lade Taleno für Windows, macOS und Linux herunter. Schnell, unkompliziert, komplett offline und ohne geteilte Fenster.',
      tag: 'v0.1.8 · Neueste offizielle Version',
      heading: 'Taleno kostenlos herunterladen',
      subheading: 'Direkte Download-Links von GitHub Releases. Wähle dein System und fange in wenigen Augenblicken an zu schreiben.',
      backHome: '← Zurück zur Übersicht',
      note: 'Alle Downloads sind offizielle Pakete. Zukünftige Updates können bequem direkt in der Anwendung geprüft werden.',
      allReleases: 'Alle Versionen & Änderungsprotokoll',
      viewGh: 'GitHub-Repository ansehen'
    }
  },

  'fr': {
    code: 'fr',
    dir: 'fr',
    name: 'Français',
    htmlLang: 'fr',
    title: 'Taleno — Éditeur Markdown In-Place Rapide et Épuré',
    metaDesc: 'Taleno est un éditeur et lecteur Markdown local, gratuit et sans double volet. Mise en page directe sous le curseur, respect absolu de la vie privée hors ligne, démarrage instantané pour Windows, macOS et Linux.',
    nav: { features: 'Fonctionnalités', download: 'Télécharger', architecture: 'Performances', shortcuts: 'Raccourcis', faq: 'FAQ', github: 'GitHub' },
    selectLang: 'Choisir la langue',
    hero: {
      badge: 'v0.1.8 disponible · 100% Gratuit et Open Source',
      title: 'Le Markdown, en toute simplicité.',
      subtitle: 'Écrivez directement dans votre document mis en forme, sans écran séparé. Taleno s’ouvre en un éclair, conserve tous vos écrits en sécurité sur votre ordinateur et vous offre un espace d’écriture fluide et apaisant.',
      downloadBtn: 'Télécharger Taleno',
      githubBtn: 'Dépôt GitHub',
      chips: ['Démarrage instantané', 'Zéro écran scindé', '100% Hors ligne et Privé', 'Totalement gratuit']
    },
    mockup: {
      menu: ['Fichier', 'Édition', 'Affichage', 'Fenêtre', 'Aide'],
      title: 'Taleno — Écrire l’esprit libre.md',
      outline: 'Plan du document',
      workspace: 'Espace de notes',
      introTitle: '# Concentrez-vous sur vos idées',
      introP1: 'Oubliez les éditeurs à deux colonnes où vous tapez du code brut à gauche pour regarder un aperçu à droite. Avec Taleno, ce que vous tapez prend forme directement sous vos yeux.',
      introP2: 'WYSIWYG en place · Recherche plein texte ultra-rapide · Protection automatique.',
      metrics: ['Démarrage', '< 0,4 s', 'Prêt instantanément', 'Recherche', 'Instantanée', 'Tout le dossier'],
      modes: ['Lecture', 'Écriture', 'Code source'],
      status: 'Lg 1, Col 1  ·  1 420 mots  ·  UTF-8  ·  Enregistré'
    },
    features: {
      tag: 'CONÇU POUR CEUX QUI ÉCRIVENT',
      title: 'Tout pour écrire, rien pour vous distraire',
      subtitle: 'Notes rapides, fiches d’étude ou récits au long cours : Taleno vous procure un environnement calme, réactif et fiable.',
      items: [
        { title: 'Trois vues selon vos envies', desc: 'Passez d’un raccourci d’un mode lecture confortable à un mode d’écriture fluide ou au code source brut.' },
        { title: 'Extensions en un clic', desc: 'Ajoutez facilement des objectifs de mots ou des blocs d’encadrés depuis la galerie de plugins intégrée.' },
        { title: 'Thèmes soignés', desc: 'Des thèmes clairs et sombres reposants, avec aperçu direct de palettes populaires comme Dracula, Nord ou Catppuccin.' },
        { title: 'Adapté à votre langue', desc: 'Détection automatique de la langue de votre système parmi 9 langues natives, modifiable à tout moment.' },
        { title: 'Coloration de code nette', desc: 'Mise en valeur claire de la syntaxe pour plus de 100 langages informatiques avec copie en un clic.' },
        { title: 'Schémas et équations', desc: 'Générez des graphiques Mermaid et affichez des formules mathématiques KaTeX impeccables sans friction.' },
        { title: 'Recherche globale éclair', desc: 'Retrouvez n’importe quel mot parmi des centaines de notes en un clin d’œil avec Ctrl+Maj+F.' },
        { title: 'Vos écrits toujours protégés', desc: 'Enregistrement sécurisé en arrière-plan et confirmation avant de fermer des documents non enregistrés.' },
        { title: 'Glisser-déposer naturel', desc: 'Glissez des fichiers pour les lire, déposez-les sur la barre d’onglets ou insérez des images directement dans le texte.' },
        { title: 'Export HTML autonome', desc: 'Transformez n’importe quelle note en une page web élégante et autonome prête à être partagée d’un simple raccourci (Ctrl+E).' }
      ]
    },
    downloadSec: {
      tag: 'TÉLÉCHARGEMENT',
      title: 'Téléchargement gratuit, prêt en quelques secondes',
      subtitle: 'Votre système est détecté automatiquement pour vous recommander l’installateur adapté à Windows, macOS ou Linux.',
      recommended: 'RECOMMANDÉ POUR VOTRE SYSTÈME',
      winBtn: 'Télécharger pour Windows (.exe)',
      macBtn: 'Télécharger pour Mac Apple Silicon (.dmg)',
      macIntelBtn: 'Mac Intel (.dmg)',
      linuxBtn: 'Télécharger AppImage',
      otherDownloads: 'Voir tous les installeurs sur la page de téléchargement →'
    },
    arch: {
      tag: 'PERFORMANCES',
      title: 'Pensé pour la vitesse, économe en batterie',
      subtitle: 'En évitant les architectures lourdes des navigateurs complets, Taleno offre une réactivité sans latence et ménage la batterie de votre ordinateur.',
      frontend: 'Interface réactive',
      frontendTitle: 'Légèreté moderne',
      frontendChips: ['Zéro délai de frappe', 'Fluide en permanence', '9 langues', 'Thèmes instantanés'],
      ipc: 'Liaison optimisée',
      ipcTitle: 'Connexion directe',
      ipcChips: ['Mémoire minime', 'Ouverture immédiate', 'Sécurité renforcée'],
      rust: 'Moteur robuste',
      rustTitle: 'Cœur système fiable',
      rustChips: ['Sauvegarde anti-crash', 'Recherche instantanée', 'Zéro pistage cloud', 'Markdown standard']
    },
    shortcuts: {
      tag: 'RACCOURCIS CLAVIER',
      title: 'Gardez les mains sur le clavier',
      subtitle: 'Structurez, formatez et parcourez vos notes facilement sans toucher à la souris.',
      doc: 'Fichiers et documents',
      edit: 'Texte et mise en forme',
      nav: 'Navigation et recherche',
      items: [
        { group: 'doc', label: 'Nouveau document', key: 'Ctrl+N' },
        { group: 'doc', label: 'Ouvrir un fichier', key: 'Ctrl+O' },
        { group: 'doc', label: 'Enregistrer', key: 'Ctrl+S' },
        { group: 'doc', label: 'Enregistrer sous...', key: 'Ctrl+Maj+S' },
        { group: 'doc', label: 'Exporter en HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Gras', key: 'Ctrl+B' },
        { group: 'edit', label: 'Italique', key: 'Ctrl+I' },
        { group: 'edit', label: 'Titres 1 à 6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Paragraphe normal', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insérer un lien', key: 'Ctrl+K' },
        { group: 'nav', label: 'Sélecteur rapide', key: 'Ctrl+P' },
        { group: 'nav', label: 'Rechercher dans la note', key: 'Ctrl+F' },
        { group: 'nav', label: 'Remplacer', key: 'Ctrl+H' },
        { group: 'nav', label: 'Rechercher partout', key: 'Ctrl+Maj+F' },
        { group: 'nav', label: 'Changer de mode de vue', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'FOIRE AUX QUESTIONS',
      title: 'Tout ce que vous voulez savoir',
      subtitle: 'Une question ou une suggestion ? Venez échanger avec nous sur GitHub.',
      changelogTitle: 'Nouveautés de la version',
      changelogVer: 'v0.1.8',
      changelogItems: [
        'Alerte de confirmation à la fermeture de documents non enregistrés',
        'Boutons d’accès direct aux extensions, thèmes et langues en barre de titre',
        'Indicateur de version en bas à gauche avec vérification sans pop-up',
        'Correction du double-clic sur onglets pour créer un document unique'
      ],
      items: [
        {
          q: 'Pourquoi préférer Taleno à d’autres éditeurs ?',
          a: 'La plupart des éditeurs vous imposent un écran coupé en deux ou se révèlent lourds et lents. Taleno met en page directement vos mots à mesure que vous tapez, démarre instantanément et consomme très peu de ressources.'
        },
        {
          q: 'Puis-je ouvrir mes fichiers Markdown existants ?',
          a: 'Absolument ! Taleno lit et écrit des fichiers Markdown universels (.md). Vos notes créées dans Obsidian, Typora, Notion ou VS Code s’ouvrent sans aucune conversion ni verrouillage.'
        },
        {
          q: 'Mes écrits restent-ils privés ?',
          a: 'Oui, à 100 %. Tous vos fichiers restent sur votre disque dur. Aucun compte requis, aucune synchronisation imposée, et l’application fonctionne parfaitement hors connexion.'
        },
        {
          q: 'Puis-je personnaliser les thèmes ?',
          a: 'Oui ! Choisissez parmi des thèmes clairs et sombres intégrés ou téléchargez des styles renommés comme Dracula ou Nord en un clic dans les préférences.'
        },
        {
          q: 'Taleno est-il gratuit ?',
          a: 'Oui, Taleno est un logiciel libre et gratuit sous licence GNU AGPL-3.0, sans publicité, abonnement ni fonctionnalités bridées.'
        }
      ]
    },
    downloadPage: {
      title: 'Télécharger Taleno — Éditeur Markdown Rapide et Épuré',
      metaDesc: 'Téléchargez Taleno pour Windows, macOS et Linux. Léger, sécurisé, 100% hors ligne et sans écran séparé.',
      tag: 'v0.1.8 · Dernière version officielle',
      heading: 'Télécharger Taleno',
      subheading: 'Liens directs depuis GitHub Releases. Choisissez votre plateforme et commencez à écrire en quelques secondes.',
      backHome: '← Retour à l’accueil',
      note: 'Tous les téléchargements sont des paquets officiels. La recherche de mise à jour s’effectue en un clic directement depuis l’application.',
      allReleases: 'Voir toutes les versions et notes de publication',
      viewGh: 'Voir le projet sur GitHub'
    }
  },

  'es': {
    code: 'es',
    dir: 'es',
    name: 'Español',
    htmlLang: 'es',
    title: 'Taleno — Lector y Editor Markdown In-Place Rápido y Limpio',
    metaDesc: 'Taleno es un editor y lector Markdown local, gratuito y sin panel dividido. Formato directo mientras escribes, 100% privado y sin conexión, inicio instantáneo para Windows, macOS y Linux.',
    nav: { features: 'Características', download: 'Descargar', architecture: 'Rendimiento', shortcuts: 'Atajos', faq: 'Preguntas', github: 'GitHub' },
    selectLang: 'Seleccionar idioma',
    hero: {
      badge: 'v0.1.8 disponible · 100% Libre y Código Abierto',
      title: 'Markdown, natural y sencillo.',
      subtitle: 'Escribe directamente sobre el texto maquetado sin ventanas divididas. Taleno se abre al instante, mantiene todas tus notas seguras en tu ordenador y te ofrece un espacio despejado para pensar y crear.',
      downloadBtn: 'Descargar Taleno',
      githubBtn: 'Repositorio GitHub',
      chips: ['Abre al instante', 'Sin pantallas divididas', '100% Privado y Offline', 'Completamente gratis']
    },
    mockup: {
      menu: ['Archivo', 'Edición', 'Ver', 'Ventana', 'Ayuda'],
      title: 'Taleno — Escribir con total tranquilidad.md',
      outline: 'Esquema de notas',
      workspace: 'Espacio de trabajo',
      introTitle: '# Céntrate en tus palabras',
      introP1: 'Olvídate de los editores con dos ventanas donde escribes código a la izquierda y miras la vista previa a la derecha. En Taleno, lo que ves es lo que obtienes.',
      introP2: 'WYSIWYG en el lugar · Búsqueda global instantánea · Guardado seguro.',
      metrics: ['Inicio', '< 0,4 s', 'Listo al instante', 'Búsqueda', 'Instantánea', 'Toda la carpeta'],
      modes: ['Lectura', 'Escritura', 'Código'],
      status: 'Lín 1, Col 1  ·  1.420 palabras  ·  UTF-8  ·  Guardado'
    },
    features: {
      tag: 'DISEÑADO PARA ESCRIBIR',
      title: 'Todo lo que necesitas para redactar, sin distracciones',
      subtitle: 'Desde notas diarias y apuntes de estudio hasta artículos completos: Taleno te da un entorno tranquilo, fluido y confiable.',
      items: [
        { title: 'Tres modos de vista', desc: 'Alterna con un atajo: lectura relajada, escritura con formato instantáneo o código Markdown puro.' },
        { title: 'Extensiones con un clic', desc: 'Añade fácilmente metas de palabras, marcas de tiempo o cuadros de aviso desde la galería de plugins integrada.' },
        { title: 'Temas elegantes', desc: 'Cuida tu vista con temas claros y oscuros, o aplica estilos populares como Dracula, Nord y Catppuccin con previsualización en vivo.' },
        { title: 'En tu idioma', desc: 'Detecta automáticamente el idioma de tu sistema entre 9 lenguas disponibles, ajustable en cualquier momento.' },
        { title: 'Resaltado de código claro', desc: 'Colorea la sintaxis de más de 100 lenguajes de programación e incluye botón de copia rápida.' },
        { title: 'Diagramas y fórmulas matemáticas', desc: 'Genera diagramas de flujo con Mermaid y escribe fórmulas matemáticas con KaTeX en tiempo real.' },
        { title: 'Búsqueda veloz en todas tus notas', desc: 'Presiona Ctrl+Mayús+F para localizar cualquier palabra entre cientos de notas en cuestión de milisegundos.' },
        { title: 'Tus ideas siempre a salvo', desc: 'Protección continua en segundo plano y aviso de confirmación antes de cerrar documentos no guardados.' },
        { title: 'Arrastrar y soltar natural', desc: 'Arrastra archivos a la ventana para abrirlos, suéltalos en las pestañas o añade imágenes directamente en el texto.' },
        { title: 'Exportar a HTML independiente', desc: 'Pulsa Ctrl+E para convertir cualquier nota en una página web limpia y autónoma lista para compartir.' }
      ]
    },
    downloadSec: {
      tag: 'DESCARGA',
      title: 'Descarga gratuita, lista en segundos',
      subtitle: 'Detectamos automáticamente tu dispositivo para recomendarte el instalador idóneo para Windows, macOS o Linux.',
      recommended: 'RECOMENDADO PARA TU SISTEMA',
      winBtn: 'Descargar para Windows (.exe)',
      macBtn: 'Descargar para Apple Silicon (.dmg)',
      macIntelBtn: 'Mac con Intel (.dmg)',
      linuxBtn: 'Descargar AppImage',
      otherDownloads: 'Ver todos los instaladores en la página de descargas →'
    },
    arch: {
      tag: 'RENDIMIENTO',
      title: 'Diseñado para ser veloz y cuidar tu batería',
      subtitle: 'Al prescindir de navegadores pesados, Taleno ofrece respuesta inmediata al teclado, sin tirones y con un gasto de batería mínimo.',
      frontend: 'Interfaz fluida',
      frontendTitle: 'Ligereza moderna',
      frontendChips: ['Respuesta inmediata', 'Sin bloqueos', '9 idiomas', 'Temas instantáneos'],
      ipc: 'Conexión optimizada',
      ipcTitle: 'Enlace eficiente',
      ipcChips: ['Consumo mínimo de RAM', 'Inicio al instante', 'Entorno seguro'],
      rust: 'Núcleo robusto',
      rustTitle: 'Motor fiable',
      rustChips: ['Guardado anti-caídas', 'Búsqueda instantánea', 'Cero rastreo en la nube', 'Markdown puro']
    },
    shortcuts: {
      tag: 'ATAJOS DE TECLADO',
      title: 'Tus manos siempre en las teclas',
      subtitle: 'Aplica estilos, organiza notas y navega sin necesidad de recurrir al ratón.',
      doc: 'Documentos y archivos',
      edit: 'Texto y formato',
      nav: 'Navegación y búsqueda',
      items: [
        { group: 'doc', label: 'Nuevo documento', key: 'Ctrl+N' },
        { group: 'doc', label: 'Abrir archivo', key: 'Ctrl+O' },
        { group: 'doc', label: 'Guardar', key: 'Ctrl+S' },
        { group: 'doc', label: 'Guardar como...', key: 'Ctrl+Mayús+S' },
        { group: 'doc', label: 'Exportar a HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Negrita', key: 'Ctrl+B' },
        { group: 'edit', label: 'Cursiva', key: 'Ctrl+I' },
        { group: 'edit', label: 'Encabezados 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Párrafo normal', key: 'Ctrl+0' },
        { group: 'edit', label: 'Insertar enlace', key: 'Ctrl+K' },
        { group: 'nav', label: 'Selector rápido de archivo', key: 'Ctrl+P' },
        { group: 'nav', label: 'Buscar en la nota', key: 'Ctrl+F' },
        { group: 'nav', label: 'Reemplazar palabras', key: 'Ctrl+H' },
        { group: 'nav', label: 'Buscar en todas las notas', key: 'Ctrl+Mayús+F' },
        { group: 'nav', label: 'Cambiar modo de vista', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'PREGUNTAS FRECUENTES',
      title: 'Respuestas a tus dudas',
      subtitle: '¿Tienes preguntas o sugerencias? Te esperamos en GitHub para conversar.',
      changelogTitle: 'Novedades de la versión',
      changelogVer: 'v0.1.8',
      changelogItems: [
        'Aviso de confirmación al cerrar documentos sin guardar',
        'Botones de acceso rápido en la barra de título para plugins, temas e idiomas',
        'Insignia de versión abajo a la izquierda con comprobación de actualización directa',
        'Doble clic en la barra de pestañas crea exactamente un nuevo documento'
      ],
      items: [
        {
          q: '¿Qué hace diferente a Taleno frente a otros editores?',
          a: 'Muchas aplicaciones te obligan a trabajar con pantallas divididas o resultan pesadas y consumen mucha batería. Taleno da formato directamente en el texto mientras escribes, arranca en una fracción de segundo y consume poquísima memoria.'
        },
        {
          q: '¿Puedo abrir mis notas Markdown actuales?',
          a: '¡Sí, con total normalidad! Taleno utiliza archivos Markdown estándar (.md). Podrás abrir y guardar notas creadas en Obsidian, Typora, Notion o VS Code sin problemas.'
        },
        {
          q: '¿Están mis notas a salvo y privadas?',
          a: 'Totalmente. Tus archivos se guardan únicamente en tu ordenador. No requiere crear cuenta, no sube datos a la nube y funciona al 100% sin internet.'
        },
        {
          q: '¿Se pueden instalar temas y plugins?',
          a: '¡Sí! Puedes cambiar entre temas claros y oscuros o descargar aspectos populares como Dracula o Nord desde el menú de ajustes en un solo clic.'
        },
        {
          q: '¿Taleno es gratis?',
          a: 'Sí, Taleno es software libre y de código abierto (GNU AGPL-3.0), sin planes de pago, anuncios ni funciones bloqueadas.'
        }
      ]
    },
    downloadPage: {
      title: 'Descargar Taleno — Editor Markdown Rápido e In-Place',
      metaDesc: 'Descarga Taleno para Windows, macOS y Linux. Ligero, privado, sin ventanas divididas y listo en segundos.',
      tag: 'v0.1.8 · Última versión oficial',
      heading: 'Descargar Taleno',
      subheading: 'Descarga directa desde GitHub Releases. Selecciona tu sistema operativo y empieza a redactar en instantes.',
      backHome: '← Volver al inicio',
      note: 'Todos los enlaces corresponden a paquetes oficiales. Las nuevas versiones se pueden consultar con un clic desde el propio editor.',
      allReleases: 'Ver todas las versiones y cambios',
      viewGh: 'Ver repositorio en GitHub'
    }
  },

  'ru': {
    code: 'ru',
    dir: 'ru',
    name: 'Русский',
    htmlLang: 'ru',
    title: 'Taleno — Быстрый и лаконичный In-Place Markdown-редактор',
    metaDesc: 'Taleno — бесплатный легковесный Markdown-редактор без двойного экрана. Оформление сразу под курсором, 100% приватность офлайн, мгновенный запуск для Windows, macOS и Linux.',
    nav: { features: 'Возможности', download: 'Скачать', architecture: 'Скорость', shortcuts: 'Горячие клавиши', faq: 'Вопросы', github: 'GitHub' },
    selectLang: 'Выбрать язык',
    hero: {
      badge: 'v0.1.8 релиз · 100% Бесплатно и Open Source',
      title: 'Markdown, легко и естественно.',
      subtitle: 'Пишите сразу в красиво оформленном тексте без громоздких раздельных окон. Taleno открывается за доли секунды, надежно хранит все файлы на вашем компьютере и помогает сосредоточиться на творчестве.',
      downloadBtn: 'Скачать Taleno',
      githubBtn: 'Репозиторий GitHub',
      chips: ['Мгновенный старт', 'Без разделения экрана', '100% Офлайн и Приватно', 'Полностью бесплатно']
    },
    mockup: {
      menu: ['Файл', 'Правка', 'Вид', 'Окно', 'Справка'],
      title: 'Taleno — Пространство для спокойного письма.md',
      outline: 'Оглавление заметки',
      workspace: 'Папка заметок',
      introTitle: '# Сосредоточьтесь на мыслях, а не на коде',
      introP1: 'Забудьте о разделенных окнах, где слева пишется исходный код, а справа отображается предпросмотр. В Taleno форматирование происходит прямо под вашими пальцами.',
      introP2: 'WYSIWYG на месте · Мгновенный поиск по всем заметкам · Защита от потери данных.',
      metrics: ['Время запуска', 'Менее 0,4 с', 'Мгновенно готов', 'Поиск заметок', 'Моментально', 'По всей папке'],
      modes: ['Чтение', 'Письмо', 'Исходный код'],
      status: 'Стр 1, Кол 1  ·  1 420 слов  ·  UTF-8  ·  Сохранено'
    },
    features: {
      tag: 'СОЗДАН ДЛЯ ТЕХ, КТО ПИШЕТ',
      title: 'Всё необходимое для текста, ничего лишнего',
      subtitle: 'От быстрых ежедневных записей до объемных статей: Taleno создаёт спокойную, быструю и надёжную рабочую среду.',
      items: [
        { title: 'Три режима просмотра', desc: 'Переключайтесь в один клик: удобное чтение, живое оформление в процессе письма или чистый Markdown-код.' },
        { title: 'Плагины в один клик', desc: 'Легко подключайте цели по количеству слов, вставку времени или информационные блоки из встроенной галереи.' },
        { title: 'Приятные темы оформления', desc: 'Уютные светлые и тёмные темы, а также поддержка стилей Dracula, Nord и Catppuccin с мгновенным предпросмотром.' },
        { title: 'На вашем родном языке', desc: 'Автоматически определяет язык вашей системы среди 9 доступных с возможностью переключения в любой момент.' },
        { title: 'Четкая подсветка кода', desc: 'Подсветка синтаксиса для более чем 100 языков программирования с удобной кнопкой копирования.' },
        { title: 'Схемы и математические формулы', desc: 'Создавайте диаграммы Mermaid и вставляйте аккуратные формулы KaTeX прямо в тексте.' },
        { title: 'Мгновенный поиск по заметкам', desc: 'Нажмите Ctrl+Shift+F и найдите нужное слово среди сотен документов за доли секунды.' },
        { title: 'Надежная защита от потерь', desc: 'Фоновое сохранение и предупреждение при закрытии несохраненных документов сохранят каждое написанное слово.' },
        { title: 'Удобное перетаскивание файлов', desc: 'Перетаскивайте файлы в окно для чтения, на панель вкладок для открытия или вставляйте картинки прямо в текст.' },
        { title: 'Экспорт в аккуратный HTML', desc: 'Превращайте заметки в готовые самостоятельные веб-страницы нажатием одной комбинации (Ctrl+E).' }
      ]
    },
    downloadSec: {
      tag: 'СКАЧАТЬ',
      title: 'Бесплатная загрузка, готов за пару секунд',
      subtitle: 'Мы автоматически определим вашу систему и предложим оптимальный установочный файл для Windows, macOS или Linux.',
      recommended: 'РЕКОМЕНДУЕТСЯ ДЛЯ ВАШЕЙ СИСТЕМЫ',
      winBtn: 'Скачать для Windows (.exe)',
      macBtn: 'Скачать для Apple Silicon (.dmg)',
      macIntelBtn: 'Для Intel Mac (.dmg)',
      linuxBtn: 'Скачать AppImage',
      otherDownloads: 'Посмотреть все файлы на странице загрузок →'
    },
    arch: {
      tag: 'СКОРОСТЬ И НАДЕЖНОСТЬ',
      title: 'Создан для максимальной скорости и экономии батареи',
      subtitle: 'Taleno не обременен тяжелыми браузерными движками, обеспечивая моментальный отклик при вводе текста и минимальную нагрузку на ноутбук.',
      frontend: 'Плавный интерфейс',
      frontendTitle: 'Современная легкость',
      frontendChips: ['Без задержек при вводе', 'Плавная работа', '9 языков', 'Мгновенные темы'],
      ipc: 'Прямая связь',
      ipcTitle: 'Эффективная архитектура',
      ipcChips: ['Минимум оперативной памяти', 'Мгновенный старт', 'Безопасность'],
      rust: 'Надежное системное ядро',
      rustTitle: 'Мощный движок',
      rustChips: ['Защита от сбоев', 'Молниеносный поиск', 'Полная приватность', 'Чистый Markdown']
    },
    shortcuts: {
      tag: 'ГОРЯЧИЕ КЛАВИШИ',
      title: 'Держите руки на клавиатуре',
      subtitle: 'Форматируйте заголовки, находите нужные заметки и управляйте вкладками без мыши.',
      doc: 'Файлы и документы',
      edit: 'Текст и стили',
      nav: 'Навигация и поиск',
      items: [
        { group: 'doc', label: 'Новый документ', key: 'Ctrl+N' },
        { group: 'doc', label: 'Открыть файл', key: 'Ctrl+O' },
        { group: 'doc', label: 'Сохранить', key: 'Ctrl+S' },
        { group: 'doc', label: 'Сохранить как...', key: 'Ctrl+Shift+S' },
        { group: 'doc', label: 'Экспорт в HTML', key: 'Ctrl+E' },
        { group: 'edit', label: 'Полужирный', key: 'Ctrl+B' },
        { group: 'edit', label: 'Курсив', key: 'Ctrl+I' },
        { group: 'edit', label: 'Заголовки 1–6', key: 'Ctrl+1~6' },
        { group: 'edit', label: 'Обычный текст', key: 'Ctrl+0' },
        { group: 'edit', label: 'Вставить ссылку', key: 'Ctrl+K' },
        { group: 'nav', label: 'Быстрый переход к файлу', key: 'Ctrl+P' },
        { group: 'nav', label: 'Найти в заметке', key: 'Ctrl+F' },
        { group: 'nav', label: 'Заменить слова', key: 'Ctrl+H' },
        { group: 'nav', label: 'Поиск по всем заметкам', key: 'Ctrl+Shift+F' },
        { group: 'nav', label: 'Сменить режим просмотра', key: 'Ctrl+/' }
      ]
    },
    faq: {
      tag: 'ВОПРОСЫ И ОТВЕТЫ',
      title: 'Часто задаваемые вопросы',
      subtitle: 'Есть вопросы или предложения? Ждем вас в нашем сообществе на GitHub.',
      changelogTitle: 'Что нового в этой версии',
      changelogVer: 'v0.1.8',
      changelogItems: [
        'Диалог подтверждения при закрытии несохраненных заметок',
        'Кнопки быстрого доступа к плагинам, темам и языкам в заголовке',
        'Индикатор версии в левом нижнем углу со встроенной проверкой обновлений',
        'Двойной клик по панели вкладок надежно создает один новый документ'
      ],
      items: [
        {
          q: 'Чем Taleno отличается от других Markdown-редакторов?',
          a: 'Многие редакторы делят экран на две половины или работают медленно, сильно расходуя память. Taleno форматирует текст прямо на месте в процессе набора, открывается за мгновение и практически не нагружает систему.'
        },
        {
          q: 'Смогу ли я открыть свои старые Markdown-заметки?',
          a: 'Да, на 100%! Taleno работает со стандартными файлами .md. Все заметки, написанные в Obsidian, Typora, Notion или VS Code, открываются и сохраняются без каких-либо проблем.'
        },
        {
          q: 'Остаются ли мои заметки конфиденциальными?',
          a: 'Абсолютно. Все документы хранятся исключительно на вашем жестком диске. Регистрация не требуется, данные в облако не отправляются, программа прекрасно работает без интернета.'
        },
        {
          q: 'Можно ли менять темы и ставить плагины?',
          a: 'Да! В настройках можно выбрать светлую или темную тему, а также в один клик установить популярные варианты вроде Dracula или Nord.'
        },
        {
          q: 'Taleno действительно бесплатный?',
          a: 'Да, Taleno — полностью бесплатный проект с открытым исходным кодом (GNU AGPL-3.0). Здесь нет рекламы, подписок или скрытых ограничений.'
        }
      ]
    },
    downloadPage: {
      title: 'Скачать Taleno — Быстрый и удобный Markdown-редактор',
      metaDesc: 'Скачайте Taleno для Windows, macOS и Linux. Легковесный, без разделения экрана, 100% офлайн и с мгновенным стартом.',
      tag: 'v0.1.8 · Последний официальный релиз',
      heading: 'Скачать Taleno',
      subheading: 'Прямые ссылки из официальных релизов GitHub. Выберите вашу платформу и начните писать с комфортом.',
      backHome: '← Вернуться на главную',
      note: 'Все файлы — официальные сборки. Проверить наличие новых версий можно прямо внутри приложения одним кликом.',
      allReleases: 'Все релизы и история изменений',
      viewGh: 'Страница проекта на GitHub'
    }
  }
};

const gatekeeperGuidance = {
  en: {
    link: 'Blocked by macOS Gatekeeper? Follow these steps →',
    tag: 'MACOS HELP',
    title: 'Opening Taleno when macOS blocks it',
    intro: 'Current macOS builds are not code-signed or notarized, so Gatekeeper may say that Apple cannot verify the developer or check the app for malicious software.',
    sourceWarning: 'Only continue if you downloaded Taleno from the official GitHub Releases page and trust the file.',
    steps: [
      'Move <strong>Taleno.app</strong> to <strong>Applications</strong>, then try to open it once.',
      'Open <strong>Apple menu → System Settings → Privacy &amp; Security</strong>.',
      'Scroll to <strong>Security</strong> and click <strong>Open Anyway</strong>. The option remains available for about one hour after the blocked attempt.',
      'Authenticate when prompted, then click <strong>Open</strong>. Future launches will work normally.'
    ],
    fallback: 'If Open Anyway does not appear and you trust the download, remove the quarantine attribute from Taleno only in Terminal:',
    safety: 'Do not disable Gatekeeper system-wide.',
    appleLink: 'Read Apple’s guidance for opening an app from an unknown developer →'
  },
  'zh-CN': {
    link: '被 macOS Gatekeeper 阻止？查看解决步骤 →', tag: 'MACOS 帮助', title: 'macOS 阻止 Taleno 时如何打开',
    intro: '目前的 macOS 版本尚未进行代码签名或公证，因此 Gatekeeper 可能提示无法验证开发者或无法检查恶意软件。',
    sourceWarning: '请仅在从官方 GitHub Releases 页面下载且确认信任该文件时继续。',
    steps: ['将 <strong>Taleno.app</strong> 移到<strong>应用程序</strong>文件夹，然后尝试打开一次。', '打开<strong>苹果菜单 → 系统设置 → 隐私与安全性</strong>。', '滚动到<strong>安全性</strong>，点击<strong>仍要打开</strong>。此选项会在被阻止后保留约一小时。', '按提示完成验证，然后点击<strong>打开</strong>。以后即可正常启动。'],
    fallback: '如果未显示“仍要打开”且你信任该下载，请在终端中仅移除 Taleno 的隔离属性：', safety: '请勿在系统范围内禁用 Gatekeeper。', appleLink: '查看 Apple 关于打开未知开发者应用的说明 →'
  },
  'zh-TW': {
    link: '遭 macOS Gatekeeper 阻擋？查看解決步驟 →', tag: 'MACOS 說明', title: 'macOS 阻擋 Taleno 時如何開啟',
    intro: '目前的 macOS 版本尚未進行程式碼簽署或公證，因此 Gatekeeper 可能提示無法驗證開發者或檢查惡意軟體。',
    sourceWarning: '請只在從官方 GitHub Releases 頁面下載且信任該檔案時繼續。',
    steps: ['將 <strong>Taleno.app</strong> 移到<strong>應用程式</strong>資料夾，然後嘗試開啟一次。', '開啟<strong>蘋果選單 → 系統設定 → 隱私權與安全性</strong>。', '捲動到<strong>安全性</strong>，按一下<strong>強制打開</strong>。此選項會在遭阻擋後保留約一小時。', '依提示完成驗證，然後按一下<strong>開啟</strong>。之後即可正常啟動。'],
    fallback: '如果未顯示「強制打開」且你信任該下載，請在終端機中只移除 Taleno 的隔離屬性：', safety: '請勿在整個系統停用 Gatekeeper。', appleLink: '查看 Apple 關於開啟未知開發者 App 的說明 →'
  },
  ja: {
    link: 'macOS Gatekeeper にブロックされましたか？手順を見る →', tag: 'MACOS ヘルプ', title: 'macOS に Taleno がブロックされた場合',
    intro: '現在の macOS ビルドはコード署名および公証がされていないため、Gatekeeper が開発元や悪意のあるソフトウェアの有無を確認できない場合があります。',
    sourceWarning: '公式 GitHub Releases ページからダウンロードし、そのファイルを信頼できる場合にのみ続行してください。',
    steps: ['<strong>Taleno.app</strong> を<strong>アプリケーション</strong>フォルダに移動し、一度開いてみます。', '<strong>Apple メニュー → システム設定 → プライバシーとセキュリティ</strong>を開きます。', '<strong>セキュリティ</strong>までスクロールし、<strong>このまま開く</strong>をクリックします。この項目はブロック後約1時間表示されます。', '求められたら認証し、<strong>開く</strong>をクリックします。次回からは通常どおり起動できます。'],
    fallback: '「このまま開く」が表示されず、ダウンロードを信頼できる場合は、ターミナルで Taleno の隔離属性だけを削除します：', safety: 'Gatekeeper をシステム全体で無効にしないでください。', appleLink: '不明な開発元のアプリを開く方法（Apple）→'
  },
  ko: {
    link: 'macOS Gatekeeper가 차단하나요? 해결 방법 보기 →', tag: 'MACOS 도움말', title: 'macOS에서 Taleno가 차단될 때 여는 방법',
    intro: '현재 macOS 빌드는 코드 서명 및 공증이 되어 있지 않아 Gatekeeper가 개발자 또는 악성 소프트웨어 여부를 확인할 수 없다고 표시할 수 있습니다.',
    sourceWarning: '공식 GitHub Releases 페이지에서 다운로드했고 파일을 신뢰하는 경우에만 계속하세요.',
    steps: ['<strong>Taleno.app</strong>을 <strong>응용 프로그램</strong> 폴더로 옮긴 뒤 한 번 실행해 보세요.', '<strong>Apple 메뉴 → 시스템 설정 → 개인정보 보호 및 보안</strong>을 여세요.', '<strong>보안</strong>으로 스크롤하여 <strong>확인 없이 열기</strong>를 클릭하세요. 이 옵션은 차단 시도 후 약 한 시간 동안 표시됩니다.', '요청 시 인증하고 <strong>열기</strong>를 클릭하세요. 이후에는 정상적으로 실행됩니다.'],
    fallback: '옵션이 표시되지 않고 다운로드를 신뢰한다면 터미널에서 Taleno에 대해서만 격리 속성을 제거하세요:', safety: 'Gatekeeper를 시스템 전체에서 비활성화하지 마세요.', appleLink: '확인되지 않은 개발자의 앱 열기에 관한 Apple 안내 →'
  },
  de: {
    link: 'Von macOS Gatekeeper blockiert? Anleitung ansehen →', tag: 'MACOS-HILFE', title: 'Taleno trotz macOS-Blockierung öffnen',
    intro: 'Die aktuellen macOS-Builds sind nicht codesigniert oder notarisiert. Gatekeeper kann daher melden, dass der Entwickler oder die App nicht überprüft werden kann.',
    sourceWarning: 'Fahre nur fort, wenn du Taleno von der offiziellen GitHub-Releases-Seite geladen hast und der Datei vertraust.',
    steps: ['Verschiebe <strong>Taleno.app</strong> nach <strong>Programme</strong> und versuche einmal, die App zu öffnen.', 'Öffne <strong>Apple-Menü → Systemeinstellungen → Datenschutz &amp; Sicherheit</strong>.', 'Scrolle zu <strong>Sicherheit</strong> und klicke auf <strong>Dennoch öffnen</strong>. Die Option ist nach dem blockierten Versuch etwa eine Stunde verfügbar.', 'Authentifiziere dich und klicke auf <strong>Öffnen</strong>. Künftige Starts funktionieren normal.'],
    fallback: 'Wenn die Option nicht erscheint und du dem Download vertraust, entferne im Terminal nur das Quarantäneattribut von Taleno:', safety: 'Deaktiviere Gatekeeper nicht systemweit.', appleLink: 'Apples Anleitung zum Öffnen von Apps unbekannter Entwickler →'
  },
  fr: {
    link: 'Bloqué par Gatekeeper sur macOS ? Voir la procédure →', tag: 'AIDE MACOS', title: 'Ouvrir Taleno lorsque macOS le bloque',
    intro: 'Les versions macOS actuelles ne sont ni signées ni notariées. Gatekeeper peut donc indiquer qu’Apple ne peut pas vérifier le développeur ou l’absence de logiciels malveillants.',
    sourceWarning: 'Continuez uniquement si vous avez téléchargé Taleno depuis la page GitHub Releases officielle et si vous faites confiance au fichier.',
    steps: ['Déplacez <strong>Taleno.app</strong> dans <strong>Applications</strong>, puis essayez de l’ouvrir une fois.', 'Ouvrez <strong>menu Pomme → Réglages Système → Confidentialité et sécurité</strong>.', 'Faites défiler jusqu’à <strong>Sécurité</strong>, puis cliquez sur <strong>Ouvrir quand même</strong>. Cette option reste disponible environ une heure après le blocage.', 'Authentifiez-vous, puis cliquez sur <strong>Ouvrir</strong>. Les prochains lancements fonctionneront normalement.'],
    fallback: 'Si l’option n’apparaît pas et que vous faites confiance au téléchargement, supprimez uniquement l’attribut de quarantaine de Taleno dans Terminal :', safety: 'Ne désactivez pas Gatekeeper pour tout le système.', appleLink: 'Consulter les instructions d’Apple pour ouvrir une app d’un développeur inconnu →'
  },
  es: {
    link: '¿Gatekeeper de macOS bloque la app? Ver instrucciones →', tag: 'AYUDA PARA MACOS', title: 'Cómo abrir Taleno si macOS lo bloquea',
    intro: 'Las versiones actuales para macOS no están firmadas ni notarizadas, por lo que Gatekeeper puede indicar que Apple no puede verificar al desarrollador o comprobar si hay software malicioso.',
    sourceWarning: 'Continúa solo si descargaste Taleno desde la página oficial de GitHub Releases y confías en el archivo.',
    steps: ['Mueve <strong>Taleno.app</strong> a <strong>Aplicaciones</strong> e intenta abrirla una vez.', 'Abre <strong>menú Apple → Ajustes del Sistema → Privacidad y seguridad</strong>.', 'Desplázate hasta <strong>Seguridad</strong> y pulsa <strong>Abrir igualmente</strong>. La opción permanece disponible aproximadamente una hora después del bloqueo.', 'Autentícate y pulsa <strong>Abrir</strong>. Los próximos inicios funcionarán con normalidad.'],
    fallback: 'Si la opción no aparece y confías en la descarga, elimina solo el atributo de cuarentena de Taleno desde Terminal:', safety: 'No desactives Gatekeeper en todo el sistema.', appleLink: 'Consulta la guía de Apple para abrir apps de desarrolladores desconocidos →'
  },
  ru: {
    link: 'macOS Gatekeeper блокирует приложение? Открыть инструкцию →', tag: 'ПОМОЩЬ ДЛЯ MACOS', title: 'Как открыть Taleno, если macOS его блокирует',
    intro: 'Текущие сборки для macOS не подписаны и не нотарифицированы, поэтому Gatekeeper может сообщить, что Apple не может проверить разработчика или приложение на наличие вредоносного ПО.',
    sourceWarning: 'Продолжайте, только если загрузили Taleno с официальной страницы GitHub Releases и доверяете файлу.',
    steps: ['Переместите <strong>Taleno.app</strong> в папку <strong>Программы</strong> и один раз попробуйте открыть приложение.', 'Откройте <strong>меню Apple → Системные настройки → Конфиденциальность и безопасность</strong>.', 'Прокрутите до раздела <strong>Безопасность</strong> и нажмите <strong>Всё равно открыть</strong>. Кнопка доступна около часа после блокировки.', 'Подтвердите действие и нажмите <strong>Открыть</strong>. В дальнейшем приложение будет запускаться как обычно.'],
    fallback: 'Если кнопка не появилась и вы доверяете загрузке, удалите в Терминале атрибут карантина только у Taleno:', safety: 'Не отключайте Gatekeeper для всей системы.', appleLink: 'Инструкция Apple по открытию приложений неизвестных разработчиков →'
  }
};


function renderHreflangTags(isDownload = false) {
  const file = isDownload ? 'download.html' : '';
  const hreflangMap = {
    'x-default': 'https://berryuiki.github.io/Taleno/' + file,
    'en': 'https://berryuiki.github.io/Taleno/' + file,
    'zh-Hans': 'https://berryuiki.github.io/Taleno/zh-CN/' + file,
    'zh-Hant': 'https://berryuiki.github.io/Taleno/zh-TW/' + file,
    'ja': 'https://berryuiki.github.io/Taleno/ja/' + file,
    'ko': 'https://berryuiki.github.io/Taleno/ko/' + file,
    'de': 'https://berryuiki.github.io/Taleno/de/' + file,
    'fr': 'https://berryuiki.github.io/Taleno/fr/' + file,
    'es': 'https://berryuiki.github.io/Taleno/es/' + file,
    'ru': 'https://berryuiki.github.io/Taleno/ru/' + file
  };
  return Object.entries(hreflangMap)
    .map(([hlang, url]) => `  <link rel="alternate" hreflang="${hlang}" href="${url}" />`)
    .join('\n');
}

function renderCanonicalTag(lang, isDownload = false) {
  const isRoot = lang.code === 'en';
  const path = isRoot
    ? (isDownload ? 'download.html' : '')
    : (isDownload ? `${lang.dir}/download.html` : `${lang.dir}/`);
  const url = `https://berryuiki.github.io/Taleno/${path}`;
  return `  <link rel="canonical" href="${url}" />`;
}

function renderJsonLd(lang, isDownload = false) {
  const isRoot = lang.code === 'en';
  const pageUrl = isRoot
    ? (isDownload ? 'https://berryuiki.github.io/Taleno/download.html' : 'https://berryuiki.github.io/Taleno/')
    : (isDownload ? `https://berryuiki.github.io/Taleno/${lang.dir}/download.html` : `https://berryuiki.github.io/Taleno/${lang.dir}/`);

  const faqList = (lang.faq && lang.faq.items) ? lang.faq.items.map(it => ({
    "@type": "Question",
    "name": it.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": it.a
    }
  })) : [];

  const graph = [
    {
      "@type": "SoftwareApplication",
      "@id": "https://berryuiki.github.io/Taleno/#software",
      "name": "Taleno",
      "alternateName": "Taleno Markdown Editor",
      "description": lang.metaDesc,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Windows 10+, macOS 11+, Linux (Ubuntu, Debian, Fedora, Arch)",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "softwareVersion": "0.1.8",
      "license": "https://www.gnu.org/licenses/agpl-3.0.html",
      "url": "https://berryuiki.github.io/Taleno/",
      "downloadUrl": "https://berryuiki.github.io/Taleno/download.html",
      "image": "https://berryuiki.github.io/Taleno/app-icon.svg",
      "screenshot": "https://berryuiki.github.io/Taleno/og-preview.png",
      "author": {
        "@type": "Organization",
        "name": "BerryUIKI",
        "url": "https://github.com/BerryUIKI"
      },
      "featureList": lang.features ? lang.features.items.map(i => i.title) : [
        "In-Place WYSIWYG Editing",
        "Plugin Marketplace",
        "Community Themes",
        "Ripgrep Offline Search",
        "Atomic Crash-Safe Saving"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://berryuiki.github.io/Taleno/#website",
      "url": pageUrl,
      "name": "Taleno",
      "inLanguage": lang.htmlLang
    }
  ];

  if (!isDownload && faqList.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": faqList
    });
  }

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  }, null, 2);

  return `  <script type="application/ld+json">\n${json}\n  </script>`;
}

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
  const gatekeeper = gatekeeperGuidance[lang.code] || gatekeeperGuidance.en;

  return `<!DOCTYPE html>
<html lang="${lang.htmlLang}" class="h-full">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lang.title}</title>
  <meta name="description" content="${lang.metaDesc}" />
  <meta name="keywords" content="Taleno, Markdown editor, WYSIWYG Markdown, in-place Markdown, Typora alternative, Obsidian alternative, Tauri Markdown app, local-first editor, GFM reader" />
  <meta name="author" content="BerryUIKI" />
${renderCanonicalTag(lang, false)}
${renderHreflangTags(false)}
  
  <!-- Open Graph / Twitter Cards -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Taleno" />
  <meta property="og:url" content="${isRoot ? 'https://berryuiki.github.io/Taleno/' : `https://berryuiki.github.io/Taleno/${lang.dir}/`}" />
  <meta property="og:title" content="${lang.title}" />
  <meta property="og:description" content="${lang.metaDesc}" />
  <meta property="og:image" content="https://berryuiki.github.io/Taleno/og-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${lang.title}" />
  <meta name="twitter:description" content="${lang.metaDesc}" />
  <meta name="twitter:image" content="https://berryuiki.github.io/Taleno/og-preview.png" />

  <link rel="icon" type="image/svg+xml" href="${iconPath}" />
${renderJsonLd(lang, false)}
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
      <span class="font-display text-[18px] font-bold text-ink">Taleno</span>
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
      <a href="https://github.com/BerryUIKI/Taleno" target="_blank" rel="noopener" class="hidden sm:flex items-center px-[10px] py-[7px] rounded-[8px] border border-border text-ink-secondary hover:text-ink transition-colors" aria-label="GitHub">
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
      <div data-version-tag class="flex items-center gap-[8px] px-[14px] py-[7px] rounded-full bg-bg-subtle border border-border text-[13px] text-ink-secondary">
        <span class="w-[6px] h-[6px] rounded-full bg-[#34C759]"></span>
        ${lang.hero.badge}
      </div>
      <h1 class="font-display text-[52px] sm:text-[64px] font-bold leading-[1.1] tracking-[-1.5px] text-ink text-center max-[768px]:text-[38px]"><span class="block text-[20px] sm:text-[26px] font-semibold text-accent tracking-normal mb-2">Taleno — In-Place WYSIWYG</span>${lang.hero.title}</h1>
      <p class="max-w-[720px] text-center text-[18px] leading-[30px] text-ink-secondary">
        ${lang.hero.subtitle}
      </p>
      <div class="flex items-center gap-[12px]">
        <a href="#download" class="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-ink text-white text-[16px] font-semibold hover:opacity-85 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${lang.hero.downloadBtn}
        </a>
        <a href="https://github.com/BerryUIKI/Taleno" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-bg border border-border text-[16px] font-semibold text-ink hover:bg-bg-subtle transition-colors">
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
      <div class="grid grid-cols-5 gap-[16px] w-full max-[1280px]:grid-cols-3 max-[860px]:grid-cols-2 max-[640px]:grid-cols-1">
        ${lang.features.items.map((item, i) => {
          const icons = [
            '<path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0D0D0F" stroke-width="1.8" stroke-linejoin="round"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path d="M9 3v4m6-4v4M5 7h14a2 2 0 0 1 2 2v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V9a2 2 0 0 1 2-2z" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11v4m-2-2h4" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round"/>',
            '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="#0D0D0F" stroke-width="1.8"/><circle cx="7.5" cy="10.5" r="1.5" fill="#0D0D0F"/><circle cx="12" cy="7.5" r="1.5" fill="#0D0D0F"/><circle cx="16.5" cy="10.5" r="1.5" fill="#0D0D0F"/><circle cx="9" cy="15.5" r="1.5" fill="#0D0D0F"/>',
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
        <div id="os-win" class="os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[16px] transition-all">
          <span class="os-badge hidden w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5L10.5 4.3v7.2H3zM10.5 11.5v7.2L3 17.5v-6zM11.5 4.1L21 2.8v8.7h-9.5zM21 11.5v8.7l-9.5-1.3v-7.4z" fill="#0D0D0F"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">Windows</h3><p class="os-detected text-[12px] text-ink-tertiary">Windows x86_64</p></div>
          </div>
          <a id="win-btn" href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Windows_x86_64.exe" class="os-btn flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-ink text-white text-[15px] font-semibold hover:opacity-90 transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.winBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <span>MSI:</span>
            <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Windows_x86_64.msi" class="text-accent hover:underline font-mono text-[11px]">Taleno_Windows_x86_64.msi</a>
          </div>
        </div>
        <!-- macOS card -->
        <div id="os-macos" class="os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[16px]">
          <span class="os-badge hidden w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.6zM14.6 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" fill="#0D0D0F"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">macOS</h3><p class="os-detected text-[12px] text-ink-tertiary">Apple Silicon / Intel</p></div>
          </div>
          <a id="mac-btn" href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_macOS_aarch64.dmg" class="os-btn flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-ink text-white text-[15px] font-semibold hover:opacity-85 transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.macBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <span>Intel Mac:</span>
            <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_macOS_x86_64.dmg" class="text-accent hover:underline font-mono text-[11px]">Taleno_macOS_x86_64.dmg</a>
          </div>
          <a href="${dlPagePath}#macos-gatekeeper" class="text-[12px] leading-[18px] text-accent hover:underline">${gatekeeper.link}</a>
        </div>
        <!-- Linux card -->
        <div id="os-linux" class="os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[16px]">
          <span class="os-badge hidden w-fit px-[10px] py-[4px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          <div class="flex items-center gap-[14px]">
            <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0D0D0F" stroke-width="1.8"/><path d="M7 9l3 3-3 3M13 15h4" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div><h3 class="font-display text-[20px] font-semibold text-ink">Linux</h3><p class="os-detected text-[12px] text-ink-tertiary">x86_64</p></div>
          </div>
          <a id="linux-btn" href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.AppImage" class="os-btn flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] bg-ink text-white text-[15px] font-semibold hover:opacity-85 transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${lang.downloadSec.linuxBtn}
          </a>
          <div class="flex items-center justify-between text-[12px] text-ink-tertiary pt-1">
            <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.deb" class="text-accent hover:underline">Debian (.deb)</a>
            <span>·</span>
            <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.rpm" class="text-accent hover:underline">Fedora (.rpm)</a>
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
            <span data-version-tag class="px-[8px] py-[3px] rounded-full bg-bg-tag text-[12px] text-accent font-semibold">${lang.faq.changelogVer}</span>
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
          <span class="font-display text-[20px] font-bold text-white">Taleno</span>
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
        <a href="https://github.com/BerryUIKI/Taleno" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">GitHub Repository</a>
        <a href="https://github.com/BerryUIKI/Taleno-Plugins" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Taleno-Plugins Hub</a>
        <a href="https://github.com/BerryUIKI/Taleno/tree/main/docs" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Documentation</a>
        <a href="https://github.com/BerryUIKI/Taleno/releases" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Releases</a>
        <a href="https://github.com/BerryUIKI/Taleno/blob/main/AGENTS.md" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">AGENTS.md</a>
      </div>
      <div class="flex-1 flex flex-col gap-[12px]">
        <h4 class="text-[14px] font-semibold text-white">Open Source</h4>
        <a href="https://github.com/BerryUIKI/Taleno/blob/main/LICENSE" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">AGPL-3.0 License</a>
        <a href="https://github.com/BerryUIKI/Taleno/blob/main/docs/CONTRIBUTING.md" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Contributing Guide</a>
        <a href="https://github.com/BerryUIKI/Taleno/issues" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Open an Issue</a>
        <a href="https://github.com/BerryUIKI/Taleno/security" target="_blank" rel="noopener" class="text-[13px] text-white/60 hover:text-white transition-colors">Security</a>
      </div>
    </div>
    <div class="h-px w-full bg-white/[0.12]"></div>
    <div class="flex items-center justify-between text-[12px] max-[768px]:flex-col max-[768px]:gap-[8px]">
      <span class="text-white/50">Copyright © 2026 Taleno Contributors · Licensed under AGPL-3.0</span>
      <span class="text-white/40">Built with Tauri 2 · Rust · SolidJS</span>
    </div>
  </footer>

  <script>
    function setLang(lang) {
      localStorage.setItem('taleno_user_lang', lang);
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
      const savedLang = localStorage.getItem('taleno_user_lang');
      if (savedLang) {
        // If user explicitly picked English, stay on root
        if (savedLang !== 'en' && !sessionStorage.getItem('taleno_navigated')) {
          sessionStorage.setItem('taleno_navigated', '1');
          window.location.replace('./' + savedLang + '/');
        }
        return;
      }

      // First visit: inspect browser/system language preferences
      if (sessionStorage.getItem('taleno_navigated')) return;

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
        sessionStorage.setItem('taleno_navigated', '1');
        window.location.replace('./' + detected + '/');
      }
    })();` : ''}

    // Dynamic Auto-Update Version Number from GitHub Releases
    (function autoUpdateVersion() {
      const cached = sessionStorage.getItem('taleno_latest_release');
      if (cached) applyVersion(cached);

      fetch('https://api.github.com/repos/BerryUIKI/Taleno/releases/latest')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(data => {
          if (data && data.tag_name) {
            sessionStorage.setItem('taleno_latest_release', data.tag_name);
            applyVersion(data.tag_name);
          }
        })
        .catch(() => {});

      function applyVersion(tag) {
        const clean = tag.replace(/^v/, '');
        document.querySelectorAll('[data-version-tag]').forEach(el => {
          el.textContent = el.textContent.replace(/(?:\\$\\{LATEST_VERSION_TAG\\}|v?\\d+\\.\\d+\\.\\d+)/g, tag);
        });
      }
    })();

    // Multi-signal OS detection & dynamic card highlighting
    function detectAndHighlightOS() {
      const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
      const ua = (navigator.userAgent || '').toLowerCase();
      let os = 'win';

      if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os') || ua.includes('darwin')) {
        os = 'macos';
      } else if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
        os = 'linux';
      } else if (platform.includes('win') || ua.includes('windows')) {
        os = 'win';
      }

      // Reset all cards to neutral
      document.querySelectorAll('.os-card').forEach(c => {
        c.classList.remove('border-2', 'border-accent', 'shadow-md', 'scale-[1.01]');
        c.classList.add('border', 'border-border');
        const badge = c.querySelector('.os-badge');
        if (badge) badge.classList.add('hidden');
        const btn = c.querySelector('.os-btn');
        if (btn) {
          btn.classList.remove('bg-accent');
          btn.classList.add('bg-ink');
        }
      });

      // Highlight the recommended OS card
      const targetCard = document.getElementById('os-' + os);
      if (targetCard) {
        targetCard.classList.remove('border', 'border-border');
        targetCard.classList.add('border-2', 'border-accent', 'shadow-md', 'scale-[1.01]');
        const badge = targetCard.querySelector('.os-badge');
        if (badge) badge.classList.remove('hidden');
        const btn = targetCard.querySelector('.os-btn');
        if (btn) {
          btn.classList.remove('bg-ink');
          btn.classList.add('bg-accent');
        }
      }
    }

    detectAndHighlightOS();
    document.addEventListener('DOMContentLoaded', detectAndHighlightOS);
  </script>
</body>
</html>`;
}

function buildDownload(lang) {
  const isRoot = lang.code === 'en';
  const iconPath = isRoot ? 'app-icon.svg' : '../app-icon.svg';
  const homePath = isRoot ? 'index.html' : 'index.html';
  const langOptionsHtml = renderLangDownloadOptions(lang.code, isRoot);
  const gatekeeper = gatekeeperGuidance[lang.code] || gatekeeperGuidance.en;

  return `<!DOCTYPE html>
<html lang="${lang.htmlLang}" class="h-full">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lang.downloadPage.title}</title>
  <meta name="description" content="${lang.downloadPage.metaDesc}" />
  <meta name="keywords" content="Download Taleno, Markdown editor download, Windows Markdown app, macOS Markdown, Linux AppImage Markdown, deb, rpm" />
  <meta name="author" content="BerryUIKI" />
${renderCanonicalTag(lang, true)}
${renderHreflangTags(true)}

  <!-- Open Graph / Twitter Cards -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Taleno" />
  <meta property="og:url" content="${isRoot ? 'https://berryuiki.github.io/Taleno/download.html' : `https://berryuiki.github.io/Taleno/${lang.dir}/download.html`}" />
  <meta property="og:title" content="${lang.downloadPage.title}" />
  <meta property="og:description" content="${lang.downloadPage.metaDesc}" />
  <meta property="og:image" content="https://berryuiki.github.io/Taleno/og-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${lang.downloadPage.title}" />
  <meta name="twitter:description" content="${lang.downloadPage.metaDesc}" />
  <meta name="twitter:image" content="https://berryuiki.github.io/Taleno/og-preview.png" />

  <link rel="icon" type="image/svg+xml" href="${iconPath}" />
${renderJsonLd(lang, true)}
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
      <span class="font-display text-[18px] font-bold text-ink">Taleno</span>
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
      <div data-version-tag class="flex items-center gap-[8px] px-[14px] py-[7px] rounded-full bg-bg-subtle border border-border text-[13px] text-ink-secondary">
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
        <div id="dl-os-win" class="dl-os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px] transition-all">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[14px]">
              <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5L10.5 4.3v7.2H3zM10.5 11.5v7.2L3 17.5v-6zM11.5 4.1L21 2.8v8.7h-9.5zM21 11.5v8.7l-9.5-1.3v-7.4z" fill="#0D0D0F"/></svg></div>
              <div><h2 class="font-display text-[20px] font-semibold text-ink">Windows</h2><p class="text-[12px] text-ink-tertiary">x86_64</p></div>
            </div>
            <span class="dl-os-badge hidden px-[10px] py-[3px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          </div>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Windows_x86_64.exe" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Setup (.exe)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_Windows_x86_64.exe</span>
          </a>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Windows_x86_64.msi" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">MSI (.msi)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_Windows_x86_64.msi</span>
          </a>
        </div>
        <!-- macOS -->
        <div id="dl-os-macos" class="dl-os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px] transition-all">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[14px]">
              <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.6zM14.6 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" fill="#0D0D0F"/></svg></div>
              <div><h2 class="font-display text-[20px] font-semibold text-ink">macOS</h2><p class="text-[12px] text-ink-tertiary">Apple Silicon / Intel</p></div>
            </div>
            <span class="dl-os-badge hidden px-[10px] py-[3px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          </div>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_macOS_aarch64.dmg" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Apple Silicon (DMG)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_macOS_aarch64.dmg</span>
          </a>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_macOS_x86_64.dmg" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Intel (DMG)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_macOS_x86_64.dmg</span>
          </a>
          <a href="#macos-gatekeeper" class="text-[12px] leading-[18px] text-accent hover:underline">${gatekeeper.link}</a>
        </div>
        <!-- Linux -->
        <div id="dl-os-linux" class="dl-os-card bg-bg border border-border rounded-[12px] p-[28px] flex flex-col gap-[14px] transition-all">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[14px]">
              <div class="w-[44px] h-[44px] rounded-[10px] bg-bg-soft flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0D0D0F" stroke-width="1.8"/><path d="M7 9l3 3-3 3M13 15h4" stroke="#0D0D0F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <div><h2 class="font-display text-[20px] font-semibold text-ink">Linux</h2><p class="text-[12px] text-ink-tertiary">x86_64</p></div>
            </div>
            <span class="dl-os-badge hidden px-[10px] py-[3px] rounded-full bg-accent text-white text-[11px] font-semibold tracking-[1px]">${lang.downloadSec.recommended}</span>
          </div>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.AppImage" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">AppImage</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_Linux_x86_64.AppImage</span>
          </a>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.deb" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Debian / Ubuntu (.deb)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_Linux_x86_64.deb</span>
          </a>
          <a href="https://github.com/BerryUIKI/Taleno/releases/latest/download/Taleno_Linux_x86_64.rpm" class="flex items-center justify-between px-[14px] py-[11px] rounded-[8px] bg-bg-soft border border-border hover:border-accent hover:bg-bg-tag transition-colors">
            <span class="text-[13px] font-medium text-ink">Fedora / RHEL (.rpm)</span><span class="text-[10px] text-ink-tertiary font-mono">Taleno_Linux_x86_64.rpm</span>
          </a>
        </div>
      </div>

      <p class="text-[12px] leading-[20px] text-ink-tertiary text-center max-w-[720px] pt-[8px]">
        ${lang.downloadPage.note}
      </p>

      <div class="flex items-center gap-[16px] pt-[16px]">
        <a href="https://github.com/BerryUIKI/Taleno/releases" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[8px] border border-border bg-bg text-[14px] font-medium text-ink hover:bg-bg-subtle transition-colors">${lang.downloadPage.allReleases}</a>
        <a href="https://github.com/BerryUIKI/Taleno" target="_blank" rel="noopener" class="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[8px] bg-ink text-white text-[14px] font-medium hover:opacity-85 transition-opacity">${lang.downloadPage.viewGh}</a>
      </div>
    </section>

    <section id="macos-gatekeeper" class="scroll-mt-[24px] bg-bg-subtle py-[80px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6">
      <div class="max-w-[860px] mx-auto bg-bg border border-border rounded-[16px] p-[40px] max-[768px]:p-[24px] flex flex-col gap-[20px]">
        <div class="flex flex-col gap-[8px]">
          <span class="font-display text-[12px] font-semibold tracking-[2px] text-accent">${gatekeeper.tag}</span>
          <h2 class="font-display text-[32px] font-bold text-ink max-[768px]:text-[26px]">${gatekeeper.title}</h2>
        </div>
        <p class="text-[15px] leading-[25px] text-ink-secondary">${gatekeeper.intro}</p>
        <p class="text-[14px] leading-[23px] text-ink font-medium">${gatekeeper.sourceWarning} <a href="https://github.com/BerryUIKI/Taleno/releases/latest" target="_blank" rel="noopener" class="text-accent hover:underline">GitHub Releases</a></p>
        <ol class="flex flex-col gap-[12px] list-decimal pl-[22px] text-[14px] leading-[23px] text-ink-secondary">
          ${gatekeeper.steps.map(step => `<li class="pl-[4px]">${step}</li>`).join('\n          ')}
        </ol>
        <div class="rounded-[10px] bg-bg-soft border border-border p-[18px] flex flex-col gap-[10px]">
          <p class="text-[13px] leading-[21px] text-ink-secondary">${gatekeeper.fallback}</p>
          <code class="block overflow-x-auto rounded-[7px] bg-[#0D0D0F] px-[14px] py-[12px] text-[12px] text-white">xattr -dr com.apple.quarantine /Applications/Taleno.app</code>
        </div>
        <p class="text-[13px] leading-[21px] text-ink-secondary"><strong class="text-ink">${gatekeeper.safety}</strong> <a href="https://support.apple.com/guide/mac-help/mh40616/mac" target="_blank" rel="noopener" class="text-accent hover:underline">${gatekeeper.appleLink}</a></p>
      </div>
    </section>
  </main>

  <footer class="bg-[#0D0D0F] pt-[64px] pb-[40px] px-[140px] max-[1200px]:px-10 max-[768px]:px-6 flex flex-col gap-[40px]">
    <div class="flex items-center justify-between max-[1000px]:flex-col max-[1000px]:gap-[16px] max-[1000px]:items-start">
      <div class="flex items-center gap-[10px]">
        <svg width="26" height="26" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lgD2" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4361ee"/><stop offset="1" stop-color="#3a0ca3"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lgD2)"/><rect x="120" y="96" width="272" height="320" rx="20" fill="white" opacity="0.95"/><rect x="160" y="160" width="120" height="24" rx="6" fill="#4361ee"/><rect x="160" y="210" width="192" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="240" width="160" height="14" rx="4" fill="#6c757d" opacity="0.6"/><rect x="160" y="270" width="180" height="14" rx="4" fill="#6c757d" opacity="0.6"/><polygon points="310,380 390,300 420,330 340,410 300,420" fill="#4cc9f0"/></svg>
        <span class="font-display text-[18px] font-bold text-white">Taleno</span>
      </div>
      <span class="text-[11px] text-white/40">English · 简体中文 · 繁體中文 · 日本語 · 한국어 · Deutsch · Français · Español · Русский</span>
    </div>
    <div class="h-px w-full bg-white/[0.12]"></div>
    <div class="flex items-center justify-between text-[12px] max-[768px]:flex-col max-[768px]:gap-[8px]">
      <span class="text-white/50">Copyright © 2026 Taleno Contributors · Licensed under AGPL-3.0</span>
      <span class="text-white/40">Built with Tauri 2 · Rust · SolidJS</span>
    </div>
  </footer>

  <script>
    function setLang(lang) {
      localStorage.setItem('taleno_user_lang', lang);
    }
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => menu.classList.add('hidden'));

    // Dynamic Auto-Update Version Number
    (function autoUpdateVersion() {
      const cached = sessionStorage.getItem('taleno_latest_release');
      if (cached) applyVersion(cached);

      fetch('https://api.github.com/repos/BerryUIKI/Taleno/releases/latest')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(data => {
          if (data && data.tag_name) {
            sessionStorage.setItem('taleno_latest_release', data.tag_name);
            applyVersion(data.tag_name);
          }
        })
        .catch(() => {});

      function applyVersion(tag) {
        document.querySelectorAll('[data-version-tag]').forEach(el => {
          el.textContent = el.textContent.replace(/(?:\\$\\{LATEST_VERSION_TAG\\}|v?\\d+\\.\\d+\\.\\d+)/g, tag);
        });
      }
    })();

    // OS detection for Download Page matrix
    (function highlightDownloadPlatform() {
      const p = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
      const u = (navigator.userAgent || '').toLowerCase();
      let os = 'win';
      if (p.includes('mac') || u.includes('macintosh') || u.includes('mac os') || u.includes('darwin')) {
        os = 'macos';
      } else if (p.includes('linux') || u.includes('linux') || u.includes('x11')) {
        os = 'linux';
      } else if (p.includes('win') || u.includes('windows')) {
        os = 'win';
      }

      document.querySelectorAll('.dl-os-card').forEach(c => {
        c.classList.remove('border-2', 'border-accent', 'shadow-md', 'scale-[1.01]');
        c.classList.add('border', 'border-border');
        const b = c.querySelector('.dl-os-badge');
        if (b) b.classList.add('hidden');
      });

      const active = document.getElementById('dl-os-' + os);
      if (active) {
        active.classList.remove('border', 'border-border');
        active.classList.add('border-2', 'border-accent', 'shadow-md', 'scale-[1.01]');
        const badge = active.querySelector('.dl-os-badge');
        if (badge) badge.classList.remove('hidden');
      }
    })();
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


// Generate sitemap.xml and robots.txt
function generateSitemapAndRobots() {
  const now = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const allLangs = Object.values(languages);

  // 1. Homepages
  for (const l of allLangs) {
    const url = l.code === 'en' ? 'https://berryuiki.github.io/Taleno/' : `https://berryuiki.github.io/Taleno/${l.dir}/`;
    xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n`;
    for (const alt of allLangs) {
      const altUrl = alt.code === 'en' ? 'https://berryuiki.github.io/Taleno/' : `https://berryuiki.github.io/Taleno/${alt.dir}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.htmlLang}" href="${altUrl}"/>\n`;
    }
    xml += '  </url>\n';
  }

  // 2. Download pages
  for (const l of allLangs) {
    const url = l.code === 'en' ? 'https://berryuiki.github.io/Taleno/download.html' : `https://berryuiki.github.io/Taleno/${l.dir}/download.html`;
    xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n`;
    for (const alt of allLangs) {
      const altUrl = alt.code === 'en' ? 'https://berryuiki.github.io/Taleno/download.html' : `https://berryuiki.github.io/Taleno/${alt.dir}/download.html`;
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.htmlLang}" href="${altUrl}"/>\n`;
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log('Generated sitemap.xml with 18 localized URLs.');

  const robots = 'User-agent: *\nAllow: /\n\nSitemap: https://berryuiki.github.io/Taleno/sitemap.xml\n';
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots, 'utf8');
  console.log('Generated robots.txt.');
}

generateSitemapAndRobots();
