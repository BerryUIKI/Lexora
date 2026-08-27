export type SupportedLocale =
  | "en-US"
  | "zh-CN"
  | "zh-TW"
  | "ja-JP"
  | "ko-KR"
  | "de-DE"
  | "fr-FR"
  | "es-ES"
  | "ru-RU";

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  nativeName: string;
}

export interface TranslationDictionary {
  app: {
    name: string;
    tagline: string;
    description: string;
    copyright: string;
    licenseNotice: string;
  };
  menu: {
    file: string;
    edit: string;
    view: string;
    window: string;
    help: string;
    language: string;
    languageSubtitle: string;
    autoLanguage: string;
    autoLanguageDesc: string;
  };
  file: {
    newDocument: string;
    openFile: string;
    openFolder: string;
    save: string;
    saveAs: string;
    closeTab: string;
    exportAs: string;
    exportHtml: string;
    exportPdf: string;
    exit: string;
  };
  edit: {
    undo: string;
    redo: string;
    cut: string;
    copy: string;
    paste: string;
    selectAll: string;
    findReplace: string;
    bold: string;
    italic: string;
    strikethrough: string;
    heading: string;
    heading1: string;
    heading2: string;
    heading3: string;
    heading4: string;
    heading5: string;
    heading6: string;
    paragraph: string;
    bulletList: string;
    numberedList: string;
    taskList: string;
    codeBlock: string;
    blockquote: string;
    table: string;
    link: string;
    image: string;
  };
  view: {
    toggleSidebar: string;
    toggleOutline: string;
    quickSwitcher: string;
    readingMode: string;
    writingMode: string;
    codeMode: string;
    lightTheme: string;
    darkTheme: string;
    systemTheme: string;
    themeSettings: string;
  };
  settings: {
    title: string;
    themeTab: string;
    markdownTheme: string;
    markdownThemeDescription: string;
    colorMode: string;
    colorModeDescription: string;
    elementShadows: string;
    elementShadowsDescription: string;
  };
  window: {
    minimize: string;
    maximize: string;
    restore: string;
    close: string;
  };
  help: {
    documentation: string;
    github: string;
    checkForUpdates: string;
    reportIssue: string;
    about: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    newDocument: string;
    openFile: string;
    github: string;
    recentFiles: string;
    noRecentFiles: string;
    shortcuts: string;
    tip: string;
    dblClickHint: string;
  };
  sidebar: {
    outline: string;
    files: string;
    workspace: string;
    sectionsCount: string;
    noHeadings: string;
    noFolderOpen: string;
    openFolder: string;
    searchFiles: string;
    newFile: string;
    newFolder: string;
    rename: string;
    delete: string;
    confirmDelete: string;
  };
  statusBar: {
    wordsCount: string;
    lineCol: string;
    reading: string;
    writing: string;
    code: string;
    encoding: string;
    format: string;
    toggleTheme: string;
  };
  update: {
    checking: string;
    upToDate: string;
    upToDateDesc: string;
    aheadTitle: string;
    aheadDesc: string;
    aheadBadge: string;
    updateAvailable: string;
    latestVersion: string;
    currentVersion: string;
    downloadUpdate: string;
    remindLater: string;
    releaseNotes: string;
  };
  dialogs: {
    ok: string;
    cancel: string;
    close: string;
    delete: string;
    save: string;
    dontSave: string;
  };
}
