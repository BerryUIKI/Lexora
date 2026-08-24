import { Component, onMount, onCleanup } from "solid-js";
import { defaultValueCtx, Editor as MilkdownEditor, editorViewOptionsCtx, rootCtx } from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { gfm } from "@milkdown/preset-gfm";
import { history } from "@milkdown/plugin-history";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { nord } from "@milkdown/theme-nord";
import { currentDocument, updateDocumentContent } from "../../store/editor";

export interface EditorProps {
  onSave?: () => void;
}

export const Editor: Component<EditorProps> = () => {
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
              class: "milkdown-theme-lexora outline-none focus:outline-none min-h-[500px] leading-relaxed text-base",
              spellcheck: "false",
            },
          }));

          ctx.get(listenerCtx).markdownUpdated((_: unknown, markdown: string) => {
            updateDocumentContent(markdown);
          });
        })
        .config(nord)
        .use(gfm)
        .use(history)
        .use(listener)
        .create();
    } catch (err) {
      console.error("Failed to initialize Milkdown editor:", err);
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

  return (
    <div class="h-full overflow-y-auto bg-[var(--color-editor-bg)] px-8 py-6">
      <div class="max-w-4xl mx-auto">
        <div ref={containerRef} class="milkdown-container" />
      </div>
    </div>
  );
};
