import { Component, createSignal, createMemo, For, Show, onMount, onCleanup } from "solid-js";
import { openTabs, quickSwitcherOpen, setQuickSwitcherOpen, addOrSwitchTab } from "../../store/files";
import type { Tab } from "../../store/files";

export interface QuickSwitcherProps {
  onOpenFileByPath: (path: string) => void;
}

export const QuickSwitcher: Component<QuickSwitcherProps> = (props) => {
  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  let inputRef!: HTMLInputElement;

  const filteredItems = createMemo(() => {
    const q = query().toLowerCase().trim();
    const tabs = openTabs();
    if (!q) return tabs;
    return tabs.filter((t) =>
      t.document.filename.toLowerCase().includes(q) ||
      (t.document.path && t.document.path.toLowerCase().includes(q))
    );
  });

  const handleSelect = (tab: Tab) => {
    addOrSwitchTab(tab.document);
    setQuickSwitcherOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setQuickSwitcherOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, Math.max(0, filteredItems().length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const items = filteredItems();
      if (items[selectedIndex()]) {
        handleSelect(items[selectedIndex()]);
      }
    }
  };

  onMount(() => {
    inputRef?.focus();
  });

  return (
    <Show when={quickSwitcherOpen()}>
      <div
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-xs"
        onClick={() => setQuickSwitcherOpen(false)}
      >
        <div
          class="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Search Header */}
          <div class="p-3 border-b border-[var(--color-border)] flex items-center gap-2">
            <span class="opacity-50 text-sm">🔍</span>
            <input
              ref={inputRef}
              type="text"
              class="w-full bg-transparent outline-none text-sm placeholder:opacity-40"
              placeholder="Search open documents by name... (Esc to close)"
              value={query()}
              onInput={(e) => {
                setQuery(e.currentTarget.value);
                setSelectedIndex(0);
              }}
            />
          </div>

          {/* Results List */}
          <div class="max-h-80 overflow-y-auto p-2">
            <Show
              when={filteredItems().length > 0}
              fallback={
                <div class="p-4 text-center text-xs opacity-50">
                  No matching files found.
                </div>
              }
            >
              <For each={filteredItems()}>
                {(tab, idx) => {
                  const isSelected = () => idx() === selectedIndex();
                  return (
                    <div
                      class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-xs transition-colors"
                      style={{
                        background: isSelected() ? "var(--color-hover)" : "transparent",
                        color: isSelected() ? "var(--color-accent)" : "var(--color-text-primary)",
                      }}
                      onClick={() => handleSelect(tab)}
                    >
                      <div class="flex items-center gap-2 truncate">
                        <span>📝</span>
                        <span class="font-medium truncate">{tab.document.filename}</span>
                      </div>
                      <span class="opacity-40 truncate max-w-40 text-[10px]">
                        {tab.document.path ?? "Unsaved"}
                      </span>
                    </div>
                  );
                }}
              </For>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
};
