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
import { SettingsModal } from "./SettingsModal";

describe("SettingsModal", () => {
  let dispose: (() => void) | undefined;
  let container: HTMLDivElement | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container?.remove();
    container = undefined;
  });

  it("selects themes and keeps element shadows opt-in", () => {
    setTheme("light");
    setMarkdownTheme("lexora");
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
});
