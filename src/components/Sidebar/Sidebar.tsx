import { Component } from "solid-js";

export const Sidebar: Component = () => {
  return (
    <aside class="w-64 border-r border-[var(--color-border)] bg-[var(--color-sidebar-bg)] flex flex-col overflow-hidden no-select">
      <div class="p-3 border-b border-[var(--color-border)]">
        <h2 class="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Files
        </h2>
      </div>
      <div class="flex-1 overflow-y-auto p-2">
        <p class="text-sm text-[var(--color-text-secondary)] italic p-2">
          Open a folder to browse files.
        </p>
      </div>
    </aside>
  );
};
