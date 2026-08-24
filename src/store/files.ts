import { createSignal } from "solid-js";
import type { DocumentState } from "./editor";
import type { FileEntry } from "../lib/tauri/commands";
import { currentDocument, setCurrentDocument } from "./editor";

export interface Tab {
  id: string;
  document: DocumentState;
}

const [openTabs, setOpenTabs] = createSignal<Tab[]>([]);
const [activeTabId, setActiveTabId] = createSignal<string | null>(null);
const [workspaceTree, setWorkspaceTree] = createSignal<FileEntry | null>(null);
const [quickSwitcherOpen, setQuickSwitcherOpen] = createSignal(false);
const [sidebarMode, setSidebarMode] = createSignal<"toc" | "files">("files");

export {
  openTabs,
  setOpenTabs,
  activeTabId,
  setActiveTabId,
  workspaceTree,
  setWorkspaceTree,
  quickSwitcherOpen,
  setQuickSwitcherOpen,
  sidebarMode,
  setSidebarMode,
};

export function addOrSwitchTab(doc: DocumentState) {
  const tabs = openTabs();
  const existing = tabs.find((t) => (t.document.path && t.document.path === doc.path) || (t.id === doc.path));

  if (existing) {
    setActiveTabId(existing.id);
    setCurrentDocument(existing.document);
  } else {
    const newId = doc.path || `untitled-${Date.now()}`;
    const newTab: Tab = { id: newId, document: doc };
    setOpenTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setCurrentDocument(doc);
  }
}

export function closeTab(id: string) {
  const tabs = openTabs();
  const newTabs = tabs.filter((t) => t.id !== id);
  setOpenTabs(newTabs);

  if (activeTabId() === id) {
    if (newTabs.length > 0) {
      const nextTab = newTabs[newTabs.length - 1];
      setActiveTabId(nextTab.id);
      setCurrentDocument(nextTab.document);
    } else {
      setActiveTabId(null);
      setCurrentDocument({
        path: null,
        filename: "Untitled",
        content: "",
        html: "",
        toc: [],
        wordCount: 0,
        isDirty: false,
        externallyModified: false,
      });
    }
  }
}

export function syncCurrentDocumentToTab() {
  const current = currentDocument();
  const id = activeTabId();
  if (!id) return;

  setOpenTabs((prev) =>
    prev.map((t) => (t.id === id ? { ...t, document: current } : t))
  );
}
