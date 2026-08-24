import { createSignal } from "solid-js";
import type { OpenFileResponse } from "../lib/tauri/commands";

export type DisplayMode = "reading" | "writing" | "code";

export interface TocEntry {
  level: number;
  text: string;
  id: string;
}

export interface DocumentState {
  path: string | null;
  filename: string;
  content: string;
  html: string;
  toc: TocEntry[];
  wordCount: number;
  isDirty: boolean;
  externallyModified: boolean;
}

const emptyDocument: DocumentState = {
  path: null,
  filename: "Untitled",
  content: "",
  html: "",
  toc: [],
  wordCount: 0,
  isDirty: false,
  externallyModified: false,
};

const [currentDocument, setCurrentDocument] =
  createSignal<DocumentState>(emptyDocument);

const [displayMode, setDisplayMode] = createSignal<DisplayMode>("writing");

export { currentDocument, setCurrentDocument, displayMode, setDisplayMode };

export function cycleDisplayMode() {
  const current = displayMode();
  if (current === "reading") setDisplayMode("writing");
  else if (current === "writing") setDisplayMode("code");
  else setDisplayMode("reading");
}

export function updateDocumentContent(newContent: string) {
  setCurrentDocument((prev) => {
    const words = newContent.trim().split(/\s+/).filter(Boolean).length;
    return {
      ...prev,
      content: newContent,
      wordCount: words,
      isDirty: prev.path !== null ? newContent !== prev.content || prev.isDirty : newContent.length > 0,
    };
  });
}

export function markSaved(result: OpenFileResponse) {
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
}

export function resetDocument() {
  setCurrentDocument(emptyDocument);
}

export function markExternallyModified() {
  setCurrentDocument((prev) => ({ ...prev, externallyModified: true }));
}

export function clearExternallyModified() {
  setCurrentDocument((prev) => ({ ...prev, externallyModified: false }));
}
