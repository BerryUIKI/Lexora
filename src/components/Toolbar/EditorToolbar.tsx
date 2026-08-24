import { Component } from "solid-js";
import { currentDocument, updateDocumentContent } from "../../store/editor";
import { exportDocument } from "../../lib/tauri/commands";
import { save } from "@tauri-apps/plugin-dialog";

export const EditorToolbar: Component = () => {
  const insertMarkdown = (prefix: string, suffix: string = "", placeholder: string = "text") => {
    const doc = currentDocument();
    const newContent = `${doc.content}\n\n${prefix}${placeholder}${suffix}\n`;
    updateDocumentContent(newContent);
  };

  const insertTable = () => {
    const tableMd = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Item 1 | Item 2 | Item 3 |\n| Data A | Data B | Data C |\n`;
    const doc = currentDocument();
    updateDocumentContent(`${doc.content}\n${tableMd}`);
  };

  const handleExport = async () => {
    const doc = currentDocument();
    try {
      const selected = await save({
        defaultPath: `${doc.filename.replace(/\.md$/, "")}.html`,
        filters: [{ name: "HTML Document", extensions: ["html"] }],
      });
      if (selected && typeof selected === "string") {
        await exportDocument(doc.content, doc.filename, selected);
        alert(`Exported document successfully to:\n${selected}`);
      }
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <div
      class="h-8 flex items-center px-3 gap-1 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-xs select-none no-select flex-shrink-0"
    >
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)] font-bold"
        onClick={() => insertMarkdown("**", "**", "Bold")}
        title="Bold (Ctrl+B)"
      >
        B
      </button>
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)] italic"
        onClick={() => insertMarkdown("*", "*", "Italic")}
        title="Italic (Ctrl+I)"
      >
        I
      </button>
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)] line-through"
        onClick={() => insertMarkdown("~~", "~~", "Strikethrough")}
        title="Strikethrough"
      >
        S
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] font-semibold"
        onClick={() => insertMarkdown("# ", "", "Heading 1")}
        title="Heading 1"
      >
        H1
      </button>
      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] font-semibold"
        onClick={() => insertMarkdown("## ", "", "Heading 2")}
        title="Heading 2"
      >
        H2
      </button>
      <button
        class="px-1.5 py-0.5 rounded hover:bg-[var(--color-hover)] font-semibold"
        onClick={() => insertMarkdown("### ", "", "Heading 3")}
        title="Heading 3"
      >
        H3
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      <button
        class="p-1 rounded hover:bg-[var(--color-hover)]"
        onClick={() => insertMarkdown("- ", "", "List item")}
        title="Bullet List"
      >
        • List
      </button>
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)]"
        onClick={() => insertMarkdown("- [ ] ", "", "Task")}
        title="Task List"
      >
        ☑ Task
      </button>
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)]"
        onClick={() => insertMarkdown("> ", "", "Quote")}
        title="Blockquote"
      >
        “ Quote
      </button>
      <button
        class="p-1 rounded hover:bg-[var(--color-hover)]"
        onClick={insertTable}
        title="Insert Markdown Table"
      >
        📊 Table
      </button>

      <span class="text-[var(--color-border)] mx-1">|</span>

      <button
        class="p-1 rounded hover:bg-[var(--color-hover)]"
        onClick={() => insertMarkdown("![Alt Text](", ")", "https://example.com/image.png")}
        title="Insert Image"
      >
        🖼️ Image
      </button>

      <div class="flex-1" />

      {/* Export Button */}
      <button
        class="px-2 py-0.5 rounded hover:bg-[var(--color-accent)] hover:text-white transition-colors flex items-center gap-1 font-medium text-[11px]"
        onClick={handleExport}
        title="Export to standalone HTML / PDF"
      >
        <span>📤</span>
        <span>Export</span>
      </button>
    </div>
  );
};
