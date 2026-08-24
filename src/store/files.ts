import { createSignal } from "solid-js";
import type { DocumentState } from "./editor";

export interface Tab {
  id: string;
  document: DocumentState;
}

const [openTabs, setOpenTabs] = createSignal<Tab[]>([]);
const [activeTabId, setActiveTabId] = createSignal<string | null>(null);

export { openTabs, setOpenTabs, activeTabId, setActiveTabId };
