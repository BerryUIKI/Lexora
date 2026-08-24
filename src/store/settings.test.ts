import { describe, it, expect, beforeEach } from "vitest";
import { theme, setTheme, cycleTheme, fontSize, setFontSize } from "./settings";

describe("Settings Store", () => {
  beforeEach(() => {
    setTheme("light");
    setFontSize(16);
  });

  it("should set and read theme correctly", () => {
    expect(theme()).toBe("light");
    setTheme("dark");
    expect(theme()).toBe("dark");
  });

  it("should cycle themes in order: light -> dark -> system -> light", () => {
    setTheme("light");
    cycleTheme();
    expect(theme()).toBe("dark");
    cycleTheme();
    expect(theme()).toBe("system");
    cycleTheme();
    expect(theme()).toBe("light");
  });

  it("should update and read font size", () => {
    expect(fontSize()).toBe(16);
    setFontSize(18);
    expect(fontSize()).toBe(18);
  });
});
