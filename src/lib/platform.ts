export type DesktopPlatform = "macos" | "windows" | "linux" | "unknown";

/**
 * Detect the host desktop platform from WebView-provided browser metadata.
 *
 * The optional arguments keep platform-specific chrome behavior deterministic
 * in unit tests without requiring an IPC round trip during initial render.
 */
export function detectDesktopPlatform(
  platform = typeof navigator === "undefined" ? "" : navigator.platform,
  userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent,
): DesktopPlatform {
  const value = `${platform} ${userAgent}`.toLowerCase();

  if (value.includes("mac")) return "macos";
  if (value.includes("win")) return "windows";
  if (value.includes("linux") || value.includes("x11")) return "linux";

  return "unknown";
}

export const desktopPlatform = detectDesktopPlatform();
export const isMacOS = desktopPlatform === "macos";
