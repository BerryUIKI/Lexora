import { describe, expect, it } from "vitest";
import {
  detectDesktopPlatform,
  detectPlatform,
  detectIsMobile,
} from "./platform";

describe("platform detection", () => {
  it("detects a macOS desktop WebView", () => {
    expect(
      detectPlatform(
        "MacIntel",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        0,
      ),
    ).toBe("macos");
    expect(
      detectDesktopPlatform(
        "MacIntel",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      ),
    ).toBe("macos");
    expect(
      detectIsMobile(
        "MacIntel",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        0,
      ),
    ).toBe(false);
  });

  it("detects an iPhone iOS WebView", () => {
    const iphoneUA =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
    expect(detectPlatform("iPhone", iphoneUA, 5)).toBe("ios");
    expect(detectIsMobile("iPhone", iphoneUA, 5)).toBe(true);
  });

  it("detects an iPad / iPadOS WebView", () => {
    // iPadOS 13+ reports MacIntel platform but has maxTouchPoints > 1
    const ipadUA =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko)";
    expect(detectPlatform("MacIntel", ipadUA, 5)).toBe("ios");
    expect(detectIsMobile("MacIntel", ipadUA, 5)).toBe(true);
  });

  it("detects an Android WebView", () => {
    const androidUA =
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36";
    expect(detectPlatform("Linux armv8l", androidUA, 5)).toBe("android");
    expect(detectIsMobile("Linux armv8l", androidUA, 5)).toBe(true);
  });

  it("detects Windows and Linux desktop WebViews", () => {
    expect(detectDesktopPlatform("Win32", "Windows NT 10.0")).toBe("windows");
    expect(detectDesktopPlatform("Linux x86_64", "X11; Linux x86_64")).toBe(
      "linux",
    );
  });

  it("falls back when browser metadata is unavailable", () => {
    expect(detectPlatform("", "", 0)).toBe("unknown");
    expect(detectDesktopPlatform("", "")).toBe("unknown");
    expect(detectIsMobile("", "", 0)).toBe(false);
  });
});
