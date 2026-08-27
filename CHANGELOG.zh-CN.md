# 更新日志

[English](CHANGELOG.md) · [繁體中文](CHANGELOG.zh-TW.md) · [日本語](CHANGELOG.ja.md) · [한국어](CHANGELOG.ko.md) · [Deutsch](CHANGELOG.de.md) · [Français](CHANGELOG.fr.md) · [Español](CHANGELOG.es.md) · [Русский](CHANGELOG.ru.md)

## [未发布]

### 新增
- 在标题栏、帮助菜单和关于对话框中添加官方网站链接。
- 点击标题栏 Lexora 图标可返回主页，且不会关闭已打开的文档。
- Markdown 渲染支持块级和行内 HTML 格式，包括标题内的 HTML。

### 变更
- 手动检查更新时立即显示进度状态，并保持关于对话框打开。
- 应用内更新说明改由 Lexora 的九语言翻译字典提供；GitHub 发布说明仅使用英文。
- 已是最新版本时显示绿色确认勾选标记。

## [0.1.4] - 2026-08-27

### 新增
- 支持 Windows、macOS 和 Linux 的签名应用内更新，并显示下载进度且需用户确认安装。
- 每日检查稳定版更新，带启动随机延迟，并可在设置中关闭。
- 为全部九种支持语言提供本地化更新说明。

### 变更
- 当任何已打开标签页存在未保存更改时，安装前会显示明确警告。
- 应用版本由 `package.json` 统一提供，并在 CI 中校验 Cargo 版本和发布标签。

更早的版本记录请参阅[英文完整更新日志](CHANGELOG.md)。
