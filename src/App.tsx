import { Component, createSignal, Show } from "solid-js";
import { open } from "@tauri-apps/plugin-dialog";
import { TocSidebar } from "./components/Sidebar/TocSidebar";
import { MarkdownView } from "./components/MarkdownView/MarkdownView";
import { StatusBar } from "./components/StatusBar/StatusBar";
import {
  currentDocument,
  setCurrentDocument,
  markExternallyModified,
  clearExternallyModified,
} from "./store/editor";
import { resolvedTheme } from "./store/settings";
import {
  openFile,
  startWatchingFile,
  stopWatchingFile,
} from "./lib/tauri/commands";
import { onFileChanged } from "./lib/tauri/events";
import { onMount, onCleanup } from "solid-js";

const App: Component = () => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);
  const [sidebarWidth, setSidebarWidth] = createSignal(240);
  const [isResizing, setIsResizing] = createSignal(false);
  let unlistenFileChanged: (() => void) | null = null;

  // Handle opening a file via native dialog
  const handleOpenFile = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        { name: "Markdown", extensions: ["md", "markdown", "mdx", "txt"] },
      ],
    });

    if (selected && typeof selected === "string") {
      await loadFile(selected);
    }
  };

  // Load a file by path
  const loadFile = async (path: string) => {
    try {
      // Stop watching previous file
      await stopWatchingFile();

      const result = await openFile(path);
      setCurrentDocument({
        path: result.path,
        filename: result.filename,
        content: result.content,
        html: result.html,
        toc: result.toc,
        wordCount: result.word_count,
        isDirty: false,
        externallyModified: false,
      });

      // Start watching the new file
      await startWatchingFile(path);
    } catch (err) {
      console.error("Failed to open file:", err);
    }
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
    unlistenFileChanged = await onFileChanged((_payload) => {
      markExternallyModified();
    });
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

  // Keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "o") {
      e.preventDefault();
      handleOpenFile();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  const doc = () => currentDocument();
  const hasDocument = () => doc().path !== null;

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

        {/* Main markdown view */}
        <main class="flex-1 overflow-hidden">
          <Show
            when={hasDocument()}
            fallback={
              <div class="flex items-center justify-center h-full">
                <div class="text-center">
                  <h1
                    class="text-4xl font-bold mb-4"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Lexora
                  </h1>
                  <p
                    class="text-lg mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    A Typora-style Markdown viewer
                  </p>
                  <button
                    class="px-6 py-2.5 rounded-lg text-white font-medium transition-colors"
                    style={{
                      background: "var(--color-accent)",
                    }}
                    onClick={handleOpenFile}
                  >
                    Open Markdown File
                  </button>
                  <p
                    class="mt-3 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    or press <kbd class="px-1.5 py-0.5 rounded text-xs" style={{ background: "var(--color-code-bg)" }}>Ctrl+O</kbd>
                  </p>
                </div>
              </div>
            }
          >
            <MarkdownView
              html={doc().html}
              externallyModified={doc().externallyModified}
              onReload={reloadCurrentFile}
            />
          </Show>
        </main>
      </div>

      {/* Status bar */}
      <StatusBar
        sidebarOpen={sidebarOpen()}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenFile={handleOpenFile}
      />
    </div>
  );
};

export default App;
