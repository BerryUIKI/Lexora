import { Component, createMemo } from "solid-js";
import { currentDocument, updateDocumentContent } from "../../store/editor";

export interface CodeViewProps {
  onSave?: () => void;
}

export const CodeView: Component<CodeViewProps> = (props) => {
  let textareaRef!: HTMLTextAreaElement;

  const content = () => currentDocument().content;
  const lines = createMemo(() => content().split("\n"));

  const handleInput = (e: InputEvent & { currentTarget: HTMLTextAreaElement }) => {
    updateDocumentContent(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
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
      {/* Line Numbers Gutter */}
      <div
        class="w-12 flex-shrink-0 select-none py-6 text-right pr-3 overflow-hidden text-xs opacity-40 border-r border-[var(--color-border)] bg-[var(--color-sidebar-bg)]"
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
          class="w-full h-full p-6 outline-none resize-none bg-transparent leading-6 font-mono text-sm focus:ring-0 border-0"
          value={content()}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type raw Markdown here..."
          spellcheck={false}
        />
      </div>
    </div>
  );
};
