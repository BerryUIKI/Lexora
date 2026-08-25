import { Component, For, Show } from "solid-js";
import { type TocEntry, displayMode } from "../../store/editor";

export interface TocSidebarProps {
  toc: TocEntry[];
}

export const TocSidebar: Component<TocSidebarProps> = (props) => {
  const scrollToHeading = (entry: TocEntry) => {
    const mode = displayMode();

    if (mode === "reading") {
      // Direct element ID anchor scroll in rendered HTML
      const element = document.getElementById(entry.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    if (mode === "writing") {
      // In Milkdown WYSIWYG, find heading by tag and matching text
      const headingElements = Array.from(
        document.querySelectorAll(
          `.milkdown-container h1, .milkdown-container h2, .milkdown-container h3, .milkdown-container h4, .milkdown-container h5, .milkdown-container h6`
        )
      );

      const targetEl = headingElements.find(
        (el) =>
          el.textContent?.trim().toLowerCase() === entry.text.trim().toLowerCase()
      );

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    if (mode === "code") {
      // In Code mode, locate line in textarea and scroll
      const textarea = document.querySelector("textarea");
      if (textarea) {
        const text = textarea.value;
        const lines = text.split("\n");
        let charIndex = 0;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes(entry.text)) {
            textarea.focus();
            textarea.setSelectionRange(charIndex, charIndex + line.length);
            // Calculate approximate scroll top
            const lineHeight = 24; // leading-6 is 24px
            textarea.scrollTop = Math.max(0, i * lineHeight - 60);
            return;
          }
          charIndex += line.length + 1;
        }
      }
    }

    // Fallback: try document.getElementById
    const fallbackEl = document.getElementById(entry.id);
    if (fallbackEl) {
      fallbackEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div class="flex flex-col h-full">
      {/* Header */}
      <div
        class="px-3 py-2.5 flex-shrink-0 flex items-center justify-between"
        style={{ "border-bottom": "1px solid var(--color-border)" }}
      >
        <div class="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-primary)]">
          <svg class="w-3.5 h-3.5 text-[var(--color-text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Outline</span>
        </div>
        <span class="text-[11px] text-[var(--color-text-secondary)] font-medium">
          {props.toc.length} sections
        </span>
      </div>

      {/* TOC entries */}
      <div class="flex-1 overflow-y-auto py-2 px-1">
        <Show
          when={props.toc.length > 0}
          fallback={
            <div class="px-3 py-6 text-center text-xs text-[var(--color-text-secondary)] italic">
              No headings in current document.
            </div>
          }
        >
          <For each={props.toc}>
            {(entry) => (
              <button
                class="block w-full text-left px-2.5 py-1.5 rounded-md truncate transition-colors hover:bg-[var(--color-hover)] group"
                style={{
                  "padding-left": `${0.5 + (entry.level - 1) * 0.75}rem`,
                  color:
                    entry.level === 1
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                  "font-weight": entry.level <= 2 ? "600" : "400",
                  "font-size": entry.level === 1 ? "0.8125rem" : "0.75rem",
                }}
                onClick={() => scrollToHeading(entry)}
                title={entry.text}
              >
                <div class="flex items-center gap-1.5 truncate">
                  <span class="text-[10px] opacity-40 font-mono flex-shrink-0">
                    H{entry.level}
                  </span>
                  <span class="truncate group-hover:text-[var(--color-text-primary)]">
                    {entry.text}
                  </span>
                </div>
              </button>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};
