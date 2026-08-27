import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  check: vi.fn(),
  relaunch: vi.fn(),
  getVersion: vi.fn(),
  downloadAndInstall: vi.fn(),
}));

vi.mock("@tauri-apps/plugin-updater", () => ({ check: mocks.check }));
vi.mock("@tauri-apps/plugin-process", () => ({ relaunch: mocks.relaunch }));
vi.mock("@tauri-apps/api/app", () => ({ getVersion: mocks.getVersion }));

import { setAutomaticUpdateChecks } from "../store/settings";
import {
  checkForUpdates,
  downloadProgress,
  installPendingUpdate,
  isAutomaticCheckDue,
  resetUpdaterForTests,
  updateInfo,
} from "./updater";

describe("native updater", () => {
  beforeEach(() => {
    localStorage.clear();
    setAutomaticUpdateChecks(true);
    resetUpdaterForTests();
    vi.clearAllMocks();
    mocks.getVersion.mockResolvedValue("0.1.4");
  });

  it("checks daily unless the user opts out", () => {
    expect(isAutomaticCheckDue(100_000_000)).toBe(true);
    localStorage.setItem("lexora_last_update_check", "99999999");
    expect(isAutomaticCheckDue(100_000_000)).toBe(false);
    setAutomaticUpdateChecks(false);
    expect(isAutomaticCheckDue(200_000_000)).toBe(false);
  });

  it("uses localized manifest notes and installs with progress", async () => {
    mocks.downloadAndInstall.mockImplementation(async (onEvent) => {
      onEvent({ event: "Started", data: { contentLength: 100 } });
      onEvent({ event: "Progress", data: { chunkLength: 40 } });
      onEvent({ event: "Finished" });
    });
    mocks.check.mockResolvedValue({
      currentVersion: "0.1.3",
      version: "0.1.4",
      date: "2026-08-27T00:00:00Z",
      body: "<!-- lang:en-US -->Update notes<!-- /lang -->",
      downloadAndInstall: mocks.downloadAndInstall,
    });

    await checkForUpdates(true);
    expect(updateInfo()?.latestVersion).toBe("0.1.4");
    expect(updateInfo()?.releaseNotes).toBe("Update notes");

    await installPendingUpdate();
    expect(downloadProgress()).toBe(100);
    expect(mocks.relaunch).toHaveBeenCalledOnce();
  });
});
