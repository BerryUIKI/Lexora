# 更新日誌

[English](CHANGELOG.md) · [简体中文](CHANGELOG.zh-CN.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Français](CHANGELOG.fr.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [0.1.4] - 2026-08-27

### 新增
- 支援 Windows、macOS 與 Linux 的簽署應用程式內更新，顯示下載進度並需使用者確認安裝。
- 每日檢查穩定版更新，加入啟動隨機延遲，亦可在設定中停用。
- 為全部九種支援語言提供本地化更新說明。

### 變更
- 若任何已開啟分頁有未儲存的變更，安裝前會顯示明確警告。
- 應用程式版本統一由 `package.json` 提供，並在 CI 中驗證 Cargo 版本與發布標籤。

較早版本請參閱[英文完整更新日誌](CHANGELOG.md)。
