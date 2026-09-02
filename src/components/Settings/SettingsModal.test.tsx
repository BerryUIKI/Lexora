import { render } from "solid-js/web";
import { afterEach, describe, expect, it } from "vitest";
import {
  automaticUpdateChecks,
  elementShadows,
  markdownTheme,
  setElementShadows,
  setAutomaticUpdateChecks,
  setMarkdownTheme,
  setTheme,
} from "../../store/settings";
import { plugins, setPluginFilterQuery, pluginSubTab, setPluginSubTab } from "../../store/plugins";
import {
  setInstalledThemes,
  setActiveTheme,
  setThemeSubTab,
  themeSubTab,
} from "../../store/customThemes";
import { SettingsModal } from "./SettingsModal";

describe("SettingsModal", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
    setPluginFilterQuery("");
    setPluginSubTab("installed");
    setThemeSubTab("installed");
  });

  it("selects themes and keeps element shadows opt-in", () => {
    setTheme("light");
    setMarkdownTheme("Taleno");
    setElementShadows(false);
    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => <SettingsModal isOpen={true} onClose={() => undefined} />,
      container
    );

    const buttons = Array.from(container.querySelectorAll("button"));
    const githubButton = buttons.find(
      (button) => button.textContent?.includes("GitHub")
    );
    expect(githubButton).toBeTruthy();
    githubButton?.click();
    expect(markdownTheme()).toBe("github");

    const shadowSwitch = container.querySelector<HTMLButtonElement>(
      '[role="switch"]'
    );
    expect(shadowSwitch?.getAttribute("aria-checked")).toBe("false");
    shadowSwitch?.click();
    expect(elementShadows()).toBe(true);
    expect(shadowSwitch?.getAttribute("aria-checked")).toBe("true");
  });

  it("allows automatic update checks to be disabled", () => {
    setAutomaticUpdateChecks(true);
    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => <SettingsModal isOpen={true} onClose={() => undefined} />,
      container
    );

    const updatesTab = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Updates"
    );
    updatesTab?.click();

    const updateSwitch = container.querySelector<HTMLButtonElement>(
      '[role="switch"]'
    );
    expect(updateSwitch?.getAttribute("aria-checked")).toBe("true");
    updateSwitch?.click();
    expect(automaticUpdateChecks()).toBe(false);
  });

  it("renders plugins tab with initialTab prop and toggles plugin state", () => {
    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <SettingsModal
          isOpen={true}
          initialTab="plugins"
          onClose={() => undefined}
        />
      ),
      container
    );

    // Verify plugins tab content is visible
    expect(container.textContent).toContain("Word Count Pro");
    expect(container.textContent).toContain("KaTeX Math Macros");

    // Find the toggle button for Word Count Pro
    const switches = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[role="switch"]')
    );
    expect(switches.length).toBeGreaterThan(0);

    const firstSwitch = switches[0];
    const initialChecked = firstSwitch.getAttribute("aria-checked") === "true";

    firstSwitch.click();

    const updatedPlugin = plugins()[0];
    expect(updatedPlugin.enabled).toBe(!initialChecked);
  });

  it("filters plugins via search input", () => {
    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <SettingsModal
          isOpen={true}
          initialTab="plugins"
          onClose={() => undefined}
        />
      ),
      container
    );

    const searchInput = container.querySelector<HTMLInputElement>("input[type='text']");
    expect(searchInput).toBeTruthy();

    // Type query matching only KaTeX
    searchInput!.value = "KaTeX";
    searchInput!.dispatchEvent(new Event("input", { bubbles: true }));

    expect(container.textContent).toContain("KaTeX Math Macros");
    expect(container.textContent).not.toContain("Word Count Pro");
  });

  it("switches to marketplace tab and renders remote catalog", () => {
    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <SettingsModal
          isOpen={true}
          initialTab="plugins"
          onClose={() => undefined}
        />
      ),
      container
    );

    const buttons = Array.from(container.querySelectorAll("button"));
    const marketplaceTabBtn = buttons.find((btn) =>
      btn.textContent?.includes("Marketplace")
    );
    expect(marketplaceTabBtn).toBeTruthy();
    marketplaceTabBtn?.click();

    // Verify sub-tab state switched
    expect(pluginSubTab()).toBe("marketplace");
  });

  it("renders custom themes section and switches to theme marketplace", () => {
    setInstalledThemes([
      {
        id: "dracula",
        name: "Dracula",
        version: "1.0.0",
        description: "A dark gothic theme",
        author: "Dracula Team",
        type: "dark",
        accentColor: "#bd93f9",
        backgroundColor: "#282a36",
        textColor: "#f8f8f2",
        entryFile: "theme.css",
      },
    ]);

    container = document.createElement("div");
    document.body.append(container);

    dispose = render(
      () => (
        <SettingsModal
          isOpen={true}
          initialTab="theme"
          onClose={() => undefined}
        />
      ),
      container
    );

    // Verify Dracula is rendered
    expect(container.textContent).toContain("Dracula");
    expect(container.textContent).toContain("Custom & Community Themes");

    // Click Marketplace sub-tab inside Themes
    const buttons = Array.from(container.querySelectorAll("button"));
    const marketplaceBtn = buttons.find(
      (btn) => btn.textContent?.trim() === "Marketplace"
    );
    expect(marketplaceBtn).toBeTruthy();
    marketplaceBtn?.click();

    expect(themeSubTab()).toBe("marketplace");
  });
});


