import { createSignal } from "solid-js";
import { open as openUrl } from "@tauri-apps/plugin-shell";

export const CURRENT_VERSION = "0.1.1";
export const GITHUB_REPO = "BerryUIKI/Lexora";
export const REPO_RELEASES_URL = `https://github.com/${GITHUB_REPO}/releases`;
export const REPO_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
export const REPO_ALL_RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases`;

export interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

export interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseTitle: string;
  releaseNotes: string;
  publishedAt: string;
  releaseUrl: string;
  assets: ReleaseAsset[];
  isManualCheck: boolean;
}

const [updateModalOpen, setUpdateModalOpen] = createSignal(false);
const [updateInfo, setUpdateInfo] = createSignal<UpdateInfo | null>(null);
const [isCheckingUpdate, setIsCheckingUpdate] = createSignal(false);

export { updateModalOpen, setUpdateModalOpen, updateInfo, isCheckingUpdate };

/**
 * Compare two semver-like version strings.
 * Returns true if remote is strictly newer than local.
 */
export function isNewerVersion(remoteTag: string, localVersion: string): boolean {
  const cleanRemote = remoteTag.replace(/^v/, "").trim();
  const cleanLocal = localVersion.replace(/^v/, "").trim();

  const rParts = cleanRemote.split(".").map((n) => parseInt(n, 10) || 0);
  const lParts = cleanLocal.split(".").map((n) => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(rParts.length, lParts.length); i++) {
    const r = rParts[i] || 0;
    const l = lParts[i] || 0;
    if (r > l) return true;
    if (r < l) return false;
  }
  return false;
}

/**
 * Check GitHub Releases for newer version.
 * @param manual Whether this check was explicitly triggered by the user
 */
export async function checkForUpdates(manual = false): Promise<void> {
  if (isCheckingUpdate()) return;
  setIsCheckingUpdate(true);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    let res = await fetch(REPO_API_URL, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    let data: any = null;

    if (res.ok) {
      data = await res.json();
    } else {
      // Fallback: Fetch all releases and pick first published release
      const allRes = await fetch(REPO_ALL_RELEASES_API, {
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (allRes.ok) {
        const list = await allRes.json();
        if (Array.isArray(list) && list.length > 0) {
          data = list[0];
        }
      }
    }

    clearTimeout(timeoutId);

    if (!data || !data.tag_name) {
      if (manual) {
        setUpdateInfo({
          hasUpdate: false,
          currentVersion: CURRENT_VERSION,
          latestVersion: CURRENT_VERSION,
          releaseTitle: "Lexora v" + CURRENT_VERSION,
          releaseNotes: "Current version is up to date. You can also view all releases directly on GitHub.",
          publishedAt: new Date().toISOString(),
          releaseUrl: REPO_RELEASES_URL,
          assets: [],
          isManualCheck: true,
        });
        setUpdateModalOpen(true);
      }
      return;
    }

    const latestTag = data.tag_name || `v${CURRENT_VERSION}`;
    const hasUpdate = isNewerVersion(latestTag, CURRENT_VERSION);

    // Save timestamp of last check
    localStorage.setItem("lexora_last_update_check", Date.now().toString());

    if (hasUpdate || manual) {
      setUpdateInfo({
        hasUpdate,
        currentVersion: CURRENT_VERSION,
        latestVersion: latestTag.replace(/^v/, ""),
        releaseTitle: data.name || latestTag,
        releaseNotes: data.body || "No release notes provided.",
        publishedAt: data.published_at || new Date().toISOString(),
        releaseUrl: data.html_url || REPO_RELEASES_URL,
        assets: data.assets || [],
        isManualCheck: manual,
      });
      setUpdateModalOpen(true);
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn("Update check failed:", err);
    if (manual) {
      setUpdateInfo({
        hasUpdate: false,
        currentVersion: CURRENT_VERSION,
        latestVersion: CURRENT_VERSION,
        releaseTitle: "Network Error",
        releaseNotes: "Unable to connect to GitHub. Please check your internet connection or try again later.",
        publishedAt: new Date().toISOString(),
        releaseUrl: REPO_RELEASES_URL,
        assets: [],
        isManualCheck: true,
      });
      setUpdateModalOpen(true);
    }
  } finally {
    setIsCheckingUpdate(false);
  }
}

/**
 * Check for updates automatically once per week (7 days).
 */
export function checkWeeklyUpdate(): void {
  try {
    const lastCheckStr = localStorage.getItem("lexora_last_update_check");
    const now = Date.now();
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

    if (!lastCheckStr || now - parseInt(lastCheckStr, 10) > ONE_WEEK_MS) {
      checkForUpdates(false);
    }
  } catch (err) {
    console.warn("Weekly update check error:", err);
  }
}

/**
 * Open the download URL in the system default browser.
 */
export async function openReleaseDownload(url: string): Promise<void> {
  try {
    await openUrl(url);
  } catch {
    window.open(url, "_blank");
  }
}
