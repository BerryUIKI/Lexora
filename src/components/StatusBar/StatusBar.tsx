import { Component, Show, createMemo } from "solid-js";
import { currentDocument, displayMode, setDisplayMode } from "../../store/editor";
import { theme, cycleTheme } from "../../store/settings";

export interface StatusBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
}

export const StatusBar: Component<StatusBarProps> = (props) => {
  const doc = () => currentDocument();
  const hasDoc = () => doc().path !== null || doc().content.length > 0;

  const charCount = createMemo(() => doc().content.length);
  const lineEnding = createMemo(() => (doc().content.includes("\r\n") ? "CRLF" : "LF"));

  const themeIcon = () => {
    const t = theme();
    if (t === "light") return "☀";
    if (t === "dark") return "☽";
    return "◑";
  };

  const themeLabel = () => {
    const t = theme();
    if (t === "light") return "Light";
    if (t === "dark") return "Dark";
    return "System";
  };

  return (
    <footer
      class="h-7 flex items-center px-2 text-xs no-select flex-shrink-0 select-none"
      style={{
        background: "var(--color-statusbar-bg)",
        color: "var(--color-text-secondary)",
        "border-top": "1px solid var(--color-border)",
      }}
    >
      {/* Left section */}
      <div class="flex items-center gap-2">
        {/* Sidebar toggle */}
        <button
          class="px-1 hover:opacity-80 transition-opacity"
          onClick={props.onToggleSidebar}
          title={props.sidebarOpen ? "Hide sidebar (Ctrl+B)" : "Show sidebar (Ctrl+B)"}
        >
          {props.sidebarOpen ? "◧" : "▨"}
        </button>

        {/* Open file button */}
        <button
          class="px-1 hover:opacity-80 transition-opacity"
          onClick={props.onOpenFile}
          title="Open file (Ctrl+O)"
        >
          📂
        </button>

        {/* Save file button */}
        <button
          class="px-1 hover:opacity-80 transition-opacity"
          onClick={props.onSaveFile}
          title="Save file (Ctrl+S)"
        >
          💾
        </button>

        {/* Separator */}
        <span style={{ color: "var(--color-border)" }}>|</span>

        {/* Filename */}
        <Show when={hasDoc()}>
          <span
            class="max-w-44 truncate font-medium"
            title={doc().path ?? "Untitled"}
          >
            {doc().filename}
          </span>

          {/* Unsaved indicator */}
          <Show when={doc().isDirty}>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-semibold"
              style={{ background: "#e63946", color: "white" }}
              title="Unsaved changes"
            >
              ● unsaved
            </span>
          </Show>

          {/* Externally modified indicator */}
          <Show when={doc().externallyModified}>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-semibold"
              style={{ background: "var(--color-accent)", color: "white" }}
              title="File modified externally on disk"
            >
              modified
            </span>
          </Show>
        </Show>

        <Show when={!hasDoc()}>
          <span class="italic">No file open</span>
        </Show>
      </div>

      {/* Spacer */}
      <div class="flex-1" />

      {/* Right section */}
      <div class="flex items-center gap-2.5">
        {/* Document Stats */}
        <Show when={hasDoc()}>
          <span>{doc().wordCount.toLocaleString()} words</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span>{charCount().toLocaleString()} chars</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span>UTF-8</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span>{lineEnding()}</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
        </Show>

        {/* Tri-State Display Mode Segmented Switcher */}
        <div
          class="flex items-center rounded p-0.5"
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
            title="Reading Mode (Preview Markdown)"
          >
            <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>Reading</span>
          </button>

          <button
            class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-all"
            style={{
              background: displayMode() === "writing" ? "var(--color-bg-primary)" : "transparent",
              color: displayMode() === "writing" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              "box-shadow": displayMode() === "writing" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            }}
            onClick={() => setDisplayMode("writing")}
            title="Writing Mode (Typora-style WYSIWYG)"
          >
            <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Writing</span>
          </button>

          <button
            class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-all"
            style={{
              background: displayMode() === "code" ? "var(--color-bg-primary)" : "transparent",
              color: displayMode() === "code" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              "box-shadow": displayMode() === "code" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            }}
            onClick={() => setDisplayMode("code")}
            title="Code Mode (Markdown Source)"
          >
            <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="7 8 3 12 7 16" />
              <line x1="14" y1="4" x2="10" y2="20" />
              <polyline points="17 8 21 12 17 16" />
            </svg>
            <span>Code</span>
          </button>
        </div>

        <span style={{ color: "var(--color-border)" }}>|</span>

        {/* Theme toggle */}
        <button
          class="flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors"
          style={{ background: "var(--color-hover)" }}
          onClick={cycleTheme}
          title={`Theme: ${themeLabel()} (click to cycle)`}
        >
          <span>{themeIcon()}</span>
          <span class="hidden sm:inline">{themeLabel()}</span>
        </button>
      </div>
    </footer>
  );
};
