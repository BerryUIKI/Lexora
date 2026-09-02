import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "solid-js/web";
import { MobileTopBar } from "./MobileTopBar";

describe("MobileTopBar", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders document title and action buttons", () => {
    container = document.createElement("div");
    document.body.append(container);
    const onOpenFiles = vi.fn();
    const onOpenOutline = vi.fn();
    const onOpenSettings = vi.fn();
    const onNewDocument = vi.fn();

    dispose = render(
      () => (
        <MobileTopBar
          onOpenFiles={onOpenFiles}
          onOpenOutline={onOpenOutline}
          onOpenSettings={onOpenSettings}
          onNewDocument={onNewDocument}
        />
      ),
      container
    );

    expect(container.textContent).toContain("Untitled");

    const filesBtn = container.querySelector('button[aria-label="Open Files and Workspace"]');
    expect(filesBtn).not.toBeNull();
    (filesBtn as HTMLButtonElement).click();
    expect(onOpenFiles).toHaveBeenCalledOnce();

    const outlineBtn = container.querySelector('button[aria-label="Table of Contents"]');
    expect(outlineBtn).not.toBeNull();
    (outlineBtn as HTMLButtonElement).click();
    expect(onOpenOutline).toHaveBeenCalledOnce();

    const newDocBtn = container.querySelector('button[aria-label="New Document"]');
    expect(newDocBtn).not.toBeNull();
    (newDocBtn as HTMLButtonElement).click();
    expect(onNewDocument).toHaveBeenCalledOnce();
  });
});
