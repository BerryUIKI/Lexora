import { Component } from "solid-js";

export interface StatusBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const StatusBar: Component<StatusBarProps> = (props) => {
  return (
    <footer class="h-6 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center px-3 text-xs text-[var(--color-text-secondary)] no-select">
      <button
        class="hover:text-[var(--color-text-primary)] mr-4"
        onClick={props.onToggleSidebar}
        title={props.sidebarOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {props.sidebarOpen ? "◀" : "▶"}
      </button>
      <span>Ln 1, Col 1</span>
      <span class="mx-2">|</span>
      <span>UTF-8</span>
      <span class="mx-2">|</span>
      <span>Markdown</span>
      <span class="flex-1" />
      <span>0 words</span>
    </footer>
  );
};
