import { createSignal } from "solid-js";

export interface DocumentState {
  path: string | null;
  content: string;
  isDirty: boolean;
  title: string;
}

const [currentDocument, setCurrentDocument] = createSignal<DocumentState>({
  path: null,
  content: "",
  isDirty: false,
  title: "Untitled",
});

export { currentDocument, setCurrentDocument };

export function markDirty() {
  setCurrentDocument((prev) => ({ ...prev, isDirty: true }));
}

export function markClean() {
  setCurrentDocument((prev) => ({ ...prev, isDirty: false }));
}
