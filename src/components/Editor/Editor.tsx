import { Component, onMount, onCleanup } from "solid-js";

export const Editor: Component = () => {
  let editorRef!: HTMLDivElement;

  onMount(() => {
    // Milkdown editor will be initialized here in Phase 1
    editorRef.innerHTML = `
      <div class="p-8 max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Welcome to Lexora</h1>
        <p class="text-gray-600 dark:text-gray-400">Your Typora-style Markdown editor. The Milkdown editor will be integrated in Phase 1.</p>
      </div>
    `;
  });

  return (
    <div
      ref={editorRef}
      class="flex-1 overflow-y-auto bg-[var(--color-editor-bg)] p-4"
    />
  );
};
