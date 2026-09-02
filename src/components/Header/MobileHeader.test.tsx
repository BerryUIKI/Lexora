import { render } from "solid-js/web";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MobileHeader } from "./MobileHeader";

describe("MobileHeader", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders mobile header with title and triggers action callbacks", () => {
    const onToggleSidebar = vi.fn();
    const onNewDocument = vi.fn();
    const onOpenQuickSwitcher = vi.fn();
    const onOpenSettings = vi.fn();
    const onGoHome = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <MobileHeader
          sidebarOpen={false}
          onToggleSidebar={onToggleSidebar}
          onNewDocument={onNewDocument}
          onOpenQuickSwitcher={onOpenQuickSwitcher}
          onOpenSettings={onOpenSettings}
          onGoHome={onGoHome}
        />
      ),
      container
    );

    const toggleBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Toggle Sidebar"]');
    expect(toggleBtn).toBeDefined();
    toggleBtn?.click();
    expect(onToggleSidebar).toHaveBeenCalled();

    const searchBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Search"]');
    searchBtn?.click();
    expect(onOpenQuickSwitcher).toHaveBeenCalled();

    const newDocBtn = container.querySelector<HTMLButtonElement>('button[aria-label="New Document"]');
    newDocBtn?.click();
    expect(onNewDocument).toHaveBeenCalled();
  });
});
