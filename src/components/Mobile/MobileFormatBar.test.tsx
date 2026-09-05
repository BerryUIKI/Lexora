import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "solid-js/web";
import { MobileFormatBar } from "./MobileFormatBar";

describe("MobileFormatBar", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders formatting action buttons", () => {
    container = document.createElement("div");
    document.body.append(container);
    const onCloseKeyboard = vi.fn();

    dispose = render(
      () => <MobileFormatBar onCloseKeyboard={onCloseKeyboard} />,
      container
    );

    const undoBtn = container.querySelector('button[aria-label="Undo"]');
    expect(undoBtn).not.toBeNull();

    const redoBtn = container.querySelector('button[aria-label="Redo"]');
    expect(redoBtn).not.toBeNull();

    const dismissBtn = container.querySelector('button[aria-label="Dismiss Keyboard"]');
    expect(dismissBtn).not.toBeNull();
    (dismissBtn as HTMLButtonElement).click();
    expect(onCloseKeyboard).toHaveBeenCalledOnce();
  });
});
