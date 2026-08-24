import { describe, it, expect, beforeEach } from "vitest";
import {
  openTabs,
  setOpenTabs,
  activeTabId,
  setActiveTabId,
  addOrSwitchTab,
  closeTab,
  syncCurrentDocumentToTab,
} from "./files";
import { currentDocument, setCurrentDocument, updateDocumentContent } from "./editor";

describe("Files & Tabs Store", () => {
  beforeEach(() => {
    setOpenTabs([]);
    setActiveTabId(null);
  });

  it("should add a new tab and set it as active", () => {
    const doc = {
      path: "/docs/test1.md",
      filename: "test1.md",
      content: "# Note 1",
      html: "<h1>Note 1</h1>",
      toc: [],
      wordCount: 2,
      isDirty: false,
      externallyModified: false,
    };

    addOrSwitchTab(doc);
    expect(openTabs().length).toBe(1);
    expect(activeTabId()).toBe("/docs/test1.md");
    expect(currentDocument().filename).toBe("test1.md");
  });

  it("should switch to existing tab without duplicate tabs", () => {
    const doc1 = {
      path: "/docs/test1.md",
      filename: "test1.md",
      content: "# Note 1",
      html: "",
      toc: [],
      wordCount: 2,
      isDirty: false,
      externallyModified: false,
    };
    const doc2 = {
      path: "/docs/test2.md",
      filename: "test2.md",
      content: "# Note 2",
      html: "",
      toc: [],
      wordCount: 2,
      isDirty: false,
      externallyModified: false,
    };

    addOrSwitchTab(doc1);
    addOrSwitchTab(doc2);
    expect(openTabs().length).toBe(2);
    expect(activeTabId()).toBe("/docs/test2.md");

    // Switch back to doc1
    addOrSwitchTab(doc1);
    expect(openTabs().length).toBe(2);
    expect(activeTabId()).toBe("/docs/test1.md");
  });

  it("should close tab and activate remaining tab", () => {
    const doc1 = {
      path: "/docs/test1.md",
      filename: "test1.md",
      content: "# Note 1",
      html: "",
      toc: [],
      wordCount: 2,
      isDirty: false,
      externallyModified: false,
    };
    const doc2 = {
      path: "/docs/test2.md",
      filename: "test2.md",
      content: "# Note 2",
      html: "",
      toc: [],
      wordCount: 2,
      isDirty: false,
      externallyModified: false,
    };

    addOrSwitchTab(doc1);
    addOrSwitchTab(doc2);

    closeTab("/docs/test2.md");
    expect(openTabs().length).toBe(1);
    expect(activeTabId()).toBe("/docs/test1.md");
  });

  it("should sync current document modifications into tab list", () => {
    const doc = {
      path: "/docs/test.md",
      filename: "test.md",
      content: "Initial",
      html: "",
      toc: [],
      wordCount: 1,
      isDirty: false,
      externallyModified: false,
    };
    addOrSwitchTab(doc);
    updateDocumentContent("Modified Content");
    syncCurrentDocumentToTab();

    const currentTab = openTabs().find((t) => t.id === "/docs/test.md");
    expect(currentTab?.document.content).toBe("Modified Content");
    expect(currentTab?.document.isDirty).toBe(true);
  });
});
