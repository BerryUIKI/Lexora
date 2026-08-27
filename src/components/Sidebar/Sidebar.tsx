import { Component, createSignal, onCleanup, Show } from "solid-js";
import { TocSidebar } from "./TocSidebar";
import { FileTree } from "./FileTree";
import { workspaceTree, setWorkspaceTree } from "../../store/files";
import { currentDocument } from "../../store/editor";
import { listDirectoryTree } from "../../lib/tauri/commands";
import { open } from "@tauri-apps/plugin-dialog";
import { t } from "../../i18n";

export interface SidebarProps {
  onSelectFile: (path: string) => void;
}

export const Sidebar: Component<SidebarProps> = (props) => {
  const doc = () => currentDocument();
  const [workspaceExpanded, setWorkspaceExpanded] = createSignal(false);
  const [workspaceHeight, setWorkspaceHeight] = createSignal(240);
  const [isResizingWorkspace, setIsResizingWorkspace] = createSignal(false);
  let sidebarRef: HTMLElement | undefined;
  let stopWorkspaceResize: (() => void) | undefined;

  const startWorkspaceResize = (event: MouseEvent) => {
    event.preventDefault();
    setIsResizingWorkspace(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sidebarRef) return;
      const bounds = sidebarRef.getBoundingClientRect();
      const minWorkspaceHeight = 120;
      const minOutlineHeight = 96;
      const maxWorkspaceHeight = Math.max(
        minWorkspaceHeight,
        bounds.height - minOutlineHeight
      );
      const nextHeight = bounds.bottom - moveEvent.clientY;
      setWorkspaceHeight(
        Math.max(
          minWorkspaceHeight,
          Math.min(maxWorkspaceHeight, nextHeight)
        )
      );
    };

    const handleMouseUp = () => {
      setIsResizingWorkspace(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      stopWorkspaceResize = undefined;
    };

    stopWorkspaceResize?.();
    stopWorkspaceResize = handleMouseUp;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  onCleanup(() => stopWorkspaceResize?.());

  const handleOpenFolder = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });

      if (selected && typeof selected === "string") {
        const tree = await listDirectoryTree(selected);
        setWorkspaceTree(tree);
      }
    } catch (err) {
      console.error("Failed to open folder:", err);
    }
  };

  const handleRefreshWorkspace = async () => {
    const ws = workspaceTree();
    if (ws?.path) {
      try {
        const tree = await listDirectoryTree(ws.path);
        setWorkspaceTree(tree);
      } catch (err) {
        console.error("Failed to refresh workspace:", err);
      }
    }
  };

  return (
    <aside
      ref={sidebarRef}
      class="h-full flex flex-col overflow-hidden no-select"
      style={{ background: "var(--color-sidebar-bg)" }}
    >
      <section class="flex-1 min-h-[96px] overflow-hidden">
        <TocSidebar toc={doc().toc} />
      </section>

      <Show when={workspaceExpanded()}>
        <div
          class="h-1 flex-shrink-0 cursor-row-resize hover:bg-[var(--color-accent)] transition-colors"
          style={{
            background: isResizingWorkspace()
              ? "var(--color-accent)"
              : "var(--color-border)",
          }}
          onMouseDown={startWorkspaceResize}
          title="Resize workspace panel"
        />
      </Show>

      <section
        class="flex-shrink-0 min-h-0 overflow-hidden border-t border-[var(--color-border)]"
        style={{ height: workspaceExpanded() ? `${workspaceHeight()}px` : "37px" }}
      >
        <Show
          when={workspaceTree()}
          fallback={
            <div class="h-full flex flex-col">
              <div class="flex items-center px-3 py-2.5 text-xs font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)]">
                <button
                  class="flex items-center gap-1.5 min-w-0"
                  onClick={() => setWorkspaceExpanded((expanded) => !expanded)}
                  aria-expanded={workspaceExpanded()}
                >
                  <span class="text-[10px] opacity-60">
                    {workspaceExpanded() ? "▼" : "▶"}
                  </span>
                  <span>{t("sidebar.workspace")}</span>
                </button>
              </div>
              <Show when={workspaceExpanded()}>
                <div class="p-6 text-center text-xs text-[var(--color-text-secondary)] space-y-3">
                  <p>{t("sidebar.noFolderOpen")}</p>
                  <button
                    class="px-3 py-1.5 rounded-lg text-white font-medium transition-colors shadow-xs"
                    style={{ background: "var(--color-accent)" }}
                    onClick={handleOpenFolder}
                  >
                    {t("sidebar.openFolder")}
                  </button>
                </div>
              </Show>
            </div>
          }
        >
          <FileTree
            tree={workspaceTree()!}
            onSelectFile={props.onSelectFile}
            onRefresh={handleRefreshWorkspace}
            expanded={workspaceExpanded()}
            onToggleExpanded={() =>
              setWorkspaceExpanded((expanded) => !expanded)
            }
          />
        </Show>
      </section>
    </aside>
  );
};
