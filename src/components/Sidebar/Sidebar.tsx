import { Component, Show } from "solid-js";
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
      class="h-full flex flex-col overflow-hidden no-select"
      style={{ background: "var(--color-sidebar-bg)" }}
    >
      <section class="max-h-[50%] flex-shrink-0 overflow-hidden">
        <TocSidebar toc={doc().toc} />
      </section>

      <section class="flex-1 min-h-0 overflow-hidden border-t border-[var(--color-border)]">
        <Show
          when={workspaceTree()}
          fallback={
            <div class="h-full flex flex-col">
              <div class="px-3 py-2.5 text-xs font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)]">
                {t("sidebar.workspace")}
              </div>
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
            </div>
          }
        >
          <FileTree
            tree={workspaceTree()!}
            onSelectFile={props.onSelectFile}
            onRefresh={handleRefreshWorkspace}
          />
        </Show>
      </section>
    </aside>
  );
};
