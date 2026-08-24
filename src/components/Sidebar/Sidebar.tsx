import { Component, Show } from "solid-js";
import { TocSidebar } from "./TocSidebar";
import { FileTree } from "./FileTree";
import {
  workspaceTree,
  setWorkspaceTree,
  sidebarMode,
  setSidebarMode,
} from "../../store/files";
import { currentDocument } from "../../store/editor";
import { listDirectoryTree } from "../../lib/tauri/commands";
import { open } from "@tauri-apps/plugin-dialog";

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
        setSidebarMode("files");
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
      style={{
        background: "var(--color-sidebar-bg)",
        "border-right": "1px solid var(--color-border)",
      }}
    >
      {/* Sidebar Mode Tabs */}
      <div
        class="flex items-center border-b border-[var(--color-border)] text-xs font-semibold"
      >
        <button
          class="flex-1 py-2 text-center transition-colors flex items-center justify-center gap-1.5"
          style={{
            background: sidebarMode() === "files" ? "var(--color-bg-primary)" : "transparent",
            color: sidebarMode() === "files" ? "var(--color-accent)" : "var(--color-text-secondary)",
            "border-bottom": sidebarMode() === "files" ? "2px solid var(--color-accent)" : "none",
          }}
          onClick={() => setSidebarMode("files")}
        >
          <span>📁</span>
          <span>Files</span>
        </button>

        <button
          class="flex-1 py-2 text-center transition-colors flex items-center justify-center gap-1.5"
          style={{
            background: sidebarMode() === "toc" ? "var(--color-bg-primary)" : "transparent",
            color: sidebarMode() === "toc" ? "var(--color-accent)" : "var(--color-text-secondary)",
            "border-bottom": sidebarMode() === "toc" ? "2px solid var(--color-accent)" : "none",
          }}
          onClick={() => setSidebarMode("toc")}
        >
          <span>📑</span>
          <span>Outline</span>
        </button>
      </div>

      {/* Sidebar Content */}
      <div class="flex-1 overflow-hidden">
        <Show when={sidebarMode() === "files"}>
          <Show
            when={workspaceTree()}
            fallback={
              <div class="p-6 text-center text-xs text-[var(--color-text-secondary)] space-y-3">
                <p>No workspace folder open.</p>
                <button
                  class="px-3 py-1.5 rounded-lg text-white font-medium transition-colors shadow-xs"
                  style={{ background: "var(--color-accent)" }}
                  onClick={handleOpenFolder}
                >
                  Open Folder
                </button>
              </div>
            }
          >
            <FileTree
              tree={workspaceTree()!}
              onSelectFile={props.onSelectFile}
              onRefresh={handleRefreshWorkspace}
            />
          </Show>
        </Show>

        <Show when={sidebarMode() === "toc"}>
          <TocSidebar toc={doc().toc} />
        </Show>
      </div>
    </aside>
  );
};
