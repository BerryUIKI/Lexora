import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "solid-js/web";
import { MobileDrawerSheet } from "./MobileDrawerSheet";

describe("MobileDrawerSheet", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders files and settings sheet when active", () => {
    container = document.createElement("div");
    document.body.append(container);
    const onClose = vi.fn();
    const onOpenFile = vi.fn();
    const onNewDocument = vi.fn();

    dispose = render(
      () => (
        <MobileDrawerSheet
          view="settings"
          onClose={onClose}
          onOpenFile={onOpenFile}
          onNewDocument={onNewDocument}
        />
      ),
      container
    );

    expect(container.textContent).toContain("偏好设置");
    expect(container.textContent).toContain("浅色");
    expect(container.textContent).toContain("深色");

    const closeBtn = container.querySelector('button[aria-label="Close"]');
    expect(closeBtn).not.toBeNull();
    (closeBtn as HTMLButtonElement).click();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
