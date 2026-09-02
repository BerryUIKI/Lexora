import { createSignal } from "solid-js";
import type { DocumentState } from "./editor";
import type { FileEntry } from "../lib/tauri/commands";
import { currentDocument, setCurrentDocument } from "./editor";

export interface Tab {
  id: string;
  document: DocumentState;
}

export interface RecentFile {
  path: string;
  filename: string;
  lastOpened: number;
}

const STORAGE_KEY_RECENT = "Taleno_recent_files";

function loadRecentFiles(): RecentFile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentFiles(files: RecentFile[]) {
  try {
    localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(files.slice(0, 15)));
  } catch {
    // ignore
  }
}

const [openTabs, setOpenTabs] = createSignal<Tab[]>([]);
const [activeTabId, setActiveTabId] = createSignal<string | null>(null);
const [workspaceTree, setWorkspaceTree] = createSignal<FileEntry | null>(null);
const [quickSwitcherOpen, setQuickSwitcherOpen] = createSignal(false);
const [recentFiles, setRecentFiles] = createSignal<RecentFile[]>(loadRecentFiles());
let untitledTabSequence = 0;

export {
  openTabs,
  setOpenTabs,
  activeTabId,
  setActiveTabId,
  workspaceTree,
  setWorkspaceTree,
  quickSwitcherOpen,
  setQuickSwitcherOpen,
  recentFiles,
  setRecentFiles,
};

export function addRecentFile(path: string, filename: string) {
  setRecentFiles((prev) => {
    const filtered = prev.filter((f) => f.path !== path);
    const updated = [{ path, filename, lastOpened: Date.now() }, ...filtered].slice(0, 15);
    saveRecentFiles(updated);
    return updated;
  });
}

export function addOrSwitchTab(doc: DocumentState) {
  if (doc.path) {
    addRecentFile(doc.path, doc.filename);
  }

  const tabs = openTabs();
  const existing = tabs.find((t) => (t.document.path && t.document.path === doc.path) || (t.id === doc.path));

  if (existing) {
    setActiveTabId(existing.id);
    setCurrentDocument(existing.document);
  } else {
    const newId = doc.path || `untitled-${Date.now()}-${++untitledTabSequence}`;
    const newTab: Tab = { id: newId, document: doc };
    setOpenTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setCurrentDocument(doc);
  }
}

export function selectTab(id: string): boolean {
  const currentId = activeTabId();
  const current = currentDocument();
  const tabs = openTabs().map((tab) =>
    tab.id === currentId ? { ...tab, document: current } : tab
  );
  const selected = tabs.find((tab) => tab.id === id);

  if (!selected) return false;

  setOpenTabs(tabs);
  setActiveTabId(selected.id);
  setCurrentDocument(selected.document);
  return true;
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
        renderedContent: "",
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
