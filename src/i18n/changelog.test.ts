import { describe, expect, it } from "vitest";
import { selectLocalizedReleaseNotes } from "./changelog";

describe("localized release notes", () => {
  const notes = `
<!-- lang:en-US -->
English notes
<!-- /lang -->
<!-- lang:zh-CN -->
中文更新说明
<!-- /lang -->`;

  it("selects the active locale", () => {
    expect(selectLocalizedReleaseNotes(notes, "zh-CN")).toBe("中文更新说明");
  });

  it("falls back to English for an unavailable locale", () => {
    expect(selectLocalizedReleaseNotes(notes, "de-DE")).toBe("English notes");
  });

  it("preserves legacy unmarked release notes", () => {
    expect(selectLocalizedReleaseNotes("  Legacy notes  ", "ja-JP")).toBe(
      "Legacy notes"
    );
  });
});
