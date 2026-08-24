import { Component, For, Show } from "solid-js";
import type { TocEntry } from "../../store/editor";

export interface TocSidebarProps {
  toc: TocEntry[];
}

export const TocSidebar: Component<TocSidebarProps> = (props) => {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div class="flex flex-col h-full">
      {/* Header */}
      <div
        class="p-3 flex-shrink-0"
        style={{ "border-bottom": "1px solid var(--color-border)" }}
      >
        <h2
          class="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Table of Contents
        </h2>
      </div>

      {/* TOC entries */}
      <div class="flex-1 overflow-y-auto py-2">
        <Show
          when={props.toc.length > 0}
          fallback={
            <p
              class="px-3 py-2 text-xs italic"
              style={{ color: "var(--color-text-secondary)" }}
            >
              No headings found.
            </p>
          }
        >
          <For each={props.toc}>
            {(entry) => (
              <button
                class="block w-full text-left px-3 py-1 text-sm truncate transition-colors"
                style={{
                  "padding-left": `${0.75 + (entry.level - 1) * 0.75}rem`,
                  color: entry.level === 1
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  "font-weight": entry.level <= 2 ? "500" : "400",
                  "font-size": entry.level === 1 ? "0.875rem" : "0.8125rem",
                }}
                onClick={() => scrollToHeading(entry.id)}
                title={entry.text}
              >
                {entry.text}
              </button>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};
