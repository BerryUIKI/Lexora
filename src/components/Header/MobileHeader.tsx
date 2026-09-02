import { Component, Show } from "solid-js";
import { currentDocument, displayMode, cycleDisplayMode } from "../../store/editor";
import { t } from "../../i18n";
import type { SettingsTabId } from "../../types/plugin";

interface MobileHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewDocument: () => void;
  onOpenQuickSwitcher: () => void;
  onOpenSettings: (tab?: SettingsTabId) => void;
  onGoHome: () => void;
}

export const MobileHeader: Component<MobileHeaderProps> = (props) => {
  const doc = () => currentDocument();
  const title = () => doc().filename || "Taleno";

  return (
    <header
      class="safe-area-top flex flex-col border-b border-[var(--color-border)] select-none flex-shrink-0 z-30"
      style={{
        background: "var(--color-bg-secondary)",
        color: "var(--color-text-primary)",
      }}
    >
      <div class="h-11 px-2.5 flex items-center justify-between gap-2">
        {/* Left: Sidebar Toggle & Home Button */}
        <div class="flex items-center gap-1">
          <button
            class="touch-target p-2 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-primary)] transition-colors"
            onClick={props.onToggleSidebar}
            title={t("view.toggleSidebar")}
            aria-label="Toggle Sidebar"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <button
            class="p-1.5 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-xs font-semibold"
            onClick={props.onGoHome}
            title="Home"
          >
            🏠
          </button>
        </div>

        {/* Center: Active Document Title */}
        <div class="flex items-center gap-1.5 min-w-0 max-w-[50%] px-1">
          <span class="truncate font-semibold text-xs tracking-tight">
            {title()}
          </span>
          <Show when={doc().isDirty}>
            <span class="w-2 h-2 rounded-full bg-[var(--color-accent)] flex-shrink-0" title="Unsaved changes" />
          </Show>
        </div>

        {/* Right: Quick Actions (Mode Switch, Search, Settings) */}
        <div class="flex items-center gap-1">
          {/* Display Mode Cycle Button */}
          <button
            class="px-2 py-1 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs font-medium shadow-xs flex items-center gap-1"
            onClick={cycleDisplayMode}
            title={`Mode: ${displayMode()}`}
          >
            <Show when={displayMode() === "reading"}>
              <span>📖</span>
            </Show>
            <Show when={displayMode() === "writing"}>
              <span>✍️</span>
            </Show>
            <Show when={displayMode() === "code"}>
              <span>💻</span>
            </Show>
          </button>

          {/* Quick Switcher */}
          <button
            class="p-1.5 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={props.onOpenQuickSwitcher}
            title={t("view.quickSwitcher")}
            aria-label="Search"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* New Document */}
          <button
            class="p-1.5 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={props.onNewDocument}
            title={t("file.newDocument")}
            aria-label="New Document"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Settings */}
          <button
            class="p-1.5 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={() => props.onOpenSettings("theme")}
            title={t("menu.preferences")}
            aria-label="Settings"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
