import { Component, For, Show } from "solid-js";
import { recentFiles } from "../../store/files";

export interface WelcomeHubProps {
  onNewDocument: () => void;
  onOpenFile: () => void;
  onOpenRecent: (path: string) => void;
}

export const WelcomeHub: Component<WelcomeHubProps> = (props) => {
  const shortcuts = [
    { key: "Ctrl + N", desc: "New Document" },
    { key: "Ctrl + O", desc: "Open File" },
    { key: "Ctrl + S", desc: "Save File" },
    { key: "Ctrl + /", desc: "Switch Reading / Writing / Code" },
    { key: "Ctrl + B", desc: "Bold Text" },
    { key: "Ctrl + I", desc: "Italic Text" },
    { key: "Ctrl + 1~6", desc: "Heading Levels" },
    { key: "Ctrl + 0", desc: "Paragraph / Normal Text" },
    { key: "Ctrl + Shift + B", desc: "Toggle Outline Sidebar" },
    { key: "Ctrl + P", desc: "Quick Document Switcher" },
  ];

  return (
    <div class="h-full overflow-y-auto flex items-center justify-center p-8 bg-[var(--color-bg-primary)] select-none no-select">
      <div class="max-w-3xl w-full flex flex-col items-center text-center space-y-8 animate-in fade-in duration-300">
        {/* App Branding */}
        <div class="space-y-2">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-2 shadow-xs border border-[var(--color-accent)]/20">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Lexora
          </h1>
          <p class="text-xs text-[var(--color-text-secondary)] font-medium tracking-wide">
            Minimalist Typora-style Markdown Reader & Editor
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent)] hover:opacity-90 text-white font-semibold text-xs transition-all shadow-sm hover:shadow active:scale-95"
            onClick={props.onNewDocument}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>New Document</span>
            <span class="text-[10px] opacity-70 font-mono ml-1">Ctrl+N</span>
          </button>

          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-[var(--color-text-primary)] font-semibold text-xs transition-all active:scale-95"
            onClick={props.onOpenFile}
          >
            <svg class="w-4 h-4 text-[var(--color-text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Open File</span>
            <span class="text-[10px] opacity-50 font-mono ml-1">Ctrl+O</span>
          </button>
        </div>

        {/* Grid: Recent Files & Shortcut Cheat Sheet */}
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Recent Files */}
          <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 flex flex-col h-64">
            <h3 class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Recent Files</span>
            </h3>

            <div class="flex-1 overflow-y-auto space-y-1 pr-1">
              <Show
                when={recentFiles().length > 0}
                fallback={
                  <div class="h-full flex items-center justify-center text-xs text-[var(--color-text-secondary)] italic">
                    No recent files yet. Drag or open a file to begin.
                  </div>
                }
              >
                <For each={recentFiles()}>
                  {(file) => (
                    <button
                      class="w-full text-left p-2 rounded-lg hover:bg-[var(--color-hover)] transition-colors group flex items-center justify-between"
                      onClick={() => props.onOpenRecent(file.path)}
                    >
                      <div class="truncate pr-2">
                        <div class="text-xs font-medium text-[var(--color-text-primary)] truncate">
                          {file.filename}
                        </div>
                        <div class="text-[10px] text-[var(--color-text-secondary)] truncate font-mono opacity-60">
                          {file.path}
                        </div>
                      </div>
                      <svg class="w-3.5 h-3.5 text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                </For>
              </Show>
            </div>
          </div>

          {/* Keyboard Shortcuts Cheat Sheet */}
          <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 flex flex-col h-64">
            <h3 class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12" />
              </svg>
              <span>Shortcuts Reference</span>
            </h3>

            <div class="flex-1 overflow-y-auto space-y-1.5 pr-1">
              <For each={shortcuts}>
                {(sc) => (
                  <div class="flex items-center justify-between text-xs py-1 border-b border-[var(--color-border)]/40 last:border-0">
                    <span class="text-[var(--color-text-secondary)]">{sc.desc}</span>
                    <kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[var(--color-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xs">
                      {sc.key}
                    </kbd>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Drag & Drop Hint */}
        <div class="text-xs text-[var(--color-text-secondary)] opacity-60 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Tip: Drag and drop any Markdown file directly into this window to open</span>
        </div>
      </div>
    </div>
  );
};
