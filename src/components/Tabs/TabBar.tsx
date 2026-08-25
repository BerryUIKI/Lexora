import { Component, For, Show } from "solid-js";
import { openTabs, activeTabId, closeTab, addOrSwitchTab } from "../../store/files";
import { setCurrentDocument } from "../../store/editor";

export interface TabBarProps {
  onNewTab: () => void;
  isDragOver?: boolean;
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void);
}

export const TabBar: Component<TabBarProps> = (props) => {
  const handleSelectTab = (tabId: string) => {
    const tab = openTabs().find((t) => t.id === tabId);
    if (tab) {
      setCurrentDocument(tab.document);
      addOrSwitchTab(tab.document);
    }
  };

  return (
    <div
      ref={props.ref}
      data-tab-bar="true"
      class="h-9 flex items-center bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-x-auto select-none no-select flex-shrink-0 transition-colors relative"
      style={{
        "background-color": props.isDragOver
          ? "color-mix(in srgb, var(--color-accent) 15%, var(--color-bg-secondary))"
          : "var(--color-bg-secondary)",
        "outline": props.isDragOver ? "2px dashed var(--color-accent)" : "none",
        "outline-offset": "-2px",
      }}
    >
      <For each={openTabs()}>
        {(tab) => {
          const isActive = () => activeTabId() === tab.id;
          return (
            <div
              class="h-full flex items-center px-3 gap-2 border-r border-[var(--color-border)] text-xs font-medium cursor-pointer transition-colors max-w-44 truncate group"
              style={{
                background: isActive() ? "var(--color-bg-primary)" : "transparent",
                color: isActive() ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                "border-top": isActive() ? "2px solid var(--color-accent)" : "2px solid transparent",
              }}
              onClick={() => handleSelectTab(tab.id)}
            >
              <span class="truncate flex-1">{tab.document.filename}</span>

              {/* Dirty indicator */}
              <Show when={tab.document.isDirty}>
                <span class="text-[9px] text-[#e63946] font-bold">●</span>
              </Show>

              {/* Close button */}
              <button
                class="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-[var(--color-hover)] text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                title="Close Tab"
              >
                ✕
              </button>
            </div>
          );
        }}
      </For>

      {/* New tab button */}
      <button
        class="h-full px-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] transition-colors"
        onClick={props.onNewTab}
        title="New Document (Ctrl+N)"
      >
        +
      </button>

      {/* Drop hint when dragging over TabBar */}
      <Show when={props.isDragOver}>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold text-xs animate-pulse">
          📂 Drop here to open file in a new tab
        </div>
      </Show>
    </div>
  );
};
