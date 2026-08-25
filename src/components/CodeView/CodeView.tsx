import { Component, createMemo, onMount, onCleanup } from "solid-js";
import { currentDocument, updateDocumentContent } from "../../store/editor";
import { registerCodeFormatter, type FormatAction } from "../../lib/formatter";

export interface CodeViewProps {
  onSave?: () => void;
}

export const CodeView: Component<CodeViewProps> = (props) => {
  let textareaRef!: HTMLTextAreaElement;
  let lineGutterRef!: HTMLDivElement;

  const content = () => currentDocument().content;
  const lines = createMemo(() => content().split("\n"));

  const handleInput = (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => {
    updateDocumentContent(e.currentTarget.value);
  };

  const handleScroll = (e: Event & { currentTarget: HTMLTextAreaElement }) => {
    if (lineGutterRef) {
      lineGutterRef.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const executeCodeFormat = (action: FormatAction) => {
    const textarea = textareaRef;
    if (!textarea) return;

    const val = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = val.substring(start, end);

    // Helpers
    const wrapSelection = (prefix: string, suffix: string, placeholder = "text") => {
      const textToWrap = selected.length > 0 ? selected : placeholder;
      const newVal = val.substring(0, start) + prefix + textToWrap + suffix + val.substring(end);
      textarea.value = newVal;
      const newCursorStart = start + prefix.length;
      const newCursorEnd = newCursorStart + textToWrap.length;
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
      textarea.focus();
      updateDocumentContent(newVal);
    };

    const modifyCurrentLine = (modifier: (line: string) => string) => {
      const beforeCursor = val.substring(0, start);
      const lineStart = beforeCursor.lastIndexOf("\n") + 1;
      const afterCursor = val.substring(end);
      const lineEndRelative = afterCursor.indexOf("\n");
      const lineEnd = lineEndRelative === -1 ? val.length : end + lineEndRelative;

      const currentLine = val.substring(lineStart, lineEnd);
      const modifiedLine = modifier(currentLine);

      const newVal = val.substring(0, lineStart) + modifiedLine + val.substring(lineEnd);
      textarea.value = newVal;
      const diff = modifiedLine.length - currentLine.length;
      textarea.setSelectionRange(start + diff, end + diff);
      textarea.focus();
      updateDocumentContent(newVal);
    };

    switch (action) {
      case "bold":
        wrapSelection("**", "**", "Bold");
        break;
      case "italic":
        wrapSelection("*", "*", "Italic");
        break;
      case "strikethrough":
        wrapSelection("~~", "~~", "Strikethrough");
        break;
      case "code_inline":
        wrapSelection("`", "`", "code");
        break;
      case "h1":
        modifyCurrentLine((l) => `# ${l.replace(/^#+\s*/, "")}`);
        break;
      case "h2":
        modifyCurrentLine((l) => `## ${l.replace(/^#+\s*/, "")}`);
        break;
      case "h3":
        modifyCurrentLine((l) => `### ${l.replace(/^#+\s*/, "")}`);
        break;
      case "h4":
        modifyCurrentLine((l) => `#### ${l.replace(/^#+\s*/, "")}`);
        break;
      case "h5":
        modifyCurrentLine((l) => `##### ${l.replace(/^#+\s*/, "")}`);
        break;
      case "h6":
        modifyCurrentLine((l) => `###### ${l.replace(/^#+\s*/, "")}`);
        break;
      case "paragraph":
        modifyCurrentLine((l) => l.replace(/^(#+\s*|>\s*|-\s*\[[ xX]\]\s*|-\s*|\d+\.\s*)/, ""));
        break;
      case "blockquote":
        modifyCurrentLine((l) => (l.startsWith("> ") ? l : `> ${l}`));
        break;
      case "bullet_list":
        modifyCurrentLine((l) => (l.startsWith("- ") ? l : `- ${l}`));
        break;
      case "ordered_list":
        modifyCurrentLine((l) => (l.match(/^\d+\.\s/) ? l : `1. ${l}`));
        break;
      case "task_list":
        modifyCurrentLine((l) => (l.startsWith("- [ ] ") ? l : `- [ ] ${l}`));
        break;
      case "table": {
        const tableMd = "\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Item 1 | Item 2 | Item 3 |\n";
        const newVal = val.substring(0, start) + tableMd + val.substring(end);
        textarea.value = newVal;
        textarea.setSelectionRange(start + tableMd.length, start + tableMd.length);
        textarea.focus();
        updateDocumentContent(newVal);
        break;
      }
      case "link":
        wrapSelection("[", "](https://example.com)", selected || "Link Text");
        break;
      case "image":
        wrapSelection("![", "](https://example.com/image.png)", selected || "Alt Text");
        break;
    }
  };

  onMount(() => {
    registerCodeFormatter(executeCodeFormat);
  });

  onCleanup(() => {
    registerCodeFormatter(null);
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    const isCmd = e.ctrlKey || e.metaKey;

    if (isCmd && e.key === "s") {
      e.preventDefault();
      props.onSave?.();
    } else if (isCmd && (e.key === "b" || e.key === "B")) {
      e.preventDefault();
      executeCodeFormat("bold");
    } else if (isCmd && (e.key === "i" || e.key === "I")) {
      e.preventDefault();
      executeCodeFormat("italic");
    } else if (isCmd && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      executeCodeFormat("link");
    } else if (isCmd && e.key === "`") {
      e.preventDefault();
      executeCodeFormat("code_inline");
    } else if (isCmd && e.key === "0") {
      e.preventDefault();
      executeCodeFormat("paragraph");
    } else if (isCmd && e.key >= "1" && e.key <= "6") {
      e.preventDefault();
      executeCodeFormat(`h${e.key}` as FormatAction);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const newVal = val.substring(0, start) + "  " + val.substring(end);
      textarea.value = newVal;
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      updateDocumentContent(newVal);
    }
  };

  return (
    <div class="h-full flex overflow-hidden font-mono text-sm bg-[var(--color-editor-bg)] text-[var(--color-text-primary)]">
      {/* Line Numbers Gutter (Synced Scroll) */}
      <div
        ref={lineGutterRef}
        class="w-12 flex-shrink-0 select-none py-6 text-right pr-3 overflow-hidden text-xs opacity-40 border-r border-[var(--color-border)] bg-[var(--color-sidebar-bg)] pointer-events-none"
        aria-hidden="true"
      >
        {lines().map((_, i) => (
          <div class="leading-6">{i + 1}</div>
        ))}
      </div>

      {/* Code Textarea Area */}
      <div class="flex-1 relative h-full overflow-hidden">
        <textarea
          ref={textareaRef}
          class="w-full h-full p-6 outline-none resize-none bg-transparent leading-6 font-mono text-sm focus:ring-0 border-0 overflow-y-auto"
          value={content()}
          onInput={handleInput}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="Type raw Markdown here..."
          spellcheck={false}
        />
      </div>
    </div>
  );
};
