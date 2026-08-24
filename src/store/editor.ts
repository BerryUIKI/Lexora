import { createSignal } from "solid-js";

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

export { currentDocument, setCurrentDocument };

export function resetDocument() {
  setCurrentDocument(emptyDocument);
}

export function markExternallyModified() {
  setCurrentDocument((prev) => ({ ...prev, externallyModified: true }));
}

export function clearExternallyModified() {
  setCurrentDocument((prev) => ({ ...prev, externallyModified: false }));
}
