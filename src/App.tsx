import { Component, createSignal, Show, onMount, onCleanup } from "solid-js";
import { open, save } from "@tauri-apps/plugin-dialog";
import { TocSidebar } from "./components/Sidebar/TocSidebar";
import { MarkdownView } from "./components/MarkdownView/MarkdownView";
import { Editor } from "./components/Editor/Editor";
import { CodeView } from "./components/CodeView/CodeView";
import { StatusBar } from "./components/StatusBar/StatusBar";
import {
  currentDocument,
  setCurrentDocument,
  displayMode,
  setDisplayMode,
  cycleDisplayMode,
  markSaved,
  markExternallyModified,
  clearExternallyModified,
} from "./store/editor";
import {
  openFile,
  saveFile,
  startWatchingFile,
  stopWatchingFile,
} from "./lib/tauri/commands";
import { onFileChanged } from "./lib/tauri/events";

const App: Component = () => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);
  const [sidebarWidth, setSidebarWidth] = createSignal(240);
  const [isResizing, setIsResizing] = createSignal(false);
  let unlistenFileChanged: (() => void) | null = null;

  // Handle opening a file via native dialog
  const handleOpenFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          { name: "Markdown", extensions: ["md", "markdown", "mdx", "txt"] },
        ],
      });

      if (selected && typeof selected === "string") {
        await loadFile(selected);
      }
    } catch (err) {
      console.error("Failed to open file dialog:", err);
    }
  };

  // Load a file by path
  const loadFile = async (path: string) => {
    try {
      await stopWatchingFile();
      const result = await openFile(path);
      markSaved(result);
      await startWatchingFile(path);
    } catch (err) {
      console.error("Failed to open file:", err);
    }
  };

  // Handle saving the current file (atomic write)
  const handleSaveFile = async () => {
    const doc = currentDocument();
    try {
      let targetPath = doc.path;
      if (!targetPath) {
        const selected = await save({
          defaultPath: doc.filename || "untitled.md",
          filters: [
            { name: "Markdown", extensions: ["md", "markdown", "txt"] },
          ],
        });
        if (!selected || typeof selected !== "string") return;
        targetPath = selected;
      }

      const res = await saveFile(targetPath, doc.content);
      markSaved(res);
      await startWatchingFile(targetPath);
    } catch (err) {
      console.error("Failed to save file:", err);
    }
  };

  // Handle creating a new document
  const handleNewDocument = () => {
    setCurrentDocument({
      path: null,
      filename: "Untitled",
      content: "# Untitled Document\n\nStart writing in Markdown...",
      html: "<h1>Untitled Document</h1><p>Start writing in Markdown...</p>",
      toc: [{ level: 1, text: "Untitled Document", id: "untitled-document" }],
      wordCount: 5,
      isDirty: false,
      externallyModified: false,
    });
    setDisplayMode("writing");
  };

  // Reload the current file (after external modification)
  const reloadCurrentFile = async () => {
    const doc = currentDocument();
    if (doc.path) {
      await loadFile(doc.path);
      clearExternallyModified();
    }
  };

  // Set up file change listener
  onMount(async () => {
    try {
      unlistenFileChanged = await onFileChanged((_payload) => {
        markExternallyModified();
      });
    } catch (err) {
      console.warn("File changed listener setup:", err);
    }
  });

  onCleanup(() => {
    unlistenFileChanged?.();
  });

  // Sidebar resize handling
  const startResize = (e: MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(160, Math.min(500, e.clientX));
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Global Keyboard Shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    const isCmd = e.ctrlKey || e.metaKey;

    if (isCmd && e.key === "o") {
      e.preventDefault();
      handleOpenFile();
    } else if (isCmd && e.key === "s") {
      e.preventDefault();
      handleSaveFile();
    } else if (isCmd && e.key === "n") {
      e.preventDefault();
      handleNewDocument();
    } else if (isCmd && e.key === "/") {
      e.preventDefault();
      cycleDisplayMode();
    } else if (isCmd && e.key === "b") {
      e.preventDefault();
      setSidebarOpen((prev) => !prev);
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  const doc = () => currentDocument();
  const hasDocument = () => doc().path !== null || doc().content.length > 0;

  return (
    <div
      class="flex flex-col h-screen"
      style={{ background: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}
    >
      {/* Main content area */}
      <div
        class="flex flex-1 overflow-hidden"
        style={{ cursor: isResizing() ? "col-resize" : "default" }}
      >
        {/* TOC Sidebar */}
        <Show when={sidebarOpen() && hasDocument()}>
          <aside
            class="flex-shrink-0 overflow-hidden flex flex-col no-select"
            style={{
              width: `${sidebarWidth()}px`,
              background: "var(--color-sidebar-bg)",
              "border-right": "1px solid var(--color-border)",
            }}
          >
            <TocSidebar toc={doc().toc} />
          </aside>

          {/* Resize handle */}
          <div
            class="w-1 cursor-col-resize hover:bg-[var(--color-accent)] transition-colors flex-shrink-0"
            style={{ background: isResizing() ? "var(--color-accent)" : "transparent" }}
            onMouseDown={startResize}
          />
        </Show>

        {/* Viewport: Reading / Writing / Code Modes */}
        <main class="flex-1 overflow-hidden">
          <Show
            when={hasDocument()}
            fallback={
              <div class="flex items-center justify-center h-full">
                <div class="text-center max-w-md px-6">
                  <h1
                    class="text-4xl font-bold mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Lexora
                  </h1>
                  <p
                    class="text-base mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    A Typora-style Markdown reader & editor
                  </p>

                  <div class="flex items-center justify-center gap-3 mb-6">
                    <button
                      class="px-5 py-2.5 rounded-lg text-white font-medium transition-colors shadow-sm cursor-pointer"
                      style={{ background: "var(--color-accent)" }}
                      onClick={handleOpenFile}
                    >
                      Open File
                    </button>

                    <button
                      class="px-5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer border border-[var(--color-border)] hover:bg-[var(--color-hover)]"
                      onClick={handleNewDocument}
                    >
                      New Document
                    </button>
                  </div>

                  <div class="text-xs space-y-1.5 opacity-60">
                    <p><kbd class="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)]">Ctrl+O</kbd> Open File</p>
                    <p><kbd class="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)]">Ctrl+N</kbd> New Document</p>
                    <p><kbd class="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)]">Ctrl+S</kbd> Save File</p>
                    <p><kbd class="px-1.5 py-0.5 rounded bg-[var(--color-code-bg)]">Ctrl+/</kbd> Toggle Display Mode</p>
                  </div>
                </div>
              </div>
            }
          >
            {/* Tri-State Viewport */}
            <Show when={displayMode() === "reading"}>
              <MarkdownView
                html={doc().html}
                externallyModified={doc().externallyModified}
                onReload={reloadCurrentFile}
              />
            </Show>

            <Show when={displayMode() === "writing"}>
              <Editor onSave={handleSaveFile} />
            </Show>

            <Show when={displayMode() === "code"}>
              <CodeView onSave={handleSaveFile} />
            </Show>
          </Show>
        </main>
      </div>

      {/* Status bar */}
      <StatusBar
        sidebarOpen={sidebarOpen()}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
      />
    </div>
  );
};

export default App;
