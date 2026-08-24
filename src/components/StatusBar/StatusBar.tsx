import { Component, Show } from "solid-js";
import { currentDocument, displayMode, cycleDisplayMode } from "../../store/editor";
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

  const modeIcon = () => {
    const m = displayMode();
    if (m === "reading") return "📖";
    if (m === "writing") return "✍️";
    return "💻";
  };

  const modeLabel = () => {
    const m = displayMode();
    if (m === "reading") return "Reading";
    if (m === "writing") return "Writing";
    return "Code";
  };

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
      class="h-7 flex items-center px-2 text-xs no-select flex-shrink-0"
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
            class="max-w-48 truncate font-medium"
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
      <div class="flex items-center gap-2">
        {/* Word count */}
        <Show when={hasDoc()}>
          <span>{doc().wordCount.toLocaleString()} words</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
        </Show>

        {/* Tri-State Display Mode Switcher */}
        <button
          class="flex items-center gap-1.5 px-2 py-0.5 rounded font-medium transition-colors"
          style={{
            background: "var(--color-hover)",
            color: "var(--color-text-primary)",
          }}
          onClick={cycleDisplayMode}
          title={`Display Mode: ${modeLabel()} (Click to toggle Reading / Writing / Code)`}
        >
          <span>{modeIcon()}</span>
          <span>{modeLabel()}</span>
        </button>

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
