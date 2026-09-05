import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "solid-js/web";
import { MobileBottomNav } from "./MobileBottomNav";

describe("MobileBottomNav", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders 5 navigation buttons and dispatches toggle events", () => {
    container = document.createElement("div");
    document.body.append(container);
    const onToggleSheet = vi.fn();

    dispose = render(
      () => (
        <MobileBottomNav
          activeSheet={null}
          onToggleSheet={onToggleSheet}
        />
      ),
      container
    );

    const filesBtn = container.querySelector('button[aria-label="Files"]');
    expect(filesBtn).not.toBeNull();
    (filesBtn as HTMLButtonElement).click();
    expect(onToggleSheet).toHaveBeenCalledWith("files");

    const outlineBtn = container.querySelector('button[aria-label="Outline"]');
    expect(outlineBtn).not.toBeNull();
    (outlineBtn as HTMLButtonElement).click();
    expect(onToggleSheet).toHaveBeenCalledWith("outline");

    const searchBtn = container.querySelector('button[aria-label="Search"]');
    expect(searchBtn).not.toBeNull();
    (searchBtn as HTMLButtonElement).click();
    expect(onToggleSheet).toHaveBeenCalledWith("search");

    const settingsBtn = container.querySelector('button[aria-label="Settings"]');
    expect(settingsBtn).not.toBeNull();
    (settingsBtn as HTMLButtonElement).click();
    expect(onToggleSheet).toHaveBeenCalledWith("settings");
  });
});
