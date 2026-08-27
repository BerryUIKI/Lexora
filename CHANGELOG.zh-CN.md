# 更新日志

[English](CHANGELOG.md) · [繁體中文](CHANGELOG.zh-TW.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Français](CHANGELOG.fr.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [0.1.4] - 2026-08-27

### 新增
- 支持 Windows、macOS 和 Linux 的签名应用内更新，并显示下载进度且需用户确认安装。
- 每日检查稳定版更新，带启动随机延迟，并可在设置中关闭。
- 为全部九种支持语言提供本地化更新说明。

### 变更
- 当任何已打开标签页存在未保存更改时，安装前会显示明确警告。
- 应用版本由 `package.json` 统一提供，并在 CI 中校验 Cargo 版本和发布标签。

更早的版本记录请参阅[英文完整更新日志](CHANGELOG.md)。
