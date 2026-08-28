import { Component, Show, createMemo } from "solid-js";
import { currentDocument, displayMode, setDisplayMode } from "../../store/editor";
import { theme, cycleTheme } from "../../store/settings";
import { t } from "../../i18n";

const DisplayModeSwitcher: Component = () => (
  <div
    class="flex items-center rounded p-0.5 flex-shrink-0"
    style={{
      background: "var(--color-hover)",
      border: "1px solid var(--color-border)",
    }}
    role="group"
    aria-label="Display mode switcher"
  >
    <button
      class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-all"
      style={{
        background: displayMode() === "reading" ? "var(--color-bg-primary)" : "transparent",
        color: displayMode() === "reading" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        "box-shadow": displayMode() === "reading" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
      }}
      onClick={() => setDisplayMode("reading")}
      title={`${t("view.readingMode")} (Preview)`}
    >
      <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      <span>{t("statusBar.reading")}</span>
    </button>

    <button
      class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-all"
      style={{
        background: displayMode() === "writing" ? "var(--color-bg-primary)" : "transparent",
        color: displayMode() === "writing" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        "box-shadow": displayMode() === "writing" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
      }}
      onClick={() => setDisplayMode("writing")}
      title={`${t("view.writingMode")} (In-Place WYSIWYG)`}
    >
      <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
      <span>{t("statusBar.writing")}</span>
    </button>

    <button
      class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-all"
      style={{
        background: displayMode() === "code" ? "var(--color-bg-primary)" : "transparent",
        color: displayMode() === "code" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        "box-shadow": displayMode() === "code" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
      }}
      onClick={() => setDisplayMode("code")}
      title={`${t("view.codeMode")} (Markdown Source)`}
    >
      <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="7 8 3 12 7 16" />
        <line x1="14" y1="4" x2="10" y2="20" />
        <polyline points="17 8 21 12 17 16" />
      </svg>
      <span>{t("statusBar.code")}</span>
    </button>
  </div>
);

export const StatusBar: Component = () => {
  const doc = () => currentDocument();
  const hasDoc = () => doc().path !== null || doc().content.length > 0;
  const charCount = createMemo(() => doc().content.length);
  const lineEnding = createMemo(() => (doc().content.includes("\r\n") ? "CRLF" : "LF"));

  const themeLabel = () => {
    const currentTheme = theme();
    if (currentTheme === "light") return t("view.lightTheme");
    if (currentTheme === "dark") return t("view.darkTheme");
    return t("view.systemTheme");
  };

  return (
    <footer
      class="h-7 flex items-center gap-2 px-2.5 text-xs no-select flex-shrink-0 select-none"
      style={{
        background: "var(--color-statusbar-bg)",
        color: "var(--color-text-secondary)",
        "border-top": "1px solid var(--color-border)",
      }}
    >
      {/* Far-left display mode controls */}
      <DisplayModeSwitcher />

      <span class="text-[var(--color-border)]">|</span>

      {/* Current document state */}
      <div class="flex items-center gap-1.5 min-w-0">
        <Show when={hasDoc()}>
          <span
            class="max-w-44 truncate font-medium text-[var(--color-text-primary)]"
            title={doc().path ?? "Untitled"}
          >
            {doc().filename}
          </span>

          <Show when={doc().isDirty}>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-medium border border-[var(--color-border)] bg-[var(--color-hover)] text-[var(--color-text-primary)]"
              title="Unsaved changes"
            >
              ● unsaved
            </span>
          </Show>

          <Show when={doc().externallyModified}>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-medium border border-[var(--color-border)] bg-[var(--color-hover)] text-[var(--color-text-primary)]"
              title="File modified externally on disk"
            >
              modified
            </span>
          </Show>
        </Show>

        <Show when={!hasDoc()}>
          <span class="italic text-[var(--color-text-secondary)]">No file open</span>
        </Show>
      </div>

      <div class="flex-1" />

      {/* Document stats and global theme */}
      <div class="flex items-center gap-2 flex-shrink-0">
        <Show when={hasDoc()}>
          <span>{doc().wordCount.toLocaleString()} {t("statusBar.wordsCount")}</span>
          <span class="text-[var(--color-border)]">|</span>
          <span>{charCount().toLocaleString()} chars</span>
          <span class="text-[var(--color-border)]">|</span>
          <span>UTF-8</span>
          <span class="text-[var(--color-border)]">|</span>
          <span>{lineEnding()}</span>
          <span class="text-[var(--color-border)]">|</span>
        </Show>

        <button
          class="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          onClick={cycleTheme}
          title={`${t("statusBar.toggleTheme")}: ${themeLabel()}`}
        >
          <Show when={theme() === "light"}>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </Show>
          <Show when={theme() === "dark"}>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Show>
          <Show when={theme() === "system"}>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" opacity="0.3" />
            </svg>
          </Show>
          <span class="hidden sm:inline text-[11px] font-medium">{themeLabel()}</span>
        </button>
      </div>
    </footer>
  );
};
