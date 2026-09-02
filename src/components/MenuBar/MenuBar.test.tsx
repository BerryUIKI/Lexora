import { render } from "solid-js/web";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MenuBar } from "./MenuBar";

vi.mock("@tauri-apps/plugin-shell", () => ({
  open: vi.fn(),
}));

vi.mock("../../lib/tauri/commands", () => ({
  minimizeWindow: vi.fn(),
  toggleMaximizeWindow: vi.fn(),
  closeWindow: vi.fn(),
  isWindowMaximized: vi.fn().mockResolvedValue(false),
  startDrag: vi.fn(),
}));

describe("MenuBar Title Bar Quick Access", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("renders quick access buttons for plugins, themes, and language", () => {
    const onOpenSettings = vi.fn();
    const onOpenThemeSettings = vi.fn();

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <MenuBar
          homeVisible={false}
          sidebarOpen={true}
          onGoHome={vi.fn()}
          onNewDocument={vi.fn()}
          onOpenFile={vi.fn()}
          onOpenFolder={vi.fn()}
          onSaveFile={vi.fn()}
          onExport={vi.fn()}
          onToggleSidebar={vi.fn()}
          onOpenQuickSwitcher={vi.fn()}
          onOpenSearchModal={vi.fn()}
          onOpenFindReplace={vi.fn()}
          onOpenThemeSettings={onOpenThemeSettings}
          onOpenSettings={onOpenSettings}
          onOpenRecent={vi.fn()}
        />
      ),
      container
    );

    const pluginsBtn = container.querySelector<HTMLButtonElement>('[data-menu-quick="plugins"]');
    const themesBtn = container.querySelector<HTMLButtonElement>('[data-menu-quick="theme"]');
    const langBtn = container.querySelector<HTMLButtonElement>('[data-menu-quick="language"]');

    expect(pluginsBtn).toBeTruthy();
    expect(themesBtn).toBeTruthy();
    expect(langBtn).toBeTruthy();

    pluginsBtn?.click();
    expect(onOpenSettings).toHaveBeenCalledWith("plugins");

    themesBtn?.click();
    expect(onOpenSettings).toHaveBeenCalledWith("theme");
  });
});
