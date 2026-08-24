import { Component, createSignal, createMemo, Show, onMount } from "solid-js";
import { currentDocument, updateDocumentContent } from "../../store/editor";

export interface FindReplaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindReplace: Component<FindReplaceProps> = (props) => {
  const [findQuery, setFindQuery] = createSignal("");
  const [replaceQuery, setReplaceQuery] = createSignal("");
  const [caseSensitive, setCaseSensitive] = createSignal(false);
  const [useRegex, setUseRegex] = createSignal(false);
  const [currentIndex, setCurrentIndex] = createSignal(0);
  let findInputRef!: HTMLInputElement;

  const matches = createMemo(() => {
    const q = findQuery();
    if (!q) return [];
    const text = currentDocument().content;
    const results: { start: number; end: number }[] = [];

    try {
      if (useRegex()) {
        const flags = caseSensitive() ? "g" : "gi";
        const re = new RegExp(q, flags);
        let m: RegExpExecArray | null;
        while ((m = re.exec(text)) !== null) {
          results.push({ start: m.index, end: m.index + m[0].length });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const searchText = caseSensitive() ? text : text.toLowerCase();
        const searchQ = caseSensitive() ? q : q.toLowerCase();
        let pos = 0;
        while ((pos = searchText.indexOf(searchQ, pos)) !== -1) {
          results.push({ start: pos, end: pos + q.length });
          pos += q.length;
        }
      }
    } catch {
      // Ignore regex syntax errors during typing
    }

    return results;
  });

  const handleNext = () => {
    const total = matches().length;
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    const total = matches().length;
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleReplaceOne = () => {
    const m = matches();
    if (m.length === 0) return;
    const current = m[currentIndex()] || m[0];
    const text = currentDocument().content;
    const newText =
      text.substring(0, current.start) +
      replaceQuery() +
      text.substring(current.end);
    updateDocumentContent(newText);
  };

  const handleReplaceAll = () => {
    const q = findQuery();
    if (!q) return;
    const text = currentDocument().content;
    let newText = text;

    try {
      if (useRegex()) {
        const flags = caseSensitive() ? "g" : "gi";
        const re = new RegExp(q, flags);
        newText = text.replace(re, replaceQuery());
      } else {
        const flags = caseSensitive() ? "g" : "gi";
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(escaped, flags);
        newText = text.replace(re, replaceQuery());
      }
      updateDocumentContent(newText);
    } catch (err) {
      console.error("Replace all error:", err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handlePrev();
    }
  };

  onMount(() => {
    findInputRef?.focus();
  });

  return (
    <Show when={props.isOpen}>
      <div
        class="absolute top-2 right-6 z-40 p-2.5 rounded-xl shadow-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-xs flex flex-col gap-2 no-select select-none w-80 animate-in fade-in slide-in-from-top-2"
        onKeyDown={handleKeyDown}
      >
        {/* Find Row */}
        <div class="flex items-center gap-1.5">
          <div class="flex-1 flex items-center bg-[var(--color-bg-secondary)] rounded-md border border-[var(--color-border)] px-2 py-1">
            <span class="opacity-40 mr-1.5">🔍</span>
            <input
              ref={findInputRef}
              type="text"
              class="w-full bg-transparent outline-none text-xs"
              placeholder="Find..."
              value={findQuery()}
              onInput={(e) => {
                setFindQuery(e.currentTarget.value);
                setCurrentIndex(0);
              }}
            />
            {/* Match Counter */}
            <span class="opacity-50 text-[10px] whitespace-nowrap pl-1">
              {matches().length > 0
                ? `${currentIndex() + 1}/${matches().length}`
                : findQuery()
                ? "0"
                : ""}
            </span>
          </div>

          {/* Options */}
          <button
            class="px-1.5 py-1 rounded font-mono text-[11px] transition-colors"
            style={{
              background: caseSensitive() ? "var(--color-accent)" : "var(--color-hover)",
              color: caseSensitive() ? "white" : "inherit",
            }}
            onClick={() => setCaseSensitive((prev) => !prev)}
            title="Match Case (Aa)"
          >
            Aa
          </button>
          <button
            class="px-1.5 py-1 rounded font-mono text-[11px] transition-colors"
            style={{
              background: useRegex() ? "var(--color-accent)" : "var(--color-hover)",
              color: useRegex() ? "white" : "inherit",
            }}
            onClick={() => setUseRegex((prev) => !prev)}
            title="Use Regular Expression (.*)"
          >
            .*
          </button>

          {/* Nav buttons */}
          <button
            class="p-1 rounded hover:bg-[var(--color-hover)]"
            onClick={handlePrev}
            title="Previous Match (Shift+Enter)"
          >
            ▲
          </button>
          <button
            class="p-1 rounded hover:bg-[var(--color-hover)]"
            onClick={handleNext}
            title="Next Match (Enter)"
          >
            ▼
          </button>
          <button
            class="p-1 rounded hover:bg-[var(--color-hover)] opacity-70 hover:opacity-100"
            onClick={props.onClose}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Replace Row */}
        <div class="flex items-center gap-1.5">
          <div class="flex-1 flex items-center bg-[var(--color-bg-secondary)] rounded-md border border-[var(--color-border)] px-2 py-1">
            <span class="opacity-40 mr-1.5">⇄</span>
            <input
              type="text"
              class="w-full bg-transparent outline-none text-xs"
              placeholder="Replace with..."
              value={replaceQuery()}
              onInput={(e) => setReplaceQuery(e.currentTarget.value)}
            />
          </div>

          <button
            class="px-2 py-1 rounded bg-[var(--color-hover)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
            onClick={handleReplaceOne}
            title="Replace single match"
          >
            Replace
          </button>
          <button
            class="px-2 py-1 rounded bg-[var(--color-hover)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
            onClick={handleReplaceAll}
            title="Replace all matches"
          >
            All
          </button>
        </div>
      </div>
    </Show>
  );
};
