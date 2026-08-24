import { Component, Show } from "solid-js";
import { currentDocument } from "../../store/editor";
import { theme, cycleTheme, resolvedTheme } from "../../store/settings";

export interface StatusBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenFile: () => void;
}

export const StatusBar: Component<StatusBarProps> = (props) => {
  const doc = () => currentDocument();
  const hasDoc = () => doc().path !== null;

  const themeIcon = () => {
    const t = theme();
    if (t === "light") return "☀";
    if (t === "dark") return "☽";
    return "◑"; // system
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
          title={props.sidebarOpen ? "Hide sidebar" : "Show sidebar"}
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

        {/* Separator */}
        <span style={{ color: "var(--color-border)" }}>|</span>

        {/* Filename */}
        <Show when={hasDoc()}>
          <span
            class="max-w-48 truncate"
            title={doc().path ?? ""}
          >
            {doc().filename}
          </span>

          {/* Externally modified indicator */}
          <Show when={doc().externallyModified}>
            <span
              class="px-1 rounded text-[10px] font-medium"
              style={{ background: "var(--color-accent)", color: "white" }}
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
      <div class="flex items-center gap-3">
        {/* Word count */}
        <Show when={hasDoc()}>
          <span>{doc().wordCount.toLocaleString()} words</span>
        </Show>

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
