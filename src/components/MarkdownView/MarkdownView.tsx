import { Component, createEffect, createSignal, onCleanup, Show } from "solid-js";
import { renderMarkdown, type RenderResult } from "../../lib/tauri/commands";

export interface MarkdownViewProps {
  html: string;
  content: string;
  renderedContent: string;
  externallyModified: boolean;
  onReload: () => void;
  onRendered: (sourceContent: string, result: RenderResult) => void;
}

export const MarkdownView: Component<MarkdownViewProps> = (props) => {
  const [renderedHtml, setRenderedHtml] = createSignal(
    props.content === props.renderedContent ? props.html : ""
  );
  let renderVersion = 0;

  createEffect(() => {
    const content = props.content;
    const renderedContent = props.renderedContent;

    if (content === renderedContent) {
      renderVersion += 1;
      setRenderedHtml(props.html);
      return;
    }

    const version = ++renderVersion;
    setRenderedHtml("");

    void renderMarkdown(content)
      .then((result) => {
        if (version !== renderVersion) return;
        setRenderedHtml(result.html);
        props.onRendered(content, result);
      })
      .catch((err) => {
        if (version !== renderVersion) return;
        console.error("Failed to render Markdown for reading mode:", err);
      });
  });

  onCleanup(() => {
    renderVersion += 1;
  });

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
        innerHTML={renderedHtml()}
      />
    </div>
  );
};
