import { describe, expect, it } from "vitest";
import { detectDesktopPlatform } from "./platform";

describe("desktop platform detection", () => {
  it("detects a macOS WebView", () => {
    expect(
      detectDesktopPlatform(
        "MacIntel",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      ),
    ).toBe("macos");
  });

  it("detects Windows and Linux WebViews", () => {
    expect(detectDesktopPlatform("Win32", "Windows NT 10.0")).toBe("windows");
    expect(detectDesktopPlatform("Linux x86_64", "X11; Linux x86_64")).toBe(
      "linux",
    );
  });

  it("falls back when browser metadata is unavailable", () => {
    expect(detectDesktopPlatform("", "")).toBe("unknown");
  });
});
