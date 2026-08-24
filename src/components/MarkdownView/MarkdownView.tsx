import { Component, Show } from "solid-js";

export interface MarkdownViewProps {
  html: string;
  externallyModified: boolean;
  onReload: () => void;
}

export const MarkdownView: Component<MarkdownViewProps> = (props) => {
  return (
    <div class="relative h-full overflow-y-auto" style={{ background: "var(--color-editor-bg)" }}>
      {/* External modification banner */}
      <Show when={props.externallyModified}>
        <div
          class="sticky top-0 z-10 flex items-center justify-between px-4 py-2 text-sm"
          style={{
            background: "var(--color-accent)",
            color: "white",
          }}
        >
          <span>This file has been modified externally.</span>
          <button
            class="px-3 py-1 rounded text-sm font-medium transition-colors"
            style={{
              background: "rgba(255,255,255,0.2)",
            }}
            onClick={props.onReload}
          >
            Reload
          </button>
        </div>
      </Show>

      {/* Rendered markdown content */}
      <div
        class="markdown-body max-w-4xl mx-auto px-8 py-6"
        innerHTML={props.html}
      />
    </div>
  );
};
