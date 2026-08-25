import { Component } from "solid-js";
import { currentDocument } from "../../store/editor";
import { exportDocument } from "../../lib/tauri/commands";
import { save } from "@tauri-apps/plugin-dialog";
import { dispatchFormat } from "../../lib/formatter";

export const EditorToolbar: Component = () => {
  const doc = () => currentDocument();

  const handleExport = async () => {
    const current = doc();
    try {
      const selected = await save({
        defaultPath: `${current.filename.replace(/\.md$/, "")}.html`,
        filters: [{ name: "HTML Document", extensions: ["html"] }],
      });
      if (selected && typeof selected === "string") {
        await exportDocument(current.content, current.filename, selected);
        alert(`Exported document successfully to:\n${selected}`);
      }
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <div
      class="h-8 flex items-center px-3 gap-0.5 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-xs select-none no-select flex-shrink-0"
    >
      {/* Block Type Group */}
      <button
        class="px-2 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium text-[11px] transition-colors"
        onClick={() => dispatchFormat("paragraph")}
        title="Normal Text / Paragraph (Ctrl+0)"
      >
        ¶ Text
      </button>

      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-bold text-[11px] transition-colors"
        onClick={() => dispatchFormat("h1")}
        title="Heading 1 (Ctrl+1)"
      >
        H1
      </button>

      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-semibold text-[11px] transition-colors"
        onClick={() => dispatchFormat("h2")}
        title="Heading 2 (Ctrl+2)"
      >
        H2
      </button>

      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-semibold text-[11px] transition-colors"
        onClick={() => dispatchFormat("h3")}
        title="Heading 3 (Ctrl+3)"
      >
        H3
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      {/* Inline Marks Group */}
      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-bold transition-colors"
        onClick={() => dispatchFormat("bold")}
        title="Bold (Ctrl+B)"
      >
        B
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] italic transition-colors font-serif"
        onClick={() => dispatchFormat("italic")}
        title="Italic (Ctrl+I)"
      >
        I
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] line-through transition-colors"
        onClick={() => dispatchFormat("strikethrough")}
        title="Strikethrough (Ctrl+Shift+X)"
      >
        S
      </button>

      <button
        class="px-1.5 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono text-[11px] transition-colors"
        onClick={() => dispatchFormat("code_inline")}
        title="Inline Code (Ctrl+`)"
      >
        &lt;/&gt;
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      {/* Structure & List Group */}
      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("bullet_list")}
        title="Bullet List"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="3" cy="6" r="1.5" fill="currentColor" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" />
          <circle cx="3" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("ordered_list")}
        title="Numbered List"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="6" x2="21" y2="6" />
          <line x1="10" y1="12" x2="21" y2="12" />
          <line x1="10" y1="18" x2="21" y2="18" />
          <path d="M4 6h2v4M4 10h4M4 14h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4" />
        </svg>
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("task_list")}
        title="Task List"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("blockquote")}
        title="Blockquote"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2-2 4-2 7z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2-2 4-2 7z" />
        </svg>
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("table")}
        title="Insert Markdown Table"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      {/* Media & Links */}
      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("link")}
        title="Insert Link (Ctrl+K)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>

      <button
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        onClick={() => dispatchFormat("image")}
        title="Insert Image"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </button>

      <div class="flex-1" />

      {/* Export Button (Monochrome) */}
      <button
        class="px-2 py-0.5 rounded hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5 font-medium text-[11px]"
        onClick={handleExport}
        title="Export to standalone HTML"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>Export</span>
      </button>
    </div>
  );
};
