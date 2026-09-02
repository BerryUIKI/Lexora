import { describe, it, expect, vi } from "vitest";
import { render } from "solid-js/web";
import { MobileShell } from "./MobileShell";

describe("MobileShell", () => {
  it("renders mobile shell container with top bar and children", () => {
    const container = document.createElement("div");
    const onOpenFile = vi.fn();
    const onNewDocument = vi.fn();
    const onOpenQuickSwitcher = vi.fn();

    render(
      () => (
        <MobileShell
          onOpenFile={onOpenFile}
          onNewDocument={onNewDocument}
          onOpenQuickSwitcher={onOpenQuickSwitcher}
        >
          <div id="test-viewport">Mobile Document Viewport</div>
        </MobileShell>
      ),
      container
    );

    expect(container.querySelector("#test-viewport")?.textContent).toBe("Mobile Document Viewport");
    expect(container.querySelector('nav[aria-label="Mobile Navigation"]')).not.toBeNull();
  });
});
