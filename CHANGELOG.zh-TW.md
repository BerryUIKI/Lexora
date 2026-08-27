# 更新日誌

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh-CN.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Français](CHANGELOG.fr.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [未發佈]

### 新增
- 在標題列、說明選單與關於對話框中加入官方網站連結。
- 點擊標題列 Lexora 圖示可返回首頁，且不會關閉已開啟的文件。
- Markdown 算繪支援區塊與行內 HTML 格式，包括標題內的 HTML。

### 變更
- 手動檢查更新時立即顯示進度狀態，並保持關於對話框開啟。
- 應用程式內更新說明改由 Lexora 的九語言翻譯字典提供；GitHub 發行說明僅使用英文。
- 已是最新版本時顯示綠色確認勾選標記。

## [0.1.4] - 2026-08-27

### 新增
- 支援 Windows、macOS 與 Linux 的簽署應用程式內更新，顯示下載進度並需使用者確認安裝。
- 每日檢查穩定版更新，加入啟動隨機延遲，亦可在設定中停用。
- 為全部九種支援語言提供本地化更新說明。

### 變更
- 若任何已開啟分頁有未儲存的變更，安裝前會顯示明確警告。
- 應用程式版本統一由 `package.json` 提供，並在 CI 中驗證 Cargo 版本與發布標籤。

較早版本請參閱[英文完整更新日誌](CHANGELOG.md)。
