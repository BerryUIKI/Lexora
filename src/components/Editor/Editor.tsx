import { Component, createEffect, onMount, onCleanup } from "solid-js";
import {
  defaultValueCtx,
  Editor as MilkdownEditor,
  editorViewOptionsCtx,
  rootCtx,
  editorViewCtx,
  parserCtx,
  serializerCtx,
} from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { commonmark } from "@milkdown/preset-commonmark";
import { gfm } from "@milkdown/preset-gfm";
import { history } from "@milkdown/plugin-history";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { nord } from "@milkdown/theme-nord";
import "@milkdown/theme-nord/style.css";
import { currentDocument, updateDocumentContent } from "../../store/editor";

export interface EditorProps {
  onSave?: () => void;
}

export const Editor: Component<EditorProps> = (props) => {
  let containerRef!: HTMLDivElement;
  let editorInstance: MilkdownEditor | null = null;

  onMount(async () => {
    try {
      editorInstance = await MilkdownEditor.make()
        .config((ctx: Ctx) => {
          ctx.set(rootCtx, containerRef);
          ctx.set(defaultValueCtx, currentDocument().content || "");
          ctx.update(editorViewOptionsCtx, (prev: Record<string, unknown>) => ({
            ...prev,
            attributes: {
              class:
                "milkdown-theme-nord prose outline-none focus:outline-none min-h-[500px] leading-relaxed text-base",
              spellcheck: "false",
            },
          }));

          ctx.get(listenerCtx).markdownUpdated((_: unknown, markdown: string) => {
            if (markdown !== currentDocument().content) {
              updateDocumentContent(markdown);
            }
          });
        })
        .config(nord)
        .use(commonmark)
        .use(gfm)
        .use(history)
        .use(listener)
        .create();
    } catch (err) {
      console.error("Failed to initialize Milkdown editor:", err);
    }
  });

  // Keep Milkdown editor content synchronized when active document changes externally
  createEffect(() => {
    const content = currentDocument().content;
    if (!editorInstance) return;

    try {
      editorInstance.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const serializer = ctx.get(serializerCtx);
        if (!view || !parser || !serializer) return;

        const currentMd = serializer(view.state.doc);
        if (currentMd !== content) {
          const parsedDoc = parser(content || "");
          if (parsedDoc) {
            const tr = view.state.tr.replaceWith(
              0,
              view.state.doc.content.size,
              parsedDoc
            );
            view.dispatch(tr);
          }
        }
      });
    } catch (err) {
      console.warn("Failed to sync Milkdown document content:", err);
    }
  });

  onCleanup(async () => {
    if (editorInstance) {
      try {
        await editorInstance.destroy();
      } catch (e) {
        console.warn("Editor cleanup error:", e);
      }
      editorInstance = null;
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      props.onSave?.();
    }
  };

  return (
    <div
      class="h-full overflow-y-auto bg-[var(--color-editor-bg)] px-8 py-6"
      onKeyDown={handleKeyDown}
    >
      <div class="max-w-4xl mx-auto">
        <div ref={containerRef} class="milkdown-container" />
      </div>
    </div>
  );
};
