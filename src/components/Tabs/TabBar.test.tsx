import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TabBar } from "./TabBar";
import { addOrSwitchTab, openTabs } from "../../store/files";

vi.mock("../../lib/tauri/commands", () => ({
  startDrag: vi.fn(),
}));

describe("TabBar", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  beforeEach(() => {
    // Clear tabs or add a test tab
    openTabs().forEach((tab) => {
      // Clean tabs if needed
    });
  });

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("calls onNewTab when double-clicking the empty tab bar area", () => {
    const onNewTab = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(() => <TabBar onNewTab={onNewTab} />, container);

    const emptyArea = container.querySelector<HTMLDivElement>('[data-tab-empty="true"]');
    expect(emptyArea).toBeTruthy();

    emptyArea?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    expect(onNewTab).toHaveBeenCalledTimes(1);
  });

  it("calls onNewTab exactly once even if double-clicks arrive in rapid succession", () => {
    const onNewTab = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(() => <TabBar onNewTab={onNewTab} />, container);

    const emptyArea = container.querySelector<HTMLDivElement>('[data-tab-empty="true"]');
    expect(emptyArea).toBeTruthy();

    emptyArea?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    emptyArea?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    expect(onNewTab).toHaveBeenCalledTimes(1);
  });

  it("calls onNewTab when double-clicking the tab bar background", () => {
    const onNewTab = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(() => <TabBar onNewTab={onNewTab} />, container);

    const tabBar = container.querySelector<HTMLDivElement>('[data-tab-bar="true"]');
    expect(tabBar).toBeTruthy();

    tabBar?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    expect(onNewTab).toHaveBeenCalledTimes(1);
  });

  it("does not call onNewTab when double-clicking a button in the tab bar", () => {
    const onNewTab = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(() => <TabBar onNewTab={onNewTab} />, container);

    const newTabBtn = container.querySelector<HTMLButtonElement>("button");
    expect(newTabBtn).toBeTruthy();

    newTabBtn?.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    expect(onNewTab).not.toHaveBeenCalled();
  });

  it("calls onCloseTab when close tab button is clicked", () => {
    const onCloseTab = vi.fn();
    addOrSwitchTab({
      path: null,
      filename: "TestTab.md",
      content: "Sample",
      renderedContent: "",
      html: "",
      toc: [],
      wordCount: 1,
      isDirty: true,
      externallyModified: false,
    });

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(() => <TabBar onNewTab={vi.fn()} onCloseTab={onCloseTab} />, container);

    const closeBtn = container.querySelector<HTMLButtonElement>('button[title="Close Tab"]');
    expect(closeBtn).toBeTruthy();
    closeBtn?.click();
    expect(onCloseTab).toHaveBeenCalled();
  });
});
