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
      {/* Sidebar Mode Tabs (Monochrome SVGs) */}
      <div
        class="flex items-center border-b border-[var(--color-border)] text-xs font-semibold"
      >
        <button
          class="flex-1 py-2 text-center transition-colors flex items-center justify-center gap-1.5"
          style={{
            background: sidebarMode() === "toc" ? "var(--color-bg-primary)" : "transparent",
            color: sidebarMode() === "toc" ? "var(--color-accent)" : "var(--color-text-secondary)",
            "border-bottom": sidebarMode() === "toc" ? "2px solid var(--color-accent)" : "none",
          }}
          onClick={() => setSidebarMode("toc")}
          title="Document Outline"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Outline</span>
        </button>

        <button
          class="flex-1 py-2 text-center transition-colors flex items-center justify-center gap-1.5"
          style={{
            background: sidebarMode() === "files" ? "var(--color-bg-primary)" : "transparent",
            color: sidebarMode() === "files" ? "var(--color-accent)" : "var(--color-text-secondary)",
            "border-bottom": sidebarMode() === "files" ? "2px solid var(--color-accent)" : "none",
          }}
          onClick={() => setSidebarMode("files")}
          title="Files & Workspace"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span>Files</span>
        </button>
      </div>

      {/* Sidebar Content */}
      <div class="flex-1 overflow-hidden">
        <Show when={sidebarMode() === "toc"}>
          <TocSidebar toc={doc().toc} />
        </Show>

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
      </div>
    </aside>
  );
};
